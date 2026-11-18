import * as THREE from 'three';

// All surface textures are generated on canvases at runtime: zero downloads,
// small GPU memory, and they tile cleanly.
const cache = new Map();

function finish(canvas, repeat = [1, 1], srgb = true) {
  const t = new THREE.CanvasTexture(canvas);
  t.wrapS = t.wrapT = THREE.RepeatWrapping;
  t.repeat.set(repeat[0], repeat[1]);
  if (srgb) t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  return t;
}

function rand(seed) {
  let s = seed;
  return () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
}

/** Long-grain wood veneer. base/dark are CSS colours. */
export function woodGrain(key, base, dark, { repeat = [1, 1], rings = 70, seed = 7 } = {}) {
  const k = `grain:${key}`;
  if (cache.has(k)) return cache.get(k);
  const W = 1024, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  const r = rand(seed);
  ctx.fillStyle = base;
  ctx.fillRect(0, 0, W, H);
  for (let i = 0; i < rings; i++) {
    const y0 = r() * H;
    const amp = 2 + r() * 10;
    const freq = 0.002 + r() * 0.006;
    const ph = r() * 10;
    ctx.strokeStyle = dark;
    ctx.globalAlpha = 0.05 + r() * 0.16;
    ctx.lineWidth = 0.5 + r() * 2;
    ctx.beginPath();
    for (let x = 0; x <= W; x += 8) {
      const y = y0 + Math.sin(x * freq + ph) * amp + Math.sin(x * freq * 3.1 + ph) * amp * 0.25;
      x === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
    }
    ctx.stroke();
  }
  // pores
  ctx.globalAlpha = 0.08;
  ctx.fillStyle = dark;
  for (let i = 0; i < 2500; i++) ctx.fillRect(r() * W, r() * H, 2 + r() * 6, 0.8);
  ctx.globalAlpha = 1;
  const t = finish(c, repeat);
  cache.set(k, t);
  return t;
}

/** Oak plank floor. */
export function plankFloor() {
  if (cache.has('floor')) return cache.get('floor');
  const S = 1024;
  const c = document.createElement('canvas');
  c.width = c.height = S;
  const ctx = c.getContext('2d');
  const r = rand(11);
  const rows = 8;
  const h = S / rows;
  for (let i = 0; i < rows; i++) {
    let x = -r() * 400;
    while (x < S) {
      const len = 350 + r() * 300;
      const tone = 168 + r() * 30;
      ctx.fillStyle = `rgb(${tone + 22},${tone - 2},${tone - 38})`;
      ctx.fillRect(x, i * h, len, h);
      for (let g = 0; g < 14; g++) {
        ctx.strokeStyle = `rgba(95,62,32,${0.05 + r() * 0.12})`;
        ctx.lineWidth = 0.6 + r() * 1.2;
        const y = i * h + r() * h;
        ctx.beginPath();
        ctx.moveTo(x, y);
        for (let xx = x; xx < x + len; xx += 20) ctx.lineTo(xx, y + Math.sin(xx / 70 + g) * 2);
        ctx.stroke();
      }
      ctx.fillStyle = 'rgba(60,38,20,0.45)';
      ctx.fillRect(x, i * h, 1.5, h);
      x += len;
    }
    ctx.fillStyle = 'rgba(60,38,20,0.4)';
    ctx.fillRect(0, i * h, S, 1.5);
  }
  const t = finish(c, [5, 5]);
  cache.set('floor', t);
  return t;
}

