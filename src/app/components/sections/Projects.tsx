import { motion } from 'motion/react';
import { ExternalLink, Github } from 'lucide-react';

export function Projects() {
  const projects = [
    {
      title: 'CypherGuard',
      category: 'Full Stack App',
      description: 'A real-time web application featuring advanced analyzer to detect weak credentials using complexity rules and real-world breach datasets.',
      tech: ['React', 'Node.js', 'C++'],
      image: 'bg-red-900/20',
      status: 'Live',
      github: 'https://github.com/bluedevil605/password_analyzer',
      demo: 'https://password-analyzer-ten.vercel.app/'
    },
    {
      title: 'Network Intrusion Detection System',
      category: 'Full Stack App',
      description: 'a real-time Network Intrusion Detection System (IDS) in C++ using packet-level traffic analysis to detect port scans and DoS attacks.',
      tech: ['Express', 'Redis', 'PostgreSQL', 'Docker'],
      image: 'bg-indigo-900/20',
      status: 'In Progress',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Hawkins Analytics',
      category: 'Data Visualization',
      description: 'Interactive dashboard providing real-time insights through beautiful, responsive data visualizations.',
      tech: ['D3.js', 'TypeScript', 'GraphQL', 'Next.js'],
      image: 'bg-orange-900/20',
      status: 'In Progress',
      github: 'https://github.com',
      demo: 'https://demo.com'
    },
    {
      title: 'Upside Down Mobile',
      category: 'Cross Platform',
      description: 'Offline-first mobile application designed for seamless synchronization in low-connectivity environments.',
      tech: ['React Native', 'Firebase', 'Redux Toolkit'],
      image: 'bg-purple-900/20',
      status: 'In Progress',
      github: 'https://github.com',
      demo: 'https://demo.com'
    }
  ];

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      className="min-h-screen py-32"
    >
      <div className="max-w-7xl mx-auto px-4">
        <motion.div
          className="text-center mb-20"
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
        >
          <h2 className="text-5xl md:text-6xl font-bold text-red-600 mb-6" style={{ fontFamily: 'Special Elite, cursive' }}>
            SELECTED WORKS
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto text-lg font-light">
            A curation of digital experiences architected with precision and chaos.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ y: 50, opacity: 0 }}
              whileInView={{ y: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group relative"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-red-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-xl" />

              <div className="relative h-full bg-black/40 backdrop-blur-sm border border-white/5 rounded-xl p-8 hover:border-red-500/30 transition-colors duration-300">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-red-500 text-xs font-bold tracking-widest uppercase">{project.category}</span>
                      <span className={`px-2 py-0.5 text-[10px] uppercase tracking-wider rounded-full border ${project.status === 'Live'
                        ? 'bg-green-500/10 text-green-500 border-green-500/20'
                        : 'bg-amber-500/10 text-amber-500 border-amber-500/20'
                        }`}>
                        {project.status}
                      </span>
                    </div>
                    <h3 className="text-3xl font-bold text-white mt-2 group-hover:text-red-400 transition-colors">{project.title}</h3>
                  </div>
                  <div className="flex gap-3">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 hover:text-red-400 group/btn"
                      aria-label="View on GitHub"
                    >
                      <Github className="w-5 h-5 text-gray-400 group-hover/btn:text-white" />
                    </a>
                    <a
                      href={project.demo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 hover:bg-white/10 rounded-full transition-all duration-300 hover:scale-110 hover:text-red-400 group/btn"
                      aria-label="View Live Demo"
                    >
                      <ExternalLink className="w-5 h-5 text-gray-400 group-hover/btn:text-white" />
                    </a>
                  </div>
                </div>

                <p className="text-gray-400 mb-8 leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="px-3 py-1 text-xs text-gray-300 bg-white/5 rounded-full border border-white/5 group-hover:border-red-500/20 transition-colors"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
}
