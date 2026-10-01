import LeadForm from './LeadForm';

export default function Hero() {
  return (
    <section className="hero" id="hero">
      <div className="hero__giant" aria-hidden="true">
        <span>PHOENIX</span>
      </div>

      <div className="container hero__grid">
        <div className="hero__copy reveal">
          <h1 className="hero__title">
            <span className="line">Get your dream system</span>{' '}
            <span className="line">live and walking.</span>
          </h1>
          <p className="hero__sub">
            Your platform, mobile app or AI automation, designed, built and scaled around your business, so your team
            sells more, works faster and spends less.
          </p>
          <ul className="hero__stats" aria-label="Key numbers">
            <li><strong>120</strong><span>+</span><small>products shipped</small></li>
            <li><strong>6</strong><span>wk</span><small>average time to launch</small></li>
            <li><strong>98</strong><span>%</span><small>of clients come back</small></li>
          </ul>
        </div>

        <div className="hero__form-wrap reveal">
          <LeadForm
            variant="hero"
            title="Get your free project proposal"
            subtitle="Share your idea and get a reply from a senior engineer within 24 hours."
            cta="Get my free proposal"
            fine="No commitment. Your details stay private."
            successTitle="Request received"
            successText="Your proposal is on its way. Expect a reply within one business day."
          />
        </div>
      </div>
    </section>
  );
}
