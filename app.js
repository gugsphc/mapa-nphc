{
const { ZN, AN, UN, AR, TH, THT, ZL, MEC, GR, THU, DS, MIDLINE, FAT, ELEM, FA, FD, GN, GE, GRD, SYS, FS, HEMI, FGRP, PRELIM, FSUB, FSEC, KNOTA, FORD, REDE, RTIP } = window.POL;
const UCOR = u => u ? UN[u].cor : '#8a8f98';
const stageTxt = S => (S.etapas || []).map(e => e.f.map(f => FAT[f].curto).join(e.rel === 'alt' ? ' ou ' : ' + ')).join(' → ');
const uname = u => u ? UN[u].nome : 'várias unidades';
const NOSIDE = new Set(['M1', 'PM2', 'A44', 'A45']);
const gradsOf = s => Object.keys(GRD).filter(g => !(s === 'L' && GRD[g].onlyR) && !(s === 'R' && GRD[g].onlyL));
const edgeGrads = (a, b, s) => gradsOf(s).filter(g => { const q = GRD[g].seq; for (let i = 0; i + 1 < q.length; i++) if ((q[i] === a && q[i + 1] === b) || (q[i] === b && q[i + 1] === a)) return true; return false; });
const $ = s => document.querySelector(s);
const esc = s => String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));
const ZORD = ['P', 'S', 'T', 'M'];
const MORD = ['coord', 'acoord', 'auto', 'sub', 'neo'];

/* ---------- estado ---------- */
const FRONT = new Set([4, 6, 8, 9, 10, 11, 24, 25, 32, 33, 44, 45, 46, 47]);
const ANTN = new Set(['M1', 'M1V', 'PM2', 'PM2V', 'PF3', 'A44', 'A45']);
const OFFZ = 26;
const st = { hemiPaint: false, sys: null, div: 'all', grad: false, gsel: new Set(), mode: 'zonas', hemi: 'B', medSide: null, latSide: 'L', lastView: 'lat', labsPrev: null, infl: 0, cortex: 'op', labs: false, sel: new Set(), lit: new Set(), hov: null, groups: new Set(Object.keys(GR)) };

/* ---------- metadados das estruturas profundas ---------- */
const META = base => {
  if (base.startsWith('th_')) {
    const k = base.slice(3), T = TH[k];
    return { key: base, n: `${k} · ${T.nome}`, grp: 'talamo', mech: T.tipo === 'lim' ? 'auto' : 'sub', u: THU[k], cor: THT[T.tipo][1], d: T.d, kh: T.kh, pre: T.pre,
      k: '—', areas: Object.keys(AR).filter(b => (AR[b].t || []).includes(k)).map(Number), nuc: k };
  }
  return DS[base] && Object.assign(DS[base], { key: base });
};

/* ---------- cores ---------- */
const hex = h => { const n = parseInt(h.slice(1), 16); return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255]; };
const mix = (a, b, t) => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
const W = [1, 1, 1], GREY = hex('#c9c5bd'), MW = hex('#d8d3ca'), NEUT = hex('#b9b3a9');
const brodCol = b => { const h = (b * 0.618034) % 1, s = .55, l = .55; const f = n => { const k = (n + h * 12) % 12; return l - s * Math.min(l, 1 - l) * Math.max(-1, Math.min(k - 3, 9 - k, 1)); }; return [f(0), f(8), f(4)]; };
function areaColor(b, strong) {
  const A = AR[b]; if (!b) return MW; if (!A) return GREY;
  if (st.mode === 'zonas') return hex(ZN[A.z].cor);
  if (st.mode === 'anal') return mix(hex(AN[A.a].cor), W, A.z === 'S' && !strong ? .58 : 0);
  if (st.mode === 'luria') return strong ? hex(UN[A.u].cor) : mix(hex(UN[A.u].cor), W, { P: 0, S: .3, T: .52, M: .1 }[A.zl || A.z]);
  if (st.mode === 'mec') return hex(MEC[A.z === 'M' ? 'auto' : 'neo'].cor);
  if (st.mode === 'fat' || st.mode === 'sys') return FA[b] ? hex(FAT[FA[b]].cor) : A.z === 'P' ? hex(ELEM.cor) : hex('#d9d4cb');
  return brodCol(b);
}
function deepColor(m) {
  if (!m.mech && m.u == null) return hex(m.cor);           // ventrículos
  if (st.mode === 'mec') return hex(MEC[m.mech].cor);
  if (st.mode === 'luria') return m.u ? hex(UN[m.u].cor) : NEUT;
  if (st.mode === 'fat' || st.mode === 'sys') return FD[m.key] ? hex(FAT[FD[m.key]].cor) : NEUT;
  return hex(m.cor);
}

/* ---------- three ---------- */
const view = $('#viewer'), cv = $('#cv');
const R = new THREE.WebGLRenderer({ canvas: cv, antialias: true, alpha: true });
R.setPixelRatio(Math.min(devicePixelRatio, 2)); R.localClippingEnabled = true;
const scene = new THREE.Scene();
const cam = new THREE.PerspectiveCamera(28, 1, 5, 3000);
const ctl = new THREE.OrbitControls(cam, cv); ctl.enableDamping = true; ctl.dampingFactor = .12; ctl.minDistance = 60; ctl.maxDistance = 1000;
scene.add(new THREE.HemisphereLight(0xffffff, 0x666660, .75));
const head = new THREE.DirectionalLight(0xffffff, .55); head.position.set(.4, .6, 1); cam.add(head); scene.add(cam);
const C0 = [0, -18, 6];
const tx = (a, i, s) => [a[i] / s - C0[0], a[i + 2] / s - C0[2], -(a[i + 1] / s - C0[1])];
const dec = (s, T) => { const bin = atob(s), u = new Uint8Array(bin.length); for (let i = 0; i < bin.length; i++) u[i] = bin.charCodeAt(i); return new T(u.buffer); };
const CLIP = { L: [new THREE.Plane(new THREE.Vector3(-1, 0, 0), 0)], R: [new THREE.Plane(new THREE.Vector3(1, 0, 0), 0)], B: [] };

const H = {}, labs = [], deep = [];
const matC = new THREE.MeshLambertMaterial({ vertexColors: true });

function build(D) {
  for (const h of ['left', 'right']) {
    const d = D.hemis[h], n = d.n;
    const Pi = dec(d.P, Int16Array), Ii = dec(d.I, Int16Array), F = dec(d.F, Uint16Array);
    const P = new Float32Array(n * 3), I = new Float32Array(n * 3);
    for (let v = 0; v < n; v++) { P.set(tx(Pi, v * 3, 50), v * 3); I.set(tx(Ii, v * 3, 50), v * 3); }
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setIndex(new THREE.BufferAttribute(F, 1)); g.computeVertexNormals();
    const gi = new THREE.BufferGeometry(); gi.setAttribute('position', new THREE.BufferAttribute(I, 3)); gi.setIndex(new THREE.BufferAttribute(F, 1)); gi.computeVertexNormals();
    g.morphAttributes.position = [gi.attributes.position]; g.morphAttributes.normal = [gi.attributes.normal];
    g.setAttribute('color', new THREE.BufferAttribute(new Float32Array(n * 3), 3));
    const L = dec(d.L, Uint8Array), S = dec(d.S, Int8Array);
    // divisão anterior/posterior pelo sulco central
    const cls = new Uint8Array(n);
    for (let v = 0; v < n; v++) cls[v] = (L[v] === 0 || L[v] === 13) ? ((-P[v * 3 + 2] + C0[1]) > -15 ? 1 : 0) : (FRONT.has(L[v]) ? 1 : 0);
    { // suaviza a fronteira (maioria dos vizinhos, 6 iterações)
      const nb = Array.from({ length: n }, () => []);
      for (let f = 0; f < F.length; f += 3) { const x = F[f], y = F[f + 1], z = F[f + 2]; nb[x].push(y, z); nb[y].push(x, z); nb[z].push(x, y); }
      for (let it = 0; it < 6; it++) { const c2 = cls.slice(); for (let v = 0; v < n; v++) { let s = 0; for (const u of nb[v]) s += cls[u]; const fr = s / nb[v].length; if (fr > .6) c2[v] = 1; else if (fr < .4) c2[v] = 0; } cls.set(c2); }
    }
    const Fa = [], Fp = [];
    for (let f = 0; f < F.length; f += 3) { const s = cls[F[f]] + cls[F[f + 1]] + cls[F[f + 2]]; (s >= 2 ? Fa : Fp).push(F[f], F[f + 1], F[f + 2]); }
    const parts = {};
    for (const [k, idx] of [['ant', Fa], ['post', Fp]]) {
      const gp = new THREE.BufferGeometry();
      for (const at of ['position', 'normal', 'color']) gp.setAttribute(at, g.attributes[at]);
      gp.morphAttributes.position = g.morphAttributes.position; gp.morphAttributes.normal = g.morphAttributes.normal;
      gp.setIndex(new THREE.BufferAttribute(new Uint16Array(idx), 1));
      const m = new THREE.Mesh(gp, matC); m.morphTargetInfluences[0] = 0; m.userData.h = h; m.userData.part = k; m.renderOrder = 2; scene.add(m); parts[k] = m;
    }
    const mesh = parts.ant;
    const shade = new Float32Array(n); for (let v = 0; v < n; v++) shade[v] = Math.max(.62, Math.min(1.06, .92 - .2 * (S[v] / 20)));
    const ctr = new THREE.Vector3(); for (let v = 0; v < n; v++) { ctr.x += P[v * 3]; ctr.y += P[v * 3 + 1]; ctr.z += P[v * 3 + 2]; } ctr.multiplyScalar(1 / n);
    H[h] = { mesh, parts, cls, g, L, S, shade, n, P, I, ctr, Pn: g.attributes.normal.array, In: gi.attributes.normal.array };
    for (const b in d.A) { const el = document.createElement('div'); el.className = 'lab'; el.textContent = b; $('#labs').appendChild(el); labs.push({ h, b: +b, v: d.A[b], el }); }
  }
  for (const key in D.deep) {
    const t = D.deep[key], vi = dec(t.v, Int16Array), F = dec(t.f, Uint16Array), n = vi.length / 3, P = new Float32Array(vi.length);
    for (let v = 0; v < n; v++) P.set(tx(vi, v * 3, 50), v * 3);
    const g = new THREE.BufferGeometry(); g.setAttribute('position', new THREE.BufferAttribute(P, 3)); g.setIndex(new THREE.BufferAttribute(F, 1)); g.computeVertexNormals();
    const sm = key.match(/_(L|R)$/), side = sm ? sm[1] : 'M', base = sm ? key.slice(0, -2) : key, m = META(base);
    if (!m) continue;
    const mat = new THREE.MeshLambertMaterial({ color: '#999', side: THREE.DoubleSide });
    const mesh = new THREE.Mesh(g, mat); mesh.userData.base = base; mesh.renderOrder = m.grp === 'cerebelo' && base !== 'denteado' ? 1 : 0; scene.add(mesh);
    const el = document.createElement('div'); el.className = 'lab deep'; el.textContent = m.nuc || m.n; el.style.display = 'none'; $('#labs').appendChild(el);
    deep.push({ key, base, side, m, mesh, el, c: new THREE.Vector3(...tx(t.c.map(x => x * 50), 0, 50)) });
  }
  $('#load').remove();
  buildGrad(); applyVis(); recolor(); setView('lat', true); showMode(); resize(); loop();
}

