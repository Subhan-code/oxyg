import React, { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress inside this section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Smooth out scroll position
  const pathProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 35,
    restDelta: 0.001
  });

  // Map progress to path dash offset
  const strokeDashoffset = useTransform(pathProgress, [0.1, 0.7], [1, 0]);

  return (
    <div ref={containerRef} className="w-full bg-[#000] text-white rounded-3xl overflow-hidden border border-neutral-800">
      <section className="grid min-h-[50dvh] place-items-center py-12">
        <div className="flex flex-col items-center">
          <p className="mb-4 max-w-[15ch] text-center text-[28px] md:text-[36px] leading-[1.05] tracking-tight font-bold text-balance">
            Scroll-driven path animations
            <span className="my-3 block font-mono text-[14px] md:text-[16px] tracking-normal text-[#86868b]">
              🍏{" "}
              <a
                href="https://www.apple.com/ipad-10.9/"
                target="_blank"
                className="underline underline-offset-4 decoration-[#86868b]/40 hover:decoration-[#86868b] transition-colors"
                rel="noreferrer"
              >
                Apple Style
              </a>{" "}
              🔗
            </span>
            <a
              className="block text-[13px] leading-[18px] font-normal underline underline-offset-4 decoration-white/30 hover:decoration-white transition-colors"
              href="https://www.frontend.fyi"
              target="_blank"
              rel="noreferrer"
            >
              By Frontend.fyi
            </a>
          </p>
          <p className="text-[15px] text-[#86868b] font-medium tracking-tight mt-2">Time to do the scrolly-scrolly 👇</p>
        </div>
      </section>

      <section className="ipad-section relative h-[60vh] md:h-[80vh] w-full overflow-hidden grid grid-cols-1 grid-rows-1 place-items-center bg-[#000]">
        
        {/* SVG definition containing the mask */}
        <svg className="absolute w-0 h-0" aria-hidden="true">
          <defs>
            <mask id="ipad-mask" maskUnits="userSpaceOnUse">
              <rect width="1400" height="700" fill="black" />
              <motion.path
                d="M817.502 79.4996C817.502 79.4996C471.288 64.9987 508.395 94.9995C545.503 125 591.503 107 759.003 136.5C1250.34 223.034 668.039 234.994 416.503 192C135.711 167.202 650.004 358.498 1035 268C1152.35 253.448 1361.42 429.964 803.003 370.5C394.503 327 280.856 305.789 226.503 327C165.003 351 1129.5 469.998 1253.5 460.5C1357.5 438.5 1690.5 582 888.503 542L118.503 430C-33.4972 406.5 -217.997 565 872.003 582L1357.5 565C1511.5 626 1623 719.5 118.503 613.5C60.9675 609.446 -289 592 388 727"
                stroke="white"
                strokeWidth="130"
                strokeLinecap="round"
                fill="none"
                pathLength="1"
                style={{ strokeDasharray: 1, strokeDashoffset }}
              />
            </mask>
          </defs>
        </svg>

        {/* Video / GIF container masked by the animated SVG path */}
        <div
          className="video-container [grid-area:1/1] w-full h-full"
          style={{
            mask: 'url(#ipad-mask)',
            WebkitMask: 'url(#ipad-mask)',
          }}
        >
          <img
            src="https://i.pinimg.com/originals/8b/88/04/8b8804f68dd860a430c7b323c4cf4eea.gif"
            alt="All screen. All colorful."
            className="w-full h-full object-cover select-none pointer-events-none"
          />
        </div>

        {/* Device interface text overlay */}
        <div className="[grid-area:1/1] flex flex-col items-center justify-center z-20 pointer-events-none pb-[5%] h-full w-full select-none">
          <p className="text-white font-bold text-[3vw] tracking-tighter drop-shadow-lg mb-2">All screen. All colorful.</p>
          <p className="text-white font-bold text-[3vw] tracking-tighter drop-shadow-lg mb-2">Jot it down. Type it up.</p>
          <p className="text-white font-bold text-[3vw] tracking-tighter drop-shadow-lg">Take it with you.</p>
        </div>
      </section>
    </div>
  );
};
