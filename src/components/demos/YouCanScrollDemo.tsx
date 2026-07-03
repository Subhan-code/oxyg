import React from 'react';
import YouCanScroll from '../oxygen-ui/YouCanScroll';

export function YouCanScrollDemo() {
  return (
    <div className="w-full h-[80vh] rounded-3xl border border-border overflow-y-auto relative bg-[#0a0a0a]" style={{ scrollbarWidth: "none" }}>
      <YouCanScroll />
    </div>
  );
}

export default YouCanScrollDemo;
