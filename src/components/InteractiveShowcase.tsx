import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Code2, Sparkles, Copy, Check, Download, Layers, X } from "lucide-react";
import { SpacedChat } from "./demos/SpacedChat";
import { Skiper21 } from "./demos/Skiper21";
import { Skiper34 } from "./demos/Skiper34";
import Scrubber from "./demos/Scrubber";
import SignInDrawer from "./demos/SignInDrawer";

interface ComponentPlayground {
  name: string;
  description: string;
  code: string;
  render: (state: any, setState: any) => React.ReactNode;
}

const PLAYGROUNDS: Record<string, ComponentPlayground> = {
  "iOS Toggle": {
    name: "iOS Toggle Switch",
    description: "A spring-loaded toggle switch matching the native iOS accessibility and motion design.",
    code: `import { motion } from "motion/react";\nimport { useState } from "react";\n\nexport default function Toggle() {\n  const [isOn, setIsOn] = useState(false);\n  return (\n    <button\n      onClick={() => setIsOn(!isOn)}\n      className={\`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 \${\n        isOn ? "bg-[#34c759]" : "bg-neutral-200 dark:bg-neutral-800"\n      }\`}\n    >\n      <motion.div\n        layout\n        className="bg-white w-6 h-6 rounded-full shadow-md"\n        transition={{ type: "spring", stiffness: 500, damping: 30 }}\n      />\n    </button>\n  );\n}`,
    render: (state, setState) => {
      const isOn = !!state.toggle;
      return (
        <button
          onClick={() => setState({ ...state, toggle: !isOn })}
          className={`w-14 h-8 flex items-center rounded-full p-1 transition-colors duration-300 cursor-pointer ${
            isOn ? "bg-[#34c759]" : "bg-neutral-200 dark:bg-neutral-800"
          }`}
        >
          <motion.div
            layout
            className="bg-white w-6 h-6 rounded-full shadow-md"
            transition={{ type: "spring", stiffness: 500, damping: 30 }}
          />
        </button>
      );
    }
  },
  "Segmented Control": {
    name: "Segmented Picker",
    description: "Sliding capsule tab selector with frictionless spring layout animations.",
    code: `import { motion } from "motion/react";\nimport { useState } from "react";\n\nconst options = ["Light", "Dark", "System"];\n\nexport default function Segmented() {\n  const [selected, setSelected] = useState("Light");\n  return (\n    <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl h-10 w-64 relative border border-neutral-200/30 dark:border-white/5">\n      {options.map((opt) => (\n        <button\n          key={opt}\n          onClick={() => setSelected(opt)}\n          className="flex-1 relative text-[13px] font-[600] text-neutral-800 dark:text-neutral-200 z-10"\n        >\n          {selected === opt && (\n            <motion.div\n              layoutId="activeSegment"\n              className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200/50 dark:border-white/5 z-0"\n              transition={{ type: "spring", stiffness: 450, damping: 28 }}\n            />\n          )}\n          <span className="relative z-10">{opt}</span>\n        </button>\n      ))}\n    </div>\n  );\n}`,
    render: (state, setState) => {
      const options = ["Light", "Dark", "System"];
      const selected = state.selectedSegment || "Light";
      return (
        <div className="flex bg-neutral-100 dark:bg-neutral-900 p-1 rounded-xl h-10 w-64 relative border border-neutral-200/30 dark:border-white/5">
          {options.map((opt) => (
            <button
              key={opt}
              onClick={() => setState({ ...state, selectedSegment: opt })}
              className={`flex-1 relative text-[13px] font-[600] cursor-pointer z-10 transition-colors ${
                selected === opt ? "text-neutral-950 dark:text-white" : "text-neutral-500 dark:text-neutral-400"
              }`}
            >
              {selected === opt && (
                <motion.div
                  layoutId="activeSegmentPlay"
                  className="absolute inset-0 bg-white dark:bg-neutral-800 rounded-lg shadow-sm border border-neutral-200/50 dark:border-white/5 z-0"
                  transition={{ type: "spring", stiffness: 450, damping: 28 }}
                />
              )}
              <span className="relative z-10">{opt}</span>
            </button>
          ))}
        </div>
      );
    }
  },
  "Slider": {
    name: "iOS Slim Slider",
    description: "Fluid progress control adjusting width, scale, and numeric details dynamically.",
    code: `import { useState } from "react";\n\nexport default function Slider() {\n  const [val, setVal] = useState(50);\n  return (\n    <div className="w-64 flex flex-col gap-2">\n      <div className="flex justify-between text-[13px] font-semibold text-neutral-500">\n        <span>Volume</span>\n        <span>{val}%</span>\n      </div>\n      <input\n        type="range"\n        min="0" max="100"\n        value={val}\n        onChange={(e) => setVal(Number(e.target.value))}\n        className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-black dark:accent-white"\n      />\n    </div>\n  );\n}`,
    render: (state, setState) => {
      const val = state.sliderVal ?? 50;
      return (
        <div className="w-64 flex flex-col gap-2">
          <div className="flex justify-between text-[13px] font-semibold text-neutral-500 dark:text-neutral-400">
            <span>Volume Control</span>
            <span>{val}%</span>
          </div>
          <input
            type="range"
            min="0"
            max="100"
            value={val}
            onChange={(e) => setState({ ...state, sliderVal: Number(e.target.value) })}
            className="w-full h-1.5 bg-neutral-200 dark:bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-[#141414] dark:accent-white"
          />
        </div>
      );
    }
  },
  "Spaced Chat Input": {
    name: "Spaced-out Chat Input",
    description: "Lab #016: Interactive message list & chat input with synthesized mechanical keyboard typing sounds and pops.",
    code: `"use client";\n\nimport React, { useState, useEffect, useRef } from "react";\nimport { motion, AnimatePresence } from "motion/react";\nimport { Send } from "lucide-react";\n\nexport function SpacedChat() {\n  const [messages, setMessages] = useState([\n    { id: "1", text: "Welcome to Aconiti! 🔉 Turn sound ON", isSender: false },\n    { id: "2", text: "Type below to hear the clicks...", isSender: false }\n  ]);\n  const [inputValue, setInputValue] = useState("");\n  const [isFocused, setIsFocused] = useState(false);\n  const audioCtxRef = useRef(null);\n\n  const playClickSound = () => {\n    try {\n      const AudioCtx = window.AudioContext || window.webkitAudioContext;\n      if (!audioCtxRef.current && AudioCtx) audioCtxRef.current = new AudioCtx();\n      const ctx = audioCtxRef.current;\n      if (!ctx) return;\n      if (ctx.state === "suspended") ctx.resume();\n      const osc = ctx.createOscillator();\n      const gain = ctx.createGain();\n      osc.connect(gain);\n      gain.connect(ctx.destination);\n      osc.type = "sine";\n      osc.frequency.setValueAtTime(1300 + Math.random() * 500, ctx.currentTime);\n      gain.gain.setValueAtTime(0.04, ctx.currentTime);\n      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.03);\n      osc.start();\n      osc.stop(ctx.currentTime + 0.04);\n    } catch (e) {}\n  };\n\n  return (\n    <div className="w-[412px] h-[312px] rounded-[24px] bg-[#161A23] p-6 relative flex flex-col justify-end overflow-hidden border border-white/5">\n      {/* View full code on GitHub */}\n    </div>\n  );\n}`,
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
  "Sticky Cards": {
    name: "Sticky Scroll Cards",
    description: "ReactLenis + Framer Motion: Interactive stacking scroll cards with perspective scaling and rotating tilt transforms.",
    code: `"use client";\n\nimport {\n  motion,\n  useInView,\n  useMotionValue,\n  useScroll,\n  useTransform,\n} from "motion/react";\nimport { ReactLenis } from "lenis/react";\nimport React, { useEffect, useRef, useState } from "react";\n\nexport function Skiper34() {\n  return (\n    <ReactLenis root>\n      <section className="relative flex w-screen flex-col items-center gap-[10vh] px-4 pt-[50vh]">\n         {/* Stacking Sticky Cards scroll flow ... */}\n      </section>\n    </ReactLenis>\n  );\n}`,
    render: (state, setState) => {
      return (
        <div className="flex flex-col items-center gap-4 text-center p-4">
          <div className="w-12 h-12 rounded-full bg-[#3b82f6]/10 text-[#3b82f6] flex items-center justify-center animate-bounce">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
          <span className="text-[15px] font-bold text-[#141414] dark:text-white">
            Sticky Scroll is Active!
          </span>
          <p className="text-[12px] text-neutral-500 dark:text-neutral-400 max-w-[220px] leading-relaxed">
            Scroll down the main page to see the card stack animation dynamically mount below this playground.
          </p>
        </div>
      );
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
  }
};

export function InteractiveShowcase() {
  const [activePlayground, setActivePlayground] = useState("iOS Toggle");
  const [copied, setCopied] = useState(false);
  const [showCode, setShowCode] = useState(false);
  const [state, setState] = useState({
    toggle: false,
    selectedSegment: "Light",
    sliderVal: 65
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(PLAYGROUNDS[activePlayground].code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full bg-white dark:bg-[#141414] flex flex-col items-center">
      
      {/* 1. Component Sandbox Playground */}
      <section className="py-24 md:py-32 w-full max-w-[1280px] px-6 flex flex-col items-center border-t border-neutral-100 dark:border-white/5">
        <div className="text-center mb-16 max-w-2xl">
          <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-400 dark:text-neutral-500 block mb-3">Interactive Sandbox</span>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight text-[#141414] dark:text-white mb-4">
            Component Playground
          </h2>
          <p className="text-neutral-500 dark:text-neutral-400 font-medium">
            Test animations and copy production-ready code directly in your browser.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 w-full">
          {/* Menu Selector Column */}
          <div className="lg:col-span-3 flex flex-col gap-2">
            {Object.keys(PLAYGROUNDS).map((key) => (
              <button
                key={key}
                onClick={() => {
                  setActivePlayground(key);
                  setCopied(false);
                }}
                className={`w-full px-5 py-4 rounded-2xl text-[15px] font-[600] text-left transition-all border flex items-center justify-between cursor-pointer ${
                  activePlayground === key
                    ? "bg-neutral-100 dark:bg-[#1d1f27] border-neutral-200 dark:border-white/5 text-[#141414] dark:text-white"
                    : "bg-transparent border-transparent text-neutral-500 hover:bg-neutral-50 dark:hover:bg-white/[0.02] hover:text-[#141414] dark:hover:text-white"
                }`}
              >
                <span>{key}</span>
                <Code2 className="w-4 h-4 opacity-50" />
              </button>
            ))}
          </div>

          {/* Playground Interactive Output Area */}
          <div className={`${showCode ? "lg:col-span-4" : "lg:col-span-9"} bg-neutral-50 dark:bg-[#1d1f27]/30 border border-neutral-200/50 dark:border-white/5 rounded-[32px] min-h-[350px] flex flex-col justify-between p-8 relative overflow-hidden shadow-sm transition-all duration-350 ease-in-out`}>
            <div className="flex justify-between items-start gap-4">
              <div className="flex flex-col gap-2 text-left">
                <span className="text-[11px] font-bold tracking-wider text-neutral-400 dark:text-neutral-500 uppercase">Interactive Preview</span>
                <h3 className="text-xl font-bold tracking-tight text-neutral-900 dark:text-white">{PLAYGROUNDS[activePlayground].name}</h3>
                <p className="text-[14px] text-neutral-500 dark:text-neutral-400 font-medium">{PLAYGROUNDS[activePlayground].description}</p>
              </div>
              <button
                onClick={() => setShowCode(!showCode)}
                className="flex items-center gap-1.5 text-[12px] font-semibold bg-white/10 dark:bg-white/5 hover:bg-neutral-100 dark:hover:bg-white/10 active:scale-95 text-neutral-800 dark:text-white border border-neutral-200 dark:border-white/5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer select-none shrink-0"
              >
                <Code2 className="w-3.5 h-3.5" />
                <span>{showCode ? "Hide Code" : "View Code"}</span>
              </button>
            </div>
            
            <div className="my-auto flex justify-center items-center py-8">
              {PLAYGROUNDS[activePlayground].render(state, setState)}
            </div>

            <div className="flex items-center gap-1.5 text-[12px] font-semibold text-neutral-400 dark:text-neutral-500">
              <Sparkles className="w-4 h-4 text-amber-500 animate-pulse" />
              <span>Click to interact with preview</span>
            </div>
          </div>

          {/* Styled Code Viewer */}
          {showCode && (
            <div className="lg:col-span-5 bg-[#1d1f27] rounded-[32px] border border-white/5 shadow-lg overflow-hidden flex flex-col justify-between h-[350px] md:h-auto animate-fade-in">
              <div className="flex justify-between items-center px-6 py-4 border-b border-white/5 bg-[#141414]/50">
                <div className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full bg-[#ff5f56]" />
                  <span className="w-3 h-3 rounded-full bg-[#ffbd2e]" />
                  <span className="w-3 h-3 rounded-full bg-[#27c93f]" />
                  <span className="text-[12px] font-mono text-neutral-500 ml-2">code.tsx</span>
                </div>
                <button
                  onClick={handleCopy}
                  className="flex items-center gap-1.5 text-[12px] font-semibold bg-white/5 hover:bg-white/10 active:scale-95 text-white border border-white/5 px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5 text-neutral-400" />
                      <span>Copy code</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-6 text-[13px] font-mono text-neutral-300 overflow-y-auto no-scrollbar flex-grow bg-[#1d1f27] text-left leading-relaxed">
                <code>{PLAYGROUNDS[activePlayground].code}</code>
              </pre>
            </div>
          )}
        </div>
      </section>

      {activePlayground === "Sticky Cards" && (
        <div className="w-full border-y border-neutral-100 dark:border-white/5 bg-neutral-50/50 dark:bg-black/10 py-12 flex flex-col items-center">
          <Skiper34 />
        </div>
      )}

      {/* 2. Figma Plugin Integration Showcase */}
      <section className="py-24 md:py-32 w-full max-w-[1280px] px-6 border-t border-neutral-100 dark:border-white/5">
        <div className="bg-neutral-950 text-white rounded-[40px] p-8 md:p-16 lg:p-20 relative overflow-hidden shadow-2xl flex flex-col lg:flex-row gap-12 justify-between items-center border border-white/5">
          {/* Background Gradient Glow */}
          <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#0065ff]/10 rounded-full blur-[100px] pointer-events-none" />
          
          <div className="flex flex-col gap-6 max-w-xl text-left z-10">
            <span className="text-[11px] font-bold tracking-[0.15em] uppercase text-neutral-500 dark:text-neutral-400 block mb-1">Figma Workflow</span>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
              Design and code, <br />synced in one click.
            </h2>
            <p className="text-lg text-neutral-400 leading-relaxed font-medium">
              A premium drag-and-drop Figma plugin connects your designs straight to development. Copy component structures or complete responsive pages directly into your web project without leaving the canvas.
            </p>
            <div className="flex flex-wrap items-center gap-4 mt-2">
              <a href="#" className="bg-white text-neutral-950 font-semibold px-6 py-3 rounded-full text-[15px] flex items-center gap-2 hover:opacity-90 active:scale-95 transition-all cursor-pointer">
                <Download className="w-4 h-4" /> Install Figma Plugin
              </a>
              <a href="#" className="bg-transparent border border-white/20 text-white hover:bg-white/5 font-semibold px-6 py-3 rounded-full text-[15px] flex items-center gap-2 active:scale-95 transition-all cursor-pointer">
                <Layers className="w-4 h-4" /> Explore UI Kit
              </a>
            </div>
          </div>

          {/* Plugin Interactive Graphic Mockup */}
          <div className="w-full lg:w-[480px] h-[350px] bg-neutral-900 border border-white/10 rounded-[32px] p-6 shadow-2xl relative flex flex-col justify-between overflow-hidden z-10">
            {/* Top Bar of Plugin mock */}
            <div className="flex justify-between items-center border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 rounded-lg bg-white/10 flex items-center justify-center font-bold text-[12px] text-white">O₂</div>
                <span className="text-[13px] font-bold text-white tracking-tight">Oxygen UI Plugin</span>
              </div>
              <span className="bg-[#3b82f6]/20 text-[#3b82f6] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#3b82f6]/10 uppercase tracking-wider">v1.2.0</span>
            </div>

            {/* Content Mock List */}
            <div className="flex flex-col gap-3 my-auto py-4">
              <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#34c759]/10 border border-[#34c759]/20 flex items-center justify-center text-xs text-[#34c759]">T</div>
                  <div className="flex flex-col text-left">
                    <span className="text-[13px] font-bold text-white leading-tight">iOS Toggle Switch</span>
                    <span className="text-[11px] text-neutral-400">Interactive motion switch</span>
                  </div>
                </div>
                <span className="text-[12px] text-[#3b82f6] font-semibold">Ready</span>
              </div>

              <div className="flex justify-between items-center p-3.5 bg-white/5 rounded-xl border border-white/5 hover:border-white/10 transition-colors">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-[#5856d6]/10 border border-[#5856d6]/20 flex items-center justify-center text-xs text-[#5856d6]">S</div>
                  <div className="flex flex-col text-left">
                    <span className="text-[13px] font-bold text-white leading-tight">Segmented Picker</span>
                    <span className="text-[11px] text-neutral-400">Smooth sliding navigation control</span>
                  </div>
                </div>
                <span className="text-[12px] text-[#3b82f6] font-semibold">Ready</span>
              </div>
            </div>

            {/* Drag Drop Hint Footer */}
            <div className="bg-[#141414] rounded-2xl p-4 flex justify-between items-center border border-white/5">
              <span className="text-[12px] font-medium text-neutral-400">Hover & click to drop frame to Figma canvas</span>
              <motion.div 
                animate={{ y: [0, -4, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="w-8 h-8 bg-white text-neutral-900 rounded-full flex items-center justify-center shadow-lg"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
