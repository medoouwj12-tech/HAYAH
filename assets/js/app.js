// ==========================================================================
// HAYAH FLOWERS - CORE APPLICATION SCRIPT
// Luxury Boutique E-Commerce Engine & WhatsApp Order Concierge
// ==========================================================================

(function() {
  'use strict';

  // Constants & Global Configuration
  const WHATSAPP_NUMBER = "201141519896";
  const DEFAULT_PRICE = 150; // Special luxury offer: all items 150 EGP

  // Products & Translations from globals or fallback
  const PRODUCTS = window.HAYAH_PRODUCTS || [];
  const TRANSLATIONS = window.HAYAH_TRANSLATIONS || {};

  // Application State
  const state = {
    lang: localStorage.getItem('hayah_lang') || 'ar', // Default to Arabic as requested
    theme: localStorage.getItem('hayah_theme') || 'light', // Default to light luxury theme
    activeCategory: 'all',
    cart: JSON.parse(localStorage.getItem('hayah_cart') || '[]'),
    activeProductModal: null,
    builder: {
      flowers: ['roses'],
      wrap: 'black',
      sender: '',
      recipient: '',
      message: '',
      date: '',
      time: '',
      phone: '',
      address: '',
      price: DEFAULT_PRICE
    }
  };

  // Helper: Get translation string
  function t(key) {
    if (TRANSLATIONS[state.lang] && TRANSLATIONS[state.lang][key]) {
      return TRANSLATIONS[state.lang][key];
    }
    if (TRANSLATIONS['en'] && TRANSLATIONS['en'][key]) {
      return TRANSLATIONS['en'][key];
    }
    return key;
  }

  // Helper: Open WhatsApp with pre-filled message
  function openWhatsApp(message) {
    const encoded = encodeURIComponent(message);
    const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;
    window.open(url, '_blank');
  }

  // Helper: Toast Notifications
  function showToast(text, icon = '✨') {
    let container = document.getElementById('toast-container');
    if (!container) {
      container = document.createElement('div');
      container.id = 'toast-container';
      container.className = 'toast-container';
      document.body.appendChild(container);
    }
    const toast = document.createElement('div');
    toast.className = 'toast';
    toast.innerHTML = `<span>${icon}</span> <span>${text}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(10px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  // Set Theme
  function applyTheme(theme) {
    state.theme = theme;
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('hayah_theme', theme);

    const themeToggleBtn = document.getElementById('theme-toggle-btn');
    if (themeToggleBtn) {
      themeToggleBtn.setAttribute('aria-label', theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeToggleBtn.innerHTML = theme === 'dark'
        ? `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/></svg>`
        : `<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/></svg>`;
    }
  }

  // Set Language (i18n & RTL/LTR switch)
  function applyLanguage(lang) {
    state.lang = lang;
    const isRTL = lang === 'ar';
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', isRTL ? 'rtl' : 'ltr');
    localStorage.setItem('hayah_lang', lang);

    // Update Language toggle button
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.innerHTML = `<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="2" y1="12" x2="22" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/></svg> <span>${isRTL ? 'English' : 'العربية'}</span>`;
    }

    // Update all data-i18n elements
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (key && t(key)) {
        el.textContent = t(key);
      }
    });

    // Update all data-i18n-placeholder elements
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (key && t(key)) {
        el.setAttribute('placeholder', t(key));
      }
    });

    // Re-render Dynamic Catalog and Cart
    renderCatalog();
    renderCart();
    updateBuilderPreview();
  }

  // Render Product Catalog
  function renderCatalog() {
    const grid = document.getElementById('products-grid');
    if (!grid) return;

    const filtered = state.activeCategory === 'all'
      ? PRODUCTS
      : PRODUCTS.filter(p => p.category === state.activeCategory);

    grid.innerHTML = '';

    filtered.forEach(product => {
      const card = document.createElement('article');
      card.className = 'product-card';
      card.setAttribute('data-id', product.id);

      const productName = product.name[state.lang] || product.name.en;
      const productDesc = product.description[state.lang] || product.description.en;
      const productBadge = product.badge[state.lang] || product.badge.en;
      const originalPriceText = `${product.originalPrice} ${t('egp')}`;
      const currentPriceText = `${product.price} ${t('egp')}`;

      card.innerHTML = `
        <div class="card-media">
          <span class="card-badge">${productBadge}</span>
          <img class="card-img" src="${product.image}" alt="${productName}" loading="lazy">
          <div class="card-quick-view-overlay">
            <button class="btn btn-outline-gold btn-sm quick-view-btn" data-id="${product.id}">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>
              ${t('btnQuickView')}
            </button>
          </div>
        </div>
        <div class="card-body">
          <div class="card-meta">
            <div class="card-rating">
              <span>★</span>
              <span>${product.rating.toFixed(1)}</span>
            </div>
            <span class="card-reviews">(${product.reviewsCount})</span>
          </div>
          <h3 class="card-title">${productName}</h3>
          <p class="card-desc">${productDesc}</p>
          <div class="card-price-wrap">
            <span class="current-price">${currentPriceText}</span>
            <span class="original-price">${originalPriceText}</span>
          </div>
          <div class="card-actions">
            <button class="btn btn-gold btn-sm add-to-cart-btn" data-id="${product.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
              ${t('btnAddToCart')}
            </button>
            <button class="btn btn-whatsapp btn-sm order-wa-direct-btn" data-id="${product.id}">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
              ${t('btnOrderWhatsApp')}
            </button>
          </div>
        </div>
      `;

      grid.appendChild(card);
    });

    // Attach card event listeners
    grid.querySelectorAll('.quick-view-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        openQuickViewModal(id);
      });
    });

    grid.querySelectorAll('.add-to-cart-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        addToCart(id, 1);
      });
    });

    grid.querySelectorAll('.order-wa-direct-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        directWhatsAppOrder(id);
      });
    });
  }

  // Quick View Modal
  function openQuickViewModal(productId) {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    state.activeProductModal = product;
    const modal = document.getElementById('quick-view-modal');
    if (!modal) return;

    const productName = product.name[state.lang] || product.name.en;
    const productDesc = product.description[state.lang] || product.description.en;
    const flowersText = product.flowers[state.lang] || product.flowers.en;
    const careText = product.care[state.lang] || product.care.en;
    const badgeText = product.badge[state.lang] || product.badge.en;

    document.getElementById('modal-img').src = product.image;
    document.getElementById('modal-img').alt = productName;
    document.getElementById('modal-badge').textContent = badgeText;
    document.getElementById('modal-title').textContent = productName;
    document.getElementById('modal-price').textContent = `${product.price} ${t('egp')}`;
    document.getElementById('modal-original-price').textContent = `${product.originalPrice} ${t('egp')}`;
    document.getElementById('modal-desc').textContent = productDesc;
    document.getElementById('modal-flowers').textContent = flowersText;
    document.getElementById('modal-care').textContent = careText;
    document.getElementById('modal-qty-input').value = '1';
    document.getElementById('modal-card-note').value = '';

    modal.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeQuickViewModal() {
    const modal = document.getElementById('quick-view-modal');
    if (modal) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
      state.activeProductModal = null;
    }
  }

  // Direct WhatsApp Order for Single Product
  function directWhatsAppOrder(productId, customQty = 1, customNote = '') {
    const product = PRODUCTS.find(p => p.id === productId);
    if (!product) return;

    const productName = product.name[state.lang] || product.name.en;
    const total = product.price * customQty;
    const isRTL = state.lang === 'ar';

    let message = "";
    if (isRTL) {
      message = `🌸 *طلب شراء مباشر - HAYAH FLOWERS* 🌸\n`
              + `───────────────────\n`
              + `💐 *المنتج:* ${productName}\n`
              + `🔢 *الكمية:* ${customQty}\n`
              + `💰 *سعر القطعة:* ${product.price} ج.م (عرض خاص)\n`
              + `💵 *الإجمالي المستحق:* ${total} ج.م\n`
              + (customNote ? `💌 *نص كرت الإهداء:* "${customNote}"\n` : `💌 *كرت الإهداء:* يشمل كرت مجاني فاخر\n`)
              + `───────────────────\n`
              + `📍 *بيانات العميل للتوصيل:*\n`
              + `• الاسم: \n`
              + `• رقم الهاتف: \n`
              + `• عنوان التوصيل والمنطقة: \n`
              + `• موعد التسليم المفضل: \n`
              + `───────────────────\n`
              + `✨ تم إرسال الطلب من متجر HAYAH FLOWERS`;
    } else {
      message = `🌸 *DIRECT ORDER - HAYAH FLOWERS* 🌸\n`
              + `───────────────────\n`
              + `💐 *Item:* ${productName}\n`
              + `🔢 *Quantity:* ${customQty}\n`
              + `💰 *Unit Price:* ${product.price} EGP (Special Offer)\n`
              + `💵 *Total Amount:* ${total} EGP\n`
              + (customNote ? `💌 *Gift Card Note:* "${customNote}"\n` : `💌 *Gift Card:* Free Luxury Card Included\n`)
              + `───────────────────\n`
              + `📍 *Customer Delivery Details:*\n`
              + `• Name: \n`
              + `• Phone: \n`
              + `• Delivery Address & City: \n`
              + `• Preferred Date & Time: \n`
              + `───────────────────\n`
              + `✨ Sent via HAYAH FLOWERS Luxury Atelier`;
    }

    openWhatsApp(message);
    showToast(isRTL ? 'جاري التحويل إلى الواتساب...' : 'Redirecting to WhatsApp...', '📲');
  }

  // Cart Management
  function saveCart() {
    localStorage.setItem('hayah_cart', JSON.stringify(state.cart));
    updateCartBadge();
    renderCart();
  }

  function updateCartBadge() {
    const totalCount = state.cart.reduce((sum, item) => sum + item.quantity, 0);
    const badges = document.querySelectorAll('.cart-badge');
    badges.forEach(b => {
      b.textContent = totalCount;
      b.style.display = totalCount > 0 ? 'flex' : 'none';
    });
  }

  function addToCart(productId, qty = 1, cardNote = '') {
    const existing = state.cart.find(item => item.id === productId);
    if (existing) {
      existing.quantity += qty;
      if (cardNote) existing.cardNote = cardNote;
    } else {
      state.cart.push({
        id: productId,
        quantity: qty,
        cardNote: cardNote
      });
    }
    saveCart();
    const product = PRODUCTS.find(p => p.id === productId);
    const name = product ? (product.name[state.lang] || product.name.en) : '';
    showToast(`${state.lang === 'ar' ? 'تمت إضافة' : 'Added'} "${name}" ${state.lang === 'ar' ? 'إلى الحقيبة' : 'to your bag'}`, '🛍️');
  }

  function updateCartItemQty(productId, delta) {
    const item = state.cart.find(i => i.id === productId);
    if (!item) return;
    item.quantity += delta;
    if (item.quantity <= 0) {
      state.cart = state.cart.filter(i => i.id !== productId);
    }
    saveCart();
  }

  function clearCart() {
    state.cart = [];
    saveCart();
    showToast(state.lang === 'ar' ? 'تم إفراغ الحقيبة' : 'Bag emptied', '🗑️');
  }

  function toggleCartDrawer(open) {
    const drawer = document.getElementById('cart-drawer');
    const overlay = document.getElementById('cart-overlay');
    if (!drawer || !overlay) return;

    if (open) {
      drawer.classList.add('open');
      overlay.classList.add('open');
      document.body.style.overflow = 'hidden';
    } else {
      drawer.classList.remove('open');
      overlay.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  function renderCart() {
    const container = document.getElementById('cart-items-container');
    const subtotalEl = document.getElementById('cart-subtotal-price');
    if (!container || !subtotalEl) return;

    if (state.cart.length === 0) {
      container.innerHTML = `
        <div style="text-align: center; padding: 40px 10px; color: var(--text-muted);">
          <svg style="margin: 0 auto 15px; opacity: 0.5;" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
          <p>${t('cartEmpty')}</p>
        </div>
      `;
      subtotalEl.textContent = `0 ${t('egp')}`;
      return;
    }

    let subtotal = 0;
    container.innerHTML = '';

    state.cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;

      const itemTotal = product.price * item.quantity;
      subtotal += itemTotal;
      const productName = product.name[state.lang] || product.name.en;

      const el = document.createElement('div');
      el.className = 'cart-item';
      el.innerHTML = `
        <img class="cart-item-img" src="${product.image}" alt="${productName}">
        <div class="cart-item-info">
          <h4 class="cart-item-title">${productName}</h4>
          <div class="cart-item-price">${product.price} × ${item.quantity} = ${itemTotal} ${t('egp')}</div>
          ${item.cardNote ? `<div style="font-size:0.75rem; color:var(--gold-primary); font-style:italic;">💌 "${item.cardNote}"</div>` : ''}
          <div class="cart-qty-ctrl">
            <button class="qty-btn dec-qty" data-id="${product.id}" aria-label="Decrease quantity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
            <span style="font-size: 0.9rem; font-weight: 600; min-width: 16px; text-align: center;">${item.quantity}</span>
            <button class="qty-btn inc-qty" data-id="${product.id}" aria-label="Increase quantity">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="12" y1="5" x2="12" y2="19"/><line x1="5" y1="12" x2="19" y2="12"/></svg>
            </button>
          </div>
        </div>
      `;
      container.appendChild(el);
    });

    subtotalEl.textContent = `${subtotal} ${t('egp')}`;

    container.querySelectorAll('.dec-qty').forEach(btn => {
      btn.addEventListener('click', () => updateCartItemQty(btn.getAttribute('data-id'), -1));
    });
    container.querySelectorAll('.inc-qty').forEach(btn => {
      btn.addEventListener('click', () => updateCartItemQty(btn.getAttribute('data-id'), 1));
    });
  }

  // Cart Checkout via WhatsApp
  function checkoutCartWhatsApp() {
    if (state.cart.length === 0) {
      showToast(state.lang === 'ar' ? 'حقيبتك فارغة حالياً!' : 'Your bag is empty!', '⚠️');
      return;
    }

    const nameInput = document.getElementById('cart-cust-name');
    const phoneInput = document.getElementById('cart-cust-phone');
    const addressInput = document.getElementById('cart-cust-address');
    const dateInput = document.getElementById('cart-cust-date');
    const noteInput = document.getElementById('cart-cust-note');

    const customerName = nameInput ? nameInput.value.trim() : '';
    const customerPhone = phoneInput ? phoneInput.value.trim() : '';
    const customerAddress = addressInput ? addressInput.value.trim() : '';
    const deliveryDate = dateInput ? dateInput.value.trim() : '';
    const globalNote = noteInput ? noteInput.value.trim() : '';

    const isRTL = state.lang === 'ar';
    let total = 0;
    let itemsText = "";

    state.cart.forEach(item => {
      const product = PRODUCTS.find(p => p.id === item.id);
      if (!product) return;
      const itemTotal = product.price * item.quantity;
      total += itemTotal;
      const productName = product.name[state.lang] || product.name.en;
      itemsText += `• ${productName} × ${item.quantity} [${itemTotal} ${t('egp')}]\n`;
      if (item.cardNote) {
        itemsText += `   ↳ كرت: "${item.cardNote}"\n`;
      }
    });

    let message = "";
    if (isRTL) {
      message = `🌸 *طلب جديد من متجر HAYAH FLOWERS الفاخر* 🌸\n`
              + `───────────────────\n`
              + `👤 *اسم العميل:* ${customerName || 'غير محدد'}\n`
              + `📱 *رقم الهاتف:* ${customerPhone || 'غير محدد'}\n`
              + `📍 *عنوان التوصيل:* ${customerAddress || 'القاهرة / الجيزة'}\n`
              + `📅 *موعد التوصيل المفضل:* ${deliveryDate || 'في أقرب وقت ممكن'}\n`
              + `───────────────────\n`
              + `🛍️ *قائمة الباقات المطلوبة (عرض 150 ج.م):*\n`
              + `${itemsText}`
              + (globalNote ? `💌 *ملاحظة كرت الإهداء الإضافية:* "${globalNote}"\n` : `💌 *كرت إهداء:* فاخر مع ختم الشمع الملكي\n`)
              + `───────────────────\n`
              + `💰 *الإجمالي المستحق:* ${total} ج.م\n`
              + `✨ نرجو تأكيد موعد الشحن والتسليم. شكرًا لكم!`;
    } else {
      message = `🌸 *NEW ORDER - HAYAH FLOWERS LUXURY ATELIER* 🌸\n`
              + `───────────────────\n`
              + `👤 *Customer Name:* ${customerName || 'Not specified'}\n`
              + `📱 *Customer Phone:* ${customerPhone || 'Not specified'}\n`
              + `📍 *Delivery Address:* ${customerAddress || 'Cairo / Giza'}\n`
              + `📅 *Preferred Delivery:* ${deliveryDate || 'Earliest available'}\n`
              + `───────────────────\n`
              + `🛍️ *Ordered Arrangements (150 EGP Special):*\n`
              + `${itemsText}`
              + (globalNote ? `💌 *Order Card Message:* "${globalNote}"\n` : `💌 *Greeting Card:* Included with Royal Seal\n`)
              + `───────────────────\n`
              + `💰 *Total Amount:* ${total} EGP\n`
              + `✨ Please confirm availability & dispatch time. Thank you!`;
    }

    openWhatsApp(message);
    showToast(isRTL ? 'جاري تحويل طلبك للواتساب...' : 'Redirecting order to WhatsApp...', '✨');
  }

  // Bespoke Arrangement Builder Logic
  function updateBuilderPreview() {
    const isRTL = state.lang === 'ar';
    const recipientEl = document.getElementById('preview-recipient');
    const messageEl = document.getElementById('preview-message');
    const senderEl = document.getElementById('preview-sender');
    const priceEl = document.getElementById('builder-display-price');

    if (recipientEl) {
      recipientEl.textContent = state.builder.recipient
        ? `${isRTL ? 'إلى:' : 'To:'} ${state.builder.recipient}`
        : `${isRTL ? 'إلى أغلى الناس' : 'To: Someone Special'}`;
    }

    if (messageEl) {
      messageEl.textContent = state.builder.message
        ? `"${state.builder.message}"`
        : `"${isRTL ? 'كل عام وأنتِ أرق من الورد، دمتِ بهجة وسعادة لقلوبنا...' : 'May your day bloom with eternal elegance and pure radiance...'}"`;
    }

    if (senderEl) {
      senderEl.textContent = state.builder.sender
        ? `${isRTL ? 'مع كل الحب من:' : 'With Love From:'} ${state.builder.sender}`
        : `${isRTL ? 'HAYAH LUXURY COLLECTION' : 'HAYAH LUXURY COLLECTION'}`;
    }

    if (priceEl) {
      priceEl.textContent = `${state.builder.price} ${t('egp')}`;
    }
  }

  function submitBespokeWhatsApp() {
    const isRTL = state.lang === 'ar';
    const flowerNames = {
      roses: isRTL ? 'ورد جوري أحمر ملكي' : 'Royal Velvet Red Roses',
      lilies: isRTL ? 'زنابق الليليوم البيضاء' : 'Pure White Lilies',
      orchids: isRTL ? 'أوركيد الفالينوبسيس' : 'Phalaenopsis Orchids',
      tulips: isRTL ? 'توليب هولندي باستيل' : 'Dutch Pastel Tulips',
      peonies: isRTL ? 'بيوني زهري ناعم' : 'Blush Peonies',
      gypsophila: isRTL ? 'بيبي بريث سحابي' : 'Cloud Gypsophila'
    };

    const wrapNames = {
      black: isRTL ? 'أسود ملكي مطفي مذهب' : 'Matte Obsidian Black & Gold',
      gold: isRTL ? 'ورق ميتاليك شمبانيا ذهبي' : 'Champagne Metallic Foil',
      white: isRTL ? 'حرير أبيض عاجي نقي' : 'Pure White Silk & Satin',
      pink: isRTL ? 'مخمل بودري هادئ' : 'Blush Powder Velvet',
      emerald: isRTL ? 'أخضر زمردي مع حبال ذهبية' : 'Royal Emerald Green & Gold'
    };

    const flowersFormatted = state.builder.flowers.map(f => flowerNames[f] || f).join(' + ');
    const wrapFormatted = wrapNames[state.builder.wrap] || state.builder.wrap;

    const phone = document.getElementById('builder-phone')?.value.trim() || '';
    const address = document.getElementById('builder-address')?.value.trim() || '';
    const date = document.getElementById('builder-date')?.value.trim() || '';
    const time = document.getElementById('builder-time')?.value.trim() || '';

    let message = "";
    if (isRTL) {
      message = `🎨 *تصميم باقة مخصصة - استوديو HAYAH FLOWERS* 🎨\n`
              + `───────────────────\n`
              + `💐 *مزيج الزهور المختار:* ${flowersFormatted}\n`
              + `🎀 *أسلوب التغليف الفاخر:* ${wrapFormatted}\n`
              + `💌 *نص كرت الإهداء:*\n`
              + `   • إلى: ${state.builder.recipient || 'غير محدد'}\n`
              + `   • نص الرسالة: "${state.builder.message || 'أطيب الأمنيات'}"\n`
              + `   • من: ${state.builder.sender || 'مجهول'}\n`
              + `───────────────────\n`
              + `📍 *بيانات التوصيل:*\n`
              + `• رقم الهاتف: ${phone || 'موضح لاحقاً'}\n`
              + `• عنوان التوصيل: ${address || 'القاهرة'}\n`
              + `• الموعد المطلوب: ${date} ${time ? 'الساعة ' + time : ''}\n`
              + `───────────────────\n`
              + `💰 *سعر التنسيق الخاص:* ${state.builder.price} ج.م (عرض خاص)\n`
              + `✨ نرجو البدء في تجهيز الباقة. شكراً لكم!`;
    } else {
      message = `🎨 *BESPOKE ARRANGEMENT ORDER - HAYAH FLOWERS* 🎨\n`
              + `───────────────────\n`
              + `💐 *Selected Blooms:* ${flowersFormatted}\n`
              + `🎀 *Luxury Wrap:* ${wrapFormatted}\n`
              + `💌 *Gift Card Details:*\n`
              + `   • To: ${state.builder.recipient || 'N/A'}\n`
              + `   • Message: "${state.builder.message || 'Best wishes'}"\n`
              + `   • From: ${state.builder.sender || 'Anonymous'}\n`
              + `───────────────────\n`
              + `📍 *Delivery Schedule:*\n`
              + `• Contact Phone: ${phone || 'N/A'}\n`
              + `• Address: ${address || 'Cairo'}\n`
              + `• Preferred Date: ${date} ${time ? 'Time: ' + time : ''}\n`
              + `───────────────────\n`
              + `💰 *Price:* ${state.builder.price} EGP (Promotional Offer)\n`
              + `✨ Please begin artisanal crafting. Thank you!`;
    }

    openWhatsApp(message);
    showToast(isRTL ? 'جاري إرسال التصميم للواتساب...' : 'Sending bespoke design to WhatsApp...', '🎨');
  }

  // Event & Wedding WhatsApp Reservation
  function submitEventWhatsApp(e) {
    e.preventDefault();
    const isRTL = state.lang === 'ar';

    const type = document.getElementById('event-type')?.value || '';
    const name = document.getElementById('event-name')?.value.trim() || '';
    const phone = document.getElementById('event-phone')?.value.trim() || '';
    const date = document.getElementById('event-date')?.value.trim() || '';
    const venue = document.getElementById('event-venue')?.value.trim() || '';
    const guests = document.getElementById('event-guests')?.value.trim() || '';
    const notes = document.getElementById('event-notes')?.value.trim() || '';

    let message = "";
    if (isRTL) {
      message = `👑 *طلب حجز وتنسيق زهور مناسبات VIP - HAYAH FLOWERS* 👑\n`
              + `───────────────────\n`
              + `👤 *اسم صاحب الحجز / الجهة:* ${name}\n`
              + `📱 *رقم الواتساب للتواصل:* ${phone}\n`
              + `🎉 *نوع المناسبة:* ${type}\n`
              + `📅 *تاريخ المناسبة:* ${date}\n`
              + `🏛️ *المكان / الفندق:* ${venue || 'يحدد لاحقاً'}\n`
              + `👥 *عدد الطاولات / الحضور المتوقع:* ${guests || 'غير محدد'}\n`
              + `📝 *تفاصيل ورؤية الثيم المطلوب:* ${notes || 'يرجى التواصل لتنسيق التفاصيل'}\n`
              + `───────────────────\n`
              + `✨ طلب حجز رسمي عبر الموقع الإلكتروني`;
    } else {
      message = `👑 *VIP EVENT & WEDDING FLORAL STYLING - HAYAH FLOWERS* 👑\n`
              + `───────────────────\n`
              + `👤 *Client Name / Org:* ${name}\n`
              + `📱 *WhatsApp Phone:* ${phone}\n`
              + `🎉 *Event Type:* ${type}\n`
              + `📅 *Event Date:* ${date}\n`
              + `🏛️ *Venue / Hotel:* ${venue || 'TBD'}\n`
              + `👥 *Estimated Guests / Tables:* ${guests || 'N/A'}\n`
              + `📝 *Design Vision & Notes:* ${notes || 'Please contact for consultation'}\n`
              + `───────────────────\n`
              + `✨ Submitted via HAYAH FLOWERS Online Atelier`;
    }

    openWhatsApp(message);
    showToast(isRTL ? 'تم تجهيز طلب الحجز وإرساله للواتساب!' : 'Reservation sent to WhatsApp!', '👑');
  }

  // Ambient Floating Petals Background Canvas
  function initAmbientPetals() {
    const canvas = document.getElementById('petals-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    });

    const petals = [];
    const petalCount = 22; // Delicate, subtle amount

    for (let i = 0; i < petalCount; i++) {
      petals.push({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 5 + Math.random() * 8,
        speedX: -0.4 + Math.random() * 0.8,
        speedY: 0.5 + Math.random() * 0.9,
        angle: Math.random() * Math.PI * 2,
        angularSpeed: (Math.random() - 0.5) * 0.02,
        color: Math.random() > 0.4 ? 'rgba(212, 175, 55, 0.22)' : 'rgba(230, 211, 163, 0.28)'
      });
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);

      petals.forEach(p => {
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.fillStyle = p.color;
        ctx.beginPath();
        // Ellipse shape petal
        ctx.ellipse(0, 0, p.r * 1.5, p.r * 0.8, 0, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.angularSpeed;

        if (p.y > height + 20) {
          p.y = -20;
          p.x = Math.random() * width;
        }
        if (p.x > width + 20) p.x = -20;
        if (p.x < -20) p.x = width + 20;
      });

      requestAnimationFrame(draw);
    }

    requestAnimationFrame(draw);
  }

  // Initialize Global Listeners & Controls
  function init() {
    // Apply initial state
    applyTheme(state.theme);
    applyLanguage(state.lang);
    updateCartBadge();
    initAmbientPetals();

    // Theme Toggle
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => {
        applyTheme(state.theme === 'dark' ? 'light' : 'dark');
      });
    }

    // Language Toggle
    const langBtn = document.getElementById('lang-toggle-btn');
    if (langBtn) {
      langBtn.addEventListener('click', () => {
        applyLanguage(state.lang === 'ar' ? 'en' : 'ar');
      });
    }

    // Cart Drawer Open/Close
    const openCartBtn = document.getElementById('open-cart-btn');
    const closeCartBtn = document.getElementById('close-cart-btn');
    const cartOverlay = document.getElementById('cart-overlay');
    const clearCartBtn = document.getElementById('clear-cart-btn');
    const cartCheckoutBtn = document.getElementById('cart-checkout-btn');

    if (openCartBtn) openCartBtn.addEventListener('click', () => toggleCartDrawer(true));
    if (closeCartBtn) closeCartBtn.addEventListener('click', () => toggleCartDrawer(false));
    if (cartOverlay) cartOverlay.addEventListener('click', () => toggleCartDrawer(false));
    if (clearCartBtn) clearCartBtn.addEventListener('click', clearCart);
    if (cartCheckoutBtn) cartCheckoutBtn.addEventListener('click', checkoutCartWhatsApp);

    // Quick View Modal Close
    const closeModalBtn = document.getElementById('modal-close-btn');
    const modalOverlay = document.getElementById('quick-view-modal');
    if (closeModalBtn) closeModalBtn.addEventListener('click', closeQuickViewModal);
    if (modalOverlay) {
      modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) closeQuickViewModal();
      });
    }

    // Modal Qty controls & Actions
    const modalQtyInc = document.getElementById('modal-qty-inc');
    const modalQtyDec = document.getElementById('modal-qty-dec');
    const modalQtyInput = document.getElementById('modal-qty-input');
    const modalAddToCartBtn = document.getElementById('modal-add-to-cart-btn');
    const modalOrderWhatsAppBtn = document.getElementById('modal-order-wa-btn');

    if (modalQtyInc && modalQtyInput) {
      modalQtyInc.addEventListener('click', () => {
        modalQtyInput.value = parseInt(modalQtyInput.value || 1) + 1;
      });
    }
    if (modalQtyDec && modalQtyInput) {
      modalQtyDec.addEventListener('click', () => {
        const val = parseInt(modalQtyInput.value || 1);
        if (val > 1) modalQtyInput.value = val - 1;
      });
    }

    if (modalAddToCartBtn) {
      modalAddToCartBtn.addEventListener('click', () => {
        if (!state.activeProductModal) return;
        const qty = parseInt(modalQtyInput?.value || 1);
        const note = document.getElementById('modal-card-note')?.value.trim() || '';
        addToCart(state.activeProductModal.id, qty, note);
        closeQuickViewModal();
      });
    }

    if (modalOrderWhatsAppBtn) {
      modalOrderWhatsAppBtn.addEventListener('click', () => {
        if (!state.activeProductModal) return;
        const qty = parseInt(modalQtyInput?.value || 1);
        const note = document.getElementById('modal-card-note')?.value.trim() || '';
        directWhatsAppOrder(state.activeProductModal.id, qty, note);
        closeQuickViewModal();
      });
    }

    // Category Filter Buttons
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        state.activeCategory = btn.getAttribute('data-category') || 'all';
        renderCatalog();
      });
    });

    // Mobile Menu Toggle
    const mobileMenuBtn = document.getElementById('mobile-menu-btn');
    const navMenu = document.getElementById('nav-menu');
    if (mobileMenuBtn && navMenu) {
      mobileMenuBtn.addEventListener('click', () => {
        navMenu.classList.toggle('open');
      });
      navMenu.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => navMenu.classList.remove('open'));
      });
    }

    // Bespoke Studio Builder - Flower Chips
    document.querySelectorAll('.flower-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        const flower = chip.getAttribute('data-flower');
        if (state.builder.flowers.includes(flower)) {
          if (state.builder.flowers.length > 1) {
            state.builder.flowers = state.builder.flowers.filter(f => f !== flower);
            chip.classList.remove('active');
          } else {
            showToast(state.lang === 'ar' ? 'يرجى اختيار نوع زهور واحد على الأقل' : 'Select at least one flower variety', '🌸');
          }
        } else {
          state.builder.flowers.push(flower);
          chip.classList.add('active');
        }
      });
    });

    // Bespoke Studio Builder - Wrap Chips
    document.querySelectorAll('.wrap-chip').forEach(chip => {
      chip.addEventListener('click', () => {
        document.querySelectorAll('.wrap-chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        state.builder.wrap = chip.getAttribute('data-wrap') || 'black';
      });
    });

    // Bespoke Studio Builder - Greeting Card Inputs Live Preview
    const cardRecipientInput = document.getElementById('builder-recipient');
    const cardSenderInput = document.getElementById('builder-sender');
    const cardMsgInput = document.getElementById('builder-card-msg');

    if (cardRecipientInput) {
      cardRecipientInput.addEventListener('input', (e) => {
        state.builder.recipient = e.target.value;
        updateBuilderPreview();
      });
    }
    if (cardSenderInput) {
      cardSenderInput.addEventListener('input', (e) => {
        state.builder.sender = e.target.value;
        updateBuilderPreview();
      });
    }
    if (cardMsgInput) {
      cardMsgInput.addEventListener('input', (e) => {
        state.builder.message = e.target.value;
        updateBuilderPreview();
      });
    }

    // Bespoke Studio Submit
    const builderSubmitBtn = document.getElementById('builder-submit-btn');
    if (builderSubmitBtn) {
      builderSubmitBtn.addEventListener('click', submitBespokeWhatsApp);
    }

    // Event Reservation Form Submit
    const eventForm = document.getElementById('event-booking-form');
    if (eventForm) {
      eventForm.addEventListener('submit', submitEventWhatsApp);
    }

    // Check for direct section query param for instant jump / screenshots
    const urlParams = new URLSearchParams(window.location.search);
    const targetSection = urlParams.get('section');
    if (targetSection) {
      const el = document.getElementById(targetSection);
      if (el) {
        window.scrollTo({ top: el.offsetTop, behavior: 'instant' });
      }
    }
  }

  // Run on DOM Ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
