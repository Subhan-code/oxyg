import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CardItem {
  id: string | number;
  src: string;
  alt?: string;
}

export interface AuraCardStackProps {
  cards?: CardItem[];
  className?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", alt: "Sunset beach" },
  { id: 2, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80", alt: "Foggy mountains" },
  { id: 3, src: "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80", alt: "Green valleys" },
  { id: 4, src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80", alt: "Forest trails" },
  { id: 5, src: "https://images.unsplash.com/photo-1472214222541-d510753a4707?auto=format&fit=crop&w=600&q=80", alt: "Scenic fields" },
];

export function AuraCardStack({
  cards = DEFAULT_CARDS,
  className,
}: AuraCardStackProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | number | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  // Dynamic fanned transforms based on standard index mapping
  const getCardTransforms = (index: number, total: number) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;
    
    // Default translations in normal stack state
    const defaultX = offset * 18;
    const defaultY = Math.abs(offset) * 3;
    const defaultRotate = offset * 5;

    // Translation values in expanded hover state
    const hoverX = offset * 110;
    const hoverY = Math.abs(offset) * 5;
    const hoverRotate = offset * 10;

    return {
      default: `translate(-50%, -50%) translate3d(${defaultX}px, ${defaultY}px, 0) rotate(${defaultRotate}deg)`,
      hover: `translate(-50%, -50%) translate3d(${hoverX}px, ${hoverY}px, 0) rotate(${hoverRotate}deg)`,
    };
  };

  const activeCard = cards.find(c => c.id === activeCardId);

  return (
    <div className={cn("relative w-full flex flex-col items-center select-none py-10", className)}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[160px] w-[260px] sm:h-[180px] sm:w-[380px] cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredCardId(null);
        }}
      >
        {cards.map((card, index) => {
          const transforms = getCardTransforms(index, cards.length);
          const isSingleHovered = hoveredCardId === card.id;

          return (
            <button 
              key={card.id}
              type="button" 
              className="absolute left-1/2 top-1/2 inline-flex cursor-zoom-in items-center justify-center focus-visible:outline-none transition-transform active:scale-[0.98]"
              aria-label={`Open card ${card.id}`}
              onClick={() => setActiveCardId(card.id)}
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              style={{
                zIndex: isSingleHovered ? 50 : (isHovered ? index + 10 : index + 1),
                transform: `${isHovered ? transforms.hover : transforms.default} ${isSingleHovered ? `scale(1.15) rotate(${index % 2 === 0 ? '4deg' : '-4deg'})` : 'scale(1)'}`,
                transition: 'transform 380ms cubic-bezier(0.32,0.72,0,1), z-index 0ms, box-shadow 380ms ease',
                boxShadow: isSingleHovered ? '0 20px 40px rgba(0,0,0,0.25)' : 'none',
                willChange: 'transform'
              }}
            >
              <img 
                alt={card.alt || `Card ${card.id}`} 
                className="h-[110px] w-auto object-cover sm:h-[130px] aspect-[4/3] rounded-xl border-[5px] border-zinc-950 dark:border-zinc-900 shadow-[0_4px_16px_rgba(0,0,0,0.3)] bg-zinc-900" 
                src={card.src} 
              />
            </button>
          );
        })}
      </motion.div>

      {/* Lightbox / Zoom Dialog Modal */}
      <AnimatePresence>
        {activeCardId !== null && activeCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setActiveCardId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-3xl max-h-full flex flex-col items-center" 
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="absolute -top-14 right-0 text-white/70 hover:text-white transition-colors focus:outline-none p-2.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md cursor-pointer shadow-lg"
                onClick={() => setActiveCardId(null)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <img 
                src={activeCard.src} 
                alt={activeCard.alt || `Zoom card ${activeCardId}`} 
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border-[8px] border-zinc-950 dark:border-zinc-900 shadow-2xl bg-zinc-950"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


