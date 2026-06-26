"use client";

import React, { useState } from "react";
import { ArrowRight, AlertCircle } from "lucide-react";

export default function ErrorStateShake() {
  const [email, setEmail] = useState("");
  const [isError, setIsError] = useState(false);
  const [isShaking, setIsShaking] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!emailRegex.test(email)) {
      setIsError(true);
      setIsShaking(true);
      
      // Clear shaking class after animation completes so it can shake again
      setTimeout(() => {
        setIsShaking(false);
      }, 280); // cumulative shake duration: (80*2) + (60*2) = 280ms
      
      // Auto-revert error borders and message after 3000ms hold time
      setTimeout(() => {
        setIsError(false);
      }, 3000);
    } else {
      alert("Subscription successful!");
      setEmail("");
      setIsError(false);
      setIsShaking(false);
    }
  };

  return (
    <div className="w-full max-w-[360px] mx-auto p-6 bg-[#0d0e12] rounded-3xl border border-white/5 flex flex-col gap-4 text-white shadow-2xl select-none">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Transitions.dev</span>
        <h3 className="text-lg font-bold text-white tracking-tight">Error Shake Input</h3>
      </div>

      <form 
        onSubmit={handleSubmit}
        className={`t-input-wrap flex flex-col gap-2 ${isError ? "is-error" : ""}`}
      >
        <div 
          className={`t-input flex items-center h-12 w-full bg-neutral-900/60 rounded-xl px-4 border ${isError ? "border-red-500/50 is-shaking bg-red-500/5" : "border-white/10 focus-within:border-indigo-500"} transition-all`}
        >
          <input 
            type="text" 
            placeholder="Subscribe with your email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full text-sm bg-transparent border-none text-white focus:outline-none focus:ring-0 pr-6 placeholder-neutral-500 font-medium"
          />
          <button 
            type="submit"
            className={`shadow-xs flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all duration-200 ease-out cursor-pointer active:scale-90 ${isError ? "bg-red-500/20 text-red-400 hover:bg-red-500/30" : "bg-white/5 border border-white/10 hover:bg-white/10 text-neutral-400 hover:text-white"}`}
          >
            <ArrowRight className="h-4 w-4" strokeWidth={2.5} />
          </button>
        </div>

        {/* Error message */}
        <p className="t-error-msg flex items-center gap-1.5 text-[11px] font-bold text-red-400 mt-1 select-none">
          <AlertCircle className="w-3.5 h-3.5" />
          Please enter a valid email address.
        </p>
      </form>
    </div>
  );
}
