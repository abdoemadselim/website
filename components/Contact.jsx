import LeadForm from './LeadForm';

export default function Contact({ t, form }) {
  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__copy">
          {t.eyebrow && <span className="eyebrow reveal"><i className="dot" /> {t.eyebrow}</span>}
          <h2 className="section__title reveal">
            {t.title[0]}<em>{t.title[1]}</em>{t.title[2]}
          </h2>
          <p className="section__lede reveal">{t.lede}</p>
          <ul className="checklist">
            {t.points.map(([title, text]) => (
              <li key={title} className="reveal"><i /><div><strong>{title}</strong>{text}</div></li>
            ))}
          </ul>
        </div>

        <div className="contact__form-wrap reveal">
          <LeadForm variant="full" t={form} {...t.form} />
        </div>
      </div>
    </section>
  );
}
