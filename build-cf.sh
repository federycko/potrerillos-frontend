#!/bin/bash
echo "🚀 Building Next.js static site for Cloudflare Pages..."

set -e
set -o pipefail

rm -rf .next out

npm ci

echo "👉 Using next.config.cf.ts"
export NEXT_CONFIG=next.config.cf.ts

NODE_OPTIONS="--trace-warnings" next build --verbose
