"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Ensure ScrollTrigger is registered
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const ITEMS_GRID = [
  "/grid/1.webp",
  "/grid/2.webp",
  "/grid/3.webp",
  "/grid/4.webp",
  "/grid/5.webp",
  "/grid/6.webp",
  "/grid/7.webp",
  "/grid/8.webp",
  "/grid/9.webp",
  "/grid/10.webp",
  "/grid/11.webp",
  "/grid/12.webp",
  "/grid/13.webp",
  "/grid/14.webp",
  "/grid/15.webp",
  "/grid/16.webp",
  "/grid/17.webp",
  "/grid/18.webp",
  "/grid/19.webp",
  "/grid/20.webp",
  "/grid/1.webp",
  "/grid/2.webp",
  "/grid/3.webp",
  "/grid/4.webp",
];

const ITEMS_FULL = [
  "/grid/21.webp",
  "/grid/22.webp",
  "/grid/23.webp",
  "/grid/24.webp",
  "/grid/25.webp",
  "/grid/26.webp",
  "/grid/27.webp",
  "/grid/28.webp",
  "/grid/29.webp",
  "/grid/30.webp",
  "/grid/31.webp",
  "/grid/32.webp",
  "/grid/33.webp",
  "/grid/34.webp",
  "/grid/35.webp",
  "/grid/36.webp",
  "/grid/37.webp",
  "/grid/38.webp",
  "/grid/39.webp",
  "/grid/40.webp",
  "/grid/21.webp",
  "/grid/22.webp",
  "/grid/23.webp",
  "/grid/24.webp",
  "/grid/25.webp",
  "/grid/26.webp",
  "/grid/27.webp",
  "/grid/28.webp",
  "/grid/29.webp",
  "/grid/30.webp",
  "/grid/31.webp",
  "/grid/32.webp",
  "/grid/33.webp",
  "/grid/34.webp",
  "/grid/35.webp",
];

const MARQUEE_ITEMS = [
  { en: "Sora Takahashi", jp: "空 高橋" },
  { en: "Aoi Nakamura", jp: "葵 中村" },
  { en: "Ren Fujimoto", jp: "蓮 藤本" },
  { en: "Mio Sakurai", jp: "澪 桜井" },
  { en: "Shin Yamamoto", jp: "真 山本" },
  { en: "Kaori Kobayashi", jp: "香織 小林" },
  { en: "Hikari Inoue", jp: "光 井上" },
  { en: "Yuki Kinoshita", jp: "雪 木下" },
  { en: "Rina Ishikawa", jp: "莉奈 石川" },
  { en: "Kaito Matsumoto", jp: "海斗 松本" },
];

