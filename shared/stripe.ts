// Stripe-ready checkout helper. Works without Supabase — uses email from the caller.
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
  app: string;
  email?: string;
  successUrl?: string;
  cancelUrl?: string;
}

// Calls your API route /api/checkout which returns the Gumroad product URL.
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
  const { url } = await res.json();
  if (!url) {
    alert('Payment not configured for this app yet.');
    return;
  }
  window.location.href = url;
}
