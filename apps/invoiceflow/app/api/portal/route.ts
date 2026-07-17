import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const secret = process.env.STRIPE_SECRET_KEY!;

// Stripe-only billing portal: customer identified by email in request body.
export async function POST(req: NextRequest) {
  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' });
  const { email } = await req.json().catch(() => ({ email: null }));
  if (!email) return NextResponse.json({ error: 'email required' }, { status: 400 });

  // find or create customer
  const customers = await stripe.customers.list({ email, limit: 1 });
  let customer = customers.data[0];
  if (!customer) {
    customer = await stripe.customers.create({ email });
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    return_url: `${req.headers.get('origin')}/dashboard`,
  });
  return NextResponse.json({ url: session.url });
}
