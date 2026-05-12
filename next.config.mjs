/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname: "209.74.72.116",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.adinoinvest.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "api.adinoinvest.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "api.adinoinvest.com",
        pathname: "/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "supportive-creativity-cd56af8fec.media.strapiapp.com",
        pathname: "/**",
      },
      {
        protocol: "https",
        hostname: "placehold.co",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
