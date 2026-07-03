import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import NumberFlow from '@number-flow/react';

export const CircularScroll = ({ 
  container,
  showPercent = false
}: { 
  container?: React.RefObject<HTMLElement | null>; 
  showPercent?: boolean;
} = {}) => {
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

  const percentTransform = useTransform(scaleY, [0, 1], [0, 100]);
  const [percent, setPercent] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return percentTransform.on("change", (latest) => {
      setPercent(Math.min(100, Math.max(0, Math.round(latest))));
    });
  }, [percentTransform]);

  // We use fixed wrapper for drag constraints since we want it draggable across the screen
  return (
    <div ref={elementRef} className="fixed inset-0 pointer-events-none z-50">
      <motion.div 
        drag
        dragConstraints={{ top: 10, left: 10, right: typeof window !== 'undefined' ? window.innerWidth - 70 : 1000, bottom: typeof window !== 'undefined' ? window.innerHeight - 70 : 1000 }}
        dragMomentum={false}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="absolute left-1/2 top-10 pointer-events-auto flex items-center justify-center bg-[#111] backdrop-blur-xl border border-white/5 rounded-2xl w-14 h-14 cursor-grab active:cursor-grabbing shadow-2xl"
      >
        <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90 absolute inset-0">
            {/* Background Circle */}
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              className="stroke-white/10"
              strokeWidth="3"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              className="stroke-white"
              strokeWidth="3"
              strokeDasharray="94.2477" 
              style={{ strokeDashoffset: useTransform(scaleY, [0, 1], [94.2477, 0]) }}
              strokeLinecap="round"
            />
          </svg>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: hovered || showPercent ? 1 : 0, scale: hovered || showPercent ? 1 : 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full"
          >
            <span className="text-[10px] font-medium text-white">
              <NumberFlow value={percent} />
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CircularScroll;


