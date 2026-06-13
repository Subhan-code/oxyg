import { motion } from "motion/react";
import { useState } from "react";

const TABS = ["Screens", "UI Elements", "Flows", "Text in Screenshots"];

const IMAGES = [
  "https://framerusercontent.com/images/yT3kv5drMsbZmpGqxH03q2Xr6zw.png?width=768&height=1662",
  "https://framerusercontent.com/images/TBajAWvUPazrHQCytuqOtiVHro.png?width=768&height=1662",
  "https://framerusercontent.com/images/lGjk1RJWmlw5bKuImRCUdUADQuE.png?width=768&height=1662",
  "https://framerusercontent.com/images/Bw18qHLeyyYXs4Nd0tB4vajWA.png?width=768&height=1662",
  "https://framerusercontent.com/images/HIQb9tOP3UYygdQttzMC1wtS2I.png?width=768&height=1662",
  "https://framerusercontent.com/images/7DCnfay6uGITLECOMgaJT1BG9DU.png?width=768&height=1662",
  "https://framerusercontent.com/images/ebUAozvxXnmlBH0EN7OkDSGtFA.png?width=768&height=1662",
];

export const SquiCircleFilterStatic = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="pointer-events-none absolute bottom-0 left-0"
      version="1.1"
      style={{ width: 0, height: 0 }}
      aria-hidden="true"
    >
      <defs>
        <filter id="SkiperSquiCircleFilterLayout">
          <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
};

