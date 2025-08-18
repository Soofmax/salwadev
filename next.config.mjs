// Fichier : next.config.mjs

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Configuration de base (conservée de votre version)
  eslint: {
    ignoreDuringBuilds: true,
  },
  poweredByHeader: false,
  reactStrictMode: true,

  // Configuration des images pour éviter les erreurs d'optimisation
  images: {
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },

  // Configuration TypeScript pour éviter les erreurs de build
  typescript: {
    ignoreBuildErrors: false,
  },

  // Configuration expérimentale pour l'optimisation
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
    serverComponentsExternalPackages: [],
  },

  // Configuration du compilateur
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production' ? {
      exclude: ['error', 'warn']
    } : false,
  },

  // Optimisation SWC
  swcMinify: true,

  // Configuration des headers pour le cache
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      {
        source: '/_next/image(.*)',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ]
  },

  // Configuration Webpack pour résoudre les problèmes d'optimisation
  webpack: (config, { buildId, dev, isServer, defaultLoaders, webpack }) => {
    // Résolution des modules pour éviter les erreurs
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    }

    // Optimisations pour la production
    if (!dev && !isServer) {
      config.optimization = {
        ...config.optimization,
        moduleIds: 'deterministic',
        splitChunks: {
          ...config.optimization.splitChunks,
          chunks: 'all',
          minSize: 20000,
          maxSize: 244000,
          cacheGroups: {
            ...config.optimization.splitChunks.cacheGroups,
            default: {
              minChunks: 2,
              priority: -20,
              reuseExistingChunk: true,
            },
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name: 'vendors',
              priority: -10,
              chunks: 'all',
              maxSize: 244000,
            },
            commons: {
              name: 'commons',
              chunks: 'all',
              minChunks: 2,
              priority: -5,
              reuseExistingChunk: true,
            },
          },
        },
      }
    }

    // Plugin pour limiter la taille des chunks
    if (!dev && !isServer) {
      config.plugins.push(
        new webpack.optimize.LimitChunkCountPlugin({
          maxChunks: 50,
        })
      )
    }

    return config
  },
}

export default nextConfig;

