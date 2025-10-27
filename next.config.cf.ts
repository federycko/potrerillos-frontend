import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Enable static exports for Cloudflare Pages.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Disable server-based image optimization. Using { unoptimized: true } in
   * the image component export options will still work.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   */
  images: {
    unoptimized: true,
  },
  
  /**
   * Optimize bundle size for Cloudflare Pages
   */
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
  
  /**
   * Reduce bundle size by removing unused locales and optimizing webpack
   */
  webpack: (config, { dev, isServer }) => {
    // Replace React with Preact in production to reduce bundle size
    if (!dev && !isServer) {
      Object.assign(config.resolve.alias, {
        'react/jsx-runtime': 'preact/jsx-runtime',
        'react': 'preact/compat',
        'react-dom/test-utils': 'preact/test-utils',
        'react-dom': 'preact/compat',
      });
    }
    
    return config;
  },
  
  /**
   * Optimize fonts for static export
   */
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;