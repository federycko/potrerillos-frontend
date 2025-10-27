#!/bin/bash
echo "🚀 Building Next.js static site for Cloudflare Pages..."

# Clean previous builds
rm -rf .next out

# Install dependencies
npm ci

# Build the static export
# Since next.config.ts already has output: "export", we don't need next export
npm run build

# Output directory verification
if [ -d "out" ]; then
  echo "✅ Build ready in 'out' directory:"
  du -sh out
else
  echo "❌ Build failed: no 'out' directory found"
  exit 1
fi
