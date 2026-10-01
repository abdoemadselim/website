import { LOGO_SVG } from './logo-svg';

export default function Logo({ className, href = '#top' }) {
  return (
    <a href={href} className={className} aria-label="PhoenixTechs home" dangerouslySetInnerHTML={{ __html: LOGO_SVG }} />
  );
}
