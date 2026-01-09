"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Eye, Loader2, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";

const STORAGE_KEY = "recently_viewed_products";

export default function RecentlyViewedPage() {
  const { data: session, status } = useSession();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        if (session) {
          // Logged in: Fetch from DB
          const response = await apiClient.getRecentlyViewed();
          if (response.status === "success" && response.data?.recentlyViewed) {
            setProducts(
              response.data.recentlyViewed.products.map((p: any) => ({
                ...p,
                id: p.productId || p.id,
              }))
            );
          }
        } else {
          // Guest: Fetch from localStorage
          const stored = localStorage.getItem(STORAGE_KEY);
          if (stored) {
            setProducts(JSON.parse(stored));
          }
        }
      } catch (error) {
        console.error("Error fetching recently viewed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status !== "loading") {
      fetchRecentlyViewed();
    }
  }, [session, status]);

  const clearHistory = () => {
    localStorage.removeItem(STORAGE_KEY);
    setProducts([]);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center justify-between mb-10">
        <div className="flex items-center gap-3">
          <div className="p-3 bg-blue-50 rounded-full">
            <Eye className="w-8 h-8 text-blue-500" />
          </div>
          <div>
            <h1 className="text-4xl font-serif font-bold text-gray-900">
              Recently Viewed
            </h1>
            <p className="text-gray-600">
              Quickly find the jewelry you were looking at
            </p>
          </div>
        </div>
        {products.length > 0 && !session && (
          <button
            onClick={clearHistory}
            className="flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors"
          >
            <Trash2 className="w-4 h-4" />
            Clear History
          </button>
        )}
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl">
          <p className="text-xl text-gray-500 mb-6">
            No recently viewed items yet
          </p>
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gold-400 hover:bg-gold-500 transition-colors"
          >
            Start Browsing
          </a>
        </div>
      ) : (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
