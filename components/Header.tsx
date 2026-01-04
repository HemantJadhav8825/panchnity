'use client'

import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { BRAND_NAME, BRAND_SUBTITLE, WHATSAPP_NUMBER } from '@/lib/constants'
import { Menu, X, ChevronDown, Phone, Eye, MapPin, Search } from 'lucide-react'

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [categoryMenuOpen, setCategoryMenuOpen] = useState<string | null>(null)
  const [isScrolled, setIsScrolled] = useState(false)
  const [mainHeaderHeight, setMainHeaderHeight] = useState(0)
  const [bottomNavHeight, setBottomNavHeight] = useState(0)

  const mainHeaderRef = useRef<HTMLDivElement>(null)
  const bottomNavRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let scrollTimeout: NodeJS.Timeout | null = null
    let rafId: number | null = null

    const handleScroll = () => {
      // Clear any existing timeout and animation frame
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
      }

      // Use requestAnimationFrame for smooth updates
      rafId = requestAnimationFrame(() => {
        // Debounce the state update to reduce frequency
        scrollTimeout = setTimeout(() => {
          setIsScrolled(window.scrollY > 150) // Threshold for scroll effect
        }, 50) // ~16ms debounce (roughly one frame at 60fps)
      })
    }

    const updateHeaderHeights = () => {
      if (mainHeaderRef.current) {
        setMainHeaderHeight(mainHeaderRef.current.offsetHeight) // Get dynamic height
      }
      if (bottomNavRef.current) {
        setBottomNavHeight(bottomNavRef.current.offsetHeight) // Get dynamic height
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateHeaderHeights) // Recalculate on resize
    updateHeaderHeights() // Initial calculation

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeaderHeights)
      if (scrollTimeout) {
        clearTimeout(scrollTimeout)
      }
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
    }
  }, [])

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
    <header className="relative z-50">
      {/* Top Bar */}
      <div 
        className={`bg-gray-100 py-2 text-xs text-gray-700 transition-all duration-300 ease-in-out ${
          isScrolled ? 'md:h-0 md:py-0 md:opacity-0 md:overflow-hidden' : 'md:block'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center space-x-4 md:space-x-6">
          <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-1 hover:text-gold-300 transition-colors">
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">{WHATSAPP_NUMBER}</span>
          </a>
          <Link href="#" className="flex items-center gap-1 hover:text-gold-300 transition-colors">
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Recently Viewed</span>
          </Link>
          <Link href="#" className="flex items-center gap-1 hover:text-gold-300 transition-colors">
            <MapPin className="w-3 h-3" />
            <span className="hidden sm:inline">Locate Our Store</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div 
        ref={mainHeaderRef} // Attach ref here
        className={`w-full bg-white/95 backdrop-blur-md border-b border-gold-200 transition-all duration-300 ease-in-out z-40 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-sm py-4'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div 
            className={`flex items-center justify-between transition-all duration-300 ease-in-out ${
              isScrolled ? 'h-16' : 'h-20'
            }`}
          >
            <Link 
              href="/" 
              className="flex flex-col group transition-transform duration-300 hover:scale-105"
            >
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gold-300 group-hover:text-gold-400 transition-all duration-300">
                {BRAND_NAME}
              </h1>
              <p className="text-xs sm:text-sm text-gold-500 font-sans tracking-wider opacity-80 group-hover:opacity-100 transition-opacity duration-300">
                {BRAND_SUBTITLE}
              </p>
            </Link>
            
            {/* Search Input - Always visible on Mobile (BlueStone style) */}
            <div className="flex-grow max-w-md mx-4 md:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="Search for Jewellery"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-gold-300 outline-none"
                />
              </div>
            </div>

            {/* Utility Icons (Desktop) - Keep them hidden on mobile */}
            {/* Utility Icons (Desktop) - Keep them hidden on mobile */}
            <div className="hidden md:flex items-center gap-4">
              {/* For consistency with BlueStone, these would be on the right, but we exclude auth/cart */}
            </div>

            {/* Mobile menu button */}
            <button
              type="button"
              className="lg:hidden text-gray-700 hover:text-gold-300 transition-all duration-300 p-2 rounded-lg hover:bg-gold-50 active:scale-95"
              aria-label="Menu"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <div className="relative w-6 h-6">
                <Menu 
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-0 rotate-90' : 'opacity-100 rotate-0'
                  }`} 
                />
                <X 
                  className={`absolute inset-0 w-6 h-6 transition-all duration-300 ${
                    mobileMenuOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'
                  }`} 
                />
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar (Desktop Only) */}
      <nav 
        ref={bottomNavRef} // Attach ref here
        className={`bg-gray-800 py-3 w-full border-t border-gold-200 shadow-lg z-50 transition-all duration-300 ease-in-out hidden lg:block ${
          isScrolled ? 'fixed top-0' : 'relative'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ul className="flex justify-center space-x-4 md:space-x-8 overflow-x-auto whitespace-nowrap scrollbar-hide">
            <li>
              <Link
                href="/"
                className="relative text-gray-200 hover:text-gold-300 font-medium transition-all duration-300 group py-2 px-2 md:px-0 block"
              >
                <span className="relative z-10">Home</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-300 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
            
            {categories.map((category) => (
              <li
                key={category.name}
                className="relative"
                onMouseEnter={() => setCategoryMenuOpen(category.name)}
                onMouseLeave={() => setCategoryMenuOpen(null)}
              >
                <Link
                  href={category.href}
                  className="flex items-center gap-1 text-gray-200 hover:text-gold-300 font-medium transition-all duration-300 group relative py-2 px-2 md:px-0 block"
                >
                  <span className="relative z-10">{category.name}</span>
                  <ChevronDown 
                    className={`w-4 h-4 text-gray-400 transition-transform duration-300 ${
                      categoryMenuOpen === category.name ? 'rotate-180' : ''
                    }`} 
                  />
                  <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-300 group-hover:w-full transition-all duration-300"></span>
                </Link>
                
                <div 
                  className={`absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50 transition-all duration-300 ${
                    categoryMenuOpen === category.name 
                      ? 'opacity-100 translate-y-0 pointer-events-auto' 
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="w-56 bg-white/98 backdrop-blur-md rounded-xl shadow-2xl border border-gold-100 py-2 overflow-hidden">
                    <div className="space-y-1">
                      {category.items.map((item, index) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className="block px-4 py-2.5 text-gray-700 hover:bg-gold-50 hover:text-gold-300 transition-all duration-200 transform hover:translate-x-1 relative group/item"
                          onClick={() => setCategoryMenuOpen(null)}
                          style={{
                            animationDelay: categoryMenuOpen === category.name ? `${index * 50}ms` : '0ms'
                          }}
                        >
                          <span className="absolute left-0 top-0 bottom-0 w-1 bg-gold-300 transform scale-y-0 group-hover/item:scale-y-100 transition-transform duration-200 origin-center"></span>
                          <span className="relative z-10">{item.name}</span>
                        </Link>
                      ))}
                    </div>
                    <div className="border-t border-gold-100 mt-2 pt-2">
                      <Link
                        href={category.href}
                        className="block px-4 py-2.5 text-gold-300 hover:bg-gold-50 font-semibold transition-all duration-200 transform hover:translate-x-1 relative group/viewall"
                        onClick={() => setCategoryMenuOpen(null)}
                      >
                        <span className="absolute left-0 top-0 bottom-0 w-1 bg-gold-300 transform scale-y-0 group-hover/viewall:scale-y-100 transition-transform duration-200 origin-center"></span>
                        <span className="relative z-10">View All {category.name}</span>
                      </Link>
                    </div>
                  </div>
                </div>
              </li>
            ))}
            
            <li>
              <Link
                href="/products"
                className="relative text-gray-200 hover:text-gold-300 font-medium transition-all duration-300 group py-2 px-2 md:px-0 block"
              >
                <span className="relative z-10">All Products</span>
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gold-300 group-hover:w-full transition-all duration-300"></span>
              </Link>
            </li>
          </ul>
        </div>
      </nav>
      {/* Spacer to prevent layout shift when navbar becomes fixed */}
      {isScrolled && (
        <div 
          className="hidden lg:block"
          style={{ height: `${bottomNavHeight}px` }}
          aria-hidden="true"
        />
      )}
      {/* Mobile menu */}
      <div 
        className={`lg:hidden border-t border-gold-200 overflow-hidden transition-all duration-300 ${
          mobileMenuOpen 
            ? 'max-h-screen opacity-100' 
            : 'max-h-0 opacity-0'
        }`}
      >
        <nav className="flex flex-col space-y-1 py-4">
          <Link
            href="/"
            className="px-4 py-3 text-gray-700 hover:text-gold-300 hover:bg-gold-50 font-medium transition-all duration-200 rounded-lg transform hover:translate-x-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            Home
          </Link>
          {categories.map((category, catIndex) => (
            <div key={category.name} className="space-y-1">
              <Link
                href={category.href}
                className="block px-4 py-3 text-gray-700 hover:text-gold-300 hover:bg-gold-50 font-medium transition-all duration-200 rounded-lg transform hover:translate-x-1"
                onClick={() => setMobileMenuOpen(false)}
                style={{
                  animationDelay: mobileMenuOpen ? `${(catIndex + 1) * 50}ms` : '0ms'
                }}
              >
                {category.name}
              </Link>
              <div className="pl-6 space-y-1">
                {category.items.map((item, itemIndex) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="block px-4 py-2 text-sm text-gray-600 hover:text-gold-300 hover:bg-gold-50 transition-all duration-200 rounded-lg transform hover:translate-x-1"
                    onClick={() => setMobileMenuOpen(false)}
                    style={{
                      animationDelay: mobileMenuOpen ? `${(catIndex + 1) * 100 + (itemIndex + 1) * 50}ms` : '0ms'
                    }}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
          <Link
            href="/products"
            className="px-4 py-3 text-gray-700 hover:text-gold-300 hover:bg-gold-50 font-medium transition-all duration-200 rounded-lg transform hover:translate-x-1"
            onClick={() => setMobileMenuOpen(false)}
          >
            All Products
          </Link>
        </nav>
      </div>
    </header>
  )
}
