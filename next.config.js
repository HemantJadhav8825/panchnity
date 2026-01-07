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
try {
  const apiUrl =
    process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";
  const url = new URL(apiUrl);

  nextConfig.images.remotePatterns.push({
    protocol: url.protocol.replace(":", ""),
    hostname: url.hostname,
    port: url.port || undefined,
    pathname: "/uploads/**",
  });
} catch (error) {
  console.warn("Could not parse API URL for image domains:", error);
  // Fallback for localhost development
  nextConfig.images.remotePatterns.push({
    protocol: "http",
    hostname: "localhost",
    port: "5001",
    pathname: "/uploads/**",
  });
}
module.exports = nextConfig;
