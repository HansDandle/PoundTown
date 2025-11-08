'use client'

import Link from 'next/link'
import { useState } from 'react'

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="bg-cream shadow-lg sticky top-0 z-50 border-b-4 border-primary/20">
      <div className="container-custom">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link href="/" className="text-2xl rustic-heading hover:text-rust transition-colors">
            Pound Town, TX
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-800 hover:text-primary font-semibold transition-colors uppercase text-sm tracking-wide">
              Home
            </Link>
            <Link href="/shop" className="text-gray-800 hover:text-primary font-semibold transition-colors uppercase text-sm tracking-wide">
              Shop Gifts
            </Link>
            <Link href="/about" className="text-gray-800 hover:text-primary font-semibold transition-colors uppercase text-sm tracking-wide">
              About
            </Link>
            <Link href="/blog" className="text-gray-800 hover:text-primary font-semibold transition-colors uppercase text-sm tracking-wide">
              Blog
            </Link>
            <Link href="/shop" className="btn-primary text-sm">
              🎁 Gift Shop
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="md:hidden p-2 rounded hover:bg-tan/30 transition-colors"
            aria-label="Toggle menu"
          >
            <svg
              className="w-6 h-6 text-primary"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              {isMenuOpen ? (
                <path d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4 space-y-2 bg-cream/95">
            <Link
              href="/"
              className="block py-2 px-4 text-gray-800 hover:bg-tan/30 rounded transition-colors uppercase text-sm tracking-wide font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/shop"
              className="block py-2 px-4 text-gray-800 hover:bg-tan/30 rounded transition-colors uppercase text-sm tracking-wide font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Shop Gifts
            </Link>
            <Link
              href="/about"
              className="block py-2 px-4 text-gray-800 hover:bg-tan/30 rounded transition-colors uppercase text-sm tracking-wide font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              About
            </Link>
            <Link
              href="/blog"
              className="block py-2 px-4 text-gray-800 hover:bg-tan/30 rounded transition-colors uppercase text-sm tracking-wide font-semibold"
              onClick={() => setIsMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              href="/shop"
              className="block mt-2 btn-primary text-center"
              onClick={() => setIsMenuOpen(false)}
            >
              🎁 Gift Shop
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}
