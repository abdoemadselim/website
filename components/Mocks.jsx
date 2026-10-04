
export function DashMock() {
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

export function DashReconcileMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>ledgerly.app/reconcile</span></div>
      <div className="dash">
        <aside><b /><b /><b className="active" /><b /><b /></aside>
        <div className="dash__main">
          <div className="recon-head"><strong>Reconciliation</strong><span className="recon-badge">92% auto-matched</span></div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>INV-4821</span><span>$12,400</span><span className="recon-status">Matched</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>INV-4822</span><span>$8,750</span><span className="recon-status">Matched</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>INV-4823</span><span>$3,200</span><span className="recon-status recon-status--warn">Review</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>INV-4824</span><span>$6,100</span><span className="recon-status">Matched</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PhoneMock() {
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

export function PhoneTrackingMock() {
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>My Orders</strong><span className="phone__cart">3</span></div>
        <div className="phone__tracking">
          <div className="track-card">
            <div className="track-top"><strong>Ember Runner</strong><span className="track-badge">Out for delivery</span></div>
            <div className="track-bar"><div className="track-fill" /></div>
            <div className="track-steps"><span className="done">Ordered</span><span className="done">Packed</span><span className="done">Shipped</span><span className="active">Delivery</span></div>
            <div className="track-eta">Arriving today by 6 PM</div>
          </div>
          <div className="track-card track-card--dim">
            <div className="track-top"><strong>Dune Tote</strong><span className="track-badge track-badge--done">Delivered</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function CalendarMock() {
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

export function PatientMock() {
  return (
    <div className="mock mock--cal">
      <div className="mock__bar"><i /><i /><i /><span>clinicos.health/patients</span></div>
      <div className="cal" style={{ padding: 12 }}>
        <div className="cal__head"><strong>Patient Records</strong><span>1,842 patients</span></div>
        <div className="patient-rows">
          <div className="patient-row"><i className="patient-av" style={{ '--c': '#ff7a45' }}>SA</i><div><strong>Sara Ahmed</strong><small>Last visit: Oct 1 · Dr. Hana</small></div><span className="patient-tag">Follow-up due</span></div>
          <div className="patient-row"><i className="patient-av" style={{ '--c': '#7aa2ff' }}>MK</i><div><strong>Mohammed K.</strong><small>Last visit: Sep 28 · Dental</small></div><span className="patient-tag patient-tag--ok">Up to date</span></div>
          <div className="patient-row"><i className="patient-av" style={{ '--c': '#4ade80' }}>LR</i><div><strong>Layla R.</strong><small>Last visit: Sep 25 · Physio</small></div><span className="patient-tag patient-tag--ok">Up to date</span></div>
        </div>
      </div>
    </div>
  );
}

export function ChatMock() {
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

export function ChatDashMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>Atlas AI · Analytics</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Auto-resolved</small><strong>70%</strong><em>▲ 5.2%</em></div>
            <div><small>Avg response</small><strong>14s</strong><em>▲ 18%</em></div>
            <div><small>CSAT</small><strong>4.5</strong><em>▲ 0.9</em></div>
          </div>
          <div className="atlas-topics">
            <div className="atlas-topic"><span>Order tracking</span><div className="atlas-bar"><div style={{ width: '68%' }} /></div><small>34%</small></div>
            <div className="atlas-topic"><span>Refunds</span><div className="atlas-bar"><div style={{ width: '44%' }} /></div><small>22%</small></div>
            <div className="atlas-topic"><span>Account help</span><div className="atlas-bar"><div style={{ width: '36%' }} /></div><small>18%</small></div>
            <div className="atlas-topic"><span>Escalated</span><div className="atlas-bar atlas-bar--warn"><div style={{ width: '20%' }} /></div><small>10%</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export const PRODUCTS = [
  { tint: '255, 92, 54', Mock: DashMock, name: 'Ledgerly' },
  { tint: '255, 170, 70', Mock: PhoneMock, name: 'Souq Go' },
  { tint: '120, 150, 255', Mock: CalendarMock, name: 'Clinic OS' },
  { tint: '200, 90, 255', Mock: ChatMock, name: 'Atlas AI' },
];

export const PROJECT_SCREENS = [
  [DashMock, DashReconcileMock],
  [PhoneMock, PhoneTrackingMock],
  [CalendarMock, PatientMock],
  [ChatMock, ChatDashMock],
];
