#!/usr/bin/env node

/**
 * NextAuth.js OAuth Diagnostic Script
 * Run with: node debug-auth.js
 */

const fs = require('fs');
const path = require('path');

console.log('🔍 NextAuth.js OAuth Diagnostic Tool');
console.log('=====================================\n');

// Check for .env.local file
const envPath = path.join(process.cwd(), '.env.local');
if (!fs.existsSync(envPath)) {
  console.log('❌ .env.local file not found');
  console.log('   Create .env.local in your project root\n');
} else {
  console.log('✅ .env.local file exists');

  // Read and check environment variables
  const envContent = fs.readFileSync(envPath, 'utf8');
  const envLines = envContent.split('\n').filter(line => line.trim() && !line.startsWith('#'));

  const requiredVars = [
    'NEXTAUTH_URL',
    'NEXTAUTH_SECRET',
    'GOOGLE_CLIENT_ID',
    'GOOGLE_CLIENT_SECRET'
  ];

  console.log('\n📋 Environment Variables:');
  requiredVars.forEach(varName => {
    const line = envLines.find(line => line.startsWith(`${varName}=`));
    if (line) {
      const value = line.split('=')[1];
      if (value && value !== 'your-' + varName.toLowerCase().replace('_', '-')) {
        console.log(`   ✅ ${varName}: Set`);
      } else {
        console.log(`   ❌ ${varName}: Not set or using placeholder`);
      }
    } else {
      console.log(`   ❌ ${varName}: Missing`);
    }
  });
}

// Check for required files
console.log('\n📁 Required Files:');
const requiredFiles = [
  'app/api/auth/[...nextauth]/route.ts',
  'lib/auth.ts',
  'components/SignInButton.tsx',
  'app/auth/signin/page.tsx'
];

requiredFiles.forEach(filePath => {
  if (fs.existsSync(path.join(process.cwd(), filePath))) {
    console.log(`   ✅ ${filePath}`);
  } else {
    console.log(`   ❌ ${filePath} - Missing`);
  }
});

// Check package.json for next-auth
console.log('\n📦 Dependencies:');
const packagePath = path.join(process.cwd(), 'package.json');
if (fs.existsSync(packagePath)) {
  const packageJson = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  if (packageJson.dependencies && packageJson.dependencies['next-auth']) {
    console.log(`   ✅ next-auth: ${packageJson.dependencies['next-auth']}`);
  } else {
    console.log('   ❌ next-auth: Not installed');
  }
} else {
  console.log('   ❌ package.json: Not found');
}

console.log('\n🔗 Useful Links:');
console.log('   🌐 Google Cloud Console: https://console.cloud.google.com/');
console.log('   📖 NextAuth Docs: https://next-auth.js.org/');
console.log('   🔧 Generate Secret: openssl rand -base64 32');

console.log('\n💡 Quick Setup Commands:');
console.log('   1. npm install next-auth');
console.log('   2. Create .env.local with your credentials');
console.log('   3. Configure Google OAuth in Cloud Console');
console.log('   4. Restart development server');

console.log('\n🎯 Test URLs:');
console.log('   📊 Providers: http://localhost:3000/api/auth/providers');
console.log('   🔑 Sign In: http://localhost:3000/api/auth/signin/google');
console.log('   📈 Session: http://localhost:3000/api/auth/session');

console.log('\n✨ Happy debugging!');
