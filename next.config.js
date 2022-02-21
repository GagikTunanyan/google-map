/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    domains: [
      'maps.googleapis.com',
      '127.0.0.1',
      'lh3.googleusercontent.com',
      'st4.depositphotos.com'
    ]
  },
  async rewrites() {
    return [
      {
        source: '/restaurant/:placeId',
        destination: '/restaurant',
      },
      {
        source: '/',
        destination: '/'
      }
    ]
  },
}

module.exports = nextConfig
