import { useEffect, useRef } from "react";

const PURPLE = [176, 70, 255];
const MAGENTA = [236, 60, 255];
const PINK = [255, 120, 220];
const BLUE = [70, 130, 255];
const CYAN = [64, 230, 255];
const CLOUD = [MAGENTA, PURPLE, PINK, PURPLE, MAGENTA];
const ACCENT = [CYAN, BLUE];

const TIERS = {
  mobile: { cloud: 1600, nodes: 18, link: 72 },
  tablet: { cloud: 2600, nodes: 26, link: 82 },
  desktop: { cloud: 4200, nodes: 34, link: 90 },
};

function tierFor(width) {
  if (width < 720) return "mobile";
  if (width < 1100) return "tablet";
  return "desktop";
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

function rgba(color, alpha) {
  return `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${alpha})`;
}

function gauss() {
  const u = Math.max(Math.random(), 0.0001);
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(Math.PI * 2 * Math.random());
}

function glowSprite(color) {
  const sprite = document.createElement("canvas");
  sprite.width = 64;
  sprite.height = 64;
  const ctx = sprite.getContext("2d");
  const glow = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  glow.addColorStop(0, rgba(color, 0.95));
  glow.addColorStop(0.28, rgba(color, 0.38));
  glow.addColorStop(1, rgba(color, 0));
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 64, 64);
  return sprite;
}

const CLOUDS = [
  [0.08, 0.28, 0.11],
  [0.16, 0.62, 0.13],
  [0.1, 0.86, 0.09],
  [0.9, 0.22, 0.12],
  [0.84, 0.5, 0.15],
  [0.92, 0.78, 0.11],
  [0.72, 0.34, 0.08],
];

function place(kind) {
  if (kind === "middle" || Math.random() > 0.86) return { x: Math.random(), y: Math.random(), home: 0.5 };
  const [cx, cy, spread] = CLOUDS[Math.floor(Math.random() * CLOUDS.length)];
  return {
    x: clamp(cx + gauss() * spread, 0, 1),
    y: clamp(cy + gauss() * spread * 1.15, 0, 1),
    home: cx,
  };
}

function createField(spec) {
  const cloud = Array.from({ length: spec.cloud }, () => {
    const spot = place("cloud");
    const depth = Math.random();
    const accent = Math.random() < 0.1;
    return {
      x: spot.x,
      y: spot.y,
      home: spot.home,
      vx: (Math.random() - 0.5) * (0.000025 + depth * 0.00004),
      vy: (Math.random() - 0.5) * (0.000025 + depth * 0.00004),
      depth,
      r: depth > 0.9 ? 1.8 + Math.random() * 1.2 : 0.55 + depth * 1.1,
      color: accent ? ACCENT[depth > 0.5 ? 0 : 1] : CLOUD[Math.floor(Math.random() * CLOUD.length)],
      alpha: 0.28 + depth * 0.6,
      phase: Math.random() * Math.PI * 2,
    };
  });

  const nodes = Array.from({ length: spec.nodes }, () => {
    const spot = place("node");
    return {
      x: spot.x < 0.5 ? clamp(spot.x, 0.03, 0.36) : clamp(spot.x, 0.64, 0.97),
      y: spot.y,
      vx: (Math.random() - 0.5) * 0.00004,
      vy: (Math.random() - 0.5) * 0.00004,
      color: Math.random() < 0.55 ? CYAN : MAGENTA,
      r: 1.8 + Math.random() * 1.6,
      phase: Math.random() * Math.PI * 2,
    };
  });

  return { cloud, nodes };
}

