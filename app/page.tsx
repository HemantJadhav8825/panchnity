import HeroSection from '@/components/HeroSection'
import TrustBadges from '@/components/TrustBadges'
import CategoryShowcase from '@/components/CategoryShowcase'
import CollectionSpotlight from '@/components/CollectionSpotlight'
import FeaturedProducts from '@/components/FeaturedProducts'
import TrustPoints from '@/components/TrustPoints'
import Testimonials from '@/components/Testimonials'

export default function Home() {
  return (
    <>
      <HeroSection />
      <TrustBadges />
      <CategoryShowcase />
      <CollectionSpotlight />
      <FeaturedProducts />
      <TrustPoints />
      <Testimonials />
    </>
  )
}

