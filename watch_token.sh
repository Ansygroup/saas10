#!/usr/bin/env bash
# Watch for a live, VALID Vercel token, then auto-ship all saas10 apps.
# Skips [REDACTED] and expired/invalid tokens (verified against Vercel API).
# Usage: ./watch_token.sh
TOKEN_FILE="C:/Users/ansy0/.hermes/vercel_token"
for i in $(seq 1 180); do
  if [ -f "$TOKEN_FILE" ]; then
    RAW=$(cat "$TOKEN_FILE" | tr -d '[]"')
    # skip placeholder
    if [ "$RAW" = "REDACTED" ] || [ -z "$RAW" ]; then
      sleep 10; continue
    fi
    # verify token is valid against Vercel API
    HTTP=$(curl -s -o /dev/null -w "%{http_code}" "https://api.vercel.com/v2/user" \
      -H "Authorization: Bearer $RAW" --max-time 15)
    if [ "$HTTP" = "200" ]; then
      echo "VALID TOKEN FOUND — shipping all 10 apps..."
      cd "C:/Users/ansy0/projects/saas10"
      ./ship_all.sh "$RAW"
      exit 0
    else
      echo "Token present but invalid (HTTP $HTTP) — waiting for a valid one..."
    fi
  fi
  sleep 10
done
echo "TIMEOUT: no valid Vercel token found in 30min."
