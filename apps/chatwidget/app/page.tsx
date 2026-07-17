import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "ChatWidget",
  "hero": {
    "eyebrow": "Talk to visitors",
    "title": "Live chat that converts.",
    "subtitle": "A lightweight chat widget with bots, saved replies, and analytics. One snippet, live in minutes."
  },
  "features": [
    {
      "icon": "\ud83d\udcac",
      "title": "Live chat",
      "desc": "Real-time with visitors."
    },
    {
      "icon": "\ud83e\udd16",
      "title": "Chatbots",
      "desc": "Auto-answer FAQs."
    },
    {
      "icon": "\u26a1",
      "title": "One snippet",
      "desc": "Install in 2 minutes."
    },
    {
      "icon": "\ud83d\udccb",
      "title": "Saved replies",
      "desc": "Reply faster."
    },
    {
      "icon": "\ud83d\udcca",
      "title": "Analytics",
      "desc": "Conversation insights."
    },
    {
      "icon": "\ud83c\udf19",
      "title": "Offline",
      "desc": "Capture leads 24/7."
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
