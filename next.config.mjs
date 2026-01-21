/** @type {import('next').NextConfig} */
const getHostnameFromEnv = (envVar) =>
  envVar?.replace(/^https?:\/\//, "").replace(/\/$/, "")

const SUPABASE_HOST =
  getHostnameFromEnv(process.env.NEXT_PUBLIC_SUPABASE_URL) ||
  getHostnameFromEnv(process.env.SUPABASE_URL) ||
  "nlfqlsozjtvsnqwoflfl.supabase.co"

const nextConfig = {
  // Keep TypeScript ignoring build errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image configuration
  images: {
    // Recommended: false so Next.js optimizes remote images.
    // If you want a quick temporary bypass, set this to true.
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image2url.com",
        port: "",
        pathname: "/r2/default/images/**",
      },
      {
        protocol: "https",
        // allow your Supabase storage host so next/image can load those URLs
        hostname: SUPABASE_HOST,
        port: "",
        // Supabase public storage paths typically live under /storage/v1/object/public/...
        pathname: "/storage/v1/**",
      },
    ],
  },
}

export default nextConfig
