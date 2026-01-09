"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { apiClient } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Loader2 } from "lucide-react";
import WhatsAppButton from "@/components/WhatsAppButton";

export default function CategoryPage() {
  const { slug } = useParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        // slug is like "necklaces"
        const categorySlug = slug as string;
        setCategoryName(categorySlug.replace("-", " "));

        const response = await apiClient.getProducts({
          category: categorySlug,
          limit: 20,
        });

        if (response.status === "success" && response.data?.products) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching category products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (slug) {
      fetchCategoryProducts();
    }
  }, [slug]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-serif font-bold text-gray-900 mb-4 capitalize">
            {categoryName} Collection
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Explore our curated selection of handcrafted{" "}
            {categoryName.toLowerCase()} pieces. Made with pure silver and
            attention to detail.
          </p>
        </div>

        {products.length === 0 ? (
          <div className="text-center py-20 bg-gray-50 rounded-2xl">
            <p className="text-xl text-gray-500 mb-6">
              No products found in this category
            </p>
            <a href="/products" className="text-gold-500 font-medium">
              View all products →
            </a>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}

        {products.length > 0 && (
          <div className="mt-16 text-center border-t border-gray-100 pt-12">
            <h2 className="text-2xl font-serif font-bold text-gray-900 mb-6 font-serif">
              Looking for something custom?
            </h2>
            <WhatsAppButton
              category={categoryName}
              buttonText={`Inquire About ${categoryName}`}
              className="mx-auto"
            />
          </div>
        )}
      </div>
    </div>
  );
}
