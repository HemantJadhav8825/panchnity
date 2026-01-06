"use client";

import { useState } from "react";
import Link from "next/link";
import { NavCategory } from "./nav.types";
import SearchBar from "./SearchBar.client";
import MegaMenu from "./MegaMenu.client";
import MobileMenu from "./MobileMenu.client";
import CartPreview from "./CartPreview.client";
import SignInButton from "@/components/SignInButton";
import { Heart, Menu, Search } from "lucide-react";

interface NavbarClientProps {
  categories: NavCategory[];
}

export default function NavbarClient({ categories }: NavbarClientProps) {
  const [openMega, setOpenMega] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileSearchOpen, setMobileSearchOpen] = useState(false);

  return (
    <>
      {/* Desktop Navigation */}
      <ul className="hidden lg:flex gap-8">
        {categories.map((cat) => (
          <li key={cat.label}>
            <Link
              href={cat.slug}
              className="font-medium hover:text-gold-600"
              onMouseEnter={() => setOpenMega(cat.label)}
            >
              {cat.label}
            </Link>
          </li>
        ))}
      </ul>

      <div className="flex items-center gap-4">
        <SearchBar />

        {/* Wishlist */}
        <button aria-label="Wishlist" className="relative">
          <Heart />
          <span className="badge">2</span>
        </button>

        {/* Cart */}
        <CartPreview />

        {/* Sign In Button */}
        <SignInButton />

        {/* Mobile Search Button */}
        <button
          aria-label="Open search"
          className="sm:hidden"
          onClick={() => setMobileSearchOpen(!mobileSearchOpen)}
        >
          <Search />
        </button>

        {/* Mobile Menu Button */}
        <button
          aria-label="Open menu"
          className="lg:hidden"
          onClick={() => setMobileOpen(true)}
        >
          <Menu />
        </button>
      </div>

      {/* Desktop Mega Menu */}
      <MegaMenu
        categories={categories}
        open={openMega}
        onOpen={setOpenMega}
        onClose={() => setOpenMega(null)}
      />

      {/* Mobile Menu */}
      <MobileMenu
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        categories={categories}
      />

      {/* Mobile Search Bar */}
      {mobileSearchOpen && (
        <div className="sm:hidden absolute top-full left-0 right-0 bg-white border-b shadow-lg z-30">
          <div className="p-4">
            <div className="flex items-center gap-3 mb-3">
              <button
                onClick={() => setMobileSearchOpen(false)}
                className="text-gray-500 hover:text-gray-700 p-1"
                aria-label="Close search"
              >
                ✕
              </button>
              <span className="text-sm font-medium text-gray-700">Search Products</span>
            </div>
            <input
              type="search"
              placeholder="Search rings, diamonds, occasions…"
              className="w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-gold-300 focus:outline-none text-base"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}
