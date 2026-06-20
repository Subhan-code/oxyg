import React, { useRef, useState } from "react";
import { AdaptiveCaret } from "./AdaptiveCaret";

export default function AdaptiveCaretDemo() {
  const [text, setText] = useState("Type here to see the adaptive caret follow your cursor...");
  const [cursorPos, setCursorPos] = useState(0);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const handleSelectionChange = () => {
    if (inputRef.current) {
      setCursorPos(inputRef.current.selectionStart || 0);
    }
  };

  return (
    <div className="w-full max-w-sm bg-neutral-900 border border-white/5 rounded-2xl p-6 flex flex-col gap-3 relative text-left">
      <label className="text-[11px] font-bold text-neutral-400 uppercase tracking-wider">Custom Caret Sandbox</label>
      <div className="relative w-full">
        <textarea
          ref={inputRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
            setCursorPos(e.target.selectionStart || 0);
          }}
          onSelect={handleSelectionChange}
          onKeyUp={handleSelectionChange}
          onClick={handleSelectionChange}
          className="w-full h-24 bg-neutral-950 text-white rounded-xl p-4 text-[16px] outline-none border border-white/10 resize-none font-sans caret-transparent"
        />
        <AdaptiveCaret text={text} cursorPosition={cursorPos} fontSize={16} inputRef={inputRef} />
      </div>
      <p className="text-[11px] text-neutral-500">The blue caret is a custom DOM element measuring text layout coordinates dynamically.</p>
    </div>
  );
}
