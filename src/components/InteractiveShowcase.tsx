import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Sparkles, Copy, Check, X, Search } from "lucide-react";
import { SpacedChat } from "./demos/SpacedChat";
import { Skiper21 } from "./demos/Skiper21";
import Scrubber from "./demos/Scrubber";
import SignInDrawer from "./demos/SignInDrawer";
import { UnderlayActionSheet } from "./demos/UnderlayActionSheet";
import { MotionBlur } from "./demos/MotionBlur";
import { ProgressiveBlur } from "./demos/ProgressiveBlur";
import InputMorphMessage from "./demos/InputMorphMessage";
import LabelIndicatorCarousel from "./demos/LabelIndicatorCarousel";
import SwipeableStackCards from "./demos/SwipeableStackCards";
import Subtle3DCarousel from "./demos/Subtle3DCarousel";
import GooeyMenu from "./demos/GooeyMenu";
import DraggableCurvedMenu from "./demos/DraggableCurvedMenu";
import RunStatsStacks from "./demos/RunStatsStacks";
import Timeline from "./demos/Timeline";
import ThreeDPhotoCarousel3 from "./demos/ThreeDPhotoCarousel3";
import ThreeDPhotoCarousel from "./demos/ThreeDPhotoCarousel";
import FamilyPopoverMenu from "./demos/FamilyPopoverMenu";
import ScrollRevealAnimationCSS from "./demos/ScrollRevealAnimationCSS";
import { ButtonGooey } from "./demos/ButtonGooey";
import { DistortedGlass } from "./demos/DistortedGlass";
import { FractalGlass } from "./demos/FractalGlass";
import MagneticBackgroundTabs from "./demos/MagneticBackgroundTabs";
import { Scene } from "./animationsdev/scene";
import AdaptiveCaretDemo from "./demos/AdaptiveCaretDemo";
import CustomCursorDemo from "./demos/CustomCursorDemo";
import { FoldableMap } from "./demos/FoldableMap";
import MagneticButtonDemo from "./demos/MagneticButtonDemo";
import { MaskAnimation } from "./demos/MaskAnimation";
import { ScrollAnimation } from "./demos/ScrollAnimation";
import { Skiper34 } from "./demos/Skiper34";
import { AppleSpotlight } from "./ui/apple-spotlight";
import { WorkTogether, StayInLoop } from "./CallToActionAndLoop";
import WillemLoader from "./demos/WillemLoader";
import UnderlayNav from "./demos/UnderlayNav";
import BunnyPlayer from "./demos/BunnyPlayer";
import ThreeJSWarpGallery from "./demos/ThreeJSWarpGallery";
import WebGLPageTransitions from "./demos/WebGLPageTransitions";
import WebGLMagazine from "./demos/WebGLMagazine";
import R3FExperimentalCarousel from "./demos/R3FExperimentalCarousel";
import ThreeDTextAnimation from "./demos/ThreeDTextAnimation";
import ElasticGridScroll from "./demos/ElasticGridScroll";
import GooeySearch from "./demos/GooeySearch";
import ThreeDInfiniteParallaxCarousel from "./demos/ThreeDInfiniteParallaxCarousel";
import PixelCanvasDemo from "./demos/PixelCanvasDemo";
import Staggered3DGrid from "./demos/Staggered3DGrid";
import OnScrollLayoutFormations from "./demos/OnScrollLayoutFormations";
import GradientSlider from "./demos/GradientSlider";
import ThreeDLettersMenuHover from "./demos/ThreeDLettersMenuHover";
import { OnScrollLetterAnimations } from "./demos/OnScrollLetterAnimations";
import { CircularTextEffect } from "./demos/CircularTextEffect";
import { StickyGridScroll } from "./demos/StickyGridScroll";
import { InfiniteScrollParallax } from "./demos/InfiniteScrollParallax";
import { Calligraph } from "calligraph";
import { SlotText } from "slot-text/react";
import "slot-text/style.css";

import { FlowScroll } from "./ui/flow-scroll";
import { GlowingScrollIndicator } from "./ui/glowing-scroll-indicator";
import { ScrollEffect } from "./ui/scroll-effect";
import { PixelatedCarousel } from "./ui/pixelated-carousel";

const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
];

const SCROLL_EFFECT_IMAGES = {
  start: [
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=600&auto=format&fit=crop"
  ],
  middle: [
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=600&auto=format&fit=crop"
  ],
  featured: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
};

interface ComponentPlayground {
  name: string;
  description: string;
  code: string;
  render: (state: any, setState: any) => React.ReactNode;
}

