import { motion } from "motion/react";
import { useState } from "react";

const TABS = ["Components", "Templates", "Hooks", "Integrations"];

const IMAGES = [
  "https://framerusercontent.com/images/yT3kv5drMsbZmpGqxH03q2Xr6zw.png?width=768&height=1662",
  "https://framerusercontent.com/images/TBajAWvUPazrHQCytuqOtiVHro.png?width=768&height=1662",
  "https://framerusercontent.com/images/lGjk1RJWmlw5bKuImRCUdUADQuE.png?width=768&height=1662",
  "https://framerusercontent.com/images/Bw18qHLeyyYXs4Nd0tB4vajWA.png?width=768&height=1662",
  "https://framerusercontent.com/images/HIQb9tOP3UYygdQttzMC1wtS2I.png?width=768&height=1662",
  "https://framerusercontent.com/images/7DCnfay6uGITLECOMgaJT1BG9DU.png?width=768&height=1662",
  "https://framerusercontent.com/images/ebUAozvxXnmlBH0EN7OkDSGtFA.png?width=768&height=1662",
];

export const SquiCircleFilterStatic = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute bottom-0 left-0" version="1.1" style={{ width: 0, height: 0 }} aria-hidden="true">
    <defs>
      <filter id="SkiperSquiCircleFilterLayout">
        <feGaussianBlur in="SourceGraphic" stdDeviation="15" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7" result="goo" />
        <feBlend in="SourceGraphic" in2="goo" />
      </filter>
    </defs>
  </svg>
);

/* Compact section heading used in multiple places */
function SectionHead({ lines }: { lines: string[] }) {
  return (
    <h2 className="text-[1.75rem] md:text-6xl font-bold tracking-[-0.04em] text-neutral-900 text-center leading-[1.1] flex flex-col items-center">
      {lines.map((line, i) => (
        <span key={i} className="overflow-hidden block mt-0.5">
          <motion.span
            initial={{ y: "100%" }}
            whileInView={{ y: 0 }}
            viewport={{ once: true, margin: "-10%" }}
            transition={{ duration: 0.55, ease: [0.33, 1, 0.68, 1], delay: i * 0.1 }}
            className="block"
          >
            {line}
          </motion.span>
        </span>
      ))}
    </h2>
  );
}

