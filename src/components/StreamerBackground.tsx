'use client';

import { useEffect, useRef } from 'react';

export default function StreamerBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let particles: Particle[] = [];

    const particleColors = [
      { r: 14, g: 165, b: 233 }, // primary blue
      { r: 168, g: 85, b: 247 }, // purple
      { r: 56, g: 189, b: 248 }, // light blue
      { r: 192, g: 132, b: 252 }, // light purple
    ];

    class Particle {
      x: number;
      y: number;
      vx: number;
      vy: number;
      life: number;
      maxLife: number;
      length: number;
      speed: number;
      opacity: number;
      color: { r: number; g: number; b: number };

      constructor(canvasWidth: number, canvasHeight: number) {
        const startEdge = Math.random();
        if (startEdge < 0.5) {
          this.x = Math.random() * canvasWidth;
          this.y = Math.random() < 0.5 ? -50 : canvasHeight + 50;
        } else {
          this.x = Math.random() < 0.5 ? -50 : canvasWidth + 50;
          this.y = Math.random() * canvasHeight;
        }

        const angle = Math.random() * Math.PI * 2;
        this.speed = 0.3 + Math.random() * 1.5;
        this.vx = Math.cos(angle) * this.speed;
        this.vy = Math.sin(angle) * this.speed;
        this.maxLife = 150 + Math.random() * 250;
        this.life = this.maxLife;
        this.length = 30 + Math.random() * 100;
        this.opacity = 0.2 + Math.random() * 0.5;
        this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      }

      update(canvasWidth: number, canvasHeight: number) {
        this.x += this.vx;
        this.y += this.vy;
        this.life--;
        this.opacity = (this.life / this.maxLife) * (0.2 + (Math.random() * 0.4));
      }

      draw(ctx: CanvasRenderingContext2D) {
        const alpha = this.opacity;
        const { r, g, b } = this.color;
        const gradient = ctx.createLinearGradient(
          this.x - this.vx * this.length,
          this.y - this.vy * this.length,
          this.x,
          this.y
        );
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, 0)`);
        gradient.addColorStop(0.3, `rgba(${r}, ${g}, ${b}, ${alpha * 0.3})`);
        gradient.addColorStop(0.7, `rgba(${r}, ${g}, ${b}, ${alpha * 0.6})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, ${alpha})`);

        ctx.beginPath();
        ctx.moveTo(this.x - this.vx * this.length, this.y - this.vy * this.length);
        ctx.lineTo(this.x, this.y);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = 1 + Math.random() * 1.5;
        ctx.lineCap = 'round';
        ctx.stroke();
      }

      isAlive() {
        return this.life > 0;
      }
    }

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    const initParticles = () => {
      particles = [];
      const particleCount = Math.floor((canvas.width * canvas.height) / 6000);
      for (let i = 0; i < particleCount; i++) {
        particles.push(new Particle(canvas.width, canvas.height));
      }
    };

    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0)';
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.forEach((p, i) => {
        p.update(canvas.width, canvas.height);
        p.draw(ctx);
        if (!p.isAlive()) {
          particles[i] = new Particle(canvas.width, canvas.height);
        }
      });

      if (particles.length < Math.floor((canvas.width * canvas.height) / 6000)) {
        particles.push(new Particle(canvas.width, canvas.height));
      }

      animationFrameId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    initParticles();
    animate();

    const handleResize = () => {
      resizeCanvas();
      initParticles();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-0"
      style={{ background: 'transparent' }}
    />
  );
}
