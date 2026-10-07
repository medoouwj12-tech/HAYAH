# HAYAH FLOWERS (حياة فلاورز) 🌸
### Haute Floristry & Luxury Floral Couture Web Application

An ultra-luxurious, dynamic, and fully responsive E-Commerce web platform built specifically for **HAYAH FLOWERS**, featuring complete bilingual Arabic (RTL) & English (LTR) support, dark/light theme persistence, interactive bespoke bouquet builder, VIP event reservations, and dynamic checkout flows integrated directly with WhatsApp (**+201141519896**).

---

## 💎 Exclusive Brand Privilege & Pricing
* **All Signature Products are priced at 150 EGP (150 ج.م)** as per brand promotion (`وسعر كل اللى موجود دلوقتى ب 150 جنيه`).
* Includes complimentary luxury packaging with golden hot-foil accents and personalized wax-sealed greeting stationery.

---

## 🎨 Design & Aesthetic Architecture
1. **Brand Luxury Palette (Derived from the Brand Logo)**:
   - **Primary Accent**: Metallic Champagne Gold (`#D4AF37` / `#C5A059`)
   - **Secondary Accent**: Soft Cream Gold (`#E6D3A3` / `#F7EFCF`)
   - **Dark Mode Background**: Deep Obsidian Charcoal (`#0E0E10` / `#141416`)
   - **Light Mode Background**: Soft Warm Cream (`#FDFBF7` / `#FAF8F2`)
   - **Glassmorphism**: Translucent frosted panels with golden hairline borders and ambient backdrop blur.
2. **Typography**:
   - **Headings**: *Cormorant Garamond* & *Playfair Display* (Latin), *Amiri* (Arabic).
   - **Body**: *Tajawal* (Arabic) & *Inter* (Latin).
3. **Micro-Interactions & Visual Effects**:
   - Canvas-driven delicate golden petal animation floating smoothly in the background.
   - Smooth image magnification micro-interactions upon card hover.
   - Gilded wax seal mockup with live greeting card preview.
   - Fast, accessible modal windows and slide-over shopping bag drawer.

---

## 📁 Local Assets & Media Rule Compliance
* **Zero external image dependencies**: No placeholders or external CDNs used for flower photography.
* **100% Local Project Assets**:
  - `assets/images/logo.jpg` - Official Brand Identity Logo.
  - `assets/images/catalog/bouquet-01.jpg` to `bouquet-67.jpg` - New white-background bouquet catalog photography.

---

## 🌐 Core Features & Functionalities

### 1. Bilingual System (i18n & RTL/LTR)
- Instant toggle between **العربية (RTL)** and **English (LTR)**.
- Automatically adjusts document direction (`dir="rtl"` vs `dir="ltr"`), typography, alignment, and translation strings across all modules.

### 2. Luxury Theme Switcher
- Smooth toggle between **Dark Obsidian Mode** and **Light Cream Mode**.
- Saved automatically to browser `localStorage`.

### 3. Direct WhatsApp Ordering & Reservation System (`+201141519896`)
Every order button across the application automatically formats and launches an official WhatsApp message to **`+201141519896`** containing:
- Customer Name & Contact Phone
- Product / Bouquet Title & Quantity
- Custom Greeting Card Note
- Preferred Delivery Date & Time
- Total Amount in EGP (at 150 EGP each)

### 4. Interactive Bespoke Arrangement Studio ("صمم باقتك")
- Step 1: Select preferred flower varieties (Red Roses, Lilies, Orchids, Tulips, Peonies, Gypsophila).
- Step 2: Choose signature luxury wrap style (Obsidian Black, Metallic Gold, Silk White, Blush Velvet, Emerald Green).
- Step 3: Enter recipient name, sender name, and sentiment note with **live interactive greeting card preview** and royal wax seal stamp.
- Step 4: Schedule delivery date & time and send customized arrangement directly via WhatsApp.

### 5. VIP Wedding & Event Floral Reservations
- Dedicated reservation module for royal wedding ceremonies, engagement celebrations, luxury corporate galas, and VIP private dinners.
- Direct booking submission to **`+201141519896`**.

### 6. Shopping Bag Drawer
- Full cart experience with quantity controls, subtotal calculation, quick delivery information form, and one-click WhatsApp order finalization.

---

## 🚀 How to Run the Project Locally

### Option 1: Direct File Open
Simply double-click `index.html` in Windows Explorer or open it in any browser (`Chrome`, `Edge`, `Firefox`, `Safari`). All assets and scripts are optimized for zero-server operation.

### Option 2: Using Node.js / NPM (Recommended for live dev)
```bash
npm run dev
# Or
npx serve . -l 3000
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### Option 3: Using Python
```bash
python -m http.server 3000
```
Open [http://localhost:3000](http://localhost:3000).

## 🛠️ Product Admin & Supabase Setup

Open the dashboard at [http://localhost:3000/admin.html](http://localhost:3000/admin.html) after starting the local server. It supports adding, editing, searching, filtering, publishing, and deleting products, including Arabic and English names, descriptions, flower details, care instructions, prices, badges, ratings, and images.

The dashboard works in **local mode** out of the box and saves changes in this browser. To share the catalog between devices using Supabase:

1. Run `supabase/setup.sql` in your Supabase project's SQL Editor.
2. Create an Auth user for the store administrator. In Supabase, copy that user's UUID and run the `insert into public.admin_users ...` statement at the end of the setup script.
3. Add your Supabase project URL and publishable/anon key to `assets/js/supabase-config.js`. Never put the `service_role` key in browser code.
4. Sign in at `/admin.html`. Use the **Import default products** button once to import the 67-product white-background photo catalog into Supabase and replace the original product images. Product images can be uploaded to the configured `product-images` bucket from the editor.

Row Level Security in the SQL setup allows public visitors to read published products and only users listed in `admin_users` to edit products or upload images. Keep Supabase Auth sign-up disabled for a private admin account, or only grant access by explicitly adding the user's UUID to `admin_users`.

---

## 📂 Project Structure
```
d:\HAYAH\
├── index.html                  # Master application markup
├── package.json                # Project scripts & metadata
├── README.md                   # Documentation & setup guide
├── assets\
│   ├── css\
│   │   └── style.css           # Luxury design system & styling
│   ├── js\
│   │   ├── products.js         # Curated 67-bouquet catalog dataset
│   │   ├── i18n.js             # Arabic & English translation dictionary
│   │   └── app.js              # Application state, cart, WhatsApp generator & UI
│   └── images\
│       ├── logo.jpg            # Brand logo
│       ├── catalog\            # Bouquet catalog photos 01 through 67
│       └── ...
```

---
© 2026 **HAYAH FLOWERS**. All Rights Reserved. Haute Floristry • Cairo, Egypt.