/* ---------- gradientes de Goldberg ---------- */
const GRAD = { L: new THREE.Group(), R: new THREE.Group() }; scene.add(GRAD.L, GRAD.R);
const GSUB = {}; for (const s of ['L', 'R']) { GSUB[s] = { ant: new THREE.Group(), post: new THREE.Group() }; GRAD[s].add(GSUB[s].ant, GSUB[s].post); }
const gnodes = [], gedges = [];
const lvlCol = l => l === 1 ? ZN.P.cor : l === 2 ? ZN.S.cor : l === 3 ? ZN.T.cor : '#7a6a3a';
function vpos(Hh, v, out, off) {
  const t = st.infl, i = v * 3;
  out.set(Hh.P[i] + (Hh.I[i] - Hh.P[i]) * t, Hh.P[i + 1] + (Hh.I[i + 1] - Hh.P[i + 1]) * t, Hh.P[i + 2] + (Hh.I[i + 2] - Hh.P[i + 2]) * t);
  if (off) { n3.set(Hh.Pn[i] + (Hh.In[i] - Hh.Pn[i]) * t, Hh.Pn[i + 1] + (Hh.In[i + 1] - Hh.Pn[i + 1]) * t, Hh.Pn[i + 2] + (Hh.In[i + 2] - Hh.Pn[i + 2]) * t).normalize(); out.addScaledVector(n3, off); }
  return out;
}
function nodeVertex(Hh, node) {
  const tmp = new THREE.Vector3(); let vs = [];
  for (let v = 0; v < Hh.n; v++) if (node.areas.includes(Hh.L[v])) vs.push(v);
  if (!vs.length) return null;
  const P = vs.map(v => vpos(Hh, v, new THREE.Vector3()));
  const q = (arr, p) => { const s = arr.slice().sort((x, y) => x - y); return s[Math.floor(p * (s.length - 1))]; };
  const mx = P.reduce((s, p) => s + Math.abs(p.x), 0) / P.length;
  let keep = P.map((p, i) => i);
  const lat = i => Math.abs(P[i].x) >= mx - 2;
  if (node.filt === 'pole') { const zq = q(P.map(p => p.z), .8); keep = keep.filter(i => P[i].z >= zq); }
  else if (node.filt === 'dors') { const yq = q(P.map(p => p.y), .55); keep = keep.filter(i => P[i].y >= yq && lat(i)); }
  else if (node.filt === 'vent') { const yq = q(P.map(p => p.y), .35); keep = keep.filter(i => P[i].y <= yq && lat(i)); }
  else if (node.filt === 'post') { const zq = q(P.map(p => p.z), .5); keep = keep.filter(i => P[i].z >= zq && lat(i)); }
  else keep = keep.filter(lat);
  if (!keep.length) keep = P.map((p, i) => i);
  const c = keep.reduce((s, i) => s.add(P[i]), new THREE.Vector3()).multiplyScalar(1 / keep.length);
  let best = keep[0], bs = 1e9;
  for (const i of keep) { const sc = P[i].distanceTo(c) + (Hh.S[vs[i]] > 0 ? 6 : 0); if (sc < bs) { bs = sc; best = i; } }
  return vs[best];
}
function nearestSurface(Hh, p, out) {
  let best = 0, bd = 1e12; const t = st.infl;
  for (let v = 0; v < Hh.n; v++) {
    const i = v * 3, x = Hh.P[i] + (Hh.I[i] - Hh.P[i]) * t - p.x, y = Hh.P[i + 1] + (Hh.I[i + 1] - Hh.P[i + 1]) * t - p.y, z = Hh.P[i + 2] + (Hh.I[i + 2] - Hh.P[i + 2]) * t - p.z;
    const d = x * x + y * y + z * z; if (d < bd) { bd = d; best = v; }
  }
  return vpos(Hh, best, out, 3.2);
}
function buildGrad() {
  for (const s of ['L', 'R']) for (const k of ['ant', 'post']) { const G = GSUB[s][k]; while (G.children.length) { const c = G.children.pop(); c.geometry.dispose(); } }
  for (const nd of gnodes) nd.el.remove(); gnodes.length = 0; gedges.length = 0;
  for (const [s, h] of [['L', 'left'], ['R', 'right']]) {
    const Hh = H[h], pos = {};
    for (const id in GN) {
      const node = GN[id]; if (node.onlyL && s === 'R') continue;
      const v = nodeVertex(Hh, node); if (v == null) continue;
      pos[id] = vpos(Hh, v, new THREE.Vector3(), 3.5);
      const m = new THREE.Mesh(new THREE.SphereGeometry(node.lvl === 2.5 ? 3.2 : 3.6, 20, 14), new THREE.MeshLambertMaterial({ color: lvlCol(node.lvl) }));
      m.position.copy(pos[id]); m.userData.gn = id; m.userData.side = s; GSUB[s][ANTN.has(id) ? 'ant' : 'post'].add(m);
      const el = document.createElement('div'); el.className = 'lab gn'; el.style.borderColor = lvlCol(node.lvl);
      el.textContent = node.lab + (NOSIDE.has(id) ? '' : s); $('#labs').appendChild(el);
      gnodes.push({ id, s, m, el });
    }
    for (const [a, b] of GE[s]) {
      if (!pos[a] || !pos[b]) continue;
      const pts = []; const N = 22, tmp = new THREE.Vector3();
      for (let k = 0; k <= N; k++) { tmp.copy(pos[a]).lerp(pos[b], k / N); pts.push(k === 0 ? pos[a].clone() : k === N ? pos[b].clone() : nearestSurface(Hh, tmp, new THREE.Vector3())); }
      const curve = new THREE.CatmullRomCurve3(pts), mat = new THREE.MeshLambertMaterial({ color: '#10131a' }), meshes = [], gg = edgeGrads(a, b, s);
      if (s === 'L') meshes.push(new THREE.Mesh(new THREE.TubeGeometry(curve, 60, 1.05, 6, false), mat));
      else { const all = curve.getSpacedPoints(80); for (let k = 0; k < 80; k += 6) meshes.push(new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(all.slice(k, k + 4)), 6, 1.05, 6, false), mat)); }
      meshes.forEach(m => { m.userData.ge = gg; m.userData.side = s; GSUB[s][ANTN.has(a) ? 'ant' : 'post'].add(m); }); gedges.push({ a, b, s, mat, gg });
    }
  }
  applyGrad();
}
function applyGrad() {
  GRAD.L.visible = st.grad && effH() !== 'R';
  GRAD.R.visible = st.grad && effH() !== 'L';
  for (const s of ['L', 'R']) for (const k of ['ant', 'post']) { GSUB[s][k].visible = partOn(k); GSUB[s][k].position.z = st.div === 'sep' ? (k === 'ant' ? -OFFZ : OFFZ) : 0; }
  const any = st.gsel.size > 0;
  for (const nd of gnodes) {
    const on = st.gsel.has(nd.id), c = lvlCol(GN[nd.id].lvl);
    nd.m.material.color.set(any && !on ? '#bcb6ad' : c); nd.m.material.emissive.set(on ? c : '#000'); nd.m.material.emissiveIntensity = on ? .4 : 0;
    nd.m.scale.setScalar(on ? 1.35 : 1); nd.el.classList.toggle('on', on);
  }
  for (const e of gedges) { const on = st.gsel.has(e.a) && st.gsel.has(e.b) && (!st.grd || e.gg.includes(st.grd)); e.mat.color.set(any ? (on ? (st.grd ? GRD[st.grd].cor : '#b3121d') : '#7d776f') : '#10131a'); }
}
/* ---------- sistemas funcionais: triangulação ---------- */
const SYSG = new THREE.Group(); SYSG.renderOrder = 20; scene.add(SYSG);
const syslabs = [];
const ovMat = c => new THREE.MeshBasicMaterial({ color: c, depthTest: false, transparent: true, opacity: .95 });
function factorPoint(Hh, f) {
  const set = new Set(FAT[f].pt || FAT[f].areas); const vs = [];
  for (let v = 0; v < Hh.n; v++) if (set.has(Hh.L[v])) vs.push(v);
  if (!vs.length) return null;
  const P = vs.map(v => vpos(Hh, v, new THREE.Vector3())), c = P.reduce((s, p) => s.add(p), new THREE.Vector3()).multiplyScalar(1 / P.length);
  let bi = 0, bd = 1e9; P.forEach((p, i) => { const d = p.distanceTo(c) + (Hh.S[vs[i]] > 0 ? 5 : 0); if (d < bd) { bd = d; bi = i; } });
  const v = vs[bi], out = vpos(Hh, v, new THREE.Vector3(), 4);
  if (st.div === 'sep') out.z += FRONT.has(Hh.L[v]) ? -OFFZ : OFFZ;
  return out;
}
function drawSys() {
  while (SYSG.children.length) { const c = SYSG.children.pop(); c.geometry.dispose(); }
  syslabs.forEach(l => l.el.remove()); syslabs.length = 0;
  if (!st.sys) return;
  const S = SYS[st.sys], both = st.hemi === 'B';
  const sides = both ? ['left', 'right'] : [st.hemi === 'R' ? 'right' : 'left'];
  const sx0 = sides.length === 1 ? (sides[0] === 'left' ? -1 : 1) : 0;
  const hub = both ? new THREE.Vector3(0, 60, -112) : new THREE.Vector3(sx0 * 55, 56, -112);
  const hm = new THREE.Mesh(new THREE.SphereGeometry(6, 24, 16), ovMat('#10131a')); hm.position.copy(hub); hm.renderOrder = 22; SYSG.add(hm);
  const addLab = (p, txt, cls, col, op) => { const el = document.createElement('div'); el.className = 'lab ' + cls; el.textContent = txt; if (col) el.style.borderColor = col; if (op) el.style.opacity = op; $('#labs').appendChild(el); syslabs.push({ p: p.clone(), el }); };
  addLab(hub.clone().add(new THREE.Vector3(0, 11, 0)), S.nome + (both ? ' · E + D' : ''), 'sysh');
  for (const side of sides) {
    const Hh = H[side], sx = side === 'left' ? -1 : 1, faint = both && side === 'right';
    const mat = c => { const m = ovMat(c); if (faint) m.opacity = .45; return m; };
    const pts = {}; for (const l of S.links) { const p = factorPoint(Hh, l.f); if (p) pts[l.f] = p; }
    const fundSet = new Set((S.fundo || []).map(x => x.f)); const placed = [];
    for (const k in pts) {
      const p = pts[k], col = FAT[k].cor, ctrl = p.clone().lerp(hub, .5); ctrl.x += sx * 40; ctrl.y += 15;
      const tube = new THREE.Mesh(new THREE.TubeGeometry(new THREE.QuadraticBezierCurve3(hub, ctrl, p), 40, faint ? .9 : 1.3, 8, false), mat(col)); tube.renderOrder = 21; SYSG.add(tube);
      const s = new THREE.Mesh(new THREE.SphereGeometry(faint ? 3.4 : 4.2, 20, 14), mat(col)); s.position.copy(p); s.renderOrder = 23; s.userData.sysf = k; SYSG.add(s);
      let lp = p.clone().add(new THREE.Vector3(0, fundSet.has(k) ? -9 : 8, 0)); const scr = v => { const n = v.clone().project(cam); return new THREE.Vector2(n.x * 400, n.y * 300); }; let guard = 0; while (guard++ < 6 && placed.some(q => { const d = scr(lp); return Math.abs(q.x - d.x) < 75 && Math.abs(q.y - d.y) < 13; })) lp.y -= 8; placed.push(scr(lp));
      addLab(lp, FAT[k].curto + (fundSet.has(k) ? ' · fundo' : '') + (both ? (side === 'left' ? ' · E' : ' · D') : ''), 'sysf', col, faint ? .7 : 0);
    }
    const E = S.etapas || [], seen = new Set(), fund = new Set((S.fundo || []).map(x => x.f));
    const segLine = (p, q, r, dashed, col) => { const curve = new THREE.LineCurve3(p, q); if (!dashed) { const t = new THREE.Mesh(new THREE.TubeGeometry(curve, 2, r, 6, false), mat(col)); t.renderOrder = 21; SYSG.add(t); return; }
      const all = curve.getSpacedPoints(24); for (let k = 0; k < 24; k += 4) { const t = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(all.slice(k, k + 3)), 3, r, 6, false), mat(col)); t.renderOrder = 21; SYSG.add(t); } };
    const nodes = E.map((e, i) => { const ps = e.f.map(k => pts[k]).filter(Boolean); if (!ps.length) return null;
      let c; if (ps.length === 1) c = ps[0].clone();
      else { c = ps.reduce((s0, p) => s0.add(p), new THREE.Vector3()).multiplyScalar(1 / ps.length); c.x += sx * 16; c.y += 8;
        const j = new THREE.Mesh(new THREE.SphereGeometry(faint ? 2.4 : 3, 16, 12), mat('#ffffff')); j.position.copy(c); j.renderOrder = 23; SYSG.add(j);
        const r = new THREE.Mesh(new THREE.TorusGeometry(faint ? 2.6 : 3.2, .6, 8, 24), mat('#10131a')); r.position.copy(c); r.renderOrder = 23; SYSG.add(r);
        ps.forEach(p => segLine(c, p, faint ? .45 : .7, e.rel === 'alt', '#10131a')); }
      if (side === sides[0]) addLab(c.clone().add(new THREE.Vector3(sx * 9, -7, 0)), String(i + 1) + (e.rel === 'alt' ? ' (ou)' : ''), 'sysn');
      return c; });
    const arrow = (a1, b1, col, flip) => {
      const mid = a1.clone().lerp(b1, .5), off = flip ? -1 : 1; mid.x += sx * 22 * off; mid.y += 10 * off;
      const curve = new THREE.QuadraticBezierCurve3(a1, mid, b1), all = curve.getSpacedPoints(60);
      for (let k = 0; k < 60; k += 5) { const seg = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(all.slice(k, k + 3)), 4, .8, 6, false), mat(col)); seg.renderOrder = 21; SYSG.add(seg); }
      const dir = b1.clone().sub(all[56]).normalize(), cone = new THREE.Mesh(new THREE.ConeGeometry(2.6, 7, 12), mat(col));
      cone.position.copy(all[53]); cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir); cone.renderOrder = 22; SYSG.add(cone); };
    const key = e => e.f.join('+');
    for (let i = 0; i + 1 < E.length; i++) { if (!nodes[i] || !nodes[i + 1]) continue;
      const k1 = key(E[i]) + '>' + key(E[i + 1]), flip = seen.has(key(E[i + 1]) + '>' + key(E[i])); seen.add(k1); arrow(nodes[i], nodes[i + 1], '#10131a', flip); }
    if (S.ciclo && nodes[E.length - 1] && nodes[S.ciclo.para] && nodes[E.length - 1] !== nodes[S.ciclo.para]) arrow(nodes[E.length - 1], nodes[S.ciclo.para], '#b3122e', true);
  }
}
let gradPend = null;
const rebuildGrad = () => { if (gradPend) return; gradPend = setTimeout(() => { gradPend = null; buildGrad(); drawSys(); }, 120); };

