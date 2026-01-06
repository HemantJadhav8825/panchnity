"use client";

import Link from "next/link";
import { X } from "lucide-react";
import { NavCategory } from "./nav.types";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
  categories: NavCategory[];
}

export default function MobileMenu({
  open,
  onClose,
  categories,
}: MobileMenuProps) {
  if (!open) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 z-40 bg-black/40"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Drawer */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className="fixed right-0 top-0 z-50 h-full w-80 bg-white shadow-xl flex flex-col"
      >
        <div className="flex items-center justify-between border-b p-4">
          <span className="font-semibold">Menu</span>
          <button onClick={onClose} aria-label="Close menu">
            <X />
          </button>
        </div>

        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-4">
            {categories.map((cat) => (
              <li key={cat.label}>
                <Link
                  href={cat.slug}
                  className={`block text-lg font-medium ${
                    cat.highlight ? "text-gold-600" : ""
                  }`}
                  onClick={onClose}
                >
                  {cat.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        {/* Trust indicators */}
        <div className="border-t p-4 text-sm text-gray-600">
          <p>✔ Certified Jewelry</p>
          <p>🚚 Free Shipping</p>
          <p>🔒 Secure Checkout</p>
        </div>
      </aside>
    </>
  );
}
