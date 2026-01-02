import Link from 'next/link'
import { getAllProducts, getProductsByMaterial } from '@/lib/products'
import ProductCard from './ProductCard'
import { ArrowRight } from 'lucide-react'

export default function CollectionSpotlight() {
  const goldProducts = getProductsByMaterial('gold').slice(0, 4)
  const silverProducts = getProductsByMaterial('silver').slice(0, 4)

  return (
    <>
      {/* Gold Collection */}
      <section className="py-16 bg-gradient-to-b from-gold-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-2">
                Gold Collection
              </h2>
              <p className="text-gray-600">
                Exquisite 22K gold temple idols and jewellery
              </p>
            </div>
            <Link
              href="/products?material=gold"
              className="hidden md:flex items-center gap-2 text-gold-300 hover:text-gold-400 font-semibold transition-colors"
            >
              View All
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {goldProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-8 md:hidden">
            <Link
              href="/products?material=gold"
              className="inline-flex items-center gap-2 text-gold-300 hover:text-gold-400 font-semibold"
            >
              View All Gold Products
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Silver Collection */}
      <section className="py-16 bg-white">
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

