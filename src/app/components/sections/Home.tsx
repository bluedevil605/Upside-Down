import { motion } from 'motion/react';

interface HomeProps {
  onExplore?: () => void;
}

export function Home({ onExplore }: HomeProps) {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      className="min-h-screen flex flex-col items-center justify-center text-center"
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          perspective: '1000px',
          transformStyle: 'preserve-3d'
        }}
      >
        <motion.div
          className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-red-600 overflow-hidden mb-8 mx-auto shadow-[0_0_20px_rgba(220,38,38,0.5)]"
          style={{
            transform: 'translateZ(60px)'
          }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: 1,
            scale: 1,
            boxShadow: [
              '0 0 20px rgba(220, 38, 38, 0.5)',
              '0 0 40px rgba(220, 38, 38, 0.8)',
              '0 0 20px rgba(220, 38, 38, 0.5)'
            ]
          }}
          transition={{
            duration: 0.8,
            delay: 0.5,
            boxShadow: {
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
        >
          <img
            src="/images/image.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
          />
        </motion.div>
        <motion.h1
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 px-4"
          style={{
            fontFamily: 'Special Elite, cursive',
            color: '#dc2626',
            textShadow: '0 0 20px #dc2626, 0 0 40px #dc2626, 0 0 60px #dc2626',
            transform: 'translateZ(50px)'
          }}
          animate={{
            textShadow: [
              '0 0 20px #dc2626, 0 0 40px #dc2626, 0 0 60px #dc2626',
              '0 0 30px #dc2626, 0 0 50px #dc2626, 0 0 80px #dc2626',
              '0 0 20px #dc2626, 0 0 40px #dc2626, 0 0 60px #dc2626'
            ]
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          WELCOME
        </motion.h1>

        <motion.div
          className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 px-4"
          style={{
            fontFamily: 'Special Elite, cursive',
            color: '#fff',
            textShadow: '0 0 10px rgba(255, 255, 255, 0.5)',
            transform: 'translateZ(30px)'
          }}
          animate={{
            y: [0, -10, 0]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
        >
          TO THE UPSIDE DOWN
        </motion.div>

        <motion.p
          className="text-base sm:text-lg md:text-xl text-gray-400 mb-8 max-w-2xl px-4"
          style={{
            transform: 'translateZ(20px)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
        >
          CyberSecurity Enthusiast | Creative Technologist | Problem Solver
        </motion.p>

        <motion.div
          className="flex gap-4 justify-center"
          style={{
            transform: 'translateZ(40px)'
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
        >
          <motion.button
            onClick={() => onExplore && onExplore()}
            className="px-6 sm:px-8 py-2 sm:py-3 bg-red-600 text-white text-sm sm:text-base font-semibold rounded border-2 border-red-600"
            style={{
              fontFamily: 'Special Elite, cursive',
              boxShadow: '0 0 20px rgba(220, 38, 38, 0.6)'
            }}
            whileHover={{
              scale: 1.05,
              boxShadow: '0 0 30px rgba(220, 38, 38, 0.8)'
            }}
            whileTap={{ scale: 0.95 }}
          >
            EXPLORE
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Floating elements */}
      {[...Array(5)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 bg-red-500 rounded-full"
          style={{
            left: `${20 + i * 15}%`,
            top: `${30 + i * 10}%`,
            boxShadow: '0 0 10px #dc2626'
          }}
          animate={{
            y: [0, -20, 0],
            opacity: [0.3, 1, 0.3]
          }}
          transition={{
            duration: 3 + i,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.2
          }}
        />
      ))}
    </motion.section>
  );
}