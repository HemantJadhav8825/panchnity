import Image from 'next/image'
import { Hammer, Sparkles, Award, Users } from 'lucide-react'

const features = [
  {
    icon: Hammer,
    title: 'Traditional Techniques',
    description: 'Our artisans use time-honored methods passed down through generations, ensuring authentic craftsmanship',
  },
  {
    icon: Sparkles,
    title: 'Intricate Detailing',
    description: 'Every piece features meticulous handwork and attention to detail, creating truly unique items',
  },
  {
    icon: Award,
    title: 'Quality Assurance',
    description: 'Each product undergoes rigorous quality checks to meet our high standards of excellence',
  },
  {
    icon: Users,
    title: 'Skilled Artisans',
    description: 'Working with master craftsmen who bring years of experience and devotion to every creation',
  },
]

export default function CraftsmanshipSection() {
  return (
    <section className="py-10 bg-gradient-to-b from-gold-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-gold-100 text-gold-700 rounded-full text-sm font-medium mb-6">
              Our Craftsmanship
            </div>
            <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-6">
              Handcrafted with Devotion & Precision
            </h2>
            <p className="text-gray-700 text-lg mb-8 leading-relaxed">
              At PANCHANITY JEWELLERS, we take pride in creating exquisite silver religious items 
              that blend traditional Indian craftsmanship with modern quality standards. Each piece 
              is carefully handcrafted by skilled artisans who pour their devotion into every detail.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {features.map((feature, index) => {
                const Icon = feature.icon
                return (
                  <div
                    key={index}
                    className="flex items-start gap-4 p-4 bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow"
                  >
                    <div className="flex-shrink-0 w-12 h-12 bg-gold-50 rounded-lg flex items-center justify-center">
                      <Icon className="w-6 h-6 text-gold-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{feature.title}</h3>
                      <p className="text-gray-600 text-sm">{feature.description}</p>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
          <div className="relative">
            <div className="relative aspect-square rounded-2xl overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-gold-100 to-gold-200 flex items-center justify-center">
                <div className="text-center p-8">
                  <Hammer className="w-24 h-24 text-gold-400 mx-auto mb-4" />
                  <p className="text-gold-600 text-lg font-serif italic">
                    Traditional Craftsmanship
                  </p>
                  <p className="text-gold-500 text-sm mt-2">
                    Image placeholder - Add your artisan/craftsmanship image here
                  </p>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gold-200 rounded-full opacity-20 blur-2xl"></div>
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-gold-300 rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>
    </section>
  )
}

