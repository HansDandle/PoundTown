import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Pound Town, Texas - Honoring Dripping Springs Founders',
  description: 'Learn about Pound Town, Texas and our mission to honor Dr. Joseph and Sarah Pound, the founders of Dripping Springs, TX 78620. Discover our unique gifts and local Texas merchandise.',
}

export default function AboutPage() {
  return (
    <div className="py-16">
      <div className="container-custom max-w-4xl">
        <h1 className="text-4xl md:text-5xl font-display font-bold mb-8 text-center">
          About Pound Town, Texas
        </h1>

        {/* Featured Gateway Image */}
        <div className="mb-12">
          <div className="relative aspect-[4/3] rounded-xl overflow-hidden shadow-2xl max-w-2xl mx-auto">
            <Image 
              src="/images/pt-gateway.png"
              alt="Pound Town Texas Gateway Sign - Welcome to Dripping Springs"
              fill
              className="object-cover"
              priority
            />
          </div>
          <p className="text-center text-sm text-gray-600 mt-4 italic">
            The Pound Town Gateway - Honoring our founders
          </p>
        </div>

        <div className="prose prose-lg max-w-none">
          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
            <p className="text-gray-700 mb-4">
              Pound Town, Texas represents an initiative to rename Dripping Springs, TX 
              in order to honor the memory of Dr. Joseph and Sarah Pound, the town's 
              original founders. Through our unique gifts and merchandise, we celebrate 
              the rich history of Dripping Springs and the Hill Country.
            </p>
          </section>

          <section className="mb-12 bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold mb-6">The Pound Family Legacy</h2>
            <div className="space-y-4 text-gray-700">
              <div className="flex items-start">
                <span className="text-2xl mr-3">🏥</span>
                <p>
                  <strong>Dr. Pound was the earliest doctor in Hays County</strong>, 
                  providing essential medical care to the pioneering community.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🏛️</span>
                <p>
                  <strong>The Pound house served as a community hub</strong>, functioning 
                  as a medical office, hospital, church, schoolhouse, post office, and 
                  social gathering place for the fledgling community of Dripping Springs.
                </p>
              </div>
              <div className="flex items-start">
                <span className="text-2xl mr-3">🤝</span>
                <p>
                  <strong>Dr. Pound treated local native people with respect</strong>, and due 
                  to this compassionate approach, his homestead was never raided.
                </p>
              </div>
            </div>
            <p className="mt-6 text-sm text-gray-600">
              Source:{' '}
              <a 
                href="https://en.wikipedia.org/wiki/Dr._Joseph_M._and_Sarah_Pound_Farmstead"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline"
              >
                Dr. Joseph M. and Sarah Pound Farmstead - Wikipedia
              </a>
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Dripping Springs?</h2>
            <p className="text-gray-700 mb-4">
              Located in the beautiful Texas Hill Country at ZIP code 78620, Dripping 
              Springs has grown from a small pioneer settlement to a thriving community. 
              Our gifts and merchandise celebrate this heritage while supporting local 
              Texas culture.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">Shop Local Gifts</h2>
            <p className="text-gray-700 mb-6">
              Every purchase supports our mission to preserve and celebrate the history 
              of Dripping Springs, Texas. Browse our selection of unique gifts perfect 
              for holidays, birthdays, and special occasions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a href="/shop" className="btn-primary text-center">
                Browse Gift Shop
              </a>
              <a href="/blog" className="btn-secondary text-center">
                Read Our Blog
              </a>
            </div>
          </section>
        </div>
      </div>

      {/* FAQ Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            "mainEntity": [
              {
                "@type": "Question",
                "name": "What is Pound Town, Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pound Town, Texas is an initiative to honor Dr. Joseph and Sarah Pound, the founders of Dripping Springs, TX. We offer unique gifts and merchandise celebrating the rich history of the Texas Hill Country."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Pound Town located?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pound Town represents Dripping Springs, Texas, located in the Hill Country at ZIP code 78620."
                }
              },
              {
                "@type": "Question",
                "name": "What kind of gifts do you offer?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "We offer unique local Texas gifts, holiday presents, apparel, home decor, and exclusive merchandise celebrating Dripping Springs and Texas Hill Country culture."
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}
