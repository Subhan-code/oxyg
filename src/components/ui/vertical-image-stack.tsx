"use client";

import { motion } from "motion/react";
import { useState } from "react";

const IMAGES = [
  "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?w=800&auto=format&fit=crop&q=80",
  "https://images.unsplash.com/photo-1472214222541-d510753a4907?w=800&auto=format&fit=crop&q=80",
];

export function VerticalImageStack() {
  const [cards, setCards] = useState(IMAGES);

  const handleDragEnd = (card: string) => {
    // Cycle the dragged card to the bottom of the stack
    setCards((prev) => [card, ...prev.filter((c) => c !== card)]);
  };

  return (
    <div className="relative w-full h-[500px] flex items-center justify-center bg-[#fafafa] overflow-hidden py-12 rounded-2xl border border-neutral-100">
      <div className="absolute inset-0 pointer-events-none opacity-40 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]" />
      
      <div className="relative w-[280px] h-[360px] flex items-center justify-center">
        {cards.map((image, index) => {
          const isTop = index === cards.length - 1;
          
          return (
            <motion.div
              key={image}
              className="absolute w-full h-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white cursor-grab active:cursor-grabbing bg-neutral-100"
              style={{
                zIndex: index,
              }}
              animate={{
                scale: 1 + index * 0.02,
                y: -index * 12,
                rotate: (index - cards.length / 2) * 2,
              }}
              drag={isTop ? "y" : false}
              dragConstraints={{ top: 0, bottom: 0 }}
              dragElastic={0.7}
              onDragEnd={(_, info) => {
                if (isTop && Math.abs(info.offset.y) > 120) {
                  handleDragEnd(image);
                }
              }}
              whileHover={isTop ? { scale: 1.05, y: -24, rotate: 0 } : {}}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 20,
              }}
            >
              <img
                src={image}
                alt="Stacked gallery card"
                className="w-full h-full object-cover select-none pointer-events-none"
              />
              {isTop && (
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 backdrop-blur-md text-white text-[10px] font-bold tracking-wider uppercase px-4 py-2 rounded-full pointer-events-none whitespace-nowrap">
                  Drag vertically to cycle
                </div>
              )}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

export default VerticalImageStack;
