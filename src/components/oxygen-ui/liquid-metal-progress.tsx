import React, { useEffect, useRef, useState } from 'react';
import { liquidMetalFragmentShader, ShaderMount } from '@paper-design/shaders';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface LiquidMetalProgressProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  size?: number; // width & height of the circle in px
  strokeWidth?: number;
  icon?: React.ReactNode;
}

export function LiquidMetalProgress({
  containerRef,
  className,
  size = 64,
  strokeWidth = 4,
  icon,
}: LiquidMetalProgressProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = 0;
      let docHeight = 0;
      let winHeight = 0;

      const el = containerRef?.current;
      if (el && el.scrollHeight > el.clientHeight) {
        scrollTop = el.scrollTop;
        docHeight = el.scrollHeight;
        winHeight = el.clientHeight;
      } else {
        scrollTop = window.scrollY;
        docHeight = document.documentElement.scrollHeight;
        winHeight = window.innerHeight;
      }

      if (docHeight <= winHeight) {
        setScrollPct(0);
        return;
      }
      
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollPct(Math.min(1, Math.max(0, scrollPercent)) * 100);
    };

    const target = containerRef?.current || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true }); // Always listen to window as well for mobile/layout changes
    
    // Initial calculation
    handleScroll();

    // Re-check periodically in case document height changes
    const interval = setInterval(handleScroll, 500);

    return () => {
      target.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const mount = new ShaderMount(
      canvasContainerRef.current,
      liquidMetalFragmentShader,
      {
        u_repetition: 1.5,
        u_softness: 0.5,
        u_shiftRed: 0.8,
        u_shiftBlue: -0.5,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 100,
        u_scale: 1.5,
        u_shape: 1,
        u_offsetX: 0.1,
        u_offsetY: -0.1
      },
      undefined,
      0.6
    );

    return () => {
      // ShaderMount automatically cleans up when DOM nodes are unmounted
    };
  }, []);

  // Circle geometry calculations matching the custom SVG mask
  const radius = 50 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - scrollPct / 100);

  const svgString = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle 
        cx="50" 
        cy="50" 
        r="${radius}" 
        fill="none" 
        stroke="black" 
        stroke-width="${strokeWidth * 2}" 
        stroke-linecap="round" 
        stroke-dasharray="${circumference}" 
        stroke-dashoffset="${offset}" 
        transform="rotate(-90 50 50)" 
      />
    </svg>
  `;
  const emptySvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>';

  const maskImage = scrollPct === 0 
    ? `url('data:image/svg+xml,${encodeURIComponent(emptySvg)}')`
    : `url('data:image/svg+xml,${encodeURIComponent(svgString)}')`;

  const inlineStyles = {
    '--mask-image': maskImage,
    '--canvas-opacity': scrollPct > 0 ? 1 : 0,
    width: `${size}px`,
    height: `${size}px`,
  } as React.CSSProperties;

  return (
    <div 
      className={cn("relative rounded-full cursor-pointer transition-all active:scale-95 group select-none flex items-center justify-center hover:scale-105 duration-300", className)}
      style={{ width: `${size}px`, height: `${size}px` }}
    >
      <style>{`
        .liquid-progress-container {
          position: relative;
          border-radius: 50%;
        }
        .liquid-progress-container canvas {
          -webkit-mask-image: var(--mask-image);
          mask-image: var(--mask-image);
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          border-radius: 50%;
          opacity: var(--canvas-opacity, 1);
          filter: sepia(1) saturate(2.5) hue-rotate(-15deg) brightness(1.1) contrast(1.1);
          transition: opacity 0.3s ease;
        }
        .liquid-progress-container::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - ${strokeWidth * 2}px);
          height: calc(100% - ${strokeWidth * 2}px);
          background: #09090b;
          border-radius: 50%;
          z-index: 0;
        }
        .liquid-progress-icon-wrapper {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
        }
        .liquid-progress-container:hover .liquid-progress-icon-wrapper {
          transform: scale(1.15);
          color: #ffffff;
        }
      `}</style>

      {/* Liquid Metal Progress Canvas */}
      <div 
        ref={canvasContainerRef} 
        className="liquid-progress-container w-full h-full"
        style={inlineStyles}
      />

      {/* Inner Icon Overlay */}
      <div className="liquid-progress-icon-wrapper">
        {icon || <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />}
      </div>
    </div>
  );
}

export interface LiquidMetalBackToTopProps extends Omit<LiquidMetalProgressProps, 'icon'> {
  showThreshold?: number; // minimum scroll distance in px to show the button
}

export function LiquidMetalBackToTop({
  containerRef,
  className,
  size = 56,
  strokeWidth = 3.5,
  showThreshold = 150,
}: LiquidMetalBackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      let scrollTop = 0;
      const el = containerRef?.current;
      if (el && el.scrollHeight > el.clientHeight) {
        scrollTop = el.scrollTop;
      } else {
        scrollTop = window.scrollY;
      }
      setVisible(scrollTop >= showThreshold);
    };

    const target = containerRef?.current || window;
    target.addEventListener('scroll', handleScrollVisibility, { passive: true });
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    
    handleScrollVisibility();

    return () => {
      target.removeEventListener('scroll', handleScrollVisibility);
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, [containerRef, showThreshold]);

  const scrollToTop = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-[9999] transition-all duration-500 transform ease-[0.34,1.56,0.64,1] cursor-pointer",
        visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-6 pointer-events-none",
        className
      )}
    >
      {/* Floating Ring Glow */}
      <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      <LiquidMetalProgress 
        containerRef={containerRef}
        size={size}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}


