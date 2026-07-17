'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '../../../lib/supabase/client';
import { Button, Card } from '@saas10/shared/ui';

export default function NewInvoice() {
  const router = useRouter();
  const [client, setClient] = useState('');
  const [amount, setAmount] = useState('');
  const [msg, setMsg] = useState('');

  async function save() {
    setMsg('');
    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return router.push('/login');

    const res = await fetch('/api/invoices', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        client,
        amount: Math.round(parseFloat(amount) * 100),
      }),
    });
    if (!res.ok) {
      const e = await res.json();
      return setMsg(e.error || 'Failed');
    }
    router.push('/dashboard');
  }

  return (
    <main className="mx-auto max-w-md px-4 py-10">
      <h1 className="text-2xl font-bold text-slate-900">New invoice</h1>
      <Card className="mt-6 space-y-4">
        <input
          placeholder="Client name"
          value={client}
          onChange={(e) => setClient(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <input
          type="number"
          placeholder="Amount (USD)"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
        />
        <Button variant="primary" className="w-full" onClick={save}>
          Save invoice
        </Button>
        {msg && <p className="text-sm text-red-600">{msg}</p>}
      </Card>
    </main>
  );
}
