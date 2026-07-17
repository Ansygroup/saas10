#!/usr/bin/env bash
# Deploy all 10 apps to Vercel. Requires VERCEL_TOKEN in env.
set -e
TOKEN="${VERCEL_TOKEN:?set VERCEL_TOKEN}"
TEAM="team_jsDd0T7iHZ26E6GhomgOxE4T"
ROOT="C:/Users/ansy0/projects/saas10"
APPS=(invoiceflow snippetvault linktrack formcraft mailpulse timetrack pdfshift statuspage chatwidget resumebuilder)
PKGS=(@saas10/invoiceflow @saas10/snippetvault @saas10/linktrack @saas10/formcraft @saas10/mailpulse @saas10/timetrack @saas10/pdfshift @saas10/statuspage @saas10/chatwidget @saas10/resumebuilder)

api() { curl -s -H "Authorization: Bearer $TOKEN" "$@"; }

for i in "${!APPS[@]}"; do
  app="${APPS[$i]}"; pkg="${PKGS[$i]}"
  echo "=== $app ==="
  # create project if missing
  pid=$(api "https://api.vercel.com/v9/projects?teamId=$TEAM" | python -c "import sys,json;d=json.load(sys.stdin);print([p['id'] for p in d['projects'] if p['name']=='$app'][0])" 2>/dev/null || echo "")
  if [ -z "$pid" ]; then
    pid=$(api -X POST -H "Content-Type: application/json" "https://api.vercel.com/v9/projects?teamId=$TEAM" -d "{\"name\":\"$app\",\"framework\":\"nextjs\"}" | python -c "import sys,json;print(json.load(sys.stdin)['id'])")
    echo "  created $pid"
  fi
  # set root dir + build settings
  api -X PATCH -H "Content-Type: application/json" "https://api.vercel.com/v9/projects/$pid?teamId=$TEAM" \
    -d "{\"rootDirectory\":\"apps/$app\",\"framework\":\"nextjs\",\"buildCommand\":\"cd ../.. && pnpm install && pnpm --filter $pkg build\",\"outputDirectory\":\".next\",\"installCommand\":\"cd ../.. && pnpm install\"}" >/dev/null
  echo "  configured root=apps/$app"
  # deploy from monorepo root
  ( cd "$ROOT" && vercel --prod --yes --token="$TOKEN" --project "$app" --cwd="$ROOT" 2>&1 | grep -E "Production|Ready|Error" | head -3 )
done
echo "ALL DONE"
