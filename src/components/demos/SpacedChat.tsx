"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Bubble {
  id: string;
  text: string;
}

export function SpacedChat() {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);

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

    // Auto delete after 4 seconds
    setTimeout(() => {
      setBubbles((prev) => prev.filter((b) => b.id !== id));
    }, 4000);
  };

  return (
    <div 
      className="max-w-[412px] min-w-[412px] max-h-[312px] min-h-[312px] rounded-[24px] z-10 relative flex items-center justify-center overflow-hidden bg-[#161A23] border border-white/5 font-sans"
      style={{
        boxShadow: "0 10px 16px -1px rgba(0,0,0,0.3), 0 0 60px 20px rgba(16,115,255,0.25)",
      }}
    >
      <div className="w-full flex flex-col gap-2.5 margin-auto">
        <div className="relative min-w-[272px] max-w-[272px] mx-auto">
          
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

          {/* Interactive Glow Input Container */}
          <div 
            style={{
              boxShadow: isFocused 
                ? "rgba(0, 0, 0, 0.4) 0px 4px 12px -2px, rgba(108, 129, 255, 0.25) 0px 0px 0px 2px inset" 
                : "rgba(0, 0, 0, 0.314) 0px 2px 8px -2px, rgba(172, 195, 255, 0.125) 0px 0px 0px 1px inset",
            }}
            className="w-[272px] h-[52px] rounded-[18px] bg-[#2a2f39] transition-all duration-300 relative flex items-center pl-4 pr-[52px] text-gray-200 overflow-hidden"
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
              className="w-full h-full bg-transparent border-none outline-none text-[#F3F4F6] text-[16px] font-medium placeholder-gray-500 caret-[#6C81FF] focus:ring-0 p-0"
            />

            {/* Glowing background templates - sliding reactively based on focus */}
            <motion.div 
              animate={{
                y: isFocused ? 0 : 40,
                opacity: isFocused ? 0.35 : 0.22
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                borderRadius: "12px",
                backgroundImage: "radial-gradient(circle, rgb(159, 171, 255) 0%, rgba(40, 64, 183, 0) 30%)",
              }}
              className="absolute top-[45px] left-[-100%] w-[300%] h-[75%] z-1 filter blur-[6px] pointer-events-none"
            />

            <motion.div 
              animate={{
                y: isFocused ? 0 : 40,
                opacity: isFocused ? 0.35 : 0.22
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                borderRadius: "12px",
                backgroundImage: "radial-gradient(circle, rgb(159, 171, 255) 0%, rgba(40, 64, 183, 0) 30%)",
              }}
              className="absolute top-[45px] left-[-100%] w-[300%] h-[75%] z-1 filter blur-[6px] pointer-events-none"
            />

            <motion.div 
              animate={{
                x: isFocused ? -60 : -200,
                y: isFocused ? 0 : 40,
                opacity: isFocused ? 0.35 : 0.22
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                borderRadius: "12px",
                backgroundImage: "radial-gradient(circle, rgb(159, 171, 255) 0%, rgba(40, 64, 183, 0) 30%)",
              }}
              className="absolute top-[45px] left-0 w-[250%] h-[42%] z-1 filter blur-[5px] pointer-events-none"
            >
              <div className="w-[57%] h-[16px] bg-[#86bbff] rounded-full opacity-80" />
            </motion.div>

            <motion.div 
              animate={{
                x: isFocused ? 60 : 200,
                y: isFocused ? 0 : 40,
                opacity: isFocused ? 0.35 : 0.22
              }}
              transition={{ type: "spring", stiffness: 200, damping: 20 }}
              style={{
                borderRadius: "12px",
                backgroundImage: "radial-gradient(circle, rgb(197, 159, 255) 0%, rgba(40, 64, 183, 0) 30%)",
              }}
              className="absolute top-[45px] right-0 w-[250%] h-[42%] z-1 filter blur-[5px] pointer-events-none"
            >
              <div className="ml-auto w-[57%] h-[16px] bg-[#A970FF] rounded-full opacity-80" />
            </motion.div>

            {/* Glossy top edge highlight */}
            <div 
              style={{
                backgroundImages: "linear-gradient(rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 77%)",
              }}
              className="absolute top-[2px] left-[3px] w-[calc(100%-6px)] h-[30%] z-1 border-radius-[18px_18px_0_0] pointer-events-none opacity-5 will-change-opacity transform scale-y-[0.9]"
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
    </div>
  );
}
