---
name: Next.js E-commerce Site
overview: Build a production-ready Next.js (App Router) e-commerce website for PANChNITY JEWELLERS with 3D product viewing, WhatsApp integration, and comprehensive SEO optimization.
todos:
  - id: setup-project
    content: Initialize Next.js project with TypeScript, Tailwind CSS, and install all required dependencies (@react-three/fiber, @react-three/drei, three, next-seo, lucide-react)
    status: completed
  - id: configure-theme
    content: "Set up Tailwind config with custom gold color palette (#D4AF37, #F5E6D3) and luxury typography (serif for headings, sans-serif for body)"
    status: completed
    dependencies:
      - setup-project
  - id: create-types
    content: Create TypeScript product interface and types in types/product.ts
    status: completed
    dependencies:
      - setup-project
  - id: create-constants
    content: Create lib/constants.ts with brand info, tagline, and WhatsApp number placeholder
    status: completed
    dependencies:
      - setup-project
  - id: create-mock-data
    content: Create lib/products.ts with 15-20 mock products covering idols, pooja items, and jewellery (gold & silver)
    status: completed
    dependencies:
      - create-types
      - create-constants
  - id: create-seo-helpers
    content: Create lib/seo.ts with metadata generation functions for dynamic SEO
    status: completed
    dependencies:
      - setup-project
  - id: build-layout
    content: Create app/layout.tsx with root layout, metadata, and global providers
    status: completed
    dependencies:
      - configure-theme
      - create-seo-helpers
  - id: build-header-footer
    content: Create Header.tsx and Footer.tsx components with navigation and brand info
    status: completed
    dependencies:
      - build-layout
  - id: build-homepage
    content: Create homepage (app/page.tsx) with BrandIntro, TrustPoints, and FeaturedProducts components
    status: completed
    dependencies:
      - build-header-footer
      - create-mock-data
  - id: build-product-listing
    content: Create product listing page (app/products/page.tsx) with grid layout, filters, and ProductCard components
    status: completed
    dependencies:
      - build-header-footer
      - create-mock-data
  - id: build-3d-viewer
    content: Create Product3DViewer component using react-three-fiber with OrbitControls and lighting
    status: completed
    dependencies:
      - setup-project
  - id: build-whatsapp-button
    content: Create WhatsAppButton component that opens WhatsApp with pre-filled product message
    status: completed
    dependencies:
      - create-constants
  - id: build-product-detail
    content: Create product detail page (app/products/[slug]/page.tsx) with images, 3D viewer, product details, and WhatsApp button
    status: completed
    dependencies:
      - build-3d-viewer
      - build-whatsapp-button
      - create-mock-data
  - id: implement-seo
    content: Add comprehensive SEO metadata, Open Graph tags, and JSON-LD schema to all pages
    status: completed
    dependencies:
      - build-product-detail
      - create-seo-helpers
  - id: add-sitemap-robots
    content: Create dynamic sitemap.ts and robots.ts files for search engine optimization
    status: completed
    dependencies:
      - create-mock-data
  - id: polish-responsive
    content: Ensure mobile-first responsive design, add loading states, and polish UI/UX across all pages
    status: completed
    dependencies:
      - build-homepage
      - build-product-listing
      - build-product-detail
---

# Next.js E-commerce Website fo

r PANChNITY JEWELLERS

## Project Structure

```javascript
vk_website/
├── app/
│   ├── layout.tsx              # Root layout with metadata & providers
│   ├── page.tsx                # Homepage
│   ├── products/
│   │   ├── page.tsx            # Product listing page
│   │   └── [slug]/
│   │       └── page.tsx        # Product detail page
│   ├── sitemap.ts              # Dynamic sitemap
│   ├── robots.ts               # Robots.txt
│   └── globals.css             # Global styles + Tailwind
├── components/
│   ├── Header.tsx              # Navigation header
│   ├── Footer.tsx               # Footer with brand info
│   ├── ProductCard.tsx         # Product card for listings
│   ├── Product3DViewer.tsx     # 3D model viewer component
│   ├── WhatsAppButton.tsx      # WhatsApp CTA button
│   ├── TrustPoints.tsx         # Trust signals section
│   ├── FeaturedProducts.tsx    # Featured products section
│   └── BrandIntro.tsx          # Brand introduction section
├── lib/
│   ├── products.ts             # Product data & utilities
│   ├── constants.ts             # Brand constants, WhatsApp number
│   └── seo.ts                  # SEO metadata helpers
├── types/
│   └── product.ts              # TypeScript product types
└── public/
    ├── images/                 # Product images, brand assets
    └── models/                 # 3D model files (.glb/.gltf)
```



## Implementation Details

### 1. Project Setup & Dependencies

**Package.json dependencies:**

