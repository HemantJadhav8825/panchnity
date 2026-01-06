"use client";

import { useState } from "react";
import Link from "next/link";
import { NavCategory } from "./nav.types";
import SearchBar from "./SearchBar.client";
import MegaMenu from "./MegaMenu.client";
import MobileMenu from "./MobileMenu.client";
import CartPreview from "./CartPreview.client";
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
        <div className="sm:hidden bg-white border-b shadow-lg">
          <div className="flex items-center gap-4 p-4">
            <button
              onClick={() => setMobileSearchOpen(false)}
              className="text-gray-500 hover:text-gray-700"
              aria-label="Close search"
            >
              ✕
            </button>
            <input
              type="search"
              placeholder="Search rings, diamonds, occasions…"
              className="flex-1 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-gold-300 focus:outline-none"
              autoFocus
            />
          </div>
        </div>
      )}
    </>
  );
}
