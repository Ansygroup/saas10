import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid, Waitlist } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "PDFShift",
  "hero": {
    "eyebrow": "PDFs in a click",
    "title": "All your PDF tools.",
    "subtitle": "Merge, split, compress, convert, and sign PDFs. No installs. Browser-based and private."
  },
  "features": [
    {
      "icon": "\ud83d\udd00",
      "title": "Merge & split",
      "desc": "Reorganize pages easily."
    },
    {
      "icon": "\ud83d\udddc\ufe0f",
      "title": "Compress",
      "desc": "Shrink without quality loss."
    },
    {
      "icon": "\ud83d\udd04",
      "title": "Convert",
      "desc": "PDF to Word, images, more."
    },
    {
      "icon": "\u270d\ufe0f",
      "title": "Sign",
      "desc": "e-sign in seconds."
    },
    {
      "icon": "\ud83d\udd12",
      "title": "Private",
      "desc": "Files deleted after 1h."
    },
    {
      "icon": "\ud83c\udf10",
      "title": "API",
      "desc": "Automate conversions."
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
        <h2 className="text-2xl font-bold text-slate-900">Get launch updates</h2>
        <p className="mt-2 text-slate-600">No spam. One email when we ship something useful.</p>
        <div className="mt-6 flex justify-center">
          <Waitlist />
        </div>
      </Section>
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
