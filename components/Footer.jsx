import Logo from './Logo';

const SOCIALS = [
  ['LinkedIn', <><path d="M6.5 9.5v8M6.5 6.5v.01M10.5 17.5v-4.5a2.5 2.5 0 015 0v4.5M10.5 9.5v8" /><rect x="3" y="3" width="18" height="18" rx="4" /></>],
  ['X', <path d="M4 4l16 16M20 4L4 20" />],
  ['Instagram', <><rect x="3" y="3" width="18" height="18" rx="5" /><circle cx="12" cy="12" r="4" /><path d="M17.5 6.5v.01" /></>],
  ['Dribbble', <><circle cx="12" cy="12" r="9" /><path d="M8 3.9c4 5 6 10 7 16.4M3.2 10.5c6 .5 11-.8 15-4.4M5.6 18.4c3-4.5 8-6 14.9-4.4" /></>],
];

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__top">
          <div className="footer__brand">
            <Logo className="footer__logo" />
            <p>Software that helps your company rise faster.</p>
            <div className="socials">
              {SOCIALS.map(([label, icon]) => (
                <a key={label} href="#" aria-label={label}><svg viewBox="0 0 24 24">{icon}</svg></a>
              ))}
            </div>
          </div>
          <div className="footer__col">
            <h4>Solutions</h4>
            {['Web platforms', 'Mobile apps', 'AI & automation', 'E-commerce', 'UI/UX design'].map((s) => (
              <a key={s} href="#services">{s}</a>
            ))}
          </div>
          <div className="footer__col">
            <h4>Company</h4>
            <a href="#work">Products</a><a href="#process">Process</a><a href="#contact">Careers</a><a href="#contact">Contact</a>
          </div>
          <div className="footer__col">
            <h4>Contact</h4>
            <a href="mailto:hello@phoenixtechs.com">hello@phoenixtechs.com</a>
            <a href="tel:+971500000000">+971 50 000 0000</a>
            <span>Dubai · Cairo · Remote</span>
            <a href="#contact" className="btn btn--ghost btn--sm">Book a call</a>
          </div>
        </div>
        <div className="footer__giant" aria-hidden="true">PHOENIXTECHS</div>
        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} PhoenixTechs. All rights reserved.</span>
          <span><a href="#">Privacy</a> · <a href="#">Terms</a></span>
        </div>
      </div>
    </footer>
  );
}
