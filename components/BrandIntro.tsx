'use client'

import { useState } from 'react'
import Image from 'next/image'
import { BRAND_NAME, BRAND_SUBTITLE, TAGLINE } from '@/lib/constants'

export default function BrandIntro() {
  const [imageError, setImageError] = useState(false)
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center gap-12">
          <div className="flex-shrink-0">
            <div className="relative w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-gold-200 shadow-lg bg-gold-50 flex items-center justify-center">
              {!imageError && (
                <Image
                  src="/images/brand-profile.jpg"
                  alt={BRAND_NAME}
                  fill
                  className="object-cover"
                  priority
                  sizes="(max-width: 768px) 192px, 256px"
                  onError={() => setImageError(true)}
                />
              )}
              <div className="absolute inset-0 flex items-center justify-center text-gold-300 text-4xl font-serif font-bold">
                {BRAND_NAME.charAt(0)}
              </div>
            </div>
          </div>
          <div className="flex-1 text-center md:text-left">
            <p className="text-gold-400 font-semibold tracking-wider text-sm mb-2">
              {BRAND_SUBTITLE}
            </p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-bold text-gray-900 mb-4">
              {BRAND_NAME}
            </h1>
            <p className="text-xl md:text-2xl text-gold-300 italic mb-6 font-serif">
              {TAGLINE}
            </p>
            <p className="text-gray-700 text-lg leading-relaxed max-w-2xl">
              We are dedicated to creating exquisite silver temple idols, pooja items, 
              and bhakti jewellery that embody the essence of devotion and spiritual beauty. 
              Each piece is handcrafted with traditional techniques, ensuring authenticity and 
              timeless elegance for your home temple.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