const PLAYGROUNDS: Record<string, ComponentPlayground> = {
  "Calligraph Text": {
    name: "Calligraph Text Transition",
    description: "Fluid text transitions powered by Motion where shared characters slide to new positions.",
    code: `import { Calligraph } from "calligraph";\nimport { useState } from "react";\n\nexport function CalligraphDemo() {\n  const [text, setText] = useState("Calligraph");\n  const words = ["Calligraph", "Typography", "Fluid Motion", "React 19", "Design Engineering"];\n\n  return (\n    <div className="flex flex-col items-center gap-6">\n      <h3 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">\n        <Calligraph variant="text" animation="bouncy">{text}</Calligraph>\n      </h3>\n      <button\n        onClick={() => {\n          const next = words[(words.indexOf(text) + 1) % words.length];\n          setText(next);\n        }}\n        className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-4 py-2 rounded-full font-bold active:scale-[0.96] transition-transform text-sm cursor-pointer"\n      >\n        Change Text\n      </button>\n    </div>\n  );\n}`,
    render: (state, setState) => {
      const words = ["Calligraph", "Typography", "Fluid Motion", "React 19", "Design Engineering"];
      const text = state.calligraphText ?? "Calligraph";
      return (
        <div className="flex flex-col items-center gap-6">
          <h3 className="text-3xl font-extrabold tracking-tight text-neutral-900 dark:text-white">
            <Calligraph variant="text" animation="bouncy">{text}</Calligraph>
          </h3>
          <button
            onClick={() => {
              const next = words[(words.indexOf(text) + 1) % words.length];
              setState({ ...state, calligraphText: next });
            }}
            className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-4 py-2 rounded-full font-bold active:scale-[0.96] transition-transform text-sm cursor-pointer"
          >
            Change Text
          </button>
        </div>
      );
    }
  },
  "SlotText Roll": {
    name: "SlotText Roll Animation",
    description: "Tactile text rolling transitions for small UI labels, tags, and status actions.",
    code: `import { SlotText } from "slot-text/react";\nimport "slot-text/style.css";\nimport { useState } from "react";\n\nexport function SlotTextDemo() {\n  const [copied, setCopied] = useState(false);\n\n  return (\n    <button\n      onClick={() => {\n        setCopied(true);\n        setTimeout(() => setCopied(false), 2000);\n      }}\n      className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-6 py-3 rounded-full font-bold active:scale-[0.96] transition-transform text-sm cursor-pointer"\n    >\n      <SlotText text={copied ? "Copied!" : "Click to Copy"} />\n    </button>\n  );\n}`,
    render: (state, setState) => {
      const clicked = state.slotTextClicked ?? false;
      return (
        <div className="flex flex-col items-center gap-6">
          <button
            onClick={() => {
              setState({ ...state, slotTextClicked: true });
              setTimeout(() => {
                setState((prev: any) => ({ ...prev, slotTextClicked: false }));
              }, 2000);
            }}
            className="bg-neutral-900 text-white dark:bg-white dark:text-neutral-950 px-6 py-3 rounded-full font-bold active:scale-[0.96] transition-transform text-sm cursor-pointer shadow-sm"
          >
            <SlotText text={clicked ? "Copied!" : "Click to Copy"} />
          </button>
        </div>
      );
    }
  },
  "Spaced Chat Input": {
    name: "Spaced-out Chat Input",
    description: "Lab #016: Interactive message list & chat input with synthesized mechanical keyboard typing sounds and pops.",
    code: `"use client";\n\nimport React, { useState, useEffect, useRef } from "react";\nimport { motion, AnimatePresence } from "motion/react";\n\ninterface Bubble {\n  id: string;\n  text: string;\n}\n\nexport function SpacedChat() {\n  const [bubbles, setBubbles] = useState<Bubble[]>([]);\n  const [inputValue, setInputValue] = useState("");\n  const [isFocused, setIsFocused] = useState(false);\n  const [typingIntensity, setTypingIntensity] = useState(0);\n  const [activeRockets, setActiveRockets] = useState<{ id: number; x: number }[]>([]);\n  const audioCtxRef = useRef<AudioContext | null>(null);\n\n  // Audio synthesis helpers...\n  // Smooth decay for typingIntensity...\n\n  return (\n    <div className="max-w-[412px] min-w-[412px] max-h-[312px] min-h-[312px] rounded-[24px] z-10 relative flex items-center justify-center overflow-hidden bg-[#161A23] border border-white/5 font-sans">\n      {/* View full code on GitHub */}\n    </div>\n  );\n}`,
    render: (state, setState) => {
      return <SpacedChat />;
    }
  },
  "Family Wallet": {
    name: "Family Wallet Auth Drawer",
    description: "Premium login interface with email/phone/passkey tabs, OTP boxes, and Connect Wallet sheet.",
    code: `"use client";\n\nimport React, { useState, useRef, useEffect } from "react";\nimport { motion, AnimatePresence } from "motion/react";\nimport { Wallet, X, Mail, Phone, Key } from "lucide-react";\n\nexport function Skiper21() {\n  const [isOpen, setIsOpen] = useState(false);\n  const [viewState, setViewState] = useState("auth");\n  const [activeTab, setActiveTab] = useState("email");\n\n  return (\n    <div className="relative">\n      <button onClick={() => setIsOpen(true)}>Sign In</button>\n      {/* ... View transitions between Auth, OTP, and Wallet connection views ... */}\n    </div>\n  );\n}`,
    render: (state, setState) => {
      return <Skiper21 />;
    }
  },

  "Scrubber": {
    name: "Scrubber Slider",
    description: "A keyboard-accessible drag scrubber slider with spring-loaded capsule thumb animations and tick marks.",
    code: `"use client";\n\nimport { cn } from "@/lib/utils";\nimport { motion, useReducedMotion } from "motion/react";\nimport React, { useCallback, useEffect, useRef, useState } from "react";\n\nexport default function ScrubberDemo() {\n  return (\n    <Scrubber label="Volume" min={0} max={100} defaultValue={50} />\n  );\n}`,
    render: (state, setState) => {
      const val = state.scrubberVal ?? 0.55;
      return (
        <div className="w-64">
          <Scrubber 
            label="Brightness" 
            value={val} 
            min={0} 
            max={1} 
            step={0.01} 
            decimals={2} 
            onValueChange={(newVal) => setState({ ...state, scrubberVal: newVal })} 
          />
        </div>
      );
    }
  },
  "SignIn Drawer": {
    name: "Sign In Drawer",
    description: "A premium interactive verification and authentication bottom drawer component powered by Vaul.",
    code: `import React, { useState } from "react";
import { Drawer } from "vaul";
import { Plus, ArrowRight } from "lucide-react";

export default function SignInDrawer() {
  const [activeTab, setActiveTab] = useState("Email");

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="bg-neutral-800 text-white rounded-full px-6 py-3 font-medium hover:bg-neutral-700 transition-colors cursor-pointer select-none">
          Sign In
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
        <Drawer.Content className="bg-[#0f0f0f] flex flex-col fixed inset-x-4 bottom-4 mx-auto w-full max-w-[361px] overflow-hidden z-50 text-white shadow-2xl rounded-[36px] outline-none">
          <div className="flex-1 w-full flex flex-col bg-[#0f0f0f] relative pt-6">
            
            <Drawer.Close className="absolute right-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c1c] transition-transform focus:scale-95 active:scale-75 text-[#737373] hover:text-white cursor-pointer">
              <Plus className="rotate-45 w-5 h-5 opacity-80" />
            </Drawer.Close>

            <div className="flex flex-col space-y-1.5 text-center sm:text-left px-6 py-2 pb-4">
              <h2 className="text-xl font-semibold tracking-tight sm:font-medium text-white select-none">
                Sign In
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2 px-6">
                
                {/* Social Login Buttons */}
                <div className="flex w-full items-center justify-center gap-2">
                  <button aria-label="Sign in with Google" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95 cursor-pointer">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with Discord" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95 cursor-pointer">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with GitHub" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95 cursor-pointer">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with Apple" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95 cursor-pointer">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with X" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95 cursor-pointer">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path>
                    </svg>
                  </button>
                </div>

                {/* Tabs */}
                <div className="bg-[#18181A] flex h-12 w-full items-center rounded-2xl px-1 mt-1 mb-1">
                  <div className="relative mx-auto flex w-full items-center">
                    <ul className="mx-auto flex w-full flex-row justify-center gap-2">
                      {["Email", "Phone", "Passkey"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={"relative flex h-10 w-full cursor-pointer items-center justify-center px-3 py-1.5 text-center text-sm font-semibold transition-colors duration-200 ease-out z-10 sm:font-medium select-none " + (activeTab === tab ? "text-white" : "text-[#737373]")}
                        >
                          {activeTab === tab && (
                            <div className="bg-[#242426] shadow-[0_1px_2px_rgba(0,0,0,0.1)] absolute inset-0 rounded-xl -z-10" />
                          )}
                          <span className="relative select-none text-inherit tracking-tight">{tab}</span>
                        </button>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Input row */}
                <div className="bg-[#18181A] flex h-12 w-full items-center justify-start gap-3 overflow-hidden rounded-2xl pl-4 pr-1 text-base border border-transparent focus-within:border-neutral-800 transition-colors">
                  <div className="flex w-full items-center justify-start">
                    <input
                      placeholder={activeTab === "Email" ? "yo@gxuri.in" : activeTab === "Phone" ? "+1 (555) 000-0000" : "Passkey ID"}
                      className="w-full text-base font-semibold tracking-tight bg-transparent border-none focus:outline-none focus:ring-0 text-[#737373] placeholder-[#737373] sm:font-medium"
                      type={activeTab === "Email" ? "email" : "text"}
                    />
                  </div>
                  <button
                    className="shadow-xs group flex h-10 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ease-out bg-[#242426] text-[#737373] cursor-not-allowed"
                    disabled
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Bottom half */}
              <div className="flex flex-col gap-5 px-6 pb-6 mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex h-8 items-center">
                    <span className="w-full border-t border-[#2a2a2a]"></span>
                  </div>
                  <div className="relative flex h-8 justify-center text-[11px] uppercase items-center">
                    <span className="text-[#606060] font-semibold tracking-wider bg-[#0f0f0f] px-4 z-10">
                      OR
                    </span>
                  </div>
                </div>
                <button className="flex h-12 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-2xl bg-[#4EAFFF] text-[15px] font-semibold tracking-tight text-white transition-all duration-200 ease-out hover:bg-[#4EAFFF]/90 focus:scale-95 active:scale-95 sm:font-medium">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="h-5 w-5 mr-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"></path>
                  </svg>
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}`,
    render: () => <SignInDrawer />
  },
  "Flow Scroll": {
    name: "Flow Scroll Grid",
    description: "Grid layouts that shift, scale, and rotate perspective based on the scroll position of the viewport.",
    code: `<FlowScroll images={images} />`,
    render: () => {
      return (
        <div className="flex flex-col items-center gap-4 text-center p-6 select-none">
          <div className="w-12 h-12 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center animate-bounce">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-neutral-800 dark:text-white">
            Perspective Flow Scroll is Active!
          </span>
          <p className="text-[12px] text-neutral-500 dark:text-neutral-400 max-w-[240px] leading-relaxed">
            Scroll down the main page to experience the 3D grid layout shifting and rotating dynamically in full viewport.
          </p>
        </div>
      );
    }
  },
  "Glowing Scroll Indicator": {
    name: "Glowing Scroll Progress Bar",
    description: "A liquid progress bar composed of glowing columns reactively scaling as you scroll.",
    code: `<GlowingScrollIndicator scrollContainerId="scroll-area" direction="horizontal" />`,
    render: () => {
      return (
        <div className="w-full max-w-[360px] bg-white text-[#141414] rounded-[24px] p-6 border border-neutral-200/60 flex flex-col gap-4 items-center justify-center shadow-sm">
          <GlowingScrollIndicator direction="horizontal" />
          <span className="text-[11px] text-neutral-400 font-semibold uppercase tracking-wider mt-2 select-none">Drag the red indicator stick left or right</span>
        </div>
      );
    }
  },
  "Scroll Effect": {
    name: "Scroll Mask Reveal",
    description: "Curtain reveal mask effect that splits and expands nested image grids as you scroll down the page.",
    code: `<ScrollEffect images={images} />`,
    render: () => {
      return (
        <div className="flex flex-col items-center gap-4 text-center p-6 select-none">
          <div className="w-12 h-12 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center animate-bounce">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-neutral-800 dark:text-white">
            Curtain Mask Reveal is Active!
          </span>
          <p className="text-[12px] text-neutral-500 dark:text-neutral-400 max-w-[240px] leading-relaxed">
            Scroll down the main page to experience the splitting nested images expanding into full screen.
          </p>
        </div>
      );
    }
  },
  "Pixelated Carousel": {
    name: "Pixelated Carousel Transition",
    description: "Carousel images transitions employing custom pixel block delays creating a vintage rendering texture.",
    code: `<PixelatedCarousel images={images} pixelSize={80} />`,
    render: () => {
      return (
        <div className="w-full max-w-[320px] h-[220px] rounded-2xl overflow-hidden border border-neutral-200 dark:border-white/5 relative bg-neutral-950">
          <PixelatedCarousel images={DEMO_IMAGES} pixelSize={40} />
        </div>
      );
    }
  },
  "Underlay Action Sheet": {
    name: "Underlay Action Sheet",
    description: "Expandable bottom action sheet that scales down background content with border-radius transition.",
    code: `import { UnderlayActionSheet } from "./demos/UnderlayActionSheet";\n\n// Usage:\n<UnderlayActionSheet />`,
    render: () => <UnderlayActionSheet />
  },
  "Motion Blur": {
    name: "CSS Motion Blur Effect",
    description: "Simulates digital motion blur on movement transitions using CSS box-shadow and blur filter overlays.",
    code: `import { MotionBlur } from "./demos/MotionBlur";\n\n// Usage:\n<MotionBlur />`,
    render: () => <MotionBlur />
  },
  "Progressive Blur": {
    name: "Progressive Backdrop Blur",
    description: "Overlay masking that applies step-graded backdrop filters to create a smooth glass-like blur fade out.",
    code: `import { ProgressiveBlur } from "./demos/ProgressiveBlur";\n\n// Usage:\n<ProgressiveBlur />`,
    render: () => <ProgressiveBlur />
  },
  "Input Morph Message": {
    name: "Input Morph Message",
    description: "A chat input that morphs into a chat message bubble when submitted with smooth layout transitions.",
    code: `import InputMorphMessage from "./demos/InputMorphMessage";\n\n// Usage:\n<InputMorphMessage />`,
    render: () => <InputMorphMessage />
  },
  "Label Indicator Carousel": {
    name: "Label Indicator Carousel",
    description: "Interactive horizontal carousel with text pill indicators that expand and reveal text titles when active.",
    code: `import LabelIndicatorCarousel from "./demos/LabelIndicatorCarousel";\n\n// Usage:\n<LabelIndicatorCarousel />`,
    render: () => <LabelIndicatorCarousel />
  },
  "Swipeable Stack Cards": {
    name: "Swipeable 3D Stack Cards",
    description: "Stack of cards that can be dragged and swiped away to the back of the stack with interactive perspective rotation.",
    code: `import SwipeableStackCards from "./demos/SwipeableStackCards";\n\n// Usage:\n<SwipeableStackCards />`,
    render: () => <SwipeableStackCards />
  },
  "Subtle 3D Carousel": {
    name: "Subtle 3D Perspective Carousel",
    description: "Curved 3D card layout carousel rotating its items in space as you drag or paginate through them.",
    code: `import Subtle3DCarousel from "./demos/Subtle3DCarousel";\n\n// Usage:\n<Subtle3DCarousel />`,
    render: () => <Subtle3DCarousel />
  },
  "Gooey Menu": {
    name: "Gooey Blob Navigation Menu",
    description: "Sub-navigation actions popping out from a central button with organic liquid-metal gooey fusion filters.",
    code: `import GooeyMenu from "./demos/GooeyMenu";\n\n// Usage:\n<GooeyMenu />`,
    render: () => <GooeyMenu />
  },
  "Draggable Curved Menu": {
    name: "Draggable Curved Spin Wheel Menu",
    description: "Draggable curved wheel menu that rotates while dragging with highlight spotlight selection.",
    code: `import DraggableCurvedMenu from "./demos/DraggableCurvedMenu";\n\n// Usage:\n<DraggableCurvedMenu />`,
    render: () => <DraggableCurvedMenu />
  },
  "Run Stats Stacks": {
    name: "Run Stats Stacks",
    description: "Stacked run activity cards that expand and collapse in vertical 3D space on click.",
    code: `import RunStatsStacks from "./demos/RunStatsStacks";\n\n// Usage:\n<RunStatsStacks />`,
    render: () => <RunStatsStacks />
  },
  "Timeline Indicator": {
    name: "Timeline Focus Indicator",
    description: "Year timeline progress bar that reactively scales nearby items based on mouse focus distance.",
    code: `import Timeline from "./demos/Timeline";\n\n// Usage:\n<Timeline />`,
    render: () => <Timeline />
  },
  "Cylindrical Photo Carousel": {
    name: "3D Cylindrical Photo Carousel",
    description: "Cylindrical photo loop rotating 3D cards around a vertical pivot based on swipe gesture distance.",
    code: `import ThreeDPhotoCarousel from "./demos/ThreeDPhotoCarousel";\n\n// Usage:\n<ThreeDPhotoCarousel />`,
    render: () => <ThreeDPhotoCarousel />
  },
  "Flat 3D Photo Carousel": {
    name: "3D Flat Face Photo Carousel",
    description: "Flat-faced cylindrical photo rotation layout mapping Unsplash image nodes in 3D projection.",
    code: `import ThreeDPhotoCarousel3 from "./demos/ThreeDPhotoCarousel3";\n\n// Usage:\n<ThreeDPhotoCarousel3 />`,
    render: () => <ThreeDPhotoCarousel3 />
  },
  "Family Popover Menu": {
    name: "Family Style Popover Menu",
    description: "Popover expansion menu shifting elements cleanly into place with organic spring motion.",
    code: `import FamilyPopoverMenu from "./demos/FamilyPopoverMenu";\n\n// Usage:\n<FamilyPopoverMenu />`,
    render: () => <FamilyPopoverMenu />
  },
  "Scroll Reveal CSS": {
    name: "Scroll Reveal Animation (CSS)",
    description: "Easily create scroll reveal animations with CSS's animation-timeline property.",
    code: `import ScrollRevealAnimationCSS from "./demos/ScrollRevealAnimationCSS";\n\n// Usage:\n<ScrollRevealAnimationCSS />`,
    render: () => <ScrollRevealAnimationCSS />
  },
  "Gooey Button": {
    name: "Gooey Button Hover Effect",
    description: "Interactive black pill button with a bubble that gooey stretches out on hover state.",
    code: `import { ButtonGooey } from "./demos/ButtonGooey";\n\n// Usage:\n<ButtonGooey />`,
    render: () => <ButtonGooey />
  },
  "Distorted Glass": {
    name: "Distorted Fractal Glass",
    description: "A draggable circle showing distortion noise under a frosted glass panel overlay.",
    code: `import { DistortedGlass } from "./demos/DistortedGlass";\n\n// Usage:\n<DistortedGlass />`,
    render: () => <DistortedGlass />
  },
  "Fractal Glass Panels": {
    name: "Fractal Glass Panels",
    description: "Frosted vertical glass panes applying progressive backdrop filter blur overlay.",
    code: `import { FractalGlass } from "./demos/FractalGlass";\n\n// Usage:\n<FractalGlass />`,
    render: () => <FractalGlass />
  },
  "Magnetic Tabs": {
    name: "Magnetic Background Tabs",
    description: "Navigation link tabs with active backgrounds that magnetically track cursor hover displacement.",
    code: `import MagneticBackgroundTabs from "./demos/MagneticBackgroundTabs";\n\n// Usage:\n<MagneticBackgroundTabs />`,
    render: () => <MagneticBackgroundTabs />
  },
  "AnimationsDev Hero": {
    name: "Animations.dev Hero Canvas",
    description: "Interactive SVG micro-interactions canvas containing custom dragging bounce, code formatting, ticking clock, timeline slider, and click interactions.",
    code: `import { Scene } from "./animationsdev/scene";\n\n// Usage:\n<Scene />`,
    render: () => <Scene />
  },
  "Adaptive Caret": {
    name: "Adaptive Cursor Caret",
    description: "Interactive text field caret morphing in thickness and tracking coordinates inside inputs in real-time.",
    code: `import AdaptiveCaretDemo from "./demos/AdaptiveCaretDemo";\n\n// Usage:\n<AdaptiveCaretDemo />`,
    render: () => <AdaptiveCaretDemo />
  },
  "Custom Cursor": {
    name: "Custom Adaptive Cursor",
    description: "An isolated sandbox showcasing a text-adaptive custom cursor that follows the pointer and morphs into a typing caret over text elements.",
    code: `import CustomCursorDemo from "./demos/CustomCursorDemo";\n\n// Usage:\n<CustomCursorDemo />`,
    render: () => <CustomCursorDemo />
  },
  "Foldable Map": {
    name: "3D Foldable Map Section",
    description: "A three-panel map layout folding and skewing in 3D projection space reactively via drag gestures.",
    code: `import { FoldableMap } from "./demos/FoldableMap";\n\n// Usage:\n<FoldableMap />`,
    render: () => <FoldableMap />
  },
  "Magnetic Button": {
    name: "Magnetic Action Button",
    description: "Interactive action button snapping and moving towards the cursor's proximity coordinates.",
    code: `import MagneticButtonDemo from "./demos/MagneticButtonDemo";\n\n// Usage:\n<MagneticButtonDemo />`,
    render: () => <MagneticButtonDemo />
  },
  "Mask Animation": {
    name: "Runway Style Mask Scroll",
    description: "Dynamic background reveal scrolling effect where a container mask expands on scroll to show background image assets.",
    code: `import { MaskAnimation } from "./demos/MaskAnimation";\n\n// Usage:\n<MaskAnimation />`,
    render: () => <MaskAnimation />
  },
  "Scroll Animation": {
    name: "Apple Style iPad Scroll Mask",
    description: "Scroll-driven path mask animation opening a device showcase video container along a curved vector path.",
    code: `import { ScrollAnimation } from "./demos/ScrollAnimation";\n\n// Usage:\n<ScrollAnimation />`,
    render: () => <ScrollAnimation />
  },
  "Sticky Card Stack": {
    name: "Interactive Card Stack",
    description: "Immersive overlapping layout stack with scroll-based perspective scaling and tilting rotations.",
    code: `import { Skiper34 } from "./demos/Skiper34";\n\n// Usage:\n<Skiper34 />`,
    render: () => {
      return (
        <div className="flex flex-col items-center gap-4 text-center p-6 select-none bg-[#1d1f27] border border-white/5 rounded-2xl w-full max-w-[280px] mx-auto">
          <div className="w-12 h-12 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center animate-bounce">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-white">Sticky Card Stack</span>
          <p className="text-[12px] text-neutral-400 max-w-[220px] leading-relaxed">
            Scroll down the viewport below to experience cards stack and shift dynamically.
          </p>
        </div>
      );
    }
  },
  "Apple Spotlight": {
    name: "Spotlight Search Dialog",
    description: "A macOS/iOS Command+K style spotlight utility search modal with shortcuts and live list filters.",
    code: `import { AppleSpotlight } from "./ui/apple-spotlight";\n\n// Usage:\n<AppleSpotlight isOpen={isOpen} handleClose={handleClose} />`,
    render: (state, setState) => {
      const isOpen = state.isSpotlightOpen ?? false;
      return (
        <div className="flex flex-col items-center gap-4 text-center p-6 select-none bg-neutral-900 border border-white/5 rounded-2xl w-full max-w-[280px] mx-auto">
          <Search className="w-10 h-10 text-neutral-400 mb-1" />
          <span className="text-[15px] font-bold text-white">Spotlight Search</span>
          <p className="text-[12px] text-neutral-400 max-w-[220px] leading-relaxed">
            Interactive search dialog overlays. Click below to launch.
          </p>
          <button 
            onClick={() => setState({ ...state, isSpotlightOpen: true })}
            className="mt-2 text-[12px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-5 py-2 rounded-full transition-all shadow-lg"
          >
            Trigger Spotlight
          </button>
          <AppleSpotlight isOpen={isOpen} handleClose={() => setState({ ...state, isSpotlightOpen: false })} />
        </div>
      );
    }
  },
  "Work Together": {
    name: "Let's Work Together Banner",
    description: "Responsive banner card with elegant gradient overlays and click-to-copy capability.",
    code: `import { WorkTogether } from "./CallToActionAndLoop";\n\n// Usage:\n<WorkTogether triggerToast={triggerToast} />`,
    render: () => {
      return (
        <div className="w-full flex justify-center scale-75 select-none overflow-hidden">
          <WorkTogether triggerToast={(msg) => alert(msg)} />
        </div>
      );
    }
  },
  "Stay in Loop": {
    name: "Stay In Loop Newsletter",
    description: "Smooth scroll-mask width transform layout container with input validation subscription forms.",
    code: `import { StayInLoop } from "./CallToActionAndLoop";\n\n// Usage:\n<StayInLoop triggerToast={triggerToast} />`,
    render: () => {
      return (
        <div className="w-full flex justify-center scale-75 select-none overflow-hidden">
          <StayInLoop triggerToast={(msg) => alert(msg)} />
        </div>
      );
    }
  },
  "Willem Loading Animation": {
    name: "Willem Loading Animation",
    description: "Premium GSAP loading animation with image reveals and typography scaling.",
    code: `import WillemLoader from "./demos/WillemLoader";\n\n// Usage:\n<WillemLoader />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <WillemLoader />
        </div>
      );
    }
  },
  "Fixed Underlay Navigation": {
    name: "Fixed Underlay Navigation",
    description: "Underlay sliding menu overlay with spring easing and custom corners.",
    code: `import UnderlayNav from "./demos/UnderlayNav";\n\n// Usage:\n<UnderlayNav />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <UnderlayNav />
        </div>
      );
    }
  },
  "Custom Bunny HLS Player": {
    name: "Custom Bunny HLS Player (Basic)",
    description: "Interactive HLS (.m3u8) video player with custom control overlay.",
    code: `import BunnyPlayer from "./demos/BunnyPlayer";\n\n// Usage:\n<BunnyPlayer />`,
    render: () => {
      return (
        <div className="w-full h-full flex items-center justify-center p-4 bg-black rounded-2xl overflow-hidden border border-white/5">
          <BunnyPlayer />
        </div>
      );
    }
  },
  "Three.js Warp Gallery": {
    name: "Three.js Warp Gallery",
    description: "Three.js WebGL image warp scroll gallery with interactive grids.",
    code: `import ThreeJSWarpGallery from "./demos/ThreeJSWarpGallery";\n\n// Usage:\n<ThreeJSWarpGallery />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <ThreeJSWarpGallery />
        </div>
      );
    }
  },
  "WebGL Page Transitions": {
    name: "WebGL Page Transitions",
    description: "Fluid curved WebGL transition animations replicating Barba.js styles.",
    code: `import WebGLPageTransitions from "./demos/WebGLPageTransitions";\n\n// Usage:\n<WebGLPageTransitions />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <WebGLPageTransitions />
        </div>
      );
    }
  },
  "WebGL Magazine": {
    name: "WebGL Magazine / Book Turn",
    description: "WebGL interactive magazine/book layout with realistic page turning animations.",
    code: `import WebGLMagazine from "./demos/WebGLMagazine";\n\n// Usage:\n<WebGLMagazine />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <WebGLMagazine />
        </div>
      );
    }
  },
  "R3F Curved Carousel": {
    name: "R3F Curved Carousel",
    description: "Curved 3D image scroll carousels with GLSL shader wave deformations and 6 compound layouts.",
    code: `import R3FExperimentalCarousel from "./demos/R3FExperimentalCarousel";\n\n// Usage:\n<R3FExperimentalCarousel />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <R3FExperimentalCarousel />
        </div>
      );
    }
  },
  "3D Text Scroll Layouts": {
    name: "3D Text Scroll Layouts",
    description: "CSS 3D transforms rendering Cylinder, interlocking Circle, and Tube text layouts driven by scroll.",
    code: `import ThreeDTextAnimation from "./demos/ThreeDTextAnimation";\n\n// Usage:\n<ThreeDTextAnimation />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <ThreeDTextAnimation />
        </div>
      );
    }
  },
  "Elastic Grid Scroll": {
    name: "Elastic Grid Scroll",
    description: "Multi-column grid with symmetrical lag and velocity-driven squash/stretch deforms.",
    code: `import ElasticGridScroll from "./demos/ElasticGridScroll";\n\n// Usage:\n<ElasticGridScroll />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px]">
          <ElasticGridScroll />
        </div>
      );
    }
  },
  "Gooey Search Bar": {
    name: "Gooey Search Bar",
    description: "Expanding SVG gooey-filtered input with autocomplete suggestions.",
    code: `import GooeySearch from "./demos/GooeySearch";\n\n// Usage:\n<GooeySearch />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <GooeySearch />
        </div>
      );
    }
  },
  "3D Infinite Carousel": {
    name: "3D Infinite Parallax Carousel",
    description: "CSS 3D transformed drag-and-scroll carousel with image parallax.",
    code: `import ThreeDInfiniteParallaxCarousel from "./demos/ThreeDInfiniteParallaxCarousel";\n\n// Usage:\n<ThreeDInfiniteParallaxCarousel />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <ThreeDInfiniteParallaxCarousel />
        </div>
      );
    }
  },
  "Pixel Canvas": {
    name: "Pixel Canvas Cards",
    description: "Hover/focus-triggered animated grid canvases drawing responsive colors.",
    code: `import PixelCanvasDemo from "./demos/PixelCanvasDemo";\n\n// Usage:\n<PixelCanvasDemo />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <PixelCanvasDemo />
        </div>
      );
    }
  },
  "Staggered 3D Grid": {
    name: "Staggered 3D Scroll Grid",
    description: "3D staggered scroll grid applying random Z-offsets and dynamic filters.",
    code: `import Staggered3DGrid from "./demos/Staggered3DGrid";\n\n// Usage:\n<Staggered3DGrid />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <Staggered3DGrid />
        </div>
      );
    }
  },
  "Scroll Layout Formations": {
    name: "On-Scroll Layout Formations",
    description: "10 distinct photo layout formations triggered as you scroll.",
    code: `import OnScrollLayoutFormations from "./demos/OnScrollLayoutFormations";\n\n// Usage:\n<OnScrollLayoutFormations />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <OnScrollLayoutFormations />
        </div>
      );
    }
  },
  "Gradient 3D Slider": {
    name: "Gradient 3D Slider",
    description: "Horizontal infinite-scrolling slider with HTML5 radial gradient canvas background.",
    code: `import GradientSlider from "./demos/GradientSlider";\n\n// Usage:\n<GradientSlider />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <GradientSlider />
        </div>
      );
    }
  },
  "3D Letters Menu Hover": {
    name: "3D Letters Menu Hover",
    description: "Menu hover animations with rotating 3D character splits and cursor reveal image.",
    code: `import ThreeDLettersMenuHover from "./demos/ThreeDLettersMenuHover";\n\n// Usage:\n<ThreeDLettersMenuHover />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <ThreeDLettersMenuHover />
        </div>
      );
    }
  },
  "On-Scroll Letters": {
    name: "On-Scroll Letters",
    description: "Bending typographic characters warping dynamically in response to scroll speed.",
    code: `import { OnScrollLetterAnimations } from "./demos/OnScrollLetterAnimations";\n\n// Usage:\n<OnScrollLetterAnimations />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <div className="w-full max-w-md">
            <OnScrollLetterAnimations />
          </div>
        </div>
      );
    }
  },
  "Circular Text Effect": {
    name: "Circular Text Effect",
    description: "Concentric rotating SVG typography expanding and fading out on click.",
    code: `import { CircularTextEffect } from "./demos/CircularTextEffect";\n\n// Usage:\n<CircularTextEffect />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <div className="w-full max-w-md">
            <CircularTextEffect />
          </div>
        </div>
      );
    }
  },
  "Sticky Grid Scroll": {
    name: "Sticky Grid Scroll",
    description: "A structured scroll-driven image grid zooming and splitting on scroll.",
    code: `import { StickyGridScroll } from "./demos/StickyGridScroll";\n\n// Usage:\n<StickyGridScroll />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <div className="w-full max-w-md">
            <StickyGridScroll />
          </div>
        </div>
      );
    }
  },
  "Infinite Scroll Parallax": {
    name: "Infinite Scroll Parallax",
    description: "Seamless vertical repeated loop with image depth parallax transforms.",
    code: `import { InfiniteScrollParallax } from "./demos/InfiniteScrollParallax";\n\n// Usage:\n<InfiniteScrollParallax />`,
    render: () => {
      return (
        <div className="w-full h-full max-h-[350px] min-h-[350px] flex items-center justify-center">
          <div className="w-full max-w-md">
            <InfiniteScrollParallax />
          </div>
        </div>
      );
    }
  }
};

