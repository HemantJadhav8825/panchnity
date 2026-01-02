'use client'

import Link from 'next/link'
import { Sparkles, Heart } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-gold-50 via-white to-gold-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 md:py-32">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 bg-gold-100 text-gold-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4" />
            <span>Handcrafted with Devotion</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            The Art of
            <br />
            <span className="text-gold-300">Bhakti & Shakti</span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
            Exquisite gold and silver temple idols, pooja items, and bhakti jewellery
            <br />
            crafted with traditional techniques and spiritual devotion
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="/products"
              className="bg-gold-300 hover:bg-gold-400 text-white font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Explore Collection
            </Link>
            <Link
              href="/products?category=idol"
              className="bg-white hover:bg-gold-50 text-gold-300 border-2 border-gold-300 font-semibold px-8 py-4 rounded-lg text-lg transition-all duration-300 shadow-md hover:shadow-lg"
            >
              View Idols
            </Link>
          </div>
          
          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold-300" />
              <span>100% Certified</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold-300" />
              <span>Authentic Gold & Silver</span>
            </div>
            <div className="flex items-center gap-2">
              <Heart className="w-5 h-5 text-gold-300" />
              <span>Handcrafted</span>
            </div>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-gold-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
      <div className="absolute bottom-0 right-0 w-72 h-72 bg-gold-200 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
    </section>
  )
}

