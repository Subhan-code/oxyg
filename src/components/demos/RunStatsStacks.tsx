import { motion } from "framer-motion";
import { useState } from "react";

const runs = [
  {
    distance: 10.29,
    pace: "5:14 /km",
    time: "53m 49s",
  },
  {
    distance: 12.75,
    pace: "5:30 /km",
    time: "01h 10m",
  },
  {
    distance: 8.43,
    pace: "5:00 /km",
    time: "42m 15s",
  },
  {
    distance: 15.62,
    pace: "5:20 /km",
    time: "01h 23m",
  },
];

const label = {
  distance: "Distance",
  pace: "Pace",
  time: "Time",
};

const CARD_HEIGHT = 64;
const GAP = 8;

export default function RunStatsStacks() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="flex h-[350px] w-full flex-col items-center justify-center overflow-hidden font-sans select-none relative bg-neutral-50 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5 rounded-2xl">
      <div
        className="relative flex h-full w-full flex-col items-center justify-center cursor-pointer"
        style={{
          perspective: "1000px",
        }}
        onClick={() => {
          setIsOpen(!isOpen);
        }}
      >
        <span className="absolute top-4 text-[11px] font-mono text-neutral-400 dark:text-neutral-500">
          Click stack to {isOpen ? "COLLAPSE" : "EXPAND"}
        </span>
        
        {runs.map((run, i) => {
          return (
            <motion.div
              className="absolute w-[260px] rounded-[18px] border-t border-white/60 bg-neutral-200/80 px-4 py-3 backdrop-blur-2xl dark:border-white/5 dark:bg-zinc-800 border border-neutral-200/40 dark:border-neutral-700/40 shadow-sm"
              key={i}
              animate={isOpen ? "open" : "closed"}
              style={{
                height: CARD_HEIGHT,
              }}
              variants={{
                open: {
                  y: (i - 1.5) * (CARD_HEIGHT + GAP),
                  z: 0,
                  top: `50%`,
                },
                closed: {
                  y: i * 8 - 16,
                  z: i * 15,
                  top: `50%`,
                },
              }}
              transition={{
                type: "spring",
                stiffness: 220,
                damping: 26,
              }}
            >
              <div className="flex justify-between items-center text-[12px] h-full">
                {Object.keys(label).map((key) => {
                  return (
                    <div
                      className="pointer-events-none flex flex-col justify-center"
                      key={key}
                    >
                      <span className="text-[10px] font-bold text-neutral-900/40 dark:text-white/40 uppercase tracking-tight">
                        {label[key as keyof typeof label]}
                      </span>
                      <span className="text-[13px] font-semibold text-neutral-900 dark:text-white">
                        {run[key as keyof typeof run]}
                      </span>
                    </div>
                  );
                })}
              </div>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
