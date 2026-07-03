import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'motion/react';

export default function TiltCard({ maxAngle = 15 }: { maxAngle?: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 300, damping: 30 });
  const mouseYSpring = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], [`${maxAngle}deg`, `-${maxAngle}deg`]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], [`-${maxAngle}deg`, `${maxAngle}deg`]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    
    // Normalize mouse position between -0.5 and 0.5
    const width = rect.width;
    const height = rect.height;
    
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div 
      className="w-full h-full flex items-center justify-center"
      style={{ perspective: 1000 }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d"
        }}
        className="w-[300px] h-[400px] rounded-2xl p-6 bg-neutral-900 border border-white/10 shadow-2xl relative cursor-pointer"
      >
        <div style={{ transform: "translateZ(50px)" }} className="h-full flex flex-col justify-between">
          <div>
            <div className="size-12 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
                <polyline points="2 17 12 22 22 17"></polyline>
                <polyline points="2 12 12 17 22 12"></polyline>
              </svg>
            </div>
            <h3 className="text-xl font-bold text-white tracking-tight mb-2">3D Tilt Card</h3>
            <p className="text-sm text-neutral-400">Hover over me to see the 3D parallax effect in action. The content floats above the background.</p>
          </div>
          
          <div className="flex items-center gap-3">
            <div className="size-8 rounded-full bg-neutral-700"></div>
            <div className="text-sm">
              <p className="font-medium text-neutral-200 leading-none mb-1">Leo</p>
              <p className="text-xs text-neutral-500 leading-none">Creator</p>
            </div>
          </div>
        </div>
        
        {/* Glow effect */}
        <motion.div
          style={{
            background: `radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 60%)`,
            // bind position to mouse
            x: useTransform(mouseXSpring, [-0.5, 0.5], ["-50%", "50%"]),
            y: useTransform(mouseYSpring, [-0.5, 0.5], ["-50%", "50%"]),
          }}
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        />
      </motion.div>
    </div>
  );
}
