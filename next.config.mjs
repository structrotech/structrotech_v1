/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ["10.92.208.7"],
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
}

export default nextConfig
