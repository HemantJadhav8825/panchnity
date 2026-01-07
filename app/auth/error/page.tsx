// Force dynamic rendering for auth pages
export const dynamic = 'force-dynamic';

import Link from "next/link"
import { Metadata } from "next"


export const metadata: Metadata = {
  title: 'Authentication Error | PANCHANITY JEWELLERS',
  description: 'There was an error during authentication.',
}

export default function AuthErrorPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 via-white to-red-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-serif font-bold text-gold-400 mb-2">
            PANCHANITY JEWELLERS
          </h1>
          <p className="text-sm text-gold-600">KARIGAR</p>
        </div>

        {/* Error Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 text-center">
          <div className="text-6xl mb-4">⚠️</div>

          <h2 className="text-2xl font-serif font-bold text-gray-900 mb-4">
            Authentication Error
          </h2>

          <p className="text-gray-600 mb-8">
            There was an error during the sign-in process. This might be due to an expired link or configuration issue.
          </p>

          <div className="space-y-4">
            <Link
              href="/auth/signin"
              className="inline-block bg-gold-400 hover:bg-gold-500 text-white font-semibold px-6 py-3 rounded-lg transition-colors"
            >
              Try Again
            </Link>

            <div>
              <Link
                href="/"
                className="text-gold-600 hover:text-gold-700 font-medium"
              >
                Return to Home
              </Link>
            </div>
          </div>
        </div>

        {/* Help */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-600">
            Need help? Contact our support team at{' '}
            <a
              href="mailto:support@panchnityjewellers.com"
              className="text-gold-600 hover:text-gold-700"
            >
              support@panchnityjewellers.com
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
