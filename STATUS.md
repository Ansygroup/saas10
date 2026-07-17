# saas10 — Status & Next Steps

## Done
- 10 Next.js 14 SaaS MVPs built (landing + pricing + dashboard) in pnpm monorepo.
- All 10 build clean locally.
- Code pushed to GitHub `Ansygroup/saas10`.
- Payment wiring refactored to **Stripe-only** (no Supabase dependency):
  - `shared/stripe.ts` → `startCheckout({ app })` redirects to checkout URL.
  - `apps/invoiceflow/app/api/checkout/route.ts` → returns Gumroad product URL (or Stripe session).
  - `apps/invoiceflow/app/api/portal`, `/api/webhooks` → Stripe-only.
- Gumroad via Composio is ACTIVE (`ca_ru-ZbwXlFsGQ`) — checkout works without Stripe keys.
- Skills created: `payment-saas`, `zcode-collab`, `windows-computer-control`.

## Blocked (need credentials from user)
- **Vercel token** — file `~/.hermes/vercel_token` is REDACTED. Need live token to redeploy.
- **Stripe keys** — none on disk. Using Gumroad via Composio instead (works now).
- **Supabase keys** — Composio Supabase token returns 403 on Management API. Not extractable.

## To finish (user provides tokens)
1. Put live Vercel token in `~/.hermes/vercel_token` (not REDACTED).
2. `./ship_all.sh <TOKEN>` → sets Gumroad env + redeploys all 10 (one command).
   OR run `./watch_token.sh` to auto-ship the moment a live token appears.
3. Or: provide Stripe keys → `python setup_stripe.py` → `./deploy_env.sh <SEC> <PUB> <WHSEC>` → redeploy.

## ZCode integration
- ZCode at `C:/Users/ansy0/.zcode` has `deploy-to-vercel` + `vercel-*` skills.
- Added new ZCode skill `saas10-deploy` (companion to this project).
- Can deploy saas10 apps via ZCode or via `./ship_all.sh`.
