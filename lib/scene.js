import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const CAM_Z = 11;
const PLANET_Z = -6;
const WORD_Z = -9;

// Static hero pose. crest = height of the arc's top as a fraction of the viewport (0 top → 1 bottom),
// r = planet radius as a fraction of the visible width.
const POSE = { crest: 0.36, r: 0.78, bloom: 0.38 };

/** Giant display word drawn to a texture so the planet can occlude it (Fireblox-style). */
async function makeWordTexture(text) {
  const family = getComputedStyle(document.documentElement).getPropertyValue('--font-anton').trim() || 'Anton';
  try { await document.fonts.load(`400 200px ${family}`); } catch {}
  const c = document.createElement('canvas');
  const ctx = c.getContext('2d');
  const size = 420;
  ctx.font = `400 ${size}px ${family}, Impact, sans-serif`;
  const w = Math.ceil(ctx.measureText(text).width + 40);
  const h = Math.ceil(size * 1.02);
  c.width = w;
  c.height = h;
  ctx.font = `400 ${size}px ${family}, Impact, sans-serif`;
  ctx.textBaseline = 'alphabetic';
  ctx.textAlign = 'center';
  const g = ctx.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#ededed');
  g.addColorStop(0.55, '#ebe2df');
  g.addColorStop(0.8, '#e8b4ae');
  g.addColorStop(1, '#e0605a');
  ctx.fillStyle = g;
  ctx.fillText(text, w / 2, h * 0.93);
  const tex = new THREE.CanvasTexture(c);
  tex.colorSpace = THREE.SRGBColorSpace;
  tex.anisotropy = 4;
  return { tex, aspect: w / h };
}

/**
 * Still hero backdrop: planet + giant word, with faint rising embers.
 * The canvas lives inside the hero and scrolls away with it like an image.
 */
