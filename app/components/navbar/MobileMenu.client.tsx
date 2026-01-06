"use client";

import Link from "next/link";
import { X, ChevronDown, ChevronUp } from "lucide-react";
import { NavCategory } from "./nav.types";
import { useState } from "react";

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
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());

  const toggleCategory = (categoryLabel: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryLabel)) {
      newExpanded.delete(categoryLabel);
    } else {
      newExpanded.add(categoryLabel);
    }
    setExpandedCategories(newExpanded);
  };

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
          <ul className="space-y-2">
            {categories.map((cat) => {
              const isExpanded = expandedCategories.has(cat.label);
              const hasSubcategories = cat.featured && cat.featured.length > 0;

              return (
                <li key={cat.label} className="border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center justify-between py-3">
                    <Link
                      href={cat.slug}
                      className={`text-lg font-medium flex-1 ${
                        cat.highlight ? "text-gold-600" : ""
                      }`}
                      onClick={onClose}
                    >
                      {cat.label}
                    </Link>
                    {hasSubcategories && (
                      <button
                        onClick={() => toggleCategory(cat.label)}
                        className="p-1 ml-2 text-gray-500 hover:text-gray-700"
                        aria-label={isExpanded ? "Collapse submenu" : "Expand submenu"}
                      >
                        {isExpanded ? (
                          <ChevronUp className="w-5 h-5" />
                        ) : (
                          <ChevronDown className="w-5 h-5" />
                        )}
                      </button>
                    )}
                  </div>

                  {/* Subcategories */}
                  {hasSubcategories && isExpanded && cat.featured && (
                    <ul className="ml-4 mb-3 space-y-2 border-l-2 border-gray-200 pl-4">
                      {cat.featured.map((subcategory) => (
                        <li key={subcategory}>
                          <Link
                            href={`${cat.slug}/${subcategory.toLowerCase().replace(/\s+/g, '-')}`}
                            className="block py-2 text-sm text-gray-600 hover:text-gold-600 transition-colors"
                            onClick={onClose}
                          >
                            {subcategory}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
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
