import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

export interface CollectionItem {
  name: string;
  images: string[];
}

const DEFAULT_COLLECTIONS: CollectionItem[] = [
  {
    name: "Arch & Geometry",
    images: [
      "https://images.unsplash.com/photo-1773117950168-a7a56f4f8d94?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1675897974745-1e78e8690755?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600669091588-8aaac09509ba?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583100913639-b8a172d90b77?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583100913828-aeff24cc04ae?w=500&auto=format&fit=crop"
    ]
  },
  {
    name: "Abstract Forms",
    images: [
      "https://images.unsplash.com/photo-1674210803712-b75d73df67d1?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1674207073169-8676749637d3?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631125915510-8ffed5a0d054?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631125916283-34e834c822cc?w=500&auto=format&fit=crop"
    ]
  },
  {
    name: "Minimalist Spaces",
    images: [
      "https://images.unsplash.com/photo-1761560573772-2ea08a5065e3?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760294098215-ce23555ad262?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760293639661-60f435dff4cf?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760293286834-49b098366d8d?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1772090049995-6116febe0d60?w=500&auto=format&fit=crop"
    ]
  },
  {
    name: "Moody Textures",
    images: [
      "https://images.unsplash.com/photo-1682687980115-a37b56ea7271?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1676780207860-7ab32f87da74?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584715787854-9922db91c681?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1641141264446-9f3e94b15f2c?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626105962913-5a53411593e4?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631551976150-097899638e74?w=500&auto=format&fit=crop"
    ]
  }
];

const layoutTransition = { type: "spring", stiffness: 400, damping: 35, mass: 0.8 } as const;

function StackItem({ 
  collection, 
  idx, 
  onClick 
}: { 
  collection: CollectionItem; 
  idx: number; 
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <button
      className="album-stack-item group"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="album-images">
        {collection.images.slice(0, 4).map((img: string, imgIdx: number) => {
          let baseRotate = 5;
          if ((imgIdx + 1) % 3 === 0) baseRotate = 10;
          else if ((imgIdx + 1) % 2 === 0) baseRotate = -5;

          const factor = (imgIdx - (collection.images.slice(0, 4).length / 2)) * 0.15;
          const dynamicX = useTransform(mouseX, val => val * factor);
          const dynamicY = useTransform(mouseY, val => val * factor);
          const dynamicRotate = useTransform(mouseX, val => baseRotate + val * factor * 0.1);

          return (
            <motion.div
              layoutId={`album-img-${idx}-${imgIdx}`}
              key={imgIdx}
              className="album-stack-item-image"
              style={{ 
                zIndex: imgIdx + 5,
                x: dynamicX,
                y: dynamicY,
                rotate: dynamicRotate
              }}
              transition={layoutTransition}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          );
        })}
        {/* Shimmer Effect overlay */}
        <div className="album-shimmer absolute inset-0 z-50 pointer-events-none" />
      </div>
      <span className="badge mt-4 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-350 px-3.5 py-1.5 bg-card shadow-sm">
        {collection.name}
      </span>
    </button>
  );
}

export function AlbumStackGrid({ 
  collections = DEFAULT_COLLECTIONS,
  className = "" 
}: { 
  collections?: CollectionItem[];
  className?: string;
}) {
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);

  return (
    <div className={`album-gallery w-full ${className}`}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gridTemplateAreas: '"main"', alignItems: 'start' }}>
        <AnimatePresence mode="popLayout">
          {selectedCollection === null ? (
            <motion.div 
              key="stacks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, pointerEvents: 'none' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="album-stacks"
              style={{ gridArea: 'main' }}
            >
              {collections.map((collection, idx) => (
                <StackItem 
                  key={idx} 
                  collection={collection} 
                  idx={idx} 
                  onClick={() => setSelectedCollection(idx)} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, pointerEvents: 'none' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="album-grid-view"
              style={{ gridArea: 'main' }}
            >
              <div className="album-grid-header mb-6">
                <button 
                  onClick={() => setSelectedCollection(null)}
                  className="back-button border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full px-5 py-2 text-sm text-zinc-700 dark:text-zinc-350 transition-colors shadow-sm bg-card"
                >
                  &larr; Back to Collections
                </button>
                <span className="badge border border-zinc-200 dark:border-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-350 px-3.5 py-1.5 bg-card shadow-sm font-semibold">
                  {collections[selectedCollection].name}
                </span>
              </div>
              
              <div className="album-image-grid">
                {collections[selectedCollection].images.map((img, imgIdx) => (
                  <motion.div
                    layoutId={`album-img-${selectedCollection}-${imgIdx}`}
                    key={imgIdx}
                    className="album-grid-item-image"
                    style={{ zIndex: 10 }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 0 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={layoutTransition}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AlbumStackGrid;


