// Generates the PhoenixTechs logo set (engraved line-art phoenix + script wordmark).
// Text is converted to outlines so the SVGs render identically everywhere.
//   npm run logo
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import opentype from 'opentype.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const font = (f) => opentype.parse(fs.readFileSync(path.join(root, 'scripts/fonts', f)).buffer);
const SCRIPT = font(process.env.LOGO_SCRIPT || 'Yellowtail-Regular.ttf');
const SANS = font('BarlowSemiCondensed-Medium.ttf');

const CREAM = '#F4EADB';
const CRIMSON = '#C8323C';

// ---------- geometry helpers ----------
const lerp = (a, b, t) => a + (b - a) * t;
const P = (x, y) => ({ x, y });
const f = (n) => +n.toFixed(2);
const cubic = (p0, p1, p2, p3) => (t) => {
  const u = 1 - t;
  return P(
    u * u * u * p0.x + 3 * u * u * t * p1.x + 3 * u * t * t * p2.x + t * t * t * p3.x,
    u * u * u * p0.y + 3 * u * u * t * p1.y + 3 * u * t * t * p2.y + t * t * t * p3.y,
  );
};
const C = (a, b, c, d) => `M${f(a.x)},${f(a.y)} C${f(b.x)},${f(b.y)} ${f(c.x)},${f(c.y)} ${f(d.x)},${f(d.y)}`;
// quadratic-looking bowed line between a and b (bow = perpendicular offset)
const bowed = (a, b, bow) => {
  const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
  const dx = b.x - a.x, dy = b.y - a.y, len = Math.hypot(dx, dy) || 1;
  const cx = mx - (dy / len) * bow, cy = my + (dx / len) * bow;
  return `M${f(a.x)},${f(a.y)} Q${f(cx)},${f(cy)} ${f(b.x)},${f(b.y)}`;
};
const along = (a, b, t) => P(lerp(a.x, b.x, t), lerp(a.y, b.y, t));

/**
 * Engraved wing: feathers run from the arm (leading edge, 0..armEnd) to a
 * scalloped trailing edge. Returns { outline, hatch } path strings.
 */
function wing({ lead, trail, n, armEnd = 0.62, bow = 2.2, scallop = 2.4 }) {
  const outline = [];
  const hatch = [];
  const ends = [];
  for (let k = 0; k < n; k++) {
    const s = k / (n - 1);
    const b = 0.02 + s * 0.96; // along trailing edge, tip -> root
    const a = armEnd * (1 - s) + 0.06 * s; // along arm, wrist -> shoulder
    const start = lead(a);
    const end = trail(b);
    ends.push(end);
    // feather boundary
    outline.push(bowed(start, end, bow * (1 - s * 0.5)));
  }
  // scalloped trailing edge: little outward arcs between feather tips
  for (let k = 0; k < n - 1; k++) {
    const a = ends[k], b = ends[k + 1];
    outline.push(bowed(a, b, -scallop));
  }
  // feather shafts (mid-lines) + fine barbs for engraved texture
  for (let k = 0; k < n - 1; k++) {
    const s0 = k / (n - 1), s1 = (k + 1) / (n - 1);
    const sm = (s0 + s1) / 2;
    const a = armEnd * (1 - sm) + 0.06 * sm;
    const start = lead(a);
    const end = along(ends[k], ends[k + 1], 0.5);
    const shaftEnd = along(start, end, 0.86);
    const shaftStart = along(start, end, 0.18);
    hatch.push(bowed(shaftStart, shaftEnd, bow * 0.8));
  }
  // leading edge contour
  const lp = [];
  for (let i = 0; i <= 24; i++) lp.push(lead(i / 24));
  outline.push('M' + lp.map((p) => `${f(p.x)},${f(p.y)}`).join(' L'));
  // covert row: short strokes just behind the leading edge
  for (let i = 1; i < Math.round(n * 0.9); i++) {
    const t = (i / Math.round(n * 0.9)) * armEnd;
    const a = lead(t);
    const tb = trail(Math.min(0.98, 1 - t / armEnd * 0.85));
    hatch.push(bowed(a, along(a, tb, 0.22), 0.8));
  }
  return { outline: outline.join(' '), hatch: hatch.join(' ') };
}

