import React, { useState, useEffect, useRef } from "react";
import gsap from "gsap";

const CYLINDER_ITEMS = [
  "Vinny Blaze", "Lola Vance", "Rex Delgado", "Ruby Knox", 
  "Mickey Torque", "Joey Marlowe", "Scarlet Dune", "Bobby Vega", 
  "Cass Nova", "Lance Fury", "Frankie Valence", "Nina Rocco"
];

const CIRCLE_LEFT = [
  "Jean Morel", "Claire Monet", "Lucie Marin", "André Roche", 
  "Hélène Vidal", "Pierre Noel", "Marcel Duroc", "Simone Rey", 
  "Lucien Arto", "Colette Fay", "Henri Blanc", "Marie Roche", 
  "René Duval", "Juliette Roy", "Alain Giroux", "Sylvie Moret", 
  "Jacques Lenoir", "Monique Barel", "Claude Verne", "Odette Perrin", 
  "Pauline Arcy", "Victor Lamy", "Bernard Faye", "Aimée Duret"
];

const CIRCLE_RIGHT = [
  "Émile Ravel", "Camille Dorny", "Sophie Lalot", "Gaston Merle", 
  "Estelle Dupre", "Lucien Beart", "Thérèse Loup", "Raymond Vallé", 
  "Odile Garnet", "Maurice Leno", "Irène Faure", "Charles Duret", 
  "Elise Corbin", "Roland Marec", "Delphine Noé", "François Borel", 
  "Nathalie Cour", "Georges Leval", "Solange Bret", "Étienne Dupré", 
  "Renée Marchal", "Antoine Lory", "Michèle Arcy", "Pascal Duret"
];

const TUBE_ITEMS = [
  "Coco", "Maria", "Dan", "Miko", "Vigo", 
  "Coco", "Maria", "Dan", "Miko", "Vigo"
];

