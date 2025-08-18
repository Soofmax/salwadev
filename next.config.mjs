// Fichier : next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // La ligne `output: 'export'` a été supprimée pour activer le mode serveur.
  // La ligne `trailingSlash: true` a été supprimée (le serveur gère les URL).
  // La section `images: { unoptimized: true }` a été supprimée pour permettre l'optimisation des images par Next.js.

  eslint: {
    ignoreDuringBuilds: true,
  },

  poweredByHeader: false,
  reactStrictMode: true,
};

export default nextConfig;
