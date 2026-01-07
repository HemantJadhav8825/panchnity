'use client'

import { useState, useMemo, useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import ProductCard from '@/components/ProductCard'
import { getAllProducts, getProductsByCategory, getProductsByMaterial } from '@/lib/products'
import { ProductCategory, ProductMaterial } from '@/types/product'
import { Filter, Search } from 'lucide-react'

interface ProductsClientProps {
  products?: any[]
  showFilters?: boolean
}

export default function ProductsClient({ products: initialProducts, showFilters = true }: ProductsClientProps = {}) {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get('category') as ProductCategory | null
  const materialParam = searchParams.get('material') as ProductMaterial | null

  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<ProductCategory | 'all'>(
    categoryParam || 'all'
  )
  const [selectedMaterial, setSelectedMaterial] = useState<ProductMaterial | 'all'>(
    materialParam || 'all'
  )
  const [allProducts, setAllProducts] = useState<any[]>(initialProducts || [])
  const [loading, setLoading] = useState(!initialProducts)

  useEffect(() => {
    async function fetchProducts() {
      if (initialProducts) return // Don't fetch if products were passed as props

      try {
        const products = await getAllProducts()
        setAllProducts(products)
      } catch (error) {
        console.error('Error fetching products:', error)
        setAllProducts([])
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [initialProducts])

  const filteredProducts = useMemo(() => {
    if (loading || allProducts.length === 0) return []

    let filtered = allProducts

    // Filter by category
    if (selectedCategory !== 'all') {
      filtered = filtered.filter((p) => p.category === selectedCategory)
    }

    // Filter by material
    if (selectedMaterial !== 'all') {
      filtered = filtered.filter((p) => p.material === selectedMaterial)
    }

    // Filter by search query
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.description.toLowerCase().includes(query) ||
          (p.seoKeywords && p.seoKeywords.some((keyword: string) => keyword.toLowerCase().includes(query)))
      )
    }

    return filtered
  }, [selectedCategory, selectedMaterial, searchQuery, allProducts, loading])

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="mb-8">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Products
          </h1>
          <p className="text-gray-600 text-lg">
            Discover our exquisite collection of silver temple idols, pooja items, and bhakti jewellery
          </p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          {/* Search Bar */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-gold-300 outline-none"
            />
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="flex items-center gap-2">
              <Filter className="w-5 h-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-700">Filters:</span>
            </div>

            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value as ProductCategory | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-gold-300 outline-none bg-white"
            >
              <option value="all">All Categories</option>
              <option value="idol">Idols</option>
              <option value="pooja-item">Pooja Items</option>
              <option value="jewellery">Jewellery</option>
            </select>

            {/* Material Filter */}
            <select
              value={selectedMaterial}
              onChange={(e) => setSelectedMaterial(e.target.value as ProductMaterial | 'all')}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-gold-300 outline-none bg-white"
            >
              <option value="all">All Materials</option>
              <option value="silver">Silver</option>
            </select>

            {/* Clear Filters */}
            {(selectedCategory !== 'all' || selectedMaterial !== 'all' || searchQuery) && (
              <button
                onClick={() => {
                  setSelectedCategory('all')
                  setSelectedMaterial('all')
                  setSearchQuery('')
                }}
                className="px-4 py-2 text-sm text-gray-600 hover:text-gold-300 transition-colors"
              >
                Clear Filters
              </button>
            )}
          </div>
        </div>

        {/* Loading State */}
        {loading && (
          <div className="text-center py-16">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gold-300 mx-auto mb-4"></div>
            <p className="text-gray-600">Loading products...</p>
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mb-6">
            <p className="text-gray-600">
              Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </p>
          </div>
        )}

        {/* Products Grid */}
        {!loading && filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16">
            <p className="text-gray-500 text-lg mb-4">No products found</p>
            <p className="text-gray-400 text-sm">
              Try adjusting your filters or search query
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

