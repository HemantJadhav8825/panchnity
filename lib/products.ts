import { Product } from '@/types/product'

export const products: Product[] = [
  // Silver Idols
  {
    id: '1',
    slug: 'silver-ganesh-idol-925',
    name: '925 Silver Ganesh Idol',
    description: 'Elegant 925 pure silver Lord Ganesh idol, crafted with traditional techniques. Perfect for daily worship and special occasions.',
    category: 'idol',
    material: 'silver',
    purity: '925',
    weight: '150g',
    images: ['/images/products/silver-ganesh-1.jpg', '/images/products/silver-ganesh-2.jpg'],
    model3d: '/models/silver-ganesh.glb',
    featured: true,
    seoKeywords: ['silver murti', 'ganesh idol', '925 silver', 'temple idol', 'pooja items'],
  },
  {
    id: '2',
    slug: 'silver-lakshmi-idol-925',
    name: '925 Silver Lakshmi Idol',
    description: 'Graceful 925 silver Goddess Lakshmi idol, symbolizing prosperity and abundance. Handcrafted with devotion and skill.',
    category: 'idol',
    material: 'silver',
    purity: '925',
    weight: '200g',
    images: ['/images/products/silver-lakshmi-1.jpg', '/images/products/silver-lakshmi-2.jpg'],
    featured: false,
    seoKeywords: ['silver murti', 'lakshmi idol', '925 silver', 'goddess lakshmi', 'temple jewellery'],
  },
  {
    id: '3',
    slug: 'silver-krishna-idol-925',
    name: '925 Silver Krishna Idol',
    description: 'Charming 925 silver Lord Krishna idol, capturing the divine essence. Ideal for home temple and spiritual practice.',
    category: 'idol',
    material: 'silver',
    purity: '925',
    weight: '180g',
    images: ['/images/products/silver-krishna-1.jpg', '/images/products/silver-krishna-2.jpg'],
    featured: false,
    seoKeywords: ['silver murti', 'krishna idol', '925 silver', 'lord krishna', 'bhakti jewellery India'],
  },
  // Pooja Items - Silver
  {
    id: '4',
    slug: 'silver-pooja-thali-925',
    name: '925 Silver Pooja Thali',
    description: 'Traditional 925 silver pooja thali with beautiful engravings. A timeless piece for your daily worship.',
    category: 'pooja-item',
    material: 'silver',
    purity: '925',
    weight: '250g',
    images: ['/images/products/silver-thali-1.jpg', '/images/products/silver-thali-2.jpg'],
    featured: true,
    seoKeywords: ['pooja items', 'silver thali', '925 silver', 'pooja jewellery', 'temple items'],
  },
  {
    id: '5',
    slug: 'silver-diya-set-925',
    name: '925 Silver Diya Set',
    description: 'Classic set of 7 silver diyas for pooja, crafted with precision. Enhances the spiritual ambiance of your home.',
    category: 'pooja-item',
    material: 'silver',
    purity: '925',
    weight: '300g',
    images: ['/images/products/silver-diya-1.jpg', '/images/products/silver-diya-2.jpg'],
    featured: false,
    seoKeywords: ['pooja items', 'silver diya', '925 silver', 'pooja jewellery', 'hindu religious items'],
  },
  // Bhakti Jewellery - Silver
  {
    id: '6',
    slug: 'silver-om-pendant-925',
    name: '925 Silver Om Pendant',
    description: 'Elegant 925 silver Om symbol pendant, a timeless spiritual accessory. Crafted with devotion and precision.',
    category: 'jewellery',
    material: 'silver',
    purity: '925',
    weight: '15g',
    images: ['/images/products/silver-om-1.jpg', '/images/products/silver-om-2.jpg'],
    featured: true,
    seoKeywords: ['bhakti jewellery', 'silver pendant', 'om pendant', '925 silver', 'temple jewellery'],
  },
  {
    id: '7',
    slug: 'silver-shiva-trishul-pendant-925',
    name: '925 Silver Shiva Trishul Pendant',
    description: 'Powerful 925 silver Trishul pendant, representing Lord Shiva\'s divine energy. A statement piece of bhakti jewellery.',
    category: 'jewellery',
    material: 'silver',
    purity: '925',
    weight: '20g',
    images: ['/images/products/silver-trishul-1.jpg', '/images/products/silver-trishul-2.jpg'],
    featured: false,
    seoKeywords: ['bhakti jewellery', 'silver pendant', 'shiva pendant', '925 silver', 'bhakti jewellery India'],
  },
  {
    id: '8',
    slug: 'silver-lakshmi-coin-pendant-925',
    name: '925 Silver Lakshmi Coin Pendant',
    description: 'Beautiful 925 silver Lakshmi coin pendant, attracting wealth and prosperity. A meaningful piece of spiritual jewellery.',
    category: 'jewellery',
    material: 'silver',
    purity: '925',
    weight: '18g',
    images: ['/images/products/silver-lakshmi-coin-1.jpg', '/images/products/silver-lakshmi-coin-2.jpg'],
    featured: false,
    seoKeywords: ['bhakti jewellery', 'silver pendant', 'lakshmi coin', '925 silver', 'temple jewellery'],
  },
]

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((product) => product.slug === slug)
}

export function getFeaturedProducts(): Product[] {
  return products.filter((product) => product.featured)
}

export function getProductsByCategory(category: Product['category']): Product[] {
  return products.filter((product) => product.category === category)
}

export function getProductsByMaterial(material: Product['material']): Product[] {
  return products.filter((product) => product.material === material)
}

export function getAllProducts(): Product[] {
  return products
}

