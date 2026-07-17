export interface Plan {
  id: string;
  name: string;
  price: number; // in cents
  interval: 'month' | 'year';
  features: string[];
  stripePriceId: string; // set your real Stripe Price ID here
  highlighted?: boolean;
}

// DEMO plans — replace stripePriceId with real ones from your Stripe dashboard.
export const DEMO_PLANS: Plan[] = [
  {
    id: 'free',
    name: 'Free',
    price: 0,
    interval: 'month',
    features: ['1 project', 'Community support', 'Basic features'],
    stripePriceId: '',
  },
  {
    id: 'pro',
    name: 'Pro',
    price: 1900,
    interval: 'month',
    features: ['Unlimited projects', 'Priority support', 'Advanced features', 'API access'],
    stripePriceId: 'price_DEMO_PRO',
    highlighted: true,
  },
  {
    id: 'team',
    name: 'Team',
    price: 4900,
    interval: 'month',
    features: ['Everything in Pro', 'Team members', 'Admin panel', 'SSO'],
    stripePriceId: 'price_DEMO_TEAM',
  },
];

export function formatPrice(cents: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(cents / 100);
}
