import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles, Activity, Layers, Terminal, ShieldAlert } from "lucide-react";

interface TimelineItem {
  label: string;
  tag: string;
  title: string;
  category: string;
  description: string;
  bg: string;
  textColor: string;
  icon: any;
  image: string;
}

const TIMELINE_DATA: TimelineItem[] = [
  {
    label: "DRAWER",
    tag: "SPRING INTERACTION",
    title: "iOS-Style Dynamic Drawers",
    category: "BOTTOM DRAWER",
    description: "Fluid sheets with velocity-based inertia drag, boundary elasticity, and overlay background scroll locking.",
    bg: "bg-[#e0f2fe]", // Soft light sky blue
    textColor: "text-zinc-900",
    icon: Sparkles,
    image: "https://framerusercontent.com/images/yT3kv5drMsbZmpGqxH03q2Xr6zw.png?width=768&height=1662"
  },
  {
    label: "GOOEY",
    tag: "LIQUID PHYSICS",
    title: "Liquid Gooey Autocomplete",
    category: "GOOEY SEARCH PANEL",
    description: "SVG gooey-filtered search inputs that dynamically morph, merge, and expand on text focus.",
    bg: "bg-[#f3e8ff]", // Soft light purple/violet
    textColor: "text-zinc-900",
    icon: Activity,
    image: "https://framerusercontent.com/images/TBajAWvUPazrHQCytuqOtiVHro.png?width=768&height=1662"
  },
  {
    label: "CAROUSEL",
    tag: "3D TRANSFORM",
    title: "3D Perspective Carousels",
    category: "3D VISUAL SHIFT",
    description: "Interlocking circular and perspective cylindrical text lists driven smoothly by scroll velocity.",
    bg: "bg-[#ecfccb]", // Soft light lime green
    textColor: "text-zinc-900",
    icon: Layers,
    image: "https://framerusercontent.com/images/lGjk1RJWmlw5bKuImRCUdUADQuE.png?width=768&height=1662"
  },
  {
    label: "SHEET",
    tag: "MICROINTERACTION",
    title: "Kinetic Action Sheets",
    category: "ACTION OVERLAY",
    description: "Spring-loaded popup menus that dynamically scale and align relative to click coordinate placement.",
    bg: "bg-[#ffe4e6]", // Soft light pink
    textColor: "text-zinc-900",
    icon: Terminal,
    image: "https://framerusercontent.com/images/Bw18qHLeyyYXs4Nd0tB4vajWA.png?width=768&height=1662"
  },
  {
    label: "WEBGL",
    tag: "GLSL SHADER",
    title: "Fluid Shader Galleries",
    category: "SHADER SHOWCASE",
    description: "GPU-accelerated image lists with custom vertex deformations and mouse ripple scroll filters.",
    bg: "bg-[#ffedd5]", // Soft light orange
    textColor: "text-zinc-900",
    icon: ShieldAlert,
    image: "https://framerusercontent.com/images/HIQb9tOP3UYygdQttzMC1wtS2I.png?width=768&height=1662"
  }
];

