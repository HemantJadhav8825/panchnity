// Force dynamic rendering to prevent prerendering issues
export const dynamic = 'force-dynamic';

import { Suspense } from 'react'
import { generateProductsMetadata } from '@/lib/seo'
import ProductsClient from '@/components/ProductsClient'
import Loading from './loading'

export const metadata = generateProductsMetadata()

export default function ProductsPage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProductsClient />
    </Suspense>
  )
}

