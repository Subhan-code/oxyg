import { motion } from "motion/react";
import { useState } from "react";

const TABS = ["Components", "Templates"];

const IMAGES = [
  "https://framerusercontent.com/images/yT3kv5drMsbZmpGqxH03q2Xr6zw.png?width=768&height=1662",
  "https://framerusercontent.com/images/TBajAWvUPazrHQCytuqOtiVHro.png?width=768&height=1662",
  "https://framerusercontent.com/images/lGjk1RJWmlw5bKuImRCUdUADQuE.png?width=768&height=1662",
  "https://framerusercontent.com/images/Bw18qHLeyyYXs4Nd0tB4vajWA.png?width=768&height=1662",
  "https://framerusercontent.com/images/HIQb9tOP3UYygdQttzMC1wtS2I.png?width=768&height=1662",
  "https://framerusercontent.com/images/7DCnfay6uGITLECOMgaJT1BG9DU.png?width=768&height=1662",
  "https://framerusercontent.com/images/ebUAozvxXnmlBH0EN7OkDSGtFA.png?width=768&height=1662",
];

const COMPONENTS_DATA = [
  { title: "Spaced Chat UI", video: "https://framerusercontent.com/assets/FYJ1R5B1aNNy9sN7S60vnazbQs0.mp4" },
  { title: "Gooey Search Panel", video: "https://framerusercontent.com/assets/j2fANRzLWcW5FqA2sPHYCykn8.mp4" },
  { title: "Adaptive Caret Input", video: "https://framerusercontent.com/assets/MkRqx95luhv3HrzWUVBPk3lbk.mp4" },
  { title: "Worm Progress Loader", video: "https://framerusercontent.com/assets/jqYjBn39McfA2B8VkBvj3Ca2U0.mp4" },
  { title: "Interactive Canvas Art", video: "https://framerusercontent.com/assets/DpMFb4zuxQzqPqM9HQtesX9P6AE.mp4" },
  { title: "3D Perspective Grid", video: "https://framerusercontent.com/assets/TcvHfVe9bKWL2Gwru24KshXLEno.mp4" },
];

const TEMPLATES_DATA = [
  { title: "SaaS Analytics Dashboard", video: "https://framerusercontent.com/assets/FYJ1R5B1aNNy9sN7S60vnazbQs0.mp4" },
  { title: "Crypto Finance Wallet UI", video: "https://framerusercontent.com/assets/j2fANRzLWcW5FqA2sPHYCykn8.mp4" },
  { title: "E-Commerce Storefront App", video: "https://framerusercontent.com/assets/MkRqx95luhv3HrzWUVBPk3lbk.mp4" },
  { title: "Creative Portfolio Showcase", video: "https://framerusercontent.com/assets/jqYjBn39McfA2B8VkBvj3Ca2U0.mp4" },
  { title: "Mobile Fitness Tracker Layout", video: "https://framerusercontent.com/assets/DpMFb4zuxQzqPqM9HQtesX9P6AE.mp4" },
  { title: "Minimal Booking Interface", video: "https://framerusercontent.com/assets/TcvHfVe9bKWL2Gwru24KshXLEno.mp4" },
];

