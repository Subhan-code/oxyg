"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

interface Message {
  id: string;
  text: string;
  isSender: boolean;
}

export function SpacedChat() {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", text: "Welcome to Aconiti! 🔉 Turn sound ON", isSender: false },
    { id: "2", text: "Type below to hear the clicks...", isSender: false }
  ]);
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
      // Slightly randomize pitch to make it sound mechanical and dynamic
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

  const playPopSound = () => {
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
      osc.frequency.setValueAtTime(600, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(300, ctx.currentTime + 0.2);

      gain.gain.setValueAtTime(0.05, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.2);

      osc.start();
      osc.stop(ctx.currentTime + 0.2);
    } catch (e) {}
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    playClickSound();
  };

  const handleSend = () => {
    if (!inputValue.trim()) return;

    const newMsg: Message = {
      id: Date.now().toString(),
      text: inputValue.trim(),
      isSender: true,
    };

    setMessages((prev) => [...prev, newMsg]);
    setInputValue("");
    playSubmitSound();

    // Trigger mock automated reply
    setTimeout(() => {
      const replyMsg: Message = {
        id: (Date.now() + 1).toString(),
        text: "Nice clicky sounds, right? Click inputs feel tactile!",
        isSender: false,
      };
      setMessages((prev) => [...prev, replyMsg]);
      playPopSound();
    }, 1000);
  };

  return (
    <div className="w-[412px] h-[350px] rounded-[28px] bg-[#161A23] p-6 relative flex flex-col justify-between overflow-hidden border border-white/5 shadow-2xl">
      <div className="flex-1 overflow-y-auto no-scrollbar mb-4 flex flex-col gap-3 pr-1">
        <AnimatePresence initial={false}>
          {messages.map((msg) => (
            <motion.div
              key={msg.id}
              initial={{ opacity: 0, y: 10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className={`flex w-full ${msg.isSender ? "justify-end" : "justify-start"}`}
            >
              <div
                className={`max-w-[75%] rounded-[18px] px-4 py-2 text-sm leading-relaxed ${
                  msg.isSender
                    ? "bg-[#6C81FF] text-white rounded-br-[4px]"
                    : "bg-white/10 text-neutral-200 rounded-bl-[4px]"
                }`}
              >
                {msg.text}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      <div className="relative h-12 flex items-center bg-[#1d2230] rounded-xl px-4 border border-white/5 focus-within:border-white/10 transition-colors">
        <input
          type="text"
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
          className="w-full h-full bg-transparent border-none outline-none text-[#F3F4F6] text-[14px] font-medium placeholder-[#6B7280] caret-[#6C81FF] relative z-10"
        />

        <button
          onClick={handleSend}
          disabled={!inputValue.trim()}
          className={`absolute right-2.5 w-[32px] h-[32px] rounded-[10px] flex items-center justify-center transition-all duration-200 z-10 cursor-pointer ${
            inputValue.trim()
              ? "bg-[#6C81FF] text-white hover:bg-[#6c81ff]/90 active:scale-95"
              : "bg-white/[0.03] text-[#6B7280] cursor-not-allowed"
          }`}
        >
          →
        </button>
      </div>
    </div>
  );
}
