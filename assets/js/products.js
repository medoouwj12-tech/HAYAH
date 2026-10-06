// HAYAH FLOWERS - Product Catalog Data
// All current items priced at 150 EGP as per brand promotion

const PRODUCTS = [
  {
    id: "hayah-01",
    image: "assets/images/bouquet-1.jpg",
    category: "luxury-boxes",
    price: 150,
    originalPrice: 380,
    rating: 5.0,
    reviewsCount: 52,
    badge: {
      en: "Best Seller",
      ar: "الأكثر طلباً"
    },
    name: {
      en: "Royal Velvet Noir Box",
      ar: "بوكس المخمل الملكي الأسود"
    },
    description: {
      en: "Deep crimson Dutch roses arranged meticulously in a bespoke matte luxury box with gold embossing and signature satin ribbon.",
      ar: "ورود حمراء هولندية فاخرة منسقة بعناية فائقة داخل بوكس مخملي أسود مذهب مع شريط ستان فاخر يحمل هوية حياة."
    },
    flowers: {
      en: "Premium Crimson Roses, Baby's Breath, Italian Ruscus",
      ar: "ورود جوري حمراء هولندية، بيبي بريث، أوراق الروسكوس الإيطالية"
    },
    care: {
      en: "Keep in a cool room away from direct heat. Water the floral foam lightly every 2 days.",
      ar: "يُحفظ في مكان بارد بعيداً عن أشعة الشمس المباشرة. يُسقى الإسفنج الداخلي برفق كل يومين."
    }
  },
  {
    id: "hayah-02",
    image: "assets/images/bouquet-2.jpg",
    category: "bridal",
    price: 150,
    originalPrice: 420,
    rating: 4.9,
    reviewsCount: 64,
    badge: {
      en: "Bridal Signature",
      ar: "توقيع العروس"
    },
    name: {
      en: "Princess Aurora Bridal Bouquet",
      ar: "باقة العروس الملكية أورورا"
    },
    description: {
      en: "Soft blush roses, ivory spray blooms, and delicate gypsophila designed for unforgettable bridal elegance on your special night.",
      ar: "توليفة ساحرة من الورود الزهرية الهادئة وزهور البيبي بريث النقية مصممة لتألق استثنائي ومبهر في ليلة العمر."
    },
    flowers: {
      en: "Blush Garden Roses, White Spray Roses, Gypsophila",
      ar: "ورد جوري بلش، بيبي روز أبيض، جيبسوفيلا ناعمة"
    },
    care: {
      en: "Trim stems slightly at an angle and keep in fresh water prior to your ceremony.",
      ar: "قص أطراف السيقان بزاوية مائلة وحفظها في ماء بارد ونقي قبل موعد الحفل."
    }
  },
  {
    id: "hayah-03",
    image: "assets/images/bouquet-3.jpg",
    category: "vases",
    price: 150,
    originalPrice: 390,
    rating: 4.9,
    reviewsCount: 41,
    badge: {
      en: "Luxury Crystal",
      ar: "كريستال فاخر"
    },
    name: {
      en: "Champagne Glow Vase Arrangement",
      ar: "فازة الشمبانيا الذهبية الفاخرة"
    },
    description: {
      en: "Warm golden-amber blooms in an artisan crystal vase, accented with golden foliage to enrich any prestigious living space.",
      ar: "أزهار دافئة بدرجات الشمبانيا المضيئة داخل فازة كريستال فاخرة، مزدانة بلمسات ذهبية تضفي هيبة وفخامة على المجلس."
    },
    flowers: {
      en: "Champagne Roses, Golden Statice, Preserved Foliage",
      ar: "ورود شمبانيا، ستاتيس مذهب، أعشاب طبيعية معالجة"
    },
    care: {
      en: "Change vase water every 48 hours for long-lasting vibrancy.",
      ar: "قم بتغيير ماء الفازة كل 48 ساعة لضمان استمرار نضارة الزهور لأطول فترة."
    }
  },
  {
    id: "hayah-04",
    image: "assets/images/bouquet-4.jpg",
    category: "eternal-roses",
    price: 150,
    originalPrice: 460,
    rating: 5.0,
    reviewsCount: 78,
    badge: {
      en: "Preserved 3+ Years",
      ar: "تدوم 3+ سنوات"
    },
    name: {
      en: "Eternal Scarlet Symphony",
      ar: "سيمفونية الورد القرمزي الدائم"
    },
    description: {
      en: "Hand-preserved everlasting scarlet roses that maintain their pristine velvety texture and beauty for years without water.",
      ar: "ورود قرمزية دائمة معالجة بأحدث التقنيات الأوروبية لتحتفظ بملمسها المخملي الطبيعي ورونقها لسنوات دون الحاجة للماء."
    },
    flowers: {
      en: "100% Real Preserved Ecuadorian Roses",
      ar: "ورود إكوادورية طبيعية 100% دائمة الحفظ"
    },
    care: {
      en: "No water required. Keep out of direct sunlight and high humidity.",
      ar: "لا تحتاج للماء إطلاقاً. تُحفظ بعيداً عن الرطوبة وأشعة الشمس المباشرة."
    }
  },
  {
    id: "hayah-05",
    image: "assets/images/bouquet-5.jpg",
    category: "bridal",
    price: 150,
    originalPrice: 400,
    rating: 4.8,
    reviewsCount: 39,
    badge: {
      en: "Pure Elegance",
      ar: "أناقة بيضاء"
    },
    name: {
      en: "Pure Serenity Orchid Bouquet",
      ar: "باقة النقاء الأبيض والأوركيد"
    },
    description: {
      en: "Pure white blooms, graceful orchids, and silver dollar eucalyptus tied with flowing silk champagne ribbons.",
      ar: "أزهار بيضاء نقية تتناغم مع لمسات الأوركيد وأوراق اليوكالبتوس المنسابة مع أشرطة حريرية شمبانيا فائقة النعومة."
    },
    flowers: {
      en: "White Lilies, Phalaenopsis Orchid, Eucalyptus",
      ar: "زنابق بيضاء، أوركيد فالينوبسيس، أوراق الكافور"
    },
    care: {
      en: "Store in a cool environment and spritz petals lightly with water mist.",
      ar: "يُحفظ في بيئة مكيفة ورش رذاذ خفيف من الماء على الأوراق عند الحاجة."
    }
  },
  {
    id: "hayah-06",
    image: "assets/images/bouquet-6.jpg",
    category: "vases",
    price: 150,
    originalPrice: 360,
    rating: 4.9,
    reviewsCount: 33,
    badge: {
      en: "Artisanal Vase",
      ar: "تحفة خزفية"
    },
    name: {
      en: "Opulent Pearl Vase Arrangement",
      ar: "تنسيق اللؤلؤ في فازة فخمة"
    },
    description: {
      en: "An architectural composition of ivory roses, hydrangeas, and soft foliage in an artisanal porcelain vase.",
      ar: "تكوين فني فخم يجمع زهور الهيدرانجيا والورد العاجي داخل فازة سيراميك بتشطيب لؤلؤي راقٍ."
    },
    flowers: {
      en: "White Hydrangea, Ivory Roses, Seeded Eucalyptus",
      ar: "هيدرانجيا بيضاء، ورد عاجي، يوكالبتوس بذور"
    },
    care: {
      en: "Add flower preservative powder to water and trim stems slightly.",
      ar: "أضف مغذي الزهور في الماء وقص أطراف السيقان كل 3 أيام."
    }
  },
  {
    id: "hayah-07",
    image: "assets/images/bouquet-7.jpg",
    category: "luxury-boxes",
    price: 150,
    originalPrice: 490,
    rating: 5.0,
    reviewsCount: 96,
    badge: {
      en: "Signature HAYAH",
      ar: "تحفة HAYAH الحصرية"
    },
    name: {
      en: "Imperial Ruby Grand Hatbox",
      ar: "بوكس الياقوت الإمبراطوري الملكي"
    },
    description: {
      en: "Over 30 hand-selected premium Grand Gala red roses crowned in a round gilded luxury hatbox with metallic gold accents.",
      ar: "أكثر من 30 وردة حمراء منتقاة يدويًا داخل بوكس دائري ملكي مذهب يحبس الأنفاس ويعبر عن أسمى معاني الفخامة."
    },
    flowers: {
      en: "Grade A+ Dutch Red Roses, Velvet Foliage",
      ar: "ورود جراند جالا حمراء نخب أول، أوراق مخملية"
    },
    care: {
      en: "Hydrate center oasis sponge with half a cup of water every 2 days.",
      ar: "قم بسكب نصف كوب ماء في منتصف إسفنجة البوكس كل يومين."
    }
  },
  {
    id: "hayah-08",
    image: "assets/images/bouquet-8.jpg",
    category: "eternal-roses",
    price: 150,
    originalPrice: 340,
    rating: 4.8,
    reviewsCount: 28,
    badge: {
      en: "Limited Edition",
      ar: "إصدار محدود"
    },
    name: {
      en: "Golden Twilight Preserved Bloom",
      ar: "زهرة الغسق الذهبي المحفوظة"
    },
    description: {
      en: "Specially preserved vintage roses complemented with natural pampas grass and champagne foil touches.",
      ar: "ورود فينتاج مجففة ومعالجة بعناية مع البامباس الطبيعي ولمسات ورق الذهب الخالص في تنسيق عصري."
    },
    flowers: {
      en: "Preserved Vintage Rose, Pampas Grass, Gold Accents",
      ar: "ورد فينتاج دائم، بامباس طبيعي، ورق ذهب"
    },
    care: {
      en: "Requires zero maintenance. Gently dust with a soft brush when needed.",
      ar: "لا تتطلب أي صيانة. يمكن إزالة الغبار بفرشاة ناعمة وجافة عند الحاجة."
    }
  },
  {
    id: "hayah-09",
    image: "assets/images/bouquet-9.jpg",
    category: "luxury-boxes",
    price: 150,
    originalPrice: 350,
    rating: 4.9,
    reviewsCount: 47,
    badge: {
      en: "Special Offer",
      ar: "عرض خاص"
    },
    name: {
      en: "Crimson Romance Square Box",
      ar: "بوكس الرومانسية القرمزية المربع"
    },
    description: {
      en: "A sleek luxury square box of scarlet roses paired with premium greeting stationery and wax gold seal.",
      ar: "بوكس مربع راقٍ من الورود القرمزية المنسقة مع كرت إهداء فاخر وختم الشمع المذهب لهدية استثنائية."
    },
    flowers: {
      en: "Scarlet Dutch Roses, Hypericum Berries, Ruscus",
      ar: "ورود حمراء نضرة، حبوب الهيبركوم، أوراق الروسكوس"
    },
    care: {
      en: "Keep in a cool room. Lightly hydrate foam daily.",
      ar: "يُحفظ في غرفة معتدلة البرودة مع ترطيب إسفنجة البوكس يومياً."
    }
  },
  {
    id: "hayah-10",
    image: "assets/images/bouquet-10.jpg",
    category: "bridal",
    price: 150,
    originalPrice: 390,
    rating: 4.9,
    reviewsCount: 43,
    badge: {
      en: "Romantic Choice",
      ar: "خيار رومانسي"
    },
    name: {
      en: "Blush Meadow Bridal Whisper",
      ar: "همس المروج الزهرية للعروس"
    },
    description: {
      en: "A romantic blend of pastel peach roses, carnations, and fresh greenery crafted for civil & luxury weddings.",
      ar: "مزيج شاعري من ورود الخوخ والقرنفل الزهري لتتويج إطلالة العروس بأرقى لمسة رومانسية تناسب كافة المناسبات."
    },
    flowers: {
      en: "Peach Roses, Pastel Carnations, Italian Ruscus",
      ar: "ورد دراقي، قرنفل باستيل، خضار إيطالي طبيعي"
    },
    care: {
      en: "Trim stems before use and place in cold water.",
      ar: "قص أطراف السيقان قبل الاستخدام وضعها في ماء بارد."
    }
  },
  {
    id: "hayah-11",
    image: "assets/images/bouquet-11.jpg",
    category: "eternal-roses",
    price: 150,
    originalPrice: 450,
    rating: 5.0,
    reviewsCount: 82,
    badge: {
      en: "VIP Exclusive",
      ar: "حصري للشخصيات الهامة"
    },
    name: {
      en: "Midnight Velvet Eclipse",
      ar: "كسوف المخمل الليلي الفاخر"
    },
    description: {
      en: "Dramatic deep burgundy and velvet dark roses in luxury black matte wrapping with gold silk rope.",
      ar: "ورود عنابية داكنة بتغليف أسود مطفي فاخر وحبال حريرية مذهبة تعكس الفخامة المطلقة والغموض الراقي."
    },
    flowers: {
      en: "Burgundy Velvet Roses, Black Baccara Rose, Gold Fern",
      ar: "ورود عنابية مخملية، ورد بلاك باكارا، سرخس مذهب"
    },
    care: {
      en: "Keep wrapped or transfer to an opaque luxury vase.",
      ar: "يمكن الاحتفاظ بها داخل التغليف الفاخر أو نقلها إلى فازة معتمة."
    }
  }
];

