import { Users, Award, Package, Heart } from 'lucide-react'

const stats = [
  {
    icon: Users,
    number: '5000+',
    label: 'Happy Customers',
    description: 'Trusted by devotees across India',
  },
  {
    icon: Award,
    number: '15+',
    label: 'Years of Excellence',
    description: 'Serving with dedication since 2009',
  },
  {
    icon: Package,
    number: '1000+',
    label: 'Products Delivered',
    description: 'Quality silver items shipped nationwide',
  },
  {
    icon: Heart,
    number: '100%',
    label: 'Authentic Silver',
    description: 'Certified 925 pure silver guarantee',
  },
]

export default function StatsSection() {
  return (
    <section className="py-16 bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">
            Our Journey in Numbers
          </h2>
          <p className="text-gray-300 text-lg max-w-2xl mx-auto">
            Building trust through quality, authenticity, and devotion
          </p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="text-center group"
              >
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gold-300/20 rounded-full mb-4 group-hover:bg-gold-300/30 transition-colors">
                  <Icon className="w-8 h-8 text-gold-300" />
                </div>
                <div className="text-4xl md:text-5xl font-serif font-bold text-gold-300 mb-2">
                  {stat.number}
                </div>
                <h3 className="text-xl font-semibold mb-1">{stat.label}</h3>
                <p className="text-gray-400 text-sm">{stat.description}</p>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

