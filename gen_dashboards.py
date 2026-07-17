import os, json

dashboards = {
  "invoiceflow": {"title":"Invoices","rows":["#INV-001  Acme Corp  $1,200  Paid","#INV-002  Globex  $850  Pending","#INV-003  Initech  $2,400  Overdue"],"cta":"New invoice"},
  "snippetvault": {"title":"Snippets","rows":["useFetch.ts  TypeScript","debounce.js  JavaScript","useAuth.tsx  React"],"cta":"New snippet"},
  "linktrack": {"title":"Links","rows":["/go/sale  -> acme.com 1,204 clicks","/go/docs  -> docs.acme.com 803 clicks","/go/demo  -> demo.acme.com 312 clicks"],"cta":"New link"},
  "formcraft": {"title":"Forms","rows":["Contact 128 submissions","Survey 54 submissions","Waitlist 902 submissions"],"cta":"New form"},
  "mailpulse": {"title":"Subscribers","rows":["jane@x.com  Active","max@y.com  Active","lee@z.com  Unsubscribed"],"cta":"New campaign"},
  "timetrack": {"title":"Time entries","rows":["Client A  3h 12m","Client B  1h 45m","Client C  5h 02m"],"cta":"Start timer"},
  "pdfshift": {"title":"Recent files","rows":["contract.pdf  Merged","invoice.pdf  Compressed","report.pdf  Converted"],"cta":"New task"},
  "statuspage": {"title":"Monitors","rows":["api.acme.com  Up 99.98%","app.acme.com  Up 99.95%","cdn.acme.com  Degraded"],"cta":"Add monitor"},
  "chatwidget": {"title":"Conversations","rows":["Visitor 42  Unanswered","Visitor 41  Resolved","Visitor 40  Resolved"],"cta":"Open inbox"},
  "resumebuilder": {"title":"Resumes","rows":["Software Engineer  ATS ok","Product Manager  ATS ok","Designer  Draft"],"cta":"New resume"},
}

TPL = """import { Button, Card } from '@saas10/shared/ui';

const DATA = __DATA_JSON__;

export default function Dashboard() {
  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-slate-900">{DATA.title}</h1>
        <Button variant="primary">{DATA.cta}</Button>
      </div>
      <div className="mt-6 space-y-3">
        {DATA.rows.map((r, i) => (
          <Card key={i} className="flex items-center justify-between">
            <span className="text-sm text-slate-700">{r}</span>
            <Button variant="ghost" className="!px-3 !py-1 text-xs">Open</Button>
          </Card>
        ))}
      </div>
      <p className="mt-8 text-xs text-slate-400">
        Demo dashboard - wire to your database (Supabase/Postgres) and auth (NextAuth/Clerk) to go live.
      </p>
    </main>
  );
}
"""

root = "C:/Users/ansy0/projects/saas10/apps"
for app, d in dashboards.items():
    content = TPL.replace("__DATA_JSON__", json.dumps(d, indent=2))
    path = os.path.join(root, app, "app", "dashboard", "page.tsx")
    with open(path, "w", encoding="utf-8") as f:
        f.write(content)
    print("wrote", app)
print("DONE")
