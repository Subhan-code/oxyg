import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { ArrowUp, ArrowDown, Settings, Info, ChevronLeft } from 'lucide-react';

const movies = [
  { id: 10, title: "Moonlight", image: "https://picsum.photos/seed/moonlight/1280/800" },
  { id: 9, title: "Oldboy", image: "https://picsum.photos/seed/oldboy/1280/800" },
  { id: 8, title: "Weapons", image: "https://picsum.photos/seed/weapons/1280/800" },
  { id: 7, title: "Fight Club", image: "https://picsum.photos/seed/fightclub/1280/800" },
  { id: 6, title: "Sinners", image: "https://picsum.photos/seed/sinners/1280/800" },
  { id: 5, title: "Prisoners", image: "https://picsum.photos/seed/prisoners/1280/800" },
  { id: 4, title: "Memories of Murder", image: "https://picsum.photos/seed/memories/1280/800" },
  { id: 3, title: "Cure", image: "https://picsum.photos/seed/cure/1280/800" },
  { id: 2, title: "Minari", image: "https://picsum.photos/seed/minari/1280/800" },
  { id: 1, title: "The Killing of a Sacred Deer", image: "https://picsum.photos/seed/killing/1280/800" },
];

export default function AppleTimeline() {
  const [activeIndex, setActiveIndex] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleNext = () => {
    setActiveIndex((prev) => Math.min(prev + 1, movies.length - 1));
  };

  const handlePrev = () => {
    setActiveIndex((prev) => Math.max(prev - 1, 0));
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      if (e.deltaY > 0) {
        handleNext();
      } else if (e.deltaY < 0) {
        handlePrev();
      }
    };

    const container = containerRef.current;
    if (container) {
      container.addEventListener('wheel', handleWheel, { passive: false });
    }
    return () => {
      if (container) {
        container.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="w-full h-full min-h-[600px] bg-white text-neutral-900 overflow-hidden font-sans selection:bg-neutral-200 rounded-2xl relative">
      {/* Top Left Back Button */}
      <div className="absolute top-3 left-3 z-50">
        <button className="group flex items-center gap-0.5 text-sm h-8 px-2 rounded-full border border-neutral-200 bg-white/80 backdrop-blur-sm hover:bg-neutral-100 transition-colors text-neutral-600 hover:text-neutral-900">
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform duration-500 ease-out" />
          Back
        </button>
      </div>

      {/* Main Content */}
      <div 
        ref={containerRef}
        className="h-[600px] flex flex-col items-center justify-center touch-none cursor-grab active:cursor-grabbing"
        onPointerDown={(e) => {
          const startY = e.clientY;
          const handlePointerMove = (moveEvent: PointerEvent) => {
            const deltaY = moveEvent.clientY - startY;
            if (deltaY > 50) {
              handlePrev();
              document.removeEventListener('pointermove', handlePointerMove);
            } else if (deltaY < -50) {
              handleNext();
              document.removeEventListener('pointermove', handlePointerMove);
            }
          };
          const handlePointerUp = () => {
            document.removeEventListener('pointermove', handlePointerMove);
            document.removeEventListener('pointerup', handlePointerUp);
          };
          document.addEventListener('pointermove', handlePointerMove);
          document.addEventListener('pointerup', handlePointerUp);
        }}
      >
        
        {/* Card Stack Container */}
        <div className="relative w-full max-w-3xl aspect-[16/10] perspective-[1000px] flex items-center justify-center mt-[-5vh]">
          {movies.map((movie, index) => {
            const offset = index - activeIndex;
            const isPast = offset < 0;
            const isActive = offset === 0;
            const isFuture = offset > 0;

            let y = 0;
            let scale = 1;
            let opacity = 1;
            let zIndex = 10;

            if (isPast) {
              y = Math.min(-offset * 16, 100);
              scale = 1.05;
              opacity = 0;
              zIndex = 12; // Animate over the active card
            } else if (isActive) {
              y = 0;
              scale = 1;
              opacity = 1;
              zIndex = 11;
            } else if (isFuture) {
              y = -offset * 16;
              scale = 1 - (offset * 0.05);
              opacity = 1; // Keep them visible, just scaled and translated
              zIndex = 10 - offset;
            }

            return (
              <motion.div
                key={movie.id}
                className="absolute w-[calc(100vw-4rem)] sm:w-[560px] md:w-[640px] lg:w-[720px] aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden border border-neutral-200/50 bg-neutral-900 shadow-2xl"
                initial={false}
                animate={{
                  y,
                  scale,
                  opacity,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                  mass: 1,
                }}
                style={{
                  zIndex,
                  transformStyle: "preserve-3d",
                }}
              >
                <img
                  src={movie.image}
                  alt={movie.title}
                  className="w-full h-full object-cover pointer-events-none"
                />
                
                {/* Glare overlay */}
                <motion.div 
                  className="pointer-events-none absolute inset-0 rounded-3xl z-10 [background:radial-gradient(120%_80%_at_50%_30%,rgba(255,255,255,0.65),rgba(255,255,255,0.25)_55%,rgba(255,255,255,0)_80%)]"
                  animate={{
                    opacity: isFuture ? 0.3 : 0
                  }}
                />
                
                {/* Darken overlay for future cards */}
                <motion.div 
                  className="absolute inset-0 bg-black pointer-events-none"
                  animate={{
                    opacity: isFuture ? offset * 0.1 : 0
                  }}
                />
              </motion.div>
            );
          })}
        </div>

        {/* Title Scroller */}
        <div className="mt-12 h-12 overflow-hidden text-center text-xl sm:text-3xl font-medium relative w-full max-w-md"
             style={{ maskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)', WebkitMaskImage: 'linear-gradient(to bottom, transparent, black 20%, black 80%, transparent)' }}>
          <motion.div
            className="flex flex-col items-center"
            animate={{
              y: `-${activeIndex * 3}rem` // 3rem is h-12
            }}
            transition={{
              type: "spring",
              stiffness: 300,
              damping: 30,
            }}
          >
            {movies.map((movie, index) => (
              <div 
                key={movie.id} 
                className={`h-12 flex items-center justify-center transition-colors duration-300 ${index === activeIndex ? 'text-neutral-900' : 'text-neutral-400'}`}
              >
                {movie.title}
              </div>
            ))}
          </motion.div>
        </div>

      </div>

      {/* Bottom Controls */}
      <div className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 z-50 flex flex-col gap-2">
        <button 
          onClick={handlePrev}
          disabled={activeIndex === 0}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ArrowUp className="w-5 h-5" />
        </button>
        <button 
          onClick={handleNext}
          disabled={activeIndex === movies.length - 1}
          className="w-11 h-11 flex items-center justify-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-sm"
        >
          <ArrowDown className="w-5 h-5" />
        </button>
      </div>

      {/* Bottom Center Controls */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 sm:bottom-4 z-50 flex gap-2">
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all shadow-sm">
          <Settings className="w-4 h-4" />
        </button>
        <button className="w-10 h-10 flex items-center justify-center rounded-full border border-neutral-200 bg-white/80 backdrop-blur-md text-neutral-600 hover:text-neutral-900 hover:bg-neutral-100 transition-all shadow-sm">
          <Info className="w-4 h-4" />
        </button>
      </div>

      {/* Bottom Left Icon */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-50 text-neutral-700">
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" className="w-6 h-6 sm:w-8 sm:h-8">
          <path d="M20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z" stroke="currentColor" strokeOpacity="0.25" strokeWidth="4.5"></path>
          <path d="M20.5 12C20.5 16.6944 16.6944 20.5 12 20.5C7.30558 20.5 3.5 16.6944 3.5 12C3.5 7.30558 7.30558 3.5 12 3.5C16.6944 3.5 20.5 7.30558 20.5 12Z" strokeWidth="3" strokeLinecap="round" stroke="currentColor" strokeDasharray="1 1"></path>
          <circle cx="12" cy="12" r="9" fill="currentColor"></circle>
        </svg>
      </div>
    </div>
  );
}
