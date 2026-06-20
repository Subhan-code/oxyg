import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

export default function WillemLoader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [animationKey, setAnimationKey] = useState(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Reset styles
    const loadingLetter = container.querySelectorAll(".willem__letter");
    const box = container.querySelectorAll(".willem-loader__box");
    const growingImage = container.querySelectorAll(".willem__growing-image");
    const headingStart = container.querySelectorAll(".willem__h1-start");
    const headingEnd = container.querySelectorAll(".willem__h1-end");
    const coverImageExtra = container.querySelectorAll(".willem__cover-image-extra");
    const headerLetter = container.querySelectorAll(".willem__letter-white");
    const navLinks = container.querySelectorAll(".willen-nav a");

    // Clear any previous inline styles before starting
    gsap.killTweensOf([
      loadingLetter,
      box,
      growingImage,
      headingStart,
      headingEnd,
      coverImageExtra,
      headerLetter,
      navLinks
    ]);

    gsap.set(loadingLetter, { yPercent: 0 });
    gsap.set(box, { width: "0em" });
    gsap.set(growingImage, { width: "0%", height: "100%" });
    gsap.set(headingStart, { x: "0em" });
    gsap.set(headingEnd, { x: "0em" });
    gsap.set(coverImageExtra, { opacity: 1 });
    gsap.set(headerLetter, { yPercent: 100 });
    gsap.set(navLinks, { yPercent: 100 });

    /* GSAP Timeline */
    const tl = gsap.timeline({
      defaults: {
        ease: "expo.inOut",
      },
      onStart: () => {
        container.classList.remove('is--hidden');
      }
    });

    /* Start of Timeline */
    if (loadingLetter.length) {
      tl.fromTo(loadingLetter, {
        yPercent: 100
      }, {
        yPercent: 0,
        stagger: 0.025,
        duration: 1.25
      });
    }

    if (box.length) {
      tl.fromTo(box, {
        width: "0em",
      },{
        width: "1em",
        duration: 1.25
      }, "< 1.25");
    }

    if (growingImage.length) {
      tl.fromTo(growingImage, {
        width: "0%",
      },{
        width: "100%",
        duration: 1.25
      }, "<");
    }

    if (headingStart.length) {
      tl.fromTo(headingStart, {
        x: "0em",
      },{
        x: "-0.05em",
        duration: 1.25
      }, "<");
    }

    if (headingEnd.length) {
      tl.fromTo(headingEnd, {
        x: "0em",
      },{
        x: "0.05em",
        duration: 1.25
      }, "<");
    }

    if (coverImageExtra.length) {
      tl.fromTo(coverImageExtra, {
        opacity: 1,
      },{
        opacity: 0,
        duration: 0.05,
        ease: "none",
        stagger: 0.5
      }, "-=0.05");
    }

    if (growingImage.length) {
      tl.to(growingImage, {
        width: "100%",
        height: "100%",
        duration: 2
      }, "< 1.25");
    }

    if (box.length) {
      tl.to(box, {
        width: "110%",
        duration: 2
      }, "<");
    }

    if (headerLetter.length) {
      tl.fromTo(headerLetter, {
        yPercent: 100
      }, {
        yPercent: 0,
        duration: 1.25,
        ease: "expo.out",
        stagger: 0.025
      }, "< 1.2");
    }

    if (navLinks.length) {
      tl.fromTo(navLinks, {
        yPercent: 100
      }, {
        yPercent: 0,
        duration: 1.25,
        ease: "expo.out",
        stagger: 0.1
      }, "<");
    }

    return () => {
      tl.kill();
    };
  }, [animationKey]);

  return (
    <div className="relative w-full h-full bg-[#151313] text-[#f4f4f4] overflow-hidden select-none font-sans flex items-center justify-center rounded-2xl min-h-[350px]">
      <style>{`
        .willem-header {
          color: #f4f4f4;
          position: absolute;
          inset: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .willem-header.is--loading.is--hidden {
          display: none;
        }

        .willem-loader {
          color: #201d1d;
          justify-content: center;
          align-items: center;
          width: 100%;
          height: 100%;
          display: flex;
          position: absolute;
          top: 0;
          left: 0;
          overflow: hidden;
          background: #f4f4f4;
        }

        .willem__h1 {
          white-space: nowrap;
          justify-content: center;
          font-size: 5em;
          font-weight: 500;
          line-height: .75;
          display: flex;
          position: relative;
        }

        .willem__h1-start {
          justify-content: flex-end;
          width: 1.5256em;
          display: flex;
          overflow: hidden;
        }

        .willem__h1-end {
          justify-content: flex-start;
          width: 1.525em;
          display: flex;
          overflow: hidden;
        }

        .willem__letter {
          display: block;
          position: relative;
          transform: translateY(100%);
        }

        .willem__letter-white.is--space {
          margin-left: .25em;
        }

        .willem-loader__box {
          flex-flow: column;
          justify-content: center;
          align-items: center;
          width: 0;
          display: flex;
          position: relative;
        }

        .willem-loader__box-inner {
          justify-content: center;
          align-items: center;
          min-width: 1em;
          height: 95%;
          display: flex;
          position: relative;
        }

        .willem__growing-image {
          justify-content: center;
          align-items: center;
          width: 0%;
          height: 100%;
          display: flex;
          position: absolute;
          overflow: hidden;
        }

        .willem__growing-image-wrap {
          width: 100%;
          min-width: 1em;
          height: 100%;
          position: absolute;
        }

        .willem__cover-image {
          pointer-events: none;
          object-fit: cover;
          -webkit-user-select: none;
          user-select: none;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .willem__cover-image-extra {
          pointer-events: none;
          object-fit: cover;
          -webkit-user-select: none;
          user-select: none;
          width: 100%;
          height: 100%;
          position: absolute;
          top: 0;
          left: 0;
        }

        .willem__cover-image-extra.is--1 {
          z-index: 3;
        }

        .willem__cover-image-extra.is--2 {
          z-index: 2;
        }

        .willem__cover-image-extra.is--3 {
          z-index: 1;
        }

        .willem-header__content {
          flex-flow: column;
          justify-content: space-between;
          align-items: center;
          width: 100%;
          height: 100%;
          padding: 2em;
          display: flex;
          position: absolute;
          inset: 0;
          background: #151313;
          z-index: 10;
        }

        .willem-header__top {
          width: 100%;
          position: relative;
        }

        .willem-header__bottom {
          justify-content: flex-start;
          align-items: flex-end;
          width: 100%;
          display: flex;
          position: relative;
          overflow: hidden;
        }

        .willen-nav {
          display: flex;
          position: relative;
          overflow: hidden;
          width: 100%;
        }

        .willem-nav__start {
          justify-content: flex-start;
          align-items: flex-start;
          width: 50%;
          display: flex;
        }

        .willem-nav__end {
          justify-content: space-between;
          align-items: flex-start;
          width: 50%;
          display: flex;
        }

        .willem-nav__cta {
          display: flex;
        }

        .willem-nav__links {
          grid-column-gap: .5em;
          grid-row-gap: .5em;
          display: flex;
        }

        .willem-nav__link {
          color: inherit;
          font-size: 1.1em;
          line-height: 1.3;
          text-decoration: none;
          position: relative;
          display: block;
        }

        .willem__letter-white {
          display: block;
          position: relative;
          transform: translateY(100%);
        }

        @media screen and (max-width: 991px) {
          .willem__h1 {
            font-size: 4em;
          }

          .willem-nav__links {
            grid-column-gap: 0em;
            grid-row-gap: 0em;
            flex-flow: column;
          }
        }

        @media screen and (max-width: 767px) {
          .willem__h1 {
            font-size: 3em;
          }

          .willem-nav__start {
            width: 60%;
          }

          .willem-nav__end {
            grid-column-gap: 1em;
            grid-row-gap: 1em;
            flex-flow: column;
            width: 40%;
          }
        }
      `}</style>

      <section ref={containerRef} className="willem-header is--loading is--hidden">
        {/* Loading overlay panel */}
        <div className="willem-loader">
          <div className="willem__h1">
            <div className="willem__h1-start">
              <span className="willem__letter">W</span>
              <span className="willem__letter">i</span>
              <span className="willem__letter">l</span>
            </div>
            <div className="willem-loader__box">
              <div className="willem-loader__box-inner">
                <div className="willem__growing-image">
                  <div className="willem__growing-image-wrap">
                    <img className="willem__cover-image-extra is--1" src="https://cdn.prod.website-files.com/6915bbf51d482439010ee790/6915bc3ac9fe346a924724bc_minimalist-architecture-2.avif" loading="lazy" alt="" />
                    <img className="willem__cover-image-extra is--2" src="https://cdn.prod.website-files.com/6915bbf51d482439010ee790/6915bc3ac9fe346a924724cf_minimalist-architecture-4.avif" loading="lazy" alt="" />
                    <img className="willem__cover-image-extra is--3" src="https://cdn.prod.website-files.com/6915bbf51d482439010ee790/6915bc3ac9fe346a924724c5_minimalist-architecture-3.avif" loading="lazy" alt="" />
                    <img className="willem__cover-image" src="https://cdn.prod.website-files.com/6915bbf51d482439010ee790/6915bc3ac9fe346a924724b0_minimalist-architecture-1.avif" loading="lazy" alt="" />
                  </div>
                </div>
              </div>
            </div>
            <div className="willem__h1-end">
              <span className="willem__letter">l</span>
              <span className="willem__letter">e</span>
              <span className="willem__letter">m</span>
            </div>
          </div>
        </div>

        {/* Content after loading animation completes */}
        <div className="willem-header__content">
          <div className="willem-header__top">
            <nav className="willen-nav">
              <div className="willem-nav__start">
                <a href="#" className="willem-nav__link">Osmo ©</a>
              </div>
              <div className="willem-nav__end">
                <div className="willem-nav__links">
                  <a href="#" className="willem-nav__link">Projects,</a>
                  <a href="#" className="willem-nav__link">Services,</a>
                  <a href="#" className="willem-nav__link">Blog (13)</a>
                </div>
                <div className="willem-nav__cta">
                  <a href="#" className="willem-nav__link">Get in touch</a>
                </div>
              </div>
            </nav>
          </div>
          <div className="willem-header__bottom">
            <div className="willem__h1">
              <span className="willem__letter-white">W</span>
              <span className="willem__letter-white">i</span>
              <span className="willem__letter-white">l</span>
              <span className="willem__letter-white">l</span>
              <span className="willem__letter-white">e</span>
              <span className="willem__letter-white">m </span>
              <span className="willem__letter-white is--space">©</span>
            </div>
          </div>
        </div>
      </section>

      {/* Floating replay control */}
      <button
        onClick={() => setAnimationKey(prev => prev + 1)}
        className="absolute bottom-4 right-4 z-[100] px-3 py-1.5 rounded-full bg-white/10 text-xs font-semibold text-white/80 hover:bg-white/20 active:scale-95 transition-all border border-white/10 cursor-pointer"
      >
        Replay Loader
      </button>
    </div>
  );
}
