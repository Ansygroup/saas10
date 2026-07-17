import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { prisma } from '../../../lib/prisma';

const secret = process.env.STRIPE_SECRET_KEY!;
const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

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
      const userId = s.metadata?.userId;
      const customer = s.customer as string;
      if (userId && userId !== 'anon') {
        await prisma.user.update({
          where: { id: userId },
          data: { stripeId: customer, plan: 'pro' },
        });
      }
      break;
    }
    case 'customer.subscription.deleted': {
      const sub = event.data.object as Stripe.Subscription;
      const cust = sub.customer as string;
      const u = await prisma.user.findFirst({ where: { stripeId: cust } });
      if (u) await prisma.user.update({ where: { id: u.id }, data: { plan: 'free' } });
      break;
    }
  }
  return NextResponse.json({ received: true });
}
