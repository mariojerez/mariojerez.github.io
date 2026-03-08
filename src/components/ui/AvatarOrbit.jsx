import { useEffect, useRef } from 'react';

const ORBITERS = [
  { radius: 133, speed: 0.0008, phase: 0,    size: 2.5 },
  { radius: 141, speed: 0.0012, phase: 1.2,  size: 2.0 },
  { radius: 128, speed: 0.0006, phase: 2.5,  size: 2.2 },
  { radius: 138, speed: 0.0015, phase: 0.8,  size: 1.8 },
  { radius: 145, speed: 0.0010, phase: 3.8,  size: 2.5 },
  { radius: 130, speed: 0.0007, phase: 4.7,  size: 2.0 },
  { radius: 142, speed: 0.0013, phase: 2.1,  size: 1.8 },
  { radius: 136, speed: 0.0009, phase: 5.2,  size: 2.3 },
];

export default function AvatarOrbit() {
  const canvasRef = useRef(null);
  const animRef   = useRef(null);
  const startRef  = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const SIZE = 350;
    canvas.width  = SIZE;
    canvas.height = SIZE;
    const cx = SIZE / 2;
    const cy = SIZE / 2;

    function draw(ts) {
      if (!startRef.current) startRef.current = ts;
      const t = ts - startRef.current;

      ctx.clearRect(0, 0, SIZE, SIZE);

      for (const orb of ORBITERS) {
        const wobble = Math.sin(t * 0.0004 + orb.phase) * 6;
        const r = orb.radius + wobble;
        const angle = t * orb.speed + orb.phase;
        const x = cx + Math.cos(angle) * r;
        const y = cy + Math.sin(angle) * r;

        // Glow
        const grd = ctx.createRadialGradient(x, y, 0, x, y, orb.size * 3.5);
        grd.addColorStop(0, 'rgba(136,189,242,0.55)');
        grd.addColorStop(1, 'rgba(136,189,242,0)');
        ctx.beginPath();
        ctx.arc(x, y, orb.size * 3.5, 0, Math.PI * 2);
        ctx.fillStyle = grd;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(x, y, orb.size, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(189,221,252,0.8)';
        ctx.fill();
      }

      animRef.current = requestAnimationFrame(draw);
    }

    animRef.current = requestAnimationFrame(draw);
    return () => cancelAnimationFrame(animRef.current);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="avatar-orbit-canvas"
    />
  );
}
