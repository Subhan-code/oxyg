import React from 'react';
import { motion } from 'motion/react';

const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex py-0 px-3">
      <div className="flex w-[200%] gap-4 overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 14,
            repeat: Infinity
          }}
          className="flex whitespace-nowrap gap-6 text-[10px] uppercase tracking-widest font-extrabold text-[#ffffff] shrink-0"
        >
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
        </motion.div>
        
        {/* Mirror copy to make transition seamless */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 14,
            repeat: Infinity
          }}
          className="flex whitespace-nowrap gap-6 text-[10px] uppercase tracking-widest font-extrabold text-[#ffffff] shrink-0"
        >
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;


