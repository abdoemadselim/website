import { notFound } from 'next/navigation';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Services from '@/components/Services';
import Work from '@/components/Work';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Experience from '@/components/Experience';
import { getDictionary, hasLocale } from '@/lib/i18n';

export default async function Home({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav t={t.nav} lang={lang} />
      <main id="top">
        <Hero t={t.hero} form={t.form} />
        <Services t={t.services} />
        <Work t={t.work} />
        <Contact t={t.contact} form={t.form} />
      </main>
      <Footer t={t.footer} />
      <Experience />
    </>
  );
}
