# Image Management Guide

## 📁 Where to Store Images

All images go in the `public` folder. They're automatically accessible from the root URL.

### Folder Structure

```
public/
├── images/
│   ├── hero/              # Homepage hero images
│   ├── products/          # Product photos
│   ├── blog/             # Blog post images
│   └── logos/            # Logo files
├── favicon.ico           # Browser icon
├── apple-touch-icon.png  # iOS icon
├── og-image.jpg          # Social media preview image
└── logo.png              # Main logo
```

## 🖼️ How to Add Images

### 1. Add Image Files

Simply drag and drop your images into the appropriate folder:

```
public/
├── images/
│   ├── hero/
│   │   └── dripping-springs-hero.jpg
│   ├── products/
│   │   ├── sticker-baby-on-board.jpg
│   │   ├── tshirt-pound-town.jpg
│   │   └── merch-collection.jpg
│   └── logos/
│       └── pound-town-logo.png
```

### 2. Use in Your Code

```tsx
import Image from 'next/image'

// Option 1: Using Next.js Image component (recommended - optimized)
<Image 
  src="/images/hero/dripping-springs-hero.jpg"
  alt="Dripping Springs Texas"
  width={1200}
  height={600}
  priority // For hero images
/>

// Option 2: Regular img tag (simpler, but not optimized)
<img 
  src="/images/products/sticker.jpg" 
  alt="Baby on Board Sticker"
  className="w-full h-auto"
/>
```

## 📝 Image Best Practices

### Recommended Sizes

| Use Case | Dimensions | Format |
|----------|------------|--------|
| Hero Image | 1920x1080px | JPG |
| Product Photos | 800x800px | JPG/PNG |
| Blog Images | 1200x630px | JPG |
| Logo | 512x512px | PNG (transparent) |
| Favicon | 32x32px | ICO/PNG |
| OG Image (Social) | 1200x630px | JPG |

### Optimization Tips

1. **Compress images** before uploading
   - Use TinyPNG.com or Squoosh.app
   - Aim for under 200KB per image

2. **Use WebP format** when possible
   - Better compression than JPG
   - Next.js auto-converts with Image component

3. **Add descriptive alt text**
   - Good for SEO
   - Helps accessibility

## 🎨 Customizing Your Site

### Replace Generic Elements

#### 1. Add Your Logo
```tsx
// In Navigation.tsx
<Image 
  src="/logo.png" 
  alt="Pound Town Texas Logo"
  width={50}
  height={50}
/>
```

#### 2. Add Hero Image
```tsx
// In page.tsx (homepage)
<div className="relative h-96">
  <Image 
    src="/images/hero/dripping-springs.jpg"
    alt="Dripping Springs Texas"
    fill
    className="object-cover"
    priority
  />
  <div className="absolute inset-0 bg-black/40">
    {/* Your text content over image */}
  </div>
</div>
```

#### 3. Add Product Images
```tsx
<Image 
  src="/images/products/pound-town-tshirt.jpg"
  alt="Pound Town Texas T-Shirt"
  width={400}
  height={400}
  className="rounded-lg"
/>
```

## 🖼️ Example: Full Hero Section with Image

```tsx
<section className="relative h-screen">
  <Image 
    src="/images/hero/texas-hill-country.jpg"
    alt="Texas Hill Country landscape"
    fill
    className="object-cover"
    priority
  />
  
  {/* Overlay */}
  <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-black/40" />
  
  {/* Content */}
  <div className="absolute inset-0 flex items-center justify-center text-white">
    <div className="text-center px-4">
      <h1 className="text-6xl font-bold mb-4">
        Pound Town, Texas
      </h1>
      <p className="text-2xl mb-8">
        Unique Gifts from the Heart of Texas
      </p>
      <button className="btn-primary">
        Shop Now
      </button>
    </div>
  </div>
</section>
```

## 📸 Where to Get Images

### Free Stock Photos
- **Unsplash.com** - High quality, free
- **Pexels.com** - Free stock photos
- **Pixabay.com** - Free images

### Search Terms for Texas/Dripping Springs
- "Texas Hill Country"
- "Dripping Springs landscape"
- "Texas gifts"
- "rustic Texas"
- "Hill Country sunset"

### Your Own Photos
- Product photos you've taken
- Local Dripping Springs scenery
- Behind-the-scenes shots
- Customer photos (with permission)

## 🎯 Making It Less Generic

### Quick Customization Steps

1. **Add a logo** (create or commission one)
   - Place in `public/logo.png`
   - Update Navigation component

2. **Add hero image**
   - Find a great Texas Hill Country photo
   - Or use a photo of your products
   - Place in `public/images/hero/`

3. **Add product photos**
   - Screenshot products from your shop
   - Or photograph actual items
   - Place in `public/images/products/`

4. **Customize colors**
   - Edit `tailwind.config.js`
   - Match your brand colors

5. **Add personal touches**
   - Replace emoji with icons or images
   - Add your story with photos
   - Include team photos if applicable

## 🔄 After Adding Images

The site will automatically:
- ✅ Optimize images for web
- ✅ Generate responsive sizes
- ✅ Lazy load off-screen images
- ✅ Serve modern WebP format (when supported)

No build step needed - just refresh the page!

## 💡 Pro Tips

1. **Name files descriptively**
   - ❌ `IMG_1234.jpg`
   - ✅ `pound-town-texas-tshirt-front.jpg`

2. **Keep images organized**
   - Use subfolders by category
   - Easy to find and manage

3. **Test on mobile**
   - Ensure images look good on small screens
   - Check loading times

4. **Update alt text**
   - Describe what's in the image
   - Include relevant keywords

---

**Next Steps:**
1. Add your images to `public/images/` folders
2. Update components to use your images
3. See examples in CUSTOMIZATION-EXAMPLES.md