export default function Staggered3DGrid() {
  const scrollerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const scroller = scrollerRef.current;
    if (!scroller) return;

    // We store all trigger animations to revert/kill on cleanup
    const ctx = gsap.context(() => {
      // 1. Grid items 3D on scroll
      const imageWraps = scroller.querySelectorAll(".grid__item-imgwrap");
      imageWraps.forEach((imageWrap) => {
        const imgEl = imageWrap.querySelector(".grid__item-img");
        if (!imgEl) return;

        // Calculate if center is left of scroller center
        const rect = imageWrap.getBoundingClientRect();
        const scrollerRect = scroller.getBoundingClientRect();
        const isLeft = rect.left + rect.width / 2 < scrollerRect.left + scrollerRect.width / 2;

        gsap.timeline({
          scrollTrigger: {
            trigger: imageWrap,
            scroller: scroller,
            start: "top bottom+=10%",
            end: "bottom top-=25%",
            scrub: true,
          },
        })
        .fromTo(imageWrap, 
          {
            z: 300,
            rotateX: 70,
            rotateZ: isLeft ? 5 : -5,
            xPercent: isLeft ? -40 : 40,
            skewX: isLeft ? -20 : 20,
            yPercent: 100,
            filter: "blur(7px) brightness(0%) contrast(400%)",
          },
          {
            z: 0,
            rotateX: 0,
            rotateZ: 0,
            xPercent: 0,
            skewX: 0,
            yPercent: 0,
            filter: "blur(0px) brightness(100%) contrast(100%)",
            ease: "sine",
          }
        )
        .to(imageWrap, {
          z: 300,
          rotateX: -50,
          rotateZ: isLeft ? -1 : 1,
          xPercent: isLeft ? -20 : 20,
          skewX: isLeft ? 10 : -10,
          filter: "blur(4px) brightness(0%) contrast(500%)",
          ease: "sine.in",
        })
        .fromTo(imgEl, 
          { scaleY: 1.8 },
          { scaleY: 1.0, ease: "sine" },
          0
        )
        .to(imgEl, {
          scaleY: 1.8,
          ease: "sine.in",
        });
      });

      // 2. Horizontal Marquee
      const marqueeInner = scroller.querySelector(".mark__inner");
      if (marqueeInner) {
        gsap.timeline({
          scrollTrigger: {
            trigger: marqueeInner,
            scroller: scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(marqueeInner, 
          { x: "50%" },
          { x: "-100%", ease: "sine" }
        );
      }

      // 3. Central Title split character scroll trigger
      const textEl = scroller.querySelector(".text-animation");
      const titleChars = scroller.querySelectorAll(".text-animation .char");
      if (textEl && titleChars.length > 0) {
        gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            scroller: scroller,
            start: "top bottom",
            end: "center center-=25%",
            scrub: true,
          },
        })
        .fromTo(titleChars, 
          { yPercent: 300, autoAlpha: 0 },
          {
            yPercent: 0,
            autoAlpha: 1,
            ease: "sine",
            stagger: {
              each: 0.04,
              from: "center",
            },
          }
        );
      }

      // 4. Grid Full
      const gridFull = scroller.querySelector(".grid--full");
      const gridFullItems = scroller.querySelectorAll(".grid--full .grid__item");
      if (gridFull && gridFullItems.length > 0) {
        const numColumns = 7;
        const middleColumnIndex = 3;
        const columns: Element[][] = Array.from({ length: numColumns }, () => []);

        gridFullItems.forEach((item, index) => {
          const colIdx = index % numColumns;
          columns[colIdx].push(item);
        });

        columns.forEach((columnItems, columnIndex) => {
          const delayFactor = Math.abs(columnIndex - middleColumnIndex) * 0.2;
          const colImages = columnItems.map(item => item.querySelector(".grid__item-img")).filter(Boolean);

          gsap.timeline({
            scrollTrigger: {
              trigger: gridFull,
              scroller: scroller,
              start: "top bottom",
              end: "center center",
              scrub: true,
            },
          })
          .fromTo(columnItems,
            { yPercent: 450, autoAlpha: 0 },
            {
              yPercent: 0,
              autoAlpha: 1,
              delay: delayFactor,
              ease: "sine",
            }
          )
          .fromTo(colImages,
            { transformOrigin: "50% 0%" },
            { ease: "sine" },
            0
          );
        });
      }

      // 5. Credits
      const creditsTexts = scroller.querySelectorAll(".credits-animation");
      creditsTexts.forEach((creditsText) => {
        const chars = creditsText.querySelectorAll(".char");
        gsap.timeline({
          scrollTrigger: {
            trigger: creditsText,
            scroller: scroller,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        })
        .fromTo(chars,
          {
            x: (index) => index * 80 - ((chars.length * 80) / 2),
          },
          {
            x: 0,
            ease: "sine",
          }
        );
      });
    }, scroller);

    return () => {
      ctx.revert();
    };
  }, []);

  const titleText = "HALCYON";
  const creditsLine1 = "Made by @codrops";
  const creditsLine2 = "More demos";

  return (
    <div className="relative w-full h-[580px] rounded-2xl overflow-hidden bg-black text-white border border-white/10 select-none shadow-2xl">
      
      {/* Scrollable Container */}
      <div 
        ref={scrollerRef}
        className="absolute inset-0 overflow-y-auto no-scrollbar scroll-smooth"
        style={{ perspective: "1000px" }}
      >
        {/* Style tag to inject the Codrops exact layouts */}
        <style dangerouslySetInnerHTML={{ __html: `
          .staggered-grid-demo {
            --grid-width: 100%;
            --grid-max-width: 320px;
            --grid-item-ratio: 1.25;
            --grid-item-radius: 8px;
            --grid-gap: 2.5rem;
            --grid-columns: 2;
            --grid-columns-full: 7;
            --grid-rows-full: 5;
            --grid-item-translate: 20px;
            --grid-item-height: auto;
          }

          .grid-container {
            padding: 15vh 0;
            width: var(--grid-width);
            max-width: var(--grid-max-width);
            grid-template-columns: repeat(var(--grid-columns), 1fr);
            position: relative;
            display: grid;
            gap: var(--grid-gap);
            margin: 10vh auto;
          }

          .grid--full {
            width: 100%;
            margin: 15vh 0;
            height: auto;
            aspect-ratio: 1.6;
            max-width: none;
            --grid-gap: 0.75rem;
            --grid-item-height: 100%;
            --grid-item-ratio: auto;
            padding: var(--grid-gap);
            grid-template-columns: repeat(var(--grid-columns-full), 1fr);
            grid-template-rows: repeat(var(--grid-rows-full), 1fr);
          }

          .grid__item-wrap {
            margin: 0;
            position: relative;
            z-index: 1;
            perspective: 800px;
            will-change: transform, opacity;
          }

          .grid__item-imgwrap {
            width: 100%;
            aspect-ratio: var(--grid-item-ratio);
            height: var(--grid-item-height);
            border-radius: var(--grid-item-radius);
            transform-style: preserve-3d;
            position: relative;
            overflow: hidden;
            will-change: filter;
          }

          .grid__item-img {
            background-size: cover;
            background-position: 50% 20%;
            backface-visibility: hidden;
            will-change: transform;
            position: absolute;
            top: calc(-1 * var(--grid-item-translate));
            left: calc(-1 * var(--grid-item-translate));
            height: calc(100% + var(--grid-item-translate) * 2);
            width: calc(100% + var(--grid-item-translate) * 2);
          }

          .mark {
            margin: 15vh 0;
            overflow: hidden;
            width: 100%;
          }

          .mark__inner {
            display: flex;
            gap: 4rem;
            width: max-content;
            will-change: transform;
          }

          .mark__inner span {
            white-space: nowrap;
            text-transform: uppercase;
            font-size: 2.5rem;
            line-height: 1;
            font-weight: 900;
            letter-spacing: -0.02em;
          }

          .text-container {
            display: flex;
            justify-content: center;
            align-items: center;
            margin: 20vh 0;
            width: 100%;
          }

          .text {
            text-transform: uppercase;
            display: flex;
            align-content: center;
            font-size: clamp(3rem, 12vw, 8rem);
            line-height: 0.7;
            font-weight: 900;
            letter-spacing: -0.04em;
          }

          .char {
            display: inline-block;
            will-change: transform;
          }

          .credits-container {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 1rem;
            margin: 15vh auto;
            padding-bottom: 8vh;
          }

          .credits-animation {
            font-size: clamp(1.2rem, 4vw, 2.2rem);
            text-transform: uppercase;
            font-weight: 800;
            letter-spacing: -0.02em;
            display: flex;
            overflow: hidden;
          }
        ` }} />

        <div className="staggered-grid-demo w-full px-6 flex flex-col items-center">
          
          {/* Header Info */}
          <div className="pt-24 pb-8 flex flex-col items-center text-center">
            <h1 className="text-sm font-extrabold uppercase tracking-[0.2em] text-white/50 mb-3">
              Staggered 3D Scroll
            </h1>
            <h2 className="text-3xl font-black uppercase tracking-tight text-white mb-2">
              GRID ANIMATIONS
            </h2>
            <span className="text-xs text-white/40 uppercase tracking-widest mt-4 flex flex-col items-center">
              <span>Scroll down inside this box</span>
              <span className="animate-bounce mt-2 text-white/60">↓</span>
            </span>
          </div>

          {/* First 3D Grid */}
          <div className="grid-container w-full">
            {ITEMS_GRID.map((src, index) => (
              <figure key={index} className="grid__item-wrap">
                <div className="grid__item-imgwrap">
                  <div 
                    className="grid__item-img" 
                    style={{ backgroundImage: `url(${src})` }} 
                  />
                </div>
              </figure>
            ))}
          </div>

          {/* Marquee Inner Scroll */}
          <div className="mark">
            <div className="mark__inner">
              {MARQUEE_ITEMS.map((item, idx) => (
                <span key={idx} className="text-white flex items-center gap-4">
                  <span>{item.en}</span>
                  <span className="text-white/30 font-light">{item.jp}</span>
                </span>
              ))}
            </div>
          </div>

          {/* Large Header Section */}
          <div className="text-container">
            <div className="text text-animation font-black text-white">
              {titleText.split("").map((char, index) => (
                <span key={index} className="char">
                  {char}
                </span>
              ))}
            </div>
          </div>

          {/* Full Grid Section */}
          <div className="grid grid--full">
            {ITEMS_FULL.map((src, index) => (
              <figure key={index} className="grid__item-wrap">
                <div 
                  className="grid__item-img" 
                  style={{ backgroundImage: `url(${src})` }} 
                />
              </figure>
            ))}
          </div>

          {/* Credits Scroll Spacing */}
          <div className="credits-container">
            <div className="credits-animation text-white">
              {creditsLine1.split("").map((char, index) => (
                <span key={index} className="char inline-block whitespace-pre">
                  {char}
                </span>
              ))}
            </div>
            <div className="credits-animation text-white/50 text-sm">
              {creditsLine2.split("").map((char, index) => (
                <span key={index} className="char inline-block whitespace-pre">
                  {char}
                </span>
              ))}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
