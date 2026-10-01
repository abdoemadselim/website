
// Example products. Swap names, copy and metrics for your real case studies.

function DashMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>ledgerly.app/overview</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Revenue</small><strong>$482.6k</strong><em>▲ 12.4%</em></div>
            <div><small>Cash flow</small><strong>$91.2k</strong><em>▲ 8.1%</em></div>
            <div><small>Invoices</small><strong>1,284</strong><em className="neg">▼ 2.3%</em></div>
          </div>
          <div className="dash__chart">
            <svg viewBox="0 0 300 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="ga" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#ff6a3d" stopOpacity=".55" />
                  <stop offset="1" stopColor="#ff6a3d" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,88 C25,80 40,84 60,70 S100,52 120,58 S160,40 180,34 S220,44 240,26 S280,14 300,10 L300,110 L0,110Z" fill="url(#ga)" />
              <path d="M0,88 C25,80 40,84 60,70 S100,52 120,58 S160,40 180,34 S220,44 240,26 S280,14 300,10" fill="none" stroke="#ff8a5c" strokeWidth="2.2" />
              <path d="M0,98 C30,96 50,92 80,90 S130,80 160,82 S220,70 300,62" fill="none" stroke="rgba(244,234,219,.35)" strokeWidth="1.4" strokeDasharray="4 4" />
            </svg>
          </div>
          <div className="dash__rows"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  );
}

function PhoneMock() {
  const tiles = [
    ['#ff7a45', '#7a1d1d', 'Ember Runner', 'AED 349'],
    ['#ffd27a', '#a3471a', 'Dune Tote', 'AED 219'],
    ['#7aa2ff', '#1d2a7a', 'Night Cap', 'AED 99'],
    ['#ff9aa8', '#7a1d3c', 'Rose Knit', 'AED 189'],
  ];
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Discover</strong><span className="phone__cart">3</span></div>
        <div className="phone__chips"><b className="on">All</b><b>Sneakers</b><b>Bags</b></div>
        <div className="phone__grid">
          {tiles.map(([a, b, name, price]) => (
            <div key={name} className="tile" style={{ '--a': a, '--b': b }}><i /><small>{name}</small><strong>{price}</strong></div>
          ))}
        </div>
        <div className="phone__cta">Add to cart · AED 349</div>
      </div>
    </div>
  );
}

function CalendarMock() {
  const events = [
    [1, '1/3', 'a', 'Dr. Hana · Check-up'], [2, '2/4', 'b', 'Dental cleaning'], [3, '1/2', 'c', 'Follow-up'],
    [4, '3/5', 'a', 'MRI review'], [5, '1/3', 'b', 'Physio'], [3, '4/6', 'b', 'Consult'], [1, '4/5', 'c', 'Lab'],
  ];
  return (
    <div className="mock mock--cal">
      <div className="mock__bar"><i /><i /><i /><span>clinicos.health/schedule</span></div>
      <div className="cal">
        <div className="cal__head"><strong>October</strong><span>Week 41</span></div>
        <div className="cal__days">{['Mon', 'Tue', 'Wed', 'Thu', 'Fri'].map((d) => <b key={d}>{d}</b>)}</div>
        <div className="cal__grid">
          {events.map(([c, r, t, label]) => (
            <i key={label} className={`ev ev--${t}`} style={{ gridColumn: c, gridRow: r }}>{label}</i>
          ))}
        </div>
        <div className="cal__toast"><span className="pulse" /> SMS reminder sent to 42 patients</div>
      </div>
    </div>
  );
}

function ChatMock() {
  return (
    <div className="mock mock--chat">
      <div className="mock__bar"><i /><i /><i /><span>Atlas AI · Support copilot</span></div>
      <div className="chat">
        <div className="msg msg--user">Where&apos;s my order #48213? It was due yesterday.</div>
        <div className="msg msg--ai"><b>Atlas</b>Found it. It&apos;s out for delivery and will arrive by 6 PM today. I&apos;ve added a 10% credit for the delay.</div>
        <div className="msg msg--user">Perfect, thank you!</div>
        <div className="chat__badge">✓ Resolved automatically in 14s</div>
        <div className="typing"><i /><i /><i /></div>
      </div>
    </div>
  );
}

const PRODUCTS = [
  { tint: '255, 92, 54', Mock: DashMock, name: 'Ledgerly' },
  { tint: '255, 170, 70', Mock: PhoneMock, name: 'Souq Go' },
  { tint: '120, 150, 255', Mock: CalendarMock, name: 'Clinic OS' },
  { tint: '200, 90, 255', Mock: ChatMock, name: 'Atlas AI' },
];

export default function Work({ t }) {
  return (
    <section className="work" id="work">
      <div className="section work__inner">
        <div className="container work__head">
          <div>
            <span className="eyebrow reveal"><i className="dot" /> {t.eyebrow}</span>
            <h2 className="section__title reveal">
              {t.title[0]}<em>{t.title[1]}</em>{t.title[2]}
            </h2>
          </div>
          <p className="section__lede reveal">{t.lede}</p>
        </div>

        <div className="container">
          <div className="work__grid">
            {PRODUCTS.map(({ tint, Mock, name }, i) => {
              const { tags, text, metrics } = t.products[i];
              return (
                <article key={name} className="product reveal" style={{ '--tint': tint }}>
                  <div className="product__stage"><Mock /></div>
                  <div className="product__info">
                    <div className="product__meta">{tags.map((tag) => <span key={tag}>{tag}</span>)}</div>
                    <h3>{name}</h3>
                    <p>{text}</p>
                    <div className="product__metrics">
                      {metrics.map(([v, l]) => <div key={l}><strong>{v}</strong><small>{l}</small></div>)}
                    </div>
                  </div>
                </article>
              );
            })}
            <article className="product product--cta reveal">
              <div>
                <span className="eyebrow"><i className="dot" /> {t.cta.eyebrow}</span>
                <h3>{t.cta.title}</h3>
                <p>{t.cta.text}</p>
                <a href="#contact" className="btn btn--ember">{t.cta.button}</a>
              </div>
            </article>
          </div>
        </div>
      </div>
    </section>
  );
}
