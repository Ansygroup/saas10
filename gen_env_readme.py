import os

apps = {
  "invoiceflow": "Invoicing & billing SaaS for freelancers and small teams.",
  "snippetvault": "Code snippet manager with search, tags, and cloud sync.",
  "linktrack": "URL shortener with branded links and click analytics.",
  "formcraft": "No-code drag-and-drop form builder with logic and payments.",
  "mailpulse": "Email capture popups and forms with ESP sync.",
  "timetrack": "One-click time tracking and client-ready invoicing.",
  "pdfshift": "Browser-based PDF tools: merge, split, compress, convert, sign.",
  "statuspage": "Uptime monitoring and public status pages with incident alerts.",
  "chatwidget": "Lightweight live chat widget with bots and analytics.",
  "resumebuilder": "AI-powered resume and cover letter builder with ATS templates.",
}

ENV = """# Stripe (test mode keys from https://dashboard.stripe.com/test/apikeys)
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_xxx
STRIPE_SECRET_KEY=sk_test_xxx

# App URL
NEXT_PUBLIC_APP_URL=http://localhost:3000
"""

README = """# {brand}

{desc}

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Stripe-ready checkout (test mode)
- Shared UI & pricing components (@saas10/shared)

## Getting started
```bash
pnpm install
cp .env.example .env.local   # add your Stripe test keys
pnpm dev                     # http://localhost:3000
```

## Enable real payments
1. Create products/prices in Stripe Dashboard.
2. Put real Price IDs into `../../shared/plans.ts` (DEMO_PLANS.stripePriceId).
3. Set live keys in `.env.local`.

## Deploy
```bash
pnpm build && pnpm start
# or connect the repo to Vercel (zero-config).
```

Demo mode works without keys — pricing buttons show a notice instead of charging.
"""

root = "C:/Users/ansy0/projects/saas10/apps"
for app, desc in apps.items():
    with open(os.path.join(root, app, ".env.example"), "w", encoding="utf-8") as f:
        f.write(ENV)
    with open(os.path.join(root, app, "README.md"), "w", encoding="utf-8") as f:
        f.write(README.format(brand=app.capitalize(), desc=desc))
    print("env+readme", app)
print("DONE")
