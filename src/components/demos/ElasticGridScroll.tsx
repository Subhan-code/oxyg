"use client";

import React, { useState, useEffect, useRef } from "react";
import { ArrowLeft, RefreshCw } from "lucide-react";

const GRID_ITEMS = [
  { img: "/grid/21.webp", caption: "Zorith - L91" },
  { img: "/grid/22.webp", caption: "Mykar - L27" },
  { img: "/grid/23.webp", caption: "Thalon - V75" },
  { img: "/grid/24.webp", caption: "Vexra - N22" },
  { img: "/grid/25.webp", caption: "Drosin - X29" },
  { img: "/grid/26.webp", caption: "Ryndel - Y52" },
  { img: "/grid/27.webp", caption: "Korin - T18" },
  { img: "/grid/28.webp", caption: "Nymera - L50" },
  { img: "/grid/29.webp", caption: "Lektar - X43" },
  { img: "/grid/30.webp", caption: "Fexil - R50" },
  { img: "/grid/31.webp", caption: "Jaleth - N49" },
  { img: "/grid/32.webp", caption: "Torvik - Y15" },
  { img: "/grid/33.webp", caption: "Lumora - X82" },
  { img: "/grid/34.webp", caption: "Zekron - X99" },
  { img: "/grid/35.webp", caption: "Brynd - Q89" },
  { img: "/grid/36.webp", caption: "Solmir - Q91" },
  { img: "/grid/37.webp", caption: "Dareon - N38" },
  { img: "/grid/38.webp", caption: "Noxil - T76" },
  { img: "/grid/39.webp", caption: "Kairon - R28" },
  { img: "/grid/40.webp", caption: "Voric - T97" },
  { img: "/grid/1.webp", caption: "Aelph - K12" },
  { img: "/grid/2.webp", caption: "Beryn - M45" },
  { img: "/grid/3.webp", caption: "Caelus - P98" },
  { img: "/grid/4.webp", caption: "Dhorin - A32" },
  { img: "/grid/5.webp", caption: "Elion - F87" },
  { img: "/grid/6.webp", caption: "Faelar - W09" },
  { img: "/grid/7.webp", caption: "Galthor - G44" },
  { img: "/grid/8.webp", caption: "Hesper - H56" },
  { img: "/grid/9.webp", caption: "Ithil - S33" },
  { img: "/grid/10.webp", caption: "Jorgan - D12" },
  { img: "/grid/11.webp", caption: "Kaelen - Z08" },
  { img: "/grid/12.webp", caption: "Lysander - L64" },
  { img: "/grid/13.webp", caption: "Morgath - X19" },
  { img: "/grid/14.webp", caption: "Norix - R78" },
  { img: "/grid/15.webp", caption: "Orion - E88" },
  { img: "/grid/16.webp", caption: "Pyros - B45" },
  { img: "/grid/17.webp", caption: "Quill - Q11" },
  { img: "/grid/18.webp", caption: "Rictor - T65" },
  { img: "/grid/19.webp", caption: "Saris - Y90" },
  { img: "/grid/20.webp", caption: "Thorne - N55" },
];

