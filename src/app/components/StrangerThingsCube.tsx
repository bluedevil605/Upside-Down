import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface StrangerThingsCubeProps {
  onNavigate: (index: number) => void;
}

export function StrangerThingsCube({ onNavigate }: StrangerThingsCubeProps) {
  const [isExploding, setIsExploding] = useState(false);
  const [rotation, setRotation] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);

  // Idle rotation animation - pauses on hover
  useEffect(() => {
    if (isExploding || isHovered) return;

    const rotateInterval = setInterval(() => {
      setRotation(prev => ({
        x: prev.x + 0.6,
        y: prev.y + 1
      }));
    }, 50);

    return () => {
      clearInterval(rotateInterval);
    };
  }, [isExploding, isHovered]);

  const handleFaceClick = (number: number, e: React.MouseEvent) => {
    e.stopPropagation();

    if (number === 6) {
      // Trigger Upside Down Mode
      setIsExploding(true);
      onNavigate(6); // Special code for Upside Down

      // Reset local explosion state after animation
      setTimeout(() => {
        setIsExploding(false);
      }, 5000); // Match App duration
    } else {
      // Normal Navigation
      // Just navigate immediately
      onNavigate(number);
    }
  };

  // Generate roots for explosion effect (for #6)
  const generateRoots = () => {
    const roots = [];
    const numRoots = 30;

    for (let i = 0; i < numRoots; i++) {
      const angle = (i / numRoots) * Math.PI * 2;
      roots.push({
        id: i,
        angle,
        branches: Math.floor(Math.random() * 4) + 3
      });
    }
    return roots;
  };

  const roots = generateRoots();

  return (
    <>
      <AnimatePresence>
        {!isExploding && (
          <motion.div
            className="fixed z-40 cursor-pointer left-1/2 bottom-20 -translate-x-1/2"
            style={{
              perspective: '1000px',
              transformStyle: 'preserve-3d'
            }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: [-10, 10, -10]
            }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{
              y: { duration: 4, repeat: Infinity, ease: 'easeInOut' }
            }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
            whileHover={{ scale: 1.2 }}
            whileTap={{ scale: 0.9 }}
          >
            <motion.div
              className="relative w-20 h-20" // Reduced to 80px (w-20)
              style={{
                transformStyle: 'preserve-3d',
                transform: `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`
              }}
            >
              {/* Cube faces D6 
                  1: Home
                  2: About
                  3: Projects
                  4: TechStack
                  5: Contact
                  6: Upside Down
              */}
              {[
                { transform: 'rotateY(0deg) translateZ(40px)', number: 1, label: 'HOME' },    // Front
                { transform: 'rotateY(90deg) translateZ(40px)', number: 2, label: 'ABOUT' },   // Right
                { transform: 'rotateY(180deg) translateZ(40px)', number: 6, label: 'UPSIDE DOWN' },  // Back (Special)
                { transform: 'rotateY(-90deg) translateZ(40px)', number: 5, label: 'CONTACT' },  // Left
                { transform: 'rotateX(90deg) translateZ(40px)', number: 3, label: 'PROJECTS' },   // Top
                { transform: 'rotateX(-90deg) translateZ(40px)', number: 4, label: 'TECH' }   // Bottom (Shortened TechStack)
              ].map((face, index) => (
                <div
                  key={index}
                  className={`absolute w-20 h-20 border-2 border-red-600 backdrop-blur-sm flex items-center justify-center transition-colors text-center p-0.5
                    ${face.number === 6 ? 'bg-red-900/80' : 'bg-black/95'}
                    hover:bg-red-800/80`}
                  style={{
                    transform: face.transform,
                    boxShadow: '0 0 10px rgba(220, 38, 38, 0.5), inset 0 0 5px rgba(220, 38, 38, 0.2)',
                    backfaceVisibility: 'hidden'
                  }}
                  onClick={(e) => handleFaceClick(face.number, e)}
                >
                  <span className={`font-bold text-white font-mono select-none pointer-events-none ${face.number === 6 ? 'text-[0.5rem] leading-tight text-red-200' : 'text-[0.65rem]'
                    }`}
                  >
                    {face.label}
                  </span>
                </div>
              ))}

              {/* Internal Glow core */}
              <motion.div
                className="absolute inset-0 rounded-full bg-red-600 filter blur-xl opacity-40"
                style={{
                  transform: 'scale(0.6)'
                }}
                animate={{
                  opacity: [0.3, 0.6, 0.3]
                }}
                transition={{
                  duration: 2,
                  repeat: Infinity
                }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Explosion for Face 6 */}
      <AnimatePresence>
        {isExploding && (
          <motion.div
            className="fixed inset-0 z-50 pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div className="absolute inset-0 bg-red-600" initial={{ opacity: 0 }} animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 0.5 }} />
            <motion.div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              {roots.map((root) => (
                <motion.div key={root.id} className="absolute origin-left" style={{ rotate: `${root.angle * (180 / Math.PI)}deg` }}>
                  <motion.div className="absolute h-2 bg-gradient-to-r from-red-900 via-red-700 to-transparent" initial={{ width: 0 }} animate={{ width: '150vw' }} transition={{ duration: 1.5 }} />
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}