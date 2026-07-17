---
name: saas10-marketing
description: Growth playbook for the 10 saas10 SaaS apps. Zero-budget, self-hosted tactics — SEO landing pages, social threads, affiliate/referral, Product Hunt, directories. Use when the user wants traffic/users for the MVPs without paid ads or API keys.
---

# saas10 Marketing (zero-budget)

10 SaaS MVPs at `C:/Users/ansy0/projects/saas10`. Goal: get users + Gumroad
sales without paid tools.

## 1. SEO foundation (free, high-impact)
- Each app already has `/` landing + `/pricing`. Add a `/blog` route per app
  with 3 pillar posts (problem → solution → how-to). Use `shared/` UI.
- Submit each sitemap to Google Search Console (needs Search Console property —
  free, no API key needed beyond Google login).
- Add JSON-LD `SoftwareApplication` schema to landing pages (boosts rich results).

## 2. Social distribution
- X/Twitter threads: 1 per app, "I built <app> to solve <problem>". Link Gumroad.
- LinkedIn post per app (B2B angle for invoiceflow/timetrack/formcraft).
- Reddit: relevant subs (r/SaaS, r/sideproject, r/Entrepreneur). No spam — value first.
- Use `humanizer` skill to keep copy natural (ZCode has it).

## 3. Affiliate / referral (built into Gumroad)
- Gumroad has native affiliate program. Enable per product → give 20-30% to
  promoters. Post on affiliate forums.
- Add a `/affiliates` page per app linking to Gumroad affiliate signup.

## 4. Launch platforms (free)
- Product Hunt: ship 1 app/day for 10 days. Needs PH account (free).
- BetaList, Hacker News Show, IndieHackers.
- SaaS directories: SaaS Rocks, The SaaS List, Capterra (free tier).

## 5. Email capture (no DB needed)
- Add a waitlist input to each landing → POST to a free form backend
  (Formspree/Getform free tier) or Gumroad follower. No Supabase required.

## Composio leverage
- `gumroad` ACTIVE → pull sales data via `GUMROAD_GET_SALES` to track what works.
- `heygen` ACTIVE → generate avatars for promo videos (faceless pipeline).

## Verify
- Each app returns 200 (verified prior session).
- Add UTM params to Gumroad links per source to attribute sales.
