
/* ── Warqah Store ── */

export function WarqahDashMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>waraqah-store.com/dashboard</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Revenue</small><strong>EGP 21M+</strong><em>▲ 24%</em></div>
            <div><small>Orders</small><strong>100K+</strong><em>▲ 18%</em></div>
            <div><small>Customers</small><strong>90K+</strong><em>▲ 15%</em></div>
          </div>
          <div className="dash__chart">
            <svg viewBox="0 0 300 110" preserveAspectRatio="none">
              <defs>
                <linearGradient id="gw" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0" stopColor="#e64834" stopOpacity=".55" />
                  <stop offset="1" stopColor="#e64834" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d="M0,90 C30,82 50,78 80,65 S130,55 160,48 S200,38 240,28 S280,18 300,12 L300,110 L0,110Z" fill="url(#gw)" />
              <path d="M0,90 C30,82 50,78 80,65 S130,55 160,48 S200,38 240,28 S280,18 300,12" fill="none" stroke="#e64834" strokeWidth="2.2" />
            </svg>
          </div>
          <div className="dash__rows"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  );
}

export function WarqahOrdersMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>waraqah-store.com/orders</span></div>
      <div className="dash">
        <aside><b /><b className="active" /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="recon-head"><strong>Orders</strong><span className="recon-badge">10K peak/day</span></div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>ORD-8421</span><span>EGP 1,240</span><span className="recon-status">Shipped</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>ORD-8420</span><span>EGP 850</span><span className="recon-status">Shipped</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>ORD-8419</span><span>EGP 2,100</span><span className="recon-status recon-status--warn">Processing</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>ORD-8418</span><span>EGP 460</span><span className="recon-status">Delivered</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Smart Lockers ── */

