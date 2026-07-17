#!/usr/bin/env bash
# Watch for a live Vercel token, then auto-ship all saas10 apps.
# Runs until it finds a real token (not [REDACTED]) or 30min timeout.
# Usage: ./watch_token.sh
TOKEN_FILE="C:/Users/ansy0/.hermes/vercel_token"
for i in $(seq 1 180); do
  if [ -f "$TOKEN_FILE" ]; then
    T=$(cat "$TOKEN_FILE" | tr -d '[]"REDACTED \n\r' | head -c 20)
    if [ ${#T} -gt 20 ]; then
      echo "LIVE TOKEN FOUND — shipping..."
      cd "C:/Users/ansy0/projects/saas10"
      ./ship_all.sh "$(cat $TOKEN_FILE | tr -d '[]"')"
      exit 0
    fi
  fi
  sleep 10
done
echo "TIMEOUT: no live token found in 30min."
