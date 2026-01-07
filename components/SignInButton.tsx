'use client'

import { signIn, signOut, useSession } from 'next-auth/react'
import { useState, useEffect } from 'react'
import Image from 'next/image'
import { LogOut, User } from 'lucide-react'

export default function SignInButton() {
  const [mounted, setMounted] = useState(false)
  const { data: session, status } = useSession()
  const [showDropdown, setShowDropdown] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Don't render anything during SSR to avoid context issues
  if (!mounted) {
    return (
      <div className="flex items-center justify-center gap-2 px-4 py-2">
        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
      </div>
    )
  }

  if (status === 'loading') {
    return (
      <div className="flex items-center gap-2 px-4 py-2">
        <div className="w-5 h-5 bg-gray-200 rounded-full animate-pulse"></div>
        <div className="w-16 h-4 bg-gray-200 rounded animate-pulse hidden sm:block"></div>
      </div>
    )
  }

  if (session) {
    return (
      <div className="relative">
        <button
          onClick={() => setShowDropdown(!showDropdown)}
          className="flex items-center gap-2 p-1 rounded-full hover:bg-gray-100 transition-all duration-200 ring-offset-2 focus:ring-2 focus:ring-gold-300"
          aria-label="User menu"
        >
          {session.user?.image ? (
            <Image
              src={session.user.image}
              alt={session.user.name || 'User'}
              width={32}
              height={32}
              className="rounded-full border-2 border-white shadow-sm"
            />
          ) : (
            <div className="w-8 h-8 bg-gradient-to-br from-gold-400 to-gold-600 rounded-full flex items-center justify-center shadow-sm">
              <User className="w-4 h-4 text-white" />
            </div>
          )}
        </button>

        {showDropdown && (
          <>
            {/* Overlay to close dropdown */}
            <div
              className="fixed inset-0 z-10"
              onClick={() => setShowDropdown(false)}
            />

            {/* Dropdown menu */}
            <div className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-xl border border-gray-200 z-20 overflow-hidden">
              <div className="px-4 py-3 bg-gray-50 border-b border-gray-200">
                <p className="text-sm font-semibold text-gray-900 truncate">
                  {session.user?.name}
                </p>
                <p className="text-xs text-gray-600 truncate mt-0.5">
                  {session.user?.email}
                </p>
              </div>

              <button
                onClick={() => {
                  signOut()
                  setShowDropdown(false)
                }}
                className="w-full flex items-center gap-3 px-4 py-3 text-sm text-gray-700 hover:bg-red-50 hover:text-red-700 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="font-medium">Sign Out</span>
              </button>
            </div>
          </>
        )}
      </div>
    )
  }

  return (
    <button
      onClick={() => signIn('google')}
      className="flex items-center justify-center gap-2 sm:gap-3 bg-white border border-gray-300 text-gray-700 px-3 sm:px-4 py-2.5 rounded-lg hover:bg-gray-50 hover:border-gray-400 hover:shadow-md transition-all duration-200 font-medium min-w-[100px] sm:min-w-[120px]"
      aria-label="Sign in with Google"
    >
      <svg className="w-4 h-4 sm:w-5 sm:h-5 flex-shrink-0" viewBox="0 0 24 24" aria-hidden="true">
        <path
          fill="#4285F4"
          d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        />
        <path
          fill="#34A853"
          d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        />
        <path
          fill="#FBBC05"
          d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        />
        <path
          fill="#EA4335"
          d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        />
      </svg>
      <span className="hidden sm:inline text-sm">Sign in</span>
      <span className="sm:hidden text-sm">Google</span>
    </button>
  )
}
