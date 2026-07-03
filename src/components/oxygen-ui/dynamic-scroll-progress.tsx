import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ScrollSection {
  id: string;
  title: string;
}

export interface DynamicScrollProgressProps {
  sections: ScrollSection[];
  containerRef?: React.RefObject<any>;
  className?: string;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export function DynamicScrollProgress({
  sections,
  containerRef,
  className,
  position = 'bottom-left',
}: DynamicScrollProgressProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Bind scroll hook to custom container if provided
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : {}
  );
  
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.round(latest * 100));
  });

  const line1Progress = useTransform(scrollYProgress, [0, 0.333], ['0%', '100%']);
  const line2Progress = useTransform(scrollYProgress, [0.333, 0.666], ['0%', '100%']);
  const line3Progress = useTransform(scrollYProgress, [0.666, 1], ['0%', '100%']);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-[10vh] left-10 md:translate-x-0';
      case 'bottom-center':
        return 'bottom-[10vh] left-1/2 -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-[10vh] right-10 md:translate-x-0';
      default:
        return 'bottom-[10vh] left-10 md:translate-x-0';
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? 260 : 200,
        height: isOpen ? 320 : 44,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'fixed z-[60] flex cursor-pointer flex-col justify-end gap-3 overflow-hidden bg-black/90 dark:bg-zinc-950/95 py-2 rounded-[24px] border border-white/10 dark:border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl',
        getPositionClasses(),
        className
      )}
      style={{ maxWidth: 'calc(-32px + 100vw)' }}
      onClick={() => {
        if (!isOpen) setIsOpen(true);
      }}
    >
      <div className="flex-1 overflow-y-auto px-4 flex flex-col justify-end no-scrollbar">
        {/* Expanded Section List */}
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4 py-4"
          style={{ display: isOpen ? 'flex' : 'none' }}
        >
          {sections.map((sec, i) => (
            <button
              key={sec.id}
              onClick={(e) => {
                e.stopPropagation();
                const element = document.getElementById(sec.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else if (containerRef?.current) {
                  // Fallback for custom scrolling containers
                  const targetElement = containerRef.current.querySelector(`#${sec.id}`);
                  targetElement?.scrollIntoView({ behavior: 'smooth' });
                }
                setIsOpen(false);
              }}
              className="text-left text-xs font-semibold text-neutral-400 hover:text-white dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider truncate"
            >
              {sec.title}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Control Bar (always visible) */}
      <div
        className="flex w-full items-center justify-between px-4 shrink-0 h-8"
        onClick={(e) => {
          if (isOpen) {
            e.stopPropagation();
            setIsOpen(false);
          }
        }}
      >
        <div className="flex items-center gap-3 text-white">
          <div className="flex flex-col gap-[3.5px] pt-1">
            <div className="relative h-[1.5px] w-7 overflow-hidden bg-neutral-800 dark:bg-zinc-800">
              <motion.div className="absolute top-0 left-0 h-full bg-white dark:bg-white" style={{ width: line1Progress }} />
            </div>
            <div className="relative h-[1.5px] w-10 overflow-hidden bg-neutral-800 dark:bg-zinc-800">
              <motion.div className="absolute top-0 left-0 h-full bg-white dark:bg-white" style={{ width: line2Progress }} />
            </div>
            <div className="relative h-[1.5px] w-5 overflow-hidden bg-neutral-800 dark:bg-zinc-800">
              <motion.div className="absolute top-0 left-0 h-full bg-white dark:bg-white" style={{ width: line3Progress }} />
            </div>
          </div>
          <div className="flex items-center gap-1 select-none">
            <span className="text-xs font-bold tracking-widest uppercase">Index</span>
            <ChevronUp
              size={14}
              className={cn(
                'text-neutral-400 transition-transform duration-300',
                isOpen ? 'rotate-180' : ''
              )}
            />
          </div>
        </div>
        <div className="flex h-5 items-center justify-center rounded-full bg-white/10 px-2.5 text-[10px] font-bold text-white tabular-nums tracking-wider">
          {progress}%
        </div>
      </div>
    </motion.div>
  );
}


