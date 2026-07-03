import { motion } from "framer-motion";
import { useState } from "react";

const transition = {
  type: "spring",
  stiffness: 260,
  damping: 28,
} as const;

const ITEMS = ["Dean", "Lil B", "Lazer", "Simz", "Bladee"];

export default function LabelIndicatorCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="relative flex h-[280px] w-full flex-col items-center justify-center overflow-hidden font-sans select-none">
      <div className="absolute top-10 flex flex-col items-center justify-center">
        <motion.div
          initial={false}
          className="flex justify-start space-x-4"
          animate={{ x: -currentIndex * (200 + 16) + 72 }}
          transition={transition}
        >
          {ITEMS.map((_, index) => {
            return (
              <motion.div
                key={index}
                initial={false}
                className="h-[140px] w-[200px] rounded-[16px] bg-stone-200/60 dark:bg-stone-800 transition-all duration-150 flex items-center justify-center"
                style={{
                  y: currentIndex === index ? 0 : -16,
                  opacity: currentIndex === index ? 1 : 0.4,
                }}
                transition={transition}
              >
                <span className="text-[12px] font-mono text-stone-400 dark:text-stone-600">Card {index + 1}</span>
              </motion.div>
            );
          })}
        </motion.div>
        <div className="mt-6 flex h-8 items-center justify-center space-x-2">
          {ITEMS.map((item, index) => (
            <div key={index} onClick={() => setCurrentIndex(index)}>
              <motion.button
                initial={false}
                className="flex cursor-pointer select-none items-center justify-center overflow-hidden rounded-full bg-stone-200 text-sm text-stone-500 dark:bg-stone-850 dark:text-stone-450"
                animate={{
                  width: currentIndex === index ? 68 : 12,
                  height: currentIndex === index ? 26 : 12,
                }}
                transition={transition}
              >
                <motion.span
                  initial={false}
                  className="block whitespace-nowrap px-3 py-1 text-xs font-semibold"
                  animate={{
                    opacity: currentIndex === index ? 1 : 0,
                    scale: currentIndex === index ? 1 : 0,
                    filter: currentIndex === index ? "blur(0)" : "blur(4px)",
                    transformOrigin: "center",
                  }}
                  transition={transition}
                >
                  {item}
                </motion.span>
              </motion.button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
