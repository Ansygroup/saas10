# saas10 — Status & Next Steps

## Done
- 10 Next.js 14 SaaS MVPs built (landing + pricing + dashboard) in pnpm monorepo.
- All 10 build clean locally + on Vercel (returned 200 in prior session).
- Code pushed to GitHub `Ansygroup/saas10`.
- Payment: Gumroad via Composio ACTIVE (`ca_ru-ZbwXlFsGQ`) — checkout works
  without Stripe keys. Stripe-ready fallback via `setup_stripe.py`.
- SEO: JSON-LD on landing + Waitlist component (no DB) + 30 blog posts (3/app).
- Marketing: threads (X/LinkedIn/Reddit/PH) in `threads/` + `CONTENT_PLAN.md`.
- Automation: `track_sales.py` (Gumroad via Composio) + daily cron
  `saas10-daily-sales` + `auto_marketing.py` (copy-paste content).
- Deploy: `ship_all.sh`, `watch_token.sh`, `deploy_gumroad_env.sh`, `gen_blog_all.py`.
- ZCode skills: `saas10-deploy`, `saas10-marketing`, `zcode-saas10-bridge`,
  `saas10-status` (all in `~/.zcode/skills/`).
- Hermes skills: `payment-saas`, `composio-saas`, `zcode-collab`, `zcode-dev`,
  `saas10-growth`, `saas10-automation`, `windows-computer-control`.

## Blocked (need credentials from user)
- **Vercel token** — `~/.hermes/vercel_token` is REDACTED. Put live token →
  `watch_token.sh` auto-ships all 10 + activates Gumroad/Formspree.
- **Stripe keys** — none on disk. Using Gumroad instead (works now).
- **Supabase keys** — Composio Supabase token 403 on Management API. Not extractable.

## To finish (one command once token arrives)
1. Put live Vercel token in `~/.hermes/vercel_token` (not REDACTED).
2. `./watch_token.sh` auto-ships all 10 (env + redeploy) within 10s.
3. Or manual: `./ship_all.sh <TOKEN>`.
4. Stripe alt: `python setup_stripe.py` → `./deploy_env.sh <SEC> <PUB> <WHSEC>`.

## ZCode integration (shared language)
- ZCode at `C:/Users/ansy0/.zcode` has 40+ skills (deploy-to-vercel REAL, 296 lines).
- Bridge skill `zcode-saas10-bridge` documents ZCode→saas10 shell commands.
- `saas10-status` skill reports this file from ZCode UI.
- Providers: OpenRouter (tencent/hy3:free) + NVIDIA (glm-5.2) enabled.

## Architecture notes
- Monorepo: pnpm workspace, `apps/<name>`, shared `@saas10/shared` + `/shared/ui`.
- Supabase removed from checkout (Stripe/email only) — simpler MVP.
- No DB needed: waitlist via Formspree/Getform env, sales via Gumroad API.