function SidebarBlur({ direction }: { direction: "top" | "bottom" }) {
  const gradientDirection = direction === "top" ? "to bottom" : "to top";
  const positionClass = direction === "top" ? "top-0" : "bottom-0";
  
  return (
    <div className={`pointer-events-none absolute left-0 right-2 h-14 z-20 ${positionClass} overflow-hidden rounded-t-2xl rounded-b-2xl`}>
      {[0.5, 1, 2, 4].map((blur, i) => {
        const opacity = (i + 1) / 4;
        const stopStart = (i * 25) + "%";
        const stopEnd = ((i + 1) * 25) + "%";
        return (
          <div
            key={i}
            className="absolute inset-0 w-full h-full pointer-events-none"
            style={{
              backdropFilter: `blur(${blur}px)`,
              WebkitBackdropFilter: `blur(${blur}px)`,
              maskImage: `linear-gradient(${gradientDirection}, rgba(0,0,0,${opacity}) ${stopStart}, rgba(0,0,0,0) ${stopEnd})`,
              WebkitMaskImage: `linear-gradient(${gradientDirection}, rgba(0,0,0,${opacity}) ${stopStart}, rgba(0,0,0,0) ${stopEnd})`,
            }}
          />
        );
      })}
      <div className={`absolute inset-0 bg-gradient-to-${direction === "top" ? "b" : "t"} from-white dark:from-[#141414] via-transparent to-transparent opacity-60 pointer-events-none`} />
    </div>
  );
}

