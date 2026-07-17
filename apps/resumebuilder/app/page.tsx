import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid, Waitlist } from '@saas10/shared/ui';
import { Pricing } from '../components/Pricing';

const CONFIG = {
  "brand": "ResumeBuilder",
  "hero": {
    "eyebrow": "Land the interview",
    "title": "Resumes that get hired.",
    "subtitle": "AI-powered resume and cover letter builder. ATS-friendly templates. Export to PDF in one click."
  },
  "features": [
    {
      "icon": "\ud83e\udd16",
      "title": "AI writer",
      "desc": "Generate bullet points."
    },
    {
      "icon": "\ud83c\udfa8",
      "title": "Templates",
      "desc": "Recruiter-approved designs."
    },
    {
      "icon": "\ud83d\udcc4",
      "title": "ATS-friendly",
      "desc": "Pass the bots."
    },
    {
      "icon": "\u2709\ufe0f",
      "title": "Cover letters",
      "desc": "Tailored automatically."
    },
    {
      "icon": "\ud83d\udd01",
      "title": "Versioning",
      "desc": "Per-job resumes."
    },
    {
      "icon": "\ud83d\udce5",
      "title": "Export",
      "desc": "PDF & Word."
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
