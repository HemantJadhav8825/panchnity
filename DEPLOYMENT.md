# Deployment Guide - PANChNITY JEWELLERS Website

## Deploy to Vercel (Recommended - Free & Easy)

Vercel is the best hosting platform for Next.js websites. It's free, fast, and requires zero configuration.

### Option 1: Deploy via GitHub (Recommended)

1. **Push to GitHub:**
   ```bash
   # Create a new repository on GitHub (github.com)
   # Then run:
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
   git branch -M main
   git push -u origin main
   ```

2. **Deploy on Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up/login (free account)
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"
   - Your site will be live in 2-3 minutes!

3. **Update Environment Variables (Optional):**
   - In Vercel dashboard → Your Project → Settings → Environment Variables
   - Add: `NEXT_PUBLIC_SITE_URL` = `https://your-site.vercel.app`
   - Redeploy after adding

### Option 2: Deploy via Vercel CLI

1. **Install Vercel CLI:**
   ```bash
   npm i -g vercel
   ```

2. **Deploy:**
   ```bash
   cd /Users/hemantjadhav/Desktop/cursor_projects/vk_website
   vercel
   ```
   - Follow the prompts
   - Your site will be deployed instantly!

3. **For production:**
   ```bash
   vercel --prod
   ```

### Option 3: Deploy via Netlify (Alternative)

1. **Push to GitHub** (same as Option 1, Step 1)

2. **Deploy on Netlify:**
   - Go to [netlify.com](https://netlify.com)
   - Sign up/login
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Build settings:
     - Build command: `npm run build`
     - Publish directory: `.next`
   - Click "Deploy site"

## Post-Deployment Steps

1. **Update WhatsApp Number:**
   - Edit `lib/constants.ts`
   - Update `WHATSAPP_NUMBER` with your actual business number
   - Commit and push changes

2. **Add Images:**
   - Upload brand profile image to `public/images/brand-profile.jpg`
   - Upload product images to `public/images/products/`
   - Commit and push - Vercel will auto-deploy

3. **Custom Domain (Optional):**
   - In Vercel dashboard → Settings → Domains
   - Add your custom domain
   - Follow DNS configuration instructions

## Free Hosting Options Summary

| Platform | Free Tier | Best For | Setup Difficulty |
|----------|-----------|----------|------------------|
| **Vercel** | ✅ Excellent | Next.js (Recommended) | ⭐ Easy |
| **Netlify** | ✅ Good | Static/Next.js | ⭐⭐ Medium |
| **Railway** | ✅ Good | Full-stack apps | ⭐⭐ Medium |
| **Render** | ✅ Limited | Full-stack apps | ⭐⭐ Medium |

**Recommendation:** Use Vercel - it's made by the Next.js team and offers the best free tier.

## Troubleshooting

- **Build fails?** Make sure all dependencies are in `package.json`
- **Images not loading?** Check image paths in `lib/products.ts`
- **3D models not working?** Ensure `.glb`/`.gltf` files are in `public/models/`
- **WhatsApp button not working?** Update `WHATSAPP_NUMBER` in `lib/constants.ts`

## Need Help?

- Vercel Docs: https://vercel.com/docs
- Next.js Deployment: https://nextjs.org/docs/deployment