export default function ThreeDTextAnimation() {
  const [activeTab, setActiveTab] = useState<"Cylinder" | "Circle" | "Tube">("Cylinder");
  const [scrollProgress, setScrollProgress] = useState(0);

  const containerRef = useRef<HTMLDivElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const cylinderTextWrapperRef = useRef<HTMLUListElement>(null);
  const tubeTextWrapperRef = useRef<HTMLUListElement>(null);
  const circleLeftRef = useRef<HTMLUListElement>(null);
  const circleRightRef = useRef<HTMLUListElement>(null);

  // Re-calculate layout parameters based on viewport/container sizes
  useEffect(() => {
    const handleLayout = () => {
      const container = containerRef.current;
      if (!container) return;

      const width = container.clientWidth || 640;
      const height = container.clientHeight || 450;
      const sizeMin = Math.min(width, height);

      if (activeTab === "Cylinder") {
        const radius = sizeMin * 0.35;
        const items = container.querySelectorAll(".cylinder__text__item");
        const spacing = 180 / items.length;

        items.forEach((item, index) => {
          const htmlItem = item as HTMLElement;
          const angle = (index * spacing * Math.PI) / 180;
          const rotationAngle = index * -spacing;

          const y = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;

          htmlItem.style.transform = `translate3d(-50%, -50%, 0) translate3d(0px, ${y}px, ${z}px) rotateX(${rotationAngle}deg)`;
        });
      } else if (activeTab === "Circle") {
        const radius = Math.min(width * 0.3, height * 0.45);
        const centerX = width / 2;
        const centerY = height / 2;

        const leftItems = container.querySelectorAll(".circle__text__left__item");
        const leftSpacing = Math.PI / leftItems.length;
        leftItems.forEach((item, index) => {
          const htmlItem = item as HTMLElement;
          const angle = index * leftSpacing - scrollProgress * 0.5 * 1.0 * Math.PI * 2;
          // Offset left circle center
          const x = (centerX - radius * 0.6) + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const rotation = (angle * 180) / Math.PI;

          htmlItem.style.left = "0px";
          htmlItem.style.top = "0px";
          htmlItem.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rotation}deg) translate(-50%, -50%)`;
        });

        const rightItems = container.querySelectorAll(".circle__text__right__item");
        const rightSpacing = Math.PI / rightItems.length;
        rightItems.forEach((item, index) => {
          const htmlItem = item as HTMLElement;
          const angle = index * rightSpacing - scrollProgress * 0.5 * -1.0 * Math.PI * 2;
          // Offset right circle center
          const x = (centerX + radius * 0.6) + Math.cos(angle) * radius;
          const y = centerY + Math.sin(angle) * radius;
          const rotation = (angle * 180) / Math.PI + 180;

          htmlItem.style.left = "0px";
          htmlItem.style.top = "0px";
          htmlItem.style.transform = `translate3d(${x}px, ${y}px, 0px) rotate(${rotation}deg) translate(-50%, -50%)`;
        });
      } else if (activeTab === "Tube") {
        const radius = sizeMin * 0.38;
        const items = container.querySelectorAll(".tube__text__item");
        const spacing = 360 / items.length;

        items.forEach((item, index) => {
          const htmlItem = item as HTMLElement;
          const angle = (index * spacing * Math.PI) / 180;

          const x = Math.sin(angle) * radius;
          const z = Math.cos(angle) * radius;
          const rotationY = index * spacing;

          htmlItem.style.transform = `translate3d(-50%, -50%, 0) translate3d(${x}px, 0px, ${z}px) rotateY(${rotationY}deg)`;
        });
      }
    };

    handleLayout();
    window.addEventListener("resize", handleLayout);
    return () => window.removeEventListener("resize", handleLayout);
  }, [activeTab, scrollProgress]);

  const handleScroll = () => {
    const scrollContainer = scrollContainerRef.current;
    if (!scrollContainer) return;
    const progress = scrollContainer.scrollTop / (scrollContainer.scrollHeight - scrollContainer.clientHeight || 1);
    setScrollProgress(progress);

    // Apply scroll transformations directly using GSAP or styles
    if (activeTab === "Cylinder" && cylinderTextWrapperRef.current) {
      const rotX = -80 + progress * 350;
      cylinderTextWrapperRef.current.style.transform = `rotateX(${rotX}deg)`;
    } else if (activeTab === "Tube" && tubeTextWrapperRef.current) {
      const rotY = progress * 360;
      tubeTextWrapperRef.current.style.transform = `rotateZ(15deg) rotateY(${rotY}deg)`;
    }
  };

  return (
    <div 
      ref={containerRef}
      className="relative w-full h-[450px] bg-black text-white overflow-hidden rounded-2xl border border-white/5 font-sans flex flex-col items-center justify-between p-6 select-none"
    >
      <style dangerouslySetInnerHTML={{ __html: `
        .cylinder__text__wrapper, .tube__text__wrapper {
          transform-style: preserve-3d;
          transform-origin: center center;
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .cylinder__text__item {
          font-size: clamp(1.2rem, 3.5vw, 2.8rem);
          font-weight: 900;
          text-transform: uppercase;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          backface-visibility: hidden;
          text-align: center;
        }
        .tube__text__item {
          font-size: clamp(1rem, 3vw, 2.2rem);
          font-weight: 700;
          text-transform: uppercase;
          position: absolute;
          top: 50%;
          left: 50%;
          width: 100%;
          backface-visibility: hidden;
          text-align: center;
        }
        .circle__text__wrapper__left, .circle__text__wrapper__right {
          position: absolute;
          width: 100%;
          height: 100%;
          padding: 0;
          margin: 0;
          list-style: none;
        }
        .circle__text__left__item, .circle__text__right__item {
          position: absolute;
          font-weight: 700;
          font-size: clamp(0.7rem, 2.2vw, 1.8rem);
          text-transform: uppercase;
          width: auto;
          white-space: nowrap;
        }
      `}} />

      {/* Tabs Menu */}
      <div className="w-full max-w-lg z-30 flex flex-col gap-1.5 shrink-0">
        <div className="flex gap-1.5 justify-start py-1">
          {(["Cylinder", "Circle", "Tube"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setScrollProgress(0);
                if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
              }}
              className={`px-4 py-1.5 rounded-full text-[11px] font-bold tracking-tight whitespace-nowrap transition-all border cursor-pointer ${
                activeTab === tab
                  ? "bg-amber-500 border-amber-400 text-black font-black"
                  : "bg-white/5 border-white/5 text-gray-400 hover:text-white"
              }`}
            >
              {tab} Layout
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-500 text-left px-1">
          {activeTab === "Cylinder" && "3D Cylinder Text: Words rotate along an external barrel circumference."}
          {activeTab === "Circle" && "3D Circle Text: Interlocking double circular words spinning in opposing orbits."}
          {activeTab === "Tube" && "3D Tube Text: Cylindrical inside-out text tunnel spinning in diagonal tilt."}
        </p>
      </div>

      {/* 3D Sandbox Container */}
      <div className="w-full flex-1 min-h-0 relative flex items-center justify-center overflow-hidden [perspective:1000px] z-10">
        
        {activeTab === "Cylinder" && (
          <ul ref={cylinderTextWrapperRef} className="cylinder__text__wrapper" style={{ transform: "rotateX(-80deg)" }}>
            {CYLINDER_ITEMS.map((txt, i) => (
              <li key={i} className="cylinder__text__item text-amber-500/90 dark:text-amber-400/90">
                {txt}
              </li>
            ))}
          </ul>
        )}

        {activeTab === "Circle" && (
          <>
            <ul ref={circleLeftRef} className="circle__text__wrapper__left">
              {CIRCLE_LEFT.map((txt, i) => (
                <li key={i} className="circle__text__left__item text-blue-400">
                  {txt}
                </li>
              ))}
            </ul>
            <ul ref={circleRightRef} className="circle__text__wrapper__right">
              {CIRCLE_RIGHT.map((txt, i) => (
                <li key={i} className="circle__text__right__item text-emerald-400">
                  {txt}
                </li>
              ))}
            </ul>
          </>
        )}

        {activeTab === "Tube" && (
          <ul ref={tubeTextWrapperRef} className="tube__text__wrapper" style={{ transform: "rotateZ(15deg) rotateY(0deg)" }}>
            {TUBE_ITEMS.map((txt, i) => (
              <li key={i} className="tube__text__item text-purple-400">
                {txt}
              </li>
            ))}
          </ul>
        )}

      </div>

      {/* Internal Scroll Driver */}
      <div 
        ref={scrollContainerRef}
        onScroll={handleScroll}
        className="absolute inset-0 z-20 overflow-y-auto no-scrollbar scroll-smooth"
      >
        <div className="w-full h-[600px] pointer-events-none" />
      </div>

      {/* Instructions */}
      <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-30 pointer-events-none bg-black/50 border border-white/10 px-4 py-2 rounded-full text-[10px] font-bold tracking-widest text-white/80 uppercase backdrop-blur-sm">
        Scroll anywhere on the component to rotate
      </div>
    </div>
  );
}
