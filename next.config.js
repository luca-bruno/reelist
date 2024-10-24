/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["image.tmdb.org"]
  },
  experimental: {
    esmExternals: false,
    scrollRestoration: true
  },
  async headers() {
    return [
      {
        source: "/api/:path*",
        headers: [
          {
            key: "Access-Control-Allow-Origin",
            value: "*" // Set your origin
          },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, PUT, DELETE, OPTIONS"
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization"
          }
        ]
      }
    ]
  }
  // ,
  // async rewrites() {
  //   return [
  //     {
  //       source: "/api/locale",
  //       destination: "https://ipapi.co/json/" // Proxy to the external API
  //     }
  //   ]
  // }
}

module.exports = nextConfig
