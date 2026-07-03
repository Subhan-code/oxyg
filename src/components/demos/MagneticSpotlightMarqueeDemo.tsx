import React from 'react';
import { MagneticSpotlightMarquee } from '../ui/magnetic-spotlight-marquee';

export function MagneticSpotlightMarqueeDemo() {
  return (
    <div className="w-full h-[600px] rounded-3xl border border-border overflow-hidden relative">
      <MagneticSpotlightMarquee className="h-full min-h-0" />
    </div>
  );
}

export default MagneticSpotlightMarqueeDemo;
