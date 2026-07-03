import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Bell, Moon, Sun, Monitor, Info, Sparkles, ChevronRight, ToggleLeft, ToggleRight, SlidersHorizontal, RotateCw, Copy, BookOpen, Check, Maximize } from 'lucide-react';
import { cn } from '../lib/utils';

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
  { id: 'home', label: 'Home', icon: Home, filled: true },
  { id: 'notifications', label: 'Alerts', icon: Bell, filled: true },
  { id: 'theme', label: 'Theme', icon: Moon, filled: true },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal, filled: false },
];

const layoutTransition = { type: "spring", bounce: 0, duration: 0.6 } as const;

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const transition = { delay: 0.1, type: "spring", bounce: 0, duration: 0.6 } as const;

interface PlaygroundPillProps {
  isExpanded?: boolean;
  setIsExpanded?: (val: boolean) => void;
  onRestart?: () => void;
  onCopy?: () => void;
  copiedCode?: boolean;
  theme?: string;
  toggleTheme?: () => void;
  componentDescription?: string;
  componentName?: string;
  settings?: Record<string, any>;
  onChangeSettings?: (val: Record<string, any>) => void;
  customSettings?: React.ReactNode;
}

export function PlaygroundPill({
  isExpanded = false,
  setIsExpanded,
  onRestart,
  onCopy,
  copiedCode = false,
  theme = 'dark',
  toggleTheme,
  componentDescription = "Your isolated environment is running. Changes here won't affect production until deployed.",
  componentName,
  settings,
  onChangeSettings,
  customSettings
}: PlaygroundPillProps) {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const [themeState, setThemeState] = useState(theme);
  const [settingsState, setSettingsState] = useState({ animations: true, sound: false, autoSave: true });
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    setThemeState(theme);
  }, [theme]);

  const handleCopy = () => {
    if (onCopy) {
      onCopy();
    } else {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  const ACTIONS = [
    { id: 'reload', label: 'Reload rendering', icon: RotateCw, onClick: onRestart || (() => window.location.reload()) },
    { id: 'expand', label: 'Expand to full screen', icon: Maximize, onClick: () => setIsExpanded?.(!isExpanded) },
  ];

  const activeIndex = activeTab ? TABS.findIndex((t) => t.id === activeTab) : -1;
  const previousIndex = previousTab ? TABS.findIndex((t) => t.id === previousTab) : -1;
  const direction = activeIndex > previousIndex ? 1 : -1;

  const [ref, bounds] = useMeasure();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setPreviousTab(activeTab);
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [activeTab]);

  const handleTabClick = (id: string) => {
    if (id === 'home') {
      window.location.hash = '/';
      return;
    }
    setPreviousTab(activeTab);
    if (id === activeTab) {
      setActiveTab(null); // Toggle off
    } else {
      setActiveTab(id);
    }
  };

  const handleThemeChange = (mode: string) => {
    setThemeState(mode);
    if (toggleTheme) {
      if (mode !== theme) {
        toggleTheme();
      }
    }
  };

  const renderContent = (id: string) => {
    switch (id) {
      case 'home':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6 w-[360px] max-w-[calc(100vw-2rem)]">
            <div className="flex flex-col gap-1 px-1">
              <h4 className="text-sm font-medium text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-sky-500" />
                Playground Active
              </h4>
              <p className="text-xs text-neutral-500 leading-relaxed">
                {componentDescription}
              </p>
            </div>
            <div className="flex flex-col gap-4 mt-2 mb-1">
              <MenuItem icon={Info} label="component info" />
            </div>
          </div>
        );
      case 'notifications':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6 w-[360px] max-w-[calc(100vw-2rem)]">
            <div className="flex items-center justify-between px-1">
              <span className="font-medium text-neutral-100 text-sm">New deployment ready</span>
              <div className="flex items-center gap-3 text-neutral-500 text-xs">
                <span>Just now</span>
                <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />
              </div>
            </div>
            <div className="flex items-center justify-between px-1">
              <span className="font-medium text-neutral-100 text-sm">Asset sync complete</span>
              <div className="flex items-center gap-3 text-neutral-500 text-xs">
                <span>2m ago</span>
                <div className="w-1.5 h-1.5 rounded-full bg-neutral-700" />
              </div>
            </div>
          </div>
        );
      case 'theme':
        return (
          <div className="flex flex-col gap-2 p-4 pb-6 w-[360px] max-w-[calc(100vw-2rem)]">
            <ThemeOption icon={Sun} label="Light" active={themeState === 'light'} onClick={() => handleThemeChange('light')} />
            <ThemeOption icon={Moon} label="Dark" active={themeState === 'dark'} onClick={() => handleThemeChange('dark')} />
            <ThemeOption icon={Monitor} label="System" active={themeState === 'system'} onClick={() => handleThemeChange('system')} />
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col gap-4 p-4 pb-6 w-[360px] max-w-[calc(100vw-2rem)]">
            <ToggleItem
              label="Animations"
              active={settingsState.animations}
              onClick={() => setSettingsState(s => ({ ...s, animations: !s.animations }))}
            />
            <ToggleItem
              label="Sound Effects"
              active={settingsState.sound}
              onClick={() => setSettingsState(s => ({ ...s, sound: !s.sound }))}
            />
            <ToggleItem
              label="Auto Save"
              active={settingsState.autoSave}
              onClick={() => setSettingsState(s => ({ ...s, autoSave: !s.autoSave }))}
            />
            {componentName === 'scroll-bar' && settings && (
              <>
                <div className="h-px bg-white/10 my-2" />
                <ToggleItem
                  label="Show Scroll Card"
                  active={settings.showScrollCard}
                  onClick={() => onChangeSettings?.({ ...settings, showScrollCard: !settings.showScrollCard })}
                />
              </>
            )}
            {componentName === 'circular-scroll' && settings && (
              <>
                <div className="h-px bg-white/10 my-2" />
                <ToggleItem
                  label="Always Show Percent"
                  active={settings.showPercent}
                  onClick={() => onChangeSettings?.({ ...settings, showPercent: !settings.showPercent })}
                />
              </>
            )}
            {customSettings && (
              <>
                <div className="h-px bg-white/10 my-2" />
                <div className="flex flex-col gap-3">
                  {customSettings}
                </div>
              </>
            )}
            <div className="h-2" />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="w-fit relative pointer-events-auto flex items-center justify-center isolate" ref={containerRef}>
      <motion.div
        layout
        transition={layoutTransition}
        className="bg-[#111111] rounded-[2rem] p-2 flex flex-col shadow-[0_16px_40px_rgba(0,0,0,0.5)] border border-white/5 backdrop-blur-xl overflow-hidden"
      >
        {/* Content Area */}
        <motion.div
          animate={{ height: activeTab ? bounds.height : 0 }}
          transition={layoutTransition}
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
                      x: 30 * dir,
                      opacity: 0,
                      filter: "blur(2px)",
                      scale: 0.98,
                    }),
                    animate: {
                      x: 0,
                      opacity: 1,
                      filter: "blur(0px)",
                      scale: 1,
                    },
                    exit: (dir: number) => ({
                      x: -30 * dir,
                      opacity: 0,
                      filter: "blur(2px)",
                      scale: 0.98,
                    }),
                  }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={layoutTransition}
                  className="w-full"
                >
                  {renderContent(activeTab)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>

        {/* Tabs Navigation */}
        <motion.div layout transition={layoutTransition} className="flex items-center justify-between px-1 py-1">
          <div className="flex items-center gap-1">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;

              return (
                <motion.button
                  key={tab.id}
                  variants={buttonVariants}
                  initial={false}
                  animate="animate"
                  custom={isActive}
                  whileHover={{ scale: 1.08, y: -1 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={() => handleTabClick(tab.id)}
                  transition={transition}
                  className={cn(
                    "relative flex items-center h-10 rounded-2xl text-sm font-medium transition-colors duration-300 outline-none px-3",
                    isActive
                      ? "bg-neutral-800 text-white"
                      : "text-neutral-500 hover:bg-neutral-800/50 hover:text-white"
                  )}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  <Icon size={20} fill={tab.filled ? "currentColor" : "none"} />
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.span
                        variants={spanVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                        transition={transition}
                        className="overflow-hidden whitespace-nowrap ml-1.5"
                      >
                        {tab.label}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </motion.button>
              );
            })}
          </div>

          <div className="flex items-center gap-1 pr-1">
            <motion.div layout transition={layoutTransition} className="w-px h-6 bg-white/10 mx-1" />
            <motion.div layout transition={layoutTransition} className="flex items-center gap-0.5">
              {ACTIONS.map((action) => {
                const Icon = action.icon;
                return (
                  <motion.button
                    layout
                    whileHover={{ scale: 1.15, rotate: action.id === 'reload' ? 45 : 0 }}
                    whileTap={{ scale: 0.9 }}
                    transition={layoutTransition}
                    key={action.id}
                    onClick={action.onClick}
                    title={action.label}
                    className={cn(
                      "relative flex items-center justify-center h-10 w-10 text-neutral-500 transition-colors duration-200 outline-none rounded-2xl shrink-0",
                      action.id === 'copy' && (onCopy ? copiedCode : copied) ? "text-emerald-500" : "hover:text-white"
                    )}
                    style={{
                      WebkitTapHighlightColor: "transparent",
                    }}
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                  </motion.button>
                );
              })}
            </motion.div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}

