"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface Preset {
  id: number;
  name: string;
  description: string;
}

const PRESETS: Preset[] = [
  { id: 1, name: "Bending Wave", description: "Middle letters offset vertically based on velocity" },
  { id: 2, name: "Rotate & Scale", description: "Letters rotate and scale dynamically from the center" },
  { id: 3, name: "Vertical Stretch", description: "Words stretch vertically while images shrink" },
  { id: 4, name: "Warp Rotation", description: "Letters rotate along Z-axis while bending vertically" },
  { id: 5, name: "Cascading Scale", description: "Letters scale and cascade offset down" }
];

const SECTIONS = [
  { title: "Persepolis", img: "/grid/1.webp", desc: "Capital of the Achaemenid Empire" },
  { title: "Babylonia", img: "/grid/2.webp", desc: "Ancient Akkadian-speaking state" },
  { title: "Diodorus", img: "/grid/3.webp", desc: "Ancient Greek historian" },
  { title: "Zoroastrian", img: "/grid/4.webp", desc: "One of the world's oldest religions" },
  { title: "Ecbatana", img: "/grid/5.webp", desc: "Ancient city in Media" }
];

const mapRange = (val: number, inMin: number, inMax: number, outMin: number, outMax: number) => {
  const mapped = ((val - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  return Math.max(Math.min(mapped, Math.max(outMin, outMax)), Math.min(outMin, outMax));
};

export function OnScrollLetterAnimations() {
  const [activePreset, setActivePreset] = useState<number>(1);
  const containerRef = useRef<HTMLDivElement>(null);
  const wordsRef = useRef<Map<string, HTMLSpanElement[]>>(new Map());
  const imagesRef = useRef<HTMLImageElement[]>([]);

  // Velocity tracking state
  const scrollState = useRef({
    current: 0,
    last: 0,
    velocity: 0,
    smoothedVelocity: 0
  });

  useEffect(() => {
    let animationFrameId: number;

    const updateAnimations = () => {
      const state = scrollState.current;
      
      // Calculate instantaneous velocity
      state.velocity = state.current - state.last;
      state.last = state.current;

      // Lerp velocity to make it smooth
      state.smoothedVelocity += (state.velocity - state.smoothedVelocity) * 0.15;
      
      // Apply friction/decay when scroll stops
      if (Math.abs(state.smoothedVelocity) < 0.05) {
        state.smoothedVelocity = 0;
      }

      const vel = state.smoothedVelocity;

      // Render preset animations
      wordsRef.current.forEach((chars, wordKey) => {
        const charsTotal = chars.length;

        chars.forEach((charEl, idx) => {
          if (!charEl) return;

          // Calculate distance factor from center of word
          const halfWord = Math.ceil(charsTotal / 2);
          const factor = idx < halfWord ? idx : halfWord - Math.abs(Math.floor(charsTotal / 2) - idx) - 1;

          if (activePreset === 1) {
            // Preset 1: Vertical bending
            const translateY = mapRange(vel, -40, 40, -12, 12);
            charEl.style.transform = `translate3d(0, ${factor * translateY}px, 0)`;
          } else if (activePreset === 2) {
            // Preset 2: Rotate and Scale
            const translateY = mapRange(vel, -40, 40, -18, 18);
            const rotate = mapRange(vel, -40, 40, -4, 4);
            const scale = mapRange(Math.abs(vel), 0, 40, 1, 0.75);
            const rotateDir = idx < charsTotal / 2 ? 1 : -1;
            const rotVal = rotateDir * Math.abs(factor - charsTotal / 2) * rotate;
            charEl.style.transform = `scale3d(${scale}, ${scale}, 1) rotate3d(0, 0, 1, ${rotVal}deg) translate3d(0, ${factor * translateY}px, 0)`;
          } else if (activePreset === 3) {
            // Preset 3: Words scaleY, images scale down
            const scaleY = mapRange(Math.abs(vel), 0, 40, 1, 1.8);
            if (charEl.parentElement) {
              charEl.parentElement.style.transform = `scale3d(1, ${scaleY}, 1)`;
            }
            charEl.style.transform = "none";
          } else if (activePreset === 4) {
            // Preset 4: Warp rotation
            const translateY = mapRange(vel, -40, 40, 10, -10);
            const rotate = mapRange(vel, -40, 40, 3, -3);
            const rotateDir = idx < charsTotal / 2 ? 1 : -1;
            const rotVal = rotateDir * Math.abs(factor - charsTotal / 2) * rotate;
            charEl.style.transform = `translate3d(0, ${factor * translateY}px, 0) rotate3d(0, 0, 1, ${rotVal}deg)`;
          } else if (activePreset === 5) {
            // Preset 5: Cascade scale and cascade translate
            const translateY = mapRange(vel, -40, 40, 8, -8);
            const scale = mapRange(Math.abs(vel), 0, 40, 1, 0.6);
            charEl.style.transform = `scale3d(${scale}, ${scale}, 1) translate3d(0, ${translateY * idx}px, 0)`;
          }
        });
      });

      // Animate background images based on velocity
      imagesRef.current.forEach((img) => {
        if (!img) return;
        if (activePreset === 3) {
          const imgScale = mapRange(Math.abs(vel), 0, 45, 1, 0.88);
          img.style.transform = `scale3d(${imgScale}, ${imgScale}, 1)`;
        } else {
          // Subtle rotation
          const imgRot = mapRange(vel, -40, 40, -2, 2);
          img.style.transform = `rotate3d(0, 0, 1, ${imgRot}deg) scale(1.05)`;
        }
      });

      // Decay velocity slowly back to zero
      state.current += (0 - state.current) * 0.1;

      animationFrameId = requestAnimationFrame(updateAnimations);
    };

    animationFrameId = requestAnimationFrame(updateAnimations);

    return () => {
      cancelAnimationFrame(animationFrameId);
    };
  }, [activePreset]);

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.currentTarget;
    const delta = target.scrollTop - scrollState.current.last;
    scrollState.current.current = delta;
  };

  return (
    <div className="w-full h-[580px] bg-[#0d0f14] text-white flex flex-col font-sans rounded-3xl overflow-hidden border border-white/[0.08] relative">
      {/* Top Floating Presets Header */}
      <div className="absolute top-0 inset-x-0 z-30 bg-[#0d0f14]/90 backdrop-blur-md border-b border-white/[0.05] p-4 flex flex-col gap-3">
        <div className="flex justify-between items-center">
          <div>
            <h3 className="text-sm font-black text-white uppercase tracking-wider">Letter Warping Presets</h3>
            <p className="text-[10px] text-neutral-400 font-semibold">{PRESETS[activePreset - 1].description}</p>
          </div>
          <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded bg-blue-500/20 text-blue-400 border border-blue-500/30">
            Scroll Container Below
          </span>
        </div>

        <div className="flex flex-wrap gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => {
                setActivePreset(preset.id);
                // Clear any manual transforms
                wordsRef.current.forEach((chars) => {
                  chars.forEach((char) => {
                    if (char) {
                      char.style.transform = "none";
                      if (char.parentElement) char.parentElement.style.transform = "none";
                    }
                  });
                });
              }}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all border cursor-pointer ${
                activePreset === preset.id
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              {preset.name}
            </button>
          ))}
        </div>
      </div>

      {/* Main Local Scroll Track */}
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pt-28 pb-12"
      >
        <div className="flex flex-col gap-24 px-6 md:px-12 items-center">
          {SECTIONS.map((sec, secIdx) => {
            const wordChars = sec.title.split("");
            return (
              <div
                key={secIdx}
                className="w-full max-w-lg flex flex-col items-center gap-6 relative group"
              >
                {/* Foreground Image Window */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden relative border border-white/5 bg-black/50 shadow-2xl">
                  <img
                    ref={(el) => {
                      if (el) imagesRef.current[secIdx] = el;
                    }}
                    src={sec.img}
                    alt={sec.title}
                    className="w-full h-full object-cover transition-transform duration-300 ease-out will-change-transform scale-[1.05]"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-6">
                    <p className="text-xs font-medium text-neutral-300 tracking-wide uppercase">
                      {sec.desc}
                    </p>
                  </div>
                </div>

                {/* Warp Title */}
                <h2 className="text-5xl md:text-6xl font-black text-center tracking-tight select-none flex justify-center uppercase">
                  <span
                    className="flex transform-gpu origin-center transition-transform duration-300"
                    ref={(el) => {
                      if (el) {
                        const wordKey = `sec-${secIdx}`;
                        const spans = Array.from(el.querySelectorAll(".char-span")) as HTMLSpanElement[];
                        wordsRef.current.set(wordKey, spans);
                      }
                    }}
                  >
                    {wordChars.map((char, charIdx) => (
                      <span
                        key={charIdx}
                        className="char-span inline-block transform-gpu will-change-transform font-black transition-transform duration-100 ease-out"
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                </h2>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
