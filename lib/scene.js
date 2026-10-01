import * as THREE from 'three';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

const lerp = (a, b, t) => a + (b - a) * t;
const smooth = (t) => t * t * (3 - 2 * t);
const CAM_Z = 11;
const PLANET_Z = -6;
const WORD_Z = -9;

/* ---------------------------------------------------------------------------
   Scroll choreography. Keys are page sections; the scene eases between them
   as each section reaches the middle of the viewport.
   Planet: crest = screen-space height of the arc's top (0 top → 1 bottom),
           r = radius as a fraction of the visible width, x = horizontal shift (fraction of width).
--------------------------------------------------------------------------- */
const KEYS = {
  hero: {
    crest: 0.36, r: 0.78, px: 0, glow: 1, word: 1, lift: 1,
    cam: [0, 0, CAM_Z], bloom: 0.18,
  },
  services: {
    crest: 1.05, r: 0.9, px: 0.25, glow: 0.7, word: 0, lift: 0,
    cam: [0, 0.2, 12], bloom: 0.18,
  },
  work: {
    crest: 1.15, r: 0.9, px: -0.25, glow: 0.6, word: 0, lift: 0,
    cam: [0.4, 0.2, 12], bloom: 0.18,
  },
  contact: {
    crest: 0.82, r: 0.8, px: 0, glow: 0.9, word: 0, lift: 0,
    cam: [0, 0, CAM_Z], bloom: 0.18,
  },
};

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

