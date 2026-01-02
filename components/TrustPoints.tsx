import { Shield, Award, Heart, Sparkles } from 'lucide-react'

const trustPoints = [
  {
    icon: Shield,
    title: 'Authentic Gold & Silver',
    description: 'Certified 22K gold and 925 pure silver, guaranteed authenticity',
  },
  {
    icon: Award,
    title: 'Handcrafted Excellence',
    description: 'Meticulously crafted by skilled artisans with traditional techniques',
  },
  {
    icon: Heart,
    title: 'Made with Devotion',
    description: 'Every piece is created with bhakti and spiritual dedication',
  },
  {
    icon: Sparkles,
    title: 'Heritage Craftsmanship',
    description: 'Preserving ancient Indian jewelry-making traditions',
  },
]

export default function TrustPoints() {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-gold-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl md:text-4xl font-serif font-bold text-center text-gray-900 mb-12">
          Why Choose Us
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {trustPoints.map((point, index) => {
            const Icon = point.icon
            return (
              <div
                key={index}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-xl transition-shadow text-center border border-gold-100"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-50 rounded-full mb-4">
                  <Icon className="w-8 h-8 text-gold-300" />
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-2">
                  {point.title}
                </h3>
                <p className="text-gray-600 text-sm">{point.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

