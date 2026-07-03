import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { cn } from '../../lib/utils';

interface ScrollBarProps {
  activeSection: number;
  showScrollCard: boolean;
  sections: { id: number; title: string; element?: HTMLElement | null }[];
  container?: React.RefObject<HTMLElement | null>;
}

export const ScrollBar = ({ activeSection, showScrollCard, sections, container }: ScrollBarProps) => {
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

  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div ref={elementRef} className="fixed right-[20px] sm:right-[max(20px,calc(50vw-450px))] top-1/2 -translate-y-1/2 h-[50vh] flex items-center z-50">
      
      {/* Scroll Info Card */}
      <motion.div
        initial={false}
        animate={{
          opacity: showScrollCard || dragging || hovered ? 1 : 0,
          x: showScrollCard || dragging || hovered ? 0 : 20,
          filter: showScrollCard || dragging || hovered ? "blur(0px)" : "blur(4px)"
        }}
        className="absolute right-10 mr-4 pointer-events-none"
      >
        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl flex flex-col min-w-[120px]">
          <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider mb-1">// Section</span>
          <span className="text-sm font-medium text-white shadow-sm overflow-hidden whitespace-nowrap">
             {sections[activeSection]?.title || "Content"}
          </span>
        </div>
      </motion.div>

      {/* Track */}
      <motion.div 
        className="relative w-1.5 h-full rounded-full bg-white/10 overflow-hidden cursor-pointer pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 w-full bg-sky-500 rounded-full origin-top"
          style={{ scaleY }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollBar;


