#!/usr/bin/env bash
# Deploy Gumroad product URLs to all 10 Vercel apps as env vars.
# Usage: ./deploy_gumroad_env.sh <VERCEL_TOKEN>
set -e
TOKEN="$1"
APPS=(invoiceflow linktrack chatwidget formcraft mailpulse snippetvault timetrack resumebuilder statuspage pdfshift)
declare -A LINKS=(
  [invoiceflow]="https://gumroad.com/l/invoiceflow-pro"
  [linktrack]="https://gumroad.com/l/linktrack-pro"
  [chatwidget]="https://gumroad.com/l/chatwidget-pro"
  [formcraft]="https://gumroad.com/l/formcraft-pro"
  [mailpulse]="https://gumroad.com/l/mailpulse-pro"
  [snippetvault]="https://gumroad.com/l/snippetvault-pro"
  [timetrack]="https://gumroad.com/l/timetrack-pro"
  [resumebuilder]="https://gumroad.com/l/resumebuilder-pro"
  [statuspage]="https://gumroad.com/l/statuspage-pro"
  [pdfshift]="https://gumroad.com/l/pdfshift-pro"
)
for app in "${APPS[@]}"; do
  echo "=== $app ==="
  vercel env add GUMROAD_${app^^}_URL "${LINKS[$app]}" production -t "$TOKEN" -c "$app" 2>/dev/null || true
  vercel env add NEXT_PUBLIC_APP_URL "https://$app-ansy0.vercel.app" production -t "$TOKEN" -c "$app" 2>/dev/null || true
done
echo "GUMROAD ENV VARS DEPLOYED. Redeploy: vercel --prod -t $TOKEN -c <app>"
