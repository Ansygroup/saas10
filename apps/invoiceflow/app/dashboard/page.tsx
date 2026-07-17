import { createClient } from '../../lib/supabase/server';
import { prisma } from '../../lib/prisma';
import { Button, Card } from '@saas10/shared/ui';
import Link from 'next/link';

export const dynamic = 'force-dynamic';

export default async function Dashboard() {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return null; // middleware redirects to /login

  // Upsert local user row so webhooks can find them.
  await prisma.user.upsert({
    where: { email: user.email! },
    update: {},
    create: { email: user.email!, name: user.user_metadata?.name ?? null },
  });

  const invoices = await prisma.invoice.findMany({
    where: { user: { email: user.email! } },
    orderBy: { createdAt: 'desc' },
    take: 50,
  });

  return (
    <main className="mx-auto max-w-5xl px-4 py-10">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Invoices</h1>
          <p className="text-sm text-slate-500">{user.email}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/new">
            <Button variant="primary">New invoice</Button>
          </Link>
          <form action="/api/portal" method="post">
            <Button variant="outline" type="submit">
              Manage plan
            </Button>
          </form>
        </div>
      </div>

      <div className="mt-6 space-y-3">
        {invoices.length === 0 && (
          <p className="text-sm text-slate-400">No invoices yet. Create your first one.</p>
        )}
        {invoices.map((inv: { id: string; number: string; client: string; amount: number; status: string }) => (
          <Card key={inv.id} className="flex items-center justify-between">
            <span className="text-sm text-slate-700">
              #{inv.number} · {inv.client} · ${(inv.amount / 100).toFixed(2)} ·{' '}
              <span className="capitalize text-slate-500">{inv.status}</span>
            </span>
            <Link href={`/dashboard/${inv.id}`}>
              <Button variant="ghost" className="!px-3 !py-1 text-xs">
                Open
              </Button>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
