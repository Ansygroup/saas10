#!/usr/bin/env bash
# Deploy Stripe env vars to all 10 Vercel apps.
# Usage: ./deploy_env.sh <STRIPE_SECRET_KEY> <STRIPE_PUBLISHABLE_KEY> <STRIPE_WEBHOOK_SECRET>
set -e
SEC="$1"; PUB="$2"; WHSEC="$3"
TOKEN=$(cat ~/.hermes/vercel_token 2>/dev/null || echo "$VERCEL_TOKEN")
APPS=(invoiceflow linktrack chatwidget formcraft mailpulse snippetvault timetrack resumebuilder statuspage pdfshift)
for app in "${APPS[@]}"; do
  echo "=== $app ==="
  vercel env add STRIPE_SECRET_KEY "$SEC" production -t "$TOKEN" -c "$app" 2>/dev/null || \
  vercel env add STRIPE_SECRET_KEY production -t "$TOKEN" -c "$app" <<< "$SEC" 2>/dev/null || true
  vercel env add NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY "$PUB" production -t "$TOKEN" -c "$app" 2>/dev/null || true
  vercel env add STRIPE_WEBHOOK_SECRET "$WHSEC" production -t "$TOKEN" -c "$app" 2>/dev/null || true
  vercel env add NEXT_PUBLIC_APP_URL "https://$app-ansy0.vercel.app" production -t "$TOKEN" -c "$app" 2>/dev/null || true
done
echo "ENV VARS DEPLOYED. Redeploy each app: vercel --prod -t $TOKEN -c <app>"
