import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Firefly {
  x: number;
  y: number;
  z: number;
  vx: number;
  vy: number;
  vz: number;
  size: number;
  opacity: number;
  glowIntensity: number;
}

export function FireflyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const firefliesRef = useRef<Firefly[]>([]);
  const animationFrameRef = useRef<number>();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Initialize fireflies
    const fireflyCount = 50;
    firefliesRef.current = Array.from({ length: fireflyCount }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      z: Math.random() * 1000,
      vx: (Math.random() - 0.5) * 0.5,
      vy: (Math.random() - 0.5) * 0.5,
      vz: (Math.random() - 0.5) * 2,
      size: Math.random() * 3 + 1,
      opacity: Math.random() * 0.5 + 0.3,
      glowIntensity: Math.random() * 10 + 5
    }));

    // Animation loop
    const animate = () => {
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      firefliesRef.current.forEach((firefly) => {
        // Update position with 3D movement
        firefly.x += firefly.vx;
        firefly.y += firefly.vy;
        firefly.z += firefly.vz;

        // Wrap around edges
        if (firefly.x < 0) firefly.x = canvas.width;
        if (firefly.x > canvas.width) firefly.x = 0;
        if (firefly.y < 0) firefly.y = canvas.height;
        if (firefly.y > canvas.height) firefly.y = 0;
        if (firefly.z < 0) firefly.z = 1000;
        if (firefly.z > 1000) firefly.z = 0;

        // Calculate 3D perspective
        const scale = 1000 / (1000 + firefly.z);
        const x = firefly.x;
        const y = firefly.y;
        const size = firefly.size * scale;
        const opacity = firefly.opacity * scale;

        // Pulsating glow effect
        const pulse = Math.sin(Date.now() * 0.003 + firefly.x) * 0.5 + 0.5;
        const glowSize = firefly.glowIntensity * scale * (1 + pulse * 0.5);

        // Draw glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        gradient.addColorStop(0, `rgba(220, 38, 38, ${opacity * 0.8})`);
        gradient.addColorStop(0.4, `rgba(220, 38, 38, ${opacity * 0.4})`);
        gradient.addColorStop(0.7, `rgba(185, 28, 28, ${opacity * 0.2})`);
        gradient.addColorStop(1, 'rgba(220, 38, 38, 0)');

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        // Draw core
        ctx.fillStyle = `rgba(255, 255, 200, ${opacity})`;
        ctx.beginPath();
        ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return (
    <motion.canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 1 }}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 2 }}
    />
  );
}
