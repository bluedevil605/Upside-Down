import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion } from 'motion/react';

interface StrangerThingsD20Props {
    onCrack: () => void;
}

export function StrangerThingsD20({ onCrack }: StrangerThingsD20Props) {
    const [rotation, setRotation] = useState({ x: 0, y: 0, z: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const [isClicked, setIsClicked] = useState(false);

    useEffect(() => {
        if (isClicked) return;

        // Constant rotation loop for idle state
        // We can use motion animate for smooth looping, but state allows interruption.
        // Let's use simple increment.
        const interval = setInterval(() => {
            if (!isHovered) {
                setRotation(prev => ({
                    x: prev.x + 0.5,
                    y: prev.y + 1,
                    z: prev.z + 0.2
                }));
            }
        }, 20);

        return () => clearInterval(interval);
    }, [isHovered, isClicked]);

    const handleClick = () => {
        if (isClicked) return;
        setIsClicked(true);
        // Spin faster
        setRotation({ x: 720, y: 720, z: 360 });
        setTimeout(() => {
            onCrack();
        }, 1000);
    };

    // --- STANDARD D6 CUBE GEOMETRY ---
    const size = 80;
    const offset = size / 2;

    const faces = [
        { id: 'front', ry: 0, rx: 0, tz: offset, label: '6', color: '#ef4444' },
        { id: 'back', ry: 180, rx: 0, tz: offset, label: '1', color: '#7f1d1d' },
        { id: 'right', ry: 90, rx: 0, tz: offset, label: '3', color: '#7e22ce' },
        { id: 'left', ry: -90, rx: 0, tz: offset, label: '4', color: '#581c87' },
        { id: 'top', ry: 0, rx: 90, tz: offset, label: '5', color: '#b91c1c' },
        { id: 'bottom', ry: 0, rx: -90, tz: offset, label: '2', color: '#6b21a8' },
    ];

    return (
        // Centered Bottom Position
        <div className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[60]" style={{ perspective: '1000px' }}>
            <motion.div
                className="relative cursor-pointer"
                style={{
                    width: size,
                    height: size,
                    transformStyle: 'preserve-3d'
                }}
                animate={isClicked ? {
                    scale: [1, 1.4, 0.1],
                    opacity: [1, 1, 0],
                    rotateX: [rotation.x, rotation.x + 1080],
                    rotateY: [rotation.y, rotation.y + 1080],
                    rotateZ: [rotation.z, rotation.z + 360]
                } : {
                    y: [-10, 10, -10], // Floating
                    rotateX: rotation.x,
                    rotateY: rotation.y,
                    rotateZ: rotation.z
                }}
                transition={isClicked ? { duration: 1.2, ease: "circIn" } : {
                    y: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
                    rotateX: { duration: 0 }, // Driven by state interval
                    rotateY: { duration: 0 },
                    rotateZ: { duration: 0 }
                }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
                onClick={handleClick}
            >
                <div className="w-full h-full relative" style={{ transformStyle: 'preserve-3d' }}>
                    {faces.map((face) => (
                        <div
                            key={face.id}
                            className="absolute inset-0 flex items-center justify-center backface-visible border-2 border-white/20"
                            style={{
                                background: `linear-gradient(135deg, ${face.color}, rgba(0,0,0,0.8))`,
                                transform: `rotateY(${face.ry}deg) rotateX(${face.rx}deg) translateZ(${face.tz}px)`,
                                boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
                                borderRadius: '12px' // Rounded corners for dice look
                            }}
                        >
                            {/* Dice Dots or Number? User said "normal dice". Dots are more "standard" but numbers match theme. 
                    Let's stick to Numbers for legibility and theme consistency. */}
                            <span
                                className="text-white font-bold text-4xl select-none"
                                style={{
                                    fontFamily: 'Special Elite, cursive',
                                    textShadow: '0 0 10px rgba(0,0,0,0.5)'
                                }}
                            >
                                {face.label}
                            </span>

                            {/* Inner shine */}
                            <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent rounded-lg" />
                        </div>
                    ))}

                    {/* Inner Glow Core */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-16 h-16 bg-red-600/50 rounded-full blur-xl animate-pulse" />
                </div>
            </motion.div>

            {/* Floating Shadow */}
            <div className="absolute top-32 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/50 blur-lg rounded-full" />

            {/* Void Text */}
            {/* Void Text Portal */}
            {isClicked && createPortal(
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{
                        opacity: [0, 1, 1, 0],
                        scale: [0.5, 1.1, 1.2, 3]
                    }}
                    transition={{
                        duration: 1.2,
                        times: [0, 0.2, 0.8, 1],
                        ease: "easeInOut"
                    }}
                    className="fixed inset-0 flex items-center justify-center pointer-events-none z-[100]"
                >
                    <h2
                        className="text-5xl md:text-8xl font-bold text-red-600 tracking-widest text-center"
                        style={{
                            fontFamily: 'Special Elite, cursive',
                            textShadow: '0 0 30px rgba(220, 38, 38, 0.9), 0 0 60px rgba(220, 38, 38, 0.5)'
                        }}
                    >
                        ENTERING THE VOID...
                    </h2>
                </motion.div>,
                document.body
            )}
        </div>
    );
}
