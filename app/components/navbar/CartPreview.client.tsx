"use client";

import { ShoppingBag } from "lucide-react";

export default function CartPreview() {
  return (
    <button aria-label="Cart" className="relative">
      <ShoppingBag />
      <span className="badge">3</span>

      {/* Mini cart */}
      <div className="absolute right-0 top-full hidden group-hover:block w-80 bg-white shadow-lg">
        <p className="p-4 font-medium">Your Cart</p>
      </div>
    </button>
  );
}
