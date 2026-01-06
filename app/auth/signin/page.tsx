import { getServerSession } from "next-auth"
import { redirect } from "next/navigation"
import { authOptions } from "@/lib/auth"
import SignInButton from "@/components/SignInButton"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: 'Sign In | PANCHANITY JEWELLERS',
  description: 'Sign in to your PANCHANITY JEWELLERS account to access exclusive features.',
}

export default async function SignInPage() {
  const session = await getServerSession(authOptions)

  if (session) {
    redirect('/dashboard')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gold-50 via-white to-gold-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gold-400 mb-2">
            PANCHANITY JEWELLERS
          </h1>
          <p className="text-sm text-gold-600">KARIGAR</p>
        </div>

        {/* Sign In Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Welcome Back
          </h2>
          <p className="text-gray-600 mb-8">
            Sign in to access your dashboard, track orders, and manage your preferences.
          </p>

          <div className="space-y-4">
            <SignInButton />

            <div className="text-sm text-gray-500">
              By signing in, you agree to our Terms of Service and Privacy Policy.
            </div>
          </div>
        </div>

        {/* Features */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-center">
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl mb-2">📦</div>
            <h3 className="font-semibold text-gray-900 mb-1">Order Tracking</h3>
            <p className="text-sm text-gray-600">Monitor your jewelry orders in real-time</p>
          </div>
          <div className="bg-white/60 backdrop-blur-sm rounded-lg p-4">
            <div className="text-2xl mb-2">❤️</div>
            <h3 className="font-semibold text-gray-900 mb-1">Wishlist</h3>
            <p className="text-sm text-gray-600">Save your favorite pieces</p>
          </div>
        </div>
      </div>
    </div>
  )
}
