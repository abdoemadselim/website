import Logo from './Logo';

const SOCIALS = [
  ['LinkedIn', <><path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.5a2.5 2.5 0 015 0v4.5M10.5 9.5v8" /><rect x="3" y="3" width="18" height="18" rx="4" /></>],
  ['X', <path d="M4 4l16 16M20 4L4 20" />],
  ['Instagram', <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></>],
  ['Dribbble', <><circle cx="12" cy="12" r="9" /><path d="M8 3.9c4 5 6 10 7 16.4M3.2 10.5c6 .5 11-.8 15-4.4M5.6 18.4c3-4.5 8-6 14.9-4.4" /></>],
];

export default function Footer({ t }) {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p>{t.tagline}</p>
            <div className="socials">
              {SOCIALS.map(([label, icon]) => (
                <a key={label} href="#" aria-label={label}><svg viewBox="0 0 24 24">{icon}</svg></a>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <h4>{t.solutionsTitle}</h4>
            {t.solutions.map((s) => (
              <a key={s} href="#services">{s}</a>
            ))}
          </div>
          <div className="footer__col">
            <h4>{t.companyTitle}</h4>
            {t.company.map(([href, label]) => <a key={label} href={href}>{label}</a>)}
          </div>
          <div className="footer__col">
            <h4>{t.contactTitle}</h4>
            <a href="mailto:hello@phoenixtechs.com" dir="ltr">hello@phoenixtechs.com</a>
            <a href="tel:+971500000000" dir="ltr">+971 50 000 0000</a>
            <span>{t.location}</span>
            <a href="#contact" className="btn btn--ghost btn--sm">{t.cta}</a>
          </div>
        </div>
        <div className="footer__giant" aria-hidden="true">PHOENIXTECHS</div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} PhoenixTechs. {t.rights}</span>
          <span><a href="#">{t.privacy}</a> · <a href="#">{t.terms}</a></span>
        </div>
      </div>
    </footer>
  );
}
