import { motion, AnimatePresence } from "motion/react";
import { ArrowRight } from "lucide-react";
import { useState, useEffect } from "react";

const LOGO_TEMPLATES = [
  { name: "Airbnb", className: "font-extrabold text-2xl tracking-tighter text-neutral-800 dark:text-neutral-200" },
  { name: "Plaid", className: "font-bold text-2xl text-neutral-800 dark:text-neutral-200" },
  { name: "NIKE", className: "font-black text-2xl italic tracking-tighter text-neutral-800 dark:text-neutral-200" },
  { name: "Spotify", className: "font-bold text-2xl tracking-tight text-neutral-800 dark:text-neutral-200" },
  { name: "Uber", className: "font-extrabold text-2xl tracking-tight text-neutral-800 dark:text-neutral-200" },
  { name: "Stripe", className: "font-extrabold text-2xl text-neutral-800 dark:text-neutral-200" },
  { name: "Linear", className: "font-semibold text-2xl tracking-wide text-neutral-800 dark:text-neutral-200" },
  { name: "Figma", className: "font-bold text-2xl tracking-normal text-neutral-800 dark:text-neutral-200" },
  { name: "Slack", className: "font-extrabold text-2xl tracking-tight text-neutral-800 dark:text-neutral-200" },
  { name: "Apple", className: "font-medium text-2xl tracking-tighter text-neutral-800 dark:text-neutral-200" },
  { name: "Google", className: "font-bold text-2xl text-neutral-800 dark:text-neutral-200" },
];

function LogoSlot({ index, interval }: { index: number; interval: number }) {
  const [logoIndex, setLogoIndex] = useState(index);

  useEffect(() => {
    const timer = setInterval(() => {
      setLogoIndex((prev) => (prev + 1) % LOGO_TEMPLATES.length);
    }, interval);
    return () => clearInterval(timer);
  }, [interval]);

  const currentLogo = LOGO_TEMPLATES[logoIndex];

  return (
    <div className="w-[120px] h-[40px] flex items-center justify-center overflow-hidden">
      <AnimatePresence mode="wait">
        <motion.span
          key={currentLogo.name}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -15 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className={`${currentLogo.className} select-none`}
        >
          {currentLogo.name}
        </motion.span>
      </AnimatePresence>
    </div>
  );
}


const statItemVariants = {
  hidden: { opacity: 0, y: 30, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
};

const statContainerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.15 } }
};