function recolor() {
  const sel = st.sel, any = sel.size > 0 || st.lit.size > 0;
  for (const h in H) {
    const { g, L, shade, n } = H[h], c = g.attributes.color.array, cache = {};
    for (let v = 0; v < n; v++) {
      const b = L[v]; let col = cache[b];
      if (!col) {
        col = areaColor(b, sel.has(b));
        if (st.hemiPaint) col = b ? mix(hex(h === 'left' ? '#1d5fb8' : '#c2557a'), W, b && AR[b] && AR[b].z === 'P' ? .45 : .12) : MW;
        else if (any && !sel.has(b)) col = mix(col, GREY, .86);
        if (b && st.hov === 'a' + b) col = mix(col, W, .32);
        cache[b] = col;
      }
      const s = shade[v]; c[v * 3] = col[0] * s; c[v * 3 + 1] = col[1] * s; c[v * 3 + 2] = col[2] * s;
    }
    g.attributes.color.needsUpdate = true;
  }
  for (const l of labs) l.el.classList.toggle('on', sel.has(l.b) && sel.size < 6);
  for (const D of deep) {
    const on = st.lit.has(D.base); let col = deepColor(D.m);
    if (any && !on) col = mix(col, GREY, .7);
    if (st.hov === 'd' + D.base) col = mix(col, W, .3);
    D.mesh.material.color.setRGB(...col);
    D.mesh.material.emissive.setRGB(...(on ? col.map(x => x * .35) : [0, 0, 0]));
    D.on = on;
  }
}

function applyVis() {
  const cx = st.cortex; if (gnodes.length) setTimeout(applyGrad);
  for (const [h, s] of [['left', 'L'], ['right', 'R']]) for (const k of ['ant', 'post']) {
    const m = H[h].parts[k]; m.visible = cx !== 'off' && effH() !== (s === 'L' ? 'R' : 'L') && partOn(k);
    m.position.z = st.div === 'sep' ? (k === 'ant' ? -OFFZ : OFFZ) : 0;
  }
  matC.transparent = cx === 'glass'; matC.opacity = cx === 'glass' ? .17 : 1; matC.depthWrite = cx !== 'glass'; matC.needsUpdate = true;
  for (const D of deep) {
    const g = D.m.grp, mat = D.mesh.material;
    D.mesh.visible = st.groups.has(g) && (D.side === 'M' || effH() === 'B' || D.side === effH());
    mat.clippingPlanes = MIDLINE.includes(D.base) ? CLIP[effH()] : [];
    const glassy = cx === 'glass' && g === 'cerebelo' && D.base !== 'denteado';
    const vent = g === 'vent';
    mat.transparent = glassy || vent; mat.opacity = glassy ? .25 : vent ? .55 : 1; mat.depthWrite = !(glassy || vent); mat.needsUpdate = true;
  }
}

function partOn(k) { return st.div === 'all' || st.div === 'sep' || st.div === k; }
const effH = () => st.medSide || st.hemi;
const hemiOn = h => st.cortex !== 'off' && effH() !== (h === 'left' ? 'R' : 'L');

/* ---------- vistas ---------- */
let anim = null;
const TG0 = new THREE.Vector3(0, -6, 0);
function setView(v, instant) { syncSeg('#views', v);
  const prevMed = st.medSide;
  st.medSide = v === 'med' && st.hemi === 'B' ? (st.lastView === 'med' && prevMed === 'L' ? 'R' : 'L') : null;
  st.lastView = v;
  if (prevMed !== st.medSide && H.left) { applyVis(); applyGrad(); }
  const side = (st.medSide || st.hemi) === 'R' ? 1 : -1;
  const dirs = { lat: [side, 0, 0], med: [-side, 0, 0], sup: [0, 1, 0.0001], inf: [0, -1, 0.0001], ant: [0, 0, -1], post: [0, 0, 1] };
  const dist = Math.max(470, 460 / Math.max(cam.aspect, .3)) * (st.sys && st.hemi === 'B' ? 1.5 : 1);
  const d = new THREE.Vector3(...dirs[v]).normalize().multiplyScalar(dist);
  if (st.hemi === 'B' && v === 'lat') d.set(st.latSide === 'R' ? 330 : -330, 100, -270);
  const tg = TG0.clone(); if (st.sys && st.hemi === 'B' && v === 'sup') tg.z -= 18; d.add(tg);
  const up = v === 'sup' ? new THREE.Vector3(0, 0, -1) : v === 'inf' ? new THREE.Vector3(0, 0, 1) : new THREE.Vector3(0, 1, 0);
  if (instant || matchMedia('(prefers-reduced-motion: reduce)').matches) { cam.position.copy(d); cam.up.copy(up); ctl.target.copy(tg); ctl.update(); return; }
  anim = { t: 0, p0: cam.position.clone(), p1: d, u0: cam.up.clone(), u1: up, g0: ctl.target.clone(), g1: tg };
}
function focusDeep(base) {
  const pts = deep.filter(D => D.base === base && D.mesh.visible); if (!pts.length) return;
  const c = pts.reduce((a, D) => a.add(D.c), new THREE.Vector3()).multiplyScalar(1 / pts.length);
  const dir = cam.position.clone().sub(ctl.target).normalize();
  anim = { t: 0, p0: cam.position.clone(), p1: c.clone().add(dir.multiplyScalar(260)), u0: cam.up.clone(), u1: cam.up.clone(), g0: ctl.target.clone(), g1: c };
}

/* ---------- loop ---------- */
const v3 = new THREE.Vector3(), n3 = new THREE.Vector3(), cpos = new THREE.Vector3();
function loop() {
  requestAnimationFrame(loop);
  if (anim) {
    anim.t = Math.min(1, anim.t + .045); const e = anim.t < .5 ? 2 * anim.t * anim.t : 1 - (-2 * anim.t + 2) ** 2 / 2;
    const tg = anim.g0.clone().lerp(anim.g1, e), a0 = anim.p0.clone().sub(anim.g0), a1 = anim.p1.clone().sub(anim.g1);
    const r = a0.length() * (1 - e) + a1.length() * e;
    cam.position.copy(a0).normalize().lerp(a1.normalize(), e).normalize().multiplyScalar(r).add(tg);
    cam.up.copy(anim.u0).lerp(anim.u1, e).normalize(); ctl.target.copy(tg);
    if (anim.t >= 1) anim = null;
  }
  ctl.update(); R.render(scene, cam); placeLabels();
}
const put = (el, p, w, h) => { v3.copy(p).project(cam); el.style.display = ''; el.style.left = ((v3.x + 1) / 2 * w) + 'px'; el.style.top = ((1 - v3.y) / 2 * h) + 'px'; };
function placeLabels() {
  const w = cv.clientWidth, h = cv.clientHeight, t = st.infl; cpos.copy(cam.position);
  for (const l of labs) {
    const Hh = H[l.h];
    const pk = FRONT.has(l.b) ? 'ant' : 'post';
    if ((!st.labs && (st.sys || !st.sel.has(l.b))) || !Hh.parts[pk].visible || st.cortex !== 'op' || (st.grad && !st.sel.has(l.b))) { l.el.style.display = 'none'; continue; }
    const i = l.v * 3;
    v3.set(Hh.P[i] + (Hh.I[i] - Hh.P[i]) * t, Hh.P[i + 1] + (Hh.I[i + 1] - Hh.P[i + 1]) * t, Hh.P[i + 2] + (Hh.I[i + 2] - Hh.P[i + 2]) * t);
    n3.set(Hh.Pn[i] + (Hh.In[i] - Hh.Pn[i]) * t, Hh.Pn[i + 1] + (Hh.In[i + 1] - Hh.Pn[i + 1]) * t, Hh.Pn[i + 2] + (Hh.In[i + 2] - Hh.Pn[i + 2]) * t).normalize();
    v3.z += Hh.parts[pk].position.z;
    if (n3.dot(cpos.clone().sub(v3).normalize()) < .12 || v3.clone().sub(Hh.ctr).dot(cpos.clone().sub(Hh.ctr).normalize()) < -4) { l.el.style.display = 'none'; continue; }
    put(l.el, v3, w, h);
  }
  for (const nd of gnodes) {
    if (!GRAD[nd.s].visible || !nd.m.parent.visible) { nd.el.style.display = 'none'; continue; }
    nd.m.getWorldPosition(v3); const ctr = H[nd.s === 'L' ? 'left' : 'right'].ctr;
    if (st.cortex === 'op' && v3.clone().sub(ctr).dot(cpos.clone().sub(ctr).normalize()) < -4) { nd.el.style.display = 'none'; continue; }
    put(nd.el, v3, w, h); nd.el.style.transform = 'translate(-50%,-140%)';
  }
  for (const l of syslabs) put(l.el, l.p, w, h);
  const shown = new Set();
  for (const D of deep) {
    const show = D.on && D.mesh.visible && !shown.has(D.base) && (st.cortex !== 'op' || ['tronco', 'cerebelo'].includes(D.m.grp));
    if (!show) { D.el.style.display = 'none'; continue; }
    shown.add(D.base); put(D.el, D.c, w, h);
  }
}
function resize() { const w = view.clientWidth, h = view.clientHeight; R.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); }
const ro = new ResizeObserver(resize); ro.observe(view);

