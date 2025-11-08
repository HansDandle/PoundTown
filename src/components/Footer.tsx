import Link from 'next/link'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-gradient-to-br from-primary via-secondary to-rust text-cream border-t-4 border-primary">
      <div className="container-custom py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl rustic-heading mb-4">
              Pound Town, TX
            </h3>
            <div className="h-1 w-16 bg-cream/50 rounded mb-4"></div>
            <p className="text-cream/90 mb-4">
              Unique gifts and exclusive merchandise from the heart of Texas.
              Perfect holiday gifts and special occasion presents.
            </p>
            <p className="text-sm text-cream/70">
              Honoring Dr. Joseph and Sarah Pound, founders of our town
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-bold text-cream mb-4 uppercase tracking-wide">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/shop" className="hover:text-white transition-colors text-cream/90">
                  Shop Gifts
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors text-cream/90">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/blog" className="hover:text-white transition-colors text-cream/90">
                  Blog
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold text-cream mb-4 uppercase tracking-wide">Location</h4>
            <p className="text-cream/90">
              Pound Town, TX<br />
              Texas Hill Country<br/>
              <span className="text-sm text-cream/70">Serving Dripping Springs, TX 78620</span>
            </p>
          </div>
        </div>

        <div className="border-t border-cream/30 mt-8 pt-8 text-center text-sm text-cream/80">
          <p>
            © {currentYear} Pound Town, TX. All rights reserved.
          </p>
          <p className="mt-2">
            Texas Hill Country | Holiday Gifts | Local Texas Gifts
          </p>
        </div>
      </div>

      {/* Organization Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Pound Town, Texas",
            "url": "https://poundtowntx.com",
            "logo": "https://poundtowntx.com/logo.png",
            "sameAs": [],
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Dripping Springs",
              "addressRegion": "TX",
              "postalCode": "78620",
              "addressCountry": "US"
            }
          })
        }}
      />
    </footer>
  )
}
