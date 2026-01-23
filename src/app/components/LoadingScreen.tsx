'use client';

import { motion } from 'motion/react';
import { useEffect, useState, useMemo } from 'react';

function Spore({ delay, depth }: { delay: number, depth: number }) {
    const randomX = useMemo(() => Math.random() * window.innerWidth, []);
    const randomY = useMemo(() => Math.random() * window.innerHeight, []);

    // Parallax / Depth feel: deeper spores are smaller, slower, and blurrier
    const scale = 1.5 - depth * 0.5; // Depth 0=1.5, Depth 1=1
    const opacity = 0.8 - depth * 0.4;
    const blur = depth * 2;
    const duration = 4 + depth * 3; // Deeper = slower

    return (
        <motion.div
            className="absolute w-1 h-1 rounded-full bg-red-500/60"
            style={{ filter: `blur(${blur}px)` }}
            initial={{ x: randomX, y: randomY, scale: 0, opacity: 0 }}
            animate={{
                y: [randomY, randomY - 150], // Drift Up
                x: [randomX, randomX + (Math.random() - 0.5) * 80], // Drift Side
                scale: [0, scale, 0],
                opacity: [0, opacity, 0],
            }}
            transition={{
                duration: duration,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }}
        />
    );
}

function LightningFlash() {
    // Random lightning flashes in the clouds
    return (
        <motion.div
            className="absolute inset-0 bg-red-600/10 pointer-events-none z-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.2, 0, 0, 0.4, 0] }}
            transition={{
                duration: 4,
                times: [0, 0.05, 0.1, 0.8, 0.85, 1], // Flash patterns
                repeat: Infinity,
                delay: Math.random() * 5
            }}
        />
    )
}

export function LoadingScreen() {
    const [mount, setMount] = useState(false);

    useEffect(() => {
        setMount(true);
        return () => setMount(false);
    }, []);

    // Layers of spores
    const spores = useMemo(() => {
        return Array.from({ length: 40 }).map((_, i) => ({
            id: i,
            delay: Math.random() * 2,
            depth: Math.random() // 0 to 1
        }));
    }, []);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.8 } }}
        >
            {/* 1. Deep Atmospheric Background */}
            <motion.div
                className="absolute inset-0"
                style={{
                    background: 'radial-gradient(circle at 50% 120%, #2f0404 0%, #1a0505 40%, #000000 100%)'
                }}
            />

            {/* 2. Abstract "Cloud" Texture (CSS pattern) */}
            <div className="absolute inset-0 opacity-30 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] mix-blend-overlay" />

            {/* 3. Lightning */}
            <LightningFlash />
            <LightningFlash />

            {/* 4. Spores (Depth Layers) */}
            {mount && spores.map((spore) => (
                <Spore key={spore.id} delay={spore.delay} depth={spore.depth} />
            ))}

            {/* 5. Vignette */}
            <div className="absolute inset-0 bg-[radial-gradient(transparent_40%,_#000000_100%)] pointer-events-none" />

            {/* 6. Central Content */}
            <motion.div
                className="relative z-50 text-center flex flex-col items-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ scale: 0.9, opacity: 0, filter: 'blur(10px)' }}
                transition={{ duration: 0.8, ease: "easeOut" }}
            >
                {/* Title */}
                <motion.h1
                    className="text-5xl md:text-7xl font-bold tracking-widest text-red-600 mb-6 select-none"
                    style={{
                        fontFamily: "'Special Elite', cursive",
                        textShadow: '0 0 20px rgba(220, 38, 38, 0.6)'
                    }}
                    animate={{
                        textShadow: [
                            '0 0 20px rgba(220, 38, 38, 0.6)',
                            '0 0 40px rgba(220, 38, 38, 1)', // Glow up
                            '0 0 20px rgba(220, 38, 38, 0.6)'
                        ],
                        opacity: [1, 0.8, 1, 0.9, 1] // Subtle flicker
                    }}
                    transition={{
                        textShadow: { duration: 3, repeat: Infinity, ease: "easeInOut" },
                        opacity: { duration: 0.2, repeat: Infinity, repeatDelay: 3 } // Random flickers
                    }}
                >
                    LOADING
                </motion.h1>

                {/* Progress Bar / Loader */}
                <div className="relative w-48 h-1 bg-red-950/50 rounded-full overflow-hidden">
                    <motion.div
                        className="absolute inset-y-0 left-0 bg-red-600 shadow-[0_0_10px_#dc2626]"
                        initial={{ x: '-100%' }}
                        animate={{ x: '100%' }}
                        transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />
                </div>

                {/* Status Text */}
                <motion.p
                    className="mt-4 text-xs tracking-widest text-red-400/60 uppercase"
                    animate={{ opacity: [0.4, 0.7, 0.4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    Connecting to Upside Down...
                </motion.p>
            </motion.div>
        </motion.div>
    );
}
