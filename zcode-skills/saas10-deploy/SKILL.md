---
name: saas10-deploy
description: Deploy the 10 saas10 Next.js apps to Vercel and wire payments. Companion to Hermes' saas10 project at C:/Users/ansy0/projects/saas10. Delegates actual Vercel deploy to the bundled `deploy-to-vercel` skill. Use when the user wants to ship/publish the SaaS MVPs or connect Gumroad/Stripe.
---

# saas10 Deploy (ZCode skill)

Companion skill for the saas10 monorepo (Hermes-owned, at
`C:/Users/ansy0/projects/saas10`). 10 Next.js 14 SaaS MVPs in a pnpm workspace.

## Apps
invoiceflow, linktrack, chatwidget, formcraft, mailpulse, snippetvault,
timetrack, resumebuilder, statuspage, pdfshift

## Deploy (delegates to `deploy-to-vercel` skill)
The `deploy-to-vercel` skill (in this ZCode install) handles the actual
Vercel push/auth/link. For saas10 use the repo's helper scripts which encode
the monorepo layout (rootDirectory=apps/<name> per vercel.json):

```bash
cd C:/Users/ansy0/projects/saas10
TOKEN=<vercel_token>
./ship_all.sh "$TOKEN"        # sets Gumroad env + redeploys all 10 (one cmd)
# OR auto-ship when token appears:
./watch_token.sh              # polls ~/.hermes/vercel_token, runs ship_all.sh
```

Each app dir has `vercel.json` + is already linked to Vercel (done in prior
session). If re-linking is needed, use `deploy-to-vercel` skill per app.

## Payments (no Stripe keys needed)
- Gumroad via Composio (`ca_ru-ZbwXlFsGQ` ACTIVE) is wired in.
- `/api/checkout` returns `GUMROAD_<APP>_URL` → client redirects.
- To use Stripe instead: set STRIPE_SECRET_KEY etc, run `python setup_stripe.py`,
  then `./deploy_env.sh <SEC> <PUB> <WHSEC>`.

## Verify
- `pnpm --filter <app> build` must pass (verified for invoiceflow: EXIT 0).
- All 10 were live on Vercel (returned 200) in prior session.

## Notes
- Supabase was dropped from checkout (Stripe/email only) — simpler MVP.
- Vercel token file `~/.hermes/vercel_token` was REDACTED; ask user for live one.
- Hermes skills (payment-saas, composio-saas, zcode-collab) mirror this logic.
