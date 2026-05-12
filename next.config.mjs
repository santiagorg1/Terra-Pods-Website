/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  output: "export",
  trailingSlash: true,
  images: {
    unoptimized: true,
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1920, 2400, 3000],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384, 512, 768, 1024],
  },
};

export default nextConfig;
