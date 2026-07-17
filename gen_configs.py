import json, os

apps = {
  "invoiceflow": {
    "brand": "InvoiceFlow",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"},{"href":"#faq","label":"FAQ"}],
    "hero": {"eyebrow":"Get paid faster","title":"Invoicing that runs itself.","subtitle":"Create professional invoices, automate reminders, and get paid in 3 clicks. Built for freelancers and small teams."},
    "features":[
      {"icon":"🧾","title":"Smart invoices","desc":"Beautiful, branded invoices in seconds."},
      {"icon":"⏰","title":"Auto reminders","desc":"Chase late payments automatically."},
      {"icon":"💳","title":"Online payments","desc":"Stripe & PayPal built in."},
      {"icon":"📈","title":"Reports","desc":"Know your cash flow at a glance."},
      {"icon":"🌍","title":"Multi-currency","desc":"Bill clients in 30+ currencies."},
      {"icon":"🧩","title":"Integrations","desc":"Connect Xero, QuickBooks, more."}
    ]
  },
  "snippetvault": {
    "brand": "SnippetVault",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"Never re-write code","title":"Your code snippets, organized.","subtitle":"Save, tag, and search every reusable snippet. Sync across devices. Share with your team."},
    "features":[
      {"icon":"🔍","title":"Instant search","desc":"Find any snippet in milliseconds."},
      {"icon":"🏷️","title":"Smart tags","desc":"Organize by language and project."},
      {"icon":"☁️","title":"Cloud sync","desc":"Available on every device."},
      {"icon":"⌨️","title":"Editor plugins","desc":"VS Code & JetBrains extensions."},
      {"icon":"👥","title":"Team library","desc":"Shared snippets for your crew."},
      {"icon":"🔒","title":"Private","desc":"End-to-end encrypted."}
    ]
  },
  "linktrack": {
    "brand": "LinkTrack",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"Short links, real insights","title":"Links that tell a story.","subtitle":"Shorten, brand, and track every link. Get click analytics that actually help you grow."},
    "features":[
      {"icon":"🔗","title":"Custom domains","desc":"Use your own branded short links."},
      {"icon":"📊","title":"Click analytics","desc":"Geo, device, and source data."},
      {"icon":"🎯","title":"UTM builder","desc":"Track campaigns effortlessly."},
      {"icon":"⚡","title":"QR codes","desc":"Generate scannable codes instantly."},
      {"icon":"🔀","title":"A/B routing","desc":"Send traffic to the best page."},
      {"icon":"🔌","title":"API","desc":"Automate at scale."}
    ]
  },
  "formcraft": {
    "brand": "FormCraft",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"No code required","title":"Forms that convert.","subtitle":"Drag-and-drop form builder with logic, payments, and integrations. Embed anywhere in one line."},
    "features":[
      {"icon":"🧲","title":"Drag & drop","desc":"Build forms visually."},
      {"icon":"🧠","title":"Conditional logic","desc":"Show the right fields."},
      {"icon":"💸","title":"Collect payments","desc":"Take deposits on submit."},
      {"icon":"📥","title":"Export","desc":"CSV, Slack, webhook."},
      {"icon":"🛡️","title":"Spam guard","desc":"Built-in protection."},
      {"icon":"🎨","title":"Themes","desc":"Match your brand."}
    ]
  },
  "mailpulse": {
    "brand": "MailPulse",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"Grow your list","title":"Email capture, done right.","subtitle":"High-converting popups and embedded forms. Sync to any ESP. Own your audience."},
    "features":[
      {"icon":"📧","title":"Popups & forms","desc":"Targeted, non-annoying."},
      {"icon":"🤖","title":"Autoresponders","desc":"Welcome series on autopilot."},
      {"icon":"🔗","title":"ESP sync","desc":"Mailchimp, ConvertKit, more."},
      {"icon":"📊","title":"A/B tests","desc":"Optimize conversion."},
      {"icon":"⚡","title":"Fast load","desc":"No impact on speed."},
      {"icon":"🆓","title":"Free tier","desc":"Up to 1,000 subscribers."}
    ]
  },
  "timetrack": {
    "brand": "TimeTrack",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"Bill every hour","title":"Time tracking that pays.","subtitle":"One-click timers, automatic timesheets, and client-ready invoices. For freelancers who value time."},
    "features":[
      {"icon":"⏱️","title":"One-click timer","desc":"Start/stop from anywhere."},
      {"icon":"📋","title":"Timesheets","desc":"Auto-generated weekly."},
      {"icon":"🧾","title":"Bill clients","desc":"Convert time to invoices."},
      {"icon":"📊","title":"Reports","desc":"See where time goes."},
      {"icon":"🥱","title":"Idle detection","desc":"Never lose a minute."},
      {"icon":"💼","title":"Projects","desc":"Track per client."}
    ]
  },
  "pdfshift": {
    "brand": "PDFShift",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"PDFs in a click","title":"All your PDF tools.","subtitle":"Merge, split, compress, convert, and sign PDFs. No installs. Browser-based and private."},
    "features":[
      {"icon":"🔀","title":"Merge & split","desc":"Reorganize pages easily."},
      {"icon":"🗜️","title":"Compress","desc":"Shrink without quality loss."},
      {"icon":"🔄","title":"Convert","desc":"PDF to Word, images, more."},
      {"icon":"✍️","title":"Sign","desc":"e-sign in seconds."},
      {"icon":"🔒","title":"Private","desc":"Files deleted after 1h."},
      {"icon":"🌐","title":"API","desc":"Automate conversions."}
    ]
  },
  "statuspage": {
    "brand": "StatusPage",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"Stay honest","title":"Uptime your users trust.","subtitle":"Public status pages, uptime monitoring, and incident alerts. Show reliability, reduce support tickets."},
    "features":[
      {"icon":"📡","title":"Monitoring","desc":"Global checks every 30s."},
      {"icon":"📢","title":"Incidents","desc":"Real-time updates."},
      {"icon":"📄","title":"Public page","desc":"Branded status site."},
      {"icon":"🔔","title":"Alerts","desc":"Slack, email, webhook."},
      {"icon":"📈","title":"History","desc":"90-day uptime graph."},
      {"icon":"🌍","title":"Global","desc":"Multi-region probes."}
    ]
  },
  "chatwidget": {
    "brand": "ChatWidget",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"Talk to visitors","title":"Live chat that converts.","subtitle":"A lightweight chat widget with bots, saved replies, and analytics. One snippet, live in minutes."},
    "features":[
      {"icon":"💬","title":"Live chat","desc":"Real-time with visitors."},
      {"icon":"🤖","title":"Chatbots","desc":"Auto-answer FAQs."},
      {"icon":"⚡","title":"One snippet","desc":"Install in 2 minutes."},
      {"icon":"📋","title":"Saved replies","desc":"Reply faster."},
      {"icon":"📊","title":"Analytics","desc":"Conversation insights."},
      {"icon":"🌙","title":"Offline","desc":"Capture leads 24/7."}
    ]
  },
  "resumebuilder": {
    "brand": "ResumeBuilder",
    "nav": [{"href":"#features","label":"Features"},{"href":"#pricing","label":"Pricing"}],
    "hero": {"eyebrow":"Land the interview","title":"Resumes that get hired.","subtitle":"AI-powered resume and cover letter builder. ATS-friendly templates. Export to PDF in one click."},
    "features":[
      {"icon":"🤖","title":"AI writer","desc":"Generate bullet points."},
      {"icon":"🎨","title":"Templates","desc":"Recruiter-approved designs."},
      {"icon":"📄","title":"ATS-friendly","desc":"Pass the bots."},
      {"icon":"✉️","title":"Cover letters","desc":"Tailored automatically."},
      {"icon":"🔁","title":"Versioning","desc":"Per-job resumes."},
      {"icon":"📥","title":"Export","desc":"PDF & Word."}
    ]
  }
}

