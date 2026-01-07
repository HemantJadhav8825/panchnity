// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

import { Suspense } from 'react'
import { getAllProducts } from '@/lib/products'
import ProductsClient from '@/components/ProductsClient'
import Loading from '../../products/loading'
import WhatsAppButton from '@/components/WhatsAppButton'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'


interface BridalSubcategoryPageProps {
  params: Promise<{
    subcategory: string
  }>
}

// Convert URL slug back to readable name
function slugToName(slug: string): string {
  return slug
    .split('-')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ')
}

// Filter products for the specific subcategory
async function getSubcategoryProducts(subcategory: string) {
  const allProducts = await getAllProducts()
  const subcategoryName = slugToName(subcategory)

  return allProducts.filter(product => {
    const productName = product.name.toLowerCase()
    const productDesc = product.description.toLowerCase()
    const subcategoryLower = subcategory.toLowerCase()

    // Check if subcategory keywords appear in product name or description
    const matchesKeywords = productName.includes(subcategoryLower) ||
                           productDesc.includes(subcategoryLower) ||
                           subcategoryName.toLowerCase().split(' ').every(word =>
                             productName.includes(word) || productDesc.includes(word)
                           )

    // For bridal, also include featured products and traditional items
    const isBridalRelated = product.featured ||
                           product.category === 'idol' ||
                           product.category === 'pooja-item' ||
                           productName.includes('bridal') ||
                           productName.includes('wedding') ||
                           productDesc.includes('bridal') ||
                           productDesc.includes('wedding')

    return matchesKeywords || isBridalRelated
  })
}

export async function generateMetadata({ params }: BridalSubcategoryPageProps): Promise<Metadata> {
  const { subcategory } = await params
  const subcategoryName = slugToName(subcategory)

  return {
    title: `${subcategoryName} | Bridal Collection | PANCHANITY JEWELLERS`,
    description: `Discover our exquisite ${subcategoryName.toLowerCase()} collection perfect for weddings and special occasions. Handcrafted with traditional techniques.`,
    keywords: [`${subcategoryName.toLowerCase()}`, 'bridal jewelry', 'wedding jewelry', 'traditional jewelry', 'panchnity jewellers'],
    openGraph: {
      title: `${subcategoryName} | Bridal Collection | PANCHANITY JEWELLERS`,
      description: `Explore our ${subcategoryName.toLowerCase()} collection for special occasions.`,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  // Generate static params for all bridal subcategories
  const subcategories = [
    'wedding-sets',
    'engagement-rings',
    'bridal-jewelry',
    'traditional-pieces',
    'modern-bridal',
    'ceremony-items'
  ]

  return subcategories.map((subcategory) => ({
    subcategory,
  }))
}

export default async function BridalSubcategoryPage({ params }: BridalSubcategoryPageProps) {
  const { subcategory } = await params
  const subcategoryName = slugToName(subcategory)
  const subcategoryProducts = await getSubcategoryProducts(subcategory)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gold-300 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/bridal" className="hover:text-gold-300 transition-colors">
            Bridal
          </Link>
          <ChevronRight className="w-4 h-4" />
          <span className="text-gray-900">{subcategoryName}</span>
        </nav>

        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            {subcategoryName}
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Celebrate your special day with our exquisite {subcategoryName.toLowerCase()} collection.
            Each piece is handcrafted with devotion and traditional techniques.
          </p>
        </div>

        {/* Bridal Special Message */}
        <div className="bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-200 rounded-lg p-8 mb-12 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Perfect for Your Special Occasion
          </h2>
          <p className="text-gray-700 max-w-3xl mx-auto">
            Our {subcategoryName.toLowerCase()} collection combines traditional craftsmanship with contemporary elegance,
            perfect for weddings, engagements, and other special ceremonies.
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<Loading />}>
          <ProductsClient
            products={subcategoryProducts}
            showFilters={true}
          />
        </Suspense>

        {/* WhatsApp CTA */}
        {subcategoryProducts.length > 0 && (
          <div className="text-center mt-12">
            <WhatsAppButton
              category={`${subcategoryName} Bridal Collection`}
              buttonText={`Plan Your ${subcategoryName}`}
              className="mx-auto"
            />
          </div>
        )}

        {subcategoryProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No {subcategoryName.toLowerCase()} available</h3>
            <p className="text-gray-600">Check back soon for our bridal collection.</p>
            <Link
              href="/bridal"
              className="inline-block mt-4 px-6 py-3 bg-gold-300 text-white rounded-lg hover:bg-gold-400 transition-colors"
            >
              View Bridal Collection
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
