import React, { useState } from 'react';
import { AuraSubscribePill } from '../oxygen-ui/aura-subscribe-pill';
import { Sparkles, CheckCircle2, Info } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

const CONFETTI_THEMES = [
  { id: 'purple', label: 'Neon Purple', colors: ['#9333ea', '#c084fc', '#e9d5ff', '#ffffff'] },
  { id: 'carbon', label: 'Charcoal Carbon', colors: ['#000000', '#3f3f46', '#71717a', '#ffffff'] },
  { id: 'sunset', label: 'Sunset Gold', colors: ['#f59e0b', '#fbbf24', '#fef3c7', '#ffffff'] },
  { id: 'volcano', label: 'Volcano Red', colors: ['#ef4444', '#f87171', '#fee2e2', '#ffffff'] }
];

export default function AuraSubscribePillDemo() {
  const [selectedTheme, setSelectedTheme] = useState('purple');
  const [registrations, setRegistrations] = useState<string[]>([]);
  const [toastEmail, setToastEmail] = useState('');
  const [showToast, setShowToast] = useState(false);

  const handleSuccess = (email: string) => {
    setToastEmail(email);
    setShowToast(true);
    setRegistrations(prev => [email, ...prev]);
    setTimeout(() => setShowToast(false), 4000);
  };

  const getActiveColors = () => {
    return CONFETTI_THEMES.find(t => t.id === selectedTheme)?.colors || [];
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between font-sans relative">
      
      {/* Toast Notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-6 right-6 z-50 bg-emerald-500 text-white px-5 py-3 rounded-2xl shadow-xl flex items-center gap-2 text-xs font-bold tracking-wide uppercase"
          >
            <CheckCircle2 size={15} />
            Success: {toastEmail} Registered!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Header Info */}
      <div className="space-y-2 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider select-none">
          <Sparkles className="size-3 text-purple-500" />
          Aura Subscribe Pill
        </span>
        <h2 className="text-3xl font-serif tracking-tight text-zinc-950 dark:text-zinc-50">
          Typographic Confetti Subscription
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          An email subscription pill with a spring-morphed action button using React 19 TextMorph. Blows out canvas-confetti bursts from the sides on form success.
        </p>
      </div>

      {/* Center Interactive Widget */}
      <div className="my-10 flex flex-col items-center justify-center gap-6">
        {/* Theme Selectors */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 bg-zinc-150 dark:bg-zinc-900 rounded-2xl border border-zinc-200/40 dark:border-zinc-850">
          {CONFETTI_THEMES.map(theme => (
            <button
              key={theme.id}
              onClick={() => setSelectedTheme(theme.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-semibold cursor-pointer transition-all ${
                selectedTheme === theme.id
                  ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-450 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {theme.label}
            </button>
          ))}
        </div>

        {/* Subscribe Form */}
        <AuraSubscribePill
          placeholder="Initiate your flow list membership..."
          onSuccess={handleSuccess}
          confettiColors={getActiveColors()}
          key={selectedTheme}
        />
      </div>

      {/* Bottom Panel: Registrations and Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Registrations List */}
        <div className="bg-white dark:bg-zinc-900 p-4.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm flex flex-col gap-2 min-h-[100px]">
          <span className="text-[10px] font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest">
            Waitlist Enrollments ({registrations.length})
          </span>
          <div className="font-mono text-xs text-zinc-500 space-y-1 overflow-y-auto max-h-[60px] pr-2">
            {registrations.length === 0 ? (
              <span className="italic">No enrollments in this session. Submit an email above!</span>
            ) : (
              registrations.map((email, idx) => (
                <div key={idx} className="flex items-center gap-2 text-emerald-600 dark:text-emerald-500">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                  {email}
                </div>
              ))
            )}
          </div>
        </div>

        {/* Info */}
        <div className="bg-white dark:bg-zinc-900 p-4.5 rounded-2xl border border-zinc-200/60 dark:border-zinc-800/60 shadow-sm flex items-start gap-3">
          <Info className="size-4.5 text-zinc-400 dark:text-zinc-500 mt-0.5 shrink-0" />
          <p className="text-xs text-zinc-450 dark:text-zinc-500 leading-normal">
            The confetti triggers dual canvas-based render calculations that shoot particle streams from symmetrical coordinate offsets, matching the button's viewport margins.
          </p>
        </div>
      </div>
      
    </div>
  );
}