// ---------- the bird (viewBox 0 0 260 200) ----------
function phoenix() {
  const parts = { contour: [], fine: [], fill: [] };

  // upper wing — raised up/right
  const upLead = cubic(P(100, 88), P(118, 58), P(162, 26), P(222, 6));
  const upTrail = cubic(P(222, 6), P(214, 46), P(184, 86), P(134, 104));
  const up = wing({ lead: upLead, trail: upTrail, n: 15, armEnd: 0.6, bow: 2.6, scallop: 2.2 });

  // lower wing — sweeping left/down behind the body
  const loLead = cubic(P(102, 98), P(84, 92), P(48, 100), P(14, 132));
  const loTrail = cubic(P(14, 132), P(48, 146), P(94, 138), P(126, 118));
  const lo = wing({ lead: loLead, trail: loTrail, n: 12, armEnd: 0.58, bow: -2.2, scallop: -2.2 });

  parts.contour.push(up.outline, lo.outline);
  parts.fine.push(up.hatch, lo.hatch);

  // body
  parts.contour.push(
    C(P(84, 80), P(100, 86), P(126, 98), P(150, 120)), // back
    C(P(80, 92), P(94, 110), P(122, 122), P(150, 126)), // belly
  );
  // breast feathers (little chevrons)
  for (let i = 0; i < 7; i++) {
    const t = i / 6;
    const x = lerp(92, 140, t), y = lerp(98, 118, t);
    parts.fine.push(`M${f(x - 3)},${f(y + 1.5)} Q${f(x)},${f(y + 4)} ${f(x + 3)},${f(y + 1.5)}`);
  }

  // head + neck
  parts.contour.push(
    'M84,80 C80,74 79,68 74,66 C68,64 62,66 58,70', // crown -> forehead
    'M80,92 C76,86 72,82 66,80', // throat
    'M58,70 L46,70 L57,74', // upper beak (open)
    'M57,76 L49,79 L60,78', // lower beak
    'M66,80 C62,79 59,78 58,74', // cheek
  );
  parts.fill.push('M67.2,71.4 a1.6,1.6 0 1,0 3.2,0 a1.6,1.6 0 1,0 -3.2,0'); // eye
  parts.fine.push('M64,72.5 Q68,69.5 72,72.5'); // brow
  // crest plumes with curled tips
  parts.contour.push(
    'M76,66 C78,56 86,50 96,52 C100,53 100,58 96,58',
    'M72,65 C70,55 74,46 84,42 C88,41 90,45 86,47',
    'M79,68 C86,62 96,62 104,66 C107,68 105,72 102,70',
  );

  // tail: long flowing streamers with curled ends
  const tails = [
    [P(148, 120), P(180, 126), P(206, 120), P(250, 138), 1],
    [P(149, 122), P(182, 134), P(204, 140), P(240, 160), -1],
    [P(149, 124), P(178, 140), P(196, 156), P(226, 178), 1],
    [P(150, 125), P(172, 146), P(180, 168), P(206, 190), -1],
    [P(150, 123), P(176, 144), P(188, 170), P(184, 196), 1],
  ];
  for (const [a, b, c, d, dir] of tails) {
    parts.contour.push(C(a, b, c, d));
    // curl
    parts.contour.push(`M${f(d.x)},${f(d.y)} q${f(5 * dir)},${f(-6)} ${f(0)},${f(-9 * 1)} q${f(-4 * dir)},${f(-2)} ${f(-3 * dir)},${f(3)}`);
    // feather barbs along the streamer
    const fn = cubic(a, b, c, d);
    for (let i = 3; i < 15; i++) {
      const t = i / 16;
      const p = fn(t), q = fn(t + 0.02);
      const dx = q.x - p.x, dy = q.y - p.y, l = Math.hypot(dx, dy) || 1;
      const nx = -dy / l, ny = dx / l, len = 3.2 * (1 - t * 0.6);
      parts.fine.push(`M${f(p.x)},${f(p.y)} L${f(p.x + nx * len + dx * 1.5)},${f(p.y + ny * len + dy * 1.5)}`);
    }
  }
  return parts;
}

