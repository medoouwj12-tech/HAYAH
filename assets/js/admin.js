(function () {
  "use strict";

  const config = window.HAYAH_SUPABASE_CONFIG || {};
  const remote = Boolean(config.url && config.anonKey);
  const baseUrl = (config.url || "").replace(/\/$/, "");
  const table = encodeURIComponent(config.table || "products");
  const defaultProducts = window.HAYAH_DEFAULT_PRODUCTS || [];
  const catalogSeedId = "__hayah_photo_catalog_v1__";
  const categories = window.HAYAH_CATEGORIES || [];
  let products = [];
  let session = null;
  let toastTimer;

  const $ = (selector) => document.querySelector(selector);
  const els = {
    status: $("#connection-status"),
    dashboard: $("#dashboard-content"),
    login: $("#login-panel"),
    tableBody: $("#products-table-body"),
    empty: $("#empty-state"),
    form: $("#product-form"),
    modal: $("#product-modal"),
    toast: $("#admin-toast")
  };

  function notify(message, isError = false) {
    els.toast.textContent = message;
    els.toast.style.background = isError ? "#8d3438" : "#25231f";
    els.toast.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => els.toast.classList.remove("show"), 3200);
  }

  function setStatus(label, kind) {
    els.status.className = `connection-pill ${kind || ""}`;
    els.status.textContent = label;
    const dot = document.createElement("i");
    els.status.prepend(dot);
  }

  function setSession(sessionData) {
    session = sessionData;
    if (session) localStorage.setItem("hayah_admin_session", JSON.stringify(session));
    else localStorage.removeItem("hayah_admin_session");
    $("#signout-btn").classList.toggle("hidden", !session);
  }

  async function authRequest(path, body) {
    const response = await fetch(`${baseUrl}/auth/v1/${path}`, {
      method: "POST",
      headers: { apikey: config.anonKey, "Content-Type": "application/json" },
      body: JSON.stringify(body)
    });
    const data = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(data.msg || data.message || data.error_description || "تعذر تسجيل الدخول.");
    return data;
  }

  async function refreshSession() {
    if (!session?.refresh_token) throw new Error("انتهت الجلسة، سجّل الدخول مرة أخرى.");
    const fresh = await authRequest("token?grant_type=refresh_token", { refresh_token: session.refresh_token });
    setSession(fresh);
  }

  async function api(path, options = {}, retried = false) {
    if (!session?.access_token) throw new Error("سجّل الدخول أولاً.");
    if (session.expires_at && Date.now() > session.expires_at * 1000 - 60000) await refreshSession();
    const response = await fetch(`${baseUrl}/rest/v1/${path}`, {
      ...options,
      headers: {
        apikey: config.anonKey,
        Authorization: `Bearer ${session.access_token}`,
        "Content-Type": "application/json",
        ...(options.headers || {})
      }
    });
    if (response.status === 401 && !retried && session.refresh_token) {
      await refreshSession();
      return api(path, options, true);
    }
    if (!response.ok) {
      const detail = (await response.text()).trim();
      let message = detail;
      try {
        const parsed = detail ? JSON.parse(detail) : null;
        message = parsed?.message || parsed?.error_description || parsed?.details || detail;
      } catch {
        message = detail;
      }
      throw new Error(message || `Supabase error ${response.status}`);
    }
    const body = (await response.text()).trim();
    return body ? JSON.parse(body) : null;
  }

  function toRow(product) {
    return {
      id: product.id,
      image: product.image,
      category: product.category,
      price: Number(product.price),
      original_price: Number(product.originalPrice ?? product.price),
      rating: Number(product.rating ?? 5),
      reviews_count: Number(product.reviewsCount ?? 0),
      badge: product.badge || { en: "New", ar: "جديد" },
      name: product.name,
      description: product.description,
      flowers: product.flowers,
      care: product.care,
      is_active: product.isActive !== false,
      updated_at: new Date().toISOString()
    };
  }

  function fromRow(row) {
    return {
      id: row.id,
      image: row.image,
      category: row.category,
      price: Number(row.price),
      originalPrice: Number(row.original_price ?? row.price),
      rating: Number(row.rating ?? 5),
      reviewsCount: Number(row.reviews_count ?? 0),
      badge: row.badge || { en: "New", ar: "جديد" },
      name: row.name || { en: "", ar: "" },
      description: row.description || { en: "", ar: "" },
      flowers: row.flowers || { en: "", ar: "" },
      care: row.care || { en: "", ar: "" },
      isActive: row.is_active !== false,
      updated_at: row.updated_at
    };
  }

  function updateStorefrontCatalog() {
    window.HAYAH_PRODUCTS.splice(0, window.HAYAH_PRODUCTS.length, ...products.map(({ isActive, updated_at, ...product }) => product));
    if (!remote) {
      localStorage.setItem("hayah_products", JSON.stringify(products));
      localStorage.setItem("hayah_catalog_version", "white-bouquet-catalog-67-v1");
    }
  }

  function categoryName(id) {
    const category = categories.find(item => item.id === id);
    return category?.name?.ar || id || "غير محدد";
  }

  function addText(parent, tag, text, className) {
    const node = document.createElement(tag);
    node.textContent = text ?? "";
    if (className) node.className = className;
    parent.appendChild(node);
    return node;
  }

  function renderStats() {
    const active = products.filter(product => product.isActive !== false).length;
    const average = products.length ? Math.round(products.reduce((sum, product) => sum + Number(product.price || 0), 0) / products.length) : 0;
    $("#stat-total").textContent = products.length;
    $("#stat-active").textContent = active;
    $("#stat-drafts").textContent = products.length - active;
    $("#stat-average").textContent = average;
  }

  function renderProducts() {
    const query = $("#search-input").value.trim().toLocaleLowerCase();
    const category = $("#category-filter").value;
    const status = $("#status-filter").value;
    const filtered = products.filter(product => {
      const searchable = `${product.id} ${product.name?.ar || ""} ${product.name?.en || ""}`.toLocaleLowerCase();
      const matchesStatus = status === "all" || (status === "active") === (product.isActive !== false);
      return searchable.includes(query) && (category === "all" || product.category === category) && matchesStatus;
    });

    els.tableBody.replaceChildren();
    filtered.forEach(product => {
      const row = document.createElement("tr");
      const productCell = document.createElement("td");
      const identity = document.createElement("div");
      identity.className = "product-cell";
      const image = document.createElement("img");
      image.src = product.image || "";
      image.alt = "";
      image.loading = "lazy";
      image.onerror = () => { image.removeAttribute("src"); };
      identity.appendChild(image);
      const names = document.createElement("div");
      addText(names, "b", product.name?.ar || product.name?.en || "منتج بدون اسم");
      addText(names, "small", product.id);
      identity.appendChild(names);
      productCell.appendChild(identity);
      row.appendChild(productCell);

      const categoryCell = document.createElement("td");
      addText(categoryCell, "span", categoryName(product.category), "category-tag");
      row.appendChild(categoryCell);

      const priceCell = document.createElement("td");
      priceCell.className = "price-cell";
      addText(priceCell, "span", `${product.price} ج.م`);
      if (Number(product.originalPrice) > Number(product.price)) addText(priceCell, "del", `${product.originalPrice} ج.م`);
      row.appendChild(priceCell);

      const statusCell = document.createElement("td");
      addText(statusCell, "span", product.isActive === false ? "● مسودة" : "● منشور", `status-tag ${product.isActive === false ? "draft" : "active"}`);
      row.appendChild(statusCell);

      const dateCell = document.createElement("td");
      const date = product.updated_at ? new Date(product.updated_at) : null;
      dateCell.textContent = date && !Number.isNaN(date.valueOf()) ? date.toLocaleDateString("ar-EG") : "—";
      row.appendChild(dateCell);

      const actionCell = document.createElement("td");
      const actions = document.createElement("div");
      actions.className = "row-actions";
      const editButton = document.createElement("button");
      editButton.type = "button";
      editButton.className = "row-action";
      editButton.title = "تعديل المنتج";
      editButton.setAttribute("aria-label", `تعديل ${product.name?.ar || product.id}`);
      editButton.textContent = "✎";
      editButton.addEventListener("click", () => openEditor(product));
      const deleteButton = document.createElement("button");
      deleteButton.type = "button";
      deleteButton.className = "row-action delete";
      deleteButton.title = "حذف المنتج";
      deleteButton.setAttribute("aria-label", `حذف ${product.name?.ar || product.id}`);
      deleteButton.textContent = "⌫";
      deleteButton.addEventListener("click", () => deleteProduct(product));
      actions.append(editButton, deleteButton);
      actionCell.appendChild(actions);
      row.appendChild(actionCell);
      els.tableBody.appendChild(row);
    });
    els.empty.classList.toggle("hidden", filtered.length > 0);
    $(".table-scroll").classList.toggle("hidden", filtered.length === 0);
    renderStats();
  }

  function configureCategories() {
    const filter = $("#category-filter");
    const select = els.form.elements.category;
    categories.filter(category => category.id !== "all").forEach(category => {
      const label = category.name?.ar || category.id;
      filter.add(new Option(label, category.id));
      select.add(new Option(label, category.id));
    });
  }

  function openEditor(product) {
    els.form.reset();
    els.form.elements.id.value = product?.id || "";
    els.form.elements.image.value = product?.image || "";
    els.form.elements.category.value = product?.category || categories.find(category => category.id !== "all")?.id || "";
    els.form.elements.price.value = product?.price ?? 150;
    els.form.elements.originalPrice.value = product?.originalPrice ?? product?.price ?? 150;
    els.form.elements.rating.value = product?.rating ?? 5;
    els.form.elements.reviewsCount.value = product?.reviewsCount ?? 0;
    els.form.elements.nameAr.value = product?.name?.ar || "";
    els.form.elements.nameEn.value = product?.name?.en || "";
    els.form.elements.badgeAr.value = product?.badge?.ar || "";
    els.form.elements.badgeEn.value = product?.badge?.en || "";
    els.form.elements.descriptionAr.value = product?.description?.ar || "";
    els.form.elements.descriptionEn.value = product?.description?.en || "";
    els.form.elements.flowersAr.value = product?.flowers?.ar || "";
    els.form.elements.flowersEn.value = product?.flowers?.en || "";
    els.form.elements.careAr.value = product?.care?.ar || "";
    els.form.elements.careEn.value = product?.care?.en || "";
    els.form.elements.isActive.value = String(product?.isActive !== false);
    els.form.elements.isActiveCheck.checked = product?.isActive !== false;
    $("#form-title").textContent = product ? "تعديل المنتج" : "إضافة منتج جديد";
    $("#save-product-btn").textContent = product ? "حفظ التعديلات" : "حفظ المنتج";
    updateImagePreview();
    els.modal.classList.remove("hidden");
    document.body.style.overflow = "hidden";
    els.form.elements.nameAr.focus();
  }

  function closeEditor() {
    els.modal.classList.add("hidden");
    document.body.style.overflow = "";
  }

  function updateImagePreview() {
    const image = $("#image-preview");
    const placeholder = $("#image-preview-placeholder");
    const url = els.form.elements.image.value.trim();
    if (!url) {
      image.removeAttribute("src");
      image.classList.remove("loaded");
      placeholder.classList.remove("hidden");
      return;
    }
    image.onload = () => { image.classList.add("loaded"); placeholder.classList.add("hidden"); };
    image.onerror = () => { image.classList.remove("loaded"); placeholder.classList.remove("hidden"); };
    image.src = url;
  }

  function formProduct() {
    const form = new FormData(els.form);
    return {
      id: form.get("id") || `hayah-${Date.now()}`,
      image: String(form.get("image")).trim(),
      category: String(form.get("category")),
      price: Number(form.get("price")),
      originalPrice: Number(form.get("originalPrice")),
      rating: Number(form.get("rating") || 5),
      reviewsCount: Number(form.get("reviewsCount") || 0),
      name: { ar: String(form.get("nameAr")).trim(), en: String(form.get("nameEn")).trim() },
      badge: { ar: String(form.get("badgeAr")).trim(), en: String(form.get("badgeEn")).trim() },
      description: { ar: String(form.get("descriptionAr")).trim(), en: String(form.get("descriptionEn")).trim() },
      flowers: { ar: String(form.get("flowersAr")).trim(), en: String(form.get("flowersEn")).trim() },
      care: { ar: String(form.get("careAr")).trim(), en: String(form.get("careEn")).trim() },
      isActive: els.form.elements.isActiveCheck.checked,
      updated_at: new Date().toISOString()
    };
  }

  async function saveProduct(event) {
    event.preventDefault();
    if (!els.form.reportValidity()) return;
    const product = formProduct();
    const exists = products.some(item => item.id === product.id);
    const button = $("#save-product-btn");
    button.disabled = true;
    try {
      if (remote) {
        const payload = JSON.stringify(toRow(product));
        if (exists) {
          await api(`${table}?id=eq.${encodeURIComponent(product.id)}`, { method: "PATCH", body: payload, headers: { Prefer: "return=minimal" } });
        } else {
          await api(table, { method: "POST", body: payload, headers: { Prefer: "return=minimal" } });
        }
      }
      products = exists ? products.map(item => item.id === product.id ? product : item) : [product, ...products];
      updateStorefrontCatalog();
      renderProducts();
      closeEditor();
      notify(exists ? "تم تحديث المنتج" : "تمت إضافة المنتج");
    } catch (error) {
      notify(`تعذر حفظ المنتج: ${error.message}`, true);
    } finally {
      button.disabled = false;
    }
  }

  async function deleteProduct(product) {
    if (!confirm(`حذف «${product.name?.ar || product.id}» نهائيًا؟`)) return;
    try {
      if (remote) await api(`${table}?id=eq.${encodeURIComponent(product.id)}`, { method: "DELETE", headers: { Prefer: "return=minimal" } });
      products = products.filter(item => item.id !== product.id);
      updateStorefrontCatalog();
      renderProducts();
      notify("تم حذف المنتج");
    } catch (error) {
      notify(`تعذر حذف المنتج: ${error.message}`, true);
    }
  }

  async function importDefaults() {
    if (!defaultProducts.length) return notify("لم يتم العثور على المنتجات الافتراضية.", true);
    const verb = remote ? "استيراد كتالوج الباقات الجديد (67 صورة) إلى Supabase وتحديث المنتجات الافتراضية؟" : "استعادة كتالوج الباقات الجديد (67 صورة)؟ سيتم استبدال القائمة المحلية.";
    if (!confirm(verb)) return;
    try {
      const imported = defaultProducts.map(product => ({ ...product, isActive: true, updated_at: new Date().toISOString() }));
      if (remote) {
        const rows = imported.map(toRow);
        rows.push(toRow({
          id: catalogSeedId,
          image: "",
          category: "bouquets",
          price: 0,
          originalPrice: 0,
          rating: 0,
          reviewsCount: 0,
          badge: { en: "Internal", ar: "داخلي" },
          name: { en: "Catalog sync marker", ar: "علامة مزامنة الكتالوج" },
          description: { en: "Internal catalog version marker.", ar: "علامة داخلية لمزامنة الكتالوج." },
          flowers: { en: "", ar: "" },
          care: { en: "", ar: "" },
          isActive: true
        }));
        await api(`${table}?on_conflict=id`, { method: "POST", body: JSON.stringify(rows), headers: { Prefer: "resolution=merge-duplicates,return=minimal" } });
        products = await loadRemoteProducts();
      } else {
        products = imported;
        updateStorefrontCatalog();
      }
      renderProducts();
      notify("تم استيراد الكتالوج الافتراضي");
    } catch (error) {
      notify(`تعذر الاستيراد: ${error.message}`, true);
    }
  }

  async function loadRemoteProducts() {
    const rows = await api(`${table}?select=*&order=created_at.desc`);
    return rows.filter(row => row.id !== catalogSeedId).map(fromRow);
  }

  async function uploadProductImage() {
    const file = $("#image-file").files?.[0];
    if (!file) return notify("اختَر صورة أولاً.", true);
    if (!remote || !session?.access_token) return notify("رفع الصور يتطلب إعداد Supabase وتسجيل الدخول.", true);
    if (!file.type.startsWith("image/")) return notify("الملف المختار ليس صورة.", true);
    const button = $("#upload-image");
    button.disabled = true;
    button.textContent = "جارٍ الرفع…";
    try {
      const safeName = file.name.normalize("NFKD").replace(/[^a-zA-Z0-9._-]+/g, "-").replace(/^-+|-+$/g, "") || "product-image";
      const path = `${Date.now()}-${safeName}`;
      const bucket = encodeURIComponent(config.bucket || "product-images");
      const response = await fetch(`${baseUrl}/storage/v1/object/${bucket}/${path}`, {
        method: "POST",
        headers: { apikey: config.anonKey, Authorization: `Bearer ${session.access_token}`, "Content-Type": file.type, "x-upsert": "false" },
        body: file
      });
      if (!response.ok) throw new Error(await response.text());
      els.form.elements.image.value = `${baseUrl}/storage/v1/object/public/${bucket}/${encodeURIComponent(path)}`;
      updateImagePreview();
      notify("تم رفع الصورة. احفظ المنتج لتسجيل رابطها.");
    } catch (error) {
      notify(`تعذر رفع الصورة: ${error.message}`, true);
    } finally {
      button.disabled = !session?.access_token;
      button.textContent = "رفع إلى Supabase Storage";
    }
  }

  async function signIn(event) {
    event.preventDefault();
    const message = $("#login-message");
    message.textContent = "جارٍ التحقق من الحساب…";
    message.className = "form-message";
    const data = new FormData(event.currentTarget);
    try {
      const fresh = await authRequest("token?grant_type=password", { email: data.get("email"), password: data.get("password") });
      setSession(fresh);
      await loadDashboard();
      message.textContent = "تم تسجيل الدخول";
      message.classList.add("success");
    } catch (error) {
      setSession(null);
      message.textContent = error.message.includes("admin_users") || error.message.includes("permission")
        ? "الحساب غير مخوّل لإدارة المتجر. أضف المستخدم إلى جدول admin_users في Supabase."
        : error.message;
      message.className = "form-message";
      els.login.classList.remove("hidden");
      els.dashboard.classList.add("hidden");
      setStatus("تعذر تسجيل الدخول", "error");
    }
  }

  async function loadDashboard() {
    if (remote) {
      const admins = await api(`admin_users?user_id=eq.${encodeURIComponent(session.user.id)}&select=user_id`);
      if (!admins.length) throw new Error("هذا الحساب ليس ضمن مسؤولي admin_users.");
      products = await loadRemoteProducts();
      setStatus("متصل بـ Supabase", "connected");
      els.login.classList.add("hidden");
      els.dashboard.classList.remove("hidden");
    } else {
      try {
        const saved = JSON.parse(localStorage.getItem("hayah_products") || "null");
        products = Array.isArray(saved) ? saved : defaultProducts.map(product => ({ ...product, isActive: true }));
      } catch {
        products = defaultProducts.map(product => ({ ...product, isActive: true }));
      }
      setStatus("وضع محلي · غير متصل بـ Supabase", "local");
      els.login.classList.add("hidden");
      els.dashboard.classList.remove("hidden");
    }
    updateStorefrontCatalog();
    renderProducts();
  }

  async function signOut() {
    try { if (remote && session?.access_token) await fetch(`${baseUrl}/auth/v1/logout`, { method: "POST", headers: { apikey: config.anonKey, Authorization: `Bearer ${session.access_token}` } }); }
    finally {
      setSession(null);
      if (remote) {
        els.dashboard.classList.add("hidden");
        els.login.classList.remove("hidden");
        setStatus("غير مسجل الدخول", "");
      }
    }
  }

  function init() {
    configureCategories();
    $("#add-product-top").addEventListener("click", () => openEditor(null));
    $("#add-product-empty").addEventListener("click", () => openEditor(null));
    $("#sidebar-products").addEventListener("click", () => $("#products-section").scrollIntoView({ behavior: "smooth" }));
    $("#import-defaults").addEventListener("click", importDefaults);
    $("#search-input").addEventListener("input", renderProducts);
    $("#category-filter").addEventListener("change", renderProducts);
    $("#status-filter").addEventListener("change", renderProducts);
    $("#close-editor").addEventListener("click", closeEditor);
    $("#cancel-editor").addEventListener("click", closeEditor);
    els.modal.addEventListener("click", event => { if (event.target === els.modal) closeEditor(); });
    els.form.addEventListener("submit", saveProduct);
    els.form.elements.image.addEventListener("input", updateImagePreview);
    els.form.elements.isActive.addEventListener("change", event => { els.form.elements.isActiveCheck.checked = event.target.value === "true"; });
    els.form.elements.isActiveCheck.addEventListener("change", event => { els.form.elements.isActive.value = String(event.target.checked); });
    $("#login-form").addEventListener("submit", signIn);
    $("#signout-btn").addEventListener("click", signOut);
    $("#upload-image").addEventListener("click", uploadProductImage);
    $("#image-file").addEventListener("change", event => {
      const file = event.target.files?.[0];
      $("#upload-image").disabled = !remote || !session?.access_token || !file;
      if (file && !remote) $("#upload-help").textContent = "ارفع الصورة بعد إدخال إعدادات Supabase في supabase-config.js.";
      else if (file) $("#upload-help").textContent = `${file.name} · ${(file.size / 1024 / 1024).toFixed(1)} م.ب`;
    });
    $("#login-panel").classList.toggle("hidden", !remote);
    $("#dashboard-content").classList.toggle("hidden", remote);

    if (!remote) {
      loadDashboard();
      return;
    }
    setStatus("إعداد Supabase مطلوب", "local");
    try { setSession(JSON.parse(localStorage.getItem("hayah_admin_session") || "null")); } catch { setSession(null); }
    if (session?.access_token) {
      loadDashboard().catch(error => {
        setStatus("تحتاج تسجيل الدخول", "error");
        els.dashboard.classList.add("hidden");
        els.login.classList.remove("hidden");
        $("#login-message").textContent = error.message;
      });
      $("#upload-image").disabled = false;
    } else {
      setStatus("سجّل دخول المسؤول", "local");
    }
  }

  init();
})();
