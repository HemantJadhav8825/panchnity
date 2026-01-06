import { forwardRef } from 'react'
import Link from 'next/link'
import { ChevronDown } from 'lucide-react'

interface CategoryItem {
  name: string
  href: string
}

interface Category {
  name: string
  href: string
  items: CategoryItem[]
}

interface BottomNavigationProps {
  categories: Category[]
  isScrolled: boolean
  categoryMenuOpen: string | null
  onCategoryMenuOpen: (category: string | null) => void
}

const BottomNavigation = forwardRef<HTMLDivElement, BottomNavigationProps>(
  ({ categories, isScrolled, categoryMenuOpen, onCategoryMenuOpen }, ref) => {
    return (
      <nav
        ref={ref}
        className={`bg-gray-800 py-3 w-full border-t border-gold-200 shadow-lg hidden lg:block overflow-visible ${
          isScrolled ? 'fixed top-0' : 'relative'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4">
          <ul className="flex justify-center space-x-8 overflow-x-auto overflow-y-visible whitespace-nowrap">
            <li>
              <Link href="/" className="text-gray-200 hover:text-gold-300">
                Home
              </Link>
            </li>

            {categories.map(category => (
              <li
                key={category.name}
                className="relative"
                onMouseEnter={() => onCategoryMenuOpen(category.name)}
                onMouseLeave={() => onCategoryMenuOpen(null)}
              >
                <Link
                  href={category.href}
                  className="flex items-center gap-1 text-gray-200 hover:text-gold-300"
                >
                  {category.name}
                  <ChevronDown
                    className={`w-4 h-4 transition ${
                      categoryMenuOpen === category.name ? 'rotate-180' : ''
                    }`}
                  />
                </Link>

                <div
                  className={`absolute top-full left-1/2 -translate-x-1/2 z-50 transition ${
                    categoryMenuOpen === category.name
                      ? 'opacity-100 translate-y-0'
                      : 'opacity-0 -translate-y-2 pointer-events-none'
                  }`}
                >
                  <div className="w-56 bg-white rounded-xl shadow-2xl py-2">
                    {category.items.map(item => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 hover:bg-gold-50"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    )
  }
)

BottomNavigation.displayName = 'BottomNavigation'

export default BottomNavigation
