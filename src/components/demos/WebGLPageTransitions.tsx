import React, { useState, useRef } from "react";
import gsap from "gsap";
import { Sparkles, RefreshCw, Layers } from "lucide-react";

type TransitionType = "inset" | "morph" | "draw" | "bloom" | "polygon";

const TRANSITIONS: { id: TransitionType; label: string; desc: string }[] = [
  { id: "inset", label: "Clip Inset", desc: "Ciel Rose Style: Slide-in clipping mask from bottom with viewport scaling." },
  { id: "morph", label: "Morphing SVG", desc: "GreenSock Morph: Fluid curved liquid SVG morphs from flat to dome to full screen." },
  { id: "draw", label: "Stroke Draw", desc: "Truus Style: Linear outline trace overlay swelling to full color blocks." },
  { id: "bloom", label: "Bloom Diagonal", desc: "Bloom Style: Centered polygon wedge scaling up and unfolding out." },
  { id: "polygon", label: "Contact Expand", desc: "Leandra Isler Style: Letterbox polygon expanding into a full layout." }
];

export default function WebGLPageTransitions() {
  const [activeTransition, setActiveTransition] = useState<TransitionType>("inset");
  const [currentPage, setCurrentPage] = useState<"A" | "B">("A");
  const [isTransitioning, setIsTransitioning] = useState(false);

  const containerRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const drawPathRef = useRef<SVGPathElement>(null);

  const runTransition = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);

    const nextPage = currentPage === "A" ? "B" : "A";
    const currentContainer = containerRef.current?.querySelector(".view-current") as HTMLElement;
    const nextContainer = containerRef.current?.querySelector(".view-next") as HTMLElement;
    const overlay = overlayRef.current;

    if (!currentContainer || !nextContainer || !overlay) {
      setIsTransitioning(false);
      return;
    }

    const tl = gsap.timeline({
      onComplete: () => {
        setCurrentPage(nextPage);
        setIsTransitioning(false);
      }
    });

    if (activeTransition === "inset") {
      // 1. Clip Inset Slide-in
      gsap.set(nextContainer, {
        position: "absolute",
        inset: 0,
        scale: 0.6,
        clipPath: "inset(100% 0 0 0)",
        opacity: 0
      });

      tl.to(currentContainer, {
        scale: 0.7,
        opacity: 0.5,
        duration: 0.6,
        ease: "power2.inOut"
      })
      .to(nextContainer, {
        clipPath: "inset(0% 0 0 0)",
        opacity: 1,
        duration: 0.6,
        ease: "power3.inOut"
      }, "-=0.3")
      .to(nextContainer, {
        scale: 1,
        duration: 0.4,
        ease: "power2.out"
      });

    } else if (activeTransition === "morph") {
      // 2. Liquid Morphing SVG
      const path = pathRef.current;
      if (!path) return;

      gsap.set(overlay, { display: "block", opacity: 1 });
      gsap.set(path, { attr: { d: "M 0 100 V 100 Q 50 100 100 100 V 100 z" }, fill: "#3b82f6" });

      tl.to(path, {
        attr: { d: "M 0 100 V 50 Q 50 0 100 50 V 100 z" },
        duration: 0.45,
        ease: "power2.in"
      })
      .to(path, {
        attr: { d: "M 0 100 V 0 Q 50 0 100 0 V 100 z" },
        duration: 0.35,
        ease: "power1.out",
        onComplete: () => {
          setCurrentPage(nextPage);
        }
      })
      .to(path, {
        attr: { d: "M 0 0 V 50 Q 50 100 100 50 V 0 z" },
        duration: 0.4,
        ease: "power1.in"
      })
      .to(path, {
        attr: { d: "M 0 0 V 0 Q 50 0 100 0 V 0 z" },
        duration: 0.35,
        ease: "power2.out"
      })
      .set(overlay, { display: "none" });

    } else if (activeTransition === "draw") {
      // 3. Stroke Outline Draw
      const drawPath = drawPathRef.current;
      if (!drawPath) return;

      gsap.set(overlay, { display: "block", opacity: 1 });
      gsap.set(drawPath, { strokeDashoffset: 1200, opacity: 1, strokeWidth: 100 });

      tl.to(drawPath, {
        strokeDashoffset: 0,
        duration: 0.65,
        ease: "sine.inOut"
      })
      .to(drawPath, {
        strokeWidth: 400,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          setCurrentPage(nextPage);
        }
      })
      .to(drawPath, {
        strokeWidth: 100,
        duration: 0.35,
        ease: "power2.in"
      })
      .to(drawPath, {
        strokeDashoffset: -1200,
        duration: 0.55,
        ease: "sine.inOut"
      })
      .set(overlay, { display: "none" });

    } else if (activeTransition === "bloom") {
      // 4. Bloom Polygon Clip
      gsap.set(overlay, { 
        display: "block", 
        opacity: 1, 
        clipPath: "polygon(50% 50%, 50% 50%, 50% 50%, 50% 50%)" 
      });

      tl.to(overlay, {
        clipPath: "polygon(0% 40%, 100% 40%, 100% 60%, 0% 60%)",
        duration: 0.55,
        ease: "power3.inOut"
      })
      .to(overlay, {
        clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        duration: 0.45,
        ease: "expo.out",
        onComplete: () => {
          setCurrentPage(nextPage);
        }
      })
      .to(overlay, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
        duration: 0.55,
        ease: "expo.inOut"
      })
      .set(overlay, { display: "none" });

    } else if (activeTransition === "polygon") {
      // 5. Contact Letterbox Expand
      gsap.set(nextContainer, {
        position: "absolute",
        inset: 0,
        clipPath: "polygon(15% 45%, 85% 45%, 85% 55%, 15% 55%)",
        zIndex: 10,
        opacity: 0
      });

      tl.to(nextContainer, {
        opacity: 1,
        duration: 0.3
      })
      .to(nextContainer, {
        clipPath: "polygon(0% 100%, 100% 100%, 100% 0%, 0% 0%)",
        duration: 0.85,
        ease: "expo.inOut"
      })
      .set(nextContainer, {
        clearProps: "all"
      });
    }
  };

  return (
    <div className="relative w-full h-[450px] bg-[#0c0d12] overflow-hidden rounded-2xl border border-white/5 font-sans flex flex-col items-center justify-between p-6">
      
      {/* Selection toolbar */}
      <div className="w-full max-w-lg z-30 flex flex-col gap-2 select-none">
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-1">
          {TRANSITIONS.map((t) => (
            <button
              key={t.id}
              onClick={() => !isTransitioning && setActiveTransition(t.id)}
              disabled={isTransitioning}
              className={`px-3 py-1.5 rounded-full text-[11px] font-bold tracking-tight whitespace-nowrap transition-all border cursor-pointer ${
                activeTransition === t.id
                  ? "bg-blue-600 border-blue-500 text-white shadow-[0_0_12px_rgba(59,130,246,0.4)]"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
        <p className="text-[11px] text-gray-500 text-left px-1">
          {TRANSITIONS.find((t) => t.id === activeTransition)?.desc}
        </p>
      </div>

      {/* Main View Sandbox Frame */}
      <div 
        ref={containerRef} 
        className="w-full max-w-lg h-[260px] bg-[#14151e] border border-white/10 rounded-2xl overflow-hidden relative shadow-2xl flex items-center justify-center"
      >
        {/* Full-bleed morph/draw SVG canvas overlay */}
        <div ref={overlayRef} className="absolute inset-0 pointer-events-none z-40 hidden bg-[#14151e]">
          <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
            {/* Morphing Path */}
            {activeTransition === "morph" && (
              <path ref={pathRef} d="M 0 100 V 100 Q 50 100 100 100 V 100 z" />
            )}
            
            {/* Stroke Draw Path */}
            {activeTransition === "draw" && (
              <path 
                ref={drawPathRef} 
                d="M -50,50 L 150,50" 
                stroke="#6366f1"
                strokeWidth="100"
                strokeDasharray="1200"
                strokeDashoffset="1200"
                fill="none"
              />
            )}
          </svg>
        </div>

        {/* View Page A */}
        <div 
          className={`view-current w-full h-full p-6 flex flex-col justify-between text-left bg-gradient-to-br from-[#161722] to-[#0f1016] absolute inset-0 transition-opacity duration-300 ${
            currentPage === "A" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Exhibition</span>
            <h4 className="text-xl font-bold tracking-tight text-white mt-1">Ciel Rose Gallery</h4>
            <p className="text-[12px] text-neutral-400 max-w-[280px] mt-2 leading-relaxed">
              Expeditions explore paths containing extreme cold and wind desolations.
            </p>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
            <span className="text-[10px] text-gray-500 font-bold">PAGE 01 / HOME</span>
            <span className="w-6 h-6 rounded-full bg-blue-500 flex items-center justify-center text-xs">✨</span>
          </div>
        </div>

        {/* View Page B */}
        <div 
          className={`view-next w-full h-full p-6 flex flex-col justify-between text-left bg-gradient-to-br from-[#1d1525] to-[#120a16] absolute inset-0 transition-opacity duration-300 ${
            currentPage === "B" ? "opacity-100 z-10" : "opacity-0 z-0 pointer-events-none"
          }`}
        >
          <div>
            <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Connect</span>
            <h4 className="text-xl font-bold tracking-tight text-white mt-1">Get in Touch</h4>
            <p className="text-[12px] text-neutral-400 max-w-[280px] mt-2 leading-relaxed">
              Have questions about transitions or visual parameters? Connect directly.
            </p>
          </div>
          <div className="flex justify-between items-center border-t border-white/5 pt-4">
            <span className="text-[10px] text-gray-500 font-bold">PAGE 02 / CONTACT</span>
            <span className="w-6 h-6 rounded-full bg-purple-500 flex items-center justify-center text-xs text-black font-bold">→</span>
          </div>
        </div>
      </div>

      {/* Action Trigger Button */}
      <button 
        onClick={runTransition}
        disabled={isTransitioning}
        className="px-5 py-2.5 rounded-full bg-white text-black font-bold text-xs uppercase tracking-wider flex items-center gap-2 hover:bg-neutral-200 active:scale-95 transition-all cursor-pointer z-30"
      >
        <RefreshCw className={`w-3.5 h-3.5 ${isTransitioning ? "animate-spin" : ""}`} />
        Trigger Transition
      </button>

    </div>
  );
}
