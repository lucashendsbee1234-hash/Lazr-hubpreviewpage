import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
}

export const ParticleCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    const colors = [
      'rgba(168, 85, 247, ', // purple
      'rgba(129, 140, 248, ', // indigo
      'rgba(59, 130, 246, ',  // blue
      'rgba(236, 72, 153, ',  // pink
      'rgba(56, 189, 248, '   // cyan
    ];

    const mouse = { x: -1000, y: -1000, radius: 180 };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };

    const handleMouseLeave = () => {
      mouse.x = -1000;
      mouse.y = -1000;
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseleave', handleMouseLeave);

    const particles: Particle[] = [];

    // Create glowing interactive dots
    const dotCount = Math.min(Math.floor((width * height) / 9000), 90);
    for (let i = 0; i < dotCount; i++) {
      const baseAlpha = Math.random() * 0.45 + 0.2;
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 3 + 1.2,
        color: colors[Math.floor(Math.random() * colors.length)],
        alpha: baseAlpha,
        baseAlpha: baseAlpha,
        pulseSpeed: Math.random() * 0.02 + 0.008,
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, width, height);

      // Draw faint constellation lines between dots
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 125) {
            const lineAlpha = (1 - dist / 125) * 0.15;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.strokeStyle = `rgba(168, 85, 247, ${lineAlpha})`;
            ctx.lineWidth = 0.8;
            ctx.stroke();
          }
        }
      }

      // Render each dot
      particles.forEach((p) => {
        // Move particle
        p.x += p.vx;
        p.y += p.vy;

        // Wrap edges
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        // Calculate distance to mouse
        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const distToMouse = Math.sqrt(dx * dx + dy * dy);

        let scale = 1;
        let alphaMultiplier = 1;

        if (distToMouse < mouse.radius) {
          const force = 1 - distToMouse / mouse.radius;
          scale = 1 + force * 1.8;
          alphaMultiplier = 1 + force * 1.4;

          // Gentle repelling push away from cursor
          p.x += (dx / (distToMouse || 1)) * force * 1.2;
          p.y += (dy / (distToMouse || 1)) * force * 1.2;
        }

        const currentAlpha = Math.min(
          (p.baseAlpha + Math.sin(time * 3 + p.x) * 0.15) * alphaMultiplier,
          0.95
        );

        // Draw Core Glow Dot
        const size = p.size * scale;
        const glowRadius = size * 3;
        const gradient = ctx.createRadialGradient(
          p.x, p.y, 0,
          p.x, p.y, glowRadius
        );
        gradient.addColorStop(0, `${p.color}${currentAlpha})`);
        gradient.addColorStop(0.5, `${p.color}${currentAlpha * 0.35})`);
        gradient.addColorStop(1, `${p.color}0)`);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // White/bright center core
        ctx.fillStyle = `rgba(255, 255, 255, ${Math.min(currentAlpha + 0.2, 1)})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, size * 0.6, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0 opacity-90"
    />
  );
};
