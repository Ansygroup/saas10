import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid, Waitlist } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "MailPulse",
  "hero": {
    "eyebrow": "Grow your list",
    "title": "Email capture, done right.",
    "subtitle": "High-converting popups and embedded forms. Sync to any ESP. Own your audience."
  },
  "features": [
    {
      "icon": "\ud83d\udce7",
      "title": "Popups & forms",
      "desc": "Targeted, non-annoying."
    },
    {
      "icon": "\ud83e\udd16",
      "title": "Autoresponders",
      "desc": "Welcome series on autopilot."
    },
    {
      "icon": "\ud83d\udd17",
      "title": "ESP sync",
      "desc": "Mailchimp, ConvertKit, more."
    },
    {
      "icon": "\ud83d\udcca",
      "title": "A/B tests",
      "desc": "Optimize conversion."
    },
    {
      "icon": "\u26a1",
      "title": "Fast load",
      "desc": "No impact on speed."
    },
    {
      "icon": "\ud83c\udd93",
      "title": "Free tier",
      "desc": "Up to 1,000 subscribers."
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
      "href": "/blog",
      "label": "Blog"
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
      <Section className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Get launch updates</h2>
        <p className="mt-2 text-slate-600">No spam. One email when we ship something useful.</p>
        <div className="mt-6 flex justify-center">
          <Waitlist />
        </div>
      </Section>
      <Footer brand={CONFIG.brand} />
    </main>
  );
}
