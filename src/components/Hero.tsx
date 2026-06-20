import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const LOGO_TEMPLATES = [
  { name: "Airbnb", className: "font-extrabold text-xl tracking-tighter text-neutral-800" },
  { name: "Plaid",  className: "font-bold text-xl text-neutral-800" },
  { name: "NIKE",   className: "font-black text-xl italic tracking-tighter text-neutral-800" },
  { name: "Spotify",className: "font-bold text-xl tracking-tight text-neutral-800" },
  { name: "Uber",   className: "font-extrabold text-xl tracking-tight text-neutral-800" },
  { name: "Stripe", className: "font-extrabold text-xl text-neutral-800" },
  { name: "Linear", className: "font-semibold text-xl tracking-wide text-neutral-800" },
  { name: "Figma",  className: "font-bold text-xl tracking-normal text-neutral-800" },
  { name: "Slack",  className: "font-extrabold text-xl tracking-tight text-neutral-800" },
  { name: "Apple",  className: "font-medium text-xl tracking-tighter text-neutral-800" },
  { name: "Google", className: "font-bold text-xl text-neutral-800" },
];

function LogoSlot({ index, interval }: { index: number; interval: number }) {
  const [logoIndex, setLogoIndex] = useState(index);
  useEffect(() => {
    const timer = setInterval(() => setLogoIndex((p) => (p + 1) % LOGO_TEMPLATES.length), interval);
    return () => clearInterval(timer);
  }, [interval]);
  const current = LOGO_TEMPLATES[logoIndex];
  return (
    <div className="w-[90px] md:w-[120px] h-[32px] md:h-[40px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={current.name}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className={`${current.className} select-none`}
        >
          {current.name}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}

export function Hero() {
  return (
    <div className="flex flex-col items-center pt-20 pb-10 px-4 md:pt-36 md:pb-24 overflow-x-hidden relative w-full">

      {/* App Icons Stack — smaller on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[64px] h-[64px] md:w-[88px] md:h-[88px]"
      >
        <div className="absolute inset-0 rounded-[18px] md:rounded-[24px] overflow-hidden -translate-y-1.5 scale-[0.81] bg-[rgba(116,116,116,0.2)] backdrop-blur-[32px] z-0" />
        <div className="absolute inset-0 rounded-[18px] md:rounded-[24px] overflow-hidden translate-y-0 scale-[0.99] z-10">
          <img src="https://framerusercontent.com/images/I7KFVdmQeFvr0TmuNPPlRY3aX4.png?width=800&height=800" alt="Wise" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 rounded-[18px] md:rounded-[24px] overflow-hidden translate-y-[14px] md:translate-y-[18px] scale-100 z-20 shadow-sm">
          <img src="https://framerusercontent.com/images/ypqhfxC308Hy6HXSBtQErurStI.png?width=800&height=800" alt="Shop" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Hero headline — 36px on mobile, scales up on larger screens */}
      <motion.h1
        initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="text-[36px] leading-[1.05] md:text-[64px] md:leading-[64px] lg:text-[80px] lg:leading-[80px] font-[700] tracking-[-0.5px] text-center max-w-[900px] text-[#141414] mt-6 md:mt-12"
      >
        Build faster with<br />premium components.
      </motion.h1>

      {/* Sub-text — smaller on mobile, single line */}
      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.12 }}
        className="mt-3 md:mt-8 text-[14px] md:text-[20px] text-[#717171] font-medium text-center max-w-2xl px-2"
      >
        500+ crafted UI elements &amp; templates. Built for modern devs.
      </motion.p>

      {/* CTA Buttons — side by side on mobile too */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mt-5 md:mt-10 flex flex-row items-center justify-center gap-2 md:gap-4 w-full px-4"
      >
        <button className="flex-1 sm:flex-none sm:w-auto bg-[#141414] text-white px-5 py-[9px] rounded-full font-semibold text-[14px] md:text-[15px] hover:scale-105 active:scale-95 transition-all shadow-md">
          Join for free
        </button>
        <button className="flex-1 sm:flex-none sm:w-auto bg-transparent border border-[#0000001a] text-[#141414] px-5 py-[9px] rounded-full font-semibold text-[14px] md:text-[15px] hover:bg-neutral-50 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-1.5">
          See plans
          <ArrowRight className="w-3.5 h-3.5 text-[#adadad]" />
        </button>
      </motion.div>

      {/* ScrollLaunch Badge — hidden on mobile to save space */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.28 }}
        className="mt-4 hidden sm:flex justify-center"
      >
        <a
          href="https://www.scrolllaunch.com/products/oxygen-ui?utm_source=badge&utm_medium=embed&utm_campaign=oxygen-ui&ref=scrolllaunch"
          target="_blank"
          rel="noopener noreferrer"
          className="hover:scale-105 transition-transform duration-200"
        >
          <img src="https://www.scrolllaunch.com/api/badge/oxygen-ui" alt="Featured on ScrollLaunch" width="180" height="40" loading="lazy" />
        </a>
      </motion.div>

      {/* Trusted By — compact single row on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.32 }}
        className="mt-10 md:mt-32 w-full text-center flex flex-col items-center"
      >
        <p className="text-[12px] md:text-[14px] text-[#717171] font-medium mb-3 uppercase tracking-wider">Trusted by teams at</p>
        <div className="flex flex-row justify-center items-center gap-x-4 md:gap-x-12 opacity-[0.4] grayscale w-full max-w-4xl px-4">
          <LogoSlot index={0} interval={3000} />
          <LogoSlot index={2} interval={3500} />
          <LogoSlot index={4} interval={4000} />
          {/* 4th logo only on sm+ */}
          <div className="hidden sm:block">
            <LogoSlot index={6} interval={4500} />
          </div>
        </div>
      </motion.div>

      {/* Video — tighter margin, 16:9 on mobile */}
      <motion.div
        initial={{ opacity: 0, y: 32, scale: 0.95 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="mt-12 md:mt-32 w-full max-w-[1440px] px-3 md:px-12 lg:px-24"
      >
        <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-100 rounded-[16px] md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl relative border border-neutral-200/50">
          <video src="https://framerusercontent.com/assets/TcvHfVe9bKWL2Gwru24KshXLEno.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 rounded-[16px] md:rounded-[40px] border border-white/20 pointer-events-none mix-blend-overlay" />
        </div>
      </motion.div>

      {/* Stats — much tighter on mobile */}
      <div className="mt-16 md:mt-48 w-full max-w-[1200px] px-4 relative flex flex-col items-center overflow-x-hidden">
        <div className="text-[13px] md:text-[24px] font-semibold text-[#717171] tracking-tight mb-4 md:mb-8 uppercase">A growing library of</div>

        <div className="flex flex-col gap-2 md:gap-10 pb-16 md:pb-32 w-full items-center relative">

          {/* Floating icons: desktop only */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
            <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute -top-[15%] left-[5%] w-[88px] h-[88px] bg-[#0061FE] rounded-3xl flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 24 24" className="w-12 h-12 text-white fill-current"><path d="M12 21.365l-6.84-4.42 6.84-5.46 6.84 5.46-6.84 4.42zM5.16 16.945L12 11.485V6.784L5.16 12.245v4.7zM18.84 16.945L12 11.485V6.784l6.84 5.461v4.7zM12 6.784L5.16 2.364 12 1.09 18.84 2.364 12 6.784z"/></svg>
            </motion.div>
            <motion.div initial={{ y: 40, opacity: 0, rotate: -10 }} whileInView={{ y: 0, opacity: 1, rotate: 0 }} viewport={{ margin: "-10%" }} transition={{ duration: 1, delay: 0.4 }} className="absolute top-[10%] left-[18%] w-[72px] h-[72px] bg-black text-white rounded-[24px] flex items-center justify-center shadow-lg font-bold text-xl leading-4 text-center">C<br/>R<br/>M</motion.div>
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.3 }} className="absolute top-[25%] right-[25%] w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center shadow-xl border border-gray-100">
              <svg viewBox="0 0 24 24" className="w-10 h-10 text-black fill-current"><path d="M22.28 9.68a8.31 8.31 0 0 0-1.25-5.96 8.35 8.35 0 0 0-7.3-4.14 8.32 8.32 0 0 0-6.16 2.38 8.32 8.32 0 0 0-5.85-1A8.32 8.32 0 0 0 .56 6.2a8.32 8.32 0 0 0-.27 6.13A8.32 8.32 0 0 0 1.54 18.3a8.35 8.35 0 0 0 7.3 4.14 8.35 8.35 0 0 0 6.16-2.38 8.32 8.32 0 0 0 5.86 1 8.31 8.31 0 0 0 5.16-5.22 8.32 8.32 0 0 0 .27-6.13h-.01z"/></svg>
            </motion.div>
            <motion.div initial={{ y: -30, opacity: 0, rotate: 5 }} whileInView={{ y: 0, opacity: 1, rotate: 0 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute top-[20%] right-[10%] w-[92px] h-[92px] bg-[#ff5a5f] rounded-[28px] flex items-center justify-center shadow-lg">
              <svg viewBox="0 0 256 256" className="w-[52px] h-[52px] text-white fill-current"><path d="M128 47.6c-13.2 0-24 16.5-24 36.8s10.8 36.8 24 36.8 24-16.5 24-36.8-10.8-36.8-24-36.8zm79.9-10.6c-4.4-6.8-11.7-10.9-19.5-10.9H128c-7.8 0-15.1 4.1-19.5 10.9-7.5 11.8-8.5 27.6-2.5 40.5l47.1 103.5c4.6 10 16 10 20.6 0l47.1-103.5c6-12.9 5-28.7-2.5-40.5z"/></svg>
            </motion.div>
          </div>

          {[
            { label: "1,428 components", delay: 0 },
            { label: "200+ templates",   delay: 0.1 },
            { label: "50+ integrations", delay: 0.2 },
          ].map(({ label, delay }) => (
            <motion.div
              key={label}
              initial={{ opacity: 0.2, filter: "blur(2px)", y: 16 }}
              whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, color: "#141414" }}
              viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
              transition={{ duration: 0.45, delay }}
              className="text-[2rem] sm:text-5xl md:text-7xl font-bold tracking-[-0.04em] text-[#adadad] text-center leading-[1.1] px-2 w-full"
            >
              {label}
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
