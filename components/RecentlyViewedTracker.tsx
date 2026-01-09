"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import { apiClient } from "@/lib/api";

interface RecentlyViewedTrackerProps {
  product: {
    id: string;
    name: string;
    slug: string;
    images: string[];
    price?: number;
    category: string;
  };
}

const STORAGE_KEY = "recently_viewed_products";
const MAX_ITEMS = 10;

export default function RecentlyViewedTracker({
  product,
}: RecentlyViewedTrackerProps) {
  const { data: session } = useSession();

  useEffect(() => {
    if (!product) return;

    const trackView = async () => {
      // 1. Logged-in user tracking
      if (session?.user) {
        try {
          await apiClient.trackRecentlyViewed({
            productId: product.id,
            name: product.name,
            slug: product.slug,
            image: product.images[0],
            price: product.price,
            category: product.category,
          });
        } catch (error) {
          console.error("Error tracking recently viewed product (API):", error);
        }
      }

      // 2. Guest tracking (localStorage)
      // Even if logged in, we can maintain localStorage for a consistent experience
      // when they log out or if the API fails, but the requirement suggests
      // Logged-in -> DB, Guests -> localStorage.
      // I'll always update localStorage for guests, and DB for logged-in.

      const stored = localStorage.getItem(STORAGE_KEY);
      let items = stored ? JSON.parse(stored) : [];

      // Remove existing entry for this product
      items = items.filter((item: any) => item.id !== product.id);

      // Add to front
      items.unshift({
        id: product.id,
        name: product.name,
        slug: product.slug,
        image: product.images[0],
        price: product.price,
        category: product.category,
        viewedAt: new Date().toISOString(),
      });

      // Limit to 10
      if (items.length > MAX_ITEMS) {
        items = items.slice(0, MAX_ITEMS);
      }

      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    };

    // Small delay to ensure it doesn't impact perceived page load performance
    const timer = setTimeout(trackView, 1000);
    return () => clearTimeout(timer);
  }, [product, session]);

  return null; // This component doesn't render anything
}
