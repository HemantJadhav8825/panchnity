import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'

const categories = [
  {
    name: 'Temple Idols',
    description: 'Divine gold and silver idols',
    href: '/products?category=idol',
    image: '/images/categories/idols.jpg',
    count: '8+ Designs',
  },
  {
    name: 'Pooja Items',
    description: 'Essential items for worship',
    href: '/products?category=pooja-item',
    image: '/images/categories/pooja.jpg',
    count: '6+ Designs',
  },
  {
    name: 'Bhakti Jewellery',
    description: 'Spiritual jewellery pieces',
    href: '/products?category=jewellery',
    image: '/images/categories/jewellery.jpg',
    count: '6+ Designs',
  },
]

export default function CategoryShowcase() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Shop by Category
          </h2>
          <p className="text-gray-600 text-lg">
            Discover our curated collections of religious jewellery and temple items
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link
              key={category.name}
              href={category.href}
              className="group relative overflow-hidden rounded-2xl bg-gray-100 aspect-[4/3] hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2"
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent z-10"></div>
              <div className="absolute inset-0 flex items-center justify-center z-0">
                <div className="text-center text-white p-6">
                  <div className="text-6xl mb-4">✨</div>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-6 z-20">
                <h3 className="text-2xl font-serif font-bold text-white mb-2 group-hover:text-gold-200 transition-colors">
                  {category.name}
                </h3>
                <p className="text-gold-100 text-sm mb-3">{category.description}</p>
                <div className="flex items-center gap-2 text-white group-hover:text-gold-200 transition-colors">
                  <span className="text-sm font-medium">{category.count}</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

