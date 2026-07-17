// Stripe-ready checkout helper. Uses test mode by default.
// Set NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY and STRIPE_SECRET_KEY in .env.local.
import { loadStripe, Stripe } from '@stripe/stripe-js';

let stripePromise: Promise<Stripe | null> | null = null;

export function getStripe(): Promise<Stripe | null> {
  if (!stripePromise) {
    const key = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY;
    if (!key) {
      console.warn('NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY is not set — running in demo mode.');
      return Promise.resolve(null);
    }
    stripePromise = loadStripe(key);
  }
  return stripePromise;
}

export interface CheckoutPayload {
  priceId: string;
  successUrl?: string;
  cancelUrl?: string;
}

// Calls your API route /api/checkout to create a Stripe Checkout Session.
export async function startCheckout(payload: CheckoutPayload): Promise<void> {
  const res = await fetch('/api/checkout', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.message || 'Checkout failed');
  }
  const { sessionId } = await res.json();
  const stripe = await getStripe();
  if (!stripe) {
    alert('Stripe is not configured. Add your keys to .env.local to enable real payments.');
    return;
  }
  await stripe.redirectToCheckout({ sessionId });
}
