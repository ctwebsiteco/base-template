#!/bin/bash
# Import seed data into Sanity. Run from project root:
#   ./seed/import.sh
#
# Requires:
#   - NEXT_PUBLIC_SANITY_PROJECT_ID set in .env.local
#   - Sanity CLI authenticated (`npx sanity login`)

set -e

DATASET="${NEXT_PUBLIC_SANITY_DATASET:-production}"
PROJECT="${NEXT_PUBLIC_SANITY_PROJECT_ID:-}"

if [ -z "$PROJECT" ]; then
  echo "Error: NEXT_PUBLIC_SANITY_PROJECT_ID is not set in .env.local"
  exit 1
fi

echo "Importing seed data into Sanity project '$PROJECT' dataset '$DATASET'..."
sanity datasets import ./seed/seed.ndjson "$DATASET" --create-or-replace
echo "Done."
