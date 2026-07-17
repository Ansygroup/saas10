# saas10 — Operating Guide (one command away from live)

Everything is built, tested, and pushed. Two things are missing — both are
**user-side credentials**, not code. This guide tells you exactly what to do
the moment you have them.

## What's done (no action needed)
- ✅ 10 Next.js 14 SaaS MVPs (landing + pricing + dashboard)
- ✅ All build clean, pushed to `Ansygroup/saas10`
- ✅ Gumroad payments via Composio (ACTIVE, no Stripe keys needed)
- ✅ SEO: 30 blog posts + JSON-LD + waitlist (no DB)
- ✅ Marketing: X/LinkedIn/Reddit/PH threads ready
- ✅ Automation: `track_sales.py` (Gumroad) + daily cron + `auto_marketing.py`
- ✅ Video: HeyGen pipeline ready (needs HeyGen connect)
- ✅ ZCode + Hermes skills (10 total)

## Step 1 — Vercel token (deploys all 10 live)
Put your live Vercel token in:
```
C:\Users\ansy0\.hermes\vercel_token
```
(Not the word REDACTED — the actual `vkt_...` token.)
→ `watch_token.sh` auto-ships all 10 within 10s. Or manually:
```bash
cd C:/Users/ansy0/projects/saas10
python control_panel.py deploy
```

## Step 2 — HeyGen (optional, for video ads)
```bash
cd C:/Users/ansy0/projects/saas10
python connect_heygen.py        # opens OAuth, log in once
python control_panel.py video invoiceflow
```

## Daily operations (after live)
```bash
python control_panel.py status    # full project status
python control_panel.py sales     # Gumroad sales today
python control_panel.py content invoiceflow   # copy-paste post
```

## Architecture
- Monorepo: pnpm workspace, `apps/<name>`, shared `@saas10/shared` + `/shared/ui`
- Payments: Gumroad (Composio `ca_ru-ZbwXlFsGQ`) — no Stripe/Supabase needed
- No DB: waitlist via Formspree env, sales via Gumroad API
- ZCode = operator UI; Hermes = builder; both use same scripts

## Blockers (truly cannot proceed without user)
- Vercel token (deployment)
- HeyGen OAuth (video only — rest works without it)
