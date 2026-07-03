import React from 'react';
import BeamsBackground from '../oxygen-ui/beams-background';

export function BeamsBackgroundDemo() {
  return (
    <div className="w-full h-[60vh] rounded-3xl border border-border overflow-hidden relative">
      <BeamsBackground className="absolute inset-0 size-full" intensity="strong" />
    </div>
  );
}

export default BeamsBackgroundDemo;
