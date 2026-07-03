"use client";

import React, { useRef, useState, useEffect } from "react";
import { HorizontalDepthFade } from "../oxygen-ui/horizontal-depth-fade";

const DEMO_IMAGES = [
  { src: "https://i.pinimg.com/736x/3a/a2/97/3aa297a3bb396f68bd44d3618b9c968b.jpg", alt: "Honour 1" },
  { src: "https://i.pinimg.com/736x/3a/a2/97/3aa297a3bb396f68bd44d3618b9c968b.jpg", alt: "Honour 2" },
  { src: "https://i.pinimg.com/736x/3a/a2/97/3aa297a3bb396f68bd44d3618b9c968b.jpg", alt: "Honour 3" },
  { src: "https://i.pinimg.com/736x/3a/a2/97/3aa297a3bb396f68bd44d3618b9c968b.jpg", alt: "Honour 4" },
  { src: "https://i.pinimg.com/736x/3a/a2/97/3aa297a3bb396f68bd44d3618b9c968b.jpg", alt: "Honour 5" }
];

export function HorizontalDepthFadeDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);
  const [containerHeight, setContainerHeight] = useState(0);

  useEffect(() => {
    if (!containerRef.current) return;
    let parent = containerRef.current.parentElement;
    let found = false;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === 'auto' || overflow === 'scroll') {
        if (parent !== document.body && parent !== document.documentElement) {
          setScrollContainer(parent);
          found = true;
          break;
        }
      }
      parent = parent.parentElement;
    }
    if (!found) {
      setScrollContainer(null);
    }
    setIsReady(true);
  }, []);

  useEffect(() => {
    if (!scrollContainer) return;
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setContainerHeight(entry.contentRect.height);
      }
    });
    observer.observe(scrollContainer);
    setContainerHeight(scrollContainer.clientHeight);
    return () => observer.disconnect();
  }, [scrollContainer]);

  const scrollRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    scrollRef.current = scrollContainer;
  }, [scrollContainer]);

  if (!isReady) {
    return <div ref={containerRef} className="w-full h-full bg-zinc-950" />;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative bg-zinc-950 hdf-demo-container">
      {containerHeight > 0 && (
        <style>{`
          .hdf-demo-container .sticky.h-screen {
            height: ${containerHeight}px !important;
          }
        `}</style>
      )}
      <HorizontalDepthFade
        scrollContainerRef={scrollRef}
        images={DEMO_IMAGES}
        travel={100}
        blur={10}
        dim={20}
        brightnessBoost={45}
        darknessStrength={1.35}
        minSaturation={0}
        saturationStrength={1.35}
        focusSpread={0.16}
        scaleEffect={0.09}
        scrollSensitivity={0.6}
        itemWidth={520}
        itemHeight={600}
        scrollLength={200}
      />
    </div>
  );
}

export default HorizontalDepthFadeDemo;

