import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "SnippetVault",
  "hero": {
    "eyebrow": "Never re-write code",
    "title": "Your code snippets, organized.",
    "subtitle": "Save, tag, and search every reusable snippet. Sync across devices. Share with your team."
  },
  "features": [
    {
      "icon": "\ud83d\udd0d",
      "title": "Instant search",
      "desc": "Find any snippet in milliseconds."
    },
    {
      "icon": "\ud83c\udff7\ufe0f",
      "title": "Smart tags",
      "desc": "Organize by language and project."
    },
    {
      "icon": "\u2601\ufe0f",
      "title": "Cloud sync",
      "desc": "Available on every device."
    },
    {
      "icon": "\u2328\ufe0f",
      "title": "Editor plugins",
      "desc": "VS Code & JetBrains extensions."
    },
    {
      "icon": "\ud83d\udc65",
      "title": "Team library",
      "desc": "Shared snippets for your crew."
    },
    {
      "icon": "\ud83d\udd12",
      "title": "Private",
      "desc": "End-to-end encrypted."
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
