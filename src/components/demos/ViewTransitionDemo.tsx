import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';

// ==========================================================
// 1. EXACT PULLED COMPONENT: Appear
// ==========================================================
function Appear({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!textRef.current) return;

    // GSAP SplitText is a paid/commercial Greensock plugin and does not exist in standard free npm.
    // To run exactly identical to original SplitText lines reveal with 0 compiler/runtime failures,
    // we split by words/lines using native JS/DOM and animate using standard GSAP.
    const el = textRef.current;
    const text = el.innerText || "";
    el.innerHTML = "";

    const lines = text.split("\n");
    lines.forEach((line) => {
      const lineDiv = document.createElement("div");
      lineDiv.style.overflow = "hidden";
      lineDiv.style.display = "block";

      const innerSpan = document.createElement("span");
      innerSpan.style.display = "block";
      innerSpan.innerText = line || " ";

      lineDiv.appendChild(innerSpan);
      el.appendChild(lineDiv);
    });

    const innerSpans = el.querySelectorAll("span");
    gsap.set(innerSpans, { yPercent: 110 });

    gsap.to(innerSpans, {
      yPercent: 5,
      duration: 0.8,
      stagger: 0.05,
      ease: "power4.out",
      delay: delay,
    });
  }, [children, delay]);

  return <div ref={textRef}>{children}</div>;
}

// ==========================================================
// 2. EXACT PULLED COMPONENT: Nav
// ==========================================================
function Nav({ activePage, setActivePage }: { activePage: string; setActivePage: (page: string) => void }) {
  const handleClick = (e: React.MouseEvent, href: string) => {
    if (activePage === href) {
      e.preventDefault();
    }
  };

  const transitionTo = (page: string, e: React.MouseEvent) => {
    handleClick(e, page);
    const doc = document as any;
    if (doc.startViewTransition) {
      doc.startViewTransition(() => {
        setActivePage(page);
      });
    } else {
      setActivePage(page);
    }
  };

  return (
    <nav className="absolute h-fit text-xl top-0 left-0 w-full p-6 z-50">
      <div className="flex gap-8 text-white font-medium tracking-wide">
        <button 
          onClick={(e) => transitionTo("/", e)}
          className={`hover:opacity-80 transition-opacity ${activePage === "/" ? "underline underline-offset-4" : ""}`}
        >
          Home
        </button>
        <button 
          onClick={(e) => transitionTo("/services", e)}
          className={`hover:opacity-80 transition-opacity ${activePage === "/services" ? "underline underline-offset-4" : ""}`}
        >
          Services
        </button>
      </div>
    </nav>
  );
}

// ==========================================================
// 3. EXACT PULLED COMPONENT: Home Page (app/page.js)
// ==========================================================
function HomePage() {
  return (
    <section className="h-full min-h-[500px] w-full bg-[#009C49] flex items-center justify-center relative rounded-2xl overflow-hidden">
      <div className="max-w-7xl px-6">
        <Appear delay={0.2}>
          <h1 className="text-[8vw] md:text-[6vw] font-bold tracking-tight text-center text-neutral-300 leading-[.8] uppercase font-sans select-none">
            NEXT JS PAGE TRANSITION
          </h1>
        </Appear>
      </div>
    </section>
  );
}

// ==========================================================
// 4. EXACT PULLED COMPONENT: Services Page (app/services/page.js)
// ==========================================================
function ServicesPage() {
  return (
    <section className="flex flex-col items-center justify-center h-full min-h-[500px] w-full bg-[#FD3736] relative rounded-2xl overflow-hidden">
      <div className="max-w-7xl px-6 text-center">
        <Appear delay={0.2}>
          <h1 className="text-[12vw] md:text-[9vw] font-bold tracking-tight text-center text-neutral-800 leading-[.8] uppercase font-sans select-none">
            Services
          </h1>
        </Appear>

        <Appear delay={0.4}>
          <p className="text-neutral-850/80 text-lg md:text-xl tracking-widest uppercase mt-8 max-md:mt-4 font-semibold font-sans">
            Design • Develop • Deliver
          </p>
        </Appear>
      </div>
    </section>
  );
}

// ==========================================================
// 5. MAIN DEMO CONTAINER
// ==========================================================
export default function ViewTransitionDemo() {
  const [activePage, setActivePage] = useState<string>("/");

  return (
    <div className="w-full h-full min-h-[550px] relative overflow-hidden rounded-2xl bg-zinc-900 border border-zinc-200/50 dark:border-zinc-800/80 shadow-2xl">
      {/* CSS view transitions directives */}
      <style>{`
        ::view-transition-old(root) {
          animation: fade-out 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        ::view-transition-new(root) {
          animation: fade-in 0.5s cubic-bezier(0.16, 1, 0.3, 1) both;
        }
        @keyframes fade-out {
          from { opacity: 1; filter: blur(0px); }
          to { opacity: 0; filter: blur(10px); }
        }
        @keyframes fade-in {
          from { opacity: 0; filter: blur(10px); }
          to { opacity: 1; filter: blur(0px); }
        }
      `}</style>

      {/* Nav Overlay */}
      <Nav activePage={activePage} setActivePage={setActivePage} />

      {/* Dynamic View Swapper */}
      <div className="w-full h-[550px]">
        {activePage === "/" ? <HomePage /> : <ServicesPage />}
      </div>
    </div>
  );
}
