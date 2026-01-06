'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import {
  Menu,
  X,
  ChevronDown,
  Phone,
  Eye,
  MapPin,
  Search,
} from 'lucide-react'
import { BRAND_NAME, BRAND_SUBTITLE, WHATSAPP_NUMBER } from '@/lib/constants'

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  /* ---------------- Scroll (visual only) ---------------- */
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categories = [
    {
      label: 'Idols',
      href: '/products?category=idol',
      items: [
        { label: 'Silver Idols', href: '/products?category=idol&material=silver' },
      ],
    },
    {
      label: 'Pooja Items',
      href: '/products?category=pooja-item',
      items: [
        { label: 'Silver Pooja Items', href: '/products?category=pooja-item&material=silver' },
      ],
    },
    {
      label: 'Jewellery',
      href: '/products?category=jewellery',
      items: [
        { label: 'Silver Jewellery', href: '/products?category=jewellery&material=silver' },
      ],
    },
  ]

  return (
    <header className="relative z-50">
      {/* ================= TOP BAR ================= */}
      <div className="hidden md:block bg-gray-100 text-xs">
        <div className="max-w-7xl mx-auto px-6 py-2 flex justify-end gap-6">
          <a
            href={`tel:${WHATSAPP_NUMBER}`}
            className="flex items-center gap-1 hover:text-gold-400"
          >
            <Phone size={12} />
            {WHATSAPP_NUMBER}
          </a>
          <Link href="#" className="flex items-center gap-1 hover:text-gold-400">
            <Eye size={12} /> Recently Viewed
          </Link>
          <Link href="#" className="flex items-center gap-1 hover:text-gold-400">
            <MapPin size={12} /> Locate Store
          </Link>
        </div>
      </div>

      {/* ================= MAIN HEADER ================= */}
      <div
        className={`bg-white backdrop-blur border-b transition-shadow ${scrolled ? 'shadow-md' : ''
          }`}
      >
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <Link href="/" className="leading-tight">
            <h1 className="text-2xl font-serif font-bold text-gold-400">
              {BRAND_NAME}
            </h1>
            <p className="text-xs tracking-wide text-gold-600">
              {BRAND_SUBTITLE}
            </p>
          </Link>

          <div className="hidden md:block w-full max-w-md mx-8">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                size={18}
              />
              <input
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-300"
                placeholder="Search jewellery"
              />
            </div>
          </div>

          <button className="lg:hidden" onClick={() => setMobileOpen(v => !v)}>
            {mobileOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* ================= DESKTOP NAV (CSS ONLY) ================= */}
      <nav className="hidden lg:block sticky top-0 bg-gray-900 z-40">
        <ul className="max-w-7xl mx-auto px-6 flex justify-center gap-10 py-3">
          <li>
            <Link href="/" className="text-gray-200 hover:text-gold-400">
              Home
            </Link>
          </li>

          {categories.map(cat => (
            <li className="relative group">
              {/* Trigger */}
              <Link
                href={cat.href}
                className="flex items-center gap-1 text-gray-200 hover:text-gold-400"
              >
                {cat.label}
                <ChevronDown
                  size={16}
                  className="transition-transform group-hover:rotate-180"
                />
              </Link>

              {/* Hover buffer */}
              <div className="absolute left-1/2 top-full -translate-x-1/2 pt-2">
                {/* Dropdown */}
                <div
                  className="
                 w-56 bg-white rounded-xl shadow-xl
                 opacity-0 translate-y-2
                 pointer-events-none
                 transition-all duration-200
                 group-hover:opacity-100
                 group-hover:translate-y-0
                 group-hover:pointer-events-auto
               "
                >
                  {cat.items.map(item => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className="block px-4 py-2 text-sm hover:bg-gold-50"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>
            </li>

          ))}
        </ul>
      </nav>

      {/* ================= MOBILE MENU ================= */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t shadow-md">
          <ul className="flex flex-col p-4 gap-4">
            <li>
              <Link href="/" onClick={() => setMobileOpen(false)}>
                Home
              </Link>
            </li>

            {categories.map(cat => (
              <li key={cat.label}>
                <Link
                  href={cat.href}
                  onClick={() => setMobileOpen(false)}
                  className="font-medium"
                >
                  {cat.label}
                </Link>
                <ul className="ml-4 mt-2 space-y-1 text-sm">
                  {cat.items.map(item => (
                    <li key={item.label}>
                      <Link
                        href={item.href}
                        onClick={() => setMobileOpen(false)}
                      >
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}
    </header>
  )
}
