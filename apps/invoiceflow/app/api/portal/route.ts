import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';
import { createClient } from '../../../lib/supabase/server';
import { prisma } from '../../../lib/prisma';

const secret = process.env.STRIPE_SECRET_KEY!;

export async function POST(req: NextRequest) {
  const stripe = new Stripe(secret, { apiVersion: '2024-06-20' });
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const dbUser = await prisma.user.findUnique({ where: { id: user.id } });
  if (!dbUser?.stripeId) {
    return NextResponse.json({ error: 'No Stripe customer' }, { status: 400 });
  }
  const session = await stripe.billingPortal.sessions.create({
    customer: dbUser.stripeId,
    return_url: `${req.headers.get('origin')}/dashboard`,
  });
  return NextResponse.json({ url: session.url });
}
