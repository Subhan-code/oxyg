import React from 'react';
import { BlossomCarousel, BlossomCarouselSlide } from '../oxygen-ui/blossom-carousel';

export function BlossomCarouselDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center">
        Blossom Carousel (Scroll Snap)
      </p>
      <div className="rounded-2xl border border-border bg-surface/50 p-6 flex flex-col items-center justify-center overflow-hidden">
        <BlossomCarousel className="w-full">
          {[1, 2, 3, 4, 5, 6, 7].map((item) => (
            <BlossomCarouselSlide key={item} className="bg-[#1F9CFE]/15 flex-col text-foreground">
              <span className="text-4xl font-bold opacity-30">{item}</span>
            </BlossomCarouselSlide>
          ))}
        </BlossomCarousel>
      </div>
    </div>
  );
}

export default BlossomCarouselDemo;