const bird = phoenix();
const birdGroup = (color, sw = 1) => `
  <g fill="none" stroke="${color}" stroke-linecap="round" stroke-linejoin="round">
    <path d="${bird.contour.join(' ')}" stroke-width="${1.7 * sw}"/>
    <path d="${bird.fine.join(' ')}" stroke-width="${0.85 * sw}" opacity=".9"/>
  </g>
  <path d="${bird.fill.join(' ')}" fill="${color}"/>`;

// ---------- wordmark ----------
const word = SCRIPT.getPath('Phoenix', 0, 0, 200);
const wb = word.getBoundingBox();
const tag = SANS.getPath('TECHS', 0, 0, 44, { letterSpacing: 0.32 });
const tb = tag.getBoundingBox();

// Full lockup: bird flies up and away from the "nix", tag centred below the word.
const wordW = wb.x2 - wb.x1, wordH = -wb.y1;
const s = (wordW * 0.66) / 242; // bird ≈ 70% of the word width, like the reference
const bx = wb.x1 + wordW * 0.6 - 14 * s;
const by = -wordH * 0.62 - 150 * s;
const birdT = `translate(${f(bx)} ${f(by)}) scale(${f(s)})`;
const tagW = tb.x2 - tb.x1;
const tagX = wb.x1 + wordW / 2 - tagW / 2 - tb.x1;
const tagY = wb.y2 + 58;
const wordPath = word.toPathData(2);
const tagPath = SANS.getPath('TECHS', tagX, tagY, 44, { letterSpacing: 0.32 }).toPathData(2);
const pad = 24;
const vx = Math.min(wb.x1, bx + 14 * s) - pad;
const vy = Math.min(wb.y1, by + 6 * s) - pad;
const vw = Math.max(wb.x2, bx + 256 * s) + pad - vx;
const vh = tagY + pad - vy;
const VB = `${f(vx)} ${f(vy)} ${f(vw)} ${f(vh)}`;

const lockup = (color, bg) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${VB}" role="img" aria-label="PhoenixTechs">
  ${bg ? `<rect x="${f(vx)}" y="${f(vy)}" width="${f(vw)}" height="${f(vh)}" fill="${bg}"/>` : ''}
  <g transform="${birdT}">${birdGroup(color)}</g>
  <path d="${wordPath}" fill="${color}"/>
  <path d="${tagPath}" fill="${color}"/>
</svg>
`;

const mark = (color) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 264 200" role="img" aria-label="PhoenixTechs">
  <g transform="translate(2 0)">${birdGroup(color)}</g>
</svg>
`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${CRIMSON}"/>
  <g transform="translate(3.5 9) scale(.218)">${birdGroup(CREAM, 2.6)}</g>
</svg>
`;

const out = (p, s) => {
  fs.mkdirSync(path.dirname(path.join(root, p)), { recursive: true });
  fs.writeFileSync(path.join(root, p), s);
  console.log('wrote', p);
};
out('public/logo.svg', lockup(CREAM));
out('public/logo-crimson.svg', lockup(CREAM, CRIMSON));
out('public/logo-mark.svg', mark(CREAM));
out('public/favicon.svg', favicon);
// currentColor variants for inline use in the page
out('components/logo-svg.js', `// Generated by scripts/build-logo.mjs. Do not edit.\nexport const LOGO_SVG = ${JSON.stringify(lockup('currentColor'))};\nexport const LOGO_MARK_SVG = ${JSON.stringify(mark('currentColor'))};\n`);
