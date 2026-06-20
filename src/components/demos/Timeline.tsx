import { useState } from 'react';
import { motion } from 'framer-motion';

const years = Array.from({ length: 2024 - 1993 + 1 }, (_, i) => 2024 - i);

export default function Timeline() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<number | null>(null);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const calculateScale = (index: number) => {
    if (hoveredIndex === null) return 0.4;
    const distance = Math.abs(index - hoveredIndex);
    return Math.max(1 - distance * 0.2, 0.4);
  };

  return (
    <div className="flex h-[320px] w-full items-center justify-center font-sans select-none bg-neutral-50 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5 rounded-2xl relative overflow-hidden">
      <span className="absolute top-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
        Hover & Drag Scroll Timeline
      </span>
      <div className="flex flex-col h-[240px] overflow-y-auto no-scrollbar px-12 py-2 mt-4">
        {years.map((year, i) => {
          const isSelected = selected === i;

          return (
            <button
              key={i}
              className="relative inline-flex items-end justify-center py-1.5 focus:outline-none cursor-pointer"
              onMouseEnter={() => handleMouseEnter(i)}
              onMouseLeave={handleMouseLeave}
              onClick={() => setSelected(i)}
              onTouchStart={() => handleMouseEnter(i)}
              onTouchEnd={handleMouseLeave}
            >
              <motion.div
                className={`h-1.5 w-10 rounded-[4px] ${
                  selected === i
                    ? 'bg-yellow-500'
                    : 'bg-neutral-400 dark:bg-zinc-650'
                }`}
                animate={{
                  scale: calculateScale(i),
                }}
                initial={{ scale: 0.4 }}
                transition={{ type: 'spring', stiffness: 300, damping: 20 }}
              />
              {hoveredIndex === i ? (
                <motion.span
                  className={`absolute -top-0.5 left-14 text-[11px] font-bold ${
                    isSelected
                      ? 'text-yellow-500'
                      : 'text-neutral-700 dark:text-neutral-300'
                  }`}
                  initial={{ opacity: 0, filter: `blur(4px)`, scale: 0.4 }}
                  animate={{ opacity: 1, filter: `blur(0px)`, scale: 1 }}
                  transition={{ duration: 0.15, delay: 0.05 }}
                >
                  {year}
                </motion.span>
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
