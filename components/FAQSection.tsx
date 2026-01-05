'use client'

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'

const faqs = [
  {
    question: 'What is the purity of your silver products?',
    answer: 'All our silver products are made from 925 pure silver, which is the international standard for sterling silver. This means 92.5% pure silver and 7.5% other metals for durability.',
  },
  {
    question: 'Do you provide certificates of authenticity?',
    answer: 'Yes, we provide certificates of authenticity with all our silver products, guaranteeing the purity and quality of the silver used in each piece.',
  },
  {
    question: 'What is your return and exchange policy?',
    answer: 'We offer a 30-day return policy for unused items in original packaging. Exchanges are available for lifetime with our buyback guarantee program. Please contact us via WhatsApp for assistance.',
  },
  {
    question: 'How long does shipping take?',
    answer: 'We offer nationwide delivery with tracking. Standard shipping takes 5-7 business days. Express shipping options are available for faster delivery. All items are securely packaged to ensure safe arrival.',
  },
  {
    question: 'Can I customize products?',
    answer: 'Yes, we offer customization services for many of our products. Please contact us via WhatsApp to discuss your specific requirements and we\'ll work with you to create a personalized piece.',
  },
  {
    question: 'How do I care for my silver jewelry?',
    answer: 'To maintain the shine of your silver items, gently clean with a soft cloth. Store in a dry place, preferably in an airtight container or with anti-tarnish strips. Avoid contact with chemicals and perfumes.',
  },
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-10 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-gray-600 text-lg">
            Find answers to common questions about our products and services
          </p>
        </div>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg overflow-hidden hover:border-gold-300 transition-colors"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-4 text-left flex items-center justify-between bg-white hover:bg-gold-50 transition-colors"
              >
                <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 text-gold-600 flex-shrink-0 transition-transform duration-300 ${
                    openIndex === index ? 'transform rotate-180' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-all duration-300 ${
                  openIndex === index ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
                  <p className="text-gray-700 leading-relaxed">{faq.answer}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

