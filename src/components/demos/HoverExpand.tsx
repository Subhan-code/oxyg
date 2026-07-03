import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const CARDS = [
  { id: 1, title: "Design", color: "from-blue-500 to-indigo-500", icon: "✨" },
  { id: 2, title: "Development", color: "from-emerald-400 to-cyan-400", icon: "💻" },
  { id: 3, title: "Marketing", color: "from-orange-400 to-rose-400", icon: "📈" },
];

export default function HoverExpand() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <div className="w-full h-full flex items-center justify-center p-8">
      <div className="flex gap-4 w-full max-w-4xl h-[400px]">
        {CARDS.map((card, i) => {
          const isHovered = hoveredIndex === i;
          const isSomeHovered = hoveredIndex !== null;
          
          return (
            <motion.div
              key={card.id}
              onMouseEnter={() => setHoveredIndex(i)}
              onMouseLeave={() => setHoveredIndex(null)}
              initial={false}
              animate={{
                width: isHovered ? "60%" : isSomeHovered ? "20%" : "33.333%",
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 30
              }}
              className={`relative overflow-hidden rounded-3xl cursor-pointer bg-gradient-to-br ${card.color}`}
            >
              <div className="absolute inset-0 p-6 flex flex-col justify-end">
                <motion.div
                  initial={false}
                  animate={{
                    opacity: isHovered ? 1 : 0.7,
                    y: isHovered ? 0 : 20,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  <span className="text-4xl mb-4 block">{card.icon}</span>
                  <motion.h2 
                    layout="position"
                    className="text-2xl font-bold text-white mb-2 whitespace-nowrap"
                  >
                    {card.title}
                  </motion.h2>
                  
                  <AnimatePresence>
                    {isHovered && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.2 }}
                        className="text-white/80 line-clamp-2"
                      >
                        Explore the endless possibilities of {card.title.toLowerCase()} with our advanced toolkit and intuitive interface.
                      </motion.p>
                    )}
                  </AnimatePresence>
                </motion.div>
              </div>
              
              {/* Overlay for non-hovered cards */}
              <motion.div
                initial={false}
                animate={{
                  opacity: isSomeHovered && !isHovered ? 0.3 : 0
                }}
                className="absolute inset-0 bg-black pointer-events-none"
              />
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
