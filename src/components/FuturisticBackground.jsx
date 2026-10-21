import { useEffect, useRef } from "react";

const CYAN = "54, 232, 255";
const BLUE = "67, 138, 255";
const VIOLET = "195, 66, 255";
const COLORS = [CYAN, BLUE, VIOLET];

function sprite(color, size) {
  const canvas = document.createElement("canvas");
  canvas.width = size;
  canvas.height = size;
  const context = canvas.getContext("2d");
  const glow = context.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  glow.addColorStop(0, `rgba(${color}, 0.95)`);
  glow.addColorStop(0.22, `rgba(${color}, 0.38)`);
  glow.addColorStop(0.55, `rgba(${color}, 0.08)`);
  glow.addColorStop(1, `rgba(${color}, 0)`);
  context.fillStyle = glow;
  context.fillRect(0, 0, size, size);
  return canvas;
}

function clamp(value, min, max) {
  return Math.min(max, Math.max(min, value));
}

export default function FuturisticBackground() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext("2d");
    if (!ctx) return undefined;

    const glows = Object.fromEntries(COLORS.map((color) => [color, sprite(color, 64)]));
    let width = 1;
    let height = 1;
    let nodes = [];
    let dust = [];
    let nextId = 0;
    let animationId = 0;
    const started = performance.now();

    const makeNode = (spec) => {
      const node = { id: nextId, x: spec.homeX, y: spec.homeY, ...spec };
      nextId += 1;
      nodes.push(node);
      return node;
    };

    const addCluster = (cx, cy, count, palette, compact) => {
      const motion = {
        clusterPhase: Math.random() * Math.PI * 2,
        clusterSpeed: 0.55 + Math.random() * 0.2,
        clusterAmpX: compact ? 26 : 46 + Math.random() * 16,
        clusterAmpY: compact ? 18 : 30 + Math.random() * 12,
      };
      const originX = cx * width;
      const originY = cy * height;
      makeNode({
        ...motion,
        homeX: originX,
        homeY: originY,
        radius: 3.2 + Math.random() * 0.7,
        color: palette[0],
        phase: Math.random() * Math.PI * 2,
        speed: 0.85 + Math.random() * 0.3,
        orbitX: compact ? 14 : 18 + Math.random() * 10,
        orbitY: compact ? 12 : 16 + Math.random() * 8,
        hub: true,
        layer: 1,
        degree: 5,
      });
      for (let n = 0; n < count; n += 1) {
        const angle = (n / count) * Math.PI * 2 + Math.random() * 0.7;
        const reach = (n % 4 === 0 ? 100 + Math.random() * 36 : 38 + Math.random() * 58) * (compact ? 0.75 : 1);
        makeNode({
          ...motion,
          homeX: clamp(originX + Math.cos(angle) * reach, 6, width - 6),
          homeY: clamp(originY + Math.sin(angle) * reach * 0.86, 6, height - 6),
          radius: 1.5 + Math.random() * 0.9,
          color: palette[(n + 1) % palette.length],
          phase: Math.random() * Math.PI * 2,
          speed: 1.05 + Math.random() * 0.45,
          orbitX: (compact ? 16 : 26) + Math.random() * 16,
          orbitY: (compact ? 14 : 22) + Math.random() * 14,
          hub: false,
          layer: 1,
          degree: 3,
        });
      }
    };

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.4);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const compact = width < 720;
      nodes = [];
      nextId = 0;
      const groups = compact
        ? [
            [0.08, 0.24, 12, [CYAN, BLUE]],
            [0.1, 0.72, 12, [VIOLET, BLUE]],
            [0.9, 0.22, 14, [CYAN, BLUE]],
            [0.86, 0.7, 14, [VIOLET, CYAN]],
          ]
        : [
            [0.045, 0.16, 13, [CYAN, BLUE]],
            [0.07, 0.46, 15, [VIOLET, CYAN, BLUE]],
            [0.05, 0.8, 13, [CYAN, VIOLET]],
            [0.94, 0.14, 16, [CYAN, BLUE]],
            [0.9, 0.4, 15, [BLUE, VIOLET, CYAN]],
            [0.93, 0.66, 16, [VIOLET, BLUE]],
            [0.84, 0.88, 13, [CYAN, VIOLET]],
          ];
      groups.forEach(([cx, cy, count, palette]) => addCluster(cx, cy, count, palette, compact));

      const depthCount = compact ? 18 : 34;
      for (let n = 0; n < depthCount; n += 1) {
        const left = n % 2 === 0;
        makeNode({
          homeX: (left ? Math.random() * 0.2 : 0.8 + Math.random() * 0.2) * width,
          homeY: Math.random() * height,
          radius: 0.9 + Math.random() * 0.45,
          color: COLORS[n % COLORS.length],
          phase: Math.random() * Math.PI * 2,
          speed: 0.45 + Math.random() * 0.25,
          orbitX: 12 + Math.random() * 10,
          orbitY: 10 + Math.random() * 8,
          clusterPhase: Math.random() * Math.PI * 2,
          clusterSpeed: 0.22,
          clusterAmpX: 16,
          clusterAmpY: 12,
          hub: false,
          layer: 0,
          degree: 2,
        });
      }

      dust = Array.from({ length: compact ? 28 : 48 }, (_, index) => ({
        baseX: (index % 2 === 0 ? Math.random() * 0.18 : 0.82 + Math.random() * 0.18) * width,
        baseY: Math.random() * height,
        phase: Math.random() * Math.PI * 2,
        speed: 0.35 + Math.random() * 0.3,
        span: 12 + Math.random() * 16,
        color: COLORS[index % COLORS.length],
        x: 0,
        y: 0,
      }));
    };

    const place = (particle, time) => {
      const clusterX = Math.sin(time * particle.clusterSpeed + particle.clusterPhase) * particle.clusterAmpX;
      const clusterY = Math.cos(time * particle.clusterSpeed * 0.75 + particle.clusterPhase) * particle.clusterAmpY;
      particle.x = clamp(
        particle.homeX + clusterX + Math.cos(time * particle.speed + particle.phase) * particle.orbitX,
        0,
        width,
      );
      particle.y = clamp(
        particle.homeY + clusterY + Math.sin(time * particle.speed * 0.82 + particle.phase) * particle.orbitY,
        0,
        height,
      );
    };

    const draw = () => {
      const time = (performance.now() - started) / 1000;
      ctx.clearRect(0, 0, width, height);
      ctx.globalAlpha = 1;

      const lights = [
        [0.08, 0.42, 0.2, CYAN, 0.05],
        [0.9, 0.28, 0.18, BLUE, 0.055],
        [0.88, 0.72, 0.16, VIOLET, 0.045],
      ];
      for (const [lx, ly, scale, color, alpha] of lights) {
        const radius = width * scale;
        const wash = ctx.createRadialGradient(lx * width, ly * height, 0, lx * width, ly * height, radius);
        wash.addColorStop(0, `rgba(${color}, ${alpha})`);
        wash.addColorStop(1, "rgba(3, 6, 18, 0)");
        ctx.fillStyle = wash;
        ctx.beginPath();
        ctx.arc(lx * width, ly * height, radius, 0, Math.PI * 2);
        ctx.fill();
      }

      for (const particle of nodes) place(particle, time);

      const mainReach = width < 720 ? 108 : 158;
      const seen = new Set();
      const links = [];
      for (const particle of nodes) {
        const reach = particle.layer === 0 ? mainReach * 0.72 : mainReach;
        const nearby = [];
        for (const other of nodes) {
          if (other.id <= particle.id || other.layer !== particle.layer) continue;
          const distance = Math.hypot(particle.x - other.x, particle.y - other.y);
          if (distance > reach || distance < 18) continue;
          nearby.push({ other, distance });
        }
        nearby.sort((a, b) => a.distance - b.distance);
        const limit = particle.hub ? particle.degree : Math.min(particle.degree, 3);
        for (let n = 0; n < nearby.length && n < limit; n += 1) {
          const key = `${particle.id}-${nearby[n].other.id}`;
          if (seen.has(key)) continue;
          seen.add(key);
          links.push({ particle, neighbor: nearby[n].other, distance: nearby[n].distance, reach });
        }
      }

      const hubs = nodes.filter((particle) => particle.hub);
      for (let index = 0; index < hubs.length; index += 1) {
        const hub = hubs[index];
        let joined = 0;
        for (let other = index + 1; other < hubs.length && joined < 2; other += 1) {
          const neighbor = hubs[other];
          const distance = Math.hypot(hub.x - neighbor.x, hub.y - neighbor.y);
          if (distance > mainReach * 2.15 || distance < mainReach) continue;
          joined += 1;
          links.push({ particle: hub, neighbor, distance, reach: mainReach * 2.15, backbone: true });
        }
      }

      for (const link of links) {
        const { particle, neighbor, distance, reach } = link;
        const near = 1 - distance / reach;
        const opacity = link.backbone ? 0.1 + near * 0.08 : (particle.layer === 0 ? 0.08 : 0.16) + near * (particle.layer === 0 ? 0.08 : 0.18);
        ctx.beginPath();
        ctx.moveTo(particle.x, particle.y);
        ctx.lineTo(neighbor.x, neighbor.y);
        if (particle.layer === 1 && !link.backbone) {
          ctx.strokeStyle = `rgba(${particle.color}, ${opacity * 0.28})`;
          ctx.lineWidth = 3.4;
          ctx.stroke();
        }
        const gradient = ctx.createLinearGradient(particle.x, particle.y, neighbor.x, neighbor.y);
        gradient.addColorStop(0, `rgba(${particle.color}, ${opacity})`);
        gradient.addColorStop(1, `rgba(${neighbor.color}, ${opacity})`);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = link.backbone ? 0.7 : 1.05;
        ctx.stroke();

        const signal = particle.hub || particle.id % 6 === 0;
        if (particle.layer === 1 && signal && !link.backbone) {
          const travel = (time * 0.28 + particle.phase) % 1;
          for (let step = 0; step < 4; step += 1) {
            const t = (travel - step * 0.055 + 1) % 1;
            ctx.globalAlpha = 0.9 - step * 0.2;
            ctx.fillStyle = `rgb(${step % 2 === 0 ? CYAN : particle.color})`;
            ctx.beginPath();
            ctx.arc(
              particle.x + (neighbor.x - particle.x) * t,
              particle.y + (neighbor.y - particle.y) * t,
              1.7 - step * 0.28,
              0,
              Math.PI * 2,
            );
            ctx.fill();
          }
          ctx.globalAlpha = 1;
        }
      }

      for (const speck of dust) {
        speck.x = speck.baseX + Math.cos(time * speck.speed + speck.phase) * speck.span;
        speck.y = speck.baseY + Math.sin(time * speck.speed * 0.8 + speck.phase) * speck.span;
        ctx.globalAlpha = 0.28;
        ctx.fillStyle = `rgb(${speck.color})`;
        ctx.fillRect(speck.x, speck.y, 1.1, 1.1);
      }
      ctx.globalAlpha = 1;

      for (const particle of nodes) {
        const pulse = 0.8 + 0.2 * Math.sin(time * 1.35 + particle.phase);
        if (particle.layer === 1) {
          const halo = (particle.hub ? 34 : 16) * pulse;
          ctx.globalAlpha = particle.hub ? pulse : pulse * 0.8;
          ctx.drawImage(glows[particle.color], particle.x - halo / 2, particle.y - halo / 2, halo, halo);
        }
        ctx.globalAlpha = particle.layer === 0 ? 0.45 : 1;
        ctx.fillStyle = `rgb(${particle.color})`;
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius * (particle.hub ? pulse : 1), 0, Math.PI * 2);
        ctx.fill();
        if (particle.hub) {
          ctx.globalAlpha = 0.7;
          ctx.strokeStyle = `rgba(${particle.color}, 0.85)`;
          ctx.lineWidth = 0.9;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius + 6, time * 0.7 + particle.phase, time * 0.7 + particle.phase + 1.5);
          ctx.stroke();
          ctx.globalAlpha = 0.35;
          ctx.beginPath();
          ctx.arc(particle.x, particle.y, particle.radius + 11, -time * 0.45 + particle.phase, -time * 0.45 + particle.phase + 1.1);
          ctx.stroke();
        }
        ctx.globalAlpha = 1;
      }

      const veil = ctx.createRadialGradient(width * 0.56, height * 0.36, width * 0.05, width * 0.56, height * 0.36, width * 0.24);
      veil.addColorStop(0, "rgba(3, 6, 18, 0.62)");
      veil.addColorStop(0.55, "rgba(3, 6, 18, 0.22)");
      veil.addColorStop(1, "rgba(3, 6, 18, 0)");
      ctx.fillStyle = veil;
      ctx.fillRect(0, 0, width, height);
    };

    const tick = () => {
      draw();
      animationId = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    animationId = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles" aria-hidden="true" />;
}
