'use client'

import { useState } from 'react'
import Link from 'next/link'
import { BRAND_NAME, BRAND_SUBTITLE } from '@/lib/constants'
import { Menu, X, ChevronDown } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoryMenuOpen, setCategoryMenuOpen] = useState<string | null>(null)

  const categories = [
    {
      name: 'Idols',
      href: '/products?category=idol',
      items: [
        { name: 'Gold Idols', href: '/products?category=idol&material=gold' },
        { name: 'Silver Idols', href: '/products?category=idol&material=silver' },
      ],
    },
    {
      name: 'Pooja Items',
      href: '/products?category=pooja-item',
      items: [
        { name: 'Gold Pooja Items', href: '/products?category=pooja-item&material=gold' },
        { name: 'Silver Pooja Items', href: '/products?category=pooja-item&material=silver' },
      ],
    },
    {
      name: 'Jewellery',
      href: '/products?category=jewellery',
      items: [
        { name: 'Gold Jewellery', href: '/products?category=jewellery&material=gold' },
        { name: 'Silver Jewellery', href: '/products?category=jewellery&material=silver' },
      ],
    },
  ]

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
          
          <nav className="hidden lg:flex items-center space-x-6">
            <Link
              href="/"
              className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
            >
              Home
            </Link>
            
            {categories.map((category) => (
              <div
                key={category.name}
                className="relative group"
                onMouseEnter={() => setCategoryMenuOpen(category.name)}
                onMouseLeave={() => setCategoryMenuOpen(null)}
              >
                <Link
                  href={category.href}
                  className="flex items-center gap-1 text-gray-700 hover:text-gold-300 font-medium transition-colors"
                >
                  {category.name}
                  <ChevronDown className="w-4 h-4" />
                </Link>
                
                {categoryMenuOpen === category.name && (
                  <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-lg shadow-xl border border-gold-100 py-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-700 hover:bg-gold-50 hover:text-gold-300 transition-colors"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Link
                      href={category.href}
                      className="block px-4 py-2 text-gold-300 hover:bg-gold-50 font-semibold border-t border-gold-100 mt-2"
                    >
                      View All {category.name}
                    </Link>
                  </div>
                )}
              </div>
            ))}
            
            <Link
              href="/products"
              className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
            >
              All Products
            </Link>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="lg:hidden text-gray-700 hover:text-gold-300 transition-colors"
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
          <div className="lg:hidden border-t border-gold-200 py-4">
            <nav className="flex flex-col space-y-4">
              <Link
                href="/"
                className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              {categories.map((category) => (
                <div key={category.name}>
                  <Link
                    href={category.href}
                    className="text-gray-700 hover:text-gold-300 font-medium transition-colors block mb-2"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {category.name}
                  </Link>
                  <div className="pl-4 space-y-2">
                    {category.items.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block text-sm text-gray-600 hover:text-gold-300 transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              ))}
              <Link
                href="/products"
                className="text-gray-700 hover:text-gold-300 font-medium transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                All Products
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}
