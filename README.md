# PANChNITY JEWELLERS - E-commerce Website

A production-ready Next.js e-commerce website for PANChNITY JEWELLERS / KARIGAR, specializing in silver temple idols, pooja items, and bhakti jewellery.

## Features

- 🏠 **Homepage** with brand introduction, trust points, and featured products
- 📦 **Product Listing** with search, filters, and category navigation
- 🎨 **Product Detail Pages** with interactive 3D model viewer
- 💬 **WhatsApp Integration** for direct product inquiries
- 🔍 **SEO Optimized** with metadata, Open Graph, and JSON-LD schema
- 📱 **Mobile-First** responsive design
- ⚡ **Performance Optimized** with Next.js Image and code splitting

## Tech Stack

- **Next.js 14** (App Router)
- **TypeScript**
- **Tailwind CSS** with custom theme
- **Three.js / React Three Fiber** for 3D product viewing
- **Lucide React** for icons

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn/pnpm

### Installation

1. Install dependencies:
```bash
npm install
# or
yarn install
# or
pnpm install
```

2. Update configuration:
   - Update `lib/constants.ts` with your WhatsApp business number
   - Add your brand profile image to `public/images/brand-profile.jpg`
   - Add product images to `public/images/products/`
   - Add 3D models to `public/models/` (optional)

3. Run the development server:
```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
vk_website/
├── app/                    # Next.js App Router pages
│   ├── layout.tsx          # Root layout
│   ├── page.tsx            # Homepage
│   ├── products/           # Product pages
│   ├── sitemap.ts          # Dynamic sitemap
│   └── robots.ts           # Robots.txt
├── components/             # React components
│   ├── Header.tsx
│   ├── Footer.tsx
│   ├── ProductCard.tsx
│   ├── Product3DViewer.tsx
│   └── ...
├── lib/                    # Utilities and data
│   ├── products.ts         # Product data
│   ├── constants.ts        # Brand constants
│   └── seo.ts              # SEO helpers
├── types/                  # TypeScript types
└── public/                 # Static assets
    ├── images/
    └── models/
```

## Configuration

### WhatsApp Number

Update the WhatsApp number in `lib/constants.ts`:

```typescript
export const WHATSAPP_NUMBER = '+919579477013' // Your business number
```

### Product Data

Product data is stored in `lib/products.ts`. Replace the mock data with your actual products.

### Images

- Brand profile image: `public/images/brand-profile.jpg`
- Product images: `public/images/products/` (match paths in product data)
- 3D models: `public/models/` (optional, .glb or .gltf format)

## SEO

The site includes comprehensive SEO optimization:

- Dynamic metadata for all pages
- Open Graph tags for social sharing
- JSON-LD schema markup
- Dynamic sitemap generation
- Robots.txt configuration

## Build for Production

```bash
npm run build
npm start
```

## Deployment

This site can be deployed on:
- **Vercel** (recommended for Next.js)
- **Netlify**
- Any platform supporting Next.js

## Notes

- No authentication, cart, or payment systems (WhatsApp-only flow)
- All product data is currently mock data - replace with real data
- 3D models are optional - site works without them
- Instagram profile image uses placeholder - replace with actual image

## License

### Demo Change for Testing

This line was added as a demo change to test the CI/CD pipeline.


Private - PANChNITY JEWELLERS

