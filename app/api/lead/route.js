import { NextResponse } from 'next/server';
import { addLead, buildLead, validateLead } from '@/lib/leads';

/**
 * Receives lead-form submissions and stores them for the dashboard.
 * Set LEAD_WEBHOOK_URL to also forward the JSON (Formspree, Make/Zapier, Slack, CRM).
 */
export async function POST(req) {
  let body;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Invalid JSON' }, { status: 400 });
  }

  const lead = buildLead(body, 'site');
  const fields = validateLead(lead);
  if (Object.keys(fields).length) {
    return NextResponse.json({ error: 'Missing or invalid fields', fields }, { status: 422 });
  }

  try {
    await addLead(lead);
  } catch (err) {
    console.error('[lead] could not store lead', err);
    return NextResponse.json({ error: 'Could not store lead' }, { status: 500 });
  }

  const webhook = process.env.LEAD_WEBHOOK_URL;
  if (!webhook) {
    console.info('[lead] stored', lead.id);
    return NextResponse.json({ ok: true, id: lead.id });
  }

  const res = await fetch(webhook, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify(lead),
  }).catch((err) => ({ ok: false, status: 0, err }));

  if (!res.ok) {
    console.error('[lead] stored but webhook failed', lead.id, res.status, res.err ?? '');
  }
  return NextResponse.json({ ok: true, id: lead.id });
}
