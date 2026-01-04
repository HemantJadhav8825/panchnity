'use client'

import { Star, Quote } from 'lucide-react'

const testimonials = [
  {
    name: 'Priya Sharma',
    location: 'Mumbai',
    rating: 5,
    text: 'I bought a silver Ganesh idol from PANChNITY and it\'s absolutely beautiful. The craftsmanship is exceptional and it has become the centerpiece of my home temple. Highly recommended!',
    product: '925 Silver Ganesh Idol',
  },
  {
    name: 'Rajesh Kumar',
    location: 'Delhi',
    rating: 5,
    text: 'The silver pooja thali I purchased is of excellent quality. The intricate designs are handcrafted with such precision. The team was very helpful throughout the process.',
    product: '925 Silver Pooja Thali',
  },
  {
    name: 'Anjali Patel',
    location: 'Ahmedabad',
    rating: 5,
    text: 'My Lakshmi coin pendant is stunning! The quality is authentic and the design is timeless. I wear it every day and receive so many compliments. Thank you PANChNITY!',
    product: '925 Silver Lakshmi Coin Pendant',
  },
  {
    name: 'Vikram Singh',
    location: 'Bangalore',
    rating: 5,
    text: 'Purchased a Krishna idol for my temple. The attention to detail is remarkable. The silver purity is exactly as stated. This is a trusted brand for religious jewellery.',
    product: '925 Silver Krishna Idol',
  },
]

export default function Testimonials() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            Customer Testimonials
          </h2>
          <p className="text-gray-600 text-lg">
            See what our customers say about their experience with PANChNITY
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-shadow border border-gold-100"
            >
              <div className="flex items-center gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-5 h-5 fill-gold-300 text-gold-300"
                  />
                ))}
              </div>
              
              <Quote className="w-8 h-8 text-gold-200 mb-4" />
              
              <p className="text-gray-700 mb-4 leading-relaxed italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>
              
              <div className="border-t border-gold-100 pt-4">
                <p className="font-semibold text-gray-900">{testimonial.name}</p>
                <p className="text-sm text-gray-500">{testimonial.location}</p>
                <p className="text-sm text-gold-600 mt-2 font-medium">
                  Purchased: {testimonial.product}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

