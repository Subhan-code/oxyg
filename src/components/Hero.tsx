import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, Copy, Check, Terminal } from "lucide-react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { cn } from "@/lib/utils";
import heroBgImg from "../8c87a926bae86d6d0c32f86b87bfa574.jpg";
import { ThreeDTextScrollSection } from "./ThreeDTextScrollSection";

const LOGO_TEMPLATES = [
  { name: "Airbnb", className: "font-extrabold text-xl tracking-tighter text-neutral-800 dark:text-neutral-200" },
  { name: "Plaid", className: "font-bold text-xl text-neutral-800 dark:text-neutral-200" },
  { name: "NIKE", className: "font-black text-xl italic tracking-tighter text-neutral-800 dark:text-neutral-200" },
  { name: "Spotify", className: "font-bold text-xl tracking-tight text-neutral-800 dark:text-neutral-200" },
  { name: "Uber", className: "font-extrabold text-xl tracking-tight text-neutral-800 dark:text-neutral-200" },
  { name: "Stripe", className: "font-extrabold text-xl text-neutral-800 dark:text-neutral-200" },
  { name: "Linear", className: "font-semibold text-xl tracking-wide text-neutral-800 dark:text-neutral-200" },
  { name: "Figma", className: "font-bold text-xl tracking-normal text-neutral-800 dark:text-neutral-200" },
  { name: "Slack", className: "font-extrabold text-xl tracking-tight text-neutral-800 dark:text-neutral-200" },
  { name: "Apple", className: "font-medium text-xl tracking-tighter text-neutral-800 dark:text-neutral-200" },
  { name: "Google", className: "font-bold text-xl text-neutral-800 dark:text-neutral-200" },
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
    <div className="flex flex-col items-center overflow-x-hidden relative w-full">
      {/* Centered Hero Section */}
      <section className="relative flex flex-col items-center justify-center pt-32 md:pt-40 pb-16 px-4 md:px-6 w-full text-center overflow-visible isolate">

        {/* Premium Background Container */}
        <div
          className="absolute inset-x-4 md:inset-x-6 top-0 bottom-4 md:bottom-6 -z-30 rounded-b-[2.5rem] md:rounded-b-[3.5rem] overflow-hidden pointer-events-none bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${heroBgImg})`,
          }}
        >
          {/* Dark overlay for dark theme to make white text legible */}
          <div className="absolute inset-0 bg-transparent dark:bg-black/75 transition-colors duration-300" />
        </div>

        <div className="w-full max-w-7xl mx-auto flex flex-col items-center justify-center relative z-10">
          {/* Interactive CLI Card (Pill) */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: "easeOut", delay: 0.05 }}
            whileHover={{ y: -2, scale: 1.01 }}
            whileTap={{ scale: 0.98 }}
            className="relative mb-8 z-20 cursor-pointer"
            onClick={handleCopy}
          >
            <div className={cn(
              "group flex items-center gap-3 bg-white/5 dark:bg-zinc-900/30 hover:bg-white/10 dark:hover:bg-zinc-900/50 backdrop-blur-md rounded-full px-4 py-2 text-xs font-mono select-none relative overflow-hidden transition-all duration-300 shadow-[0_0_15px_rgba(0,0,0,0.02)]",
              copied
                ? "border-emerald-500/50 dark:border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.15)] bg-emerald-500/5 dark:bg-emerald-500/5"
                : "border-zinc-200/50 dark:border-zinc-800/50 hover:shadow-[0_0_25px_rgba(59,130,246,0.05)] hover:border-zinc-300 dark:hover:border-zinc-700"
            )}>
              {/* Shimmer shine effect */}
              <motion.div
                animate={{
                  x: ["-100%", "200%"],
                }}
                transition={{
                  repeat: Infinity,
                  duration: 2.5,
                  ease: "easeInOut",
                  repeatDelay: 1.5
                }}
                className="absolute inset-0 bg-gradient-to-r from-transparent via-sky-500/10 dark:via-white/10 to-transparent -skew-x-12 pointer-events-none"
              />

              <Terminal className={cn(
                "size-3.5 flex-shrink-0 transition-colors duration-300",
                copied ? "text-emerald-500 dark:text-emerald-400" : "text-sky-500 dark:text-sky-400"
              )} />
              <span className={cn(
                "pr-1 truncate font-medium transition-colors duration-300",
                copied ? "text-emerald-700 dark:text-emerald-300" : "text-zinc-700 dark:text-white"
              )}>
                {command}
              </span>

              <div className={cn(
                "flex items-center justify-center size-5.5 rounded-full transition-colors duration-300 flex-shrink-0",
                copied
                  ? "bg-emerald-500/10 text-emerald-500"
                  : "bg-zinc-900/5 dark:bg-white/5 group-hover:bg-sky-500 group-hover:text-white"
              )}>
                {copied ? (
                  <Check className="size-3 text-emerald-500 dark:text-emerald-450 animate-in fade-in zoom-in duration-200" />
                ) : (
                  <Copy className="size-3 text-zinc-500 dark:text-zinc-400 group-hover:text-white" />
                )}
              </div>
            </div>
          </motion.div>

          {/* Heading */}
          <h1 className="font-decorative text-3xl sm:text-4xl lg:text-[3.5rem] font-extrabold tracking-tight leading-[1.12] mb-8 text-zinc-900 dark:text-white max-w-4xl mx-auto text-center">
            <div className="overflow-hidden block pb-1 sm:whitespace-nowrap whitespace-normal">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
              >
                Animated components
              </motion.span>
            </div>
            <div className="overflow-hidden block pb-1.5 relative sm:whitespace-nowrap whitespace-normal">
              <motion.span
                className="inline-block"
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
              >
                that{' '}
                <span className="relative inline-block font-handwriting text-[2.25rem] sm:text-[3rem] lg:text-[3.8rem] text-sky-500 dark:text-white font-normal lowercase tracking-normal transform -rotate-1">
                  actually
                  <svg className="absolute -bottom-1 left-0 w-full h-2 text-sky-500 dark:text-white/80" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <motion.path
                      d="M3,7 Q30,1 60,7 T97,3"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      strokeLinecap="round"
                      initial={{ pathLength: 0 }}
                      animate={{ pathLength: 1 }}
                      transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                </span>{' '}
                ship.
              </motion.span>
            </div>
          </h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
            className="text-sm sm:text-base md:text-lg text-zinc-500 dark:text-white max-w-2xl mx-auto mb-12 leading-relaxed font-normal"
          >
            A curated collection of 40+ copy-paste React components built with <span className="font-semibold text-zinc-850 dark:text-zinc-200">Tailwind CSS</span>, <span className="font-semibold text-zinc-850 dark:text-zinc-200">TypeScript</span> & <span className="font-semibold text-zinc-850 dark:text-zinc-200">Framer Motion</span>. Drop into any project — zero configuration, zero compromise.
          </motion.p>

          {/* Action Buttons */}
          <div className="flex flex-row items-center justify-center gap-5 w-full sm:w-auto mb-16">
            <motion.div
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/components"
                className="group inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-xl bg-zinc-950 dark:bg-zinc-50 text-zinc-50 dark:text-zinc-950 font-bold px-8 hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-all duration-350 ease-out select-none gap-2"
              >
                <span>Documentation</span>
                <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.025 }}
              whileTap={{ scale: 0.975 }}
              className="w-full sm:w-auto"
            >
              <Link
                to="/pricing"
                className="inline-flex h-13 w-full sm:w-auto items-center justify-center rounded-xl bg-zinc-100/50 dark:bg-zinc-900/30 border border-zinc-200 dark:border-zinc-800 hover:border-zinc-350 dark:hover:border-zinc-700 text-zinc-800 dark:text-white font-bold px-8 hover:bg-zinc-100/80 dark:hover:bg-zinc-900/60 transition-all duration-300 ease-out shadow-sm select-none"
              >
                Pricing & Pro
              </Link>
            </motion.div>
          </div>

          {/* ScrollLaunch Badge */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.5 }}
            className="mt-4 z-20"
          >
            <a
              href="https://www.scrolllaunch.com/products/oxygen-ui?utm_source=badge&utm_medium=embed&utm_campaign=oxygen-ui&ref=scrolllaunch"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block transition-transform hover:scale-[1.03] active:scale-[0.98] duration-200"
            >
              <img
                src="https://www.scrolllaunch.com/api/badge/oxygen-ui"
                alt="Featured on ScrollLaunch"
                width="220"
                height="48"
                loading="lazy"
                className="h-12 w-auto"
              />
            </a>
          </motion.div>
        </div>
      </section>

      {/* Trusted By — compact single row on mobile */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.32 }}
        className="mt-6 md:mt-16 w-full text-center flex flex-col items-center"
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



      {/* ThreeDTextScrollSection replaces the original stats block */}
      <div className="w-full mt-6 md:mt-12 mb-6 md:mb-12">
        <ThreeDTextScrollSection />
      </div>
    </div>
  );
}
