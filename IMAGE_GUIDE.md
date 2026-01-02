# Product Images Guide

## Adding Product Images

### Option 1: Use High-Quality Stock Images (Recommended)

For religious jewellery and temple items, you can use:

1. **Unsplash** (https://unsplash.com)
   - Search: "gold idol", "silver jewellery", "temple items"
   - Free, high-quality images
   - No attribution required

2. **Pexels** (https://pexels.com)
   - Search: "hindu jewellery", "gold pendant", "silver idol"
   - Free stock photos

3. **Pixabay** (https://pixabay.com)
   - Search: "religious jewellery", "temple items"
   - Free images and vectors

### Option 2: Take Your Own Photos

1. Use good lighting (natural light is best)
2. Use a plain white or neutral background
3. Take multiple angles
4. Ensure images are at least 1200x1200px
5. Save as JPG or WebP format

### Image Requirements

- **Product Images**: 1200x1200px minimum (square format recommended)
- **Category Images**: 1200x800px (landscape format)
- **Brand Profile**: 512x512px (square format)
- **Format**: JPG, PNG, or WebP
- **File Size**: Keep under 500KB per image for web performance

### Image Paths

Place images in the following locations:

```
public/
├── images/
│   ├── brand-profile.jpg          # Brand logo/profile image
│   ├── categories/
│   │   ├── idols.jpg             # Category showcase image
│   │   ├── pooja.jpg             # Category showcase image
│   │   └── jewellery.jpg         # Category showcase image
│   └── products/
│       ├── gold-ganesh-1.jpg     # Product images
│       ├── gold-ganesh-2.jpg
│       ├── gold-lakshmi-1.jpg
│       └── ... (match paths in lib/products.ts)
```

### Updating Product Images

1. Add images to `public/images/products/` matching the paths in `lib/products.ts`
2. Example: For product with `images: ['/images/products/gold-ganesh-1.jpg']`
   - Place file at: `public/images/products/gold-ganesh-1.jpg`

### Image Optimization

Next.js automatically optimizes images, but for best performance:
- Use WebP format when possible
- Compress images before uploading
- Use tools like:
  - TinyPNG (https://tinypng.com)
  - Squoosh (https://squoosh.app)
  - ImageOptim (Mac app)

### BlueStone-Style Image Tips

Based on BlueStone's website, their product images feature:
- Clean white backgrounds
- Professional lighting
- Multiple angles (front, side, detail shots)
- High resolution for zoom functionality
- Consistent styling across all products

### Quick Setup Script

After adding images, redeploy:

```bash
git add public/images/
git commit -m "Add product images"
vercel --prod
```

## Note on Copyright

⚠️ **Important**: Do not directly copy images from BlueStone or other websites. Use:
- Your own product photos
- Free stock images (with proper licensing)
- Commissioned photography

This ensures you have proper rights to use the images.

