import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "InvoiceFlow",
  "hero": {
    "eyebrow": "Get paid faster",
    "title": "Invoicing that runs itself.",
    "subtitle": "Create professional invoices, automate reminders, and get paid in 3 clicks. Built for freelancers and small teams."
  },
  "features": [
    {
      "icon": "\ud83e\uddfe",
      "title": "Smart invoices",
      "desc": "Beautiful, branded invoices in seconds."
    },
    {
      "icon": "\u23f0",
      "title": "Auto reminders",
      "desc": "Chase late payments automatically."
    },
    {
      "icon": "\ud83d\udcb3",
      "title": "Online payments",
      "desc": "Stripe & PayPal built in."
    },
    {
      "icon": "\ud83d\udcc8",
      "title": "Reports",
      "desc": "Know your cash flow at a glance."
    },
    {
      "icon": "\ud83c\udf0d",
      "title": "Multi-currency",
      "desc": "Bill clients in 30+ currencies."
    },
    {
      "icon": "\ud83e\udde9",
      "title": "Integrations",
      "desc": "Connect Xero, QuickBooks, more."
    }
  ],
  "navLinks": [
    {
      "href": "#features",
      "label": "Features"
    },
    {
      "href": "#pricing",
      "label": "Pricing"
    },
    {
      "href": "#faq",
      "label": "FAQ"
    }
  ]
};

export default function Home() {
  return (
    <main>
      <Navbar brand={CONFIG.brand} links={CONFIG.navLinks} />
      <Hero
        eyebrow={CONFIG.hero.eyebrow}
        title={CONFIG.hero.title}
        subtitle={CONFIG.hero.subtitle}
        cta={
          <>
            <Button variant="primary">Start free</Button>
            <Button variant="outline">Book a demo</Button>
          </>
        }
      />
      <div id="features">
        <FeatureGrid features={CONFIG.features} />
      </div>
      <div id="pricing">
        <Pricing brand={CONFIG.brand} />
      </div>
      <Section className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Ready to get started?</h2>
        <p className="mt-2 text-slate-600">Join thousands of teams already using {CONFIG.brand}.</p>
        <div className="mt-6 flex justify-center">
          <Button variant="primary">Create your account</Button>
        </div>
      </Section>
      <Footer brand={CONFIG.brand} />
    </main>
  );
}
