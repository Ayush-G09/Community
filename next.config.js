/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["www.pngall.com", "img.freepik.com", "i.pinimg.com", "encrypted-tbn0.gstatic.com", "codersera.com", "wallpaperaccess.com", "logos-world.net"],
  },
}

module.exports = nextConfig