export default function ParticleField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) return undefined;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const sprites = new Map([MAGENTA, PURPLE, PINK, BLUE, CYAN].map((color) => [color, glowSprite(color)]));
    let field = createField(TIERS.desktop);
    let spec = TIERS.desktop;
    let tier = "";
    let frame = 0;
    let visible = !document.hidden;
    const size = { w: 1, h: 1 };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      const ratio = Math.min(window.devicePixelRatio || 1, 1.2);
      size.w = Math.max(1, rect.width);
      size.h = Math.max(1, rect.height);
      canvas.width = Math.max(1, Math.floor(size.w * ratio));
      canvas.height = Math.max(1, Math.floor(size.h * ratio));
      context.setTransform(ratio, 0, 0, ratio, 0, 0);
      const next = tierFor(size.w);
      if (next !== tier) {
        tier = next;
        spec = TIERS[next];
        field = createField(spec);
      }
      if (reduced) paint(1.4, false);
    };

    const paint = (time, moving) => {
      const { w, h } = size;
      const { cloud, nodes } = field;
      context.clearRect(0, 0, w, h);

      const lights = [
        [0.1, 0.42, 0.46, MAGENTA, 0.2],
        [0.88, 0.38, 0.5, PURPLE, 0.22],
        [0.78, 0.16, 0.28, CYAN, 0.08],
        [0.16, 0.82, 0.26, BLUE, 0.07],
      ];
      for (const [lx, ly, scale, color, alpha] of lights) {
        const radius = Math.min(w, h) * scale;
        const wash = context.createRadialGradient(lx * w, ly * h, 0, lx * w, ly * h, radius);
        wash.addColorStop(0, rgba(color, alpha));
        wash.addColorStop(1, rgba(color, 0));
        context.fillStyle = wash;
        context.beginPath();
        context.arc(lx * w, ly * h, radius, 0, Math.PI * 2);
        context.fill();
      }

      if (moving) {
        for (const speck of cloud) {
          const angle = Math.sin(speck.x * 7 + time * 0.28 + speck.phase) + Math.cos(speck.y * 5 - time * 0.2);
          speck.x += speck.vx + Math.cos(angle) * (0.00005 + speck.depth * 0.00004);
          speck.y += speck.vy + Math.sin(angle) * (0.000045 + speck.depth * 0.000035);
          speck.vx += (speck.home - speck.x) * 0.000004;
          if (speck.x < -0.02 || speck.x > 1.02) speck.vx *= -1;
          if (speck.y < -0.02 || speck.y > 1.02) speck.vy *= -1;
          speck.x = clamp(speck.x, -0.02, 1.02);
          speck.y = clamp(speck.y, -0.02, 1.02);
        }
        for (const node of nodes) {
          node.x = clamp(node.x + node.vx, 0.03, 0.97);
          node.y = clamp(node.y + node.vy, 0.03, 0.97);
          if (node.x < 0.04 || node.x > 0.96) node.vx *= -1;
          if (node.y < 0.04 || node.y > 0.96) node.vy *= -1;
        }
      }

      for (const speck of cloud) {
        const shimmer = 0.75 + 0.25 * Math.sin(time * 2.1 + speck.phase);
        const x = speck.x * w;
        const y = speck.y * h;
        const fade = speck.x > 0.36 && speck.x < 0.64 ? speck.alpha * 0.35 : speck.alpha;
        const glow = (7 + speck.r * 5) * shimmer;
        context.globalAlpha = fade * 0.7;
        context.drawImage(sprites.get(speck.color), x - glow / 2, y - glow / 2, glow, glow);
        context.globalAlpha = fade;
        context.fillStyle = rgba(speck.color, 1);
        context.fillRect(x, y, Math.max(0.7, speck.r * 0.7), Math.max(0.7, speck.r * 0.7));
      }
      context.globalAlpha = 1;

      const cell = spec.link;
      const cols = Math.max(1, Math.ceil(w / cell));
      const rows = Math.max(1, Math.ceil(h / cell));
      const buckets = new Map();
      nodes.forEach((node, index) => {
        const key = Math.min(rows - 1, Math.floor((node.y * h) / cell)) * cols + Math.min(cols - 1, Math.floor((node.x * w) / cell));
        const bucket = buckets.get(key);
        if (bucket) bucket.push(index);
        else buckets.set(key, [index]);
      });
      const degree = new Uint8Array(nodes.length);
      const links = [];
      for (const [key, members] of buckets) {
        const cx = key % cols;
        const cy = Math.floor(key / cols);
        for (const [ox, oy] of [[0, 0], [1, 0], [0, 1], [1, 1]]) {
          const nx = cx + ox;
          const ny = cy + oy;
          if (nx < 0 || ny < 0 || nx >= cols || ny >= rows) continue;
          const others = ox === 0 && oy === 0 ? members : buckets.get(ny * cols + nx);
          if (!others) continue;
          for (let aIndex = 0; aIndex < members.length; aIndex += 1) {
            const ai = members[aIndex];
            if (degree[ai] >= 2) continue;
            const a = nodes[ai];
            const start = ox === 0 && oy === 0 ? aIndex + 1 : 0;
            for (let bIndex = start; bIndex < others.length; bIndex += 1) {
              const bi = others[bIndex];
              if (degree[ai] >= 2 || degree[bi] >= 2) continue;
              const b = nodes[bi];
              const sameSide = (a.x < 0.45 && b.x < 0.45) || (a.x > 0.55 && b.x > 0.55);
              if (!sameSide) continue;
              const ax = a.x * w;
              const ay = a.y * h;
              const bx = b.x * w;
              const by = b.y * h;
              const distance = Math.hypot(ax - bx, ay - by);
              if (distance > spec.link || distance < 18) continue;
              degree[ai] += 1;
              degree[bi] += 1;
              links.push({ ax, ay, bx, by, color: a.color, phase: a.phase });
            }
          }
        }
      }

      for (const link of links) {
        context.beginPath();
        context.moveTo(link.ax, link.ay);
        context.lineTo(link.bx, link.by);
        context.strokeStyle = rgba(link.color, 0.45);
        context.lineWidth = 1;
        context.stroke();
        const travel = ((moving ? time * 0.16 : 0.35) + link.phase) % 1;
        const t = travel < 0 ? travel + 1 : travel;
        context.beginPath();
        context.fillStyle = rgba(CYAN, 0.9);
        context.arc(link.ax + (link.bx - link.ax) * t, link.ay + (link.by - link.ay) * t, 1.5, 0, Math.PI * 2);
        context.fill();
      }

      for (const node of nodes) {
        const x = node.x * w;
        const y = node.y * h;
        const pulse = 1 + (moving ? Math.sin(time * 1.5 + node.phase) * 0.16 : 0);
        const glow = node.r * 9 * pulse;
        context.drawImage(sprites.get(node.color), x - glow / 2, y - glow / 2, glow, glow);
        context.beginPath();
        context.fillStyle = rgba(node.color, 0.95);
        context.arc(x, y, node.r * pulse, 0, Math.PI * 2);
        context.fill();
      }
    };

    const stop = () => {
      if (!frame) return;
      cancelAnimationFrame(frame);
      frame = 0;
    };
    const tick = (now) => {
      if (visible) paint(now / 1000, true);
      frame = requestAnimationFrame(tick);
    };
    const onVisibility = () => {
      visible = !document.hidden;
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    if (!reduced) frame = requestAnimationFrame(tick);
    return () => {
      stop();
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