/* ---------- tela cheia e captura ---------- */
$('#bFull').addEventListener('click', () => {
  const fe = document.fullscreenElement || document.webkitFullscreenElement;
  if (fe) (document.exitFullscreen || document.webkitExitFullscreen).call(document);
  else { const stg = view.parentElement; (stg.requestFullscreen || stg.webkitRequestFullscreen).call(stg); }
});
const fsSync = () => { const on = !!(document.fullscreenElement || document.webkitFullscreenElement); const bf = $('#bFull'); bf.title = on ? 'Sair da tela cheia (Esc)' : 'Tela cheia (Esc para sair)'; bf.setAttribute('aria-label', on ? 'Sair da tela cheia' : 'Tela cheia'); bf.innerHTML = on ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 4v5H4M20 9h-5V4M15 20v-5h5M4 15h5v5"/></svg>' : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 9V4h5M15 4h5v5M20 15v5h-5M9 20H4v-5"/></svg>'; syncTg(); };
const syncTg = () => { $('#tgTop').textContent = view.classList.contains('noTop') ? '▼' : '▲'; $('#tgBot').textContent = view.classList.contains('noBot') ? '▲' : '▼';
  $('#tgTop').title = view.classList.contains('noTop') ? 'Mostrar menu de cima' : 'Ocultar menu de cima'; $('#tgBot').title = view.classList.contains('noBot') ? 'Mostrar menu de baixo' : 'Ocultar menu de baixo';
  const nl = view.classList.contains('noLeft'); $('#tgLeft').textContent = nl ? '▶' : '◀'; $('#tgLeft').title = nl ? 'Mostrar o menu da esquerda' : 'Ocultar o menu da esquerda'; };
$('#tgTop').addEventListener('click', () => { view.classList.toggle('noTop'); syncTg(); });
$('#tgSide').addEventListener('click', () => { const s = view.parentElement; s.classList.toggle('noInfo'); $('#tgSide').textContent = s.classList.contains('noInfo') ? '◀' : '▶'; $('#tgSide').title = s.classList.contains('noInfo') ? 'Mostrar o painel de detalhes e os botões de imagem' : 'Ocultar o painel de detalhes e os botões de imagem'; });
$('#tgBot').addEventListener('click', () => { view.classList.toggle('noBot'); syncTg(); });
$('#tgLeft').addEventListener('click', () => { view.classList.toggle('noLeft'); syncTg(); });
/* encaixa o menu da esquerda entre os menus de cima e de baixo */
const railEl = $('.bar.rail'), topEl = $('.bar.top'), botEl = $('.bar.bot');
function layoutBars() {
  const H = view.clientHeight, vr = view.getBoundingClientRect();
  const tb = view.classList.contains('noTop') ? 0 : topEl.getBoundingClientRect().bottom - vr.top;
  const bb = view.classList.contains('noBot') ? H : botEl.getBoundingClientRect().top - vr.top;
  const t = Math.max(tb, 0) + 8, avail = Math.max(bb - 8 - t, 80);
  railEl.classList.remove('two', 'tight'); railEl.style.maxHeight = '';
  let h = railEl.offsetHeight;
  if (h > avail) { railEl.classList.add('two'); h = railEl.offsetHeight; }
  if (h > avail) { railEl.classList.add('tight'); h = railEl.offsetHeight; }
  railEl.style.top = (t + Math.max(0, (avail - h) / 2)) + 'px';
  if (h > avail) railEl.style.maxHeight = avail + 'px';
}
new ResizeObserver(layoutBars).observe(view); new ResizeObserver(layoutBars).observe(topEl); new ResizeObserver(layoutBars).observe(botEl);
for (const id of ['#tgTop', '#tgBot', '#tgLeft']) $(id).addEventListener('click', () => requestAnimationFrame(layoutBars));
if (document.fonts) document.fonts.ready.then(layoutBars);
document.addEventListener('fullscreenchange', fsSync); document.addEventListener('webkitfullscreenchange', fsSync);
function rrect(g, x, y, w, h, r) { g.beginPath(); g.moveTo(x + r, y); g.arcTo(x + w, y, x + w, y + h, r); g.arcTo(x + w, y + h, x, y + h, r); g.arcTo(x, y + h, x, y, r); g.arcTo(x, y, x + w, y, r); g.closePath(); }
function salvarImagem() {
  const w = view.clientWidth, h = view.clientHeight, k = 3, old = R.getPixelRatio();
  R.setPixelRatio(k); R.setSize(w, h, false); R.render(scene, cam);
  const out = document.createElement('canvas'); out.width = w * k; out.height = h * k;
  const g = out.getContext('2d'); g.fillStyle = '#ffffff'; g.fillRect(0, 0, out.width, out.height);
  const vr = cv.getBoundingClientRect(); g.drawImage(cv, 0, 0, out.width, out.height);
  for (const el of view.querySelectorAll('.lab')) {
    if (el.style.display === 'none' || !el.offsetParent) continue;
    const r = el.getBoundingClientRect(); if (r.width === 0 || r.right < vr.left || r.left > vr.right || r.bottom < vr.top || r.top > vr.bottom) continue;
    const cs = getComputedStyle(el), x = (r.left - vr.left) * k, y = (r.top - vr.top) * k, ww = r.width * k, hh = r.height * k;
    g.globalAlpha = +cs.opacity || 1;
    if (cs.backgroundColor && cs.backgroundColor !== 'rgba(0, 0, 0, 0)') { g.fillStyle = cs.backgroundColor; rrect(g, x, y, ww, hh, (parseFloat(cs.borderTopLeftRadius) || 0) * k); g.fill(); }
    const bw = parseFloat(cs.borderTopWidth) || 0;
    if (bw && cs.borderTopStyle !== 'none') { g.strokeStyle = cs.borderTopColor; g.lineWidth = bw * k; rrect(g, x + bw * k / 2, y + bw * k / 2, ww - bw * k, hh - bw * k, (parseFloat(cs.borderTopLeftRadius) || 0) * k); g.stroke(); }
    g.fillStyle = cs.color; g.font = `${cs.fontStyle} ${cs.fontWeight} ${parseFloat(cs.fontSize) * k}px ${cs.fontFamily}`;
    g.textBaseline = 'middle'; g.textAlign = 'center'; g.fillText(el.textContent, x + ww / 2, y + hh / 2 + 0.5 * k);
    g.globalAlpha = 1;
  }
  R.setPixelRatio(old); R.setSize(w, h, false); R.render(scene, cam);
  const nome = 'mapa-nphc-' + st.mode + (st.sys ? '-' + st.sys : '') + '.png';
  out.toBlob(b => { const u = URL.createObjectURL(b), lk = document.createElement('a'); lk.href = u; lk.download = nome; document.body.appendChild(lk); lk.click(); lk.remove(); setTimeout(() => URL.revokeObjectURL(u), 4000); }, 'image/png');
}
$('#bShot').addEventListener('click', salvarImagem);

/* ---------- picking ---------- */
const ray = new THREE.Raycaster(), mp = new THREE.Vector2(); let down = null, pending = null;
function pick(ev) {
  const r = cv.getBoundingClientRect(); mp.set((ev.clientX - r.left) / r.width * 2 - 1, -(ev.clientY - r.top) / r.height * 2 + 1);
  ray.setFromCamera(mp, cam);
  if (st.sys) { const sh = ray.intersectObjects(SYSG.children.filter(o => o.userData.sysf), false)[0]; if (sh) return { sysf: sh.object.userData.sysf }; }
  if (st.grad) {
    const all = [...GSUB.L.ant.children, ...GSUB.L.post.children, ...GSUB.R.ant.children, ...GSUB.R.post.children].filter(o => o.parent.visible && o.parent.parent.visible);
    const gh = ray.intersectObjects(all.filter(o => o.userData.gn), false)[0]; if (gh) return { gn: gh.object.userData.gn, side: gh.object.userData.side };
    const eh = ray.intersectObjects(all.filter(o => o.userData.ge), false)[0]; if (eh && eh.object.userData.ge.length) return { grd: eh.object.userData.ge[0], side: eh.object.userData.side, gl: eh.object.userData.ge };
  }
  const objs = deep.filter(D => D.mesh.visible && !(st.cortex === 'glass' && D.m.grp === 'cerebelo' && D.base !== 'denteado')).map(D => D.mesh);
  if (st.cortex === 'op') for (const x of Object.values(H)) for (const k in x.parts) if (x.parts[k].visible) objs.push(x.parts[k]);
  const hits = ray.intersectObjects(objs, false);
  const hit = hits.find(hh => { const pl = hh.object.material.clippingPlanes; return !pl || !pl.length || pl[0].distanceToPoint(hh.point) >= 0; });
  if (!hit) return null;
  if (hit.object.userData.base) return { deep: hit.object.userData.base };
  const Hh = H[hit.object.userData.h], f = hit.face, ls = [Hh.L[f.a], Hh.L[f.b], Hh.L[f.c]];
  return { b: ls[0] === ls[1] || ls[0] === ls[2] ? ls[0] : ls[1] };
}
const tip = $('#tip');
cv.addEventListener('pointermove', ev => {
  if (pending) return; pending = requestAnimationFrame(() => {
    pending = null; if (ev.buttons) { tip.style.display = 'none'; return; }
    const p = pick(ev), r = view.getBoundingClientRect();
    let txt = '', hv = null;
    if (p && p.grd) { txt = `<b>Gradiente ${p.gl.map(g => esc(GRD[g].nome.toLowerCase())).join(' / ')}</b><br>${p.gl.map(g => esc(GRD[g].esq)).join(' / ')} · clique para percorrer`; }
    else if (p && p.sysf) { const L = SYS[st.sys].links.find(l => l.f === p.sysf); txt = `<b>${esc(FAT[p.sysf].nome)}</b><br>${esc(L.papel)}`; }
    else if (p && p.gn) { const g = GN[p.gn]; hv = null; txt = `<b>${esc(g.lab)}${NOSIDE.has(p.gn) ? '' : p.side}</b> · ${esc(g.nome)}<br>Goldberg, nível ${g.lvl === 2.5 ? '2–3' : g.lvl}`; }
    else if (p && p.deep) { const m = META(p.deep); hv = 'd' + p.deep; txt = `<b>${esc(m.n)}</b><br>${esc(GR[m.grp])}${m.u ? ' · ' + esc(UN[m.u].nome) : ''}`; }
    else if (p && p.b && AR[p.b]) { hv = 'a' + p.b; const A = AR[p.b];
      if ((st.mode === 'fat' || st.mode === 'sys') && (FA[p.b] || A.z === 'P')) { const F = FA[p.b] ? FAT[FA[p.b]] : null, d = F ? F.def : ELEM.d, s1 = d.split(/(?<=\.)\s/)[0];
        txt = `<b style="color:${F ? F.cor : ELEM.cor}">${esc(F ? F.nome : ELEM.nome)}</b><br><span style="font-size:12px">${esc(s1.length > 220 ? s1.slice(0, 217) + '…' : s1)}</span><br><span class="note" style="font-size:11px">Área ${p.b} · ${esc(A.n)}</span>`; }
      else txt = `<b>Área ${p.b}</b> · ${esc(A.n)}<br>${esc(ZN[A.z].nome)} · ${esc(UN[A.u].nome)}`; }
    else if (p && p.b === 0) txt = 'Parede medial (não cortical)';
    if (hv !== st.hov) { st.hov = hv; recolor(); }
    if (txt) { tip.innerHTML = txt; tip.style.display = 'block'; tip.style.left = Math.min(ev.clientX - r.left + 14, r.width - 270) + 'px'; tip.style.top = (ev.clientY - r.top + 14) + 'px'; }
    else tip.style.display = 'none';
    cv.style.cursor = txt ? 'pointer' : 'grab';
  });
});
cv.addEventListener('pointerleave', () => { tip.style.display = 'none'; if (st.hov) { st.hov = null; recolor(); } });
cv.addEventListener('pointerdown', ev => { down = [ev.clientX, ev.clientY]; });
cv.addEventListener('pointerup', ev => {
  if (!down || Math.hypot(ev.clientX - down[0], ev.clientY - down[1]) > 5) return; down = null;
  const p = pick(ev);
  if (p && p.grd) showGrad(p.grd, p.side); else if (p && p.sysf) showFactor(p.sysf); else if (p && p.gn) showNode(p.gn, p.side); else if (p && p.deep) showDeep(p.deep); else if (p && p.b && AR[p.b]) showArea(p.b); else showMode();
});

/* ---------- painel ---------- */
const info = $('#info');
const zchip = z => `<button class="chip" data-z="${z}"><i style="background:${ZN[z].cor}"></i>${esc(ZN[z].nome)}</button>`;
const uchip = u => u ? `<button class="chip" data-u="${u}"><i style="background:${UN[u].cor}"></i>${esc(UN[u].nome)}</button>` : '<span class="chip"><i style="background:#b9b3a9"></i>Unidade não atribuída por Luria</span>';
const achip = a => `<button class="chip" data-a="${a}"><i style="background:${AN[a].cor}"></i>${esc(AN[a].nome)}</button>`;
const mchip = m => m ? `<button class="chip" data-m="${m}"><i style="background:${MEC[m].cor}"></i>${esc(MEC[m].nome)}</button>` : '';
const bchips = list => `<div class="chips">${list.filter(b => AR[b]).map(b => `<button class="chip" data-b="${b}" title="${esc(AR[b].n)}">${b}</button>`).join('')}</div>`;
const dchips = list => `<div class="chips">${list.map(k => { const m = META(k); return `<button class="chip" data-d="${k}"><i style="background:${esc(m.cor)}"></i>${esc(m.nuc || m.n)}</button>`; }).join('')}</div>`;
const deepBases = () => [...new Set(deep.map(D => D.base))];
function clearSys() { if (st.sys) { st.sys = null; drawSys(); } }
function setSel(areas, lit, gs, grd) { st.grd = grd || null; st.hemiPaint = false; st.sel = new Set(areas); st.lit = new Set(lit || []); st.gsel = new Set(gs || []); recolor(); if (gnodes.length) applyGrad(); }
const back = '<button class="back" data-back>← legenda</button>';
const ensureVisible = base => { const g = META(base).grp; if (!st.groups.has(g)) { st.groups.add(g); syncGroups(); applyVis(); } };

function showMode() {
  clearSys(); setSel([]);
  let h = '', items = [];
  if (st.mode === 'zonas') {
    h = '<h3>Zonas de Poliakov</h3><p class="note">Cor = grupo de campos. Primários são as zonas de projeção, extremidade cortical de cada analisador (no sentido de Pavlov retomado por Luria, do receptor até o córtex); secundários e terciários são zonas de associação, modais e amodais. Clique numa zona para destacá-la, ou num campo ou estrutura do modelo para abrir sua ficha.</p>';
    items = ZORD.map(z => `<button class="lg" data-z="${z}"><span class="sw" style="background:${ZN[z].cor}"></span><span>${esc(ZN[z].nome)}<small>${esc(ZN[z].sub)}</small></span></button>`);
  } else if (st.mode === 'anal') {
    h = '<h3>Analisadores e zonas de associação</h3><p class="note"><b>Analisador</b>, no sentido de Pavlov retomado por Luria, é todo o aparelho que vai do receptor periférico, pelas vias e relés, até a <b>zona de projeção</b> no córtex (campo primário), sua extremidade cortical (FN, p. 85–86; Luria, 1966, p. 51). No modelo, o tom escuro é essa zona de projeção. O tom claro são os campos secundários, a <b>zona de associação modal</b>: Luria a descreve como ligada diretamente à terminação cortical do analisador e ainda modalmente específica (FN, p. 57), e Poliakov a inclui, com o primário, na “zona nuclear” do analisador (Fig. 46). Em roxo, os terciários, <b>zonas de associação amodais</b>, de sobreposição das terminações corticais de vários analisadores (FN, p. 54, 57). Zonas de associação = secundárias + terciárias.</p>';
    items = Object.keys(AN).map(a => `<button class="lg" data-a="${a}"><span class="sw" style="background:${AN[a].cor}"></span><span>${esc(AN[a].nome)}<small>${esc(AN[a].desc)}</small></span></button>`);
  } else if (st.mode === 'luria') {
    h = '<h3>Unidades funcionais de Luria</h3><p class="note">Cor = unidade. No córtex, a saturação diminui do primário ao terciário. Estruturas profundas pela unidade a que pertencem. O cerebelo fica em cinza: Luria não o inclui explicitamente.</p>';
    items = [1, 2, 3].map(u => `<button class="lg" data-u="${u}"><span class="sw" style="background:${UN[u].cor}"></span><span>${esc(UN[u].nome)} · ${esc(UN[u].tit)}</span></button>`);
  } else if (st.mode === 'mec') {
    h = '<h3>Mecanismos reflexos de Poliakov (1971)</h3><p class="note">O encéfalo inteiro, do eixo ao neocórtex. Cada mecanismo sustenta uma função: auto-regulação, auto-controle, auto-direção e direção. Use <b>Córtex: Vidro</b> para ver o interior.</p>';
    items = MORD.map(m => `<button class="lg" data-m="${m}"><span class="sw" style="background:${MEC[m].cor}"></span><span>${esc(MEC[m].nome)}<small>${esc(MEC[m].fun)}</small></span></button>`);
  } else if (st.mode === 'sys') {
    h = '<h3>Sistemas funcionais complexos</h3><p class="note">Uma função psicológica superior é um sistema funcional: a tarefa e o efeito são constantes, os meios e elos são variáveis (Anokhin; Bernstein) (HCF, p. 22). Qualquer elo lesado perturba o sistema, cada um de modo diferente (HCF, p. 78). Em função do conteúdo da tarefa, mudam o peso e o grau de contribuição dos elos do sistema funcional, ou fatores (por exemplo, escrita à cópia, ao ditado ou espontânea; leitura em voz alta ou para si). Com a automatização (decorrente da aprendizagem), o peso de cada elo muda (localização dinâmica). A ativação aparece como fundo em todos os sistemas, assim como a programação, regulação e controle. Clique num sistema: o mapa triangula os fatores envolvidos, com raios do sistema a cada fator. Setas pretas: etapas sucessivas. Nó branco: elos simultâneos na mesma etapa (traço contínuo) ou alternativos (tracejado). Seta vermelha: retorno de controle. Fatores “de fundo” atuam durante todo o curso.</p>';
    items = Object.keys(SYS).map(s => `<button class="lg" data-s="${s}"><span class="sw" style="background:conic-gradient(${SYS[s].links.map((l, i, A) => `${FAT[l.f].cor} ${i / A.length * 100}% ${(i + 1) / A.length * 100}%`).join(',')})"></span><span>${esc(SYS[s].nome)}<small>${esc(stageTxt(SYS[s]))}${SYS[s].fundo ? ' · fundo: ' + SYS[s].fundo.map(x => esc(FAT[x.f].curto)).join(', ') : ''}</small></span></button>`);
  } else if (st.mode === 'fat') {
    h = '<h3>Fatores neuropsicológicos</h3><p class="note"><b>Fator.</b> Os fatores são processos fisiológicos locais que se desenvolvem em determinadas estruturas cerebrais formadoras de síndromes, a unidade mínima estrutural e funcional do encéfalo que determina o caráter da síndrome neuropsicológica. Por fator, Luria compreendia “a função propriamente dita” (<i>modus operandi</i>) de uma ou outra estrutura encefálica, o princípio ou modo de seu funcionamento. Cada área do sistema funcional que está na base de uma função psicológica (linguagem, percepção, movimentos etc.) responde por determinado grupo de fatores; quebrado um fator, vários sistemas se desorganizam de uma vez, cada um a seu modo (HCF, p. 82–84; Luria, 1966, p. xvii, 49–51).</p><p class="note">Ordem: primeiro os nove fatores clássicos de Luria, por unidade funcional; depois as ampliações de Khomskaya (2003, p. 268–273), em discussão. Cada fator traz o grupo correspondente na tipologia de Khomskaya; o ponto colorido indica a unidade de Luria. </p><p class="note"> Clique num fator para acender suas áreas, seus nós e linhas no esquema de Goldberg e suas estruturas profundas. As linhas seguem a Fig. 2–3 de Goldberg (1990): contínuas à esquerda, tracejadas à direita.</p>';
    const fbtn = (f, ext) => { const F = FAT[f]; const sub = ext ? `Khomskaya, grupo ${F.g} · ${esc(KNOTA[f] || '')}` : `<span style="color:${UCOR(F.u)}">●</span> ${esc(uname(F.u))} · Khomskaya, grupo ${F.g}`;
      return `<button class="lg" data-f="${f}" title="${esc(F.def)}"><span class="sw" style="background:${F.cor}${ext ? ';opacity:.75' : ''}"></span><span>${esc(F.nome)}<small>${sub}</small></span></button>`; };
    items = [`<button class="lg" data-elem="1"><span class="sw" style="background:${ELEM.cor}"></span><span>${esc(ELEM.nome)}<small>17, 41, 3, 4 · déficits elementares; como fator, ponto em aberto</small></span></button>`]
      .concat(FSEC.flatMap((sec, si) => [`<div class="fg"><span class="fgn">${si ? 'K' : 'L'}</span><div><b>${esc(sec.t)}</b><small>${esc(sec.d)}</small></div></div>`]
        .concat(sec.subs.flatMap(x => [`<p class="fsub">${esc(x.t)}</p>`].concat(x.fs.map(f => fbtn(f, si > 0)), x.nota ? [`<p class="note" style="margin:2px 0 6px 34px">${esc(x.nota)}</p>`] : [])))),
      [`<div class="fg" id="lg-grd"><span class="fgn" style="background:none;color:var(--ink)">◇</span><div><b>Gradientes de Goldberg</b><small>Clique num gradiente, ou numa linha do modelo, para percorrê-lo de polo a polo.</small></div></div>`],
      
      Object.keys(GRD).filter(g => !GRD[g].onlyR).map(g => `<button class="lg" data-grd="${g}"><span class="sw" style="background:${GRD[g].cor}"></span><span>${esc(GRD[g].nome)}<small>${esc(GRD[g].esq)} · ${GRD[g].seq.map(n => GN[n].lab).join(' → ')}</small></span></button>`));
  } else {
    h = '<h3>Anatomia</h3><p class="note">Áreas de Brodmann em cores arbitrárias; estruturas profundas em cores anatômicas. Os números marcam o centro de cada área.</p>';
  }
  info.innerHTML = h + `<div class="legend">${items.join('')}</div>` +
    `<h3 style="margin-top:8px">Estruturas profundas</h3>${Object.keys(GR).map(g => `<p class="note" style="margin:10px 0 2px">${esc(GR[g])}</p>${dchips(deepBases().filter(b => META(b).grp === g))}`).join('')}` +
    `<p class="note" style="margin-top:14px">Arraste para girar, use a roda ou a pinça para aproximar. <b>Inflar</b> abre os sulcos do córtex. Com um só hemisfério, as estruturas medianas aparecem em corte sagital.</p>`;
}
function showZone(z) {
  clearSys();
  const Z = ZN[z]; setSel(ZL[z]);
  info.innerHTML = back + `<h3 style="color:${Z.cor}">${esc(Z.nome)}</h3><p class="ru">${esc(Z.sub)} · ${esc(Z.ru)}</p>${bchips(ZL[z])}
  <dl class="f"><dt>Campos</dt><dd>${esc(Z.campos)}</dd><dt>Definição</dt><dd>${esc(Z.def)}</dd><dt>Conexões</dt><dd>${esc(Z.con)}</dd><dt>Organização</dt><dd>${esc(Z.org)}</dd>
  <dt>Citoarquitetura</dt><dd>${esc(Z.cito)}</dd><dt>Função</dt><dd>${esc(Z.func)}</dd><dt>Lesão e estimulação</dt><dd>${esc(Z.clin)}</dd><dt>Filo e ontogênese</dt><dd>${esc(Z.gen)}</dd></dl>`;
}
function showAnal(a) {
  clearSys();
  const list = Object.keys(AR).filter(b => AR[b].a === a).map(Number); setSel(list);
  info.innerHTML = back + `<h3 style="color:${AN[a].cor}">${esc(AN[a].nome)}</h3><p>${esc(AN[a].desc)}</p>${bchips(list)}` +
    ZORD.filter(z => list.some(b => AR[b].z === z)).map(z => `<p>${zchip(z)} ${list.filter(b => AR[b].z === z).join(', ')}</p>`).join('');
}
function showUnit(u) {
  clearSys();
  const U = UN[u], list = Object.keys(AR).filter(b => AR[b].u === +u).map(Number), dl = deepBases().filter(b => META(b).u === +u);
  setSel(list, dl);
  info.innerHTML = back + `<h3 style="color:${U.cor}">${esc(U.nome)}: ${esc(U.tit)}</h3>${bchips(list)}${dchips(dl)}
  <dl class="f"><dt>Estruturas</dt><dd>${esc(U.estr)}</dd><dt>Modo de trabalho</dt><dd>${esc(U.trab)}</dd><dt>Em Poliakov</dt><dd>${esc(U.pol)}</dd></dl>`;
}
function showMec(m) {
  clearSys();
  const M = MEC[m], areas = Object.keys(AR).filter(b => (AR[b].z === 'M' ? 'auto' : 'neo') === m).map(Number), dl = deepBases().filter(b => META(b).mech === m);
  setSel(areas, dl);
  info.innerHTML = back + `<h3 style="color:${M.cor}">${esc(M.nome)}</h3><p class="ru">função: ${esc(M.fun)}</p><p>${esc(M.d)}</p>
  ${dl.length ? '<p class="note">Estruturas profundas:</p>' + dchips(dl) : ''}${areas.length ? '<p class="note">Campos corticais:</p>' + bchips(areas) : ''}`;
}
function showFactor(f) {
  const F = FAT[f]; clearSys();
  if (F.deep.some(k => !['tronco', 'cerebelo'].includes(META(k).grp)) && st.cortex === 'op' && !F.areas.length) { st.cortex = 'glass'; syncSeg('#cortex', 'glass'); applyVis(); }
  F.deep.forEach(ensureVisible);
  setSel(F.areas, F.deep, F.nodes);
  if (f === 'hemi') { st.hemiPaint = true; if (st.hemi !== 'B') { st.hemi = 'B'; syncSeg('#hemi', 'B'); applyVis(); applyGrad(); } setView('sup'); recolor(); }
  info.innerHTML = back + `<h3 style="color:${F.cor}">${esc(F.nome)}</h3><p class="ru">${esc(F.ru)}</p><p class="note">Grupo ${F.g} de Khomskaya: ${esc(FGRP[F.g][0])}</p><div class="chips">${F.u ? uchip(F.u) : ''}</div>
  <p><b>O que é.</b> ${esc(F.def)}</p>
  ${f === 'hemi' ? '<p class="note">No modelo: azul, hemisfério esquerdo; rosa, direito.</p>' : ''}
  ${bchips(F.areas)}${F.nodes.length ? `<div class="chips">${F.nodes.map(n => `<button class="chip" data-gn="${n}"><i style="background:${lvlCol(GN[n].lvl)}"></i>${esc(GN[n].lab)}</button>`).join('')}</div>` : ''}${F.deep.length ? dchips(F.deep) : ''}
  <dl class="f"><dt>Substrato</dt><dd>${esc(F.sub)}</dd><dt>Como se examina</dt><dd>${esc(F.exame)}</dd><dt>Síndrome quando o fator é atingido</dt><dd>${esc(F.sind)}</dd><dt>Sistemas funcionais comprometidos</dt><dd>${esc(F.sist)}</dd>
  ${F.areas.length ? `<dt>Zonas de Poliakov envolvidas</dt><dd>${[...new Set(F.areas.map(b => AR[b].z))].map(zchip).join(' ')}</dd>` : ''}
  <dt>Sistemas funcionais que dependem deste fator</dt><dd><div class="chips">${(FS[f] || []).map(s => `<button class="chip" data-s="${s}">${esc(SYS[s].nome)}</button>`).join('') || '<span class="note">Não entra como elo nas matrizes de sistemas do mapa.</span>'}</div>
  <span class="note">Quando o fator cai, todos esses sistemas se desorganizam juntos: é a síndrome (HCF, p. 82–83).</span></dd></dl>
  ${F.deep.length && st.cortex === 'op' ? '<p class="note">Use <b>Córtex: Vidro</b> para ver as estruturas profundas.</p>' : ''}`;
}
function showSystem(s) {
  const S0 = SYS[s], ord = f => { const i = (S0.etapas || []).findIndex(e => e.f.includes(f)); return i < 0 ? 99 : i; };
  const S = Object.assign({}, S0, { links: S0.links.slice().sort((x, y) => ord(x.f) - ord(y.f)) }); if (st.mode !== 'sys' && st.mode !== 'fat') { st.mode = 'sys'; syncSeg('#mode', 'sys'); }
  const fs = S.links.map(l => l.f);
  const areas = [...new Set(fs.flatMap(f => FAT[f].areas))], dp = [...new Set(fs.flatMap(f => FAT[f].deep))], nodes = [...new Set(fs.flatMap(f => FAT[f].nodes))];
  if (st.sys !== s) { if (st.grad) toggleGrad(false); st.labs = false; st.labsPrev = null; $('#bLab').setAttribute('aria-pressed', false); }
  if (st.sys !== s && st.hemi === 'B') { st.hemi = 'L'; st.medSide = null; syncSeg('#hemi', 'L'); applyVis(); applyGrad(); setView('lat'); }
  st.sys = s; setSel(areas, dp, nodes); drawSys(); if (st.hemi === 'B') setView('sup');
  const hb = v => `<button class="chip" data-hemi="${v}" aria-pressed="${st.hemi === v}" style="${st.hemi === v ? 'background:var(--ink);color:var(--bg)' : ''}">${{ L: 'Esquerdo', R: 'Direito', B: 'Ambos' }[v]}</button>`;
  info.innerHTML = back + `<h3>${esc(S.nome)}</h3><p class="ru">${esc(S.ru)} · ${esc(S.ref)}</p><p>${esc(S.def)}</p>
  ${S.pre ? `<p class="pre"><b>Conhecimento preliminar.</b> ${esc(S.pre)}</p>` : ''}
  <h3 style="margin-top:14px">Organização no tempo</h3>
  <ol class="etapas">${(S.etapas || []).map(e => `<li><b>${esc(e.n)}</b><div class="chips">${e.f.map(f => `<button class="chip" data-f="${f}"><i style="background:${FAT[f].cor}"></i>${esc(FAT[f].curto)}</button>`).join(e.rel === 'alt' ? '<span class="rel">ou</span>' : '<span class="rel">+</span>')}</div>${e.f.length > 1 ? `<span class="note">${e.rel === 'alt' ? 'alternativos, conforme a modalidade' : 'simultâneos'}</span>` : ''}</li>`).join('')}</ol>
  ${S.ciclo ? `<p class="note"><b style="color:#b3122e">↺ Retorno à etapa ${S.ciclo.para + 1}.</b> ${esc(S.ciclo.n)}</p>` : ''}
  ${S.fundo ? `<p class="note"><b>Durante todo o curso:</b> ${S.fundo.map(x => `<b style="color:${FAT[x.f].cor}">${esc(FAT[x.f].curto)}</b> (${esc(x.n)})`).join('; ')}.</p>` : ''}
  ${S.tempo ? `<p class="note">${esc(S.tempo)}</p>` : ''}
  ${S.cog ? `<h3 style="margin-top:14px">Comparação com a neuropsicologia cognitiva</h3><p class="note">${esc(S.cog)}</p>` : ''}
  <h3 style="margin-top:14px">Os elos</h3>
  <dl class="f">${S.links.map(l => `<dt><button class="chip" data-f="${l.f}"><i style="background:${FAT[l.f].cor}"></i>${esc(FAT[l.f].nome)}</button></dt>
  <dd><b>Papel:</b> ${esc(l.papel)}<br><b>Quando este fator cai:</b> ${esc(l.q)}<br><span class="note">${FAT[l.f].areas.join(', ')} · ${esc(uname(FAT[l.f].u))}</span></dd>`).join('')}</dl>
  ${sysRel(s)}
  <h3 style="margin-top:18px">Os dois hemisférios</h3>
  <div class="chips">${hb('L')}${hb('R')}${hb('B')}</div>
  <dl class="f" style="margin-top:0"><dt>Contribuição do hemisfério esquerdo (dominante)</dt><dd>${esc(S.hemE)}</dd><dt>Contribuição do hemisfério direito</dt><dd>${esc(S.hemD)}</dd></dl>
  <p class="note">${esc(HEMI)} Em “Ambos”, a triangulação aparece nos dois lados, com o direito em traço mais leve. Os papéis dos elos acima descrevem sobretudo o hemisfério dominante, que é o que o HCF analisa em detalhe.</p>
  <p class="note" style="margin-top:12px">Mesmo sistema, defeitos qualitativamente distintos conforme o elo. É isso que permite a localização tópica pela análise sindrômica (HCF, p. 81–82).</p>`;
}
function sysRel(s) {
  const out = REDE.filter(r => r.a === s).map(r => ({ o: r.b, lab: RTIP[r.t][0], c: RTIP[r.t][2], n: r.n }))
    .concat(REDE.filter(r => r.b === s).map(r => ({ o: r.a, lab: RTIP[r.t][1], c: RTIP[r.t][2], n: r.n })));
  const fs = f => new Set([...SYS[f].links.map(l => l.f)]), mine = fs(s), GEN = new Set(['prog', 'ativ']);
  const sh = Object.keys(SYS).filter(o => o !== s).map(o => ({ o, c: [...fs(o)].filter(f => mine.has(f) && !GEN.has(f)) })).filter(x => x.c.length).sort((x, y) => y.c.length - x.c.length);
  return `<h3 style="margin-top:18px">Articulação com outros sistemas (localização sistêmica)</h3>
  <dl class="f">${out.map(r => `<dt><span style="color:${r.c}">${esc(r.lab)}</span> <button class="chip" data-s="${r.o}">${esc(SYS[r.o].nome)}</button></dt><dd>${esc(r.n)}</dd>`).join('')}</dl>
  <p class="note" style="margin-top:6px"><b>Elos comuns.</b> Uma lesão que atinja estes fatores perturba os dois sistemas ao mesmo tempo, cada um a seu modo (é o que forma a síndrome). Programação e ativação, comuns a quase todos, ficam de fora da lista.</p>
  <div class="chips">${sh.map(x => `<button class="chip" data-s="${x.o}">${x.c.map(f => `<i style="background:${FAT[f].cor}"></i>`).join('')}${esc(SYS[x.o].nome)}</button>`).join('')}</div>`;
}
const lvlTxt = l => l === 2.5 ? '2–3' : String(l);
function showGrad(id, side) {
  clearSys(); const G = GRD[id]; side = G.onlyL ? 'L' : G.onlyR ? 'R' : (side || (st.hemi === 'R' ? 'R' : 'L'));
  if (!st.grad) toggleGrad(true);
  if (st.hemi !== 'B' && st.hemi !== side) { st.hemi = side; syncSeg('#hemi', side); applyVis(); setView('lat'); }
  const areas = [...new Set(G.seq.flatMap(n => GN[n].areas))];
  setSel(areas, [], G.seq, id);
  info.innerHTML = back + `<h3 style="color:${G.cor}">Gradiente ${esc(G.nome.toLowerCase())}</h3><p class="ru">${esc(G.base)} · elaboração esquerda: ${esc(G.esq)} · Goldberg, ${esc(G.pg)}</p><p>${esc(G.d)}</p>
  <p class="note">Travessia de polo a polo${G.parcial ? ' (gradiente parcial)' : ''}:</p>
  <ol class="trav">${G.seq.map(n => { const g = GN[n]; return `<li><button class="chip" data-gn="${n}" data-side="${side}" style="border-color:${lvlCol(g.lvl)}"><i style="background:${lvlCol(g.lvl)}"></i>${esc(g.lab)}${NOSIDE.has(n) ? '' : side} · nível ${lvlTxt(g.lvl)}</button>
    <div class="note">${esc(g.ga)}</div><div><b>Função:</b> ${esc(g.fn)}</div><div><b>Lesão:</b> ${esc(g.sind)}</div>
    ${g.fat.length ? `<div class="chips" style="margin:6px 0 0">${g.fat.map(f => `<button class="chip" data-f="${f}"><i style="background:${FAT[f].cor}"></i>${esc(FAT[f].curto)}</button>`).join('')}</div>` : ''}</li>`; }).join('')}</ol>
  <p class="note">Goldberg: os nomes discretos das áreas são “bandeiras” que aproximam um contínuo. Entre duas estações, o quadro esperado é uma interpolação das duas (p. 268).</p>`;
}
function showNode(id, side) {
  const g = GN[id]; side = side || 'L'; if (!st.grad) toggleGrad(true);
  const nb = new Set([id]); for (const [a, b] of GE[side]) { if (a === id) nb.add(b); if (b === id) nb.add(a); }
  setSel(g.areas, [], [...nb]);
  const zs = [...new Set(g.areas.map(b => AR[b].z))];
  const gl = gradsOf(side).filter(x => GRD[x].seq.includes(id));
  info.innerHTML = back + `<h3>${esc(g.lab)}${NOSIDE.has(id) ? '' : side} · ${esc(g.nome)}</h3><p class="note">Goldberg (1990, ${esc(g.gp)}), nível ${g.lvl === 2.5 ? 'de transição 2–3' : g.lvl} · Brodmann ${esc(g.ga)}</p>
  <p><b>Função normal inferida:</b> ${esc(g.fn)}</p>
  <div class="chips">${gl.map(x => `<button class="chip" data-grd="${x}" data-side="${side}"><i style="background:${GRD[x].cor}"></i>gradiente ${esc(GRD[x].nome.toLowerCase())}</button>`).join('')}</div>
  <div class="chips">${zs.map(zchip).join('')}${g.fat.map(f => `<button class="chip" data-f="${f}"><i style="background:${FAT[f].cor}"></i>${esc(FAT[f].nome)}</button>`).join('')}</div>
  <dl class="f"><dt>Síndrome (Goldberg)</dt><dd>${esc(g.sind)}${side === 'R' && g.lvl > 1 ? ' A síndrome descrita é a do hemisfério esquerdo. À direita, Goldberg supõe a mesma estrutura gradiental elaborada em termos de identidade física e não categorial (agnosias aperceptivas, e não associativas), mas deixa o detalhamento para outro trabalho (p. 252).' : ''}</dd>
  <dt>Comparação com Poliakov</dt><dd>${esc(g.pol)}</dd>
  <dt>Linhas do gradiente que passam por aqui</dt><dd><div class="chips">${[...nb].filter(n => n !== id).map(n => `<button class="chip" data-gn="${n}" data-side="${side}"><i style="background:${lvlCol(GN[n].lvl)}"></i>${esc(GN[n].lab)}</button>`).join('')}</div></dd></dl>`;
}
function showElem() {
  clearSys();
  setSel([17, 41, 3, 4], [], ['O1', 'T1', 'P1', 'M1', 'M1V']);
  info.innerHTML = back + `<h3>${esc(ELEM.nome)}</h3><p>${esc(ELEM.d)}</p>${bchips([17, 41, 3, 4])}`;
}
const DIV = {
  post: { t: 'Córtex posterior', s: 'atrás do sulco central · 2ª unidade de Luria · Goldberg, Fig. 2',
    d: 'Regiões occipital, temporal e parietal: as zonas nucleares dos analisadores visual, auditivo e cutâneo-cinestésico e suas zonas de sobreposição (HCF I.2B, p. 42–51). A hierarquia é ascendente, do primário (decomposição modal) ao terciário (síntese entre modalidades). Na embriogênese, a laminação segue um plano típico de seis camadas, com uma camada IV concentrada como principal receptora das aferências subcorticais. Brodmann chamou esse córtex de “homotípico” (HCF, p. 62).' },
  ant: { t: 'Córtex anterior', s: 'à frente do sulco central · 3ª unidade de Luria · Goldberg, Fig. 3',
    d: 'Região pré-central (campo motor 4; campos pré-motores 6 e 8) e região frontal propriamente dita. Poliakov distingue aqui os mesmos três grupos de campos, mas com o acento na execução de atos coordenados e dirigidos a fins (HCF I.2C, p. 51–56). A hierarquia é descendente: plano pré-frontal, depois programa pré-motor, depois execução no campo 4. A diferenciação laminar é menos intensa, com IV difusa ou ausente no córtex motor e estriação radial e “ondulação” no embrião (HCF, p. 62–63, 258). As aferências vêm sobretudo do cerebelo pelo núcleo rubro e pelo VL, e do MD para o pré-frontal (HCF, p. 54–55, 259).' },
  sep: { t: 'Separar pelo sulco central', s: 'fronteira entre a 2ª e a 3ª unidade',
    d: 'As duas metades se afastam ao longo do eixo anteroposterior. A informação analisada e integrada nas zonas de sobreposição posteriores é transmitida às regiões motora e frontal e recodificada em séries de impulsos motores organizados no espaço e no tempo, sob controle constante dos impulsos de retorno (HCF, p. 56). No corte, a fronteira fica visível: sulco central na face lateral, paracentral e cíngulo na medial.' }
};
function showDiv(k) {
  clearSys();
  const D = DIV[k];
  const list = Object.keys(AR).map(Number).filter(b => k === 'sep' ? true : (FRONT.has(b) === (k === 'ant')));
  setSel(k === 'sep' ? [] : list, [], k === 'sep' ? [] : Object.keys(GN).filter(n => ANTN.has(n) === (k === 'ant')));
  const facs = Object.keys(FAT).filter(f => FAT[f].areas.some(b => list.includes(b)));
  info.innerHTML = back + `<h3>${esc(D.t)}</h3><p class="note">${esc(D.s)}</p><p>${esc(D.d)}</p>` +
    (k === 'sep' ? '' : `<p class="note">Campos por zona:</p>${ZORD.map(z => { const l = list.filter(b => AR[b].z === z); return l.length ? `<p style="margin:6px 0">${zchip(z)}</p>${bchips(l)}` : ''; }).join('')}
    <p class="note">Fatores sustentados por esta metade:</p><div class="chips">${facs.map(f => `<button class="chip" data-f="${f}"><i style="background:${FAT[f].cor}"></i>${esc(FAT[f].nome)}</button>`).join('')}</div>`);
}
function toggleGrad(on) { st.grad = on; $('#bGrad').setAttribute('aria-pressed', on); applyGrad(); }
function showArea(b) {
  clearSys();
  const A = AR[b]; setSel([b], (A.t || []).map(k => 'th_' + k));
  const same = Object.keys(AR).filter(x => AR[x].z === A.z && +x !== b).map(Number);
  info.innerHTML = back + `<h3>Área ${b} · ${esc(A.n)}</h3><p class="note">${esc(A.r)}</p>${A.pre ? `<p class="pre"><b>Conhecimento preliminar.</b> ${esc(A.pre)}</p>` : ''}
  <div class="chips">${zchip(A.z)}${achip(A.a)}${uchip(A.u)}</div>
  ${A.lnota ? `<p class="pre"><b>Poliakov e Luria divergem aqui.</b> ${esc(A.lnota)} A cor no modo “Unidades de Luria” segue Luria; no modo “Zonas de Poliakov”, Poliakov.</p>` : ''}
  <dl class="f"><dt>Citoarquitetura</dt><dd>${esc(A.c)}</dd><dt>Função</dt><dd>${esc(A.f)}</dd><dt>Clínica (Luria)</dt><dd>${esc(A.k)}</dd>
  ${A.kh ? `<dt>Em Khomskaya (2003)</dt><dd>${esc(A.kh)}</dd>` : ''}
  <dt>Tálamo</dt><dd>${dchips((A.t || []).map(k => 'th_' + k))}</dd><dt>Traço da zona</dt><dd>${esc(ZN[A.z].cito.split('. ')[0])}.</dd></dl>
  <p class="note" style="margin-top:14px">Outros campos da mesma zona:</p>${bchips(same)}`;
}
function showDeep(base) {
  clearSys();
  const m = META(base); ensureVisible(base);
  if (st.cortex === 'op' && !['tronco', 'cerebelo'].includes(m.grp)) { st.cortex = 'glass'; syncSeg('#cortex', 'glass'); applyVis(); }
  setSel(m.areas || [], [base]);
  info.innerHTML = back + `<h3>${esc(m.n)}</h3><p class="note">${esc(GR[m.grp])}${m.esq ? ' · volume esquemático' : ''}${m.aprox ? ' · enquadramento aproximado' : ''}</p>${m.pre ? `<p class="pre"><b>Conhecimento preliminar.</b> ${esc(m.pre)}</p>` : ''}
  <div class="chips">${m.u !== null && m.u !== undefined ? uchip(m.u) : ''}</div>
  <dl class="f"><dt>${m.grp === 'comiss' ? 'Anatomia' : 'Em Poliakov'}</dt><dd>${esc(m.d)}</dd>${m.k && m.k !== '—' ? `<dt>Clínica e função</dt><dd>${esc(m.k)}</dd>` : ''}${m.kh ? `<dt>Em Khomskaya (2003)</dt><dd>${esc(m.kh)}</dd>` : ''}
  ${m.areas && m.areas.length ? `<dt>Campos corticais ligados</dt><dd>${bchips(m.areas)}</dd>` : ''}</dl>
  <button class="chip" data-focus="${base}" style="margin-top:10px">Aproximar</button>`;
}
info.addEventListener('click', e => {
  const t = e.target.closest('button'); if (!t) return; const d = t.dataset;
  if ('back' in d) showMode(); else if (d.z) showZone(d.z); else if (d.a) showAnal(d.a); else if (d.u) showUnit(d.u);
  else if (d.hemi) { st.hemi = d.hemi; syncSeg('#hemi', st.hemi); applyVis(); applyGrad(); if (st.hemi !== 'B') setView('lat'); if (st.sys) showSystem(st.sys); }
  else if (d.grd) showGrad(d.grd, d.side); else if (d.s) showSystem(d.s); else if (d.m) showMec(d.m); else if (d.f) showFactor(d.f); else if (d.gn) showNode(d.gn, d.side || (st.hemi === 'R' ? 'R' : 'L')); else if (d.elem) showElem(); else if (d.b) showArea(+d.b); else if (d.d) showDeep(d.d);
  else if (d.focus) { if (st.cortex === 'op') { st.cortex = 'glass'; syncSeg('#cortex', 'glass'); applyVis(); } focusDeep(d.focus); }
});

/* ---------- controles ---------- */
function syncSeg(sel, v) { for (const b of document.querySelectorAll(sel + ' button')) b.setAttribute('aria-pressed', b.dataset.v === v); }
function syncGroups() { for (const c of document.querySelectorAll('#groups input')) c.checked = st.groups.has(c.value); }
$('#mode').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.mode = b.dataset.v; syncSeg('#mode', st.mode);
  if (st.mode === 'brod') { if (st.labsPrev === null) st.labsPrev = st.labs; st.labs = true; if (st.grad) toggleGrad(false); } else if (st.labsPrev !== null) { st.labs = st.labsPrev; st.labsPrev = null; }
  $('#bLab').setAttribute('aria-pressed', st.labs); if (st.mode === 'fat' && st.grad) toggleGrad(false); recolor(); showMode(); });
