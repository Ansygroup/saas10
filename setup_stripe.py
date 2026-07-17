#!/usr/bin/env python3
"""Create Stripe Products + Prices for saas10 apps.
Run: STRIPE_SECRET_KEY=sk_live_xxx python setup_stripe.py
Prints price IDs to paste into shared config.
"""
import os, sys, subprocess

KEY = os.environ.get("STRIPE_SECRET_KEY")
if not KEY:
    print("ERROR: set STRIPE_SECRET_KEY env var")
    sys.exit(1)

try:
    import stripe
except ImportError:
    subprocess.run([sys.executable, "-m", "pip", "install", "stripe"])
    import stripe

stripe.api_key = KEY

# app -> (name, monthly price USD)
APPS = {
    "invoiceflow": ("InvoiceFlow Pro", 19),
    "linktrack": ("LinkTrack Pro", 9),
    "chatwidget": ("ChatWidget Pro", 15),
    "formcraft": ("FormCraft Pro", 12),
    "mailpulse": ("MailPulse Pro", 14),
    "snippetvault": ("SnippetVault Pro", 8),
    "timetrack": ("TimeTrack Pro", 11),
    "resumebuilder": ("ResumeBuilder Pro", 13),
    "statuspage": ("StatusPage Pro", 17),
    "pdfshift": ("PDFShift Pro", 10),
}

print("Creating Stripe products + prices...")
for slug, (name, price) in APPS.items():
    # idempotent: check existing
    existing = stripe.Product.list(limit=100)
    prod = next((p for p in existing.data if p.name == name), None)
    if not prod:
        prod = stripe.Product.create(name=name, metadata={"app": slug})
    # create price
    p = stripe.Price.create(
        product=prod.id,
        unit_amount=price * 100,
        currency="usd",
        recurring={"interval": "month"},
        lookup_key=f"{slug}_monthly",
    )
    print(f"{slug}: product={prod.id} price={p.id} (${price}/mo)")
print("DONE. Paste price IDs into shared/plans.ts")