export function TimelineSection() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [selected, setSelected] = useState<number>(0);

  const handleMouseEnter = (index: number) => {
    setHoveredIndex(index);
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  const calculateScale = (index: number) => {
    if (hoveredIndex === null) return 0.6;
    const distance = Math.abs(index - hoveredIndex);
    return Math.max(1.3 - distance * 0.35, 0.6);
  };

  // Drag handler to transition selected card on drag/swipe along the Y-axis
  const handleDragEnd = (_event: any, info: any) => {
    const swipeThreshold = 80;
    if (info.offset.y < -swipeThreshold) {
      // Swipe up: next card
      setSelected((prev) => (prev + 1) % TIMELINE_DATA.length);
    } else if (info.offset.y > swipeThreshold) {
      // Swipe down: previous card
      setSelected((prev) => (prev - 1 + TIMELINE_DATA.length) % TIMELINE_DATA.length);
    }
  };

  return (
    <section className="w-full bg-white dark:bg-[#141414] text-[#141414] dark:text-white py-8 md:py-12 flex flex-col items-center relative z-10 px-6 sm:px-12">
      
      <div className="max-w-5xl mx-auto flex flex-col items-center w-full relative z-10 font-sans">
        
        {/* Section Header */}
        <div className="text-center mb-6">
          <h2 className="text-2xl md:text-4xl font-extrabold tracking-tight text-[#141414] dark:text-white font-sans">
            Why Choose Oxygen UI
          </h2>
        </div>

        {/* Dynamic Card Stack & Centered Selector */}
        <div className="w-full flex flex-col items-center gap-8 mt-2">
          
          {/* Draggable Card Stack Container */}
          <div className="w-full max-w-[920px] relative h-[250px] md:h-[290px] flex items-center justify-center">
            {TIMELINE_DATA.map((item, i) => {
              const depth = i - selected;
              const isActive = i === selected;
              const isPassed = depth < 0;
              
              // Stacking offset values
              let yOffset = depth * 14;
              let scaleVal = 1 - depth * 0.035;
              let zIndexVal = 10 - depth;
              let opacityVal = 1 - depth * 0.28;

              if (isPassed) {
                yOffset = depth * 8;
                scaleVal = 1 - Math.abs(depth) * 0.035;
                zIndexVal = 5 - Math.abs(depth);
                opacityVal = 0.22;
              }

              const ActiveIcon = item.icon;

              return (
                <motion.div
                  key={i}
                  style={{ zIndex: zIndexVal }}
                  animate={{
                    y: yOffset,
                    scale: scaleVal,
                    opacity: opacityVal,
                  }}
                  drag={isActive ? "y" : false}
                  dragConstraints={{ top: 0, bottom: 0 }}
                  dragElastic={0.6}
                  onDragEnd={handleDragEnd}
                  whileDrag={{ scale: 1.015, cursor: "grabbing" }}
                  transition={{ type: "spring", stiffness: 280, damping: 26 }}
                  onClick={() => !isActive && setSelected(i)}
                  className={`absolute w-full h-[180px] md:h-[220px] rounded-2xl border ${
                    isActive 
                      ? "border-neutral-300 dark:border-neutral-700 shadow-[0_12px_36px_rgba(0,0,0,0.05)] cursor-grab active:cursor-grabbing" 
                      : "border-neutral-200 dark:border-neutral-800 shadow-[0_4px_16px_rgba(0,0,0,0.01)] cursor-pointer"
                  } ${item.bg} ${item.textColor} overflow-hidden flex flex-row items-stretch select-none origin-bottom transition-[border-color,background-color] duration-300`}
                >
                  
                  {/* Card Content Layout */}
                  <div className="w-full p-5 md:p-8 flex flex-row items-center justify-between gap-6">
                    
                    {/* Left text column */}
                    <div className="flex-grow text-left flex flex-col justify-between h-full">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[9px] font-black tracking-wider uppercase bg-black/80 text-white px-2 py-0.5 rounded-[3px]">
                            {item.label}
                          </span>
                          <span className="text-[8px] font-extrabold tracking-widest uppercase opacity-60">
                            {item.tag}
                          </span>
                        </div>
                        <h3 className="text-xl md:text-2xl font-black tracking-tight leading-none mt-2.5 text-zinc-900">
                          {item.title}
                        </h3>
                      </div>
                      
                      <p className="text-xs md:text-sm font-medium leading-relaxed max-w-2xl text-zinc-800 opacity-90">
                        {item.description}
                      </p>
                    </div>

                    {/* Right preview graphic container */}
                    <div className="w-[120px] md:w-[160px] aspect-video rounded-xl overflow-hidden bg-black/10 border border-black/5 shrink-0 relative hidden sm:flex items-center justify-center">
                      <img 
                        src={item.image} 
                        alt="Preview graphic" 
                        className="w-full h-full object-cover opacity-65" 
                      />
                      <div className="absolute inset-0 bg-black/10 flex items-center justify-center">
                        <ActiveIcon className="w-4 h-4 opacity-80" />
                      </div>
                    </div>

                  </div>

                </motion.div>
              );
            })}
          </div>

          {/* Horizontally Centered Timeline Ticks Row (Ticks are VERTICAL lines aligned in horizontal row) */}
          <div className="flex flex-row items-center justify-center gap-6 py-6 select-none w-full border-t border-neutral-100 dark:border-neutral-800 mt-2 font-sans relative min-h-[64px]">
            {TIMELINE_DATA.map((item, i) => {
              const isSelected = selected === i;
              const isHovered = hoveredIndex === i;
              
              return (
                <button
                  key={i}
                  className="relative inline-flex items-center justify-center py-2 px-2 focus:outline-none cursor-pointer group h-10"
                  onMouseEnter={() => handleMouseEnter(i)}
                  onMouseLeave={handleMouseLeave}
                  onClick={() => setSelected(i)}
                  onTouchStart={() => handleMouseEnter(i)}
                  onTouchEnd={handleMouseLeave}
                >
                  {/* Timeline Tick Line (Vertical bar: w-1 h-6) */}
                  <motion.div
                    className={`w-1 h-6 rounded-full transition-colors duration-300 ${
                      isSelected
                        ? "bg-neutral-900 dark:bg-neutral-100"
                        : "bg-neutral-300 dark:bg-neutral-700 group-hover:bg-neutral-400 dark:group-hover:bg-neutral-500"
                    }`}
                    animate={{
                      scale: calculateScale(i),
                    }}
                    initial={{ scale: 0.6 }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />

                  {/* Hover label overlay centered horizontally below the vertical tick bar */}
                  <AnimatePresence>
                    {(isHovered || isSelected) && (
                      <motion.span
                        className={`absolute top-8 text-[9px] font-black tracking-wider whitespace-nowrap ${
                          isSelected ? "text-neutral-900 dark:text-neutral-100" : "text-neutral-400 dark:text-neutral-500"
                        }`}
                        initial={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                        exit={{ opacity: 0, y: -4, filter: "blur(2px)" }}
                        transition={{ duration: 0.12 }}
                      >
                        {item.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </button>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
