import { MetadataRoute } from 'next'
import { getAllProducts } from '@/lib/products'
import { SITE_URL } from '@/lib/constants'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let products: any[] = []

  try {
    products = await getAllProducts()
  } catch (error) {
    console.error('Error fetching products for sitemap:', error)
    // Continue with empty array
  }

  const productEntries = products.map((product) => ({
    url: `${SITE_URL}/products/${product.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${SITE_URL}/products`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    ...productEntries,
  ]
}

