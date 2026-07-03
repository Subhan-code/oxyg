"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import logoUrl from "../assets/oxygen-ui-logo.png";

const SCREENSHOTS_COL_1 = [
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1598327105666-5b89351aff97?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1565849906461-0ee120145261?q=80&w=400&auto=format&fit=crop",
];

const SCREENSHOTS_COL_2 = [
  "https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1523206489230-c012c64b2b48?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1580910051074-3eb694886505?q=80&w=400&auto=format&fit=crop",
];

const SCREENSHOTS_COL_3 = [
  "https://images.unsplash.com/photo-1592899677977-9c10ca588bbd?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1533022139390-e31c488d69e2?q=80&w=3840&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1616440347437-b1c73416efc2?q=80&w=400&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=400&auto=format&fit=crop",
];

export function Login() {
  const [email, setEmail] = useState("");
  const [showOtherOptions, setShowOtherOptions] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitType, setSubmitType] = useState<"email" | "google" | "facebook" | "x" | null>(null);

  const handleProviderLogin = (type: "google" | "facebook" | "x") => {
    setIsSubmitting(true);
    setSubmitType(type);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitType(null);
      window.location.hash = "/dashboard";
    }, 1200);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setIsSubmitting(true);
    setSubmitType("email");
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitType(null);
      window.location.hash = "/dashboard";
    }, 1500);
  };

  return (
    <div className="h-screen w-full flex bg-white text-black overflow-hidden font-sans select-none relative z-50">
      
      {/* 1. Left Side: Clean Dark Login Form (Main Part) */}
      <div className="w-full lg:w-[45%] flex flex-col justify-center items-center p-8 bg-white h-full shrink-0">
        
        {/* Form Container */}
        <div className="max-w-[340px] w-full flex flex-col justify-center gap-6 py-4 text-center">
          
          {/* Centered Logo (Oxygen UI Logo) */}
          <a href="#/" className="inline-block mx-auto mb-2 hover:scale-105 transition-transform">
            <img src={logoUrl} alt="Oxygen UI Logo" className="h-10 w-10 object-contain mx-auto" />
          </a>

          {/* Centered Title */}
          <h1 className="text-3xl font-[700] text-black tracking-tight leading-none mb-1 select-none text-balance">
            Welcome back
          </h1>

          {/* Provider buttons */}
          <div className="flex flex-col gap-3">
            {/* Continue with Google */}
            <button 
              onClick={() => handleProviderLogin("google")}
              disabled={isSubmitting}
              className="flex h-11 w-full items-center justify-center gap-2.5 rounded-full border border-neutral-200 bg-transparent hover:bg-black/[0.04] text-[14px] font-semibold text-black transition-[background-color,transform] active:scale-[0.96] cursor-pointer disabled:opacity-50"
            >
              {isSubmitting && submitType === "google" ? (
                <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
              ) : (
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" />
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" />
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" fill="#FBBC05" />
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" fill="#EA4335" />
                </svg>
              )}
              <span>Continue with Google</span>
            </button>

            <AnimatePresence mode="wait">
              {!showOtherOptions ? (
                <motion.button 
                  key="see-options"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  onClick={() => setShowOtherOptions(true)}
                  className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 bg-transparent hover:bg-black/[0.04] text-[14px] font-semibold text-black transition-[background-color,transform] active:scale-[0.96] cursor-pointer"
                >
                  <span>See other options</span>
                </motion.button>
              ) : (
                <motion.div 
                  key="other-options-grid"
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.15 }}
                  className="grid grid-cols-2 gap-3"
                >
                  {/* Facebook Button */}
                  <button 
                    onClick={() => handleProviderLogin("facebook")}
                    disabled={isSubmitting}
                    className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 bg-transparent hover:bg-black/[0.04] text-black transition-[background-color,transform] active:scale-[0.96] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting && submitType === "facebook" ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    ) : (
                      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 12c0-6.627-5.373-12-12-12S0 5.373 0 12c0 5.99 4.388 10.954 10.125 11.854V15.47H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12z" fill="#1877F2" />
                        <path d="M15.83 15.47l.532-3.47h-3.328V9.75c0-.949.465-1.874 1.956-1.874h1.522V4.923s-1.374-.235-2.686-.235c-2.741 0-4.533 1.662-4.533 4.669v2.648H7.078v3.47h3.047v8.385a12.09 12.09 0 0 0 3.75 0V15.47h2.796z" fill="#ffffff" />
                      </svg>
                    )}
                  </button>

                  {/* X Button */}
                  <button 
                    onClick={() => handleProviderLogin("x")}
                    disabled={isSubmitting}
                    className="flex h-11 w-full items-center justify-center rounded-full border border-neutral-200 bg-transparent hover:bg-black/[0.04] text-black transition-[background-color,transform] active:scale-[0.96] cursor-pointer disabled:opacity-50"
                  >
                    {isSubmitting && submitType === "x" ? (
                      <span className="w-4 h-4 rounded-full border-2 border-white/20 border-t-white animate-spin" />
                    ) : (
                      <svg className="w-4 h-4 fill-black" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    )}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Divider */}
          <div className="relative flex items-center justify-center h-4 my-1">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t border-neutral-200"></span>
            </div>
            <span className="relative z-10 px-4 text-xs font-semibold text-gray-500 bg-white select-none">or</span>
          </div>

          {/* Input form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-3">
            <input
              required
              disabled={isSubmitting}
              type="email"
              placeholder="Enter email address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="h-12 w-full px-5 rounded-2xl border border-neutral-200 bg-transparent focus:bg-neutral-50 focus:border-black focus:ring-1 focus:ring-black outline-none transition-[border-color,background-color] text-[15px] text-black placeholder-gray-400 text-left disabled:opacity-50"
            />

            <button
              type="submit"
              disabled={isSubmitting || !email}
              className="flex h-12 w-full items-center justify-center rounded-full bg-black text-white text-[15px] font-bold transition-[background-color,transform] hover:bg-neutral-800 active:scale-[0.96] disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer mt-1"
            >
              {isSubmitting && submitType === "email" ? (
                <span className="w-4 h-4 rounded-full border-2 border-neutral-950/20 border-t-neutral-950 animate-spin" />
              ) : (
                <span>Continue</span>
              )}
            </button>
          </form>

          {/* Footer Text */}
          <p className="text-[11px] text-gray-500 text-center leading-normal font-medium mt-1 select-none text-pretty">
            By continuing, you agree to Mobbin’s{" "}
            <a href="#/" className="text-gray-600 hover:text-black transition-colors underline decoration-black/20">Terms of Service</a>
            {" "}and{" "}
            <a href="#/" className="text-gray-600 hover:text-black transition-colors underline decoration-black/20">Privacy Policy</a>.
          </p>

        </div>

      </div>

      {/* 2. Right Side: Signature Mobbin scrolling columns (Demo Part) */}
      <div className="hidden lg:flex w-[55%] relative overflow-hidden bg-neutral-50 border-l border-black/5 h-full">
        {/* Radial Dark overlay */}
        <div className="absolute inset-0 bg-radial-[circle_at_center] from-transparent via-white/40 to-white z-20 pointer-events-none" />
        
        {/* Absolute vertical gradients to fade top and bottom */}
        <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-white to-transparent z-20 pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent z-20 pointer-events-none" />

        {/* 3 scrolling columns of app screenshots */}
        <div className="grid grid-cols-3 gap-6 px-8 py-12 w-full h-full justify-center opacity-70">
          
          {/* Col 1: scrolling up */}
          <div className="flex flex-col gap-6 overflow-hidden relative">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 24, ease: "linear" }}
              className="flex flex-col gap-6"
            >
              {[...SCREENSHOTS_COL_1, ...SCREENSHOTS_COL_1].map((src, i) => (
                <div key={i} className="w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img src={src} className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-white/10" alt="App screenshot" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Col 2: scrolling down */}
          <div className="flex flex-col gap-6 overflow-hidden relative">
            <motion.div
              animate={{ y: ["-50%", "0%"] }}
              transition={{ repeat: Infinity, duration: 28, ease: "linear" }}
              className="flex flex-col gap-6"
            >
              {[...SCREENSHOTS_COL_2, ...SCREENSHOTS_COL_2].map((src, i) => (
                <div key={i} className="w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img src={src} className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-white/10" alt="App screenshot col 2" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Col 3: scrolling up */}
          <div className="flex flex-col gap-6 overflow-hidden relative">
            <motion.div
              animate={{ y: ["0%", "-50%"] }}
              transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
              className="flex flex-col gap-6"
            >
              {[...SCREENSHOTS_COL_3, ...SCREENSHOTS_COL_3].map((src, i) => (
                <div key={i} className="w-full aspect-[9/16] rounded-2xl overflow-hidden border border-white/5 shadow-2xl">
                  <img src={src} className="w-full h-full object-cover outline outline-1 -outline-offset-1 outline-white/10" alt="App screenshot col 3" />
                </div>
              ))}
            </motion.div>
          </div>

        </div>
      </div>

    </div>
  );
}
