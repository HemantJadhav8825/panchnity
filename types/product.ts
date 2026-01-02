export type ProductCategory = 'idol' | 'pooja-item' | 'jewellery'
export type ProductMaterial = 'gold' | 'silver'

export interface Product {
  id: string
  slug: string
  name: string
  description: string
  category: ProductCategory
  material: ProductMaterial
  purity: string // e.g., "22K", "925"
  weight: string // e.g., "50g", "100g"
  images: string[]
  model3d?: string // Path to .glb/.gltf file
  featured: boolean
  seoKeywords: string[]
}

