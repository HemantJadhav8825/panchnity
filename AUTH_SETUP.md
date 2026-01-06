# Google Authentication Setup Guide

## Overview
This application uses NextAuth.js (Auth.js) v5 with Google OAuth provider for authentication.

## Installation

```bash
npm install next-auth @auth/prisma-adapter prisma @prisma/client
```

## Environment Variables Setup

Create a `.env.local` file in your project root with the following variables:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-super-secret-key-here-at-least-32-characters-long

# Google OAuth Credentials (Get these from Google Cloud Console)
GOOGLE_CLIENT_ID=your-google-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Quick Setup Commands

```bash
# 1. Create .env.local file
touch .env.local

# 2. Generate a secure secret
openssl rand -base64 32

# 3. Add these lines to .env.local (replace with your actual values):
echo "NEXTAUTH_URL=http://localhost:3000" > .env.local
echo "NEXTAUTH_SECRET=$(openssl rand -base64 32)" >> .env.local
echo "GOOGLE_CLIENT_ID=your-google-client-id.googleusercontent.com" >> .env.local
echo "GOOGLE_CLIENT_SECRET=your-google-client-secret" >> .env.local
```

### Quick Setup Template:

Create `.env.local` with this content:

```env
# NextAuth.js Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=replace-with-generated-secret

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-client-id-from-google-console
GOOGLE_CLIENT_SECRET=your-client-secret-from-google-console

# Site Configuration
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

### Generate NEXTAUTH_SECRET

You can generate a secure secret using one of these methods:

**Option 1: Using Node.js**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Option 2: Using OpenSSL**
```bash
openssl rand -base64 32
```

**Option 3: Using online generator**
Visit: https://generate-secret.vercel.app/32

## Google OAuth Setup

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the Google+ API
4. Go to "Credentials" in the left sidebar
5. Click "Create Credentials" → "OAuth 2.0 Client IDs"
6. Configure OAuth consent screen if prompted
7. Set Application type to "Web application"
8. Add authorized redirect URIs:
   - For development (localhost): `http://localhost:3000/api/auth/callback/google`
   - For production: `https://yourdomain.com/api/auth/callback/google`

   **Important:** Use `http://` (not `https://`) for localhost. Google OAuth requires exact URL matches.

## Testing on Localhost

### Start the Development Server
```bash
npm run dev
# Server will start on http://localhost:3000
```

### Test Authentication Flow
1. Visit `http://localhost:3000`
2. Click the "Sign In" button in the navbar
3. You'll be redirected to Google's OAuth page
4. After authentication, you'll be redirected back to your dashboard

### Troubleshooting Localhost Issues

**"Invalid Client" Error:**
- Double-check your Google Client ID and Secret
- Ensure you're using the correct redirect URI in Google Cloud Console

**"Redirect URI Mismatch" Error:**
- Verify the redirect URI in Google Cloud Console matches exactly: `http://localhost:3000/api/auth/callback/google`
- Make sure you're using `http://` not `https://` for localhost

**Session Not Working:**
- Check that `NEXTAUTH_URL` is set to `http://localhost:3000`
- Ensure `NEXTAUTH_SECRET` is set (at least 32 characters)

**Environment Variables Not Loading:**
- Make sure your `.env.local` file is in the project root
- Restart the development server after adding environment variables
- Check that variable names don't have spaces or quotes
9. Copy the Client ID and Client Secret to your `.env.local` file

## File Structure

```
app/
├── api/auth/[...nextauth]/
│   └── route.ts              # NextAuth API route
├── auth/
│   ├── signin/
│   │   └── page.tsx          # Sign-in page
│   └── error/
│       └── page.tsx          # Error page
├── dashboard/
│   └── page.tsx              # Protected dashboard
└── layout.tsx                # Root layout with SessionProvider

components/
├── providers.tsx             # SessionProvider wrapper
└── SignInButton.tsx          # Authentication UI component

lib/
└── auth.ts                   # NextAuth configuration
```

## Key Components

### 1. Authentication Configuration (`lib/auth.ts`)
- Google OAuth provider setup
- Session and JWT callbacks
- Custom pages configuration

### 2. API Route (`app/api/auth/[...nextauth]/route.ts`)
- NextAuth handler for GET and POST requests
- Uses configuration from `lib/auth.ts`

### 3. Session Provider (`components/providers.tsx`)
- Wraps the app with NextAuth SessionProvider
- Enables `useSession` hook throughout the app

### 4. Sign-In Button (`components/SignInButton.tsx`)
- Handles sign-in/sign-out logic
- Shows user profile dropdown when authenticated
- Responsive design for mobile and desktop

