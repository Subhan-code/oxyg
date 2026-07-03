import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

export interface FooterLinkItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterProps {
  title?: string;
  copyright?: string;
  socials?: FooterLinkItem[];
  links?: FooterLinkItem[];
  scrollableRef?: React.RefObject<HTMLElement>;
}

function FooterItemLink({ href, label, active }: FooterLinkItem & { key?: string | number }) {
  const isExternal = href.startsWith("http") || href.startsWith("#");
  const linkClass = "w-fit text-white/80 dark:text-zinc-150 hover:text-white dark:hover:text-white relative group overflow-hidden transition-colors duration-300 block";
  
  const content = (
    <motion.div 
      whileHover={{ x: 6, scale: 1.03 }}
      transition={{ type: "spring", stiffness: 450, damping: 14 }}
      className="flex flex-col transform group-hover:-translate-y-full transition-transform duration-500 ease-[0.16,1,0.3,1] py-0.5"
    >
      <span className={active ? "underline underline-offset-[6px] decoration-1 decoration-accent-pro" : ""}>
        {label}
      </span>
      <span className={`absolute top-full left-0 text-accent-pro ${active ? "underline underline-offset-[6px] decoration-1 decoration-accent-pro" : ""}`}>
        {label}
      </span>
    </motion.div>
  );

  if (isExternal) {
    return (
      <a href={href} className={linkClass} target={href.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer">
        {content}
      </a>
    );
  }
  
  return (
    <a href={href} className={linkClass}>
      {content}
    </a>
  );
}

export function Footer({
  title = "RUNESTUDIOS",
  copyright = "2024 - COPYRIGHT ALL RIGHT RESERVED",
  socials = [],
  links = [],
  scrollableRef,
}: FooterProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollableRef,
    offset: ["start end", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.95, 1]);

  const textVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 100 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] },
    },
  };

  const titleLetters = title.toUpperCase().split("");

  return (
    <footer
      ref={containerRef}
      className="w-full bg-white dark:bg-[#000000] p-3 md:p-6 pb-3 md:pb-6 transition-colors duration-300 relative z-30 overflow-hidden"
    >
      <motion.div
        style={{ scale }}
        className="w-full"
      >
        <motion.div
          whileHover={{ 
            scale: 1.015,
            y: -8,
            boxShadow: "0 30px 60px -15px rgba(0, 0, 0, 0.4)"
          }}
          whileTap={{ scale: 0.985, y: -2 }}
          transition={{ 
            type: "spring", 
            stiffness: 320, 
            damping: 11, 
            mass: 0.85 
          }}
          className="w-full rounded-[1.5rem] md:rounded-[2.5rem] bg-[#000000] dark:bg-[#0c0c0e] border border-white/5 text-white flex flex-col justify-between overflow-hidden relative p-8 md:p-12 lg:p-16 min-h-[60vh] md:min-h-[75vh] transition-colors duration-300 shadow-2xl cursor-pointer"
        >
          {/* Background Light Backglow */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(236,72,153,0.03),transparent_50%)] dark:bg-[radial-gradient(circle_at_50%_0%,rgba(99,102,241,0.02),transparent_50%)] pointer-events-none" />

          {/* Top Section: Massive Brand Text */}
          <div className="w-full mt-4 md:mt-8 flex justify-center relative z-10">
            <motion.h1
              variants={textVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="text-[13vw] font-black uppercase tracking-[-0.04em] leading-[0.8] text-white flex justify-between w-full select-none transition-colors"
            >
              {titleLetters.map((char, index) => (
                <motion.span
                  key={index}
                  variants={letterVariants}
                  className="inline-block"
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </motion.h1>
          </div>

          {/* Bottom Section: Links & Copyright */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-4 w-full mt-24 md:mt-auto relative z-10">
            
            {/* Copyright */}
            <div className="md:col-span-5 flex flex-col justify-start text-white text-sm md:text-[15px] font-medium tracking-wide transition-colors">
              <p className="uppercase">{copyright}</p>
              <p className="text-zinc-400 dark:text-zinc-500 text-xs mt-2 font-normal hidden md:block">
                ENGINEERED FOR MODERN CREATIVE WEB APPLICATIONS
              </p>
            </div>

            {/* Socials Column */}
            <div className="md:col-span-4 flex flex-col gap-2 font-medium uppercase tracking-wide text-sm md:text-[15px]">
              <span className="text-[10px] font-bold tracking-widest text-zinc-450 dark:text-zinc-500 mb-2 block">CONNECT</span>
              {socials.map((social) => (
                <FooterItemLink key={social.label} label={social.label} href={social.href} active={social.active} />
              ))}
            </div>

            {/* Navigation Column */}
            <div className="md:col-span-3 flex flex-col gap-2 font-medium uppercase tracking-wide text-sm md:text-[15px]">
              <span className="text-[10px] font-bold tracking-widest text-zinc-450 dark:text-zinc-500 mb-2 block">SITEMAP</span>
              {links.map((link) => (
                <FooterItemLink key={link.label} label={link.label} href={link.href} active={link.active} />
              ))}
            </div>
            
          </div>
        </motion.div>
      </motion.div>
    </footer>
  );
}

export default function CardFooterDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  
  return (
    <div ref={scrollRef} className="w-full h-full overflow-y-auto no-scrollbar scroll-smooth bg-white dark:bg-[#000000] relative flex flex-col rounded-2xl">
      {/* Scrollable top view context */}
      <div className="flex-shrink-0 w-full min-h-[110%] p-8 sm:p-12 flex flex-col justify-between relative z-10 text-zinc-900 dark:text-white">
        <div className="w-full bg-zinc-50 dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 rounded-3xl p-8 shadow-sm flex justify-between items-center mt-4">
          <div>
            <span className="text-[10px] font-bold tracking-widest text-accent-pro uppercase">Oxygen Showcase</span>
            <h2 className="text-xl sm:text-2xl font-black mt-1">Interactive Scroll Canvas</h2>
          </div>
          <div className="size-10 rounded-full bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center">
            <div className="size-3.5 rounded-full bg-accent-pro animate-pulse" />
          </div>
        </div>

        <div className="my-16 max-w-lg mx-auto text-center flex flex-col items-center justify-center gap-4">
          <div className="size-10 rounded-full border border-zinc-200 dark:border-zinc-800 flex items-center justify-center bg-zinc-50 dark:bg-zinc-900 text-zinc-500 shadow-sm animate-bounce">
            ↓
          </div>
          <div>
            <h3 className="text-lg font-bold">Scroll Down to Reveal</h3>
            <p className="text-sm text-zinc-450 dark:text-zinc-500 mt-1">
              Watch the footer card scale springily and the massive RUNESTUDIOS letters animate letter-by-letter as they enter the screen!
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mb-12">
          <div className="bg-zinc-50/50 dark:bg-zinc-900/40 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-semibold text-accent-pro uppercase">Scale Motion</span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              Card expands from 0.95 to 1.0 based on scroll offset.
            </p>
          </div>
          <div className="bg-zinc-50/50 dark:bg-zinc-900/40 backdrop-blur border border-zinc-200 dark:border-zinc-800 rounded-2xl p-6 shadow-sm">
            <span className="text-xs font-semibold text-accent-pro uppercase">Staggered Entry</span>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
              RUNESTUDIOS letters transition up sequentially on viewport entry.
            </p>
          </div>
        </div>
      </div>

      {/* Render the shared, dynamic Footer component configured for RuneStudios */}
      <Footer 
        title="RUNESTUDIOS"
        copyright="2024 - COPYRIGHT ALL RIGHT RESERVED"
        scrollableRef={scrollRef}
        socials={[
          { label: "Instagram", href: "#" },
          { label: "Twitter", href: "#" },
          { label: "LinkedIn", href: "#" },
          { label: "YouTube", href: "#" },
        ]}
        links={[
          { label: "Home", href: "#", active: true },
          { label: "About", href: "#" },
          { label: "Portfolio (6)", href: "#" },
          { label: "What we do", href: "#" },
          { label: "Contact Us", href: "#" },
        ]}
      />
    </div>
  );
}
