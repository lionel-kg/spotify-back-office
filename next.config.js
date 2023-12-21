/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['res.cloudinary.com', 'i.pinimg.com'],
  },
  env: {
    API_BASE_URL: 'http://localhost:4001',
  },
};

module.exports = nextConfig;
