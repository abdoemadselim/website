import { randomUUID } from 'node:crypto';
import { mkdir, readFile, rename, writeFile } from 'node:fs/promises';
import path from 'node:path';

const FILE = path.join(process.cwd(), 'data', 'leads.json');
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const clip = (value, max = 2000) => (typeof value === 'string' ? value.trim().slice(0, max) : '');

let queue = Promise.resolve();

function withLock(fn) {
  const run = queue.then(fn, fn);
  queue = run.then(() => {}, () => {});
  return run;
}

export async function listLeads() {
  try {
    const raw = await readFile(FILE, 'utf8');
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data : [];
  } catch (err) {
    if (err && err.code === 'ENOENT') return [];
    throw err;
  }
}

export function buildLead(body, fallbackSource = 'dashboard') {
  return {
    id: randomUUID(),
    name: clip(body.name, 120),
    email: clip(body.email, 200),
    phone: clip(body.phone, 40),
    company: clip(body.company, 160),
    service: clip(body.service, 80),
    message: clip(body.message),
    source: clip(body.source, 40) || fallbackSource,
    page: clip(body.page, 300),
    receivedAt: new Date().toISOString(),
  };
}

/** Field-level errors. Empty object means the lead can be stored. */
export function validateLead(lead) {
  const fields = {};
  if (!lead.name) fields.name = 'Name is required';
  if (!lead.email) fields.email = 'Email is required';
  else if (!EMAIL_RE.test(lead.email)) fields.email = 'Enter a valid email';
  if (!lead.phone) fields.phone = 'Phone is required';
  else if (lead.phone.replace(/\D/g, '').length < 7) fields.phone = 'Enter a valid phone number';
  if (!lead.service) fields.service = 'Choose a solution';
  return fields;
}

export function addLead(lead) {
  return withLock(async () => {
    const leads = await listLeads();
    leads.push(lead);
    await mkdir(path.dirname(FILE), { recursive: true });
    const tmp = `${FILE}.${process.pid}.tmp`;
    await writeFile(tmp, `${JSON.stringify(leads, null, 2)}\n`);
    await rename(tmp, FILE);
    return lead;
  });
}
