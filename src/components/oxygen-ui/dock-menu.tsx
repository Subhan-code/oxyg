import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export interface DockMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface DockMenuProps {
  items: DockMenuItem[];
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function DockMenu({
  items,
  position = 'bottom-center',
  direction = 'horizontal',
  className,
}: DockMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-6 left-6';
      case 'top-center':
        return 'top-6 left-1/2 -translate-x-1/2';
      case 'top-right':
        return 'top-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-center':
        return 'bottom-6 left-1/2 -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-6 right-6';
      default:
        return 'bottom-6 left-1/2 -translate-x-1/2';
    }
  };

  const isVertical = direction === 'vertical';

  return (
    <div
      className={cn(
        'fixed z-50 flex items-center p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl',
        isVertical ? 'flex-col gap-2' : 'flex-row gap-2',
        getPositionClasses(),
        className
      )}
      style={{
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 0;
        
        let size = 48; // default size (w-12 h-12 is 48px)
        if (isHovered) {
          size = 64;
        } else if (distance === 1) {
          size = 56;
        }

        return (
          <motion.div key={item.id} layout className="relative group flex items-center justify-center">
            <motion.button
              type="button"
              layout
              className={cn(
                'relative flex items-center justify-center rounded-xl text-neutral-700 bg-white/60 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-colors duration-200',
                'hover:bg-white/90 hover:text-black hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
                'dark:text-neutral-300 dark:bg-neutral-800/50 dark:hover:bg-neutral-700 dark:hover:text-white',
                'border border-white/40 dark:border-neutral-700'
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={item.onClick}
              initial={{ width: 48, height: 48 }}
              animate={{ 
                width: size,
                height: size,
                y: isHovered && !isVertical ? -4 : 0,
                x: isHovered && isVertical ? (position.includes('left') ? 4 : -4) : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 25,
                mass: 1.5,
              }}
            >
              <motion.span
                layout
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.2 : distance === 1 ? 1.1 : 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
                className="relative z-10 flex items-center justify-center pointer-events-none"
              >
                 {item.icon}
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: isVertical ? 0 : 10, x: isVertical ? (position.includes('left') ? -10 : 10) : 0, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  exit={{ opacity: 0, y: isVertical ? 0 : 5, x: isVertical ? (position.includes('left') ? -5 : 5) : 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'absolute whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-neutral-900 bg-white/90 shadow-xl border border-black/5 backdrop-blur-md pointer-events-none z-50',
                    isVertical
                      ? position.includes('left')
                        ? 'left-full ml-4 top-1/2 -translate-y-1/2'
                        : 'right-full mr-4 top-1/2 -translate-y-1/2'
                      : position.includes('top')
                      ? 'top-full mt-4 left-1/2 -translate-x-1/2'
                      : 'bottom-full mb-4 left-1/2 -translate-x-1/2'
                  )}
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}