const FLOWS_DATA = [
  {
    title: "User Onboarding Journey",
    screens: [
      "https://framerusercontent.com/images/yT3kv5drMsbZmpGqxH03q2Xr6zw.png?width=768&height=1662",
      "https://framerusercontent.com/images/TBajAWvUPazrHQCytuqOtiVHro.png?width=768&height=1662",
    ],
  },
  {
    title: "Secure Purchase & Checkout",
    screens: [
      "https://framerusercontent.com/images/lGjk1RJWmlw5bKuImRCUdUADQuE.png?width=768&height=1662",
      "https://framerusercontent.com/images/Bw18qHLeyyYXs4Nd0tB4vajWA.png?width=768&height=1662",
    ],
  },
  {
    title: "Account Verification & Setup",
    screens: [
      "https://framerusercontent.com/images/HIQb9tOP3UYygdQttzMC1wtS2I.png?width=768&height=1662",
      "https://framerusercontent.com/images/7DCnfay6uGITLECOMgaJT1BG9DU.png?width=768&height=1662",
    ],
  },
  {
    title: "Workspace Invitation Flow",
    screens: [
      "https://framerusercontent.com/images/ebUAozvxXnmlBH0EN7OkDSGtFA.png?width=768&height=1662",
      "https://framerusercontent.com/images/yT3kv5drMsbZmpGqxH03q2Xr6zw.png?width=768&height=1662",
    ],
  },
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
    <h2 className="text-[1.75rem] md:text-6xl font-bold tracking-[-0.04em] text-neutral-900 text-center leading-[1.1] flex flex-col items-center text-balance">
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

const FEATURE_TO_SLUG_MAP: Record<string, string> = {
  "Spaced Chat UI": "spaced-chat-input",
  "Gooey Search Panel": "gooey-search",
  "Adaptive Caret Input": "adaptive-caret",
  "Worm Progress Loader": "setup-steps",
  "Interactive Canvas Art": "pixel-canvas-demo",
  "3D Perspective Grid": "staggered-3d-grid",
};

export function Features() {
  const [activeTab, setActiveTab] = useState(TABS[0]);

  const handleCardClick = (title: string) => {
    const slug = FEATURE_TO_SLUG_MAP[title] || title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    window.location.hash = `/components/${slug}`;
  };

  const renderMarqueeContent = () => {
    switch (activeTab) {
      case "Components":
        return [...COMPONENTS_DATA, ...COMPONENTS_DATA].map((item, i) => (
          <div 
            key={i} 
            onClick={() => handleCardClick(item.title)}
            className="w-[260px] md:w-[360px] shrink-0 p-3 md:p-4 bg-zinc-950 hover:bg-white rounded-3xl border border-zinc-900 hover:border-zinc-200 transition-all duration-300 flex flex-col hover:scale-[1.025] shadow-lg hover:shadow-md group cursor-pointer"
          >
            <div className="w-full h-[150px] md:h-[210px] rounded-2xl overflow-hidden border border-zinc-900/50 bg-[#1c1c1e] relative group-hover:border-zinc-200/50 transition-colors duration-300">
              <video src={item.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
            <div className="mt-3 px-1 text-left">
              <h4 className="text-sm md:text-base font-bold text-zinc-100 group-hover:text-zinc-950 transition-colors duration-300 tracking-tight leading-tight">{item.title}</h4>
            </div>
          </div>
        ));
      case "Templates":
        return [...TEMPLATES_DATA, ...TEMPLATES_DATA].map((item, i) => (
          <div 
            key={i} 
            onClick={() => handleCardClick(item.title)}
            className="w-[260px] md:w-[360px] shrink-0 p-3 md:p-4 bg-zinc-950 hover:bg-white rounded-3xl border border-zinc-900 hover:border-zinc-200 transition-all duration-300 flex flex-col hover:scale-[1.025] shadow-lg hover:shadow-md group cursor-pointer"
          >
            <div className="w-full h-[150px] md:h-[210px] rounded-2xl overflow-hidden border border-zinc-900/50 bg-[#1c1c1e] relative group-hover:border-zinc-200/50 transition-colors duration-300">
              <video src={item.video} autoPlay muted loop playsInline className="w-full h-full object-cover" />
            </div>
            <div className="mt-3 px-1 text-left">
              <h4 className="text-sm md:text-base font-bold text-zinc-100 group-hover:text-zinc-950 transition-colors duration-300 tracking-tight leading-tight">{item.title}</h4>
            </div>
          </div>
        ));
      default:
        return null;
    }
  };

  return (
    <div className="bg-white flex flex-col items-center overflow-x-hidden w-full">

      {/* ── Design Patterns ── */}
      <div className="pt-0 pb-10 md:pt-2 md:pb-32 w-full overflow-hidden flex flex-col items-center">
        <SectionHead lines={["Find exactly what", "you need."]} />

        {/* Tab pills — flex-1 on mobile so all fit equally, fixed size on desktop */}
        <div className="mt-5 md:mt-10 flex items-center bg-neutral-100/80 p-1 rounded-full mx-4 shadow-inner border border-neutral-200/50 w-[calc(100%-2rem)] md:w-auto">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`relative flex-1 md:flex-none px-2 md:px-4 py-2 text-[11px] md:text-[15px] font-semibold rounded-full transition-[color,transform] active:scale-[0.96] text-center leading-tight ${
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

        {/* Marquee with decreased block height via vertical padding and margins */}
        <div className="mt-6 md:mt-10 py-4 md:py-6 w-full flex overflow-hidden relative group">
          <motion.div
            key={activeTab}
            animate={{ x: ["0%", "-50%"] }}
            transition={{ ease: "linear", duration: 45, repeat: Infinity }}
            className="flex gap-3 md:gap-6 min-w-max px-3 md:px-4 group-hover:[animation-play-state:paused]"
          >
            {renderMarqueeContent()}
          </motion.div>
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
                  <video src={src} autoPlay muted loop playsInline className="w-[80%] h-auto object-cover shadow-xl rounded-xl group-hover:scale-105 transition-transform duration-500 outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10" />
                </div>
                <div className="text-center px-3">
                  <h3 className="text-base md:text-xl font-bold tracking-tight text-neutral-900 mb-1">{title}</h3>
                  <p className="text-neutral-500 font-medium text-[13px] md:text-base leading-relaxed text-pretty">{desc}</p>
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
