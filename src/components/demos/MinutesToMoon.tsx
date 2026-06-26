import React, { useEffect, useRef } from "react";
import { gsap } from "gsap";

export function MinutesToMoon() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  // Resize handler using ResizeObserver to scale container dynamically to fit wrapper
  useEffect(() => {
    const wrapper = wrapperRef.current;
    const container = containerRef.current;
    if (!wrapper || !container) return;

    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        const boxSize = 679; // Reference design size of the moon container
        const scaleX = width / boxSize;
        const scaleY = height / boxSize;
        const scale = Math.min(1, Math.min(scaleX, scaleY));
        gsap.set(container, { scale: scale });
      }
    });

    resizeObserver.observe(wrapper);
    return () => resizeObserver.disconnect();
  }, []);

  // Animation timeline using GSAP Context for scoping
  useEffect(() => {
    const ctx = gsap.context(() => {
      const wArray = [161, 614, 189, 278, 404];

      // Initial settings
      gsap.set(".moon__txt-bg rect", {
        width: (i) => wArray[i],
        scaleX: 0
      });

      const tl = gsap.timeline({
        delay: 0.5,
        repeat: -1,
        defaults: {
          ease: "expo.inOut",
          duration: 2
        }
      });

      tl.from(".moon-container__base", {
        scaleX: 0,
        duration: 2,
        transformOrigin: "top right"
      })
      .from(".moon__svg-rects rect", {
        scaleX: 0,
        stagger: 0.07,
        duration: 3,
        ease: "expo"
      }, "-=1.0")
      .to(".moon__txt-bg rect", {
        stagger: 0.14,
        scaleX: 1
      }, "-=2.5")
      .from("text", {
        x: (i) => -wArray[i],
        ease: "power4",
        stagger: 0.14
      }, "-=1.6")
      .from(".moon__img", {
        x: "+=200",
        ease: "power4",
        duration: 15
      }, 0);

      timelineRef.current = tl;
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleRestart = () => {
    if (timelineRef.current) {
      timelineRef.current.restart();
    }
  };

  return (
    <div
      ref={wrapperRef}
      className="moon-wrapper w-full h-full min-h-[400px] md:min-h-[500px] flex items-center justify-center bg-black overflow-hidden relative rounded-3xl"
    >
      <div
        ref={containerRef}
        onClick={handleRestart}
        className="moon-container"
        style={{
          width: "679px",
          height: "679px",
          maxWidth: "679px",
          maxHeight: "679px",
          minWidth: "679px",
          minHeight: "679px",
          backgroundColor: "black",
          display: "flex",
          alignItems: "center",
          justifyContent: "center"
        }}
      >
        <div className="moon-el">
          <svg
            className="moon__svg"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 611 611"
          >
            <defs>
              <clipPath id="clip-path" className="moon__svg-rects">
                <rect id="top" width="611" height="72" />
                <rect y="77" width="611" height="72" />
                <rect y="154" width="611" height="72" />
                <rect y="231" width="611" height="72" />
                <rect y="308" width="611" height="72" />
                <rect y="385" width="611" height="72" />
                <rect y="462" width="611" height="72" />
                <rect y="539" width="611" height="72" />
              </clipPath>
            </defs>
            <g clipPath="url(#clip-path)">
              <image
                className="moon__img"
                width="1024"
                height="1024"
                transform="translate(-271 -188) scale(0.98)"
                href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/moon-01-adjusted-02.jpg"
              />
            </g>
            <g className="moon__txt-bg" fill="#D5CEC6" transform="translate(-1 0)">
              <rect y="229" width="612" height="76" />
              <rect y="306" width="612" height="76" />
              <rect y="383" width="612" height="76" />
              <rect y="460" width="612" height="76" />
              <rect y="537" width="612" height="76" />
            </g>
            <clipPath id="moon_txt-mask" className="moon__txt" transform="translate(-2 0)">
              <text x="0" y="303">
                <tspan>13</tspan>
              </text>
              <text x="0" y="380">
                <tspan>MINUTES</tspan>
              </text>
              <text x="1" y="457">
                <tspan>TO</tspan>
              </text>
              <text x="1" y="534">
                <tspan>THE</tspan>
              </text>
              <text x="0" y="611">
                <tspan>MOON</tspan>
              </text>
            </clipPath>
            <g clipPath="url(#moon_txt-mask)">
              <image
                className="moon__img"
                width="1024"
                height="1024"
                transform="translate(-271 -188) scale(0.98)"
                href="https://s3-us-west-2.amazonaws.com/s.cdpn.io/61488/moon-01-adjusted-02.jpg"
              />
              <rect className="moon__txt-overlay" width="611" height="611" />
            </g>
          </svg>
        </div>
        <div className="moon-container__base" />
      </div>
    </div>
  );
}
