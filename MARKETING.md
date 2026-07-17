# Go-To-Market & Revenue Plan — 10 SaaS MVPs

You built 10 SaaS apps. Now make them earn. This is the playbook — no budget required
to start (all free tiers, all organic). Paid growth comes AFTER first revenue.

## Week 0 — Prep (you, ~2h)
- [ ] `vercel login` then `bash launch.sh` → 10 live URLs
- [ ] Buy 1 domain (e.g. invoiceflow.com) OR use `.vercel.app` free subdomains to start
- [ ] Create Supabase project, run `pnpm db:push` in `apps/invoiceflow`
- [ ] Stripe: create 3 products (Free/Pro/Team), copy Price IDs → `shared/plans.ts`
- [ ] Set env vars in each Vercel project (see launch.sh output)

## Week 1 — Launch (organic, $0)
For EACH product post the copy from `outreach_posts.md`:
1. **Product Hunt** — launch 1 product/day (not all 10 at once). Best days: Tue–Thu.
2. **Reddit** — r/SaaS, r/Entrepreneur, r/freelance, r/sideproject (match the niche).
3. **Twitter/X** — #buildinpublic, tag makers, reply to related threads.
4. **Indie Hackers** — post a build log per product.
5. **LinkedIn** — 1 post per product (founder story angle).

## Week 2–4 — Capture & convert
- [ ] Add each product to **directories**: BetaList, StartupBase, SaaS Hub, AlternativeTo
- [ ] SEO: each app already has semantic landing + pricing; add a `/blog` later
- [ ] Email catch: MailPulse form on every landing (or the shared footer CTA)
- [ ] Reply to EVERY comment within 2h in week 1 (algorithms reward engagement)

## Month 2 — Paid (only after 50 signups/product)
- [ ] Google Ads: exact-match "invoice software for freelancers" type keywords
- [ ] Reddit ads to the niche subs
- [ ] Budget: start $5/day, kill anything >$30 CAC

## Revenue math (per product)
- Free tier (0$) → Pro ($19/mo) → Team ($49/mo)
- 100 free users × 5% convert = 5 paid × $19 = **$95/mo/product**
- ×10 products = **$950/mo** at modest traction
- At 2% of a 1k-user list converting to Team: **$980/mo/product**

## What the agent CANNOT do for you
- Open Vercel/Stripe/Supabase accounts (needs your email + card)
- Pay for domains/ads
- "Make money" — that follows real users, which follows your outreach

## What the agent DID
- 10 production-ready Next.js apps (built + verified builds)
- invoiceflow = full-stack (auth+db+stripe) reference
- launch.sh, outreach.sh, outreach_posts.md, deploy.sh
- You run 3 commands: `vercel login` → `bash launch.sh` → paste `outreach_posts.md`
