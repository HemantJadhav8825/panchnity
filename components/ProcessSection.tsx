import { ShoppingBag, MessageCircle, Truck, Heart } from 'lucide-react'

const steps = [
  {
    icon: ShoppingBag,
    title: 'Browse Collection',
    description: 'Explore our exquisite range of silver temple idols, pooja items, and bhakti jewellery',
    step: '01',
  },
  {
    icon: MessageCircle,
    title: 'Contact Us',
    description: 'Reach out via WhatsApp or phone to discuss your requirements and get personalized assistance',
    step: '02',
  },
  {
    icon: Truck,
    title: 'Secure Delivery',
    description: 'We ensure safe packaging and nationwide delivery with tracking for your peace of mind',
    step: '03',
  },
  {
    icon: Heart,
    title: 'Enjoy & Worship',
    description: 'Receive your blessed items and enhance your spiritual practice with authentic silver pieces',
    step: '04',
  },
]

export default function ProcessSection() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold text-gray-900 mb-4">
            How It Works
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            A simple and seamless process to bring divine silver pieces to your home
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={index}
                className="relative text-center group"
              >
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-gold-50 rounded-full transform group-hover:scale-110 transition-transform duration-300"></div>
                  <div className="relative inline-flex items-center justify-center w-20 h-20 bg-gold-100 rounded-full border-4 border-white shadow-lg group-hover:bg-gold-200 transition-colors">
                    <Icon className="w-10 h-10 text-gold-600" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-gold-300 rounded-full flex items-center justify-center text-white text-xs font-bold">
                    {step.step}
                  </div>
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-10 left-full w-full h-0.5 bg-gold-100 transform translate-x-4">
                    <div className="absolute right-0 top-1/2 transform -translate-y-1/2 w-3 h-3 bg-gold-300 rounded-full"></div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

