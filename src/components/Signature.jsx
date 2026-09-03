import { useRef, useEffect, useState } from "react";

// =========================================================
// CONFIG — everything tunable lives here
// =========================================================
const CONFIG = {
  url:       'https://www.robertbrunner.dev',
  name:      'Robert Brunner',
  monogram:  'RB',

  // breakpoints (px, viewport width)
  bpChip:    600,    // below → chip
  bpStrip:   1024,   // below → strip, above → full

  // modes: [width, height, fontSize, gridStep]
  full:      { w: 340, h: 120, fs: 22, S: 14 },
  strip:     { w: 190, h: 40,  fs: 14, S: 10 },
  chip:      { w: 44,  h: 44,  fs: 15, S: 8  },

  restOpacity:  0.27,
  hoverOpacity: 1,
  chipOpacity:  0.9,   // chip has no hover, so it rests bright
  chipPulseEvery: 180,    // frames between ambient pulses (~3s @ 60fps) — infrequent, just a hint
  chipFlickerEvery: 55,   // frames between soft trace flickers
  zIndex:       9999,
  offset:       16,   // px from corner
};

const COLOR = {
  traceBase:   '#00ffcc18',
  traceGlow:   '#00e5b47a',
  viaDot:      '#00ccaa',
  pulseCore:   '#ffffff',
  pulseInner:  '#eefffa',
  pulseMiddle: '#ffe600',
  pulseOuter:  '#007a60',
  bloomRing:   '#00ccaa',
  bloomFlash:  '#ffffff',
  nameHover:   '#00ffcc',
};
// =========================================================

const rgb = (hex, a) =>
  `rgba(${parseInt(hex.slice(1,3),16)},${parseInt(hex.slice(3,5),16)},${parseInt(hex.slice(5,7),16)},${a})`;

const getMode = () => {
  const vw = window.innerWidth;
  if (vw < CONFIG.bpChip)  return 'chip';
  if (vw < CONFIG.bpStrip) return 'strip';
  return 'full';
};