export function LockerGridMock() {
  const lockers = Array.from({ length: 20 }, (_, i) => i < 14 ? 'ok' : i < 17 ? 'busy' : 'off');
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>smartlockers.tech/control</span></div>
      <div className="dash">
        <aside><b /><b /><b className="active" /><b /><b /></aside>
        <div className="dash__main" style={{ padding: 10 }}>
          <div className="recon-head"><strong>Locker Grid</strong><span className="recon-badge">MQTT connected</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 6, marginTop: 8 }}>
            {lockers.map((s, i) => (
              <div key={i} style={{ aspectRatio: '1', borderRadius: 4, background: s === 'ok' ? 'rgba(72,199,142,.35)' : s === 'busy' ? 'rgba(255,170,50,.4)' : 'rgba(255,255,255,.08)', border: '1px solid rgba(255,255,255,.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 9, color: 'rgba(244,234,219,.6)' }}>
                {String(i + 1).padStart(2, '0')}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export function LockerMonitorMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>smartlockers.tech/devices</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b className="active" /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Online</small><strong>12</strong><em>▲</em></div>
            <div><small>Dispensed</small><strong>847</strong><em>▲ 6%</em></div>
            <div><small>Uptime</small><strong>99.8%</strong><em>▲</em></div>
          </div>
          <div className="dash__rows"><span /><span /><span /></div>
          <div className="cal__toast"><span className="pulse" /> RPi-07 heartbeat received</div>
        </div>
      </div>
    </div>
  );
}

/* ── Autopay EG ── */

export function AutopayDashMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>autopayeg.com/dashboard</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Detected</small><strong>142</strong><em>▲ 12%</em></div>
            <div><small>Matched</small><strong>138</strong><em>▲ 97%</em></div>
            <div><small>Pending</small><strong>4</strong><em className="neg">review</em></div>
          </div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>VodaCash</span><span>EGP 450</span><span className="recon-status">Matched</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>InstaPay</span><span>EGP 1,200</span><span className="recon-status">Matched</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>VodaCash</span><span>EGP 320</span><span className="recon-status recon-status--warn">Review</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AutopayInvoiceMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>autopayeg.com/invoices</span></div>
      <div className="dash">
        <aside><b /><b className="active" /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="recon-head"><strong>Hosted Invoices</strong><span className="recon-badge">Auto-confirm</span></div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>INV-291</span><span>EGP 750</span><span className="recon-status">Paid</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>INV-290</span><span>EGP 1,100</span><span className="recon-status">Paid</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>INV-289</span><span>EGP 500</span><span className="recon-status recon-status--warn">Pending</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>INV-288</span><span>EGP 2,300</span><span className="recon-status">Paid</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── NABD ── */

export function NABDMock() {
  return (
    <div className="mock mock--chat">
      <div className="mock__bar"><i /><i /><i /><span>NABD · Messaging platform</span></div>
      <div className="chat">
        <div className="msg msg--user">Order #1842 shipped?</div>
        <div className="msg msg--ai"><b>NABD</b>Yes! Your order shipped today via Aramex. Tracking: ARX-94821</div>
        <div className="msg msg--user">Thanks!</div>
        <div className="chat__badge">WhatsApp · Auto-reply via Salla</div>
        <div className="typing"><i /><i /><i /></div>
      </div>
    </div>
  );
}

export function NABDChannelsMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>NABD · Channels</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Weekly msgs</small><strong>5,000+</strong><em>▲ 8%</em></div>
            <div><small>WhatsApp</small><strong>3,240</strong><em>▲ 12%</em></div>
            <div><small>Telegram</small><strong>1,820</strong><em>▲ 5%</em></div>
          </div>
          <div className="atlas-topics">
            <div className="atlas-topic"><span>Order updates</span><div className="atlas-bar"><div style={{ width: '62%' }} /></div><small>62%</small></div>
            <div className="atlas-topic"><span>Support</span><div className="atlas-bar"><div style={{ width: '24%' }} /></div><small>24%</small></div>
            <div className="atlas-topic"><span>Marketing</span><div className="atlas-bar"><div style={{ width: '14%' }} /></div><small>14%</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Wasfaty ── */

export function WasfatyMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>Wasfaty · Rx Validation</span></div>
      <div className="dash">
        <aside><b /><b /><b className="active" /><b /><b /></aside>
        <div className="dash__main" style={{ padding: 10 }}>
          <div className="recon-head"><strong>Prescription Check</strong><span className="recon-badge" style={{ background: 'rgba(72,190,140,.25)', color: '#48c78e' }}>Validated</span></div>
          <div style={{ padding: '8px 0', fontSize: 11, color: 'rgba(244,234,219,.6)', display: 'flex', flexDirection: 'column', gap: 6 }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Patient ID</span><strong style={{ color: 'rgba(244,234,219,.85)' }}>WAS-84210</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Medicine</span><strong style={{ color: 'rgba(244,234,219,.85)' }}>Paracetamol 500mg</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Eligibility</span><strong style={{ color: '#48c78e' }}>Eligible</strong></div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}><span>Locker</span><strong style={{ color: 'rgba(244,234,219,.85)' }}>M-07 · Bay 3</strong></div>
          </div>
          <div className="cal__toast"><span className="pulse" /> Dispense authorised</div>
        </div>
      </div>
    </div>
  );
}

export function WasfatyDispenseMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>Wasfaty · Dispense log</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b className="active" /><b /></aside>
        <div className="dash__main">
          <div className="recon-head"><strong>Dispense History</strong><span className="recon-badge">Hajj season</span></div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>RX-4821</span><span>Dispense OK</span><span className="recon-status">Complete</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>RX-4820</span><span>Dispense OK</span><span className="recon-status">Complete</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>RX-4819</span><span>Stock low</span><span className="recon-status recon-status--warn">Refill</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>RX-4818</span><span>Dispense OK</span><span className="recon-status">Complete</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Riders ── */

export function RidersDashMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>tryriders.com/integrations</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Shopify</small><strong>Active</strong><em>▲</em></div>
            <div><small>WooCommerce</small><strong>Active</strong><em>▲</em></div>
            <div><small>Synced</small><strong>2,841</strong><em>▲ 9%</em></div>
          </div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>Shopify #SH-421</span><span>KWD 45</span><span className="recon-status">Shipped</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>Woo #WC-892</span><span>KWD 28</span><span className="recon-status">Shipped</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>Shopify #SH-420</span><span>KWD 72</span><span className="recon-status recon-status--warn">Pending</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function RidersOrdersMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>tryriders.com/orders</span></div>
      <div className="dash">
        <aside><b /><b className="active" /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="recon-head"><strong>Order Sync</strong><span className="recon-badge">Real-time</span></div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>SH-419</span><span>Synced</span><span className="recon-status">Delivered</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>WC-891</span><span>Synced</span><span className="recon-status">In transit</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>SH-418</span><span>Synced</span><span className="recon-status">Delivered</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>WC-890</span><span>Synced</span><span className="recon-status">Delivered</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Your Obour Guide ── */

export function ObourPhoneMock() {
  const places = [
    ['#ff7a45', '#7a1d1d', 'City Mall', '0.8 km'],
    ['#7aa2ff', '#1d2a7a', 'Al Nour Clinic', '1.2 km'],
    ['#4ade80', '#1a7a3c', 'Fresh Market', '0.5 km'],
    ['#ffd27a', '#7a5a1a', 'AutoFix Garage', '2.1 km'],
  ];
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Obour Guide</strong><span className="phone__cart" style={{ fontSize: 10 }}>AR</span></div>
        <div className="phone__chips"><b className="on">All</b><b>Food</b><b>Health</b></div>
        <div className="phone__grid">
          {places.map(([a, b, name, dist]) => (
            <div key={name} className="tile" style={{ '--a': a, '--b': b }}><i /><small>{name}</small><strong>{dist}</strong></div>
          ))}
        </div>
        <div className="phone__cta">Explore Obour</div>
      </div>
    </div>
  );
}

