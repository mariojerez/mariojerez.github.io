import { useEffect, useRef } from 'react';

const AGENTS       = 50;
const SPEED        = 0.55;
const DIST         = 130;
const CURSOR_RANGE = 250;   // radius within which cursor attracts nodes
const CURSOR_FORCE = 0.012; // strength of cursor attraction

const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function SwarmBackground() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const agents    = useRef([]);
  const mouse     = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    function resize() {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function init() {
      agents.current = Array.from({ length: AGENTS }, () => ({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        vx: (Math.random() - 0.5) * SPEED * 2,
        vy: (Math.random() - 0.5) * SPEED * 2,
      }));
    }

    function onMouseMove(e) {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
    }

    function onMouseLeave() {
      mouse.current.x = -9999;
      mouse.current.y = -9999;
    }

    function draw() {
      ctx.fillStyle = 'rgba(12, 21, 32, 0.22)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      const list = agents.current;
      const mx = mouse.current.x;
      const my = mouse.current.y;

      for (const a of list) {
        // Mild flocking cohesion toward nearby neighbors
        let cx = 0, cy = 0, count = 0;
        for (const b of list) {
          if (b === a) continue;
          const dx = b.x - a.x;
          const dy = b.y - a.y;
          const d = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) { cx += b.x; cy += b.y; count++; }
        }
        if (count > 0) {
          a.vx += (cx / count - a.x) * 0.00018;
          a.vy += (cy / count - a.y) * 0.00018;
        }

        // Cursor gravitational attraction
        const cdx = mx - a.x;
        const cdy = my - a.y;
        const cd  = Math.sqrt(cdx * cdx + cdy * cdy);
        if (cd < CURSOR_RANGE && cd > 0) {
          const strength = (1 - cd / CURSOR_RANGE) * CURSOR_FORCE;
          a.vx += (cdx / cd) * strength;
          a.vy += (cdy / cd) * strength;
        }

        // Clamp speed
        const spd = Math.sqrt(a.vx * a.vx + a.vy * a.vy);
        if (spd > SPEED) { a.vx = (a.vx / spd) * SPEED; a.vy = (a.vy / spd) * SPEED; }

        a.x += a.vx;
        a.y += a.vy;
        if (a.x <= 0 || a.x >= canvas.width)  { a.vx *= -1; a.x = Math.max(0, Math.min(canvas.width,  a.x)); }
        if (a.y <= 0 || a.y >= canvas.height)  { a.vy *= -1; a.y = Math.max(0, Math.min(canvas.height, a.y)); }
      }

      // Connection lines
      for (let i = 0; i < list.length; i++) {
        for (let j = i + 1; j < list.length; j++) {
          const dx = list[i].x - list[j].x;
          const dy = list[i].y - list[j].y;
          const d  = Math.sqrt(dx * dx + dy * dy);
          if (d < DIST) {
            const alpha = (1 - d / DIST) * 0.13;
            ctx.beginPath();
            ctx.strokeStyle = `rgba(136,189,242,${alpha})`;
            ctx.lineWidth = 0.6;
            ctx.moveTo(list[i].x, list[i].y);
            ctx.lineTo(list[j].x, list[j].y);
            ctx.stroke();
          }
        }
      }

      // Agent dots
      for (const a of list) {
        ctx.beginPath();
        ctx.arc(a.x, a.y, 2, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(136,189,242,0.22)';
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    resize();
    if (reducedMotion) return;
    init();
    draw();

    const onResize = () => { resize(); init(); };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseleave', onMouseLeave);
    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseleave', onMouseLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        top: 0, left: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
      }}
    />
  );
}
