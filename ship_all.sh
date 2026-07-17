#!/usr/bin/env bash
# Ship all 10 saas10 apps to Vercel with Gumroad payments.
# Usage: ./ship_all.sh <VERCEL_TOKEN>
# One command: sets env vars + redeploys all 10 apps.
set -e
TOKEN="$1"
if [ -z "$TOKEN" ]; then echo "Usage: ./ship_all.sh <VERCEL_TOKEN>"; exit 1; fi

cd "C:/Users/ansy0/projects/saas10"
APPS=(invoiceflow linktrack chatwidget formcraft mailpulse snippetvault timetrack resumebuilder statuspage pdfshift)

# 1) deploy Gumroad env vars
echo "=== Deploying env vars ==="
./deploy_gumroad_env.sh "$TOKEN" || true

# 2) redeploy each app
for app in "${APPS[@]}"; do
  echo "=== Deploying $app ==="
  ( cd "apps/$app" && vercel --prod -t "$TOKEN" --yes ) || echo "WARN: $app deploy failed"
done

echo "=== ALL DONE ==="
echo "Check each: https://<app>-ansy0.vercel.app"
