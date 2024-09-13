/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      domains: []
    },
    async redirects() {
      return [
        {
          source: "/",
          destination: "/lobby",
          permanent: true
        }
      ]
    }
  }
  
  module.exports = nextConfig