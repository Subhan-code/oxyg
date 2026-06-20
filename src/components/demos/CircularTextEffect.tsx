"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { RefreshCw, Play } from "lucide-react";

export function CircularTextEffect() {
  const [activeDemo, setActiveDemo] = useState<number>(1);
  const [isEntered, setIsEntered] = useState<boolean>(false);
  const svgRef = useRef<SVGSVGElement>(null);
  const enterBtnRef = useRef<HTMLButtonElement>(null);
  const enterBgRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);

  // Play intro timeline on mount or demo change
  const runIntroTimeline = () => {
    if (!svgRef.current) return;
    setIsEntered(false);
    
    const texts = Array.from(svgRef.current.querySelectorAll("text.circles__text"));
    const enterBtn = enterBtnRef.current;
    const enterBg = enterBgRef.current;
    const content = contentRef.current;
    const header = headerRef.current;

    // Reset initial styles
    gsap.killTweensOf([texts, enterBtn, enterBg, content, header]);
    gsap.set(texts, { transformOrigin: "50% 50%", rotation: 0, scale: 0.3, opacity: 0 });
    gsap.set(enterBtn, { scale: 0.3, opacity: 0, pointerEvents: "none" });
    gsap.set(enterBg, { scale: 1, opacity: 1 });
    if (content) gsap.set(content.children, { opacity: 0, y: 30 });
    if (header) gsap.set(header.children, { opacity: 0, y: -20 });

    const tl = gsap.timeline();

    if (activeDemo === 1) {
      tl.addLabel("start", 0)
        .to([texts, enterBtn], {
          duration: 2,
          ease: "expo.out",
          scale: 1,
          opacity: 1,
          stagger: { amount: 0.5 }
        }, "start")
        .add(() => {
          gsap.set(enterBtn, { pointerEvents: "auto" });
        }, "start+=0.8");
    } else if (activeDemo === 2) {
      tl.addLabel("start", 0)
        .to(texts, {
          duration: 2.2,
          ease: "expo.inOut",
          rotation: (i) => (i % 2 === 0 ? 90 : -90),
          stagger: { amount: 0.3 }
        }, "start")
        .to([texts, enterBtn], {
          duration: 2.2,
          ease: "expo.inOut",
          scale: 1,
          opacity: 1,
          stagger: { amount: 0.3 }
        }, "start")
        .add(() => {
          gsap.set(enterBtn, { pointerEvents: "auto" });
        }, "start+=1.2");
    } else if (activeDemo === 3) {
      tl.addLabel("start", 0)
        .to(texts, {
          duration: 2.4,
          ease: "expo.inOut",
          rotation: 120,
          stagger: { amount: 0.4 }
        }, "start")
        .to([texts, enterBtn], {
          duration: 2.4,
          ease: "expo.inOut",
          scale: 1,
          opacity: 1,
          stagger: { amount: 0.4 }
        }, "start")
        .add(() => {
          gsap.set(enterBtn, { pointerEvents: "auto" });
        }, "start+=1.5");
    }
  };

  useEffect(() => {
    runIntroTimeline();
  }, [activeDemo]);

  // Handle enter mouse enter
  const handleMouseEnter = () => {
    if (isEntered || !svgRef.current) return;
    const texts = Array.from(svgRef.current.querySelectorAll("text.circles__text"));
    const enterBg = enterBgRef.current;

    gsap.killTweensOf([enterBg, texts]);

    if (activeDemo === 1) {
      gsap.to(enterBg, { duration: 0.8, ease: "power4.out", scale: 1.2, opacity: 1 });
      gsap.to(texts, {
        duration: 3,
        ease: "power4.out",
        rotation: "+=180",
        stagger: { amount: -0.2 }
      });
    } else if (activeDemo === 2) {
      gsap.to(enterBg, { duration: 0.8, ease: "expo.out", scale: 1.3 });
      gsap.to(texts, {
        duration: 0.8,
        ease: "expo.out",
        scale: 1.12,
        rotation: (i) => (i % 2 === 0 ? "+=90" : "-=90"),
        opacity: 0.4
      });
    } else if (activeDemo === 3) {
      gsap.to(enterBg, { duration: 1, ease: "expo.out", scale: 1.35 });
      gsap.to(texts, {
        duration: 0.6,
        ease: "expo.out",
        rotation: "+=120",
        scale: 0.7,
        opacity: 0.25,
        stagger: { amount: -0.15 }
      });
    }
  };

  // Handle enter mouse leave
  const handleMouseLeave = () => {
    if (isEntered || !svgRef.current) return;
    const texts = Array.from(svgRef.current.querySelectorAll("text.circles__text"));
    const enterBg = enterBgRef.current;

    gsap.killTweensOf([enterBg, texts]);

    if (activeDemo === 1) {
      gsap.to(enterBg, { duration: 0.8, ease: "power4.out", scale: 1 });
    } else if (activeDemo === 2) {
      gsap.to(enterBg, { duration: 0.8, ease: "expo.out", scale: 1 });
      gsap.to(texts, {
        duration: 0.8,
        ease: "expo.out",
        scale: 1,
        rotation: (i) => (i % 2 === 0 ? "-=120" : "+=120"),
        opacity: 1,
        stagger: { amount: -0.15 }
      });
    } else if (activeDemo === 3) {
      gsap.to(enterBg, { duration: 1.5, ease: "elastic.out(1, 0.4)", scale: 1 });
      gsap.to(texts, {
        duration: 1.5,
        ease: "elastic.out(1, 0.4)",
        scale: 1,
        rotation: "-=120",
        opacity: 1,
        stagger: { amount: 0.15 }
      });
    }
  };

  // Trigger enter reveal animation
  const handleEnterClick = () => {
    if (isEntered || !svgRef.current) return;
    setIsEntered(true);

    const texts = Array.from(svgRef.current.querySelectorAll("text.circles__text"));
    const enterBtn = enterBtnRef.current;
    const content = contentRef.current;
    const header = headerRef.current;
    const totalTexts = texts.length;

    gsap.set(enterBtn, { pointerEvents: "none" });

    const tl = gsap.timeline();

    if (activeDemo === 1) {
      tl.addLabel("start", 0)
        .to(enterBtn, { duration: 1.2, ease: "expo.inOut", scale: 0.6, opacity: 0 }, "start")
        .to(texts, {
          duration: 1.2,
          ease: "expo.inOut",
          scale: (i) => 1.4 + (totalTexts - i) * 0.25,
          opacity: 0,
          stagger: { amount: 0.2 }
        }, "start")
        .to([content?.children, header?.children], {
          duration: 1,
          ease: "power3.out",
          y: 0,
          opacity: 1,
          stagger: { amount: 0.3 }
        }, "start+=0.8");
    } else if (activeDemo === 2) {
      tl.addLabel("start", 0)
        .to(enterBtn, { duration: 0.6, ease: "back.in", scale: 0.2, opacity: 0 }, "start")
        .to(texts, {
          duration: 0.8,
          ease: "back.in",
          scale: 0,
          opacity: 0,
          stagger: { amount: -0.3 }
        }, "start")
        .to([content?.children, header?.children], {
          duration: 0.9,
          ease: "back.out",
          y: 0,
          opacity: 1,
          stagger: { amount: 0.3 }
        }, "start+=0.8");
    } else if (activeDemo === 3) {
      tl.addLabel("start", 0)
        .to(enterBtn, { duration: 0.6, ease: "back.in", scale: 0.2, opacity: 0 }, "start")
        .to(texts, {
          duration: 0.8,
          ease: "back.in",
          scale: 1.8,
          opacity: 0,
          rotation: "-=20",
          stagger: { amount: 0.2 }
        }, "start")
        .to([content?.children, header?.children], {
          duration: 0.9,
          ease: "back.out",
          y: 0,
          opacity: 1,
          stagger: { amount: 0.35 }
        }, "start+=0.7");
    }
  };

  return (
    <div className="w-full h-[580px] bg-[#090a0f] text-white flex flex-col font-sans rounded-3xl overflow-hidden border border-white/[0.08] relative">
      {/* Background radial glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(99,102,241,0.06)_0%,transparent_70%)] pointer-events-none" />

      {/* Top Demo Selector */}
      <div className="absolute top-0 inset-x-0 z-30 bg-[#090a0f]/90 backdrop-blur-md border-b border-white/[0.05] p-4 flex justify-between items-center">
        <div>
          <h3 className="text-xs font-black text-white uppercase tracking-wider">Circular Text Effect</h3>
          <p className="text-[9.5px] text-neutral-400 font-semibold">SVG typography rotation & scale transitions</p>
        </div>
        <div className="flex gap-2">
          {[1, 2, 3].map((num) => (
            <button
              key={num}
              onClick={() => setActiveDemo(num)}
              className={`text-[10px] font-bold px-3 py-1.5 rounded-full transition-all border cursor-pointer ${
                activeDemo === num
                  ? "bg-indigo-600 text-white border-indigo-500 shadow-[0_0_12px_rgba(99,102,241,0.4)]"
                  : "bg-white/5 text-neutral-400 border-white/10 hover:bg-white/10 hover:text-white"
              }`}
            >
              Demo 0{num}
            </button>
          ))}
          {isEntered && (
            <button
              onClick={runIntroTimeline}
              className="text-[10px] font-bold px-3 py-1.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 hover:bg-emerald-500/30 flex items-center gap-1 cursor-pointer transition-colors"
            >
              <RefreshCw className="w-3 h-3" />
              <span>Reset</span>
            </button>
          )}
        </div>
      </div>

      {/* Central SVG Circles Area */}
      <div className="flex-1 flex items-center justify-center relative select-none">
        {/* Revealed content blocks when entered */}
        <div
          ref={headerRef}
          className="absolute top-20 text-center flex flex-col items-center pointer-events-none"
        >
          <span className="text-[10px] font-black uppercase text-indigo-400 tracking-[0.2em] mb-1">
            Creative Portfolio
          </span>
          <h1 className="text-4xl font-black uppercase tracking-tight text-white leading-none">
            Oxygen Lab Studio
          </h1>
        </div>

        <div
          ref={contentRef}
          className="absolute bottom-20 px-8 text-center max-w-sm pointer-events-none"
        >
          <p className="text-[12px] text-neutral-400 font-medium leading-relaxed">
            We are a futuristic design sandbox pushing boundaries in tactile digital kinetics, CSS geometry, and spatial interfaces.
          </p>
        </div>

        {/* Concentric SVG Text circles */}
        <svg
          ref={svgRef}
          className="w-[500px] h-[500px] pointer-events-none z-10"
          viewBox="0 0 1400 1400"
        >
          <defs>
            <path id="circle-1" d="M250,700.5A450.5,450.5 0 1 1 1151,700.5A450.5,450.5 0 1 1 250,700.5" />
            <path id="circle-2" d="M382,700.5A318.5,318.5 0 1 1 1019,700.5A318.5,318.5 0 1 1 382,700.5" />
            <path id="circle-3" d="M487,700.5A213.5,213.5 0 1 1 914,700.5A213.5,213.5 0 1 1 487,700.5" />
            <path id="circle-4" d="M567.5,700.5A133,133 0 1 1 833.5,700.5A133,133 0 1 1 567.5,700.5" />
          </defs>
          <g className="fill-none stroke-none">
            <text className="circles__text fill-white font-black text-[30px] uppercase tracking-[0.12em]">
              <textPath xlinkHref="#circle-1" textLength="2830">
                Frihed Kun Stadium Copenhagen&nbsp;•&nbsp;Frihed Kun Stadium Copenhagen&nbsp;•&nbsp;
              </textPath>
            </text>
            <text className="circles__text fill-indigo-400/90 font-bold text-[34px] uppercase tracking-[0.08em]">
              <textPath xlinkHref="#circle-2" textLength="2001">
                Jægerspris Infinite X Playground&nbsp;•&nbsp;Jægerspris Infinite X Playground&nbsp;
              </textPath>
            </text>
            <text className="circles__text fill-white/60 font-semibold text-[38px] uppercase tracking-[0.06em]">
              <textPath xlinkHref="#circle-3" textLength="1341">
                Mit Valg Building Næstved&nbsp;•&nbsp;Mit Valg Building Næstved&nbsp;
              </textPath>
            </text>
            <text className="circles__text fill-indigo-500/70 font-medium text-[42px] uppercase tracking-[0.04em]">
              <textPath xlinkHref="#circle-4" textLength="836">
                Køge For Kærlighed Building VI&nbsp;•&nbsp;
              </textPath>
            </text>
          </g>
        </svg>

        {/* Center Enter button */}
        {!isEntered && (
          <button
            ref={enterBtnRef}
            onClick={handleEnterClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="absolute z-20 w-24 h-24 rounded-full border border-white/10 flex items-center justify-center cursor-pointer group bg-black/40 backdrop-blur-sm transition-shadow hover:shadow-[0_0_24px_rgba(99,102,241,0.35)]"
          >
            <div
              ref={enterBgRef}
              className="absolute inset-1 rounded-full bg-indigo-600/20 group-hover:bg-indigo-600 border border-indigo-500/20 group-hover:border-indigo-500 transition-all duration-300"
            />
            <span className="relative z-10 text-[10px] font-black uppercase tracking-widest text-white flex items-center gap-1 group-hover:scale-105 transition-transform">
              <Play className="w-3.5 h-3.5 fill-white" />
              Enter
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
