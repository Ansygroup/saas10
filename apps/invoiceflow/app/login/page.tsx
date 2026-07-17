'use client';
import { useState } from 'react';
import { createClient } from '../../lib/supabase/client';
import { Button, Card } from '@saas10/shared/ui';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [msg, setMsg] = useState('');

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setMsg('');
    const supabase = createClient();
    if (mode === 'login') {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) return setMsg(error.message);
      window.location.href = '/dashboard';
    } else {
      const { error } = await supabase.auth.signUp({ email, password });
      if (error) return setMsg(error.message);
      setMsg('Check your email to confirm your account.');
    }
  }

  return (
    <main className="mx-auto flex max-w-md flex-col px-4 py-20">
      <h1 className="text-2xl font-bold text-slate-900">
        {mode === 'login' ? 'Welcome back' : 'Create your account'}
      </h1>
      <Card className="mt-6">
        <form onSubmit={submit} className="space-y-4">
          <input
            type="email"
            required
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <input
            type="password"
            required
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm"
          />
          <Button type="submit" variant="primary" className="w-full">
            {mode === 'login' ? 'Sign in' : 'Sign up'}
          </Button>
        </form>
        {msg && <p className="mt-3 text-sm text-slate-600">{msg}</p>}
        <button
          className="mt-4 text-sm text-indigo-600 hover:underline"
          onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
        >
          {mode === 'login' ? 'Need an account? Sign up' : 'Have an account? Sign in'}
        </button>
      </Card>
    </main>
  );
}
