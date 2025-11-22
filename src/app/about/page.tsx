import type { Metadata } from 'next'
import Image from 'next/image'

export const metadata: Metadata = {
  title: 'About Pound Town, Texas - Dr. Pound\'s Legacy & History',
  description: 'Discover the remarkable story of Dr. Joseph and Sarah Pound, the founders of Dripping Springs, TX 78620. Learn about their pioneer spirit, medical service, and lasting impact on the Texas Hill Country.',
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
              Pound Town, Texas celebrates the legacy of Dr. Joseph and Sarah Pound, 
              the pioneering founders of what is now known as Dripping Springs in the 
              Texas Hill Country. This movement honors their extraordinary contributions 
              to community building, medical service, and respectful stewardship.
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
              Dripping Springs, located in the Texas Hill Country at ZIP code 78620, was 
              founded on the principles Dr. Pound established: service to the community, 
              medical care, spiritual leadership, and education. These values continue 
              to define the character of this historic region today.
            </p>
          </section>

          <section className="mb-12">
            <h2 className="text-3xl font-bold mb-4">The Renaming Movement</h2>
            <p className="text-gray-700 mb-6">
              In 2019, a petition gained significant attention to rename Dripping Springs 
              to "Pound Town" in recognition of the Pound family's foundational role. 
              While Texas state law presented legal obstacles, the movement continues to 
              celebrate and honor their lasting legacy.
            </p>
            <p className="text-gray-700">
              This website serves as a tribute to Dr. Joseph Pound's pioneering spirit 
              and the enduring impact of his service to the Hill Country community.
            </p>
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
                "name": "Who was Dr. Joseph Pound?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dr. Joseph Pound was the earliest doctor in Hays County and the founder of what is now Dripping Springs, Texas. His home served as a medical office, hospital, church, schoolhouse, and community gathering place."
                }
              },
              {
                "@type": "Question",
                "name": "What is the Pound Town movement?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Pound Town is an initiative to honor Dr. Joseph and Sarah Pound by renaming Dripping Springs, Texas after them. While facing legal obstacles, the movement continues to celebrate their pioneering legacy."
                }
              },
              {
                "@type": "Question",
                "name": "Where is Dripping Springs, Texas?",
                "acceptedAnswer": {
                  "@type": "Answer",
                  "text": "Dripping Springs is located in the Texas Hill Country at ZIP code 78620, in Hays County. It was founded by Dr. Joseph and Sarah Pound in the 1800s."
                }
              }
            ]
          })
        }}
      />
    </div>
  )
}
