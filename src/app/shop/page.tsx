import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'Pound Town Store - Support Dr. Pound\'s Legacy | Dripping Springs, TX',
  description: 'Support the Pound Town legacy with our exclusive merchandise celebrating Dr. Joseph Pound and the history of Dripping Springs, Texas. Unique gifts and apparel from the Texas Hill Country.',
  keywords: ['Pound Town', 'Dr. Pound', 'Dripping Springs merchandise', 'Texas Hill Country gifts', 'local apparel'],
}

export default function ShopPage() {
  const storeUrl = 'https://poundtown.printful.me'

  return (
    <div className="min-h-screen bg-cream py-16">
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl rustic-heading mb-4">
            Pound Town Store
          </h1>
          <div className="inline-block h-1 w-24 bg-primary rounded mb-6"></div>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto mb-8">
            Exclusive merchandise celebrating Dr. Joseph Pound and the legacy 
            of Dripping Springs, Texas. Every purchase honors his pioneering spirit.
          </p>
        </div>

        {/* Store Offerings Image */}
        <div className="max-w-5xl mx-auto mb-12">
          <a
            href={storeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="block rounded-lg border-4 border-tan/30 overflow-hidden shadow-xl hover:shadow-2xl transition-all hover:border-primary/50"
          >
            <Image
              src="/images/store-offerings.png"
              alt="Pound Town Store Offerings"
              width={1200}
              height={800}
              className="w-full h-auto"
              priority
            />
          </a>
        </div>

        {/* Store Link Card */}
        <div className="max-w-3xl mx-auto mb-12">
          <div className="bg-gradient-to-br from-primary via-secondary to-rust text-cream p-12 rounded-lg border-4 border-tan/30 shadow-2xl text-center">
            <div className="text-6xl mb-6">🏛️</div>
            <h2 className="text-3xl font-bold mb-4">Support the Legacy</h2>
            <p className="text-lg mb-8 opacity-90">
              Wear and share Pound Town merchandise to celebrate Dr. Pound's extraordinary 
              contributions to the Texas Hill Country
            </p>
            <a
              href={storeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block bg-cream text-primary hover:bg-white px-8 py-4 rounded-lg font-bold uppercase tracking-wider text-lg transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Shop Now →
            </a>
            <p className="text-sm mt-4 opacity-75">Opens in a new window</p>
          </div>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <div className="bg-white p-6 rounded border-2 border-tan/30 text-center">
            <div className="text-4xl mb-3">🎁</div>
            <h3 className="text-lg font-bold text-primary mb-2">Unique Gifts</h3>
            <p className="text-gray-600 text-sm">
              One-of-a-kind merchandise you won't find anywhere else
            </p>
          </div>
          <div className="bg-white p-6 rounded border-2 border-tan/30 text-center">
            <div className="text-4xl mb-3">🚚</div>
            <h3 className="text-lg font-bold text-primary mb-2">Fast Shipping</h3>
            <p className="text-gray-600 text-sm">
              Orders processed and shipped quickly by Printful
            </p>
          </div>
          <div className="bg-white p-6 rounded border-2 border-tan/30 text-center">
            <div className="text-4xl mb-3">✨</div>
            <h3 className="text-lg font-bold text-primary mb-2">Quality Guaranteed</h3>
            <p className="text-gray-600 text-sm">
              High-quality prints and materials on every product
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
