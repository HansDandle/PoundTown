# Quick Start Guide - Pound Town, Texas Website

## ⚡ Fast Commands

### Development
```powershell
npm run dev          # Start dev server at http://localhost:3000
npm run build        # Build for production
npm start            # Start production server
```

### Content
```powershell
python parse_blogger.py    # Re-extract Blogger content
```

---

## 🚀 Quick Deploy (5 Minutes)

### Deploy to Vercel (Easiest)

1. **Install Vercel CLI:**
   ```powershell
   npm i -g vercel
   ```

2. **Login & Deploy:**
   ```powershell
   vercel login
   vercel
   ```

3. **Done!** Your site is live at the URL Vercel provides.

4. **Add Custom Domain:**
   - Go to vercel.com dashboard
   - Add `poundtowntx.com` in domain settings
   - Update DNS records as instructed

---

## 📱 View Your Site

- **Local:** http://localhost:3000
- **After Deploy:** https://your-project.vercel.app
- **With Domain:** https://poundtowntx.com

---

## 🎯 SEO Quick Wins (First Day After Deploy)

1. **Google Search Console**
   - Go to https://search.google.com/search-console
   - Add your domain
   - Submit sitemap: `https://poundtowntx.com/sitemap.xml`

2. **Google Analytics**
   - Create account at https://analytics.google.com
   - Add tracking code to `src/app/layout.tsx`

3. **Google Business Profile**
   - Create at https://business.google.com
   - Add location: Dripping Springs, TX 78620
   - Link to your website

---

## 📂 Important Files

| File | Purpose |
|------|---------|
| `src/app/page.tsx` | Homepage content |
| `src/app/layout.tsx` | SEO meta tags |
| `blogger_content.json` | Your blog posts |
| `src/components/Navigation.tsx` | Menu |
| `src/components/Footer.tsx` | Footer |

---

## 🛠️ Common Tasks

### Update Homepage
Edit `src/app/page.tsx`

### Change Colors
Edit `tailwind.config.js`:
```javascript
colors: {
  primary: '#1a56db',    // Your main color
  secondary: '#fcff01',  // Accent color
}
```

### Add Blog Post
1. Update `blogger_content.json` or
2. Re-run `python parse_blogger.py`

### Update Shop Link
Find and replace `https://poundtown-shop.fourthwall.com` in:
- `src/app/shop/page.tsx`

---

## 🔍 SEO Checklist

After deploying:
- [ ] Submit sitemap to Google
- [ ] Set up Google Analytics
- [ ] Create Google Business Profile
- [ ] Test mobile-friendly (google.com/test/mobile-friendly)
- [ ] Check page speed (pagespeed.web.dev)

---

## 📊 Monitor Success

### Key Metrics
- Google Analytics: Track visitors
- Search Console: Track search rankings
- Google Business: Track local visibility

### Target Keywords
- "gifts Dripping Springs"
- "holiday gifts 78620"
- "Texas gifts"
- "Dripping Springs gift shop"

---

## 💡 Pro Tips

1. **Content is King**
   - Add 2-4 blog posts per month
   - Focus on gifts, holidays, local events

2. **Local SEO**
   - Get Google reviews
   - Partner with local businesses
   - Mention Dripping Springs often

3. **Social Media**
   - Share new products
   - Use location tags
   - Engage with local community

4. **Performance**
   - Keep images optimized
   - Monitor page speed
   - Use Vercel's analytics

---

## 🆘 Troubleshooting

### Site Won't Start
```powershell
rm -rf .next
npm install
npm run dev
```

### Deploy Failed
- Check Node version: `node -v` (should be 18+)
- Clear cache: `vercel --debug`

### SEO Not Working
- Wait 2-4 weeks for Google indexing
- Submit sitemap
- Check robots.txt allows crawling

---

## 📞 Need Help?

- **Next.js Docs**: nextjs.org/docs
- **Vercel Support**: vercel.com/support
- **SEO Guide**: Read `SEO-CHECKLIST.md`
- **Full Docs**: Read `README.md`

---

## 🎁 Remember

This site is optimized for:
- ✅ **Gifts** - Main focus
- ✅ **Dripping Springs, TX 78620** - Local SEO
- ✅ **Mobile** - Responsive design
- ✅ **Speed** - Fast loading
- ✅ **Holidays** - Seasonal shopping

**Your site is ready to attract customers!** 🚀

---

*Last updated: November 7, 2025*
