import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const secret = process.env.STRIPE_SECRET_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

// Stripe-only webhook: logs subscription events.
// (No DB dependency — pair with Stripe customer portal for management.)
export async function POST(req: NextRequest) {
  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' });
  const sig = req.headers.get('stripe-signature');
  const body = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig!, webhookSecret);
  } catch (err: any) {
    return NextResponse.json({ error: `Webhook Error: ${err.message}` }, { status: 400 });
  }

  switch (event.type) {
    case 'checkout.session.completed': {
      const s = event.data.object as Stripe.Checkout.Session;
      // customer is now active; Stripe dashboard shows subscription status.
      console.log('checkout completed', s.customer, s.customer_email);
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      console.log('subscription deleted', sub.customer);
      break;
    }
  }
  return NextResponse.json({ received: true });
}
