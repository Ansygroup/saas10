import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../lib/supabase/server';

const secret = process.env.STRIPE_SECRET_KEY;

// Creates a Stripe Checkout Session for the given Price ID.
// If the user is logged in, attaches their Stripe customer id.
export async function POST(req: NextRequest) {
  if (!secret) {
    return NextResponse.json(
      { message: 'STRIPE_SECRET_KEY not set. Configure .env.local.' },
      { status: 500 }
    );
  }
  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' });
  const { priceId } = await req.json();
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const origin = req.headers.get('origin') || 'http://localhost:3000';
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      customer_email: user?.email,
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/dashboard?welcome=1`,
      cancel_url: `${origin}/pricing`,
      metadata: { userId: user?.id ?? 'anon' },
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
