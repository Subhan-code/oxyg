"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";

const images = [
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=1200&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=1200&auto=format&fit=crop",
];

const cardDetails = [
  { title: "Quantum Logic", tag: "Design Lab 01" },
  { title: "Fluid Dynamics", tag: "Creative Tech" },
  { title: "Chromatic Waves", tag: "Generative Art" },
  { title: "Abstract Core", tag: "Interaction" },
  { title: "Synthetic Fields", tag: "3D Rendering" },
  { title: "Dark Geometry", tag: "Visual System" },
  { title: "Prismatic Ink", tag: "Design Studio" },
];

export function Skiper34() {
  return (
    <section className="relative flex w-full flex-col items-center gap-[15vh] px-4 py-[20vh] bg-transparent">
      <div className="flex flex-col gap-3 text-center mb-10 max-w-xl">
        <span className="text-[11px] font-bold tracking-[0.25em] uppercase text-neutral-400 dark:text-neutral-500">
          Scroll to explore
        </span>
        <h2 className="text-3xl md:text-5xl font-black tracking-tight text-neutral-900 dark:text-white">
          Interactive Card Stack
        </h2>
        <p className="text-[14px] text-neutral-500 dark:text-neutral-400 font-medium">
          Experience smooth scroll-based scale transforms, tilting rotations, and immersive parallax card transitions.
        </p>
      </div>
      <div className="flex flex-col w-full max-w-4xl gap-[35vh]">
        {images.map((img, idx) => (
          <StickyCard_003 
            key={idx} 
            imgUrl={img} 
            index={idx} 
            total={images.length} 
            title={cardDetails[idx].title}
            tag={cardDetails[idx].tag}
          />
        ))}
      </div>
    </section>
  );
}

export const StickyCard_003 = ({
  imgUrl,
  index,
  total,
  title,
  tag,
}: {
  imgUrl: string;
  index: number;
  total: number;
  title: string;
  tag: string;
  key?: React.Key;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of this specific card container relative to the viewport.
  // When the card container goes from top of viewport to top of viewport + height:
  // "start start" -> Top of container reaches top of viewport.
  // "end start" -> Bottom of container reaches top of viewport.
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  // Calculate alternating subtle tilting angles for a beautiful overlapping layout fan
  const targetRotate = index % 2 === 0 ? -6 : 6;

  // Stagger scale down slightly so that cards stacked underneath remain partially visible
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.92 - (total - index) * 0.012]);
  
  // Stagger rotation so cards tilt when they go out
  const rotate = useTransform(scrollYProgress, [0, 1], [0, targetRotate]);
  
  // Counter-rotate the inner image to keep it upright and create an amazing visual parallax effect
  const negateRotate = useTransform(rotate, (val) => -val);

  // Stagger the CSS sticky top offset so that when cards stack, their top headers peek out
  const topOffset = 80 + index * 24; // 80px, 104px, 128px, 152px, ...

  return (
    <div
      ref={containerRef}
      className="relative w-full h-[65vh] flex justify-center items-start"
      style={{
        // Add spacing at the bottom of each card stack container
        marginBottom: index === total - 1 ? "0" : "15vh",
      }}
    >
      <motion.div
        className="rounded-[36px] sticky overflow-hidden w-full h-[55vh] border border-neutral-200/50 dark:border-white/5 shadow-2xl bg-neutral-100 dark:bg-[#1d1f27] transition-shadow duration-300 hover:shadow-neutral-400/20 dark:hover:shadow-black/60 group"
        style={{
          scale,
          rotate,
          top: `${topOffset}px`,
          zIndex: index,
        }}
      >
        <motion.img
          src={imgUrl}
          alt={title}
          style={{
            rotate: negateRotate,
          }}
          className="h-full w-full scale-115 object-cover opacity-90 group-hover:scale-120 group-hover:opacity-100 transition-all duration-500 ease-out"
        />
        {/* Sleek Overlay Details */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent flex flex-col justify-end p-8 text-left">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-[10px] font-extrabold tracking-widest text-[#3b82f6] uppercase bg-[#3b82f6]/10 px-2.5 py-1 rounded-full border border-[#3b82f6]/20">
              {tag}
            </span>
            <span className="text-[10px] font-bold text-neutral-400">
              0{index + 1} &mdash; 0{total}
            </span>
          </div>
          <h3 className="text-3xl font-black text-white tracking-tight leading-none">
            {title}
          </h3>
          <p className="text-neutral-400 text-sm mt-2 max-w-md line-clamp-2 leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            A premium digital asset handcrafted for modern web interfaces. Engineered with fluid spring layout components and dynamic reactive motions.
          </p>
        </div>
      </motion.div>
    </div>
  );
};
