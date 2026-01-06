import { Suspense } from 'react'
import { getAllProducts } from '@/lib/products'
import ProductsClient from '@/components/ProductsClient'
import Loading from '@/app/products/loading'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Necklaces | PANCHANITY JEWELLERS',
  description: 'Explore our stunning collection of necklaces including gold chains, diamond pendants, and silver necklaces. Handcrafted with traditional techniques and made from authentic 925 pure silver.',
  keywords: ['necklaces', 'gold chains', 'diamond pendants', 'silver necklaces', 'pendants', 'chains', '925 silver', 'panchnity jewellers'],
  openGraph: {
    title: 'Necklaces Collection | PANCHANITY JEWELLERS',
    description: 'Discover our beautiful collection of handcrafted necklaces made from pure silver.',
    type: 'website',
  },
}

// Filter products that might be necklaces based on name or description
function getNecklaceProducts() {
  const allProducts = getAllProducts()
  return allProducts.filter(product =>
    product.name.toLowerCase().includes('necklace') ||
    product.name.toLowerCase().includes('chain') ||
    product.name.toLowerCase().includes('pendant') ||
    product.description.toLowerCase().includes('necklace') ||
    product.description.toLowerCase().includes('chain') ||
    product.description.toLowerCase().includes('pendant') ||
    product.category === 'jewellery' // Include jewellery category as fallback
  )
}

export default function NecklacesPage() {
  const necklaceProducts = getNecklaceProducts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Necklaces Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our elegant collection of necklaces, from delicate chains to stunning pendants.
            Each piece is handcrafted with traditional techniques and made from authentic 925 pure silver.
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<Loading />}>
          <ProductsClient
            products={necklaceProducts}
            showFilters={true}
          />
        </Suspense>

        {necklaceProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No necklaces available</h3>
            <p className="text-gray-600">Check back soon for our latest necklace collection.</p>
          </div>
        )}
      </div>
    </div>
  )
}