base = """import {{ Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid }} from '@saas10/shared/ui';
import {{ Pricing }} from '../components/Pricing';

const CONFIG = {cfg};

export default function Home() {{
  return (
    <main>
      <Navbar brand={{CONFIG.brand}} links={{CONFIG.navLinks}} />
      <Hero
        eyebrow={{CONFIG.hero.eyebrow}}
        title={{CONFIG.hero.title}}
        subtitle={{CONFIG.hero.subtitle}}
        cta={{
          <>
            <Button variant="primary">Start free</Button>
            <Button variant="outline">Book a demo</Button>
          </>
        }}
      />
      <div id="features">
        <FeatureGrid features={{CONFIG.features}} />
      </div>
      <div id="pricing">
        <Pricing brand={{CONFIG.brand}} />
      </div>
      <Section className="text-center">
        <h2 className="text-2xl font-bold text-slate-900">Ready to get started?</h2>
        <p className="mt-2 text-slate-600">Join thousands of teams already using {{CONFIG.brand}}.</p>
        <div className="mt-6 flex justify-center">
          <Button variant="primary">Create your account</Button>
        </div>
      </Section>
      <Footer brand={{CONFIG.brand}} />
    </main>
  );
}}
"""

root = "C:/Users/ansy0/projects/saas10/apps"
for app, cfg in apps.items():
    cfg["navLinks"] = cfg.pop("nav")
    content = base.format(cfg=json.dumps(cfg, indent=2), CONFIG=cfg)
    path = os.path.join(root, app, "app", "page.tsx")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    # rename package.json name
    pkg = os.path.join(root, app, "package.json")
    with open(pkg, encoding="utf-8") as f:
        p = json.load(f)
    p["name"] = f"@saas10/{app}"
    with open(pkg, "w", encoding="utf-8") as f:
        json.dump(p, f, indent=2)
    print("wrote", app)
print("DONE")
