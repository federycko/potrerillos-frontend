# Deploying to Cloudflare Pages

This document explains how to deploy the Next.js frontend to Cloudflare Pages.

## Build Optimization

To reduce the bundle size and comply with Cloudflare Pages' 25MB limit, we've implemented several optimizations:

1. **Static Export**: The application is built as a static site using `next export`
2. **Preact Replacement**: React is replaced with Preact to reduce bundle size
3. **Image Optimization**: Images are not optimized server-side but served statically
4. **Package Imports Optimization**: Only required parts of packages are imported

## Deployment Steps

### Method 1: Direct Cloudflare Pages Integration

1. Connect your GitHub repository to Cloudflare Pages
2. Set the build settings:
   - Build command: `./build-cf.sh`
   - Build output directory: `out`
3. Add environment variables:
   - `NEXT_PUBLIC_API_URL`: Your Strapi API URL
   - `NEXT_PUBLIC_STRAPI_URL`: Your Strapi URL (for image assets)

### Method 2: Manual Deployment

1. Build the application:
   ```bash
   ./build-cf.sh
   ```

2. Deploy using Wrangler:
   ```bash
   npx wrangler pages deploy out --project-name=your-project-name
   ```

## Environment Variables

Make sure to set these environment variables in your Cloudflare Pages project:

- `NEXT_PUBLIC_API_URL`: The URL to your Strapi API (e.g., `https://your-strapi-api.com/api`)
- `NEXT_PUBLIC_STRAPI_URL`: The base URL to your Strapi instance (e.g., `https://your-strapi-api.com`)

## Configuration Files

We've included several configuration files to optimize the deployment:

1. `public/_routes.json` - Defines which routes should be handled by Cloudflare Pages
2. `public/_headers` - Custom headers for security and performance
3. `public/_redirects` - Redirects for client-side routing

## Troubleshooting

### Bundle Size Issues

If you're still encountering bundle size issues:

1. Check for large dependencies:
   ```bash
   npm run build && du -sh .next/static/chunks/* | sort -hr
   ```

2. Analyze the bundle:
   ```bash
   npx @next/bundle-analyzer
   ```

### Build Failures

If the build fails:

1. Ensure all dependencies are properly installed:
   ```bash
   npm ci
   ```

2. Check that the build script has execute permissions:
   ```bash
   chmod +x build-cf.sh
   ```

## Additional Optimizations

For further size reduction, consider:

1. Code splitting: Use dynamic imports for heavy components
2. Image optimization: Use modern formats like WebP
3. Font optimization: Use system fonts or optimize custom fonts
4. Remove unused dependencies: Regularly audit dependencies with `npm ls`