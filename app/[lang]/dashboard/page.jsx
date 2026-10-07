import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import DashboardLogin from '@/components/dashboard/DashboardLogin';
import LeadsDashboard from '@/components/dashboard/LeadsDashboard';
import { isDashboardAuthed } from '@/lib/dashboard-auth';
import { getDictionary, hasLocale } from '@/lib/i18n';
import { listLeads } from '@/lib/leads';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Leads · PhoenixTechs',
  robots: { index: false, follow: false },
};

export default async function DashboardPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const password = process.env.DASHBOARD_PASSWORD || '';
  const jar = await cookies();
  const locked = Boolean(password) && !isDashboardAuthed(jar.get('dashboard_auth')?.value, password);

  const leads = locked ? [] : [...(await listLeads())].reverse();
  const services = getDictionary('en').form.services;

  return (
    <div className="dashboard min-h-svh bg-background text-foreground" dir="ltr">
      {locked
        ? <DashboardLogin lang={lang} />
        : <LeadsDashboard lang={lang} leads={leads} services={services} />}
    </div>
  );
}
