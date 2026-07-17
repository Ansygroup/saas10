---
name: zcode-saas10-bridge
description: Bridge between ZCode (local agent at C:/Users/ansy0/.zcode) and the saas10 project (C:/Users/ansy0/projects/saas10). Lets ZCode run/deploy/track the 10 SaaS MVPs. Use when the user wants ZCode to operate on saas10 without leaving the ZCode UI.
---

# ZCode ↔ saas10 Bridge

ZCode = local agent desktop app. saas10 = 10 Next.js SaaS MVPs. This skill
lets ZCode drive saas10 via shell commands (ZCode has `exec`/`run` tools in
`cli/exec`).

## From ZCode, run these (exec tool)
```bash
cd C:/Users/ansy0/projects/saas10

# Build one app
pnpm --filter invoiceflow build

# Track Gumroad sales (Composio ca_ru-ZbwXlFsGQ)
python track_sales.py

# Print marketing copy
python auto_marketing.py --app invoiceflow --platform x

# Deploy all (needs Vercel token)
./ship_all.sh "$VERCEL_TOKEN"
```

## ZCode providers (v2/config.json)
- GLM-5.2 / GLM-5-Turbo (z.ai, bigmodel) — disabled (no OAuth)
- openrouter: tencent/hy3:free — enabled (apiKey redacted in file)
- nvidia: z-ai/glm-5.2 — enabled (apiKey present)

## ZCode skills available (40+)
- `deploy-to-vercel` (REAL, 296 lines) — use for Vercel deploys
- `saas10-deploy` (companion) — monorepo helper
- `saas10-marketing` — zero-budget growth
- `higgsfield-*` — video gen
- `faceless-explainer` — video pipeline
- `figma` — design import

## Bot state
- `v2/bot-state.v2.json` starts `{"bots":{}}` — bots created at runtime
- Don't edit `credentials.json` (MCP OAuth, REDACTED)

## Workflow
1. User asks ZCode to "deploy saas10" or "check saas10 sales"
2. ZCode runs the matching shell command above via exec
3. ZCode reports back in its UI

This makes ZCode the "shared language" — Hermes does the builds, ZCode is
the operator UI. See `zcode-collab`, `zcode-dev` skills (Hermes).