export function Hero() {
  return (
    <div className="flex flex-col items-center pt-28 pb-16 px-4 md:pt-36 md:pb-24 overflow-hidden relative">
      {/* Background glow effects could go here if needed */}
      
      {/* App Icons Stack */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-[88px] h-[88px]"
      >
        <div className="absolute inset-0 rounded-[24px] overflow-hidden -translate-y-2 scale-[0.81] bg-[rgba(116,116,116,0.2)] backdrop-blur-[32px] z-0"></div>
        <div className="absolute inset-0 rounded-[24px] overflow-hidden translate-y-0 scale-[0.99] z-10">
           <img src="https://framerusercontent.com/images/I7KFVdmQeFvr0TmuNPPlRY3aX4.png?width=800&height=800" alt="Wise" className="w-full h-full object-cover" />
        </div>
        <div className="absolute inset-0 rounded-[24px] overflow-hidden translate-y-[18px] scale-100 z-20 shadow-sm">
           <img src="https://framerusercontent.com/images/ypqhfxC308Hy6HXSBtQErurStI.png?width=800&height=800" alt="Shop" className="w-full h-full object-cover" />
        </div>
      </motion.div>

      {/* Hero text */}
      <motion.h1 
        initial={{ opacity: 0, y: 30, filter: "blur(8px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.05 }}
        className="text-[44px] leading-[44px] md:text-[64px] md:leading-[64px] lg:text-[80px] lg:leading-[80px] font-[700] tracking-[-0.6px] text-center max-w-[900px] text-[#141414] mt-10 md:mt-12"
      >
        Build faster with<br /> premium components.
      </motion.h1>
      
      <motion.p 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        className="mt-6 md:mt-8 text-[16px] md:text-[20px] text-[#717171] font-medium text-center max-w-2xl px-4"
      >
        Featuring over 500 crafted UI elements and ready-to-use templates.<br className="hidden sm:block" /> Engineered for modern agents and devs.
      </motion.p>
      
      {/* Buttons */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.25 }}
        className="mt-8 md:mt-10 flex flex-col sm:flex-row items-center justify-center gap-4 w-full px-4 animate-once"
      >
        <button className="w-full sm:w-auto bg-[#141414] text-white px-6 py-[10px] rounded-full font-semibold text-[15px] hover:scale-105 active:scale-95 transition-all shadow-md">
          Join for free
        </button>
        <button className="w-full sm:w-auto bg-transparent border border-[#0000001a] text-[#141414] px-6 py-[10px] rounded-full font-semibold text-[15px] hover:bg-neutral-50 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2">
          See our plans
          <ArrowRight className="w-4 h-4 text-[#adadad]" />
        </button>
      </motion.div>

      {/* ScrollLaunch Badge */}
      <motion.div
        initial={{ opacity: 0, y: 15 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.35 }}
        className="mt-6 flex justify-center"
      >
        <a 
          href="https://www.scrolllaunch.com/products/oxygen-ui?utm_source=badge&utm_medium=embed&utm_campaign=oxygen-ui&ref=scrolllaunch" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="hover:scale-105 transition-transform duration-200"
        >
          <img 
            src="https://www.scrolllaunch.com/api/badge/oxygen-ui" 
            alt="Featured on ScrollLaunch" 
            width="220" 
            height="48" 
            loading="lazy" 
          />
        </a>
      </motion.div>

      {/* Trusted By */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.4 }}
        className="mt-20 md:mt-32 w-full text-center flex flex-col items-center"
      >
        <p className="text-[14px] text-[#717171] font-medium mb-4">Trusted by design teams at</p>
        <div className="flex flex-wrap justify-center items-center gap-x-8 md:gap-x-12 gap-y-4 opacity-[0.4] grayscale w-full max-w-4xl px-4">
          <LogoSlot index={0} interval={3000} />
          <LogoSlot index={2} interval={3500} />
          <LogoSlot index={4} interval={4000} />
          <LogoSlot index={6} interval={4500} />
        </div>
      </motion.div>

      {/* Video cover */}
      <motion.div 
         initial={{ opacity: 0, y: 40, scale: 0.95 }}
         whileInView={{ opacity: 1, y: 0, scale: 1 }}
         viewport={{ once: true, margin: "-100px" }}
         transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
         className="mt-24 md:mt-32 w-full max-w-[1440px] px-4 md:px-12 lg:px-24"
      >
         <div className="w-full aspect-[4/3] md:aspect-[21/9] bg-neutral-100 rounded-[24px] md:rounded-[40px] overflow-hidden shadow-2xl relative border border-neutral-200/50 ring-1 ring-neutral-900/5">
           <video 
             src="https://framerusercontent.com/assets/TcvHfVe9bKWL2Gwru24KshXLEno.mp4" 
             autoPlay muted loop playsInline 
             className="w-full h-full object-cover"
           />
           {/* Subtle reflection border */}
           <div className="absolute inset-0 rounded-[24px] md:rounded-[40px] border border-white/20 pointer-events-none mix-blend-overlay"></div>
         </div>
      </motion.div>
      
      {/* Stats - Scroll Reveal Effect */}
      <div className="mt-32 md:mt-48 w-full max-w-[1200px] px-4 relative flex flex-col items-center">
        <div className="text-[20px] md:text-[24px] font-semibold text-[#141414] tracking-tight mb-8">A growing library of</div>
        
        <div className="flex flex-col gap-6 md:gap-10 pb-32 w-full items-center relative">
          
          {/* Floating Icons Background */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden hidden md:block">
            {/* Dropbox */}
            <motion.div initial={{ y: -20, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.2 }} className="absolute -top-[15%] left-[5%] w-[88px] h-[88px] bg-[#0061FE] rounded-3xl flex items-center justify-center shadow-lg">
               <svg viewBox="0 0 24 24" className="w-12 h-12 text-white fill-current"><path d="M12 21.365l-6.84-4.42 6.84-5.46 6.84 5.46-6.84 4.42zM5.16 16.945L12 11.485V6.784L5.16 12.245v4.7zM18.84 16.945L12 11.485V6.784l6.84 5.461v4.7zM12 6.784L5.16 2.364 12 1.09 18.84 2.364 12 6.784z"/></svg>
            </motion.div>
            
             {/* Creme / Abstract Black Logo */}
            <motion.div initial={{ y: 40, opacity: 0, rotate: -10 }} whileInView={{ y: 0, opacity: 1, rotate: 0 }} viewport={{ margin: "-10%" }} transition={{ duration: 1, delay: 0.4 }} className="absolute top-[10%] left-[18%] w-[72px] h-[72px] bg-black text-white rounded-[24px] flex items-center justify-center shadow-lg font-bold text-xl leading-4 text-center">
               C<br/>R<br/>M
            </motion.div>

            {/* ChatGPT */}
            <motion.div initial={{ scale: 0.8, opacity: 0 }} whileInView={{ scale: 1, opacity: 1 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.3 }} className="absolute top-[25%] right-[25%] w-[80px] h-[80px] bg-white rounded-3xl flex items-center justify-center shadow-xl border border-gray-100">
               <svg viewBox="0 0 24 24" className="w-10 h-10 text-black fill-current"><path d="M22.28 9.68a8.31 8.31 0 0 0-1.25-5.96 8.35 8.35 0 0 0-7.3-4.14 8.32 8.32 0 0 0-6.16 2.38 8.32 8.32 0 0 0-5.85-1A8.32 8.32 0 0 0 .56 6.2a8.32 8.32 0 0 0-.27 6.13A8.32 8.32 0 0 0 1.54 18.3a8.35 8.35 0 0 0 7.3 4.14 8.35 8.35 0 0 0 6.16-2.38 8.32 8.32 0 0 0 5.86 1 8.31 8.31 0 0 0 5.16-5.22 8.32 8.32 0 0 0 .27-6.13h-.01zm-10.38-7.9c2.32 0 4.46.96 5.92 2.62A6.47 6.47 0 0 0 16 2.92v2.7A8.31 8.31 0 0 0 9.87 8l-2.61-4.52a6.38 6.38 0 0 1 4.64-1.7zm-6.62 3.12A6.38 6.38 0 0 1 8.5 2.14v3.13a8.31 8.31 0 0 0-2.68 3.55H2.15a6.43 6.43 0 0 1 3.13-3.92zM2.84 16.5A6.38 6.38 0 0 1 1.95 9.7l2.61 4.52a8.3 8.3 0 0 0 3.32 2.5v3.66a6.4 6.4 0 0 1-5.04-3.88zm8.6 5.6A6.38 6.38 0 0 1 8 19.38v-2.7a8.31 8.31 0 0 0 6.13-2.37l2.61 4.52a6.38 6.38 0 0 1-5.3 3.27zm6.73-3.13a6.38 6.38 0 0 1-3.23 2.76v-3.13a8.31 8.31 0 0 0 2.68-3.55h3.67a6.4 6.4 0 0 1-3.12 3.92zm3.12-6.57A6.38 6.38 0 0 1 22.18 19l-2.61-4.52a8.31 8.31 0 0 0-3.32-2.5V8.32a6.4 6.4 0 0 1 5.04 4.14v-.06zM12 15a4.08 4.08 0 1 1 0-8.16A4.08 4.08 0 0 1 12 15zm-3.5-3.48h2.09l1-1.74h-4v.05l.91 1.69zm3.5-2.6a1.05 1.05 1.05 0 0 0-1.04 1.05v1.2L12 10l1-.5v-1a1.05 1.05 1.05 0 0 0-1-1.06v.01z"/></svg>
            </motion.div>

            {/* Apple TV */}
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.5 }} className="absolute top-[60%] left-[15%] w-[84px] h-[84px] bg-[#141414] rounded-3xl flex items-center justify-center shadow-lg">
               <svg viewBox="0 0 256 256" className="w-[44px] h-[44px] text-white fill-current"><path d="M128 0C57.308 0 0 57.308 0 128s57.308 128 128 128 128-57.308 128-128S198.692 0 128 0zm43.14 170.83c-2.456 0-3.692-1.392-3.692-3.69 0-3.155 1.761-12.784 10.975-26.01 4.545-6.51 10.165-11.396 15.589-13.805 1.542-.693 2.015-1.503 1.83-2.605-.514-3.057-2.73-5.228-5.719-5.228h-17.652c-4.995 0-9.692 2.37-12.946 6.55-5.908 7.57-27.424 41.52-27.424 41.52s-2.072 2.92-5.185 2.92c-2.673 0-3.488-1.748-3.488-4.708v-43.2c0-3.21-1.341-5.105-4.475-5.105h-10.908c-3.136 0-4.639 2.091-4.639 5.3s.103 26.241.103 26.241c0 3.754-1.393 5.485-4.148 5.485-2.296 0-3.791-1.393-5.6-3.83L62.774 125.75c-2.724-3.674-6.843-5.914-11.419-5.914H35.8c-3.02 0-4.49 1.6-4.49 4.35 0 2.454.512 3.652 1.637 5.093l43.23 60.103c3.844 5.344 9.176 8.358 15.708 8.358h15.225c3.08 0 4.61-1.898 4.61-4.887l-.05-46.012c0-3.468 1.4-5.216 4.384-5.216 2.21 0 3.55 1.05 4.965 2.658 0 0 16.713 18.067 22.394 25.565 3.3 4.372 7.822 7.644 14.135 7.644h18.256c3.215 0 5.422-2.115 5.61-5.83.1-2.01-.84-3.61-2.274-4.832zM124.635 106.84c9.198-11.531 16.03-27.18 14.353-42.923-13.684.568-30.082 9.475-39.697 21.056-8.544 10.28-16.551 26.31-14.398 41.565 14.939 1.127 30.222-7.747 39.742-19.698z"/></svg>
            </motion.div>
            
            {/* Twitch */}
            <motion.div initial={{ y: 50, opacity: 0 }} whileInView={{ y: 0, opacity: 1 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.4 }} className="absolute top-[65%] right-[22%] w-[72px] h-[72px] bg-[#9146ff] rounded-[24px] flex items-center justify-center shadow-lg">
               <svg viewBox="0 0 24 24" className="w-10 h-10 text-white fill-current"><path d="M11.571 4.714h1.715v5.143H11.57zm4.715 0H18v5.143h-1.714zM6 0L1.714 4.286v15.428h5.143V24l4.286-4.286h3.428L22.286 12V0zm14.571 11.143l-3.428 3.428h-3.429l-3 3v-3H6.857V1.714h13.714Z"/></svg>
            </motion.div>

            {/* Airbnb */}
            <motion.div initial={{ y: -30, opacity: 0, rotate: 5 }} whileInView={{ y: 0, opacity: 1, rotate: 0 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.6 }} className="absolute top-[20%] right-[10%] w-[92px] h-[92px] bg-[#ff5a5f] rounded-[28px] flex items-center justify-center shadow-lg">
               <svg viewBox="0 0 256 256" className="w-[52px] h-[52px] text-white fill-current"><path d="M128 47.6c-13.2 0-24 16.5-24 36.8s10.8 36.8 24 36.8 24-16.5 24-36.8-10.8-36.8-24-36.8zm79.9-10.6c-4.4-6.8-11.7-10.9-19.5-10.9H128c-7.8 0-15.1 4.1-19.5 10.9-7.5 11.8-8.5 27.6-2.5 40.5l47.1 103.5c4.6 10 16 10 20.6 0l47.1-103.5c6-12.9 5-28.7-2.5-40.5z"/></svg> 
            </motion.div>
            
            {/* Nike */}
            <motion.div initial={{ scale: 0.8, opacity: 0, x: -30 }} whileInView={{ scale: 1, opacity: 1, x: 0 }} viewport={{ margin: "-10%" }} transition={{ duration: 0.8, delay: 0.5 }} className="absolute top-[5%] right-[25%] w-[84px] h-[54px] bg-white rounded-full flex items-center justify-center shadow-md border border-gray-100">
               <svg viewBox="0 0 256 256" className="w-[45px] h-[16px] text-black fill-current"><path d="M60.1 82.5c41.3-17.7 85.9-20.9 130-10-86.7-19.6-149.7 18.2-167 43.1-6.1 8.8-8.2 19.3-5.9 29.5 2 8.9 7.6 16.4 15.6 20.9 14.8 8.4 34.6 5.8 47.9-1.9 31.2-18 61.2-46.3 90.5-73.4 1.4-1.3-3.6-2.6-5.8-.9-25.2 19.7-53.7 41.5-85 54.3-12.9 5.3-27.1 6-39.7 1.3-6-2.2-11.8-6.1-13.8-12.5-2.2-7 .9-14.7 5.7-20.3 7.8-9 18.1-16.7 27.5-25z" /></svg>
            </motion.div>
          </div>

          <motion.div
             initial={{ opacity: 0.2, filter: "blur(2px)", y: 20 }}
             whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, color: "#141414" }}
             viewport={{ margin: "-30% 0px -30% 0px" }}
             transition={{ duration: 1.2, delay: 0 }}
             className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.04em] text-[#adadad] text-center leading-[1.1]"
          >
            1,428 components
          </motion.div>
          <motion.div
             initial={{ opacity: 0.2, filter: "blur(2px)", y: 20 }}
             whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, color: "#141414" }}
             viewport={{ margin: "-30% 0px -30% 0px" }}
             transition={{ duration: 1.2, delay: 0.5 }}
             className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.04em] text-[#adadad] text-center leading-[1.1]"
          >
            200+ templates
          </motion.div>
          <motion.div
             initial={{ opacity: 0.2, filter: "blur(2px)", y: 20 }}
             whileInView={{ opacity: 1, filter: "blur(0px)", y: 0, color: "#141414" }}
             viewport={{ margin: "-30% 0px -30% 0px" }}
             transition={{ duration: 1.2, delay: 1 }}
             className="text-4xl sm:text-5xl md:text-7xl font-bold tracking-[-0.04em] text-[#adadad] text-center leading-[1.1]"
          >
            50+ integrations
          </motion.div>
        </div>
      </div>
    </div>
  );
}