export default function ElasticGridScroll() {
  const [demoMode, setDemoMode] = useState<1 | 2 | 3 | 4>(1);
  const [numColumns, setNumColumns] = useState(3);

  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);
  const colRefs = useRef<(HTMLDivElement | null)[]>([]);
  const rafIdRef = useRef<number | null>(null);

  const scrollTopRef = useRef(0);
  const colScrollsRef = useRef<number[]>([]);
  const lastScrollTopRef = useRef(0);
  const lastTimeRef = useRef(performance.now());
  const velocityRef = useRef(0);

  // Responsive column counts based on demoMode
  useEffect(() => {
    const updateColumns = () => {
      const isLarge = window.innerWidth >= 1024;
      if (!isLarge) {
        setNumColumns(3);
      } else {
        if (demoMode === 1 || demoMode === 2) setNumColumns(7);
        else if (demoMode === 3) setNumColumns(5);
        else if (demoMode === 4) setNumColumns(9);
      }
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, [demoMode]);

  // Handle scroll tracking
  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    scrollTopRef.current = e.currentTarget.scrollTop;
  };

  // Reset scroll offsets when columns or demo mode changes
  useEffect(() => {
    colScrollsRef.current = Array(numColumns).fill(scrollTopRef.current);
  }, [numColumns, demoMode]);

  // Main animation frame loop
  useEffect(() => {
    const loop = () => {
      const currentScroll = scrollTopRef.current;
      const time = performance.now();
      const dt = (time - lastTimeRef.current) / 1000;

      if (dt > 0) {
        const rawVel = (currentScroll - lastScrollTopRef.current) / dt;
        velocityRef.current += (rawVel - velocityRef.current) * 0.12; // Smooth velocity tracking
      }
      lastScrollTopRef.current = currentScroll;
      lastTimeRef.current = time;

      const mid = (numColumns - 1) / 2;
      const baseLag = 0.5;
      const lagScale = demoMode === 2 ? 0.13 : 0.1;
      const lerpSpeed = 0.08;

      for (let i = 0; i < numColumns; i++) {
        const distance = Math.abs(i - mid);
        const lag = baseLag + distance * lagScale;
        const lagFactor = 1 / Math.max(0.1, lag);

        if (colScrollsRef.current[i] === undefined) {
          colScrollsRef.current[i] = currentScroll;
        }

        // Apply column scroll lag
        colScrollsRef.current[i] += (currentScroll - colScrollsRef.current[i]) * (lerpSpeed * lagFactor);

        const colEl = colRefs.current[i];
        if (colEl) {
          colEl.style.transform = `translate3d(0, ${-colScrollsRef.current[i]}px, 0)`;
        }
      }

      // Squash and stretch variables for Demo 2
      if (demoMode === 2) {
        const absVel = Math.abs(velocityRef.current);
        const vRaw = Math.max(0, absVel - 700);
        const v = Math.min(vRaw / 4000, 1);

        const minScaleX = 0.7;
        const maxScaleY = 1.7;

        const si = 1 + (minScaleX - 1) * v;
        const sy = 1 + (maxScaleY - 1) * v;
        const to = velocityRef.current < 0 ? "50% 0%" : "50% 100%";

        const gridEl = gridRef.current;
        if (gridEl) {
          gridEl.style.setProperty("--si", si.toString());
          gridEl.style.setProperty("--sy", sy.toString());
          gridEl.style.setProperty("--to", to);
        }
      } else {
        const gridEl = gridRef.current;
        if (gridEl) {
          gridEl.style.setProperty("--si", "1");
          gridEl.style.setProperty("--sy", "1");
          gridEl.style.setProperty("--to", "50% 50%");
        }
      }

      rafIdRef.current = requestAnimationFrame(loop);
    };

    rafIdRef.current = requestAnimationFrame(loop);
    return () => {
      if (rafIdRef.current) cancelAnimationFrame(rafIdRef.current);
    };
  }, [numColumns, demoMode]);

  // Distribute items across active column slots
  const columns = Array.from({ length: numColumns }, () => [] as typeof GRID_ITEMS);
  GRID_ITEMS.forEach((item, index) => {
    columns[index % numColumns].push(item);
  });

  const getThemeClasses = () => {
    switch (demoMode) {
      case 3:
        return "bg-[#181816] text-[#e3e2de] [--c-gap:12px]";
      case 4:
        return "bg-black text-white [--c-gap:0px]";
      default:
        return "bg-[#0b0c0e] text-white [--c-gap:5vw]";
    }
  };

  return (
    <div className={`relative w-full h-[580px] rounded-2xl overflow-hidden font-sans select-none ${getThemeClasses()} border border-white/10 shadow-2xl`}>
      
      {/* Scrollable container with dummy height */}
      <div 
        ref={scrollContainerRef}
        className="absolute inset-0 overflow-y-scroll no-scrollbar z-10"
        onScroll={handleScroll}
      >
        <div style={{ height: "3000px", width: "100%" }} />
      </div>

      {/* Sticky layout viewport */}
      <div className="absolute inset-0 pointer-events-none flex flex-col justify-start">
        
        {/* Navigation Toolbar */}
        <header className="pointer-events-auto h-16 shrink-0 border-b border-white/[0.05] bg-black/40 backdrop-blur-md px-6 flex items-center justify-between z-20">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-black tracking-tight">Elastic Grid Scroll</h1>
            <span className="text-[10px] text-gray-500 bg-white/5 border border-white/10 px-2.5 py-0.5 rounded font-extrabold">
              Demo {demoMode}
            </span>
          </div>

          <nav className="flex items-center gap-2 select-none text-[11px] font-extrabold">
            {( [1, 2, 3, 4] as const ).map((mode) => (
              <button
                key={mode}
                onClick={() => {
                  setDemoMode(mode);
                  if (scrollContainerRef.current) scrollContainerRef.current.scrollTop = 0;
                }}
                className={`px-3 py-1.5 rounded-lg border transition-all cursor-pointer ${
                  demoMode === mode
                    ? "bg-white text-black border-white"
                    : "bg-white/5 text-gray-400 border-white/5 hover:text-white"
                }`}
              >
                V0{mode}
              </button>
            ))}
          </nav>
        </header>

        {/* Informative footer status overlay */}
        <div className="absolute bottom-4 right-4 bg-black/75 backdrop-blur border border-white/10 text-[10px] text-gray-400 font-bold px-3 py-2 rounded-xl z-20 max-w-[200px]">
          {demoMode === 1 && "Symmetrical column lag effect"}
          {demoMode === 2 && "Lag effect + velocity squash & stretch"}
          {demoMode === 3 && "Tight column layouts & warm tones"}
          {demoMode === 4 && "Edge-to-edge fullscreen columns layout"}
        </div>

        {/* The Grid viewport */}
        <div className="flex-1 w-full relative overflow-hidden">
          <div 
            ref={gridRef}
            className="grid w-full transition-all duration-300"
            style={{
              gridTemplateColumns: `repeat(${numColumns}, 1fr)`,
              columnGap: "var(--c-gap)",
              padding: demoMode === 4 ? "0" : "8rem var(--c-gap) 10rem",
              height: "100%",
            }}
          >
            {columns.map((col, colIdx) => (
              <div
                key={colIdx}
                ref={(el) => {
                  colRefs.current[colIdx] = el;
                }}
                className="flex flex-col will-change-transform"
                style={{
                  gap: "var(--c-gap)",
                }}
              >
                {col.map((item, itemIdx) => (
                  <figure
                    key={itemIdx}
                    className="m-0 flex flex-col transition-transform duration-75 ease-out"
                    style={{
                      transform: demoMode === 2 ? "scaleX(var(--si, 1)) scaleY(var(--sy, 1))" : undefined,
                      transformOrigin: demoMode === 2 ? "var(--to, 50% 50%)" : undefined,
                    }}
                  >
                    <div
                      className="w-full aspect-[128/160] bg-cover bg-center rounded-[4px] shadow-lg border border-white/[0.05]"
                      style={{ backgroundImage: `url(${item.img})` }}
                    />
                    {demoMode !== 4 && (
                      <figcaption className="text-[10px] text-gray-500 font-bold mt-2 text-center tracking-tight">
                        {item.caption}
                      </figcaption>
                    )}
                  </figure>
                ))}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}
