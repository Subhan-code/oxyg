"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

const ROCKET_COLORS = {
  orange: {
    label: "Orange",
    glow: "from-red-600 via-orange-500 to-transparent",
    sidePlume: "from-[#FF3D00] via-[#FF8A00] to-[#FFEB60]",
    centerPlume: "from-[#FF0000] via-[#FF5C00] via-[#FFA200] to-[#FFF8C4]",
    sideShadow: "shadow-[0_0_12px_rgba(255,92,0,0.7)]",
    centerShadow: "shadow-[0_0_18px_rgba(255,61,0,0.9)]",
    accentColor: "#FF5C00"
  },
  blue: {
    label: "Blue",
    glow: "from-blue-600 via-cyan-500 to-transparent",
    sidePlume: "from-[#0055FF] via-[#00CFFF] to-[#E0FFFF]",
    centerPlume: "from-[#0022FF] via-[#0088FF] via-[#00FBFF] to-[#F0FFFF]",
    sideShadow: "shadow-[0_0_12px_rgba(0,191,255,0.7)]",
    centerShadow: "shadow-[0_0_18px_rgba(0,85,255,0.9)]",
    accentColor: "#00CFFF"
  },
  purple: {
    label: "Purple",
    glow: "from-indigo-600 via-pink-500 to-transparent",
    sidePlume: "from-[#7A00FF] via-[#FF00C4] to-[#FFE5F9]",
    centerPlume: "from-[#4F00FF] via-[#A600FF] via-[#FF0088] to-[#FFF0FC]",
    sideShadow: "shadow-[0_0_12px_rgba(255,0,196,0.7)]",
    centerShadow: "shadow-[0_0_18px_rgba(166,0,255,0.9)]",
    accentColor: "#FF00C4"
  },
  green: {
    label: "Green",
    glow: "from-green-600 via-emerald-400 to-transparent",
    sidePlume: "from-[#009E1A] via-[#00FF66] to-[#E6FFE6]",
    centerPlume: "from-[#006E0C] via-[#00D13C] via-[#94FF2B] to-[#F2FFF0]",
    sideShadow: "shadow-[0_0_12px_rgba(0,255,102,0.7)]",
    centerShadow: "shadow-[0_0_18px_rgba(0,209,60,0.9)]",
    accentColor: "#00FF66"
  }
};

interface Bubble {
  id: string;
  text: string;
}

