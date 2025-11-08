# Deployment Guide - Pound Town, Texas

## Quick Deploy to Vercel (Recommended)

Vercel is the easiest way to deploy Next.js applications and is made by the creators of Next.js.

### Option 1: Deploy via Git (Recommended)

1. **Push your code to GitHub:**
   ```powershell
   git init
   git add .
   git commit -m "Initial commit - Pound Town Texas website"
   git branch -M main
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Deploy to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Sign up with GitHub
   - Click "New Project"
   - Import your repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

3. **Configure Custom Domain:**
   - In Vercel dashboard, go to Settings > Domains
   - Add `poundtowntx.com`
   - Follow DNS configuration instructions

### Option 2: Deploy via Vercel CLI

```powershell
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel

# Deploy to production
vercel --prod
```

## Deploy to Netlify

1. **Build the site:**
   ```powershell
   npm run build
   ```

2. **Deploy to Netlify:**
   - Sign up at [netlify.com](https://netlify.com)
   - Drag and drop the `.next` folder
   - Or connect your Git repository

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node version: 18+

## Deploy to Custom VPS/Server

### Prerequisites
- Ubuntu/Debian server
- Node.js 18+ installed
- Nginx or Apache

### Steps

1. **Build the application:**
   ```bash
   npm run build
   ```

2. **Copy files to server:**
   ```bash
   scp -r .next package.json package-lock.json user@your-server:/var/www/poundtown
   ```

3. **Install dependencies on server:**
   ```bash
   ssh user@your-server
   cd /var/www/poundtown
   npm install --production
   ```

4. **Configure PM2 (Process Manager):**
   ```bash
   npm install -g pm2
   pm2 start npm --name "poundtown" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx:**
   ```nginx
   server {
       listen 80;
       server_name poundtowntx.com www.poundtowntx.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **Enable SSL with Let's Encrypt:**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d poundtowntx.com -d www.poundtowntx.com
   ```

## Environment Variables

Before deploying, set up environment variables:

```env
# .env.production
NEXT_PUBLIC_SITE_URL=https://poundtowntx.com
NODE_ENV=production
```

## Post-Deployment Checklist

- [ ] Custom domain configured
- [ ] SSL/HTTPS enabled
- [ ] Google Search Console verified
- [ ] Google Analytics added
- [ ] Sitemap submitted to Google
- [ ] Social media cards tested
- [ ] Mobile responsiveness verified
- [ ] Page speed optimized (test with Lighthouse)
- [ ] All links working
- [ ] Images loading properly

## Performance Optimization

### After Deployment:

1. **Test with Google Lighthouse:**
   - Open DevTools in Chrome
   - Run Lighthouse audit
   - Aim for 90+ in all categories

2. **Submit sitemap to Google:**
   - Go to Google Search Console
   - Submit `https://poundtowntx.com/sitemap.xml`

3. **Enable Cloudflare (Optional):**
   - Sign up at cloudflare.com
   - Add your domain
   - Update nameservers
   - Enable CDN and caching

## SEO Post-Launch

1. **Google Business Profile:**
   - Create profile for Dripping Springs, TX 78620
   - Add photos and description
   - Link to website

2. **Submit to Directories:**
   - Bing Webmaster Tools
   - Yelp (if applicable)
   - Local business directories

3. **Monitor Rankings:**
   - Set up Google Search Console
   - Monitor keyword rankings for:
     - "gifts Dripping Springs"
     - "holiday gifts 78620"
     - "Texas gifts"

## Updating Content

To add new blog posts or update content:

1. Update the Blogger feed or manually edit `blogger_content.json`
2. Commit changes to Git
3. Push to repository
4. Vercel will auto-deploy (if using Git integration)

Or manually redeploy:
```powershell
npm run build
vercel --prod
```

## Troubleshooting

### Build Fails
- Check Node.js version (should be 18+)
- Clear cache: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`

### Images Not Loading
- Check image URLs in `next.config.js`
- Verify remote patterns are configured

### 404 Errors
- Ensure all pages are in `src/app` directory
- Check file naming (should be `page.tsx`)
- Verify dynamic routes have `[slug]` folder structure

## Support

For deployment issues, check:
- [Next.js Documentation](https://nextjs.org/docs)
- [Vercel Documentation](https://vercel.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

---

**Happy Deploying!** 🚀
