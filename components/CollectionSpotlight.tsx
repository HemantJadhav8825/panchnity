'use client'

import Link from 'next/link'
import { useState, useEffect } from 'react'
import { getProductsByMaterial } from '@/lib/products'
import ProductCard from './ProductCard'
import { ArrowRight } from 'lucide-react'

export default function CollectionSpotlight() {
  const [silverProducts, setSilverProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchSilverProducts() {
      try {
        const products = await getProductsByMaterial('silver')
        setSilverProducts(products.slice(0, 4))
      } catch (err) {
        console.error('Error fetching silver products:', err)
        setError('Failed to load silver products')
      } finally {
        setLoading(false)
      }
    }

    fetchSilverProducts()
  }, [])

  if (loading) {
    return (
      <>
        {/* Silver Collection */}
        <section className="py-0 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                  Silver Collection
                </h2>
                <p className="text-gray-600">
                  Beautiful 925 pure silver religious items
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 aspect-square rounded-lg mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded mb-2"></div>
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </>
    )
  }

  if (error) {
    return (
      <>
        <section className="py-0 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </section>
      </>
    )
  }

  return (
    <>
      {/* Silver Collection */}
      <section className="py-0 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                Silver Collection
              </h2>
              <p className="text-gray-600">
                Beautiful 925 pure silver religious items
              </p>
            </div>
            <Link
              href="/products?material=silver"
              className="hidden md:flex items-center gap-2 text-gold-300 hover:text-gold-400 font-semibold transition-colors"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {silverProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>

          <div className="text-center mt-8 md:hidden">
            <Link
              href="/products?material=silver"
              className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-400 font-semibold"
            >
              View All Silver Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>
    </>
  )
}

