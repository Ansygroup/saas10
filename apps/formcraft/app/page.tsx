import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid, Waitlist } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "FormCraft",
  "hero": {
    "eyebrow": "No code required",
    "title": "Forms that convert.",
    "subtitle": "Drag-and-drop form builder with logic, payments, and integrations. Embed anywhere in one line."
  },
  "features": [
    {
      "icon": "\ud83e\uddf2",
      "title": "Drag & drop",
      "desc": "Build forms visually."
    },
    {
      "icon": "\ud83e\udde0",
      "title": "Conditional logic",
      "desc": "Show the right fields."
    },
    {
      "icon": "\ud83d\udcb8",
      "title": "Collect payments",
      "desc": "Take deposits on submit."
    },
    {
      "icon": "\ud83d\udce5",
      "title": "Export",
      "desc": "CSV, Slack, webhook."
    },
    {
      "icon": "\ud83d\udee1\ufe0f",
      "title": "Spam guard",
      "desc": "Built-in protection."
    },
    {
      "icon": "\ud83c\udfa8",
      "title": "Themes",
      "desc": "Match your brand."
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
