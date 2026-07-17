'use client';
import { DEMO_PLANS, formatPrice, startCheckout } from '@saas10/shared';
import { Button, Card } from '@saas10/shared/ui';

export function Pricing({ brand = 'App' }: { brand?: string }) {
  return (
    <section className="mx-auto max-w-6xl px-4 py-16">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-slate-900">Simple, transparent pricing</h2>
        <p className="mt-2 text-slate-600">Start free. Upgrade when you grow.</p>
      </div>
      <div className="mt-10 grid gap-6 lg:grid-cols-3">
        {DEMO_PLANS.map((plan) => (
          <Card
            key={plan.id}
            className={`flex flex-col ${plan.highlighted ? 'ring-2 ring-indigo-500' : ''}`}
          >
            {plan.highlighted && (
              <span className="mb-3 inline-block w-fit rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                Most Popular
              </span>
            )}
            <h3 className="text-lg font-semibold text-slate-900">{plan.name}</h3>
            <p className="mt-2 text-3xl font-bold text-slate-900">
              {formatPrice(plan.price)}
              <span className="text-sm font-normal text-slate-500">/{plan.interval}</span>
            </p>
            <ul className="mt-4 flex-1 space-y-2 text-sm text-slate-600">
              {plan.features.map((f) => (
                <li key={f} className="flex items-center gap-2">
                  <span className="text-indigo-600">✓</span>
                  {f}
                </li>
              ))}
            </ul>
            <Button
              variant={plan.highlighted ? 'primary' : 'outline'}
              className="mt-6 w-full"
              onClick={() => {
                if (plan.price === 0) {
                  alert('Free plan — no payment required. Sign up to start!');
                  return;
                }
                startCheckout({ app: 'pdfshift' }).catch((e) =>
                  alert(e.message)
                );
              }}
            >
              {plan.price === 0 ? 'Get Started Free' : `Choose ${plan.name}`}
            </Button>
          </Card>
        ))}
      </div>
      <p className="mt-6 text-center text-xs text-slate-400">
        Demo mode: add Stripe keys in .env.local to enable live payments for {brand}.
      </p>
    </section>
  );
}
