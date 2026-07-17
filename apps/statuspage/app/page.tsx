import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid, Waitlist } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "StatusPage",
  "hero": {
    "eyebrow": "Stay honest",
    "title": "Uptime your users trust.",
    "subtitle": "Public status pages, uptime monitoring, and incident alerts. Show reliability, reduce support tickets."
  },
  "features": [
    {
      "icon": "\ud83d\udce1",
      "title": "Monitoring",
      "desc": "Global checks every 30s."
    },
    {
      "icon": "\ud83d\udce2",
      "title": "Incidents",
      "desc": "Real-time updates."
    },
    {
      "icon": "\ud83d\udcc4",
      "title": "Public page",
      "desc": "Branded status site."
    },
    {
      "icon": "\ud83d\udd14",
      "title": "Alerts",
      "desc": "Slack, email, webhook."
    },
    {
      "icon": "\ud83d\udcc8",
      "title": "History",
      "desc": "90-day uptime graph."
    },
    {
      "icon": "\ud83c\udf0d",
      "title": "Global",
      "desc": "Multi-region probes."
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
