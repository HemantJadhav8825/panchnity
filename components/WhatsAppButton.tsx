'use client'

import { WHATSAPP_NUMBER, SITE_URL } from '@/lib/constants'
import { Product } from '@/types/product'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  product: Product
  className?: string
}

export default function WhatsAppButton({ product, className = '' }: WhatsAppButtonProps) {
  const message = `Hello, I'm interested in ${product.name}. Here is the link: ${SITE_URL}/products/${product.slug}`
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>Buy via WhatsApp</span>
    </a>
  )
}

