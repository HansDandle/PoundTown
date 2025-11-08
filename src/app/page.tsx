import Image from 'next/image'
import Link from 'next/link'
import bloggerContent from '../../blogger_content.json'

export default function Home() {
  return (
    <>
      {/* Hero Section with PT Gateway Image */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-rust text-cream py-20 md:py-32 overflow-hidden">
        {/* Rustic texture overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="container-custom relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div className="text-center lg:text-left order-2 lg:order-1">
              <h1 className="text-4xl md:text-6xl rustic-heading mb-6 text-cream drop-shadow-lg">
                Welcome to Pound Town, TX
              </h1>
              <p className="text-xl md:text-2xl mb-6 text-cream/90">
                Unique Gifts & Exclusive Merch from the Heart of Texas
              </p>
              <p className="text-lg mb-8 text-cream/80">
                Perfect holiday gifts, birthday presents, and special occasion merchandise.
                Shop local Texas gifts that celebrate our community!
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/shop" className="btn-primary inline-block">
                  Shop Gifts Now
                </Link>
                <Link href="/about" className="btn-secondary inline-block">
                  Learn Our Story
                </Link>
              </div>
            </div>
            
            {/* Featured PTBB Image */}
            <div className="order-1 lg:order-2">
              <div className="relative w-full max-w-lg mx-auto">
                <div className="relative rounded-sm overflow-hidden shadow-2xl">
                  <Image 
                    src="/images/ptbb.jpg"
                    alt="Pound Town Texas Billboard"
                    width={800}
                    height={600}
                    className="w-full h-auto"
                    priority
                  />
                </div>
                {/* Rustic decorative elements */}
                <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent rounded-full opacity-20 blur-2xl"></div>
                <div className="absolute -top-4 -left-4 w-40 h-40 bg-rust rounded-full opacity-10 blur-3xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Shop */}
      <section className="py-16 bg-tan/20">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl rustic-heading text-center mb-4">
            Shop:
          </h2>
          <div className="text-center mb-12">
            <div className="inline-block h-1 w-24 bg-primary rounded"></div>
          </div>
          <div className="max-w-4xl mx-auto">
            <Link href={process.env.NEXT_PUBLIC_PRINTFUL_STORE_URL || 'https://poundtown.printful.me/'} target="_blank" rel="noopener noreferrer" className="block hover:opacity-90 transition-opacity">
              <Image 
                src="/images/store-offerings.png"
                alt="Shop Our Products"
                width={1200}
                height={800}
                className="w-full h-auto rounded-lg shadow-xl"
              />
            </Link>
          </div>
        </div>
      </section>

      {/* Latest Posts */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl rustic-heading text-center mb-4">
            Latest Updates
          </h2>
          <div className="text-center mb-12">
            <div className="inline-block h-1 w-24 bg-primary rounded"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {bloggerContent.posts.slice(0, 3).map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="card group hover:border-primary/50">
                <div className="p-6 bg-gradient-to-br from-white to-tan/10">
                  <h3 className="text-xl font-bold mb-3 text-primary group-hover:text-rust transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-4">
                    {new Date(post.published).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </p>
                  <span className="text-secondary font-semibold group-hover:underline">
                    Read More →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* About Section with Image */}
      <section className="py-16 bg-tan/20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center max-w-6xl mx-auto">
            {/* PT Gateway Image */}
            <div className="order-2 lg:order-1">
              <div className="relative aspect-[4/3] rounded-sm overflow-hidden shadow-xl border-4 border-primary/20">
                <Image 
                  src="/images/pt-gateway.png"
                  alt="Pound Town Texas Gateway - Honoring Dr. Pound"
                  fill
                  className="object-cover"
                />
              </div>
              <p className="text-center text-sm text-gray-600 mt-3 italic">
                The Pound Town Gateway - Honoring our founders
              </p>
            </div>
            
            {/* Text */}
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl md:text-4xl rustic-heading mb-6">
                About Pound Town, TX
              </h2>
              <div className="h-1 w-16 bg-primary rounded mb-6"></div>
              <p className="text-lg text-gray-800 mb-6 leading-relaxed">
                Pound Town honors the memory of Dr. Joseph and Sarah Pound, 
                the founders of our beloved town. Dr. Pound was the earliest doctor 
                in Hays County, and their home served as a medical office, hospital, 
                church, schoolhouse, post office, and social gathering place.
              </p>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Through our unique gifts and merchandise, we celebrate the rich history 
                and pioneer spirit that built this community.
              </p>
              <Link href="/about" className="btn-primary inline-block">
                Learn More About Our Mission
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Local SEO Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Pound Town, Texas",
            "description": "Unique gifts and merchandise from Dripping Springs, Texas",
            "url": "https://poundtowntx.com",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dripping Springs",
              "addressRegion": "TX",
              "postalCode": "78620",
              "addressCountry": "US"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "30.1897",
              "longitude": "-98.0867"
            },
            "areaServed": {
              "@type": "City",
              "name": "Dripping Springs"
            },
            "keywords": "gifts, holiday gifts, Dripping Springs, Texas gifts, merchandise, local gifts"
          })
        }}
      />
    </>
  )
}
