'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { formatPrice, getSizesFromVariants, getColorsFromVariants } from '@/lib/printful'
import { useCart } from '@/context/CartContext'

interface ProductDetailClientProps {
  product: any
}

export default function ProductDetailClient({ product }: ProductDetailClientProps) {
  const { addItem, openCart } = useCart()
  const [selectedSize, setSelectedSize] = useState<string>('')
  const [selectedColor, setSelectedColor] = useState<string>('')
  const [selectedImage, setSelectedImage] = useState(0)

  const variants = product.sync_variants || []
  const sizes = getSizesFromVariants(variants)
  const colors = getColorsFromVariants(variants)

  // Get available variants based on selection
  const availableVariants = variants.filter((v: any) => {
    const variantSize = v.options?.find((o: any) => o.id === 'size')?.value
    const variantColor = v.options?.find((o: any) => o.id === 'color')?.value
    
    if (selectedSize && variantSize !== selectedSize) return false
    if (selectedColor && variantColor !== selectedColor) return false
    
    return true
  })

  // Get selected variant
  const selectedVariant = variants.find((v: any) => {
    const variantSize = v.options?.find((o: any) => o.id === 'size')?.value
    const variantColor = v.options?.find((o: any) => o.id === 'color')?.value
    
    // Match based on what options are available
    const sizeMatches = !variantSize || !sizes.length || variantSize === selectedSize
    const colorMatches = !variantColor || !colors.length || variantColor === selectedColor
    
    return sizeMatches && colorMatches
  })

  // Check if all required selections are made
  const canAddToCart = 
    (sizes.length === 0 || selectedSize !== '') && 
    (colors.length === 0 || selectedColor !== '')

  // Auto-select if only one option available
  if (sizes.length === 1 && !selectedSize) {
    setSelectedSize(sizes[0])
  }
  if (colors.length === 1 && !selectedColor) {
    setSelectedColor(colors[0])
  }

  // Get all product images
  const productImages = selectedVariant?.files?.filter((f: any) => f.type === 'preview') || []
  const currentImage = productImages[selectedImage] || product.sync_variants?.[0]?.files?.[0]

  // Get price range
  const prices = variants.map((v: any) => parseFloat(v.retail_price))
  const minPrice = Math.min(...prices)
  const maxPrice = Math.max(...prices)
  const priceDisplay = minPrice === maxPrice 
    ? formatPrice(minPrice)
    : `${formatPrice(minPrice)} - ${formatPrice(maxPrice)}`

  const handleAddToCart = () => {
    if (!canAddToCart) {
      const missing = []
      if (sizes.length > 0 && !selectedSize) missing.push('size')
      if (colors.length > 0 && !selectedColor) missing.push('color')
      alert(`Please select ${missing.join(' and ')}`)
      return
    }
    
    if (!selectedVariant) {
      alert('Selected options not available')
      return
    }
    
    addItem({
      productId: product.id.toString(),
      variantId: selectedVariant.id,
      productName: product.name,
      size: selectedSize || 'N/A',
      color: selectedColor || 'N/A',
      price: parseFloat(selectedVariant.retail_price),
      imageUrl: currentImage?.preview_url || currentImage?.url,
    })
    
    openCart()
  }

  const handleBuyNow = () => {
    if (!canAddToCart) {
      const missing = []
      if (sizes.length > 0 && !selectedSize) missing.push('size')
      if (colors.length > 0 && !selectedColor) missing.push('color')
      alert(`Please select ${missing.join(' and ')}`)
      return
    }
    
    if (!selectedVariant) {
      alert('Selected options not available')
      return
    }
    
    // Add to cart then open cart for checkout
    addItem({
      productId: product.id.toString(),
      variantId: selectedVariant.id,
      productName: product.name,
      size: selectedSize || 'N/A',
      color: selectedColor || 'N/A',
      price: parseFloat(selectedVariant.retail_price),
      imageUrl: currentImage?.preview_url || currentImage?.url,
    })
    
    openCart()
  }

  return (
    <div className="py-16 bg-cream">
      <div className="container-custom">
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-gray-600">
          <Link href="/" className="hover:text-primary">Home</Link>
          {' / '}
          <Link href="/shop" className="hover:text-primary">Shop</Link>
          {' / '}
          <span className="text-gray-900">{product.name}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Images */}
          <div>
            {/* Main Image */}
            <div className="relative aspect-square bg-white rounded border-4 border-tan/30 mb-4 overflow-hidden">
              {currentImage ? (
                <Image
                  src={currentImage.preview_url || currentImage.url}
                  alt={product.name}
                  fill
                  className="object-contain p-8"
                  priority
                />
              ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                  <span className="text-8xl">🎁</span>
                </div>
              )}
            </div>

            {/* Thumbnail Gallery */}
            {productImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {productImages.map((img: any, idx: number) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square bg-white rounded border-2 overflow-hidden ${
                      selectedImage === idx ? 'border-primary' : 'border-tan/30'
                    }`}
                  >
                    <Image
                      src={img.thumbnail_url}
                      alt={`${product.name} view ${idx + 1}`}
                      fill
                      className="object-contain p-2"
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div>
            <h1 className="text-3xl md:text-4xl rustic-heading mb-4">
              {product.name}
            </h1>
            <div className="h-1 w-16 bg-primary rounded mb-6"></div>

            <div className="text-3xl font-bold text-primary mb-6">
              {priceDisplay}
            </div>

            {/* Size Selection */}
            {sizes.length > 0 && (
              <div className="mb-6">
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  Size: {selectedSize && <span className="text-primary">{selectedSize}</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`px-4 py-2 border-2 rounded font-semibold transition-all ${
                        selectedSize === size
                          ? 'border-primary bg-primary text-cream'
                          : 'border-tan hover:border-primary text-gray-800'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {colors.length > 0 && (
              <div className="mb-8">
                <label className="block text-sm font-bold text-gray-800 mb-3 uppercase tracking-wide">
                  Color: {selectedColor && <span className="text-primary">{selectedColor}</span>}
                </label>
                <div className="flex flex-wrap gap-2">
                  {colors.map((color) => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2 border-2 rounded font-semibold transition-all ${
                        selectedColor === color
                          ? 'border-primary bg-primary text-cream'
                          : 'border-tan hover:border-primary text-gray-800'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button
                onClick={handleAddToCart}
                disabled={!canAddToCart || !selectedVariant}
                className="btn-primary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Add to Cart
              </button>
              <button
                onClick={handleBuyNow}
                disabled={!canAddToCart || !selectedVariant}
                className="btn-secondary flex-1 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Buy Now
              </button>
            </div>

            {/* Product Details */}
            <div className="border-t-2 border-tan/30 pt-6">
              <h3 className="text-lg font-bold text-gray-800 mb-3 uppercase tracking-wide">
                Product Details
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li>• {variants.length} variant{variants.length !== 1 ? 's' : ''} available</li>
                <li>• High-quality print</li>
                <li>• Shipped from Printful</li>
                <li>• Made to order</li>
              </ul>
            </div>

            {/* Back to Shop */}
            <div className="mt-8">
              <Link href="/shop" className="text-primary hover:text-rust font-semibold hover:underline">
                ← Back to Shop
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