export function createScene(canvas, { reducedMotion = false, isMobile = false, word = 'PHOENIX' } = {}) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: !isMobile, powerPreference: 'high-performance' });
  const dpr = Math.min(window.devicePixelRatio, isMobile ? 1.5 : 1.75);
  renderer.setPixelRatio(dpr);
  renderer.setSize(window.innerWidth, window.innerHeight, false);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1;
  renderer.setClearColor(0x030204, 1);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, window.innerWidth / window.innerHeight, 0.1, 120);
  camera.position.set(0, 0, CAM_Z);

  // visible frustum size (world units) at a given z
  const frustum = (z) => {
    const h = 2 * (camera.position.z - z) * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
    return { h, w: h * camera.aspect };
  };

  /* ---------- Planet ---------- */
  const uniforms = { uTime: { value: 0 }, uGlow: { value: 1 } };
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
        uniform float uTime; uniform float uGlow;
        varying vec3 vN; varying vec3 vV; varying vec3 vP;
        float hash(vec3 p){ p = fract(p*0.3183099+.1); p*=17.0; return fract(p.x*p.y*p.z*(p.x+p.y+p.z)); }
        float noise(vec3 x){ vec3 i=floor(x); vec3 f=fract(x); f=f*f*(3.0-2.0*f);
          return mix(mix(mix(hash(i),hash(i+vec3(1,0,0)),f.x),mix(hash(i+vec3(0,1,0)),hash(i+vec3(1,1,0)),f.x),f.y),
                     mix(mix(hash(i+vec3(0,0,1)),hash(i+vec3(1,0,1)),f.x),mix(hash(i+vec3(0,1,1)),hash(i+vec3(1,1,1)),f.x),f.y),f.z); }
        void main() {
          float ndv = clamp(dot(vN, vV), 0.0, 1.0);
          float up = clamp(vN.y, 0.0, 1.0);
          float side = smoothstep(0.35, 0.95, abs(vN.x));

          // body: deep crimson glowing down from the crest, sinking to black
          // red hugs the crest and sinks into black toward the middle of the disc
          float edge = 1.0 - ndv;
          float lit = pow(edge, 2.6) * smoothstep(0.2, 1.0, up);
          vec3 body = mix(vec3(0.006, 0.002, 0.004), vec3(0.55, 0.04, 0.035), clamp(lit * 1.6, 0.0, 1.0));
          body = mix(body, vec3(0.9, 0.14, 0.08), pow(edge, 8.0) * up * 0.9);
          // a whisper of moving texture so it feels alive
          body *= 0.92 + 0.16 * noise(vP * 3.0 + vec3(0.0, uTime * 0.05, uTime * 0.03));
          // flanks pick up azure
          body = mix(body, vec3(0.08, 0.1, 0.45) * (0.4 + lit), side * 0.7);

          // rim: thin hot line at the crest, azure toward the sides
          float rim = pow(1.0 - ndv, 14.0);
          vec3 rimCol = mix(vec3(1.0, 0.55, 0.45), vec3(0.35, 0.45, 1.0), side);
          rimCol = mix(rimCol, vec3(1.0, 0.9, 0.85), smoothstep(0.7, 1.0, up) * (1.0 - side));
          vec3 col = body + rimCol * rim * 1.1;
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
          float i = pow(smoothstep(0.0, 0.34, d), 8.0);
          float side = smoothstep(0.3, 0.9, abs(vN.x));
          vec3 c = mix(vec3(1.0, 0.18, 0.12), vec3(0.2, 0.32, 1.0), side);
          gl_FragColor = vec4(c * i * (0.04 + side * 0.18) * uGlow, 1.0);
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
  const wordMat = new THREE.MeshBasicMaterial({ transparent: true, depthWrite: false, toneMapped: false, opacity: 0 });
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
  const emberUniforms = { uTime: { value: 0 }, uScroll: { value: 0 }, uPR: { value: dpr } };
  const embers = new THREE.Points(
    emberGeo,
    new THREE.ShaderMaterial({
      uniforms: emberUniforms,
      transparent: true,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
      vertexShader: /* glsl */ `
        attribute vec4 aSeed; uniform float uTime; uniform float uScroll; uniform float uPR;
        varying float vA; varying float vHue;
        void main(){
          vec3 p = position;
          p.y = mod(p.y + uTime * aSeed.y * 0.45 + uScroll * 2.0 + 7.0, 14.0) - 7.0;
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
  const bloom = new UnrealBloomPass(new THREE.Vector2(window.innerWidth, window.innerHeight), 0.5, 0.5, 0.9);
  composer.addPass(bloom);
  composer.addPass(new OutputPass());

  /* ---------- Scroll keys ---------- */
  let stops = [];
  let heroH = window.innerHeight;
  function measure(sections) {
    stops = sections
      .map(({ el, key }) => ({ at: el ? el.getBoundingClientRect().top + window.scrollY : 0, key: KEYS[key], el }))
      .filter((s) => s.key)
      .sort((a, b) => a.at - b.at);
    const hero = sections.find((s) => s.key === 'hero')?.el;
    if (hero) heroH = hero.offsetHeight;
  }

  const state = structuredClone(KEYS.hero);
  const target = structuredClone(KEYS.hero);
  function sampleKeys(y0) {
    if (!stops.length) return;
    const y = y0 + window.innerHeight * 0.5;
    let i = 0;
    while (i < stops.length - 1 && y > stops[i + 1].at) i++;
    const a = stops[i], b = stops[Math.min(i + 1, stops.length - 1)];
    // ease across the second half of each section so the hero holds its pose while you read it
    const startAt = lerp(a.at, b.at, 0.45);
    const t = a === b ? 0 : smooth(Math.min(1, Math.max(0, (y - startAt) / Math.max(1, b.at - startAt))));
    for (const k in target) {
      const va = a.key[k], vb = b.key[k];
      if (Array.isArray(va)) for (let j = 0; j < 3; j++) target[k][j] = lerp(va[j], vb[j], t);
      else target[k] = lerp(va, vb, t);
    }
  }

  /* ---------- Layout (responsive placement of planet + word) ---------- */
  function layout() {
    const fp = frustum(PLANET_Z);
    const narrow = camera.aspect < 0.9;
    const R = fp.w * state.r * (narrow ? 1.25 : 1);
    planetGroup.scale.setScalar(R);
    // the word sits above the crest; its bottom tucks behind the arc
    const fw = frustum(WORD_Z);
    const ww = Math.min(fw.w * (narrow ? 0.92 : 0.8), fw.h * 0.3 * wordAspect);
    wordMesh.scale.set(ww, ww / wordAspect, 1);
    return { fp, fw, R };
  }

  /* ---------- Loop ---------- */
  const pointer = { x: 0, y: 0, sx: 0, sy: 0 };
  const onPointer = (e) => {
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
  };
  window.addEventListener('pointermove', onPointer, { passive: true });

  let scrollY = window.scrollY;
  let intro = 0;
  const clock = new THREE.Timer();
  const speed = reducedMotion ? 0.15 : 1;

  function frame() {
    clock.update();
    const dt = Math.min(clock.getDelta(), 0.05);
    const t = clock.getElapsed() * speed;
    intro = Math.min(1, intro + dt * (reducedMotion ? 2 : 0.5));
    const ie = 1 - Math.pow(1 - intro, 3);

    sampleKeys(scrollY);
    const k = 1 - Math.pow(0.003, dt);
    for (const key in state) {
      if (Array.isArray(state[key])) for (let j = 0; j < 3; j++) state[key][j] = lerp(state[key][j], target[key][j], k);
      else state[key] = lerp(state[key], target[key], k);
    }
    pointer.sx = lerp(pointer.sx, pointer.x, 1 - Math.pow(0.03, dt));
    pointer.sy = lerp(pointer.sy, pointer.y, 1 - Math.pow(0.03, dt));

    const { fp, fw, R } = layout();
    // in the hero the planet scrolls with the page (attached), afterwards it is driven by keys
    const heroScroll = Math.min(scrollY, heroH) * state.lift;
    const liftP = (heroScroll / window.innerHeight) * fp.h;
    const crestY = (0.5 - state.crest) * fp.h + liftP;
    const rise = (1 - ie) * fp.h * 0.35;
    planetGroup.position.set(state.px * fp.w, crestY - R - rise, PLANET_Z);
    planet.rotation.y = t * 0.02;
    uniforms.uTime.value = t;
    uniforms.uGlow.value = state.glow * (0.15 + 0.85 * ie);

    // word: bottom ~12% below the crest so the arc bites into it
    const liftW = (heroScroll / window.innerHeight) * fw.h;
    const crestW = (0.5 - state.crest) * fw.h;
    wordMesh.position.set(0, crestW + wordMesh.scale.y * 0.36 + liftW * 0.85, WORD_Z);
    wordMat.opacity = state.word * ie;

    emberUniforms.uTime.value = t;
    emberUniforms.uScroll.value = scrollY / window.innerHeight;

    camera.position.set(state.cam[0] + pointer.sx * 0.35, state.cam[1] - pointer.sy * 0.2, state.cam[2]);
    camera.lookAt(state.cam[0] * 0.5, state.cam[1] * 0.5, 0);
    bloom.strength = state.bloom;

    composer.render();
    raf = requestAnimationFrame(frame);
  }
  let raf = requestAnimationFrame(frame);
  if (process.env.NODE_ENV !== 'production') window.__phoenix = { scene, planet, halo, bloom, embers, wordMesh, renderer };

  function resize() {
    const w = window.innerWidth, h = window.innerHeight;
    camera.aspect = w / h;
    camera.fov = w < 700 ? 50 : 35;
    camera.updateProjectionMatrix();
    renderer.setSize(w, h, false);
    composer.setSize(w, h);
  }
  window.addEventListener('resize', resize);
  resize();

  const onVisibility = () => {
    cancelAnimationFrame(raf);
    if (!document.hidden) { clock.reset?.(); raf = requestAnimationFrame(frame); }
  };
  document.addEventListener('visibilitychange', onVisibility);

  return {
    measure,
    setScroll(y) { scrollY = y; },
    destroy() {
      cancelAnimationFrame(raf);
      window.removeEventListener('pointermove', onPointer);
      window.removeEventListener('resize', resize);
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