export function Features() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  return (
    <div className="bg-white flex flex-col items-center overflow-x-hidden w-full">

      {/* ── Design Patterns ── */}
      <div className="py-10 md:py-32 w-full overflow-hidden flex flex-col items-center border-t border-neutral-100 mt-6 md:mt-12">
        <SectionHead lines={["Find exactly what", "you need."]} />

        {/* Tab pills — flex-1 on mobile so all 4 fit equally, fixed size on desktop */}
        <div className="mt-5 md:mt-10 flex items-center bg-neutral-100/80 p-1 rounded-full mx-4 shadow-inner border border-neutral-200/50 w-[calc(100%-2rem)] md:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 md:flex-none px-2 md:px-4 py-2 text-[11px] md:text-[15px] font-semibold rounded-full transition-colors text-center leading-tight ${
                activeTab === tab ? "text-neutral-900" : "text-neutral-500 hover:text-neutral-800"
              }`}
            >
              {activeTab === tab && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute inset-0 bg-white rounded-full shadow-[0_2px_8px_rgba(0,0,0,0.06)] border border-neutral-200/50"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.55 }}
                />
              )}
              <span className="relative z-10">{tab}</span>
            </button>
          ))}
        </div>

        {/* Marquee */}
        <div className="mt-8 md:mt-16 w-full flex overflow-hidden relative group">
          <motion.div
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 40, repeat: Infinity }}
            className="flex gap-3 md:gap-6 min-w-max px-3 md:px-4 group-hover:[animation-play-state:paused]"
          >
            {[...IMAGES, ...IMAGES].map((src, i) => (
              <div key={i} className="w-[120px] md:w-[260px] shrink-0 transform transition-transform hover:-translate-y-2 rounded-[1.5rem] md:rounded-[2rem] duration-300">
                <img src={src} className="w-full h-auto rounded-[1.5rem] md:rounded-[2rem] border border-neutral-200/60 shadow-sm bg-neutral-50" alt="Pattern screen" />
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* ── Journeys / Copy & Paste ── */}
      <div className="py-10 md:py-32 w-full bg-neutral-50/50 border-y border-neutral-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center mb-8 md:mb-24">
            <SectionHead lines={["Complete application", "templates ready to deploy."]} />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 md:gap-12">
            {/* Card 1 */}
            <div className="flex flex-col gap-3 md:gap-6 group">
              <div className="bg-[#f0f0f0] rounded-[1.5rem] md:rounded-[2rem] pt-7 md:pt-12 px-6 md:px-20 h-[220px] md:h-[500px] flex justify-center items-end overflow-hidden border border-neutral-200/60 transition-colors group-hover:bg-[#e8e8e8]">
                <video src="https://framerusercontent.com/assets/FYJ1R5B1aNNy9sN7S60vnazbQs0.mp4" autoPlay muted loop playsInline className="w-full max-w-[200px] md:max-w-[280px] h-auto object-cover rounded-t-2xl md:rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative translate-y-3 group-hover:translate-y-1 transition-transform duration-500" />
              </div>
              <div className="px-1">
                <h3 className="text-lg md:text-2xl font-bold tracking-tight text-neutral-900 mb-1">Copy &amp; Paste</h3>
                <p className="text-neutral-500 font-medium text-[14px] md:text-lg leading-relaxed">Copy production-ready React code straight into your app with zero setup.</p>
              </div>
            </div>

            {/* Card 2 */}
            <div className="flex flex-col gap-3 md:gap-6 group">
              <div className="bg-[#f0f0f0] rounded-[1.5rem] md:rounded-[2rem] pt-7 md:pt-12 px-6 md:px-20 h-[220px] md:h-[500px] flex justify-center items-end overflow-hidden border border-neutral-200/60 transition-colors group-hover:bg-[#e8e8e8]">
                <video src="https://framerusercontent.com/assets/j2fANRzLWcW5FqA2sPHYCykn8.mp4" autoPlay muted loop playsInline className="w-full max-w-[240px] md:max-w-[340px] h-auto object-cover rounded-t-2xl md:rounded-t-3xl shadow-[0_-10px_40px_rgba(0,0,0,0.1)] relative translate-y-3 group-hover:translate-y-1 transition-transform duration-500" />
              </div>
              <div className="px-1">
                <h3 className="text-lg md:text-2xl font-bold tracking-tight text-neutral-900 mb-1">Customizable</h3>
                <p className="text-neutral-500 font-medium text-[14px] md:text-lg leading-relaxed">Fully typed, easily themed, and designed to scale from prototype to enterprise.</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Creation Section ── */}
      <div className="py-10 md:py-32 w-full">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <div className="flex flex-col items-center justify-center mb-8 md:mb-24">
            <SectionHead lines={["From idea", "to production."]} />
          </div>

          {/* 3-col on desktop, single col on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 md:gap-10 pb-4 md:pb-8">
            {[
              {
                src: "https://framerusercontent.com/assets/MkRqx95luhv3HrzWUVBPk3lbk.mp4",
                title: "Premium Quality",
                desc: "Engineered with strict attention to accessibility, performance, and best practices.",
              },
              {
                src: "https://framerusercontent.com/assets/jqYjBn39McfA2B8VkBvj3Ca2U0.mp4",
                title: "AI-Ready",
                desc: "Structured specifically to be ingested by coding agents and AI co-pilots.",
              },
              {
                src: "https://framerusercontent.com/assets/DpMFb4zuxQzqPqM9HQtesX9P6AE.mp4",
                title: "Developer First",
                desc: "Built on Tailwind CSS, framer-motion, and Radix UI.",
              },
            ].map(({ src, title, desc }) => (
              <div key={title} className="flex flex-col gap-3 md:gap-6 group">
                <div
                  className="bg-[#f0f0f0] rounded-[1.5rem] md:rounded-[2rem] h-[200px] md:h-[340px] flex items-center justify-center transition-colors group-hover:bg-[#e8e8e8]"
                  style={{ filter: "url(#SkiperSquiCircleFilterLayout)", transform: "translateZ(0)" }}
                >
                  <video src={src} autoPlay muted loop playsInline className="w-[80%] h-auto object-cover shadow-xl rounded-xl group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="text-center px-3">
                  <h3 className="text-base md:text-xl font-bold tracking-tight text-neutral-900 mb-1">{title}</h3>
                  <p className="text-neutral-500 font-medium text-[13px] md:text-base leading-relaxed">{desc}</p>
                </div>
              </div>
            ))}
          </div>
          <SquiCircleFilterStatic />
        </div>
      </div>
    </div>
  );
}
