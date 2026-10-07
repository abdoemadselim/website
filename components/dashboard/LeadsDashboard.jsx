'use client';

import { useMemo, useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { PlusIcon, RefreshCwIcon } from 'lucide-react';
import Logo from '@/components/Logo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Textarea } from '@/components/ui/textarea';

const SOURCE_LABEL = {
  hero: 'Homepage',
  'get-started': 'Get started',
  dashboard: 'Dashboard',
  site: 'Site',
};

const EMPTY_FORM = {
  name: '',
  email: '',
  phone: '',
  company: '',
  service: '',
  message: '',
};

function startOfToday() {
  const d = new Date();
  d.setHours(0, 0, 0, 0);
  return d;
}

function formatWhen(iso) {
  const date = new Date(iso);
  if (Number.isNaN(date.getTime())) return '—';
  return new Intl.DateTimeFormat('en', {
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
  }).format(date);
}

function sourceLabel(source) {
  return SOURCE_LABEL[source] || source || 'Site';
}

function Field({ id, label, error, children }) {
  return (
    <div className="grid gap-1.5">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}

export default function LeadsDashboard({ lang, leads, services }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [query, setQuery] = useState('');
  const [service, setService] = useState('all');
  const [creating, setCreating] = useState(false);
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [formError, setFormError] = useState('');
  const [saving, setSaving] = useState(false);
  const [active, setActive] = useState(null);

  const serviceOptions = useMemo(() => {
    const seen = new Set(services);
    for (const lead of leads) if (lead.service) seen.add(lead.service);
    return [...seen];
  }, [leads, services]);

  const shown = useMemo(() => {
    const q = query.trim().toLowerCase();
    const digits = q.replace(/\D/g, '');
    return leads.filter((lead) => {
      if (service !== 'all' && lead.service !== service) return false;
      if (!q) return true;
      const hay = [lead.name, lead.email, lead.phone, lead.company, lead.service, lead.message]
        .join(' ')
        .toLowerCase();
      if (hay.includes(q)) return true;
      return digits.length >= 3 && (lead.phone || '').replace(/\D/g, '').includes(digits);
    });
  }, [leads, query, service]);

  const stats = useMemo(() => {
    const today = startOfToday().getTime();
    const week = today - 6 * 24 * 60 * 60 * 1000;
    let todayCount = 0;
    let weekCount = 0;
    for (const lead of leads) {
      const t = new Date(lead.receivedAt).getTime();
      if (t >= today) todayCount += 1;
      if (t >= week) weekCount += 1;
    }
    return [
      { label: 'Total', value: leads.length },
      { label: 'Today', value: todayCount },
      { label: 'Last 7 days', value: weekCount },
    ];
  }, [leads]);

  function refresh() {
    startTransition(() => router.refresh());
  }

  function openCreate() {
    setForm(EMPTY_FORM);
    setErrors({});
    setFormError('');
    setCreating(true);
  }

  function setField(name, value) {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => {
      if (!prev[name]) return prev;
      const next = { ...prev };
      delete next[name];
      return next;
    });
  }

  async function onCreate(e) {
    e.preventDefault();
    setSaving(true);
    setFormError('');
    try {
      const res = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, source: 'dashboard', page: location.href }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setErrors(data.fields || {});
        setFormError(data.fields ? 'Check the highlighted fields.' : (data.error || 'Could not save this lead.'));
        return;
      }
      setCreating(false);
      refresh();
    } catch {
      setFormError('Could not save this lead.');
    } finally {
      setSaving(false);
    }
  }

  const filtering = query.trim() !== '' || service !== 'all';
  const countLabel = filtering ? `${shown.length} of ${leads.length}` : `${leads.length} lead${leads.length === 1 ? '' : 's'}`;

  return (
    <div className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-4 py-6 sm:px-6 sm:py-8">
      <header className="flex flex-wrap items-center gap-4">
        <Logo href={`/${lang}`} className="block w-28 text-foreground [&_svg]:h-auto [&_svg]:w-full" />
        <div className="min-w-0 flex-1">
          <h1 className="m-0 text-2xl font-semibold tracking-tight">Leads</h1>
          <p className="m-0 text-sm text-muted-foreground">Submissions from the site, in one table.</p>
        </div>
        <div className="flex gap-2">
          <Button type="button" variant="outline" className="h-11" onClick={refresh} disabled={pending} aria-label="Refresh leads">
            <RefreshCwIcon className={pending ? 'animate-spin' : ''} />
            <span className="hidden sm:inline">Refresh</span>
          </Button>
          <Button type="button" className="h-11" onClick={openCreate}>
            <PlusIcon />
            New lead
          </Button>
        </div>
      </header>

      <section className="grid grid-cols-3 gap-3" aria-label="Lead totals">
        {stats.map((stat) => (
          <Card key={stat.label} size="sm">
            <CardHeader>
              <CardDescription>{stat.label}</CardDescription>
              <CardTitle className="text-2xl tabular-nums">{stat.value}</CardTitle>
            </CardHeader>
          </Card>
        ))}
      </section>

      <Card>
        <CardHeader className="border-b">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="grid flex-1 gap-1.5">
              <Label htmlFor="lead-search" className="sr-only">Search leads</Label>
              <Input
                id="lead-search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search name, email, phone, company"
                className="h-11"
              />
            </div>
            <div className="grid gap-1.5">
              <Label className="sr-only" id="service-filter-label">Filter by solution</Label>
              <Select value={service} onValueChange={setService}>
                <SelectTrigger className="h-11 w-full sm:w-56" aria-labelledby="service-filter-label">
                  <SelectValue>
                    {(value) => (value && value !== 'all' ? value : 'All solutions')}
                  </SelectValue>
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All solutions</SelectItem>
                  {serviceOptions.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-0">
          <p className="px-4 pb-3 text-sm text-muted-foreground">{countLabel}</p>
          {shown.length === 0 ? (
            <div className="grid justify-items-center gap-3 px-6 py-16 text-center">
              <h2 className="m-0 text-lg font-medium">{leads.length === 0 ? 'No leads yet' : 'No matching leads'}</h2>
              <p className="m-0 max-w-sm text-sm text-muted-foreground">
                {leads.length === 0
                  ? 'When someone sends the form on the site, or you add one here, it shows up in this table.'
                  : 'Try a different name, email, or solution.'}
              </p>
              {leads.length === 0 && (
                <Button type="button" className="h-11" onClick={openCreate}>
                  <PlusIcon />
                  New lead
                </Button>
              )}
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead className="hidden sm:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">Phone</TableHead>
                  <TableHead className="hidden lg:table-cell">Company</TableHead>
                  <TableHead>Solution</TableHead>
                  <TableHead className="hidden xl:table-cell">From</TableHead>
                  <TableHead className="text-right">Received</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shown.map((lead) => (
                  <TableRow
                    key={lead.id}
                    tabIndex={0}
                    className="cursor-pointer"
                    onClick={() => setActive(lead)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActive(lead);
                      }
                    }}
                  >
                    <TableCell className="font-medium">{lead.name}</TableCell>
                    <TableCell className="hidden max-w-[220px] truncate sm:table-cell">
                      <a
                        href={`mailto:${lead.email}`}
                        className="text-foreground no-underline underline-offset-2 hover:underline"
                        onClick={(e) => e.stopPropagation()}
                      >
                        {lead.email}
                      </a>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <a className="text-foreground no-underline underline-offset-2 hover:underline" href={`tel:${lead.phone}`} onClick={(e) => e.stopPropagation()}>{lead.phone}</a>
                    </TableCell>
                    <TableCell className="hidden max-w-[180px] truncate lg:table-cell">{lead.company || '—'}</TableCell>
                    <TableCell className="max-w-[160px] truncate">{lead.service}</TableCell>
                    <TableCell className="hidden xl:table-cell">
                      <Badge variant={lead.source === 'dashboard' ? 'default' : 'secondary'}>{sourceLabel(lead.source)}</Badge>
                    </TableCell>
                    <TableCell className="text-right whitespace-nowrap text-muted-foreground">{formatWhen(lead.receivedAt)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>

      <Dialog open={creating} onOpenChange={setCreating}>
        <DialogContent className="sm:max-w-lg" dir="ltr">
          <DialogHeader>
            <DialogTitle>New lead</DialogTitle>
            <DialogDescription>Saved with the submissions that come in from the site.</DialogDescription>
          </DialogHeader>
          <form onSubmit={onCreate} className="grid gap-3" noValidate>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="lead-name" label="Full name" error={errors.name}>
                <Input id="lead-name" className="h-11" value={form.name} onChange={(e) => setField('name', e.target.value)} autoComplete="name" aria-invalid={!!errors.name} required />
              </Field>
              <Field id="lead-email" label="Work email" error={errors.email}>
                <Input id="lead-email" type="email" className="h-11" value={form.email} onChange={(e) => setField('email', e.target.value)} autoComplete="email" aria-invalid={!!errors.email} required />
              </Field>
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <Field id="lead-phone" label="Phone" error={errors.phone}>
                <Input id="lead-phone" type="tel" className="h-11" value={form.phone} onChange={(e) => setField('phone', e.target.value)} autoComplete="tel" placeholder="+971 50 123 4567" aria-invalid={!!errors.phone} required />
              </Field>
              <Field id="lead-company" label="Company" error={errors.company}>
                <Input id="lead-company" className="h-11" value={form.company} onChange={(e) => setField('company', e.target.value)} autoComplete="organization" />
              </Field>
            </div>
            <Field id="lead-service" label="Solution" error={errors.service}>
              <Select value={form.service || null} onValueChange={(value) => setField('service', value || '')}>
                <SelectTrigger id="lead-service" className="h-11 w-full" aria-invalid={!!errors.service}>
                  <SelectValue placeholder="Select a solution" />
                </SelectTrigger>
                <SelectContent>
                  {services.map((option) => (
                    <SelectItem key={option} value={option}>{option}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
            <Field id="lead-message" label="About the project" error={errors.message}>
              <Textarea id="lead-message" value={form.message} onChange={(e) => setField('message', e.target.value)} rows={3} placeholder="What are they building?" />
            </Field>
            {formError && <p className="text-sm text-destructive" role="alert">{formError}</p>}
            <DialogFooter>
              <Button type="button" variant="outline" className="h-11" onClick={() => setCreating(false)} disabled={saving}>Cancel</Button>
              <Button type="submit" className="h-11" disabled={saving}>{saving ? 'Saving…' : 'Save lead'}</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog open={!!active} onOpenChange={(open) => { if (!open) setActive(null); }}>
        <DialogContent className="sm:max-w-lg" dir="ltr">
          {active && (
            <>
              <DialogHeader>
                <DialogTitle>{active.name}</DialogTitle>
                <DialogDescription>{sourceLabel(active.source)} · {formatWhen(active.receivedAt)}</DialogDescription>
              </DialogHeader>
              <dl className="grid gap-3 text-sm">
                <Detail label="Email"><a className="text-foreground underline underline-offset-2" href={`mailto:${active.email}`}>{active.email}</a></Detail>
                <Detail label="Phone"><a className="text-foreground underline underline-offset-2" href={`tel:${active.phone}`}>{active.phone}</a></Detail>
                <Detail label="Company">{active.company || '—'}</Detail>
                <Detail label="Solution">{active.service}</Detail>
                <Detail label="Message">{active.message || '—'}</Detail>
                {active.page && (
                  <Detail label="Page">
                    <a className="break-all text-foreground underline underline-offset-2" href={active.page}>{active.page}</a>
                  </Detail>
                )}
              </dl>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

function Detail({ label, children }) {
  return (
    <div className="grid gap-0.5">
      <dt className="text-xs font-medium text-muted-foreground">{label}</dt>
      <dd className="m-0 whitespace-pre-wrap">{children}</dd>
    </div>
  );
}
