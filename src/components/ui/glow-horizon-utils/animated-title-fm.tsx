import { motion } from "motion/react";

interface AnimatedTitleFMProps {
  open?: boolean;
}

export function AnimatedTitleFM({ open = true }: AnimatedTitleFMProps) {
  const words = "BEYOND THE HORIZON".split(" ");

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.2,
      },
    },
  };

  const childVariants = {
    hidden: { 
      opacity: 0, 
      y: 40,
      filter: "blur(8px)"
    },
    visible: { 
      opacity: 1, 
      y: 0,
      filter: "blur(0px)",
      transition: {
        type: "spring" as const,
        stiffness: 100,
        damping: 15
      }
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate={open ? "visible" : "hidden"}
      className="flex flex-col items-center gap-4 text-center select-none"
    >
      <div className="flex gap-x-3 gap-y-1 flex-wrap justify-center">
        {words.map((word, idx) => (
          <div key={idx} className="overflow-hidden py-1">
            <motion.span
              variants={childVariants}
              className="inline-block text-4xl md:text-7xl font-extrabold tracking-[-0.03em] text-white leading-none bg-gradient-to-b from-white via-white to-white/40 bg-clip-text text-transparent"
            >
              {word}
            </motion.span>
          </div>
        ))}
      </div>
      
      <motion.p
        variants={childVariants}
        className="text-xs md:text-sm text-neutral-400 font-bold uppercase tracking-[0.3em] mt-3"
      >
        Oxygen UI Design Engineering
      </motion.p>
    </motion.div>
  );
}
