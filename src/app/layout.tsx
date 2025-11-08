import type { Metadata } from 'next'
import { Inter, Merriweather } from 'next/font/google'
import './globals.css'
import Navigation from '@/components/Navigation'
import Footer from '@/components/Footer'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const merriweather = Merriweather({ 
  weight: ['300', '400', '700', '900'],
  subsets: ['latin'],
  variable: '--font-display',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL('https://poundtowntx.com'),
  title: {
    default: 'Pound Town, Texas - Unique Gifts & Merch | Dripping Springs, TX 78620',
    template: '%s | Pound Town, Texas'
  },
  description: 'Discover unique gifts, holiday presents, and exclusive merchandise from Pound Town, Texas. Perfect gifts for friends and family in Dripping Springs, TX 78620. Shop local Texas gifts today!',
  keywords: [
    'gifts',
    'holiday gifts',
    'Dripping Springs gifts',
    'Texas gifts',
    'Pound Town merch',
    'unique gifts',
    'local gifts',
    'Dripping Springs TX',
    '78620',
    'Christmas gifts',
    'birthday gifts',
    'gift shop',
    'Texas souvenirs',
    'Dripping Springs shopping'
  ],
  authors: [{ name: 'Pound Town, Texas' }],
  creator: 'Pound Town, Texas',
  publisher: 'Pound Town, Texas',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://poundtowntx.com',
    siteName: 'Pound Town, Texas',
    title: 'Pound Town, Texas - Unique Gifts & Holiday Presents | Dripping Springs, TX',
    description: 'Shop unique gifts and exclusive merchandise from Pound Town, Texas. Perfect holiday gifts in Dripping Springs, TX 78620.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Pound Town, Texas - Gifts & Merch',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Pound Town, Texas - Unique Gifts & Merch',
    description: 'Discover unique gifts and exclusive merchandise from Dripping Springs, TX',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${merriweather.variable}`}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <meta name="theme-color" content="#8B4513" />
        <meta name="geo.region" content="US-TX" />
        <meta name="geo.placename" content="Dripping Springs" />
        <meta name="geo.position" content="30.1897;-98.0867" />
        <meta name="ICBM" content="30.1897, -98.0867" />
      </head>
      <body className={inter.className}>
        <Navigation />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  )
}