export function SpacedChat() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const [typingIntensity, setTypingIntensity] = useState(0);
  const [activeRockets, setActiveRockets] = useState<{ id: number; x: number }[]>([]);
  const audioCtxRef = useRef<AudioContext | null>(null);

  // Settings states
  const [showSettings, setShowSettings] = useState(false);
  const [glowOpacity, setGlowOpacity] = useState(0.35);
  const [typingIntensityFactor, setTypingIntensityFactor] = useState(0.55);
  const [glowBlur, setGlowBlur] = useState(6);
  const [inputWidth, setInputWidth] = useState(360);
  const [launchBase, setLaunchBase] = useState(85);
  const [rocketDistance, setRocketDistance] = useState(-175);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [rocketOpacity, setRocketOpacity] = useState(0.5);
  const [rocketWidthScale, setRocketWidthScale] = useState(1.0);
  const [rocketBlur, setRocketBlur] = useState(1.0);
  const [rocketIntensity, setRocketIntensity] = useState(1.6);
  const [rocketColor, setRocketColor] = useState<"orange" | "blue" | "purple" | "green">("orange");

  const resetToDefaults = () => {
    setGlowOpacity(0.35);
    setTypingIntensityFactor(0.55);
    setGlowBlur(6);
    setInputWidth(360);
    setLaunchBase(85);
    setRocketDistance(-175);
    setRocketOpacity(0.5);
    setRocketWidthScale(1.0);
    setRocketBlur(1.0);
    setRocketIntensity(1.6);
    setRocketColor("orange");
  };

  // Escape listener for fullscreen
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setIsFullscreen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Faster decay for typingIntensity to keep up with typing speed
  useEffect(() => {
    if (typingIntensity <= 0) return;
    const interval = setInterval(() => {
      setTypingIntensity((prev) => Math.max(0, prev - 0.14));
    }, 35);
    return () => clearInterval(interval);
  }, [typingIntensity]);

  // Audio synthesis helper
  const initAudio = () => {
    if (!audioCtxRef.current) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioCtx) {
        audioCtxRef.current = new AudioCtx();
      }
    }
  };

  const playClickSound = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      const freq = 1300 + Math.random() * 500;
      osc.frequency.setValueAtTime(freq, ctx.currentTime);

      gain.gain.setValueAtTime(0.04, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);

      osc.start();
      osc.stop(ctx.currentTime + 0.04);
    } catch (e) {
      console.warn("Audio Context error:", e);
    }
  };

  const playSubmitSound = () => {
    try {
      initAudio();
      const ctx = audioCtxRef.current;
      if (!ctx) return;
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.type = "sine";
      osc.frequency.setValueAtTime(800, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(1600, ctx.currentTime + 0.15);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.15);

      osc.start();
      osc.stop(ctx.currentTime + 0.15);
    } catch (e) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    playClickSound();
    // Boost typing intensity when typing
    setTypingIntensity((prev) => Math.min(1.5, prev + 0.38));
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const id = Date.now().toString() + Math.random().toString(36).substring(2, 9);
    const newBubble: Bubble = {
      id,
      text: inputValue.trim(),
    };

    setBubbles((prev) => [...prev, newBubble]);
    setInputValue("");
    playSubmitSound();

    // Trigger rocket send effect (3 rockets in total from a single launch pad)
    const rocketId = Date.now();
    setActiveRockets([
      { id: rocketId, x: 0, delay: 0 },
      { id: rocketId + 1, x: 0, delay: 0.15 },
      { id: rocketId + 2, x: 0, delay: 0.3 }
    ] as any);
    setTimeout(() => {
      setActiveRockets([]);
    }, 1500);

    // Auto delete after 4 seconds
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 4000);
  };

  return (
    <div className={isFullscreen ? "fixed inset-0 z-[100] bg-black/90 backdrop-blur-md flex items-center justify-center pointer-events-auto" : ""}>
      {/* Fullscreen Close button overlay */}
      {isFullscreen && (
        <div className="absolute top-6 left-6 text-gray-400 font-medium text-sm text-left select-none pointer-events-none z-10">
          <span className="text-white font-bold tracking-tight block">Isolated Preview Mode</span>
          <span>Press ESC or click settings to configure/exit</span>
        </div>
      )}

      <div 
        className={`${isFullscreen ? "max-w-[500px] min-w-[500px] max-h-[380px] min-h-[380px]" : "w-full min-h-[350px] flex-grow"} rounded-[24px] z-10 relative flex items-center justify-center overflow-hidden bg-[#161A23] border border-white/5 font-sans transition-all duration-300`}
        style={{
          boxShadow: "0 10px 16px -1px rgba(0,0,0,0.3)",
        }}
      >
        {/* Settings gear trigger icon */}
        <button 
          onClick={() => setShowSettings(!showSettings)}
          className="absolute top-4 right-4 z-40 p-2 text-gray-400 hover:text-white bg-white/5 hover:bg-white/10 rounded-full transition-colors cursor-pointer select-none"
          aria-label="Settings"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 256 256">
            <path d="M128,80a48,48,0,1,0,48,48A48.05,48.05,0,0,0,128,80Zm0,80a32,32,0,1,1,32,-32A32,32,0,0,1,128,160Zm112.5,-38.3a12,12,0,0,0,0,-15.4l-15.6,-18.2a1,1,0,0,1,-.2,-1v-9.3a12,12,0,0,0,-6.3,-10.6l-20.7,-11.2a1,1,0,0,1,-.5,-.8L183.1,38.3a12,12,0,0,0,-11.7,-4.9l-23.4,4.2a.9,.9,0,0,1,-.9,-.3l-18.7,-15a12,12,0,0,0,-14.8,0l-18.7,15a.9,.9,0,0,1,-.9,.3l-23.4,-4.2a12,12,0,0,0,-11.7,4.9L44.8,55.5a1,1,0,0,1,-.5,.8L23.6,67.5A12,12,0,0,0,17.3,78.1V87.4a1,1,0,0,1,-.2,1L1.5,106.3a12,12,0,0,0,0,15.4l15.6,18.2a1,1,0,0,1,.2,1v9.3a12,12,0,0,0,6.3,10.6l20.7,11.2a1,1,0,0,1,.5,.8L58.9,217.7a12,12,0,0,0,11.7,4.9l23.4,-4.2a.9,.9,0,0,1,.9,.3l18.7,15a12,12,0,0,0,14.8,0l18.7,-15a.9,.9,0,0,1,.9,-.3l23.4,4.2a12,12,0,0,0,11.7,-4.9l14.1,-17.2a1,1,0,0,1,.5,-.8l20.7,-11.2a12,12,0,0,0,6.3,-10.6v-9.3a1,1,0,0,1,.2,-1Z" />
          </svg>
        </button>

        <div className="w-full flex flex-col gap-2.5 margin-auto">
          <div 
            style={{ width: `${inputWidth}px` }}
            className="relative mx-auto transition-all duration-300"
          >
            
            {/* Bubbles Stack Container */}
            <div className="absolute right-0 bottom-[60px] flex flex-col align-end justify-end gap-2 z-20 pointer-events-none w-full">
              <AnimatePresence initial={false}>
                {bubbles.map((msg) => (
                  <motion.div
                    key={msg.id}
                    initial={{ opacity: 0, y: 15, scale: 0.85, filter: "blur(4px)" }}
                    animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                    exit={{ opacity: 0, y: -20, scale: 0.9, filter: "blur(8px)" }}
                    transition={{ type: "spring", stiffness: 350, damping: 25 }}
                    className="max-w-[260px] bg-[#353943] text-white px-3.5 py-2.5 text-sm font-semibold rounded-[14px_14px_6px] shadow-[rgba(0,0,0,0.44)_0px_10px_20px_-6px] self-end break-all select-none"
                  >
                    <p className="text-white select-none">{msg.text}</p>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Sent Rocket Formation Effect Container */}
            <div className="absolute inset-x-0 bottom-[52px] pointer-events-none z-30 overflow-visible">
              <AnimatePresence>
                {activeRockets.map((rocket) => (
                  <motion.div
                    key={rocket.id}
                    initial={{ y: 20, opacity: 1, scale: 0.8 }}
                    animate={{ 
                      y: rocketDistance, 
                      opacity: [1, 1, 1, 0.7, 0], 
                      scale: [0.8, 1.2, 1.1, 0.8, 0.4] 
                    }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.85, ease: [0.08, 0.82, 0.17, 1], delay: (rocket as any).delay || 0 }}
                    style={{ left: `calc(50% + ${rocket.x}px)` }}
                    className="absolute -translate-x-1/2 flex flex-col items-center"
                  >
                    <div className="relative flex items-end justify-center w-32 h-16">
                      {/* Wide backing fire glow */}
                      <div 
                        style={{
                          transform: `translateX(-50%) scaleX(${rocketWidthScale})`,
                          opacity: rocketOpacity,
                          filter: `blur(${8 * rocketBlur}px)`
                        }}
                        className={`absolute bottom-1 left-1/2 w-20 h-3 bg-gradient-to-t ${ROCKET_COLORS[rocketColor].glow} rounded-full`}
                      />

                      {/* Smoke Particles Dispersing */}
                      <motion.div 
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: -25, y: 25, opacity: 0, scale: 0.1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-2 left-11 w-2.5 h-2.5 rounded-full bg-yellow-400 filter blur-[1px]"
                      />
                      <motion.div 
                        initial={{ x: 0, y: 0, opacity: 1, scale: 1 }}
                        animate={{ x: 25, y: 25, opacity: 0, scale: 0.1 }}
                        transition={{ duration: 0.5, ease: "easeOut" }}
                        className="absolute bottom-2 right-11 w-2.5 h-2.5 rounded-full bg-yellow-400 filter blur-[1px]"
                      />
                      <motion.div 
                        initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
                        animate={{ x: -12, y: 30, opacity: 0, scale: 0.1 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.02 }}
                        className="absolute bottom-1 left-13 w-2 h-2 rounded-full bg-red-500 filter blur-[0.5px]"
                      />
                      <motion.div 
                        initial={{ x: 0, y: 0, opacity: 0.8, scale: 1 }}
                        animate={{ x: 12, y: 30, opacity: 0, scale: 0.1 }}
                        transition={{ duration: 0.4, ease: "easeOut", delay: 0.02 }}
                        className="absolute bottom-1 right-13 w-2 h-2 rounded-full bg-red-500 filter blur-[0.5px]"
                      />

                      {/* 3 Thruster Plumes side-by-side (No Emojis, Wide & Short) */}
                      <div 
                        style={{ 
                          opacity: rocketOpacity,
                          transform: `scaleX(${rocketWidthScale})`
                        }}
                        className="flex items-end justify-center gap-2 z-10 select-none pb-1 origin-center"
                      >
                        {/* Left Plume */}
                        <motion.div 
                          animate={{ 
                            scaleY: [1 * rocketIntensity, 1.25 * rocketIntensity, 1 * rocketIntensity], 
                            scaleX: [1, 1.15, 1] 
                          }}
                          transition={{ repeat: Infinity, duration: 0.1 }}
                          style={{ 
                            filter: `blur(${0.5 * rocketBlur}px)`,
                            boxShadow: ROCKET_COLORS[rocketColor].sideShadow
                          }}
                          className={`w-8 h-2 bg-gradient-to-t ${ROCKET_COLORS[rocketColor].sidePlume} rounded-t-[2px] rounded-b-[8px] transform -rotate-12`}
                        />
                        {/* Center Plume (Large & Wide) */}
                        <motion.div 
                          animate={{ 
                            scaleY: [1 * rocketIntensity, 1.35 * rocketIntensity, 1 * rocketIntensity], 
                            scaleX: [1, 1.2, 1] 
                          }}
                          transition={{ repeat: Infinity, duration: 0.07 }}
                          style={{ 
                            filter: `blur(${1.0 * rocketBlur}px)`,
                            boxShadow: ROCKET_COLORS[rocketColor].centerShadow
                          }}
                          className={`w-12 h-3 bg-gradient-to-t ${ROCKET_COLORS[rocketColor].centerPlume} rounded-t-[3px] rounded-b-[10px]`}
                        />
                        {/* Right Plume */}
                        <motion.div 
                          animate={{ 
                            scaleY: [1 * rocketIntensity, 1.25 * rocketIntensity, 1 * rocketIntensity], 
                            scaleX: [1, 1.15, 1] 
                          }}
                          transition={{ repeat: Infinity, duration: 0.1, delay: 0.03 }}
                          style={{ 
                            filter: `blur(${0.5 * rocketBlur}px)`,
                            boxShadow: ROCKET_COLORS[rocketColor].sideShadow
                          }}
                          className={`w-8 h-2 bg-gradient-to-t ${ROCKET_COLORS[rocketColor].sidePlume} rounded-t-[2px] rounded-b-[8px] transform rotate-12`}
                        />
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Interactive Glow Input Container */}
            <div 
              style={{
                boxShadow: isFocused 
                  ? `rgba(0, 0, 0, 0.4) 0px 4px 12px -2px, rgba(255, 255, 255, 0.1) 0px 0px 0px 2px inset` 
                  : `rgba(0, 0, 0, 0.314) 0px 2px 8px -2px, rgba(255, 255, 255, 0.05) 0px 0px 0px 1px inset`,
              }}
              className="h-[52px] rounded-[18px] bg-[#2a2f39] transition-all duration-300 relative flex items-center pl-4 pr-[52px] text-gray-200 overflow-hidden"
            >
              <input 
                placeholder="Type message" 
                value={inputValue}
                onChange={handleInputChange}
                onFocus={() => {
                  initAudio();
                  setIsFocused(true);
                }}
                onBlur={() => setIsFocused(false)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    handleSend();
                  }
                }}
                className="w-full h-full bg-transparent border-none outline-none text-[#F3F4F6] text-[16px] font-medium placeholder-gray-500 caret-[#6C81FF] focus:ring-0 p-0 z-10"
              />

              {/* Glowing background templates - sliding and scaling reactively and FAST based on typingIntensity */}
              <motion.div 
                animate={{
                  y: isFocused ? 0 : 40,
                  opacity: isFocused ? (glowOpacity + typingIntensity * typingIntensityFactor) : (glowOpacity * 0.6 + typingIntensity * typingIntensityFactor * 0.5),
                  scale: isFocused ? (1 + typingIntensity * 0.25) : 1
                }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                style={{
                  borderRadius: "12px",
                  backgroundImage: "radial-gradient(circle, rgb(159, 171, 255) 0%, rgba(40, 64, 183, 0) 30%)",
                  filter: `blur(${glowBlur}px)`
                }}
                className="absolute top-[45px] left-[-100%] w-[300%] h-[75%] z-1 pointer-events-none"
              />

              <motion.div 
                animate={{
                  y: isFocused ? 0 : 40,
                  opacity: isFocused ? (glowOpacity + typingIntensity * typingIntensityFactor) : (glowOpacity * 0.6 + typingIntensity * typingIntensityFactor * 0.5),
                  scale: isFocused ? (1 + typingIntensity * 0.25) : 1
                }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                style={{
                  borderRadius: "12px",
                  backgroundImage: "radial-gradient(circle, rgb(159, 171, 255) 0%, rgba(40, 64, 183, 0) 30%)",
                  filter: `blur(${glowBlur}px)`
                }}
                className="absolute top-[45px] left-[-100%] w-[300%] h-[75%] z-1 pointer-events-none"
              />

              <motion.div 
                animate={{
                  x: isFocused ? -60 : -200,
                  y: isFocused ? 0 : 40,
                  opacity: isFocused ? (glowOpacity + typingIntensity * typingIntensityFactor * 1.1) : (glowOpacity * 0.6 + typingIntensity * typingIntensityFactor * 0.6),
                  scale: isFocused ? (1 + typingIntensity * 0.3) : 1
                }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                style={{
                  borderRadius: "12px",
                  backgroundImage: "radial-gradient(circle, rgb(159, 171, 255) 0%, rgba(40, 64, 183, 0) 30%)",
                  filter: `blur(${glowBlur - 1}px)`
                }}
                className="absolute top-[45px] left-0 w-[250%] h-[42%] z-1 pointer-events-none"
              >
                <div className="w-[57%] h-[16px] bg-[#86bbff] rounded-full opacity-80" />
              </motion.div>

              <motion.div 
                animate={{
                  x: isFocused ? 60 : 200,
                  y: isFocused ? 0 : 40,
                  opacity: isFocused ? (glowOpacity + typingIntensity * typingIntensityFactor * 1.1) : (glowOpacity * 0.6 + typingIntensity * typingIntensityFactor * 0.6),
                  scale: isFocused ? (1 + typingIntensity * 0.3) : 1
                }}
                transition={{ type: "spring", stiffness: 450, damping: 18 }}
                style={{
                  borderRadius: "12px",
                  backgroundImage: "radial-gradient(circle, rgb(197, 159, 255) 0%, rgba(40, 64, 183, 0) 30%)",
                  filter: `blur(${glowBlur - 1}px)`
                }}
                className="absolute top-[45px] right-0 w-[250%] h-[42%] z-1 pointer-events-none"
              >
                <div className="ml-auto w-[57%] h-[16px] bg-[#A970FF] rounded-full opacity-80" />
              </motion.div>

              {/* Glossy top edge highlight */}
              <div 
                style={{
                  backgroundImage: "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 77%)",
                }}
                className="absolute top-[2px] left-[3px] w-[calc(100%-6px)] h-[30%] z-1 rounded-[18px_18px_0_0] pointer-events-none opacity-5 will-change-opacity transform scale-y-[0.9]"
              />

              {/* Tactile Send Button */}
              <motion.button 
                onClick={handleSend}
                disabled={!inputValue.trim()}
                whileTap={inputValue.trim() ? { scale: 0.92 } : {}}
                className={`absolute right-2.5 w-[36px] h-[36px] rounded-[12px] flex items-center justify-center transition-all duration-300 z-10 cursor-pointer ${
                  inputValue.trim()
                    ? "bg-white/15 text-[#6C81FF] hover:bg-white/25 active:bg-white/30"
                    : "bg-white/5 text-gray-500 cursor-not-allowed"
                }`}
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  className={`w-[20px] h-[20px] transition-transform duration-300 ${
                    inputValue.trim() ? "rotate-0 text-[#6C81FF]" : "-rotate-90 text-gray-400"
                  }`}
                >
                  <path 
                    fillRule="evenodd" 
                    clipRule="evenodd" 
                    d="M12 23C18.0751 23 23 18.0751 23 12C23 5.92487 18.0751 1 12 1C5.92487 0.999999 1 5.92487 1 12C0.999999 18.0751 5.92487 23 12 23ZM12 17C11.4477 17 11 16.5523 11 16V10.4142L8.70711 12.7071C8.31658 13.0976 7.68342 13.0976 7.29289 12.7071C6.90237 12.3166 6.90237 11.6834 7.29289 11.2929L11.2929 7.29289C11.6834 6.90237 12.3166 6.90237 12.7071 7.29289L16.7071 11.2929C17.0976 11.6834 17.0976 12.3166 16.7071 12.7071C16.3166 13.0976 15.6834 13.0976 15.2929 12.7071L13 10.4142V16C13 16.5523 12.5523 17 12 17Z" 
                    fill="currentColor"
                  />
                </svg>
              </motion.button>
            </div>
          </div>
        </div>

        {/* Dynamic sliding settings panel inside the card */}
        <AnimatePresence>
          {showSettings && (
            <motion.div 
              data-lenis-prevent
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="absolute inset-0 bg-[#0f111a]/98 z-55 flex flex-col h-full overflow-hidden"
            >
              {/* Sticky Header */}
              <div className="flex justify-between items-center px-5 pt-4 pb-2 border-b border-white/5 bg-[#0f111a]/98 shrink-0">
                <h4 className="text-[12px] font-extrabold text-white tracking-widest uppercase">Chat & Rocket Settings</h4>
                <button 
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-white cursor-pointer p-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              {/* Scrollable Content Container */}
              <div className="flex-1 overflow-y-auto px-5 py-4 flex flex-col gap-4 no-scrollbar">
                {/* Input / Glow Sliders */}
                <div className="flex flex-col gap-3.5 text-left">
                  <span className="text-[10px] font-bold text-[#6c81ff] uppercase tracking-wider">Input & Glow Controls</span>
                  
                  {/* Opacity slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Glow Opacity</span>
                      <span className="text-white">{glowOpacity}</span>
                    </div>
                    <input 
                      type="range" min="0.1" max="0.8" step="0.05"
                      value={glowOpacity} onChange={(e) => setGlowOpacity(parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#6C81FF]"
                    />
                  </div>

                  {/* Intensity slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Typing Intensity Factor</span>
                      <span className="text-white">{typingIntensityFactor}</span>
                    </div>
                    <input 
                      type="range" min="0.2" max="2.0" step="0.05"
                      value={typingIntensityFactor} onChange={(e) => setTypingIntensityFactor(parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#6C81FF]"
                    />
                  </div>

                  {/* Blur slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Glow Blur</span>
                      <span className="text-white">{glowBlur}px</span>
                    </div>
                    <input 
                      type="range" min="2" max="24" step="1"
                      value={glowBlur} onChange={(e) => setGlowBlur(parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#6C81FF]"
                    />
                  </div>

                  {/* Input Width slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Input Width</span>
                      <span className="text-white">{inputWidth}px</span>
                    </div>
                    <input 
                      type="range" min="200" max="440" step="5"
                      value={inputWidth} onChange={(e) => setInputWidth(parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#6C81FF]"
                    />
                  </div>
                </div>

                <div className="border-t border-white/5 my-1" />

                {/* Rocket Controls Section */}
                <div className="flex flex-col gap-3.5 text-left">
                  <span className="text-[10px] font-bold text-[#FF5C00] uppercase tracking-wider">Rocket Effect Controls</span>

                  {/* Rocket Plume Color Selector */}
                  <div>
                    <span className="block text-[11px] font-bold text-gray-400 mb-2 select-none">Plume Color Theme</span>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(ROCKET_COLORS).map(([key, config]) => (
                        <button
                          key={key}
                          onClick={() => setRocketColor(key as any)}
                          style={{ borderColor: rocketColor === key ? config.accentColor : "transparent" }}
                          className={`h-8 rounded-xl text-[10px] font-bold border-2 transition-all flex items-center justify-center gap-1.5 cursor-pointer bg-white/5 hover:bg-white/10 ${
                            rocketColor === key ? "text-white bg-white/15" : "text-gray-400"
                          }`}
                        >
                          <span 
                            style={{ 
                              backgroundColor: key === "orange" ? "#FF5C00" : key === "blue" ? "#00CFFF" : key === "purple" ? "#FF00C4" : "#00FF66" 
                            }} 
                            className="w-2 h-2 rounded-full" 
                          />
                          <span>{config.label}</span>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Rocket Intensity slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Rocket Plume Intensity</span>
                      <span className="text-white">{rocketIntensity}x</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="2.0" step="0.1"
                      value={rocketIntensity} onChange={(e) => setRocketIntensity(parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#FF5C00]"
                    />
                  </div>

                  {/* Rocket Plume Width Scale slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Rocket Plume Width</span>
                      <span className="text-white">{rocketWidthScale}x</span>
                    </div>
                    <input 
                      type="range" min="0.5" max="2.0" step="0.1"
                      value={rocketWidthScale} onChange={(e) => setRocketWidthScale(parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#FF5C00]"
                    />
                  </div>

                  {/* Launch Base Width slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Launch Base Spacing</span>
                      <span className="text-white">{launchBase}px</span>
                    </div>
                    <input 
                      type="range" min="30" max="185" step="5"
                      value={launchBase} onChange={(e) => setLaunchBase(parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#FF5C00]"
                    />
                  </div>

                  {/* Rocket Plume Distance slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Plume Travel Distance</span>
                      <span className="text-white">{Math.abs(rocketDistance)}px</span>
                    </div>
                    <input 
                      type="range" min="80" max="280" step="10"
                      value={Math.abs(rocketDistance)} onChange={(e) => setRocketDistance(-parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#FF5C00]"
                    />
                  </div>

                  {/* Rocket Plume Opacity slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Plume Opacity</span>
                      <span className="text-white">{rocketOpacity}</span>
                    </div>
                    <input 
                      type="range" min="0.2" max="1.0" step="0.05"
                      value={rocketOpacity} onChange={(e) => setRocketOpacity(parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#FF5C00]"
                    />
                  </div>

                  {/* Rocket Plume Blur slider */}
                  <div>
                    <div className="flex justify-between text-[11px] font-bold text-gray-400 mb-1 select-none">
                      <span>Plume Blur</span>
                      <span className="text-white">{rocketBlur}px</span>
                    </div>
                    <input 
                      type="range" min="0" max="8" step="0.5"
                      value={rocketBlur} onChange={(e) => setRocketBlur(parseFloat(e.target.value))}
                      className="w-full h-1 bg-gray-800 rounded appearance-none cursor-pointer accent-[#FF5C00]"
                    />
                  </div>
                </div>
              </div>

              {/* Sticky Footer */}
              <div className="flex gap-2 p-5 border-t border-white/5 bg-[#0f111a]/98 shrink-0">
                <button 
                  onClick={resetToDefaults}
                  className="flex-grow py-2 rounded-xl text-[11px] font-bold bg-white/5 hover:bg-white/10 text-gray-300 hover:text-white transition-colors cursor-pointer text-center select-none"
                >
                  Reset to Default
                </button>
                <button 
                  onClick={() => {
                    setIsFullscreen(!isFullscreen);
                    setShowSettings(false);
                  }}
                  className="flex-grow py-2 rounded-xl text-[11px] font-bold bg-[#6C81FF] hover:bg-[#596ee6] text-white transition-colors cursor-pointer text-center select-none"
                >
                  {isFullscreen ? "Exit Fullscreen" : "Fullscreen Mode"}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
