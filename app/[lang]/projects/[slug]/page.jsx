import { notFound } from 'next/navigation';
import Link from 'next/link';
import Nav from '@/components/Nav';
import Footer from '@/components/Footer';
import { locales, getDictionary, hasLocale, projectSlugs, getProjectBySlug } from '@/lib/i18n';

const PRODUCT_TINTS = [
  '255, 92, 54',
  '255, 170, 70',
  '120, 150, 255',
  '200, 90, 255',
];

const PRODUCT_NAMES = ['Ledgerly', 'Souq Go', 'Clinic OS', 'Atlas AI'];

export const dynamicParams = false;
export function generateStaticParams() {
  return locales.flatMap((lang) =>
    projectSlugs.map((slug) => ({ lang, slug })),
  );
}

export async function generateMetadata({ params }) {
  const { lang, slug } = await params;
  const t = getDictionary(lang);
  const project = getProjectBySlug(lang, slug);
  if (!project) return {};
  return {
    title: `${PRODUCT_NAMES[project.index]} — PhoenixTechs`,
    description: project.detail.hero,
  };
}

export default async function ProjectDetailPage({ params }) {
  const { lang, slug } = await params;
  if (!hasLocale(lang)) notFound();
  const t = getDictionary(lang);
  const project = getProjectBySlug(lang, slug);
  if (!project) notFound();

  const { index, detail } = project;
  const tint = PRODUCT_TINTS[index];
  const name = PRODUCT_NAMES[index];
  const nextIndex = (index + 1) % t.work.products.length;
  const nextProduct = t.work.products[nextIndex];

  return (
    <>
      <div className="grain" aria-hidden="true" />
      <Nav t={t.nav} lang={lang} />
      <main id="top">
        <article className="project-detail" style={{ '--tint': tint }}>
          {/* Hero */}
          <div className="project-hero">
            <div className="container">
              <Link href={`/${lang}/projects`} className="projects-back">← {t.projects.backToProjects}</Link>
              <h1 className="project-hero__title" style={{ marginTop: 24 }}>{name}</h1>
              <p className="project-hero__lede">{detail.hero}</p>
              <div className="project-hero__metrics">
                {detail.metrics.map(([v, l]) => (
                  <div key={l} className="project-hero__metric">
                    <strong>{v}</strong>
                    <small>{l}</small>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="container">
            <div className="project-body">
              <section className="project-section">
                <h2>{t.projects.challenge}</h2>
                <p>{detail.challenge}</p>
              </section>
              <section className="project-section">
                <h2>{t.projects.solution}</h2>
                <p>{detail.solution}</p>
              </section>
              <section className="project-section">
                <h2>{t.projects.results}</h2>
                <p>{detail.results}</p>
              </section>

              <div className="project-aside">
                <div className="project-aside__block">
                  <h3>{t.projects.techStack}</h3>
                  <div className="project-stack">
                    {detail.stack.map((tech) => <span key={tech}>{tech}</span>)}
                  </div>
                </div>
                <div className="project-aside__block">
                  <h3>{t.projects.timeline}</h3>
                  <p>{detail.timeline}</p>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="project-cta card-glass">
              <h2>{t.projects.ctaTitle}</h2>
              <p>{t.projects.ctaText}</p>
              <a href={`/${lang}#contact`} className="btn btn--ember">{t.projects.ctaButton}</a>
            </div>

            {/* Next project */}
            <div className="project-next">
              <span className="project-next__label">{t.projects.nextProject}</span>
              <Link
                href={`/${lang}/projects/${nextProduct.slug}`}
                className="project-next__link"
                style={{ '--tint': PRODUCT_TINTS[nextIndex] }}
              >
                <div>
                  <h3>{PRODUCT_NAMES[nextIndex]}</h3>
                  <p>{nextProduct.text}</p>
                </div>
                <span className="project-next__arrow">→</span>
              </Link>
            </div>
          </div>
        </article>
      </main>
      <Footer t={t.footer} />
    </>
  );
}
