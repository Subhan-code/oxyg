import React from "react";
import { MagneticButton } from "./MagneticButton";

export default function MagneticButtonDemo() {
  return (
    <div className="flex flex-col items-center justify-center p-6 bg-neutral-900 border border-white/5 rounded-2xl gap-4 text-center">
      <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Magnetic Hover Sandbox</label>
      <MagneticButton className="px-6 py-3 bg-[#007aff] hover:bg-[#007aff]/90 text-white font-bold rounded-xl shadow-lg cursor-pointer">
        Hover near me 🧲
      </MagneticButton>
      <p className="text-[11px] text-neutral-500">The button snaps subtly to track your mouse movement when nearby.</p>
    </div>
  );
}
