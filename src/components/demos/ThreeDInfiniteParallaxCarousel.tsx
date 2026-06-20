"use client";

import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

const originalCards = [
  { img: "https://picsum.photos/800/450?random=1", alt: "Random Image 1" },
  { img: "https://picsum.photos/800/450?random=2", alt: "Random Image 2" },
  { img: "https://picsum.photos/800/450?random=3", alt: "Random Image 3" },
  { img: "https://picsum.photos/800/450?random=4", alt: "Random Image 4" },
  { img: "https://picsum.photos/800/450?random=5", alt: "Random Image 5" },
];

// Clone the original cards multiple times for infinite scrolling illusion
const CARDS_DATA = [...originalCards, ...originalCards, ...originalCards];

export default function ThreeDInfiniteParallaxCarousel() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imgRefs = useRef<(HTMLImageElement | null)[]>([]);

  // Ticker refs
  const positionRef = useRef(0);
  const velocityRef = useRef(0);
  const smoothPosRef = useRef(0);
  const isDraggingRef = useRef(false);
  const lastXRef = useRef(0);
  const dragStartXRef = useRef(0);
  const dragStartTimeRef = useRef(0);
  const touchStartXRef = useRef<number | null>(null);

  useEffect(() => {
    // Disable GSAP warnings about null targets
    gsap.config({ nullTargetWarn: false });

    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    // Helper functions
    const getCardWidth = () => {
      const firstCard = cardsRef.current[0];
      if (!firstCard) return 300;
      const style = getComputedStyle(firstCard);
      return firstCard.offsetWidth + parseFloat(style.marginRight || "0");
    };

    let itemW = getCardWidth();
    let totalWidth = itemW * CARDS_DATA.length;
    let visibleCenterX = viewport.offsetWidth / 2;

    const wrap = (x: number) => {
      return ((x % totalWidth) + totalWidth) % totalWidth;
    };

    const easeScale = (t: number) => {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    };

    // Event Handlers
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      velocityRef.current += e.deltaY * 0.1;
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (touchStartXRef.current === null) return;
      const dx = e.touches[0].clientX - touchStartXRef.current;
      positionRef.current -= dx;
      touchStartXRef.current = e.touches[0].clientX;
    };

    const handleTouchEnd = () => {
      touchStartXRef.current = null;
    };

    const handleMouseDown = (e: MouseEvent) => {
      isDraggingRef.current = true;
      lastXRef.current = e.clientX;
      dragStartXRef.current = e.clientX;
      dragStartTimeRef.current = performance.now();
      velocityRef.current = 0;
      viewport.classList.add("dragging");
    };

    const handleMouseMove = (e: MouseEvent) => {
      if (!isDraggingRef.current) return;
      const dx = e.clientX - lastXRef.current;
      positionRef.current -= dx * 0.8;
      lastXRef.current = e.clientX;
    };

    const handleMouseUp = (e: MouseEvent) => {
      if (isDraggingRef.current) {
        viewport.classList.remove("dragging");
        isDraggingRef.current = false;

        const dx = e.clientX - dragStartXRef.current;
        const dt = (performance.now() - dragStartTimeRef.current) / 1000;

        if (dt > 0) {
          const v = -(dx / dt) * 0.03;
          const maxVelocity = 30;
          velocityRef.current = Math.max(Math.min(v, maxVelocity), -maxVelocity);
        }
      }
    };

    const handleResize = () => {
      itemW = getCardWidth();
      totalWidth = itemW * CARDS_DATA.length;
      visibleCenterX = viewport.offsetWidth / 2;
    };

    // Attach Event Listeners
    viewport.addEventListener("wheel", handleWheel, { passive: false });
    viewport.addEventListener("touchstart", handleTouchStart, { passive: true });
    viewport.addEventListener("touchmove", handleTouchMove, { passive: true });
    viewport.addEventListener("touchend", handleTouchEnd, { passive: true });
    viewport.addEventListener("mousedown", handleMouseDown);
    viewport.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    window.addEventListener("resize", handleResize);

    // Animation Loop via GSAP Ticker
    const tickerUpdate = () => {
      if (!isDraggingRef.current) {
        positionRef.current += velocityRef.current;
        velocityRef.current *= 0.91; // friction
      }

      smoothPosRef.current += (positionRef.current - smoothPosRef.current) * 0.14; // lerpSpeed

      for (let i = 0; i < CARDS_DATA.length; i++) {
        const card = cardsRef.current[i];
        const img = imgRefs.current[i];
        if (!card || !img) continue;

        let baseX = i * itemW - smoothPosRef.current;
        baseX = wrap(baseX);

        const finalX = baseX - totalWidth / 2 + visibleCenterX;
        const cardCenterX = finalX + itemW / 2;
        const dist = Math.abs(cardCenterX - visibleCenterX);

        let t = gsap.utils.clamp(0, 1, dist / Math.max(viewport.offsetWidth, 900));
        t = easeScale(t);

        const scale = gsap.utils.mapRange(0, 1, 1, 0.65, t);
        const rotateY = gsap.utils.mapRange(0, 1, 0, 20, t) * (cardCenterX < visibleCenterX ? 1 : -1);
        const rotateX = gsap.utils.mapRange(0, 1, 0, 6, t) * (cardCenterX < visibleCenterX ? -1 : 1);
        const z = gsap.utils.mapRange(0, 1, 120, -60, t);
        const yOffset = gsap.utils.mapRange(0, 1, 0, 40, t);
        const blur = gsap.utils.mapRange(0, 1, 0, 6, t);
        const brightness = gsap.utils.mapRange(0, 1, 1, 0.6, t);

        gsap.set(card, {
          x: finalX,
          y: yOffset,
          scaleX: scale,
          scaleY: scale,
          rotationY: rotateY,
          rotationX: rotateX,
          z,
          filter: `blur(${blur}px) brightness(${brightness})`,
          transformOrigin: "center center",
        });

        // Parallax effect on image
        const parallaxRange = 40;
        const parallaxX = gsap.utils.mapRange(
          -viewport.offsetWidth / 2,
          viewport.offsetWidth / 2,
          parallaxRange,
          -parallaxRange,
          cardCenterX - visibleCenterX
        );
        const parallaxY = gsap.utils.mapRange(
          -viewport.offsetWidth / 2,
          viewport.offsetWidth / 2,
          -10,
          10,
          cardCenterX - visibleCenterX
        );

        gsap.to(img, {
          x: parallaxX,
          y: parallaxY,
          duration: 0.45,
          ease: "power2.out",
        });
      }
    };

    gsap.ticker.add(tickerUpdate);

    // Initial positioning trigger
    handleResize();

    return () => {
      // Clean up event listeners
      viewport.removeEventListener("wheel", handleWheel);
      viewport.removeEventListener("touchstart", handleTouchStart);
      viewport.removeEventListener("touchmove", handleTouchMove);
      viewport.removeEventListener("touchend", handleTouchEnd);
      viewport.removeEventListener("mousedown", handleMouseDown);
      viewport.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
      window.removeEventListener("resize", handleResize);

      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return (
    <div className="three-d-carousel-container w-full h-[380px] rounded-2xl overflow-hidden bg-[#0c0c0e] flex items-center justify-center border border-white/10 shadow-2xl relative select-none">
      
      {/* Styles for perspective and dimensions */}
      <style dangerouslySetInnerHTML={{ __html: `
        .three-d-carousel-container .wrap {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: flex-end;
          justify-content: center;
          perspective: 1200px;
        }
        .three-d-carousel-container .viewport {
          width: 100%;
          height: 100%;
          overflow: visible;
          display: flex;
          align-items: flex-end;
          justify-content: flex-start;
          position: relative;
          cursor: grab;
        }
        .three-d-carousel-container .viewport.dragging {
          cursor: grabbing;
        }
        .three-d-carousel-container .track {
          position: absolute;
          bottom: 24px;
          left: 0;
          height: 80%;
          will-change: transform;
        }
        .three-d-carousel-container .card {
          width: clamp(200px, 25vw, 320px);
          aspect-ratio: 16 / 9;
          margin-right: 32px;
          overflow: hidden;
          position: absolute;
          bottom: 0;
          transform-style: preserve-3d;
          background: transparent;
        }
        .three-d-carousel-container .card-inner {
          width: 100%;
          height: 100%;
          overflow: hidden;
          will-change: transform;
          border-radius: 12px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
        .three-d-carousel-container .card-inner img {
          width: 120%;
          height: 120%;
          object-fit: cover;
          display: block;
          user-select: none;
          -webkit-user-drag: none;
          transform: translate3d(0, 0, 0);
          will-change: transform;
        }
      `}} />

      {/* Frame wrapper */}
      <div className="wrap">
        <div ref={viewportRef} className="viewport" id="viewport">
          <div ref={trackRef} className="track" id="track">
            {CARDS_DATA.map((card, i) => (
              <div
                key={i}
                ref={(el) => {
                  cardsRef.current[i] = el;
                }}
                className="card"
              >
                <div className="card-inner">
                  <img
                    ref={(el) => {
                      imgRefs.current[i] = el;
                    }}
                    src={card.img}
                    alt={card.alt}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Accessibility touch indicators */}
      <div className="absolute top-4 left-4 bg-black/40 backdrop-blur border border-white/10 text-[9px] font-bold text-gray-500 px-2.5 py-1 rounded-md pointer-events-none select-none">
        Drag or Scroll horizontally
      </div>

    </div>
  );
}
