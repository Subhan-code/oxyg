import { motion } from "framer-motion";

export const DistortedGlass = () => {
  return (
    <>
      <div className="relative h-[250px] w-full overflow-hidden select-none bg-neutral-100 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5 rounded-2xl flex items-center justify-center p-4">
        <span className="absolute top-2 text-[10px] font-mono text-neutral-400 dark:text-neutral-500">
          Drag the circle to distort under glass
        </span>
        
        {/* Drag constraints bounding container */}
        <div className="relative w-full h-[180px] mt-4">
          <motion.div
            drag
            dragConstraints={{ top: 0, left: 0, right: 240, bottom: 80 }}
            initial={{ x: 130, y: 30 }}
            className="h-16 w-16 rounded-full cursor-grab active:cursor-grabbing z-0 relative"
            style={{
              background: "linear-gradient(190deg, #BAA7FF 10%, #7D66D9 90%)",
            }}
          />
          <div className="pointer-events-none absolute bottom-0 left-0 z-10 h-24 w-40 overflow-hidden rounded-xl border border-white/20 shadow-md">
            <div className="glass-effect-custom h-full w-full" />
          </div>
        </div>

        {/* Displacement SVG filters */}
        <svg className="absolute hidden">
          <defs>
            <filter id="fractal-noise-glass">
              <feTurbulence
                type="fractalNoise"
                baseFrequency="0.12 0.12"
                numOctaves="1"
                result="warp"
              />
              <feDisplacementMap
                xChannelSelector="R"
                yChannelSelector="G"
                scale="30"
                in="SourceGraphic"
                in2="warp"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <style>{`
        .glass-effect-custom {
          background: rgba(255, 255, 255, 0.05);
          background: repeating-radial-gradient(
            circle at 50% 50%,
            rgba(255, 255, 255, 0) 0px,
            rgba(255, 255, 255, 0.1) 10px,
            rgba(255, 255, 255, 0.15) 30px
          );
          filter: url(#fractal-noise-glass);
          background-size: 6px 6px;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
        }
      `}</style>
    </>
  );
};
