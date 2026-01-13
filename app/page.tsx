import HeroSection from "@/components/HeroSection";
import TrustBadges from "@/components/TrustBadges";
import RecommendationSection from "@/components/RecommendationSection";
import CategoryShowcase from "@/components/CategoryShowcase";
import FeaturedProducts from "@/components/FeaturedProducts";
import CollectionSpotlight from "@/components/CollectionSpotlight";
import TrustPoints from "@/components/TrustPoints";
import StatsSection from "@/components/StatsSection";
import CraftsmanshipSection from "@/components/CraftsmanshipSection";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import FAQSection from "@/components/FAQSection";
import InstagramSection from "@/components/InstagramSection";
import NewsletterSection from "@/components/NewsletterSection";

export default function Home() {
  return (
    <>
      <h1>Hemant jadhav developer</h1>
      {/* 1. Hero - First impression, main value proposition */}
      <HeroSection />

      {/* 2. Trust Badges - Immediate credibility */}
      <TrustBadges />

      {/* 3. Category Showcase - Help users navigate */}
      <CategoryShowcase />

      {/* 4. Featured Products - Show best products early */}
      <FeaturedProducts />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RecommendationSection />
      </div>

      {/* 5. Collection Spotlight - Showcase collections */}
      <CollectionSpotlight />

      {/* 6. Why Choose Us - Build trust and differentiate */}
      <TrustPoints />

      {/* 7. Stats - Social proof with numbers */}
      <StatsSection />

      {/* 8. Craftsmanship - Quality story and brand values */}
      <CraftsmanshipSection />

      {/* 9. Process - How it works for new visitors */}
      <ProcessSection />

      {/* 10. Testimonials - Social proof from customers */}
      <Testimonials />

      {/* 11. FAQ - Address common concerns */}
      <FAQSection />

      {/* 12. Instagram - Social engagement and visual proof */}
      <InstagramSection />

      {/* 13. Newsletter - Lead capture at the end */}
      <NewsletterSection />
    </>
  );
}
