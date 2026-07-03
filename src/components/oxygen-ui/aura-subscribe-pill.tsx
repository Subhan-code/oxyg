import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TextMorph } from 'torph/react';
import confetti from 'canvas-confetti';
import { Loader2, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AuraSubscribePillProps {
  placeholder?: string;
  onSuccess?: (email: string) => void;
  className?: string;
  confettiColors?: string[];
}

export function AuraSubscribePill({
  placeholder = 'you@example.com',
  onSuccess,
  className,
  confettiColors = ['#9333ea', '#a855f7', '#c084fc', '#e9d5ff', '#ffffff', '#000000'],
}: AuraSubscribePillProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    // Simulate standard submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess?.(email);

      // Trigger high-fidelity dual confetti bursts on success!
      confetti({
        particleCount: 80,
        spread: 60,
        angle: 60,
        startVelocity: 50,
        origin: { y: 0.6, x: 0.1 },
        colors: confettiColors,
      });

      confetti({
        particleCount: 80,
        spread: 60,
        angle: 120,
        startVelocity: 50,
        origin: { y: 0.6, x: 0.9 },
        colors: confettiColors,
      });

      // Clear successful state after 3.5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3500);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("w-full max-w-[500px] select-none", className)}
    >
      <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-900/60 p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-zinc-300 dark:focus-within:border-zinc-700/80 focus-within:shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] transition-all">
        <label htmlFor="subscribe-email" className="sr-only">Email</label>
        <input
          id="subscribe-email"
          type="email"
          placeholder={placeholder}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none disabled:opacity-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || isSubmitted}
        />
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted || !email}
          className={cn(
            "group relative inline-flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold transition-all duration-[220ms] ease-out shadow-sm outline-none disabled:opacity-60 cursor-pointer active:scale-95 disabled:active:scale-100",
            isSubmitted
              ? "bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-100"
              : "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900"
          )}
        >
          <span className="inline-flex items-center gap-2 relative z-10 select-none">
            <TextMorph>
              {isSubmitting ? 'Sending' : isSubmitted ? 'Joined' : 'Flow'}
            </TextMorph>
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </motion.div>
              ) : isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="h-3.5 w-3.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform duration-220 group-hover:translate-x-[2px]"
                  >
                    <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          {!isSubmitted && (
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-md" />
          )}
        </button>
      </div>
    </form>
  );
}


