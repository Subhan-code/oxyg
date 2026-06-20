"use client";

import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

interface LayoutConfig {
  id: number;
  name: string;
  subtitle: string;
  description: string;
}

const LAYOUTS: LayoutConfig[] = [
  { id: 1, name: "Rawness", subtitle: "Staggered random Y entry", description: "Images emerge from the bottom at random speeds as the text slides up." },
  { id: 2, name: "Vision", subtitle: "Centered rotation stagger", description: "Images scale and rotate out from the center axis with descriptive text blocks." },
  { id: 3, name: "Craft", subtitle: "Rotated overlay stacks", description: "Muted card columns trigger random rotation and selective brightness overlays." },
  { id: 4, name: "Chaos", subtitle: "3D scattered grid explosion", description: "Grid cards fly in from exploded 3D space, converging on a uniform layout." },
  { id: 5, name: "Implosion", subtitle: "3D implosion transition", description: "Cards start deep and scale up, imploding from wide coordinates to a grid." },
  { id: 6, name: "Explorations", subtitle: "Random column 3D rotations", description: "Images tumble in along the X axis from deep background layers." },
  { id: 7, name: "Unspoken", subtitle: "Skewed perspective scale", description: "A zoomed card stack tilts, stretches, and skews under dramatic perspective." },
  { id: 8, name: "Opalescent", subtitle: "Dual-layer inner slide", description: "Double-layered frames slide in opposite directions, creating a parallax crop." },
  { id: 9, name: "Style", subtitle: "Staggered hinge rotations", description: "Cards rotate 65 degrees along their left hinges while moving on the Z axis." },
  { id: 10, name: "Future", subtitle: "Skewed corner fan-out", description: "Images pivot outward from a top-right anchor point with subtle skew angles." },
];

