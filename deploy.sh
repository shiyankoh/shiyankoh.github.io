#!/bin/bash
set -e

# Ensure we're on main and commit any source changes before deploying.
# Without this, new files in content/ (like a new blog post) get carried
# across to gh-pages by `git checkout` and end up tracked only there.
git checkout main
git add content/ static/ layouts/ archetypes/ config.toml hugo.toml 2>/dev/null || true
if ! git diff --cached --quiet; then
  git commit -m "Post: $(date '+%Y-%m-%d %H:%M')"
  git push origin main
fi

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
