# Resumebuilder

AI-powered resume and cover letter builder with ATS templates.

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
