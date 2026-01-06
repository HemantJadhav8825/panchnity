import { forwardRef } from 'react'
import Link from 'next/link'
import { BRAND_NAME, BRAND_SUBTITLE } from '@/lib/constants'
import { Menu, X, Search } from 'lucide-react'

interface MainHeaderProps {
  isScrolled: boolean
  mobileMenuOpen: boolean
  onMobileMenuToggle: () => void
}

const MainHeader = forwardRef<HTMLDivElement, MainHeaderProps>(
  ({ isScrolled, mobileMenuOpen, onMobileMenuToggle }, ref) => {
    return (
      <div
        ref={ref}
        className={`w-full bg-white/95 backdrop-blur-md border-b border-gold-200 transition-all duration-300 ${
          isScrolled ? 'shadow-lg py-2' : 'shadow-sm'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`flex items-center justify-between ${isScrolled ? 'h-16' : ''}`}>
            <Link href="/" className="flex flex-col group hover:scale-105 transition">
              <h1 className="text-2xl sm:text-3xl font-serif font-bold text-gold-300">
                {BRAND_NAME}
              </h1>
              <p className="text-xs sm:text-sm text-gold-500 tracking-wider opacity-80">
                {BRAND_SUBTITLE}
              </p>
            </Link>

            <div className="flex-grow max-w-md mx-4 md:mx-8">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search for Jewellery"
                  className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-300"
                />
              </div>
            </div>

            <button
              className="lg:hidden p-2"
              onClick={onMobileMenuToggle}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>
    )
  }
)

MainHeader.displayName = 'MainHeader'

export default MainHeader
