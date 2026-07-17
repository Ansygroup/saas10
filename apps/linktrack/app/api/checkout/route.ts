import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const secret = process.env.STRIPE_SECRET_KEY;

export async function POST(req: NextRequest) {
  if (!secret) {
    return NextResponse.json(
      { message: 'STRIPE_SECRET_KEY not set. Configure .env.local to enable real payments.' },
      { status: 500 }
    );
  }
  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' });
  const { priceId } = await req.json();

  const origin = req.headers.get('origin') || 'http://localhost:3000';
  try {
    const session = await stripe.checkout.sessions.create({
      mode: 'subscription',
      line_items: [{ price: priceId, quantity: 1 }],
      success_url: `${origin}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/pricing`,
    });
    return NextResponse.json({ sessionId: session.id });
  } catch (err: any) {
    return NextResponse.json({ message: err.message }, { status: 400 });
  }
}
