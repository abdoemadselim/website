'use client';

import { useState } from 'react';
import Logo from './Logo';

export default function Nav({ t, lang }) {
  const other = lang === 'ar' ? 'en' : 'ar';
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const base = `/${lang}`;
  const resolve = (hash) => `${base}${hash}`;

  return (
    <header className="nav" id="nav" data-open={open || undefined}>
      <div className="nav__inner container">
        <Logo className="nav__logo" href={base} />
        <nav className="nav__links" aria-label="Primary">
          {t.links.map(([href, label]) => (
            <a key={href} href={resolve(href)} className="pill">{label}</a>
          ))}
        </nav>
        <a href={`/${other}`} className="nav__lang" hrefLang={other} lang={other}>{t.switchLabel}</a>
        <a href={resolve('#contact')} className="btn btn--ember btn--sm nav__cta">{t.cta}</a>
        <button
          className="nav__burger"
          aria-label={open ? t.closeMenu : t.openMenu}
          aria-expanded={open}
          aria-controls="mobile-menu"
          onClick={() => setOpen((o) => !o)}
        >
          <span /><span />
        </button>
      </div>
      <div className="mobile-menu" id="mobile-menu" hidden={!open}>
        {t.links.map(([href, label]) => (
          <a key={href} href={resolve(href)} onClick={close}>{label}</a>
        ))}
        <a href={resolve('#contact')} className="btn btn--ember" onClick={close}>{t.ctaMobile}</a>
      </div>
    </header>
  );
}