const MenuItem = ({ icon: Icon, label, onClick }: { icon: any, label: string, onClick?: () => void }) => (
  <motion.div whileTap={{ scale: 0.98 }} onClick={onClick} className="flex items-center justify-between cursor-pointer group px-1 transition-transform">
    <div className="flex items-center gap-3 text-neutral-200 group-hover:text-white transition-colors">
      <Icon className="w-5 h-5" />
      <span className="font-medium text-sm capitalize">{label}</span>
    </div>
    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
  </motion.div>
);

const ThemeOption = ({ icon: Icon, label, active, onClick }: { icon: any, label: string, active: boolean, onClick: () => void }) => (
  <motion.button
    whileTap={{ scale: 0.98 }}
    onClick={onClick}
    className={cn(
      "flex items-center justify-between p-3 rounded-2xl transition-all duration-200 cursor-pointer w-full group",
      active ? "bg-[#1c1c1c] text-white" : "hover:bg-[#151515] text-neutral-400"
    )}
  >
    <div className="flex items-center gap-3">
      <Icon className="w-4 h-4" fill={active ? "currentColor" : "none"} />
      <span className="font-medium text-sm">{label}</span>
    </div>
    {active && <div className="w-1.5 h-1.5 rounded-full bg-sky-500" />}
  </motion.button>
);

const ToggleItem = ({ label, active, onClick }: { label: string, active: boolean, onClick: () => void }) => (
  <motion.div whileTap={{ scale: 0.98 }} className="flex items-center justify-between px-1 cursor-pointer group" onClick={onClick}>
    <span className="font-medium text-sm text-neutral-300 group-hover:text-white transition-colors">{label}</span>
    <button className="outline-none transition-colors">
      {active ? (
        <ToggleRight className="w-8 h-8 text-sky-500" fill="currentColor" strokeWidth={1} />
      ) : (
        <ToggleLeft className="w-8 h-8 text-neutral-600 group-hover:text-neutral-500" strokeWidth={1.5} />
      )}
    </button>
  </motion.div>
);
