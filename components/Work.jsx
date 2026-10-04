import { PRODUCTS } from './Mocks';

export default function Work({ t, lang }) {
  return (
    <section className="work" id="work">
      <div className="section work__inner">
        <div className="container work__head">
          <div>
            {t.eyebrow && <span className="eyebrow reveal"><i className="dot" /> {t.eyebrow}</span>}
            <h2 className="section__title reveal">
              {t.title[0]}<em>{t.title[1]}</em>{t.title[2]}
            </h2>
          </div>
          <div className="reveal">
            <p className="section__lede">{t.lede}</p>
            <a href={`/${lang}/projects`} className="btn btn--ghost btn--sm" style={{ marginTop: 20 }}>{t.viewAll} →</a>
          </div>
        </div>

        <div className="container">
          <div className="work__grid">
            {PRODUCTS.map(({ tint, Mock, name }, i) => {
              const { slug, text, metrics } = t.products[i];
              return (
                <article key={name} className="product reveal" style={{ '--tint': tint }}>
                  <div className="product__stage"><Mock /></div>
                  <div className="product__info">
                    <h3>{name}</h3>
                    <p>{text}</p>
                    <div className="product__metrics">
                      {metrics.map(([v, l]) => <div key={l}><strong>{v}</strong><small>{l}</small></div>)}
                    </div>
                    <a href={`/${lang}/projects/${slug}`} className="btn btn--ghost btn--sm product__link">{t.viewDetails} →</a>
                  </div>
                </article>
              );
            })}
            <article className="product product--cta reveal">
              <div>
                {t.cta.eyebrow && <span className="eyebrow"><i className="dot" /> {t.cta.eyebrow}</span>}
                <h3>{t.cta.title}</h3>
                <p>{t.cta.text}</p>
                <a href="#contact" className="btn btn--ember">{t.cta.button}</a>
                <a href={`/${lang}/projects`} className="btn btn--ghost" style={{ marginTop: 12 }}>{t.viewAll} →</a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
