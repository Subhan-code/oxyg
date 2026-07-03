import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollProgress = ({ container }: { container?: React.RefObject<HTMLElement | null> } = {}) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container) {
      setScrollContainer(container.current);
      return;
    }
    // Find the nearest scrollable parent
    let parent = elementRef.current?.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer(parent);
        break;
      }
      parent = parent.parentElement;
    }
  }, [container]);

  const { scrollYProgress } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined
  });
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const percent = useTransform(scaleY, [0, 1], [0, 100]);
  const yOffset = useTransform(scaleY, [0, 1], ["0%", "100%"]);
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    return percent.on("change", (latest) => {
      // Clamp between 0 and 100 to prevent weird spring bounce numbers
      setCurrentPercent(Math.min(100, Math.max(0, Math.round(latest))));
    });
  }, [percent]);

  return (
    <div ref={elementRef} className="fixed left-8 md:left-24 top-1/2 -translate-y-1/2 h-[300px] w-1.5 bg-white/10 z-50 rounded-full">
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-white/5" />
      
      {/* Progress track */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#ff7b00] origin-top rounded-full"
        style={{ scaleY }}
      />
      
      {/* Indicator handle */}
      <motion.div 
        className="absolute left-[-4px] w-3.5 h-[2px] bg-[#ff7b00]"
        style={{ top: yOffset }}
      >
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-start w-8">
          <span className="text-[#ff7b00] text-sm tabular-nums font-mono drop-shadow-md shadow-black">
            {currentPercent}
          </span>
        </div>
      </motion.div>
    </div>
  );
};

export default ScrollProgress;


