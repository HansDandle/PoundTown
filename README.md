# Pound Town, Texas - Modern Website

A modern, mobile-optimized, SEO-focused website built with Next.js 14, featuring content from the Pound Town, Texas Blogger blog with integrated Printful e-commerce. This site showcases unique gifts and merchandise from Dripping Springs, TX 78620.

## 🎯 Features

- ✅ **Modern Next.js 14** with App Router
- ✅ **TypeScript** for type safety
- ✅ **Tailwind CSS** with rustic Texas theme
- ✅ **Printful Integration** for e-commerce
  - Product catalog from Printful API
  - Individual product detail pages
  - Variant selection (size, color)
  - Dynamic pricing and inventory
  - Shopping cart with localStorage persistence
  - Full checkout flow with Printful order creation
  - Automatic order confirmation and fulfillment
- ✅ **Full SEO Optimization**
  - Meta tags optimized for gifts, holiday shopping, and Dripping Springs
  - Open Graph tags for social media
  - Structured data (Schema.org) for local business, products, and articles
  - Sitemap and robots.txt
  - Geographic metadata for Dripping Springs, TX 78620
- ✅ **Performance Optimized**
  - Image optimization with Next.js Image component
  - Static generation for fast page loads
  - Compression and minification
- ✅ **Mobile-First Design**
  - Responsive navigation with mobile menu
  - Touch-friendly interfaces
  - Optimized for all screen sizes

## 🚀 Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Set Up Environment Variables
Create a `.env.local` file in the root directory:
```bash
PRINTFUL_API_TOKEN=your_printful_api_token_here
```

**To get your Printful API token:**
1. Log in to [Printful](https://www.printful.com)
2. Go to **Settings** → **Stores**
3. Select your store
4. Click **"Add API Access"** or view existing tokens
5. Copy the token and paste it in `.env.local`

### 3. Run Development Server
```bash
npm run dev
```

### 4. Open in Browser
Navigate to `http://localhost:3000`

## 📁 Project Structure

```
PoundTown/
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout with SEO metadata
│   │   ├── page.tsx             # Homepage with hero & categories
│   │   ├── about/
│   │   │   └── page.tsx         # About page
│   │   ├── shop/
│   │   │   └── page.tsx         # Shop/gifts page
│   │   ├── blog/
│   │   │   ├── page.tsx         # Blog listing
│   │   │   └── [slug]/
│   │   │       └── page.tsx     # Dynamic blog post pages
│   │   ├── sitemap.ts           # XML sitemap
│   │   ├── robots.ts            # Robots.txt
│   │   └── globals.css          # Global styles
│   └── components/
│       ├── Navigation.tsx       # Responsive navigation
│       └── Footer.tsx           # Footer with schema
├── blogger_content.json         # Extracted blog content
├── parse_blogger.py             # Python script to extract content
├── package.json
├── tsconfig.json
├── tailwind.config.js
└── next.config.js
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- npm or yarn package manager

### Installation

1. **Install dependencies:**
   ```powershell
   npm install
   ```

2. **Run the development server:**
   ```powershell
   npm run dev
   ```

3. **Open your browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Build for Production

```powershell
npm run build
npm start
```

## 📝 Content Management

The blog content is extracted from the Blogger feed.atom file using the `parse_blogger.py` script. The extracted content is stored in `blogger_content.json`.

To re-extract content from Blogger:
```powershell
python parse_blogger.py
```

## 🎨 Customization

### Colors

Edit the color scheme in `tailwind.config.js`:

```javascript
colors: {
  primary: '#1a56db',      // Main brand color
  secondary: '#fcff01',    // Accent color
  accent: '#ff6b6b',       // Additional accent
}
```

### SEO Keywords

Update SEO keywords in `src/app/layout.tsx` to target different search terms.

### External Shop Link

The shop buttons link to `https://poundtown-shop.fourthwall.com`. Update these links in:
- `src/app/shop/page.tsx`
- Any other pages with shop links

## 📱 Mobile Optimization

The site is built mobile-first with:
- Responsive grid layouts
- Touch-friendly navigation menu
- Optimized images
- Fast loading times on mobile networks

## 🔍 SEO Features

### Target Keywords
- Gifts
- Holiday gifts
- Dripping Springs, TX
- 78620
- Texas gifts
- Local gifts
- Christmas gifts
- Birthday gifts

### Schema Markup
- LocalBusiness schema on homepage
- Organization schema in footer
- BlogPosting schema on blog posts
- Product/Store schema on shop page
- FAQ schema on about page

### Geographic Targeting
- Dripping Springs, TX 78620
- Texas Hill Country
- Geo-coordinates included in metadata

## 🌐 Deployment

This Next.js application can be deployed to:

- **Vercel** (recommended): `vercel deploy`
- **Netlify**: Connect your Git repository
- **Custom server**: `npm run build && npm start`

### Environment Variables

Create a `.env.local` file for any environment-specific variables:

```
NEXT_PUBLIC_SITE_URL=https://poundtowntx.com
```

## 📊 Analytics

To add analytics:

1. **Google Analytics**: Add to `src/app/layout.tsx`
2. **Google Tag Manager**: Add script to layout
3. **Search Console**: Verify with meta tag or DNS

## 🛠️ Technologies Used

- **Next.js 14** - React framework
- **TypeScript** - Type safety
- **Tailwind CSS** - Utility-first CSS
- **Python** - Content extraction
- **React** - UI components

## 📄 License

All content © Pound Town, Texas. All rights reserved.

## 🤝 Support

For questions or support, visit the website or contact through the blog.

---

**Dripping Springs, TX 78620** | Holiday Gifts | Local Texas Gifts
