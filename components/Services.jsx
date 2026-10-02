
const ICONS = {
  web: <><rect x="3" y="4" width="18" height="14" rx="2.5" /><path d="M3 8.5h18M7 13h4M7 15.5h7" /><path d="M8 21h8" /></>,
  mobile: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></>,
  ai: <><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /><path d="M18.5 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" /></>,
  design: <><path d="M4 20l4.5-1 10-10a2.1 2.1 0 00-3-3l-10 10z" /><path d="M14 7.5l2.5 2.5" /></>,
  commerce: <><path d="M4 5h2l2.2 10.2a1.5 1.5 0 001.5 1.2h7.6a1.5 1.5 0 001.5-1.1L20.5 9H7" /><circle cx="10" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></>,
  cloud: <><path d="M7 18a4.5 4.5 0 01-.6-9A6 6 0 0118 8.5a4.8 4.8 0 01-.5 9.5z" /><path d="M12 11v5M9.8 13.2L12 11l2.2 2.2" /></>,
};

const SERVICES = [
  { icon: 'web', wide: true },
  { icon: 'mobile' },
  { icon: 'ai' },
  { icon: 'design' },
  { icon: 'commerce' },
  { icon: 'cloud' },
];

export default function Services({ t }) {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section__head">
          {t.eyebrow && <span className="eyebrow reveal"><i className="dot" /> {t.eyebrow}</span>}
          <h2 className="section__title reveal">
            {t.title[0]}<em>{t.title[1]}</em>{t.title[2]}
          </h2>
          <p className="section__lede reveal">{t.lede}</p>
        </div>

        <div className="bento">
          {SERVICES.map((s, i) => (
            <article key={s.icon} className={`svc reveal${s.wide ? ' svc--wide' : ''}`}>
              <div className="svc__icon"><svg viewBox="0 0 24 24">{ICONS[s.icon]}</svg></div>
              <h3>{t.items[i].title}</h3>
              <p>{t.items[i].text}</p>
              {s.tags && <ul className="tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
              {s.wide && (
                <div className="svc__visual" aria-hidden="true">
                  <div className="mini-win">
                    <i /><i /><i />
                    <div className="mini-bars">
                      {['38%', '62%', '48%', '80%', '66%', '92%'].map((h, i) => <b key={i} style={{ '--h': h }} />)}
                    </div>
                  </div>
                </div>
              )}
            </article>
          ))}
        </div>

        <ol className="process" id="process">
          {t.process.map(([title, text], i) => (
            <li key={i} className="reveal"><span>{String(i + 1).padStart(2, '0')}</span><h4>{title}</h4><p>{text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