export default function OnScrollLayoutFormations() {
  const [activeLayout, setActiveLayout] = useState(1);
  const scrollerRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  // Helper to calculate initial coordinates for Layout 4 & 5
  const calculateInitialTransform = (
    el: HTMLElement,
    offsetDistance = 250,
    maxRotation = 300,
    maxZTranslation = 2000
  ) => {
    const parent = el.offsetParent as HTMLElement;
    if (!parent) return { x: 0, y: 0, z: 0, rotateX: 0, rotateY: 0 };

    const parentWidth = parent.clientWidth;
    const parentHeight = parent.clientHeight;
    
    const viewportCenter = { width: parentWidth / 2, height: parentHeight / 2 };
    const elementCenter = {
      x: el.offsetLeft + el.offsetWidth / 2,
      y: el.offsetTop + el.offsetHeight / 2,
    };

    const angle = Math.atan2(
      Math.abs(viewportCenter.height - elementCenter.y),
      Math.abs(viewportCenter.width - elementCenter.x)
    );

    const translateX = Math.abs(Math.cos(angle) * offsetDistance);
    const translateY = Math.abs(Math.sin(angle) * offsetDistance);

    const maxDistance = Math.sqrt(Math.pow(viewportCenter.width, 2) + Math.pow(viewportCenter.height, 2)) || 1;
    const currentDistance = Math.sqrt(
      Math.pow(viewportCenter.width - elementCenter.x, 2) +
      Math.pow(viewportCenter.height - elementCenter.y, 2)
    );

    const distanceFactor = currentDistance / maxDistance;

    const rotationX = (elementCenter.y < viewportCenter.height ? -1 : 1) * (translateY / offsetDistance) * maxRotation * distanceFactor;
    const rotationY = (elementCenter.x < viewportCenter.width ? 1 : -1) * (translateX / offsetDistance) * maxRotation * distanceFactor;
    const translateZ = maxZTranslation * distanceFactor;

    return {
      x: elementCenter.x < viewportCenter.width ? -translateX : translateX,
      y: elementCenter.y < viewportCenter.height ? -translateY : translateY,
      z: translateZ,
      rotateX: rotationX,
      rotateY: rotationY,
    };
  };

  useEffect(() => {
    const scroller = scrollerRef.current;
    const grid = gridRef.current;
    if (!scroller || !grid) return;

    // Reset scroller position on tab change
    scroller.scrollTop = 0;

    const ctx = gsap.context(() => {
      const images = grid.querySelectorAll(".grid__img");
      if (images.length === 0) return;

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: scroller,
          scroller: scroller,
          start: "top top",
          end: "bottom+=800 bottom",
          scrub: 0.5,
        },
      });

      if (activeLayout === 1) {
        // Layout 1: Rawness (random Y height entry)
        timeline
          .from(images, {
            stagger: 0.05,
            y: () => 500 + Math.random() * 400,
            ease: "sine",
          })
          .from(
            grid.querySelector(".content__title"),
            {
              duration: 1.0,
              ease: "power4.out",
              yPercent: 150,
              autoAlpha: 0,
            },
            0.4
          );
      } else if (activeLayout === 2) {
        // Layout 2: Vision (staggered rotation out from center)
        const middleIndex = Math.floor(images.length / 2);
        timeline
          .from(images, {
            stagger: {
              amount: 0.3,
              from: "center",
            },
            y: 400,
            transformOrigin: "50% 0%",
            rotation: (pos) => {
              const dist = Math.abs(pos - middleIndex);
              return pos < middleIndex ? dist * 4 : dist * -4;
            },
            ease: "power3.out",
          })
          .from(
            grid.querySelectorAll(".grid__item"),
            {
              stagger: {
                amount: 0.3,
                from: "center",
              },
              yPercent: 100,
              autoAlpha: 0,
              ease: "power3.out",
            },
            0
          );
      } else if (activeLayout === 3) {
        // Layout 3: Craft (random rotation + brightness overlay)
        timeline
          .from(images, {
            stagger: 0.05,
            y: 450,
            rotation: () => -12 + Math.random() * 24,
            transformOrigin: "50% 0%",
            ease: "power3.out",
          })
          .fromTo(
            images,
            { filter: "brightness(100%)" },
            {
              ease: "none",
              stagger: 0.05,
              filter: (pos) => (pos < images.length - 1 ? "brightness(25%)" : "brightness(100%)"),
            },
            0
          )
          .from(
            grid.querySelectorAll(".grid__item"),
            {
              xPercent: (pos) => (pos % 2 ? 80 : -80),
              autoAlpha: 0,
              ease: "power3.out",
            },
            0.2
          );
      } else if (activeLayout === 4) {
        // Layout 4: Chaos (3D scattered explode entry)
        gsap.set(grid, { perspective: 1000 });
        const transforms = Array.from(images).map((img) =>
          calculateInitialTransform(img as HTMLElement, 200, 240, 1500)
        );

        timeline.fromTo(
          images,
          {
            x: (i) => transforms[i].x,
            y: (i) => transforms[i].y,
            z: (i) => transforms[i].z,
            rotateX: (i) => transforms[i].rotateX * 0.5,
            rotateY: (i) => transforms[i].rotateY,
            autoAlpha: 0,
            scale: 0.7,
          },
          {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: {
              amount: 0.25,
              from: "center",
              grid: [4, 9],
            },
            ease: "expo.out",
          }
        );
      } else if (activeLayout === 5) {
        // Layout 5: Implosion (deep zoom scale up)
        gsap.set(grid, { perspective: 1200 });
        const transforms = Array.from(images).map((img) =>
          calculateInitialTransform(img as HTMLElement, 600, -120, -2500)
        );

        timeline.fromTo(
          images,
          {
            x: (i) => transforms[i].x,
            y: (i) => transforms[i].y,
            z: (i) => transforms[i].z,
            rotateX: (i) => transforms[i].rotateX,
            rotateY: (i) => transforms[i].rotateY,
            autoAlpha: 0,
            scale: 0.3,
          },
          {
            x: 0,
            y: 0,
            z: 0,
            rotateX: 0,
            rotateY: 0,
            autoAlpha: 1,
            scale: 1,
            stagger: {
              amount: 0.2,
              from: "center",
              grid: [4, 9],
            },
            ease: "power4.out",
          }
        );
      } else if (activeLayout === 6) {
        // Layout 6: Explorations (3D tumble random columns)
        gsap.set(grid, { perspective: 1000 });
        timeline.from(images, {
          stagger: {
            amount: 0.3,
            from: "random",
            grid: [4, 9],
          },
          y: 350,
          rotationX: -65,
          transformOrigin: "50% 0%",
          z: -800,
          autoAlpha: 0,
          ease: "sine.out",
        });
      } else if (activeLayout === 7) {
        // Layout 7: Unspoken (edges zoom and skew grid)
        timeline
          .from(images, {
            stagger: {
              amount: 0.08,
              from: "edges",
              grid: [3, 3],
            },
            scale: 0.65,
            autoAlpha: 0,
            ease: "power2.out",
          })
          .from(
            grid,
            {
              scale: 0.75,
              skewY: 6,
              ease: "none",
            },
            0
          );
      } else if (activeLayout === 8) {
        // Layout 8: Opalescent (opposing directional sliding parallax crop)
        const innerImgs = grid.querySelectorAll(".grid__img-inner");
        timeline
          .fromTo(
            images,
            { yPercent: -102 },
            {
              stagger: 0.06,
              yPercent: 0,
              ease: "power1.inOut",
            }
          )
          .fromTo(
            innerImgs,
            { yPercent: 102 },
            {
              stagger: 0.06,
              yPercent: 0,
              ease: "power1.inOut",
            },
            0
          )
          .from(
            grid.querySelectorAll(".grid__item"),
            {
              yPercent: 30,
              stagger: 0.06 * (images.length / 2),
              autoAlpha: 0,
              ease: "power1.out",
            },
            0
          );
      } else if (activeLayout === 9) {
        // Layout 9: Style (left hinge rotation Y 65 degrees)
        gsap.set(grid, { perspective: 2000 });
        timeline
          .from(images, {
            stagger: {
              amount: 0.6,
              from: "start",
            },
            rotationY: 65,
            transformOrigin: "0% 50%",
            z: -250,
            yPercent: 12,
            ease: "expo.out",
          })
          .from(
            images,
            {
              stagger: {
                amount: 0.6,
                from: "start",
              },
              duration: 0.15,
              autoAlpha: 0,
              ease: "none",
            },
            0
          );
      } else if (activeLayout === 10) {
        // Layout 10: Future (skew fan out corner hinge)
        timeline.from(images, {
          transformOrigin: "100% -200%",
          stagger: 0.06,
          scaleX: 1.1,
          skewX: 12,
          xPercent: 35,
          rotation: -8,
          autoAlpha: 0,
          ease: "power3.out",
        });
      }
    }, scroller);

    return () => {
      ctx.revert();
    };
  }, [activeLayout]);

  return (
    <div className="relative w-full h-[580px] rounded-2xl overflow-hidden bg-[#0c0c0d] text-[#e3e1db] border border-white/10 flex flex-col font-sans select-none shadow-2xl">
      
      {/* Top Header & Tab Controls */}
      <header className="h-16 shrink-0 bg-[#121213] border-b border-white/[0.05] flex items-center justify-between px-6 z-20">
        <div className="flex items-center gap-2.5">
          <span className="font-black text-sm uppercase tracking-wider text-white">Scroll Formations</span>
          <span className="text-[10px] bg-white/5 border border-white/10 px-2 py-0.5 rounded font-extrabold text-neutral-400">
            Layout {activeLayout}
          </span>
        </div>
        
        {/* Navigation Selector */}
        <nav className="flex items-center gap-1 overflow-x-auto no-scrollbar max-w-[50%] py-1">
          {LAYOUTS.map((lay) => (
            <button
              key={lay.id}
              onClick={() => setActiveLayout(lay.id)}
              className={`px-2.5 py-1 rounded text-[10px] font-black border transition-all cursor-pointer whitespace-nowrap ${
                activeLayout === lay.id
                  ? "bg-white text-black border-white"
                  : "bg-white/5 text-neutral-400 border-white/0 hover:text-white"
              }`}
            >
              L{lay.id}
            </button>
          ))}
        </nav>
      </header>

      {/* Grid Canvas Frame Scroller */}
      <div 
        ref={scrollerRef}
        className="flex-1 relative overflow-y-auto no-scrollbar"
      >
        
        {/* Sticky Layout Wrapper */}
        <div className="sticky top-0 w-full h-[514px] overflow-hidden flex items-center justify-center p-4">
          
          {/* Active Grid Element */}
          <div 
            ref={gridRef}
            className="w-full h-full relative flex items-center justify-center"
          >
            {/* CSS parameters for local layouts */}
            <style dangerouslySetInnerHTML={{ __html: `
              .grid-wrapper {
                width: 100%;
                height: 100%;
                display: grid;
                gap: 8px;
              }

              .l1-grid {
                grid-template-columns: repeat(6, 1fr);
                grid-template-rows: repeat(3, 1fr);
              }

              .l2-grid {
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(2, 1fr);
                align-content: center;
              }

              .l3-grid {
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: auto;
                align-content: center;
              }

              .l4-grid {
                grid-template-columns: repeat(9, 1fr);
                grid-template-rows: repeat(4, 1fr);
              }

              .l6-grid {
                grid-template-columns: repeat(5, 1fr);
                grid-template-rows: repeat(4, 1fr);
              }

              .l7-grid {
                grid-template-columns: repeat(3, 1fr);
                grid-template-rows: repeat(3, 1fr);
              }

              .l8-grid {
                grid-template-columns: repeat(12, 1fr);
                gap: 8px;
              }

              .l9-grid {
                grid-template-columns: repeat(12, 1fr);
                grid-auto-rows: 1fr;
              }

              .l10-grid {
                grid-template-columns: repeat(5, 1fr);
              }

              .grid__img-inner-wrap {
                position: relative;
                overflow: hidden;
                width: 100%;
                height: 100%;
              }

              .grid__img-inner {
                width: 100%;
                height: 100%;
                background-size: cover;
                background-position: center;
                will-change: transform;
              }
            ` }} />

            {/* Layout 1 */}
            {activeLayout === 1 && (
              <div className="grid-wrapper l1-grid">
                <div className="grid__img" style={{ backgroundImage: "url(/grid/39.webp)", gridArea: "1/1" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/38.webp)", gridArea: "1/3" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/37.webp)", gridArea: "1/4" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/36.webp)", gridArea: "1/5" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/35.webp)", gridArea: "1/6" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/6.webp)", gridArea: "2/1" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/7.webp)", gridArea: "2/3" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/8.webp)", gridArea: "2/4" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/9.webp)", gridArea: "2/5" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/1.webp)", gridArea: "2/6" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/2.webp)", gridArea: "3/1" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/3.webp)", gridArea: "3/2" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/4.webp)", gridArea: "3/4" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/5.webp)", gridArea: "3/5" }} />
                <div className="grid__img" style={{ backgroundImage: "url(/grid/34.webp)", gridArea: "3/6" }} />

                <div className="content__title absolute inset-0 flex flex-col justify-end p-6 z-10 pointer-events-none">
                  <h2 className="text-4xl font-extrabold text-white tracking-tight leading-none">Rawness</h2>
                  <p className="text-[10px] uppercase text-white/50 tracking-widest mt-1">Captured in every moment</p>
                </div>
              </div>
            )}

            {/* Layout 2 */}
            {activeLayout === 2 && (
              <div className="grid-wrapper l2-grid">
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/23.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/40.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/10.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/17.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/22.webp)" }} />

                <div className="grid__item border border-white/5 bg-[#121213] p-3 rounded-lg flex flex-col justify-center">
                  <h4 className="text-[10px] uppercase text-white/40 tracking-wider">Vision</h4>
                  <p className="text-xs font-semibold text-white/80 mt-1">Unveiling the unseen details</p>
                </div>
                <div className="grid__item border border-white/5 bg-[#121213] p-3 rounded-lg flex flex-col justify-center">
                  <h4 className="text-[10px] uppercase text-white/40 tracking-wider">Focus</h4>
                  <p className="text-xs font-semibold text-white/80 mt-1">Where shadow meets curves</p>
                </div>
                <div className="grid__item border border-white/5 bg-[#121213] p-3 rounded-lg flex flex-col justify-center">
                  <h4 className="text-[10px] uppercase text-white/40 tracking-wider">Essence</h4>
                  <p className="text-xs font-semibold text-white/80 mt-1">Moments in soft motion</p>
                </div>
              </div>
            )}

            {/* Layout 3 */}
            {activeLayout === 3 && (
              <div className="grid-wrapper l3-grid">
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/24.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/25.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/26.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/27.webp)" }} />
                <div className="grid__img aspect-[2/3]" style={{ backgroundImage: "url(/grid/28.webp)" }} />

                <div className="grid__item col-span-2 bg-[#121213] border border-white/5 p-4 rounded-lg flex flex-col justify-center text-center">
                  <h4 className="text-[10px] uppercase text-white/40 tracking-wider">Craft</h4>
                  <p className="text-xs text-white/70 mt-1">Revealing the quiet texture in fleeting shadows.</p>
                </div>
                <div className="grid__item col-span-3 bg-[#121213] border border-white/5 p-4 rounded-lg flex flex-col justify-center text-center">
                  <h4 className="text-[10px] uppercase text-white/40 tracking-wider">Perspective</h4>
                  <p className="text-xs text-white/70 mt-1">Finding absolute depth inside local stillness.</p>
                </div>
              </div>
            )}

            {/* Layout 4 (Chaos grid) */}
            {activeLayout === 4 && (
              <div className="grid-wrapper l4-grid">
                {Array.from({ length: 36 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="grid__img w-full h-full bg-cover bg-center rounded-sm"
                    style={{ backgroundImage: `url(/grid/${(idx % 20) + 1}.webp)` }}
                  />
                ))}
              </div>
            )}

            {/* Layout 5 (Implosion) */}
            {activeLayout === 5 && (
              <div className="grid-wrapper l4-grid">
                {Array.from({ length: 36 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="grid__img w-full h-full bg-cover bg-center rounded-sm"
                    style={{ backgroundImage: `url(/grid/${((idx + 5) % 20) + 1}.webp)` }}
                  />
                ))}
              </div>
            )}

            {/* Layout 6 (Explorations) */}
            {activeLayout === 6 && (
              <div className="grid-wrapper l6-grid">
                {Array.from({ length: 20 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="grid__img w-full h-full bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(/grid/${(idx % 15) + 1}.webp)` }}
                  />
                ))}
              </div>
            )}

            {/* Layout 7 (Unspoken) */}
            {activeLayout === 7 && (
              <div className="grid-wrapper l7-grid">
                {Array.from({ length: 9 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="grid__img w-full h-full bg-cover bg-center rounded-md"
                    style={{ backgroundImage: `url(/grid/${((idx * 3) % 20) + 1}.webp)` }}
                  />
                ))}
              </div>
            )}

            {/* Layout 8 (Opalescent - dual layer) */}
            {activeLayout === 8 && (
              <div className="grid-wrapper l8-grid">
                <div className="grid__item col-span-3 bg-[#121213] border border-white/5 p-3 rounded-lg flex flex-col justify-center">
                  <h4 className="text-[10px] uppercase text-white/40 tracking-wider">Opalescent</h4>
                  <p className="text-xs text-white/70 mt-1">Their hearts glow softly, bound in quiet tones.</p>
                </div>
                
                <div className="grid__img span-2 ar-rect">
                  <div className="grid__img-inner-wrap rounded">
                    <div className="grid__img-inner" style={{ backgroundImage: "url(/grid/10.webp)" }} />
                  </div>
                </div>
                <div className="grid__img span-3 ar-wide">
                  <div className="grid__img-inner-wrap rounded">
                    <div className="grid__img-inner" style={{ backgroundImage: "url(/grid/12.webp)" }} />
                  </div>
                </div>
                <div className="grid__img span-2 ar-narrow">
                  <div className="grid__img-inner-wrap rounded">
                    <div className="grid__img-inner" style={{ backgroundImage: "url(/grid/14.webp)" }} />
                  </div>
                </div>
                <div className="grid__img span-2 ar-rect">
                  <div className="grid__img-inner-wrap rounded">
                    <div className="grid__img-inner" style={{ backgroundImage: "url(/grid/16.webp)" }} />
                  </div>
                </div>
                
                <div className="grid__item col-span-3 bg-[#121213] border border-white/5 p-3 rounded-lg flex flex-col justify-center">
                  <h4 className="text-[10px] uppercase text-white/40 tracking-wider">Softness</h4>
                  <p className="text-xs text-white/70 mt-1">Blissful serenity embraces the visual landscape.</p>
                </div>

                <div className="grid__img span-3 ar-wide">
                  <div className="grid__img-inner-wrap rounded">
                    <div className="grid__img-inner" style={{ backgroundImage: "url(/grid/18.webp)" }} />
                  </div>
                </div>
                <div className="grid__img span-2 ar-narrow">
                  <div className="grid__img-inner-wrap rounded">
                    <div className="grid__img-inner" style={{ backgroundImage: "url(/grid/20.webp)" }} />
                  </div>
                </div>
                <div className="grid__img span-4 ar-wide">
                  <div className="grid__img-inner-wrap rounded">
                    <div className="grid__img-inner" style={{ backgroundImage: "url(/grid/22.webp)" }} />
                  </div>
                </div>
              </div>
            )}

            {/* Layout 9 (Style) */}
            {activeLayout === 9 && (
              <div className="grid-wrapper l9-grid">
                {Array.from({ length: 36 }).map((_, idx) => (
                  <div 
                    key={idx} 
                    className="grid__img w-full h-full bg-cover bg-center rounded-sm"
                    style={{ backgroundImage: `url(/grid/${((idx * 2) % 20) + 1}.webp)` }}
                  />
                ))}
              </div>
            )}

            {/* Layout 10 (Future) */}
            {activeLayout === 10 && (
              <div className="grid-wrapper l10-grid">
                <div className="grid__img aspect-[2/3] rounded" style={{ backgroundImage: "url(/grid/35.webp)" }} />
                <div className="grid__img aspect-[2/3] rounded" style={{ backgroundImage: "url(/grid/31.webp)" }} />
                <div className="grid__img aspect-[2/3] rounded" style={{ backgroundImage: "url(/grid/20.webp)" }} />
                <div className="grid__img aspect-[2/3] rounded" style={{ backgroundImage: "url(/grid/34.webp)" }} />
                <div className="grid__img aspect-[2/3] rounded" style={{ backgroundImage: "url(/grid/38.webp)" }} />
              </div>
            )}

          </div>

        </div>

        {/* Scroll Track Spacer to enable local vertical scrolling */}
        <div className="h-[900px] w-full pointer-events-none" />

      </div>

      {/* Description Overlay Status Bar */}
      <footer className="h-16 shrink-0 bg-[#121213] border-t border-white/[0.05] px-6 flex items-center justify-between text-xs text-neutral-400 z-20">
        <span className="font-bold truncate max-w-[45%] text-white/80">{LAYOUTS[activeLayout - 1].subtitle}</span>
        <span className="text-[11px] truncate max-w-[50%] text-right text-neutral-500">{LAYOUTS[activeLayout - 1].description}</span>
      </footer>

    </div>
  );
}
