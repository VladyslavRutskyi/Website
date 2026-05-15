/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Website', // Add this to match your repository name
  images: {
    unoptimized: true,
  },
  eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },
};

export default nextConfig;