$('#bGrad').addEventListener('click', () => toggleGrad(!st.grad));
$('#hemi').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.medSide = null; st.hemi = b.dataset.v; syncSeg('#hemi', st.hemi); applyVis(); applyGrad(); if (st.sys) showSystem(st.sys); else setView('lat'); if (st.sys && st.hemi !== 'B') setView('lat'); });
$('#cortex').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return; st.cortex = b.dataset.v; syncSeg('#cortex', st.cortex); applyVis(); });
$('#views').addEventListener('click', e => { const b = e.target.closest('button'); if (!b) return;
  if (b.dataset.v === 'lat' && st.lastView === 'lat') {
    if (st.hemi === 'B') st.latSide = st.latSide === 'L' ? 'R' : 'L';
    else { st.hemi = st.hemi === 'L' ? 'R' : 'L'; syncSeg('#hemi', st.hemi); applyVis(); applyGrad(); if (st.sys) showSystem(st.sys); }
  }
  setView(b.dataset.v); });
$('#infl').addEventListener('input', e => { st.infl = +e.target.value; for (const h in H) for (const k in H[h].parts) H[h].parts[k].morphTargetInfluences[0] = st.infl; if (gnodes.length) rebuildGrad(); });
$('#bLab').addEventListener('click', e => { st.labs = !st.labs; if (st.mode === 'brod') st.labsPrev = null; e.currentTarget.setAttribute('aria-pressed', st.labs); });
$('#groups').innerHTML = Object.keys(GR).map(g => `<label><input type="checkbox" value="${g}" checked> ${esc(GR[g])}</label>`).join('');
$('#groups').addEventListener('change', e => { const c = e.target; if (c.checked) st.groups.add(c.value); else st.groups.delete(c.value); applyVis(); });

