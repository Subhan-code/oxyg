import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { X } from 'lucide-react';

interface MenuOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MenuOverlay = ({ isOpen, onClose }: MenuOverlayProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const panelsRef = useRef<HTMLDivElement>(null);
  const menuContentRef = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);

  const { contextSafe } = useGSAP(() => {
    if (containerRef.current) {
      gsap.set(containerRef.current, { display: 'none' });
    }
  }, { scope: containerRef });

  useEffect(() => {
    if (!containerRef.current || !panelsRef.current || !menuContentRef.current) return;

    const panels = panelsRef.current.children;
    const menuItems = menuContentRef.current.querySelectorAll('.menu-item');
    const closeButton = menuContentRef.current.querySelector('.close-button');

    if (isOpen) {
      gsap.set(containerRef.current, { display: 'block' });
      
      gsap.set(panels, { yPercent: 100 });
      gsap.set(menuItems, { yPercent: 100, opacity: 0 });
      gsap.set(closeButton, { opacity: 0, rotate: -90 });

      tl.current = gsap.timeline({
        defaults: { ease: "power3.inOut" }
      })
      .to(panels, {
        yPercent: 0,
        duration: 0.8,
        stagger: 0.1,
      })
      .to(menuItems, {
        yPercent: 0,
        opacity: 1,
        duration: 0.5,
        stagger: 0.05,
        ease: "power2.out"
      }, "-=0.4")
      .to(closeButton, {
        opacity: 1,
        rotate: 0,
        duration: 0.4
      }, "<");

    } else {
      if (tl.current) tl.current.kill();
      
      tl.current = gsap.timeline({
        onComplete: () => {
          gsap.set(containerRef.current, { display: 'none' });
        }
      })
      .to(menuItems, {
        yPercent: 100,
        opacity: 0,
        duration: 0.3,
        stagger: 0.03
      })
      .to(panels, {
        yPercent: 100,
        duration: 0.6,
        stagger: {
          each: 0.05,
          from: "end"
        },
        ease: "power3.inOut"
      }, "-=0.2");
    }

  }, [isOpen]);

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[200] hidden"
    >
      {/* Background Panels */}
      <div ref={panelsRef} className="absolute inset-0 w-full h-full pointer-events-none">
        {/* Panel 1: Accent Color */}
        <div className="absolute inset-0 bg-[#FF4400] z-10" />
        {/* Panel 2: Dark Color */}
        <div className="absolute inset-0 bg-[#09090b] z-20" />
        {/* Panel 3: Final Background */}
        <div className="absolute inset-0 bg-[#ffffff] dark:bg-[#000000] z-30 transition-colors duration-300" />
      </div>

      {/* Menu Content */}
      <div 
        ref={menuContentRef}
        className="relative z-[210] w-full h-full flex flex-col justify-between p-8 md:p-16 text-zinc-950 dark:text-white"
      >
        {/* Header / Close */}
        <div className="flex justify-between items-center w-full">
          <div className="menu-item text-xs font-black uppercase tracking-widest text-zinc-400 dark:text-zinc-500">
            Navigation
          </div>
          <button 
            onClick={onClose}
            className="close-button p-2 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full transition-colors cursor-pointer"
          >
            <X className="w-8 h-8 text-zinc-950 dark:text-white" />
          </button>
        </div>

        {/* Main Links */}
        <nav className="flex flex-col gap-2 md:gap-4">
          {['Home', 'Projects', 'Services', 'About', 'Contact'].map((item) => (
            <div key={item} className="menu-item overflow-hidden">
              <a 
                href="#" 
                onClick={(e) => { e.preventDefault(); onClose(); }}
                className="block text-5xl md:text-8xl font-black text-zinc-950 dark:text-white hover:text-[#FF4400] transition-colors tracking-tighter uppercase"
              >
                {item}
              </a>
            </div>
          ))}
        </nav>

        {/* Footer */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-end menu-item border-t border-zinc-200 dark:border-zinc-800 pt-6">
          <div className="flex gap-6 text-sm font-semibold uppercase tracking-wider text-zinc-500 dark:text-zinc-400">
            <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Instagram</a>
            <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">Twitter</a>
            <a href="#" className="hover:text-zinc-950 dark:hover:text-white transition-colors">LinkedIn</a>
          </div>
          <div className="text-zinc-400 dark:text-zinc-600 text-xs font-medium uppercase tracking-wider">
            © 2026 OXYGEN STUDIOS
          </div>
        </div>
      </div>
    </div>
  );
};
