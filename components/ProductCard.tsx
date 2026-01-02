'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Product } from '@/types/product'

interface ProductCardProps {
  product: Product
}

export default function ProductCard({ product }: ProductCardProps) {
  const [imageError, setImageError] = useState(false)
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gold-100 hover:border-gold-300"
    >
      <div className="relative aspect-square overflow-hidden bg-gray-50">
        {product.images[0] && !imageError && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300 relative z-10"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            onError={() => setImageError(true)}
          />
        )}
        <div className={`absolute inset-0 flex items-center justify-center text-gray-400 bg-gray-100 ${imageError || !product.images[0] ? 'z-10' : 'z-0'}`}>
          <div className="text-center">
            <div className="text-4xl mb-2">✨</div>
            <div className="text-sm">Image Coming Soon</div>
          </div>
        </div>
        {product.featured && (
          <div className="absolute top-2 right-2 bg-gold-300 text-white px-2 py-1 rounded text-xs font-semibold">
            Featured
          </div>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-serif text-lg font-semibold text-gray-900 mb-2 group-hover:text-gold-300 transition-colors line-clamp-2">
          {product.name}
        </h3>
        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <span className="capitalize">{product.material}</span>
          <span className="font-medium">{product.purity}</span>
        </div>
        <p className="text-xs text-gray-500 mb-3 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-gold-400">{product.weight}</span>
          <span className="text-xs text-gray-500 capitalize">{product.category.replace('-', ' ')}</span>
        </div>
      </div>
    </Link>
  )
}

