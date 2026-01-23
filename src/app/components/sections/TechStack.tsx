import { motion } from 'motion/react';
import { Code2, Database, Globe, Layers, Zap, Terminal, Cpu, Cloud } from 'lucide-react';

export function TechStack() {
  const technologies = [
    { name: 'React', icon: Globe, category: 'Frontend' },
    { name: 'TypeScript', icon: Code2, category: 'Language' },
    { name: 'Node.js', icon: Terminal, category: 'Backend' },
    { name: 'PostgreSQL', icon: Database, category: 'Database' },
    { name: 'AWS', icon: Cloud, category: 'Cloud' },
    { name: 'Next.js', icon: Zap, category: 'Framework' },
    { name: 'Docker', icon: Layers, category: 'DevOps' },
    { name: 'Redis', icon: Cpu, category: 'Cache' }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="min-h-screen py-32 bg-gradient-to-b from-black to-red-950/20"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-red-600 mb-6" style={{ fontFamily: 'Special Elite, cursive' }}>
            TECHNOLOGIES
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            My arsenal of tools for building the extraordinary.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {technologies.map((tech, index) => {
            const Icon = tech.icon;
            return (
              <motion.div
                key={index}
                initial={{ scale: 0.9, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -5, borderColor: 'rgba(220, 38, 38, 0.4)' }}
                className="group p-8 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/5 transition-all duration-300 flex flex-col items-center justify-center gap-4 hover:shadow-[0_0_30px_rgba(220,38,38,0.2)]"
              >
                <div className="p-4 rounded-xl bg-black/40 group-hover:bg-red-900/20 transition-colors duration-300">
                  <Icon className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors duration-300" />
                </div>
                <div className="text-center">
                  <h3 className="text-lg font-bold text-gray-200 group-hover:text-white transition-colors">{tech.name}</h3>
                  <span className="text-xs text-gray-500 font-medium tracking-wider uppercase">{tech.category}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </motion.section>
  );
}