const CATEGORIES = [
  { id: "all", name: { en: "All Arrangements", ar: "جميع التنسيقات" } },
  { id: "luxury-boxes", name: { en: "Luxury Boxes", ar: "بوكسات فاخرة" } },
  { id: "bridal", name: { en: "Bridal Bouquets", ar: "باقات العروس" } },
  { id: "vases", name: { en: "Flower Vases", ar: "فازات الورد" } },
  { id: "eternal-roses", name: { en: "Eternal Roses", ar: "ورد دائم ومميز" } }
];

if (typeof window !== "undefined") {
  const defaultProducts = PRODUCTS.map(product => ({ ...product }));
  window.HAYAH_DEFAULT_PRODUCTS = defaultProducts;

  try {
    const savedProducts = JSON.parse(localStorage.getItem("hayah_products") || "null");
    if (Array.isArray(savedProducts)) {
      PRODUCTS.splice(0, PRODUCTS.length, ...savedProducts.filter(product => product && product.isActive !== false));
    }
  } catch (error) {
    console.warn("Could not read the locally saved product catalog.", error);
  }

  window.HAYAH_PRODUCTS = PRODUCTS;
  window.HAYAH_CATEGORIES = CATEGORIES;
  window.HAYAH_PRODUCTS_READY = (async () => {
    const config = window.HAYAH_SUPABASE_CONFIG;
    if (!config?.url || !config?.anonKey) return PRODUCTS;

    try {
      const table = encodeURIComponent(config.table || "products");
      const response = await fetch(`${config.url.replace(/\/$/, "")}/rest/v1/${table}?select=*&is_active=eq.true&order=created_at.desc`, {
        headers: { apikey: config.anonKey, Authorization: `Bearer ${config.anonKey}` },
        signal: AbortSignal.timeout(8000)
      });
      if (!response.ok) throw new Error(`Catalog request failed (${response.status}).`);
      const rows = await response.json();
      const remoteProducts = rows.map(row => ({
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
          care: row.care || { en: "", ar: "" }
      }));
      PRODUCTS.splice(0, PRODUCTS.length, ...remoteProducts);
    } catch (error) {
      console.warn("Using the built-in catalog because Supabase could not be reached.", error);
    }
    return PRODUCTS;
  })();
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { PRODUCTS, CATEGORIES };
}
