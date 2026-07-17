# SaaS10 — 10 Production-Ready SaaS MVPs

Ten independent, global, English-language SaaS products built as Next.js 14 (App Router)
+ TypeScript + Tailwind apps in a single pnpm monorepo. Each is Stripe-ready and deploys
to Vercel with zero config.

## The 10 products
| # | App | What it does |
|---|-----|--------------|
| 1 | invoiceflow  | Invoicing & billing for freelancers |
| 2 | snippetvault | Code snippet manager |
| 3 | linktrack    | URL shortener + click analytics |
| 4 | formcraft    | No-code form builder |
| 5 | mailpulse    | Email capture / popups |
| 6 | timetrack    | Time tracking + invoicing |
| 7 | pdfshift     | Browser PDF tools |
| 8 | statuspage   | Uptime monitoring + status pages |
| 9 | chatwidget   | Live chat widget |
| 10| resumebuilder| AI resume & cover-letter builder |

## Structure
```
saas10/
  pnpm-workspace.yaml
  shared/            # @saas10/shared: UI, pricing, Stripe helper
  apps/<app>/        # one Next.js app per product
    app/page.tsx     # landing (hero, features, pricing)
    app/dashboard/   # demo dashboard
    app/api/checkout # Stripe checkout session route
    .env.example
    README.md
```

## Develop one app
```bash
pnpm install
cd apps/invoiceflow
cp .env.example .env.local   # add Stripe test keys
pnpm dev                     # http://localhost:3000
```

## Enable real payments (per app)
1. Create products/prices in the Stripe Dashboard.
2. Put real Price IDs into `shared/plans.ts` (`DEMO_PLANS[*].stripePriceId`).
3. Set live keys in `apps/<app>/.env.local`.

Without keys the apps run in **demo mode** — pricing buttons show a notice instead of charging.

## Deploy (Vercel)
Connect the repo, set the root dir to `apps/<app>`, add env vars, deploy.
Each app is fully independent — deploy one, some, or all ten.

## Full-stack example: invoiceflow
`apps/invoiceflow` is a complete, launch-ready reference implementation:
- **Auth:** Supabase Auth (`@supabase/ssr`) — email/password, session middleware
- **DB:** Postgres via Supabase + Prisma (`prisma/schema.prisma`, `lib/prisma.ts`)
- **Payments:** real Stripe Checkout (`/api/checkout`), webhooks (`/api/webhooks`),
  customer portal (`/api/portal`), plan sync on `checkout.session.completed`
- **App:** protected `/dashboard` with real invoice CRUD (create + list from DB)

Other 9 apps ship the same landing + pricing + demo dashboard; clone the
invoiceflow wiring (auth/db/stripe) into any of them to make it full-stack.

### Run invoiceflow locally
```bash
pnpm install
pnpm db:generate
cp apps/invoiceflow/.env.example apps/invoiceflow/.env.local
# fill: Supabase URL/key, DATABASE_URL, Stripe keys
pnpm db:push          # create tables in Supabase
cd apps/invoiceflow && pnpm dev
# in another terminal: stripe listen --forward-to localhost:3000/api/webhooks
```

## Deploy all 10
```bash
vercel login
bash deploy.sh        # deploys each app; set env vars in Vercel dashboard
```

## Go-live checklist per product
- [ ] Create Supabase project + run `pnpm db:push` (or clone invoiceflow's schema)
- [ ] Add real Stripe Price IDs into `shared/plans.ts`
- [ ] Set env vars in host (Supabase URL/key, DATABASE_URL, Stripe keys, webhook secret)
- [ ] Buy a domain + point DNS
- [ ] Marketing: SEO, cold outreach, Product Hunt, communities
