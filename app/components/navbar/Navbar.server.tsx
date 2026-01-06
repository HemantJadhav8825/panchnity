import Link from "next/link";
import { NAV_CATEGORIES } from "./nav.config";
import NavbarClient from "./Navbar.client";
import TrustBar from "./TrustBar.server";
import { BRAND_NAME, BRAND_SUBTITLE } from "@/lib/constants";

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <TrustBar />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="border-b"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <Link href="/" aria-label="Go to homepage" className="leading-tight">
              <h1 className="text-2xl font-serif font-bold text-gold-400">
                {BRAND_NAME}
              </h1>
              <p className="text-xs tracking-wide text-gold-600">
                {BRAND_SUBTITLE}
              </p>
            </Link>

            {/* Interactive Area */}
            <NavbarClient categories={NAV_CATEGORIES} />
          </div>
        </div>
      </nav>
    </header>
  );
}
