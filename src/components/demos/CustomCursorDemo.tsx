import React from "react";
import { CustomCursor } from "./CustomCursor";

export default function CustomCursorDemo() {
  return (
    <div 
      data-custom-cursor-container="true" 
      className="w-full max-w-sm bg-neutral-900 border border-white/5 rounded-2xl p-6 flex flex-col gap-4 text-center relative overflow-hidden group select-none"
    >
      <CustomCursor />
      <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Custom Cursor Sandbox</label>
      <div className="py-6 px-4 bg-neutral-950 rounded-xl border border-white/10 flex flex-col gap-2 cursor-default">
        <h3 className="text-base font-bold text-white">Hover over this text!</h3>
        <p className="text-[12px] text-neutral-400 leading-relaxed">
          While your mouse is inside this container, standard text elements will trigger the adaptive vertical height caret cursor.
        </p>
      </div>
      <p className="text-[10px] text-neutral-500">The custom cursor is isolated and only activates when over this component.</p>
    </div>
  );
}