- `next@latest` (App Router)
- `react@latest`, `react-dom@latest`
- `tailwindcss`, `postcss`, `autoprefixer`
- `@react-three/fiber`, `@react-three/drei` (3D rendering)
- `three` (3D library)
- `next-seo` (SEO metadata)
- `lucide-react` (icons)

**Configuration files:**

- `tailwind.config.ts` - Custom gold color palette, luxury theme
- `next.config.js` - Image optimization, 3D model support
- `tsconfig.json` - TypeScript configuration

### 2. Branding & Theme

**Color Palette (Tailwind config):**

- Primary gold: `#D4AF37`, `#F5E6D3`
- White: `#FFFFFF`, `#FAFAFA`
- Accent: Dark gold for hover states

**Typography:**

- Luxury serif for headings (Playfair Display or similar)
- Clean sans-serif for body (Inter or similar)

### 3. Core Pages

#### Homepage (`app/page.tsx`)

- Brand intro section with Instagram profile image placeholder
- Tagline: "The art of bhakti and shakti"
- Trust points section (authenticity, craftsmanship, heritage)
- Featured products grid (6-8 products)
- SEO-optimized metadata

#### Product Listing (`app/products/page.tsx`)

- Grid layout of all products
- Filter by material (gold/silver) and category
- Search functionality
- Pagination or infinite scroll
- SEO metadata with keywords

#### Product Detail (`app/products/[slug]/page.tsx`)

- Product images gallery
- Interactive 3D model viewer (using react-three-fiber)
- Product details: name, material, purity, weight, description
- "Buy via WhatsApp" button (opens WhatsApp with pre-filled message)
- Breadcrumbs navigation
- Rich SEO metadata + JSON-LD schema

### 4. Key Components

#### Product3DViewer (`components/Product3DViewer.tsx`)

- Uses `@react-three/fiber` Canvas
- OrbitControls for rotation/zoom
- Ambient + directional lighting
- Fallback to image if model unavailable
- Loading state

#### WhatsAppButton (`components/WhatsAppButton.tsx`)

- Opens WhatsApp Web/App
- Pre-filled message: "Hello, I'm interested in [Product Name]. Link: [Product URL]"
- Configurable phone number from constants
- Green WhatsApp brand color

#### TrustPoints (`components/TrustPoints.tsx`)

- Icons + text for trust signals
- Examples: "Authentic Gold/Silver", "Handcrafted", "Trusted by Devotees", "Heritage Craftsmanship"

### 5. Product Data Structure

**TypeScript interface (`types/product.ts`):**

```typescript
interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: 'idol' | 'pooja-item' | 'jewellery'
  material: 'gold' | 'silver'
  purity: string // e.g., "22K", "925"
  weight: string // e.g., "50g", "100g"
  images: string[]
  model3d?: string // Path to .glb/.gltf file
  featured: boolean
  seoKeywords: string[]
}
```

**Mock data (`lib/products.ts`):**

- 15-20 sample products covering all categories
- Mix of gold and silver items
- Realistic Indian names and descriptions
- SEO-friendly product names

### 6. SEO Implementation

#### Metadata (`lib/seo.ts`)

- Dynamic metadata generation per page
- Open Graph tags for social sharing
- Twitter Card tags
- Canonical URLs

#### JSON-LD Schema (`app/products/[slug]/page.tsx`)

- Product schema with name, description, images
- Organization schema for brand
- BreadcrumbList schema

#### Sitemap & Robots

- Dynamic sitemap generation (`app/sitemap.ts`)
- Robots.txt (`app/robots.ts`)
- Target keywords in metadata: "gold idol", "silver murti", "pooja jewellery", "temple jewellery", "hindu religious items", "bhakti jewellery India"

### 7. Styling & UX

**Design principles:**

- White background with gold accents
- Generous whitespace
- High-quality product images
- Smooth animations/transitions
- Mobile-first responsive design

**Components:**

- Reusable button styles
- Card components with hover effects
- Loading skeletons
- Error boundaries

### 8. Performance Optimizations

- Next.js Image component for all images
- Lazy loading for 3D models
- Code splitting for heavy components
- Font optimization (next/font)
- Static generation where possible (ISR for products)

### 9. Configuration Files

**`lib/constants.ts`:**

- Brand name, tagline
- WhatsApp number (placeholder, user to update)
- Social media links
- Contact information

**`next.config.js`:**

- Image domains configuration
- 3D model file support
- Performance optimizations

## Implementation Order

1. Project initialization & dependencies
2. Tailwind setup with gold theme
3. Root layout & global styles
4. Product types & mock data
5. Homepage components (BrandIntro, TrustPoints, FeaturedProducts)
6. Product listing page
7. Product detail page with 3D viewer
8. WhatsApp integration
9. SEO metadata & schema
10. Sitemap & robots.txt
11. Mobile responsiveness & polish
12. Performance optimization