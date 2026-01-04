'use client'

import { useState } from 'react'
import { Mail, Send } from 'lucide-react'

export default function NewsletterSection() {
  const [email, setEmail] = useState('')
  const [submitted, setSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend/newsletter service
    setSubmitted(true)
    setEmail('')
    setTimeout(() => setSubmitted(false), 3000)
  }

  return (
    <section className="py-16 bg-gradient-to-br from-gold-50 via-white to-gold-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 border border-gold-100">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-100 rounded-full mb-4">
              <Mail className="w-8 h-8 text-gold-600" />
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
              Stay Connected
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Subscribe to our newsletter for exclusive offers, new arrivals, and spiritual insights
            </p>
          </div>
          
          <form onSubmit={handleSubmit} className="max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="flex-1 relative">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address"
                  required
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gold-300 focus:border-gold-300 outline-none"
                />
                <Mail className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
              </div>
              <button
                type="submit"
                className="bg-gold-300 hover:bg-gold-400 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-md hover:shadow-lg flex items-center justify-center gap-2 whitespace-nowrap"
              >
                {submitted ? (
                  <>
                    <span>✓ Subscribed!</span>
                  </>
                ) : (
                  <>
                    <Send className="w-5 h-5" />
                    <span>Subscribe</span>
                  </>
                )}
              </button>
            </div>
            {submitted && (
              <p className="text-center text-green-600 text-sm mt-3">
                Thank you for subscribing! We'll keep you updated.
              </p>
            )}
            <p className="text-center text-gray-500 text-xs mt-4">
              We respect your privacy. Unsubscribe at any time.
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

