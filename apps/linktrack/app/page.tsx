import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "LinkTrack",
  "hero": {
    "eyebrow": "Short links, real insights",
    "title": "Links that tell a story.",
    "subtitle": "Shorten, brand, and track every link. Get click analytics that actually help you grow."
  },
  "features": [
    {
      "icon": "\ud83d\udd17",
      "title": "Custom domains",
      "desc": "Use your own branded short links."
    },
    {
      "icon": "\ud83d\udcca",
      "title": "Click analytics",
      "desc": "Geo, device, and source data."
    },
    {
      "icon": "\ud83c\udfaf",
      "title": "UTM builder",
      "desc": "Track campaigns effortlessly."
    },
    {
      "icon": "\u26a1",
      "title": "QR codes",
      "desc": "Generate scannable codes instantly."
    },
    {
      "icon": "\ud83d\udd00",
      "title": "A/B routing",
      "desc": "Send traffic to the best page."
    },
    {
      "icon": "\ud83d\udd0c",
      "title": "API",
      "desc": "Automate at scale."
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
