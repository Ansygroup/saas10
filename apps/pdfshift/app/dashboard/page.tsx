import { Button, Card } from '@saas10/shared/ui';

const DATA = {
  "title": "Recent files",
  "rows": [
    "contract.pdf  Merged",
    "invoice.pdf  Compressed",
    "report.pdf  Converted"
  ],
  "cta": "New task"
};

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
