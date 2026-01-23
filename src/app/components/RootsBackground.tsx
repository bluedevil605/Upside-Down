import { useEffect, useRef } from 'react';
import { motion } from 'motion/react';

interface Firefly {
    x: number;
    y: number;
    vx: number;
    vy: number;
    size: number;
    phase: number; // For pulsing
    hue: number; // For color variance
    t: number; // Time offset for turbulence
}

export function RootsBackground() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const animationFrameRef = useRef<number | null>(null);
    const firefliesRef = useRef<Firefly[]>([]);
    const glowSpriteRef = useRef<HTMLCanvasElement | null>(null);
    const mouseRef = useRef({ x: 0, y: 0 });

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            mouseRef.current = { x: e.clientX, y: e.clientY };
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const resizeCanvas = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        };
        resizeCanvas();
        window.addEventListener('resize', resizeCanvas);

        // Optimization: Create glow sprite once
        const createGlowSprite = () => {
            const sprite = document.createElement('canvas');
            sprite.width = 40; // Increased for softer glow
            sprite.height = 40;
            const sCtx = sprite.getContext('2d');
            if (!sCtx) return null;

            const cx = 20;
            const cy = 20;
            const radius = 18;

            const gradient = sCtx.createRadialGradient(cx, cy, 0, cx, cy, radius);
            // Softer gradient stops
            gradient.addColorStop(0, 'rgba(255, 255, 230, 0.8)');   // More transparent core
            gradient.addColorStop(0.5, 'rgba(255, 220, 150, 0.2)'); // Very soft mid
            gradient.addColorStop(1, 'rgba(255, 100, 50, 0)');    // Fade out

            sCtx.fillStyle = gradient;
            sCtx.beginPath();
            sCtx.arc(cx, cy, radius, 0, Math.PI * 2);
            sCtx.fill();

            return sprite;
        };

        if (!glowSpriteRef.current) {
            glowSpriteRef.current = createGlowSprite();
        }

        // Initialize Fireflies (Vecna's spores)
        const initFireflies = () => {
            firefliesRef.current = [];
            // Reduced count for less chaos
            for (let i = 0; i < 60; i++) {
                firefliesRef.current.push({
                    x: Math.random() * canvas.width,
                    y: Math.random() * canvas.height,
                    vx: (Math.random() - 0.5) * 0.1, // Very slow drift
                    vy: (Math.random() - 0.5) * 0.1,
                    size: Math.random() * 2 + 0.5,
                    phase: Math.random() * Math.PI * 2,
                    hue: 30 + Math.random() * 20,
                    t: Math.random() * 100
                });
            }
        };

        initFireflies();

        const animate = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            // Fireflies / Spores
            // Use lighter composition for glow
            ctx.globalCompositeOperation = 'screen';
            const sprite = glowSpriteRef.current;
            const mx = mouseRef.current.x;
            const my = mouseRef.current.y;

            firefliesRef.current.forEach(firefly => {
                // Turbulence (Perlin-ish using Sine)
                firefly.t += 0.01;
                const turbulenceX = Math.sin(firefly.t) * 0.05;
                const turbulenceY = Math.cos(firefly.t * 0.7) * 0.05;

                // Mouse Attraction
                const dx = mx - firefly.x;
                const dy = my - firefly.y;
                const dist = Math.sqrt(dx * dx + dy * dy);

                // Attraction zone: 300px
                if (dist < 300) {
                    const force = (300 - dist) / 300; // 0 to 1
                    firefly.vx += (dx / dist) * force * 0.05;
                    firefly.vy += (dy / dist) * force * 0.05;
                }

                // Update velocity with turbulence
                firefly.vx += turbulenceX;
                firefly.vy += turbulenceY;

                // Update position
                firefly.x += firefly.vx;
                firefly.y += firefly.vy;

                // Damping
                firefly.vx *= 0.98;
                firefly.vy *= 0.98;

                // Boundary wrap
                if (firefly.x < -30) firefly.x = canvas.width + 30;
                if (firefly.x > canvas.width + 30) firefly.x = -30;
                if (firefly.y < -30) firefly.y = canvas.height + 30;
                if (firefly.y > canvas.height + 30) firefly.y = -30;

                // Draw using Optimized Sprite
                if (sprite) {
                    const pulse = Math.sin(Date.now() * 0.003 + firefly.phase) * 0.4 + 0.8; // More dynamic pulse
                    const sizeVar = (Math.sin(firefly.t * 2) + 2) * 0.5; // Size breath

                    ctx.globalAlpha = pulse * 0.8;

                    // We can tint by drawing a colored circle on top if we want, but sprite has gradient.
                    // Let's just vary scale.
                    const scale = (firefly.size / 2) * sizeVar * pulse;

                    const drawSize = 40 * scale;
                    const offset = drawSize / 2;

                    ctx.drawImage(sprite, firefly.x - offset, firefly.y - offset, drawSize, drawSize);
                }
            });
            ctx.globalAlpha = 1; // Reset alpha

            // Reset composite for standard drawing
            ctx.globalCompositeOperation = 'source-over';

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
            style={{ zIndex: 0, background: 'radial-gradient(circle at center, #1a0505 0%, #000000 100%)' }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
        />
    );
}
