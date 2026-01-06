import { Suspense } from 'react'
import { getAllProducts } from '@/lib/products'
import ProductsClient from '@/components/ProductsClient'
import Loading from '../../products/loading'
import { Metadata } from 'next'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface EarringsSubcategoryPageProps {
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
function getSubcategoryProducts(subcategory: string) {
  const allProducts = getAllProducts()
  const subcategoryName = slugToName(subcategory)

  return allProducts.filter(product => {
    const productName = product.name.toLowerCase()
    const productDesc = product.description.toLowerCase()
    const subcategoryLower = subcategory.toLowerCase()

    // Check if subcategory keywords appear in product name or description
    return productName.includes(subcategoryLower) ||
           productDesc.includes(subcategoryLower) ||
           subcategoryName.toLowerCase().split(' ').every(word =>
             productName.includes(word) || productDesc.includes(word)
           )
  })
}

export async function generateMetadata({ params }: EarringsSubcategoryPageProps): Promise<Metadata> {
  const { subcategory } = await params
  const subcategoryName = slugToName(subcategory)

  return {
    title: `${subcategoryName} | Earrings | PANCHANITY JEWELLERS`,
    description: `Discover our exquisite collection of ${subcategoryName.toLowerCase()} made from authentic 925 pure silver. Handcrafted with traditional techniques.`,
    keywords: [`${subcategoryName.toLowerCase()}`, 'earrings', 'silver earrings', '925 silver', 'panchnity jewellers'],
    openGraph: {
      title: `${subcategoryName} | Earrings Collection | PANCHANITY JEWELLERS`,
      description: `Explore our ${subcategoryName.toLowerCase()} collection made from pure silver.`,
      type: 'website',
    },
  }
}

export async function generateStaticParams() {
  // Generate static params for all earring subcategories
  const subcategories = [
    'gold-earrings',
    'diamond-earrings',
    'silver-earrings',
    'hoop-earrings',
    'stud-earrings',
    'jhumka'
  ]

  return subcategories.map((subcategory) => ({
    subcategory,
  }))
}

export default async function EarringsSubcategoryPage({ params }: EarringsSubcategoryPageProps) {
  const { subcategory } = await params
  const subcategoryName = slugToName(subcategory)
  const subcategoryProducts = getSubcategoryProducts(subcategory)

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs */}
        <nav className="mb-6 flex items-center space-x-2 text-sm text-gray-600">
          <Link href="/" className="hover:text-gold-300 transition-colors">
            Home
          </Link>
          <ChevronRight className="w-4 h-4" />
          <Link href="/earrings" className="hover:text-gold-300 transition-colors">
            Earrings
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
            Discover our exquisite collection of {subcategoryName.toLowerCase()} crafted with traditional techniques and made from authentic 925 pure silver.
          </p>
        </div>

        {/* Products Grid */}
        <Suspense fallback={<Loading />}>
          <ProductsClient
            products={subcategoryProducts}
            showFilters={true}
          />
        </Suspense>

        {subcategoryProducts.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">
              <svg className="mx-auto h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-900 mb-2">No {subcategoryName.toLowerCase()} available</h3>
            <p className="text-gray-600">Check back soon for our latest collection.</p>
            <Link
              href="/earrings"
              className="inline-block mt-4 px-6 py-3 bg-gold-300 text-white rounded-lg hover:bg-gold-400 transition-colors"
            >
              View All Earrings
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
