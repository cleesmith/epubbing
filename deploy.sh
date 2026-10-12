#!/usr/bin/env bash
# Save this file in ~/epubbing and run ./deploy.sh to publish the local build.
set -euo pipefail

project_dir="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
site_dir="$(dirname "$project_dir")/epubbing-site"
build_dir="$project_dir/apps/proselenos-app/out"
commit_message="${1:-Update site}"
site_domain="everythingebooks.org"

cd "$project_dir"

if [ ! -f package.json ] || [ ! -f apps/proselenos-app/next.config.mjs ]; then
  echo "Put deploy.sh in the root of ~/epubbing." >&2
  exit 1
fi

if [ ! -e "$site_dir/.git" ]; then
  echo "Cannot find the Git repository at $site_dir." >&2
  exit 1
fi

if [ "$(git -C "$site_dir" branch --show-current)" != main ]; then
  echo "$site_dir must be on main before deploying." >&2
  exit 1
fi

# GitHub's Pages settings may have added a CNAME commit since the last deploy.
echo "Updating the local site repository ..."
git -C "$site_dir" pull --ff-only origin main

echo "Building for https://$site_domain/ ..."
EPUBBING_BASE_PATH='' pnpm build

# Check the export before replacing the published files.
if [ ! -s "$build_dir/index.html" ] || [ ! -s "$build_dir/library/index.html" ]; then
  echo "The build did not produce the expected HTML files. Deployment stopped." >&2
  exit 1
fi
if ! grep -q '"/_next/' "$build_dir/index.html" ||
   grep -q '/epubbing-site/_next/' "$build_dir/index.html"; then
  echo "The build must use /_next/ asset paths for $site_domain. Deployment stopped." >&2
  exit 1
fi

echo "Copying the build to $site_dir ..."
rsync -a --delete \
  --exclude='/.git' \
  --exclude='/CNAME' \
  --exclude='.DS_Store' \
  "$build_dir/" "$site_dir/"
touch "$site_dir/.nojekyll"
printf '%s\n' "$site_domain" > "$site_dir/CNAME"

cd "$site_dir"
git add -A
if git diff --cached --quiet; then
  echo "No new site changes to commit."
else
  git commit -m "$commit_message"
fi

# Still push if a previous run committed successfully but could not push.
git push origin main

echo "Pushed. GitHub Pages will publish the update at:"
echo "https://$site_domain/"
