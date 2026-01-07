import { Suspense } from "react";
import { getAllProducts } from "@/lib/products";
import { getCategories } from "@/lib/categories";
import ProductsClient from "@/components/ProductsClient";
import Loading from "@/app/products/loading";
import WhatsAppButton from "@/components/WhatsAppButton";
import Link from "next/link";
import Image from "next/image";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Collections | PANCHANITY JEWELLERS",
  description:
    "Explore our complete collection of handcrafted silver jewelry and religious items. From idols to pooja items, discover pieces made with traditional techniques and authentic 925 pure silver.",
  keywords: [
    "collections",
    "silver jewelry",
    "religious items",
    "pooja items",
    "idols",
    "traditional jewelry",
    "925 silver",
    "panchnity jewellers",
  ],
  openGraph: {
    title: "Complete Collections | PANCHANITY JEWELLERS",
    description:
      "Browse our entire collection of handcrafted silver jewelry and religious items.",
    type: "website",
  },
};

export default async function CollectionsPage() {
  let allProducts: any[] = [];
  let categories: any[] = [];

  try {
    [allProducts, categories] = await Promise.all([
      getAllProducts(),
      getCategories(),
    ]);
  } catch (error) {
    console.error("Error fetching data:", error);
    // Continue with empty arrays
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Our Collections
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our complete range of handcrafted silver jewelry and
            religious items. Each collection represents the finest traditional
            craftsmanship and devotion.
          </p>
        </div>

        {/* Category Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="group block"
            >
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                <div className="relative aspect-[4/3] bg-gray-100">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <h3 className="text-xl font-serif font-bold text-white mb-2">
                      {category.name}
                    </h3>
                    <p className="text-white/90 text-sm">
                      {category.itemCount} items
                    </p>
                  </div>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm">
                    {category.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* All Products */}
        <div className="border-t border-gray-200 pt-12">
          <h2 className="text-3xl font-serif font-bold text-gray-900 mb-8 text-center">
            Complete Collection
          </h2>

          <Suspense fallback={<Loading />}>
            <ProductsClient products={allProducts} showFilters={true} />
          </Suspense>

          {/* WhatsApp CTA */}
          <div className="text-center mt-12">
            <WhatsAppButton
              customMessage="Hello, I would like to explore your complete silver jewelry collection. Can you help me find the perfect pieces?"
              buttonText="Get Personalized Recommendations"
              className="mx-auto"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
