/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    // Next's ESLint patching can break with newer eslint toolchains on Windows.
    // Keep builds unblocked; run `npm run lint` separately in CI if desired.
    ignoreDuringBuilds: true
  },
  typescript: {
    // Ignore TypeScript errors during build (optional, for faster deployments)
    // Set to false if you want to enforce type checking
    ignoreBuildErrors: false
  },
  experimental: {
    optimizePackageImports: ["lucide-react"]
  },
  // Optimize images
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'flagcdn.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'play.google.com',
        pathname: '/**',
      }
    ],
  },
  // Output configuration for Vercel
  output: 'standalone',
};

export default nextConfig;