export function createScene(canvas, { reducedMotion = false, isMobile = false, word = 'PHOENIXTECHS' } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75);
  renderer.setPixelRatio(dpr);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x07060a, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 120);
  camera.position.set(0, 0, CAM_Z);

  // visible frustum size (world units) at a given z
  const frustum = (z) => {
    const h = 2 * (camera.position.z - z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    return { h, w: h * camera.aspect };
  };

  /* ---------- Planet ---------- */
  const uniforms = { uGlow: { value: 1 } };
  const planet = new THREE.Mesh(
    new THREE.SphereGeometry(1, 192, 192),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        void main() {
          vec4 mv = modelViewMatrix * vec4(position, 1.0);
          vN = normalize(normalMatrix * normal);
          vV = normalize(-mv.xyz);
          vP = position;
          gl_Position = projectionMatrix * mv;
        }`,
      fragmentShader: /* glsl */ `
        uniform float uGlow;
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        float hash(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
        float noise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
          return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                     mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
        void main() {
          float ndv = clamp(dot(vN, vV), 0.0, 1.0);
          float up = clamp(vN.y, 0.0, 1.0);
          float side = smoothstep(0.35, 0.95, abs(vN.x));

          float edge = 1.0 - ndv;
          float lit = pow(edge, 1.6) * smoothstep(0.05, 0.9, up);

          // body glows with color from the rim inward
          vec3 body = vec3(0.005, 0.002, 0.01);
          // red near the top
          body = mix(body, vec3(0.7, 0.03, 0.06), clamp(lit * 2.2, 0.0, 1.0));
          body = mix(body, vec3(1.0, 0.1, 0.12), pow(edge, 3.5) * up);
          // wide purple/magenta zone
          float sideF = smoothstep(0.1, 0.7, abs(vN.x));
          body = mix(body, vec3(0.5, 0.04, 0.6) * (0.8 + lit * 0.6), sideF * 0.85 * (0.3 + edge * 0.7));
          // blue flanks
          body = mix(body, vec3(0.08, 0.15, 0.75) * (0.6 + lit * 0.5), smoothstep(0.45, 0.95, abs(vN.x)) * 0.9);
          body *= 0.92 + 0.14 * noise(vP * 3.0);

          // rim: hot red → magenta → purple → vivid blue
          float rim = pow(1.0 - ndv, 8.0);
          float side = smoothstep(0.0, 0.85, abs(vN.x));
          vec3 rimCol = mix(vec3(1.0, 0.18, 0.1), vec3(0.85, 0.1, 0.75), smoothstep(0.0, 0.35, side));
          rimCol = mix(rimCol, vec3(0.5, 0.1, 0.95), smoothstep(0.25, 0.55, side));
          rimCol = mix(rimCol, vec3(0.15, 0.35, 1.0), smoothstep(0.5, 0.85, side));
          rimCol = mix(rimCol, vec3(1.0, 0.8, 0.7), smoothstep(0.8, 1.0, up) * (1.0 - side));
          vec3 col = body + rimCol * rim * 2.0;
          gl_FragColor = vec4(col * uGlow, 1.0);
        }`,
    }),
  );

  // soft halo that hugs the silhouette (back faces only)
  const halo = new THREE.Mesh(
    new THREE.SphereGeometry(1.06, 128, 128),
    new THREE.ShaderMaterial({
      uniforms,
      vertexShader: /* glsl */ `
        varying vec3 vN; varying vec3 vV;
        void main(){ vec4 mv = modelViewMatrix*vec4(position,1.0); vN = normalize(normalMatrix*normal); vV = normalize(-mv.xyz); gl_Position = projectionMatrix*mv; }`,
      fragmentShader: /* glsl */ `
        uniform float uGlow; varying vec3 vN; varying vec3 vV;
        void main(){
          // 0 at the halo's outer edge → ~0.33 where it meets the planet
          float d = clamp(-dot(vN, vV), 0.0, 1.0);
          float i = pow(smoothstep(0.0, 0.38, d), 5.0);
          float side = smoothstep(0.2, 0.85, abs(vN.x));
          vec3 c = mix(vec3(1.0, 0.12, 0.08), vec3(0.7, 0.08, 0.7), smoothstep(0.0, 0.4, side));
          c = mix(c, vec3(0.12, 0.28, 1.0), smoothstep(0.35, 0.9, side));
          gl_FragColor = vec4(c * i * (0.12 + side * 0.35) * uGlow, 1.0);
        }`,
      side: THREE.BackSide,
      blending: THREE.AdditiveBlending,
      transparent: true,
      depthWrite: false,
    }),
  );
  const planetGroup = new THREE.Group();
  planetGroup.add(planet, halo);
  scene.add(planetGroup);

  /* ---------- Giant word (behind the planet) ---------- */
  const wordMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false });
  const wordMesh = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), wordMat);
  wordMesh.renderOrder = -1;
  wordMesh.visible = false;
  scene.add(wordMesh);
  let wordAspect = 3;
  makeWordTexture(word).then(({ tex, aspect }) => {
    wordMat.map = tex;
    wordMat.needsUpdate = true;
    wordAspect = aspect;
    wordMesh.visible = true;
    layout();
  });

  /* ---------- Embers (subtle, rising) ---------- */
  const COUNT = isMobile ? 220 : 480;
  const pos = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT * 4);
  for (let i = 0; i < COUNT; i++) {
    pos[i * 3] = (Math.random() - 0.5) * 26;
    pos[i * 3 + 1] = (Math.random() - 0.5) * 14;
    pos[i * 3 + 2] = -8 + Math.random() * 10;
    seed.set([Math.random(), 0.25 + Math.random() * 0.75, Math.random(), Math.random()], i * 4);
  }
  const emberGeo = new THREE.BufferGeometry();
  emberGeo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  emberGeo.setAttribute('aSeed', new THREE.BufferAttribute(seed, 4));
  const emberUniforms = { uTime: { value: 0 }, uPR: { value: dpr } };
  const embers = new THREE.Points(
    emberGeo,
    new THREE.ShaderMaterial({
      uniforms: emberUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute vec4 aSeed; uniform float uTime; uniform float uPR;
        varying float vA; varying float vHue;
        void main(){
          vec3 p = position;
          p.y = mod(p.y + uTime * aSeed.y * 0.45 + 7.0, 14.0) - 7.0;
          p.x += sin(uTime * 0.5 * aSeed.y + aSeed.x * 6.283) * 0.3;
          vec4 mv = modelViewMatrix * vec4(p, 1.0);
          gl_Position = projectionMatrix * mv;
          float flick = 0.5 + 0.5 * sin(uTime * (1.5 + aSeed.x * 4.0) + aSeed.x * 40.0);
          float edge = smoothstep(-7.0, -4.0, p.y) * (1.0 - smoothstep(3.5, 7.0, p.y));
          vA = flick * edge * (0.25 + 0.75 * aSeed.z);
          vHue = aSeed.w;
          gl_PointSize = (1.0 + aSeed.z * 2.2) * uPR * (16.0 / -mv.z);
        }`,
      fragmentShader: /* glsl */ `
        varying float vA; varying float vHue;
        void main(){
          float d = length(gl_PointCoord - 0.5);
          float a = smoothstep(0.5, 0.0, d);
          vec3 c = mix(vec3(1.0, 0.35, 0.18), vec3(1.0, 0.7, 0.45), vHue);
          gl_FragColor = vec4(c, a * a * vA * 0.7);
        }`,
    }),
  );
  scene.add(embers);

  /* ---------- Post ---------- */
  const composer = new EffectComposer(renderer);
  composer.setPixelRatio(dpr);
  composer.addPass(new RenderPass(scene, camera));
  const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), POSE.bloom, 0.5, 0.9);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------- Layout ---------- */
  // Positions are relative to the first viewport-height of the hero, so the composition
  // matches on load and simply scrolls away with the page.
  let viewH = window.innerHeight;
  function layout() {
    const w = canvas.clientWidth || window.innerWidth;
    const h = canvas.clientHeight || window.innerHeight;
    camera.aspect = w / h;
    camera.fov = w < 700 ? 50 : 35;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    composer.setSize(w, h);

    const narrow = w / viewH < 0.9;
    const fp = frustum(PLANET_Z);
    const fw = frustum(WORD_Z);
    const crest = (POSE.crest * viewH) / h; // keep the crest at the same on-screen height
    const R = fp.w * POSE.r * (narrow ? 1.25 : 1);
    planetGroup.scale.setScalar(R);
    planetGroup.position.set(0, (0.5 - crest) * fp.h - R, PLANET_Z);

    const ww = Math.min(fw.w * (narrow ? 0.92 : 0.8), fw.h * (viewH / h) * 0.3 * wordAspect);
    wordMesh.scale.set(ww, ww / wordAspect, 1);
    wordMesh.position.set(0, (0.5 - crest) * fw.h + wordMesh.scale.y * 0.36, WORD_Z);
    render();
  }
  const render = () => composer.render();

  /* ---------- Embers loop (only while the hero is on screen) ---------- */
  const clock = new THREE.Timer();
  let raf = 0;
  let visible = true;
  function frame() {
    clock.update();
    emberUniforms.uTime.value = clock.getElapsed();
    render();
    raf = requestAnimationFrame(frame);
  }
  const start = () => { if (!raf && visible && !reducedMotion && !document.hidden) raf = requestAnimationFrame(frame); };
  const stop = () => { cancelAnimationFrame(raf); raf = 0; };
  const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; visible ? start() : stop(); });
  io.observe(canvas);
  const onVisibility = () => (document.hidden ? stop() : start());
  document.addEventListener('visibilitychange', onVisibility);

  const onResize = () => { viewH = window.innerHeight; layout(); };
  const ro = new ResizeObserver(() => layout());
  ro.observe(canvas);
  window.addEventListener('resize', onResize);
  layout();
  start();
  if (process.env.NODE_ENV !== 'production') window.__phoenix = { scene, planet, halo, bloom, embers, wordMesh, renderer };

  return {
    destroy() {
      stop();
      io.disconnect();
      ro.disconnect();
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      scene.traverse((o) => {
        o.geometry?.dispose();
        if (o.material) [].concat(o.material).forEach((m) => { m.map?.dispose(); m.dispose(); });
      });
      composer.dispose();
      renderer.dispose();
    },
  };
}
