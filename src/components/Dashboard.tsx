import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, Sparkles, ArrowUpRight } from "lucide-react";
import { categories } from "../data";

// Badges list for the Intro section
const TECH_BADGES = [
  { name: "React", color: "text-sky-400" },
  { name: "TypeScript", color: "text-blue-500" },
  { name: "Tailwind CSS", color: "text-teal-400" },
  { name: "Motion", color: "text-pink-500" },
  { name: "shadcn", color: "text-white" }
];

export function Dashboard() {
  const [searchQuery, setSearchQuery] = useState("");
  const [premiumFilter, setPremiumFilter] = useState<"All" | "Free" | "Pro">("All");
  const [sortOption, setSortOption] = useState<"Default" | "Newest">("Default");

  // Filter categories and their items
  const filteredCategories = categories.map(cat => {
    const items = cat.items.filter(item => {
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      const matchesPremium = 
        premiumFilter === "All" || 
        (premiumFilter === "Free" && !item.premium) || 
        (premiumFilter === "Pro" && item.premium);
        
      return matchesSearch && matchesPremium;
    });

    const sortedItems = [...items];
    if (sortOption === "Newest") {
      sortedItems.sort((a, b) => new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime());
    }

    return {
      ...cat,
      items: sortedItems
    };
  }).filter(cat => cat.items.length > 0);

  // Total components count
  const totalCount = filteredCategories.reduce((acc, cat) => acc + cat.items.length, 0);

  // Custom visual representation for components that don't have video
  const renderCardPlaceholder = (name: string, title: string) => {
    if (name === "signature") {
      return (
        <div className="flex items-center justify-center size-full bg-zinc-950 select-none">
          <div className="flex items-center gap-1.5 text-xs text-zinc-600 font-medium">
            <span className="size-1.5 rounded-full bg-zinc-700 animate-pulse"></span>
            <span>Mini Preview</span>
          </div>
        </div>
      );
    }
    if (name === "progressive-blur") {
      return (
        <div className="relative w-full h-full bg-zinc-950 overflow-hidden flex flex-col items-center justify-center select-none font-mono text-[9px] text-zinc-700">
          <div className="space-y-1 text-center">
            <div>BLUR TOP</div>
            <div>↓↓↓</div>
            <div>BLUR BOTTOM</div>
          </div>
          <div className="absolute top-0 inset-x-0 h-8 bg-gradient-to-b from-zinc-950 via-zinc-950/60 to-transparent backdrop-blur-[2px]" />
          <div className="absolute bottom-0 inset-x-0 h-8 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent backdrop-blur-[2px]" />
        </div>
      );
    }
    if (name === "animated-beam") {
      return (
        <div className="relative w-full h-full bg-zinc-950 flex items-center justify-center gap-14 overflow-hidden select-none">
          <div className="size-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-zinc-400"><path d="M12 19h8"></path><path d="m4 17 6-6-6-6"></path></svg>
          </div>
          <div className="absolute w-16 h-[1.5px] bg-zinc-800" />
          <div className="absolute w-8 h-[1.5px] bg-gradient-to-r from-sky-500 to-transparent -translate-x-6 animate-pulse" />
          <div className="size-8 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center z-10">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3.5 text-zinc-400"><path d="m16 18 6-6-6-6"></path><path d="m8 6-6 6 6 6"></path></svg>
          </div>
        </div>
      );
    }
    if (name === "calligraph") {
      return (
        <div className="flex flex-col items-center justify-center size-full bg-zinc-950 font-sans select-none leading-none">
          <span className="text-3xl font-extrabold text-white tracking-tighter">22,008</span>
          <span className="text-[9px] uppercase tracking-widest text-zinc-650 font-mono mt-1">calligraph ticks</span>
        </div>
      );
    }
    if (name === "scroll-image-text-reveal") {
      return (
        <div className="flex items-center justify-center size-full bg-zinc-950 px-6 text-center text-xs font-medium text-zinc-400 leading-relaxed select-none">
          <div className="flex items-center gap-1.5 border border-zinc-850 bg-zinc-900/50 rounded-full px-3 py-1">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-3 text-sky-400"><path d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path><path d="M20 2v4"></path><path d="M22 4h-4"></path><circle cx="4" cy="20" r="2"></circle></svg>
            <span>Inline media reveals on scroll</span>
          </div>
        </div>
      );
    }
    if (name === "scroll-velocity-marquee") {
      return (
        <div className="w-full h-full bg-zinc-950 flex flex-col justify-center gap-3 overflow-hidden border border-zinc-900 select-none">
          <div className="flex whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-zinc-500 animate-pulse">
            <span className="mr-8">LIGHTNING SPEED • HIGH MOTION • DESIGN SYSTEM •</span>
          </div>
          <div className="flex whitespace-nowrap font-mono text-[9px] uppercase tracking-widest text-zinc-600 animate-pulse">
            <span className="mr-8">OXYGEN UI • EXTREME SPRING • HARD SHIP •</span>
          </div>
        </div>
      );
    }

    // Default beautiful placeholder
    return (
      <div className="flex items-center justify-center size-full bg-zinc-950 select-none border border-zinc-900">
        <div className="flex flex-col items-center gap-2">
          <Sparkles className="w-5 h-5 text-zinc-700 animate-pulse" />
          <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">Interactive primitives</span>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-[#141414] text-white min-h-[100dvh] pb-32">
      <div className="relative overflow-visible flex flex-col items-center px-5">
        <div className="px-6 lg:px-10 py-10 max-w-7xl w-full mx-auto flex flex-col gap-16 mt-2">
          
          {/* Intro Section */}
          <div className="flex flex-col gap-12">
            <div className="relative z-10 flex flex-col items-center justify-center pt-8">
              
              {/* Badges */}
              <div className="mb-6 flex items-center gap-3 bg-zinc-900/50 border border-zinc-800/80 px-4 py-2 rounded-full shadow-lg">
                <div className="flex items-center -space-x-1.5">
                  <div className="h-5.5 w-5.5 rounded-full bg-[#1e1e24] border border-zinc-750 flex items-center justify-center text-[10px] font-bold text-sky-400">R</div>
                  <div className="h-5.5 w-5.5 rounded-full bg-[#1e1e24] border border-zinc-750 flex items-center justify-center text-[10px] font-bold text-blue-500">TS</div>
                  <div className="h-5.5 w-5.5 rounded-full bg-[#1e1e24] border border-zinc-750 flex items-center justify-center text-[10px] font-bold text-teal-400">TW</div>
                  <div className="h-5.5 w-5.5 rounded-full bg-[#1e1e24] border border-zinc-750 flex items-center justify-center text-[10px] font-bold text-pink-500">M</div>
                </div>
                <span className="text-[12px] font-semibold text-zinc-400">React · TS · Tailwind · Motion · shadcn</span>
              </div>

              {/* Title & Subtitle */}
              <h1 className="text-4xl md:text-6xl max-w-2xl text-center font-bold tracking-tight leading-none bg-gradient-to-b from-white to-zinc-400 bg-clip-text text-transparent">
                For builders with high standards
              </h1>
              <span className="block font-medium md:text-lg sm:text-base text-sm text-center mt-4 text-zinc-400 max-w-xl text-balance">
                Components you can copy, use, and learn from. Built to ship fast and stand out.
              </span>
            </div>

            {/* Filter Bar */}
            <div className="flex flex-col sm:flex-row items-center gap-3 max-w-3xl mx-auto w-full">
              <div className="relative w-full">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-zinc-500 pointer-events-none stroke-[2.5px]" />
                <input 
                  type="text"
                  placeholder="Search... (or just explore)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-zinc-900 border border-zinc-800 text-sm text-white placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-700 transition-[box-shadow,background-color]"
                />
              </div>

              <div className="flex w-full sm:w-auto items-center justify-center sm:justify-end gap-2 shrink-0 flex-wrap">
                
                {/* Premium Filters */}
                <div className="relative flex items-center h-11 p-1 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 select-none">
                  {(["All", "Free", "Pro"] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setPremiumFilter(filter)}
                      className={`relative px-4 h-full text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                        premiumFilter === filter ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Sorting Filters */}
                <div className="relative flex items-center h-11 p-1 rounded-xl bg-zinc-900 border border-zinc-800 shrink-0 select-none">
                  {(["Default", "Newest"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSortOption(opt)}
                      className={`relative px-4 h-full text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                        sortOption === opt ? "bg-zinc-800 text-white shadow-sm" : "text-zinc-400 hover:text-white"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

              </div>
            </div>
          </div>

          {/* Grid list sections */}
          <div className="flex flex-col gap-24 mt-4 w-full">
            {filteredCategories.map((cat) => (
              <section key={cat.slug} id={cat.slug} className="flex flex-col gap-8 w-full border-t border-zinc-900 pt-12">
                
                {/* Category Header */}
                <div className="flex items-start justify-between gap-3 text-left">
                  <div className="flex flex-col gap-1.5">
                    <div className="inline-flex items-center gap-3">
                      <h2 className="text-2xl md:text-3xl font-extrabold tracking-tight text-white">{cat.title}</h2>
                      <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-900 border border-zinc-850 px-2 text-[10px] font-black text-zinc-400">
                        {cat.items.length}
                      </span>
                    </div>
                    <p className="text-sm text-zinc-400 max-w-2xl">{cat.description}</p>
                  </div>
                </div>

                {/* Cards Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
                  {cat.items.map((item) => (
                    <Link
                      key={item.name}
                      to={`/components/${item.name}`}
                      className="group/link block h-full select-none"
                    >
                      <div className="group relative flex flex-col rounded-[24px] p-2 bg-[#1c1c1e]/60 border border-zinc-900/50 hover:border-zinc-800 hover:bg-zinc-900/40 transition-all duration-300 cursor-pointer h-[260px] justify-between shadow-lg">
                        <div className="relative w-full h-[200px] shrink-0 overflow-hidden rounded-[18px]">
                          <div className="absolute top-0 left-0 w-full overflow-hidden bg-zinc-950 rounded-[18px] transition-all duration-500 ease-out h-full group-hover/link:h-[calc(100%-2.25rem)] shadow-inner border border-zinc-900/40">
                            
                            {/* Inner Scaling Content */}
                            <div className="absolute inset-0 size-full overflow-hidden rounded-[18px] transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover/link:scale-[1.025]">
                              {item.video ? (
                                <video 
                                  src={item.video} 
                                  loop 
                                  muted 
                                  playsInline 
                                  autoPlay 
                                  className="absolute inset-0 size-full object-cover" 
                                />
                              ) : (
                                renderCardPlaceholder(item.name, item.title)
                              )}
                            </div>

                            {/* Top Badge (New / Premium) */}
                            {item.isNew && (
                              <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-0.5 text-neutral-100 bg-black/50 backdrop-blur-md rounded-full font-medium border border-white/10 shadow-sm">
                                <span className="relative flex size-1.5">
                                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full opacity-75 bg-blue-400" />
                                  <span className="relative inline-flex size-1.5 rounded-full bg-blue-400" />
                                </span>
                                <span className="text-[9px] leading-none tracking-wide drop-shadow-md">New</span>
                              </div>
                            )}
                          </div>

                          {/* Hover-reveal bottom text badge */}
                          <div className="absolute bottom-0 left-0 w-full h-[2.25rem] flex items-center justify-start px-3.5 opacity-0 group-hover/link:opacity-100 translate-y-2 group-hover/link:translate-y-0 transition-all duration-300 pointer-events-none">
                            <div className="flex flex-row items-center gap-2 justify-center">
                              {item.premium ? (
                                <>
                                  <svg viewBox="0 0 24 24" fill="none" className="size-4 text-amber-500"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" /><path d="M12 7v1m0 8v1M9.5 9.5C9.5 8.67 10.67 8 12 8s2.5.67 2.5 1.5S13.33 11 12 11s-2.5.67-2.5 1.5S10.67 14.5 12 14.5c1.33 0 2.5-.67 2.5-1.5" stroke="currentColor" strokeWidth="1.5" stroke-linecap="round" /></svg>
                                  <span className="text-[12px] font-bold tracking-tight text-amber-500">Pro component</span>
                                </>
                              ) : (
                                <>
                                  <svg viewBox="0 0 24 24" fill="none" className="size-4 text-emerald-400"><circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.5" strokeDasharray="3 3" /></svg>
                                  <span className="text-[12px] font-bold tracking-tight text-emerald-450">Free component</span>
                                </>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Title Row */}
                        <div className="flex items-center justify-between px-2 pb-1.5 transition-all duration-300">
                          <span className="text-sm font-bold tracking-tight text-zinc-300 group-hover/link:text-white transition-colors truncate">
                            {item.title}
                          </span>
                          <ArrowUpRight className="w-3.5 h-3.5 text-zinc-650 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}

            {totalCount === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-32 max-w-sm mx-auto w-full">
                <Sparkles className="w-12 h-12 text-zinc-700 mb-4 animate-pulse" />
                <h3 className="text-lg font-bold text-white mb-2">No components found</h3>
                <p className="text-sm text-zinc-550 leading-relaxed">
                  No layouts match the selected search query: <strong className="text-zinc-400">"{searchQuery}"</strong>.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
    </div>
  );
}
