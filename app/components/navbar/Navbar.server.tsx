import Link from "next/link";
import { NAV_CATEGORIES } from "./nav.config";
import dynamic from 'next/dynamic'

const NavbarClient = dynamic(() => import('./Navbar.client'), {
  ssr: false,
  loading: () => <div className="flex items-center gap-4"></div>
})
import TrustBar from "./TrustBar.server";
import { BRAND_NAME, BRAND_SUBTITLE } from "@/lib/constants";

export default async function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-white">
      <TrustBar />

      <nav
        role="navigation"
        aria-label="Main navigation"
        className="border-b relative"
      >
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between">
            
            {/* Logo */}
            <Link href="/" aria-label="Go to homepage" className="leading-tight">
              {/* Mobile: Short logo */}
              <div className="block sm:hidden">
                <h1 className="text-2xl font-serif font-bold text-gold-400">
                  {BRAND_NAME.charAt(0)}{BRAND_NAME.split(' ')[1]?.charAt(0) || 'J'}
                </h1>
              </div>
              {/* Desktop: Full logo */}
              <div className="hidden sm:block">
                <h1 className="text-2xl font-serif font-bold text-gold-400">
                  {BRAND_NAME}
                </h1>
                <p className="text-xs tracking-wide text-gold-600">
                  {BRAND_SUBTITLE}
                </p>
              </div>
            </Link>

            {/* Interactive Area */}
            <NavbarClient categories={NAV_CATEGORIES} />
          </div>
        </div>
      </nav>
    </header>
  );
}
