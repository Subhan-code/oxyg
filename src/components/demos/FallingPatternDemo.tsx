import React from 'react';
import FallingPattern from '../oxygen-ui/FallingPattern';

export function FallingPatternDemo() {
  return (
    <div className="w-full h-[60vh] rounded-3xl border border-border overflow-hidden bg-[#050505] relative flex items-center justify-center">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-white/[0.03] rounded-full blur-[100px] pointer-events-none z-0" />
      <FallingPattern 
        className="h-full w-full absolute inset-0 z-0" 
        color="rgba(255, 255, 255, 0.7)" 
        backgroundColor="#050505"
        blurIntensity="12px"
      />
      <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
        <h2 className="font-mono text-3xl md:text-5xl text-white/90 font-extrabold tracking-tighter drop-shadow-[0_0_40px_rgba(255,255,255,0.15)]">
          Falling Pattern
        </h2>
      </div>
    </div>
  );
}

export default FallingPatternDemo;
