// Shared UI components (React + Tailwind). Copy into each app or import via workspace.
'use client';
import React, { useState } from 'react';

export function Button({ children, variant = 'primary', className = '', ...props }: any) {
  const base = 'inline-flex items-center justify-center rounded-lg px-5 py-2.5 text-sm font-semibold transition';
  const styles: any = {
    primary: 'bg-indigo-600 text-white hover:bg-indigo-500',
    secondary: 'bg-slate-800 text-white hover:bg-slate-700',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-50',
    ghost: 'text-slate-600 hover:text-slate-900',
  };
  return (
    <button className={`${base} ${styles[variant] || styles.primary} ${className}`} {...props}>
      {children}
    </button>
  );
}

export function Card({ children, className = '' }: any) {
  return (
    <div className={`rounded-2xl border border-slate-200 bg-white p-6 shadow-sm ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ children, className = '' }: any) {
  return (
    <span className={`inline-block rounded-full bg-indigo-50 px-3 py-1 text-xs font-medium text-indigo-700 ${className}`}>
      {children}
    </span>
  );
}

export function Section({ children, className = '' }: any) {
  return <section className={`mx-auto max-w-6xl px-4 py-16 ${className}`}>{children}</section>;
}

export function Navbar({ brand, links }: any) {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4">
        <span className="text-lg font-bold text-slate-900">{brand}</span>
        <nav className="hidden gap-6 text-sm text-slate-600 md:flex">
          {links?.map((l: any) => (
            <a key={l.href} href={l.href} className="hover:text-slate-900">
              {l.label}
            </a>
          ))}
        </nav>
        <Button variant="primary" className="!px-4 !py-2">
          Get Started
        </Button>
      </div>
    </header>
  );
}

export function Footer({ brand }: any) {
  return (
    <footer className="border-t border-slate-200 bg-slate-50">
      <div className="mx-auto max-w-6xl px-4 py-8 text-sm text-slate-500">
        © {new Date().getFullYear()} {brand}. All rights reserved.
      </div>
    </footer>
  );
}

export function Hero({ eyebrow, title, subtitle, cta }: any) {
  return (
    <Section className="text-center">
      {eyebrow && <Badge>{eyebrow}</Badge>}
      <h1 className="mx-auto mt-4 max-w-3xl text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
        {title}
      </h1>
      <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-600">{subtitle}</p>
      <div className="mt-8 flex justify-center gap-3">{cta}</div>
    </Section>
  );
}

export function FeatureGrid({ features }: any) {
  return (
    <Section>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features?.map((f: any) => (
          <Card key={f.title}>
            <div className="text-2xl">{f.icon}</div>
            <h3 className="mt-3 text-lg font-semibold text-slate-900">{f.title}</h3>
            <p className="mt-2 text-sm text-slate-600">{f.desc}</p>
          </Card>
        ))}
      </div>
    </Section>
  );
}

// Email waitlist — no DB needed. Posts to Formspree/Getform via NEXT_PUBLIC_WAITLIST_URL.
export function Waitlist({ title = 'Join the waitlist', placeholder = 'you@email.com' }: any) {
  const [email, setEmail] = useState('');
  const [done, setDone] = useState(false);
  const url = process.env.NEXT_PUBLIC_WAITLIST_URL;
  async function submit(e: any) {
    e.preventDefault();
    if (!url) return setDone(true); // graceful if not configured
    await fetch(url, {
      method: 'POST',
      headers: { Accept: 'application/json' },
      body: JSON.stringify({ email }),
    });
    setDone(true);
  }
  if (done) return <p className="text-sm text-green-600">✓ You're on the list!</p>;
  return (
    <form onSubmit={submit} className="flex gap-2 max-w-md">
      <input
        type="email"
        required
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder={placeholder}
        className="flex-1 rounded-lg border border-slate-300 px-3 py-2 text-sm"
      />
      <Button type="submit">Notify me</Button>
    </form>
  );
}
