// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

import { Suspense } from 'react'
import { getAllProducts } from '@/lib/products'
import ProductsClient from '@/components/ProductsClient'
import Loading from '@/app/products/loading'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bracelets | PANCHANITY JEWELLERS',
  description: 'Explore our collection of beautiful bracelets made from pure silver. From bangles to chains, each bracelet is handcrafted with traditional techniques.',
  keywords: ['bracelets', 'silver bracelets', 'bangles', 'bracelet collection', 'kada', '925 silver', 'panchnity jewellers'],
  openGraph: {
    title: 'Bracelets Collection | PANCHANITY JEWELLERS',
    description: 'Discover our elegant collection of handcrafted silver bracelets.',
    type: 'website',
  },
}

// Filter products that might be bracelets based on name or description
async function getBraceletProducts() {
  const allProducts = await getAllProducts()
  return allProducts.filter(product =>
    product.name.toLowerCase().includes('bracelet') ||
    product.name.toLowerCase().includes('bangle') ||
    product.name.toLowerCase().includes('kada') ||
    product.description.toLowerCase().includes('bracelet') ||
    product.description.toLowerCase().includes('bangle') ||
    product.description.toLowerCase().includes('kada') ||
    product.category === 'jewellery' // Include jewellery category as fallback
  )
}

export default async function BraceletsPage() {
  const braceletProducts = await getBraceletProducts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Bracelets Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Discover our elegant collection of bracelets and bangles, from delicate chains to traditional designs.
            Each piece is handcrafted with traditional techniques and made from authentic 925 pure silver.
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<Loading />}>
          <ProductsClient
            products={braceletProducts}
            showFilters={true}
          />
        </Suspense>

        {/* WhatsApp CTA */}
        {braceletProducts.length > 0 && (
          <div className="text-center mt-12">
            <WhatsAppButton
              category="Bracelets"
              buttonText="Inquire About Bracelets"
              className="mx-auto"
            />
          </div>
        )}

        {braceletProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No bracelets available</h3>
            <p className="text-gray-600">Check back soon for our latest bracelet collection.</p>
          </div>
        )}
      </div>
    </div>
  )
}
