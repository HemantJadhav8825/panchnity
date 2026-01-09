"use client";

import { useSession } from "next-auth/react";
import Image from "next/image";
import { User, Mail, Calendar, ShieldCheck } from "lucide-react";

export default function AccountOverview() {
  const { data: session } = useSession();

  return (
    <div className="p-8">
      <div className="flex items-center gap-6 mb-10">
        {session?.user?.image ? (
          <Image
            src={session.user.image}
            alt={session.user.name || "User"}
            width={80}
            height={80}
            className="w-20 h-20 rounded-full border-4 border-gold-50 shadow-sm"
          />
        ) : (
          <div className="w-20 h-20 bg-gold-100 rounded-full flex items-center justify-center">
            <User className="w-10 h-10 text-gold-500" />
          </div>
        )}
        <div>
          <h1 className="text-3xl font-serif font-bold text-gray-900">
            Hello, {session?.user?.name}!
          </h1>
          <div className="flex flex-wrap gap-4 mt-2">
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <Mail className="w-4 h-4" />
              {session?.user?.email}
            </div>
            <div className="flex items-center gap-1.5 text-sm text-gray-500">
              <ShieldCheck className="w-4 h-4 text-green-500" />
              Verified Account
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 bg-gold-50 rounded-xl border border-gold-100">
          <h3 className="text-sm font-semibold text-gold-700 uppercase tracking-wider mb-2">
            Loyalty Program
          </h3>
          <p className="text-2xl font-bold text-gray-900">Silver Member</p>
          <p className="text-sm text-gray-600 mt-1">
            150 points earned this year
          </p>
        </div>
        <div className="p-6 bg-gray-50 rounded-xl border border-gray-100">
          <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">
            Order History
          </h3>
          <p className="text-2xl font-bold text-gray-900">3 Orders</p>
          <p className="text-sm text-gray-600 mt-1">
            Last order on Dec 15, 2025
          </p>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-xl font-serif font-bold text-gray-900 mb-6">
          Recent Activity
        </h2>
        <div className="bg-white border border-gray-100 rounded-lg overflow-hidden">
          <div className="p-4 flex items-center justify-between border-b border-gray-50">
            <span className="text-sm text-gray-600">
              Updated profile information
            </span>
            <span className="text-xs text-gray-400">2 days ago</span>
          </div>
          <div className="p-4 flex items-center justify-between border-b border-gray-50">
            <span className="text-sm text-gray-600">
              Added &quot;Sterling Silver Ring&quot; to wishlist
            </span>
            <span className="text-xs text-gray-400">5 days ago</span>
          </div>
          <div className="p-4 flex items-center justify-between">
            <span className="text-sm text-gray-600">
              Signed up for newsletter
            </span>
            <span className="text-xs text-gray-400">1 week ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}
