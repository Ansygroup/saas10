#!/usr/bin/env python3
"""Generate blog routes + 3 posts + nav/waitlist for the 8 remaining saas10 apps.
Skips invoiceflow + linktrack (already done). Run from saas10 root."""
import os

APPS = {
    "chatwidget": {"name": "ChatWidget", "topic": "website chat",
                   "p1": "Visitors leave in 10s — the chat fix",
                   "p2": "Add a chat widget without code",
                   "p3": "ChatWidget vs Intercom cost"},
    "formcraft": {"name": "FormCraft", "topic": "forms",
                   "p1": "Forms that convert: 5 fixes",
                   "p2": "Build a form in 3 minutes, no code",
                   "p3": "FormCraft vs Typeform free"},
    "mailpulse": {"name": "MailPulse", "topic": "email",
                   "p1": "Your welcome email is boring — fix it",
                   "p2": "Send drip emails without a PhD",
                   "p3": "MailPulse vs Mailchimp free"},
    "snippetvault": {"name": "SnippetVault", "topic": "code snippets",
                     "p1": "Stop re-googling the same code",
                     "p2": "Save snippets once, find them anywhere",
                     "p3": "SnippetVault vs GitHub Gists"},
    "timetrack": {"name": "TimeTrack", "topic": "time tracking",
                   "p1": "Where did the day go? (time audit)",
                   "p2": "Track time without thinking about it",
                   "p3": "TimeTrack vs Toggl free"},
    "resumebuilder": {"name": "ResumeBuilder", "topic": "resumes",
                     "p1": "Your resume gets 6 seconds — win it",
                     "p2": "Build a resume that passes ATS",
                     "p3": "ResumeBuilder vs Canva"},
    "statuspage": {"name": "StatusPage", "topic": "status",
                   "p1": "Users think you're down — you're not",
                   "p2": "Publish a status page in 5 min",
                   "p3": "StatusPage vs statuspage.io cost"},
}

BLOG_POST_ROUTE = '''import { promises as fs } from 'fs';
import path from 'path';
import React from 'react';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export async function generateStaticParams() {
  try {
    const files = await fs.readdir(POSTS_DIR);
    return files.filter((f) => f.endsWith('.md')).map((f) => ({ slug: f.replace('.md', '') }));
  } catch {
    return [];
  }
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  let body = '';
  try {
    body = await fs.readFile(path.join(POSTS_DIR, `${params.slug}.md`), 'utf-8');
  } catch {
    body = '# Not found\\n\\nThis post does not exist yet.';
  }
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <article className="prose">
        <pre className="whitespace-pre-wrap text-sm text-slate-700">{body}</pre>
      </article>
    </main>
  );
}
'''

BLOG_INDEX = '''import { promises as fs } from 'fs';
import path from 'path';
import Link from 'next/link';

const POSTS_DIR = path.join(process.cwd(), 'content', 'blog');

export const metadata = {
  title: '__NAME__ Blog — __TOPIC__',
  description: '__TOPIC__ tips and guides.',
};

export default async function BlogIndex() {
  let posts: { slug: string; title: string }[] = [];
  try {
    const files = await fs.readdir(POSTS_DIR);
    posts = files.filter((f) => f.endsWith('.md')).map((f) => {
      const raw = f.replace('.md', '');
      const title = raw.replace(/-/g, ' ').replace(/\\b\\w/g, (c) => c.toUpperCase());
      return { slug: raw, title };
    });
  } catch { posts = []; }
  return (
    <main className="mx-auto max-w-3xl px-4 py-16">
      <h1 className="text-3xl font-bold text-slate-900">__NAME__ Blog</h1>
      <p className="mt-2 text-slate-600">__TOPIC__.</p>
      <ul className="mt-8 space-y-4">
        {posts.map((p) => (
          <li key={p.slug}>
            <Link href={`/blog/${p.slug}`} className="text-lg font-semibold text-indigo-600 hover:underline">
              {p.title}
            </Link>
          </li>
        ))}
        {posts.length === 0 && <li className="text-slate-500">No posts yet.</li>}
      </ul>
    </main>
  );
}
'''