export function Features() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="bg-white flex flex-col items-center">
      {/* Design Patterns Section */}
      <div className="py-24 md:py-32 w-full overflow-hidden flex flex-col items-center border-t border-neutral-100 mt-12">
        <div className="flex flex-col items-center justify-center">
          <h2 className="text-[2.25rem] md:text-6xl font-bold tracking-[-0.04em] text-neutral-900 text-center px-4 leading-[1.1] flex flex-col items-center">
            <span className="overflow-hidden block">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                className="block"
              >
                Find design patterns
              </motion.span>
            </span>
            <span className="overflow-hidden block mt-1">
              <motion.span 
                initial={{ y: "100%" }}
                whileInView={{ y: 0 }}
                viewport={{ once: true, margin: "-10%" }}
                transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                className="block"
              >
                in seconds.
              </motion.span>
            </span>
          </h2>
        </div>
        
        {/* Pills */}
        <div className="mt-10 flex items-center bg-neutral-100/80 p-1.5 rounded-full mx-4 shadow-inner border border-neutral-200/50 max-w-full overflow-x-auto no-scrollbar">
          {TABS.map((tab) => (
            <button 
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative px-5 py-2.5 text-[15px] font-semibold rounded-full transition-colors whitespace-nowrap ${
                 activeTab === tab ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {activeTab === tab && (
                <motion.div 
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-neutral-200/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-16 w-full flex overflow-hidden relative group">
          <motion.div 
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex gap-4 md:gap-6 min-w-max px-4 group-hover:[animation-play-state:paused]"
          >
            {[...IMAGES, ...IMAGES].map((src, i) => (
              <div key={i} className="w-[160px] md:w-[260px] shrink-0 transform transition-transform hover:-translate-y-2 hover:shadow-xl rounded-[2rem] duration-300">
                <img src={src} className="w-full h-auto rounded-[2rem] border border-neutral-200/60 shadow-sm bg-neutral-50" alt="Pattern screen" />
              </div>
            ))}
          </motion.div>
          {/* Fades */}
          <div className="absolute inset-y-0 left-0 w-8 md:w-12 bg-gradient-to-r from-white to-transparent pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-8 md:w-12 bg-gradient-to-l from-white to-transparent pointer-events-none" />
        </div>
      </div>

      {/* Journeys Section */}
      <div className="py-24 md:py-32 w-full bg-neutral-50/50 border-y border-neutral-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center mb-16 md:mb-24">
            <h2 className="text-[2.25rem] md:text-6xl font-bold tracking-[-0.04em] text-neutral-900 text-center leading-[1.1] flex flex-col items-center">
              <span className="overflow-hidden block">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="block"
                >
                  Explore entire user
                </motion.span>
              </span>
              <span className="overflow-hidden block mt-1">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                  className="block"
                >
                  journeys with flows.
                </motion.span>
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12">
            <div className="flex flex-col gap-6 group">
              <div className="bg-[#f0f0f0] rounded-[2rem] pt-12 px-12 md:px-20 h-[380px] md:h-[500px] flex justify-center items-end overflow-hidden border border-neutral-200/60 transition-colors group-hover:bg-[#e8e8e8]">
                <video 
                  src="https://framerusercontent.com/assets/FYJ1R5B1aNNy9sN7S60vnazbQs0.mp4" 
                  autoPlay muted loop playsInline
                  className="w-full max-w-[280px] h-auto object-cover rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative translate-y-4 group-hover:translate-y-2 transition-transform duration-500"
                />
              </div>
              <div className="px-2">
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">Video</h3>
                <p className="text-neutral-500 font-medium text-lg leading-relaxed">Experience flows in their natural form complete with micro-[interactions], animations and more.</p>
              </div>
            </div>
            
            <div className="flex flex-col gap-6 group">
              <div className="bg-[#f0f0f0] rounded-[2rem] pt-12 px-12 md:px-20 h-[380px] md:h-[500px] flex justify-center items-end overflow-hidden border border-neutral-200/60 transition-colors group-hover:bg-[#e8e8e8]">
                 <video 
                  src="https://framerusercontent.com/assets/j2fANRzLWcW5FqA2sPHYCykn8.mp4" 
                  autoPlay muted loop playsInline
                  className="w-full max-w-[340px] h-auto object-cover rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative translate-y-4 group-hover:translate-y-2 transition-transform duration-500"
                />
              </div>
              <div className="px-2">
                <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mb-2">Prototype</h3>
                <p className="text-neutral-500 font-medium text-lg leading-relaxed">Go through screen by screen using the interactive hotspots at your own preferred pace.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Creation Section */}
      <div className="py-24 md:py-32 w-full">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center mb-16 md:mb-24">
            <h2 className="text-[2.25rem] md:text-6xl font-bold tracking-[-0.04em] text-neutral-900 text-center leading-[1.1] flex flex-col items-center">
              <span className="overflow-hidden block">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }}
                  className="block"
                >
                  From inspiration
                </motion.span>
              </span>
              <span className="overflow-hidden block mt-1">
                <motion.span 
                  initial={{ y: "100%" }}
                  whileInView={{ y: 0 }}
                  viewport={{ once: true, margin: "-10%" }}
                  transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1], delay: 0.1 }}
                  className="block"
                >
                  to creation.
                </motion.span>
              </span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 pb-8">
            <div className="flex flex-col gap-6 group">
              <div 
                className="bg-[#f0f0f0] rounded-[2rem] h-[340px] flex items-center justify-center transition-colors group-hover:bg-[#e8e8e8]"
                style={{ filter: "url(#SkiperSquiCircleFilterLayout)", transform: "translateZ(0)" }}
              >
                 <video 
                  src="https://framerusercontent.com/assets/MkRqx95luhv3HrzWUVBPk3lbk.mp4" 
                  autoPlay muted loop playsInline
                  className="w-[85%] h-auto object-cover shadow-xl rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl font-bold tracking-tight text-neutral-900 mb-2">Copy to Figma</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">Download designs you like or copy it straight into Figma with our new plugin.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 group">
              <div 
                className="bg-[#f0f0f0] rounded-[2rem] h-[340px] flex items-center justify-center transition-colors group-hover:bg-[#e8e8e8]"
                style={{ filter: "url(#SkiperSquiCircleFilterLayout)", transform: "translateZ(0)" }}
              >
                 <video 
                  src="https://framerusercontent.com/assets/jqYjBn39McfA2B8VkBvj3Ca2U0.mp4" 
                  autoPlay muted loop playsInline
                  className="w-[85%] h-auto object-cover shadow-xl rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl font-bold tracking-tight text-neutral-900 mb-2">Save to collections</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">Collect your favorite designs and upload your own screenshots into one place.</p>
              </div>
            </div>
            <div className="flex flex-col gap-6 group">
              <div 
                className="bg-[#f0f0f0] rounded-[2rem] h-[340px] flex items-center justify-center transition-colors group-hover:bg-[#e8e8e8]"
                style={{ filter: "url(#SkiperSquiCircleFilterLayout)", transform: "translateZ(0)" }}
              >
                 <video 
                  src="https://framerusercontent.com/assets/DpMFb4zuxQzqPqM9HQtesX9P6AE.mp4" 
                  autoPlay muted loop playsInline
                  className="w-[85%] h-auto object-cover shadow-xl rounded-xl group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="text-center px-4">
                <h3 className="text-xl font-bold tracking-tight text-neutral-900 mb-2">Leave comments</h3>
                <p className="text-neutral-500 font-medium leading-relaxed">Take notes upon saving so you'll never forget the context in the future.</p>
              </div>
            </div>
          </div>
          <SquiCircleFilterStatic />
        </div>
      </div>
    </div>
  );
}
