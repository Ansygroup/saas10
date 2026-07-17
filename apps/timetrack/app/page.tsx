import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid, Waitlist } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "TimeTrack",
  "hero": {
    "eyebrow": "Bill every hour",
    "title": "Time tracking that pays.",
    "subtitle": "One-click timers, automatic timesheets, and client-ready invoices. For freelancers who value time."
  },
  "features": [
    {
      "icon": "\u23f1\ufe0f",
      "title": "One-click timer",
      "desc": "Start/stop from anywhere."
    },
    {
      "icon": "\ud83d\udccb",
      "title": "Timesheets",
      "desc": "Auto-generated weekly."
    },
    {
      "icon": "\ud83e\uddfe",
      "title": "Bill clients",
      "desc": "Convert time to invoices."
    },
    {
      "icon": "\ud83d\udcca",
      "title": "Reports",
      "desc": "See where time goes."
    },
    {
      "icon": "\ud83e\udd71",
      "title": "Idle detection",
      "desc": "Never lose a minute."
    },
    {
      "icon": "\ud83d\udcbc",
      "title": "Projects",
      "desc": "Track per client."
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
