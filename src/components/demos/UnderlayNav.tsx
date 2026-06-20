import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { CustomEase } from "gsap/CustomEase";

gsap.registerPlugin(CustomEase);

export default function UnderlayNav() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const timelineRef = useRef<gsap.core.Timeline | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    try {
      CustomEase.create("energy", "M0,0 C0.32,0.72 0,1 1,1");
    } catch (e) {
      console.warn("CustomEase registration error:", e);
    }

    const toggleBtn = container.querySelector("[data-underlay-nav-toggle]");
    const toggleLabels = container.querySelectorAll(".underlay-nav__toggle-label");
    const toggleBars = container.querySelectorAll(".underlay-nav__toggle-bar");
    const menuEl = container.querySelector("[data-underlay-nav-menu]");
    const largeItems = container.querySelectorAll("[data-reveal-l]");
    const smallItems = container.querySelectorAll("[data-reveal-s]");
    const menuBorder = container.querySelector(".underlay-nav__bottom-border");
    const mainEl = container.querySelector("[data-main]");
    const overlayEl = container.querySelector("[data-underlay-nav-overlay]");
    const darkEl = container.querySelector(".underlay-nav__dark");
    const corners = container.querySelectorAll(".underlay-nav__corner");
    const overlayBorders = container.querySelectorAll(".underlay-nav__border-row");

    if (!toggleBtn || !menuEl || !mainEl || !overlayEl) return;

    const closedColor = getComputedStyle(toggleBtn as HTMLElement).color || "#ffffff";
    const openColor = getComputedStyle(menuEl as HTMLElement).color || "#ffffff";

    const getMenuOffset = () => -(menuEl as HTMLElement).offsetWidth;

    gsap.set(overlayEl, { visibility: "hidden", pointerEvents: "none" });
    gsap.set(darkEl, { autoAlpha: 0 });
    gsap.set(mainEl, { x: 0 });
    gsap.set(toggleLabels, { yPercent: 0 });
    gsap.set(toggleBars, { y: 0, rotation: 0 });
    gsap.set(menuBorder, { scaleX: 0 });
    if (overlayBorders[0]) gsap.set(overlayBorders[0], { yPercent: -100 });
    if (overlayBorders[1]) gsap.set(overlayBorders[1], { yPercent: 100 });
    gsap.set(corners, { scale: 0 });

    const tl = gsap.timeline({
      paused: true,
      defaults: {
        ease: "energy",
      }
    });

    tl.set(overlayEl, { visibility: "visible", pointerEvents: "auto" }, 0);

    tl.to([mainEl, overlayEl], {
      x: getMenuOffset,
      duration: 0.7,
    }, 0)
    .to(darkEl, {
      autoAlpha: 1,
      duration: 0.5,
    }, 0)
    .to(corners, {
      scale: 1,
      duration: 0.5,
    }, 0)
    .to(overlayBorders, {
      yPercent: 0,
      duration: 0.5,
    }, 0)
    .to(toggleLabels, {
      yPercent: -100,
      duration: 0.4,
    }, 0)
    .to(toggleBtn, {
      color: openColor,
      duration: 0.4,
    }, 0);

    if (toggleBars[0]) {
      tl.to(toggleBars[0], {
        y: "0.25em",
        rotation: 45,
        duration: 0.35,
        ease: "back.out(1.4)",
      }, 0.05);
    }

    if (toggleBars[1]) {
      tl.to(toggleBars[1], {
        y: "-0.25em",
        rotation: -45,
        duration: 0.35,
        ease: "back.out(1.4)",
      }, 0.05);
    }

    tl.fromTo(largeItems,
      { autoAlpha: 0, xPercent: 25 },
      {
        autoAlpha: 1,
        xPercent: 0,
        duration: 0.7,
        stagger: 0.05,
      },
      0
    )
    .fromTo(smallItems,
      { autoAlpha: 0, yPercent: 100 },
      {
        autoAlpha: 1,
        yPercent: 0,
        duration: 0.5,
        stagger: 0.03,
        ease: "power3.out"
      },
      0.3
    )
    .to(menuBorder, {
      scaleX: 1,
      duration: 0.5,
    }, "<");

    const enterEndTime = tl.duration();
    tl.addPause();

    // Closing animation
    tl.to([largeItems, smallItems], {
      autoAlpha: 0,
      duration: 0.3,
    }, "<")
    .to([mainEl, overlayEl], {
      x: 0,
      duration: 0.6,
    }, "<")
    .to(darkEl, {
      autoAlpha: 0,
      duration: 0.35,
      ease: "power2.inOut",
    }, "<")
    .to(corners, {
      scale: 0,
      duration: 0.5,
    }, "<")
    .to(overlayBorders[0], {
      yPercent: -100,
      duration: 0.5,
    }, "<")
    .to(overlayBorders[1], {
      yPercent: 100,
      duration: 0.5,
    }, "<")
    .to(toggleBtn, {
      color: closedColor,
      duration: 0.25,
    }, "<+=0.1")
    .to(toggleLabels, {
      yPercent: 0,
      duration: 0.25,
      ease: "power3.in",
    }, "<")
    .to(toggleBars, {
      y: 0,
      rotation: 0,
      duration: 0.25,
      ease: "power3.in",
    }, "<")
    .set(overlayEl, {
      visibility: "hidden",
      pointerEvents: "none"
    });

    timelineRef.current = tl;

    return () => {
      tl.kill();
    };
  }, []);

  const handleToggle = () => {
    const tl = timelineRef.current;
    if (!tl) return;

    const nextState = !isOpen;
    setIsOpen(nextState);

    const toggleBtn = containerRef.current?.querySelector("[data-underlay-nav-toggle]");
    if (toggleBtn) {
      toggleBtn.setAttribute("aria-expanded", String(nextState));
      toggleBtn.setAttribute("aria-label", nextState ? "close menu" : "open menu");
    }

    const enterEndTime = 0.7; // approximate opening duration

    if (nextState) {
      tl.invalidate();
      if (tl.time() >= enterEndTime) tl.timeScale(1).restart();
      else tl.timeScale(1).play();
    } else {
      if (tl.time() < enterEndTime) tl.timeScale(1).reverse();
      else tl.timeScale(1).play();
    }
  };

  return (
    <div ref={containerRef} className="relative w-full h-[350px] bg-neutral-950 text-white overflow-hidden rounded-2xl select-none font-sans">
      <style>{`
        :root {
          --menu-width: 16em;
        }

        a {
          color: inherit;
          text-decoration: none;
        }

        .underlay-nav__header {
          z-index: 100;
          color: #fff;
          position: absolute;
          inset: 0% 0% auto;
          pointer-events: none;
        }

        .underlay-nav__bar {
          width: 100%;
        }

        .underlay-nav__container {
          justify-content: space-between;
          align-items: center;
          padding: 1.25em;
          display: flex;
        }

        .underlay-nav__logo {
          mix-blend-mode: difference;
          justify-content: center;
          align-items: center;
          width: 5em;
          display: flex;
          pointer-events: auto;
        }

        .underlay-nav__logo-svg {
          width: 100%;
        }

        .underlay-nav__toggle {
          grid-column-gap: .5em;
          grid-row-gap: .5em;
          background-color: transparent;
          border: none;
          outline: none;
          justify-content: center;
          align-items: center;
          padding: 0.5em;
          display: flex;
          cursor: pointer;
          pointer-events: auto;
          z-index: 101;
        }

        .underlay-nav__toggle-text {
          flex-flow: column;
          flex: none;
          justify-content: flex-start;
          align-items: flex-end;
          height: 1.25em;
          display: flex;
          overflow: hidden;
        }

        .underlay-nav__toggle-label {
          font-size: 1em;
          font-weight: 700;
          line-height: 1.25;
        }

        .underlay-nav__toggle-icon {
          grid-column-gap: .25em;
          grid-row-gap: .25em;
          flex-flow: column;
          flex: none;
          justify-content: center;
          align-items: center;
          width: 1.25em;
          display: flex;
        }

        .underlay-nav__toggle-bar {
          background-color: currentColor;
          flex: none;
          width: 100%;
          height: .125em;
        }

        .underlay-nav__menu {
          z-index: 1;
          width: var(--menu-width);
          position: absolute;
          top: 0;
          bottom: 0;
          right: 0;
          background: #111;
        }

        .underlay-nav__overlay {
          z-index: 100;
          pointer-events: none;
          cursor: pointer;
          position: absolute;
          inset: 0% -1px 0% 0%;
        }

        .underlay-nav__inner {
          grid-column-gap: 1.5em;
          grid-row-gap: 1.5em;
          flex-flow: column;
          justify-content: space-between;
          align-items: stretch;
          width: 100%;
          height: 100%;
          padding: 4.5em 1.25em 1.25em;
          display: flex;
          overflow-y: auto;
          overflow-x: hidden;
        }

        .underlay-nav__list {
          flex-flow: column;
          width: 100%;
          margin-bottom: 0;
          padding: 0;
          list-style: none;
          display: flex;
        }

        .underlay-nav__list.is--small {
          grid-column-gap: .5em;
          grid-row-gap: .5em;
        }

        .underlay-nav__link-large {
          border-radius: .25em;
          width: 100%;
          padding: .5em 0.75em;
          display: block;
        }

        .underlay-nav__link-large.w--current {
          color: #ededed;
          background-color: #f85931;
        }

        .underlay-nav__link-label {
          letter-spacing: -.04em;
          font-size: 1.5em;
          line-height: .9;
          font-weight: 800;
        }

        .underlay-nav__bottom {
          justify-content: flex-start;
          align-items: flex-start;
          width: 100%;
          padding-top: 1em;
          display: flex;
          position: relative;
        }

        .underlay-nav__bottom-col {
          grid-column-gap: 0.5em;
          grid-row-gap: 0.5em;
          flex-flow: column;
          flex: 1;
          justify-content: flex-start;
          align-items: flex-start;
          display: flex;
        }

        .underlay-nav__link-small {
          font-size: 0.8em;
          line-height: 1.1;
        }

        .underlay-nav__link-small.is--faded {
          opacity: .5;
        }

        .underlay-nav__corner {
          transform-origin: 100% 0;
          color: #111;
          background-image: radial-gradient(circle farthest-side at 0 100%, #fff0 99%, #111);
          width: 1.5em;
          height: 1.5em;
        }

        .underlay-nav__corner.is--bottom {
          transform-origin: 100% 100%;
          background-image: radial-gradient(circle farthest-side at 0 0, #fff0 99%, #111);
        }

        .underlay-nav__dark {
          opacity: 0;
          background-color: #0000004d;
          position: absolute;
          inset: 0%;
        }

        .underlay-nav__bottom-border {
          opacity: .15;
          transform-origin: 0%;
          background-color: currentColor;
          width: 100%;
          height: 1px;
          position: absolute;
          inset: 0% 0% auto;
        }

        .underlay-nav__borders {
          flex-flow: column;
          justify-content: space-between;
          align-items: stretch;
          display: flex;
          position: absolute;
          inset: 0;
        }

        .underlay-nav__border {
          background-color: #111;
          width: 100%;
          height: 0.75em;
        }

        .underlay-nav__border-row {
          flex-flow: column;
          justify-content: flex-start;
          align-items: flex-end;
          display: flex;
        }

        /* Underlay Layout Wrapper */
        .underlay-wrapper {
          position: absolute;
          inset: 0;
          overflow: hidden;
          width: 100%;
          height: 100%;
        }

        .underlay-main {
          position: absolute;
          inset: 0;
          background: #1e2029;
          z-index: 2;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.5);
        }
      `}</style>

      <div className="underlay-wrapper">
        {/* Underlay Nav menu behind main content */}
        <nav data-underlay-nav-menu className="underlay-nav__menu">
          <div className="underlay-nav__inner">
            <ul className="underlay-nav__list">
              <li data-reveal-l>
                <a href="#" className="underlay-nav__link-large w--current">
                  <span className="underlay-nav__link-label">Home</span>
                </a>
              </li>
              <li data-reveal-l>
                <a href="#" className="underlay-nav__link-large">
                  <span className="underlay-nav__link-label">Projects</span>
                </a>
              </li>
              <li data-reveal-l>
                <a href="#" className="underlay-nav__link-large">
                  <span className="underlay-nav__link-label">About</span>
                </a>
              </li>
              <li data-reveal-l>
                <a href="#" className="underlay-nav__link-large">
                  <span className="underlay-nav__link-label">Contact</span>
                </a>
              </li>
            </ul>
            <div className="underlay-nav__bottom">
              <div className="underlay-nav__bottom-col">
                <div data-reveal-s>
                  <span className="underlay-nav__link-small is--faded">Socials</span>
                </div>
                <ul className="underlay-nav__list is--small">
                  <li data-reveal-s>
                    <a href="#" className="underlay-nav__link-small">Instagram</a>
                  </li>
                  <li data-reveal-s>
                    <a href="#" className="underlay-nav__link-small">LinkedIn</a>
                  </li>
                </ul>
              </div>
              <div className="underlay-nav__bottom-border"></div>
            </div>
          </div>
        </nav>

        {/* Overlay frame and border details */}
        <div data-underlay-nav-overlay className="underlay-nav__overlay">
          <div className="underlay-nav__dark"></div>
          <div className="underlay-nav__borders">
            <div className="underlay-nav__border-row">
              <div className="underlay-nav__border"></div>
              <div className="underlay-nav__corner"></div>
            </div>
            <div className="underlay-nav__border-row">
              <div className="underlay-nav__corner is--bottom"></div>
              <div className="underlay-nav__border"></div>
            </div>
          </div>
        </div>

        {/* Header containing brand logo and toggle button */}
        <header className="underlay-nav__header">
          <div className="underlay-nav__bar">
            <div className="underlay-nav__container">
              <a href="#" className="underlay-nav__logo">
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 110 25" fill="none" className="underlay-nav__logo-svg">
                  <path d="M38.6539 24.1686C42.7853 24.1686 46.43 22.0917 48.6052 18.9263C49.8548 22.1497 53.0871 24.1686 57.3667 24.1686C60.4499 24.1686 63.0505 23.1833 64.7214 21.5632L64.4805 23.6683H69.7011L70.9507 12.7679L73.8518 23.6683H79.0772L81.9784 12.7679L83.2271 23.6683H88.4477L87.8886 18.7885C90.0518 22.0313 93.7424 24.1686 97.9334 24.1686C104.598 24.1686 110 18.766 110 12.1016C110 5.43732 104.596 0.0346429 97.9318 0.0346429C92.7612 0.0346429 88.3518 3.28785 86.6342 7.85749L85.7907 0.499502H80.0215L76.4629 13.8708L72.9044 0.499502H67.1351L66.3246 7.56906C66.2264 5.51224 65.382 3.64878 63.9254 2.29932C62.3021 0.795175 60.0342 0 57.3659 0C54.8659 0 52.7116 0.712193 51.1358 2.06004C49.974 3.05421 49.2135 4.33761 48.9194 5.76119C46.7933 2.32429 42.9923 0.0346429 38.6539 0.0346429C31.9896 0.0346429 26.5869 5.43732 26.5869 12.1016C26.5869 18.766 31.9896 24.1686 38.6539 24.1686ZM97.9318 5.46471C101.597 5.46471 104.569 8.43594 104.569 12.1016C104.569 15.7673 101.597 18.7386 97.9318 18.7386C94.2661 18.7386 91.2949 15.7673 91.2949 12.1016C91.2949 8.43594 94.2661 5.46471 97.9318 5.46471ZM57.3667 5.05786C59.6321 5.05786 61.0227 6.10681 61.0855 7.86393L61.1049 8.39808H66.2304L65.7019 13.0128C65.4392 12.5899 65.1275 12.1991 64.7641 11.8438C63.5685 10.6773 61.8154 9.88289 59.5524 9.48328L56.5014 8.93706C54.48 8.5729 54.0659 7.94127 54.0659 7.10501C54.0659 6.89554 54.1586 5.05705 57.3667 5.05705V5.05786ZM55.1761 14.0094L58.7709 14.6837C61.092 15.1293 61.4046 16.0711 61.4046 16.9339C61.4046 18.2963 59.8569 19.1422 57.365 19.1422C54.4059 19.1422 53.2877 17.4729 53.2289 16.0437L53.2071 15.5128H50.2278C50.5461 14.4308 50.7201 13.2868 50.7201 12.1016C50.7201 12.0452 50.7168 11.9889 50.716 11.9325C51.7876 12.95 53.2836 13.6598 55.1753 14.0094H55.1761ZM38.6539 5.46471C42.3196 5.46471 45.2908 8.43594 45.2908 12.1016C45.2908 15.7673 42.3196 18.7386 38.6539 18.7386C34.9882 18.7386 32.017 15.7673 32.017 12.1016C32.017 8.43594 34.9882 5.46471 38.6539 5.46471Z" fill="#F4F4F4"></path>
                  <path d="M16.3506 9.9554L21.6985 4.6075L19.5619 2.47092L14.214 7.81882C13.986 8.04762 13.5953 7.88569 13.5953 7.56262V0H10.5741V9.12397C10.5741 9.92478 9.92476 10.5741 9.12395 10.5741H0V13.5953H7.56261C7.88567 13.5953 8.04761 13.9861 7.8188 14.2141L2.47172 19.5619L4.6083 21.6985L9.95618 16.3506C10.1842 16.1226 10.5749 16.2838 10.5749 16.6068V24.1694H13.5961V15.0455C13.5961 14.2447 14.2454 13.5953 15.0463 13.5953H24.1702V10.5741H16.6076C16.2845 10.5741 16.1226 10.1834 16.3514 9.9554H16.3506Z" fill="#F85931"></path>
                </svg>
              </a>
              <button data-underlay-nav-toggle aria-expanded="false" aria-label="open menu" onClick={handleToggle} className="underlay-nav__toggle">
                <span className="underlay-nav__toggle-text">
                  <span className="underlay-nav__toggle-label">Menu</span>
                  <span className="underlay-nav__toggle-label">Close</span>
                </span>
                <span className="underlay-nav__toggle-icon">
                  <span className="underlay-nav__toggle-bar"></span>
                  <span className="underlay-nav__toggle-bar"></span>
                </span>
              </button>
            </div>
          </div>
        </header>

        {/* Foreground Content wrapper that gets translated */}
        <div data-main className="underlay-main">
          <h2 className="text-xl font-extrabold tracking-tight text-white mb-2">Osmo Creative Underlay</h2>
          <p className="text-sm text-gray-400 max-w-[200px] text-center mb-6">
            Click the "Menu" toggle in the top right to slide this interface and reveal the navigation links underneath.
          </p>
          <button 
            onClick={handleToggle}
            className="px-4 py-2 bg-[#f85931] hover:bg-[#e04f2a] text-white text-xs font-bold rounded-lg uppercase tracking-wider transition-colors cursor-pointer"
          >
            {isOpen ? "Close Menu" : "Open Menu"}
          </button>
        </div>
      </div>
    </div>
  );
}
