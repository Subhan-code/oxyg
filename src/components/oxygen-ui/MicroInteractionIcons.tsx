"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

// 1. Sidebar
export const AppIcon1 = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <motion.button onClick={() => setIsOpen(!isOpen)} whileHover="hover" whileTap="hover" className="relative flex cursor-pointer items-center justify-center outline-none">
      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.32698 2.63803C0 3.27976 0 4.11984 0 5.8V10.2C0 11.8802 0 12.7202 0.32698 13.362C0.614601 13.9265 1.07354 14.3854 1.63803 14.673C2.27976 15 3.11984 15 4.8 15H11.2C12.8802 15 13.7202 15 14.362 14.673C14.9265 14.3854 15.3854 13.9265 15.673 13.362C16 12.7202 16 11.8802 16 10.2V5.8C16 4.11984 16 3.27976 15.673 2.63803C15.3854 2.07354 14.9265 1.6146 14.362 1.32698C13.7202 1 12.8802 1 11.2 1H4.8C3.11984 1 2.27976 1 1.63803 1.32698C1.07354 1.6146 0.614601 2.07354 0.32698 2.63803Z" fill="currentColor"></path>
      </svg>
      <motion.div 
        variants={{ hover: { width: 5, opacity: 1 } }}
        animate={{ width: isOpen ? 5 : 2.25, opacity: isOpen ? 1 : 0.5 }}
        transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
        style={{ transformOrigin: "left" }}
        className="bg-black absolute left-[4.5px] h-[15px] rounded-[1.5px] dark:bg-white" 
      />
    </motion.button>
  );
};

// 2. Code 
export const AppIcon2 = () => {
  return (
    <motion.button whileHover="hover" whileTap="hover" className="relative flex cursor-pointer items-center justify-center outline-none overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.path d="m18 16 4-4-4-4" variants={{ hover: { x: 3, opacity: 0.8 } }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} />
        <motion.path d="m6 8-4 4 4 4" variants={{ hover: { x: -3, opacity: 0.8 } }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} />
        <path d="m14.5 4-5 16" />
        <motion.path 
          d="m14.5 4-5 16" 
          initial={{ x: 5, y: -22, opacity: 0 }}
          variants={{ hover: { x: 0, y: 0, opacity: 1 } }} 
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }} 
          className="text-white/30"
        />
      </svg>
    </motion.button>
  );
};

// 3. Lock
export const AppIcon3 = () => {
  const [locked, setLocked] = React.useState(true);
  return (
    <motion.button onClick={() => setLocked(!locked)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none" style={{ transformStyle: "preserve-3d", perspective: "500px" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" overflow="visible" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.path 
          d="M7 11V7a5 5 0 0 1 10 0v12" 
          variants={{ hover: { y: -3, rotateX: 10 } }}
          animate={{ y: locked ? 0 : -4, rotateY: locked ? 0 : -20 }}
          transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
          style={{ transformOrigin: "100% 50%" }}
        />
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="currentColor" />
      </svg>
    </motion.button>
  );
};

// 4. Log out
export const AppIcon4 = () => {
  const [loggedOut, setLoggedOut] = React.useState(false);
  return (
    <motion.button 
      onClick={() => { setLoggedOut(true); setTimeout(() => setLoggedOut(false), 1000); }}
      whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.g variants={{ hover: { x: 4 } }} animate={loggedOut ? { x: [0, 10, -10, 0], opacity: [1, 0, 0, 1] } : {}} transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}>
          <path d="m10 17 5-5-5-5"></path>
          <path d="M15 12H3"></path>
        </motion.g>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      </svg>
    </motion.button>
  );
};

