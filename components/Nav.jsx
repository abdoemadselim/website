'use client';

import { useState } from 'react';
import Logo from './Logo';

const LINKS = [
  ['#services', 'Solutions'],
  ['#work', 'Products'],
  ['#process', 'Process'],
  ['#contact', 'Contact'],
];

export default function Nav() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <header className="nav" id="nav" data-open={open || undefined}>
      <div className="nav__inner container">
        <Logo className="nav__logo" />
        <nav className="nav__links" aria-label="Primary">
          {LINKS.map(([href, label]) => (
            <a key={href} href={href} className="pill">{label}</a>
          ))}
        </nav>
        <a href="#contact" className="btn btn--ember btn--sm nav__cta">
          Book a call <span className="btn__arrow" aria-hidden="true">→</span>
        </a>
        <button
          className="nav__burger"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        {LINKS.map(([href, label]) => (
          <a key={href} href={href} onClick={close}>{label}</a>
        ))}
        <a href="#contact" className="btn btn--ember" onClick={close}>Book a free call →</a>
      </div>
    </header>
  );
}
