import LeadForm from './LeadForm';

const POINTS = [
  ['Your free discovery call', 'with a senior engineer, not a salesperson'],
  ['Your fixed-price proposal in 48 hours', 'with scope, timeline and milestones'],
  ['Your clickable prototype in week one', 'so you see it before you build it'],
  ['You own 100% of the code & IP', 'with full documentation and handover'],
  ['Support after you launch', 'monitoring, fixes and growth sprints'],
];

export default function Contact() {
  return (
    <section className="section contact" id="contact">
      <div className="container contact__grid">
        <div className="contact__copy">
          <span className="eyebrow reveal"><i className="dot" /> Get started</span>
          <h2 className="section__title reveal">
            Get started with <em>PhoenixTechs</em>
          </h2>
          <p className="section__lede reveal">
            Book your free 30-minute consultation and leave with a clear plan, timeline and budget for your product,
            yours to keep either way.
          </p>
          <ul className="checklist">
            {POINTS.map(([title, text]) => (
              <li key={title} className="reveal"><i /><div><strong>{title}</strong>{text}</div></li>
            ))}
          </ul>
          <div className="contact__trust reveal">
            <div className="avatars">
              {[['#ff6a3d', 'SA'], ['#c8323c', 'MK'], ['#ffb347', 'LR'], ['#7a8cff', '+']].map(([c, t]) => (
                <i key={t} style={{ '--c': c }}>{t}</i>
              ))}
            </div>
            <p><strong>4.9/5</strong> from 80+ founders &amp; product teams like you</p>
          </div>
        </div>

        <div className="contact__form-wrap reveal">
          <LeadForm
            variant="full"
            title="Book your free consultation"
            subtitle="Takes 60 seconds. Get your reply within one business day."
            cta="Book my free consultation"
            fine="By submitting, you agree to be contacted about your request."
            successTitle="You're booked in"
            successText="Check your inbox within one business day to pick your call time."
          />
        </div>
      </div>
    </section>
  );
}