/* ---------- colunas corticais (SVG) ---------- */
const LAY = {
  Psens: [['I', .07], ['II', .07], ['III', .24], ['IV', .24, 1], ['V', .16, 1], ['VI', .22]],
  Pmot: [['I', .07], ['II', .05], ['III', .30], ['V', .32, 1], ['VI', .26]],
  S: [['I', .07], ['II', .08], ['III₁₋₂', .18], ['III₃', .16, 1], ['IV', .11], ['V', .18], ['VI', .22]],
  T: [['I', .07], ['II', .11, 1], ['III₁₋₂', .26, 1], ['III₃', .12], ['IV', .1], ['V', .15], ['VI', .19]],
  M: [['I', .12], ['II–III', .36, 1], ['V–VI', .52]]
};
function column(kind, col) {
  const Hh = 230, w = 96; let y = 0, s = '';
  for (const [nm, f, em] of LAY[kind]) {
    const h = f * Hh; s += `<rect x="34" y="${y}" width="${w - 36}" height="${h}" fill="${em ? col : 'none'}" fill-opacity="${em ? .2 : 0}" stroke="currentColor" stroke-opacity=".25"/>`;
    s += `<text x="30" y="${y + h / 2 + 4}" text-anchor="end" font-size="11" fill="currentColor">${nm}</text>`;
    const cy = y + h / 2;
    if (/IV/.test(nm) && kind !== 'M') for (let i = 0; i < 9; i++) s += `<circle cx="${39 + (i % 9) * 6}" cy="${cy + (i % 2 ? 3 : -3)}" r="1.8" fill="${em ? col : 'currentColor'}"/>`;
    else if (nm !== 'I') {
      const big = (kind === 'Pmot' && nm === 'V') ? 9 : (nm === 'III₃' ? 7 : nm === 'V' ? 6 : 4), cnt = big > 6 ? 2 : 4;
      for (let i = 0; i < cnt; i++) { const x = 40 + i * ((w - 46) / cnt); s += `<path d="M${x} ${cy + big / 1.2} l${big / 2} ${-big * 1.4} l${big / 2} ${big * 1.4}z" fill="${em ? col : 'currentColor'}" fill-opacity="${em ? 1 : .55}"/>`; }
    }
    y += h;
  }
  return `<svg class="layer" viewBox="0 0 ${w} ${Hh}" role="img" aria-label="Coluna cortical esquemática">${s}</svg>`;
}
const colKind = { P: [['Psens', 'sensorial (17, 41, 3)'], ['Pmot', 'motor (4)']], S: [['S', '']], T: [['T', '']], M: [['M', '']] };
$('#zcards').innerHTML = ZORD.map(z => { const Z = ZN[z];
  return `<article class="card" style="--c:${Z.cor}"><h3>${esc(Z.nome)}</h3><p class="ru">${esc(Z.sub)} · ${esc(Z.ru)}</p>
  <div class="cols">${colKind[z].map(k => `<div>${column(k[0], Z.cor)}${k[1] ? `<div class="note" style="font-size:13px">${k[1]}</div>` : ''}</div>`).join('')}</div>
  <dl class="f"><dt>Campos</dt><dd>${esc(Z.campos)}</dd><dt>Citoarquitetura</dt><dd>${esc(Z.cito)}</dd>
  <dt>Conexões</dt><dd>${esc(Z.con)}</dd><dt>Função</dt><dd>${esc(Z.func)}</dd><dt>Lesão e estimulação</dt><dd>${esc(Z.clin)}</dd><dt>Filo e ontogênese</dt><dd>${esc(Z.gen)}</dd></dl>
  <button class="chip" data-goto="${z}" style="margin-top:12px">Ver no modelo</button></article>`; }).join('');
