"use client";

import { useState, useEffect } from "react";
import { Product } from "@/types/product";
import { apiClient } from "@/lib/api";
import ProductCard from "./ProductCard";
import { Sparkles } from "lucide-react";

interface RecommendationSectionProps {
  title?: string;
  limit?: number;
}

export default function RecommendationSection({
  title = "Recommended For You",
  limit = 4,
}: RecommendationSectionProps) {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecommendations = async () => {
      try {
        const response = await apiClient.getRecommendations(limit);
        if (response.status === "success" && response.data) {
          setProducts(response.data.products);
        }
      } catch (error) {
        console.error("Error fetching recommendations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchRecommendations();
  }, [limit]);

  if (isLoading) {
    return (
      <div className="py-12">
        <div className="animate-pulse space-y-8">
          <div className="h-8 bg-gray-200 rounded w-1/4"></div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[...Array(limit)].map((_, i) => (
              <div
                key={i}
                className="aspect-square bg-gray-200 rounded-xl"
              ></div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (products.length === 0) return null;

  return (
    <section className="py-12">
      <div className="flex items-center gap-2 mb-8">
        <Sparkles className="w-6 h-6 text-gold-400" />
        <h2 className="text-3xl font-serif font-bold text-gray-900">{title}</h2>
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
