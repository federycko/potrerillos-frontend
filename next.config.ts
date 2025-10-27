import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /**
   * Enable static exports for the App Router.
   *
   * @see https://nextjs.org/docs/app/building-your-application/deploying/static-exports
   */
  output: "export",

  /**
   * Set base path. This is usually the slug of your repository.
   *
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/basePath
   */
  // basePath: "/cms-diquepotrerillos",

  /**
   * Disable server-based image optimization. Using { unoptimized: true } in
   * the image component export options will still work.
   *
   * @see https://nextjs.org/docs/app/api-reference/components/image#unoptimized
   *
   * If you want to use image optimization, you can remove this option.
   */
  images: {
    unoptimized: true,
  },
  
  /**
   * Enable standalone build mode to reduce bundle size
   * @see https://nextjs.org/docs/app/api-reference/next-config-js/output
   */
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

export default nextConfig;