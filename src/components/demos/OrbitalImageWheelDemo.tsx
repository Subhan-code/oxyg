"use client";

import React, { useRef, useState, useEffect } from "react";
import { OrbitalImageWheel } from "../oxygen-ui/orbital-image-wheel";

const DEMO_IMAGES = [
  {
    src: "https://i.pinimg.com/736x/f6/6c/17/f66c17d1bc000edb60130f2531b3d07f.jpg",
    alt: "Neural network visualization",
    label: "Neural Sync",
    subtitle: "Neural Network Architecture",
  },
  {
    src: "https://i.pinimg.com/736x/bd/9e/5b/bd9e5b96d674b20ef0fc253f5d51be8c.jpg",
    alt: "Medical capsule",
    label: "Bio Synthesis",
    subtitle: "Medical Capsule Synthesis",
  },
  {
    src: "https://i.pinimg.com/control1/1200x/2e/d2/61/2ed2616d3ef4cf85c21f69a4a7a5a6e0.jpg",
    alt: "Light prism vision",
    label: "Prism Flow",
    subtitle: "Chromatic Dispersion",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Tech fusion coding screen",
    label: "Dev Kernel",
    subtitle: "Hardware Synthesis Coding",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Dynamic pulse heart trace",
    label: "Heart Pulse",
    subtitle: "Cardiograph Heart Trace",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Wireless digital signal antenna",
    label: "Airwave Signal",
    subtitle: "Electromagnetic Antenna Flow",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Satellite orbit view of Earth",
    label: "Geostationary Orbit",
    subtitle: "Earth Orbit Satellites",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Medical clinic hall",
    label: "Clinic Ward",
    subtitle: "Clean Medical Clinic Corridor",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Cybersecurity parameter vault",
    label: "Cypher Security",
    subtitle: "Digital Authentication Vault",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Prism chromatic lens flare",
    label: "Lens Flare",
    subtitle: "Chromatic Aberration Flare",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Quantum superposition nodes",
    label: "Quantum Nodes",
    subtitle: "Superposition Node Grid",
  },
  {
    src: "https://i.pinimg.com/736x/57/4a/10/574a10380e0bd7afce1f9aafdf129150.jpg",
    alt: "Supernova galactic stellar dust",
    label: "Supernova Dust",
    subtitle: "Galactic Nebular Dust",
  },
];

export function OrbitalImageWheelDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;
    let parent = containerRef.current.parentElement;
    let found = false;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
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

  const scrollRef = useRef<HTMLElement | null>(null);
  useEffect(() => {
    scrollRef.current = scrollContainer;
  }, [scrollContainer]);

  if (!isReady) {
    return <div ref={containerRef} className="w-full h-full bg-zinc-950" />;
  }

  return (
    <div ref={containerRef} className="w-full h-full relative bg-zinc-950">
      <OrbitalImageWheel
        scrollContainerRef={scrollRef}
        images={DEMO_IMAGES}
        turns={4}
        blur={4}
        dim={40}
        brightnessBoost={30}
        darknessStrength={1.05}
        minSaturation={55}
        saturationStrength={0.6}
        focusSpread={0.34}
        scaleEffect={0.06}
        scrollSensitivity={0.7}
        itemWidth={300}
        itemHeight={400}
        scrollLength={330}
        cropRatio={0.86}
      />
    </div>
  );
}

export default OrbitalImageWheelDemo;
