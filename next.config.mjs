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
  };
  
  export default nextConfig;