const TraceBadge = ({
  position = 'bottom-right',   // 'bottom-right' | 'top-right' | 'bottom-left' | 'top-left'
  offset   = CONFIG.offset,
  zIndex   = CONFIG.zIndex,
}) => {
  const wrapRef   = useRef(null);
  const canvasRef = useRef(null);
  const nameRef   = useRef(null);
  const [mode, setMode]       = useState(getMode);
  const [crashed, setCrashed] = useState(false);

  const dims = CONFIG[mode];
  const isChip = mode === 'chip';

  // ── mode tracking ────────────────────────────────────────
  useEffect(() => {
    const onResize = () => setMode(getMode());
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  // ── canvas engine ────────────────────────────────────────
  useEffect(() => {
    if (crashed) return;
    const wrap   = wrapRef.current;
    const canvas = canvasRef.current;
    if (!canvas || !wrap) return;

    let ctx;
    try { ctx = canvas.getContext('2d'); } catch { setCrashed(true); return; }

    const S = dims.S;
    let W, H, dpr, traces = [], pulses = [], blooms = [], frame = 0, animId, running = true;
    const rw = () => W / dpr;
    const rh = () => H / dpr;

    function resize() {
      try {
        const r = canvas.getBoundingClientRect();
        dpr = Math.min(window.devicePixelRatio || 1, 2);
        W = canvas.width  = r.width  * dpr;
        H = canvas.height = r.height * dpr;
        ctx.setTransform(1, 0, 0, 1, 0, 0);
        ctx.scale(dpr, dpr);
        build();
      } catch { setCrashed(true); }
    }

    function build() {
      traces = [];
      const cw = rw(), ch = rh();
      const cols = Math.ceil(cw / S) + 1;
      const rows = Math.ceil(ch / S) + 1;
      const occ = new Set();
      const key = (c, r) => c + ',' + r;
      const DX = [1, 0, -1, 0];
      const DY = [0, 1, 0, -1];

      const tryRoute = () => {
        let c = Math.floor(Math.random() * cols);
        let r = Math.floor(Math.random() * rows);
        if (occ.has(key(c, r))) return;
        const pts = [{ x: c * S, y: r * S }];
        occ.add(key(c, r));
        let dir = Math.floor(Math.random() * 4);
        const turns = 3 + Math.floor(Math.random() * 7);
        for (let t = 0; t < turns; t++) {
          const run = 2 + Math.floor(Math.random() * 9);
          for (let s = 0; s < run; s++) {
            const nc = c + DX[dir], nr = r + DY[dir];
            if (nc < 0 || nc >= cols || nr < 0 || nr >= rows || occ.has(key(nc, nr))) break;
            c = nc; r = nr; occ.add(key(c, r));
          }
          pts.push({ x: c * S, y: r * S });
          const L = (dir + 1) % 4, R = (dir + 3) % 4;
          const choices = Math.random() < 0.5 ? [L, R] : [R, L];
          let turned = false;
          for (const d of choices) {
            const nc = c + DX[d], nr = r + DY[d];
            if (nc >= 0 && nc < cols && nr >= 0 && nr < rows && !occ.has(key(nc, nr))) {
              dir = d; turned = true; break;
            }
          }
          if (!turned) break;
        }
        if (pts.length > 2)
          traces.push({ pts, lit: 0, base: 0.07 + Math.random() * 0.1, w: Math.random() > 0.8 ? 1.7 : 0.9 });
      };

      const routeCount = Math.max(40, Math.floor((cw * ch) / 60));
      for (let i = 0; i < routeCount; i++) tryRoute();
    }

    const pathLen = pts => {
      let l = 0;
      for (let i = 1; i < pts.length; i++) l += Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
      return l;
    };
    const ptAt = (pts, d) => {
      let a = 0;
      for (let i = 1; i < pts.length; i++) {
        const s = Math.hypot(pts[i].x - pts[i-1].x, pts[i].y - pts[i-1].y);
        if (a + s >= d) {
          const t = (d - a) / s;
          return { x: pts[i-1].x + (pts[i].x - pts[i-1].x) * t, y: pts[i-1].y + (pts[i].y - pts[i-1].y) * t };
        }
        a += s;
      }
      return pts[pts.length - 1];
    };
    const dSeg = (px, py, ax, ay, bx, by) => {
      const dx = bx - ax, dy = by - ay, l2 = dx*dx + dy*dy;
      if (!l2) return Math.hypot(px - ax, py - ay);
      const t = Math.max(0, Math.min(1, ((px-ax)*dx + (py-ay)*dy) / l2));
      return Math.hypot(px - (ax + t*dx), py - (ay + t*dy));
    };
    const dTrace = (mx, my, tr) => {
      let m = Infinity;
      for (let i = 1; i < tr.pts.length; i++)
        m = Math.min(m, dSeg(mx, my, tr.pts[i-1].x, tr.pts[i-1].y, tr.pts[i].x, tr.pts[i].y));
      return m;
    };

    function drawTraces() {
      ctx.lineCap = 'round'; ctx.lineJoin = 'round';
      const decay = isChip ? 0.003 : 0.007; // chip glows fade out ~2x slower
      for (const tr of traces) {
        tr.lit = Math.max(0, tr.lit - decay);
        const a = tr.base + tr.lit * 0.65;
        ctx.beginPath();
        ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
        for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
        ctx.strokeStyle = rgb(COLOR.traceBase, a);
        ctx.lineWidth = tr.w;
        ctx.stroke();
        if (tr.lit > 0.06) {
          ctx.beginPath();
          ctx.moveTo(tr.pts[0].x, tr.pts[0].y);
          for (let i = 1; i < tr.pts.length; i++) ctx.lineTo(tr.pts[i].x, tr.pts[i].y);
          ctx.strokeStyle = rgb(COLOR.traceGlow, tr.lit * 0.45);
          ctx.lineWidth = tr.w * 4;
          ctx.stroke();
        }
        for (const p of tr.pts) {
          ctx.beginPath();
          ctx.arc(p.x, p.y, tr.lit > 0.3 ? 2.5 : 1.6, 0, Math.PI * 2);
          ctx.fillStyle = rgb(COLOR.viaDot, Math.min(a * 2.4, 0.92));
          ctx.fill();
        }
      }
    }

    const getXY = e => {
      const r = canvas.getBoundingClientRect();
      const src = e.touches ? e.touches[0] : e;
      return { mx: src.clientX - r.left, my: src.clientY - r.top };
    };

    const onMouseMove = e => {
      const { mx, my } = getXY(e);
      for (const tr of traces) {
        const d = dTrace(mx, my, tr);
        if (d < 18) tr.lit = Math.min(1, tr.lit + 0.09 * (1 - d / 18));
      }
    };

    const firePulse = (mx, my) => {
      let best = null, bd = Infinity;
      for (const tr of traces) {
        const d = dTrace(mx, my, tr);
        if (d < bd) { bd = d; best = tr; }
      }
      if (best && bd < 50) {
        best.lit = 1;
        const len = pathLen(best.pts);
        pulses.push({ pts: best.pts, len, t: 0, speed: len / 55 });
      }
    };

    const onClick = e => {
      if (nameRef.current && nameRef.current.contains(e.target)) return;
      const { mx, my } = getXY(e);
      firePulse(mx, my);
    };

    // ambient chip pulse — gentle, no bloom, low opacity pulse just hints at life
    const ambientPulse = () => {
      if (!traces.length) return;
      const tr = traces[Math.floor(Math.random() * traces.length)];
      tr.lit = Math.min(tr.lit + 0.3, 0.35); // light up the trace softly, not full blast
      const len = pathLen(tr.pts);
      // push a dim pulse — we override draw opacity inline in the pulse renderer
      pulses.push({ pts: tr.pts, len, t: 0, speed: len / 90, dim: true });
    };

    function loop() {
      if (!running) return;
      try {
        animId = requestAnimationFrame(loop);
        frame++;
        ctx.clearRect(0, 0, rw(), rh());
        drawTraces();

        pulses = pulses.filter(p => {
          p.t += p.speed;
          if (p.t >= p.len) {
            if (!p.dim) blooms.push({ x: p.pts[p.pts.length-1].x, y: p.pts[p.pts.length-1].y, age: 0, life: 42 });
            return false;
          }
          const pos = ptAt(p.pts, p.t);
          if (p.dim) {
            // soft chip pulse — small teal dot, no yellow core, no bloom
            const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 6);
            g.addColorStop(0,   rgb(COLOR.viaDot,    0.5));
            g.addColorStop(0.5, rgb(COLOR.bloomRing, 0.2));
            g.addColorStop(1,   rgb(COLOR.pulseOuter, 0));
            ctx.beginPath(); ctx.arc(pos.x, pos.y, 6, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
          } else {
            const g = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, 11);
            g.addColorStop(0,   rgb(COLOR.pulseInner,  0.99));
            g.addColorStop(0.4, rgb(COLOR.pulseMiddle, 0.55));
            g.addColorStop(1,   rgb(COLOR.pulseOuter,  0));
            ctx.beginPath(); ctx.arc(pos.x, pos.y, 11, 0, Math.PI * 2); ctx.fillStyle = g; ctx.fill();
            ctx.beginPath(); ctx.arc(pos.x, pos.y, 2.2, 0, Math.PI * 2); ctx.fillStyle = COLOR.pulseCore; ctx.fill();
          }
          return true;
        });

        blooms = blooms.filter(b => {
          b.age++;
          const p = b.age / b.life;
          [0.3, 0.65, 1].forEach(s => {
            ctx.beginPath(); ctx.arc(b.x, b.y, 40 * s * p, 0, Math.PI * 2);
            ctx.strokeStyle = rgb(COLOR.bloomRing, 0.88 * (1 - p));
            ctx.lineWidth = 1.2; ctx.stroke();
          });
          if (p < 0.28) {
            ctx.beginPath(); ctx.arc(b.x, b.y, 5.5 * (1 - p / 0.28), 0, Math.PI * 2);
            ctx.fillStyle = rgb(COLOR.bloomFlash, 0.96 * (1 - p / 0.28));
            ctx.fill();
          }
          return b.age < b.life;
        });

        if (isChip) {
          if (frame % CONFIG.chipFlickerEvery === 0 && traces.length) {
            // soft whisper — just enough to notice, not enough to compete with RB
            const tr = traces[Math.floor(Math.random() * traces.length)];
            tr.lit = Math.min(tr.lit + 0.18, 0.28);
          }
          if (frame % CONFIG.chipPulseEvery === 0) ambientPulse();
        } else if (frame % 200 === 0 && traces.length) {
          for (let i = 0; i < 3; i++) {
            const tr = traces[Math.floor(Math.random() * traces.length)];
            tr.lit = Math.min(tr.lit + 0.4, 0.6);
          }
        }
      } catch {
        running = false;
        setCrashed(true);
      }
    }

    if (!isChip) {
      canvas.addEventListener('mousemove', onMouseMove);
      wrap.addEventListener('click', onClick);
    }
    window.addEventListener('resize', resize);
    setTimeout(() => { resize(); loop(); }, 50);

    return () => {
      running = false;
      cancelAnimationFrame(animId);
      canvas.removeEventListener('mousemove', onMouseMove);
      wrap.removeEventListener('click', onClick);
      window.removeEventListener('resize', resize);
    };
  }, [crashed, mode]);

  // ── typewriter (full + strip only) ───────────────────────
  useEffect(() => {
    if (isChip) return;
    const el = nameRef.current?.querySelector('[data-tw]');
    if (!el) return;
    const NAME = CONFIG.name;
    let ti = 0, del = false, timeout;
    const type = () => {
      if (!del) {
        el.textContent = NAME.slice(0, ++ti);
        if (ti === NAME.length) { del = true; timeout = setTimeout(type, 2200); return; }
        timeout = setTimeout(type, 90);
      } else {
        el.textContent = NAME.slice(0, --ti);
        if (ti === 0) { del = false; timeout = setTimeout(type, 500); return; }
        timeout = setTimeout(type, 45);
      }
    };
    timeout = setTimeout(type, 400);
    return () => clearTimeout(timeout);
  }, [mode]);

  // ── positioning ──────────────────────────────────────────
  const [vert, horiz] = position.split('-');
  const posStyle = {
    [vert]:  `max(${offset}px, env(safe-area-inset-${vert}, 0px))`,
    [horiz]: `max(${offset}px, env(safe-area-inset-${horiz}, 0px))`,
  };

  // ── crash fallback ───────────────────────────────────────
  if (crashed) {
    return (
      <a href={CONFIG.url} target="_blank" rel="noopener noreferrer"
        style={{ position: 'fixed', ...posStyle, color: COLOR.viaDot, fontSize: '13px',
          fontFamily: "'Poppins', sans-serif", textDecoration: 'none', opacity: 0.5, zIndex }}>
        {CONFIG.name}
      </a>
    );
  }

  const baseWrap = {
    position: 'fixed',
    ...posStyle,
    width: `${dims.w}px`,
    height: `${dims.h}px`,
    background: '#0a0b0c',
    borderRadius: isChip ? '10px' : '10px',
    overflow: 'hidden',
    userSelect: 'none',
    opacity: isChip ? CONFIG.chipOpacity : CONFIG.restOpacity,
    transition: 'opacity 0.3s ease, width 0.3s ease, height 0.3s ease',
    zIndex,
    maxWidth: `calc(100vw - ${offset * 2}px)`,
    display: 'block',
  };

  const canvasStyle = { position: 'absolute', inset: 0, width: '100%', height: '100%', display: 'block', pointerEvents: 'none' };

  const onEnter = e => e.currentTarget.style.opacity = String(CONFIG.hoverOpacity);
  const onLeave = e => e.currentTarget.style.opacity = String(isChip ? CONFIG.chipOpacity : CONFIG.restOpacity);

  // ── CHIP: whole thing is a link ──────────────────────────
  if (isChip) {
    return (
      <a ref={wrapRef} href={CONFIG.url} target="_blank" rel="noopener noreferrer"
        style={{ ...baseWrap, cursor: 'pointer', textDecoration: 'none',
          animation: 'tb-border 5s ease-in-out infinite' }}
        onMouseEnter={onEnter} onMouseLeave={onLeave} aria-label={CONFIG.name}>
        <canvas ref={canvasRef} style={canvasStyle} />
        <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center',
          color: COLOR.nameHover, fontSize: `${dims.fs}px`, fontWeight: 600, fontFamily: "'Poppins', sans-serif",
          letterSpacing: '0.05em', pointerEvents: 'none',
          animation: 'tb-breathe 5s ease-in-out infinite' }}>
          {CONFIG.monogram}
        </span>
        <style>{`
          @keyframes tb-breathe {
            0%,100% { text-shadow: 0 0 2px ${COLOR.nameHover}44; }
            50%     { text-shadow: 0 0 6px ${COLOR.nameHover}99; }
          }
          @keyframes tb-border {
            0%,100% { box-shadow: 0 0 0 1px ${COLOR.viaDot}22; }
            50%     { box-shadow: 0 0 0 1px ${COLOR.viaDot}66, 0 0 8px ${COLOR.viaDot}33; }
          }
        `}</style>
      </a>
    );
  }

  // ── FULL / STRIP: canvas playground + name link ──────────
  return (
    <div ref={wrapRef} style={{ ...baseWrap, cursor: 'crosshair' }}
      onMouseEnter={onEnter} onMouseLeave={onLeave}>
      <canvas ref={canvasRef} style={canvasStyle} />
      <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        <a ref={nameRef} href={CONFIG.url} target="_blank" rel="noopener noreferrer"
          style={{ pointerEvents: 'auto', color: '#fff', textDecoration: 'none', fontSize: `${dims.fs}px`, fontWeight: 500,
            fontFamily: "'Poppins', sans-serif", letterSpacing: '0.02em', cursor: 'pointer', padding: '4px 8px',
            transition: 'color 0.2s', whiteSpace: 'nowrap', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '2px' }}
          onMouseEnter={e => e.currentTarget.style.color = COLOR.nameHover}
          onMouseLeave={e => e.currentTarget.style.color = '#fff'}>
          {mode === 'full' && (
            <span style={{ fontSize: '10px', fontWeight: 400, color: 'rgba(255,255,255,0.4)',
              letterSpacing: '0.12em', textTransform: 'uppercase', display: 'block', lineHeight: 1 }}>
              Created by
            </span>
          )}
          <span style={{ display: 'inline-flex', alignItems: 'center' }}>
            <span data-tw />
            <span style={{ display: 'inline-block', width: '2px', height: '1.1em', background: 'currentColor',
              marginLeft: '3px', verticalAlign: '-3px', animation: 'tb-blink 0.9s steps(1) infinite' }} />
          </span>
        </a>
      </div>
      <style>{`@keyframes tb-blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
};

export default TraceBadge;