"use client";

import React, { useState } from "react";
import { Plus, Settings, User, CreditCard, LogOut } from "lucide-react";

export default function PlusMenuMorph() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full max-w-[360px] mx-auto p-6 bg-[#0d0e12] rounded-3xl border border-white/5 flex flex-col gap-6 text-white shadow-2xl select-none">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Transitions.dev</span>
        <h3 className="text-lg font-bold text-white tracking-tight">Plus to Menu Morph</h3>
      </div>

      <div className="flex items-center justify-center min-h-[220px] bg-neutral-950/60 rounded-2xl border border-white/5 relative p-8">
        
        {/* Anchor wrap positioning the closed circle / open panel in the corner */}
        <div className="absolute bottom-6 right-6">
          <div 
            className="t-morph bg-neutral-900 border border-white/10 shadow-2xl flex items-center justify-center"
            data-open={isOpen ? "true" : "false"}
          >
            {/* Menu contents */}
            <div className="t-morph-menu flex flex-col justify-between p-4 w-full h-full">
              <div className="flex flex-col gap-2">
                <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-wider">Shortcuts</span>
                <div className="flex flex-col gap-1">
                  <button className="flex items-center gap-2.5 text-xs font-bold text-neutral-300 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-left">
                    <User className="w-4 h-4 text-neutral-400" />
                    Profile
                  </button>
                  <button className="flex items-center gap-2.5 text-xs font-bold text-neutral-300 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-left">
                    <Settings className="w-4 h-4 text-neutral-400" />
                    Settings
                  </button>
                  <button className="flex items-center gap-2.5 text-xs font-bold text-neutral-300 hover:text-white px-2 py-1.5 rounded-lg hover:bg-white/5 transition-colors cursor-pointer text-left">
                    <CreditCard className="w-4 h-4 text-neutral-400" />
                    Billing
                  </button>
                </div>
              </div>
              <button 
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-2.5 text-xs font-bold text-red-400 hover:text-red-300 px-2 py-1.5 rounded-lg hover:bg-red-500/10 transition-colors cursor-pointer text-left mt-2"
              >
                <LogOut className="w-4 h-4" />
                Close menu
              </button>
            </div>

            {/* Plus trigger button */}
            <button 
              onClick={() => setIsOpen(true)}
              className="t-morph-plus text-neutral-400 hover:text-white bg-neutral-900 border border-white/5 hover:bg-neutral-800 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
              aria-expanded={isOpen}
            >
              <Plus className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
      
      <span className="text-[11px] text-neutral-500 font-semibold uppercase tracking-wider text-center">Click the Plus button in the corner to expand</span>
    </div>
  );
}