export function ObourListingMock() {
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Business</strong><span className="phone__cart" style={{ fontSize: 10 }}>AR</span></div>
        <div className="phone__tracking">
          <div className="track-card">
            <div className="track-top"><strong>City Mall</strong><span className="track-badge" style={{ background: 'rgba(72,199,142,.2)', color: '#48c78e' }}>Verified</span></div>
            <div style={{ fontSize: 10, color: 'rgba(244,234,219,.5)', marginTop: 4 }}>Shopping · Al Obour City</div>
            <div style={{ fontSize: 10, color: 'rgba(244,234,219,.5)', marginTop: 2 }}>Open 10 AM – 11 PM</div>
            <div className="track-eta">0.8 km away</div>
          </div>
          <div className="track-card track-card--dim">
            <div className="track-top"><strong>Al Nour Clinic</strong><span className="track-badge" style={{ background: 'rgba(72,199,142,.2)', color: '#48c78e' }}>Verified</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── SIM Express ── */

export function SIMKioskMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>simexpress.sa/kiosk</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main" style={{ padding: 10 }}>
          <div style={{ textAlign: 'center', padding: '8px 0' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(244,234,219,.9)' }}>Welcome</div>
            <div style={{ fontSize: 10, color: 'rgba(244,234,219,.5)', marginTop: 4 }}>Select your SIM plan</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 6, marginTop: 6 }}>
            {[['Tourist 5GB', 'SAR 49'], ['Tourist 10GB', 'SAR 79'], ['eSIM 3GB', 'SAR 35'], ['eSIM 8GB', 'SAR 65']].map(([plan, price]) => (
              <div key={plan} style={{ padding: '8px 6px', borderRadius: 6, background: 'rgba(65,130,240,.15)', border: '1px solid rgba(65,130,240,.3)', textAlign: 'center' }}>
                <div style={{ fontSize: 10, fontWeight: 600, color: 'rgba(244,234,219,.85)' }}>{plan}</div>
                <div style={{ fontSize: 11, fontWeight: 700, color: 'rgb(65,130,240)', marginTop: 2 }}>{price}</div>
              </div>
            ))}
          </div>
          <div className="cal__toast"><span className="pulse" /> stc activation ready</div>
        </div>
      </div>
    </div>
  );
}

