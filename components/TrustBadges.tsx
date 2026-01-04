import { Shield, Award, Truck, RotateCcw, CheckCircle, Sparkles } from 'lucide-react'

const badges = [
  {
    icon: Shield,
    title: '100% Certified',
    description: 'Authentic Silver',
  },
  {
    icon: Award,
    title: 'Handcrafted',
    description: 'Traditional Techniques',
  },
  {
    icon: Truck,
    title: 'Free Shipping',
    description: 'Nationwide Delivery',
  },
  {
    icon: RotateCcw,
    title: 'Easy Returns',
    description: '30 Days Money Back',
  },
  {
    icon: CheckCircle,
    title: 'Lifetime Exchange',
    description: 'Buyback Guarantee',
  },
  {
    icon: Sparkles,
    title: 'Premium Quality',
    description: 'No Compromise',
  },
]

export default function TrustBadges() {
  return (
    <section className="py-12 bg-white border-y border-gold-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div
                key={index}
                className="text-center group hover:scale-105 transition-transform duration-300 p-4 rounded-lg"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-50 rounded-full mb-3 group-hover:bg-gold-100 transition-colors transform group-hover:rotate-6 duration-300">
                  <Icon className="w-8 h-8 text-gold-300" />
                </div>
                <h3 className="font-semibold text-gray-900 text-sm mb-1">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-600">{badge.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

