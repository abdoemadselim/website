
const ICONS = {
  web: <><rect x="3" y="4" width="18" height="14" rx="2.5" /><path d="M3 8.5h18M7 13h4M7 15.5h7" /><path d="M8 21h8" /></>,
  mobile: <><rect x="6.5" y="2.5" width="11" height="19" rx="2.5" /><path d="M10.5 18.5h3" /></>,
  ai: <><path d="M12 3l1.9 4.6L18.5 9.5l-4.6 1.9L12 16l-1.9-4.6L5.5 9.5l4.6-1.9z" /><path d="M18.5 15.5l.8 1.9 1.9.8-1.9.8-.8 1.9-.8-1.9-1.9-.8 1.9-.8z" /></>,
  design: <><path d="M4 20l4.5-1 10-10a2.1 2.1 0 00-3-3l-10 10z" /><path d="M14 7.5l2.5 2.5" /></>,
  commerce: <><path d="M4 5h2l2.2 10.2a1.5 1.5 0 001.5 1.2h7.6a1.5 1.5 0 001.5-1.1L20.5 9H7" /><circle cx="10" cy="20" r="1.2" /><circle cx="17" cy="20" r="1.2" /></>,
  cloud: <><path d="M7 18a4.5 4.5 0 01-.6-9A6 6 0 0118 8.5a4.8 4.8 0 01-.5 9.5z" /><path d="M12 11v5M9.8 13.2L12 11l2.2 2.2" /></>,
};

const SERVICES = [
  { icon: 'web', wide: true, title: 'Custom Web Platforms & SaaS', text: 'Customer portals, internal tools, dashboards and multi-tenant SaaS, engineered for speed, security and scale from day one.', tags: ['Next.js', 'Node', 'Postgres', 'Multi-tenant'] },
  { icon: 'mobile', title: 'Mobile Apps', text: 'Native-quality iOS & Android apps your customers keep on their home screen.', tags: ['iOS', 'Android', 'Flutter'] },
  { icon: 'ai', title: 'AI & Automation', text: 'AI copilots, smart search and workflow automation that cut manual work by hours a day.', tags: ['LLMs', 'RAG', 'Agents'] },
  { icon: 'design', title: 'UI/UX & Product Design', text: 'Research-led interfaces and design systems that convert visitors into customers.', tags: ['Figma', 'Prototyping', 'Design systems'] },
  { icon: 'commerce', title: 'E-commerce', text: 'High-converting stores with payments, logistics and ERP integrations built in.', tags: ['Shopify', 'Headless', 'Payments'] },
  { icon: 'cloud', title: 'Cloud & DevOps', text: 'Reliable, cost-optimised infrastructure with CI/CD, monitoring and 99.9% uptime.', tags: ['AWS', 'GCP', 'Kubernetes'] },
];

const PROCESS = [
  ['01', 'Discover', 'Map your goals, users and scope in a free workshop.'],
  ['02', 'Design', 'Test a clickable prototype of your product in week one.'],
  ['03', 'Build', 'See your product grow with a live demo every Friday.'],
  ['04', 'Launch & grow', 'Go live, measure and improve, with support on call.'],
];

export default function Services() {
  return (
    <section className="section services" id="services">
      <div className="container">
        <div className="section__head">
          <span className="eyebrow reveal"><i className="dot" /> Solutions for you</span>
          <h2 className="section__title reveal">
            Everything you need to <em>build, launch</em> and scale.
          </h2>
          <p className="section__lede reveal">
            One senior team for your strategy, design, engineering and growth. No hand-offs, no middlemen.
          </p>
        </div>

        <div className="bento">
          {SERVICES.map((s) => (
            <article key={s.title} className={`svc reveal${s.wide ? ' svc--wide' : ''}`}>
              <div className="svc__glow" />
              <div className="svc__icon"><svg viewBox="0 0 24 24">{ICONS[s.icon]}</svg></div>
              <h3>{s.title}</h3>
              <p>{s.text}</p>
              <ul className="tags">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>
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
          {PROCESS.map(([n, title, text]) => (
            <li key={n} className="reveal"><span>{n}</span><h4>{title}</h4><p>{text}</p></li>
          ))}
        </ol>
      </div>
    </section>
  );
}
