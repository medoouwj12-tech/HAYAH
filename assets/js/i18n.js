// HAYAH FLOWERS - Bilingual Translation Dictionary (EN & AR)

const TRANSLATIONS = {
  en: {
    // Top Bar & Navigation
    topBarAnnouncement: "✨ Exclusive Luxury Offer: All Signature Arrangements at 150 EGP | Same-Day Delivery Across Cairo & Giza",
    brandName: "HAYAH FLOWERS",
    brandTagline: "Haute Floristry & Bespoke Blooms",
    navHome: "Home",
    navShop: "Catalog",
    navCustom: "Bespoke Studio",
    navEvents: "Event Booking",
    navAbout: "Our Story",
    navContact: "Contact",
    themeToggle: "Theme",
    cartLabel: "Bag",

    // Hero Section
    heroBadge: "The Art of Haute Floristry",
    heroTitle: "Elegance in Every Petal",
    heroSubtitle: "Handcrafted floral couture designed for life’s most exquisite moments. Experience timeless beauty, hand-delivered with aristocratic refinement.",
    heroPriceCallout: "Exclusive Limited Privilege: All Signature Arrangements Now 150 EGP",
    heroBtnShop: "Explore Catalog",
    heroBtnCustom: "Create Bespoke Bloom",
    heroBtnEvents: "VIP Event Florals",
    
    // Stats & Guarantees
    stat1Number: "100%",
    stat1Label: "Fresh Premium Blooms",
    stat2Number: "2-Hour",
    stat2Label: "Express Cairo Delivery",
    stat3Number: "150 EGP",
    stat3Label: "Exclusive Special Price",
    stat4Number: "5.0 ★",
    stat4Label: "Discerning VIP Clients",

    // Section Headers
    catalogSectionTitle: "The Curated Collection",
    catalogSectionSubtitle: "Each bouquet is a bespoke masterpiece of fragrance, harmony, and visual majesty.",
    catalogPromoBanner: "✨ Special Brand Promotion: Every piece is currently available for just 150 EGP (Regularly up to 490 EGP)!",
    
    // Filters & Sorting
    filterAll: "All Arrangements",
    filterBoxes: "Luxury Boxes",
    filterBridal: "Bridal Bouquets",
    filterVases: "Flower Vases",
    filterEternal: "Eternal Roses",

    // Product Card
    egp: "EGP",
    originalPriceLabel: "Was",
    btnQuickView: "Quick View",
    btnAddToCart: "Add to Bag",
    btnOrderWhatsApp: "Order via WhatsApp",
    specialPriceBadge: "Special: 150 EGP",

    // Quick View Modal
    modalComposition: "Floral Composition:",
    modalCare: "Care Instructions:",
    modalCardNotePlaceholder: "Write your greeting card note here...",
    modalCardNoteLabel: "Custom Greeting Card Note (Included):",
    modalQuantity: "Quantity:",
    modalClose: "Close",

    // Bespoke Studio / Custom Arrangement
    builderSectionTitle: "Bespoke Arrangement Studio",
    builderSectionSubtitle: "Compose your own signature floral statement in 4 refined steps.",
    step1Title: "1. Select Flower Varieties",
    step1Desc: "Choose the dominant blooms for your arrangement:",
    flowerRoses: "Royal Velvet Red Roses",
    flowerLilies: "Pure White Lilies",
    flowerOrchids: "Exotic Phalaenopsis Orchids",
    flowerTulips: "Dutch Pastel Tulips",
    flowerPeonies: "Blush Peonies",
    flowerGypsophila: "Cloud Gypsophila (Baby's Breath)",

    step2Title: "2. Luxury Wrapping & Packaging",
    step2Desc: "Select your preferred signature presentation:",
    wrapBlack: "Matte Obsidian Black with Gold Trim",
    wrapGold: "Champagne Metallic Gilded Foil",
    wrapWhite: "Pure White Silk Paper & Satin Bow",
    wrapPink: "Soft Blush Powder Velvet Finish",
    wrapEmerald: "Royal Emerald Green & Gold Cord",

    step3Title: "3. Complimentary Greeting Card",
    step3Desc: "Personalize your sentiment with an embossed wax-sealed card:",
    cardSenderName: "Your Name",
    cardRecipientName: "Recipient's Name",
    cardMessagePlaceholder: "e.g., Wishing you a day as radiant and enchanting as these blooms...",
    cardPreviewTitle: "Live Greeting Card Preview",
    cardSealText: "HAYAH SEAL OF ELEGANCE",

    step4Title: "4. Delivery Details & Direct WhatsApp Booking",
    step4Desc: "We will craft and hand-deliver your bespoke bloom at your preferred schedule:",
    inputPhone: "Phone Number (WhatsApp)",
    inputAddress: "Delivery Address / Area (e.g. New Cairo, Zamalek, Maadi)",
    inputDate: "Preferred Delivery Date",
    inputTime: "Preferred Delivery Time",
    builderPriceLabel: "Special Price for Bespoke Crafting:",
    btnSubmitBuilderWhatsApp: "Order Custom Bouquet via WhatsApp",

    // Event & Wedding Florals Section
    eventsSectionTitle: "VIP Wedding & Event Floral Styling",
    eventsSectionSubtitle: "From grand royal weddings to private gala soirees, our floral architects bring your fairytale to life.",
    eventsFormTitle: "Reserve a Consultation with our Master Florist",
    eventTypeLabel: "Event Type:",
    eventWedding: "Royal Wedding Ceremony",
    eventEngagement: "Engagement Celebration",
    eventCorporate: "Corporate Luxury Gala",
    eventPrivateDinner: "Private VIP Dinner / Anniversary",
    eventNameLabel: "Your Name / Organization",
    eventPhoneLabel: "WhatsApp Phone Number",
    eventDateLabel: "Event Date",
    eventVenueLabel: "Venue / City (e.g. Four Seasons Cairo, Nile Ritz-Carlton)",
    eventGuestsLabel: "Estimated Table / Guest Count",
    eventNotesLabel: "Floral Theme, Desired Color Palette & Notes",
    eventNotesPlaceholder: "Describe your vision, color preferences, or specific arrangements needed...",
    btnSubmitEventWhatsApp: "Send Event Reservation via WhatsApp (+201141519896)",

    // Cart Drawer
    cartTitle: "Your Floral Bag",
    cartEmpty: "Your bag is empty. Explore our 150 EGP curated creations.",
    cartSubtotal: "Subtotal:",
    cartDeliveryPromo: "Free luxury greeting card & packaging included.",
    cartCheckoutBtn: "Checkout via WhatsApp",
    cartNamePlaceholder: "Your Full Name",
    cartPhonePlaceholder: "Your WhatsApp Phone",
    cartAddressPlaceholder: "Delivery Address & City",
    cartDatePlaceholder: "Preferred Delivery Date & Time",
    cartCardNotePlaceholder: "Order Greeting Card Message (Optional)",
    cartClear: "Clear Bag",

    // About Section
    aboutSectionTitle: "The Essence of HAYAH",
    aboutSectionSubtitle: "Where nature's fragile beauty meets the enduring majesty of luxury design.",
    aboutParagraph1: "Founded on the timeless belief that every flower speaks a language of poetic prestige, HAYAH FLOWERS transforms freshly picked international blooms into bespoke floral sculptures.",
    aboutParagraph2: "Our master floral artisans curate every petal by hand, harmonizing texture, fragrance, and palette with haute couture packaging, gold accents, and personalized calligraphic cards.",
    aboutFeature1Title: "Artisanal Selection",
    aboutFeature1Desc: "Hand-picked daily from premier Dutch and Ecuadorian growers.",
    aboutFeature2Title: "Bespoke Packaging",
    aboutFeature2Desc: "Signature boxes, embossed ribbons, and royal wax seal finishing.",
    aboutFeature3Title: "White-Glove Delivery",
    aboutFeature3Desc: "Climate-controlled delivery ensuring peak fresh bloom upon arrival.",

    // Footer
    footerAbout: "HAYAH FLOWERS is Cairo’s premier haute floristry atelier, dedicated to crafting transcendent moments through floral artistry and royal elegance.",
    footerLinksTitle: "Quick Navigation",
    footerHoursTitle: "Concierge & Hours",
    footerHoursText: "Daily: 10:00 AM - 11:00 PM\nExpress Delivery: 7 Days a Week",
    footerContactTitle: "Direct Inquiries",
    footerPhone: "+201141519896",
    footerAddress: "Cairo & Giza, Egypt | Delivery Nationwide",
    footerRights: "© 2026 HAYAH FLOWERS. All Rights Reserved. Luxury Floral Couture.",
    floatingWhatsAppTooltip: "Chat with Florist Concierge"
  },
  ar: {
    // Top Bar & Navigation
    topBarAnnouncement: "✨ عرض خاص وحصري: جميع التنسيقات الفاخرة بسعر 150 ج.م فقط | توصيل فوري في القاهرة والجيزة",
    brandName: "HAYAH FLOWERS",
    brandTagline: "زهور فاخرة وتنسيقات ملكية استثنائية",
    navHome: "الرئيسية",
    navShop: "التشكيلة الفاخرة",
    navCustom: "صمم باقتك",
    navEvents: "حجز المناسبات والأعراس",
    navAbout: "قصتنا",
    navContact: "تواصل معنا",
    themeToggle: "المظهر",
    cartLabel: "الحقيبة",

    // Hero Section
    heroBadge: "فخامة تليق بأرقى اللحظات",
    heroTitle: "الأناقة في كل بتلة",
    heroSubtitle: "تنسيقات زهور ملكية مصممة يدويًا بحب وإتقان لتخليد أثمن لحظاتكم. تجربة إهداء تفوق التوقعات بلمسات ذهبية عريقة.",
    heroPriceCallout: "عرض محدود: جميع التنسيقات المعروضة الآن بسعر 150 جنيه فقط!",
    heroBtnShop: "تصفح التشكيلة الفاخرة",
    heroBtnCustom: "صمم باقتك بنفسك",
    heroBtnEvents: "زهور الأعراس والمناسبات",

    // Stats & Guarantees
    stat1Number: "100%",
    stat1Label: "زهور طبيعية نضرة",
    stat2Number: "خلال ساعتين",
    stat2Label: "توصيل سريع بالقاهرة والجيزة",
    stat3Number: "150 ج.م",
    stat3Label: "سعر موحد استثنائي",
    stat4Number: "5.0 ★",
    stat4Label: "تقييم نخبة عملائنا",

    // Section Headers
    catalogSectionTitle: "المجموعة المختارة الفاخرة",
    catalogSectionSubtitle: "كل بوكيه هو لوحة فنية ساحرة تنبض بالشذى والرقي وتأسر القلوب من النظرة الأولى.",
    catalogPromoBanner: "✨ عرض خاص لجميع العملاء: كل المعروضات متوفرة حالياً بسعر 150 جنيه فقط (بدلاً من أسعار تصل إلى 490 ج.م)!",

    // Filters & Sorting
    filterAll: "جميع التنسيقات",
    filterBoxes: "بوكسات فاخرة",
    filterBridal: "باقات العروس",
    filterVases: "فازات الورد",
    filterEternal: "ورد دائم ومميز",

    // Product Card
    egp: "ج.م",
    originalPriceLabel: "بدلاً من",
    btnQuickView: "نظرة سريعة",
    btnAddToCart: "أضف للحقيبة",
    btnOrderWhatsApp: "اطلب عبر الواتساب",
    specialPriceBadge: "عرض خاص: 150 ج.م",

    // Quick View Modal
    modalComposition: "مكونات التنسيق الفاخر:",
    modalCare: "إرشادات الحفاظ على نضارة الزهور:",
    modalCardNotePlaceholder: "اكتب رسالة الإهداء الخاصة بك هنا...",
    modalCardNoteLabel: "نص كرت الإهداء الفاخر (مجاناً):",
    modalQuantity: "الكمية:",
    modalClose: "إغلاق",

    // Bespoke Studio / Custom Arrangement
    builderSectionTitle: "استوديو التنسيق الخاص (صمم باقتك)",
    builderSectionSubtitle: "ابتكر تحفتك الزهرية الخاصة خطوة بخطوة بكل دقة وفخامة تليق بذوقك الرفيع.",
    step1Title: "1. اختر أنواع الزهور المفضلة",
    step1Desc: "حدد الزهور الأساسية التي ترغب في تضمينها داخل الباقة:",
    flowerRoses: "ورد جوري أحمر ملكي مخملي",
    flowerLilies: "زنابق الليليوم البيضاء النقية",
    flowerOrchids: "أوركيد الفالينوبسيس الإمبراطوري",
    flowerTulips: "توليب هولندي درجات الباستيل",
    flowerPeonies: "بيوني زهري مفعم بالأنوثة",
    flowerGypsophila: "بيبي بريث (جيبسوفيلا) سحابي ناعم",

    step2Title: "2. نمط ولون التغليف الملكي",
    step2Desc: "اختر أسلوب التغليف الذي يمنح باقتك الفخامة المطلقة:",
    wrapBlack: "أسود ملكي مطفي مع حواف مذهبة",
    wrapGold: "ورق ميتاليك شمبانيا ذهبي عاكس",
    wrapWhite: "حرير أبيض عاجي نقي مع فيونكة ستان",
    wrapPink: "مخمل بودري هادئ شديد الرقة",
    wrapEmerald: "أخضر زمردي فاخر مع حبال ذهبية",

    step3Title: "3. كرت الإهداء الملكي المجاني",
    step3Desc: "أضف لمستك الوجدانية بكرت مختوم بختم الشمع الملكي:",
    cardSenderName: "اسم الراسل (أو اتركه سراً)",
    cardRecipientName: "اسم متلقي الهدية",
    cardMessagePlaceholder: "مثال: إلى من تُزهر الحياة بوجودهم.. كل عام وأنتِ أرق من الورد...",
    cardPreviewTitle: "معاينة كرت الإهداء المباشرة",
    cardSealText: "HAYAH FLOWERS • ختم الفخامة",

    step4Title: "4. بيانات التوصيل والإرسال الفوري للواتساب",
    step4Desc: "سنقوم بتجهيز باقتك وتسليمها بأعلى معايير الرقي في موعدك المحدد:",
    inputPhone: "رقم الهاتف للتواصل (واتساب)",
    inputAddress: "عنوان التوصيل والمنطقة (مثل: التجمع الخامس، الزمالك، المعادي، الشيخ زايد...)",
    inputDate: "تاريخ التوصيل المطلوب",
    inputTime: "الوقت المفضل للتسليم",
    builderPriceLabel: "السعر الحصري للتنسيق المخصص:",
    btnSubmitBuilderWhatsApp: "إرسال وتأكيد التصميم عبر الواتساب",

    // Event & Wedding Florals Section
    eventsSectionTitle: "تنسيق زهور الأفراح والمناسبات الكبرى (VIP)",
    eventsSectionSubtitle: "من حفلات الزفاف الأسطورية إلى الفعاليات الخاصة، مهندسو الزهور لدينا يحولون مناسبتكم إلى تحفة خيالية.",
    eventsFormTitle: "حجز استشارة خاصة وتنسيق زهور المناسبات",
    eventTypeLabel: "نوع المناسبة الفاخرة:",
    eventWedding: "حفل زفاف ملكي كامل (كوشة، قاعة، باقة)",
    eventEngagement: "حفل خطوبة راقٍ",
    eventCorporate: "مؤتمر أو حفل تكريم شركات VIP",
    eventPrivateDinner: "عشاء خاص / ذكرى سنوية رومانسية",
    eventNameLabel: "اسم صاحب الحجز / الجهة",
    eventPhoneLabel: "رقم الهاتف (الواتساب)",
    eventDateLabel: "تاريخ المناسبة",
    eventVenueLabel: "مكان الحفل (الفندق / القاعة / الفيلا)",
    eventGuestsLabel: "العدد التقريبي للطاولات أو المدعوين",
    eventNotesLabel: "رؤيتكم للمناسبة وتفاصيل الألوان المطلوبة",
    eventNotesPlaceholder: "اكتب تفاصيل الزهور، ألوان الثيم، أو أي طلبات خاصة تود منا تنفيذها...",
    btnSubmitEventWhatsApp: "إرسال طلب حجز المناسبة عبر الواتساب (+201141519896)",

    // Cart Drawer
    cartTitle: "حقيبة الزهور الفاخرة",
    cartEmpty: "حقيبتك فارغة حالياً. اكتشف باقاتنا الحصرية بـ 150 ج.م فقط.",
    cartSubtotal: "المجموع الكلي:",
    cartDeliveryPromo: "يشمل التغليف الملكي وكرت الإهداء الفاخر مجاناً.",
    cartCheckoutBtn: "إتمام الطلب وتأكيده عبر الواتساب",
    cartNamePlaceholder: "الاسم بالكامل",
    cartPhonePlaceholder: "رقم الهاتف للتواصل",
    cartAddressPlaceholder: "عنوان التوصيل والمدينة",
    cartDatePlaceholder: "تاريخ ووقت التوصيل المفضل",
    cartCardNotePlaceholder: "نص كرت الإهداء (اختياري)",
    cartClear: "إفراغ الحقيبة",

    // About Section
    aboutSectionTitle: "جوهر علامة HAYAH",
    aboutSectionSubtitle: "حيث تلتقي رقة الطبيعة بأرفع درجات الفخامة والأناقة الأبدية.",
    aboutParagraph1: "انطلقت علامة HAYAH FLOWERS من إيمان عميق بأن كل زهرة تختصر في بتلاتها قصة حب واعتزاز وامتنان. نحن لا نبيع زهوراً، بل نصنع ذكريات لا تُمحى.",
    aboutParagraph2: "يختار خبراؤنا أجود الزهور المستوردة من مزارع هولندا والإكوادور كل صباح، لتُنسق بمهارة يدوية مع بوكسات مطرزة، أشرطة حريرية مذهبة، وأختام شمعية تليق بأصحاب الذوق الرفيع.",
    aboutFeature1Title: "زهور مستوردة نخب أول",
    aboutFeature1Desc: "انتقاء يومي دقيق لأجود أنواع الورد الهولندي والإكوادوري لضمان أعلى نضارة.",
    aboutFeature2Title: "تغليف استثنائي فاخر",
    aboutFeature2Desc: "بوكسات مخملية، لمسات ذهبية عاكسة، وأشرطة حريرية تحمل هوية العلامة.",
    aboutFeature3Title: "توصيل مميز في سيارات مجهزة",
    aboutFeature3Desc: "نقل في بيئة مكيفة ومحمية لتصل الزهور في أبهى حالاتها كأنها قُطفت للتو.",

    // Footer
    footerAbout: "HAYAH FLOWERS هي دار تصميم الزهور الفاخرة الأولى في القاهرة، مكرسة لإحياء أسمى اللحظات بلمسات راقية وتنسيقات ملكية استثنائية.",
    footerLinksTitle: "روابط سريعة",
    footerHoursTitle: "ساعات العمل والمساعدة",
    footerHoursText: "يومياً: من 10:00 صباحاً حتى 11:00 مساءً\nالتوصيل متاح طوال أيام الأسبوع",
    footerContactTitle: "التواصل المباشر",
    footerPhone: "+201141519896",
    footerAddress: "القاهرة والجيزة، مصر | التوصيل متاح لجميع المناطق",
    footerRights: "© 2026 جميع الحقوق محفوظة لـ HAYAH FLOWERS. فن تصميم الزهور الملكية.",
    floatingWhatsAppTooltip: "محادثة فورية مع منسق الزهور"
  }
};

if (typeof window !== "undefined") {
  window.HAYAH_TRANSLATIONS = TRANSLATIONS;
}

if (typeof module !== "undefined" && module.exports) {
  module.exports = { TRANSLATIONS };
}
