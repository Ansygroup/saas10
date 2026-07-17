#!/usr/bin/env bash
# Deploy all 10 SaaS apps to Vercel.
# Prereqs: `npm i -g vercel`, run `vercel login` once.
# For each app, set env vars in Vercel dashboard (or via `vercel env add`).
set -e
ROOT="$(cd "$(dirname "$0")/apps" && pwd)"
APPS=(invoiceflow snippetvault linktrack formcraft mailpulse timetrack pdfshift statuspage chatwidget resumebuilder)

for app in "${APPS[@]}"; do
  echo "=== Deploying $app ==="
  ( cd "$ROOT/$app" && vercel --prod --yes )
done
echo "ALL DEPLOYED. Configure env vars + Stripe Price IDs + Supabase per app."
