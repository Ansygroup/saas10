import { NextRequest, NextResponse } from 'next/server';

// Gumroad-only checkout: redirects to the product's Gumroad purchase URL.
// Map app slug -> Gumroad product permalink (set in env or config).
const GUMROAD_LINKS: Record<string, string> = {
  invoiceflow: process.env.GUMROAD_INVOICEFLOW_URL || '',
  linktrack: process.env.GUMROAD_LINKTRACK_URL || '',
  chatwidget: process.env.GUMROAD_CHATWIDGET_URL || '',
  formcraft: process.env.GUMROAD_FORMCRAFT_URL || '',
  mailpulse: process.env.GUMROAD_MAILPULSE_URL || '',
  snippetvault: process.env.GUMROAD_SNIPPETVAULT_URL || '',
  timetrack: process.env.GUMROAD_TIMETRACK_URL || '',
  resumebuilder: process.env.GUMROAD_RESUMEBUILDER_URL || '',
  statuspage: process.env.GUMROAD_STATUSPAGE_URL || '',
  pdfshift: process.env.GUMROAD_PDFSHIFT_URL || '',
};

export async function POST(req: NextRequest) {
  const { app } = await req.json().catch(() => ({ app: null }));
  const url = app ? GUMROAD_LINKS[app] : null;
  if (!url) {
    return NextResponse.json(
      { message: 'Gumroad product URL not configured for this app.' },
      { status: 500 }
    );
  }
  return NextResponse.json({ url });
}