export function InteractiveShowcase() {
  const [activePlayground, setActivePlayground] = useState("Spaced Chat Input");
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [state, setState] = useState({});

  const handleCopy = () => {
    navigator.clipboard.writeText(PLAYGROUNDS[activePlayground].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-[#141414] flex flex-col items-center">
      
      {/* 1. Component Sandbox Playground */}
      <section className="py-10 md:py-32 w-full max-w-[1280px] px-4 md:px-6 flex flex-col items-center border-t border-neutral-100 dark:border-white/5">
        <div className="text-center mb-8 md:mb-16 max-w-2xl">
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 block mb-2">Interactive Sandbox</span>
          <h2 className="text-[1.6rem] md:text-5xl font-extrabold tracking-tight text-[#141414] dark:text-white mb-2 md:mb-4 text-balance">
            Component Playground
          </h2>
          <p className="text-[13px] md:text-base text-neutral-500 dark:text-neutral-400 font-medium text-pretty">
            Test animations and copy production-ready code directly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8 w-full">
          {/* ── Mobile: 2-col grid selector ── Desktop: vertical list */}

          {/* MOBILE grid (hidden on lg+) */}
          <div className="lg:hidden grid grid-cols-2 gap-2">
            {Object.keys(PLAYGROUNDS).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActivePlayground(key);
                  setCopied(false);
                }}
                className={`px-3 py-2.5 rounded-xl text-[12px] font-semibold text-center transition-[background-color,border-color,transform,color] active:scale-[0.96] border cursor-pointer leading-tight ${
                  activePlayground === key
                    ? "bg-neutral-100 dark:bg-[#1d1f27] border-neutral-300 dark:border-white/10 text-[#141414] dark:text-white shadow-sm"
                    : "bg-transparent border-neutral-200/60 dark:border-white/5 text-neutral-500 hover:bg-neutral-50 dark:hover:bg-white/[0.02] hover:text-[#141414] dark:hover:text-white"
                }`}
              >
                {key}
              </button>
            ))}
          </div>

          {/* DESKTOP vertical list (hidden below lg) with scrollbar and progressive blur */}
          <div className="hidden lg:col-span-3 lg:flex flex-col relative h-[500px]">
            {/* Top Progressive Blur */}
            <SidebarBlur direction="top" />

            {/* Scrollable list */}
            <div className="flex flex-col gap-2 overflow-y-auto pr-2 h-full py-16">
              {Object.keys(PLAYGROUNDS).map((key) => (
                <button
                  key={key}
                  onClick={() => {
                    setActivePlayground(key);
                    setCopied(false);
                  }}
                  className={`w-full px-5 py-4 rounded-2xl text-[15px] font-[600] text-left transition-[background-color,border-color,transform,color] active:scale-[0.96] border flex items-center justify-between gap-2 cursor-pointer shrink-0 ${
                    activePlayground === key
                      ? "bg-neutral-100 dark:bg-[#1d1f27] border-neutral-200 dark:border-white/5 text-[#141414] dark:text-white shadow-sm"
                      : "bg-transparent border-transparent text-neutral-500 hover:bg-neutral-50 dark:hover:bg-white/[0.02] hover:text-[#141414] dark:hover:text-white"
                  }`}
                >
                  <span>{key}</span>
                  <Code2 className="w-4 h-4 opacity-50 shrink-0" />
                </button>
              ))}
            </div>

            {/* Bottom Progressive Blur */}
            <SidebarBlur direction="bottom" />
          </div>

          {/* Playground Interactive Output Area */}
          <div className={`${showCode ? "lg:col-span-4" : "lg:col-span-9"} bg-neutral-50 dark:bg-[#1d1f27]/30 border border-neutral-200/50 dark:border-white/5 rounded-[24px] md:rounded-[32px] min-h-[300px] md:min-h-[350px] flex flex-col justify-between p-5 md:p-8 relative overflow-hidden shadow-sm transition-all duration-350 ease-in-out`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-2 text-left">
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">Interactive Preview</span>
                <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">
                  <Calligraph>{PLAYGROUNDS[activePlayground].name}</Calligraph>
                </h3>
                <p className="text-[14px] text-neutral-500 dark:text-neutral-400 font-medium">{PLAYGROUNDS[activePlayground].description}</p>
              </div>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-1.5 text-[12px] font-semibold bg-white/10 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 active:scale-[0.96] text-neutral-800 dark:text-white border border-neutral-200 dark:border-white/5 px-3.5 py-1.5 rounded-full transition-[background-color,transform] cursor-pointer select-none shrink-0"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{showCode ? "Hide Code" : "View Code"}</span>
              </button>
            </div>
            
            <div className="flex-grow w-full flex items-center justify-center py-4">
              {PLAYGROUNDS[activePlayground].render(state, setState)}
            </div>
          </div>

          {/* Styled Code Viewer */}
          {showCode && (
            <div className="lg:col-span-5 bg-[#1d1f27] rounded-[24px] md:rounded-[32px] border border-white/5 shadow-lg overflow-hidden flex flex-col justify-between h-[320px] md:h-auto animate-fade-in">
              <div className="flex justify-between items-center px-4 md:px-6 py-4 border-b border-white/5 bg-[#141414]/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="text-[12px] font-mono text-neutral-500 ml-2">code.tsx</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[12px] font-semibold bg-white/5 hover:bg-white/10 active:scale-[0.96] text-white border border-white/5 px-3.5 py-1.5 rounded-full transition-[background-color,transform] cursor-pointer"
                >
                  {copied ? (
                    <Check className="w-3.5 h-3.5 text-green-400" />
                  ) : (
                    <Copy className="w-3.5 h-3.5 text-neutral-400" />
                  )}
                  <SlotText text={copied ? "Copied!" : "Copy code"} />
                </button>
              </div>
              <pre className="p-4 md:p-6 text-[12px] md:text-[13px] font-mono text-neutral-300 overflow-y-auto no-scrollbar flex-grow bg-[#1d1f27] text-left leading-relaxed">
                <code>{PLAYGROUNDS[activePlayground].code}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {activePlayground === "Flow Scroll" && (
        <div className="w-full border-t border-neutral-100 dark:border-white/5">
          <FlowScroll images={DEMO_IMAGES} />
        </div>
      )}

      {activePlayground === "Scroll Effect" && (
        <div className="w-full border-t border-neutral-100 dark:border-white/5">
          <ScrollEffect images={SCROLL_EFFECT_IMAGES} className="w-full" />
        </div>
      )}

      {activePlayground === "Sticky Card Stack" && (
        <div className="w-full border-t border-neutral-100 dark:border-white/5 bg-[#141414]">
          <Skiper34 />
        </div>
      )}



    </div>
  );
}
