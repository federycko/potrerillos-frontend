


/** @type {import('next').NextConfig} */
const nextConfig = {
  // ❌ Removido output: 'export' para permitir renderizado dinámico
  
  // Configuración de imágenes para Strapi
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'http',
        hostname: 'strapi', // Nombre del servicio Docker
        port: '1337',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'entrance-everyday-cooperative-islands.trycloudflare.com',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'diquepotrerillos.com.ar', // Cambia por tu dominio real
        pathname: '/uploads/**',
      },
    ],
  },

  // Variables de entorno públicas
  env: {
    NEXT_PUBLIC_STRAPI_URL: process.env.NEXT_PUBLIC_STRAPI_URL || 'http://localhost:1337',
  },

  // Configuración de producción
  reactStrictMode: true,
  
  // Optimizaciones
  poweredByHeader: false,
  
  // Compresión
  compress: true,

  // Configuración de rewrites si necesitas proxy a Strapi
  async rewrites() {
    return [
      {
        source: '/api/strapi/:path*',
        destination: `${process.env.NEXT_PUBLIC_STRAPI_URL}/api/:path*`,
      },
    ]
  },
}

module.exports = nextConfig