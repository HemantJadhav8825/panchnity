"use client";

import { useState, useEffect } from "react";
import { apiClient } from "@/lib/api";
import { Product } from "@/types/product";
import ProductCard from "@/components/ProductCard";
import { Heart, Loader2 } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function WishlistPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }

    const fetchWishlist = async () => {
      try {
        const response = await apiClient.getWishlist();
        if (response.status === "success" && response.data?.wishlist) {
          setProducts(
            response.data.wishlist.items.map((item: any) => ({
              ...item,
              id: item.productId, // Map productId to id for ProductCard
            }))
          );
        }
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (status === "authenticated") {
      fetchWishlist();
    }
  }, [status, router]);

  if (status === "loading" || isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-gold-400" />
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="flex items-center gap-3 mb-10">
        <div className="p-3 bg-red-50 rounded-full">
          <Heart className="w-8 h-8 text-red-500 fill-current" />
        </div>
        <div>
          <h1 className="text-4xl font-serif font-bold text-gray-900">
            My Wishlist
          </h1>
          <p className="text-gray-600">
            You have {products.length} items saved
          </p>
        </div>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-20 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-xl text-gray-500 mb-6">Your wishlist is empty</p>
          <a
            href="/products"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-gold-400 hover:bg-gold-500 transition-colors"
          >
            Explore Collection
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
