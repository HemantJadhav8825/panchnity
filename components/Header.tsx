'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BRAND_NAME, BRAND_SUBTITLE } from '@/lib/constants'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="bg-white border-b border-gold-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <Link href="/" className="flex flex-col group">
            <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gold-300 group-hover:text-gold-400 transition-colors">
              {BRAND_NAME}
            </h1>
            <p className="text-xs sm:text-sm text-gold-500 font-sans tracking-wider">
              {BRAND_SUBTITLE}
            </p>
          </Link>
          
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
            >
              Home
            </Link>
            <Link
              href="/products"
              className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
            >
              Products
            </Link>
            <Link
              href="/products?category=idol"
              className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
            >
              Idols
            </Link>
            <Link
              href="/products?category=pooja-item"
              className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
            >
              Pooja Items
            </Link>
            <Link
              href="/products?category=jewellery"
              className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
            >
              Jewellery
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-gray-700 hover:text-gold-300 transition-colors"
            aria-label="Menu"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gold-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/products"
                className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Products
              </Link>
              <Link
                href="/products?category=idol"
                className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Idols
              </Link>
              <Link
                href="/products?category=pooja-item"
                className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Pooja Items
              </Link>
              <Link
                href="/products?category=jewellery"
                className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Jewellery
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
