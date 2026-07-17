#!/usr/bin/env bash
# One-shot launch for all 10 SaaS apps.
# 1) `npm i -g vercel`   2) `vercel login`   3) `bash launch.sh`
set -e
cd "$(dirname "$0")"

echo "== Installing Vercel CLI =="
npm i -g vercel >/dev/null 2>&1 || echo "vercel already installed"

APPS=(invoiceflow snippetvault linktrack formcraft mailpulse timetrack pdfshift statuspage chatwidget resumebuilder)

echo "== Linking & deploying each app =="
for app in "${APPS[@]}"; do
  echo "### $app ###"
  (
    cd "apps/$app"
    # Create a vercel project (non-interactive) and deploy to prod.
    vercel link --yes >/dev/null 2>&1 || true
    vercel --prod --yes
  )
done

echo ""
echo "DONE. Now in Vercel dashboard for EACH app set env vars:"
echo "  NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY, DATABASE_URL,"
echo "  NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY, STRIPE_SECRET_KEY, STRIPE_WEBHOOK_SECRET"
echo "And put real Stripe Price IDs into shared/plans.ts then redeploy."
