import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '../../../lib/supabase/server';
import { prisma } from '../../../lib/prisma';

export async function POST(req: NextRequest) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });

  const { client, amount } = await req.json();
  if (!client || !amount) {
    return NextResponse.json({ error: 'client and amount required' }, { status: 400 });
  }

  const count = await prisma.invoice.count({
    where: { user: { email: user.email! } },
  });
  const invoice = await prisma.invoice.create({
    data: {
      userId: (
        await prisma.user.upsert({
          where: { email: user.email! },
          update: {},
          create: { email: user.email!, name: user.user_metadata?.name ?? null },
          select: { id: true },
        })
      ).id,
      number: `INV-${String(count + 1).padStart(4, '0')}`,
      client,
      amount: Number(amount),
      status: 'sent',
    },
  });
  return NextResponse.json({ id: invoice.id });
}
