import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Copy, Check } from "lucide-react";
import { useState, useEffect } from "react";
import { ThreeDTextScrollSection } from "./ThreeDTextScrollSection";

const LOGO_TEMPLATES = [
  { name: "Airbnb", className: "font-extrabold text-xl tracking-tighter text-neutral-800" },
  { name: "Plaid", className: "font-bold text-xl text-neutral-800" },
  { name: "NIKE", className: "font-black text-xl italic tracking-tighter text-neutral-800" },
  { name: "Spotify", className: "font-bold text-xl tracking-tight text-neutral-800" },
  { name: "Uber", className: "font-extrabold text-xl tracking-tight text-neutral-800" },
  { name: "Stripe", className: "font-extrabold text-xl text-neutral-800" },
  { name: "Linear", className: "font-semibold text-xl tracking-wide text-neutral-800" },
  { name: "Figma", className: "font-bold text-xl tracking-normal text-neutral-800" },
  { name: "Slack", className: "font-extrabold text-xl tracking-tight text-neutral-800" },
  { name: "Apple", className: "font-medium text-xl tracking-tighter text-neutral-800" },
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
  const [copied, setCopied] = useState(false);
  const command = "pnpm dlx shadcn@latest add @oxygen-ui";

  const handleCopy = () => {
    navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col items-center pt-20 pb-0 px-4 md:pt-36 md:pb-0 overflow-x-hidden relative w-full">

      {/* shadcn copy badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        className="flex items-center bg-[#ededed]/60 dark:bg-neutral-900/60 backdrop-blur-md rounded-full border border-neutral-200/50 dark:border-neutral-800/80 px-4 py-2 select-none shadow-sm gap-2.5 font-mono text-[12px] md:text-[13px] text-neutral-800 dark:text-neutral-200 cursor-pointer hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        onClick={handleCopy}
      >
        <span className="flex items-center gap-1.5 font-semibold">
          <span className="text-blue-500 font-bold select-none">$</span>
          <span>{command}</span>
        </span>
        <button className="text-neutral-400 hover:text-neutral-700 dark:hover:text-white transition-colors ml-1.5 focus:outline-none">
          {copied ? (
            <Check className="w-3.5 h-3.5 text-green-500 animate-scale-in" />
          ) : (
            <Copy className="w-3.5 h-3.5" />
          )}
        </button>
      </motion.div>

      {/* Hero headline with slide-up reveals */}
      <h1 className="text-[36px] leading-[1.05] md:text-[64px] md:leading-[68px] lg:text-[76px] lg:leading-[80px] font-[800] tracking-[-0.03em] text-center max-w-[950px] text-[#141414] mt-6 md:mt-10 text-balance flex flex-col items-center">
        <span className="overflow-hidden block">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="block"
          >
            Animated components
          </motion.span>
        </span>
        <span className="overflow-hidden block">
          <motion.span
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.08 }}
            className="block text-[#717171] mt-1 md:mt-2"
          >
            that actually ship.
          </motion.span>
        </span>
      </h1>

      {/* Sub-text */}
      <motion.p
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
        className="mt-4 md:mt-8 text-[14px] md:text-[18px] lg:text-[20px] text-[#717171] font-medium text-center max-w-2xl px-2 text-pretty leading-relaxed"
      >
        A curated collection of 40+ copy-paste React components built with Tailwind CSS, TypeScript &amp; Framer Motion. Drop into any project — zero configuration, zero compromise.
      </motion.p>

      {/* CTA Buttons */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.26 }}
        className="mt-5 md:mt-10 flex flex-row flex-wrap items-center justify-center gap-2 md:gap-4 w-full px-4"
      >
        <button className="flex-1 sm:flex-none sm:w-auto bg-[#141414] text-white px-5 py-[9px] rounded-full font-semibold text-[14px] md:text-[15px] hover:scale-[1.02] active:scale-[0.96] transition-[transform,opacity] shadow-md">
          Join for free
        </button>
        <a href="#/pricing" className="flex-1 sm:flex-none sm:w-auto bg-transparent border border-[#0000001a] text-[#141414] px-5 py-[9px] rounded-full font-semibold text-[14px] md:text-[15px] hover:bg-neutral-50 active:scale-[0.96] transition-[background-color,transform] shadow-sm flex items-center justify-center gap-1.5">
          See plans
          <ArrowRight className="w-3.5 h-3.5 text-[#adadad]" />
        </a>
        <a href="#/dashboard" className="flex-1 sm:flex-none sm:w-auto bg-neutral-100 hover:bg-neutral-200 text-neutral-800 px-5 py-[9px] rounded-full font-semibold text-[14px] md:text-[15px] hover:scale-[1.02] active:scale-[0.96] transition-[transform,background-color] shadow-sm flex items-center justify-center">
          Dashboard
        </a>
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
        <div className="w-full aspect-video md:aspect-[21/9] bg-neutral-100 rounded-[16px] md:rounded-[40px] overflow-hidden shadow-xl md:shadow-2xl relative outline outline-1 -outline-offset-1 outline-black/10 dark:outline-white/10">
          <video src="https://framerusercontent.com/assets/TcvHfVe9bKWL2Gwru24KshXLEno.mp4" autoPlay muted loop playsInline className="w-full h-full object-cover" />
          <div className="absolute inset-0 rounded-[16px] md:rounded-[40px] border border-white/20 pointer-events-none mix-blend-overlay" />
        </div>
      </motion.div>

      {/* ThreeDTextScrollSection replaces the original stats block */}
      <div className="w-full mt-6 md:mt-12 mb-6 md:mb-12">
        <ThreeDTextScrollSection />
      </div>
    </div>
  );
}
