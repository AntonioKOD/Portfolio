/** @type {import('next').NextConfig} */
const nextConfig = {
    trailingSlash: true,
    images: {
      remotePatterns: [
        {
          protocol: 'https',
          hostname: 'i.imgur.com',
          pathname: '/**',
        },
        {
          protocol: 'https',
          hostname: 'imgur.com',
          pathname: '/**',
        },
      ],
    },
    experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons', 'framer-motion'],
    serverActions: {
      bodySizeLimit: '2mb',
    },
    metadataBase: 'https://www.codewithtoni.com'
  },
  // Enable static optimization where possible
  reactStrictMode: true,
  poweredByHeader: false,
  compress: true,
  };
  
  export default nextConfig;