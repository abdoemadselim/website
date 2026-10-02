const icons = [
  {
    name: 'React',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="2.8" fill="currentColor" />
        <ellipse cx="16" cy="16" rx="14" ry="5.2" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="16" cy="16" rx="14" ry="5.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(60 16 16)" />
        <ellipse cx="16" cy="16" rx="14" ry="5.2" stroke="currentColor" strokeWidth="1.4" transform="rotate(120 16 16)" />
      </svg>
    ),
  },
  {
    name: 'JavaScript',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M10 21.5c0 1.5.8 2.5 2.2 2.5s2-.7 2-2v-7h-1.6v7c0 .6-.2.8-.5.8s-.6-.3-.7-.8l-1.4.5zm7.5.3c.5.8 1.3 1.3 2.4 1.3 1.6 0 2.7-1 2.7-2.5 0-1.4-.8-2-2.2-2.6-.8-.3-1.2-.6-1.2-1.1 0-.5.4-.8 1-.8.5 0 .9.3 1.2.8l1.3-.8c-.5-.9-1.3-1.4-2.5-1.4-1.4 0-2.5.9-2.5 2.3 0 1.3.8 2 2 2.5.9.4 1.4.7 1.4 1.2 0 .6-.5 1-1.1 1-.7 0-1.1-.4-1.4-1l-1.1.6z" fill="currentColor" />
      </svg>
    ),
  },
  {
    name: 'Next.js',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="14" stroke="currentColor" strokeWidth="1.4" />
        <path d="M12 22V10l11.5 16" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
        <line x1="21" y1="10" x2="21" y2="22" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'TypeScript',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="2" y="2" width="28" height="28" rx="2" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 16h9m-4.5-3v10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
        <path d="M20 23.5c.5.6 1.3 1 2.2 1 1.5 0 2.8-1 2.8-2.5 0-1.3-.8-2-2.1-2.5-.9-.4-1.4-.6-1.4-1.2 0-.5.4-.8 1-.8s1 .3 1.3.8" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'AWS',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M6 20l3.5-10h1.5L14.5 20M7.5 17h5.5" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M14 20l2-6 2 6m.5 0l2-6 2 6" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M23 14c.8-.6 1.5-.8 2-.8 1 0 1.8.7 1.8 1.7 0 1.2-1 1.7-2 2 1.2.2 2.3.8 2.3 2 0 1.2-1 2.1-2.3 2.1-.8 0-1.6-.4-2.3-1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M5.5 24c3.5 2 8 3 12.5 2.5s7-2 9-4" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        <path d="M28 22l-1 2.5-2.5-.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    name: 'Docker',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <rect x="4" y="16" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="16" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="14" y="16" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="19" y="16" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="12" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="14" y="12" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="9" y="8" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="14" y="8" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <rect x="19" y="12" width="4" height="3" rx="0.5" stroke="currentColor" strokeWidth="1.2" />
        <path d="M2 20c1-3 3-4 5-4h19c2.5 0 4 2 4 4s-1.5 5-6 6c-3 .7-8 .5-11-1-3-1-5-2.5-6-3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    name: 'Kubernetes',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <circle cx="16" cy="16" r="12" stroke="currentColor" strokeWidth="1.4" />
        <circle cx="16" cy="16" r="4" stroke="currentColor" strokeWidth="1.2" />
        <line x1="16" y1="4" x2="16" y2="12" stroke="currentColor" strokeWidth="1.2" />
        <line x1="16" y1="20" x2="16" y2="28" stroke="currentColor" strokeWidth="1.2" />
        <line x1="4.6" y1="10" x2="12.4" y2="14" stroke="currentColor" strokeWidth="1.2" />
        <line x1="19.6" y1="18" x2="27.4" y2="22" stroke="currentColor" strokeWidth="1.2" />
        <line x1="27.4" y1="10" x2="19.6" y2="14" stroke="currentColor" strokeWidth="1.2" />
        <line x1="12.4" y1="18" x2="4.6" y2="22" stroke="currentColor" strokeWidth="1.2" />
      </svg>
    ),
  },
  {
    name: 'PostgreSQL',
    svg: (
      <svg viewBox="0 0 32 32" fill="none">
        <path d="M22 6c3 1.5 4.5 4 4.5 7.5 0 4-1.5 6-3 8l-.5 4c0 1-1 2-2.5 2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
        <path d="M18 25c0 1.5 1 2.5 2.5 2.5s2.5-1 2.5-2.5" stroke="currentColor" strokeWidth="1.4" />
        <ellipse cx="15" cy="8" rx="8" ry="4" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 8v12c0 2.2 3.6 4 8 4s8-1.8 8-4V8" stroke="currentColor" strokeWidth="1.4" />
        <path d="M7 14c0 2.2 3.6 4 8 4s8-1.8 8-4" stroke="currentColor" strokeWidth="1.2" />
        <circle cx="12" cy="10" r="1" fill="currentColor" />
        <circle cx="18" cy="10" r="1" fill="currentColor" />
      </svg>
    ),
  },
];

export default function TechStack() {
  return (
    <div className="tech-strip" aria-label="Technologies we use">
      <div className="container tech-strip__inner">
        {icons.map(({ name, svg }) => (
          <span key={name} className="tech-strip__icon" aria-label={name} title={name}>
            {svg}
          </span>
        ))}
      </div>
    </div>
  );
}
