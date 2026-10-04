import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { getDictionary, hasLocale } from '@/lib/i18n';

const PRODUCT_TINTS = [
  '255, 92, 54',
  '255, 170, 70',
  '120, 150, 255',
  '200, 90, 255',
];

const PRODUCT_NAMES = ['Ledgerly', 'Souq Go', 'Clinic OS', 'Atlas AI'];

export async function generateMetadata({ params }) {
  const { lang } = await params;
  const t = getDictionary(lang);
  return {
    title: `${t.projects.title.join('')} — PhoenixTechs`,
    description: t.projects.lede,
  };
}

export default async function ProjectsPage({ params }) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav t={t.nav} lang={lang} />
      <main id="top">
        <section className="projects-page section">
          <div className="container">
            <Link href={`/${lang}`} className="projects-back">← {t.projects.backHome}</Link>
            <div className="section__head">
              <h1 className="section__title">
                {t.projects.title[0]}<em>{t.projects.title[1]}</em>{t.projects.title[2]}
              </h1>
              <p className="section__lede">{t.projects.lede}</p>
            </div>
            <div className="projects-grid">
              {t.work.products.map((product, i) => (
                <Link
                  key={product.slug}
                  href={`/${lang}/projects/${product.slug}`}
                  className="project-card"
                  style={{ '--tint': PRODUCT_TINTS[i] }}
                >
                  <div className="project-card__top">
                    <h2>{PRODUCT_NAMES[i]}</h2>
                    <p>{product.detail.hero}</p>
                  </div>
                  <div className="project-card__metrics">
                    {product.metrics.map(([v, l]) => (
                      <div key={l}><strong>{v}</strong><small>{l}</small></div>
                    ))}
                  </div>
                  <span className="project-card__arrow">{t.work.viewDetails} →</span>
                </Link>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer t={t.footer} />
    </>
  );
}
