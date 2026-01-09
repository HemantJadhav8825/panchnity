"use client";

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { Heart } from "lucide-react";
import { apiClient } from "@/lib/api";
import { toast } from "react-hot-toast";

interface WishlistButtonProps {
  productId: string;
  initialIsWishlisted?: boolean;
  className?: string;
}

export default function WishlistButton({
  productId,
  initialIsWishlisted = false,
  className = "",
}: WishlistButtonProps) {
  const { data: session } = useSession();
  const [isWishlisted, setIsWishlisted] = useState(initialIsWishlisted);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // If we have session, we might want to check if it's in the wishlist
    // but for now we rely on initialIsWishlisted passed from parent
    setIsWishlisted(initialIsWishlisted);
  }, [initialIsWishlisted]);

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (!session) {
      toast.error("Please login to use the wishlist");
      return;
    }

    setIsLoading(true);
    try {
      if (isWishlisted) {
        await apiClient.removeFromWishlist(productId);
        setIsWishlisted(false);
        toast.success("Removed from wishlist");
      } else {
        await apiClient.addToWishlist(productId);
        setIsWishlisted(true);
        toast.success("Added to wishlist");
      }
    } catch (error: any) {
      console.error("Wishlist error:", error);
      toast.error(error.message || "Failed to update wishlist");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={toggleWishlist}
      disabled={isLoading}
      className={`p-2 rounded-full transition-all duration-300 ${
        isWishlisted
          ? "bg-red-50 text-red-500"
          : "bg-white/80 text-gray-400 hover:text-red-500 hover:bg-red-50"
      } ${className}`}
      aria-label={isWishlisted ? "Remove from wishlist" : "Add to wishlist"}
    >
      <Heart className={`w-5 h-5 ${isWishlisted ? "fill-current" : ""}`} />
    </button>
  );
}
