import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: "/servicos", destination: "/", permanent: true },
      { source: "/solucoes", destination: "/", permanent: true },
      { source: "/contato", destination: "/", permanent: true },
    ];
  },
};

export default nextConfig;
