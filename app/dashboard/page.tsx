'use client'


import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import { useAuth } from "@/lib/hooks/useApi"
import Link from "next/link"
import Image from "next/image"
import { LogOut, User, Mail, Calendar, Settings, Package, Heart, Eye, HeadphonesIcon, Gift } from "lucide-react"

export default function DashboardPage() {
  const { user: jwtUser, loading: jwtLoading, logout: jwtLogout } = useAuth()
  const { data: session, status } = useSession()
  const [isLoggingOut, setIsLoggingOut] = useState(false)
  const router = useRouter()

  // Check if user is authenticated via either method
  const isAuthenticated = jwtUser || session
  const isLoading = jwtLoading || status === 'loading'

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push('/login')
    }
  }, [isAuthenticated, isLoading, router])

  const handleLogout = async () => {
    setIsLoggingOut(true)
    try {
      // Logout from both authentication methods
      if (session) {
        await signOut({ callbackUrl: '/login' })
      }
      if (jwtUser) {
        await jwtLogout()
      }
      router.push('/login')
    } catch (err) {
      console.error('Logout failed:', err)
    } finally {
      setIsLoggingOut(false)
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-gold-200 border-t-gold-400 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading your dashboard...</p>
        </div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return null // Will redirect in useEffect
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
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              {session?.user?.image ? (
                <Image
                  src={session.user.image}
                  alt={session.user.name || 'User'}
                  width={64}
                  height={64}
                  className="w-16 h-16 rounded-full border-2 border-white shadow-md"
                />
              ) : (
                <div className="w-16 h-16 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-md">
                  <User className="w-8 h-8 text-white" />
                </div>
              )}
              <div>
                <h2 className="text-2xl font-serif font-bold text-gray-900">
                  Hello, {session?.user?.name || jwtUser?.name}!
                </h2>
                <div className="flex items-center gap-4 text-gray-600">
                  <div className="flex items-center gap-1">
                    <Mail className="w-4 h-4" />
                    <span>{session?.user?.email || jwtUser?.email}</span>
                  </div>
                  {jwtUser?.role && (
                    <span className="px-2 py-1 bg-gold-200 text-gold-800 rounded-full text-xs font-medium">
                      {jwtUser.role}
                    </span>
                  )}
                  {session && !jwtUser && (
                    <span className="px-2 py-1 bg-blue-200 text-blue-800 rounded-full text-xs font-medium">
                      Google Account
                    </span>
                  )}
                </div>
                <p className="text-sm text-gold-600 mt-1">
                  {jwtUser?.createdAt
                    ? `Member since ${new Date(jwtUser.createdAt).toLocaleDateString()}`
                    : session
                      ? 'Signed in with Google'
                      : 'Member since today'
                  }
                </p>
              </div>
            </div>
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="flex items-center gap-2 px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded-lg transition-colors disabled:opacity-50"
            >
              <LogOut className="w-4 h-4" />
              {isLoggingOut ? 'Signing out...' : 'Sign Out'}
            </button>
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

          {/* Admin Panel - Only for JWT authenticated admins */}
          {jwtUser?.role === 'admin' && (
            <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center">
                  🛡️
                </div>
                <h3 className="text-lg font-semibold text-gray-900">Admin Panel</h3>
              </div>
              <p className="text-gray-600 mb-4">Manage users, orders, and system settings.</p>
              <Link
                href="/admin/users"
                className="text-gold-600 hover:text-gold-700 font-medium text-sm"
              >
                Admin Dashboard →
              </Link>
            </div>
          )}

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
