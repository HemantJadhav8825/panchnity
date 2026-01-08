/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  experimental: {
    optimizePackageImports: [
      "lucide-react",
      "@react-three/fiber",
      "@react-three/drei",
    ],
  },
};

// Dynamically add backend image domain if API URL is available
if (process.env.NEXT_PUBLIC_API_URL) {
  try {
    const url = new URL(process.env.NEXT_PUBLIC_API_URL);

    nextConfig.images.remotePatterns.push({
      protocol: url.protocol.replace(":", ""),
      hostname: url.hostname,
      port: url.port || undefined,
      pathname: "/uploads/**",
    });
  } catch (error) {
    console.warn(
      "Could not parse NEXT_PUBLIC_API_URL for image domains:",
      error.message
    );
    // Continue without image domain configuration
  }
} else {
  console.warn(
    "NEXT_PUBLIC_API_URL not set - image domains will not be configured"
  );
}
module.exports = nextConfig;
