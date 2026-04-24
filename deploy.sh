#!/bin/bash
set -e

# Build the site
hugo

# Copy built output to a temp location
TMP=$(mktemp -d)
cp -r public/. "$TMP/"

# Switch to gh-pages, overwrite with fresh build, push
git checkout gh-pages
cp -r "$TMP/." .
git add .
git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
git push origin gh-pages

# Return to main
git checkout main

rm -rf "$TMP"
echo "Done. Live at www.shiyankoh.com in ~60 seconds."