$('#zcards').addEventListener('click', e => { const t = e.target.closest('[data-goto]'); if (!t) return; st.mode = 'zonas'; syncSeg('#mode', 'zonas'); showZone(t.dataset.goto); view.scrollIntoView({ behavior: 'smooth' }); });

/* ---------- diagrama das cadeias ---------- */
const chain = $('#chain svg');
const drawChain = () => {
  const Wd = chain.clientWidth, Hd = chain.clientHeight, cols = [['I', 'Campo primário', ZN.P.cor, 1, 'relé (CGL, CGM, VPL, VL)'], ['II', 'Campo secundário', ZN.S.cor, 2, '+ núcleos associativos'], ['III', 'Zona de sobreposição', ZN.T.cor, 3, 'pulvinar, LP, MD']];
  const nar = Wd < 520; let s = '';
  const top = 46, bot = Hd - 40;
  cols.forEach(([r, nm, c, k, nu], i) => {
    const x = Wd * (i + .5) / 3;
    s += `<rect x="${x - Wd / 7.5}" y="${top - 26}" width="${Wd / 3.75}" height="26" rx="4" fill="${c}"/><text x="${x}" y="${top - 8}" text-anchor="middle" fill="#fff" font-size="${nar ? 11 : 13}" font-weight="600">${r} · ${nar ? '' : nm}</text>`;
    const step = (bot - top - 30) / (k + 1); let py = bot;
    s += `<circle cx="${x}" cy="${bot}" r="6" fill="currentColor"/>`;
    for (let j = 1; j <= k; j++) { const y = bot - step * j; s += `<line x1="${x}" y1="${py - 6}" x2="${x}" y2="${y + 10}" stroke="currentColor" stroke-width="1.5"/><rect x="${x - 15}" y="${y - 10}" width="30" height="20" rx="10" fill="var(--bg)" stroke="${c}" stroke-width="2"/><text x="${x}" y="${y + 4}" text-anchor="middle" font-size="11" fill="currentColor">${j + 1}</text>`; py = y - 10; }
    s += `<line x1="${x}" y1="${py}" x2="${x}" y2="${top + 2}" stroke="${c}" stroke-width="2.5"/>`;
    if (!nar) s += `<text x="${x}" y="${bot + 26}" text-anchor="middle" font-size="12" fill="currentColor" opacity=".7">${nu}</text>`;
  });
  s += `<line x1="${Wd / 6}" y1="${top + 8}" x2="${Wd * 5 / 6}" y2="${top + 8}" stroke="currentColor" stroke-dasharray="3 4" opacity=".5"/>`;
  s += `<text x="8" y="${bot + 4}" font-size="11" fill="currentColor" opacity=".7">${nar ? '' : '1 · periferia'}</text>`;
  chain.innerHTML = s;
};
const ro2 = new ResizeObserver(drawChain); ro2.observe(chain);

/* ---------- tabela Luria ---------- */
$('#utab').innerHTML = `<thead><tr><th></th>${[1, 2, 3].map(u => `<th style="color:${UN[u].cor}">${UN[u].nome}<br><span style="font-weight:400">${UN[u].tit}</span></th>`).join('')}</tr></thead><tbody>` +
  [['Estruturas', 'estr'], ['Modo de trabalho', 'trab'], ['Correspondência em Poliakov', 'pol']].map(([l, k]) => `<tr><td><b>${l}</b></td>${[1, 2, 3].map(u => `<td>${esc(UN[u][k])}</td>`).join('')}</tr>`).join('') +
  `<tr><td><b>Córtex no mapa</b></td><td>Regiões mediobasais e marginais</td><td>17, 41, 3 → 18, 19, 42, 22, 1, 2 → 5, 7, 39, 40, 37, 21</td><td>9, 10, 46 → 6, 8, 44, 45 → 4</td></tr>
  <tr><td><b>Estruturas profundas no mapa</b></td><td>Tronco e formação reticular, hipotálamo, corpos mamilares, hipocampo, amígdala, núcleos anteriores e da linha média do tálamo, accumbens, prosencéfalo basal</td><td>Núcleos de relé sensoriais (CGL, CGM, VPL, VPM) e associativos posteriores (pulvinar, LP)</td><td>VL, VA, MD; caudado, putâmen, pálido, substância negra, subtalâmico, núcleo rubro</td></tr></tbody>`;

/* ---------- Khomskaya: tipologia e preliminares ---------- */
$('#ktipos').innerHTML = Object.keys(FGRP).map(g => { const fs = FORD.filter(f => FAT[f].g === +g);
  return `<tr><td><b>${g}</b></td><td><b>${esc(FGRP[g][0])}</b><br><span class="note">${esc(FGRP[g][1])}</span></td><td>${fs.map(f => `<div style="margin:0 0 8px"><button class="chip" data-kf="${f}"><i style="background:${FAT[f].cor}"></i>${esc(FAT[f].nome)}</button><br><span class="note">${esc(FAT[f].def)}</span></div>`).join('') || '<span class="note">síndromes nas fichas das estruturas profundas (caudado, VL, hipocampo, cíngulo)</span>'}</td></tr>`; }).join('');
$('#kprelim').innerHTML = PRELIM.map((p, i) => `<article class="pitem"><h3>${esc(p.t)}</h3><p>${esc(p.txt)}</p><p class="note">${esc(p.ref)} · no mapa: ${esc(p.onde)}</p><button class="chip" data-pi="${i}">Ver no modelo</button></article>`).join('');
const goK = el => {
  if (el.dataset.kf) { st.mode = 'fat'; syncSeg('#mode', 'fat'); recolor(); showFactor(el.dataset.kf); }
  else { const [t, id] = PRELIM[+el.dataset.pi].go; if (t === 'f') { st.mode = 'fat'; syncSeg('#mode', 'fat'); recolor(); showFactor(id); } else if (t === 'd') showDeep(id); else showArea(+id); }
  view.scrollIntoView({ behavior: 'smooth' }); };
