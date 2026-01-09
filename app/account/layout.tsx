"use client";

import { useSession } from "next-auth/react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import {
  User,
  Package,
  Heart,
  Eye,
  Settings,
  LayoutDashboard,
  LogOut,
} from "lucide-react";
import { signOut } from "next-auth/react";

const sidebarLinks = [
  { name: "Overview", href: "/dashboard", icon: LayoutDashboard },
  { name: "My Orders", href: "/account/orders", icon: Package },
  { name: "Wishlist", href: "/account/wishlist", icon: Heart },
  { name: "Recently Viewed", href: "/account/recently-viewed", icon: Eye },
  { name: "Account Settings", href: "/settings", icon: Settings },
];

export default function AccountLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const router = useRouter();
  const pathname = usePathname();

  if (status === "loading") return null;

  if (status === "unauthenticated") {
    router.push("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="lg:grid lg:grid-cols-12 lg:gap-8">
          {/* Sidebar */}
          <aside className="lg:col-span-3">
            <nav className="space-y-1">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    className={`group flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 ${
                      isActive
                        ? "bg-gold-400 text-white shadow-md shadow-gold-100"
                        : "text-gray-600 hover:bg-white hover:text-gold-500"
                    }`}
                  >
                    <Icon
                      className={`mr-3 h-5 w-5 ${
                        isActive
                          ? "text-white"
                          : "text-gray-400 group-hover:text-gold-500"
                      }`}
                    />
                    {link.name}
                  </Link>
                );
              })}
              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="w-full flex items-center px-4 py-3 text-sm font-medium text-red-600 rounded-lg hover:bg-red-50 hover:text-red-700 transition-all duration-200 mt-4"
              >
                <LogOut className="mr-3 h-5 w-5" />
                Sign Out
              </button>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="mt-8 lg:mt-0 lg:col-span-9 bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
