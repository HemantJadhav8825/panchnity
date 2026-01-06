import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import Link from "next/link"
import Image from "next/image"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Dashboard | PANCHANITY JEWELLERS',
  description: 'Your personal dashboard for managing orders and preferences.',
}

export default async function DashboardPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Manage your orders, preferences, and account settings from your personal dashboard.
          </p>
        </div>

        {/* User Info Card */}
        <div className="bg-gradient-to-r from-gold-50 to-gold-100 border border-gold-200 rounded-lg p-8 mb-8">
          <div className="flex items-center gap-6">
            {session.user?.image && (
              <Image
                src={session.user.image}
                alt={session.user.name || 'User'}
                width={64}
                height={64}
                className="w-16 h-16 rounded-full border-2 border-white shadow-md"
              />
            )}
            <div>
              <h2 className="text-2xl font-serif font-bold text-gray-900">
                Hello, {session.user?.name}!
              </h2>
              <p className="text-gray-600">{session.user?.email}</p>
              <p className="text-sm text-gold-600 mt-1">Member since today</p>
            </div>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Orders */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                📦
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Your Orders</h3>
            </div>
            <p className="text-gray-600 mb-4">Track your jewelry orders and purchase history.</p>
            <Link
              href="/orders"
              className="text-gold-600 hover:text-gold-700 font-medium text-sm"
            >
              View Orders →
            </Link>
          </div>

          {/* Wishlist */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-red-100 rounded-lg flex items-center justify-center">
                ❤️
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Wishlist</h3>
            </div>
            <p className="text-gray-600 mb-4">Your saved jewelry pieces for future purchase.</p>
            <Link
              href="/wishlist"
              className="text-gold-600 hover:text-gold-700 font-medium text-sm"
            >
              View Wishlist →
            </Link>
          </div>

          {/* Account Settings */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                ⚙️
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Account Settings</h3>
            </div>
            <p className="text-gray-600 mb-4">Manage your profile and account preferences.</p>
            <Link
              href="/settings"
              className="text-gold-600 hover:text-gold-700 font-medium text-sm"
            >
              Manage Account →
            </Link>
          </div>

          {/* Recently Viewed */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                👁️
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Recently Viewed</h3>
            </div>
            <p className="text-gray-600 mb-4">Quick access to jewelry you&apos;ve recently viewed.</p>
            <Link
              href="/recently-viewed"
              className="text-gold-600 hover:text-gold-700 font-medium text-sm"
            >
              View Items →
            </Link>
          </div>

          {/* Support */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                💬
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Support</h3>
            </div>
            <p className="text-gray-600 mb-4">Get help with orders, products, or account issues.</p>
            <Link
              href="/support"
              className="text-gold-600 hover:text-gold-700 font-medium text-sm"
            >
              Contact Support →
            </Link>
          </div>

          {/* Special Offers */}
          <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 bg-gold-100 rounded-lg flex items-center justify-center">
                🎁
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Special Offers</h3>
            </div>
            <p className="text-gray-600 mb-4">Exclusive deals and offers for our valued customers.</p>
            <Link
              href="/offers"
              className="text-gold-600 hover:text-gold-700 font-medium text-sm"
            >
              View Offers →
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