ROOT = "C:/Users/ansy0/projects/saas10/apps"

def slugify(s):
    return s.lower().replace(" — ", "-").replace(" / ", "-").replace("/", "-").replace(" ", "-").replace("?", "").replace("'", "")

for app, cfg in APPS.items():
    base = os.path.join(ROOT, app)
    # blog routes
    os.makedirs(os.path.join(base, "app", "blog", "[slug]"), exist_ok=True)
    with open(os.path.join(base, "app", "blog", "[slug]", "page.tsx"), "w", encoding="utf-8") as f:
        f.write(BLOG_POST_ROUTE)
    with open(os.path.join(base, "app", "blog", "page.tsx"), "w", encoding="utf-8") as f:
        idx = BLOG_INDEX.replace("{NAME}", cfg["name"]).replace("{TOPIC}", cfg["topic"])
        f.write(idx)
    # 3 posts
    pdir = os.path.join(base, "content", "blog")
    os.makedirs(pdir, exist_ok=True)
    posts = [
        (slugify(cfg["p1"]), f"# {cfg['p1']}\n\nPractical {cfg['topic']} advice from the {cfg['name']} team.\n\n[Try {cfg['name']}](https://gumroad.com/l/{app}-pro?utm_source=blog&utm_medium=content)"),
        (slugify(cfg["p2"]), f"# {cfg['p2']}\n\nStep-by-step: get started with {cfg['name']} in minutes.\n\n[Try {cfg['name']}](https://gumroad.com/l/{app}-pro?utm_source=blog&utm_medium=content)"),
        (slugify(cfg["p3"]), f"# {cfg['p3']}\n\nHonest comparison. {cfg['name']} vs the big guys — what actually matters.\n\n[Try {cfg['name']}](https://gumroad.com/l/{app}-pro?utm_source=blog&utm_medium=content)"),
    ]
    for slug, body in posts:
        with open(os.path.join(pdir, f"{slug}.md"), "w", encoding="utf-8") as f:
            f.write(body)
    # fix Pricing.tsx (app instead of priceId)
    pfile = os.path.join(base, "components", "Pricing.tsx")
    if os.path.exists(pfile):
        s = open(pfile, encoding="utf-8").read()
        s = s.replace("startCheckout({ priceId: plan.stripePriceId })", f"startCheckout({{ app: '{app}' }})")
        open(pfile, "w", encoding="utf-8").write(s)
    # add /blog to navLinks + Waitlist in page.tsx
    pg = os.path.join(base, "app", "page.tsx")
    if os.path.exists(pg):
        s = open(pg, encoding="utf-8").read()
        if "Waitlist" not in s:
            s = s.replace("import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid } from '@saas10/shared/ui';",
                          "import { Badge, Button, Footer, Hero, Navbar, Section, FeatureGrid, Waitlist } from '@saas10/shared/ui';")
        if '{"href": "/blog"' not in s and '"href": "/blog"' not in s:
            s = s.replace('    {\n      "href": "#pricing",\n      "label": "Pricing"\n    }\n  ]',
                          '    {\n      "href": "#pricing",\n      "label": "Pricing"\n    },\n    {\n      "href": "/blog",\n      "label": "Blog"\n    }\n  ]')
        if "<Waitlist />" not in s:
            s = s.replace('      <Footer brand={CONFIG.brand} />',
                          '      <Section className="text-center">\n        <h2 className="text-2xl font-bold text-slate-900">Get launch updates</h2>\n        <p className="mt-2 text-slate-600">No spam. One email when we ship something useful.</p>\n        <div className="mt-6 flex justify-center">\n          <Waitlist />\n        </div>\n      </Section>\n      <Footer brand={CONFIG.brand} />')
        open(pg, "w", encoding="utf-8").write(s)
    print(f"DONE {app}")

print("ALL DONE")
