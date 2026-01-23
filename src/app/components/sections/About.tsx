import { motion } from 'motion/react';
import { ImageWithFallback } from '../figma/ImageWithFallback';

export function About() {
  const stats = [
    { label: 'Years Experience', value: '5+' },
    { label: 'Projects Completed', value: '50+' },
    { label: 'Lines of Code', value: '1M+' },
    { label: 'Coffee Consumed', value: '∞' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="min-h-screen py-32 flex items-center justify-center"
    >
      <div className="max-w-6xl mx-auto px-4 w-full">
        <motion.div
          className="grid lg:grid-cols-2 gap-16 items-center"
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Text Content */}
          <div className="space-y-8">
            <motion.h2
              className="text-5xl md:text-7xl font-bold text-red-600 mb-8"
              style={{ fontFamily: 'Special Elite, cursive', textShadow: '0 0 20px rgba(220, 38, 38, 0.4)' }}
            >
              ABOUT ME
            </motion.h2>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed font-light tracking-wide">
              <p>
                <span className="text-red-500 font-semibold text-xl">I am a creative technologist</span> obsessed with the space where design meets logic.
                Like navigating the Upside Down, I dive deep into complex problems to uncover elegant solutions.
              </p>
              <p>
                My journey started with a simple "Hello World" and evolved into architecting scalable,
                high-performance applications. I believe code is more than just instructions—it's a medium for storytelling.
              </p>
              <p>
                When I'm not crafting digital experiences, you can find me exploring the latest in AI,
                contributing to open-source software, or dissecting classic sci-fi narratives.
              </p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                  className="text-center"
                >
                  <div className="text-3xl font-bold text-white mb-1" style={{ fontFamily: 'Special Elite, cursive' }}>{stat.value}</div>
                  <div className="text-xs text-red-400 tracking-widest uppercase">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Visual Element */}
          <motion.div
            className="relative hidden lg:block"
            initial={{ scale: 0.8, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="absolute inset-0 bg-gradient-to-tr from-red-900/20 to-transparent rounded-full filter blur-3xl animate-pulse" />
            <div className="relative z-10 p-1 bg-gradient-to-br from-red-900/50 to-transparent rounded-full backdrop-blur-sm border border-red-900/30">
              <div className="aspect-square rounded-full bg-black/40 overflow-hidden flex items-center justify-center border border-red-900/20">
                <ImageWithFallback
                  src="src/app/components/figma/image2.png"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
}