export function SIMOpsMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>simexpress.sa/operations</span></div>
      <div className="dash">
        <aside><b /><b /><b className="active" /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Kiosks</small><strong>8</strong><em>▲ online</em></div>
            <div><small>Sold today</small><strong>142</strong><em>▲ 15%</em></div>
            <div><small>Stock</small><strong>680</strong><em>OK</em></div>
          </div>
          <div className="dash__rows"><span /><span /><span /></div>
        </div>
      </div>
    </div>
  );
}

/* ── Alzahaby ── */

export function AlzahabyPhoneMock() {
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Alzahaby</strong><span className="phone__cart" style={{ background: 'rgba(218,175,45,.25)', color: '#dab02d' }}>1,250 pts</span></div>
        <div style={{ padding: '8px 12px' }}>
          <div style={{ background: 'rgba(218,175,45,.12)', borderRadius: 8, padding: '10px 12px', border: '1px solid rgba(218,175,45,.2)' }}>
            <div style={{ fontSize: 10, color: 'rgba(244,234,219,.5)' }}>Your points</div>
            <div style={{ fontSize: 20, fontWeight: 700, color: '#dab02d' }}>1,250</div>
            <div style={{ fontSize: 9, color: 'rgba(244,234,219,.4)', marginTop: 2 }}>Scan a product to earn more</div>
          </div>
        </div>
        <div style={{ padding: '0 12px', fontSize: 11, fontWeight: 600, color: 'rgba(244,234,219,.7)' }}>Rewards</div>
        <div style={{ padding: '6px 12px', display: 'flex', flexDirection: 'column', gap: 6 }}>
          {[['Gift card', '500 pts'], ['Discount 20%', '800 pts'], ['Free cable', '1,200 pts']].map(([r, p]) => (
            <div key={r} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 8px', borderRadius: 6, background: 'rgba(255,255,255,.05)' }}>
              <span style={{ fontSize: 10, color: 'rgba(244,234,219,.7)' }}>{r}</span>
              <span style={{ fontSize: 9, color: '#dab02d', fontWeight: 600 }}>{p}</span>
            </div>
          ))}
        </div>
        <div className="phone__cta" style={{ background: 'rgba(218,175,45,.85)' }}>Scan QR Code</div>
      </div>
    </div>
  );
}

export function AlzahabyScanMock() {
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Scan</strong><span className="phone__cart" style={{ background: 'rgba(218,175,45,.25)', color: '#dab02d' }}>1,250</span></div>
        <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 100, height: 100, border: '2px solid rgba(218,175,45,.5)', borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{ width: 60, height: 60, background: 'repeating-conic-gradient(rgba(218,175,45,.3) 0% 25%, transparent 0% 50%) 0 0 / 12px 12px', borderRadius: 4 }} />
          </div>
          <div style={{ fontSize: 11, color: 'rgba(244,234,219,.6)', textAlign: 'center' }}>Point camera at the QR code on the product</div>
          <div style={{ background: 'rgba(72,199,142,.15)', borderRadius: 6, padding: '6px 12px', fontSize: 10, color: '#48c78e' }}>+50 pts earned!</div>
        </div>
      </div>
    </div>
  );
}

/* ── Chocolate Vending ── */

export function ChocolatePhoneMock() {
  const items = [
    ['#8B4513', '#3d1f08', 'Dark Truffle', 'SAR 25'],
    ['#D2691E', '#5a2d0e', 'Milk Hazelnut', 'SAR 20'],
    ['#F4A460', '#7a5a2a', 'White Almond', 'SAR 22'],
    ['#A0522D', '#4a2515', 'Caramel Box', 'SAR 30'],
  ];
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Aani & Dani</strong><span className="phone__cart" style={{ background: 'rgba(160,100,60,.3)' }}>QR</span></div>
        <div className="phone__chips"><b className="on">All</b><b>Dark</b><b>Milk</b></div>
        <div className="phone__grid">
          {items.map(([a, b, name, price]) => (
            <div key={name} className="tile" style={{ '--a': a, '--b': b }}><i /><small>{name}</small><strong>{price}</strong></div>
          ))}
        </div>
        <div className="phone__cta" style={{ background: 'rgba(160,100,60,.85)' }}>Pay · SAR 25</div>
      </div>
    </div>
  );
}

