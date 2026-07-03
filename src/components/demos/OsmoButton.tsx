import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

interface OsmoButtonProps {
  text: string;
  className?: string;
  variant?: 'orange' | 'blue' | 'purple' | 'green';
  onClick?: () => void;
}

export const OsmoButton = ({ text, className = '', variant = 'orange', onClick }: OsmoButtonProps) => {
  const containerRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  const colors = {
    orange: { primary: '#FF4400', secondary: '#09090b' },
    blue: { primary: '#3B82F6', secondary: '#09090b' },
    purple: { primary: '#8B5CF6', secondary: '#09090b' },
    green: { primary: '#10B981', secondary: '#09090b' }
  };

  const { primary, secondary } = colors[variant];

  const { contextSafe } = useGSAP(() => {
    if (bgRef.current) {
      const layers = bgRef.current.children;
      gsap.set(layers, { 
        yPercent: 105,
        rotation: 0,
        scale: 1.2,
        transformOrigin: "center top"
      });
    }
  }, { scope: containerRef });

  const onMouseEnter = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!bgRef.current || !textRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const tilt = ((x / width) - 0.5) * 30;

    const layers = bgRef.current.children;
    const texts = textRef.current.children;

    gsap.set(layers, { rotation: tilt });

    gsap.to(layers, {
      yPercent: 0,
      rotation: 0,
      scale: 1,
      duration: 0.8,
      stagger: 0.075,
      ease: "elastic.out(1, 0.75)",
      overwrite: true
    });

    gsap.to(texts, {
      yPercent: -100,
      duration: 0.6,
      stagger: 0.075,
      ease: "back.out(2)",
      overwrite: true
    });
  });

  const onMouseLeave = contextSafe((e: React.MouseEvent<HTMLButtonElement>) => {
    if (!bgRef.current || !textRef.current || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const width = rect.width;
    const tilt = ((x / width) - 0.5) * 30;

    const layers = bgRef.current.children;
    const texts = textRef.current.children;

    gsap.to(layers, {
      yPercent: 100,
      rotation: tilt,
      scale: 1.2,
      duration: 0.5,
      stagger: {
        each: 0.03,
        from: "end"
      },
      ease: "power2.in",
      overwrite: true
    });

    gsap.to(texts, {
      yPercent: 0,
      duration: 0.5,
      stagger: {
        each: 0.03,
        from: "end"
      },
      ease: "power2.in",
      overwrite: true
    });
  });

  return (
    <button
      ref={containerRef}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      className={`relative px-8 py-3.5 rounded-xl border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-zinc-900 cursor-pointer overflow-hidden group transition-all duration-300 shadow-sm hover:shadow-md ${className}`}
    >
      {/* Background Layers Wrapper - ensures strict clipping */}
      <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
         <div ref={bgRef} className="w-full h-full relative">
            {/* Layer 1: Primary Color */}
            <div 
              className="absolute -left-[25%] -top-[50%] w-[150%] h-[200%] z-10" 
              style={{ backgroundColor: primary }}
            />
            {/* Layer 2: Secondary Color */}
            <div 
              className="absolute -left-[25%] -top-[50%] w-[150%] h-[200%] z-20" 
              style={{ backgroundColor: secondary }}
            />
         </div>
      </div>

      {/* Text Container */}
      <div 
        ref={textRef} 
        className="relative z-30 overflow-hidden h-[1.2em] leading-[1.2em] text-sm font-black uppercase tracking-wider flex flex-col items-center"
      >
        {/* Initial Text */}
        <span className="block text-zinc-950 dark:text-white transition-colors duration-300 group-hover:text-white">{text}</span>
        {/* Hover Text */}
        <span className="block absolute top-full text-white">{text}</span>
      </div>
    </button>
  );
};
