"use client";

import React from 'react';

const verbs = [
  "design.", "prototype.", "solve.", "build.", "develop.", "debug.", "learn.", "cook.", "ship.", "prompt.", "collaborate.", "create.", "inspire.", "follow.", "innovate.", "test.", "optimize.", "teach.", "visualize.", "transform.", "scale.", "do it."
];

export function YouCanScroll() {
  return (
    <div className="min-h-[300vh] bg-[#0a0a0a] text-zinc-50 font-sans selection:bg-zinc-800 relative w-full overflow-x-hidden">
      <div className="grid-background" />

      {/* Sticky Header Background that fades in at end of morph */}
      <header className="header-bg fixed top-0 left-0 w-full h-24 z-40 bg-transparent" />

      {/* The Morphing Wordmark */}
      <div className="wordmark flex items-center whitespace-nowrap gap-4 md:gap-6 text-[clamp(2.5rem,8vw,8rem)] font-bold text-white drop-shadow-2xl mix-blend-difference">
        <img 
          src="/app_logo_1779892160269.png" 
          alt="Studio Logo" 
          className="w-[0.9em] h-[0.9em] rounded-full object-cover shrink-0"
          referrerPolicy="no-referrer"
        />
        <h1 className="leading-[0.8] tracking-tight">Morphing.</h1>
        <div className="side-tag flex flex-col justify-end h-[0.8em]">
          <span className="text-[0.18em] font-sans font-medium tracking-[0.15em] text-zinc-300 uppercase whitespace-nowrap mb-1">
            Design Studio
          </span>
        </div>
      </div>

      {/* Bounce indicator telling the user to scroll */}
      <div className="scroll-indicator-container fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="scroll-indicator flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Scroll</span>
          <svg
            viewBox="0 0 24 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-auto mt-2 -ml-1 text-zinc-500/80"
          >
            <path d="M 12 4 C 5 20, 19 35, 11 55" />
            <path d="M 4 45 C 6 48, 9 53, 11 55 C 14 52, 17 48, 20 44" />
          </svg>
        </div>
      </div>

      {/* Track progress scroll line */}
      <div className="fixed top-32 right-4 sm:right-12 bottom-32 w-8 scroll-progress-wrapper pointer-events-none z-50">
        <div className="absolute top-0 bottom-0 right-[2px] w-[1px] bg-white/10" />
        <div className="scroll-progress-label absolute top-0 right-[0px] font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest" />
      </div>

      <main className="relative z-10 pt-[120vh]">
        <section className="px-8 md:px-24 py-32 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8 text-white">
            Curved Motion Paths
          </h2>
          <p className="fluid-text text-zinc-400 max-w-2xl leading-relaxed" style={{"--f-min": 18, "--f-max": 24, "--f-curve": 0.8} as React.CSSProperties}>
            By interpolating the X and Y axes individually via modern CSS <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded text-lg mx-1">@property</code> declarations and applying orthogonal timing functions—<span className="text-white">ease-in</span> for horizontal and <span className="text-white">ease-out</span> for vertical—we break free from linear motion.
          </p>
          <p className="fluid-text text-zinc-400 max-w-2xl leading-relaxed mt-6" style={{"--f-min": 18, "--f-max": 24, "--f-curve": 0.8} as React.CSSProperties}>
            The result is an organic, sweeping curve that breathes life into standard scroll-driven mechanics, transforming the typography as it arcs elegantly into its parked position.
          </p>
        </section>

        <section className="px-8 md:px-24 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square bg-zinc-900/40 rounded-3xl p-10 md:p-14 flex flex-col justify-between border border-white/5 group hover:bg-zinc-900 transition-colors duration-500">
            <div className="w-12 h-12 rounded-full border border-zinc-700 font-mono flex items-center justify-center text-sm text-zinc-400 group-hover:border-zinc-500 group-hover:text-zinc-200 transition-colors">01</div>
            <div>
              <h3 className="text-2xl md:text-3xl font-display mb-4 text-white">Ease In X</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">The horizontal motion starts slow, waiting for the vertical motion to carry the momentum before sweeping aggressively to the left edge.</p>
            </div>
          </div>
          
          <div className="aspect-square bg-zinc-900/40 rounded-3xl p-10 md:p-14 flex flex-col justify-between border border-white/5 group hover:bg-zinc-900 transition-colors duration-500">
            <div className="w-12 h-12 rounded-full border border-zinc-700 font-mono flex items-center justify-center text-sm text-zinc-400 group-hover:border-zinc-500 group-hover:text-zinc-200 transition-colors">02</div>
            <div>
              <h3 className="text-2xl md:text-3xl font-display mb-4 text-white">Ease Out Y</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">The vertical motion fires immediately upon scroll, racing towards the ceiling before gracefully and subtly slowing into its final resting offset.</p>
            </div>
          </div>
        </section>

        {/* Fluid Typography Section */}
        <section className="px-8 md:px-24 pt-32 pb-16 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Fluid Typography</h2>
            <p className="text-zinc-400 leading-relaxed fluid-text" style={{"--f-min": 18, "--f-max": 24} as React.CSSProperties}>
              Resize the browser to observe non-linear font scaling. Using the CSS <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded mx-1 text-[0.8em] font-mono">pow()</code> function, we can configure exactly how typography responds to viewport changes. Built to scale from <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[0.8em] font-mono">14px</code> to <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[0.8em] font-mono">24px</code> (or any values) cleanly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div style={{"--f-curve": 0.3} as React.CSSProperties} className="p-8 md:p-10 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:bg-zinc-900/40 hover:border-zinc-700 transition duration-500">
               <div className="text-xs font-mono text-zinc-500 mb-8 flex items-center justify-between">
                  <span>pow(progress, 0.3)</span>
                  <span className="text-zinc-600 border border-zinc-800 rounded px-2 py-0.5 uppercase tracking-wider text-[10px]">Ease Out</span>
               </div>
               <p className="fluid-text text-zinc-200 leading-snug font-medium" style={{"--f-min": 14, "--f-max": 36} as React.CSSProperties}>
                 This text scales rapidly at smaller viewports, then arches gently towards its maximum size.
               </p>
            </div>
            
            <div style={{"--f-curve": 1} as React.CSSProperties} className="p-8 md:p-10 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:bg-zinc-900/40 hover:border-zinc-700 transition duration-500">
               <div className="text-xs font-mono text-zinc-500 mb-8 flex items-center justify-between">
                  <span>pow(progress, 1.0)</span>
                  <span className="text-zinc-600 border border-zinc-800 rounded px-2 py-0.5 uppercase tracking-wider text-[10px]">Linear</span>
               </div>
               <p className="fluid-text text-zinc-200 leading-snug font-medium" style={{"--f-min": 14, "--f-max": 36} as React.CSSProperties}>
                 This text scales evenly as the viewport width increases over time. A standard fluid setup.
               </p>
            </div>

            <div style={{"--f-curve": 4} as React.CSSProperties} className="p-8 md:p-10 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:bg-zinc-900/40 hover:border-zinc-700 transition duration-500">
               <div className="text-xs font-mono text-zinc-500 mb-8 flex items-center justify-between">
                  <span>pow(progress, 4.0)</span>
                  <span className="text-zinc-600 border border-zinc-800 rounded px-2 py-0.5 uppercase tracking-wider text-[10px]">Ease In</span>
               </div>
               <p className="fluid-text text-zinc-200 leading-snug font-medium" style={{"--f-min": 14, "--f-max": 36} as React.CSSProperties}>
                 This text remains small for longer, and rapidly scales up only when reaching the maximum width.
               </p>
            </div>
          </div>
        </section>
        
        <section className="min-h-screen flex flex-col items-center justify-center snap-center-item pb-[10vh]">
          <h1 className="gradient-heading text-[clamp(2.5rem,8vw,8rem)] font-display drop-shadow-lg text-center leading-[0.9] tracking-tighter">
            you can<br />scroll.
          </h1>
        </section>

        <section className="scroll-effect-section w-full px-8 md:px-[15vw] mx-auto flex items-start" style={{"--count": verbs.length} as React.CSSProperties}>
          <h2 className="gradient-heading sticky top-1/2 -translate-y-1/2 h-max text-[clamp(2rem,6vw,6rem)] font-display font-semibold tracking-tighter shrink-0 mr-4 md:mr-8">
            <span aria-hidden="true">you can&nbsp;</span>
          </h2>
          <ul className="m-0 p-0 pb-[40vh] pt-[40vh] list-none text-[clamp(2rem,6vw,6rem)] font-display font-semibold tracking-tighter leading-tight" aria-hidden="true">
            {verbs.map((verb, i) => (
              <li key={verb} className="scroll-effect-item py-2 md:py-4" style={{"--i": i} as React.CSSProperties}>
                {verb}
              </li>
            ))}
          </ul>
        </section>

        <section className="carousel-section min-h-[80vh] snap-center-item flex items-center justify-center w-full relative">
          <ul className="carousel-list">
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=1" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=2" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=3" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=4" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=5" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=6" alt="" /></li>
          </ul>
        </section>

        <section className="min-h-[60vh] flex flex-col gap-16 items-center justify-center snap-center-item pt-20">
          <h2 className="gradient-heading text-[clamp(3rem,8vw,8rem)] font-display font-bold leading-none tracking-tighter">
            fin.
          </h2>

          <footer className="text-center text-zinc-650 font-mono text-sm opacity-50 relative z-10 snap-center-item">
            ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024
          </footer>
        </section>

      </main>
    </div>
  );
}

export default YouCanScroll;


