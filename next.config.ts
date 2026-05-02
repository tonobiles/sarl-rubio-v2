import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/actualites/', destination: '/', permanent: true },
      { source: '/installation-remplacement/realisations/', destination: '/realisations', permanent: true },
      { source: '/ils-nous-font-confiance/', destination: '/equipe', permanent: true },
      { source: '/nos-collaborateurs/', destination: '/equipe', permanent: true },
      { source: '/plomberie/', destination: '/plomberie', permanent: true },
      { source: '/sanitaires/', destination: '/plomberie', permanent: true },
      { source: '/chaudieres/', destination: '/chauffage', permanent: true },
      { source: '/pompes-a-chaleur/', destination: '/chauffage', permanent: true },
      { source: '/vmc/', destination: '/climatisation', permanent: true },
      { source: '/climatisation/', destination: '/climatisation', permanent: true },
      { source: '/depannage/', destination: '/depannage', permanent: true },
      { source: '/entretien/', destination: '/depannage', permanent: true },
      { source: '/renovation-installation-travaux/', destination: '/', permanent: true },
      { source: '/mentions-legales/', destination: '/mentions-legales', permanent: true },
      // Support for URLs without trailing slash as well
      { source: '/actualites', destination: '/', permanent: true },
      { source: '/plomberie', destination: '/plomberie', permanent: false }, // Avoid self-loop if trailing slash is handled by Next.js
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'logo.clearbit.com',
      },
    ],
  },
};

export default nextConfig;
