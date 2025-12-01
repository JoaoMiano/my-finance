import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  reactCompiler: true,
  async rewrites() {
    return [
      {
        // reescreve qualquer rota para a proxy interna
        source: '/:path*',
        destination: '/proxy/:path*',
      },
    ]
  },
};

export default nextConfig;