/** Fine noise used as a roughness/bump map for plaster, fabric, rugs. */
export function noise(key, { size = 256, lo = 200, hi = 255, repeat = [4, 4], weave = false } = {}) {
  const k = `noise:${key}`;
  if (cache.has(k)) return cache.get(k);
  const c = document.createElement('canvas');
  c.width = c.height = size;
  const ctx = c.getContext('2d');
  const img = ctx.createImageData(size, size);
  const r = rand(size + lo);
  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      let v = lo + r() * (hi - lo);
      if (weave) v *= 0.85 + 0.15 * (((x >> 2) + (y >> 2)) % 2);
      const i = (y * size + x) * 4;
      img.data[i] = img.data[i + 1] = img.data[i + 2] = v;
      img.data[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  const t = finish(c, repeat, false);
  cache.set(k, t);
  return t;
}

/** Hand-carved "pebble" relief of the Lattice TV unit front (sage green), as colour + bump. */
export function carvedPebbles() {
  if (cache.has('pebbles')) return cache.get('pebbles');
  const W = 1024, H = 192;
  const make = (bump) => {
    const c = document.createElement('canvas');
    c.width = W; c.height = H;
    const ctx = c.getContext('2d');
    const r = rand(5);
    ctx.fillStyle = bump ? '#808080' : '#6E7A55';
    ctx.fillRect(0, 0, W, H);
    for (let i = 0; i < 1400; i++) {
      const x = r() * W;
      // denser at the ends, smoother "wave" through the middle like the real piece
      const edge = Math.abs(x / W - 0.5) * 2;
      const yMid = H * (0.55 + 0.18 * Math.sin((x / W) * Math.PI * 2));
      const y = edge > 0.45 ? r() * H : yMid + (r() - 0.3) * H * 0.6;
      const rad = 6 + r() * 9;
      const g = ctx.createRadialGradient(x - rad * 0.3, y - rad * 0.3, 1, x, y, rad);
      if (bump) {
        g.addColorStop(0, '#3a3a3a');
        g.addColorStop(0.75, '#9a9a9a');
        g.addColorStop(1, '#808080');
      } else {
        g.addColorStop(0, '#59633F');
        g.addColorStop(0.8, '#8A956C');
        g.addColorStop(1, '#6E7A55');
      }
      ctx.fillStyle = g;
      ctx.beginPath();
      ctx.arc(x, y, rad, 0, Math.PI * 2);
      ctx.fill();
    }
    return finish(c, [1, 1], !bump);
  };
  const out = { map: make(false), bump: make(true) };
  cache.set('pebbles', out);
  return out;
}

/** Arch relief pattern of the Orbit side table drawer front (bump only). */
export function archRelief() {
  if (cache.has('arches')) return cache.get('arches');
  const W = 512, H = 256;
  const c = document.createElement('canvas');
  c.width = W; c.height = H;
  const ctx = c.getContext('2d');
  ctx.fillStyle = '#808080';
  ctx.fillRect(0, 0, W, H);
  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 14;
  const n = 4;
  const w = W / n;
  for (let i = 0; i < n; i++) {
    const cx = w * i + w / 2;
    ctx.beginPath();
    ctx.moveTo(cx - w * 0.36, H * 0.82);
    ctx.lineTo(cx - w * 0.36, H * 0.42);
    ctx.arc(cx, H * 0.42, w * 0.36, Math.PI, 0);
    ctx.lineTo(cx + w * 0.36, H * 0.82);
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(cx + w / 2, H * 0.98, w * 0.3, Math.PI, 0);
    ctx.stroke();
  }
  ctx.strokeRect(10, 10, W - 20, H - 20);
  const t = finish(c, [1, 1], false);
  cache.set('arches', t);
  return t;
}

/** Hand-carved "scale" relief (overlapping scoops) of the Motif nightstand / Carve dresser fronts, as colour + bump. */
export function carvedScales(key, base, light, dark) {
  const k = `scales:${key}`;
  if (cache.has(k)) return cache.get(k);
  const S = 512, R = 22;
  const make = (bump) => {
    const c = document.createElement('canvas');
    c.width = c.height = S;
    const ctx = c.getContext('2d');
    ctx.fillStyle = bump ? '#808080' : base;
    ctx.fillRect(0, 0, S, S);
    const step = R * 1.5;
    for (let row = -1; row * step * 0.6 < S + R; row++) {
      const y = row * step * 0.6;
      const off = row % 2 ? step / 2 : 0;
      for (let x = -step + off; x < S + step; x += step) {
        const g = ctx.createRadialGradient(x, y + R * 0.35, 1, x, y, R);
        if (bump) {
          g.addColorStop(0, '#404040');
          g.addColorStop(0.85, '#a8a8a8');
          g.addColorStop(1, '#5a5a5a');
        } else {
          g.addColorStop(0, dark);
          g.addColorStop(0.8, light);
          g.addColorStop(1, dark);
        }
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, R, 0, Math.PI * 2);
        ctx.fill();
      }
    }
    return finish(c, [1, 1], !bump);
  };
  const out = { map: make(false), bump: make(true) };
  cache.set(k, out);
  return out;
}
