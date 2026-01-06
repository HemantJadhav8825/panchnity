import Link from 'next/link'
import { WHATSAPP_NUMBER } from '@/lib/constants'
import { Phone, Eye, MapPin } from 'lucide-react'

interface TopBarProps {
  isScrolled: boolean
}

export default function TopBar({ isScrolled }: TopBarProps) {
  return (
    <div
      className={`bg-gray-100 py-2 text-xs text-gray-700 transition-all duration-300 ease-in-out ${
        isScrolled ? 'md:h-0 md:py-0 md:opacity-0 md:overflow-hidden' : 'md:block'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-end items-center space-x-4 md:space-x-6">
        <a href={`tel:${WHATSAPP_NUMBER}`} className="flex items-center gap-1 hover:text-gold-300">
          <Phone className="w-3 h-3" />
          <span className="hidden sm:inline">{WHATSAPP_NUMBER}</span>
        </a>
        <Link href="#" className="flex items-center gap-1 hover:text-gold-300">
          <Eye className="w-3 h-3" />
          <span className="hidden sm:inline">Recently Viewed</span>
        </Link>
        <Link href="#" className="flex items-center gap-1 hover:text-gold-300">
          <MapPin className="w-3 h-3" />
          <span className="hidden sm:inline">Locate Our Store</span>
        </Link>
      </div>
    </div>
  )
}
