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
  - `assets/images/bouquet-1.jpg` to `bouquet-11.jpg` - High-resolution original bouquet catalog photography.

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
│   │   ├── products.js         # Curated 11-bouquet catalog dataset (150 EGP)
│   │   ├── i18n.js             # Arabic & English translation dictionary
│   │   └── app.js              # Application state, cart, WhatsApp generator & UI
│   └── images\
│       ├── logo.jpg            # Brand logo
│       ├── bouquet-1.jpg       # Bouquet catalog photos 1 through 11
│       └── ...
```

---
© 2026 **HAYAH FLOWERS**. All Rights Reserved. Haute Floristry • Cairo, Egypt.