export function ChocolatePayMock() {
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Payment</strong></div>
        <div style={{ padding: '16px 12px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
          <div style={{ width: 60, height: 60, borderRadius: '50%', background: 'rgba(72,199,142,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24 }}>&#10003;</div>
          <div style={{ fontSize: 13, fontWeight: 700, color: '#48c78e' }}>Payment Confirmed</div>
          <div style={{ fontSize: 10, color: 'rgba(244,234,219,.5)' }}>Moyasar · SAR 25.00</div>
          <div style={{ background: 'rgba(160,100,60,.15)', borderRadius: 8, padding: '10px 16px', textAlign: 'center', border: '1px solid rgba(160,100,60,.3)', marginTop: 4 }}>
            <div style={{ fontSize: 10, color: 'rgba(244,234,219,.5)' }}>Collect from</div>
            <div style={{ fontSize: 14, fontWeight: 700, color: 'rgba(244,234,219,.9)', marginTop: 2 }}>Locker M-03 · Bay 2</div>
            <div style={{ fontSize: 9, color: 'rgba(244,234,219,.4)', marginTop: 4 }}>Compartment unlocked</div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Tawfir ── */

export function TawfirPhoneMock() {
  const dishes = [
    ['#ff7a45', '#7a1d1d', 'Grilled Combo', 'AED 18'],
    ['#ffd27a', '#a3471a', 'Sushi Box', 'AED 25'],
    ['#7aa2ff', '#1d2a7a', 'Pasta Bowl', 'AED 12'],
    ['#4ade80', '#1a7a3c', 'Salad Mix', 'AED 9'],
  ];
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>Tawfir</strong><span className="phone__cart" style={{ background: 'rgba(245,130,65,.25)', color: '#f58241' }}>2</span></div>
        <div className="phone__chips"><b className="on">Near me</b><b>Best deals</b><b>New</b></div>
        <div className="phone__grid">
          {dishes.map(([a, b, name, price]) => (
            <div key={name} className="tile" style={{ '--a': a, '--b': b }}><i /><small>{name}</small><strong>{price}</strong></div>
          ))}
        </div>
        <div className="phone__cta" style={{ background: 'rgba(245,130,65,.85)' }}>Pickup · AED 18</div>
      </div>
    </div>
  );
}

export function TawfirOrderMock() {
  return (
    <div className="mock mock--phone">
      <div className="phone">
        <div className="phone__notch" />
        <div className="phone__head"><strong>My Orders</strong><span className="phone__cart" style={{ background: 'rgba(245,130,65,.25)', color: '#f58241' }}>2</span></div>
        <div className="phone__tracking">
          <div className="track-card">
            <div className="track-top"><strong>Grilled Combo</strong><span className="track-badge" style={{ background: 'rgba(245,130,65,.2)', color: '#f58241' }}>Ready at 6 PM</span></div>
            <div className="track-bar"><div className="track-fill" style={{ width: '66%' }} /></div>
            <div className="track-steps"><span className="done">Ordered</span><span className="done">Preparing</span><span className="active">Pickup</span></div>
            <div className="track-eta">The Grill House · 0.4 km</div>
          </div>
          <div className="track-card track-card--dim">
            <div className="track-top"><strong>Sushi Box</strong><span className="track-badge track-badge--done">Picked up</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PDF Extractor ── */

export function PDFExtractMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>PDF Extractor</span></div>
      <div className="dash">
        <aside><b /><b /><b className="active" /><b /><b /></aside>
        <div className="dash__main" style={{ padding: 10 }}>
          <div className="recon-head"><strong>Extraction</strong><span className="recon-badge" style={{ background: 'rgba(115,90,220,.25)', color: 'rgb(155,130,255)' }}>AI cleanup ON</span></div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>report.pdf</span><span>Native</span><span className="recon-status">Done</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>scan_042.pdf</span><span>OCR</span><span className="recon-status recon-status--warn">Processing</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>contract.docx</span><span>Native</span><span className="recon-status">Done</span></div>
          </div>
          <div className="cal__toast"><span className="pulse" /> Tesseract OCR running…</div>
        </div>
      </div>
    </div>
  );
}

export function PDFResultsMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>PDF Extractor · Results</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b className="active" /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Processed</small><strong>248</strong><em>▲</em></div>
            <div><small>Native</small><strong>182</strong><em>73%</em></div>
            <div><small>OCR</small><strong>66</strong><em>27%</em></div>
          </div>
          <div className="atlas-topics">
            <div className="atlas-topic"><span>PDF native</span><div className="atlas-bar"><div style={{ width: '73%' }} /></div><small>73%</small></div>
            <div className="atlas-topic"><span>OCR fallback</span><div className="atlas-bar"><div style={{ width: '27%' }} /></div><small>27%</small></div>
            <div className="atlas-topic"><span>AI cleaned</span><div className="atlas-bar"><div style={{ width: '45%' }} /></div><small>45%</small></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── PinoyAid ── */

export function PinoyAidDashMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>PinoyAid · Campaigns</span></div>
      <div className="dash">
        <aside><b /><b /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="dash__kpis">
            <div><small>Campaigns</small><strong>84</strong><em>▲ 12</em></div>
            <div><small>Donations</small><strong>3,240</strong><em>▲ 8%</em></div>
            <div><small>Raised</small><strong>$142K</strong><em>▲ 15%</em></div>
          </div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>Medical Aid</span><span>$12,400</span><span className="recon-status">Active</span></div>
            <div className="recon-row recon-row--flag"><i className="recon-dot recon-dot--warn" /><span>School Fund</span><span>$8,200</span><span className="recon-status recon-status--warn">Review</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>Emergency</span><span>$24,600</span><span className="recon-status">Active</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function PinoyAidDonationsMock() {
  return (
    <div className="mock mock--dash">
      <div className="mock__bar"><i /><i /><i /><span>PinoyAid · Donations</span></div>
      <div className="dash">
        <aside><b /><b className="active" /><b /><b /><b /></aside>
        <div className="dash__main">
          <div className="recon-head"><strong>Recent Donations</strong><span className="recon-badge">Multi-gateway</span></div>
          <div className="recon-rows">
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>DON-1842</span><span>$50</span><span className="recon-status">Confirmed</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>DON-1841</span><span>$120</span><span className="recon-status">Confirmed</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>DON-1840</span><span>$25</span><span className="recon-status">Confirmed</span></div>
            <div className="recon-row recon-row--matched"><i className="recon-dot recon-dot--ok" /><span>DON-1839</span><span>$200</span><span className="recon-status">Confirmed</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Homepage PRODUCTS (first 6 featured projects) ── */

export const PRODUCTS = [
  { Mock: WarqahDashMock },
  { Mock: LockerGridMock },
  { Mock: AutopayDashMock },
  { Mock: NABDMock },
  { Mock: WasfatyMock },
  { Mock: RidersDashMock },
];

/* ── PROJECT_SCREENS (all 13 projects, index-matched to products array) ── */

export const PROJECT_SCREENS = [
  [WarqahDashMock, WarqahOrdersMock],
  [LockerGridMock, LockerMonitorMock],
  [AutopayDashMock, AutopayInvoiceMock],
  [NABDMock, NABDChannelsMock],
  [WasfatyMock, WasfatyDispenseMock],
  [RidersDashMock, RidersOrdersMock],
  [ObourPhoneMock, ObourListingMock],
  [SIMKioskMock, SIMOpsMock],
  [AlzahabyPhoneMock, AlzahabyScanMock],
  [ChocolatePhoneMock, ChocolatePayMock],
  [TawfirPhoneMock, TawfirOrderMock],
  [PDFExtractMock, PDFResultsMock],
  [PinoyAidDashMock, PinoyAidDonationsMock],
];
