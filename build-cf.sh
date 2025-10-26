#!/bin/bash

# Build script for Cloudflare Pages deployment
echo "Building Next.js application for Cloudflare Pages..."

# Clean previous builds
echo "Cleaning previous builds..."
rm -rf .next out

# Install dependencies
echo "Installing dependencies..."
npm ci

# Build with Cloudflare-optimized config
echo "Building application..."
NEXT_CONFIG_OUTPUT=export npx next build

# Check if build was successful
if [ $? -eq 0 ]; then
    echo "Build completed successfully!"
    
    # Create _worker.js file for Cloudflare Pages
    echo "Creating _worker.js file..."
    cat > out/_worker.js << 'EOF'
export default {
  async fetch(request, env) {
    const url = new URL(request.url);
    const pathname = url.pathname;
    
    // Serve static assets
    if (pathname.startsWith('/_next/') || 
        pathname.startsWith('/images/') || 
        pathname.startsWith('/favicon.ico') ||
        pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|ico|webp)$/)) {
      return env.ASSETS.fetch(request);
    }
    
    // For all other routes, serve the index.html file
    // This enables client-side routing to work properly
    url.pathname = '/index.html';
    return env.ASSETS.fetch(url.toString());
  }
};
EOF
    
    # Show build output size
    if [ -d "out" ]; then
        echo "Build output size:"
        du -sh out
        echo "Largest files in build:"
        find out -type f -exec du -h {} + | sort -rh | head -10
    fi
    
    echo "Build ready for Cloudflare Pages deployment in the 'out' directory"
else
    echo "Build failed!"
    exit 1
fi