// 5. Badge
export const AppIcon5 = () => {
  const [flips, setFlips] = React.useState(0);
  return (
    <motion.button onClick={() => setFlips(f => f + 1)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"
        variants={{ hover: { rotateY: 180, scale: 1.1 } }} 
        animate={{ rotateY: flips * 360 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
        <path d="M12 18V6"></path>
      </motion.svg>
    </motion.button>
  );
};

// 6. Copy
export const AppIcon6 = () => {
  const [copied, setCopied] = React.useState(false);
  return (
    <motion.button 
      onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      whileHover="hover" whileTap="hover"
      className="relative flex cursor-pointer items-center justify-center outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <motion.path 
          d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
          animate={{ x: copied ? 4 : 0, y: copied ? 4 : 0, opacity: copied ? 0 : 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
          variants={{ hover: { opacity: 1, pathLength: 1 } }}
        />
      </svg>
    </motion.button>
  );
};

// 7. Audio
export const AppIcon7 = () => {
  const bars = [3, 6, 9, 12, 10, 6, 8, 4, 3];
  const [playing, setPlaying] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const isAnimated = playing || hovered;
  return (
    <motion.button 
      onClick={() => setPlaying(!playing)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.9 }}
      className="relative flex gap-1 cursor-pointer items-center justify-center outline-none w-6 h-6 h-[24px]"
    >
      {bars.map((v, i) => (
        <motion.div 
          key={i} className={cn("bg-current w-[2px] rounded-full", playing ? "bg-current" : "")} style={{ height: 3 }}
          animate={{ height: isAnimated ? [3, Math.max(3, v), 3] : 3 }}
          transition={isAnimated ? { repeat: Infinity, duration: 1.2, delay: i * 0.1, ease: "easeInOut" } : { duration: 0.2 }}
        />
      ))}
    </motion.button>
  );
};

// 8. Plus Minus
export const AppIcon8 = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.button 
      onClick={() => setOpen(!open)}
      whileTap={{ scale: 0.9 }}
      className="relative flex cursor-pointer items-center justify-center outline-none w-6 h-6"
    >
      <motion.svg animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path><path d="M12 5v14"></path>
      </motion.svg>
      <motion.svg animate={{ rotate: open ? 0 : -90, opacity: open ? 1 : 0 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path>
      </motion.svg>
    </motion.button>
  );
};

// 9. Menu Sort
export const AppIcon9 = () => {
  return (
    <motion.button whileHover="hover" whileTap="hover" className="relative flex flex-col items-end justify-center gap-[4px] outline-none w-6 h-6">
      <motion.span className="bg-current h-[2px] w-5 rounded-full" variants={{ hover: { width: 14 } }} transition={{ type: "spring", bounce: 0.6, duration: 0.5 }} />
      <motion.span className="bg-current h-[2px] w-6 rounded-full" variants={{ hover: { width: 24 } }} transition={{ type: "spring", bounce: 0.6, duration: 0.5, delay: 0.05 }} />
      <motion.span className="bg-current h-[2px] w-4 rounded-full" variants={{ hover: { width: 16 } }} transition={{ type: "spring", bounce: 0.6, duration: 0.5, delay: 0.1 }} />
    </motion.button>
  );
};

// 10. Chevron
export const AppIcon10 = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.button onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none w-6 h-6">
      <motion.svg animate={{ rotate: open ? 180 : 0, opacity: open ? 0 : 1 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></motion.svg>
      <motion.svg animate={{ rotate: open ? 0 : -180, opacity: open ? 1 : 0 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"></path></motion.svg>
    </motion.button>
  );
};

// 11. Triangle Alert
export const AppIcon11 = () => {
  const [clicks, setClicks] = React.useState(0);
  return (
    <motion.button onClick={() => setClicks(c => c + 1)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg 
        variants={{ hover: { x: [0, -3, 3, -3, 3, 0], scale: 1.1 } }} 
        animate={clicks > 0 ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>
      </motion.svg>
    </motion.button>
  );
};

// 12. Globe
export const AppIcon12 = () => {
  const [fast, setFast] = React.useState(false);
  return (
    <motion.button onClick={() => setFast(!fast)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg variants={{ hover: { scale: 1.1 } }} animate={{ rotate: 360 }} transition={{ duration: fast ? 1.5 : 10, ease: "linear", repeat: Infinity }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>
      </motion.svg>
    </motion.button>
  );
};

// 13. Paperclip
export const AppIcon13 = () => {
  const [attached, setAttached] = React.useState(false);
  return (
    <motion.button onClick={() => setAttached(!attached)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-6 transition-colors duration-300", attached ? "text-current" : "")}>
        <motion.path 
          variants={{ hover: { pathLength: [0, 1], opacity: [0, 1] } }} 
          animate={attached ? { pathLength: 1, strokeWidth: 3 } : { pathLength: 1, strokeWidth: 2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" 
        />
      </motion.svg>
    </motion.button>
  );
};

// 14. Trash
export const AppIcon14 = () => {
  const [deleted, setDeleted] = React.useState(false);
  return (
    <motion.button 
      whileHover="hover" whileTap={{ scale: 0.9 }} 
      onClick={() => {
        setDeleted(true);
        setTimeout(() => setDeleted(false), 800);
      }}
      className="relative flex cursor-pointer items-center justify-center outline-none group text-current"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" overflow="visible" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.path 
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
          animate={deleted ? { scaleY: [1, 1.1, 1], y: [0, -2, 0] } : {}}
          transition={{ duration: 0.3 }}
        />
        <motion.g 
          variants={{ hover: { rotate: -15, y: -2, x: -1 } }} 
          animate={deleted ? { rotate: -45, y: -4, x: -2 } : {}}
          style={{ transformOrigin: "bottom right" }} 
          transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
        >
          <path d="M3 6h18"></path>
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </motion.g>
      </svg>
    </motion.button>
  );
};

// 15. Send
export const AppIcon15 = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <motion.button 
      whileHover="hover" 
      onClick={() => {
        if (sent) return;
        setSent(true);
        setTimeout(() => setSent(false), 1000);
      }}
      whileTap={{ scale: 0.9 }} 
      className="relative flex cursor-pointer items-center justify-center outline-none overflow-hidden text-current w-8 h-8"
    >
      <motion.div animate={sent ? { x: [0, 20, -24, 0], y: [0, -20, 24, 0], opacity: [1, 0, 0, 1] } : {}} transition={{ duration: 0.8, ease: "easeInOut", times: [0, 0.4, 0.41, 1] }}>
        <motion.svg variants={{ hover: { x: 3, y: -3 } }} transition={{ duration: 0.3 }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"></path>
          <path d="M6 12h16"></path>
        </motion.svg>
      </motion.div>
    </motion.button>
  );
};

// 16. Spinner (Custom CSS animation based on screenshot)
export const AppIcon16 = () => {
  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <div className="relative flex items-center justify-center w-6 h-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-md bg-current w-[15%] h-[6%]"
            style={{
              transform: `rotate(${i * 30}deg) translate(146%)`,
              animation: `spinner-fade-icon 1.2s linear ${i * 0.1 - 1.2}s infinite`
            }}
          />
        ))}
        <style>{`
          @keyframes spinner-fade-icon { 0% { opacity: 1; } 100% { opacity: 0.15; } }
        `}</style>
      </div>
    </motion.button>
  );
};

// 17. Bell Mute
export const AppIcon17 = () => {
  const [muted, setMuted] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);
  return (
    <motion.button onClick={() => { setMuted(!muted); setClicks(c => c + 1); }} whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none overflow-hidden group">
      <div className="relative flex items-center justify-center w-6 h-6">
        <motion.svg key={clicks} animate={{ rotate: [-10, 10, -10, 10, 0] }} transition={{ duration: 0.5 }} width="20" height="22" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.17969 13.3125H13.5625C14.2969 13.3125 14.7422 12.9375 14.7422 12.3672C14.7422 11.5859 13.9453 10.8828 13.2734 10.1875C12.7578 9.64844 12.6172 8.53906 12.5547 7.64062C12.5 4.64062 11.7031 2.57812 9.625 1.82812C9.32812 0.804688 8.52344 0 7.36719 0C6.21875 0 5.40625 0.804688 5.11719 1.82812C3.03906 2.57812 2.24219 4.64062 2.1875 7.64062C2.125 8.53906 1.98438 9.64844 1.46875 10.1875C0.789062 10.8828 0 11.5859 0 12.3672C0 12.9375 0.4375 13.3125 1.17969 13.3125ZM7.36719 16.4453C8.69531 16.4453 9.66406 15.4766 9.76562 14.3828H4.97656C5.07812 15.4766 6.04688 16.4453 7.36719 16.4453Z" fill="currentColor"></path>
        </motion.svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center transform -rotate-[40deg] pointer-events-none"
          animate={{ height: muted ? "100%" : "0%" }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
        >
          <div className="bg-background flex h-[120%] w-[3px] items-center justify-center rounded-full mt-1 border border-border">
            <div className="bg-foreground h-full w-[1.5px] rounded-full" />
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
};


