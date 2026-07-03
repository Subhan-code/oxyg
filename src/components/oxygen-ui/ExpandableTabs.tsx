"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Bell, SlidersHorizontal, BookOpen, Shield, User, ArrowUpCircle, Folder, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '../../lib/utils';

function useMeasure() {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setBounds({ height: entry.contentRect.height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, bounds] as const;
}

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, filled: true },
  { id: 'notifications', label: 'Notifications', icon: Bell, filled: true },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal, filled: false },
  { id: 'docs', label: 'Docs', icon: BookOpen, filled: true },
  { id: 'security', label: 'Security', icon: Shield, filled: true },
];

export function ExpandableTabs() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeIndex = activeTab ? TABS.findIndex((t) => t.id === activeTab) : -1;
  const previousIndex = previousTab ? TABS.findIndex((t) => t.id === previousTab) : -1;
  const direction = activeIndex > previousIndex ? 1 : -1;

  const [ref, bounds] = useMeasure();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (id: string) => {
    if (id === activeTab) {
      setPreviousTab(activeTab);
      setActiveTab(null); // Toggle off
    } else {
      setPreviousTab(activeTab);
      setActiveTab(id);
    }
  };

  const renderContent = (id: string) => {
    switch (id) {
      case 'dashboard':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            <MenuItem icon={User} label="profile" />
            <MenuItem icon={ArrowUpCircle} label="upgrade" />
            <MenuItem icon={Folder} label="projects" />
            <MenuItem icon={BookOpen} label="documentation" />
            <MenuItem icon={LogOut} label="logout" />
          </div>
        );
      case 'notifications':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-medium text-neutral-100">Notification {i}</span>
                <div className="flex items-center gap-3 text-neutral-500 text-sm">
                  <span>{i * 4 - 2} sec ago</span>
                  <div className="w-2 h-2 rounded-full bg-sky-550" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            <MenuItem icon={SlidersHorizontal} label="general settings" />
            <MenuItem icon={User} label="account details" />
            <MenuItem icon={Shield} label="privacy & security" />
            <MenuItem icon={Bell} label="alert preferences" />
          </div>
        );
      case 'docs':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            <MenuItem icon={BookOpen} label="getting started" />
            <MenuItem icon={ArrowUpCircle} label="installation guide" />
            <MenuItem icon={Folder} label="component options" />
            <MenuItem icon={SlidersHorizontal} label="customization" />
          </div>
        );
      case 'security':
        return (
          <div className="flex flex-col gap-8 p-4 pb-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-neutral-400 text-sm font-medium">API</span>
                <span className="text-sky-500 text-sm font-medium">operational</span>
              </div>
              <div className="flex gap-1.5 justify-between">
                {Array.from({length: 28}).map((_, i) => (
                  <div key={i} className={cn("h-8 w-1.5 rounded-full", i < 24 ? 'bg-sky-500' : 'bg-neutral-800')} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-neutral-400 text-sm font-medium">Build and Deploy</span>
                <span className="text-red-500 text-sm font-medium">system failure</span>
              </div>
              <div className="flex gap-1.5 justify-between">
                {Array.from({length: 28}).map((_, i) => (
                  <div key={i} className={cn("h-8 w-1.5 rounded-full", i < 12 ? 'bg-red-500' : 'bg-neutral-800')} />
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-4 p-4 pb-6">
            <p className="text-neutral-400">Content for {id} is not implemented yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] p-4 font-sans text-neutral-200">
      <div className="w-full max-w-[340px] relative" ref={containerRef}>
        <div className="bg-[#111111] rounded-[2rem] p-2 flex flex-col shadow-2xl">
          {/* Content Area */}
          <motion.div
            animate={{ height: activeTab ? bounds.height : 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="overflow-hidden"
          >
            <div ref={ref} className="relative">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                {activeTab && (
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={{
                      initial: (dir: number) => ({
                        x: 20 * dir,
                        opacity: 0,
                        filter: "blur(4px)",
                      }),
                      animate: {
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: (dir: number) => ({
                        x: -20 * dir,
                        opacity: 0,
                        filter: "blur(4px)",
                      }),
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="w-full"
                  >
                    {renderContent(activeTab)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex items-center justify-between px-2 py-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              const showLabel = hoveredTab !== null ? (hoveredTab === tab.id) : isActive;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative flex items-center justify-center h-10 px-3 rounded-full transition-colors duration-200 outline-none",
                    showLabel ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  )}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {showLabel && (
                    <motion.div
                      layoutId="active-bg"
                      className="absolute inset-0 bg-[#222222] rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className="relative flex items-center justify-center z-10 gap-2">
                    <Icon className="w-5 h-5 shrink-0" fill={tab.filled ? "currentColor" : "none"} />
                    <AnimatePresence initial={false}>
                      {showLabel && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="text-sm font-medium whitespace-nowrap overflow-hidden"
                        >
                          {tab.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center justify-between cursor-pointer group">
    <div className="flex items-center gap-3 text-neutral-200 group-hover:text-white transition-colors">
      <Icon className="w-5 h-5" />
      <span className="font-medium capitalize">{label}</span>
    </div>
    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
  </div>
);


