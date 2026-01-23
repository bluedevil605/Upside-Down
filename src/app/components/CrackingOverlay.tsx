import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

interface CrackingOverlayProps {
    onComplete: () => void;
}

export function CrackingOverlay({ onComplete }: CrackingOverlayProps) {
    const [stage, setStage] = useState(0);

    useEffect(() => {
        // Timeline of destruction
        const timeline = [
            setTimeout(() => setStage(1), 100), // Initial crack
            setTimeout(() => setStage(2), 600), // Expansion
            setTimeout(() => setStage(3), 1200), // Full breach (Red flash)
            setTimeout(() => {
                onComplete();
            }, 2000)
        ];

        return () => timeline.forEach(clearTimeout);
    }, [onComplete]);

    // Screen shake effect
    const shakeVariants = {
        shake: {
            x: [0, -10, 10, -10, 10, 0],
            y: [0, 5, -5, 5, -5, 0],
            transition: { duration: 0.2, repeat: Infinity }
        }
    };

    return (
        <motion.div
            className="fixed inset-0 z-[100] pointer-events-none flex items-center justify-center overflow-hidden"
            variants={shakeVariants}
            animate={stage > 0 ? "shake" : ""}
        >
            {/* Stage 3: Full Red Flash / Portal Breach */}
            <motion.div
                className="absolute inset-0 bg-red-600 mix-blend-overlay"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 3 ? [0, 1, 0] : 0 }}
                transition={{ duration: 0.5 }}
            />

            <motion.div
                className="absolute inset-0 bg-black"
                initial={{ opacity: 0 }}
                animate={{ opacity: stage >= 3 ? 1 : 0 }}
                transition={{ duration: 1 }}
            />

            {/* Cracks SVG */}
            <svg className="w-full h-full max-w-[150vh] max-h-[150vh] filter drop-shadow-[0_0_10px_rgba(220,38,38,0.8)]" viewBox="0 0 100 100" preserveAspectRatio="none">
                {/* Center Crack Source */}
                {stage >= 1 && (
                    <motion.path
                        d="M50 50 L48 45 L52 40 M50 50 L55 52 L60 48 M50 50 L45 55 L40 52 M50 50 L52 58 L48 65"
                        stroke="#ef4444"
                        strokeWidth="0.5"
                        fill="none"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 0.2 }}
                    />
                )}

                {/* Main Spreading Veins */}
                {stage >= 2 && (
                    <>
                        <motion.path
                            d="M52 40 L55 35 L50 30 L58 20 L55 10 M60 48 L65 50 L75 45 L85 55 L95 50 M48 65 L45 70 L50 80 L40 90 L45 95 M40 52 L35 55 L25 50 L15 55 L5 50"
                            stroke="#b91c1c"
                            strokeWidth="1"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.5 }}
                        />
                        {/* Secondary web */}
                        <motion.path
                            d="M50 30 L45 25 M75 45 L80 40 M50 80 L55 85 M25 50 L20 45"
                            stroke="#7f1d1d"
                            strokeWidth="0.5"
                            fill="none"
                            initial={{ pathLength: 0 }}
                            animate={{ pathLength: 1 }}
                            transition={{ duration: 0.3, delay: 0.2 }}
                        />
                    </>
                )}
            </svg>
        </motion.div>
    );
}
