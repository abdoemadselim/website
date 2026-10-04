import { NextResponse } from 'next/server';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const clip = (v, n = 2000) => (typeof v === 'string' ? v.trim().slice(0, n) : '');

/**
 * Receives lead-form submissions.
 * Set LEAD_WEBHOOK_URL (Formspree, Make/Zapier, Slack, HubSpot proxy, ...) to forward
 * leads as JSON. Without it, leads are logged to the server console.
 */
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const lead = {
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    company: clip(body.company, 160),
    service: clip(body.service, 80),
    message: clip(body.message),
    source: clip(body.source, 40),
    page: clip(body.page, 300),
    receivedAt: new Date().toISOString(),
  };

  if (!lead.name || !EMAIL_RE.test(lead.email) || !lead.phone || !lead.service) {
    return NextResponse.json({ error: 'Missing or invalid fields' }, { status: 422 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.info('[lead] LEAD_WEBHOOK_URL not set, logging lead:', lead);
    return NextResponse.json({ ok: true });
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(lead),
  }).catch((err) => ({ ok: false, status: 0, err }));

  if (!res.ok) {
    console.error('[lead] webhook failed', res.status, res.err ?? '');
    return NextResponse.json({ error: 'Could not deliver lead' }, { status: 502 });
  }
  return NextResponse.json({ ok: true });
}
