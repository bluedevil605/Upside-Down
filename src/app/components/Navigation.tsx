import { motion } from 'motion/react';

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
}

export function Navigation({ activeSection, onSectionChange }: NavigationProps) {
  const sections = [
    { id: 'home', label: 'Home' },
    { id: 'about', label: 'About' },
    { id: 'projects', label: 'Projects' },
    { id: 'techstack', label: 'Tech Stack' },
    { id: 'contact', label: 'Contact' }
  ];

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 0.2 }}
      className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b-2 border-red-600"
      style={{
        boxShadow: '0 0 20px rgba(220, 38, 38, 0.5)'
      }}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <motion.div 
            className="text-2xl font-bold tracking-wider"
            style={{
              fontFamily: 'Special Elite, cursive',
              textShadow: '0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #dc2626',
              color: '#dc2626'
            }}
            animate={{
              textShadow: [
                '0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #dc2626',
                '0 0 15px #dc2626, 0 0 25px #dc2626, 0 0 40px #dc2626',
                '0 0 10px #dc2626, 0 0 20px #dc2626, 0 0 30px #dc2626'
              ]
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            PORTFOLIO
          </motion.div>

          <div className="flex gap-6">
            {sections.map((section) => (
              <motion.button
                key={section.id}
                onClick={() => onSectionChange(section.id)}
                className={`relative px-4 py-2 text-sm font-medium tracking-wider uppercase transition-colors ${
                  activeSection === section.id
                    ? 'text-red-500'
                    : 'text-gray-400 hover:text-red-400'
                }`}
                style={{
                  fontFamily: 'Special Elite, cursive',
                  textShadow: activeSection === section.id 
                    ? '0 0 10px rgba(220, 38, 38, 0.8)' 
                    : 'none'
                }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                {section.label}
                {activeSection === section.id && (
                  <motion.div
                    layoutId="activeIndicator"
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-red-600"
                    style={{
                      boxShadow: '0 0 10px #dc2626'
                    }}
                  />
                )}
              </motion.button>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
