/** @type {import('next').NextConfig} */
const nextConfig = {
  // Keep TypeScript ignoring build errors
  typescript: {
    ignoreBuildErrors: true,
  },

  // Image configuration
  images: {
    unoptimized: false, // set to false so Next.js optimizes images
    remotePatterns: [
      {
        protocol: "https",
        hostname: "image2url.com",
        port: "", // leave empty
        pathname: "/r2/default/images/**", // allow all images in that path
      },
    ],
  },
}

export default nextConfig
