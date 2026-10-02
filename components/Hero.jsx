import LeadForm from './LeadForm';

export default function Hero({ t, form }) {
  return (
    <section className="hero" id="hero">
      <canvas id="scene" aria-hidden="true" />
      <div className="hero__giant" aria-hidden="true">
        <span>PHOENIXTECHS</span>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy reveal">
          <h1 className="hero__title">
            <span className="line">{t.line1}</span>{' '}
            <span className="line">{t.line2}</span>
          </h1>
          <p className="hero__sub">{t.sub}</p>
        </div>

        <div className="hero__form-wrap reveal">
          <LeadForm variant="hero" t={form} {...t.form} />
        </div>
      </div>
    </section>
  );
}
