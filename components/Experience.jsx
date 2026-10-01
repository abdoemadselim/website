'use client';

import { useEffect } from 'react';

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(c.getContext('webgl2') || c.getContext('webgl'));
  } catch {
    return false;
  }
}

/** Background 3D scene, nav state and a single gentle fade-in for sections. Renders nothing. */
export default function Experience() {
  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.matchMedia('(max-width: 860px)').matches;
    let disposed = false;
    let scene = null;

    /* ---------- 3D scene ---------- */
    const sections = () => [
      { el: $('#hero'), key: 'hero' },
      { el: $('#services'), key: 'services' },
      { el: $('#work'), key: 'work' },
      { el: $('#contact'), key: 'contact' },
    ];
    if (!hasWebGL()) document.documentElement.classList.add('no-webgl');
    else {
      import('@/lib/scene')
        .then(({ createScene }) => {
          if (disposed) return;
          scene = createScene($('#scene'), { reducedMotion, isMobile });
          scene.measure(sections());
          scene.setScroll(window.scrollY);
        })
        .catch((err) => {
          console.warn('[phoenixtechs] WebGL scene disabled:', err);
          document.documentElement.classList.add('no-webgl');
        });
    }

    /* ---------- Scroll: nav state + scene ---------- */
    const nav = $('#nav');
    const onScroll = () => {
      nav.classList.toggle('is-scrolled', window.scrollY > 40);
      scene?.setScroll(window.scrollY);
    };
    const onResize = () => scene?.measure(sections());
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);
    window.addEventListener('load', onResize);
    document.fonts?.ready.then(onResize);
    onScroll();

    // highlight the nav link of the section in view
    const links = new Map($$('.nav__links a').map((a) => [a.getAttribute('href'), a]));
    const spy = new IntersectionObserver(
      (entries) => entries.forEach((e) => links.get(`#${e.target.id}`)?.classList.toggle('is-active', e.isIntersecting)),
      { rootMargin: '-50% 0px -50% 0px' },
    );
    ['services', 'work', 'contact'].forEach((id) => $(`#${id}`) && spy.observe($(`#${id}`)));

    /* ---------- Gentle reveal ---------- */
    const reveal = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (!e.isIntersecting) return;
        e.target.classList.add('is-in');
        reveal.unobserve(e.target);
      }),
      { rootMargin: '0px 0px -8% 0px' },
    );
    if (!reducedMotion) {
      document.documentElement.classList.add('js-reveal');
      $$('.reveal').forEach((el) => reveal.observe(el));
    }

    return () => {
      disposed = true;
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('load', onResize);
      spy.disconnect();
      reveal.disconnect();
      scene?.destroy();
    };
  }, []);

  return null;
}
