import { Suspense } from 'react'
import { getAllProducts } from '@/lib/products'
import ProductsClient from '@/components/ProductsClient'
import Loading from '@/app/products/loading'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Bridal Collection | PANCHANITY JEWELLERS',
  description: 'Discover our exquisite bridal collection featuring traditional and modern silver jewelry perfect for weddings and special occasions. Handcrafted with devotion and made from authentic 925 pure silver.',
  keywords: ['bridal jewelry', 'wedding jewelry', 'bridal collection', 'traditional jewelry', 'wedding accessories', '925 silver', 'panchnity jewellers'],
  openGraph: {
    title: 'Bridal Collection | PANCHANITY JEWELLERS',
    description: 'Explore our beautiful bridal jewelry collection made from pure silver.',
    type: 'website',
  },
}

// Filter products suitable for bridal/wedding occasions
function getBridalProducts() {
  const allProducts = getAllProducts()
  return allProducts.filter(product =>
    product.featured || // Featured products
    product.name.toLowerCase().includes('bridal') ||
    product.name.toLowerCase().includes('wedding') ||
    product.description.toLowerCase().includes('bridal') ||
    product.description.toLowerCase().includes('wedding') ||
    product.category === 'idol' || // Traditional idols for ceremonies
    product.category === 'pooja-item' // Pooja items for ceremonies
  )
}

export default function BridalPage() {
  const bridalProducts = getBridalProducts()

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Bridal Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrate your special day with our exquisite bridal collection. From traditional idols for ceremonies
            to elegant silver jewelry, each piece is handcrafted with devotion and made from authentic 925 pure silver.
          </p>
        </div>

        {/* Featured Bridal Message */}
        <div className="bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-200 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Traditional & Modern Bridal Jewelry
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our bridal collection combines traditional craftsmanship with contemporary designs, perfect for weddings,
            engagements, and special ceremonies. Each piece tells a story of love, tradition, and devotion.
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<Loading />}>
          <ProductsClient
            products={bridalProducts}
            showFilters={true}
          />
        </Suspense>

        {/* WhatsApp CTA */}
        {bridalProducts.length > 0 && (
          <div className="text-center mt-12">
            <WhatsAppButton
              category="Bridal Collection"
              buttonText="Plan Your Bridal Jewelry"
              className="mx-auto"
            />
          </div>
        )}

        {bridalProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">Bridal collection coming soon</h3>
            <p className="text-gray-600">We&apos;re curating special pieces for your special occasions.</p>
          </div>
        )}
      </div>
    </div>
  )
}
