#!/bin/bash
set -euo pipefail

MAIN_BRANCH=main

# Always return to main, even if something below fails partway through.
# (Historically `set -e` + a mid-script failure could strand you on gh-pages.)
cleanup() { git checkout "$MAIN_BRANCH" >/dev/null 2>&1 || true; }
trap cleanup EXIT

git checkout "$MAIN_BRANCH"

# GUARD: never deploy with uncommitted source on main.
# This script does NOT auto-commit source anymore. In the past the silent
# auto-commit sometimes no-op'd, so the post ended up only on gh-pages and
# main desynced. Commit (and push) your post to main FIRST, then deploy.
if ! git diff --quiet || ! git diff --cached --quiet; then
  echo "ERROR: main has uncommitted changes. Commit your source to main first, then re-run deploy." >&2
  git status --short >&2
  exit 1
fi

UNTRACKED=$(git ls-files --others --exclude-standard content/ static/ layouts/ archetypes/ config.toml hugo.toml 2>/dev/null || true)
if [ -n "$UNTRACKED" ]; then
  echo "ERROR: untracked source files present. Add + commit them to main first:" >&2
  echo "$UNTRACKED" >&2
  exit 1
fi

# Warn (don't block) if the committed main isn't pushed to origin yet.
if [ -n "$(git log origin/$MAIN_BRANCH..$MAIN_BRANCH --oneline 2>/dev/null)" ]; then
  echo "WARNING: main has commits not pushed to origin. Run 'git push origin main' so source stays backed up." >&2
fi

# Build the site fresh.
hugo --cleanDestinationDir

# Copy built output to a temp location.
TMP=$(mktemp -d)
cp -r public/. "$TMP/"

# Switch to gh-pages, overwrite with the fresh build, push (skip cleanly if unchanged).
git checkout gh-pages
cp -r "$TMP/." .

# SAFETY: never publish local tooling artifacts or a nested build dir to the
# public gh-pages branch. Without this, `git add -A` below sweeps in whatever
# untracked files happen to sit in the working tree — e.g. a .gstack/ folder
# with a daemon token, or a duplicate public/ build dir. (.gitignore on
# gh-pages covers these too; this is belt-and-suspenders.)
rm -rf .gstack public
find . -name '.DS_Store' -delete 2>/dev/null || true

git add -A
if git diff --cached --quiet; then
  echo "No changes to deploy — gh-pages already up to date."
else
  git commit -m "Deploy: $(date '+%Y-%m-%d %H:%M')"
  git push origin gh-pages
fi

rm -rf "$TMP"
git checkout "$MAIN_BRANCH"   # trap also does this; explicit for clarity
echo "Done. Live at www.shiyankoh.com in ~60 seconds."
