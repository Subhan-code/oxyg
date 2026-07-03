import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "motion/react";
import { Search, Bookmark, Globe, Bell, Sparkles, ArrowUpRight } from "lucide-react";
import logoUrl from "../assets/oxygen-ui-logo.png";
import { categories } from "../data";
import { Footer } from "./Footer";

// Badges list for the Intro section
const TECH_BADGES = [
  { name: "React", color: "text-sky-400" },
  { name: "TypeScript", color: "text-blue-500" },
  { name: "Tailwind CSS", color: "text-teal-400" },
  { name: "Motion", color: "text-pink-500" },
  { name: "shadcn", color: "text-white" }
];

// Helper to categorize elements into Apps (mobile-focused) vs Sites (desktop-focused)
const isAppItem = (name: string) => {
  return [
    "signature", "progressive-blur", "calligraph", "calendar-animation",
    "apple-switch", "switch-with-icon", "drawer", "smooth-drawer",
    "quantity-picker", "add-to-cart", "micro-interaction-icons",
    "osmo-buttons", "orbital-spinner", "spinners"
  ].includes(name);
};

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"Apps" | "Sites">("Sites");
  const [searchQuery, setSearchQuery] = useState("");
  const [premiumFilter, setPremiumFilter] = useState<"All" | "Free" | "Pro">("All");
  const [sortOption, setSortOption] = useState<"Default" | "Newest">("Default");
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [bookmarks, setBookmarks] = useState<string[]>(() => {
    try {
      const stored = localStorage.getItem("oxygi-bookmarks");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });
  const [showToast, setShowToast] = useState<string | null>(null);
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "instant" });
  }, []);

  useEffect(() => {
    localStorage.setItem("oxygi-bookmarks", JSON.stringify(bookmarks));
  }, [bookmarks]);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    if (bookmarks.includes(id)) {
      setBookmarks(prev => prev.filter(item => item !== id));
      triggerToast("Removed from bookmarks");
    } else {
      setBookmarks(prev => [...prev, id]);
      triggerToast("Saved to bookmarks");
    }
  };

  const handleLogout = () => {
    window.location.hash = "/";
  };

  // Filter categories and their items based on activeTab, search query, premium filters, and bookmarks
  const filteredCategories = categories.map(cat => {
    const items = cat.items.filter(item => {
      // Filter by activeTab (Apps vs Sites)
      const matchesTab = activeTab === "Apps" ? isAppItem(item.name) : !isAppItem(item.name);

      // Filter by search query
      const matchesSearch = 
        item.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
        
      // Filter by premium state
      const matchesPremium = 
        premiumFilter === "All" || 
        (premiumFilter === "Free" && !item.premium) || 
        (premiumFilter === "Pro" && item.premium);

      // Filter by bookmarks toggle
      const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(item.name);
        
      return matchesTab && matchesSearch && matchesPremium && matchesBookmark;
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

  const allExpanded = filteredCategories.every(cat => expandedCategories[cat.slug]);
  const toggleAllCategories = () => {
    if (allExpanded) {
      setExpandedCategories({});
    } else {
      const newExpanded: Record<string, boolean> = {};
      filteredCategories.forEach(cat => {
        newExpanded[cat.slug] = true;
      });
      setExpandedCategories(newExpanded);
    }
  };

  // Custom visual representation for components
  const renderCardPlaceholder = (name: string) => {
    return (
      <div className="w-full h-full relative bg-neutral-100 flex items-center justify-center flex-col gap-3 group">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.02)_0%,transparent_100%)] pointer-events-none" />
        <div className="w-10 h-10 rounded-[10px] bg-black/[0.03] border border-black/[0.05] flex items-center justify-center group-hover:bg-black/[0.06] transition-colors relative z-10 shadow-sm">
          <Sparkles className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
        </div>
        <span className="text-[10px] font-mono text-zinc-600 group-hover:text-zinc-400 transition-colors uppercase tracking-widest relative z-10">{name.replace(/-/g, ' ')}</span>
        <div className="absolute inset-0 ring-1 ring-inset ring-white/[0.03] rounded-[12px] md:rounded-[20px] pointer-events-none" />
      </div>
    );
  };

  return (
    <div className="bg-white text-black min-h-[100dvh] pb-32 font-sans select-none flex flex-col">
      
      {/* Dynamic Action Toast */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-[9999] bg-neutral-900 border border-white/10 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-sm font-bold">{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Navigation Bar (Restored starting local navbar) */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-neutral-200 px-6 h-16 flex justify-center w-full">
        <div className="max-w-[1400px] w-full flex items-center justify-between">
          
          {/* Left Logo branding & Navigation Tabs */}
          <div className="flex items-center gap-8">
            <Link to="/" className="flex items-center gap-3 hover:scale-[1.03] transition-transform shrink-0">
              <img src={logoUrl} alt="Oxygen UI Logo" className="h-8 w-8 object-contain" />
            </Link>

            {/* Navigation Tabs (Apps vs Sites) */}
            <div className="flex items-center gap-6 text-sm font-extrabold select-none">
              <button 
                onClick={() => {
                  setActiveTab("Apps");
                  triggerToast("Browsing Mobile Apps");
                }}
                className={`transition-[color,transform] active:scale-[0.96] cursor-pointer ${activeTab === "Apps" ? "text-black" : "text-gray-500 hover:text-black"}`}
              >
                Apps
              </button>
              <button 
                onClick={() => {
                  setActiveTab("Sites");
                  triggerToast("Browsing Websites");
                }}
                className={`transition-[color,transform] active:scale-[0.96] cursor-pointer ${activeTab === "Sites" ? "text-black" : "text-gray-500 hover:text-black"}`}
              >
                Sites
              </button>
            </div>
          </div>

          {/* Search bar inside header (decreased width, expands on hover/focus) */}
          <div className="mx-6 relative hidden md:block transition-all duration-300 w-44 hover:w-64 focus-within:w-64">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-11 pr-4 rounded-full bg-neutral-100 text-sm placeholder-gray-500 text-black focus:outline-none focus:ring-1 focus:ring-black/20 transition-all border border-neutral-200"
            />
          </div>

          {/* Right utilities */}
          <div className="flex items-center gap-5.5 select-none">
            
            {/* Bookmark button */}
            <div className="relative group/tooltip flex items-center justify-center">
              <motion.button 
                onClick={() => {
                  setShowOnlyBookmarks(prev => !prev);
                  triggerToast(showOnlyBookmarks ? "Showing all components" : "Showing bookmarks only");
                }}
                whileHover={{ scale: 1.15 }}
                className={`transition-colors p-1 cursor-pointer ${
                  showOnlyBookmarks ? "text-red-500" : "text-gray-400 hover:text-black"
                }`}
              >
                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <svg xmlns="http://www.w3.org/2000/svg" fill={showOnlyBookmarks ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" className="w-4.5 h-4.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                  </svg>
                </motion.div>
              </motion.button>
              <div className="absolute top-10 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 bg-neutral-900 border border-white/10 text-white text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50">
                {showOnlyBookmarks ? "Show All" : "Bookmarks Only"}
              </div>
            </div>



            {/* Get Pro link */}
            <Link 
              to="/pricing"
              className="bg-black text-white font-extrabold text-xs px-4 py-2 rounded-full hover:bg-neutral-800 transition-colors select-none"
            >
              Get Pro
            </Link>

            {/* Profile Avatar (S) */}
            <div className="relative group/tooltip flex items-center justify-center">
              <motion.button 
                onClick={handleLogout}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 rounded-full bg-neutral-100 border border-neutral-200 flex items-center justify-center text-[11px] font-black text-gray-700 hover:border-black/20 active:scale-95 transition-all cursor-pointer"
              >
                S
              </motion.button>
              <div className="absolute top-10 right-0 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 bg-neutral-900 border border-white/10 text-white text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50">
                Account & Log out
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* Main Container */}
      <div className="relative overflow-visible flex flex-col items-center px-5" data-lenis-prevent>
        <div className="px-6 lg:px-10 py-10 max-w-7xl w-full mx-auto flex flex-col gap-16 mt-2">
          
          {/* Header intro / search block for mobile screen sizes */}
          <div className="flex flex-col gap-10">
            <div className="relative z-10 flex flex-col items-center justify-center pt-4">
              
              {/* Badges */}
              <div className="mb-6 flex items-center gap-3 bg-zinc-100 border border-zinc-200 px-4 py-2 rounded-full shadow-sm">
                <div className="flex items-center -space-x-1.5">
                  <div className="h-5.5 w-5.5 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-sky-400">R</div>
                  <div className="h-5.5 w-5.5 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-blue-500">TS</div>
                  <div className="h-5.5 w-5.5 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-teal-400">TW</div>
                  <div className="h-5.5 w-5.5 rounded-full bg-white border border-zinc-200 flex items-center justify-center text-[10px] font-bold text-pink-500">M</div>
                </div>
                <span className="text-[12px] font-semibold text-zinc-600">React · TS · Tailwind · Motion · shadcn</span>
              </div>

              {/* Title */}
              <h1 className="text-4xl md:text-[64px] lg:text-[72px] whitespace-nowrap text-center font-black tracking-tighter leading-none text-black">
                Component Library
              </h1>
              <span className="block font-medium md:text-lg sm:text-base text-sm text-center mt-4 text-zinc-600 max-w-xl text-balance">
                High-performance primitives built for modern web experiences.
              </span>
            </div>

            {/* Sub Filter Row */}
            <div className="flex flex-col gap-4 w-full">
              <div className="flex flex-col sm:flex-row items-center gap-4 max-w-3xl mx-auto w-full">
                {/* Mobile Search input */}
              <div className="relative w-full md:hidden">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4.5 text-zinc-500 pointer-events-none" />
                <input 
                  type="text"
                  placeholder="Search component primitives..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full h-11 pl-11 pr-4 rounded-xl bg-white border border-zinc-200 text-sm text-black placeholder-zinc-500 focus:outline-none focus:ring-1 focus:ring-zinc-300 transition-[box-shadow,background-color]"
                />
              </div>

              {/* Advanced category layout pills */}
              <div className="flex w-full items-center justify-center gap-3 shrink-0 flex-wrap">
                
                {/* Premium category pills */}
                <div className="relative flex items-center h-10 p-1 rounded-xl bg-zinc-100 border border-zinc-200 shrink-0 select-none">
                  {(["All", "Free", "Pro"] as const).map((filter) => (
                    <button
                      key={filter}
                      type="button"
                      onClick={() => setPremiumFilter(filter)}
                      className={`relative px-4 h-full text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                        premiumFilter === filter ? "bg-white text-black shadow-sm" : "text-zinc-600 hover:text-black"
                      }`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>

                {/* Sort selection pills */}
                <div className="relative flex items-center h-10 p-1 rounded-xl bg-zinc-100 border border-zinc-200 shrink-0 select-none">
                  {(["Default", "Newest"] as const).map((opt) => (
                    <button
                      key={opt}
                      type="button"
                      onClick={() => setSortOption(opt)}
                      className={`relative px-4 h-full text-xs font-semibold rounded-lg transition-all duration-150 cursor-pointer ${
                        sortOption === opt ? "bg-white text-black shadow-sm" : "text-zinc-600 hover:text-black"
                      }`}
                    >
                      {opt}
                    </button>
                  ))}
                </div>

              </div>

              {/* Category Pills and Expand Toggle */}
              <div className="flex items-center gap-3 w-full max-w-5xl mx-auto px-4 mt-2 justify-between">
                
                {/* Expand / Collapse All */}
                <button
                  onClick={toggleAllCategories}
                  className="shrink-0 flex items-center gap-2 px-3 py-2 h-10 rounded-xl bg-zinc-100 border border-zinc-200 text-xs font-semibold text-zinc-600 hover:text-black hover:bg-zinc-200 transition-colors cursor-pointer"
                >
                  {allExpanded ? (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-0 transition-transform"><path d="m18 15-6-6-6 6"/></svg>
                      Collapse All
                    </>
                  ) : (
                    <>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="rotate-0 transition-transform"><path d="m6 9 6 6 6-6"/></svg>
                      Expand All
                    </>
                  )}
                </button>

                {/* Horizontal Scrollable Category Families */}
                <div className="relative flex flex-1 items-center h-10 p-1 rounded-xl bg-zinc-100 border border-zinc-200 select-none overflow-hidden group">
                  {/* Left fade out */}
                  <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-zinc-100 to-transparent pointer-events-none z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity" />
                  
                  <div className="flex items-center gap-1 overflow-x-auto px-1 w-full no-scrollbar" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                    <style>{`
                      .no-scrollbar::-webkit-scrollbar {
                        display: none;
                      }
                    `}</style>
                    {filteredCategories.map((cat) => (
                      <button
                        key={cat.slug}
                        type="button"
                        onClick={() => {
                          const el = document.getElementById(cat.slug);
                          if (el) {
                            setExpandedCategories(prev => ({ ...prev, [cat.slug]: true }));
                            setTimeout(() => {
                              // adjust for fixed header (approx 120px)
                              const y = el.getBoundingClientRect().top + window.scrollY - 120;
                              window.scrollTo({ top: y, behavior: 'smooth' });
                            }, 50);
                          }
                        }}
                        className="relative px-3 py-1.5 text-[11px] md:text-xs font-medium rounded-lg transition-all duration-150 cursor-pointer text-zinc-600 hover:text-black hover:bg-zinc-200/60 whitespace-nowrap"
                      >
                        {cat.title}
                      </button>
                    ))}
                  </div>

                  {/* Right fade out */}
                  <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-zinc-100 to-transparent pointer-events-none z-10 hidden sm:block opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>

            </div>
          </div>
        </div>

          {/* Grid Category Listing Sections */}
          <div className="flex flex-col gap-10 mt-4 w-full">
            {filteredCategories.map((cat) => {
              const isExpanded = expandedCategories[cat.slug] === true;
              return (
                <section key={cat.slug} id={cat.slug} className="flex flex-col w-full border-t border-zinc-200 pt-10">
                  
                  {/* Section Header */}
                  <div className="flex items-start justify-between gap-3 text-left mb-6">
                    <div className="flex flex-col gap-1.5">
                      <div className="inline-flex items-center gap-3">
                        <button onClick={() => setExpandedCategories(prev => ({ ...prev, [cat.slug]: !isExpanded }))} className="flex items-center gap-3 group cursor-pointer text-left">
                          <div className="w-6 h-6 rounded-full bg-zinc-100 border border-zinc-200 flex items-center justify-center transition-transform duration-300 group-hover:bg-zinc-200" style={{ transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)' }}>
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-zinc-600"><path d="m9 18 6-6-6-6"/></svg>
                          </div>
                          <h2 className="text-xl md:text-2xl font-extrabold tracking-tight text-black">{cat.title}</h2>
                        </button>
                        <span className="inline-flex h-5 min-w-5 items-center justify-center rounded-full bg-zinc-100 border border-zinc-200 px-2 text-[10px] font-black text-zinc-600">
                          {cat.items.length}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-600 max-w-2xl pl-9">{cat.description}</p>
                    </div>
                  </div>

                  {/* Responsive Cards Grid (Uses subtle soft dark background items on black page) */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div 
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: "easeInOut" }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full pb-8">
                          {cat.items.map((item) => {
                            const isBookmarked = bookmarks.includes(item.name);
                            return (
                              <Link
                                key={item.name}
                                to={`/components/${item.name}`}
                                className="group/link block h-full select-none"
                              >
                                <div className="group relative flex flex-col rounded-[24px] p-2 bg-white border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-all duration-300 cursor-pointer h-[260px] justify-between shadow-sm">
                                  
                                  <div className="relative w-full h-[200px] shrink-0 overflow-hidden rounded-[18px]">
                                    
                                    {/* Inner shifted card container on hover */}
                                    <div className="absolute top-0 left-0 w-full overflow-hidden bg-zinc-100 rounded-[18px] transition-all duration-500 ease-out h-full group-hover/link:h-[calc(100%-2.25rem)] shadow-inner border border-zinc-200">
                                      
                                      {/* Scale preview container on hover */}
                                      <div className="absolute inset-0 size-full overflow-hidden rounded-[18px] transition-transform duration-700 ease-[cubic-bezier(0.2,1,0.2,1)] group-hover/link:scale-[1.025]">
                                        {renderCardPlaceholder(item.name)}
                                      </div>

                                      {/* Save Bookmark button */}
                                      <button
                                        onClick={(e) => handleToggleBookmark(item.name, e)}
                                        className={`absolute top-3 left-3 z-20 p-2 rounded-full border transition-all cursor-pointer bg-black/50 backdrop-blur-md ${
                                          isBookmarked 
                                            ? "border-red-500/50 text-red-500" 
                                            : "border-white/10 text-zinc-500 hover:text-white"
                                        }`}
                                      >
                                        <svg xmlns="http://www.w3.org/2000/svg" fill={isBookmarked ? "currentColor" : "none"} viewBox="0 0 24 24" strokeWidth="2.5" stroke="currentColor" className="w-3.5 h-3.5">
                                          <path strokeLinecap="round" strokeLinejoin="round" d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z" />
                                        </svg>
                                      </button>

                                      {/* Floating status tag */}
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

                                    {/* Revealing bottom action bar on hover */}
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

                                  {/* Title and details row */}
                                  <div className="flex items-center justify-between px-2 pb-1.5 transition-all duration-300">
                                    <span className="text-sm font-bold tracking-tight text-zinc-700 group-hover/link:text-black transition-colors truncate">
                                      {item.title}
                                    </span>
                                    <ArrowUpRight className="w-3.5 h-3.5 text-zinc-400 opacity-0 group-hover/link:opacity-100 transition-opacity" />
                                  </div>
                                </div>
                              </Link>
                            );
                          })}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              );
            })}

            {totalCount === 0 && (
              <div className="flex flex-col items-center justify-center text-center py-32 max-w-sm mx-auto w-full">
                <Sparkles className="w-12 h-12 text-zinc-300 mb-4 animate-pulse" />
                <h3 className="text-lg font-bold text-black mb-2">No components found</h3>
                <p className="text-sm text-zinc-500 leading-relaxed">
                  No layouts match the selected search filters or bookmark list.
                </p>
              </div>
            )}
          </div>

        </div>
      </div>
      
      {/* Footer */}
      <div className="w-full bg-white mt-20 border-t border-neutral-200">
        <Footer />
      </div>
    </div>
  );
}
