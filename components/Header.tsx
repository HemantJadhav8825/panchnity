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
      if (scrollTimeout) clearTimeout(scrollTimeout)
      if (rafId) cancelAnimationFrame(rafId)

      rafId = requestAnimationFrame(() => {
        scrollTimeout = setTimeout(() => {
          setIsScrolled(window.scrollY > 50)
        }, 50)
      })
    }

    const updateHeaderHeights = () => {
      if (mainHeaderRef.current) {
        setMainHeaderHeight(mainHeaderRef.current.offsetHeight)
      }
      if (bottomNavRef.current) {
        setBottomNavHeight(bottomNavRef.current.offsetHeight)
      }
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    window.addEventListener('resize', updateHeaderHeights)
    updateHeaderHeights()

    return () => {
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('resize', updateHeaderHeights)
      if (scrollTimeout) clearTimeout(scrollTimeout)
      if (rafId) cancelAnimationFrame(rafId)
    }
  }, [])

  const categories = [
    {
      name: 'Idols',
      href: '/products?category=idol',
      items: [
        { name: 'Silver Idols', href: '/products?category=idol&material=silver' },
      ],
    },
    {
      name: 'Pooja Items',
      href: '/products?category=pooja-item',
      items: [
        { name: 'Silver Pooja Items', href: '/products?category=pooja-item&material=silver' },
      ],
    },
    {
      name: 'Jewellery',
      href: '/products?category=jewellery',
      items: [
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
          <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-1 hover:text-gold-300">
            <Phone className="w-3 h-3" />
            <span className="hidden sm:inline">{WHATSAPP_NUMBER}</span>
          </a>
          <Link href="#" className="flex items-center gap-1 hover:text-gold-300">
            <Eye className="w-3 h-3" />
            <span className="hidden sm:inline">Recently Viewed</span>
          </Link>
          <Link href="#" className="flex items-center gap-1 hover:text-gold-300">
            <MapPin className="w-3 h-3" />
            <span className="hidden sm:inline">Locate Our Store</span>
          </Link>
        </div>
      </div>

      {/* Main Header */}
      <div
        ref={mainHeaderRef}
        className={`w-full bg-white/95 backdrop-blur-md border-b border-gold-200 transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${isScrolled ? 'h-16' : ''}`}>
            <Link href="/" className="flex flex-col group hover:scale-105 transition">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
                {BRAND_NAME}
              </h1>
              <p className="text-xs sm:text-sm text-gold-500 tracking-wider opacity-80">
                {BRAND_SUBTITLE}
              </p>
            </Link>

            <div className="flex-grow max-w-md mx-4 md:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for Jewellery"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-300"
                />
              </div>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <nav
        ref={bottomNavRef}
        className={`bg-gray-800 py-3 w-full border-t border-gold-200 shadow-lg hidden lg:block overflow-visible ${
          isScrolled ? 'fixed top-0' : 'relative'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center space-x-8 overflow-x-auto overflow-y-visible whitespace-nowrap">
            <li>
              <Link href="/" className="text-gray-200 hover:text-gold-300">
                Home
              </Link>
            </li>

            {categories.map(category => (
              <li
                key={category.name}
                className="relative"
                onMouseEnter={() => setCategoryMenuOpen(category.name)}
                onMouseLeave={() => setCategoryMenuOpen(null)}
              >
                <Link
                  href={category.href}
                  className="flex items-center gap-1 text-gray-200 hover:text-gold-300"
                >
                  {category.name}
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      categoryMenuOpen === category.name ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 z-50 transition ${
                    categoryMenuOpen === category.name
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="w-56 bg-white rounded-xl shadow-2xl py-2">
                    {category.items.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-gold-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      {isScrolled && (
        <div className="hidden lg:block" style={{ height: bottomNavHeight }} />
      )}
    </header>
  )
}
