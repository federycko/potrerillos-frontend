#!/bin/bash
echo "🚀 Building Next.js static site for Cloudflare Pages..."

rm -rf .next out

npm ci

export NEXT_CONFIG_OUTPUT=export

npx next build  # ← FIX IMPORTANTE

if [ -d "out" ]; then
  echo "✅ Build ready in 'out' directory:"
  du -sh out
else
  echo "❌ Build failed: no 'out' directory found"
  exit 1
fi
