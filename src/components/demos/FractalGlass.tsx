import React, { useState } from "react";
import { motion } from "framer-motion";

export const FractalGlass = () => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null);

  return (
    <>
      <div className="relative h-[300px] w-full overflow-hidden select-none bg-neutral-100 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5 rounded-2xl flex items-center justify-center p-4">
        <span className="absolute top-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500 z-20">
          Drag shapes behind fractal glass panels
        </span>

        {/* Drag bounds area */}
        <div className="relative w-full h-[220px] mt-6 overflow-hidden">
          <motion.div
            drag
            dragConstraints={{ top: 0, left: 0, right: 180, bottom: 60 }}
            style={{
              zIndex: draggedItem === 1 ? 2 : 1,
              width: "80px",
              height: "80px",
              rotate: "30deg",
              background: `linear-gradient(190deg, #0090FF 10%, #0D74CE 90%)`,
              position: "absolute",
            }}
            initial={{ x: 20, y: 110 }}
            onDragStart={() => setDraggedItem(1)}
            className="cursor-grab active:cursor-grabbing rounded-lg shadow-md"
          />
          <motion.div
            drag
            dragConstraints={{ top: 0, left: 0, right: 180, bottom: 60 }}
            style={{
              zIndex: draggedItem === 2 ? 2 : 1,
              width: "80px",
              height: "80px",
              background: `linear-gradient(190deg, #FFE629 10%, #9E6C00 90%)`,
              position: "absolute",
            }}
            initial={{ x: 160, y: 20 }}
            onDragStart={() => setDraggedItem(2)}
            className="cursor-grab active:cursor-grabbing rounded-full shadow-md"
          />

          {/* Glass Panels overlaying bottom half */}
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-[50%] w-full">
            <div className="flex h-full flex-row">
              {Array.from({ length: 10 }).map((_, idx) => (
                <div key={idx} className="glass-panel-item h-full flex-grow"></div>
              ))}
            </div>
          </div>
        </div>
      </div>
      
      <style>{`
        .glass-panel-item {
          background: linear-gradient(
            90deg,
            rgba(255, 255, 255, 0.08) 10%,
            rgba(255, 255, 255, 0.01) 70%,
            rgba(255, 255, 255, 0.08) 110%
          );
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border-left: 1px solid rgba(255, 255, 255, 0.03);
          border-right: 1px solid rgba(255, 255, 255, 0.03);
        }
      `}</style>
    </>
  );
};
