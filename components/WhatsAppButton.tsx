'use client'

import { WHATSAPP_NUMBER, SITE_URL } from '@/lib/constants'
import { Product } from '@/types/product'
import { MessageCircle } from 'lucide-react'

interface WhatsAppButtonProps {
  product?: Product
  category?: string
  customMessage?: string
  buttonText?: string
  className?: string
}

export default function WhatsAppButton({
  product,
  category,
  customMessage,
  buttonText = 'Buy via WhatsApp',
  className = ''
}: WhatsAppButtonProps) {
  // Generate dynamic message based on context
  let message = customMessage

  if (!message) {
    if (product) {
      // Product-specific message
      message = `Hello, I'm interested in ${product.name}. Here is the link: ${SITE_URL}/products/${product.slug}`
    } else if (category) {
      // Category-specific message
      message = `Hello, I'm interested in your ${category} collection. Can you tell me more about your ${category.toLowerCase()} products?`
    } else {
      // General inquiry message
      message = `Hello, I'm interested in your silver jewelry collection. Can you help me find the perfect piece?`
    }
  }

  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(message)}`

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className={`inline-flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20BA5A] text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg ${className}`}
    >
      <MessageCircle className="w-5 h-5" />
      <span>{buttonText}</span>
    </a>
  )
}

