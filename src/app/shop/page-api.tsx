import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { getStoreProducts, formatPrice } from '@/lib/printful'

export const metadata: Metadata = {
  title: 'Shop Unique Gifts & Merch - Pound Town, Texas | Dripping Springs, TX',
  description: 'Shop unique holiday gifts, exclusive merchandise, and local Texas gifts from Pound Town, Texas. Perfect presents for Christmas, birthdays, and special occasions in Dripping Springs, TX 78620.',
  keywords: ['gifts', 'holiday gifts', 'Dripping Springs shopping', 'Texas gifts', 'unique presents', 'local merch'],
}

export default async function ShopPage() {
  const products = await getStoreProducts()

  return (
    <div className="py-16 bg-cream">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl rustic-heading mb-4">
            Shop Unique Gifts
          </h1>
          <div className="inline-block h-1 w-24 bg-primary rounded mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Exclusive merchandise and gifts from Pound Town, TX. 
            Perfect for holidays, birthdays, and special occasions!
          </p>
        </div>

        {/* Products Grid */}
        {products.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <Link 
                key={product.id} 
                href={`/shop/product/${product.id}`}
                className="card group hover:border-primary/50 transition-all"
              >
                {/* Product Image */}
                <div className="relative aspect-square bg-white">
                  {product.thumbnail_url ? (
                    <Image
                      src={product.thumbnail_url}
                      alt={product.name}
                      fill
                      className="object-contain p-4 group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400">
                      <span className="text-6xl">🎁</span>
                    </div>
                  )}
                </div>

                {/* Product Info */}
                <div className="p-4 bg-gradient-to-br from-white to-tan/10">
                  <h3 className="text-lg font-bold mb-2 text-primary group-hover:text-rust transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {product.variants} variant{product.variants !== 1 ? 's' : ''} available
                  </p>
                  <span className="text-secondary font-semibold group-hover:underline">
                    View Details →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded border-2 border-tan/30">
            <div className="text-6xl mb-4">🎁</div>
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              Products Coming Soon
            </h3>
            <p className="text-gray-600">
              We're setting up our shop. Check back soon for amazing gifts!
            </p>
          </div>
        )}

        {/* Gift Categories Info */}
        <div className="mt-16 bg-gradient-to-br from-primary via-secondary to-rust text-cream rounded p-12 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Perfect Gifts for Every Occasion
          </h2>
          <p className="text-xl mb-8 text-cream/90">
            Browse our curated selection of unique Texas gifts, locally inspired merchandise, 
            and exclusive items you won't find anywhere else.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/about" className="bg-cream text-primary hover:bg-white font-bold py-3 px-8 rounded transition-all uppercase tracking-wide text-sm">
              Learn Our Story
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
