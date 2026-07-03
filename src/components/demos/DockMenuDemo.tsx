import React, { useState } from 'react';
import { DockMenu, DockMenuItem } from '../oxygen-ui/dock-menu';
import { Home, Compass, Heart, Bell, User, Settings, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function DockMenuDemo() {
  const [position, setPosition] = useState<'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right'>('bottom-center');
  const [direction, setDirection] = useState<'horizontal' | 'vertical'>('horizontal');
  const [activeMessage, setActiveMessage] = useState<string | null>(null);

  const triggerToast = (label: string) => {
    setActiveMessage(`Triggered action: ${label}`);
    setTimeout(() => {
      setActiveMessage((current) => current === `Triggered action: ${label}` ? null : current);
    }, 2500);
  };

  const dockItems: DockMenuItem[] = [
    { id: 'home', label: 'Home', icon: <Home className="size-5" />, onClick: () => triggerToast('Home') },
    { id: 'explore', label: 'Explore', icon: <Compass className="size-5" />, onClick: () => triggerToast('Explore') },
    { id: 'favorites', label: 'Favorites', icon: <Heart className="size-5" />, onClick: () => triggerToast('Favorites') },
    { id: 'updates', label: 'Updates', icon: <Bell className="size-5" />, onClick: () => triggerToast('Updates') },
    { id: 'profile', label: 'Profile', icon: <User className="size-5" />, onClick: () => triggerToast('Profile') },
    { id: 'settings', label: 'Settings', icon: <Settings className="size-5" />, onClick: () => triggerToast('Settings') },
  ];

  return (
    <div className="w-full h-full min-h-[450px] bg-neutral-50 dark:bg-neutral-950 text-neutral-800 dark:text-neutral-200 relative overflow-hidden rounded-2xl flex flex-col items-center justify-center p-6 border border-neutral-200 dark:border-neutral-800">
      
      {/* Background Decorative Gradient Rings */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] rounded-full bg-gradient-to-tr from-purple-500/10 to-indigo-500/10 dark:from-purple-500/5 dark:to-indigo-500/5 blur-3xl pointer-events-none" />
      
      {/* Toast Notification */}
      <AnimatePresence>
        {activeMessage && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            className="absolute top-20 z-50 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-neutral-900/90 dark:bg-neutral-100/90 text-white dark:text-black shadow-xl border border-white/10 dark:border-black/10 backdrop-blur-md text-sm font-medium"
          >
            <Sparkles className="size-4 text-purple-400 dark:text-purple-600 animate-pulse" />
            {activeMessage}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Interactive Dock */}
      {/* We pass absolute class so it stays contained within this preview box and behaves nicely */}
      <DockMenu
        items={dockItems}
        position={position}
        direction={direction}
        className="absolute"
      />

      {/* Control Panel in the Center */}
      <div className="z-10 w-full max-w-sm p-5 rounded-2xl bg-white/60 dark:bg-neutral-900/60 backdrop-blur-md border border-neutral-200/50 dark:border-neutral-800/50 shadow-lg text-center flex flex-col gap-4">
        <div>
          <h3 className="text-sm font-bold tracking-wider uppercase text-neutral-400 dark:text-neutral-500 mb-1">
            Dock Menu Playground
          </h3>
          <p className="text-xs text-neutral-500 dark:text-neutral-400">
            Hover over the dock items to trigger spring animations. Customize layout settings below.
          </p>
        </div>

        {/* Direction Controls */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Orientation
          </label>
          <div className="grid grid-cols-2 gap-2 bg-neutral-100 dark:bg-neutral-800/50 p-1 rounded-xl">
            {(['horizontal', 'vertical'] as const).map((dir) => (
              <button
                key={dir}
                onClick={() => setDirection(dir)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold capitalize transition-all ${
                  direction === dir
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {dir}
              </button>
            ))}
          </div>
        </div>

        {/* Position Controls */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[11px] font-bold uppercase tracking-wider text-neutral-400 dark:text-neutral-500">
            Placement
          </label>
          <div className="grid grid-cols-3 gap-1.5 bg-neutral-100 dark:bg-neutral-800/50 p-1 rounded-xl">
            {(['top-left', 'top-center', 'top-right', 'bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`py-1.5 px-1 rounded-lg text-[10px] font-semibold transition-all truncate ${
                  position === pos
                    ? 'bg-white dark:bg-neutral-800 text-neutral-900 dark:text-white shadow-sm'
                    : 'text-neutral-500 hover:text-neutral-800 dark:hover:text-neutral-200'
                }`}
              >
                {pos.replace('-', ' ')}
              </button>
            ))}
          </div>
        </div>
      </div>
      
    </div>
  );
}