for (const id of ['#ktipos', '#kprelim']) $(id).addEventListener('click', e => { const t = e.target.closest('[data-kf],[data-pi]'); if (t) goK(t); });

/* ---------- faixas dos gradientes ---------- */
$('#gstrips').innerHTML = Object.keys(GRD).filter(g => !GRD[g].onlyR).map(g => { const G = GRD[g];
  return `<div class="gstrip" data-grd="${g}" tabindex="0" role="button"><div class="gname"><b style="color:${G.cor}">${esc(G.nome)}</b><br><span class="note">${esc(G.esq)} · ${esc(G.pg)}</span></div>
  <div class="track">${G.seq.map((n, i) => { const N = GN[n]; return `${i ? '<span class="rail"></span>' : ''}<span class="st" style="border-color:${lvlCol(N.lvl)}"><b>${esc(N.lab)}</b><small>${esc(N.curto)}</small></span>`; }).join('')}</div></div>`; }).join('');
const goG = el => { st.mode = 'fat'; syncSeg('#mode', 'fat'); recolor(); showGrad(el.dataset.grd, 'L'); view.scrollIntoView({ behavior: 'smooth' }); };
$('#gstrips').addEventListener('click', e => { const el = e.target.closest('[data-grd]'); if (el) goG(el); });
$('#gstrips').addEventListener('keydown', e => { const el = e.target.closest('[data-grd]'); if (el && e.key === 'Enter') goG(el); });

/* ---------- tabela fatores × zonas ---------- */
$('#ftab').innerHTML = `<thead><tr><th>Fator</th><th>O que é</th><th>Áreas</th><th>Zona de Poliakov</th><th>Nó de Goldberg</th><th>Unidade</th><th>Síndrome</th></tr></thead><tbody>` +
  FORD.map(f => { const F = FAT[f]; return `<tr class="click" data-f="${f}" tabindex="0"><td><span class="dot" style="background:${F.cor}"></span><b>${esc(F.nome)}</b><br><span class="ru">${esc(F.ru)}</span></td><td>${esc(F.def)}</td><td>${F.areas.join(', ') || '—'}${F.deep.length ? '<br><span class="note">' + F.deep.map(k => esc(META(k).nuc || META(k).n)).join(', ') + '</span>' : ''}</td>
  <td>${[...new Set(F.areas.map(b => ZN[AR[b].z].nome))].join(', ')}</td><td>${F.nodes.map(n => GN[n].lab).join(', ') || '—'}<br><span class="note">grupo ${F.g}</span></td><td>${esc(uname(F.u))}</td><td>${esc(F.sind.split(' (HCF')[0].split('. Goldberg')[0])}.</td></tr>`; }).join('') + '</tbody>';
const goF = r => { st.mode = 'fat'; syncSeg('#mode', 'fat'); recolor(); showFactor(r.dataset.f); view.scrollIntoView({ behavior: 'smooth' }); };
$('#ftab').addEventListener('click', e => { const r = e.target.closest('tr[data-f]'); if (r) goF(r); });
$('#ftab').addEventListener('keydown', e => { const r = e.target.closest('tr[data-f]'); if (r && e.key === 'Enter') goF(r); });

/* ---------- matriz sistemas × fatores ---------- */
const FK = FORD.filter(f => FS[f]);
$('#stab').innerHTML = `<thead><tr><th>Sistema</th>${FK.map(f => `<th title="${esc(FAT[f].nome)}" style="text-align:center"><span class="dot" style="background:${FAT[f].cor};margin:0"></span><br><span style="font-size:12px">${esc(FAT[f].curto)}</span></th>`).join('')}</tr></thead><tbody>` +
  Object.keys(SYS).map(s => `<tr class="click" data-s="${s}" tabindex="0"><td><b>${esc(SYS[s].nome)}</b></td>${FK.map(f => { const S = SYS[s], L = S.links.find(l => l.f === f), et = (S.etapas || []).map((e, i) => e.f.includes(f) ? i + 1 : 0).filter(Boolean), fu = (S.fundo || []).some(x => x.f === f);
    return `<td style="text-align:center" ${L ? `title="${esc(L.papel)}"` : ''}>${L ? `<span class="dot" style="background:${FAT[f].cor};width:${et.length ? 16 : 11}px;height:${et.length ? 16 : 11}px;margin:0"></span><br><span class="note" style="font-size:12px">${et.length ? et.join(', ') : fu ? 'fundo' : ''}</span>` : ''}</td>`; }).join('')}</tr>`).join('') + '</tbody>';
const goS = r => { showSystem(r.dataset.s); view.scrollIntoView({ behavior: 'smooth' }); };
$('#stab').addEventListener('click', e => { const r = e.target.closest('tr[data-s]'); if (r) goS(r); });
$('#stab').addEventListener('keydown', e => { const r = e.target.closest('tr[data-s]'); if (r && e.key === 'Enter') goS(r); });

/* ---------- rede de sistemas ---------- */
const rede = $('#rede svg');
const drawRede = () => {
  if (!rede) return; const Wd = rede.clientWidth, Hd = rede.clientHeight, ks = Object.keys(SYS), n = ks.length, cx = Wd / 2, cy = Hd / 2 + 6, R0 = Math.min(Wd * .27, Hd * .4);
  const P = {}; ks.forEach((k, i) => { const t = -Math.PI / 2 + i / n * 2 * Math.PI; P[k] = [cx + R0 * Math.cos(t), cy + R0 * Math.sin(t), t]; });
  let s = '<defs>' + Object.keys(RTIP).map(t => `<marker id="ar-${t}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0,0L10,5L0,10z" fill="${RTIP[t][2]}"/></marker>`).join('') + '</defs>';
  REDE.forEach(r => { const [x1, y1] = P[r.a], [x2, y2] = P[r.b], mx = (x1 + x2) / 2, my = (y1 + y2) / 2, qx = mx + (cx - mx) * .35, qy = my + (cy - my) * .35;
    const dx = x2 - qx, dy = y2 - qy, L = Math.hypot(dx, dy), ex = x2 - dx / L * 16, ey = y2 - dy / L * 16;
    s += `<path class="re" data-a="${r.a}" data-b="${r.b}" d="M${x1},${y1} Q${qx},${qy} ${ex},${ey}" fill="none" stroke="${RTIP[r.t][2]}" stroke-width="1.8" opacity=".75" ${r.t === 'inv' ? '' : `marker-end="url(#ar-${r.t})"`}${r.t === 'gen' ? ' stroke-dasharray="5 4"' : ''}><title>${esc(SYS[r.a].nome)} ${esc(RTIP[r.t][0])} ${esc(SYS[r.b].nome)}</title></path>`; });
  const nar = Wd < 560;
  ks.forEach(k => { const [x, y, t] = P[k], right = Math.cos(t) > .2, left = Math.cos(t) < -.2, anc = right ? 'start' : left ? 'end' : 'middle', lx = x + Math.cos(t) * 14, ly = y + Math.sin(t) * 14 + 4;
    const nm = { fala: 'Fala expressiva', compreensao: 'Compreensão', praxis: 'Práxis', percepcao: 'Percepção visual', atencao: 'Atenção voluntária', memoria: 'Memória voluntária', memoria_med: 'Memória mediada', memoria_inv: 'Memória involuntária', pensamento: 'Pensamento', construcao: 'Construção' }[k] || SYS[k].nome;
    s += `<g class="rn" data-s="${k}" tabindex="0" role="button" style="cursor:pointer"><circle cx="${x}" cy="${y}" r="9" fill="var(--bg)" stroke="currentColor" stroke-width="2"/><text x="${lx}" y="${ly}" text-anchor="${anc}" font-size="${nar ? 10 : 13}" fill="currentColor">${esc(nm)}</text></g>`; });
  rede.innerHTML = s;
};
new ResizeObserver(drawRede).observe(rede);
rede.addEventListener('mouseover', e => { const g = e.target.closest('.rn'); rede.querySelectorAll('.re').forEach(p => p.style.opacity = !g ? '.75' : (p.dataset.a === g.dataset.s || p.dataset.b === g.dataset.s) ? '1' : '.08'); });
rede.addEventListener('mouseleave', () => rede.querySelectorAll('.re').forEach(p => p.style.opacity = '.75'));
rede.addEventListener('click', e => { const g = e.target.closest('.rn'); if (g) { showSystem(g.dataset.s); view.scrollIntoView({ behavior: 'smooth' }); } });
$('#redeleg').innerHTML = Object.keys(RTIP).map(t => `<span class="chip" style="cursor:default"><i style="background:${RTIP[t][2]}"></i>${esc(RTIP[t][0])}</span>`).join('');

/* ---------- índice ---------- */
const nums = Object.keys(AR).map(Number).sort((a, b) => ZORD.indexOf(AR[a].z) - ZORD.indexOf(AR[b].z) || a - b);
const renderTab = q => { q = (q || '').toLowerCase().trim();
  const rowsA = nums.filter(b => !q || (b + ' ' + Object.values(AR[b]).join(' ') + ' ' + ZN[AR[b].z].nome + ' ' + (AR[b].t || []).map(k => TH[k].nome).join(' ')).toLowerCase().includes(q))
    .map(b => { const A = AR[b]; return `<tr class="click" data-b="${b}" tabindex="0"><td><b>${b}</b></td><td>${esc(A.n)}</td><td>${esc(A.r)}</td><td><span class="dot" style="background:${ZN[A.z].cor}"></span>${esc(ZN[A.z].nome)}${A.lnota ? `<br><span class="note">Luria: ${esc(ZN[A.zl].nome.toLowerCase())}</span>` : ''}</td><td>${UN[A.u].nome}</td><td>${(A.t || []).join(', ')}</td></tr>`; });
  const rowsD = (deep.length ? deepBases() : Object.keys(DS).concat(Object.keys(TH).map(k => 'th_' + k))).filter(b => { const m = META(b); return m && (!q || (m.n + ' ' + m.d + ' ' + (m.k || '') + ' ' + GR[m.grp] + ' ' + (m.mech ? MEC[m.mech].nome : '')).toLowerCase().includes(q)); })
    .map(b => { const m = META(b); return `<tr class="click" data-d="${b}" tabindex="0"><td>—</td><td>${esc(m.n)}</td><td>${esc(GR[m.grp])}</td><td>${m.mech ? `<span class="dot" style="background:${MEC[m.mech].cor}"></span>${esc(MEC[m.mech].nome)}` : '—'}</td><td>${m.u ? UN[m.u].nome : '—'}</td><td></td></tr>`; });
  $('#atab').innerHTML = (rowsA.join('') + (rowsD.length ? `<tr><td colspan="6" class="note" style="padding-top:22px"><b>Estruturas profundas</b></td></tr>` + rowsD.join('') : '')) || '<tr><td colspan="6" class="note">Nada encontrado.</td></tr>'; };
renderTab(); $('#q').addEventListener('input', e => renderTab(e.target.value));
const go = r => { if (r.dataset.b) showArea(+r.dataset.b); else showDeep(r.dataset.d); view.scrollIntoView({ behavior: 'smooth' }); };
$('#atab').addEventListener('click', e => { const r = e.target.closest('tr[data-b],tr[data-d]'); if (r) go(r); });
$('#atab').addEventListener('keydown', e => { const r = e.target.closest('tr[data-b],tr[data-d]'); if (r && e.key === 'Enter') go(r); });

/* ---------- carga ---------- */
Promise.resolve(window.MESH).then(D => { build(D); renderTab($('#q').value); }).catch(err => { $('#load').textContent = 'Não foi possível carregar a superfície (' + err.message + ').'; });
}


/* ---------- versão e aviso de atualização ---------- */
(() => {
const V = { versao: '1.0', data: '24/11/2026', site: 'https://gugsphc.github.io/mapa-nphc/' };
document.querySelectorAll('.vNum').forEach(e => e.textContent = V.versao);
document.querySelectorAll('.vData').forEach(e => e.textContent = V.data);
if (location.protocol.startsWith('http') && location.href.startsWith(V.site)) return;
const maior = (a, b) => { const x = String(a).split('.').map(Number), y = String(b).split('.').map(Number);
  for (let i = 0; i < Math.max(x.length, y.length); i++) { const d = (x[i] || 0) - (y[i] || 0); if (d) return d > 0; } return false; };
fetch(V.site + 'versao.json?t=' + Date.now(), { cache: 'no-store' }).then(r => r.ok ? r.json() : null).then(n => {
  if (!n || !maior(n.versao, V.versao)) return;
  let fechado = null; try { fechado = localStorage.getItem('nphc-aviso'); } catch (e) {}
  if (fechado === n.versao) return;
  const b = document.createElement('div'); b.id = 'novaVersao';
  const t = document.createElement('span');
  t.textContent = `Há uma versão nova deste mapa: ${n.versao}, de ${n.data}.` + (n.resumo ? ' ' + n.resumo : '');
  const on = document.createElement('a'); on.href = V.site; on.target = '_blank'; on.rel = 'noopener'; on.textContent = 'Abrir online';
  const dl = document.createElement('a'); dl.href = V.site + (n.download || 'mapa-nphc.zip'); dl.textContent = 'Baixar';
  const x = document.createElement('button'); x.className = 'x'; x.title = 'Fechar'; x.textContent = '×';
  x.onclick = () => { b.remove(); try { localStorage.setItem('nphc-aviso', n.versao); } catch (e) {} };
  b.append(t, on, dl, x); document.body.prepend(b);
}).catch(() => {});
})();