### 5. Protected Routes
- Dashboard page requires authentication
- Uses `getServerSession` for server-side protection
- Redirects to sign-in page if not authenticated

## Usage Examples

### Server Component (Check Authentication)
```tsx
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export default async function ProtectedPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/auth/signin')
  }

  return <div>Welcome {session.user?.name}!</div>
}
```

### Client Component (UI State)
```tsx
'use client'

import { useSession } from "next-auth/react"

export default function Profile() {
  const { data: session, status } = useSession()

  if (status === 'loading') return <div>Loading...</div>
  if (!session) return <div>Please sign in</div>

  return <div>Hello {session.user?.name}!</div>
}
```

## Security Notes

- Never commit `.env.local` or any files containing secrets
- Use strong, randomly generated secrets for `NEXTAUTH_SECRET`
- Configure proper redirect URIs in Google Cloud Console
- Regularly rotate OAuth credentials

## Troubleshooting

### Common Issues:

1. **"Invalid Client" Error**: Check Google Client ID and Secret
2. **"Redirect URI Mismatch"**: Ensure authorized redirect URIs match your domain
3. **Session Not Persisting**: Check `NEXTAUTH_URL` configuration
4. **CORS Issues**: Ensure proper origin configuration

### Debug Mode:
Add to your `.env.local`:
```env
NEXTAUTH_DEBUG=true
```

## Diagnosing OAuthSignin Errors

### What You're Seeing:
The logs show `OAuthSignin` error with progressively URL-encoded callbackUrl, indicating a redirect loop. This typically means there's a configuration mismatch.

### Most Common Causes:

1. **Missing Google OAuth Credentials**
   - `GOOGLE_CLIENT_ID` or `GOOGLE_CLIENT_SECRET` not set
   - Credentials are incorrect or expired

2. **Redirect URI Mismatch**
   - Google Cloud Console redirect URI doesn't match your app URL
   - Using `https://` instead of `http://` for localhost

3. **NEXTAUTH_URL Configuration**
   - `NEXTAUTH_URL` not set to `http://localhost:3000`
   - Server restarted without environment variables loaded

### Quick Fix Steps:

#### 1. Check Your .env.local File
```bash
# Ensure these are set correctly
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=your-32-character-secret
GOOGLE_CLIENT_ID=your-client-id.googleusercontent.com
GOOGLE_CLIENT_SECRET=your-client-secret
```

#### 2. Verify Google Cloud Console Setup
- **Authorized redirect URIs**: `http://localhost:3000/api/auth/callback/google`
- **JavaScript origins**: `http://localhost:3000`
- **OAuth consent screen**: Must be configured

#### 3. Test Commands
```bash
# Check if NextAuth providers are configured
curl http://localhost:3000/api/auth/providers

# Check environment variables are loaded (won't show secrets)
curl http://localhost:3000/api/auth/signin/google
```

#### 4. Restart Development Server
```bash
# Stop the server (Ctrl+C) and restart
npm run dev
```

### Error Code Reference:
- **OAuthSignin**: Configuration issue (most common)
- **OAuthCallback**: Error processing OAuth response
- **OAuthCreateAccount**: Database/user creation error
- **OAuthAccountNotLinked**: Account linking issue

### If Still Having Issues:
1. Delete your `.env.local` and recreate it
2. Double-check Google Cloud Console settings
3. **Try a different browser or incognito mode** (disables extensions)
4. Check browser developer tools network tab for failed requests
5. **Disable Chrome extensions temporarily** to isolate the issue

### Chrome Extension Conflicts:
If you see errors like `chrome-extension://invalid/ net::ERR_FAILED`, this is a browser extension issue, not your app:

#### Quick Fix:
1. Open Chrome in **Incognito Mode** (`Ctrl+Shift+N`)
2. Test authentication - if it works, an extension is causing conflicts
3. Disable extensions one by one to identify the problematic one

#### Common Problematic Extensions:
- Ad blockers (uBlock Origin, AdBlock Plus)
- Privacy extensions (Privacy Badger, HTTPS Everywhere)
- Developer tools extensions
- VPN extensions

#### Extension Troubleshooting:
```bash
# Test in incognito mode first
# If authentication works in incognito, disable extensions:
chrome://extensions/
# Or use chrome://settings/content/siteData to clear extension data
```

## Production Deployment

1. Update `NEXTAUTH_URL` to your production domain
2. Update Google OAuth authorized redirect URIs
3. Ensure `NEXT_PUBLIC_SITE_URL` is set correctly
4. Use environment variables in your hosting platform
5. Consider using a database adapter for session storage in production
