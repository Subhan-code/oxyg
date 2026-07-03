export const componentSources: Record<string, string> = {
  "wave-background": `"use client";

import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring, useAnimationFrame } from "motion/react";
import { cn } from "@/lib/utils";

export interface WaveBackgroundProps extends React.ComponentPropsWithoutRef<"div"> {
  /** Fill color of the SVG wave shape. @default "var(--foreground)" */
  fill?: string;
  /** Background color of the container behind the wave. @default "transparent" */
  background?: string;
  /** Whether the wave crest faces down or up. @default "down" */
  direction?: "down" | "up";
  /** "scroll" morphs the wave on scroll. "ambient" runs a continuous sine loop. @default "scroll" */
  variant?: "scroll" | "ambient";
  /** Height of the wave container in pixels. @default 120 */
  height?: number;
  /** Ambient mode only: speed multiplier for looping animation. @default 1 */
  speed?: number;
  /** Ambient mode only: peak-to-trough amplitude of the wave in pixels. @default 28 */
  amplitude?: number;
}

export function WaveBackground({
  fill = "var(--foreground)",
  background = "transparent",
  direction = "down",
  variant = "scroll",
  height = 120,
  speed = 1,
  amplitude = 28,
  className,
  style,
  ...props
}: WaveBackgroundProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [isInView, setIsInView] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  // Check prefers-reduced-motion
  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(mediaQuery.matches);
    const listener = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
    mediaQuery.addEventListener("change", listener);
    return () => mediaQuery.removeEventListener("change", listener);
  }, []);

  // IntersectionObserver for ambient mode performance
  useEffect(() => {
    if (variant !== "ambient" || !ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
      },
      { threshold: 0 }
    );
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [variant]);

  // Find scroll container for scroll mode
  useEffect(() => {
    if (variant !== "scroll" || !ref.current) return;
    let parent = ref.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        if (parent !== document.body && parent !== document.documentElement) {
          setScrollContainer(parent);
          break;
        }
      }
      parent = parent.parentElement;
    }
  }, [variant]);

  // Scroll mode logic
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start end", "end start"]
  });

  const smoothedProgress = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 28
  });

  // Flat and wavy paths for scroll variant
  const flatPath = direction === "down"
    ? \`M 0 0 C 360 0, 720 0, 1080 0, 1440 0 V \${height} H 0 Z\`
    : \`M 0 \${height} C 360 \${height}, 720 \${height}, 1080 \${height}, 1440 \${height} V 0 H 0 Z\`;

  const wavyPath = direction === "down"
    ? \`M 0 35 C 360 85, 720 10, 1080 105, 1440 25 V \${height} H 0 Z\`
    : \`M 0 85 C 360 15, 720 100, 1080 20, 1440 90 V 0 H 0 Z\`;

  const scrollPathTransform = useTransform(
    smoothedProgress,
    [0, 1],
    prefersReducedMotion ? [flatPath, flatPath] : [flatPath, wavyPath]
  );

  // Ambient mode logic
  const timeRef = useRef(0);
  useAnimationFrame((_, delta) => {
    if (variant !== "ambient" || prefersReducedMotion || !isInView || !pathRef.current) return;
    
    // speed multiplier: 1 = ~4s cycle
    timeRef.current += (delta / 1000) * speed * 1.5;
    const t = timeRef.current;
    
    const baseHeight = direction === "down" ? height / 3 : (2 * height) / 3;
    const fillHeight = direction === "down" ? height : 0;
    
    const y0 = baseHeight + Math.sin(t) * amplitude;
    const cp1 = baseHeight + Math.cos(t) * amplitude;
    const cp2 = baseHeight - Math.sin(t) * amplitude;
    const cp3 = baseHeight - Math.cos(t) * amplitude;
    const y4 = baseHeight + Math.sin(t) * amplitude;
    
    const pathStr = \`M 0 \${y0} C 360 \${cp1}, 720 \${cp2}, 1080 \${cp3}, 1440 \${y4} V \${fillHeight} H 0 Z\`;
    pathRef.current.setAttribute("d", pathStr);
  });

  const initialAmbientPath = prefersReducedMotion 
    ? (direction === "down" 
        ? \`M 0 35 C 360 85, 720 10, 1080 105, 1440 25 V \${height} H 0 Z\`
        : \`M 0 85 C 360 15, 720 100, 1080 20, 1440 90 V 0 H 0 Z\`
      )
    : (direction === "down"
        ? \`M 0 \${height / 3} C 360 \${height / 3}, 720 \${height / 3}, 1080 \${height / 3}, 1440 \${height / 3} V \${height} H 0 Z\`
        : \`M 0 \${(2 * height) / 3} C 360 \${(2 * height) / 3}, 720 \${(2 * height) / 3}, 1080 \${(2 * height) / 3}, 1440 \${(2 * height) / 3} V 0 H 0 Z\`
      );

  return (
    <div
      ref={ref}
      className={cn("w-full select-none overflow-hidden relative", className)}
      style={{
        height,
        backgroundColor: background,
        ...style
      }}
      {...props}
    >
      <svg
        viewBox={\`0 0 1440 \${height}\`}
        preserveAspectRatio="none"
        className="w-full h-full block"
      >
        {variant === "scroll" ? (
          <motion.path
            d={scrollPathTransform}
            fill={fill}
          />
        ) : (
          <path
            ref={pathRef}
            d={initialAmbientPath}
            fill={fill}
          />
        )}
      </svg>
    </div>
  );
}

export default WaveBackground;`,

  "horizontal-depth-fade": `"use client";

import { useEffect, useRef, useState, type RefObject } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger);

export interface HorizontalDepthFadeImage {
  src: string;
  alt?: string;
}

export interface HorizontalDepthFadeProps {
  /** Array of image sources to display in the strip. */
  images: HorizontalDepthFadeImage[];
  /** Horizontal travel amount in percent of the available strip overflow. @default 100 */
  travel?: number;
  /** Maximum blur amount (px) away from each image focus zone. @default 10 */
  blur?: number;
  /** Minimum brightness (%) away from each image focus zone. @default 20 */
  dim?: number;
  /** Extra brightness applied around the active focus zone. @default 45 */
  brightnessBoost?: number;
  /** Multiplier for out-of-focus darkening intensity. Values > 1 darken more aggressively. @default 1.35 */
  darknessStrength?: number;
  /** Minimum saturation (%) away from focus. Use \`0\` for full desaturation on edges. @default 0 */
  minSaturation?: number;
  /** Multiplier for desaturation intensity away from focus. Values > 1 desaturate faster. @default 1.35 */
  saturationStrength?: number;
  /** Focus zone width as normalized progress range. @default 0.16 */
  focusSpread?: number;
  /** Scale reduction amount away from focus. @default 0.09 */
  scaleEffect?: number;
  /** Scroll sensitivity multiplier. Lower values require longer scrolling. @default 0.6 */
  scrollSensitivity?: number;
  /** Gap between images. Accepts px number or CSS string. @default "1.5rem" */
  gap?: number | string;
  /** Image width in pixels. @default 360 */
  itemWidth?: number;
  /** Image height in pixels. @default 460 */
  itemHeight?: number;
  /** Height of the scroll section in viewport units. @default 280 */
  scrollLength?: number;
  /** Optional scrollable container element used as the animation scroller. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** Additional class name on the root element. */
  className?: string;
}

const DEFAULT_TRAVEL = 100;
const DEFAULT_BLUR = 10;
const DEFAULT_DIM = 20;
const DEFAULT_BRIGHTNESS_BOOST = 45;
const DEFAULT_DARKNESS_STRENGTH = 1.35;
const DEFAULT_MIN_SATURATION = 0;
const DEFAULT_SATURATION_STRENGTH = 1.35;
const DEFAULT_FOCUS_SPREAD = 0.16;
const DEFAULT_SCALE_EFFECT = 0.09;
const DEFAULT_SCROLL_SENSITIVITY = 0.6;
const DEFAULT_ITEM_WIDTH = 360;
const DEFAULT_ITEM_HEIGHT = 460;
const DEFAULT_SCROLL_LENGTH = 280;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function toCssLength(value: number | string | undefined, fallback: string) {
  if (typeof value === "number") return \`\${value}px\`;
  return value ?? fallback;
}

function computeFocusIntensity(
  progress: number,
  index: number,
  total: number,
  influence = 0.2,
) {
  if (total <= 1) return 0;
  const safeInfluence = clamp(influence, 0.04, 1);
  const center = index / (total - 1);
  return clamp(Math.abs(progress - center) / safeInfluence, 0, 1);
}

function applyScrollSensitivity(progress: number, sensitivity: number) {
  const safeSensitivity = clamp(sensitivity, 0.25, 1.6);
  const exponent = 1 / safeSensitivity;
  return Math.pow(clamp(progress, 0, 1), exponent);
}

function useStripMetrics(
  viewportRef: RefObject<HTMLDivElement | null>,
  trackRef: RefObject<HTMLDivElement | null>,
) {
  const [maxShift, setMaxShift] = useState(0);

  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;
    if (!viewport || !track) return;

    const update = () => {
      const overflow = Math.max(0, track.scrollWidth - viewport.clientWidth);
      setMaxShift(overflow);
    };

    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, [viewportRef, trackRef]);

  return maxShift;
}

export function HorizontalDepthFade({
  images,
  travel = DEFAULT_TRAVEL,
  blur = DEFAULT_BLUR,
  dim = DEFAULT_DIM,
  brightnessBoost = DEFAULT_BRIGHTNESS_BOOST,
  darknessStrength = DEFAULT_DARKNESS_STRENGTH,
  minSaturation = DEFAULT_MIN_SATURATION,
  saturationStrength = DEFAULT_SATURATION_STRENGTH,
  focusSpread = DEFAULT_FOCUS_SPREAD,
  scaleEffect = DEFAULT_SCALE_EFFECT,
  scrollSensitivity = DEFAULT_SCROLL_SENSITIVITY,
  gap = "1.5rem",
  itemWidth = DEFAULT_ITEM_WIDTH,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  scrollLength = DEFAULT_SCROLL_LENGTH,
  scrollContainerRef,
  className,
}: HorizontalDepthFadeProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  const boundedTravel = clamp(travel, 0, 100);
  const boundedBlur = clamp(blur, 0, 48);
  const boundedDim = clamp(dim, 0, 100);
  const boundedBrightnessBoost = clamp(brightnessBoost, 0, 120);
  const boundedDarknessStrength = clamp(darknessStrength, 0.2, 3);
  const boundedMinSaturation = clamp(minSaturation, 0, 100);
  const boundedSaturationStrength = clamp(saturationStrength, 0.2, 3);
  const boundedFocusSpread = clamp(focusSpread, 0.04, 1);
  const boundedScaleEffect = clamp(scaleEffect, 0, 0.25);
  const boundedScrollSensitivity = clamp(scrollSensitivity, 0.25, 1.6);
  const boundedScrollLength = clamp(scrollLength, 140, 600);
  const stripGap = toCssLength(gap, "1.5rem");

  const maxShift = useStripMetrics(viewportRef, trackRef);
  const effectiveShift = maxShift * (boundedTravel / 100);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const context = gsap.context(() => {
      const cards = Array.from(
        track.querySelectorAll<HTMLElement>(".hbs-item"),
      );

      const applyState = (rawProgress: number) => {
        const p = applyScrollSensitivity(rawProgress, boundedScrollSensitivity);

        gsap.set(track, {
          x: -effectiveShift * p,
        });

        cards.forEach((card, index) => {
          const intensity = computeFocusIntensity(
            p,
            index,
            cards.length,
            boundedFocusSpread,
          );
          const boostedIntensity = clamp(
            intensity * boundedDarknessStrength,
            0,
            1,
          );
          const currentBlur = boostedIntensity * boundedBlur;
          const peakBrightness = clamp(100 + boundedBrightnessBoost, 100, 220);
          const currentBrightness =
            boundedDim + (1 - boostedIntensity) * (peakBrightness - boundedDim);
          const boostedSaturationIntensity = clamp(
            intensity * boundedSaturationStrength,
            0,
            1,
          );
          const currentSaturation =
            boundedMinSaturation +
            (1 - boostedSaturationIntensity) * (100 - boundedMinSaturation);
          const currentScale = 1 - boostedIntensity * boundedScaleEffect;

          gsap.set(card, {
            filter: \`blur(\${currentBlur}px) brightness(\${currentBrightness}%) saturate(\${currentSaturation}%)\`,
            scale: currentScale,
          });
        });
      };

      applyState(0);

      ScrollTrigger.create({
        trigger: section,
        scroller: scrollContainerRef?.current ?? undefined,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          applyState(self.progress);
        },
      });
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [
    scrollContainerRef,
    images,
    effectiveShift,
    boundedBlur,
    boundedDim,
    boundedBrightnessBoost,
    boundedDarknessStrength,
    boundedMinSaturation,
    boundedSaturationStrength,
    boundedFocusSpread,
    boundedScaleEffect,
    boundedScrollSensitivity,
  ]);

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full", className)}
      style={{ height: \`\${boundedScrollLength}dvh\` }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
      >
        <div className="flex h-full w-full items-center">
          <div
            ref={trackRef}
            className="hbs-track flex w-max items-center px-[8vw]"
            style={{ gap: stripGap }}
          >
            {images.map((img, i) => (
              <figure
                key={i}
                className="hbs-item relative z-10 m-0 shrink-0 overflow-hidden rounded-xl"
                style={{ width: \`min(\${itemWidth}px, 75vw)\`, height: \`min(\${itemHeight}px, 55dvh)\` }}
              >
                <div
                  className="absolute inset-0 h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: \`url(\${img.src})\` }}
                  role="img"
                  aria-label={img.alt ?? \`Image \${i + 1}\`}
                />
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default HorizontalDepthFade;
`,

  "signature": `"use client";

import { useEffect, useId, useState } from "react";
import { motion } from "framer-motion";
import * as opentype from "opentype.js";
import { cn } from "@/lib/utils";

interface SignatureProps {
  /** Text to generate signature for */
  text?: string;
  /** Color of the signature path */
  color?: string;
  /** Font size of the signature */
  fontSize?: number;
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts in seconds */
  delay?: number;
  /** Additional CSS classes */
  className?: string;
  /** Only animate when in view */
  inView?: boolean;
  /** Only animate once */
  once?: boolean;
  /** Custom font URL to load */
  fontUrl?: string;
}

export function Signature({
  text = "Signature",
  color = "currentColor",
  fontSize = 32,
  duration = 1.5,
  delay = 0,
  className,
  inView = false,
  once = true,
  fontUrl,
}: SignatureProps) {
  const [paths, setPaths] = useState<string[]>([]);
  const [width, setWidth] = useState<number>(300);
  const height = fontSize * 3; // Give plenty of vertical space
  const horizontalPadding = fontSize * 0.1;
  const topMargin = fontSize * 1.5; // Shift down
  const baseline = topMargin;
  const maskId = \`signature-reveal-\${useId().replace(/:/g, "")}\`;

  useEffect(() => {
    async function load() {
      try {
        let font;
        const fontPaths = fontUrl 
          ? [fontUrl] 
          : [
              "/LastoriaBoldRegular.otf",
              "./LastoriaBoldRegular.otf",
              "https://www.componentry.fun/LastoriaBoldRegular.otf",
            ];

        for (const path of fontPaths) {
          try {
            const response = await fetch(path);
            if (!response.ok) continue;
            const arrayBuffer = await response.arrayBuffer();
            font = opentype.parse(arrayBuffer);
            break;
          } catch {
            // Try next path
          }
        }

        if (!font) {
          throw new Error("Font could not be loaded from any path");
        }

        let x = horizontalPadding;
        const newPaths: string[] = [];

        for (const char of text) {
          const glyph = font.charToGlyph(char);
          const path = glyph.getPath(x, baseline, fontSize);
          newPaths.push(path.toPathData(3));

          const advanceWidth = glyph.advanceWidth ?? font.unitsPerEm;
          x += advanceWidth * (fontSize / font.unitsPerEm);
        }

        setPaths(newPaths);
        setWidth(x + horizontalPadding);
      } catch (error) {
        console.error("Signature component font load error:", error);
        setPaths([]);
        setWidth(text.length * fontSize * 0.6);
      }
    }

    load();
  }, [text, fontSize, baseline, horizontalPadding, fontUrl]);

  const variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: { pathLength: 1, opacity: 1 },
  };

  return (
    <motion.svg
      key={paths.length}
      width={width}
      height={height}
      viewBox={\`0 0 \${width} \${height}\`}
      fill="none"
      className={cn("text-foreground overflow-visible", className)}
      initial="hidden"
      whileInView={inView ? "visible" : undefined}
      animate={inView ? undefined : "visible"}
      viewport={{ once }}
    >
      <defs>
        <mask id={maskId} maskUnits="userSpaceOnUse">
          {paths.map((d, i) => (
            <motion.path
              key={i}
              d={d}
              stroke="white"
              strokeWidth={fontSize * 0.22}
              fill="none"
              variants={variants}
              transition={{
                pathLength: {
                  delay: delay + i * 0.2,
                  duration,
                  ease: "easeInOut",
                },
                opacity: {
                  delay: delay + i * 0.2 + 0.01,
                  duration: 0.01,
                },
              }}
              vectorEffect="non-scaling-stroke"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          ))}
        </mask>
      </defs>

      {paths.map((d, i) => (
        <motion.path
          key={i}
          d={d}
          stroke={color}
          strokeWidth={2}
          fill="none"
          variants={variants}
          transition={{
            pathLength: {
              delay: delay + i * 0.2,
              duration,
              ease: "easeInOut",
            },
            opacity: {
              delay: delay + i * 0.2 + 0.01,
              duration: 0.01,
            },
          }}
          vectorEffect="non-scaling-stroke"
          strokeLinecap="butt"
          strokeLinejoin="round"
        />
      ))}

      <g mask={\`url(#\${maskId})\`}>
        {paths.map((d, i) => <path key={i} d={d} fill={color} />)}
      </g>
    </motion.svg>
  );
}

export default Signature;
`,

  "orbital-image-wheel": `"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type RefObject,
} from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { cn } from "@/lib/utils";
import { MotionSubtitle } from "@/components/oxygen-ui/motion-subtitle";

gsap.registerPlugin(ScrollTrigger);

export interface OrbitalImageWheelImage {
  src: string;
  alt?: string;
  label?: string;
  subtitle?: string;
}

export interface OrbitalImageWheelProps {
  /** Images displayed around the wheel. */
  images: OrbitalImageWheelImage[];
  /** Number of full wheel turns during the scroll range. @default 4 */
  turns?: number;
  /** Maximum blur amount (px) away from the focus zone. @default 4 */
  blur?: number;
  /** Minimum brightness (%) away from focus. @default 40 */
  dim?: number;
  /** Extra brightness boost (%) around the active card. @default 30 */
  brightnessBoost?: number;
  /** Multiplier for out-of-focus darkening intensity. @default 1.05 */
  darknessStrength?: number;
  /** Minimum saturation (%) away from focus. @default 55 */
  minSaturation?: number;
  /** Multiplier for out-of-focus desaturation intensity. @default 0.6 */
  saturationStrength?: number;
  /** Focus zone width as normalized angular range. @default 0.34 */
  focusSpread?: number;
  /** Scale reduction amount away from focus. @default 0.06 */
  scaleEffect?: number;
  /** Scroll sensitivity multiplier. Lower values require longer scrolling. @default 0.7 */
  scrollSensitivity?: number;
  /** Card width in pixels. @default 220 */
  itemWidth?: number;
  /** Card height in pixels. @default 300 */
  itemHeight?: number;
  /** Optional fixed wheel diameter in pixels. Defaults to a responsive value based on viewport width. */
  wheelSize?: number;
  /** How much of the wheel sits below the viewport (0..1). \`0.5\` keeps only the top half visible. @default 0.75 */
  cropRatio?: number;
  /** Scroll section height in viewport units. @default 330 */
  scrollLength?: number;
  /** Bottom offset of the caption block in viewport units. @default 8 */
  captionOffset?: number;
  /** Show or hide the centered caption. @default true */
  showCaption?: boolean;
  /** Subtitle animation direction. @default "top" */
  subtitleDirection?: "top" | "bottom";
  /** Subtitle animation speed multiplier. @default 1 */
  subtitleSpeed?: number;
  /** Delay between subtitle character reveals in seconds. @default 0.018 */
  subtitleStagger?: number;
  /** Optional scrollable container element used as the animation scroller. */
  scrollContainerRef?: RefObject<HTMLElement | null>;
  /** Additional class name on the root element. */
  className?: string;
}

const DEFAULT_TURNS = 4;
const DEFAULT_BLUR = 4;
const DEFAULT_DIM = 40;
const DEFAULT_BRIGHTNESS_BOOST = 30;
const DEFAULT_DARKNESS_STRENGTH = 1.05;
const DEFAULT_MIN_SATURATION = 55;
const DEFAULT_SATURATION_STRENGTH = 0.6;
const DEFAULT_FOCUS_SPREAD = 0.34;
const DEFAULT_SCALE_EFFECT = 0.06;
const DEFAULT_SCROLL_SENSITIVITY = 0.7;
const DEFAULT_ITEM_WIDTH = 220;
const DEFAULT_ITEM_HEIGHT = 300;
const DEFAULT_SCROLL_LENGTH = 330;
const DEFAULT_CROP_RATIO = 0.84;
const DEFAULT_CAPTION_OFFSET = 15;
const DEFAULT_SUBTITLE_DIRECTION = "top";
const DEFAULT_SUBTITLE_SPEED = 1;
const DEFAULT_SUBTITLE_STAGGER = 0.018;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function shortestAngleDistance(a: number, b: number) {
  const full = Math.PI * 2;
  const raw = ((a - b + Math.PI) % full) - Math.PI;
  const normalized = raw < -Math.PI ? raw + full : raw;
  return Math.abs(normalized);
}

function applyScrollSensitivity(progress: number, sensitivity: number) {
  const safeSensitivity = clamp(sensitivity, 0.25, 1.6);
  const exponent = 1 / safeSensitivity;
  return Math.pow(clamp(progress, 0, 1), exponent);
}

function getFocusedImageIndexWithHysteresis(
  progress: number,
  total: number,
  turns: number,
  currentIndex: number,
  hysteresis = 0.18,
) {
  if (total <= 0 || turns <= 0) return 0;

  const phaseRaw = total * (0.25 + progress * turns);
  const phase = ((phaseRaw % total) + total) % total;

  if (currentIndex < 0) {
    return Math.round(phase) % total;
  }

  let next = currentIndex;
  let delta = phase - next;

  if (delta > total / 2) delta -= total;
  if (delta < -total / 2) delta += total;

  const threshold = 0.5 + clamp(hysteresis, 0, 0.35);

  while (delta > threshold) {
    next = (next + 1) % total;
    delta -= 1;
  }

  while (delta < -threshold) {
    next = (next - 1 + total) % total;
    delta += 1;
  }

  return next;
}

function getSnapProgressForIndex(
  index: number,
  total: number,
  turns: number,
  currentProgress: number,
) {
  if (total <= 0 || turns <= 0) return clamp(currentProgress, 0, 1);

  const safeIndex = ((index % total) + total) % total;
  const minCycle = Math.floor(-turns - 2);
  const maxCycle = Math.ceil(turns + 2);
  let nearest = clamp(currentProgress, 0, 1);
  let minDistance = Number.POSITIVE_INFINITY;

  for (let cycle = minCycle; cycle <= maxCycle; cycle += 1) {
    const progress = (safeIndex / total - 0.25 - cycle) / turns;
    if (progress < 0 || progress > 1) continue;

    const distance = Math.abs(progress - currentProgress);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = progress;
    }
  }

  if (!Number.isFinite(minDistance)) {
    return clamp((safeIndex / total - 0.25) / turns, 0, 1);
  }

  return nearest;
}

function useViewportWidth(viewportRef: RefObject<HTMLDivElement | null>) {
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    const update = () => setWidth(viewport.clientWidth || 1200);
    update();

    const observer = new ResizeObserver(update);
    observer.observe(viewport);

    return () => observer.disconnect();
  }, [viewportRef]);

  return width;
}

export function OrbitalImageWheel({
  images,
  turns = DEFAULT_TURNS,
  blur = DEFAULT_BLUR,
  dim = DEFAULT_DIM,
  brightnessBoost = DEFAULT_BRIGHTNESS_BOOST,
  darknessStrength = DEFAULT_DARKNESS_STRENGTH,
  minSaturation = DEFAULT_MIN_SATURATION,
  saturationStrength = DEFAULT_SATURATION_STRENGTH,
  focusSpread = DEFAULT_FOCUS_SPREAD,
  scaleEffect = DEFAULT_SCALE_EFFECT,
  scrollSensitivity = DEFAULT_SCROLL_SENSITIVITY,
  itemWidth = DEFAULT_ITEM_WIDTH,
  itemHeight = DEFAULT_ITEM_HEIGHT,
  wheelSize,
  cropRatio = DEFAULT_CROP_RATIO,
  scrollLength = DEFAULT_SCROLL_LENGTH,
  captionOffset = DEFAULT_CAPTION_OFFSET,
  showCaption = true,
  subtitleDirection = DEFAULT_SUBTITLE_DIRECTION,
  subtitleSpeed = DEFAULT_SUBTITLE_SPEED,
  subtitleStagger = DEFAULT_SUBTITLE_STAGGER,
  scrollContainerRef,
  className,
}: OrbitalImageWheelProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const viewportRef = useRef<HTMLDivElement>(null);
  const wheelRef = useRef<HTMLDivElement>(null);
  const wheelScrollTriggerRef = useRef<ScrollTrigger | null>(null);
  const titleClickTweenRef = useRef<gsap.core.Tween | null>(null);
  const titleViewportRef = useRef<HTMLDivElement>(null);
  const titleTrackRef = useRef<HTMLDivElement>(null);
  const titleStartSpacerRef = useRef<HTMLSpanElement>(null);
  const titleEndSpacerRef = useRef<HTMLSpanElement>(null);
  const titleTrackXToRef = useRef<((value: number) => void) | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const viewportWidth = useViewportWidth(viewportRef);

  const boundedTurns = clamp(turns, 0.2, 4);
  const boundedBlur = clamp(blur, 0, 36);
  const boundedDim = clamp(dim, 0, 100);
  const boundedBrightnessBoost = clamp(brightnessBoost, 0, 120);
  const boundedDarknessStrength = clamp(darknessStrength, 0.2, 3);
  const boundedMinSaturation = clamp(minSaturation, 0, 100);
  const boundedSaturationStrength = clamp(saturationStrength, 0.2, 3);
  const boundedFocusSpread = clamp(focusSpread, 0.08, 0.8);
  const boundedScaleEffect = clamp(scaleEffect, 0, 0.3);
  const boundedScrollSensitivity = clamp(scrollSensitivity, 0.25, 1.6);
  const boundedItemWidth = clamp(itemWidth, 140, 520);
  const boundedItemHeight = clamp(itemHeight, 180, 620);
  const boundedCropRatio = clamp(cropRatio, 0.2, 0.92);
  const boundedScrollLength = clamp(scrollLength, 180, 700);
  const boundedCaptionOffset = clamp(captionOffset, 2, 22);
  const boundedSubtitleSpeed = clamp(subtitleSpeed, 0.3, 3);
  const boundedSubtitleStagger = clamp(subtitleStagger, 0, 0.08);
  const boundedSubtitleDirection =
    subtitleDirection === "bottom" ? "bottom" : "top";

  const responsiveWheelSize = clamp(viewportWidth * 2.2, 1200, 2800);
  const boundedWheelSize = clamp(wheelSize ?? responsiveWheelSize, 700, 3200);
  const radius = boundedWheelSize / 2;
  const titleLabels = useMemo(
    () => images.map((img, i) => img.label ?? img.alt ?? \`Image \${i + 1}\`),
    [images],
  );
  const titleTrackLabels = useMemo(() => titleLabels, [titleLabels]);
  const activeTitleTrackIndex = Math.max(
    0,
    Math.min(activeIndex, titleTrackLabels.length - 1),
  );

  const handleTitleClick = useCallback(
    (index: number) => {
      const trigger = wheelScrollTriggerRef.current;
      if (!trigger || images.length === 0) return;

      const currentProgress = clamp(trigger.progress, 0, 1);
      const targetProgress = getSnapProgressForIndex(
        index,
        images.length,
        boundedTurns,
        currentProgress,
      );

      const scrollStart = trigger.start;
      const scrollEnd = trigger.end;
      const scrollRange = scrollEnd - scrollStart;
      if (scrollRange <= 0) return;

      const fromScroll = scrollStart + currentProgress * scrollRange;
      const toScroll = scrollStart + targetProgress * scrollRange;

      setActiveIndex(index);
      titleClickTweenRef.current?.kill();

      const proxy = { scroll: fromScroll };
      titleClickTweenRef.current = gsap.to(proxy, {
        scroll: toScroll,
        duration: 0.58,
        ease: "power3.out",
        overwrite: true,
        onUpdate: () => {
          trigger.scroll(proxy.scroll);
        },
        onComplete: () => {
          setActiveIndex(index);
        },
      });
    },
    [images.length, boundedTurns],
  );

  useEffect(() => {
    const section = sectionRef.current;
    const wheel = wheelRef.current;
    if (!section || !wheel || images.length === 0) return;

    let previousActive = -1;

    const context = gsap.context(() => {
      const cards = Array.from(
        wheel.querySelectorAll<HTMLElement>(".oiw-item"),
      );
      if (cards.length === 0) return;

      const topAnchor = -Math.PI / 2;
      const focusArc = Math.PI * boundedFocusSpread;

      const applyState = (rawProgress: number) => {
        const p = applyScrollSensitivity(rawProgress, boundedScrollSensitivity);
        const rotation = -p * boundedTurns * Math.PI * 2;
        const focusedIndex = getFocusedImageIndexWithHysteresis(
          p,
          cards.length,
          boundedTurns,
          previousActive,
        );

        cards.forEach((card, index) => {
          const base = (index / cards.length) * Math.PI * 2 - Math.PI;
          const theta = base + rotation;
          const x = Math.cos(theta) * radius;
          const y = Math.sin(theta) * radius;

          const distanceToFocus = shortestAngleDistance(theta, topAnchor);
          const focusIntensity = clamp(distanceToFocus / focusArc, 0, 1);

          const darkIntensity = clamp(
            focusIntensity * boundedDarknessStrength,
            0,
            1,
          );
          const saturationIntensity = clamp(
            focusIntensity * boundedSaturationStrength,
            0,
            1,
          );

          const currentBlur = darkIntensity * boundedBlur;
          const peakBrightness = clamp(100 + boundedBrightnessBoost, 100, 220);
          const currentBrightness =
            boundedDim + (1 - darkIntensity) * (peakBrightness - boundedDim);
          const currentSaturation =
            boundedMinSaturation +
            (1 - saturationIntensity) * (100 - boundedMinSaturation);
          const currentScale = 1 - darkIntensity * boundedScaleEffect;
          const drift = clamp(x / radius, -1, 1);
          const tilt = drift * 8;
          const depth = clamp((1 - focusIntensity) * 100, 0, 100);

          gsap.set(card, {
            x,
            y,
            xPercent: -50,
            yPercent: -50,
            z: depth,
            rotate: tilt,
            scale: currentScale,
            filter: \`blur(\${currentBlur}px) brightness(\${currentBrightness}%) saturate(\${currentSaturation}%)\`,
            zIndex: Math.round(depth),
          });
        });

        if (focusedIndex !== previousActive) {
          previousActive = focusedIndex;
          setActiveIndex(focusedIndex);
        }
      };

      applyState(0);

      const trigger = ScrollTrigger.create({
        trigger: section,
        scroller: scrollContainerRef?.current ?? undefined,
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        onUpdate: (self) => {
          applyState(self.progress);
        },
      });

      wheelScrollTriggerRef.current = trigger;
    }, sectionRef);

    ScrollTrigger.refresh();

    return () => context.revert();
  }, [
    scrollContainerRef,
    images,
    radius,
    boundedTurns,
    boundedBlur,
    boundedDim,
    boundedBrightnessBoost,
    boundedDarknessStrength,
    boundedMinSaturation,
    boundedSaturationStrength,
    boundedFocusSpread,
    boundedScaleEffect,
    boundedScrollSensitivity,
  ]);

  useEffect(() => {
    return () => {
      titleClickTweenRef.current?.kill();
      wheelScrollTriggerRef.current = null;
    };
  }, []);

  useLayoutEffect(() => {
    const viewport = titleViewportRef.current;
    const track = titleTrackRef.current;
    const startSpacer = titleStartSpacerRef.current;
    const endSpacer = titleEndSpacerRef.current;
    if (!viewport || !track || titleTrackLabels.length === 0) return;

    if (!titleTrackXToRef.current) {
      titleTrackXToRef.current = gsap.quickTo(track, "x", {
        duration: 0.62,
        ease: "power4.out",
        overwrite: true,
      });
    }

    const firstTitle = track.querySelector<HTMLElement>(
      \`[data-title-index="0"]\`,
    );
    const lastTitle = track.querySelector<HTMLElement>(
      \`[data-title-index="\${titleTrackLabels.length - 1}"]\`,
    );

    const activeTitle = track.querySelector<HTMLElement>(
      \`[data-title-index="\${activeTitleTrackIndex}"]\`,
    );
    if (!activeTitle || !firstTitle || !lastTitle) return;

    const viewportWidthPx = viewport.clientWidth;

    // Add edge spacers so the first and last pills can be centered.
    const startPad = Math.max(
      0,
      viewportWidthPx / 2 - firstTitle.offsetWidth / 2,
    );
    const endPad = Math.max(0, viewportWidthPx / 2 - lastTitle.offsetWidth / 2);

    if (startSpacer) {
      startSpacer.style.width = \`\${Math.round(startPad)}px\`;
    }

    if (endSpacer) {
      endSpacer.style.width = \`\${Math.round(endPad)}px\`;
    }

    const activeCenter = activeTitle.offsetLeft + activeTitle.offsetWidth / 2;

    let targetX = Math.round(viewportWidthPx / 2 - activeCenter);

    if (track.scrollWidth <= viewportWidthPx) {
      targetX = Math.round((viewportWidthPx - track.scrollWidth) / 2);
    } else {
      const minX = viewportWidthPx - track.scrollWidth;
      targetX = Math.round(clamp(targetX, minX, 0));
    }

    titleTrackXToRef.current(targetX);
  }, [activeTitleTrackIndex, titleTrackLabels, viewportWidth]);

  const activeImage = useMemo(() => {
    if (images.length === 0) return null;
    return images[activeIndex] ?? images[0];
  }, [images, activeIndex]);

  if (images.length === 0) {
    return null;
  }

  return (
    <section
      ref={sectionRef}
      className={cn("relative w-full", className)}
      style={{ height: \`\${boundedScrollLength}dvh\` }}
    >
      <div
        ref={viewportRef}
        className="sticky top-0 h-[100dvh] w-full overflow-hidden"
      >
        <div
          ref={wheelRef}
          className="absolute left-1/2 -translate-x-1/2"
          style={{
            width: boundedWheelSize,
            height: boundedWheelSize,
            bottom: \`-\${boundedWheelSize * boundedCropRatio}px\`,
          }}
        >
          <div
            className="relative h-full w-full"
            style={{ perspective: "1200px" }}
          >
            {images.map((img, i) => (
              <figure
                key={i}
                className="oiw-item absolute left-1/2 top-1/2 m-0 overflow-hidden rounded-xl"
                style={{ width: \`min(\${boundedItemWidth}px, 65vw)\`, height: \`min(\${boundedItemHeight}px, 45dvh)\` }}
              >
                <div
                  className="absolute inset-0 h-full w-full bg-cover bg-center"
                  style={{ backgroundImage: \`url(\${img.src})\` }}
                  role="img"
                  aria-label={img.alt ?? img.label ?? \`Image \${i + 1}\`}
                />
              </figure>
            ))}
          </div>
        </div>

        {showCaption && activeImage && (
          <div
            className="pointer-events-none absolute inset-x-0 z-30 flex justify-center"
            style={{ bottom: \`\${boundedCaptionOffset}dvh\` }}
          >
            <div className="px-6 text-center">
              <MotionSubtitle
                text={activeImage.subtitle ?? activeImage.alt ?? "Visual Story"}
                direction={boundedSubtitleDirection}
                speed={boundedSubtitleSpeed}
                stagger={boundedSubtitleStagger}
                className="mb-2 text-[clamp(0.8rem,1vw,0.95rem)] tracking-[0.04em] text-foreground/45"
              />

              <div
                ref={titleViewportRef}
                className="pointer-events-auto mx-auto w-[min(92vw,760px)] overflow-hidden py-1"
                style={{
                  WebkitMaskImage:
                    "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
                  maskImage:
                    "linear-gradient(to right, transparent 0%, black 14%, black 86%, transparent 100%)",
                }}
              >
                <div ref={titleTrackRef} className="flex w-max items-center">
                  <span
                    ref={titleStartSpacerRef}
                    aria-hidden
                    className="block h-px shrink-0"
                  />

                  {titleTrackLabels.map((title, i) => (
                    <button
                      type="button"
                      key={\`\${title}-\${i}\`}
                      data-title-index={i}
                      onClick={() => handleTitleClick(i)}
                      aria-current={
                        i === activeTitleTrackIndex ? "true" : undefined
                      }
                      style={{
                        opacity:
                          Math.abs(i - activeTitleTrackIndex) === 0
                            ? 1
                            : Math.abs(i - activeTitleTrackIndex) === 1
                              ? 0.58
                              : Math.abs(i - activeTitleTrackIndex) === 2
                                ? 0.32
                                : 0.16,
                        transform:
                          Math.abs(i - activeTitleTrackIndex) === 0
                            ? "scale(1)"
                            : "scale(0.96)",
                      }}
                      className={cn(
                        "oiw-title-item mr-3 inline-flex shrink-0 cursor-pointer appearance-none items-center justify-center whitespace-nowrap rounded-full border border-foreground/35 px-7 py-2 text-center leading-none text-[clamp(1.05rem,2.25vw,2rem)] font-medium tracking-tight transition-[opacity,transform,color,border-color] duration-300",
                        i === activeTitleTrackIndex
                          ? "border-foreground/40 text-foreground"
                          : "border-foreground/28 text-foreground/45",
                      )}
                    >
                      {title}
                    </button>
                  ))}

                  <span
                    ref={titleEndSpacerRef}
                    aria-hidden
                    className="block h-px shrink-0"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default OrbitalImageWheel;
`,

  "motion-subtitle": `"use client";

import { AnimatePresence, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface MotionSubtitleProps {
  text: string;
  className?: string;
  direction?: "top" | "bottom";
  speed?: number;
  stagger?: number;
}

export function MotionSubtitle({
  text,
  className,
  direction = "top",
  speed = 1,
  stagger = 0.018,
}: MotionSubtitleProps) {
  const chars = Array.from(text);
  const safeSpeed = Math.min(3, Math.max(0.3, speed));
  const speedFactor = 1 / safeSpeed;
  const safeStagger = Math.min(0.08, Math.max(0, stagger));
  const directionY = direction === "bottom" ? 10 : -10;
  const exitY = direction === "bottom" ? -3 : 3;

  return (
    <span
      className={cn(
        "inline-flex min-h-[1.3em] items-center justify-center",
        className,
      )}
      aria-live="polite"
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={text}
          className="inline-flex whitespace-nowrap"
          initial={{ opacity: 0, y: directionY * 0.8, filter: "blur(5px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          exit={{ opacity: 0, y: exitY, filter: "blur(4px)" }}
          transition={{ duration: 0.28 * speedFactor, ease: "easeOut" }}
        >
          {chars.map((char, index) => (
            <motion.span
              key={\`\${text}-\${index}\`}
              className="inline-block"
              initial={{ opacity: 0, y: directionY, filter: "blur(6px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: exitY, filter: "blur(4px)" }}
              transition={{
                duration: 0.24 * speedFactor,
                ease: "easeOut",
                delay: index * safeStagger * speedFactor,
              }}
            >
              {char === " " ? "\u00A0" : char}
            </motion.span>
          ))}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

export default MotionSubtitle;`,

  "expandable-tabs": `"use client";

import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Home, Bell, SlidersHorizontal, BookOpen, Shield, User, ArrowUpCircle, Folder, LogOut, ChevronRight } from 'lucide-react';
import { cn } from '../lib/utils';

function useMeasure() {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ height: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setBounds({ height: entry.contentRect.height });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, bounds] as const;
}

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: Home, filled: true },
  { id: 'notifications', label: 'Notifications', icon: Bell, filled: true },
  { id: 'settings', label: 'Settings', icon: SlidersHorizontal, filled: false },
  { id: 'docs', label: 'Docs', icon: BookOpen, filled: true },
  { id: 'security', label: 'Security', icon: Shield, filled: true },
];

export function ExpandableTabs() {
  const [activeTab, setActiveTab] = useState<string | null>(null);
  const [previousTab, setPreviousTab] = useState<string | null>(null);
  const [hoveredTab, setHoveredTab] = useState<string | null>(null);

  const activeIndex = activeTab ? TABS.findIndex((t) => t.id === activeTab) : -1;
  const previousIndex = previousTab ? TABS.findIndex((t) => t.id === previousTab) : -1;
  const direction = activeIndex > previousIndex ? 1 : -1;

  const [ref, bounds] = useMeasure();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveTab(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleTabClick = (id: string) => {
    if (id === activeTab) {
      setPreviousTab(activeTab);
      setActiveTab(null); // Toggle off
    } else {
      setPreviousTab(activeTab);
      setActiveTab(id);
    }
  };

  const renderContent = (id: string) => {
    switch (id) {
      case 'dashboard':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            <MenuItem icon={User} label="profile" />
            <MenuItem icon={ArrowUpCircle} label="upgrade" />
            <MenuItem icon={Folder} label="projects" />
            <MenuItem icon={BookOpen} label="documentation" />
            <MenuItem icon={LogOut} label="logout" />
          </div>
        );
      case 'notifications':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            {[1, 2, 3, 4, 5, 6].map(i => (
              <div key={i} className="flex items-center justify-between">
                <span className="font-medium text-neutral-100">Notification {i}</span>
                <div className="flex items-center gap-3 text-neutral-500 text-sm">
                  <span>{i * 4 - 2} sec ago</span>
                  <div className="w-2 h-2 rounded-full bg-sky-550" />
                </div>
              </div>
            ))}
          </div>
        );
      case 'settings':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            <MenuItem icon={SlidersHorizontal} label="general settings" />
            <MenuItem icon={User} label="account details" />
            <MenuItem icon={Shield} label="privacy & security" />
            <MenuItem icon={Bell} label="alert preferences" />
          </div>
        );
      case 'docs':
        return (
          <div className="flex flex-col gap-5 p-4 pb-6">
            <MenuItem icon={BookOpen} label="getting started" />
            <MenuItem icon={ArrowUpCircle} label="installation guide" />
            <MenuItem icon={Folder} label="component options" />
            <MenuItem icon={SlidersHorizontal} label="customization" />
          </div>
        );
      case 'security':
        return (
          <div className="flex flex-col gap-8 p-4 pb-6">
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-neutral-400 text-sm font-medium">API</span>
                <span className="text-sky-500 text-sm font-medium">operational</span>
              </div>
              <div className="flex gap-1.5 justify-between">
                {Array.from({length: 28}).map((_, i) => (
                  <div key={i} className={cn("h-8 w-1.5 rounded-full", i < 24 ? 'bg-sky-500' : 'bg-neutral-800')} />
                ))}
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-neutral-400 text-sm font-medium">Build and Deploy</span>
                <span className="text-red-500 text-sm font-medium">system failure</span>
              </div>
              <div className="flex gap-1.5 justify-between">
                {Array.from({length: 28}).map((_, i) => (
                  <div key={i} className={cn("h-8 w-1.5 rounded-full", i < 12 ? 'bg-red-500' : 'bg-neutral-800')} />
                ))}
              </div>
            </div>
          </div>
        );
      default:
        return (
          <div className="flex flex-col gap-4 p-4 pb-6">
            <p className="text-neutral-400">Content for {id} is not implemented yet.</p>
          </div>
        );
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-[#0a0a0a] p-4 font-sans text-neutral-200">
      <div className="w-full max-w-[340px] relative" ref={containerRef}>
        <div className="bg-[#111111] rounded-[2rem] p-2 flex flex-col shadow-2xl">
          {/* Content Area */}
          <motion.div
            animate={{ height: activeTab ? bounds.height : 0 }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
            className="overflow-hidden"
          >
            <div ref={ref} className="relative">
              <AnimatePresence mode="popLayout" custom={direction} initial={false}>
                {activeTab && (
                  <motion.div
                    key={activeTab}
                    custom={direction}
                    variants={{
                      initial: (dir: number) => ({
                        x: 20 * dir,
                        opacity: 0,
                        filter: "blur(4px)",
                      }),
                      animate: {
                        x: 0,
                        opacity: 1,
                        filter: "blur(0px)",
                      },
                      exit: (dir: number) => ({
                        x: -20 * dir,
                        opacity: 0,
                        filter: "blur(4px)",
                      }),
                    }}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={{ type: "spring", bounce: 0, duration: 0.5 }}
                    className="w-full"
                  >
                    {renderContent(activeTab)}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tabs Navigation */}
          <div className="flex items-center justify-between px-2 py-2">
            {TABS.map((tab) => {
              const isActive = activeTab === tab.id;
              const Icon = tab.icon;
              const showLabel = hoveredTab !== null ? (hoveredTab === tab.id) : isActive;

              return (
                <button
                  key={tab.id}
                  onClick={() => handleTabClick(tab.id)}
                  onMouseEnter={() => setHoveredTab(tab.id)}
                  onMouseLeave={() => setHoveredTab(null)}
                  className={cn(
                    "relative flex items-center justify-center h-10 px-3 rounded-full transition-colors duration-200 outline-none",
                    showLabel ? "text-white" : "text-neutral-500 hover:text-neutral-300"
                  )}
                  style={{
                    WebkitTapHighlightColor: "transparent",
                  }}
                >
                  {showLabel && (
                    <motion.div
                      layoutId="active-bg"
                      className="absolute inset-0 bg-[#222222] rounded-full"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    />
                  )}

                  <div className="relative flex items-center justify-center z-10 gap-2">
                    <Icon className="w-5 h-5 shrink-0" fill={tab.filled ? "currentColor" : "none"} />
                    <AnimatePresence initial={false}>
                      {showLabel && (
                        <motion.span
                          initial={{ width: 0, opacity: 0 }}
                          animate={{ width: "auto", opacity: 1 }}
                          exit={{ width: 0, opacity: 0 }}
                          transition={{ duration: 0.2, ease: "easeInOut" }}
                          className="text-sm font-medium whitespace-nowrap overflow-hidden"
                        >
                          {tab.label}
                        </motion.span>
                      )}
                    </AnimatePresence>
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const MenuItem = ({ icon: Icon, label }: { icon: any, label: string }) => (
  <div className="flex items-center justify-between cursor-pointer group">
    <div className="flex items-center gap-3 text-neutral-200 group-hover:text-white transition-colors">
      <Icon className="w-5 h-5" />
      <span className="font-medium capitalize">{label}</span>
    </div>
    <ChevronRight className="w-4 h-4 text-neutral-600 group-hover:text-neutral-400 transition-colors" />
  </div>
);`,

  "slot-text": `"use client";

import React, { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

// Types
export interface SlotOptions {
  /** "down" rolls glyphs downward (enter from top); "up" rolls upward. */
  direction?: "up" | "down";
  /** Per-character stagger in ms (default 45). */
  stagger?: number;
  /** Slide duration per character in ms (default 300). */
  duration?: number;
  /** How long the incoming glyph trails the outgoing one, in ms (default 50). */
  exitOffset?: number;
  /** Easing — defaults to a springy, overshooting "back" curve. */
  easing?: string;
  /**
   * Per-letter personality: 0 = every glyph lands identically, 1 = lots of
   * individual variation in speed and a little tilt-wobble as each settles.
   * Default 0.6.
   */
  bounce?: number;
  /**
   * Chromatic flash: each incoming glyph rolls in tinted, then fades to its
   * resting color once it lands. Pass a single CSS color for a flat tint, or a
   * function \`(index, total) => color\` to give every glyph its own hue. That's
   * what produces the spectrum/rainbow sweep across the line. Omit for no flash.
   */
  color?: string | ((index: number, total: number) => string);
  /** How long the chromatic tint takes to fade back to rest, in ms (default 280). */
  colorFade?: number;
  /**
   * Keep characters that are identical at the same index static. Ideal for
   * short aligned labels (Copy to Copied). Turn off when the shared parts of the
   * two strings are misaligned (different lengths) so the whole line rolls
   * uniformly instead of leaving stray letters frozen.
   */
  skipUnchanged?: boolean;
  /**
   * true (default): a new call interrupts any roll in flight, snapping it to
   * its target before starting fresh. false: the current roll finishes and the
   * latest call made mid-roll plays after it lands; calls targeting the text
   * already displayed are dropped. Ideal for spam-prone triggers like buttons.
   */
  interrupt?: boolean;
}

export interface ChromaticOptions {
  from?: number;
  spread?: number;
  saturation?: number;
  lightness?: number;
}

export interface SlotTextProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  text: string;
  options?: SlotOptions;
}

// Inject styles on client side
const STYLE_ID = "slot-text-injected-styles";
if (typeof document !== "undefined" && !document.getElementById(STYLE_ID)) {
  const style = document.createElement("style");
  style.id = STYLE_ID;
  style.textContent = \`
    .slot-text {
      display: inline-flex;
      white-space: pre;
    }
    .char-slot {
      position: relative;
      display: inline-flex;
      flex: none;
      justify-content: center;
      overflow: hidden;
      overflow-x: visible;
      overflow-y: clip;
      line-height: 1.3;
      vertical-align: bottom;
    }
    .char-slot.is-resizing {
      overflow-x: clip;
    }
    .char-sizer {
      visibility: hidden;
      white-space: pre;
    }
    .char-face {
      position: absolute;
      inset: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      white-space: pre;
      will-change: transform;
    }
  \`;
  document.head.appendChild(style);
}

const DEFAULTS: Required<Omit<SlotOptions, "color">> = {
  direction: "down",
  stagger: 45,
  duration: 300,
  exitOffset: 50,
  easing: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  bounce: 0.6,
  colorFade: 280,
  skipUnchanged: true,
  interrupt: true,
};

const NBSP = "\\\\u00A0";
const glyph = (char: string) => (char === " " ? NBSP : char);

export function chromatic({
  from = 0,
  spread = 320,
  saturation = 92,
  lightness = 60,
}: ChromaticOptions = {}) {
  return (index: number, total: number) => {
    const t = total <= 1 ? 0 : index / (total - 1);
    return \`hsl(\\\${(from + t * spread) % 360} \\\${saturation}% \\\${lightness}%)\`;
  };
}

interface SlotState {
  timers: number[];
  target: string;
  pending?: { text: string; options?: SlotOptions };
}

const states = new WeakMap<HTMLElement, SlotState>();

function settle(container: HTMLElement) {
  const state = states.get(container);
  if (!state) return;
  state.timers.forEach((t) => window.clearTimeout(t));
  states.delete(container);
  buildSlotText(container, state.target);
}

function makeFace(char: string) {
  const face = document.createElement("span");
  face.className = "char-face";
  face.textContent = glyph(char);
  return face;
}

function buildSlot(char: string) {
  const slot = document.createElement("span");
  slot.className = "char-slot";
  slot.dataset.char = char;

  const sizer = document.createElement("span");
  sizer.className = "char-sizer";
  sizer.textContent = glyph(char);

  slot.append(sizer, makeFace(char));
  return slot;
}

export function buildSlotText(container: HTMLElement, text: string) {
  container.classList.add("slot-text");
  container.replaceChildren(...Array.from(text, buildSlot));
}

export function animateSlotText(container: HTMLElement, toText: string, options: SlotOptions = {}) {
  const {
    direction,
    stagger,
    duration,
    exitOffset,
    easing,
    bounce,
    color,
    colorFade,
    skipUnchanged,
    interrupt,
  } = {
    ...DEFAULTS,
    ...options,
  };

  const running = states.get(container);
  if (running && !interrupt) {
    if (toText !== running.target) {
      running.pending = { text: toText, options };
    }
    return;
  }

  settle(container);

  if (!container.querySelector(".char-slot")) {
    buildSlotText(container, toText);
    return;
  }

  const slots = Array.from(container.querySelectorAll(".char-slot")) as HTMLElement[];
  const fromText = slots.map((s) => s.dataset.char ?? "").join("");

  if (!interrupt && fromText === toText) return;

  const maxLen = Math.max(fromText.length, toText.length);
  const sample = slots.find((s) => (s.dataset.char ?? "") !== "") ?? slots[0];
  const cs = getComputedStyle(container);

  const H = Math.ceil(
    sample?.getBoundingClientRect().height ||
    sample?.offsetHeight ||
    container.getBoundingClientRect().height ||
    parseFloat(cs.lineHeight) ||
    0
  ) || Math.ceil(parseFloat(cs.fontSize) * 1.3) || 18;

  const restColor = color ? cs.color : "";

  for (let i = slots.length; i < maxLen; i++) {
    const slot = buildSlot("");
    container.appendChild(slot);
    slots.push(slot);
  }

  const timers: number[] = [];
  const state: SlotState = { timers, target: toText };
  states.set(container, state);

  const outY = direction === "down" ? H : -H;
  const inStart = direction === "down" ? -H : H;

  const wobble = (i: number, salt: number) => {
    const n = Math.sin((i + 1) * 12.9898 + salt * 78.233) * 43758.5453;
    return (n - Math.floor(n)) * 2 - 1;
  };

  let maxEnd = 0;

  for (let i = 0; i < maxLen; i++) {
    const fromChar = fromText[i] || "";
    const toChar = toText[i] || "";
    if (fromChar === toChar && (skipUnchanged || fromChar === "")) continue;

    const slot = slots[i];
    const sizer = slot.querySelector(".char-sizer") as HTMLElement;
    const oldFace = slot.querySelector(".char-face") as HTMLElement;

    const oldW = slot.getBoundingClientRect().width;
    if (sizer) {
      sizer.textContent = glyph(toChar);
    }
    const newW = sizer?.getBoundingClientRect().width || 0;
    const widthChanges = Math.abs(newW - oldW) > 0.5;

    if (widthChanges) {
      slot.style.width = \`\${oldW}px\`;
    }

    if (fromChar === "" || toChar === "") {
      slot.classList.add("is-resizing");
    }

    const tint = typeof color === "function" ? color(i, maxLen) : color;
    const isTail = toChar === "";
    const d = Math.round(duration * (isTail ? 0.75 : 1) * (1 + bounce * 0.45 * wobble(i, 1)));
    const staggerIndex = isTail
      ? toText.length * 0.5 + (i - toText.length) * 0.25
      : i;
    const base = Math.round(staggerIndex * stagger * (1 + bounce * 0.25 * wobble(i, 2)));
    const tilt = (bounce * 5 * wobble(i, 3)).toFixed(2);
    const rollTrans = \`transform \${d}ms \${easing}\`;
    const trans = color
      ? \`\${rollTrans}, color \${colorFade}ms linear \${d}ms\`
      : rollTrans;

    const newFace = makeFace(toChar);
    newFace.style.transformOrigin = "50% 50%";
    newFace.style.transform = \`translateY(\${inStart}px) rotate(\${tilt}deg)\`;
    if (tint) {
      newFace.style.color = tint;
    }
    slot.appendChild(newFace);

    // trigger reflow
    void slot.offsetWidth;

    if (widthChanges) {
      let wDelay = base;
      let wDur = d;
      if (isTail) {
        wDelay = base + Math.round(d * 0.55);
        wDur = Math.max(140, Math.round(d * 0.6));
      } else if (fromChar === "") {
        wDur = Math.max(140, Math.round(d * 0.45));
      }
      timers.push(
        window.setTimeout(() => {
          slot.style.transition = \`width \${wDur}ms cubic-bezier(0.2, 0, 0, 1)\`;
          slot.style.width = \`\${newW}px\`;
        }, wDelay)
      );
      maxEnd = Math.max(maxEnd, wDelay + wDur);
    }

    maxEnd = Math.max(maxEnd, base + exitOffset + d + (color ? colorFade : 0));

    if (oldFace) {
      timers.push(
        window.setTimeout(() => {
          oldFace.style.transition = rollTrans;
          oldFace.style.transform = \`translateY(\${outY}px) rotate(-\${Number(tilt)}deg)\`;
        }, base)
      );
    }

    timers.push(
      window.setTimeout(() => {
        newFace.style.transition = trans;
        newFace.style.transform = "translateY(0) rotate(0deg)";
        if (color) {
          newFace.style.color = restColor;
        }

        const done = (e: TransitionEvent) => {
          if (e.propertyName !== "transform") return;
          newFace.removeEventListener("transitionend", done);
          slot.dataset.char = toChar;
          slot.style.removeProperty("transition");
          slot.style.removeProperty("width");
          slot.classList.remove("is-resizing");
          slot.querySelectorAll(".char-face").forEach((f) => {
            if (f !== newFace) f.remove();
          });
        };
        newFace.addEventListener("transitionend", done);
      }, base + exitOffset)
    );
  }

  const total = maxEnd + 80;
  timers.push(
    window.setTimeout(() => {
      const pending = state.pending;
      states.delete(container);
      buildSlotText(container, toText);
      if (pending) {
        animateSlotText(container, pending.text, pending.options);
      }
    }, total)
  );
}

export function clearSlotText(container: HTMLElement, text = "") {
  settle(container);
  container.classList.remove("slot-text");
  container.textContent = text;
}

export const SlotText = forwardRef<HTMLSpanElement, SlotTextProps>(
  ({ text, options, "aria-label": ariaLabel, ...props }, forwardedRef) => {
    const elementRef = useRef<HTMLSpanElement>(null);
    const mountedRef = useRef(false);
    const firstTextEffectRef = useRef(true);
    const optionsRef = useRef(options);

    useImperativeHandle(forwardedRef, () => elementRef.current as HTMLSpanElement, []);

    useEffect(() => {
      optionsRef.current = options;
    }, [options]);

    useEffect(() => {
      const element = elementRef.current;
      if (!element) return;
      buildSlotText(element, text);
      mountedRef.current = true;
      return () => {
        clearSlotText(element);
        mountedRef.current = false;
        firstTextEffectRef.current = true;
      };
    }, []);

    useEffect(() => {
      const element = elementRef.current;
      if (!element || !mountedRef.current) return;
      if (firstTextEffectRef.current) {
        firstTextEffectRef.current = false;
        return;
      }
      animateSlotText(element, text, optionsRef.current);
    }, [text]);

    return (
      <span
        {...props}
        aria-label={ariaLabel ?? text}
        ref={elementRef}
      />
    );
  }
);

SlotText.displayName = "SlotText";

export default SlotText;`,

  "micro-interaction-icons": `"use client";

import * as React from "react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

// 1. Sidebar
export const AppIcon1 = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <motion.button onClick={() => setIsOpen(!isOpen)} whileHover="hover" whileTap="hover" className="relative flex cursor-pointer items-center justify-center outline-none">
      <svg width="24" height="24" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M0.32698 2.63803C0 3.27976 0 4.11984 0 5.8V10.2C0 11.8802 0 12.7202 0.32698 13.362C0.614601 13.9265 1.07354 14.3854 1.63803 14.673C2.27976 15 3.11984 15 4.8 15H11.2C12.8802 15 13.7202 15 14.362 14.673C14.9265 14.3854 15.3854 13.9265 15.673 13.362C16 12.7202 16 11.8802 16 10.2V5.8C16 4.11984 16 3.27976 15.673 2.63803C15.3854 2.07354 14.9265 1.6146 14.362 1.32698C13.7202 1 12.8802 1 11.2 1H4.8C3.11984 1 2.27976 1 1.63803 1.32698C1.07354 1.6146 0.614601 2.07354 0.32698 2.63803Z" fill="currentColor"></path>
      </svg>
      <motion.div 
        variants={{ hover: { width: 5, opacity: 1 } }}
        animate={{ width: isOpen ? 5 : 2.25, opacity: isOpen ? 1 : 0.5 }}
        transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
        style={{ transformOrigin: "left" }}
        className="bg-black absolute left-[4.5px] h-[15px] rounded-[1.5px] dark:bg-white" 
      />
    </motion.button>
  );
};

// 2. Code 
export const AppIcon2 = () => {
  return (
    <motion.button whileHover="hover" whileTap="hover" className="relative flex cursor-pointer items-center justify-center outline-none overflow-hidden">
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.path d="m18 16 4-4-4-4" variants={{ hover: { x: 3, opacity: 0.8 } }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} />
        <motion.path d="m6 8-4 4 4 4" variants={{ hover: { x: -3, opacity: 0.8 } }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} />
        <path d="m14.5 4-5 16" />
        <motion.path 
          d="m14.5 4-5 16" 
          initial={{ x: 5, y: -22, opacity: 0 }}
          variants={{ hover: { x: 0, y: 0, opacity: 1 } }} 
          transition={{ type: "spring", bounce: 0.4, duration: 0.6 }} 
          className="text-white/30"
        />
      </svg>
    </motion.button>
  );
};

// 3. Lock
export const AppIcon3 = () => {
  const [locked, setLocked] = React.useState(true);
  return (
    <motion.button onClick={() => setLocked(!locked)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none" style={{ transformStyle: "preserve-3d", perspective: "500px" }}>
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" overflow="visible" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.path 
          d="M7 11V7a5 5 0 0 1 10 0v12" 
          variants={{ hover: { y: -3, rotateX: 10 } }}
          animate={{ y: locked ? 0 : -4, rotateY: locked ? 0 : -20 }}
          transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
          style={{ transformOrigin: "100% 50%" }}
        />
        <rect width="18" height="11" x="3" y="11" rx="2" ry="2" fill="currentColor" />
      </svg>
    </motion.button>
  );
};

// 4. Log out
export const AppIcon4 = () => {
  const [loggedOut, setLoggedOut] = React.useState(false);
  return (
    <motion.button 
      onClick={() => { setLoggedOut(true); setTimeout(() => setLoggedOut(false), 1000); }}
      whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.g variants={{ hover: { x: 4 } }} animate={loggedOut ? { x: [0, 10, -10, 0], opacity: [1, 0, 0, 1] } : {}} transition={{ type: "spring", bounce: 0.5, duration: 0.6 }}>
          <path d="m10 17 5-5-5-5"></path>
          <path d="M15 12H3"></path>
        </motion.g>
        <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"></path>
      </svg>
    </motion.button>
  );
};

// 5. Badge
export const AppIcon5 = () => {
  const [flips, setFlips] = React.useState(0);
  return (
    <motion.button onClick={() => setFlips(f => f + 1)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg 
        xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6"
        variants={{ hover: { rotateY: 180, scale: 1.1 } }} 
        animate={{ rotateY: flips * 360 }}
        transition={{ duration: 0.6, type: "spring", bounce: 0.4 }}
      >
        <path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"></path>
        <path d="M16 8h-6a2 2 0 1 0 0 4h4a2 2 0 1 1 0 4H8"></path>
        <path d="M12 18V6"></path>
      </motion.svg>
    </motion.button>
  );
};

// 6. Copy
export const AppIcon6 = () => {
  const [copied, setCopied] = React.useState(false);
  return (
    <motion.button 
      onClick={() => { setCopied(true); setTimeout(() => setCopied(false), 2000); }}
      whileHover="hover" whileTap="hover"
      className="relative flex cursor-pointer items-center justify-center outline-none"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <rect width="14" height="14" x="8" y="8" rx="2" ry="2"></rect>
        <motion.path 
          d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2"
          animate={{ x: copied ? 4 : 0, y: copied ? 4 : 0, opacity: copied ? 0 : 1 }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.4 }}
          variants={{ hover: { opacity: 1, pathLength: 1 } }}
        />
      </svg>
    </motion.button>
  );
};

// 7. Audio
export const AppIcon7 = () => {
  const bars = [3, 6, 9, 12, 10, 6, 8, 4, 3];
  const [playing, setPlaying] = React.useState(false);
  const [hovered, setHovered] = React.useState(false);
  const isAnimated = playing || hovered;
  return (
    <motion.button 
      onClick={() => setPlaying(!playing)}
      onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}
      whileTap={{ scale: 0.9 }}
      className="relative flex gap-1 cursor-pointer items-center justify-center outline-none w-6 h-6 h-[24px]"
    >
      {bars.map((v, i) => (
        <motion.div 
          key={i} className={cn("bg-current w-[2px] rounded-full", playing ? "bg-current" : "")} style={{ height: 3 }}
          animate={{ height: isAnimated ? [3, Math.max(3, v), 3] : 3 }}
          transition={isAnimated ? { repeat: Infinity, duration: 1.2, delay: i * 0.1, ease: "easeInOut" } : { duration: 0.2 }}
        />
      ))}
    </motion.button>
  );
};

// 8. Plus Minus
export const AppIcon8 = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.button 
      onClick={() => setOpen(!open)}
      whileTap={{ scale: 0.9 }}
      className="relative flex cursor-pointer items-center justify-center outline-none w-6 h-6"
    >
      <motion.svg animate={{ rotate: open ? 90 : 0, opacity: open ? 0 : 1 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path><path d="M12 5v14"></path>
      </motion.svg>
      <motion.svg animate={{ rotate: open ? 0 : -90, opacity: open ? 1 : 0 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M5 12h14"></path>
      </motion.svg>
    </motion.button>
  );
};

// 9. Menu Sort
export const AppIcon9 = () => {
  return (
    <motion.button whileHover="hover" whileTap="hover" className="relative flex flex-col items-end justify-center gap-[4px] outline-none w-6 h-6">
      <motion.span className="bg-current h-[2px] w-5 rounded-full" variants={{ hover: { width: 14 } }} transition={{ type: "spring", bounce: 0.6, duration: 0.5 }} />
      <motion.span className="bg-current h-[2px] w-6 rounded-full" variants={{ hover: { width: 24 } }} transition={{ type: "spring", bounce: 0.6, duration: 0.5, delay: 0.05 }} />
      <motion.span className="bg-current h-[2px] w-4 rounded-full" variants={{ hover: { width: 16 } }} transition={{ type: "spring", bounce: 0.6, duration: 0.5, delay: 0.1 }} />
    </motion.button>
  );
};

// 10. Chevron
export const AppIcon10 = () => {
  const [open, setOpen] = React.useState(false);
  return (
    <motion.button onClick={() => setOpen(!open)} whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none w-6 h-6">
      <motion.svg animate={{ rotate: open ? 180 : 0, opacity: open ? 0 : 1 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m6 9 6 6 6-6"></path></motion.svg>
      <motion.svg animate={{ rotate: open ? 0 : -180, opacity: open ? 1 : 0 }} transition={{ type: "spring", bounce: 0.5, duration: 0.4 }} className="absolute size-6 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m18 15-6-6-6 6"></path></motion.svg>
    </motion.button>
  );
};

// 11. Triangle Alert
export const AppIcon11 = () => {
  const [clicks, setClicks] = React.useState(0);
  return (
    <motion.button onClick={() => setClicks(c => c + 1)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg 
        variants={{ hover: { x: [0, -3, 3, -3, 3, 0], scale: 1.1 } }} 
        animate={clicks > 0 ? { rotate: [0, -10, 10, -10, 10, 0], scale: [1, 1.2, 1] } : {}}
        transition={{ duration: 0.5, ease: "easeInOut" }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path><path d="M12 9v4"></path><path d="M12 17h.01"></path>
      </motion.svg>
    </motion.button>
  );
};

// 12. Globe
export const AppIcon12 = () => {
  const [fast, setFast] = React.useState(false);
  return (
    <motion.button onClick={() => setFast(!fast)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg variants={{ hover: { scale: 1.1 } }} animate={{ rotate: 360 }} transition={{ duration: fast ? 1.5 : 10, ease: "linear", repeat: Infinity }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20"></path><path d="M2 12h20"></path>
      </motion.svg>
    </motion.button>
  );
};

// 13. Paperclip
export const AppIcon13 = () => {
  const [attached, setAttached] = React.useState(false);
  return (
    <motion.button onClick={() => setAttached(!attached)} whileHover="hover" whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <motion.svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={cn("size-6 transition-colors duration-300", attached ? "text-current" : "")}>
        <motion.path 
          variants={{ hover: { pathLength: [0, 1], opacity: [0, 1] } }} 
          animate={attached ? { pathLength: 1, strokeWidth: 3 } : { pathLength: 1, strokeWidth: 2 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          d="m16 6-8.414 8.586a2 2 0 0 0 2.829 2.829l8.414-8.586a4 4 0 1 0-5.657-5.657l-8.379 8.551a6 6 0 1 0 8.485 8.485l8.379-8.551" 
        />
      </motion.svg>
    </motion.button>
  );
};

// 14. Trash
export const AppIcon14 = () => {
  const [deleted, setDeleted] = React.useState(false);
  return (
    <motion.button 
      whileHover="hover" whileTap={{ scale: 0.9 }} 
      onClick={() => {
        setDeleted(true);
        setTimeout(() => setDeleted(false), 800);
      }}
      className="relative flex cursor-pointer items-center justify-center outline-none group text-current"
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" overflow="visible" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
        <motion.path 
          d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"
          animate={deleted ? { scaleY: [1, 1.1, 1], y: [0, -2, 0] } : {}}
          transition={{ duration: 0.3 }}
        />
        <motion.g 
          variants={{ hover: { rotate: -15, y: -2, x: -1 } }} 
          animate={deleted ? { rotate: -45, y: -4, x: -2 } : {}}
          style={{ transformOrigin: "bottom right" }} 
          transition={{ type: "spring", bounce: 0.6, duration: 0.5 }}
        >
          <path d="M3 6h18"></path>
          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
        </motion.g>
      </svg>
    </motion.button>
  );
};

// 15. Send
export const AppIcon15 = () => {
  const [sent, setSent] = React.useState(false);
  return (
    <motion.button 
      whileHover="hover" 
      onClick={() => {
        if (sent) return;
        setSent(true);
        setTimeout(() => setSent(false), 1000);
      }}
      whileTap={{ scale: 0.9 }} 
      className="relative flex cursor-pointer items-center justify-center outline-none overflow-hidden text-current w-8 h-8"
    >
      <motion.div animate={sent ? { x: [0, 20, -24, 0], y: [0, -20, 24, 0], opacity: [1, 0, 0, 1] } : {}} transition={{ duration: 0.8, ease: "easeInOut", times: [0, 0.4, 0.41, 1] }}>
        <motion.svg variants={{ hover: { x: 3, y: -3 } }} transition={{ duration: 0.3 }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="size-6">
          <path d="M3.714 3.048a.498.498 0 0 0-.683.627l2.843 7.627a2 2 0 0 1 0 1.396l-2.842 7.627a.498.498 0 0 0 .682.627l18-8.5a.5.5 0 0 0 0-.904z"></path>
          <path d="M6 12h16"></path>
        </motion.svg>
      </motion.div>
    </motion.button>
  );
};

// 16. Spinner (Custom CSS animation based on screenshot)
export const AppIcon16 = () => {
  return (
    <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none">
      <div className="relative flex items-center justify-center w-6 h-6">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-md bg-current w-[15%] h-[6%]"
            style={{
              transform: \`rotate(\${i * 30}deg) translate(146%)\`,
              animation: \`spinner-fade-icon 1.2s linear \${i * 0.1 - 1.2}s infinite\`
            }}
          />
        ))}
        <style>{\`
          @keyframes spinner-fade-icon { 0% { opacity: 1; } 100% { opacity: 0.15; } }
        \`}</style>
      </div>
    </motion.button>
  );
};

// 17. Bell Mute
export const AppIcon17 = () => {
  const [muted, setMuted] = React.useState(false);
  const [clicks, setClicks] = React.useState(0);
  return (
    <motion.button onClick={() => { setMuted(!muted); setClicks(c => c + 1); }} whileTap={{ scale: 0.9 }} className="relative flex cursor-pointer items-center justify-center outline-none overflow-hidden group">
      <div className="relative flex items-center justify-center w-6 h-6">
        <motion.svg key={clicks} animate={{ rotate: [-10, 10, -10, 10, 0] }} transition={{ duration: 0.5 }} width="20" height="22" viewBox="0 0 15 17" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M1.17969 13.3125H13.5625C14.2969 13.3125 14.7422 12.9375 14.7422 12.3672C14.7422 11.5859 13.9453 10.8828 13.2734 10.1875C12.7578 9.64844 12.6172 8.53906 12.5547 7.64062C12.5 4.64062 11.7031 2.57812 9.625 1.82812C9.32812 0.804688 8.52344 0 7.36719 0C6.21875 0 5.40625 0.804688 5.11719 1.82812C3.03906 2.57812 2.24219 4.64062 2.1875 7.64062C2.125 8.53906 1.98438 9.64844 1.46875 10.1875C0.789062 10.8828 0 11.5859 0 12.3672C0 12.9375 0.4375 13.3125 1.17969 13.3125ZM7.36719 16.4453C8.69531 16.4453 9.66406 15.4766 9.76562 14.3828H4.97656C5.07812 15.4766 6.04688 16.4453 7.36719 16.4453Z" fill="currentColor"></path>
        </motion.svg>
        <motion.div 
          className="absolute inset-0 flex items-center justify-center transform -rotate-[40deg] pointer-events-none"
          animate={{ height: muted ? "100%" : "0%" }}
          transition={{ type: "spring", bounce: 0.5, duration: 0.5 }}
        >
          <div className="bg-background flex h-[120%] w-[3px] items-center justify-center rounded-full mt-1 border border-border">
            <div className="bg-foreground h-full w-[1.5px] rounded-full" />
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
};`,

  "bouncy-accordion": `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/lib/utils';
import { BookOpen, Award, Calendar, ShoppingCart, AlertTriangle, Wallet, ChevronDown } from 'lucide-react';

const accordionData = [
  { id: 1, title: 'Type Shit', icon: BookOpen, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 2, title: 'Star Great', icon: Award, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 3, title: 'Schedule', icon: Calendar, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 4, title: 'Buy Stuff', icon: ShoppingCart, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 5, title: 'Triangle Warning', icon: AlertTriangle, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 6, title: 'Account bal', icon: Wallet, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
];

export const BouncyAccordion = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="w-[320px] flex flex-col items-stretch">
      <div className="flex flex-col gap-0 items-stretch">
        <AnimatePresence initial={false}>
          {accordionData.map((item, index) => {
            const isOpen = openId === item.id;
            
            // Calculate dynamic border radius based on open state
            const isFirst = index === 0;
            const isLast = index === accordionData.length - 1;
            const isNextOpen = index < accordionData.length - 1 && openId === accordionData[index + 1].id;
            const isPrevOpen = index > 0 && openId === accordionData[index - 1].id;

            let borderRadius = "0px";
            if (isOpen) {
              borderRadius = "20px";
            } else if (openId === null) {
              if (isFirst) borderRadius = "20px 20px 0 0";
              else if (isLast) borderRadius = "0 0 20px 20px";
              else borderRadius = "0px";
            } else {
              // When something is open, items might need rounded corners if they border the open item or the edges
              if (isFirst && isNextOpen) borderRadius = "20px";
              else if (isFirst) borderRadius = "20px 20px 0 0";
              else if (isLast && isPrevOpen) borderRadius = "20px";
              else if (isLast) borderRadius = "0 0 20px 20px";
              else if (isPrevOpen || isNextOpen) borderRadius = "20px";
              else borderRadius = "0px";
            }

            return (
              <motion.div
                key={item.id}
                layout
                initial={false}
                animate={{
                  borderRadius,
                  marginBottom: isOpen ? 8 : (isNextOpen ? 8 : 0),
                  marginTop: isOpen ? (isFirst ? 0 : 8) : 0,
                  backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.03)"
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="overflow-hidden cursor-pointer backdrop-blur-md border border-border/20"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <div className="flex items-center gap-3 px-4 py-3 min-h-[50px] relative">
                  <div className="relative text-foreground opacity-80 z-10 flex items-center justify-center bg-foreground/10 p-1.5 rounded-xl">
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm tracking-tight text-foreground/80 font-medium z-10 select-none">
                    {item.title}
                  </span>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                    className="ml-auto text-foreground/50 z-10"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </div>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", filter: "blur(0px)" },
                        collapsed: { opacity: 0, height: 0, filter: "blur(4px)" }
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      <div className="px-4 pb-4 pt-1 text-sm text-foreground/50 leading-relaxed z-10 relative">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BouncyAccordion;`,

  "circular-scroll": `import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import NumberFlow from '@number-flow/react';

export const CircularScroll = ({ 
  container,
  showPercent = false
}: { 
  container?: React.RefObject<HTMLElement | null>; 
  showPercent?: boolean;
} = {}) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container) {
      setScrollContainer(container.current);
      return;
    }
    // Find the nearest scrollable parent
    let parent = elementRef.current?.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer(parent);
        break;
      }
      parent = parent.parentElement;
    }
  }, [container]);

  const { scrollYProgress } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const percentTransform = useTransform(scaleY, [0, 1], [0, 100]);
  const [percent, setPercent] = useState(0);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    return percentTransform.on("change", (latest) => {
      setPercent(Math.min(100, Math.max(0, Math.round(latest))));
    });
  }, [percentTransform]);

  // We use fixed wrapper for drag constraints since we want it draggable across the screen
  return (
    <div ref={elementRef} className="fixed inset-0 pointer-events-none z-50">
      <motion.div 
        drag
        dragConstraints={{ top: 10, left: 10, right: typeof window !== 'undefined' ? window.innerWidth - 70 : 1000, bottom: typeof window !== 'undefined' ? window.innerHeight - 70 : 1000 }}
        dragMomentum={false}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="absolute left-1/2 top-10 pointer-events-auto flex items-center justify-center bg-[#111] backdrop-blur-xl border border-white/5 rounded-2xl w-14 h-14 cursor-grab active:cursor-grabbing shadow-2xl"
      >
        <div className="relative w-8 h-8 flex items-center justify-center overflow-hidden">
          <svg viewBox="0 0 36 36" className="w-8 h-8 -rotate-90 absolute inset-0">
            {/* Background Circle */}
            <circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              className="stroke-white/10"
              strokeWidth="3"
            />
            {/* Progress Circle */}
            <motion.circle
              cx="18"
              cy="18"
              r="15"
              fill="none"
              className="stroke-white"
              strokeWidth="3"
              strokeDasharray="94.2477" 
              style={{ strokeDashoffset: useTransform(scaleY, [0, 1], [94.2477, 0]) }}
              strokeLinecap="round"
            />
          </svg>
          
          <motion.div 
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: hovered || showPercent ? 1 : 0, scale: hovered || showPercent ? 1 : 0.5 }}
            className="absolute inset-0 flex items-center justify-center bg-black/60 rounded-full"
          >
            <span className="text-[10px] font-medium text-white">
              <NumberFlow value={percent} />
            </span>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
};

export default CircularScroll;`,

  "scroll-bar": `import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring } from 'motion/react';
import { cn } from '../lib/utils';

interface ScrollBarProps {
  activeSection: number;
  showScrollCard: boolean;
  sections: { id: number; title: string; element?: HTMLElement | null }[];
  container?: React.RefObject<HTMLElement | null>;
}

export const ScrollBar = ({ activeSection, showScrollCard, sections, container }: ScrollBarProps) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (container) {
      setScrollContainer(container.current);
      return;
    }
    // Find the nearest scrollable parent
    let parent = elementRef.current?.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer(parent);
        break;
      }
      parent = parent.parentElement;
    }
  }, [container]);

  const { scrollYProgress } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const [hovered, setHovered] = useState(false);
  const [dragging, setDragging] = useState(false);

  return (
    <div ref={elementRef} className="fixed right-[20px] sm:right-[max(20px,calc(50vw-450px))] top-1/2 -translate-y-1/2 h-[50vh] flex items-center z-50">
      
      {/* Scroll Info Card */}
      <motion.div
        initial={false}
        animate={{
          opacity: showScrollCard || dragging || hovered ? 1 : 0,
          x: showScrollCard || dragging || hovered ? 0 : 20,
          filter: showScrollCard || dragging || hovered ? "blur(0px)" : "blur(4px)"
        }}
        className="absolute right-10 mr-4 pointer-events-none"
      >
        <div className="bg-[#111]/80 backdrop-blur-xl border border-white/10 px-4 py-3 rounded-2xl shadow-2xl flex flex-col min-w-[120px]">
          <span className="text-[10px] text-white/40 font-mono uppercase tracking-wider mb-1">// Section</span>
          <span className="text-sm font-medium text-white shadow-sm overflow-hidden whitespace-nowrap">
             {sections[activeSection]?.title || "Content"}
          </span>
        </div>
      </motion.div>

      {/* Track */}
      <motion.div 
        className="relative w-1.5 h-full rounded-full bg-white/10 overflow-hidden cursor-pointer pointer-events-auto"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >
        <motion.div
          className="absolute top-0 left-0 right-0 w-full bg-sky-500 rounded-full origin-top"
          style={{ scaleY }}
        />
      </motion.div>
    </div>
  );
};

export default ScrollBar;`,

  "scroll-progress": `import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  
  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const percent = useTransform(scaleY, [0, 1], [0, 100]);
  const yOffset = useTransform(scaleY, [0, 1], ["0%", "100%"]);
  const [currentPercent, setCurrentPercent] = useState(0);

  useEffect(() => {
    return percent.on("change", (latest) => {
      // Clamp between 0 and 100 to prevent weird spring bounce numbers
      setCurrentPercent(Math.min(100, Math.max(0, Math.round(latest))));
    });
  }, [percent]);

  return (
    <div className="fixed left-8 md:left-24 top-1/2 -translate-y-1/2 h-[300px] w-1.5 bg-white/10 z-50 rounded-full">
      {/* Background track */}
      <div className="absolute inset-0 rounded-full bg-white/5" />
      
      {/* Progress track */}
      <motion.div
        className="absolute top-0 left-0 w-full h-full bg-[#ff7b00] origin-top rounded-full"
        style={{ scaleY }}
      />
      
      {/* Indicator handle */}
      <motion.div 
        className="absolute left-[-4px] w-3.5 h-[2px] bg-[#ff7b00]"
        style={{ top: yOffset }}
      >
        <div className="absolute left-5 top-1/2 -translate-y-1/2 flex items-center justify-start w-8">
          <span className="text-[#ff7b00] text-sm tabular-nums font-mono drop-shadow-md shadow-black">
            {currentPercent}
          </span>
        </div>
      </motion.div>
    </div>
  );
};`,

  "album-stack-grid": `import React, { useState } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'motion/react';

export interface CollectionItem {
  name: string;
  images: string[];
}

const DEFAULT_COLLECTIONS: CollectionItem[] = [
  {
    name: "Arch & Geometry",
    images: [
      "https://images.unsplash.com/photo-1773117950168-a7a56f4f8d94?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1675897974745-1e78e8690755?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486718448742-163732cd1544?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600669091588-8aaac09509ba?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583100913639-b8a172d90b77?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1583100913828-aeff24cc04ae?w=500&auto=format&fit=crop"
    ]
  },
  {
    name: "Abstract Forms",
    images: [
      "https://images.unsplash.com/photo-1674210803712-b75d73df67d1?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1674207073169-8676749637d3?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631125915510-8ffed5a0d054?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631125916283-34e834c822cc?w=500&auto=format&fit=crop"
    ]
  },
  {
    name: "Minimalist Spaces",
    images: [
      "https://images.unsplash.com/photo-1761560573772-2ea08a5065e3?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760294098215-ce23555ad262?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760293639661-60f435dff4cf?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1760293286834-49b098366d8d?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1772090049995-6116febe0d60?w=500&auto=format&fit=crop"
    ]
  },
  {
    name: "Moody Textures",
    images: [
      "https://images.unsplash.com/photo-1682687980115-a37b56ea7271?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1676780207860-7ab32f87da74?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1584715787854-9922db91c681?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1641141264446-9f3e94b15f2c?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1626105962913-5a53411593e4?w=500&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1631551976150-097899638e74?w=500&auto=format&fit=crop"
    ]
  }
];

const layoutTransition = { type: "spring", stiffness: 400, damping: 35, mass: 0.8 } as const;

function StackItem({ 
  collection, 
  idx, 
  onClick 
}: { 
  collection: CollectionItem; 
  idx: number; 
  onClick: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseX = useSpring(x, { stiffness: 400, damping: 30 });
  const mouseY = useSpring(y, { stiffness: 400, damping: 30 });

  function handleMouseMove(e: React.MouseEvent<HTMLButtonElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(e.clientX - centerX);
    y.set(e.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <button
      className="album-stack-item group"
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      <div className="album-images">
        {collection.images.slice(0, 4).map((img: string, imgIdx: number) => {
          let baseRotate = 5;
          if ((imgIdx + 1) % 3 === 0) baseRotate = 10;
          else if ((imgIdx + 1) % 2 === 0) baseRotate = -5;

          const factor = (imgIdx - (collection.images.slice(0, 4).length / 2)) * 0.15;
          const dynamicX = useTransform(mouseX, val => val * factor);
          const dynamicY = useTransform(mouseY, val => val * factor);
          const dynamicRotate = useTransform(mouseX, val => baseRotate + val * factor * 0.1);

          return (
            <motion.div
              layoutId={\`album-img-\${idx}-\${imgIdx}\`}
              key={imgIdx}
              className="album-stack-item-image"
              style={{ 
                zIndex: imgIdx + 5,
                x: dynamicX,
                y: dynamicY,
                rotate: dynamicRotate
              }}
              transition={layoutTransition}
            >
              <img src={img} alt="" className="w-full h-full object-cover" loading="lazy" />
            </motion.div>
          );
        })}
        {/* Shimmer Effect overlay */}
        <div className="album-shimmer absolute inset-0 z-50 pointer-events-none" />
      </div>
      <span className="badge mt-4 border border-zinc-200 dark:border-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-350 px-3.5 py-1.5 bg-card shadow-sm">
        {collection.name}
      </span>
    </button>
  );
}

export function AlbumStackGrid({ 
  collections = DEFAULT_COLLECTIONS,
  className = "" 
}: { 
  collections?: CollectionItem[];
  className?: string;
}) {
  const [selectedCollection, setSelectedCollection] = useState<number | null>(null);

  return (
    <div className={\`album-gallery w-full \${className}\`}>
      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr)', gridTemplateAreas: '"main"', alignItems: 'start' }}>
        <AnimatePresence mode="popLayout">
          {selectedCollection === null ? (
            <motion.div 
              key="stacks"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, pointerEvents: 'none' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="album-stacks"
              style={{ gridArea: 'main' }}
            >
              {collections.map((collection, idx) => (
                <StackItem 
                  key={idx} 
                  collection={collection} 
                  idx={idx} 
                  onClick={() => setSelectedCollection(idx)} 
                />
              ))}
            </motion.div>
          ) : (
            <motion.div 
              key="grid"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95, pointerEvents: 'none' }}
              transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
              className="album-grid-view"
              style={{ gridArea: 'main' }}
            >
              <div className="album-grid-header mb-6">
                <button 
                  onClick={() => setSelectedCollection(null)}
                  className="back-button border border-zinc-200 dark:border-zinc-800 hover:bg-zinc-100 dark:hover:bg-zinc-900 rounded-full px-5 py-2 text-sm text-zinc-700 dark:text-zinc-350 transition-colors shadow-sm bg-card"
                >
                  &larr; Back to Collections
                </button>
                <span className="badge border border-zinc-200 dark:border-zinc-800 rounded-full text-xs text-zinc-700 dark:text-zinc-350 px-3.5 py-1.5 bg-card shadow-sm font-semibold">
                  {collections[selectedCollection].name}
                </span>
              </div>
              
              <div className="album-image-grid">
                {collections[selectedCollection].images.map((img, imgIdx) => (
                  <motion.div
                    layoutId={\`album-img-\${selectedCollection}-\${imgIdx}\`}
                    key={imgIdx}
                    className="album-grid-item-image"
                    style={{ zIndex: 10 }}
                    initial={{ rotate: 0 }}
                    animate={{ rotate: 0 }}
                    exit={{ rotate: 0 }}
                    whileHover={{ scale: 1.03, y: -4 }}
                    transition={layoutTransition}
                  >
                    <img src={img} alt="" className="w-full h-full object-cover" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default AlbumStackGrid;


`,

  "animated-beam": `"use client";

import React, {
  RefObject,
  useEffect,
  useId,
  useState,
  useCallback,
} from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

export interface AnimatedBeamProps {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  duration?: number;
  delay?: number;
  repeat?: number;
  repeatDelay?: number;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
}

export const AnimatedBeam: React.FC<AnimatedBeamProps> = ({
  className,
  containerRef,
  fromRef,
  toRef,
  curvature = 0,
  reverse = false,
  duration = 5,
  delay = 0,
  repeat = Infinity,
  repeatDelay = 0,
  pathColor = "gray",
  pathWidth = 2,
  pathOpacity = 0.2,
  gradientStartColor = "#ffaa40",
  gradientStopColor = "#9c40ff",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ width: 0, height: 0 });

  // Gradient coordinates
  const [coords, setCoords] = useState({ x1: 0, y1: 0, x2: 0, y2: 0 });

  const updatePath = useCallback(() => {
    if (!containerRef.current || !fromRef.current || !toRef.current) return;

    const containerRect = containerRef.current.getBoundingClientRect();
    const fromRect = fromRef.current.getBoundingClientRect();
    const toRect = toRef.current.getBoundingClientRect();

    const width = containerRect.width;
    const height = containerRect.height;

    setSvgDimensions({ width, height });

    const startX =
      fromRect.left - containerRect.left + fromRect.width / 2 + startXOffset;
    const startY =
      fromRect.top - containerRect.top + fromRect.height / 2 + startYOffset;
    const endX =
      toRect.left - containerRect.left + toRect.width / 2 + endXOffset;
    const endY =
      toRect.top - containerRect.top + toRect.height / 2 + endYOffset;

    setCoords({ x1: startX, y1: startY, x2: endX, y2: endY });

    const midX = (startX + endX) / 2;
    const midY = (startY + endY) / 2;

    let controlX = midX;
    let controlY = midY;

    // Determine direction to apply curvature naturally
    if (Math.abs(startX - endX) > Math.abs(startY - endY)) {
      // Horizontal path -> offset vertically
      controlY += curvature;
    } else {
      // Vertical path -> offset horizontally
      controlX += curvature;
    }

    const path = \`M \${startX} \${startY} Q \${controlX} \${controlY}, \${endX} \${endY}\`;
    setPathD(path);
  }, [
    containerRef,
    fromRef,
    toRef,
    curvature,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  useEffect(() => {
    const container = containerRef.current;
    const fromEl = fromRef.current;
    const toEl = toRef.current;

    if (!container || !fromEl || !toEl) return;

    const observer = new ResizeObserver(() => {
      updatePath();
    });

    observer.observe(container);
    observer.observe(fromEl);
    observer.observe(toEl);

    // Initial path calculation
    updatePath();

    window.addEventListener("resize", updatePath);

    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePath);
    };
  }, [containerRef, fromRef, toRef, updatePath]);

  return (
    <svg
      fill="none"
      width={svgDimensions.width}
      height={svgDimensions.height}
      viewBox={\`0 0 \${svgDimensions.width} \${svgDimensions.height}\`}
      className={cn(
        "pointer-events-none absolute left-0 top-0 select-none z-10",
        className
      )}
    >
      <path
        d={pathD}
        stroke={pathColor}
        strokeWidth={pathWidth}
        strokeOpacity={pathOpacity}
        strokeLinecap="round"
      />
      <motion.path
        d={pathD}
        stroke={\`url(#\${id})\`}
        strokeWidth={pathWidth}
        strokeOpacity="1"
        strokeLinecap="round"
        initial={{
          pathLength: 0.2,
          pathOffset: reverse ? 1.0 : -0.2,
        }}
        animate={{
          pathOffset: reverse ? -0.2 : 1.0,
        }}
        transition={{
          repeat: repeat,
          repeatDelay: repeatDelay,
          duration: duration,
          delay: delay,
          ease: "linear",
        }}
      />
      <defs>
        <linearGradient
          id={id}
          gradientUnits="userSpaceOnUse"
          x1={coords.x1}
          y1={coords.y1}
          x2={coords.x2}
          y2={coords.y2}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop offset="30%" stopColor={gradientStartColor} stopOpacity="1" />
          <stop offset="70%" stopColor={gradientStopColor} stopOpacity="1" />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
};

export default AnimatedBeam;


`,

  "ascii-dither": `import { useEffect, useRef } from 'react';

const ASCII_CHARS = "  .:;~=+*#%@";

export function AsciiDither() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let time = 0;
    
    // Mouse interaction
    let mouseX = -1000;
    let mouseY = -1000;
    let targetMouseX = -1000;
    let targetMouseY = -1000;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      targetMouseX = e.clientX - rect.left;
      targetMouseY = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
      // Send mouse away slowly
      targetMouseY = canvas.height * 2;
    };

    window.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    const resize = () => {
      const parent = canvas.parentElement;
      canvas.width = parent ? parent.clientWidth : window.innerWidth;
      canvas.height = parent ? parent.clientHeight : 500;
    };
    
    window.addEventListener('resize', resize);
    resize();
    
    targetMouseX = canvas.width / 2;
    mouseX = canvas.width / 2;
    targetMouseY = canvas.height / 2;
    mouseY = canvas.height / 2;

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      mouseX += (targetMouseX - mouseX) * 0.1;
      mouseY += (targetMouseY - mouseY) * 0.1;
      
      ctx.font = '14px "JetBrains Mono", ui-monospace, monospace';
      ctx.textAlign = 'center';
      ctx.textBaseline = 'middle';
      
      const charWidth = 12;
      const charHeight = 16;
      const cols = Math.ceil(canvas.width / charWidth);
      const rows = Math.ceil(canvas.height / charHeight);
      
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const px = x * charWidth + charWidth / 2;
          const py = y * charHeight + charHeight / 2;
          
          const nx = x / cols;
          const ny = y / rows;
          const aspect = canvas.width / canvas.height;
          
          // Normalized coordinates aware of aspect ratio
          const ax = (nx - 0.5) * aspect;
          const ay = ny - 0.5;
          
          const angle = Math.atan2(ay, ax);
          const radius = Math.sqrt(ax * ax + ay * ay);
          
          // Revolving whirlpool effect
          const spin = angle - time * 0.3;
          
          // Water-like spiral arms moving inwards
          // Adding time to the radius component makes it flow towards the center
          const arms = Math.sin(spin * 5 + radius * 20 + time * 2.5);
          const secondaryArms = Math.cos(spin * 3 + radius * 12 + time * 1.5);
          
          // Base fluid noise
          const wave1 = Math.sin(ax * 15 + time * 0.8);
          const wave2 = Math.cos(ay * 15 - time * 0.8);
          const fluid = (wave1 + wave2) * 0.15;
          
          // Combine whirlpool arms and fluid
          let water = (arms * 0.6 + secondaryArms * 0.4 + 1) * 0.4 + fluid;
          
          // Mouse interaction - radial ripples
          const mdx = px - mouseX;
          const mdy = py - mouseY;
          const distFromMouse = Math.sqrt(mdx * mdx + mdy * mdy);
          const mouseRipple = Math.sin(distFromMouse * 0.05 - time * 3) * Math.max(0, 1 - distFromMouse / 250);
          
          water += mouseRipple * 0.15;
          
          // Masking: fill the whole section but hollow out the center
          const centerHole = Math.min(1, Math.max(0, (radius - 0.12) * 4.0)); 
          // Very subtle fade at the absolute edges to avoid hard cutoffs
          const edgeFade = Math.min(1, Math.max(0, 1.8 - radius));
          
          let intensity = water * centerHole * edgeFade;
          
          if (intensity > 0.05) {
            let charIdx = Math.floor(intensity * ASCII_CHARS.length);
            if (charIdx < 0) charIdx = 0;
            if (charIdx >= ASCII_CHARS.length) charIdx = ASCII_CHARS.length - 1;
            
            const char = ASCII_CHARS[charIdx];
            
            ctx.globalAlpha = Math.min(1, intensity * 2);
            
            if (intensity > 0.6) {
               ctx.fillStyle = \`rgba(180, 200, 240, \${ctx.globalAlpha})\`; // Subtle highlight
            } else if (intensity > 0.3) {
               ctx.fillStyle = \`rgba(80, 110, 180, \${ctx.globalAlpha})\`; // Medium subtle blue
            } else {
               ctx.fillStyle = \`rgba(40, 60, 120, \${ctx.globalAlpha})\`; // Deep subtle blue
            }
            
            ctx.fillText(char, px, py);
          }
        }
      }
      
      time += 0.02; // Smooth constant movement
      animationFrameId = requestAnimationFrame(draw);
    };
    
    draw();
    
    return () => {
      window.removeEventListener('resize', resize);
      window.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full mix-blend-screen pointer-events-none opacity-90" 
    />
  );
}


`,

  "aura-card-stack": `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface CardItem {
  id: string | number;
  src: string;
  alt?: string;
}

export interface AuraCardStackProps {
  cards?: CardItem[];
  className?: string;
}

const DEFAULT_CARDS: CardItem[] = [
  { id: 1, src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", alt: "Sunset beach" },
  { id: 2, src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80", alt: "Foggy mountains" },
  { id: 3, src: "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80", alt: "Green valleys" },
  { id: 4, src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80", alt: "Forest trails" },
  { id: 5, src: "https://images.unsplash.com/photo-1472214222541-d510753a4707?auto=format&fit=crop&w=600&q=80", alt: "Scenic fields" },
];

export function AuraCardStack({
  cards = DEFAULT_CARDS,
  className,
}: AuraCardStackProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [hoveredCardId, setHoveredCardId] = useState<string | number | null>(null);
  const [activeCardId, setActiveCardId] = useState<string | number | null>(null);

  // Dynamic fanned transforms based on standard index mapping
  const getCardTransforms = (index: number, total: number) => {
    const mid = (total - 1) / 2;
    const offset = index - mid;
    
    // Default translations in normal stack state
    const defaultX = offset * 18;
    const defaultY = Math.abs(offset) * 3;
    const defaultRotate = offset * 5;

    // Translation values in expanded hover state
    const hoverX = offset * 110;
    const hoverY = Math.abs(offset) * 5;
    const hoverRotate = offset * 10;

    return {
      default: \`translate(-50%, -50%) translate3d(\${defaultX}px, \${defaultY}px, 0) rotate(\${defaultRotate}deg)\`,
      hover: \`translate(-50%, -50%) translate3d(\${hoverX}px, \${hoverY}px, 0) rotate(\${hoverRotate}deg)\`,
    };
  };

  const activeCard = cards.find(c => c.id === activeCardId);

  return (
    <div className={cn("relative w-full flex flex-col items-center select-none py-10", className)}>
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="relative h-[160px] w-[260px] sm:h-[180px] sm:w-[380px] cursor-default"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => {
          setIsHovered(false);
          setHoveredCardId(null);
        }}
      >
        {cards.map((card, index) => {
          const transforms = getCardTransforms(index, cards.length);
          const isSingleHovered = hoveredCardId === card.id;

          return (
            <button 
              key={card.id}
              type="button" 
              className="absolute left-1/2 top-1/2 inline-flex cursor-zoom-in items-center justify-center focus-visible:outline-none transition-transform active:scale-[0.98]"
              aria-label={\`Open card \${card.id}\`}
              onClick={() => setActiveCardId(card.id)}
              onMouseEnter={() => setHoveredCardId(card.id)}
              onMouseLeave={() => setHoveredCardId(null)}
              style={{
                zIndex: isSingleHovered ? 50 : (isHovered ? index + 10 : index + 1),
                transform: \`\${isHovered ? transforms.hover : transforms.default} \${isSingleHovered ? \`scale(1.15) rotate(\${index % 2 === 0 ? '4deg' : '-4deg'})\` : 'scale(1)'}\`,
                transition: 'transform 380ms cubic-bezier(0.32,0.72,0,1), z-index 0ms, box-shadow 380ms ease',
                boxShadow: isSingleHovered ? '0 20px 40px rgba(0,0,0,0.25)' : 'none',
                willChange: 'transform'
              }}
            >
              <img 
                alt={card.alt || \`Card \${card.id}\`} 
                className="h-[110px] w-auto object-cover sm:h-[130px] aspect-[4/3] rounded-xl border-[5px] border-zinc-950 dark:border-zinc-900 shadow-[0_4px_16px_rgba(0,0,0,0.3)] bg-zinc-900" 
                src={card.src} 
              />
            </button>
          );
        })}
      </motion.div>

      {/* Lightbox / Zoom Dialog Modal */}
      <AnimatePresence>
        {activeCardId !== null && activeCard && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 p-4 sm:p-8 backdrop-blur-md"
            onClick={() => setActiveCardId(null)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-3xl max-h-full flex flex-col items-center" 
              onClick={e => e.stopPropagation()}
            >
              {/* Close Button */}
              <button 
                className="absolute -top-14 right-0 text-white/70 hover:text-white transition-colors focus:outline-none p-2.5 bg-white/10 hover:bg-white/20 rounded-full backdrop-blur-md cursor-pointer shadow-lg"
                onClick={() => setActiveCardId(null)}
              >
                <X className="w-5 h-5" />
              </button>
              
              <img 
                src={activeCard.src} 
                alt={activeCard.alt || \`Zoom card \${activeCardId}\`} 
                className="max-w-full max-h-[75vh] object-contain rounded-2xl border-[8px] border-zinc-950 dark:border-zinc-900 shadow-2xl bg-zinc-950"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}


`,

  "aura-chat-panel": `import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../../lib/utils';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface AuraChatPanelProps {
  systemInstruction?: string;
  className?: string;
}

const MOCK_ANSWERS = [
  "Welcome! I am Aura, your calm virtual assistant. How can I help clarify your productivity flow today?",
  "Aura workspaces are built to suppress dopamine loops. By combining fanned inspiration cards with minimal task lists, you can focus on deep work.",
  "You can configure absolute workspace silences. By scheduling notifications in blocks, you preserve key cognitive energy for deep creation.",
  "A quiet workspace is a productive workspace. I suggest hiding all sidebars, starting a 45-minute focus session, and letting your mind wander into flow.",
];

export function AuraChatPanel({
  systemInstruction = "You are Aura, a helpful assistant for a minimal task manager. Keep responses concise, calm, and helpful.",
  className,
}: AuraChatPanelProps) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello. I am Aura. I'm here to help you cultivate focus, calm your mind, and optimize your creative workspace. Ask me anything about creating your ideal deep work flow." }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isGenerating) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsGenerating(true);

    // Read Vite environmental variables or standard process environment keys
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

    if (apiKey) {
      // Real Live Gemini API integration
      try {
        const ai = new GoogleGenAI({ 
          apiKey: apiKey,
        });
        
        const contents = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
        contents.push({ role: 'user', parts: [{ text: userMessage }] });

        const responseStream = await ai.models.generateContentStream({
          model: "gemini-3-flash-preview",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
          }
        });

        setMessages((prev) => [...prev, { role: 'model', text: '' }]);

        let fullText = '';
        for await (const chunk of responseStream) {
          if (chunk.text) {
            fullText += chunk.text;
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              newMessages[lastIndex] = {
                ...newMessages[lastIndex],
                text: fullText
              };
              return newMessages;
            });
          }
        }
      } catch (error) {
        console.error("Gemini Live Chat error:", error);
        setMessages((prev) => [...prev, { role: 'model', text: "I'm sorry, I encountered a connection error. Please verify your VITE_GEMINI_API_KEY in the environmental setup." }]);
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Simulated/Mock high-fidelity conversational stream
      setTimeout(async () => {
        setMessages((prev) => [...prev, { role: 'model', text: '' }]);
        
        const responseText = MOCK_ANSWERS[Math.floor(Math.random() * MOCK_ANSWERS.length)];
        const words = responseText.split(' ');
        let currentText = '';

        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 80 + Math.random() * 40));
          currentText += (i === 0 ? '' : ' ') + words[i];
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              text: currentText
            };
            return newMessages;
          });
        }
        setIsGenerating(false);
      }, 1000);
    }
  };

  return (
    <div className={cn("w-full max-w-[540px] flex flex-col bg-zinc-50 dark:bg-zinc-950/60 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden backdrop-blur-xl h-[480px] select-none", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/40">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
            <Bot size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">Aura Chat</h4>
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              Online
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
          <Sparkles className="size-3 text-purple-500 animate-pulse" />
          AI Enabled
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 no-scrollbar bg-zinc-50/50 dark:bg-zinc-900/10">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={cn(
                "flex w-full gap-3",
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role !== 'user' && (
                <div className="size-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 flex-shrink-0 self-start mt-0.5 shadow-sm">
                  <Bot size={13} />
                </div>
              )}
              
              <div
                className={cn(
                  "rounded-[20px] px-4.5 py-3 text-sm leading-relaxed max-w-[80%] shadow-sm border",
                  msg.role === 'user'
                    ? "bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100 text-white dark:text-zinc-950 font-medium"
                    : "bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200"
                )}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="size-7 rounded-full bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center text-zinc-200 dark:text-zinc-800 flex-shrink-0 self-end mb-0.5 shadow-sm">
                  <User size={13} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleChatSubmit}
        className="p-4 bg-white/60 dark:bg-zinc-900/40 border-t border-zinc-200/60 dark:border-zinc-800/50"
      >
        <div className="relative flex items-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-300 dark:focus-within:border-zinc-700/80 transition-all p-1">
          <input
            type="text"
            placeholder={isGenerating ? "Aura is typing..." : "Ask about productivity workflows..."}
            autoComplete="off"
            spellCheck="false"
            className="flex-1 bg-transparent px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none disabled:opacity-50"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isGenerating}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:scale-102 active:scale-98"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 ml-0.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}


`,

  "aura-preloader": `import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

export interface AuraPreloaderProps {
  logoText?: string;
  duration?: number;
  onComplete?: () => void;
}

export function AuraPreloader({
  logoText = 'aura.',
  duration = 2000,
  onComplete,
}: AuraPreloaderProps) {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      onComplete?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [duration, onComplete]);

  return (
    <AnimatePresence>
      {isVisible && (
        <>
          {/* Blurred overlay background */}
          <motion.div
            key="preloader-overlay"
            className="fixed inset-0 z-[9998] bg-zinc-950/95 backdrop-blur-2xl pointer-events-auto"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          />

          {/* Centered logo reveal */}
          <motion.div
            key="preloader-content"
            className="fixed inset-0 z-[9999] flex items-center justify-center pointer-events-none select-none"
            exit={{ opacity: 0, filter: 'blur(10px)', scale: 1.05 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <motion.div
              initial={{ filter: 'blur(20px)', opacity: 0, scale: 0.9 }}
              animate={{ filter: 'blur(0px)', opacity: 1, scale: 1 }}
              transition={{ type: 'spring', bounce: 0.2, duration: 1.2 }}
              className="text-6xl sm:text-8xl font-bold tracking-tighter text-zinc-100 dark:text-zinc-100 font-sans"
            >
              {logoText}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}


`,

  "aura-subscribe-pill": `import React, { useState, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TextMorph } from 'torph/react';
import confetti from 'canvas-confetti';
import { Loader2, Check } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface AuraSubscribePillProps {
  placeholder?: string;
  onSuccess?: (email: string) => void;
  className?: string;
  confettiColors?: string[];
}

export function AuraSubscribePill({
  placeholder = 'you@example.com',
  onSuccess,
  className,
  confettiColors = ['#9333ea', '#a855f7', '#c084fc', '#e9d5ff', '#ffffff', '#000000'],
}: AuraSubscribePillProps) {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!email || isSubmitting || isSubmitted) return;

    setIsSubmitting(true);

    // Simulate standard submission delay
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
      onSuccess?.(email);

      // Trigger high-fidelity dual confetti bursts on success!
      confetti({
        particleCount: 80,
        spread: 60,
        angle: 60,
        startVelocity: 50,
        origin: { y: 0.6, x: 0.1 },
        colors: confettiColors,
      });

      confetti({
        particleCount: 80,
        spread: 60,
        angle: 120,
        startVelocity: 50,
        origin: { y: 0.6, x: 0.9 },
        colors: confettiColors,
      });

      // Clear successful state after 3.5 seconds
      setTimeout(() => {
        setIsSubmitted(false);
        setEmail('');
      }, 3500);
    }, 1500);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className={cn("w-full max-w-[500px] select-none", className)}
    >
      <div className="flex items-center rounded-full bg-zinc-100 dark:bg-zinc-900/60 p-1.5 border border-zinc-200 dark:border-zinc-800/80 shadow-[inset_0_1px_2px_rgba(0,0,0,0.03)] focus-within:border-zinc-300 dark:focus-within:border-zinc-700/80 focus-within:shadow-[inset_0_1px_4px_rgba(0,0,0,0.05)] transition-all">
        <label htmlFor="subscribe-email" className="sr-only">Email</label>
        <input
          id="subscribe-email"
          type="email"
          placeholder={placeholder}
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck="false"
          className="min-w-0 flex-1 rounded-full bg-transparent px-4 py-2.5 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none disabled:opacity-50"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting || isSubmitted}
        />
        <button
          type="submit"
          disabled={isSubmitting || isSubmitted || !email}
          className={cn(
            "group relative inline-flex h-10 shrink-0 items-center justify-center overflow-hidden rounded-full px-5 text-sm font-semibold transition-all duration-[220ms] ease-out shadow-sm outline-none disabled:opacity-60 cursor-pointer active:scale-95 disabled:active:scale-100",
            isSubmitted
              ? "bg-emerald-500 hover:bg-emerald-600 text-white disabled:opacity-100"
              : "bg-zinc-900 hover:bg-zinc-800 dark:bg-zinc-100 dark:hover:bg-zinc-200 text-white dark:text-zinc-900"
          )}
        >
          <span className="inline-flex items-center gap-2 relative z-10 select-none">
            <TextMorph>
              {isSubmitting ? 'Sending' : isSubmitted ? 'Joined' : 'Flow'}
            </TextMorph>
            <AnimatePresence mode="wait">
              {isSubmitting ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Loader2 className="h-3.5 w-3.5 animate-spin" />
                </motion.div>
              ) : isSubmitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <Check className="h-3.5 w-3.5" />
                </motion.div>
              ) : (
                <motion.div
                  key="default"
                  initial={{ opacity: 0, scale: 0.8, width: 0 }}
                  animate={{ opacity: 1, scale: 1, width: 'auto' }}
                  exit={{ opacity: 0, scale: 0.8, width: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="h-3.5 w-3.5 transition-transform duration-220 group-hover:translate-x-[2px]"
                  >
                    <path d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L6 12Zm0 0h7.5" />
                  </svg>
                </motion.div>
              )}
            </AnimatePresence>
          </span>
          {!isSubmitted && (
            <div className="absolute inset-0 rounded-full bg-white/10 opacity-0 transition-opacity duration-300 group-hover:opacity-100 blur-md" />
          )}
        </button>
      </div>
    </form>
  );
}


`,

  "beams-background": `"use client";

/**
 * @author: @dorianbaffier
 * @description: Beams Background
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { motion } from "motion/react";
import { useEffect, useRef } from "react";
import { cn } from "../../lib/utils";

interface AnimatedGradientBackgroundProps {
  className?: string;
  children?: React.ReactNode;
  intensity?: "subtle" | "medium" | "strong";
}

interface Beam {
  x: number;
  y: number;
  width: number;
  length: number;
  angle: number;
  speed: number;
  opacity: number;
  hue: number;
  pulse: number;
  pulseSpeed: number;
}

function createBeam(width: number, height: number, isDarkMode: boolean): Beam {
  const angle = -35 + Math.random() * 10;
  const hueBase = isDarkMode ? 190 : 210;
  const hueRange = isDarkMode ? 70 : 50;

  return {
    x: Math.random() * width * 1.5 - width * 0.25,
    y: Math.random() * height * 1.5 - height * 0.25,
    width: 30 + Math.random() * 60,
    length: height * 2.5,
    angle,
    speed: 0.6 + Math.random() * 1.2,
    opacity: 0.12 + Math.random() * 0.16,
    hue: hueBase + Math.random() * hueRange,
    pulse: Math.random() * Math.PI * 2,
    pulseSpeed: 0.02 + Math.random() * 0.03,
  };
}

export default function BeamsBackground({
  className,
  intensity = "strong",
}: AnimatedGradientBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const beamsRef = useRef<Beam[]>([]);
  const animationFrameRef = useRef<number>(0);
  const MINIMUM_BEAMS = 20;
  const isDarkModeRef = useRef<boolean>(false);

  const opacityMap = {
    subtle: 0.7,
    medium: 0.85,
    strong: 1,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Check for dark mode
    const updateDarkMode = () => {
      isDarkModeRef.current =
        document.documentElement.classList.contains("dark");
    };

    const observer = new MutationObserver(updateDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    updateDarkMode();

    const updateCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
      canvas.style.width = \`\${window.innerWidth}px\`;
      canvas.style.height = \`\${window.innerHeight}px\`;
      ctx.scale(dpr, dpr);

      const totalBeams = MINIMUM_BEAMS * 1.5;
      beamsRef.current = Array.from({ length: totalBeams }, () =>
        createBeam(canvas.width, canvas.height, isDarkModeRef.current)
      );
    };

    updateCanvasSize();
    window.addEventListener("resize", updateCanvasSize);

    function resetBeam(beam: Beam, index: number, totalBeams: number) {
      if (!canvas) return beam;

      const column = index % 3;
      const spacing = canvas.width / 3;

      const hueBase = isDarkModeRef.current ? 190 : 210;
      const hueRange = isDarkModeRef.current ? 70 : 50;

      beam.y = canvas.height + 100;
      beam.x =
        column * spacing + spacing / 2 + (Math.random() - 0.5) * spacing * 0.5;
      beam.width = 100 + Math.random() * 100;
      beam.speed = 0.5 + Math.random() * 0.4;
      beam.hue = hueBase + (index * hueRange) / totalBeams;
      beam.opacity = 0.2 + Math.random() * 0.1;
      return beam;
    }

    function drawBeam(ctx: CanvasRenderingContext2D, beam: Beam) {
      ctx.save();
      ctx.translate(beam.x, beam.y);
      ctx.rotate((beam.angle * Math.PI) / 180);

      const pulsingOpacity =
        beam.opacity *
        (0.8 + Math.sin(beam.pulse) * 0.2) *
        opacityMap[intensity];

      const gradient = ctx.createLinearGradient(0, 0, 0, beam.length);

      const saturation = isDarkModeRef.current ? "85%" : "75%";
      const lightness = isDarkModeRef.current ? "65%" : "45%";

      gradient.addColorStop(
        0,
        \`hsla(\${beam.hue}, \${saturation}, \${lightness}, 0)\`
      );
      gradient.addColorStop(
        0.1,
        \`hsla(\${beam.hue}, \${saturation}, \${lightness}, \${
          pulsingOpacity * 0.5
        })\`
      );
      gradient.addColorStop(
        0.4,
        \`hsla(\${beam.hue}, \${saturation}, \${lightness}, \${pulsingOpacity})\`
      );
      gradient.addColorStop(
        0.6,
        \`hsla(\${beam.hue}, \${saturation}, \${lightness}, \${pulsingOpacity})\`
      );
      gradient.addColorStop(
        0.9,
        \`hsla(\${beam.hue}, \${saturation}, \${lightness}, \${
          pulsingOpacity * 0.5
        })\`
      );
      gradient.addColorStop(
        1,
        \`hsla(\${beam.hue}, \${saturation}, \${lightness}, 0)\`
      );

      ctx.fillStyle = gradient;
      ctx.fillRect(-beam.width / 2, 0, beam.width, beam.length);
      ctx.restore();
    }

    function animate() {
      if (!(canvas && ctx)) return;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = "blur(35px)";

      const totalBeams = beamsRef.current.length;
      beamsRef.current.forEach((beam, index) => {
        beam.y -= beam.speed;
        beam.pulse += beam.pulseSpeed;

        // Reset beam when it goes off screen
        if (beam.y + beam.length < -100) {
          resetBeam(beam, index, totalBeams);
        }

        drawBeam(ctx, beam);
      });

      animationFrameRef.current = requestAnimationFrame(animate);
    }

    animate();

    return () => {
      window.removeEventListener("resize", updateCanvasSize);
      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
      observer.disconnect();
    };
  }, [intensity]);

  return (
    <div
      className={cn(
        "relative min-h-screen w-full overflow-hidden bg-neutral-100 dark:bg-neutral-950",
        className
      )}
    >
      <canvas
        className="absolute inset-0"
        ref={canvasRef}
        style={{ filter: "blur(15px)" }}
      />

      <motion.div
        animate={{
          opacity: [0.05, 0.15, 0.05],
        }}
        className="absolute inset-0 bg-neutral-900/5 dark:bg-neutral-950/5"
        style={{
          backdropFilter: "blur(50px)",
        }}
        transition={{
          duration: 10,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <div className="relative z-10 flex h-screen w-full items-center justify-center">
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center">
          <motion.h1
            animate={{ opacity: 1, y: 0 }}
            className="font-semibold text-6xl text-neutral-900 tracking-tighter md:text-7xl lg:text-8xl dark:text-white"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.8 }}
          >
            Beams
            <br />
            Background
          </motion.h1>
        </div>
      </div>
    </div>
  );
}


`,

  "blossom-carousel": `import * as React from "react"
import { cn } from "../../lib/utils"

export function BlossomCarousel({ children, className }: { children: React.ReactNode, className?: string }) {
  return (
    <div className={cn("grid! auto-cols-[200px] snap-x snap-mandatory grid-flow-col gap-4 overflow-x-auto p-4 max-w-full", className)}>
      {children}
    </div>
  )
}

export function BlossomCarouselSlide({ className, children, ...props }: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div className={cn("slide w-full snap-center aspect-[3/4] bg-muted/20 border rounded-2xl flex items-center justify-center relative overflow-hidden", className)} {...props}>
      {children}
    </div>
  )
}


`,

  "copy-button": `"use client"

import { useState } from "react"
import { AnimatePresence, motion } from "motion/react"
import { CheckIcon, CopyIcon } from "lucide-react"
import { Button } from "../ui/coss/button"
import { cn } from "../../lib/utils"

export function CopyButton({ textToCopy = "https://example.com", className }: { textToCopy?: string, className?: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    if (copied) return
    if (textToCopy && navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy)
    }
    setCopied(true)
    setTimeout(() => {
      setCopied(false)
    }, 2000)
  }

  return (
    <Button
      variant="outline"
      onClick={handleCopy}
      className={cn("w-32 select-none overflow-hidden transition-all", className)}
    >
      <div className="relative flex w-4 h-4 mr-2 items-center justify-center shrink-0">
        <AnimatePresence mode="popLayout" initial={false}>
          {copied ? (
            <motion.div
              key="check"
              initial={{ opacity: 0, scale: 0.5, rotate: -45 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.5, y: -10 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CheckIcon className="w-4 h-4 text-green-500" />
            </motion.div>
          ) : (
            <motion.div
              key="copy"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5, rotate: 45 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <CopyIcon className="w-4 h-4 text-muted-foreground" />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <div className="flex items-center justify-center overflow-hidden h-full">
        <span className="font-medium shrink-0">Copy</span>
        <AnimatePresence initial={false}>
          {copied && (
            <motion.span
              key="ed"
              initial={{ width: 0, opacity: 0, x: -10 }}
              animate={{ width: "auto", opacity: 1, x: 0 }}
              exit={{ width: 0, opacity: 0, x: -10 }}
              transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              className="inline-block overflow-hidden whitespace-nowrap font-medium text-green-500 origin-left"
            >
              ed
            </motion.span>
          )}
        </AnimatePresence>
      </div>
    </Button>
  )
}


`,

  "cosmic-spectrum": `"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import TextPlugin from "gsap/TextPlugin";

gsap.registerPlugin(ScrollTrigger, TextPlugin);

interface CosmicSpectrumProps {
  color?:
    | "original"
    | "blue-pink"
    | "blue-orange"
    | "sunset"
    | "purple"
    | "monochrome"
    | "pink-purple"
    | "blue-black"
    | "beige-black";
  blur?: boolean;
}

export function CosmicSpectrum({ color = "original", blur = false }: CosmicSpectrumProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const colorThemes = {
    original: ["#340B05", "#0358F7", "#5092C7", "#E1ECFE", "#FFD400", "#FA3D1D", "#FD02F5", "#FFC0FD"],
    "blue-pink": ["#1E3A8A", "#3B82F6", "#A855F7", "#EC4899", "#F472B6", "#F9A8D4", "#FBCFE8", "#FDF2F8"],
    "blue-orange": ["#1E40AF", "#3B82F6", "#60A5FA", "#FFFFFF", "#FED7AA", "#FB923C", "#EA580C", "#9A3412"],
    sunset: ["#FEF3C7", "#FCD34D", "#F59E0B", "#D97706", "#B45309", "#92400E", "#78350F", "#451A03"],
    purple: ["#F3E8FF", "#E9D5FF", "#D8B4FE", "#C084FC", "#A855F7", "#9333EA", "#7C3AED", "#6B21B6"],
    monochrome: ["#1A1A1A", "#404040", "#666666", "#999999", "#CCCCCC", "#E5E5E5", "#F5F5F5", "#FFFFFF"],
    "pink-purple": ["#FDF2F8", "#FCE7F3", "#F9A8D4", "#F472B6", "#EC4899", "#BE185D", "#831843", "#500724"],
    "blue-black": ["#000000", "#0F172A", "#1E293B", "#334155", "#475569", "#64748B", "#94A3B8", "#CBD5E1"],
    "beige-black": ["#FEF3C7", "#F59E0B", "#D97706", "#92400E", "#451A03", "#1C1917", "#0C0A09", "#000000"],
  };

  const darkThemes = ["blue-black", "beige-black", "monochrome"];
  const isDarkTheme = darkThemes.includes(color);

  useEffect(() => {
    setupAnimations();
    return () => {
      ScrollTrigger.getAll().forEach(t => t.kill());
    }
  }, [color]);

  const setupAnimations = () => {
    if (!containerRef.current) return;

    // Hero animations
    const heroTl = gsap.timeline({ delay: 0.5 });

    // Title animation
    const titleChars = containerRef.current.querySelectorAll(".hero-title .char");
    if (titleChars.length > 0) {
      gsap.set(titleChars, { opacity: 0, filter: "blur(8px)", x: -20 });
      heroTl.to(
        titleChars,
        {
          opacity: 1,
          filter: "blur(0px)",
          x: 0,
          duration: 0.8,
          stagger: 0.03,
          ease: "power2.out",
        },
        0
      );
    }

    // Scroll hint animation
    const scrollHintChars = containerRef.current.querySelectorAll(".scroll-hint .char");
    if (scrollHintChars.length > 0) {
      gsap.set(scrollHintChars, { opacity: 0, filter: "blur(3px)" });
      gsap.to(scrollHintChars, {
        opacity: 1,
        filter: "blur(0px)",
        duration: 0.6,
        stagger: { each: 0.08, repeat: -1, yoyo: true },
        ease: "sine.inOut",
        delay: 1,
      });
    }

    // Scroll-triggered animations
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current.querySelector(".animation-section"),
        start: "top bottom",
        end: "bottom bottom",
        scrub: 1,
      },
    });

    const wavelengthLabels = containerRef.current.querySelectorAll(".wavelength-label");
    const mainTitle = containerRef.current.querySelector(".main-title");

    gsap.set([...wavelengthLabels, mainTitle], { opacity: 0, y: 30, filter: "blur(8px)" });

    tl.to(containerRef.current.querySelector(".svg-container"), { opacity: 1, duration: 0.01 }, 0)
      .to(containerRef.current.querySelector(".text-grid"), { opacity: 1, duration: 0.01 }, 0)
      .to(containerRef.current.querySelector(".main-title"), { opacity: 1, duration: 0.01 }, 0)
      .to(
        containerRef.current.querySelector(".svg-container"),
        {
          transform: "scaleY(0.05) translateY(-30px)",
          duration: 0.3,
          ease: "power2.out",
        },
        0
      )
      .to(
        containerRef.current.querySelector(".svg-container"),
        {
          transform: "scaleY(1) translateY(0px)",
          duration: 1.2,
          ease: "power2.out",
        },
        0.3
      )
      .to(
        containerRef.current.querySelectorAll(".nav-bottom-left, .nav-bottom-right, .nav-bottom-center"),
        {
          opacity: 0,
          duration: 0.6,
          ease: "power2.out",
        },
        0.2
      )
      .to(
        [...wavelengthLabels, mainTitle],
        {
          duration: 0.8,
          y: 0,
          opacity: 1,
          filter: "blur(0px)",
          stagger: 0.08,
          ease: "power2.out",
        },
        0.9
      );

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  };

  const splitText = (text: string, className = "") => {
    return text.split("").map((char, index) => (
      <span key={index} className={\`char \${className}\`}>
        {char === " " ? "\\u00A0" : char}
      </span>
    ));
  };

  const currentColors = colorThemes[color] || colorThemes.original;

  return (
    <div ref={containerRef} className="relative min-h-screen overflow-x-hidden bg-[#0A0A0A] text-white">
      {/* Gradient Overlay */}
      <div
        className="gradient-overlay fixed top-20 left-0 w-screen h-screen pointer-events-none z-[5] opacity-0 transition-opacity duration-600"
        style={{ filter: "blur(60px)" }}
      />

      {/* Hero Section */}
      <section className="h-screen w-full p-8 flex flex-col justify-center relative">
        <h1 className="hero-title text-center text-5xl md:text-7xl font-bold tracking-tighter transition-colors duration-300">
          {splitText("Cosmic Spectrum")}
        </h1>
      </section>

      <div className="nav-bottom-center fixed bottom-8 left-1/2 transform -translate-x-1/2 z-[1000] pointer-events-auto text-xs uppercase tracking-wide transition-colors duration-300 scroll-hint">
        {splitText("Scroll to explore")}
      </div>
      
      <div className="h-[50vh]" />

      {/* Animation Section */}
      <div className="animation-section h-[150vh] relative">
        <div className="fixed bottom-0 left-0 right-0 h-screen pointer-events-none z-10 w-full overflow-hidden">
          {/* SVG Container */}
          <div
            className="svg-container absolute bottom-0 left-0 right-0 h-screen opacity-0 z-[15] overflow-visible"
            style={{
              transformOrigin: "bottom",
              transform: "scaleY(0.05) translateY(100vh)",
              willChange: "transform, opacity, filter",
            }}
          >
            <svg className="w-full h-full" viewBox="0 0 1567 584" preserveAspectRatio="none" fill="none">
              <g clipPath="url(#clip)" filter={blur ? "url(#blur)" : undefined}>
                <path d="M1219 584H1393V184H1219V584Z" fill="url(#grad0)" />
                <path d="M1045 584H1219V104H1045V584Z" fill="url(#grad1)" />
                <path d="M348 584H174L174 184H348L348 584Z" fill="url(#grad2)" />
                <path d="M522 584H348L348 104H522L522 584Z" fill="url(#grad3)" />
                <path d="M697 584H522L522 54H697L697 584Z" fill="url(#grad4)" />
                <path d="M870 584H1045V54H870V584Z" fill="url(#grad5)" />
                <path d="M870 584H697L697 0H870L870 584Z" fill="url(#grad6)" />
                <path d="M174 585H0.000183105L-3.75875e-06 295H174L174 585Z" fill="url(#grad7)" />
                <path d="M1393 584H1567V294H1393V584Z" fill="url(#grad8)" />
              </g>
              <defs>
                <filter
                  id="blur"
                  x="-30"
                  y="-30"
                  width="1627"
                  height="644"
                  filterUnits="userSpaceOnUse"
                  colorInterpolationFilters="sRGB"
                >
                  <feFlood floodOpacity="0" result="BackgroundImageFix" />
                  <feBlend mode="normal" in="SourceGraphic" in2="BackgroundImageFix" result="shape" />
                  <feGaussianBlur stdDeviation="15" result="effect1_foregroundBlur" />
                </filter>
                {Array.from({ length: 9 }, (_, i) => (
                  <linearGradient
                    key={i}
                    id={\`grad\${i}\`}
                    x1="50%"
                    y1="100%"
                    x2="50%"
                    y2="0%"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor={currentColors[0]} />
                    <stop offset="0.182709" stopColor={currentColors[1]} />
                    <stop offset="0.283673" stopColor={currentColors[2]} />
                    <stop offset="0.413484" stopColor={currentColors[3]} />
                    <stop offset="0.586565" stopColor={currentColors[4]} />
                    <stop offset="0.682722" stopColor={currentColors[5]} />
                    <stop offset="0.802892" stopColor={currentColors[6]} />
                    <stop offset="1" stopColor={currentColors[7]} stopOpacity="0" />
                  </linearGradient>
                ))}
                <clipPath id="clip">
                  <rect width="1567" height="584" fill="white" />
                </clipPath>
              </defs>
            </svg>
          </div>

          {/* Main Title */}
          <div
            className="main-title absolute bottom-1/2 left-1/2 transform translate-x-[-50%] translate-y-1/2 text-center text-sm md:text-xl font-medium tracking-wide z-20 opacity-0 transition-colors duration-300"
            style={{ color: isDarkTheme ? "#ffffff" : "#ffffff" }}
          >
            Where Design Becomes Communication
            <br />
            Across the World
          </div>
        </div>
      </div>
    </div>
  );
}

export default CosmicSpectrum;


`,

  "coss-toolbar": `"use client";

/**
 * @author: @dorianbaffier
 * @description: Toolbar
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {
  Bell,
  CircleUserRound,
  Edit2,
  FileDown,
  Frame,
  Layers,
  Lock,
  type LucideIcon,
  MousePointer2,
  Move,
  Palette,
  Shapes,
  Share2,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "../../lib/utils";

interface ToolbarItem {
  id: string;
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface ToolbarProps {
  items?: ToolbarItem[];
  defaultSelected?: string;
  className?: string;
  activeColor?: string;
  onSelect?: (itemId: string) => void;
}

const DEFAULT_TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: "select", title: "Select", icon: MousePointer2 },
  { id: "move", title: "Move", icon: Move },
  { id: "shapes", title: "Shapes", icon: Shapes },
  { id: "layers", title: "Layers", icon: Layers },
  { id: "frame", title: "Frame", icon: Frame },
  { id: "properties", title: "Properties", icon: SlidersHorizontal },
  { id: "export", title: "Export", icon: FileDown },
  { id: "share", title: "Share", icon: Share2 },
  { id: "notifications", title: "Notifications", icon: Bell },
  { id: "profile", title: "Profile", icon: CircleUserRound },
  { id: "appearance", title: "Appearance", icon: Palette },
];

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const notificationVariants = {
  initial: { opacity: 0, y: 10 },
  animate: { opacity: 1, y: -10 },
  exit: { opacity: 0, y: -20 },
};

const lineVariants = {
  initial: { scaleX: 0, x: "-50%" },
  animate: {
    scaleX: 1,
    x: "0%",
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    scaleX: 0,
    x: "50%",
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const transition = { type: "spring", bounce: 0, duration: 0.4 };

export function Toolbar({
  items = DEFAULT_TOOLBAR_ITEMS,
  defaultSelected = "select",
  className,
  activeColor = "text-primary",
  onSelect,
}: ToolbarProps) {
  const [selected, setSelected] = React.useState<string | null>(
    defaultSelected
  );
  const [isToggled, setIsToggled] = React.useState(false);
  const [activeNotification, setActiveNotification] = React.useState<
    string | null
  >(null);
  const outsideClickRef = React.useRef(null);

  const handleItemClick = (itemId: string) => {
    setSelected(selected === itemId ? null : itemId);
    onSelect?.(itemId);
    setActiveNotification(itemId);
    setTimeout(() => setActiveNotification(null), 1500);
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative flex items-center gap-3 p-2",
          "bg-background",
          "rounded-xl border border-border/50 shadow-sm",
          "transition-all duration-200",
          className
        )}
        ref={outsideClickRef}
      >
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              animate="animate"
              className="absolute -top-8 left-1/2 z-50 -translate-x-1/2 transform"
              exit="exit"
              initial="initial"
              transition={{ duration: 0.3 }}
              variants={notificationVariants as any}
            >
              <div className="rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs font-medium whitespace-nowrap shadow-md">
                {items.find((item) => item.id === activeNotification)?.title}{" "}
                clicked!
              </div>
              <motion.div
                animate="animate"
                className="absolute -bottom-1 left-1/2 h-[2px] w-full origin-left bg-primary"
                exit="exit"
                initial="initial"
                variants={lineVariants as any}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {items.map((item) => (
            <motion.button
              animate="animate"
              className={cn(
                "relative flex items-center rounded-none px-3 py-2",
                "font-medium text-sm transition-colors duration-300",
                selected === item.id
                  ? "rounded-lg bg-[#1F9CFE] text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground rounded-lg"
              )}
              custom={selected === item.id}
              initial={false}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              transition={transition as any}
              variants={buttonVariants as any}
            >
              <item.icon
                className={cn(selected === item.id && "text-white")}
                size={16}
              />
              <AnimatePresence initial={false}>
                {selected === item.id && (
                  <motion.span
                    animate="animate"
                    className="overflow-hidden whitespace-nowrap"
                    exit="exit"
                    initial="initial"
                    transition={transition as any}
                    variants={spanVariants as any}
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}

          <motion.button
            className={cn(
              "flex items-center gap-2 px-4 py-2",
              "rounded-xl border shadow-sm transition-all duration-200 ml-2",
              "hover:shadow-md active:border-primary/50",
              isToggled
                ? [
                    "bg-[#1F9CFE] text-white",
                    "border-[#1F9CFE]/30",
                    "hover:bg-[#1F9CFE]/90",
                    "hover:border-[#1F9CFE]/40",
                  ]
                : [
                    "bg-background text-muted-foreground",
                    "border-border/30",
                    "hover:bg-muted",
                    "hover:text-foreground",
                    "hover:border-border/40",
                  ]
            )}
            onClick={() => setIsToggled(!isToggled)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isToggled ? (
              <Edit2 className="h-3.5 w-3.5 shrink-0" />
            ) : (
              <Lock className="h-3.5 w-3.5 shrink-0" />
            )}
            <span className="font-medium text-sm">
              {isToggled ? "On" : "Off"}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;


`,

  "decor-icon": `import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const DecorIconVariants = cva(
  "pointer-events-none absolute z-10 size-5 shrink-0 stroke-1 stroke-muted-foreground",
  {
    variants: {
      position: {
        "top-left":
          "top-0 left-0 -translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)]",
        "top-right":
          "top-0 right-0 translate-x-[calc(50%+0.5px)] -translate-y-[calc(50%+0.5px)]",
        "bottom-right":
          "right-0 bottom-0 translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)]",
        "bottom-left":
          "bottom-0 left-0 -translate-x-[calc(50%+0.5px)] translate-y-[calc(50%+0.5px)]",
      },
    },
    defaultVariants: {
      position: "top-left",
    },
  }
);

type DecorIconProps = React.ComponentProps<"svg"> &
  VariantProps<typeof DecorIconVariants>;

export function DecorIcon({ position, className, ...props }: DecorIconProps) {
  return (
    <svg
      aria-hidden="true"
      className={cn(DecorIconVariants({ position, className }))}
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}


`,

  "dia-text-reveal": `"use client"
import { useEffect, useRef, useState } from "react"
import {
  animate,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useTransform,
  type HTMLMotionProps,
} from "motion/react"
import { cn } from "../../lib/utils"

const DEFAULT_COLORS = ["#c679c4", "#fa3d1d", "#ffb005", "#e1e1fe", "#0358f7"]
const BAND_HALF = 17
const SWEEP_START = -BAND_HALF
const SWEEP_END = 100 + BAND_HALF

const sweepEase = (t: number) =>
  t < 0.5 ? 4 * t ** 3 : 1 - (-2 * t + 2) ** 3 / 2

function buildGradient(pos: number, colors: string[], textColor: string) {
  const bandStart = pos - BAND_HALF
  const bandEnd = pos + BAND_HALF
  if (bandStart >= 100) {
    return \`linear-gradient(90deg, \${textColor}, \${textColor})\`
  }
  const n = colors.length
  const parts: string[] = []
  if (bandStart > 0)
    parts.push(\`\${textColor} 0%\`, \`\${textColor} \${bandStart.toFixed(2)}%\`)
  colors.forEach((c, i) => {
    const pct = n === 1 ? pos : bandStart + (i / (n - 1)) * BAND_HALF * 2
    parts.push(\`\${c} \${pct.toFixed(2)}%\`)
  })
  if (bandEnd < 100)
    parts.push(\`transparent \${bandEnd.toFixed(2)}%\`, \`transparent 100%\`)
  return \`linear-gradient(90deg, \${parts.join(", ")})\`
}

function measureWidths(el: HTMLElement, texts: string[]) {
  const ghost = el.cloneNode() as HTMLElement
  Object.assign(ghost.style, {
    position: "absolute",
    visibility: "hidden",
    pointerEvents: "none",
    width: "auto",
    whiteSpace: "nowrap",
  })
  el.parentElement!.appendChild(ghost)
  const widths = texts.map((t) => {
    ghost.textContent = t
    return ghost.getBoundingClientRect().width
  })
  ghost.remove()
  return widths
}

/**
 * Props for {@link DiaTextReveal}.
 */
export interface DiaTextRevealProps extends Omit<
  HTMLMotionProps<"span">,
  "ref" | "children" | "style" | "animate" | "transition" | "color"
> {
  /**
   * Text to reveal. Pass multiple strings to rotate when {@link DiaTextRevealProps.repeat} is \`true\`.
   */
  text: string | string[]
  /**
   * Colors sampled across the moving gradient band. Defaults to a built-in palette.
   */
  colors?: string[]
  /**
   * CSS color for revealed text after the sweep and for leading/trailing regions during the animation.
   * @defaultValue \`"var(--foreground)"\`
   */
  textColor?: string
  /**
   * Duration of one sweep pass, in seconds.
   * @defaultValue \`1.5\`
   */
  duration?: number
  /**
   * Delay before the sweep starts, in seconds.
   * @defaultValue \`0\`
   */
  delay?: number
  /**
   * When \`text\` is an array, replay the sweep and advance to the next string after each completion.
   * @defaultValue \`false\`
   */
  repeat?: boolean
  /**
   * Pause between cycles when {@link DiaTextRevealProps.repeat} is \`true\`, in seconds.
   * @defaultValue \`0.5\`
   */
  repeatDelay?: number
  /**
   * If \`true\`, the animation starts only after the element enters the viewport.
   * @defaultValue \`true\`
   */
  startOnView?: boolean
  /**
   * Passed to \`useInView\`: if \`true\`, in-view detection fires at most once (no replay on scroll-back).
   * @defaultValue \`true\`
   */
  once?: boolean
  /**
   * Additional class names for the animated \`span\` (e.g. typography utilities).
   */
  className?: string
  /**
   * When \`text\` has multiple entries, use the widest string's width for layout instead of animating width per line.
   * @defaultValue \`false\`
   */
  fixedWidth?: boolean
}

export function DiaTextReveal({
  text,
  colors = DEFAULT_COLORS,
  textColor = "var(--foreground)",
  duration = 1.5,
  delay = 0,
  repeat = false,
  repeatDelay = 0.5,
  startOnView = true,
  once = true,
  className,
  fixedWidth = false,
  ...props
}: DiaTextRevealProps) {
  const texts = Array.isArray(text) ? text : [text]
  const isMulti = texts.length > 1
  const prefersReducedMotion = useReducedMotion()
  const spanRef = useRef<HTMLSpanElement>(null)
  const optsRef = useRef({
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  })
  optsRef.current = {
    colors,
    textColor,
    duration,
    delay,
    repeat,
    repeatDelay,
    texts,
  }
  const indexRef = useRef(0)
  const hasPlayedRef = useRef(false)
  const timerRef = useRef<ReturnType<typeof setTimeout>>(undefined)
  const playRef = useRef<() => void>(null!)
  const stopRef = useRef<(() => void) | null>(null)
  const [activeIndex, setActiveIndex] = useState(0)
  const [measuredWidths, setMeasuredWidths] = useState<number[]>([])
  const sweepPos = useMotionValue(SWEEP_START)
  const backgroundImage = useTransform(sweepPos, (pos) =>
    buildGradient(pos, optsRef.current.colors, optsRef.current.textColor)
  )
  const isInView = useInView(spanRef, { once, amount: 0.1 })

  useEffect(() => {
    const el = spanRef.current
    if (!el || !isMulti) return
    setMeasuredWidths(measureWidths(el, texts))
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Array.isArray(text) ? text.join("\\0") : text])

  playRef.current = () => {
    const { duration, delay, repeat, repeatDelay, texts } = optsRef.current
    sweepPos.set(SWEEP_START)
    const controls = animate(sweepPos, SWEEP_END, {
      duration,
      delay,
      ease: sweepEase,
      onComplete() {
        if (!repeat) return
        timerRef.current = setTimeout(() => {
          const next = (indexRef.current + 1) % texts.length
          indexRef.current = next
          setActiveIndex(next)
          playRef.current()
        }, repeatDelay * 1000)
      },
    })
    stopRef.current = () => controls.stop()
  }

  useEffect(() => {
    if (prefersReducedMotion) {
      sweepPos.set(SWEEP_END)
      return
    }
    if (startOnView && !isInView) return
    if (once && hasPlayedRef.current) return
    hasPlayedRef.current = true
    playRef.current()
    return () => {
      stopRef.current?.()
      clearTimeout(timerRef.current)
      hasPlayedRef.current = false
    }
  }, [isInView, startOnView, once, prefersReducedMotion, sweepPos])

  const fixedW =
    isMulti && fixedWidth && measuredWidths.length > 0
      ? Math.max(...measuredWidths)
      : undefined
  const animatedW =
    isMulti && !fixedWidth && measuredWidths[activeIndex] != null
      ? measuredWidths[activeIndex]
      : undefined

  return (
    <motion.span
      ref={spanRef}
      className={cn("align-bottom leading-[100%] text-inherit", className)}
      style={{
        transform: "translateY(-2px)",
        color: "transparent",
        backgroundClip: "text",
        WebkitBackgroundClip: "text",
        backgroundSize: "100% 100%",
        backgroundImage,
        ...(isMulti && {
          display: "inline-block",
          overflow: "hidden",
          whiteSpace: "nowrap",
          verticalAlign: "text-center",
          ...(fixedW != null && { width: fixedW }),
        }),
      }}
      animate={animatedW != null ? { width: animatedW } : undefined}
      transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
      {...props}
    >
      {texts[activeIndex]}
    </motion.span>
  )
}

export default DiaTextReveal


`,

  "dock-menu": `import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';

export interface DockMenuItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick?: () => void;
  href?: string;
}

export interface DockMenuProps {
  items: DockMenuItem[];
  position?: 'top-left' | 'top-center' | 'top-right' | 'bottom-left' | 'bottom-center' | 'bottom-right';
  direction?: 'horizontal' | 'vertical';
  className?: string;
}

export function DockMenu({
  items,
  position = 'bottom-center',
  direction = 'horizontal',
  className,
}: DockMenuProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const getPositionClasses = () => {
    switch (position) {
      case 'top-left':
        return 'top-6 left-6';
      case 'top-center':
        return 'top-6 left-1/2 -translate-x-1/2';
      case 'top-right':
        return 'top-6 right-6';
      case 'bottom-left':
        return 'bottom-6 left-6';
      case 'bottom-center':
        return 'bottom-6 left-1/2 -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-6 right-6';
      default:
        return 'bottom-6 left-1/2 -translate-x-1/2';
    }
  };

  const isVertical = direction === 'vertical';

  return (
    <div
      className={cn(
        'fixed z-50 flex items-center p-2 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl',
        isVertical ? 'flex-col gap-2' : 'flex-row gap-2',
        getPositionClasses(),
        className
      )}
      style={{
        boxShadow: '0 8px 32px 0 rgba(0, 0, 0, 0.1)',
      }}
      onMouseLeave={() => setHoveredIndex(null)}
    >
      {items.map((item, index) => {
        const isHovered = hoveredIndex === index;
        const distance = hoveredIndex !== null ? Math.abs(hoveredIndex - index) : 0;
        
        let size = 48; // default size (w-12 h-12 is 48px)
        if (isHovered) {
          size = 64;
        } else if (distance === 1) {
          size = 56;
        }

        return (
          <motion.div key={item.id} layout className="relative group flex items-center justify-center">
            <motion.button
              type="button"
              layout
              className={cn(
                'relative flex items-center justify-center rounded-xl text-neutral-700 bg-white/60 backdrop-blur-md shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-colors duration-200',
                'hover:bg-white/90 hover:text-black hover:shadow-[0_4px_20px_rgba(0,0,0,0.2)]',
                'dark:text-neutral-300 dark:bg-neutral-800/50 dark:hover:bg-neutral-700 dark:hover:text-white',
                'border border-white/40 dark:border-neutral-700'
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onClick={item.onClick}
              initial={{ width: 48, height: 48 }}
              animate={{ 
                width: size,
                height: size,
                y: isHovered && !isVertical ? -4 : 0,
                x: isHovered && isVertical ? (position.includes('left') ? 4 : -4) : 0,
              }}
              transition={{
                type: 'spring',
                stiffness: 350,
                damping: 25,
                mass: 1.5,
              }}
            >
              <motion.span
                layout
                initial={{ scale: 1 }}
                animate={{ scale: isHovered ? 1.2 : distance === 1 ? 1.1 : 1 }}
                transition={{
                  type: 'spring',
                  stiffness: 350,
                  damping: 25,
                }}
                className="relative z-10 flex items-center justify-center pointer-events-none"
              >
                 {item.icon}
              </motion.span>
            </motion.button>
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0, y: isVertical ? 0 : 10, x: isVertical ? (position.includes('left') ? -10 : 10) : 0, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, x: 0, scale: 1 }}
                  exit={{ opacity: 0, y: isVertical ? 0 : 5, x: isVertical ? (position.includes('left') ? -5 : 5) : 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  className={cn(
                    'absolute whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-semibold tracking-wide text-neutral-900 bg-white/90 shadow-xl border border-black/5 backdrop-blur-md pointer-events-none z-50',
                    isVertical
                      ? position.includes('left')
                        ? 'left-full ml-4 top-1/2 -translate-y-1/2'
                        : 'right-full mr-4 top-1/2 -translate-y-1/2'
                      : position.includes('top')
                      ? 'top-full mt-4 left-1/2 -translate-x-1/2'
                      : 'bottom-full mb-4 left-1/2 -translate-x-1/2'
                  )}
                >
                  {item.label}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
}


`,

  "dynamic-scroll-progress": `import React, { useState } from 'react';
import { motion, useScroll, useTransform, useMotionValueEvent } from 'motion/react';
import { ChevronUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface ScrollSection {
  id: string;
  title: string;
}

export interface DynamicScrollProgressProps {
  sections: ScrollSection[];
  containerRef?: React.RefObject<any>;
  className?: string;
  position?: 'bottom-left' | 'bottom-center' | 'bottom-right';
}

export function DynamicScrollProgress({
  sections,
  containerRef,
  className,
  position = 'bottom-left',
}: DynamicScrollProgressProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Bind scroll hook to custom container if provided
  const { scrollYProgress } = useScroll(
    containerRef ? { container: containerRef } : {}
  );
  
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, 'change', (latest) => {
    setProgress(Math.round(latest * 100));
  });

  const line1Progress = useTransform(scrollYProgress, [0, 0.333], ['0%', '100%']);
  const line2Progress = useTransform(scrollYProgress, [0.333, 0.666], ['0%', '100%']);
  const line3Progress = useTransform(scrollYProgress, [0.666, 1], ['0%', '100%']);

  const getPositionClasses = () => {
    switch (position) {
      case 'bottom-left':
        return 'bottom-[10vh] left-10 md:translate-x-0';
      case 'bottom-center':
        return 'bottom-[10vh] left-1/2 -translate-x-1/2';
      case 'bottom-right':
        return 'bottom-[10vh] right-10 md:translate-x-0';
      default:
        return 'bottom-[10vh] left-10 md:translate-x-0';
    }
  };

  return (
    <motion.div
      initial={false}
      animate={{
        width: isOpen ? 260 : 200,
        height: isOpen ? 320 : 44,
      }}
      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      className={cn(
        'fixed z-[60] flex cursor-pointer flex-col justify-end gap-3 overflow-hidden bg-black/90 dark:bg-zinc-950/95 py-2 rounded-[24px] border border-white/10 dark:border-zinc-800 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl',
        getPositionClasses(),
        className
      )}
      style={{ maxWidth: 'calc(-32px + 100vw)' }}
      onClick={() => {
        if (!isOpen) setIsOpen(true);
      }}
    >
      <div className="flex-1 overflow-y-auto px-4 flex flex-col justify-end no-scrollbar">
        {/* Expanded Section List */}
        <motion.div
          animate={{ opacity: isOpen ? 1 : 0 }}
          transition={{ duration: 0.2 }}
          className="flex flex-col gap-4 py-4"
          style={{ display: isOpen ? 'flex' : 'none' }}
        >
          {sections.map((sec, i) => (
            <button
              key={sec.id}
              onClick={(e) => {
                e.stopPropagation();
                const element = document.getElementById(sec.id);
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else if (containerRef?.current) {
                  // Fallback for custom scrolling containers
                  const targetElement = containerRef.current.querySelector(\`#\${sec.id}\`);
                  targetElement?.scrollIntoView({ behavior: 'smooth' });
                }
                setIsOpen(false);
              }}
              className="text-left text-xs font-semibold text-neutral-400 hover:text-white dark:text-zinc-400 dark:hover:text-zinc-100 transition-colors uppercase tracking-wider truncate"
            >
              {sec.title}
            </button>
          ))}
        </motion.div>
      </div>

      {/* Control Bar (always visible) */}
      <div
        className="flex w-full items-center justify-between px-4 shrink-0 h-8"
        onClick={(e) => {
          if (isOpen) {
            e.stopPropagation();
            setIsOpen(false);
          }
        }}
      >
        <div className="flex items-center gap-3 text-white">
          <div className="flex flex-col gap-[3.5px] pt-1">
            <div className="relative h-[1.5px] w-7 overflow-hidden bg-neutral-800 dark:bg-zinc-800">
              <motion.div className="absolute top-0 left-0 h-full bg-white dark:bg-white" style={{ width: line1Progress }} />
            </div>
            <div className="relative h-[1.5px] w-10 overflow-hidden bg-neutral-800 dark:bg-zinc-800">
              <motion.div className="absolute top-0 left-0 h-full bg-white dark:bg-white" style={{ width: line2Progress }} />
            </div>
            <div className="relative h-[1.5px] w-5 overflow-hidden bg-neutral-800 dark:bg-zinc-800">
              <motion.div className="absolute top-0 left-0 h-full bg-white dark:bg-white" style={{ width: line3Progress }} />
            </div>
          </div>
          <div className="flex items-center gap-1 select-none">
            <span className="text-xs font-bold tracking-widest uppercase">Index</span>
            <ChevronUp
              size={14}
              className={cn(
                'text-neutral-400 transition-transform duration-300',
                isOpen ? 'rotate-180' : ''
              )}
            />
          </div>
        </div>
        <div className="flex h-5 items-center justify-center rounded-full bg-white/10 px-2.5 text-[10px] font-bold text-white tabular-nums tracking-wider">
          {progress}%
        </div>
      </div>
    </motion.div>
  );
}


`,

  "falling-pattern": `"use client";

import type React from "react";
import { motion } from "motion/react";
import { cn } from "../../lib/utils";

type FallingPatternProps = React.ComponentProps<"div"> & {
  /** Primary color of the falling elements (default: 'var(--primary)') */
  color?: string;
  /** Background color (default: 'var(--background)') */
  backgroundColor?: string;
  /** Animation duration in seconds (default: 150) */
  duration?: number;
  /** Blur intensity for the overlay effect (default: '1em') */
  blurIntensity?: string;
  /** Pattern density - affects spacing (default: 1) */
  density?: number;
};

export function FallingPattern({
  color = "var(--color-slate-400, #94a3b8)",
  backgroundColor = "transparent",
  duration = 150,
  blurIntensity = "1em",
  density = 1,
  className,
}: FallingPatternProps) {
  // Generate background image style with customizable color
  const generateBackgroundImage = () => {
    const patterns = [
      // Row 1
      \`radial-gradient(4px 100px at 0px 235px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 235px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 117.5px, \${color} 100%, transparent 150%)\`,
      // Row 2
      \`radial-gradient(4px 100px at 0px 252px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 252px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 126px, \${color} 100%, transparent 150%)\`,
      // Row 3
      \`radial-gradient(4px 100px at 0px 150px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 150px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 75px, \${color} 100%, transparent 150%)\`,
      // Row 4
      \`radial-gradient(4px 100px at 0px 253px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 253px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 126.5px, \${color} 100%, transparent 150%)\`,
      // Row 5
      \`radial-gradient(4px 100px at 0px 204px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 204px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 102px, \${color} 100%, transparent 150%)\`,
      // Row 6
      \`radial-gradient(4px 100px at 0px 134px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 134px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 67px, \${color} 100%, transparent 150%)\`,
      // Row 7
      \`radial-gradient(4px 100px at 0px 179px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 179px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 89.5px, \${color} 100%, transparent 150%)\`,
      // Row 8
      \`radial-gradient(4px 100px at 0px 299px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 299px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 149.5px, \${color} 100%, transparent 150%)\`,
      // Row 9
      \`radial-gradient(4px 100px at 0px 215px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 215px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 107.5px, \${color} 100%, transparent 150%)\`,
      // Row 10
      \`radial-gradient(4px 100px at 0px 281px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 281px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 140.5px, \${color} 100%, transparent 150%)\`,
      // Row 11
      \`radial-gradient(4px 100px at 0px 158px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 158px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 79px, \${color} 100%, transparent 150%)\`,
      // Row 12
      \`radial-gradient(4px 100px at 0px 210px, \${color}, transparent)\`,
      \`radial-gradient(4px 100px at 300px 210px, \${color}, transparent)\`,
      \`radial-gradient(1.5px 1.5px at 150px 105px, \${color} 100%, transparent 150%)\`,
    ];
    return patterns.join(", ");
  };

  const backgroundSizes = [
    "300px 235px",
    "300px 235px",
    "300px 235px",
    "300px 252px",
    "300px 252px",
    "300px 252px",
    "300px 150px",
    "300px 150px",
    "300px 150px",
    "300px 253px",
    "300px 253px",
    "300px 253px",
    "300px 204px",
    "300px 204px",
    "300px 204px",
    "300px 134px",
    "300px 134px",
    "300px 134px",
    "300px 179px",
    "300px 179px",
    "300px 179px",
    "300px 299px",
    "300px 299px",
    "300px 299px",
    "300px 215px",
    "300px 215px",
    "300px 215px",
    "300px 281px",
    "300px 281px",
    "300px 281px",
    "300px 158px",
    "300px 158px",
    "300px 158px",
    "300px 210px",
    "300px 210px",
  ].join(", ");

  const startPositions =
    "0px 220px, 3px 220px, 151.5px 337.5px, 25px 24px, 28px 24px, 176.5px 150px, 50px 16px, 53px 16px, 201.5px 91px, 75px 224px, 78px 224px, 226.5px 230.5px, 100px 19px, 103px 19px, 251.5px 121px, 125px 120px, 128px 120px, 276.5px 187px, 150px 31px, 153px 31px, 301.5px 120.5px, 175px 235px, 178px 235px, 326.5px 384.5px, 200px 121px, 203px 121px, 351.5px 228.5px, 225px 224px, 228px 224px, 376.5px 364.5px, 250px 26px, 253px 26px, 401.5px 105px, 275px 75px, 278px 75px, 426.5px 180px";
  const endPositions =
    "0px 6800px, 3px 6800px, 151.5px 6917.5px, 25px 13632px, 28px 13632px, 176.5px 13758px, 50px 5416px, 53px 5416px, 201.5px 5491px, 75px 17175px, 78px 17175px, 226.5px 17301.5px, 100px 5119px, 103px 5119px, 251.5px 5221px, 125px 8428px, 128px 8428px, 276.5px 8495px, 150px 9876px, 153px 9876px, 301.5px 9965.5px, 175px 13391px, 178px 13391px, 326.5px 13540.5px, 200px 14741px, 203px 14741px, 351.5px 14848.5px, 225px 18770px, 228px 18770px, 376.5px 18910.5px, 250px 5082px, 253px 5082px, 401.5px 5161px, 275px 6375px, 278px 6375px, 426.5px 6480px";
  return (
    <div className={cn("relative h-full w-full p-1", className)}>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}
        className="size-full"
      >
        <motion.div
          className="relative size-full z-0"
          style={{
            backgroundColor,
            backgroundImage: generateBackgroundImage(),
            backgroundSize: backgroundSizes,
          }}
          variants={{
            initial: {
              backgroundPosition: startPositions,
            },
            animate: {
              backgroundPosition: [startPositions, endPositions],
              transition: {
                duration: duration,
                ease: "linear",
                repeat: Number.POSITIVE_INFINITY,
              },
            },
          }}
          initial="initial"
          animate="animate"
        />
      </motion.div>
      {/* Dot pattern mask to cut streaks into dots */}
      <div
        className="absolute inset-0 z-[1] dark:brightness-[6]"
        style={{
          backgroundImage: \`radial-gradient(circle at 50% 50%, transparent 0, transparent 2px, \${backgroundColor} 2px)\`,
          backgroundSize: \`\${8 * density}px \${8 * density}px\`,
        }}
      />
      {/* Blur overlay for the outside edges */}
      <div
        className="absolute inset-0 z-[2] pointer-events-none"
        style={{
          backdropFilter: \`blur(\${blurIntensity})\`,
          WebkitBackdropFilter: \`blur(\${blurIntensity})\`,
          maskImage: \`radial-gradient(ellipse at center, transparent 20%, black 80%)\`,
          WebkitMaskImage: \`radial-gradient(ellipse at center, transparent 20%, black 80%)\`,
        }}
      />
    </div>
  );
}

export default FallingPattern;


`,

  "flip-clock": `"use client";

import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import {
  FC,
  HTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useState,
} from "react";

// ─── Keyframe variants ────────────────────────────────────────────────────────

const flipUnitVariants = cva(
  "relative subpixel-antialiased perspective-[1000px] rounded-md overflow-hidden select-none",
  {
    variants: {
      size: {
        sm: "w-10 min-w-10 h-14 text-3xl",
        md: "w-14 min-w-14 h-20 text-5xl",
        lg: "w-17 min-w-17 h-24 text-6xl",
        xl: "w-22 min-w-22 h-32 text-8xl",
      },
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

// ─── FlipUnit ─────────────────────────────────────────────────────────────────

interface FlipUnitProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flipUnitVariants> {
  digit: number | string;
}

const commonCardStyle = cn("absolute inset-x-0 overflow-hidden h-1/2 bg-inherit text-inherit");

const FlipUnit: FC<FlipUnitProps> = memo(function FlipUnit({ digit, size, variant, className }) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setFlipping(false);
        setPrevDigit(digit);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  return (
    <div className={cn(flipUnitVariants({ size, variant }), className)}>
      {/* Background Top – new digit waiting */}
      <div className={cn(commonCardStyle, "rounded-t-lg top-0")}>
        <DigitSpan position="top">{digit}</DigitSpan>
      </div>
      {/* Background Bottom – old digit staying */}
      <div className={cn(commonCardStyle, "rounded-b-lg translate-y-full")}>
        <DigitSpan position="bottom">{prevDigit}</DigitSpan>
      </div>
      {/* Top Flap – old digit falling down */}
      <div
        className={cn(
          commonCardStyle,
          "z-20 origin-bottom backface-hidden rounded-t-lg",
          flipping && "flip-clock-flip-top"
        )}
      >
        <DigitSpan position="top">{prevDigit}</DigitSpan>
      </div>
      {/* Bottom Flap – new digit appearing */}
      <div
        className={cn(
          commonCardStyle,
          "z-10 origin-top backface-hidden rounded-b-lg translate-y-full",
          flipping && "flip-clock-flip-bottom"
        )}
        style={{ transform: "rotateX(90deg)" }}
      >
        <DigitSpan position="bottom">{digit}</DigitSpan>
      </div>
      {/* Center Divider */}
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-background/50 z-30" />
    </div>
  );
});

function DigitSpan({ children, position }: { children: ReactNode; position?: "top" | "bottom" }) {
  return (
    <span
      className="absolute left-0 right-0 w-full flex items-center justify-center h-[200%]"
      style={{ top: position === "top" ? "0%" : "-100%" }}
    >
      {children}
    </span>
  );
}

// ─── FlipClock ────────────────────────────────────────────────────────────────

const flipClockVariants = cva(
  "relative flex justify-center items-center font-mono font-medium",
  {
    variants: {
      size: {
        sm: "text-3xl space-x-1",
        md: "text-5xl space-x-2",
        lg: "text-6xl space-x-2",
        xl: "text-8xl space-x-3",
      },
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        muted: "",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

type FlipClockSize = NonNullable<VariantProps<typeof flipClockVariants>["size"]>;

const heightMap: Record<FlipClockSize, string> = {
  sm: "text-4xl",
  md: "text-5xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }
const EMPTY_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function ClockSeparator({ size }: { size?: FlipClockSize }) {
  return (
    <span className={cn("text-center -translate-y-[8%]", size ? heightMap[size] : heightMap["md"])}>
      :
    </span>
  );
}

export interface FlipClockProps
  extends VariantProps<typeof flipClockVariants>,
    HTMLAttributes<HTMLDivElement> {
  countdown?: boolean;
  targetDate?: Date;
  showDays?: "auto" | "always" | "never";
  className?: string;
}

export function FlipClock({
  countdown = false,
  targetDate,
  size,
  variant,
  showDays = "auto",
  className,
  ...props
}: FlipClockProps) {
  const [time, setTime] = useState<TimeLeft>(EMPTY_TIME);

  useEffect(() => {
    setTime(getTime(countdown, targetDate));
    const timer = setInterval(() => {
      const next = getTime(countdown, targetDate);
      setTime(prev => {
        if (prev.seconds === next.seconds && prev.minutes === next.minutes) return prev;
        return next;
      });
    }, 250);
    return () => clearInterval(timer);
  }, [countdown, targetDate]);

  const daysStr    = String(time.days).padStart(3, "0");
  const hoursStr   = String(time.hours).padStart(2, "0");
  const minutesStr = String(time.minutes).padStart(2, "0");
  const secondsStr = String(time.seconds).padStart(2, "0");

  const shouldShowDays =
    countdown && (showDays === "always" || (showDays === "auto" && time.days > 0));

  return (
    <div
      className={cn(flipClockVariants({ size, variant }), className)}
      aria-live="polite"
      {...props}
    >
      <span className="sr-only absolute">{\`\${time.hours}:\${time.minutes}:\${time.seconds}\`}</span>
      {shouldShowDays && (
        <>
          {daysStr.split("").map((d, i) => (
            <FlipUnit key={\`d-\${i}\`} digit={d} size={size} variant={variant} />
          ))}
          <ClockSeparator size={size!} />
        </>
      )}
      {hoursStr.split("").map((d, i) => (
        <FlipUnit key={\`hour-\${i}\`} digit={d} size={size} variant={variant} />
      ))}
      <ClockSeparator size={size!} />
      {minutesStr.split("").map((d, i) => (
        <FlipUnit key={\`min-\${i}\`} digit={d} size={size} variant={variant} />
      ))}
      <ClockSeparator size={size!} />
      {secondsStr.split("").map((d, i) => (
        <FlipUnit key={\`sec-\${i}\`} digit={d} size={size} variant={variant} />
      ))}
    </div>
  );
}

function getTime(countdown: boolean, targetDate?: Date): TimeLeft {
  const now = new Date();
  if (!countdown) {
    return { days: 0, hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
  }
  if (!targetDate) return EMPTY_TIME;
  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default FlipClock;


`,

  "floating-navbar": `"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme-provider";
import { Link } from "react-router-dom";

import { flushSync } from "react-dom";

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface FloatingNavbarProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  cta?: { label: string; href: string };
  ctaThreshold?: number;
  showThemeToggle?: boolean;
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

export function FloatingNavbar({
  logo,
  links = [],
  cta,
  ctaThreshold = 80,
  showThemeToggle = true,
  className,
  containerRef,
}: FloatingNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = containerRef?.current
        ? containerRef.current.scrollTop
        : window.scrollY;
      setScrolledPast(scrollY > ctaThreshold);
    };

    const target = containerRef?.current || window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [ctaThreshold, containerRef]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const { theme, toggleTheme } = useTheme();

  const handleThemeToggleClick = () => {
    if (!document.startViewTransition) {
      toggleTheme();
    } else {
      document.startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-[100] mx-auto flex items-center justify-between p-2 rounded-lg w-[calc(100%-2rem)] max-w-5xl transition-all duration-300",
          "bg-[#000000] border border-transparent text-[#ffffff] shadow-xl backdrop-blur-xl",
          "dark:bg-[#ffffff] dark:border-transparent dark:text-[#000000] dark:shadow-2xl",
          className
        )}
      >
        <div className="flex items-center gap-6 px-3">
          {logo && (
            <div className="shrink-0 flex items-center">
              {logo}
            </div>
          )}
          
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-bold transition-colors text-[#ffffff]/80 hover:text-[#ffffff] dark:text-[#000000]/80 dark:hover:text-[#000000] group"
                >
                  {link.label}
                  {link.children && <ChevronDown className="size-3.5 opacity-60" />}
                  {activeDropdown === link.label && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-[#ffffff]/10 dark:bg-[#000000]/10 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </Link>

                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-full left-0 mt-2 bg-[#000000] dark:bg-[#ffffff] border border-transparent shadow-lg rounded-[14px] p-2 w-64 origin-top-left flex flex-col gap-1 overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block p-3 rounded-[10px] hover:bg-[#ffffff]/10 dark:hover:bg-[#000000]/10 transition-colors group"
                          >
                            <div className="text-sm font-semibold text-[#ffffff] group-hover:text-[#ffffff] dark:text-[#000000] dark:group-hover:text-[#000000] transition-colors">{child.label}</div>
                            {child.description && (
                              <div className="text-xs text-[#ffffff]/60 dark:text-[#000000]/60 mt-0.5 group-hover:text-[#ffffff]/85 dark:group-hover:text-[#000000]/85 transition-colors">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 px-1">
          {showThemeToggle && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15, transition: { type: "spring", stiffness: 450, damping: 15 } }}
              whileTap={{ scale: 0.85, rotate: -15 }}
              onClick={handleThemeToggleClick}
              className="p-2 rounded-md hover:bg-[#ffffff]/10 dark:hover:bg-[#000000]/10 text-[#ffffff]/80 hover:text-[#ffffff] dark:text-[#000000]/80 dark:hover:text-[#000000] transition-colors focus:outline-none flex shrink-0 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            </motion.button>
          )}

          {cta && (
            <motion.div
              initial={false}
              animate={{
                width: scrolledPast ? "auto" : 0,
                opacity: scrolledPast ? 1 : 0,
                marginLeft: scrolledPast ? 8 : 0,
                scale: scrolledPast ? 1 : 0.9
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ overflow: "hidden", display: "flex", alignItems: "center", transformOrigin: "right center" }}
              className="hidden md:flex"
            >
              <motion.div 
                whileHover={{ scale: 1.08, y: -1, transition: { type: "spring", stiffness: 500, damping: 18 } }} 
                whileTap={{ scale: 0.92 }}
              >
                <Link
                  to={cta.href}
                  className="px-4 py-2 bg-[#ffffff] text-[#000000] dark:bg-[#000000] dark:text-[#ffffff] text-sm font-semibold rounded-md whitespace-nowrap block hover:bg-[#ffffff]/90 dark:hover:bg-[#000000]/90 transition-colors shadow-sm select-none"
                >
                  {cta.label}
                </Link>
              </motion.div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.1, rotate: 10, transition: { type: "spring", stiffness: 500, damping: 15 } }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#ffffff]/10 dark:hover:bg-[#000000]/10 text-[#ffffff]/80 hover:text-[#ffffff] dark:text-[#000000]/80 dark:hover:text-[#000000] transition-colors cursor-pointer select-none"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[90] bg-[#000000]/95 dark:bg-[#ffffff]/95 text-[#ffffff] dark:text-[#000000] backdrop-blur-xl pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <div key={link.label} className="border-b border-[#ffffff]/10 dark:border-[#000000]/10 pb-4 mb-2">
                  {link.children ? (
                    <div>
                      <div className="text-lg font-bold mb-3 px-2 text-[#ffffff]/90 dark:text-[#000000]/90">{link.label}</div>
                      <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#ffffff]/10 dark:border-[#000000]/10 ml-2">
                        {link.children.map((child) => (
                          <Link key={child.label} to={child.href} className="flex flex-col p-2 rounded-md hover:bg-[#ffffff]/5 dark:hover:bg-[#000000]/5">
                            <span className="font-bold text-base text-[#ffffff]/90 dark:text-[#000000]/90">{child.label}</span>
                            {child.description && (
                              <span className="text-sm text-[#ffffff]/60 dark:text-[#000000]/60">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.href} className="text-lg font-bold block px-2 py-1 text-[#ffffff]/90 dark:text-[#000000]/90">
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {cta && (
                <Link to={cta.href} className="mt-4 px-4 py-3 bg-[#ffffff] text-[#000000] dark:bg-[#000000] dark:text-[#ffffff] text-center text-base font-semibold rounded-md w-full hover:bg-[#ffffff]/90 dark:hover:bg-[#000000]/90 transition-colors">
                  {cta.label}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


`,

  "frequency-toggle": `"use client";
import { cn } from "../../lib/utils";
import { motion } from "motion/react";
import type React from "react";

export type FREQUENCY = "monthly" | "yearly";

type FrequencyToggleProps = React.ComponentProps<"div"> & {
	frequency: FREQUENCY;
	setFrequency: React.Dispatch<React.SetStateAction<FREQUENCY>>;
	frequencies?: FREQUENCY[];
};

export function FrequencyToggle({
	frequency,
	setFrequency,
	frequencies = ["monthly", "yearly"],
	...props
}: FrequencyToggleProps) {
	return (
		<div
			className={cn(
				"mx-auto flex w-fit rounded-xl border bg-card p-1 shadow-xs",
				props.className
			)}
			{...props}
		>
			{frequencies.map((freq) => (
				<button
					className="relative px-4 py-1 text-sm capitalize"
					key={freq}
					onClick={() => setFrequency(freq)}
					type="button"
				>
					<span className="relative z-10">{freq}</span>
					{frequency === freq && (
						<motion.span
							className="absolute inset-0 z-10 rounded-xl bg-background mix-blend-difference dark:bg-foreground"
							layoutId="frequency"
							transition={{ type: "spring", duration: 0.4 }}
						/>
					)}
				</button>
			))}
		</div>
	);
}


`,

  "full-width-divider": `import { cn } from "../../lib/utils";

type FullWidthDividerProps = React.ComponentProps<"div"> & {
	contained?: boolean;
	position?: "top" | "bottom";
};

export function FullWidthDivider({
	className,
	contained = false,
	position,
	...props
}: FullWidthDividerProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"pointer-events-none absolute h-px bg-border",
				// full-bleed (default)
				"data-[contained=false]:left-1/2 data-[contained=false]:w-[100vw] data-[contained=false]:-translate-x-1/2",
				// contained
				"data-[contained=true]:inset-x-0 data-[contained=true]:w-full",
				// position
				position &&
					"data-[position=top]:-top-px data-[position=bottom]:-bottom-px",
				className
			)}
			data-contained={contained}
			data-position={position}
			{...props}
		/>
	);
}


`,

  "image-gallery": `import { LazyImage } from "./lazy-image";

export function ImageGallery() {
	return (
		<div className="relative flex min-h-screen w-full flex-col items-center justify-center px-4 py-10">
			<div className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-4 md:gap-6">
				{Array.from({ length: 4 }).map((_, col) => (
					<div className="grid gap-4" key={col}>
						{Array.from({ length: 8 }).map((_, index) => {
							const isPortrait = Math.random() > 0.5;
							const width = isPortrait ? 1080 : 1920;
							const height = isPortrait ? 1920 : 1080;
							const ratio = isPortrait ? 9 / 16 : 16 / 9;

							return (
								<LazyImage
									alt={\`Image \${col}-\${index}\`}
									containerClassName="cn-rounded"
									fallback={\`https://placehold.co/\${width}x\${height}/\`}
									inView={true}
									key={\`\${col}-\${index}\`}
									ratio={ratio}
									src={\`https://picsum.photos/seed/\${col}-\${index}/\${width}/\${height}\`}
								/>
							);
						})}
					</div>
				))}
			</div>
		</div>
	);
}


`,

  "integrations": `import { cn } from "../../lib/utils";
import { Button } from "../ui/coss/button";
import { ArrowUpRightIcon } from "lucide-react";

type Integration = {
  src: string;
  name: string;
  description: string;
  isInvertable?: boolean;
};

const data: Integration[] = [
  {
    src: "https://storage.efferd.com/logo/vercel.svg",
    name: "Vercel",
    description: "Amet praesentium deserunt ex commodi tempore fuga....",
    isInvertable: true,
  },
  {
    src: "https://storage.efferd.com/logo/openai.svg",
    name: "OpenAI",
    description: "Amet praesentium deserunt ex commodi tempore fuga....",
    isInvertable: true,
  },
  {
    src: "https://storage.efferd.com/logo/supabase.svg",
    name: "Supabase",
    description: "Amet praesentium deserunt ex commodi tempore fuga....",
  },
  {
    src: "https://storage.efferd.com/logo/notion.svg",
    name: "Notion",
    description: "Amet praesentium deserunt ex commodi tempore fuga....",
  },
];

export function Integrations() {
  return (
    <div
      className={cn(
        "mx-auto grid max-w-5xl gap-1 overflow-hidden rounded-md bg-secondary p-1 sm:grid-cols-2 lg:grid-cols-4 dark:bg-secondary/50"
      )}
    >
      {data.map((item) => (
        <div
          className={cn(
            "group relative flex flex-col justify-between gap-2 rounded-md bg-background p-6 shadow-sm"
          )}
          key={item.name}
        >
          <img
            alt={item.name}
            className={cn(
              "pointer-events-none size-8 shrink-0 select-none object-contain",
              item.isInvertable && "dark:invert"
            )}
            height={32}
            src={item.src}
            width={32}
          />
          <div className="space-y-1">
            <h3 className="font-semibold">{item.name}</h3>
            <p className="text-muted-foreground text-xs md:text-sm">
              {item.description}
            </p>
          </div>
        </div>
      ))}
      <div className="relative flex items-center justify-center p-1 sm:col-span-2 lg:col-span-4">
        <Button render={<a href="#" />} className="group text-xs" size="sm" variant="link">
          View all integrations
          <ArrowUpRightIcon data-icon="inline-end" />
        </Button>
      </div>
    </div>
  );
}


`,

  "lazy-image": `"use client";

import { cn } from "../../lib/utils";
import { useInView } from "motion/react";
import React from "react";
import { AspectRatio } from "../ui/coss/aspect-ratio";

type LazyImageProps = {
	alt: string;
	src: string;
	className?: string;
	containerClassName?: string;
	/** URL of the fallback image. default: undefined */
	fallback?: string;
	/** The ratio of the image. */
	ratio: number;
	/** Whether the image should only load when it is in view. default: false */
	inView?: boolean;
};

export function LazyImage({
	alt,
	src,
	ratio,
	fallback,
	inView = false,
	className,
	containerClassName,
}: LazyImageProps) {
	const ref = React.useRef<HTMLDivElement | null>(null);
	const imgRef = React.useRef<HTMLImageElement | null>(null);
	const isInView = useInView(ref, { once: true });

	const [imgSrc, setImgSrc] = React.useState<string | undefined>(
		inView ? undefined : src
	);
	const [isLoading, setIsLoading] = React.useState(true);

	const handleError = () => {
		if (fallback) {
			setImgSrc(fallback);
		}
		setIsLoading(false);
	};

	const handleLoad = React.useCallback(() => {
		setIsLoading(false);
	}, []);

	// Load image only when inView
	React.useEffect(() => {
		if (inView && isInView && !imgSrc) {
			setImgSrc(src);
		}
	}, [inView, isInView, src, imgSrc]);

	// Handle cached images instantly
	React.useEffect(() => {
		if (imgRef.current?.complete) {
			handleLoad();
		}
	}, [handleLoad]);

	return (
		<AspectRatio
			className={cn(
				"relative size-full overflow-hidden border bg-accent/30",
				containerClassName
			)}
			ratio={ratio}
			ref={ref}
		>
			{imgSrc && (
				// biome-ignore lint/correctness/useImageSize: dynamic image size
				<img
					alt={alt}
					className={cn(
						"size-full object-cover transition-opacity duration-500",
						isLoading ? "opacity-0" : "opacity-100",
						className
					)}
					decoding="async"
					fetchPriority={inView ? "high" : "low"}
					loading="lazy"
					onError={handleError}
					onLoad={handleLoad}
					ref={imgRef}
					role="presentation" // Changed from "img" to "presentation" since it's decorative
					src={imgSrc}
				/>
			)}
		</AspectRatio>
	);
}


`,

  "liquid-metal-button": `import React from 'react';
import { motion } from 'motion/react';
import { cn } from '../../lib/utils';

export interface LiquidMetalButtonProps {
  text?: string;
  onClick?: () => void;
  className?: string;
  gradient?: string;
}

export function LiquidMetalButton({
  text = 'Join the Waitlist',
  onClick,
  className,
  gradient = 'from-zinc-200 via-zinc-100 to-zinc-300 dark:from-zinc-100 dark:via-zinc-50 dark:to-zinc-300',
}: LiquidMetalButtonProps) {
  return (
    <div className="relative inline-block select-none">
      {/* SVG gooey composite filter */}
      <svg className="absolute w-0 h-0">
        <defs>
          <filter id="liquid-metal">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="liquid" />
            <feComposite in="SourceGraphic" in2="liquid" operator="atop" />
          </filter>
        </defs>
      </svg>
      
      <motion.button 
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        onClick={onClick}
        className={cn(
          "relative flex items-center justify-center px-8 py-4 rounded-full bg-gradient-to-br text-zinc-950 font-bold text-base tracking-tight overflow-hidden shadow-[0_8px_32px_rgba(0,0,0,0.1),inset_0_2px_4px_rgba(255,255,255,0.8),inset_0_-2px_4px_rgba(0,0,0,0.2)] border border-white/20 active:outline-none focus:outline-none cursor-pointer",
          gradient,
          className
        )}
        style={{ filter: 'url(#liquid-metal)' }}
      >
        <span className="relative z-20 drop-shadow-sm font-semibold tracking-wide">{text}</span>
        
        {/* Animated Liquid blob nodes */}
        <motion.div 
          animate={{ 
            x: [0, 30, -10, 0], 
            y: [0, -15, 15, 0],
            scale: [1, 1.3, 0.8, 1]
          }}
          transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
          className="absolute top-0 left-1/4 w-12 h-12 bg-white/70 rounded-full mix-blend-overlay blur-[2px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, -40, 20, 0], 
            y: [0, 20, -20, 0],
            scale: [1, 0.8, 1.4, 1]
          }}
          transition={{ repeat: Infinity, duration: 5, ease: "easeInOut" }}
          className="absolute bottom-0 right-1/4 w-16 h-16 bg-zinc-300 rounded-full mix-blend-overlay blur-[2px]" 
        />
        <motion.div 
          animate={{ 
            x: [0, 35, -25, 0], 
            y: [0, 20, -10, 0],
            scale: [1, 1.4, 0.9, 1]
          }}
          transition={{ repeat: Infinity, duration: 6, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 w-10 h-10 bg-zinc-100 rounded-full mix-blend-overlay blur-[2px]" 
        />
        
        {/* Shiny sweep effect */}
        <motion.div 
          animate={{ x: ['-200%', '200%'] }}
          transition={{ repeat: Infinity, duration: 3.5, ease: "linear" }}
          className="absolute inset-0 z-10 w-1/2 bg-gradient-to-r from-transparent via-white/40 to-transparent opacity-60 skew-x-[25deg] pointer-events-none"
        />
      </motion.button>
    </div>
  );
}


`,

  "liquid-metal-progress": `import React, { useEffect, useRef, useState } from 'react';
import { liquidMetalFragmentShader, ShaderMount } from '@paper-design/shaders';
import { ArrowUp } from 'lucide-react';
import { cn } from '../../lib/utils';

export interface LiquidMetalProgressProps {
  containerRef?: React.RefObject<HTMLElement | null>;
  className?: string;
  size?: number; // width & height of the circle in px
  strokeWidth?: number;
  icon?: React.ReactNode;
}

export function LiquidMetalProgress({
  containerRef,
  className,
  size = 64,
  strokeWidth = 4,
  icon,
}: LiquidMetalProgressProps) {
  const canvasContainerRef = useRef<HTMLDivElement>(null);
  const [scrollPct, setScrollPct] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      let scrollTop = 0;
      let docHeight = 0;
      let winHeight = 0;

      const el = containerRef?.current;
      if (el && el.scrollHeight > el.clientHeight) {
        scrollTop = el.scrollTop;
        docHeight = el.scrollHeight;
        winHeight = el.clientHeight;
      } else {
        scrollTop = window.scrollY;
        docHeight = document.documentElement.scrollHeight;
        winHeight = window.innerHeight;
      }

      if (docHeight <= winHeight) {
        setScrollPct(0);
        return;
      }
      
      const scrollPercent = scrollTop / (docHeight - winHeight);
      setScrollPct(Math.min(1, Math.max(0, scrollPercent)) * 100);
    };

    const target = containerRef?.current || window;
    target.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true }); // Always listen to window as well for mobile/layout changes
    
    // Initial calculation
    handleScroll();

    // Re-check periodically in case document height changes
    const interval = setInterval(handleScroll, 500);

    return () => {
      target.removeEventListener('scroll', handleScroll);
      window.removeEventListener('scroll', handleScroll);
      clearInterval(interval);
    };
  }, [containerRef]);

  useEffect(() => {
    if (!canvasContainerRef.current) return;

    const mount = new ShaderMount(
      canvasContainerRef.current,
      liquidMetalFragmentShader,
      {
        u_repetition: 1.5,
        u_softness: 0.5,
        u_shiftRed: 0.8,
        u_shiftBlue: -0.5,
        u_distortion: 0,
        u_contour: 0,
        u_angle: 100,
        u_scale: 1.5,
        u_shape: 1,
        u_offsetX: 0.1,
        u_offsetY: -0.1
      },
      undefined,
      0.6
    );

    return () => {
      // ShaderMount automatically cleans up when DOM nodes are unmounted
    };
  }, []);

  // Circle geometry calculations matching the custom SVG mask
  const radius = 50 - strokeWidth;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - scrollPct / 100);

  const svgString = \`
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
      <circle 
        cx="50" 
        cy="50" 
        r="\${radius}" 
        fill="none" 
        stroke="black" 
        stroke-width="\${strokeWidth * 2}" 
        stroke-linecap="round" 
        stroke-dasharray="\${circumference}" 
        stroke-dashoffset="\${offset}" 
        transform="rotate(-90 50 50)" 
      />
    </svg>
  \`;
  const emptySvg = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"></svg>';

  const maskImage = scrollPct === 0 
    ? \`url('data:image/svg+xml,\${encodeURIComponent(emptySvg)}')\`
    : \`url('data:image/svg+xml,\${encodeURIComponent(svgString)}')\`;

  const inlineStyles = {
    '--mask-image': maskImage,
    '--canvas-opacity': scrollPct > 0 ? 1 : 0,
    width: \`\${size}px\`,
    height: \`\${size}px\`,
  } as React.CSSProperties;

  return (
    <div 
      className={cn("relative rounded-full cursor-pointer transition-all active:scale-95 group select-none flex items-center justify-center hover:scale-105 duration-300", className)}
      style={{ width: \`\${size}px\`, height: \`\${size}px\` }}
    >
      <style>{\`
        .liquid-progress-container {
          position: relative;
          border-radius: 50%;
        }
        .liquid-progress-container canvas {
          -webkit-mask-image: var(--mask-image);
          mask-image: var(--mask-image);
          -webkit-mask-size: 100% 100%;
          mask-size: 100% 100%;
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          -webkit-mask-position: center;
          mask-position: center;
          border-radius: 50%;
          opacity: var(--canvas-opacity, 1);
          filter: sepia(1) saturate(2.5) hue-rotate(-15deg) brightness(1.1) contrast(1.1);
          transition: opacity 0.3s ease;
        }
        .liquid-progress-container::before {
          content: "";
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: calc(100% - \${strokeWidth * 2}px);
          height: calc(100% - \${strokeWidth * 2}px);
          background: #09090b;
          border-radius: 50%;
          z-index: 0;
        }
        .liquid-progress-icon-wrapper {
          position: absolute;
          z-index: 2;
          display: flex;
          align-items: center;
          justify-content: center;
          color: rgba(255, 255, 255, 0.7);
          transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.3s ease;
        }
        .liquid-progress-container:hover .liquid-progress-icon-wrapper {
          transform: scale(1.15);
          color: #ffffff;
        }
      \`}</style>

      {/* Liquid Metal Progress Canvas */}
      <div 
        ref={canvasContainerRef} 
        className="liquid-progress-container w-full h-full"
        style={inlineStyles}
      />

      {/* Inner Icon Overlay */}
      <div className="liquid-progress-icon-wrapper">
        {icon || <ArrowUp className="size-5 transition-transform duration-300 group-hover:-translate-y-0.5" />}
      </div>
    </div>
  );
}

export interface LiquidMetalBackToTopProps extends Omit<LiquidMetalProgressProps, 'icon'> {
  showThreshold?: number; // minimum scroll distance in px to show the button
}

export function LiquidMetalBackToTop({
  containerRef,
  className,
  size = 56,
  strokeWidth = 3.5,
  showThreshold = 150,
}: LiquidMetalBackToTopProps) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScrollVisibility = () => {
      let scrollTop = 0;
      const el = containerRef?.current;
      if (el && el.scrollHeight > el.clientHeight) {
        scrollTop = el.scrollTop;
      } else {
        scrollTop = window.scrollY;
      }
      setVisible(scrollTop >= showThreshold);
    };

    const target = containerRef?.current || window;
    target.addEventListener('scroll', handleScrollVisibility, { passive: true });
    window.addEventListener('scroll', handleScrollVisibility, { passive: true });
    
    handleScrollVisibility();

    return () => {
      target.removeEventListener('scroll', handleScrollVisibility);
      window.removeEventListener('scroll', handleScrollVisibility);
    };
  }, [containerRef, showThreshold]);

  const scrollToTop = () => {
    if (containerRef?.current) {
      containerRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div 
      onClick={scrollToTop}
      className={cn(
        "fixed bottom-8 right-8 z-[9999] transition-all duration-500 transform ease-[0.34,1.56,0.64,1] cursor-pointer",
        visible ? "opacity-100 scale-100 translate-y-0" : "opacity-0 scale-75 translate-y-6 pointer-events-none",
        className
      )}
    >
      {/* Floating Ring Glow */}
      <div className="absolute inset-0 bg-purple-500/10 dark:bg-purple-500/5 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10" />
      
      <LiquidMetalProgress 
        containerRef={containerRef}
        size={size}
        strokeWidth={strokeWidth}
      />
    </div>
  );
}


`,

  "logo-cloud": `import { cn } from "../../lib/utils";
import { DecorIcon } from "./decor-icon";

type Logo = {
  src: string;
  alt: string;
};

export function LogoCloud() {
  return (
    <div className="grid grid-cols-2 border md:grid-cols-4">
      <LogoCard
        className="relative border-r border-b bg-secondary dark:bg-secondary/30"
        logo={{
          src: "https://storage.efferd.com/logo/nvidia-wordmark.svg",
          alt: "Nvidia Logo",
        }}
      >
        <DecorIcon className="z-10" position="bottom-right" />
      </LogoCard>

      <LogoCard
        className="border-b md:border-r"
        logo={{
          src: "https://storage.efferd.com/logo/supabase-wordmark.svg",
          alt: "Supabase Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b md:bg-secondary dark:md:bg-secondary/30"
        logo={{
          src: "https://storage.efferd.com/logo/github-wordmark.svg",
          alt: "GitHub Logo",
        }}
      >
        <DecorIcon className="z-10" position="bottom-right" />
        <DecorIcon className="z-10 hidden md:block" position="bottom-left" />
      </LogoCard>

      <LogoCard
        className="relative border-b bg-secondary md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={{
          src: "https://storage.efferd.com/logo/openai-wordmark.svg",
          alt: "OpenAI Logo",
        }}
      />

      <LogoCard
        className="relative border-r border-b bg-secondary md:border-b-0 md:bg-background dark:bg-secondary/30 md:dark:bg-background"
        logo={{
          src: "https://storage.efferd.com/logo/turso-wordmark.svg",
          alt: "Turso Logo",
        }}
      >
        <DecorIcon className="z-10 md:hidden" position="bottom-right" />
      </LogoCard>

      <LogoCard
        className="border-b bg-background md:border-r md:border-b-0 md:bg-secondary dark:md:bg-secondary/30"
        logo={{
          src: "https://storage.efferd.com/logo/clerk-wordmark.svg",
          alt: "Clerk Logo",
        }}
      />

      <LogoCard
        className="border-r"
        logo={{
          src: "https://storage.efferd.com/logo/claude-wordmark.svg",
          alt: "Claude AI Logo",
        }}
      />

      <LogoCard
        className="bg-secondary dark:bg-secondary/30"
        logo={{
          src: "https://storage.efferd.com/logo/vercel-wordmark.svg",
          alt: "Vercel Logo",
        }}
      />
    </div>
  );
}

type LogoCardProps = React.ComponentProps<"div"> & {
  logo: Logo;
};

function LogoCard({ logo, className, children, ...props }: LogoCardProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-center bg-background px-4 py-8 md:p-8",
        className
      )}
      {...props}
    >
      <img
        alt={logo.alt}
        className="pointer-events-none h-4 select-none md:h-5 dark:brightness-0 dark:invert"
        height="auto"
        src={logo.src}
        width="auto"
      />
      {children}
    </div>
  );
}


`,

  "marquee": `import React from 'react';
import { motion } from 'motion/react';

const Marquee: React.FC = () => {
  return (
    <div className="w-full overflow-hidden whitespace-nowrap flex py-0 px-3">
      <div className="flex w-[200%] gap-4 overflow-hidden relative">
        <motion.div
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 14,
            repeat: Infinity
          }}
          className="flex whitespace-nowrap gap-6 text-[10px] uppercase tracking-widest font-extrabold text-[#ffffff] shrink-0"
        >
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
        </motion.div>
        
        {/* Mirror copy to make transition seamless */}
        <motion.div
          aria-hidden="true"
          animate={{ x: ["0%", "-50%"] }}
          transition={{
            ease: "linear",
            duration: 14,
            repeat: Infinity
          }}
          className="flex whitespace-nowrap gap-6 text-[10px] uppercase tracking-widest font-extrabold text-[#ffffff] shrink-0"
        >
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
          <span>OXYGEN UI • LIGHTNING MOTION • DESIGN SHIFT •&nbsp;</span>
        </motion.div>
      </div>
    </div>
  );
};

export default Marquee;


`,

  "orbital-spinner": `"use client";

import { memo } from "react";
import { motion, Variants, HTMLMotionProps } from "motion/react";
import { cn } from "../../lib/utils";

export interface OrbitalSpinnerProps extends HTMLMotionProps<"div"> {
  /** Size of the spinner */
  size?: "sm" | "md" | "lg";
}

const sizeConfig = {
  sm: {
    container: "size-12",
    core: "size-2.5",
    satellite: "size-1.5",
    pathWidth: "border-[0.5px]",
  },
  md: {
    container: "size-20",
    core: "size-4",
    satellite: "size-2.5",
    pathWidth: "border-[1px]",
  },
  lg: {
    container: "size-32",
    core: "size-6",
    satellite: "size-4",
    pathWidth: "border-[1.5px]",
  },
} as const;

const containerVariants: Variants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: "easeOut" },
  },
};

export const OrbitalSpinner = memo(({ size = "sm", className, ...props }: OrbitalSpinnerProps) => {
  const config = sizeConfig[size];

  return (
    <motion.div
      animate="animate"
      initial="initial"
      variants={containerVariants}
      className={cn("relative flex items-center justify-center", config.container, className)}
      {...props}
    >
      {/* Central Core */}
      <motion.div
        animate={{ scale: [1, 1.05, 1], opacity: [0.9, 1, 0.9] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className={cn("rounded-full bg-foreground z-10", config.core)}
      />

      {/* Orbital Path */}
      <div
        className={cn(
          "absolute rounded-full border-foreground/10 size-full",
          config.pathWidth
        )}
      />

      {/* Rotating Satellite */}
      <motion.div
        animate={{ rotate: 360 }}
        className="absolute inset-0"
        transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
      >
        <div
          className={cn(
            "absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-foreground",
            config.satellite
          )}
        />
      </motion.div>
    </motion.div>
  );
});

OrbitalSpinner.displayName = "OrbitalSpinner";
export default OrbitalSpinner;


`,

  "partition-bar": `"use client";

import React, {
  Children,
  createContext,
  HTMLAttributes,
  isValidElement,
  type ReactElement,
  useContext,
} from "react";
import { cn } from "../../lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

// ─── Context ──────────────────────────────────────────────────────────────────

type PartitionBarContextType = {
  total: number;
  size: VariantProps<typeof partitionBarVariants>["size"];
};

const PartitionBarCtxt = createContext<PartitionBarContextType | null>(null);

function usePartitionBarContext(): PartitionBarContextType {
  const ctx = useContext(PartitionBarCtxt);
  if (!ctx) throw new Error("usePartitionBarContext must be used within a PartitionBar");
  return ctx;
}

// ─── PartitionBar ─────────────────────────────────────────────────────────────

const partitionBarVariants = cva("flex flex-row", {
  variants: {
    size: { sm: "text-xs", md: "text-sm", lg: "text-base" },
  },
  defaultVariants: { size: "md" },
});

interface PartitionBarSegmentProps
  extends HTMLAttributes<HTMLLIElement>,
    VariantProps<typeof partitionBarLineVariants> {
  children?: React.ReactNode;
  num?: number;
  alignment?: "left" | "center" | "right";
  className?: string;
}

interface PartitionBarProps
  extends HTMLAttributes<HTMLUListElement>,
    VariantProps<typeof partitionBarVariants> {
  children?:
    | ReactElement<PartitionBarSegmentProps>
    | ReactElement<PartitionBarSegmentProps>[];
  gap?: number;
  className?: string;
}

export function PartitionBar({ children, className, gap = 1, size, ...props }: PartitionBarProps) {
  const total = Children.toArray(children).reduce<number>(
    (sum, child) =>
      isValidElement(child) ? sum + ((child.props as PartitionBarSegmentProps).num || 0) : sum,
    0
  );

  return (
    <PartitionBarCtxt.Provider value={{ total, size }}>
      <ul
        className={cn("w-full", partitionBarVariants({ size }), className)}
        style={{ gap: \`\${gap * 4}px\` }}
        {...props}
      >
        {children}
      </ul>
    </PartitionBarCtxt.Provider>
  );
}

// ─── PartitionBarSegment ──────────────────────────────────────────────────────

const partitionBarLineVariants = cva("", {
  variants: {
    variant: {
      default:     "bg-primary",
      secondary:   "bg-primary/60",
      destructive: "bg-destructive",
      outline:     "border border-input bg-background",
      muted:       "bg-primary/40",
    },
  },
  defaultVariants: { variant: "default" },
});

const partitionBarTitleVariants = cva("", {
  variants: {
    variant: {
      default:     "text-primary",
      secondary:   "text-primary/60",
      destructive: "text-destructive",
      outline:     "text-foreground",
      muted:       "text-primary/40",
    },
  },
  defaultVariants: { variant: "default" },
});

export function PartitionBarSegment({
  children,
  num = 0,
  variant = "default",
  alignment = "center",
  className,
  ...props
}: PartitionBarSegmentProps) {
  const { total, size } = usePartitionBarContext();
  const widthPercent = total > 0 ? (num / total) * 100 : 0;

  return (
    <li
      className="flex flex-col min-w-0"
      style={{ flexBasis: \`\${widthPercent}%\`, flexGrow: 0, flexShrink: 0 }}
      {...props}
    >
      <div
        className={cn(
          partitionBarLineVariants({ variant }),
          "rounded-full w-full shrink-0",
          size === "sm" ? "h-2" : size === "md" ? "h-3" : "h-4",
          className
        )}
      />
      <div
        className={cn(
          partitionBarTitleVariants({ variant }),
          "w-full whitespace-normal flex flex-col",
          size === "sm" ? "mt-2" : size === "md" ? "mt-3" : "mt-4",
          alignment === "left"   && "items-start",
          alignment === "center" && "items-center",
          alignment === "right"  && "items-end"
        )}
      >
        {children}
      </div>
    </li>
  );
}

// ─── PartitionBarSegmentTitle / Value ─────────────────────────────────────────

export function PartitionBarSegmentTitle({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return <div className={cn("w-fit font-semibold", className)}>{children}</div>;
}

export function PartitionBarSegmentValue({
  children,
  className,
}: { children: React.ReactNode; className?: string }) {
  return (
    <div className={cn("w-fit text-muted-foreground text-[80%]", className)}>{children}</div>
  );
}

export default PartitionBar;


`,

  "pricing-card-parts": `import { cn } from "../../lib/utils";
import React from "react";

function Card({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"relative w-full max-w-xs rounded-xl border bg-background p-1",
				className
			)}
			{...props}
		/>
	);
}

function Header({
	className,
	children,
	isPopular,
	...props
}: React.ComponentProps<"div"> & {
	isPopular?: boolean;
}) {
	return (
		<div
			className={cn(
				"relative mb-4 rounded-xl border p-4",
				isPopular && "bg-card shadow-xs",
				className
			)}
			{...props}
		>
			{children}
		</div>
	);
}

function Plan({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn("mb-8 flex items-center justify-between", className)}
			{...props}
		/>
	);
}

function Description({ className, ...props }: React.ComponentProps<"p">) {
	return (
		<p className={cn("text-muted-foreground text-xs", className)} {...props} />
	);
}

function PlanName({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div
			className={cn(
				"flex items-center gap-2 font-medium text-sm [&_svg:not([class*='size-'])]:size-4",
				className
			)}
			{...props}
		/>
	);
}

function Badge({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"rounded-full border bg-background px-3 py-1 text-xs shadow-xs",
				className
			)}
			{...props}
		/>
	);
}

function Price({ className, ...props }: React.ComponentProps<"div">) {
	return (
		<div className={cn("mb-3 flex items-end gap-1", className)} {...props} />
	);
}

function MainPrice({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn("font-extrabold text-3xl tracking-tight", className)}
			{...props}
		/>
	);
}

function Period({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn("pb-1 text-muted-foreground text-sm", className)}
			{...props}
		/>
	);
}

function OriginalPrice({ className, ...props }: React.ComponentProps<"span">) {
	return (
		<span
			className={cn(
				"mr-1 ml-auto text-lg text-muted-foreground line-through",
				className
			)}
			{...props}
		/>
	);
}

function Body({ className, ...props }: React.ComponentProps<"div">) {
	return <div className={cn("space-y-6 p-3", className)} {...props} />;
}

function List({ className, ...props }: React.ComponentProps<"ul">) {
	return <ul className={cn("space-y-3", className)} {...props} />;
}

function ListItem({ className, ...props }: React.ComponentProps<"li">) {
	return (
		<li
			className={cn(
				"flex items-start gap-3 text-muted-foreground text-sm",
				className
			)}
			{...props}
		/>
	);
}

function Separator({
	children = "Upgrade to access",
	className,
	...props
}: React.ComponentProps<"div"> & {
	children?: string;
	className?: string;
}) {
	return (
		<div
			className={cn(
				"flex items-center gap-3 text-muted-foreground text-sm",
				className
			)}
			{...props}
		>
			<span className="h-px flex-1 bg-border" />
			<span className="shrink-0 text-muted-foreground">{children}</span>
			<span className="h-px flex-1 bg-border" />
		</div>
	);
}

export {
	Card,
	Header,
	Description,
	Plan,
	PlanName,
	Badge,
	Price,
	MainPrice,
	Period,
	OriginalPrice,
	Body,
	List,
	ListItem,
	Separator,
};


`,

  "pricing-section-1": `import { Badge } from "../ui/coss/badge";
import { Button } from "../ui/coss/button";
import { DecorIcon } from "./decor-icon";
import { ShieldCheckIcon } from "lucide-react";

export function PricingSection1() {
	return (
		<section className="w-full space-y-5">
			<div className="mx-auto mb-4 max-w-md space-y-2">
				<div className="flex justify-center">
					<div className="rounded-md border px-4 py-1 text-sm">Pricing</div>
				</div>
				<h2 className="mt-4 text-center font-bold text-2xl tracking-tight md:text-3xl">
					Pricing Based on Your Success
				</h2>
				<p className="mt-2 text-center text-muted-foreground text-sm md:text-base">
					We offer a single price for all our services. We believe that pricing
					is a critical component of any successful business.
				</p>
			</div>

			<div className="mx-auto w-full max-w-2xl space-y-2">
				<div className="relative grid border bg-background p-4 shadow-xs md:grid-cols-2">
					<DecorIcon className="size-3" position="top-left" />
					<DecorIcon className="size-3" position="top-right" />
					<DecorIcon className="size-3" position="bottom-left" />
					<DecorIcon className="size-3" position="bottom-right" />

					<div className="w-full px-4 pt-5 pb-4">
						<div className="space-y-1">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold leading-none">Monthly</h3>
								<div className="flex items-center gap-x-1">
									<span className="text-muted-foreground text-sm line-through">
										$8.99
									</span>
									<Badge variant="secondary">11% off</Badge>
								</div>
							</div>
							<p className="text-muted-foreground text-sm">
								Best value for growing businesses!
							</p>
						</div>
						<div className="mt-10 space-y-4">
							<div className="flex items-end gap-0.5 text-muted-foreground text-xl">
								<span>$</span>
								<span className="-mb-0.5 font-extrabold text-4xl text-foreground tracking-tighter md:text-4xl">
									7.99
								</span>
								<span>/month</span>
							</div>
							<Button render={<a href="#" />} className="w-full" variant="outline">
								Start Your Journey
							</Button>
						</div>
					</div>
					<div className="relative w-full rounded-md border bg-card p-4 shadow dark:bg-card/80">
						<div className="space-y-1">
							<div className="flex items-center justify-between">
								<h3 className="font-semibold leading-none">Yearly</h3>
								<div className="flex items-center gap-x-1">
									<span className="text-muted-foreground text-sm line-through">
										$8.99
									</span>
									<Badge>22% off</Badge>
								</div>
							</div>
							<p className="text-muted-foreground text-sm">
								Unlock savings with an annual commitment!
							</p>
						</div>
						<div className="mt-10 space-y-4">
							<div className="flex items-end text-muted-foreground text-xl">
								<span>$</span>
								<span className="-mb-0.5 font-extrabold text-4xl text-foreground tracking-tighter md:text-4xl">
									6.99
								</span>
								<span>/month</span>
							</div>
							<Button render={<a href="#" />} className="w-full">
								Get Started Now
							</Button>
						</div>
					</div>
				</div>

				<div className="flex items-center justify-center gap-x-2 text-muted-foreground text-sm">
					<ShieldCheckIcon className="size-4" />
					<span>Access to all features with no hidden fees</span>
				</div>
			</div>
		</section>
	);
}


`,

  "pricing-section-2": `import { cn } from "../../lib/utils";
import { Button } from "../ui/coss/button";
import * as PricingCard from "./pricing-card-parts";
import { CheckCircle2, Users, Briefcase, Building } from "lucide-react";

export function PricingSection2() {
	return (
		<section className="w-full">
			<div className="mx-auto mb-4 max-w-md space-y-2">
				<div className="flex justify-center">
					<div className="rounded-md border px-4 py-1 text-sm">Pricing</div>
				</div>
				<h2 className="text-center font-bold text-2xl tracking-tight md:text-3xl lg:font-extrabold lg:text-4xl">
					Plans that Scale with You
				</h2>
				<p className="text-center text-muted-foreground text-sm md:text-base">
					Whether you're just starting out or growing fast, our flexible pricing
					has you covered.
				</p>
			</div>
			<div className="mx-auto grid w-full max-w-4xl gap-4 p-6 md:grid-cols-3">
				{plans.map((plan, index) => (
					<PricingCard.Card
						className={cn("w-full max-w-full", index === 1 && "md:scale-105")}
						key={plan.name}
					>
						<PricingCard.Header isPopular={index === 1}>
							<PricingCard.Plan>
								<PricingCard.PlanName>
									{plan.icon}
									<span>{plan.name}</span>
								</PricingCard.PlanName>
								{plan.badge && (
									<PricingCard.Badge>{plan.badge}</PricingCard.Badge>
								)}
							</PricingCard.Plan>
							<PricingCard.Price>
								<PricingCard.MainPrice>{plan.price}</PricingCard.MainPrice>
								<PricingCard.Period>{plan.period}</PricingCard.Period>
								{plan.original && (
									<PricingCard.OriginalPrice className="ml-auto">
										{plan.original}
									</PricingCard.OriginalPrice>
								)}
							</PricingCard.Price>
							<Button
								className={cn("w-full font-semibold")}
								variant={plan.variant as "outline" | "default"}
							>
								Get Started
							</Button>
						</PricingCard.Header>

						<PricingCard.Body>
							<PricingCard.Description>
								{plan.description}
							</PricingCard.Description>
							<PricingCard.List>
								{plan.features.map((item) => (
									<PricingCard.ListItem className="text-xs" key={item}>
										<CheckCircle2 aria-hidden="true" className="size-4 text-foreground" />
										<span>{item}</span>
									</PricingCard.ListItem>
								))}
							</PricingCard.List>
						</PricingCard.Body>
					</PricingCard.Card>
				))}
			</div>
		</section>
	);
}

const plans = [
	{
		icon: <Users />,
		description: "Perfect for individuals",
		name: "Basic",
		price: "Free",
		variant: "outline",
		features: [
			"Automated Meeting Scheduling",
			"Basic Calendar Sync",
			"Daily Schedule Overview",
			"Email Reminders",
			"Task Management",
			"24/7 Customer Support",
			"Single User Access",
			"Basic Reporting",
			"Mobile App Access",
		],
	},
	{
		icon: <Briefcase />,
		description: "Ideal for small teams",
		name: "Pro",
		badge: "Popular",
		price: "$29",
		original: "$39",
		period: "/month",
		variant: "default",
		features: [
			"All Basic Plan Features",
			"Advanced Calendar Integrations",
			"Customizable Notifications",
			"Priority Support",
			"Analytics and Insights",
			"Group Scheduling",
			"Multiple User Roles",
			"Advanced Reporting",
			"Custom Branding Options",
		],
	},
	{
		icon: <Building />,
		name: "Enterprise",
		description: "Perfect for large scale companies",
		price: "$99",
		original: "$129",
		period: "/month",
		variant: "outline",
		features: [
			"All Pro Plan Features",
			"Dedicated Account Manager",
			"Custom Integrations",
			"Advanced Security Features",
			"Team Collaboration Tools",
			"Onboarding and Training",
			"Unlimited Users",
			"API Access with Higher Limits",
			"Advanced Audit Logs",
		],
	},
];


`,

  "pricing-section-3": `"use client";
import { cn } from "../../lib/utils";
import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion } from "motion/react";
import React from "react";
import { Button } from "../ui/coss/button";
import { type FREQUENCY, FrequencyToggle } from "./frequency-toggle";
import { StarIcon, CheckCircleIcon } from "lucide-react";

type Plan = {
	name: string;
	info: string;
	price: {
		monthly: number;
		yearly: number; // yearly per month
	};
	features: string[];
	btn: {
		text: string;
		href: string;
	};
	highlighted?: boolean;
};

const plans: Plan[] = [
	{
		name: "Basic",
		info: "For most individuals",
		price: {
			monthly: 7,
			yearly: 6,
		},
		features: [
			"Up to 3 Blog posts",
			"Up to 3 Transcriptions",
			"Up to 3 Posts stored",
			"Markdown support",
			"Community support",
			"AI powered suggestions",
		],
		btn: {
			text: "Start Your Free Trial",
			href: "#",
		},
	},
	{
		highlighted: true,
		name: "Pro",
		info: "For small businesses",
		price: {
			monthly: 17,
			yearly: 14,
		},
		features: [
			"Up to 500 Blog Posts",
			"Up to 500 Transcriptions",
			"Up to 500 Posts stored",
			"Unlimited Markdown support",
			"SEO optimization tools",
			"Priority support",
			"AI powered suggestions",
		],
		btn: {
			text: "Get started",
			href: "#",
		},
	},
	{
		name: "Business",
		info: "For large organizations",
		price: {
			monthly: 49,
			yearly: 40,
		},
		features: [
			"Unlimited Blog Posts",
			"Unlimited Transcriptions",
			"Unlimited Posts stored",
			"Unlimited Markdown support",
			"SEO optimization tools",
			"Priority support",
			"AI powered suggestions",
		],
		btn: {
			text: "Contact team",
			href: "#",
		},
	},
];

export function PricingSection3() {
	const [frequency, setFrequency] = React.useState<"monthly" | "yearly">(
		"monthly"
	);

	return (
		<div className="flex w-full flex-col items-center justify-center space-y-7 p-4">
			<div className="mx-auto max-w-xl space-y-2">
				<h2 className="text-center font-bold text-2xl tracking-tight md:text-3xl lg:font-extrabold lg:text-4xl">
					Plans that Scale with You
				</h2>
				<p className="text-center text-muted-foreground text-sm md:text-base">
					Whether you're just starting out or growing fast, our flexible pricing
					has you covered — with no hidden costs.
				</p>
			</div>

			<FrequencyToggle frequency={frequency} setFrequency={setFrequency} />
			<div className="mx-auto grid w-full max-w-4xl grid-cols-1 gap-6 md:grid-cols-3">
				{plans.map((plan) => (
					<PricingCard frequency={frequency} key={plan.name} plan={plan} />
				))}
			</div>
		</div>
	);
}

type PricingCardProps = React.ComponentProps<"div"> & {
	plan: Plan;
	frequency?: FREQUENCY;
};

export function PricingCard({
	plan,
	className,
	frequency = "monthly",
	...props
}: PricingCardProps) {
	return (
		<div
			className={cn(
				"relative flex w-full flex-col overflow-hidden rounded-lg border shadow-xs",
				plan.highlighted && "transition-all md:scale-105",
				className
			)}
			key={plan.name}
			{...props}
		>
			<div
				className={cn(
					"border-b p-4",
					plan.highlighted && "bg-card dark:bg-card/80"
				)}
			>
				<AnimatePresence mode="wait">
					<div className="absolute top-2 right-2 z-10 flex items-center gap-2">
						{plan.highlighted && (
							<motion.div
								className="flex items-center gap-1 rounded-md border bg-background px-2 py-0.5 text-xs"
								key="popular-badge"
								layout
								transition={{ duration: 0.1 }}
							>
								<StarIcon className="size-3 fill-current" />
								Popular
							</motion.div>
						)}

						{frequency === "yearly" &&
							plan.price.monthly > plan.price.yearly && (
								<motion.div
									animate={{ opacity: 1 }}
									className="flex items-center gap-1 rounded-md border bg-primary px-2 py-0.5 text-primary-foreground text-xs"
									exit={{ opacity: 0 }}
									initial={{ opacity: 0 }}
									key="discount-badge"
									layout
									transition={{ duration: 0.15 }}
								>
									{/* Calculate the actual discount percentage of the plan */}
									{Math.round(
										((plan.price.monthly - plan.price.yearly) /
											plan.price.monthly) *
											100
									)}
									% off
								</motion.div>
							)}
					</div>
				</AnimatePresence>

				<div className="font-medium text-lg">{plan.name}</div>
				<p className="font-normal text-muted-foreground text-sm">{plan.info}</p>
				<h3 className="mt-6 mb-1 flex w-max items-end gap-1">
					<NumberFlow
						className="font-extrabold text-3xl [&::part(suffix)]:font-normal [&::part(suffix)]:text-base [&::part(suffix)]:text-muted-foreground"
						format={{
							style: "currency",
							currency: "USD",
							notation: "compact",
						}}
						suffix="/month"
						value={plan.price[frequency]}
					/>
				</h3>
				<p className="mb-2 font-normal text-muted-foreground text-xs">
					billed {frequency}
				</p>
			</div>
			<div
				className={cn(
					"space-y-3 px-4 pt-6 pb-8 text-muted-foreground text-sm",
					plan.highlighted && "bg-muted/10"
				)}
			>
				{plan.features.map((feature) => (
					<div className="flex items-center gap-2" key={feature}>
						<CheckCircleIcon className="size-3.5 text-foreground" />
						<p>{feature}</p>
					</div>
				))}
			</div>
			<div
				className={cn(
					"mt-auto w-full border-t p-3",
					plan.highlighted && "bg-card dark:bg-card/80"
				)}
			>
				<Button
					render={<a href={plan.btn.href} />}
					className="w-full"
					variant={plan.highlighted ? "default" : "outline"}
				>
					{plan.btn.text}
				</Button>
			</div>
		</div>
	);
}


`,

  "pricing-section-4": `import { Button } from "../ui/coss/button";
import { FullWidthDivider } from "./full-width-divider";
import { CheckIcon } from "lucide-react";

type PricingPlan = {
	name: string;
	price: string;
	period?: string;
	description: string;
	href?: string;
	featuresTitle: string;
	features: string[];
	isPopular?: boolean;
};

const pricingPlans: PricingPlan[] = [
	{
		name: "STARTER",
		price: "Free",
		description: "For early-stage startups",
		featuresTitle: "FREE, FOREVER:",
		features: [
			"10 customers",
			"10 documents",
			"10 invoices",
			"Auto-updated taxes",
		],
		href: "#",
	},
	{
		name: "SCALE",
		isPopular: true,
		href: "#",
		price: "$8",
		period: "month",
		description: "For fast-growing teams",
		featuresTitle: "EVERYTHING IN STARTER, PLUS:",
		features: [
			"20 customers",
			"25 documents",
			"30 invoices",
			"Auto-updated taxes",
			"Cloud Sync",
		],
	},
];

export function PricingSection4() {
	return (
		<section className="mx-auto min-h-screen max-w-5xl place-content-center border-x py-4 mt-16 w-full">
			<div className="relative">
				<FullWidthDivider position="top" />
				<FullWidthDivider position="bottom" />

				<div className="grid grid-cols-1 gap-px bg-border md:grid-cols-2 lg:grid-cols-4">
					<div className="flex flex-col bg-background p-8 md:col-span-2">
						<p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
							PRICING
						</p>
						<h1 className="font-bold text-3xl leading-tight md:text-5xl">
							Pricing that doesn't suck
						</h1>
					</div>

					{pricingPlans.map((plan) => (
						<PricingCard key={plan.name} plan={plan} />
					))}
				</div>
			</div>
		</section>
	);
}

function PricingCard({ plan }: { plan: PricingPlan }) {
	return (
		<div className="flex flex-col bg-background *:px-4 *:py-6">
			<div className="border-b">
				<p className="mb-6 text-muted-foreground text-sm uppercase tracking-wider">
					{plan.name}
				</p>
				<div className="mb-2 flex items-baseline gap-2">
					<h2 className="font-bold text-4xl">{plan.price}</h2>
					{plan.period && (
						<span className="text-muted-foreground text-xs">
							/ {plan.period}
						</span>
					)}
				</div>
				<p className="mb-8 line-clamp-1 text-muted-foreground">
					{plan.description}
				</p>

				<Button
					render={<a href={plan.href} />}
					className="w-full"
					variant={plan.isPopular ? "default" : "outline"}
				>
					Get started
				</Button>
			</div>

			<div className="space-y-3 text-muted-foreground text-sm">
				<p className="mb-6 text-xs uppercase">{plan.featuresTitle}</p>

				{plan.features.map((feature) => (
					<p
						className="flex items-center gap-2 text-foreground/80"
						key={feature}
					>
						<CheckIcon className="size-4" />
						{feature}
					</p>
				))}
			</div>
		</div>
	);
}


`,

  "progressive-blur": `"use client"
import { cn } from "../../lib/utils"

export type ProgressiveBlurPosition = "top" | "bottom" | "left" | "right" | "both" | "horizontal"

export interface ProgressiveBlurProps {
  /** Additional classes for the blur container. */
  className?: string
  /** Height of the blur zone (vertical positions). */
  height?: string
  /** Width of the blur zone (horizontal positions). */
  width?: string
  /** Which edge(s) to apply the blur. "both" = top+bottom, "horizontal" = left+right. */
  position?: ProgressiveBlurPosition
  /** Blur values (px) from least to most intense. */
  blurLevels?: number[]
  /** Optional content rendered inside the blur zone. */
  children?: React.ReactNode
}

/**
 * ProgressiveBlur
 *
 * Layers multiple \`backdrop-filter: blur()\` slices with CSS mask gradients
 * to produce a smooth, progressive blur at any edge of any container.
 *
 * Usage (vertical):
 *   <div className="relative overflow-hidden h-[400px]">
 *     <YourScrollableContent />
 *     <ProgressiveBlur position="bottom" height="40%" />
 *   </div>
 *
 * Usage (horizontal marquee):
 *   <div className="relative overflow-hidden">
 *     <MarqueeContent />
 *     <ProgressiveBlur position="horizontal" width="120px" />
 *   </div>
 */
export function ProgressiveBlur({
  className,
  height = "30%",
  width = "120px",
  position = "bottom",
  blurLevels = [0.5, 1, 2, 4, 8, 16, 32, 64],
  children,
}: ProgressiveBlurProps) {
  const n = blurLevels.length

  const renderEdge = (pos: "top" | "bottom" | "left" | "right") => {
    const isVertical = pos === "top" || pos === "bottom"

    const containerStyle: React.CSSProperties = {
      [pos]: 0,
      ...(isVertical
        ? { height, left: 0, right: 0 }
        : { width, top: 0, bottom: 0 }),
    }

    return (
      <div
        aria-hidden
        className={cn("pointer-events-none absolute z-10", className)}
        style={containerStyle}
      >
        {blurLevels.map((blur, i) => {
          const startPct = (i / n) * 100
          const endPct = ((i + 1) / n) * 100

          // Build a mask that covers only this layer's slice
          let mask: string
          if (pos === "bottom") {
            mask = \`linear-gradient(to bottom, transparent \${startPct.toFixed(1)}%, black \${startPct.toFixed(1)}%, black \${endPct.toFixed(1)}%, transparent \${endPct.toFixed(1)}%)\`
          } else if (pos === "top") {
            mask = \`linear-gradient(to top, transparent \${startPct.toFixed(1)}%, black \${startPct.toFixed(1)}%, black \${endPct.toFixed(1)}%, transparent \${endPct.toFixed(1)}%)\`
          } else if (pos === "right") {
            mask = \`linear-gradient(to right, transparent \${startPct.toFixed(1)}%, black \${startPct.toFixed(1)}%, black \${endPct.toFixed(1)}%, transparent \${endPct.toFixed(1)}%)\`
          } else {
            // left
            mask = \`linear-gradient(to left, transparent \${startPct.toFixed(1)}%, black \${startPct.toFixed(1)}%, black \${endPct.toFixed(1)}%, transparent \${endPct.toFixed(1)}%)\`
          }

          return (
            <div
              key={i}
              className="absolute inset-0"
              style={{
                backdropFilter: \`blur(\${blur}px)\`,
                WebkitBackdropFilter: \`blur(\${blur}px)\`,
                maskImage: mask,
                WebkitMaskImage: mask,
              }}
            />
          )
        })}
        {children && pos === "bottom" && (
          <div className="absolute inset-0 flex items-end justify-center pb-4">
            {children}
          </div>
        )}
      </div>
    )
  }

  return (
    <>
      {(position === "top" || position === "both") && renderEdge("top")}
      {(position === "bottom" || position === "both") && renderEdge("bottom")}
      {(position === "left" || position === "horizontal") && renderEdge("left")}
      {(position === "right" || position === "horizontal") && renderEdge("right")}
    </>
  )
}

export default ProgressiveBlur


`,

  "scroll-image-text-reveal": `"use client";

import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'motion/react';
import { cn } from '../../lib/utils';

export interface InlineRevealImageProps {
  src: string;
  alt?: string;
  className?: string;
  containerProgress: any; // MotionValue<number>
  scrollRange: [number, number]; // [startScroll, endScroll] e.g. [0.2, 0.5]
  maxWidth?: number; // max width when fully expanded (default 140)
  heightClassName?: string; // custom height class, e.g. "h-7 sm:h-9 md:h-12"
}

export function InlineRevealImage({
  src,
  alt = "",
  className,
  containerProgress,
  scrollRange,
  maxWidth = 150,
  heightClassName = "h-6 sm:h-8 md:h-10 lg:h-12"
}: InlineRevealImageProps) {
  // Map container scroll progress to width of wrapper div
  const widthTransform = useTransform(containerProgress, scrollRange, [0, maxWidth]);
  // Snappy, fast spring to eliminate drag delay
  const width = useSpring(widthTransform, { stiffness: 380, damping: 32, mass: 0.4 });

  // Map progress to scale of the image itself (from 1.3 zoom to 1.0)
  const scale = useTransform(containerProgress, scrollRange, [1.3, 1.0]);

  // Map progress to opacity of the image
  const opacity = useTransform(containerProgress, scrollRange, [0, 1]);

  // Map progress to rotation of the wrapper div (subtle wiggle rotation)
  const rotateTransform = useTransform(containerProgress, scrollRange, [-4, 0]);
  const rotate = useSpring(rotateTransform, { stiffness: 350, damping: 28 });

  return (
    <motion.div
      style={{ width, rotate, opacity }}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 450, damping: 25 }}
      className={cn(
        "inline-block overflow-hidden align-middle mx-1.5 rounded-lg border border-border bg-zinc-900 cursor-pointer relative shadow-sm hover:border-primary/50 hover:shadow-md transition-[border-color,box-shadow] duration-200 will-change-[width,transform]",
        heightClassName,
        className
      )}
    >
      <motion.img
        src={src}
        alt={alt}
        style={{ scale }}
        className="absolute inset-0 w-full h-full object-cover"
        loading="lazy"
      />
    </motion.div>
  );
}

export interface ScrollImageTextRevealProps {
  className?: string;
  children: (progress: any) => React.ReactNode;
}

export function ScrollImageTextReveal({
  className,
  children
}: ScrollImageTextRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let parent = containerRef.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === 'auto' || overflow === 'scroll') {
        if (parent !== document.body && parent !== document.documentElement) {
          setScrollContainer(parent);
          break;
        }
      }
      parent = parent.parentElement;
    }
  }, []);
  
  // Track scroll position of this container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    container: scrollContainer ? { current: scrollContainer } : undefined,
    offset: ["start 90%", "end 10%"] // starts when top is 90% down, ends when bottom is 10% down to make reveal snappy and fast
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
    >
      {children(scrollYProgress)}
    </div>
  );
}


`,

  "scroll-velocity-marquee": `"use client";

import React, { useRef, useState, useEffect } from 'react';
import {
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  useAnimationFrame
} from 'motion/react';
import { cn } from '../../lib/utils';

export interface ScrollVelocityMarqueeProps {
  text: string;
  baseSpeed?: number; // base scrolling speed (pixels per frame or multiplier)
  className?: string;
  textClassName?: string;
}

export function ScrollVelocityMarquee({
  text,
  baseSpeed = 1.5,
  className,
  textClassName
}: ScrollVelocityMarqueeProps) {
  const baseX = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    let parent = containerRef.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === 'auto' || overflow === 'scroll') {
        if (parent !== document.body && parent !== document.documentElement) {
          setScrollContainer(parent);
          break;
        }
      }
      parent = parent.parentElement;
    }
  }, []);

  const { scrollY } = useScroll({
    container: scrollContainer ? { current: scrollContainer } : undefined
  });
  const scrollVelocity = useVelocity(scrollY);
  
  // Smooth the scroll velocity using a spring - heavier damping and lower stiffness creates a buttery flywheel feel
  const smoothVelocity = useSpring(scrollVelocity, {
    damping: 60,
    stiffness: 100,
    mass: 1.2
  });

  // Map the smooth velocity to a speed multiplier and clamp it to prevent overspeeding
  const velocityFactor = useTransform(smoothVelocity, [ -800, 0, 800 ], [ -3.5, 1, 3.5 ], {
    clamp: true
  });

  // Simple wrap function: keeps a value between a range (e.g. -50% and 0%)
  const wrapRange = (v: number) => {
    const range = 50;
    const absoluteVal = Math.abs(v);
    const mod = absoluteVal % range;
    return -mod;
  };

  const textRef = useRef<HTMLDivElement>(null);

  useAnimationFrame((time, delta) => {
    if (!textRef.current) return;

    // Constrain delta to prevent spikes on page load/tab focus
    const safeDelta = Math.min(delta, 32);

    // Determine direction and speed based on velocityFactor
    let moveBy = baseSpeed * (safeDelta / 16);

    // If velocityFactor is active, apply it
    const factor = velocityFactor.get();
    moveBy += factor * baseSpeed * (safeDelta / 16) * 0.12; // smooth scaling factor

    baseX.current -= moveBy;
    
    // Wrap baseX value so it cycles seamlessly
    const wrappedX = wrapRange(baseX.current);
    
    textRef.current.style.transform = \`translateX(\${wrappedX}%)\`;
  });

  // Create a repeated row of text so it spans more than screen width
  const repeatedText = Array(8).fill(text).join(" • ");

  return (
    <div ref={containerRef} className={cn("w-full overflow-hidden whitespace-nowrap flex select-none py-2", className)}>
      <div 
        ref={textRef} 
        className={cn(
          "flex whitespace-nowrap text-2xl md:text-4xl font-extrabold uppercase tracking-tight will-change-transform",
          textClassName
        )}
      >
        <span className="pr-4">{repeatedText} •&nbsp;</span>
        <span className="pr-4">{repeatedText} •&nbsp;</span>
      </div>
    </div>
  );
}


`,

  "setup-steps": `"use client";

import { useEffect, useState, useMemo } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Loader2, Check } from "lucide-react";
import { cn } from "../../lib/utils";

export interface StepItem {
  id: string;
  title: string;
}

export interface SetupStepsProps {
  /** How long (ms) each step is shown before auto-advancing */
  duration?: number;
  /** Provide your own steps list (overrides step1/2/3 shorthands) */
  steps?: StepItem[];
  className?: string;
}

const DEFAULT_STEPS: StepItem[] = [
  { id: "1", title: "Welcome Aboard" },
  { id: "2", title: "Verifying Details" },
  { id: "3", title: "Account Created" },
  { id: "4", title: "Configuring Workspace" },
  { id: "5", title: "Finalizing Setup" },
];

export function SetupSteps({ duration = 3000, steps, className }: SetupStepsProps) {
  const stepsList = useMemo(() => (steps && steps.length > 0 ? steps : DEFAULT_STEPS), [steps]);
  const [pointer, setPointer] = useState(1);

  const visible = [
    stepsList[(pointer - 1 + stepsList.length) % stepsList.length],
    stepsList[pointer % stepsList.length],
    stepsList[(pointer + 1) % stepsList.length],
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setPointer(prev => (prev + 1) % stepsList.length);
    }, duration);
    return () => clearInterval(timer);
  }, [duration, stepsList.length]);

  return (
    <div
      className={cn(
        "relative flex flex-col items-center justify-center overflow-hidden py-2",
        "h-[340px] w-full max-w-[360px]",
        className
      )}
    >
      <div className="relative w-full h-[220px] overflow-hidden">
        <AnimatePresence initial={false}>
          {visible.map((item, i) => {
            const isCompleted = i === 0;
            const isActive    = i === 1;
            const status      = isCompleted ? "completed" : isActive ? "active" : "pending";

            return (
              <motion.div
                key={item.id}
                initial={{ y: 220, opacity: 0, scale: 0.9 }}
                animate={{
                  y: i * 72 + 6,
                  scale: isActive ? 1 : 0.92,
                  opacity: isActive ? 1 : 0.45,
                }}
                exit={{ y: -80, opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={cn(
                  "absolute left-0 right-0 mx-auto w-full flex flex-col justify-center gap-2 rounded-xl border p-3.5 transition-colors duration-500",
                  isActive
                    ? "bg-card text-card-foreground border-border shadow-xs"
                    : "bg-card/50 text-card-foreground/40 border-border"
                )}
              >
                <div className="flex items-center justify-start gap-2.5">
                  <div className="relative size-5 shrink-0 flex items-center justify-center">
                    <AnimatePresence mode="wait">
                      <motion.div
                        key={status}
                        initial={{ scale: status === "completed" ? 0 : 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: status === "pending" ? 0.4 : 1 }}
                        exit={{ scale: status === "completed" ? 0 : 0.8, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className={cn(
                          status === "completed" && "flex size-5 items-center justify-center rounded-full bg-teal-400 text-white",
                          status === "active"    && "animate-spin text-teal-400",
                          status === "pending"   && "text-muted-foreground"
                        )}
                      >
                        {status === "completed" ? (
                          <Check className="size-3" />
                        ) : (
                          <Loader2 className="size-4" />
                        )}
                      </motion.div>
                    </AnimatePresence>
                  </div>
                  <span
                    className={cn(
                      "text-sm font-semibold tracking-tight transition-colors duration-500",
                      isActive ? "text-foreground" : "text-muted-foreground/60"
                    )}
                  >
                    {item.title}
                  </span>
                </div>
                <div className="ml-[30px] h-1.5 overflow-hidden rounded-full bg-muted">
                  <motion.div
                    className="h-full bg-teal-400 rounded-full"
                    initial={{ width: "0%" }}
                    animate={{ width: status === "pending" ? "0%" : "100%" }}
                    transition={{
                      width: isActive
                        ? { duration: duration / 1000, ease: "linear" }
                        : { duration: 0.5, ease: "easeInOut" },
                    }}
                  />
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Edge fades */}
      <div className="pointer-events-none absolute top-0 left-0 right-0 h-10 bg-gradient-to-b from-background to-transparent z-10" />
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-background to-transparent z-10" />
    </div>
  );
}

export default SetupSteps;


`,

  "skiper-102": `"use client";

import { useMotionValue } from "framer-motion";
import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

export const Skiper102 = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const [count, setCount] = useState(0);

  const [keyPressed, setKeyPressed] = useState("");

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeyPressed(e.key);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div
      onMouseMove={(e) => {
        mouseX.set(e.clientX);
        mouseY.set(e.clientY);
      }}
      onClick={() => setCount((prev) => prev + 1)}
      className="flex size-full flex-col items-center justify-center min-h-[300px]"
    >
      <div className="-mt-36 mb-36 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[14ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Debug Pannel
        </span>
      </div>
      <DebugPanel
        className=""
        count={count}
        mouseX={mouseX}
        mouseY={mouseY}
        keyPressed={keyPressed}
      />
    </div>
  );
};

export const DebugPanel = ({
  className,
  ...props
}: Record<string, any> & { className?: string }) => {
  return (
    <div
      className={cn(
        "z-99 left-4 top-4 font-mono text-sm text-red-500",
        className,
      )}
    >
      {"{"}

      {Object.entries(props).map(([key, value]) => (
        <div key={key} className="ml-4">
          {key}:{" "}
          {value && typeof value === "object" && "get" in value ? (
            <motion.span>{value}</motion.span>
          ) : typeof value === "boolean" ? (
            value ? (
              "true"
            ) : (
              "false"
            )
          ) : (
            String(value)
          )}
          ;
        </div>
      ))}
      {"}"}
    </div>
  );
};
`,

  "skiper-16": `"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useEffect, useRef, useState } from "react";

const projects = [
  {
    title: "Project 1",
    src: "/images/lummi/img8.png",
  },
  {
    title: "Project 2",
    src: "/images/lummi/img14.png",
  },
  {
    title: "Project 3",
    src: "/images/lummi/img10.png",
  },
  {
    title: "Project 4",
    src: "/images/lummi/img15.png",
  },
  {
    title: "Project 5",
    src: "/images/lummi/img12.png",
  },
];

const StickyCard_001 = ({
  i,
  title,
  src,
  progress,
  range,
  targetScale,
}: {
  i: number;
  title: string;
  src: string;
  progress: any;
  range: [number, number];
  targetScale: number;
}) => {
  const container = useRef<HTMLDivElement>(null);

  const scale = useTransform(progress, range, [1, targetScale]);

  return (
    <div
      ref={container}
      className="sticky top-0 flex items-center justify-center"
    >
      <motion.div
        style={{
          scale,
          top: \`calc(-5vh + \${i * 20 + 250}px)\`,
        }}
        className="rounded-4xl relative -top-1/4 flex h-[300px] w-[500px] origin-top flex-col overflow-hidden"
      >
        <img src={src} alt={title} className="h-full w-full object-cover" />
      </motion.div>
    </div>
  );
};

const Skiper16 = () => {
  const container = useRef<HTMLDivElement>(null);
  const [scrollContainer, setScrollContainer] = useState<React.RefObject<HTMLElement | null> | undefined>(undefined);

  useEffect(() => {
    if (!container.current) return;
    let parent = container.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer({ current: parent });
        break;
      }
      parent = parent.parentElement;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: container,
    container: scrollContainer,
    offset: ["start start", "end end"],
  });

  return (
    <ReactLenis root>
      <main
        ref={container}
        className="relative flex w-full flex-col items-center justify-center pb-[100vh] pt-[50vh]"
      >
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
            scroll down to see card stack
          </span>
        </div>
        {projects.map((project, i) => {
          const targetScale = Math.max(
            0.5,
            1 - (projects.length - i - 1) * 0.1,
          );
          return (
            <StickyCard_001
              key={\`p_\${i}\`}
              i={i}
              {...project}
              progress={scrollYProgress}
              range={[i * 0.25, 1]}
              targetScale={targetScale}
            />
          );
        })}
      </main>
    </ReactLenis>
  );
};

export { Skiper16, StickyCard_001 };

/**
 * Skiper 16 StickyCard_001 — React + Framer Motion
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
`,

  "skiper-17": `"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ReactLenis from "lenis/react";
import { useRef } from "react";

import { cn } from "@/lib/utils";

interface CardData {
  id: number | string;
  image: string;
  alt?: string;
}

interface StickyCard002Props {
  cards: CardData[];
  className?: string;
  containerClassName?: string;
  imageClassName?: string;
}

const StickyCard002 = ({
  cards,
  className,
  containerClassName,
  imageClassName,
}: StickyCard002Props) => {
  const container = useRef(null);
  const imageRefs = useRef<(HTMLImageElement | null)[]>([]);

  useGSAP(
    () => {
      gsap.registerPlugin(ScrollTrigger);

      // Detect parent scroll container (with auto/scroll overflow)
      let scrollContainer: HTMLElement | Window = window;
      let parent = container.current?.parentElement;
      while (parent) {
        const overflow = window.getComputedStyle(parent).overflowY;
        if (overflow === "auto" || overflow === "scroll") {
          scrollContainer = parent;
          break;
        }
        parent = parent.parentElement;
      }

      const scrollerHeight = scrollContainer === window ? window.innerHeight : (scrollContainer as HTMLElement).clientHeight;

      const imageElements = imageRefs.current;
      const totalCards = imageElements.length;

      if (!imageElements[0]) return;

      gsap.set(imageElements[0], { y: "0%", scale: 1, rotation: 0 });

      for (let i = 1; i < totalCards; i++) {
        if (!imageElements[i]) continue;
        gsap.set(imageElements[i], { y: "100%", scale: 1, rotation: 0 });
      }

      const scrollTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".sticky-cards",
          start: "top top",
          end: \`+=\${scrollerHeight * (totalCards - 1)}\`,
          pin: true,
          scrub: 0.5,
          pinSpacing: true,
          scroller: scrollContainer,
        },
      });

      for (let i = 0; i < totalCards - 1; i++) {
        const currentImage = imageElements[i];
        const nextImage = imageElements[i + 1];
        const position = i;
        if (!currentImage || !nextImage) continue;

        scrollTimeline.to(
          currentImage,
          {
            scale: 0.7,
            rotation: 5,
            duration: 1,
            ease: "none",
          },
          position,
        );

        scrollTimeline.to(
          nextImage,
          {
            y: "0%",
            duration: 1,
            ease: "none",
          },
          position,
        );
      }

      const resizeObserver = new ResizeObserver(() => {
        ScrollTrigger.refresh();
      });

      if (container.current) {
        resizeObserver.observe(container.current);
      }

      return () => {
        resizeObserver.disconnect();
        scrollTimeline.kill();
        ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
      };
    },
    { scope: container },
  );

  return (
    <div className={cn("relative h-full w-full", className)} ref={container}>
      <div className="sticky-cards relative flex h-full w-full items-center justify-center overflow-hidden p-3 lg:p-8">
        <div
          className={cn(
            "relative h-[90%] w-full max-w-sm overflow-hidden rounded-lg sm:max-w-md md:max-w-lg lg:max-w-xl xl:max-w-2xl 2xl:max-w-3xl",
            containerClassName,
          )}
        >
          {cards.map((card, i) => (
            <img
              key={card.id}
              src={card.image}
              alt={card.alt || ""}
              className={cn(
                "rounded-4xl absolute h-full w-full object-cover",
                imageClassName,
              )}
              ref={(el) => {
                imageRefs.current[i] = el;
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

// Example usage component with default data
const Skiper17 = () => {
  const defaultCards = [
    {
      id: 1,
      image: "/images/lummi/img14.png",
    },
    {
      id: 2,
      image: "/images/lummi/img15.png",
    },
    {
      id: 3,
      image: "/images/lummi/img29.png",
    },
    {
      id: 4,
      image: "/images/lummi/img21.png",
    },
    {
      id: 5,
      image: "/images/lummi/img27.png",
    },
  ];

  return (
    <ReactLenis root>
      <div className="h-full w-full">
        <StickyCard002 cards={defaultCards} />
      </div>
    </ReactLenis>
  );
};

export { Skiper17, StickyCard002 };

/**
 * Skiper 17 StickyCard_002 — React + Gsap + scrollTrigger
 * We respect the original creators. This is an inspired rebuild with our own taste and does not claim any ownership.
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
`,

  "skiper-19": `"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import React, { useRef, useState, useEffect } from "react";

// Scroll container detector hook
const useScrollContainer = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let parent = ref.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer(parent);
        break;
      }
      parent = parent.parentElement;
    }
    setResolved(true);
  }, [ref]);

  return {
    resolved,
    container: scrollContainer ? { current: scrollContainer } : undefined,
  };
};

const Skiper19 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolved, container } = useScrollContainer(ref);

  return (
    <div ref={ref} className="w-full">
      {resolved && <Skiper19Inner scrollContainer={container} />}
    </div>
  );
};

const Skiper19Inner = ({ scrollContainer }: { scrollContainer?: React.RefObject<HTMLElement | null> }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    container: scrollContainer,
  });

  return (
    <section
      ref={ref}
      className="mx-auto flex h-[350vh] w-full flex-col items-center overflow-hidden bg-[#FAFDEE] px-4 text-[#1F3A4B]"
    >
      <div className="mt-42 relative flex w-fit flex-col items-center justify-center gap-5 text-center">
        <h1 className="font-jakarta-sans relative z-10 text-7xl font-medium tracking-[-0.08em] lg:text-9xl">
          The Stroke <br /> That follows the <br />
          Scroll Progress
        </h1>
        <p className="font-jakarta-sans relative z-10 max-w-2xl text-xl font-medium text-[#1F3A4B]">
          Scroll down to see the effect
        </p>

        <LinePath
          className="absolute -right-[40%] top-0 z-0"
          scrollYProgress={scrollYProgress}
        />
      </div>

      <div className="rounded-4xl font-jakarta-sans w-full translate-y-[200vh] bg-[#1F3A4B] pb-10 text-[#FAFDEE]">
        <h1 className="mt-10 text-center text-[15.5vw] font-bold leading-[0.9] tracking-tighter lg:text-[16.6vw]">
          skiperui.com
        </h1>
        <div className="mt-80 flex w-full flex-col items-start gap-5 px-4 font-medium lg:mt-0 lg:flex-row lg:justify-between">
          <div className="flex w-full items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
            <p className="w-fit text-sm">
              punjab, india <br />
              and online
            </p>
            <p className="w-fit text-right text-sm lg:text-left">
              sep 1, 2025 <br /> the Moosa pind
            </p>
          </div>
          <div className="flex w-full flex-wrap items-center justify-between gap-12 uppercase lg:w-fit lg:justify-center">
            <p className="w-fit text-sm">
              onilne <br /> free
            </p>
            <p className="w-fit text-right text-sm lg:text-left">
              in person tickets <br /> $600
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export { Skiper19 };

const LinePath = ({
  className,
  scrollYProgress,
}: {
  className: string;
  scrollYProgress: any;
}) => {
  const pathLength = useTransform(scrollYProgress, [0, 1], [0.5, 1]);

  return (
    <svg
      width="1278"
      height="2319"
      viewBox="0 0 1278 2319"
      fill="none"
      overflow="visible"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <motion.path
        d="M876.605 394.131C788.982 335.917 696.198 358.139 691.836 416.303C685.453 501.424 853.722 498.43 941.95 409.714C1016.1 335.156 1008.64 186.907 906.167 142.846C807.014 100.212 712.699 198.494 789.049 245.127C889.053 306.207 986.062 116.979 840.548 43.3233C743.932 -5.58141 678.027 57.1682 672.279 112.188C666.53 167.208 712.538 172.943 736.353 163.088C760.167 153.234 764.14 120.924 746.651 93.3868C717.461 47.4252 638.894 77.8642 601.018 116.979C568.164 150.908 557 201.079 576.467 246.924C593.342 286.664 630.24 310.55 671.68 302.614C756.114 286.446 729.747 206.546 681.86 186.442C630.54 164.898 492 209.318 495.026 287.644C496.837 334.494 518.402 366.466 582.455 367.287C680.013 368.538 771.538 299.456 898.634 292.434C1007.02 286.446 1192.67 309.384 1242.36 382.258C1266.99 418.39 1273.65 443.108 1247.75 474.477C1217.32 511.33 1149.4 511.259 1096.84 466.093C1044.29 420.928 1029.14 380.576 1033.97 324.172C1038.31 273.428 1069.55 228.986 1117.2 216.384C1152.2 207.128 1188.29 213.629 1194.45 245.127C1201.49 281.062 1132.22 280.104 1100.44 272.673C1065.32 264.464 1044.22 234.837 1032.77 201.413C1019.29 162.061 1029.71 131.126 1056.44 100.965C1086.19 67.4032 1143.96 54.5526 1175.78 86.1513C1207.02 117.17 1186.81 143.379 1156.22 166.691C1112.57 199.959 1052.57 186.238 999.784 155.164C957.312 130.164 899.171 63.7054 931.284 26.3214C952.068 2.12513 996.288 3.87363 1007.22 43.58C1018.15 83.2749 1003.56 122.644 975.969 163.376C948.377 204.107 907.272 255.122 913.558 321.045C919.727 385.734 990.968 497.068 1063.84 503.35C1111.46 507.456 1166.79 511.984 1175.68 464.527C1191.52 379.956 1101.26 334.985 1030.29 377.017C971.109 412.064 956.297 483.647 953.797 561.655C947.587 755.413 1197.56 941.828 936.039 1140.66C745.771 1285.32 321.926 950.737 134.536 1202.19C-6.68295 1391.68 -53.4837 1655.38 131.935 1760.5C478.381 1956.91 1124.19 1515 1201.28 1997.83C1273.66 2451.23 100.805 1864.7 303.794 2668.89"
        stroke="#C2F84F"
        strokeWidth="20"
        style={{
          pathLength,
          strokeDashoffset: useTransform(pathLength, (value) => 1 - value),
        }}
      />
    </svg>
  );
};
`,

  "skiper-25": `"use client";

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import useSound from "use-sound";

const Skiper25 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="text-foreground absolute top-[20%] grid content-start justify-items-center gap-6 py-20 text-center">
        <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
          Click to play the music
        </span>
      </div>
      <MusicToggleButton />
    </div>
  );
};

export { Skiper25 };

export const MusicToggleButton = () => {
  const bars = 5;

  const getRandomHeights = () => {
    return Array.from({ length: bars }, () => Math.random() * 0.8 + 0.2);
  };

  const [heights, setHeights] = useState(getRandomHeights());

  const [isPlaying, setIsPlaying] = useState(false);

  const [play, { pause, sound }] = useSound("/audio/audio.m4a", {
    loop: true,
    onplay: () => setIsPlaying(true),
    onend: () => setIsPlaying(false),
    onpause: () => setIsPlaying(false),
    onstop: () => setIsPlaying(false),
    soundEnabled: true,
  });

  useEffect(() => {
    if (isPlaying) {
      const waveformIntervalId = setInterval(() => {
        setHeights(getRandomHeights());
      }, 100);

      return () => {
        clearInterval(waveformIntervalId);
      };
    }
    setHeights(Array(bars).fill(0.1));
  }, [isPlaying]);

  const handleClick = () => {
    if (isPlaying) {
      pause();
      setIsPlaying(false);
      return;
    }
    play();
    setIsPlaying(true);
  };

  return (
    <>
      <motion.div
        onClick={handleClick}
        key="audio"
        initial={{ padding: "14px 14px " }}
        whileHover={{ padding: "18px 22px " }}
        whileTap={{ padding: "18px 22px " }}
        transition={{ duration: 1, bounce: 0.6, type: "spring" }}
        className="bg-background cursor-pointer rounded-full p-2"
      >
        <motion.div
          initial={{ opacity: 0, filter: "blur(4px)" }}
          animate={{
            opacity: 1,
            filter: "blur(0px)",
          }}
          exit={{ opacity: 0, filter: "blur(4px)" }}
          transition={{ type: "spring", bounce: 0.35 }}
          className="flex h-[18px] w-full items-center gap-1 rounded-full"
        >
          {/* Waveform visualization */}
          {heights.map((height, index) => (
            <motion.div
              key={index}
              className="bg-foreground w-[1px] rounded-full"
              initial={{ height: 1 }}
              animate={{
                height: Math.max(4, height * 14),
              }}
              transition={{
                type: "spring",
                stiffness: 300,
                damping: 10,
              }}
            />
          ))}
        </motion.div>
      </motion.div>
    </>
  );
};
`,

  "skiper-26": `"use client";

import { motion } from "framer-motion";
import { GripHorizontal } from "lucide-react";
import { useTheme } from "../theme-provider";
import React, { useCallback, useEffect, useState } from "react";

import { cn } from "@/lib/utils";

const Skiper26 = () => {
  const [variant, setVariant] = useState<AnimationVariant>("rectangle");
  const [start, setStart] = useState<AnimationStart>("bottom-up");
  const [blur, setBlur] = useState<boolean>(false);
  const [gifType, setGifType] = useState<"1" | "2" | "3" | "custom">("1");
  const [gifUrl, setGifUrl] = useState<string>(
    "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s",
  );

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center">
      <div className="mx-auto max-w-lg space-y-5">
        <h2 className="mt-36 text-4xl font-medium tracking-tight">
          07.09.2025 <br />
          Skiper ui is live now
        </h2>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, ex
          eligendi veniam praesentium temporibus natus quae laborum nemo
          repellendus cum!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, ex
          eligendi veniam praesentium temporibus natus quae laborum nemo
          repellendus cum!
        </p>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Nihil, ex
          eligendi veniam praesentium temporibus natus quae laborum nemo
          repellendus cum!
        </p>
      </div>

      <div className="text-foreground grid content-start justify-items-center gap-6 py-20 text-center">
        <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
          Click to toggle the theme
        </span>
      </div>

      <ThemeToggleButton
        variant={variant}
        start={start}
        blur={blur}
        gifUrl={gifUrl}
      />
      <Options
        variant={variant}
        start={start}
        blur={blur}
        gifType={gifType}
        gifUrl={gifUrl}
        setVariant={setVariant}
        setStart={setStart}
        setBlur={setBlur}
        setGifType={setGifType}
        setGifUrl={setGifUrl}
      />
    </div>
  );
};

export { Skiper26 };

const Options = ({
  variant,
  start,
  blur,
  gifType,
  gifUrl,
  setVariant,
  setStart,
  setBlur,
  setGifType,
  setGifUrl,
}: {
  variant: AnimationVariant;
  start: AnimationStart;
  blur: boolean;
  gifType: "1" | "2" | "3" | "custom";
  gifUrl: string;
  setVariant: (variant: AnimationVariant) => void;
  setStart: (start: AnimationStart) => void;
  setBlur: (blur: boolean) => void;
  setGifType: (type: "1" | "2" | "3" | "custom") => void;
  setGifUrl: (url: string) => void;
}) => {
  return (
    <motion.div
      drag
      className="top-30 border-foreground/10 bg-muted2 absolute right-1/2 flex w-[245px] translate-x-1/2 flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm lg:right-4 lg:translate-x-0"
    >
      <div className="flex items-center justify-between">
        <span className="size-4 cursor-grab active:cursor-grabbing">
          <GripHorizontal className="size-4 opacity-50" />
        </span>

        <p className="group flex cursor-pointer items-center justify-center gap-1 rounded-lg px-2 py-1 text-sm opacity-50">
          Options
        </p>
      </div>

      <div className="flex flex-col">
        <div className="mt-1 flex justify-between py-1">
          <p className="w-20 whitespace-nowrap text-sm opacity-50">variant :</p>
          <div className="flex flex-wrap items-center justify-end gap-1">
            <button
              onClick={() => setVariant("circle")}
              className={cn(
                "cursor-pointer px-1 text-sm transition-opacity",
                variant === "circle"
                  ? "opacity-100"
                  : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
              )}
            >
              circle
            </button>
            <button
              onClick={() => setVariant("rectangle")}
              className={cn(
                "cursor-pointer px-1 text-sm transition-opacity",
                variant === "rectangle"
                  ? "opacity-100"
                  : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
              )}
            >
              rectangle
            </button>
            <button
              onClick={() => setVariant("gif")}
              className={cn(
                "cursor-pointer px-1 text-sm transition-opacity",
                variant === "gif"
                  ? "opacity-100"
                  : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
              )}
            >
              gif
            </button>
            <button
              onClick={() => setVariant("polygon")}
              className={cn(
                "cursor-pointer px-1 text-sm transition-opacity",
                variant === "polygon"
                  ? "opacity-100"
                  : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
              )}
            >
              polygon
            </button>
            <button
              onClick={() => setVariant("circle-blur")}
              className={cn(
                "cursor-pointer px-1 text-sm transition-opacity",
                variant === "circle-blur"
                  ? "opacity-100"
                  : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
              )}
            >
              circle-blur
            </button>
          </div>
        </div>

        <div className="mt-1 flex justify-between py-1">
          <p className="w-20 whitespace-nowrap text-sm opacity-50">blur :</p>
          <div className="flex flex-wrap items-center justify-end gap-1">
            <button
              onClick={() => setBlur(false)}
              className={cn(
                "cursor-pointer px-1 text-sm transition-opacity",
                !blur
                  ? "opacity-100"
                  : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
              )}
            >
              off
            </button>
            <button
              onClick={() => setBlur(true)}
              className={cn(
                "cursor-pointer px-1 text-sm transition-opacity",
                blur
                  ? "opacity-100"
                  : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
              )}
            >
              on
            </button>
          </div>
        </div>

        {/* Show start options for circle, rectangle, polygon, and circle-blur */}
        {(variant === "circle" ||
          variant === "rectangle" ||
          variant === "polygon" ||
          variant === "circle-blur") && (
          <div className="mt-1 flex justify-between py-1">
            <p className="w-20 whitespace-nowrap text-sm opacity-50">start :</p>
            <div className="flex flex-wrap items-center justify-end gap-1">
              {/* Show center option only for circle and circle-blur */}
              {(variant === "circle" || variant === "circle-blur") && (
                <button
                  onClick={() => setStart("center")}
                  className={cn(
                    "cursor-pointer px-1 text-sm transition-opacity",
                    start === "center"
                      ? "opacity-100"
                      : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                  )}
                >
                  center
                </button>
              )}

              {/* Show directional options for rectangle */}
              {variant === "rectangle" && (
                <>
                  <button
                    onClick={() => setStart("bottom-up")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "bottom-up"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    bottom-up
                  </button>
                  <button
                    onClick={() => setStart("top-down")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "top-down"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    top-down
                  </button>
                  <button
                    onClick={() => setStart("left-right")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "left-right"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    left-right
                  </button>
                  <button
                    onClick={() => setStart("right-left")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "right-left"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    right-left
                  </button>
                </>
              )}

              {/* Show corner options for circle, polygon, and circle-blur variants */}
              {(variant === "circle" ||
                variant === "polygon" ||
                variant === "circle-blur") && (
                <>
                  <button
                    onClick={() => setStart("top-left")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "top-left"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    top-left
                  </button>
                  <button
                    onClick={() => setStart("top-right")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "top-right"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    top-right
                  </button>
                  {/* Only show bottom corners for circle, not polygon */}
                  {variant !== "polygon" && (
                    <>
                      <button
                        onClick={() => setStart("bottom-left")}
                        className={cn(
                          "cursor-pointer px-1 text-sm transition-opacity",
                          start === "bottom-left"
                            ? "opacity-100"
                            : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                        )}
                      >
                        bottom-left
                      </button>
                      <button
                        onClick={() => setStart("bottom-right")}
                        className={cn(
                          "cursor-pointer px-1 text-sm transition-opacity",
                          start === "bottom-right"
                            ? "opacity-100"
                            : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                        )}
                      >
                        bottom-right
                      </button>
                    </>
                  )}
                </>
              )}

              {/* Show center options for circle and circle-blur */}
              {(variant === "circle" || variant === "circle-blur") && (
                <>
                  <button
                    onClick={() => setStart("top-center")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "top-center"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    top-center
                  </button>
                  <button
                    onClick={() => setStart("bottom-center")}
                    className={cn(
                      "cursor-pointer px-1 text-sm transition-opacity",
                      start === "bottom-center"
                        ? "opacity-100"
                        : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                    )}
                  >
                    bottom-center
                  </button>
                </>
              )}
            </div>
          </div>
        )}

        {/* Show gif type options only for gif variant */}
        {variant === "gif" && (
          <div className="mt-1 flex justify-between py-1">
            <p className="w-20 text-sm opacity-50">gif type :</p>
            <div className="flex flex-wrap items-center justify-end gap-1">
              <button
                onClick={() => {
                  setGifType("1");
                  setGifUrl(
                    "https://media.giphy.com/media/KBbr4hHl9DSahKvInO/giphy.gif?cid=790b76112m5eeeydoe7et0cr3j3ekb1erunxozyshuhxx2vl&ep=v1_stickers_search&rid=giphy.gif&ct=s",
                  );
                }}
                className={cn(
                  "cursor-pointer px-1 text-sm transition-opacity",
                  gifType === "1"
                    ? "opacity-100"
                    : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                )}
              >
                1
              </button>
              <button
                onClick={() => {
                  setGifType("2");
                  setGifUrl(
                    "https://media.giphy.com/media/5PncuvcXbBuIZcSiQo/giphy.gif?cid=ecf05e47j7vdjtytp3fu84rslaivdun4zvfhej6wlvl6qqsz&ep=v1_stickers_search&rid=giphy.gif&ct=s",
                  );
                }}
                className={cn(
                  "cursor-pointer px-1 text-sm transition-opacity",
                  gifType === "2"
                    ? "opacity-100"
                    : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                )}
              >
                2
              </button>
              <button
                onClick={() => {
                  setGifType("3");
                  setGifUrl(
                    "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExZ3JwcXdzcHd5MW92NWprZXVpcTBtNXM5cG9obWh0N3I4NzFpaDE3byZlcD12MV9zdGlja2Vyc19zZWFyY2gmY3Q9cw/WgsVx6C4N8tjy/giphy.gif",
                  );
                }}
                className={cn(
                  "cursor-pointer px-1 text-sm transition-opacity",
                  gifType === "3"
                    ? "opacity-100"
                    : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                )}
              >
                3
              </button>
              <button
                onClick={() => setGifType("custom")}
                className={cn(
                  "cursor-pointer px-1 text-sm transition-opacity",
                  gifType === "custom"
                    ? "opacity-100"
                    : "hover:bg-foreground/10 opacity-50 hover:opacity-100",
                )}
              >
                custom
              </button>
            </div>
          </div>
        )}

        {/* Show input only when gif variant and custom type are selected */}
        {variant === "gif" && gifType === "custom" && (
          <div className="mt-1 flex flex-col gap-1 py-1">
            <p className="text-sm opacity-50">gif url :</p>
            <input
              type="text"
              value={gifUrl}
              onChange={(e) => setGifUrl(e.target.value)}
              placeholder="Enter GIF URL"
              className="text-foreground placeholder:text-foreground/50 w-full rounded-lg bg-transparent px-2 py-1 text-xs focus:outline-none"
            />
          </div>
        )}
      </div>
    </motion.div>
  );
};

// ///////////////////////////////////////////////////////////////////////////
// Custom hook for theme toggle functionality
export const useThemeToggle = ({
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
} = {}) => {
  const { theme, setTheme } = useTheme();

  const [isDark, setIsDark] = useState(false);

  // Sync isDark state with theme
  useEffect(() => {
    setIsDark(theme === "dark");
  }, [theme]);

  const styleId = "theme-transition-styles";

  const updateStyles = useCallback((css: string, name: string) => {
    if (typeof window === "undefined") return;

    let styleElement = document.getElementById(styleId) as HTMLStyleElement;

    if (!styleElement) {
      styleElement = document.createElement("style");
      styleElement.id = styleId;
      document.head.appendChild(styleElement);
    }

    styleElement.textContent = css;
  }, []);

  const toggleTheme = useCallback(() => {
    setIsDark(!isDark);

    const animation = createAnimation(variant, start, blur, gifUrl);

    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme(theme === "light" ? "dark" : "light");
    };

    if (!(document as any).startViewTransition) {
      switchTheme();
      return;
    }

    (document as any).startViewTransition(switchTheme);
  }, [
    theme,
    setTheme,
    variant,
    start,
    blur,
    gifUrl,
    updateStyles,
    isDark,
    setIsDark,
  ]);

  const setCrazyLightTheme = useCallback(() => {
    setIsDark(false);

    const animation = createAnimation(variant, start, blur, gifUrl);

    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme("light");
    };

    if (!(document as any).startViewTransition) {
      switchTheme();
      return;
    }

    (document as any).startViewTransition(switchTheme);
  }, [setTheme, variant, start, blur, gifUrl, updateStyles, setIsDark]);

  const setCrazyDarkTheme = useCallback(() => {
    setIsDark(true);

    const animation = createAnimation(variant, start, blur, gifUrl);

    updateStyles(animation.css, animation.name);

    if (typeof window === "undefined") return;

    const switchTheme = () => {
      setTheme("dark");
    };

    if (!(document as any).startViewTransition) {
      switchTheme();
      return;
    }

    (document as any).startViewTransition(switchTheme);
  }, [setTheme, variant, start, blur, gifUrl, updateStyles, setIsDark]);

  const setCrazySystemTheme = useCallback(() => {
    if (typeof window === "undefined") return;

    // Check system preference for dark mode
    const prefersDark = window.matchMedia(
      "(prefers-color-scheme: dark)",
    ).matches;
    setIsDark(prefersDark);

    const animation = createAnimation(variant, start, blur, gifUrl);

    updateStyles(animation.css, animation.name);

    const switchTheme = () => {
      setTheme(prefersDark ? "dark" : "light");
    };

    if (!(document as any).startViewTransition) {
      switchTheme();
      return;
    }

    (document as any).startViewTransition(switchTheme);
  }, [setTheme, variant, start, blur, gifUrl, updateStyles, setIsDark]);

  return {
    isDark,
    setIsDark,
    toggleTheme,
    setCrazyLightTheme,
    setCrazyDarkTheme,
    setCrazySystemTheme,
  };
};

// ///////////////////////////////////////////////////////////////////////////

export const ThemeToggleButton = ({
  className = "",
  variant = "circle",
  start = "center",
  blur = false,
  gifUrl = "",
}: {
  className?: string;
  variant?: AnimationVariant;
  start?: AnimationStart;
  blur?: boolean;
  gifUrl?: string;
}) => {
  const { isDark, toggleTheme } = useThemeToggle({
    variant,
    start,
    blur,
    gifUrl,
  });

  return (
    <button
      type="button"
      className={cn(
        "size-10 cursor-pointer rounded-full bg-black p-0 transition-all duration-300 active:scale-95",
        className,
      )}
      onClick={toggleTheme}
      aria-label="Toggle theme"
    >
      <span className="sr-only">Toggle theme</span>
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="white"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill="black"
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.5 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

// ///////////////////////////////////////////////////////////////////////////

export type AnimationVariant =
  | "circle"
  | "rectangle"
  | "gif"
  | "polygon"
  | "circle-blur";
export type AnimationStart =
  | "top-left"
  | "top-right"
  | "bottom-left"
  | "bottom-right"
  | "center"
  | "top-center"
  | "bottom-center"
  | "bottom-up"
  | "top-down"
  | "left-right"
  | "right-left";

interface Animation {
  name: string;
  css: string;
}

const getPositionCoords = (position: AnimationStart) => {
  switch (position) {
    case "top-left":
      return { cx: "0", cy: "0" };
    case "top-right":
      return { cx: "40", cy: "0" };
    case "bottom-left":
      return { cx: "0", cy: "40" };
    case "bottom-right":
      return { cx: "40", cy: "40" };
    case "top-center":
      return { cx: "20", cy: "0" };
    case "bottom-center":
      return { cx: "20", cy: "40" };
    // For directional positions, default to center (these are used for rectangle variant)
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return { cx: "20", cy: "20" };
  }
};

const generateSVG = (variant: AnimationVariant, start: AnimationStart) => {
  // circle-blur variant handles center case differently, so check it first
  if (variant === "circle-blur") {
    if (start === "center") {
      return \`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="20" cy="20" r="18" fill="white" filter="url(%23blur)"/></svg>\`;
    }
    const positionCoords = getPositionCoords(start);
    if (!positionCoords) {
      throw new Error(\`Invalid start position: \${start}\`);
    }
    const { cx, cy } = positionCoords;
    return \`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><defs><filter id="blur"><feGaussianBlur stdDeviation="2"/></filter></defs><circle cx="\${cx}" cy="\${cy}" r="18" fill="white" filter="url(%23blur)"/></svg>\`;
  }

  if (start === "center") return;

  // Rectangle variant doesn't use SVG masks, so return early
  if (variant === "rectangle") return "";

  const positionCoords = getPositionCoords(start);
  if (!positionCoords) {
    throw new Error(\`Invalid start position: \${start}\`);
  }
  const { cx, cy } = positionCoords;

  if (variant === "circle") {
    return \`data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 40 40"><circle cx="\${cx}" cy="\${cy}" r="20" fill="white"/></svg>\`;
  }

  return "";
};

const getTransformOrigin = (start: AnimationStart) => {
  switch (start) {
    case "top-left":
      return "top left";
    case "top-right":
      return "top right";
    case "bottom-left":
      return "bottom left";
    case "bottom-right":
      return "bottom right";
    case "top-center":
      return "top center";
    case "bottom-center":
      return "bottom center";
    // For directional positions, default to center
    case "bottom-up":
    case "top-down":
    case "left-right":
    case "right-left":
      return "center";
  }
};

export const createAnimation = (
  variant: AnimationVariant,
  start: AnimationStart = "center",
  blur = false,
  url?: string,
): Animation => {
  const svg = generateSVG(variant, start);
  const transformOrigin = getTransformOrigin(start);

  if (variant === "rectangle") {
    const getClipPath = (direction: AnimationStart) => {
      switch (direction) {
        case "bottom-up":
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-down":
          return {
            from: "polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "left-right":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "right-left":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-left":
          return {
            from: "polygon(0% 0%, 0% 0%, 0% 0%, 0% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "top-right":
          return {
            from: "polygon(100% 0%, 100% 0%, 100% 0%, 100% 0%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "bottom-left":
          return {
            from: "polygon(0% 100%, 0% 100%, 0% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        case "bottom-right":
          return {
            from: "polygon(100% 100%, 100% 100%, 100% 100%, 100% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
        default:
          return {
            from: "polygon(0% 100%, 100% 100%, 100% 100%, 0% 100%)",
            to: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
          };
      }
    };

    const clipPath = getClipPath(start);

    return {
      name: \`\${variant}-\${start}\${blur ? "-blur" : ""}\`,
      css: \`
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-\${start}\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-\${start}\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-\${start}\${blur ? "-blur" : ""} {
        from {
          clip-path: \${clipPath.from};
          \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: \${clipPath.to};
          \${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-\${start}\${blur ? "-blur" : ""} {
        from {
          clip-path: \${clipPath.from};
          \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: \${clipPath.to};
          \${blur ? "filter: blur(0px);" : ""}
        }
      }
      \`,
    };
  }
  if (variant === "circle" && start == "center") {
    return {
      name: \`\${variant}-\${start}\${blur ? "-blur" : ""}\`,
      css: \`
       ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark\${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at 50% 50%);
          \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          \${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light\${blur ? "-blur" : ""} {
        from {
           clip-path: circle(0% at 50% 50%);
           \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(100.0% at 50% 50%);
          \${blur ? "filter: blur(0px);" : ""}
        }
      }
      \`,
    };
  }
  if (variant === "gif") {
    return {
      name: \`\${variant}-\${start}\`,
      css: \`
      ::view-transition-group(root) {
  animation-timing-function: var(--expo-in);
}

::view-transition-new(root) {
  mask: url('\${url}') center / 0 no-repeat;
  animation: scale 3s;
}

::view-transition-old(root),
.dark::view-transition-old(root) {
  animation: scale 3s;
}

@keyframes scale {
  0% {
    mask-size: 0;
  }
  10% {
    mask-size: 50vmax;
  }
  90% {
    mask-size: 50vmax;
  }
  100% {
    mask-size: 2000vmax;
  }
}\`,
    };
  }

  if (variant === "circle-blur") {
    if (start === "center") {
      return {
        name: \`\${variant}-\${start}\`,
        css: \`
        ::view-transition-group(root) {
          animation-timing-function: var(--expo-out);
        }

        ::view-transition-new(root) {
          mask: url('\${svg}') center / 0 no-repeat;
          mask-origin: content-box;
          animation: scale 1s;
          transform-origin: center;
        }

        ::view-transition-old(root),
        .dark::view-transition-old(root) {
          animation: scale 1s;
          transform-origin: center;
          z-index: -1;
        }

        @keyframes scale {
          to {
            mask-size: 350vmax;
          }
        }
        \`,
      };
    }

    return {
      name: \`\${variant}-\${start}\`,
      css: \`
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-out);
      }

      ::view-transition-new(root) {
        mask: url('\${svg}') \${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale 1s;
        transform-origin: \${transformOrigin};
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale 1s;
        transform-origin: \${transformOrigin};
        z-index: -1;
      }

      @keyframes scale {
        to {
          mask-size: 350vmax;
        }
      }
      \`,
    };
  }

  if (variant === "polygon") {
    const getPolygonClipPaths = (position: AnimationStart) => {
      switch (position) {
        case "top-left":
          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          };
        case "top-right":
          return {
            darkFrom: "polygon(150% -71%, 250% 71%, 250% 71%, 150% -71%)",
            darkTo: "polygon(150% -71%, 250% 71%, 50% 171%, -71% 50%)",
            lightFrom: "polygon(-71% 50%, 50% 171%, 50% 171%, -71% 50%)",
            lightTo: "polygon(-71% 50%, 50% 171%, 250% 71%, 150% -71%)",
          };
        default:
          // Default to top-left behavior
          return {
            darkFrom: "polygon(50% -71%, -50% 71%, -50% 71%, 50% -71%)",
            darkTo: "polygon(50% -71%, -50% 71%, 50% 171%, 171% 50%)",
            lightFrom: "polygon(171% 50%, 50% 171%, 50% 171%, 171% 50%)",
            lightTo: "polygon(171% 50%, 50% 171%, -50% 71%, 50% -71%)",
          };
      }
    };

    const clipPaths = getPolygonClipPaths(start);

    return {
      name: \`\${variant}-\${start}\${blur ? "-blur" : ""}\`,
      css: \`
      ::view-transition-group(root) {
        animation-duration: 0.7s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-\${start}\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-\${start}\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-\${start}\${blur ? "-blur" : ""} {
        from {
          clip-path: \${clipPaths.darkFrom};
          \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: \${clipPaths.darkTo};
          \${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-\${start}\${blur ? "-blur" : ""} {
        from {
          clip-path: \${clipPaths.lightFrom};
          \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: \${clipPaths.lightTo};
          \${blur ? "filter: blur(0px);" : ""}
        }
      }
      \`,
    };
  }

  // Handle circle variants with start positions using clip-path
  if (variant === "circle" && start !== "center") {
    const getClipPathPosition = (position: AnimationStart) => {
      switch (position) {
        case "top-left":
          return "0% 0%";
        case "top-right":
          return "100% 0%";
        case "bottom-left":
          return "0% 100%";
        case "bottom-right":
          return "100% 100%";
        case "top-center":
          return "50% 0%";
        case "bottom-center":
          return "50% 100%";
        default:
          return "50% 50%";
      }
    };

    const clipPosition = getClipPathPosition(start);

    return {
      name: \`\${variant}-\${start}\${blur ? "-blur" : ""}\`,
      css: \`
       ::view-transition-group(root) {
        animation-duration: 1s;
        animation-timing-function: var(--expo-out);
      }
            
      ::view-transition-new(root) {
        animation-name: reveal-light-\${start}\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: none;
        z-index: -1;
      }
      .dark::view-transition-new(root) {
        animation-name: reveal-dark-\${start}\${blur ? "-blur" : ""};
        \${blur ? "filter: blur(2px);" : ""}
      }

      @keyframes reveal-dark-\${start}\${blur ? "-blur" : ""} {
        from {
          clip-path: circle(0% at \${clipPosition});
          \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(150.0% at \${clipPosition});
          \${blur ? "filter: blur(0px);" : ""}
        }
      }

      @keyframes reveal-light-\${start}\${blur ? "-blur" : ""} {
        from {
           clip-path: circle(0% at \${clipPosition});
           \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          clip-path: circle(150.0% at \${clipPosition});
          \${blur ? "filter: blur(0px);" : ""}
        }
      }
      \`,
    };
  }

  return {
    name: \`\${variant}-\${start}\${blur ? "-blur" : ""}\`,
    css: \`
      ::view-transition-group(root) {
        animation-timing-function: var(--expo-in);
      }
      ::view-transition-new(root) {
        mask: url('\${svg}') \${start.replace("-", " ")} / 0 no-repeat;
        mask-origin: content-box;
        animation: scale-\${start}\${blur ? "-blur" : ""} 1s;
        transform-origin: \${transformOrigin};
        \${blur ? "filter: blur(2px);" : ""}
      }
      ::view-transition-old(root),
      .dark::view-transition-old(root) {
        animation: scale-\${start}\${blur ? "-blur" : ""} 1s;
        transform-origin: \${transformOrigin};
        z-index: -1;
      }
      @keyframes scale-\${start}\${blur ? "-blur" : ""} {
        from {
          \${blur ? "filter: blur(8px);" : ""}
        }
        \${blur ? "50% { filter: blur(4px); }" : ""}
        to {
          mask-size: 2000vmax;
          \${blur ? "filter: blur(0px);" : ""}
        }
      }
    \`,
  };
};
`,

  "skiper-28": `"use client";

import {
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef, useState, useEffect } from "react";

// Scroll container detector hook
const useScrollContainer = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let parent = ref.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer(parent);
        break;
      }
      parent = parent.parentElement;
    }
    setResolved(true);
  }, [ref]);

  return {
    resolved,
    container: scrollContainer ? { current: scrollContainer } : undefined,
  };
};

const Skiper28 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolved, container } = useScrollContainer(ref);

  return (
    <div ref={ref} className="w-full">
      {resolved && <Skiper28Inner scrollContainer={container} />}
    </div>
  );
};

const Skiper28Inner = ({ scrollContainer }: { scrollContainer?: React.RefObject<HTMLElement | null> }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: scrollContainer,
  });

  const yMotionValue = useTransform(scrollYProgress, [0, 1], [487, 0]);
  const transform = useMotionTemplate\`rotateX(30deg) translateY(\${yMotionValue}px) translateZ(10px)\`;

  return (
    <ReactLenis root>
      <div
        ref={targetRef}
        className="relative z-0 h-[300vh] w-full bg-[#f5f4f3] text-black"
      >
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll down to see
          </span>
        </div>
        <div
          className="sticky top-0 mx-auto flex items-center justify-center bg-transparent py-20"
          style={{
            transformStyle: "preserve-3d",
            perspective: "200px",
          }}
        >
          <motion.div
            style={{
              transformStyle: "preserve-3d",
              transform,
            }}
            className="font-geist w-full max-w-4xl text-center text-6xl font-bold tracking-tighter text-[#ff5800]"
          >
            Jatt seeweyan cho langheya chudail takkri jaani badi sohni bhoot
            female takkri .. kehndi jatta .. oye jatta.... kehndi jatta .. metho
            darke ho ja katha .. nai tan aah kar du ... nai tan waah kardu...
            tenu ethe khade khade nu swah kardu ... jatt kehnda hor menu ki
            chahida ... jatt kehnda hor menu ki chahida .. avein gallan-baatan
            vich bohta sama na gva aaja chimbad ja ... mein keha chimbad ja .. .
            aaja chimbad ja ... mein keha chimbad ja .. .
            <div className="absolute bottom-0 left-0 h-[60vh] w-full bg-gradient-to-b from-transparent to-white" />
          </motion.div>
        </div>
      </div>
    </ReactLenis>
  );
};

export { Skiper28 };
`,

  "skiper-3": `"use client";

import { motion } from "framer-motion";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

const Skiper3 = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <div className="flex h-full w-full items-center justify-center rounded-full">
      <motion.div layout>
        <motion.div
          className={cn(
            "h-15 relative flex items-center justify-between overflow-hidden rounded-full",
          )}
          style={{ borderRadius: 9999, width: 60 }}
          initial={{ scale: 0, y: "100%" }}
          transition={{ type: "spring", bounce: 0.16 }}
          animate={{ scale: 1, y: 0, width: !toggle ? 60 : 330 }}
        >
          <div className="bg-foreground/20 flex h-full w-[260px] items-center justify-center gap-2 rounded-full">
            {toggle && (
              <motion.div
                animate={{ opacity: 1 }}
                initial={{ opacity: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.25 }}
                className="flex items-center justify-center gap-2"
              >
                <span className="bg-foreground/20 h-[10px] w-[60px] rounded-full" />
                <span className="bg-foreground/20 size-[10px] rounded-full" />
                <span className="bg-foreground/20 size-[10px] rounded-full" />
                <span className="bg-foreground/20 size-[10px] rounded-full" />
                <span className="bg-foreground/20 size-[10px] rounded-full" />
              </motion.div>
            )}
          </div>
          {toggle && (
            <div className="bg-foreground/20 flex h-full w-[60px] items-center justify-center gap-2 rounded-full">
              <motion.div
                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                className="flex items-center justify-center gap-2"
              >
                <motion.svg
                  key="play"
                  initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                  transition={{ delay: 0.25 }}
                  viewBox="-1 0 12 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="text-foreground/8 h-5 w-5 fill-current"
                >
                  <path d="M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" />
                </motion.svg>
              </motion.div>
            </div>
          )}
        </motion.div>
      </motion.div>
      <button
        onClick={() => setToggle((x) => !x)}
        className="bg-foreground/8 absolute bottom-10 my-10 rounded-full px-7 py-1 active:scale-95"
      >
        Toggle
      </button>
    </div>
  );
};

export { Skiper3 };
`,

  "skiper-30": `"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import Lenis from "lenis";
import React, { useEffect, useRef, useState } from "react";

const images = [
  "/images/lummi/img15.png",
  "/images/lummi/img21.png",
  "/images/lummi/img3.png",
  "/images/lummi/img4.png",
  "/images/lummi/img5.png",
  "/images/lummi/img6.png",
  "/images/lummi/img7.png",
  "/images/lummi/img8.png",
  "/images/lummi/img24.png",
  "/images/lummi/img10.png",
  "/images/lummi/img11.png",
  "/images/lummi/img12.png",
  "/images/lummi/img13.png",
];

// Scroll container detector hook
const useScrollContainer = (ref: React.RefObject<HTMLElement | null>) => {
  const [scrollContainer, setScrollContainer] = useState<HTMLElement | null>(null);
  const [resolved, setResolved] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    let parent = ref.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer(parent);
        break;
      }
      parent = parent.parentElement;
    }
    setResolved(true);
  }, [ref]);

  return {
    resolved,
    container: scrollContainer ? { current: scrollContainer } : undefined,
  };
};

const Skiper30 = () => {
  const ref = useRef<HTMLDivElement>(null);
  const { resolved, container } = useScrollContainer(ref);

  return (
    <div ref={ref} className="w-full">
      {resolved && <Skiper30Inner scrollContainer={container} />}
    </div>
  );
};

const Skiper30Inner = ({ scrollContainer }: { scrollContainer?: React.RefObject<HTMLElement | null> }) => {
  const gallery = useRef<HTMLDivElement>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    container: scrollContainer,
    offset: ["start end", "end start"],
  });

  const { height } = dimension;
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className="w-full bg-[#eee] text-black">
      <div className="font-geist flex h-screen items-center justify-center gap-2">
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll down to see
          </span>
        </div>
      </div>

      <div
        ref={gallery}
        className="relative box-border flex h-[175vh] gap-[2vw] overflow-hidden bg-white p-[2vw]"
      >
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[6], images[7], images[8]]} y={y4} />
      </div>
      <div className="font-geist relative flex h-screen items-center justify-center gap-2">
        <div className="absolute left-1/2 top-[10%] grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            scroll Up to see
          </span>
        </div>
      </div>
    </main>
  );
};

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column = ({ images, y }: ColumnProps) => {
  return (
    <motion.div
      className="relative -top-[45%] flex h-full w-1/4 min-w-[250px] flex-col gap-[2vw] first:top-[-45%] [&:nth-child(2)]:top-[-95%] [&:nth-child(3)]:top-[-45%] [&:nth-child(4)]:top-[-75%]"
      style={{ y }}
    >
      {images.map((src, i) => (
        <div key={i} className="relative h-full w-full overflow-hidden">
          <img
            src={src}
            alt="image"
            className="pointer-events-none object-cover"
          />
        </div>
      ))}
    </motion.div>
  );
};

export { Skiper30 };
`,

  "skiper-31": `"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import ReactLenis from "lenis/react";
import React, { useRef } from "react";

import { cn } from "@/lib/utils";

type CharacterProps = {
  char: string;
  index: number;
  centerIndex: number;
  scrollYProgress: any;
};

const CharacterV1 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";

  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const rotateX = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  return (
    <motion.span
      className={cn("inline-block text-orange-500", isSpace && "w-4")}
      style={{
        x,
        rotateX,
      }}
    >
      {char}
    </motion.span>
  );
};
const CharacterV2 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [Math.abs(distanceFromCenter) * 50, 0],
  );

  return (
    <motion.img
      src={char}
      className={cn("inline-block size-12 md:size-16 object-contain", isSpace && "w-4")}
      style={{
        x,
        scale,
        y,
        transformOrigin: "center",
      }}
    />
  );
};
const CharacterV3 = ({
  char,
  index,
  centerIndex,
  scrollYProgress,
}: CharacterProps) => {
  const isSpace = char === " ";
  const distanceFromCenter = index - centerIndex;

  const x = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 90, 0],
  );
  const rotate = useTransform(
    scrollYProgress,
    [0, 0.5],
    [distanceFromCenter * 50, 0],
  );

  const y = useTransform(
    scrollYProgress,
    [0, 0.5],
    [-Math.abs(distanceFromCenter) * 20, 0],
  );
  const scale = useTransform(scrollYProgress, [0, 0.5], [0.75, 1]);

  return (
    <motion.img
      src={char}
      className={cn("inline-block size-12 md:size-16 object-contain", isSpace && "w-4")}
      style={{
        x,
        rotate,
        y,
        scale,
        transformOrigin: "center",
      }}
    />
  );
};

const Skiper31 = () => {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const targetRef = useRef<HTMLDivElement | null>(null);
  const targetRef2 = useRef<HTMLDivElement | null>(null);
  const targetRef3 = useRef<HTMLDivElement | null>(null);

  const [scrollContainer, setScrollContainer] = React.useState<React.RefObject<HTMLElement | null> | undefined>(undefined);

  React.useEffect(() => {
    if (!rootRef.current) return;
    let parent = rootRef.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer({ current: parent });
        break;
      }
      parent = parent.parentElement;
    }
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    container: scrollContainer,
  });
  const { scrollYProgress: scrollYProgress2 } = useScroll({
    target: targetRef2,
    container: scrollContainer,
  });
  const { scrollYProgress: scrollYProgress3 } = useScroll({
    target: targetRef3,
    container: scrollContainer,
  });

  const text = "see more from gxuri";
  const characters = text.split("");
  const centerIndex = Math.floor(characters.length / 2);

  const macIcon = [
    "/mac/Discord.png",
    "/mac/figma.png",
    "/mac/Framer.png",
    "/mac/Github.png",
    "/mac/Monog.png",
    "/mac/notion.png",
    "/mac/Pieces.png",
    "/mac/Postman.png",
    "/mac/vsCode.png",
  ];
  const iconCenterIndex = Math.floor(macIcon.length / 2);

  return (
    <ReactLenis root>
      <main ref={rootRef} className="w-full bg-white">
        <div className="top-22 absolute left-1/2 z-10 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']">
            Scroll to see more
          </span>
        </div>
        <div
          ref={targetRef}
          className="relative box-border flex h-[210vh] items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <div
            className="font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black"
            style={{
              perspective: "500px",
            }}
          >
            {characters.map((char, index) => (
              <CharacterV1
                key={index}
                char={char}
                index={index}
                centerIndex={centerIndex}
                scrollYProgress={scrollYProgress}
              />
            ))}
          </div>
        </div>
        <div
          ref={targetRef2}
          className="relative -mt-[100vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          <p className="font-geist flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-black">
            <Bracket className="h-12 text-black" />
            <span className="font-geist font-medium">
              intergrate with your fav tech stack
            </span>
            <Bracket className="h-12 scale-x-[-1] text-black" />
          </p>
          <div className="font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black">
            {macIcon.map((char, index) => (
              <CharacterV2
                key={index}
                char={char}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress2}
              />
            ))}
          </div>
        </div>
        <div
          ref={targetRef3}
          className="relative -mt-[95vh] box-border flex h-[210vh] flex-col items-center justify-center gap-[2vw] overflow-hidden bg-[#f5f4f3] p-[2vw]"
        >
          {" "}
          <p className="font-geist flex items-center justify-center gap-3 text-2xl font-medium tracking-tight text-black">
            <Bracket className="h-12 text-black" />
            <span className="font-geist font-medium">
              intergrate with your fav tech stack
            </span>
            <Bracket className="h-12 scale-x-[-1] text-black" />
          </p>
          <div
            className="font-geist w-full max-w-4xl text-center text-6xl font-bold uppercase tracking-tighter text-black"
            style={{
              perspective: "500px",
            }}
          >
            {macIcon.map((char, index) => (
              <CharacterV3
                key={index}
                char={char}
                index={index}
                centerIndex={iconCenterIndex}
                scrollYProgress={scrollYProgress3}
              />
            ))}
          </div>
        </div>
      </main>
    </ReactLenis>
  );
};

export { CharacterV1, CharacterV2, CharacterV3, Skiper31 };

const Bracket = ({ className }: { className: string }) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 27 78"
      className={className}
    >
      <path
        fill="#000"
        d="M26.52 77.21h-5.75c-6.83 0-12.38-5.56-12.38-12.38V48.38C8.39 43.76 4.63 40 .01 40v-4c4.62 0 8.38-3.76 8.38-8.38V12.4C8.38 5.56 13.94 0 20.77 0h5.75v4h-5.75c-4.62 0-8.38 3.76-8.38 8.38V27.6c0 4.34-2.25 8.17-5.64 10.38 3.39 2.21 5.64 6.04 5.64 10.38v16.45c0 4.62 3.76 8.38 8.38 8.38h5.75v4.02Z"
      ></path>
    </svg>
  );
};

/**
 * Skiper 31 ScrollAnimation_002 — React + framer motion + lenis
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
`,

  "skiper-34": `"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useScroll,
  useTransform,
} from "framer-motion";
import ReactLenis from "lenis/react";
import { useEffect, useRef, useState } from "react";

const images = [
  "/images/lummi/img14.png",
  "/images/lummi/img30.png",
  "/images/lummi/img19.png",
  "/images/lummi/img21.png",
  "/images/lummi/img23.png",
  "/images/lummi/imgp2.png",
  "/images/lummi/img27.png",
];

const Skiper34 = () => {
  return (
    <ReactLenis root>
      <section className="relative flex w-screen flex-col items-center gap-[10vh] px-4 pt-[50vh]">
        <div className="absolute left-1/2 top-24 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center">
          <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
            scroll down to see effect
          </span>
        </div>
        {images.map((img, idx) => (
          <StickyCard_003 key={idx} imgUrl={img} />
        ))}
      </section>
    </ReactLenis>
  );
};

const StickyCard_003 = ({ imgUrl }: { imgUrl: string }) => {
  const vertMargin = 10;
  const container = useRef<HTMLDivElement>(null);
  const [maxScrollY, setMaxScrollY] = useState(Infinity);
  const [scrollContainer, setScrollContainer] = useState<React.RefObject<HTMLElement | null> | undefined>(undefined);

  useEffect(() => {
    if (!container.current) return;
    let parent = container.current.parentElement;
    while (parent) {
      const overflow = window.getComputedStyle(parent).overflowY;
      if (overflow === "auto" || overflow === "scroll") {
        setScrollContainer({ current: parent });
        break;
      }
      parent = parent.parentElement;
    }
  }, []);

  const filter = useMotionValue(0);
  // Remove filter2, add negateFilter
  const negateFilter = useTransform(filter, (value) => -value);

  const { scrollY } = useScroll({
    target: container,
    container: scrollContainer,
  });
  const scale = useTransform(scrollY, [maxScrollY, maxScrollY + 10000], [1, 0]);
  const isInView = useInView(container, {
    margin: \`0px 0px -\${100 - vertMargin}% 0px\`,
    once: true,
  });

  scrollY.on("change", (scrollY) => {
    let animationValue = 1;
    if (scrollY > maxScrollY) {
      animationValue = Math.max(0, 1 - (scrollY - maxScrollY) / 10000);
    }

    scale.set(animationValue);
    filter.set((1 - animationValue) * 100);
  });

  useEffect(() => {
    if (isInView) {
      setMaxScrollY(scrollY.get());
    }
  }, [isInView]);

  return (
    <motion.div
      ref={container}
      className="rounded-4xl sticky h-[200px] w-full max-w-4xl overflow-hidden bg-neutral-200"
      style={{
        scale: scale,
        rotate: filter,
        height: \`\${100 - 2 * vertMargin}vh\`,
        top: \`\${vertMargin}vh\`,
      }}
    >
      <motion.img
        src={imgUrl}
        alt={imgUrl}
        style={{
          rotate: negateFilter,
        }}
        className="h-full w-full scale-125 object-cover"
        sizes="90vw"
      />
    </motion.div>
  );
};

export { Skiper34, StickyCard_003 };

/**
 * Skiper 34 StickyCard_003 — React + framer motion + lenis
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
`,

  "skiper-37": `"use client";

import NumberFlow from "@number-flow/react";
import { AnimatePresence, motion, useSpring, animate, useMotionValue } from "framer-motion";
import { Plus } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useInView } from "react-intersection-observer";

const Skiper37 = () => {
  return (
    <section className="relative h-[calc(100vh-1rem)] w-full snap-y snap-mandatory overflow-y-scroll bg-[#f5f4f3]">
      <div className="snap-start">
        <AnimatedNumber_001 />
      </div>
      <div className="snap-start">
        <AnimatedNumber_002 />
      </div>
      <div className="snap-start">
        <AnimatedNumber_003 />
      </div>
      <div className="snap-start">
        <AnimatedNumber_004 />
      </div>
    </section>
  );
};

const AnimatedNumber_001 = () => {
  const [isPaused, setIsPaused] = useState(false);
  const [resetTrigger, setResetTrigger] = useState(0);

  const [count, setCount] = useState(60);

  useEffect(() => {
    if (isPaused) return;

    const id = setInterval(() => {
      setCount((c) => {
        if (c === 0) {
          return 60;
        }
        return c - 1;
      });
    }, 1000);

    return () => {
      clearInterval(id);
    };
  }, [isPaused]);

  // Reset timer when resetTrigger changes
  useEffect(() => {
    setCount(60);
  }, [resetTrigger]);

  const handleReset = () => {
    setResetTrigger((prev) => prev + 1);
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3] text-black">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']">
          Countdown with Number Flow
        </span>
      </div>
      <div className="font-bebas-neue text-[20vw] tracking-tight">
        <NumberFlow value={count} prefix="0:" />
      </div>
      <div className="flex w-fit items-center gap-2">
        <motion.button
          aria-label="Pause timer"
          onClick={() => setIsPaused((p) => !p)}
          whileTap={{ scale: 0.9 }}
          className="hover:bg-[#ff3828] flex h-10 w-10 items-center justify-center rounded-full bg-[#ff3828] transition-colors"
        >
          <AnimatePresence initial={false} mode="wait">
            {isPaused ? (
              <motion.svg
                key="play"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                transition={{ duration: 0.1 }}
                viewBox="0 0 12 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current text-[#f5f4f3]"
              >
                <path d="M0.9375 13.2422C1.25 13.2422 1.51562 13.1172 1.82812 12.9375L10.9375 7.67188C11.5859 7.28906 11.8125 7.03906 11.8125 6.625C11.8125 6.21094 11.5859 5.96094 10.9375 5.58594L1.82812 0.3125C1.51562 0.132812 1.25 0.015625 0.9375 0.015625C0.359375 0.015625 0 0.453125 0 1.13281V12.1172C0 12.7969 0.359375 13.2422 0.9375 13.2422Z" />
              </motion.svg>
            ) : (
              <motion.svg
                key="pause"
                initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
                exit={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                transition={{ duration: 0.1 }}
                viewBox="0 0 10 13"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 fill-current text-[#f5f4f3]"
              >
                <path d="M1.03906 12.7266H2.82031C3.5 12.7266 3.85938 12.3672 3.85938 11.6797V1.03906C3.85938 0.328125 3.5 0 2.82031 0H1.03906C0.359375 0 0 0.359375 0 1.03906V11.6797C0 12.3672 0.359375 12.7266 1.03906 12.7266ZM6.71875 12.7266H8.49219C9.17969 12.7266 9.53125 12.3672 9.53125 11.6797V1.03906C9.53125 0.328125 9.17969 0 8.49219 0H6.71875C6.03125 0 5.67188 0.359375 5.67188 1.03906V11.6797C5.67188 12.3672 6.03125 12.7266 6.71875 12.7266Z" />
              </motion.svg>
            )}
          </AnimatePresence>
        </motion.button>
        <button
          aria-label="Reset timer"
          onClick={handleReset}
          className="flex h-10 w-10 items-center justify-center rounded-full bg-white/45 text-[#ff3828] shadow-2xl transition-colors hover:bg-white/70"
        >
          <Plus className="rotate-45" />
        </button>
      </div>
    </div>
  );
};

export { Skiper37 };

export const AnimatedNumber_002 = () => {
  const finalCount = 500;
  const [displaySubs, setDisplaySubs] = useState(0);

  // Animating sub count from 0 to subscriberCount prop
  const springSubCount = useSpring(0, {
    bounce: 0,
    duration: 1000,
  });

  springSubCount.on("change", (value) => {
    setDisplaySubs(Math.round(value));
  });

  const animate = () => {
    springSubCount.set(finalCount);
  };

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3] text-black">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']">
          random numbers from x to y in view
        </span>
      </div>
      <motion.div
        onViewportEnter={animate}
        onViewportLeave={() => {
          springSubCount.set(0);
        }}
        className="font-bebas-neue text-[20vw] tracking-tight"
      >
        {displaySubs}
      </motion.div>
    </div>
  );
};

export const AnimatedNumber_003 = () => {
  const [displayNumber, setDisplayNumber] = useState(1000000);
  const [isAnimating, setIsAnimating] = useState(false);
  const hasAnimated = useRef(false);

  const formatNumber = (num: any) => {
    return new Intl.NumberFormat("en-US").format(num);
  };

  const animate = () => {
    if (hasAnimated.current || isAnimating) return;

    setIsAnimating(true);
    hasAnimated.current = true;

    const steps = 12;
    let currentStep = 0;

    const interval = setInterval(() => {
      currentStep++;

      if (currentStep <= steps) {
        const min = 1000000 + currentStep * (1000000 / steps);
        const max = 2200000;
        const randomNum = Math.floor(min + Math.random() * (max - min));
        setDisplayNumber(randomNum);
      } else {
        setDisplayNumber(2146000);
        setIsAnimating(false);
        clearInterval(interval);
      }
    }, 80);
  };
  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3] text-black">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']">
          random numbers from x to y in view
        </span>
      </div>
      <div className="font-bebas-neue text-[20vw] tracking-tight">
        <motion.div
          onViewportEnter={animate}
          onViewportLeave={() => {
            setDisplayNumber(1000000);
            hasAnimated.current = false;
            setIsAnimating(false);
          }}
        >
          \${formatNumber(displayNumber)}
        </motion.div>
      </div>
    </div>
  );
};

function AnimatedNumber_004() {
  const [displayValue, setDisplayValue] = useState(0);
  const count = useMotionValue(3);
  const { ref, inView } = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      animate(count, 100, {
        duration: 1,
        ease: "easeInOut",
        onUpdate: (latest) => setDisplayValue(Math.round(latest)),
        onComplete: () => {
          console.log("complete");
        },
      });
    } else {
      setDisplayValue(3);
    }
  }, [inView, count]);

  return (
    <div className="relative flex h-screen w-full flex-col items-center justify-center bg-[#f5f4f3] text-black">
      <div className="top-22 absolute left-1/2 grid -translate-x-1/2 content-start justify-items-center gap-6 text-center text-black">
        <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-[#f5f4f3] after:to-black after:content-['']">
          from x to y value in view [number-flow]
        </span>
      </div>
      <div ref={ref} className="font-bebas-neue text-[20vw] tracking-tight">
        <NumberFlow value={displayValue} prefix="$" suffix="K USD" />
      </div>
    </div>
  );
}
`,

  "skiper-4": `"use client";

import { motion } from "framer-motion";
import { GripHorizontal, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

const Skiper4 = () => {
  const [scale, setScale] = useState(0);
  const [gap, setGap] = useState(0);
  const [flexDirection, setFlexDirection] = useState("row");

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-5">
      <motion.div
        className="relative flex items-center justify-center gap-1"
        animate={{
          gap: gap ? \`\${gap}px\` : "4px",
          scale: scale ? \`\${scale / 20}\` : "1",
        }}
        style={{
          flexDirection: flexDirection === "column" ? "column" : "row",
        }}
        transition={{ duration: 0.35 }}
      >
        <motion.div layout>
          <ThemeToggleButton1 className={cn("size-12")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton2 className={cn("size-12 p-2")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton3 className={cn("size-12 p-2")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton4 className={cn("size-12 p-2")} />
        </motion.div>
        <motion.div layout>
          <ThemeToggleButton5 className={cn("size-12 p-3")} />
        </motion.div>
      </motion.div>

      {/* options */}
      <Options
        scale={scale}
        setScale={setScale}
        gap={gap}
        setGap={setGap}
        setFlexDirection={setFlexDirection}
      />
    </div>
  );
};

export { Skiper4 };

type OptionsProps = {
  scale: number;
  setScale: (value: number) => void;
  gap: number;
  setGap: (value: number) => void;
  setFlexDirection: (value: string) => void;
};

const Options = ({
  scale,
  setScale,
  gap,
  setGap,
  setFlexDirection,
}: OptionsProps) => {
  const [isDragging, setIsDragging] = useState(false);

  return (
    <motion.div
      className="top-30 border-foreground/10 bg-muted2 absolute right-1/2 flex w-[245px] translate-x-1/2 flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm lg:right-4 lg:translate-x-0"
      drag={isDragging}
      dragMomentum={false}
    >
      <div className="flex items-center justify-between">
        <span
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          className="size-4 cursor-grab active:cursor-grabbing"
        >
          <GripHorizontal className="size-4 opacity-50" />
        </span>

        <p
          onClick={() => {
            setScale(0);
            setGap(0);
            setFlexDirection("row");
          }}
          className="hover:bg-foreground/10 group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm opacity-50"
        >
          Options
          <span className="group-active:-rotate-360 rotate-0 cursor-pointer transition-all duration-300 group-hover:rotate-90">
            <RefreshCcw className="size-4 opacity-50" />
          </span>{" "}
        </p>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center justify-between py-1">
          <p className="text-sm opacity-50">Scale </p>
          <input
            type="range"
            min={0}
            max={100}
            value={scale}
            onChange={(e) => setScale(Number(e.target.value))}
            className="bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
            style={{ "--range-progress": \`\${scale}%\` } as React.CSSProperties}
          />
        </div>
        <div className="flex items-center justify-between py-1">
          <p className="text-sm opacity-50">Gap </p>
          <input
            type="range"
            min={0}
            max={100}
            value={gap}
            onChange={(e) => setGap(Number(e.target.value))}
            className="bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
            style={{ "--range-progress": \`\${gap}%\` } as React.CSSProperties}
          />
        </div>

        <div className="mt-1 flex items-center justify-between py-1">
          <p className="text-sm opacity-50">Flex </p>
          <div className="flex items-center justify-end gap-2">
            <button
              className="cursor-pointer text-sm opacity-50 hover:opacity-100"
              onClick={() => setFlexDirection("column")}
            >
              coloumn
            </button>
            <button
              className="cursor-pointer text-sm opacity-50 hover:opacity-100"
              onClick={() => setFlexDirection("row")}
            >
              Row
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

//..................................................... //

export const ThemeToggleButton1 = ({
  className = "",
}: {
  className?: string;
}) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn(
        "rounded-full bg-black text-white transition-all duration-300 active:scale-95",
        className,
      )}
      onClick={() => setIsDark(!isDark)}
    >
      <svg viewBox="0 0 240 240" fill="none" xmlns="http://www.w3.org/2000/svg">
        <motion.g
          animate={{ rotate: isDark ? -180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.35 }}
        >
          <path
            d="M120 67.5C149.25 67.5 172.5 90.75 172.5 120C172.5 149.25 149.25 172.5 120 172.5"
            fill="white"
          />
          <path
            d="M120 67.5C90.75 67.5 67.5 90.75 67.5 120C67.5 149.25 90.75 172.5 120 172.5"
            fill="black"
          />
        </motion.g>
        <motion.path
          animate={{ rotate: isDark ? 180 : 0 }}
          transition={{ ease: "easeInOut", duration: 0.35 }}
          d="M120 3.75C55.5 3.75 3.75 55.5 3.75 120C3.75 184.5 55.5 236.25 120 236.25C184.5 236.25 236.25 184.5 236.25 120C236.25 55.5 184.5 3.75 120 3.75ZM120 214.5V172.5C90.75 172.5 67.5 149.25 67.5 120C67.5 90.75 90.75 67.5 120 67.5V25.5C172.5 25.5 214.5 67.5 214.5 120C214.5 172.5 172.5 214.5 120 214.5Z"
          fill="white"
        />
      </svg>
    </button>
  );
};

//..................................................... //
export const ThemeToggleButton2 = ({
  className = "",
}: {
  className?: string;
}) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn(
        "rounded-full transition-all duration-300 active:scale-95",
        isDark ? "bg-black text-white" : "bg-white text-black",
        className,
      )}
      onClick={() => setIsDark(!isDark)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
      >
        <clipPath id="skiper-btn-2">
          <motion.path
            animate={{ y: isDark ? 10 : 0, x: isDark ? -12 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h30a1 1 0 0 0 9 13v24H0Z"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-2)">
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              rotate: isDark ? -100 : 0,
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M16 5.5v-4" />
            <path d="M16 30.5v-4" />
            <path d="M1.5 16h4" />
            <path d="M26.5 16h4" />
            <path d="m23.4 8.6 2.8-2.8" />
            <path d="m5.7 26.3 2.9-2.9" />
            <path d="m5.8 5.8 2.8 2.8" />
            <path d="m23.4 23.4 2.9 2.9" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
};

//..................................................... //
export const ThemeToggleButton3 = ({
  className = "",
}: {
  className?: string;
}) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn(
        "rounded-full transition-all duration-300 active:scale-95",
        isDark ? "bg-black text-white" : "bg-white text-black",
        className,
      )}
      onClick={() => setIsDark(!isDark)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
      >
        <clipPath id="skiper-btn-3">
          <motion.path
            animate={{ y: isDark ? 14 : 0, x: isDark ? -11 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-11h25a1 1 0 0017 13v30H0Z"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-3)">
          <motion.circle
            animate={{ r: isDark ? 10 : 8 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            cx="16"
            cy="16"
          />
          <motion.g
            animate={{
              scale: isDark ? 0.5 : 1,
              opacity: isDark ? 0 : 1,
            }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <path d="M18.3 3.2c0 1.3-1 2.3-2.3 2.3s-2.3-1-2.3-2.3S14.7.9 16 .9s2.3 1 2.3 2.3zm-4.6 25.6c0-1.3 1-2.3 2.3-2.3s2.3 1 2.3 2.3-1 2.3-2.3 2.3-2.3-1-2.3-2.3zm15.1-10.5c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zM3.2 13.7c1.3 0 2.3 1 2.3 2.3s-1 2.3-2.3 2.3S.9 17.3.9 16s1-2.3 2.3-2.3zm5.8-7C9 7.9 7.9 9 6.7 9S4.4 8 4.4 6.7s1-2.3 2.3-2.3S9 5.4 9 6.7zm16.3 21c-1.3 0-2.3-1-2.3-2.3s1-2.3 2.3-2.3 2.3 1 2.3 2.3-1 2.3-2.3 2.3zm2.4-21c0 1.3-1 2.3-2.3 2.3S23 7.9 23 6.7s1-2.3 2.3-2.3 2.4 1 2.4 2.3zM6.7 23C8 23 9 24 9 25.3s-1 2.3-2.3 2.3-2.3-1-2.3-2.3 1-2.3 2.3-2.3z" />
          </motion.g>
        </g>
      </svg>
    </button>
  );
};

//..................................................... //
export const ThemeToggleButton4 = ({
  className = "",
}: {
  className?: string;
}) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn(
        "rounded-full transition-all duration-300 active:scale-95",
        isDark ? "bg-black text-white" : "bg-white text-black",
        className,
      )}
      onClick={() => setIsDark(!isDark)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        strokeWidth="0.7"
        stroke="currentColor"
        fill="currentColor"
        strokeLinecap="round"
        viewBox="0 0 32 32"
      >
        <path
          strokeWidth="0"
          d="M9.4 9.9c1.8-1.8 4.1-2.7 6.6-2.7 5.1 0 9.3 4.2 9.3 9.3 0 2.3-.8 4.4-2.3 6.1-.7.8-2 2.8-2.5 4.4 0 .2-.2.4-.5.4-.2 0-.4-.2-.4-.5v-.1c.5-1.8 2-3.9 2.7-4.8 1.4-1.5 2.1-3.5 2.1-5.6 0-4.7-3.7-8.5-8.4-8.5-2.3 0-4.4.9-5.9 2.5-1.6 1.6-2.5 3.7-2.5 6 0 2.1.7 4 2.1 5.6.8.9 2.2 2.9 2.7 4.9 0 .2-.1.5-.4.5h-.1c-.2 0-.4-.1-.4-.4-.5-1.7-1.8-3.7-2.5-4.5-1.5-1.7-2.3-3.9-2.3-6.1 0-2.3 1-4.7 2.7-6.5z"
        />
        <path d="M19.8 28.3h-7.6" />
        <path d="M19.8 29.5h-7.6" />
        <path d="M19.8 30.7h-7.6" />
        <motion.path
          animate={{
            pathLength: isDark ? 0 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ ease: "easeInOut", duration: 0.35 }}
          pathLength="1"
          fill="none"
          d="M14.6 27.1c0-3.4 0-6.8-.1-10.2-.2-1-1.1-1.7-2-1.7-1.2-.1-2.3 1-2.2 2.3.1 1 .9 1.9 2.1 2h7.2c1.1-.1 2-1 2.1-2 .1-1.2-1-2.3-2.2-2.3-.9 0-1.7.7-2 1.7 0 3.4 0 6.8-.1 10.2"
        />
        <motion.g
          animate={{
            scale: isDark ? 0.5 : 1,
            opacity: isDark ? 0 : 1,
          }}
          transition={{ ease: "easeInOut", duration: 0.35 }}
        >
          <path pathLength="1" d="M16 6.4V1.3" />
          <path pathLength="1" d="M26.3 15.8h5.1" />
          <path pathLength="1" d="m22.6 9 3.7-3.6" />
          <path pathLength="1" d="M9.4 9 5.7 5.4" />
          <path pathLength="1" d="M5.7 15.8H.6" />
        </motion.g>
      </svg>
    </button>
  );
};

//..................................................... //
export const ThemeToggleButton5 = ({
  className = "",
}: {
  className?: string;
}) => {
  const [isDark, setIsDark] = useState(false);
  return (
    <button
      type="button"
      className={cn(
        "rounded-full transition-all duration-300 active:scale-95",
        isDark ? "bg-black text-white" : "bg-white text-black",
        className,
      )}
      onClick={() => setIsDark(!isDark)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
        fill="currentColor"
        viewBox="0 0 32 32"
      >
        <clipPath id="skiper-btn-4">
          <motion.path
            animate={{ y: isDark ? 5 : 0, x: isDark ? -20 : 0 }}
            transition={{ ease: "easeInOut", duration: 0.35 }}
            d="M0-5h55v37h-55zm32 12a1 1 0 0025 0 1 1 0 00-25 0"
          />
        </clipPath>
        <g clipPath="url(#skiper-btn-4)">
          <circle cx="16" cy="16" r="15" />
        </g>
      </svg>
    </button>
  );
};

/**
 * Theme Toggle Animations — React + Framer Motion Recreation
 * Inspired by and adapted from https://toggles.dev/ (Open Source CSS Theme Toggles by Alfie Jones)
 * This implementation is rebuilt in React and Framer Motion, avoiding external toggle packages.
 *
 * Attribution: https://toggles.dev/
 *
 * License & Usage:
 * - Free to use and modify in both personal and commercial projects.
 * - Attribution to Skiper UI is required when using the free version.
 * - No attribution required with Skiper UI Pro.
 *
 * Feedback and contributions are welcome.
 *
 * Author: @gurvinder-singh02
 * Website: https://gxuri.in
 * Twitter: https://x.com/Gur__vi
 */
`,

  "skiper-40": `"use client";

import { Link } from "react-router-dom";
import React from "react";

import { cn } from "@/lib/utils";

const Skiper40 = () => {
  return (
    <section className="h-full snap-y snap-mandatory overflow-y-scroll">
      <div className="relative flex h-full w-full flex-col items-center justify-center gap-5">
        <Link001 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link001>
        <Link002 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link002>
        <Link003 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link003>
        <Link004 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link004>
        <Link005 href="mailto:hi@skiper-ui.com">hi@skiper-ui.com</Link005>
      </div>
    </section>
  );
};

export { Link000, Link001, Link002, Link003, Link004, Link005, Skiper40 };

const Link000 = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <Link
      to={href}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:bottom-0 before:left-0 before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
      )}
    >
      {children}
    </Link>
  );
};
const Link001 = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className={cn(
        "group relative flex items-center",
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "hover:before:origin-left hover:before:scale-x-100",
        className,
      )}
    >
      {children}
      <svg
        className="ml-[0.3em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  );
};
const Link002 = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-left",
        "hover:before:origin-right hover:before:scale-x-100",
      )}
    >
      {children}
      <svg
        className="ml-[0.3em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  );
};
const Link003 = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:top-[1.5em] before:h-[0.05em] before:w-full before:bg-current before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-transform before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-center",
        "hover:before:scale-x-100",
      )}
    >
      {children}
      <svg
        className="ml-[0.3em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  );
};

const Link004 = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        "group relative flex items-center",
        className,
        "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
        "before:origin-right before:scale-x-0 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-center md:before:bottom-0",
        "before:z-1 px-2 before:h-0 before:scale-x-100 before:mix-blend-difference hover:before:h-[1.4em]",
      )}
    >
      {children}
      <svg
        className="z-0 ml-[0.6em] mt-[0em] size-[0.55em] translate-y-1 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-y-0 group-hover:rotate-45 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  );
};
const Link005 = ({
  children,
  href,
  className,
}: {
  children: React.ReactNode;
  href: string;
  className?: string;
}) => {
  return (
    <a
      href={href}
      className={cn(
        className,
        "group relative flex items-center",
        "before:pointer-events-none before:absolute before:left-0 before:w-full before:bg-white before:content-['']",
        "before:scale-x-1 before:transition-all before:duration-300 before:ease-[cubic-bezier(0.4,0,0.2,1)]",
        "before:origin-left md:before:top-0",
        "before:z-1 px-2 before:h-full before:scale-x-0 before:mix-blend-difference hover:before:scale-x-100",
      )}
    >
      {children}
      <svg
        className="z-0 ml-[0.6em] mt-[0em] size-[0.55em] -translate-x-1 rotate-45 opacity-0 transition-all duration-300 [motion-reduce:transition-none] group-hover:translate-x-0 group-hover:opacity-100 motion-reduce:transition-none"
        fill="none"
        viewBox="0 0 10 10"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        <path
          d="M1.004 9.166 9.337.833m0 0v8.333m0-8.333H1.004"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        ></path>
      </svg>
    </a>
  );
};
`,

  "skiper-41": `import React from "react";

type ProgressiveBlurProps = {
  className?: string;
  backgroundColor?: string;
  position?: "top" | "bottom";
  height?: string;
  blurAmount?: string;
};

const ProgressiveBlur = ({
  className = "",
  backgroundColor = "#f5f4f3",
  position = "top",
  height = "150px",
  blurAmount = "4px",
}: ProgressiveBlurProps) => {
  const isTop = position === "top";

  return (
    <div
      className={\`pointer-events-none absolute left-0 w-full select-none \${className}\`}
      style={{
        [isTop ? "top" : "bottom"]: 0,
        height,
        background: isTop
          ? \`linear-gradient(to top, transparent, \${backgroundColor})\`
          : \`linear-gradient(to bottom, transparent, \${backgroundColor})\`,
        maskImage: isTop
          ? \`linear-gradient(to bottom, \${backgroundColor} 50%, transparent)\`
          : \`linear-gradient(to top, \${backgroundColor} 50%, transparent)\`,
        WebkitBackdropFilter: \`blur(\${blurAmount})\`,
        backdropFilter: \`blur(\${blurAmount})\`,
        WebkitUserSelect: "none",
        userSelect: "none",
      }}
    />
  );
};

const Skiper41 = () => {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center bg-[#f5f4f3] text-black/40">
      <ProgressiveBlur position="top" backgroundColor="#f5f4f3" />
      <ProgressiveBlur position="bottom" backgroundColor="#f5f4f3" />

      <div className="flex h-[calc(100vh-1rem)] w-full flex-col items-center overflow-scroll">
        <div className="mt-42 grid content-start justify-items-center gap-6 text-center text-black">
          <span className="relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-white after:to-black after:content-['']">
            Scroll down to see the effect
          </span>
        </div>

        <div className="mt-24 w-full max-w-lg space-y-20 px-5 text-justify">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Obcaecati, reiciendis eum vitae nostrum, temporibus repudiandae
              voluptatibus, natus iure ipsa velit odit quibusdam illum. Quaerat
              cumque laudantium libero reprehenderit perferendis quo nulla
              voluptate? Repellat tenetur labore exercitationem dicta libero
              voluptate suscipit, iusto ea assumenda. Ipsa enim, quidem atque
              modi error eaque, debitis perferendis, hic iste libero dignissimos
              ea! Quod inventore beatae aspernatur nulla rem perferendis aperiam
              at debitis delectus odit quia animi ex mollitia vero molestias
              itaque deleniti, quos exercitationem consequatur assumenda dolor?
              Quod reiciendis in similique reprehenderit commodi quo blanditiis
              nobis hic ea optio illum placeat officia alias quasi autem earum
              quos obcaecati, voluptatum corporis quisquam. Quisquam iste, quas
              explicabo omnis harum aut quam adipisci, voluptatem saepe
              accusantium doloribus repellendus amet culpa magnam ex et dolores
              accusamus commodi facere aliquam voluptatum alias? Officia
              expedita ut vel? Beatae deserunt sequi id eos libero suscipit
              totam cum, sed architecto atque quisquam et incidunt quod fuga
              ullam repellat assumenda quos ab, voluptatum sint nesciunt? Ad
              sapiente est laborum quam sint eius sequi. Eum, veniam
              dignissimos.
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { ProgressiveBlur, Skiper41 };
`,

  "skiper-47": `"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import {
  Autoplay,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";
import "swiper/css/effect-cards";

import { cn } from "@/lib/utils";

const Skiper47 = () => {
  const images = [
    {
      src: "/images/x.com/11.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_001 className="" images={images} showPagination loop />
    </div>
  );
};

export { Skiper47 };

const Carousel_001 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = \`
  .Carousal_001 {
    padding-bottom: 50px !important;
  }
  \`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("w-3xl relative", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 1500,
                disableOnInteraction: false,
              }
            : false
        }
        effect="coverflow"
        grabCursor={true}
        centeredSlides={true}
        loop={loop}
        slidesPerView={2.43}
        coverflowEffect={{
          rotate: 0,
          slideShadows: false,
          stretch: 0,
          depth: 100,
          modifier: 2.5,
        }}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="Carousal_001"
        modules={[EffectCoverflow, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="!h-[320px] w-full border">
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_001 };
`,

  "skiper-48": `"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Autoplay, EffectCards, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-cards";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css";

import { cn } from "@/lib/utils";

const Skiper48 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/5.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/6.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_002 className="" images={images} loop />
    </div>
  );
};

export { Skiper48 };

const Carousel_002 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 40,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = \`
  .Carousal_002 {
    padding-bottom: 50px !important;
  }
  \`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-3xl", className)}
    >
      <style>{css}</style>

      <Swiper
        spaceBetween={spaceBetween}
        autoplay={
          autoplay
            ? {
                delay: 1000,
                disableOnInteraction: false,
              }
            : false
        }
        effect="cards"
        grabCursor={true}
        loop={loop}
        pagination={
          showPagination
            ? {
                clickable: true,
              }
            : false
        }
        navigation={
          showNavigation
            ? {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
              }
            : false
        }
        className="Carousal_002 h-[380px] w-[260px]"
        modules={[EffectCards, Autoplay, Pagination, Navigation]}
      >
        {images.map((image, index) => (
          <SwiperSlide key={index} className="rounded-3xl">
            <img
              className="h-full w-full object-cover"
              src={image.src}
              alt={image.alt}
            />
          </SwiperSlide>
        ))}
        {showNavigation && (
          <div>
            <div className="swiper-button-next after:hidden">
              <ChevronRightIcon className="h-6 w-6 text-white" />
            </div>
            <div className="swiper-button-prev after:hidden">
              <ChevronLeftIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        )}
      </Swiper>
    </motion.div>
  );
};

export { Carousel_002 };
`,

  "skiper-51": `"use client";

import { motion } from "framer-motion";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
import React from "react";
import { Autoplay, EffectCreative, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/effect-creative";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { cn } from "@/lib/utils";

const Skiper51 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/1.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/4.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/5.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
    {
      src: "/images/x.com/6.jpeg",
      alt: "Illustrations by my fav AarzooAly",
    },
  ];

  return (
    <div className="flex h-full w-full items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_005 className="" images={images} autoplay showPagination loop />
    </div>
  );
};

export { Skiper51 };

const Carousel_005 = ({
  images,
  className,
  showPagination = false,
  showNavigation = false,
  loop = true,
  autoplay = false,
  spaceBetween = 0,
}: {
  images: { src: string; alt: string }[];
  className?: string;
  showPagination?: boolean;
  showNavigation?: boolean;
  loop?: boolean;
  autoplay?: boolean;
  spaceBetween?: number;
}) => {
  const css = \`
  .Carousal_005 {
    width: 100%;
    height: 440px;
    padding-bottom: 50px !important;
  }
  
  .Carousal_005 .swiper-slide {
    background-position: center;
    background-size: cover;
     border-radius: 25px;
  }

  .Carousal_005 .swiper-pagination-bullet {
    background-color: #000 !important;
  }
 
  \`;
  return (
    <motion.div
      initial={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{
        duration: 0.3,
        delay: 0.5,
      }}
      className={cn("relative w-full max-w-4xl px-5", className)}
    >
      <style>{css}</style>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className="w-full"
      >
        <Swiper
          spaceBetween={spaceBetween}
          autoplay={
            autoplay
              ? {
                  delay: 1500,
                  disableOnInteraction: true,
                }
              : false
          }
          effect="creative"
          grabCursor={true}
          slidesPerView="auto"
          centeredSlides={true}
          loop={loop}
          pagination={
            showPagination
              ? {
                  clickable: true,
                }
              : false
          }
          navigation={
            showNavigation
              ? {
                  nextEl: ".swiper-button-next",
                  prevEl: ".swiper-button-prev",
                }
              : false
          }
          className="Carousal_005"
          creativeEffect={{
            prev: {
              shadow: true,
              translate: [0, 0, -400],
            },
            next: {
              translate: ["100%", 0, 0],
            },
          }}
          modules={[EffectCreative, Pagination, Autoplay]}
        >
          {images.map((image, index) => (
            <SwiperSlide key={index} className="">
              <img
                className="h-full w-full scale-105 rounded-3xl object-cover"
                src={image.src}
                alt={image.alt}
              />
            </SwiperSlide>
          ))}
          {showNavigation && (
            <div>
              <div className="swiper-button-next after:hidden">
                <ChevronRightIcon className="h-6 w-6 text-white" />
              </div>
              <div className="swiper-button-prev after:hidden">
                <ChevronLeftIcon className="h-6 w-6 text-white" />
              </div>
            </div>
          )}
        </Swiper>
      </motion.div>
    </motion.div>
  );
};

export { Carousel_005 };
`,

  "skiper-54": `"use client";

import Autoplay from "embla-carousel-autoplay";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const Skiper54 = () => {
  const images = [
    {
      src: "/images/x.com/13.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Block Reader",
    },
    {
      src: "/images/x.com/9.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Forest Fungi",
    },
    {
      src: "/images/x.com/20.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Golden Dusk",
    },
    {
      src: "/images/x.com/21.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Silent Peaks",
    },
    {
      src: "/images/x.com/25.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Emerald Woods",
    },
    {
      src: "/images/x.com/32.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Falling Mist",
    },
    {
      src: "/images/x.com/19.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Midnight Veil",
    },
    {
      src: "/images/x.com/3.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Azure Ridge",
    },
    {
      src: "/images/x.com/2.jpeg",
      alt: "Illustrations by ©AarzooAly",
      title: "Cloud Summit",
    },
  ];
  return (
    <div className="flex h-full w-screen items-center justify-center overflow-hidden bg-[#f5f4f3]">
      <Carousel_006
        images={images}
        className=""
        loop={true}
        showNavigation={true}
        showPagination={true}
      />
    </div>
  );
};

export { Skiper54 };

interface Carousel_006Props {
  images: { src: string; alt: string; title: string }[];
  className?: string;
  autoplay?: boolean;
  loop?: boolean;
  showNavigation?: boolean;
  showPagination?: boolean;
}

const Carousel_006 = ({
  images,
  className,
  autoplay = false,
  loop = true,
  showNavigation = true,
  showPagination = true,
}: Carousel_006Props) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!api) return;

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <Carousel
      setApi={setApi}
      className={cn("w-full", className)}
      opts={{
        loop,
        slidesToScroll: 1,
      }}
      plugins={
        autoplay
          ? [
              Autoplay({
                delay: 2000,
                stopOnInteraction: true,
                stopOnMouseEnter: true,
              }),
            ]
          : []
      }
    >
      <CarouselContent className="flex h-[500px] w-full">
        {images.map((img, index) => (
          <CarouselItem
            key={index}
            className="relative flex h-[81.5%] w-full basis-[73%] items-center justify-center sm:basis-[50%] md:basis-[30%] lg:basis-[25%] xl:basis-[21%]"
          >
            <motion.div
              initial={false}
              animate={{
                clipPath:
                  current !== index
                    ? "inset(15% 0 15% 0 round 2rem)"
                    : "inset(0 0 0 0 round 2rem)",
              }}
              className="h-full w-full overflow-hidden rounded-3xl"
            >
              <div className="relative h-full w-full border">
                <img
                  src={img.src}
                  alt={img.alt}
                  className="h-full w-full scale-105 object-cover"
                />
              </div>
            </motion.div>
            <AnimatePresence mode="wait">
              {current === index && (
                <motion.div
                  initial={{ opacity: 0, filter: "blur(10px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute bottom-0 left-2 flex h-[14%] w-full translate-y-full items-center justify-center p-2 text-center font-medium tracking-tight text-black/20"
                >
                  {img.title}
                </motion.div>
              )}
            </AnimatePresence>
          </CarouselItem>
        ))}
      </CarouselContent>

      {showNavigation && (
        <div className="absolute -bottom-4 right-0 flex w-full items-center justify-between gap-2 px-4">
          <button
            aria-label="Previous slide"
            onClick={() => api?.scrollPrev()}
            className="rounded-full bg-black/10 p-2"
          >
            <ChevronLeft className="text-white" />
          </button>
          <button
            aria-label="Next slide"
            onClick={() => api?.scrollNext()}
            className="rounded-full bg-black/10 p-2"
          >
            <ChevronRight className="text-white" />
          </button>
        </div>
      )}

      {showPagination && (
        <div className="flex w-full items-center justify-center">
          <div className="flex items-center justify-center gap-2">
            {Array.from({ length: images.length }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={cn(
                  "h-2 w-2 cursor-pointer rounded-full transition-all",
                  current === index ? "bg-black" : "bg-[#D9D9D9]",
                )}
                aria-label={\`Go to slide \${index + 1}\`}
              />
            ))}
          </div>
        </div>
      )}
    </Carousel>
  );
};

export { Carousel_006 };
`,

  "skiper-58": `"use client";

import { motion } from "framer-motion";
import React from "react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    name: "Home",
    href: "/",
    description: "[0]",
  },
  {
    name: "Components",
    href: "/components",
    description: "[1]",
  },
  {
    name: "Pricing",
    href: "/pricing",
    description: "[2]",
  },
  {
    name: "How to use",
    href: "/docs/quick-start",
    description: "[3]",
  },
  {
    name: "Account",
    href: "/user",
    description: "[4]",
  },
  {
    name: "Login",
    href: "/login",
    description: "[7]",
  },
];

export const Skiper58 = () => {
  return (
    <ul className="bs flex min-h-full w-full flex-1 flex-col items-center justify-center gap-1.5 rounded-2xl px-7 py-3 backdrop-blur-sm">
      {navigationItems.map((item, index) => (
        <li
          className="relative flex cursor-pointer flex-col items-center overflow-visible"
          key={index}
        >
          <div className="relative flex items-start">
            <TextRoll
              center
              className="text-4xl font-extrabold uppercase leading-[0.8] tracking-[-0.03em] transition-colors lg:text-5xl"
            >
              {item.name}
            </TextRoll>
          </div>
        </li>
      ))}
    </ul>
  );
};

const STAGGER = 0.035;

const TextRoll: React.FC<{
  children: string;
  className?: string;
  center?: boolean;
}> = ({ children, className, center = false }) => {
  return (
    <motion.span
      initial="initial"
      whileHover="hovered"
      className={cn("relative block overflow-hidden", className)}
      style={{
        lineHeight: 0.75,
      }}
    >
      <div>
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: 0,
                },
                hovered: {
                  y: "-100%",
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
      <div className="absolute inset-0">
        {children.split("").map((l, i) => {
          const delay = center
            ? STAGGER * Math.abs(i - (children.length - 1) / 2)
            : STAGGER * i;

          return (
            <motion.span
              variants={{
                initial: {
                  y: "100%",
                },
                hovered: {
                  y: 0,
                },
              }}
              transition={{
                ease: "easeInOut",
                delay,
              }}
              className="inline-block"
              key={i}
            >
              {l === " " ? "\\u00A0" : l}
            </motion.span>
          );
        })}
      </div>
    </motion.span>
  );
};

export { TextRoll };
`,

  "skiper-61": `"use client";

// TODO create a how to collection and plce it in them

import { motion, useMotionValue, useSpring } from "framer-motion";
import React from "react";

const SPRING = {
  mass: 0.1, // avoid Controls inertia (how sluggish or responsive the object feels). Lower mass = snappier motion; higher mass = lethargic motion
  damping: 10, // its like the weight of the ball heavier the ball less it will bounce or harder the rubber band the more it will bounce
  stiffness: 131, // like rubber Band the more you strech the more speed it goes back to the original position
};

const SimpleMouseFollow = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const opacity = useMotionValue(0);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <div
      onPointerMove={(e) => {
        handlePointerMove(e);
      }}
      onPointerEnter={() => {
        opacity.set(1);
      }}
      onPointerLeave={() => {
        opacity.set(0);
      }}
      className="rounded-4xl bg-background mt-20 size-[500px] cursor-none overflow-hidden"
    >
      <motion.div
        style={{
          x,
          y,
          opacity,
        }}
        className="rounded-4xl size-5 bg-[#ccc]"
      ></motion.div>
    </div>
  );
};

const SpringMouseFollow = () => {
  const xSpring = useSpring(0, SPRING);
  const ySpring = useSpring(0, SPRING);
  const opacitySpring = useSpring(0, SPRING);
  const scaleSpring = useSpring(0, SPRING);

  return (
    <div
      onPointerMove={(e) => {
        const bounds = e.currentTarget.getBoundingClientRect();
        xSpring.set(e.clientX - bounds.left);
        ySpring.set(e.clientY - bounds.top);
      }}
      onPointerEnter={() => {
        opacitySpring.set(1);
        scaleSpring.set(1);
      }}
      onPointerLeave={() => {
        opacitySpring.set(0);
        scaleSpring.set(0);
      }}
      className="rounded-4xl bg-background mt-20 size-[500px] overflow-hidden"
    >
      <motion.div
        style={{
          x: xSpring,
          y: ySpring,
          opacity: opacitySpring,
          scale: scaleSpring,
        }}
        className="rounded-4xl size-10 bg-orange-500"
      ></motion.div>
    </div>
  );
};

const Skiper61 = () => {
  return (
    <section className="h-screen w-full snap-y snap-mandatory overflow-y-scroll">
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow simple
          </span>
        </div>
        <SimpleMouseFollow />
      </div>
      <div className="flex h-screen w-full snap-start flex-col items-center justify-center px-5">
        <div className="grid content-start justify-items-center gap-6 text-center">
          <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
            Mouse follow with Spring
          </span>
        </div>
        <SpringMouseFollow />
      </div>
    </section>
  );
};

export { SimpleMouseFollow, Skiper61, SpringMouseFollow };
`,

  "skiper-62": `"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useMemo, useState } from "react";

const useLoop = (delay = 1000) => {
  const [key, setKey] = useState(0);

  const incrementKey = useCallback(() => {
    setKey((prev) => prev + 1);
  }, []);

  useEffect(() => {
    const interval = setInterval(incrementKey, delay);
    return () => clearInterval(interval);
  }, [delay, incrementKey]);

  return { key };
};

export { useLoop };

const Skiper62 = () => {
  const { key } = useLoop();

  const array = useMemo(
    () => [
      "Tik-Tik uno",
      "Tik-Tik dos",
      "Tik-Tik tres",
      "Tik-Tik cuatro",
      "Tik-Tik cinco",
      "Tik-Tik seis",
      "Tik-Tik siete",
      "Tik-Tik ocho",
      "Tik-Tik nueve",
      "Tik-Tik diez",
    ],
    [],
  );

  const currentItem = useMemo(() => {
    return array[key % array.length];
  }, [array, key]);

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <div className="mb-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          useLoop hook
        </span>
      </div>
      <AnimatePresence mode="popLayout">
        <motion.h1
          key={key}
          initial={{ opacity: 0, y: " 100%" }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: "-100%" }}
          transition={{ duration: 0.3 }}
          className="bordr whitespace-nowrap text-center text-4xl font-bold tracking-tight md:text-5xl"
        >
          {currentItem}
        </motion.h1>
      </AnimatePresence>
    </div>
  );
};

export { Skiper62 };
`,

  "skiper-63": `"use client";

import { motion } from "framer-motion";
import { GripHorizontal, RefreshCcw } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

// to use the filter just add this to your layout.tsx
// <SkiperSquiCircleFilterLayout/>
// {children}

// on element you need to add squicircle just add the filter id SkiperSquiCircleFilter
//<div style={{filter: "url(#SquiCircleFilter)"}}></div>

// thats it you can use the filter now no extra rerenders no complications just pure css filter

export const SquiCircleFilterStatic = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0"
      version="1.1"
    >
      <defs>
        <filter id="SkiperSquiCircleFilterLayout">
          <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
};

const Skiper63 = () => {
  const [toggle, setToggle] = useState(true);
  const [height, setHeight] = useState(200);
  const [width, setWidth] = useState(300);
  const [blurValue, setBlurValue] = useState(10);
  const [colorMatrixValue, setColorMatrixValue] = useState(20);
  const [alphaValue, setAlphaValue] = useState(-7);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <div className="mb-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          squicircle with svg filter
        </span>
      </div>
      <SquiCircleFilter
        blurValue={blurValue}
        colorMatrixValue={colorMatrixValue}
        alphaValue={alphaValue}
      />
      <Options
        toggle={toggle}
        setToggle={setToggle}
        height={height}
        setHeight={setHeight}
        width={width}
        setWidth={setWidth}
        blurValue={blurValue}
        setBlurValue={setBlurValue}
        colorMatrixValue={colorMatrixValue}
        setColorMatrixValue={setColorMatrixValue}
        alphaValue={alphaValue}
        setAlphaValue={setAlphaValue}
      />
      <div
        className="bg-foreground rounded-2xl"
        style={{
          height: \`\${height}px\`,
          width: \`\${width}px\`,
          filter: toggle ? "url(#SquiCircleFilter)" : "none",
        }}
      ></div>
    </div>
  );
};

export { Skiper63 };

const SquiCircleFilter = ({
  blurValue = 10,
  colorMatrixValue = 20,
  alphaValue = -7,
}: {
  blurValue?: number;
  colorMatrixValue?: number;
  alphaValue?: number;
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0"
      version="1.1"
    >
      <defs>
        <filter id="SquiCircleFilter">
          <feGaussianBlur
            in="SourceGraphic"
            stdDeviation={blurValue}
            result="blur"
          />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values={\`1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 \${colorMatrixValue} \${alphaValue}\`}
            result="goo"
          />
          <feBlend in="SourceGraphic" in2="goo" />
        </filter>
      </defs>
    </svg>
  );
};

const Options = ({
  toggle,
  setToggle,
  height,
  setHeight,
  width,
  setWidth,
  blurValue,
  setBlurValue,
  colorMatrixValue,
  setColorMatrixValue,
  alphaValue,
  setAlphaValue,
}: {
  toggle: boolean;
  setToggle: (value: boolean) => void;
  height: number;
  setHeight: (value: number) => void;
  width: number;
  setWidth: (value: number) => void;
  blurValue: number;
  setBlurValue: (value: number) => void;
  colorMatrixValue: number;
  setColorMatrixValue: (value: number) => void;
  alphaValue: number;
  setAlphaValue: (value: number) => void;
}) => {
  const [isDragging, setIsDragging] = useState(false);

  const resetValues = () => {
    setToggle(false);
    setHeight(200);
    setWidth(300);
    setBlurValue(10);
    setColorMatrixValue(20);
    setAlphaValue(-7);
  };

  return (
    <motion.div
      className="top-30 border-foreground/10 bg-muted2 absolute right-1/2 flex w-[300px] translate-x-1/2 flex-col gap-3 rounded-3xl border p-3 backdrop-blur-sm lg:right-4 lg:translate-x-0"
      drag={isDragging}
      dragMomentum={false}
    >
      <div className="flex items-center justify-between">
        <span
          onPointerDown={() => setIsDragging(true)}
          onPointerUp={() => setIsDragging(false)}
          className="size-4 cursor-grab active:cursor-grabbing"
        >
          <GripHorizontal className="size-4 opacity-50" />
        </span>

        <p
          onClick={resetValues}
          className="hover:bg-foreground/10 group flex cursor-pointer items-center justify-center gap-2 rounded-lg px-2 py-1 text-sm opacity-50"
        >
          Reset
          <span className="group-active:-rotate-360 rotate-0 cursor-pointer transition-all duration-300 group-hover:rotate-90">
            <RefreshCcw className="size-4 opacity-50" />
          </span>
        </p>
      </div>

      <div className="flex w-full flex-col gap-3">
        {/* Toggle Control */}
        <div className="grid grid-cols-3 items-center gap-2 py-1">
          <p className="text-sm opacity-50">Filter :</p>
          <button
            onClick={() => setToggle(true)}
            className={cn(
              "bg-muted3 flex items-center justify-center rounded-lg py-1 text-left text-xs opacity-25 transition-colors",
              toggle && "opacity-100",
            )}
          >
            ON
          </button>
          <button
            onClick={() => setToggle(false)}
            className={cn(
              "bg-muted3 flex items-center justify-center rounded-lg py-1 text-left text-xs opacity-25 transition-colors",
              !toggle && "opacity-100",
            )}
          >
            OFF
          </button>
        </div>

        {/* Height Control */}
        <div className="grid w-full grid-cols-3 items-center py-1">
          <p className="text-sm opacity-50">Height :</p>
          <div className="flex w-full items-center justify-between gap-2">
            <input
              type="range"
              min={50}
              max={500}
              value={height}
              onChange={(e) => setHeight(Number(e.target.value))}
              className="bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
              style={
                {
                  "--range-progress": \`\${((height - 50) / (500 - 50)) * 100}%\`,
                } as React.CSSProperties
              }
            />
            <span className="w-8 text-right text-xs opacity-50">
              {height}px
            </span>
          </div>
        </div>

        {/* Width Control */}
        <div className="grid w-full grid-cols-3 items-center py-1">
          <p className="text-sm opacity-50">Width :</p>
          <div className="flex items-center justify-between gap-2">
            <input
              type="range"
              min={100}
              max={600}
              value={width}
              onChange={(e) => setWidth(Number(e.target.value))}
              className="bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
              style={
                {
                  "--range-progress": \`\${((width - 100) / (600 - 100)) * 100}%\`,
                } as React.CSSProperties
              }
            />
            <span className="w-8 text-right text-xs opacity-50">{width}px</span>
          </div>
        </div>

        {/* Blur Control */}
        <div className="grid w-full grid-cols-3 items-center py-1">
          <p className="text-sm opacity-50">Blur :</p>
          <div className="flex items-center justify-between gap-2">
            <input
              type="range"
              min={0}
              max={50}
              value={blurValue}
              onChange={(e) => setBlurValue(Number(e.target.value))}
              className="bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
              style={
                {
                  "--range-progress": \`\${(blurValue / 50) * 100}%\`,
                } as React.CSSProperties
              }
            />
            <span className="w-8 text-right text-xs opacity-50">{blurValue}</span>
          </div>
        </div>

        {/* Color Matrix Control */}
        <div className="grid w-full grid-cols-3 items-center py-1">
          <p className="text-sm opacity-50">Matrix :</p>
          <div className="flex items-center justify-between gap-2">
            <input
              type="range"
              min={0}
              max={100}
              value={colorMatrixValue}
              onChange={(e) => setColorMatrixValue(Number(e.target.value))}
              className="bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
              style={
                {
                  "--range-progress": \`\${(colorMatrixValue / 100) * 100}%\`,
                } as React.CSSProperties
              }
            />
            <span className="w-8 text-right text-xs opacity-50">{colorMatrixValue}</span>
          </div>
        </div>

        {/* Alpha Control */}
        <div className="grid w-full grid-cols-3 items-center py-1">
          <p className="text-sm opacity-50">Alpha :</p>
          <div className="flex items-center justify-between gap-2">
            <input
              type="range"
              min={-50}
              max={50}
              value={alphaValue}
              onChange={(e) => setAlphaValue(Number(e.target.value))}
              className="bg-muted [&::-webkit-slider-runnable-track]:to-background [&::-webkit-slider-thumb]:bg-muted-foreground h-1.5 w-[150px] cursor-pointer appearance-none overflow-clip rounded-lg [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:appearance-none [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-0 [&::-moz-range-thumb]:bg-white [&::-moz-range-track]:bg-gradient-to-r [&::-moz-range-track]:from-blue-500 [&::-moz-range-track]:to-[#4F4F4E] [&::-moz-range-track]:bg-[length:var(--range-progress)_100%] [&::-moz-range-track]:bg-no-repeat [&::-webkit-slider-runnable-track]:bg-gradient-to-r [&::-webkit-slider-runnable-track]:from-blue-500 [&::-webkit-slider-runnable-track]:bg-[length:var(--range-progress)_100%] [&::-webkit-slider-runnable-track]:bg-no-repeat [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:rounded-full"
              style={
                {
                  "--range-progress": \`\${((alphaValue - (-50)) / (50 - (-50))) * 100}%\`,
                } as React.CSSProperties
              }
            />
            <span className="w-8 text-right text-xs opacity-50">{alphaValue}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};
`,

  "skiper-64": `"use client";

import { motion } from "framer-motion";
import React from "react";

const Skiper64 = () => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center">
      <SkiperGooeyFilterProvider />
      <div className="absolute top-[20%] grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Drag the elements to see the effect
        </span>
      </div>
      <ul
        className="flex flex-col justify-end rounded-2xl"
        style={{
          filter: "url(#SkiperGooeyFilter)",
        }}
      >
        <motion.li
          drag
          initial={INITIAL_STATE}
          animate={ANIMATED_STATE}
          className="bg-foreground absolute"
        ></motion.li>
        <motion.li
          drag
          className="bg-foreground size-12 rounded-full"
        ></motion.li>
      </ul>
    </div>
  );
};

export { Skiper64, SkiperGooeyFilterProvider };

const SkiperGooeyFilterProvider = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="absolute bottom-0 left-0"
      version="1.1"
    >
      <defs>
        <filter id="SkiperGooeyFilter">
          <feGaussianBlur in="SourceGraphic" stdDeviation="4.4" result="blur" />
          <feColorMatrix
            in="blur"
            mode="matrix"
            values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -7"
            result="SkiperGooeyFilter"
          />
          <feBlend in="SourceGraphic" in2="SkiperGooeyFilter" />
        </filter>
      </defs>
    </svg>
  );
};

const LOGO_SPRING = {
  type: "spring",
  stiffness: 300,
  damping: 30,
} as const;

const INITIAL_STATE = {
  y: 0,
  width: 50,
  height: 50,
  borderRadius: 40,
};

const ANIMATED_STATE = {
  y: -60,
  width: 200,
  height: 100,
  borderRadius: 10,
  transition: {
    ...LOGO_SPRING,
    delay: 0.15,
    y: {
      ...LOGO_SPRING,
      delay: 0,
    },
  },
};
`,

  "skiper-66": `import React from "react";

import { cn } from "@/lib/utils";

const Skiper66 = () => {
  return (
    <div className="relative flex h-full w-full items-center justify-center bg-[#f5f4f3]">
      <ClipDiv imgSrc="/skiperv1/common/img_p11.png">
        <h1 className="font-cal-sans text-4xl text-red-500">Hover Me </h1>
      </ClipDiv>
    </div>
  );
};

const ClipDiv = ({
  children,
  imgSrc,
  className,
}: {
  children: React.ReactNode;
  imgSrc: string;
  className?: string;
}) => {
  return (
    <>
      <SvgMask />
      <div
        style={{ clipPath: "url(#customMask001)" }}
        className={cn(
          "group relative flex aspect-video w-full items-center justify-center overflow-hidden lg:w-[80%]",
          className,
        )}
      >
        <img
          src={imgSrc}
          alt=""
          className="duration-400 absolute inset-0 h-full w-full object-cover transition-all ease-in-out group-hover:scale-110"
        />

        {/* overlay */}
        <div className="absolute size-full bg-black/15" />

        {/* children */}
        {children && <div className="absolute">{children}</div>}
      </div>
    </>
  );
};

export { ClipDiv, Skiper66 };

//Use clipPath for clean geometric cuts.
//Use mask for blurry, faded, or complex visual effects.

const SvgMask = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 1836 1053"
      className="absolute inset-0 size-full"
    >
      <clipPath id="customMask001" clipPathUnits="objectBoundingBox">
        <path
          fill="currentColor"
          d="M457.525 1.148c-20.789-3.198-193.979 1.16-283.854 2.496 11.104-.178 1.297-2.868-81.146-2.496-103.5.468-86 102.499-86 109.999s-7 524.5-6.5 547.5 10 59 6.5 99c-2.8 32-1.167 234.667 0 332.003.5 75 62.5 66.5 67 68.5s38.5 0 81.5 0 436 6 526 10.5 438.995-.5 505.495 0 330.01-12.5 417.51-12.5 230.99 2 270.99 0 40.5-16 51-31.5 12.5-61 12.5-105.5c0-44.503 7.01-274.504 7.01-348.004s-3.51-159.998-7.01-230.998 0-256.002 0-318.002 7.01-92.998-22.5-110.999c-18.79-11.471-81.99-9.999-133.49-9.999H853.525c-29 0-370 4-396 0Z"
          transform="scale(0.0005139987561, 0.0008543065594)"
        ></path>
      </clipPath>
    </svg>
  );
};
`,

  "skiper-67": `"use client";

import { AnimatePresence, motion, useSpring } from "framer-motion";
import { Play, Plus } from "lucide-react";
import {
  MediaControlBar,
  MediaController,
  MediaMuteButton,
  MediaPlayButton,
  MediaSeekBackwardButton,
  MediaSeekForwardButton,
  MediaTimeDisplay,
  MediaTimeRange,
  MediaVolumeRange,
} from "media-chrome/react";
import type { ComponentProps } from "react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

export type VideoPlayerProps = ComponentProps<typeof MediaController>;

export const VideoPlayer = ({ style, ...props }: VideoPlayerProps) => (
  <MediaController
    style={{
      ...style,
    }}
    {...props}
  />
);

export type VideoPlayerControlBarProps = ComponentProps<typeof MediaControlBar>;

export const VideoPlayerControlBar = (props: VideoPlayerControlBarProps) => (
  <MediaControlBar {...props} />
);

export type VideoPlayerTimeRangeProps = ComponentProps<typeof MediaTimeRange>;

export const VideoPlayerTimeRange = ({
  className,
  ...props
}: VideoPlayerTimeRangeProps) => (
  <MediaTimeRange
    className={cn(
      "[--media-range-thumb-opacity:0] [--media-range-track-height:2px]",
      className,
    )}
    {...props}
  />
);

export type VideoPlayerTimeDisplayProps = ComponentProps<
  typeof MediaTimeDisplay
>;

export const VideoPlayerTimeDisplay = ({
  className,
  ...props
}: VideoPlayerTimeDisplayProps) => (
  <MediaTimeDisplay className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerVolumeRangeProps = ComponentProps<
  typeof MediaVolumeRange
>;

export const VideoPlayerVolumeRange = ({
  className,
  ...props
}: VideoPlayerVolumeRangeProps) => (
  <MediaVolumeRange className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerPlayButtonProps = ComponentProps<typeof MediaPlayButton>;

export const VideoPlayerPlayButton = ({
  className,
  ...props
}: VideoPlayerPlayButtonProps) => (
  <MediaPlayButton className={cn("", className)} {...props} />
);

export type VideoPlayerSeekBackwardButtonProps = ComponentProps<
  typeof MediaSeekBackwardButton
>;

export const VideoPlayerSeekBackwardButton = ({
  className,
  ...props
}: VideoPlayerSeekBackwardButtonProps) => (
  <MediaSeekBackwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerSeekForwardButtonProps = ComponentProps<
  typeof MediaSeekForwardButton
>;

export const VideoPlayerSeekForwardButton = ({
  className,
  ...props
}: VideoPlayerSeekForwardButtonProps) => (
  <MediaSeekForwardButton className={cn("p-2.5", className)} {...props} />
);

export type VideoPlayerMuteButtonProps = ComponentProps<typeof MediaMuteButton>;

export const VideoPlayerMuteButton = ({
  className,
  ...props
}: VideoPlayerMuteButtonProps) => (
  <MediaMuteButton className={cn("", className)} {...props} />
);

export type VideoPlayerContentProps = ComponentProps<"video">;

export const VideoPlayerContent = ({
  className,
  ...props
}: VideoPlayerContentProps) => (
  <video className={cn("mb-0 mt-0", className)} {...props} />
);

export const Skiper67 = () => {
  const [showVideoPopOver, setShowVideoPopOver] = useState(false);

  const SPRING = {
    mass: 0.1,
  };

  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);
  const opacity = useSpring(0, SPRING);

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    opacity.set(1);
    const bounds = e.currentTarget.getBoundingClientRect();
    x.set(e.clientX - bounds.left);
    y.set(e.clientY - bounds.top);
  };

  return (
    <section className="relative flex h-full w-full items-center justify-center bg-[#f5f4f3]">
      <div className="absolute top-1/4 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          Click the video to play
        </span>
      </div>
      <AnimatePresence>
        {showVideoPopOver && (
          <VideoPopOver setShowVideoPopOver={setShowVideoPopOver} />
        )}
      </AnimatePresence>
      <div
        onMouseMove={handlePointerMove}
        onMouseLeave={() => {
          opacity.set(0);
        }}
        onClick={() => setShowVideoPopOver(true)}
        className="size-45"
      >
        <motion.div
          style={{ x, y, opacity }}
          className="relative z-20 flex w-fit select-none items-center justify-center gap-2 p-2 text-sm text-white mix-blend-exclusion"
        >
          <Play className="size-4 fill-white" /> Play
        </motion.div>
        <video
          autoPlay
          muted
          playsInline
          loop
          className="h-full w-full object-cover"
        >
          <source src="https://skiper-ui.com/showreel/skiper-ui-showreel.mp4" />
        </video>
      </div>
    </section>
  );
};

const VideoPopOver = ({
  setShowVideoPopOver,
}: {
  setShowVideoPopOver: (showVideoPopOver: boolean) => void;
}) => {
  return (
    <div
      className="fixed left-0 top-0 z-[101] flex h-screen w-screen items-center justify-center"
      onClick={() => setShowVideoPopOver(false)}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
        className="bg-background/90 absolute left-0 top-0 h-full w-full backdrop-blur-lg"
      ></motion.div>
      <motion.div
        initial={{ clipPath: "inset(43.5% 43.5% 33.5% 43.5% )", opacity: 0 }}
        animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
        exit={{
          clipPath: "inset(43.5% 43.5% 33.5% 43.5% )",
          opacity: 0,
          transition: {
            duration: 1,
            type: "spring",
            stiffness: 100,
            damping: 20,
            opacity: { duration: 0.2, delay: 0.8 },
          },
        }}
        transition={{
          duration: 1,
          type: "spring",
          stiffness: 100,
          damping: 20,
        }}
        className="relative aspect-video w-[80vw] max-w-7xl max-h-[80vh] overflow-hidden rounded-xl border border-zinc-800/50 bg-black"
        onClick={(e) => e.stopPropagation()}
      >
        <VideoPlayer style={{ width: "100%", height: "100%" }}>
          <VideoPlayerContent
            src="https://skiper-ui.com/showreel/skiper-ui-showreel.mp4"
            autoPlay
            slot="media"
            className="w-full object-cover"
            style={{ width: "100%", height: "100%" }}
          />

          <span
            onClick={() => setShowVideoPopOver(false)}
            className="absolute right-2 top-2 z-10 cursor-pointer rounded-full p-1 transition-colors"
          >
            <Plus className="size-5 rotate-45 text-white" />
          </span>
          <VideoPlayerControlBar className="absolute bottom-0 left-1/2 flex w-full max-w-7xl -translate-x-1/2 items-center justify-center px-5 mix-blend-exclusion md:px-10 md:py-5">
            <VideoPlayerPlayButton className="h-4 bg-transparent" />
            <VideoPlayerTimeRange className="bg-transparent" />
            <VideoPlayerMuteButton className="size-4 bg-transparent" />
          </VideoPlayerControlBar>
        </VideoPlayer>
      </motion.div>
    </div>
  );
};
`,

  "skiper-87": `import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

const Skiper87 = () => {
  return (
    <div className="bg-muted flex h-full w-full flex-col items-center justify-center gap-10">
      <style>{\`
        .scroll-fade-container [data-radix-scroll-area-viewport] {
          --size: 40px;
          display: block;
          
          /* Original standard */
          mask-image: linear-gradient(to bottom, #fff, #0000), linear-gradient(to bottom, #fff 0 100%), linear-gradient(to top, #fff, #0000);
          mask-size: 100% 0, 100% 100%, 100% var(--size);
          mask-repeat: no-repeat;
          mask-composite: exclude;
          mask-position: 0 0, 0 0, 0 100%;
          
          /* Safari/Chrome prefix logic */
          -webkit-mask-image: linear-gradient(to bottom, #fff, #0000), linear-gradient(to bottom, #fff 0 100%), linear-gradient(to top, #fff, #0000);
          -webkit-mask-size: 100% 0, 100% 100%, 100% var(--size);
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-composite: xor;
          -webkit-mask-position: 0 0, 0 0, 0 100%;

          animation-timing-function: linear;
          animation-timeline: scroll(self block);
          animation-range: 0 var(--size), calc(100% - var(--size)) 100%;
          
          animation-name: skiper87-size-up, skiper87-size-down;
          animation-fill-mode: both;
        }

        @keyframes skiper87-size-up {
          to {
            mask-size: 100% var(--size), 100% 100%, 100% var(--size);
            -webkit-mask-size: 100% var(--size), 100% 100%, 100% var(--size);
          }
        }

        @keyframes skiper87-size-down {
          to {
            mask-size: 100% var(--size), 100% 100%, 100% 0;
            -webkit-mask-size: 100% var(--size), 100% 100%, 100% 0;
          }
        }
      \`}</style>
      <div className="-mt-10 mb-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          see the fade while scroll
        </span>
      </div>
      <div className="rounded-xl border scroll-fade-container">
        <ScrollArea className="w-62 h-72 rounded-xl">
          <div className="space-y-1 p-1">
            {Array.from({ length: 11 }).map((_, index) => (
              <div
                key={index}
                className="text-foreground/30 hover:bg-foreground/10 bg-foreground/5 flex h-10 w-full items-center gap-2 rounded-lg px-4"
              >
                00{index} <div className="bg-foreground/10 h-px flex-1"></div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export { Skiper87 };
`,

  "skiper-99": `"use client";

import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

const Skiper99 = () => {
  return (
    <div className="bg-muted flex h-full w-full flex-col items-center justify-center">
      <div className="grid content-start justify-items-center gap-6 text-center">
        <span className="after:from-background after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:content-['']">
          Try Hover/Click the icons
        </span>
      </div>
      <div className="mt-25 flex w-full max-w-3xl flex-wrap items-center justify-center gap-2 px-5 text-justify">
        <div className="size-22 bg-background rounded-3xl">
          <ArrowIcon />
        </div>
        <div className="size-22 bg-background rounded-3xl">
          <MenuIcon />
        </div>
        <div className="size-22 bg-background rounded-3xl">
          <VolumeIcon />
        </div>
      </div>
    </div>
  );
};

export { Skiper99 };

const ArrowIcon = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        "group flex size-full cursor-pointer items-center justify-center",
        className,
      )}
    >
      <div className="relative grid cursor-pointer items-center justify-center">
        <ChevronRight className="transition-all duration-500 ease-out group-hover:translate-x-0.5" />
        <div className="absolute right-[9px] h-[2px] w-3 origin-right scale-x-0 rounded-[1px] bg-current transition-all duration-300 ease-out group-hover:right-[7px] group-hover:scale-x-100"></div>
      </div>
    </div>
  );
};

const MenuIcon = ({ className }: { className?: string }) => {
  const [toggle, setToggle] = useState(false);

  return (
    <div
      onClick={() => setToggle((x) => !x)}
      className={cn(
        "group flex size-full cursor-pointer items-center justify-center",
        className,
      )}
    >
      <div className="relative grid size-4 cursor-pointer items-center justify-center">
        <motion.div
          animate={{ y: toggle ? 0 : "-5px", rotate: toggle ? 45 : 0 }}
          className="absolute h-0.5 w-full rounded-full bg-current"
        ></motion.div>
        <motion.div
          animate={{ opacity: toggle ? 0 : 1 }}
          transition={{ duration: 0.1 }}
          className="absolute h-0.5 w-full rounded-full bg-current"
        ></motion.div>
        <motion.div
          animate={{ y: toggle ? 0 : "5px", rotate: toggle ? -45 : 0 }}
          className="absolute h-0.5 w-full rounded-full bg-current"
        ></motion.div>
      </div>
    </div>
  );
};

const VolumeIcon = ({ className }: { className?: string }) => {
  const [isMuted, setIsMuted] = useState(false);

  return (
    <div
      onClick={() => setIsMuted((x) => !x)}
      className={cn(
        "group flex size-full cursor-pointer items-center justify-center",
        className,
      )}
    >
      <motion.div
        initial={false}
        className="relative flex size-5 items-center justify-center"
        animate={{
          rotate: isMuted ? [0, -15, 5, -2, 0] : "none",
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          className={cn("", className)}
        >
          <path
            fill="currentColor"
            stroke="none"
            d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z"
          />

          <motion.g>
            <path
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              d="M16 9a5 5 0 0 1 0 6"
            />
            <path
              fill="none"
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              stroke="currentColor"
              d="M19.364 18.364a9 9 0 0 0 0-12.728"
            />
          </motion.g>
        </svg>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="rotate-[-40deg] overflow-hidden">
            <motion.div
              animate={{ scaleY: isMuted ? 1 : 0 }}
              transition={{
                ease: "easeInOut",
                duration: isMuted ? 0.125 : 0.05,
                delay: isMuted ? 0.15 : 0,
              }}
              style={{
                transformOrigin: "top",
              }}
              className="h-[18px] w-fit rounded-full"
            >
              <div className="bg-background flex h-full w-[3.5px] items-center justify-center rounded-full">
                <div className="bg-foreground h-full w-[1.5px] rounded-full" />
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
`,

  "smooth-drawer": `"use client";

/**
 * @author: @dorianbaffier
 * @description: Smooth Drawer
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import { Fingerprint } from "lucide-react";
import { motion } from "motion/react";
import type * as React from "react";
import { Button } from "../ui/coss/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "../ui/coss/drawer";

interface PriceTagProps {
  price: number;
  discountedPrice: number;
}

function PriceTag({ price, discountedPrice }: PriceTagProps) {
  return (
    <div className="mx-auto flex max-w-fit items-center justify-around gap-4">
      <div className="flex items-baseline gap-2">
        <span className="bg-gradient-to-br from-zinc-900 to-zinc-700 bg-clip-text font-bold text-4xl text-transparent dark:from-white dark:to-zinc-300">
          \${discountedPrice}
        </span>
        <span className="text-lg text-zinc-400 line-through dark:text-zinc-500">
          \${price}
        </span>
      </div>
      <div className="flex flex-col items-center gap-0.5">
        <span className="font-medium text-sm text-zinc-900 dark:text-zinc-100">
          Lifetime access
        </span>
        <span className="text-xs text-zinc-700 dark:text-zinc-300">
          One-time payment
        </span>
      </div>
    </div>
  );
}

interface DrawerDemoProps extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  description?: string;
  primaryButtonText?: string;
  secondaryButtonText?: string;
  onPrimaryAction?: () => void;
  onSecondaryAction?: () => void;
  price?: number;
  discountedPrice?: number;
}

const drawerVariants = {
  hidden: {
    y: "100%",
    opacity: 0,
    rotateX: 5,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    rotateX: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
      staggerChildren: 0.07,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: {
    y: 20,
    opacity: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
    },
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 30,
      mass: 0.8,
    },
  },
};

export default function SmoothDrawer({
  title = "KokonutUI - Pro",
  description = "100+ collection of UI Components and templates built for React, Next.js, and Tailwind CSS. Spend no time on design and focus on shipping.",
  primaryButtonText = "Buy Now",
  secondaryButtonText = "Maybe Later",
  onSecondaryAction,
  price = 169,
  discountedPrice = 99,
}: DrawerDemoProps) {
  const handleSecondaryClick = () => {
    onSecondaryAction?.();
  };

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        Open Drawer
      </DrawerTrigger>
      <DrawerContent className="mx-auto max-w-fit rounded-2xl p-6 shadow-xl">
        <motion.div
          animate="visible"
          className="mx-auto w-full max-w-[340px] space-y-6"
          initial="hidden"
          variants={drawerVariants as any}
        >
          <motion.div variants={itemVariants as any}>
            <DrawerHeader className="space-y-2.5 px-0">
              <DrawerTitle className="flex items-center gap-2.5 font-semibold text-2xl tracking-tighter">
                <motion.div variants={itemVariants as any}>
                  <div className="rounded-xl bg-gradient-to-br from-zinc-100 to-zinc-200 p-1.5 shadow-inner dark:from-zinc-800 dark:to-zinc-900">
                    <img alt="Logo" height={32} src="https://storage.efferd.com/logo/vercel.svg" width={32} className="dark:invert object-contain" />
                  </div>
                </motion.div>
                <motion.span variants={itemVariants as any}>
                  {title}
                </motion.span>
              </DrawerTitle>
              <motion.div variants={itemVariants as any}>
                <DrawerDescription className="text-sm text-zinc-600 leading-relaxed tracking-tighter dark:text-zinc-400 text-left">
                  {description}
                </DrawerDescription>
              </motion.div>
            </DrawerHeader>
          </motion.div>

          <motion.div variants={itemVariants as any}>
            <PriceTag discountedPrice={discountedPrice} price={price} />
          </motion.div>

          <motion.div variants={itemVariants as any}>
            <DrawerFooter className="flex flex-col gap-3 px-0">
              <div className="w-full">
                <a
                  className="group relative inline-flex h-11 w-full items-center justify-center overflow-hidden rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 font-semibold text-sm text-white tracking-wide shadow-lg shadow-rose-500/20 transition-all duration-500 hover:from-rose-600 hover:to-pink-600 hover:shadow-rose-500/30 hover:shadow-xl dark:from-rose-600 dark:to-pink-600 dark:hover:from-rose-500 dark:hover:to-pink-500"
                  href="https://kokonutui.pro/#pricing"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <motion.span
                    className="absolute inset-0 translate-x-[-200%] bg-gradient-to-r from-transparent via-white/20 to-transparent"
                    transition={{
                      duration: 1.5,
                      ease: "easeInOut",
                      repeat: 0,
                    }}
                    whileHover={{
                      x: ["-200%", "200%"],
                    }}
                  />
                  <motion.div
                    animate={{ opacity: 1 }}
                    className="relative flex items-center gap-2 tracking-tighter"
                    initial={{ opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    {primaryButtonText}
                    <motion.div
                      animate={{
                        rotate: [0, 15, -15, 0],
                        y: [0, -2, 2, 0],
                      }}
                      transition={{
                        duration: 2,
                        ease: "easeInOut",
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 1,
                      }}
                    >
                      <Fingerprint className="h-4 w-4" />
                    </motion.div>
                  </motion.div>
                </a>
              </div>
              <DrawerClose render={<Button
                  className="h-11 w-full rounded-xl border-zinc-200 font-semibold text-sm tracking-tighter transition-colors hover:bg-zinc-100 dark:border-zinc-800 dark:hover:bg-zinc-800/80"
                  onClick={handleSecondaryClick}
                  variant="outline"
                />}>
                  {secondaryButtonText}
              </DrawerClose>
            </DrawerFooter>
          </motion.div>
        </motion.div>
      </DrawerContent>
    </Drawer>
  );
}


`,

  "social-button": `"use client";

/**
 * @author: @dorianbaffier
 * @description: Social Button
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import type { LucideIcon } from "lucide-react";
import { Instagram, Link, Linkedin, Twitter } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Button } from "../ui/coss/button";
import { cn } from "../../lib/utils";

interface ShareItem {
  icon: LucideIcon;
  label: string;
}

interface SocialButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  items?: ShareItem[];
  onShare?: (index: number, item: ShareItem) => void;
  className?: string;
}

const DEFAULT_SHARE_ITEMS: ShareItem[] = [
  { icon: Twitter, label: "Share on Twitter" },
  { icon: Instagram, label: "Share on Instagram" },
  { icon: Linkedin, label: "Share on LinkedIn" },
  { icon: Link, label: "Copy link" },
];

export default function SocialButton({
  label = "Share",
  items = DEFAULT_SHARE_ITEMS,
  onShare,
  className,
  ...props
}: SocialButtonProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleShare = (index: number) => {
    setActiveIndex(index);
    onShare?.(index, items[index]);
    setTimeout(() => setActiveIndex(null), 300);
  };

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
    >
      <motion.div
        animate={{
          opacity: isVisible ? 0 : 1,
        }}
        transition={{
          duration: 0.2,
          ease: "easeInOut",
        }}
      >
        <Button
          className={cn(
            "relative min-w-40",
            "bg-white dark:bg-black",
            "hover:bg-gray-50 dark:hover:bg-gray-950",
            "text-black dark:text-white",
            "border border-black/10 dark:border-white/10",
            "transition-colors duration-200",
            className
          )}
          {...props}
        >
          <span className="flex items-center gap-2">
            <Link className="h-4 w-4" />
            {label}
          </span>
        </Button>
      </motion.div>

      <motion.div
        animate={{
          width: isVisible ? "auto" : 0,
        }}
        className="absolute top-0 left-0 flex h-10 overflow-hidden"
        transition={{
          duration: 0.3,
          ease: [0.23, 1, 0.32, 1],
        }}
      >
        {items.map((button, i) => (
          <motion.button
            animate={{
              opacity: isVisible ? 1 : 0,
              x: isVisible ? 0 : -20,
            }}
            aria-label={button.label}
            className={cn(
              "h-10",
              "w-10",
              "flex items-center justify-center",
              "bg-black dark:bg-white",
              "text-white dark:text-black",
              i === 0 && "rounded-l-md",
              i === items.length - 1 && "rounded-r-md",
              "border-white/10 border-r last:border-r-0 dark:border-black/10",
              "hover:bg-gray-900 dark:hover:bg-gray-100",
              "outline-none",
              "relative overflow-hidden",
              "transition-colors duration-200"
            )}
            key={\`share-\${button.label}\`}
            onClick={() => handleShare(i)}
            transition={{
              duration: 0.3,
              ease: [0.23, 1, 0.32, 1],
              delay: isVisible ? i * 0.05 : 0,
            }}
            type="button"
          >
            <motion.div
              animate={{
                scale: activeIndex === i ? 0.85 : 1,
              }}
              className="relative z-10"
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            >
              <button.icon className="h-4 w-4" />
            </motion.div>
            <motion.div
              animate={{
                opacity: activeIndex === i ? 0.15 : 0,
              }}
              className="absolute inset-0 bg-white dark:bg-black"
              initial={{ opacity: 0 }}
              transition={{
                duration: 0.2,
                ease: "easeInOut",
              }}
            />
          </motion.button>
        ))}
      </motion.div>
    </div>
  );
}


`,

  "spinning-text": `"use client";

import React, { useState } from "react";
import { motion } from "motion/react";
import { Star } from "lucide-react";
import { cn } from "../../lib/utils";

export interface SpinningTextProps {
  /** The text string to render around the circle */
  text: string;
  /** Circle radius in px */
  radius?: number;
  /** Character font size in px */
  fontSize?: number;
  /** Seconds for one full revolution (hover halves this) */
  speed?: number;
  /** Spin direction */
  direction?: "normal" | "reverse";
  className?: string;
  /** Center content — defaults to a star icon */
  children?: React.ReactNode;
}

export function SpinningText({
  text,
  radius = 50,
  fontSize = 12,
  speed = 10,
  direction = "normal",
  className,
  children,
}: SpinningTextProps) {
  const [isHovered, setIsHovered] = useState(false);
  const characters = text.split("");
  const angleStep = 360 / characters.length;

  return (
    <div
      className={cn("relative flex items-center justify-center", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <motion.div
        animate={{ rotate: direction === "normal" ? 360 : -360 }}
        transition={{
          duration: isHovered ? speed / 2 : speed,
          repeat: Infinity,
          ease: "linear",
        }}
        className="relative flex items-center justify-center"
        style={{ width: radius * 2, height: radius * 2 }}
      >
        {characters.map((char, i) => (
          <span
            key={i}
            className="absolute left-1/2 top-0 font-medium uppercase tracking-tighter"
            style={{
              height: radius,
              transform: \`translateX(-50%) rotate(\${i * angleStep}deg)\`,
              fontSize,
              transformOrigin: \`center \${radius}px\`,
            }}
          >
            {char}
          </span>
        ))}
      </motion.div>
      <div className="absolute flex items-center justify-center">
        {children || <Star className="text-primary fill-primary" size={radius / 2} />}
      </div>
    </div>
  );
}

export default SpinningText;


`,

  "testimonial-marquee": `"use client";

import React from "react";
import { cn } from "../../lib/utils";

// ─── Internal Marquee (self-contained, CSS-driven) ───────────────────────────

interface MarqueeProps {
  children: React.ReactNode;
  reverse?: boolean;
  pauseOnHover?: boolean;
  className?: string;
}

function InternalMarquee({ children, reverse, pauseOnHover, className }: MarqueeProps) {
  return (
    <div
      className={cn(
        "group flex overflow-hidden [--gap:1rem]",
        className
      )}
    >
      {[0, 1].map(i => (
        <div
          key={i}
          className={cn(
            "flex shrink-0 gap-[--gap] marquee-track",
            reverse ? "marquee-reverse" : "marquee-forward",
            pauseOnHover && "group-hover:[animation-play-state:paused]"
          )}
          aria-hidden={i === 1}
        >
          {children}
        </div>
      ))}
    </div>
  );
}

export interface TestimonialItem {
  name: string;
  username: string;
  body: string;
  profile?: string;
}

const DEFAULT_TESTIMONIALS: TestimonialItem[] = [
  {
    name: "Ken Masters",
    username: "@kmasters",
    body: "\\"Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.\\"",
    profile: "https://images.shadcnspace.com/assets/profiles/rough.webp",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "\\"What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.\\"",
    profile: "https://images.shadcnspace.com/assets/profiles/albert.webp",
  },
  {
    name: "Lirael Nassun",
    username: "@lnassun",
    body: "\\"This is easily one of the most reliable UI tools we've adopted. The components are intuitive, integrations are seamless, and it saves us countless hours every week.\\"",
    profile: "https://images.shadcnspace.com/assets/profiles/linda.webp",
  },
  {
    name: "Jessica",
    username: "@jessica",
    body: "Switching to this platform streamlined our entire workflow. Setup was effortless, performance improved instantly, and our team now ships features faster without worrying about infrastructure.",
    profile: "https://images.shadcnspace.com/assets/profiles/jessica.webp",
  },
  {
    name: "Jenny",
    username: "@jenny",
    body: "\\"We evaluated multiple solutions, but this stood out immediately. It's fast, scalable, and thoughtfully designed for growing teams that need stability without added complexity.\\"",
    profile: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
  },
  {
    name: "Sam Torres",
    username: "@storres",
    body: "\\"The motion design details really set this apart. Every interaction feels crafted and intentional. The developer experience is exceptional.\\"",
  },
  {
    name: "Alex Renner",
    username: "@arenner",
    body: "\\"Copy-paste components that actually look premium? Yes please. Saved us weeks of design-dev handoff friction.\\"",
  },
];

function Avatar({ src, name }: { src?: string; name: string }) {
  if (src) {
    return (
      <img
        src={src}
        alt={name}
        width={32}
        height={32}
        className="size-8 rounded-full object-cover"
        onError={e => { (e.target as HTMLImageElement).style.display = "none"; }}
      />
    );
  }
  return (
    <div className="size-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary text-xs font-bold select-none shrink-0">
      {name.charAt(0).toUpperCase()}
    </div>
  );
}

function TestimonialCard({ name, username, body, profile }: TestimonialItem) {
  return (
    <div className="relative h-full w-64 cursor-pointer overflow-hidden rounded-xl border border-border bg-card shadow-none p-4 shrink-0">
      <div className="flex flex-row items-center gap-2 mb-2">
        <Avatar src={profile} name={name} />
        <div className="flex flex-col min-w-0">
          <p className="text-sm font-medium text-foreground truncate">{name}</p>
          <p className="text-xs font-medium text-muted-foreground truncate">{username}</p>
        </div>
      </div>
      <p className="text-sm line-clamp-3 text-foreground/80">{body}</p>
    </div>
  );
}

export interface TestimonialMarqueeProps {
  testimonials?: TestimonialItem[];
  /** Animation speed in seconds for each row */
  duration?: number;
  className?: string;
}

export function TestimonialMarquee({
  testimonials = DEFAULT_TESTIMONIALS,
  duration = 20,
  className,
}: TestimonialMarqueeProps) {
  const half = Math.ceil(testimonials.length / 2);
  const firstRow  = testimonials.slice(0, half);
  const secondRow = testimonials.slice(half);

  return (
    <div className={cn("relative flex w-full flex-col items-center justify-center gap-4 overflow-hidden", className)}>
      <InternalMarquee pauseOnHover className={\`[--duration:\${duration}s]\`}>
        {firstRow.map(t => <TestimonialCard key={t.username} {...t} />)}
      </InternalMarquee>
      <InternalMarquee reverse pauseOnHover className={\`[--duration:\${duration}s]\`}>
        {secondRow.map(t => <TestimonialCard key={t.username} {...t} />)}
      </InternalMarquee>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </div>
  );
}

export default TestimonialMarquee;


`,

  "toolbar": `"use client";

/**
 * @author: @dorianbaffier
 * @description: Toolbar
 * @version: 1.0.0
 * @date: 2025-06-26
 * @license: MIT
 * @website: https://kokonutui.com
 * @github: https://github.com/kokonut-labs/kokonutui
 */

import {
  Bell,
  CircleUserRound,
  Edit2,
  FileDown,
  Frame,
  Layers,
  Lock,
  type LucideIcon,
  MousePointer2,
  Move,
  Palette,
  Shapes,
  Share2,
  SlidersHorizontal,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import * as React from "react";
import { cn } from "@/lib/utils";

interface ToolbarItem {
  id: string;
  title: string;
  icon: LucideIcon;
  type?: never;
}

interface ToolbarProps {
  items?: ToolbarItem[];
  defaultSelected?: string;
  className?: string;
  activeColor?: string;
  onSelect?: (itemId: string) => void;
}

const DEFAULT_TOOLBAR_ITEMS: ToolbarItem[] = [
  { id: "select", title: "Select", icon: MousePointer2 },
  { id: "move", title: "Move", icon: Move },
  { id: "shapes", title: "Shapes", icon: Shapes },
  { id: "layers", title: "Layers", icon: Layers },
  { id: "frame", title: "Frame", icon: Frame },
  { id: "properties", title: "Properties", icon: SlidersHorizontal },
  { id: "export", title: "Export", icon: FileDown },
  { id: "share", title: "Share", icon: Share2 },
  { id: "notifications", title: "Notifications", icon: Bell },
  { id: "profile", title: "Profile", icon: CircleUserRound },
  { id: "appearance", title: "Appearance", icon: Palette },
];

const buttonVariants = {
  initial: {
    gap: 0,
    paddingLeft: ".5rem",
    paddingRight: ".5rem",
  },
  animate: (isSelected: boolean) => ({
    gap: isSelected ? ".5rem" : 0,
    paddingLeft: isSelected ? "1rem" : ".5rem",
    paddingRight: isSelected ? "1rem" : ".5rem",
  }),
};

const spanVariants = {
  initial: { width: 0, opacity: 0 },
  animate: { width: "auto", opacity: 1 },
  exit: { width: 0, opacity: 0 },
};

const notificationVariants = {
  initial: { opacity: 0, y: 10, x: "-50%" },
  animate: { opacity: 1, y: -10, x: "-50%" },
  exit: { opacity: 0, y: -20, x: "-50%" },
};

const lineVariants = {
  initial: { scaleX: 0 },
  animate: {
    scaleX: 1,
    transition: { duration: 0.2, ease: "easeOut" },
  },
  exit: {
    scaleX: 0,
    transition: { duration: 0.2, ease: "easeIn" },
  },
};

const transition = { type: "spring", bounce: 0, duration: 0.4 };

export function Toolbar({
  items = DEFAULT_TOOLBAR_ITEMS,
  defaultSelected = "select",
  className,
  activeColor = "text-primary",
  onSelect,
}: ToolbarProps) {
  const [selected, setSelected] = React.useState<string | null>(
    defaultSelected
  );
  const [isToggled, setIsToggled] = React.useState(false);
  const [activeNotification, setActiveNotification] = React.useState<
    string | null
  >(null);
  const outsideClickRef = React.useRef(null);

  const handleItemClick = (itemId: string) => {
    setSelected(selected === itemId ? null : itemId);
    onSelect?.(itemId);
    setActiveNotification(itemId);
    setTimeout(() => setActiveNotification(null), 1500);
  };

  return (
    <div className="space-y-2">
      <div
        className={cn(
          "relative flex items-center gap-3 p-2",
          "bg-background",
          "rounded-xl border",
          "transition-all duration-200",
          className
        )}
        ref={outsideClickRef}
      >
        <AnimatePresence>
          {activeNotification && (
            <motion.div
              animate="animate"
              className="absolute -top-8 left-1/2 z-50"
              exit="exit"
              initial="initial"
              transition={{ duration: 0.3 }}
              variants={notificationVariants as any}
            >
              <div className="rounded-full bg-primary px-3 py-1 text-primary-foreground text-xs whitespace-nowrap">
                {items.find((item) => item.id === activeNotification)?.title}{" "}
                clicked!
              </div>
              <motion.div
                animate="animate"
                className="absolute -bottom-1 left-0 h-[2px] w-full origin-center bg-primary"
                exit="exit"
                initial="initial"
                variants={lineVariants as any}
              />
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {items.map((item) => (
            <motion.button
              animate="animate"
              className={cn(
                "relative flex items-center rounded-none px-3 py-2",
                "font-medium text-sm transition-colors duration-300",
                selected === item.id
                  ? "rounded-lg bg-[#1F9CFE] text-white"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
              custom={selected === item.id}
              initial={false}
              key={item.id}
              onClick={() => handleItemClick(item.id)}
              transition={transition as any}
              variants={buttonVariants as any}
            >
              <item.icon
                className={cn(selected === item.id && "text-white")}
                size={16}
              />
              <AnimatePresence initial={false}>
                {selected === item.id && (
                  <motion.span
                    animate="animate"
                    className="overflow-hidden"
                    exit="exit"
                    initial="initial"
                    transition={transition as any}
                    variants={spanVariants as any}
                  >
                    {item.title}
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          ))}

          <motion.button
            className={cn(
              "flex items-center gap-2 px-4 py-2",
              "rounded-xl border shadow-sm transition-all duration-200",
              "hover:shadow-md active:border-primary/50",
              isToggled
                ? [
                    "bg-[#1F9CFE] text-white",
                    "border-[#1F9CFE]/30",
                    "hover:bg-[#1F9CFE]/90",
                    "hover:border-[#1F9CFE]/40",
                  ]
                : [
                    "bg-background text-muted-foreground",
                    "border-border/30",
                    "hover:bg-muted",
                    "hover:text-foreground",
                    "hover:border-border/40",
                  ]
            )}
            onClick={() => setIsToggled(!isToggled)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {isToggled ? (
              <Edit2 className="h-3.5 w-3.5" />
            ) : (
              <Lock className="h-3.5 w-3.5" />
            )}
            <span className="font-medium text-sm">
              {isToggled ? "On" : "Off"}
            </span>
          </motion.button>
        </div>
      </div>
    </div>
  );
}

export default Toolbar;
`,

  "video-ambient": `"use client";

import { useRef, useEffect } from "react";
import { cn } from "../../lib/utils";

interface VideoAmbientProps {
  src: string;
  poster?: string;
  blurAmount?: number;
  intensity?: number;
  autoPlay?: boolean;
  muted?: boolean;
  className?: string;
}

// Low resolution for the canvas — the blur hides any pixel detail anyway.
const CANVAS_W = 64;
const CANVAS_H = 36;

export function VideoAmbient({
  src,
  poster,
  blurAmount = 60,
  intensity = 0.85,
  autoPlay = false,
  muted = false,
  className,
}: VideoAmbientProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const draw = () => {
      // Only paint when the video has pixel data to show.
      if (!video.paused || video.readyState >= 2) {
        try {
          ctx.drawImage(video, 0, 0, CANVAS_W, CANVAS_H);
        } catch {
          // Ignore cross-origin canvas restrictions; video playback should continue.
        }
      }
      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    <div className={cn("relative w-full", className)}>
      {/* Glow canvas — same approach as YouTube's ambient mode.
          Canvas drawImage() runs in the normal paint cycle, so adjacent
          elements repaint automatically without composite-layer tricks. */}
      <canvas
        ref={canvasRef}
        width={CANVAS_W}
        height={CANVAS_H}
        aria-hidden
        className="absolute pointer-events-none rounded-xl"
        style={{
          inset: 0,
          width: "100%",
          height: "100%",
          filter: \`blur(\${blurAmount}px)\`,
          opacity: intensity,
          transform: "scale(1.08)",
          zIndex: 0,
        }}
      />
      {/* Main video */}
      <video
        ref={videoRef}
        src={src || undefined}
        poster={poster || undefined}
        controls
        playsInline
        preload="metadata"
        autoPlay={autoPlay}
        muted={muted}
        className="relative w-full rounded-xl"
        style={{ zIndex: 1 }}
      />
    </div>
  );
}


`,

  "you-can-scroll": `"use client";

import React from 'react';

const verbs = [
  "design.", "prototype.", "solve.", "build.", "develop.", "debug.", "learn.", "cook.", "ship.", "prompt.", "collaborate.", "create.", "inspire.", "follow.", "innovate.", "test.", "optimize.", "teach.", "visualize.", "transform.", "scale.", "do it."
];

export function YouCanScroll() {
  return (
    <div className="min-h-[300vh] bg-[#0a0a0a] text-zinc-50 font-sans selection:bg-zinc-800 relative w-full overflow-x-hidden">
      <div className="grid-background" />

      {/* Sticky Header Background that fades in at end of morph */}
      <header className="header-bg fixed top-0 left-0 w-full h-24 z-40 bg-transparent" />

      {/* The Morphing Wordmark */}
      <div className="wordmark flex items-center whitespace-nowrap gap-4 md:gap-6 text-[clamp(2.5rem,8vw,8rem)] font-bold text-white drop-shadow-2xl mix-blend-difference">
        <img 
          src="/app_logo_1779892160269.png" 
          alt="Studio Logo" 
          className="w-[0.9em] h-[0.9em] rounded-full object-cover shrink-0"
          referrerPolicy="no-referrer"
        />
        <h1 className="leading-[0.8] tracking-tight">Morphing.</h1>
        <div className="side-tag flex flex-col justify-end h-[0.8em]">
          <span className="text-[0.18em] font-sans font-medium tracking-[0.15em] text-zinc-300 uppercase whitespace-nowrap mb-1">
            Design Studio
          </span>
        </div>
      </div>

      {/* Bounce indicator telling the user to scroll */}
      <div className="scroll-indicator-container fixed bottom-12 left-1/2 -translate-x-1/2 z-40 pointer-events-none">
        <div className="scroll-indicator flex flex-col items-center gap-1">
          <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-zinc-400">Scroll</span>
          <svg
            viewBox="0 0 24 60"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="w-5 h-auto mt-2 -ml-1 text-zinc-500/80"
          >
            <path d="M 12 4 C 5 20, 19 35, 11 55" />
            <path d="M 4 45 C 6 48, 9 53, 11 55 C 14 52, 17 48, 20 44" />
          </svg>
        </div>
      </div>

      {/* Track progress scroll line */}
      <div className="fixed top-32 right-4 sm:right-12 bottom-32 w-8 scroll-progress-wrapper pointer-events-none z-50">
        <div className="absolute top-0 bottom-0 right-[2px] w-[1px] bg-white/10" />
        <div className="scroll-progress-label absolute top-0 right-[0px] font-mono text-[10px] sm:text-xs text-zinc-400 uppercase tracking-widest" />
      </div>

      <main className="relative z-10 pt-[120vh]">
        <section className="px-8 md:px-24 py-32 max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-display font-medium tracking-tight mb-8 text-white">
            Curved Motion Paths
          </h2>
          <p className="fluid-text text-zinc-400 max-w-2xl leading-relaxed" style={{"--f-min": 18, "--f-max": 24, "--f-curve": 0.8} as React.CSSProperties}>
            By interpolating the X and Y axes individually via modern CSS <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded text-lg mx-1">@property</code> declarations and applying orthogonal timing functions—<span className="text-white">ease-in</span> for horizontal and <span className="text-white">ease-out</span> for vertical—we break free from linear motion.
          </p>
          <p className="fluid-text text-zinc-400 max-w-2xl leading-relaxed mt-6" style={{"--f-min": 18, "--f-max": 24, "--f-curve": 0.8} as React.CSSProperties}>
            The result is an organic, sweeping curve that breathes life into standard scroll-driven mechanics, transforming the typography as it arcs elegantly into its parked position.
          </p>
        </section>

        <section className="px-8 md:px-24 py-16 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="aspect-square bg-zinc-900/40 rounded-3xl p-10 md:p-14 flex flex-col justify-between border border-white/5 group hover:bg-zinc-900 transition-colors duration-500">
            <div className="w-12 h-12 rounded-full border border-zinc-700 font-mono flex items-center justify-center text-sm text-zinc-400 group-hover:border-zinc-500 group-hover:text-zinc-200 transition-colors">01</div>
            <div>
              <h3 className="text-2xl md:text-3xl font-display mb-4 text-white">Ease In X</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">The horizontal motion starts slow, waiting for the vertical motion to carry the momentum before sweeping aggressively to the left edge.</p>
            </div>
          </div>
          
          <div className="aspect-square bg-zinc-900/40 rounded-3xl p-10 md:p-14 flex flex-col justify-between border border-white/5 group hover:bg-zinc-900 transition-colors duration-500">
            <div className="w-12 h-12 rounded-full border border-zinc-700 font-mono flex items-center justify-center text-sm text-zinc-400 group-hover:border-zinc-500 group-hover:text-zinc-200 transition-colors">02</div>
            <div>
              <h3 className="text-2xl md:text-3xl font-display mb-4 text-white">Ease Out Y</h3>
              <p className="text-zinc-500 text-lg leading-relaxed">The vertical motion fires immediately upon scroll, racing towards the ceiling before gracefully and subtly slowing into its final resting offset.</p>
            </div>
          </div>
        </section>

        {/* Fluid Typography Section */}
        <section className="px-8 md:px-24 pt-32 pb-16 max-w-7xl mx-auto space-y-12">
          <div className="flex flex-col gap-4 max-w-3xl">
            <h2 className="text-4xl md:text-5xl font-display font-medium text-white tracking-tight">Fluid Typography</h2>
            <p className="text-zinc-400 leading-relaxed fluid-text" style={{"--f-min": 18, "--f-max": 24} as React.CSSProperties}>
              Resize the browser to observe non-linear font scaling. Using the CSS <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-2 py-1 rounded mx-1 text-[0.8em] font-mono">pow()</code> function, we can configure exactly how typography responds to viewport changes. Built to scale from <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[0.8em] font-mono">14px</code> to <code className="bg-zinc-900 border border-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-[0.8em] font-mono">24px</code> (or any values) cleanly.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div style={{"--f-curve": 0.3} as React.CSSProperties} className="p-8 md:p-10 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:bg-zinc-900/40 hover:border-zinc-700 transition duration-500">
               <div className="text-xs font-mono text-zinc-500 mb-8 flex items-center justify-between">
                  <span>pow(progress, 0.3)</span>
                  <span className="text-zinc-600 border border-zinc-800 rounded px-2 py-0.5 uppercase tracking-wider text-[10px]">Ease Out</span>
               </div>
               <p className="fluid-text text-zinc-200 leading-snug font-medium" style={{"--f-min": 14, "--f-max": 36} as React.CSSProperties}>
                 This text scales rapidly at smaller viewports, then arches gently towards its maximum size.
               </p>
            </div>
            
            <div style={{"--f-curve": 1} as React.CSSProperties} className="p-8 md:p-10 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:bg-zinc-900/40 hover:border-zinc-700 transition duration-500">
               <div className="text-xs font-mono text-zinc-500 mb-8 flex items-center justify-between">
                  <span>pow(progress, 1.0)</span>
                  <span className="text-zinc-600 border border-zinc-800 rounded px-2 py-0.5 uppercase tracking-wider text-[10px]">Linear</span>
               </div>
               <p className="fluid-text text-zinc-200 leading-snug font-medium" style={{"--f-min": 14, "--f-max": 36} as React.CSSProperties}>
                 This text scales evenly as the viewport width increases over time. A standard fluid setup.
               </p>
            </div>

            <div style={{"--f-curve": 4} as React.CSSProperties} className="p-8 md:p-10 border border-white/5 bg-zinc-900/20 rounded-3xl group hover:bg-zinc-900/40 hover:border-zinc-700 transition duration-500">
               <div className="text-xs font-mono text-zinc-500 mb-8 flex items-center justify-between">
                  <span>pow(progress, 4.0)</span>
                  <span className="text-zinc-600 border border-zinc-800 rounded px-2 py-0.5 uppercase tracking-wider text-[10px]">Ease In</span>
               </div>
               <p className="fluid-text text-zinc-200 leading-snug font-medium" style={{"--f-min": 14, "--f-max": 36} as React.CSSProperties}>
                 This text remains small for longer, and rapidly scales up only when reaching the maximum width.
               </p>
            </div>
          </div>
        </section>
        
        <section className="min-h-screen flex flex-col items-center justify-center snap-center-item pb-[10vh]">
          <h1 className="gradient-heading text-[clamp(2.5rem,8vw,8rem)] font-display drop-shadow-lg text-center leading-[0.9] tracking-tighter">
            you can<br />scroll.
          </h1>
        </section>

        <section className="scroll-effect-section w-full px-8 md:px-[15vw] mx-auto flex items-start" style={{"--count": verbs.length} as React.CSSProperties}>
          <h2 className="gradient-heading sticky top-1/2 -translate-y-1/2 h-max text-[clamp(2rem,6vw,6rem)] font-display font-semibold tracking-tighter shrink-0 mr-4 md:mr-8">
            <span aria-hidden="true">you can&nbsp;</span>
          </h2>
          <ul className="m-0 p-0 pb-[40vh] pt-[40vh] list-none text-[clamp(2rem,6vw,6rem)] font-display font-semibold tracking-tighter leading-tight" aria-hidden="true">
            {verbs.map((verb, i) => (
              <li key={verb} className="scroll-effect-item py-2 md:py-4" style={{"--i": i} as React.CSSProperties}>
                {verb}
              </li>
            ))}
          </ul>
        </section>

        <section className="carousel-section min-h-[80vh] snap-center-item flex items-center justify-center w-full relative">
          <ul className="carousel-list">
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=1" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=2" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=3" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=4" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=5" alt="" /></li>
            <li className="carousel-item"><img src="https://picsum.photos/400/300?random=6" alt="" /></li>
          </ul>
        </section>

        <section className="min-h-[60vh] flex flex-col gap-16 items-center justify-center snap-center-item pt-20">
          <h2 className="gradient-heading text-[clamp(3rem,8vw,8rem)] font-display font-bold leading-none tracking-tighter">
            fin.
          </h2>

          <footer className="text-center text-zinc-650 font-mono text-sm opacity-50 relative z-10 snap-center-item">
            ʕ⊙ᴥ⊙ʔ jh3yy &copy; 2024
          </footer>
        </section>

      </main>
    </div>
  );
}

export default YouCanScroll;


`,

  "scroll-dissolve-reveal": `"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture, OrthographicCamera } from "@react-three/drei";
import * as THREE from "three";
import { useScroll } from "framer-motion";
import { cn } from "@/lib/utils";

const coverVertexShader = \`
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
\`;

const coverFragmentShader = \`
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uGrayscale;
  uniform float uEdgeIntensity;
  uniform float uEdgeBrightness;
  varying vec2 vUv;

  mat3 sobelX = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
  );

  mat3 sobelY = mat3(
    -1.0, -2.0, -1.0,
     0.0,  0.0,  0.0,
     1.0,  2.0,  1.0
  );

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i + 1][j + 1];
        gy += lum * sobelY[i + 1][j + 1];
      }
    }

    return sqrt(gx * gx + gy * gy);
  }

  float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
  }

  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    float frequency = 1.0;
    
    for (int i = 0; i < 5; i++) {
      value += amplitude * noise(p * frequency);
      amplitude *= 0.5;
      frequency *= 2.0;
    }
    
    return value;
  }

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 texColor = texture2D(uTexture, uv);
    
    float gray = getLuminance(texColor.rgb);
    vec3 grayscaleColor = vec3(gray);
    texColor.rgb = mix(texColor.rgb, grayscaleColor, uGrayscale);
    
    vec2 centeredUv = vUv - uCenter;
    float aspect = uResolution.x / uResolution.y;
    centeredUv.x *= aspect;
    float dist = length(centeredUv);
    
    float angle = atan(centeredUv.y, centeredUv.x);
    
    float noiseScale = 6.0;
    vec2 pixelatedUv = floor(vUv * uResolution / noiseScale) * noiseScale / uResolution;
    float blockNoise = fbm(pixelatedUv * 100.0) * 0.15;
    
    float angularNoise = fbm(vec2(angle * 5.0, 0.0)) * 0.15;
    
    float totalNoise = blockNoise + angularNoise;
    float noisyDist = dist + totalNoise;
    
    float maxDist = length(vec2(aspect * 0.5, 0.5));
    float normalizedDist = noisyDist / maxDist;
    
    float dissolveThreshold = uDissolve * 1.5; 
    
    vec2 texelSize = 1.0 / uResolution;
    float edge = sobel(uTexture, uv, texelSize);
    
    edge = pow(edge, 0.7) * 2.0;
    edge = clamp(edge, 0.0, 1.0);
    
    float dissolveMask = smoothstep(dissolveThreshold - 0.03, dissolveThreshold, normalizedDist);
    
    vec3 edgeColor = vec3(1.0, 1.0, 1.0);
    
    vec3 baseColor = mix(texColor.rgb, vec3(0.0), uGrayscale);
    vec3 finalColor = baseColor;
    
    float edgeGlowIntensity = uEdgeIntensity * 2.0;
    float edgeGlow = edge * edgeGlowIntensity * (1.0 + uGrayscale * 3.0);
    finalColor += edgeColor * edgeGlow * uEdgeBrightness;
    
    float edgeZoneWidth = 0.15 * (1.0 - uDissolve) + 0.02;
    float edgeZone = smoothstep(dissolveThreshold - edgeZoneWidth, dissolveThreshold - edgeZoneWidth + 0.04, normalizedDist) * 
                     smoothstep(dissolveThreshold + 0.02, dissolveThreshold - 0.02, normalizedDist);
    float sparkle = hash(floor(vUv * uResolution / 4.0)) * edgeZone;
    
    float edgeBrightness = (1.0 - uDissolve) * uEdgeBrightness * (1.0 + uGrayscale * 2.0);
    finalColor += vec3(sparkle * 3.0 * edgeBrightness);
    
    float alpha = dissolveMask * texColor.a;

    gl_FragColor = vec4(finalColor, alpha);
  }
\`;

const coverFragmentShaderReverse = \`
  uniform sampler2D uTexture;
  uniform vec2 uResolution;
  uniform vec2 uImageResolution;
  uniform float uDissolve;
  uniform vec2 uCenter;
  uniform float uTime;
  uniform float uBrightness;
  uniform float uEdgeIntensity;
  uniform float uDarkness;
  uniform float uGrayscale;
  varying vec2 vUv;

  mat3 sobelX = mat3(
    -1.0, 0.0, 1.0,
    -2.0, 0.0, 2.0,
    -1.0, 0.0, 1.0
  );

  mat3 sobelY = mat3(
    -1.0, -2.0, -1.0,
     0.0,  0.0,  0.0,
     1.0,  2.0,  1.0
  );

  float getLuminance(vec3 color) {
    return dot(color, vec3(0.299, 0.587, 0.114));
  }

  float sobel(sampler2D tex, vec2 uv, vec2 texelSize) {
    float gx = 0.0;
    float gy = 0.0;

    for (int i = -1; i <= 1; i++) {
      for (int j = -1; j <= 1; j++) {
        vec2 offset = vec2(float(i), float(j)) * texelSize;
        float lum = getLuminance(texture2D(tex, uv + offset).rgb);
        gx += lum * sobelX[i + 1][j + 1];
        gy += lum * sobelY[i + 1][j + 1];
      }
    }

    return sqrt(gx * gx + gy * gy);
  }

  void main() {
    vec2 ratio = vec2(
      min((uResolution.x / uResolution.y) / (uImageResolution.x / uImageResolution.y), 1.0),
      min((uResolution.y / uResolution.x) / (uImageResolution.y / uImageResolution.x), 1.0)
    );

    vec2 uv = vec2(
      vUv.x * ratio.x + (1.0 - ratio.x) * 0.5,
      vUv.y * ratio.y + (1.0 - ratio.y) * 0.5
    );

    vec4 texColor = texture2D(uTexture, uv);
    
    float gray = getLuminance(texColor.rgb);
    vec3 grayscaleColor = vec3(gray);
    texColor.rgb = mix(texColor.rgb, grayscaleColor, uGrayscale);
    
    vec2 texelSize = 1.0 / uResolution;
    float edge = sobel(uTexture, uv, texelSize);
    
    edge = pow(edge, 0.7) * 2.0;
    edge = clamp(edge, 0.0, 1.0);
    
    vec3 edgeColor = vec3(1.0, 1.0, 1.0);
    
    vec3 darkBase = vec3(0.0);
    vec3 baseColor = mix(texColor.rgb, darkBase, uDarkness);
    
    float edgeGlow = edge * uEdgeIntensity * 2.0;
    baseColor += edgeColor * edgeGlow;
    
    vec3 finalColor = clamp(baseColor, 0.0, 1.0);

    gl_FragColor = vec4(finalColor, texColor.a);
  }
\`;

interface SceneProps {
  imageFront: string;
  imageBack: string;
  scrollYProgress: any;
}

const Scene = ({ imageFront, imageBack, scrollYProgress }: SceneProps) => {
  const [texture1, texture2] = useTexture([imageFront, imageBack]);
  const material1Ref = useRef<THREE.ShaderMaterial>(null);
  const material2Ref = useRef<THREE.ShaderMaterial>(null);
  const { size } = useThree();

  const uniforms1 = useMemo(
    () => ({
      uTexture: { value: texture1 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2((texture1.image as any).width, (texture1.image as any).height),
      },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uGrayscale: { value: 0.0 },
      uEdgeIntensity: { value: 0.0 },
      uEdgeBrightness: { value: 1.0 },
    }),
    [texture1, size]
  );

  const uniforms2 = useMemo(
    () => ({
      uTexture: { value: texture2 },
      uResolution: { value: new THREE.Vector2(size.width, size.height) },
      uImageResolution: {
        value: new THREE.Vector2((texture2.image as any).width, (texture2.image as any).height),
      },
      uDissolve: { value: 0.0 },
      uCenter: { value: new THREE.Vector2(0.5, 0.5) },
      uTime: { value: 0.0 },
      uBrightness: { value: 0.0 },
      uEdgeIntensity: { value: 0.6 },
      uDarkness: { value: 1.0 },
      uGrayscale: { value: 1.0 },
    }),
    [texture2, size]
  );

  useFrame((state) => {
    const timeInSeconds = state.clock.getElapsedTime();
    const progress = scrollYProgress.get();

    if (material1Ref.current) {
      material1Ref.current.uniforms.uTime.value = timeInSeconds;
      material1Ref.current.uniforms.uResolution.value.set(
        size.width,
        size.height
      );

      material1Ref.current.uniforms.uDissolve.value = progress;
      const grayscaleProgress = Math.min(1.0, progress / 0.4);
      material1Ref.current.uniforms.uGrayscale.value = grayscaleProgress;
      material1Ref.current.uniforms.uEdgeIntensity.value = progress * 0.5;
      material1Ref.current.uniforms.uEdgeBrightness.value = 1.0 - progress;
    }

    if (material2Ref.current) {
      material2Ref.current.uniforms.uTime.value = timeInSeconds;
      material2Ref.current.uniforms.uResolution.value.set(
        size.width,
        size.height
      );

      const acceleratedProgress = Math.min(1.0, progress * 1.1);
      material2Ref.current.uniforms.uEdgeIntensity.value =
        0.6 * (1.0 - acceleratedProgress);
      material2Ref.current.uniforms.uDarkness.value =
        1.0 - acceleratedProgress;
      material2Ref.current.uniforms.uGrayscale.value =
        1.0 - acceleratedProgress;
    }
  });

  return (
    <>
      <mesh position={[0, 0, -0.1]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={material2Ref}
          vertexShader={coverVertexShader}
          fragmentShader={coverFragmentShaderReverse}
          uniforms={uniforms2}
          transparent={true}
        />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <planeGeometry args={[2, 2]} />
        <shaderMaterial
          ref={material1Ref}
          vertexShader={coverVertexShader}
          fragmentShader={coverFragmentShader}
          uniforms={uniforms1}
          transparent={true}
        />
      </mesh>
    </>
  );
};

export interface ScrollDissolveRevealProps {
  imageFront: string;
  imageBack: string;
  className?: string;
  containerClassName?: string;
  scrollContainerRef?: React.RefObject<HTMLElement | null>;
}

export function ScrollDissolveReveal({
  imageFront,
  imageBack,
  className,
  containerClassName,
  scrollContainerRef,
}: ScrollDissolveRevealProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
    ...(scrollContainerRef && { container: scrollContainerRef })
  });

  return (
    <div
      ref={containerRef}
      className={cn("relative h-[300vh] w-full", containerClassName)}
    >
      <div className={cn("sticky top-0 h-screen w-full", className)}>
        <Canvas>
          <OrthographicCamera
            makeDefault
            manual
            left={-1}
            right={1}
            top={1}
            bottom={-1}
            near={0.1}
            far={10}
            position={[0, 0, 1]}
          />
          <React.Suspense fallback={null}>
            <Scene
              imageFront={imageFront}
              imageBack={imageBack}
              scrollYProgress={scrollYProgress}
            />
          </React.Suspense>
        </Canvas>
      </div>
    </div>
  );
}`,

  "image-reveal-list": `"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ImageRevealListItem {
  id: string;
  title: string;
  subtitle?: string;
  image: string;
  number: string;
  href?: string;
}

export interface ImageRevealListProps {
  items: ImageRevealListItem[];
  className?: string;
}

export function ImageRevealList({ items, className }: ImageRevealListProps) {
  return (
    <div className={cn("relative max-w-[500px] w-full mx-auto", className)}>
      <ul className="list-none bg-white/60 dark:bg-black/40 rounded-xl p-2 backdrop-blur-md border border-neutral-200 dark:border-white/10">
        {items.map((item) => (
          <li key={item.id} className="relative">
            <a
              href={item.href || "#"}
              className="group flex items-center p-4 text-neutral-800 dark:text-neutral-200 no-underline text-[15px] font-medium rounded-lg transition-all duration-200 hover:bg-white/90 dark:hover:bg-white/10 hover:translate-x-1"
            >
              <img
                src={item.image}
                alt={item.title}
                className="absolute -left-[100px] top-1/2 -translate-y-1/2 scale-90 w-[80px] h-[110px] rounded-md object-cover shadow-2xl opacity-0 pointer-events-none transition-all duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-[100] group-hover:opacity-100 group-hover:scale-100 group-hover:-left-[90px]"
              />
              <span className="text-neutral-400 dark:text-neutral-500 text-[13px] mr-4 min-w-[24px] font-normal">
                {item.number}
              </span>
              {item.title}
              {item.subtitle && (
                <span className="ml-auto text-neutral-400 dark:text-neutral-500 text-[13px] font-normal">
                  {item.subtitle}
                </span>
              )}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ImageRevealList;`,

  "magnetic-spotlight-marquee": `"use client";

import React, { useRef, useState, useEffect } from "react";
import gsap from "gsap";
import { cn } from "@/lib/utils";

interface MagneticSpotlightMarqueeProps {
  className?: string;
  images?: string[];
  title?: string[];
  subtitle?: string[];
  paragraphs?: string[][];
  navEmail?: string;
  navLinks?: string;
  footerText?: string;
}

const config = {
  marqueeScrollSpeed: 180, // Increased for a faster, dynamic feel
  stripFollowEase: 0.05,
  stripEdgeInset: 175,
  contentRiseRate: 0.85,
  risenTopGap: 100,
  liftHeadStart: 125,
  wakeStrength: 2.5,
  wakeReach: 125,
  lineSettleEase: 0.09,
};

const DEFAULT_IMAGES = [
  "https://i.pinimg.com/webp/1200x/ce/37/46/ce3746a019efd16fd490d2611e694a62.webp",
  "https://i.pinimg.com/webp/1200x/0c/ec/13/0cec13e5dc7cfd5b0084e7733523525a.webp",
  "https://i.pinimg.com/736x/90/26/17/902617a7439eab651956ca170956fa6d.jpg",
  "https://i.pinimg.com/736x/6f/7b/ed/6f7bedcdb7d42a20f12ef1378c31181e.jpg",
  "https://i.pinimg.com/webp/1200x/43/e9/1b/43e91bddefb752eb55ba24f218f2474c.webp",
  "https://i.pinimg.com/736x/af/33/7a/af337a17e5f7878f93f7415cb80e878f.jpg",
];

const DEFAULT_TITLE = ["OxygenUI"];
const DEFAULT_SUBTITLE = ["BUILD FASTER", "SHIP BETTER"];
const DEFAULT_PARAGRAPHS = [
  [
    "Oxygen UI is a premium component library",
    "specializing in smooth animations, interactive",
    "interfaces, and modern design.",
  ],
  [
    "We prioritize developer experience and aesthetics.",
    "Our components span across complex interactions,",
    "3D elements, and smooth animations built",
    "for React and modern frameworks. Our library is tailored",
    "to distinct challenges within modern web development."
  ]
];

export function MagneticSpotlightMarquee({
  className,
  images = DEFAULT_IMAGES,
  title = DEFAULT_TITLE,
  subtitle = DEFAULT_SUBTITLE,
  paragraphs = DEFAULT_PARAGRAPHS,
  navEmail = "hello@oxygen.ui",
  navLinks = "Documentation, Components, GitHub",
  footerText = "We navigate in no-nonsense environments pushing the boundaries of web design. Whether you're a startup or a global leader, building a new identity or interactive platform, Oxygen UI is your partner in innovation. Our premium components ensure that every project feels magical, collaborative, and smooth.",
}: MagneticSpotlightMarqueeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const marqueeStripRef = useRef<HTMLDivElement>(null);
  const marqueeTrackRef = useRef<HTMLDivElement>(null);
  const contentWrapperRef = useRef<HTMLDivElement>(null);

  // State to hold cloned images to fill width
  const [clonedImages, setClonedImages] = useState<string[]>(images);

  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const itemWidth = isMobile ? 140 : 180; // Smaller, square width
    const gap = 16; // 1rem gap
    const oneSetWidth = images.length * (itemWidth + gap);
    const setsNeeded = Math.ceil(window.innerWidth / oneSetWidth) + 2;
    
    const newImages = [];
    for (let i = 0; i < setsNeeded; i++) {
      newImages.push(...images);
    }
    setClonedImages(newImages);
  }, [images]);

  useEffect(() => {
    if (!marqueeTrackRef.current || !marqueeStripRef.current || !containerRef.current || !contentWrapperRef.current) return;
    if (clonedImages.length <= images.length) return;

    const marqueeTrack = marqueeTrackRef.current;
    const children = marqueeTrack.children;
    if (children.length <= images.length) return;

    // Dynamically measure the width of one set of items from the DOM
    const firstClone = children[images.length] as HTMLElement;
    const oneSetWidth = firstClone.offsetLeft;

    const ctx = gsap.context(() => {
      gsap.to(marqueeTrack, {
        x: \`-\${oneSetWidth}px\`,
        duration: oneSetWidth / 600, // Hardcoded even faster speed (600)
        ease: "none",
        repeat: -1,
        modifiers: {
          x: (x) => \`\${gsap.utils.wrap(-oneSetWidth, 0, parseFloat(x))}px\`
        }
      });
    }, marqueeTrack);

    return () => ctx.revert();
  }, [clonedImages, images.length]);

  // Wake effect logic
  useEffect(() => {
    if (!containerRef.current || !marqueeStripRef.current || !contentWrapperRef.current) return;

    const spotlightSection = containerRef.current;
    const marqueeStrip = marqueeStripRef.current;

    let stripBaseTop = 0;
    let stripHeight = 0;
    let sectionHeight = 0;
    let stripRestCenterY = 0;
    let contentTopAtRest = 0;

    let stripTargetY = 0;
    let stripCurrentY = 0;
    let stripPrevY = 0;
    let hasPointerMoved = false;

    let targets: { el: HTMLElement; restCenterY: number; currentY: number }[] = [];
    let rafId: number;

    const measureGeometry = () => {
      sectionHeight = spotlightSection.getBoundingClientRect().height;
      stripBaseTop = marqueeStrip.offsetTop;
      stripHeight = marqueeStrip.offsetHeight;
      
      stripRestCenterY = config.stripEdgeInset;
      
      const elements = Array.from(spotlightSection.querySelectorAll('.wake-target')) as HTMLElement[];
      
      let blockTop = Infinity;
      targets = elements.map(el => {
        let y = 0;
        let node: HTMLElement | null = el;
        while (node && node !== spotlightSection) {
          y += node.offsetTop;
          node = node.offsetParent as HTMLElement;
        }
        const restCenterY = y + el.offsetHeight / 2;
        blockTop = Math.min(blockTop, restCenterY - el.offsetHeight / 2);
        
        return {
          el,
          restCenterY,
          currentY: 0
        };
      });

      contentTopAtRest = isFinite(blockTop) ? blockTop : sectionHeight * 0.4;
      
      if (!hasPointerMoved) {
        const restY = config.stripEdgeInset - stripHeight / 2;
        stripTargetY = restY;
        stripCurrentY = restY;
        stripPrevY = restY;
        gsap.set(marqueeStrip, { y: stripCurrentY });
      }
    };

    setTimeout(measureGeometry, 100);
    window.addEventListener('resize', measureGeometry);

    const handlePointerMove = (e: MouseEvent) => {
      hasPointerMoved = true;
      const rect = spotlightSection.getBoundingClientRect();
      const pointerY = e.clientY - rect.top;
      stripTargetY = pointerY - stripHeight / 2;
    };

    const handlePointerLeave = () => {
      hasPointerMoved = false;
      stripTargetY = config.stripEdgeInset - stripHeight / 2;
    };

    spotlightSection.addEventListener('mousemove', handlePointerMove);
    spotlightSection.addEventListener('mouseleave', handlePointerLeave);

    const render = () => {
      stripCurrentY += (stripTargetY - stripCurrentY) * config.stripFollowEase;
      gsap.set(marqueeStrip, { y: stripCurrentY });

      const stripCenterY = stripBaseTop + stripCurrentY + stripHeight / 2;
      const stripVelocityY = stripCurrentY - stripPrevY;
      stripPrevY = stripCurrentY;

      const descentBelowRest = Math.max(0, stripCenterY - stripRestCenterY);
      const maxRise = Math.max(0, contentTopAtRest - config.risenTopGap);
      const contentRise = -Math.min(
        descentBelowRest * config.contentRiseRate,
        maxRise
      );

      targets.forEach(line => {
        const gapToStrip = line.restCenterY - stripCenterY;
        const reachedLine = stripCenterY + config.liftHeadStart >= line.restCenterY;
        
        const wakeInfluence = Math.exp(
          -(gapToStrip * gapToStrip) / (2 * config.wakeReach * config.wakeReach)
        );
        const wakeOffset = stripVelocityY * wakeInfluence * config.wakeStrength;
        
        const lineTarget = (reachedLine ? contentRise : 0) + wakeOffset;
        
        line.currentY += (lineTarget - line.currentY) * config.lineSettleEase;
        gsap.set(line.el, { y: line.currentY });
      });

      rafId = requestAnimationFrame(render);
    };
    rafId = requestAnimationFrame(render);

    return () => {
      window.removeEventListener('resize', measureGeometry);
      spotlightSection.removeEventListener('mousemove', handlePointerMove);
      spotlightSection.removeEventListener('mouseleave', handlePointerLeave);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <section
      ref={containerRef}
      className={cn(
        "spotlight relative w-full h-[100vh] min-h-[800px] overflow-hidden bg-white dark:bg-[#0f0f0f] text-white font-sans",
        className
      )}
      style={{ fontFamily: "'Instrument Sans', sans-serif" }}
    >
      {/* Top Nav - Centered layout as seen in screenshot */}
      <div className="absolute top-0 left-0 w-full p-6 flex flex-col items-center justify-center z-50 text-[10px] md:text-xs font-medium tracking-wide opacity-90 mix-blend-difference pointer-events-none">
        <div>{navEmail}</div>
        <div>{navLinks}</div>
      </div>

      {/* Marquee Strip */}
      <div 
        ref={marqueeStripRef} 
        className="spotlight-marquee absolute left-0 w-full z-20 h-[160px] md:h-[200px] pointer-events-none"
        style={{ top: 0 }} 
      >
        <div 
          ref={marqueeTrackRef} 
          className="spotlight-marquee-track flex gap-4 h-full items-center absolute top-0 left-0"
        >
          {clonedImages.map((img, idx) => (
            <div key={idx} className="w-[140px] h-[140px] md:w-[180px] md:h-[180px] shrink-0 rounded-[20px] overflow-hidden shadow-sm bg-neutral-100 dark:bg-neutral-900">
              <img
                src={img}
                alt="Marquee item"
                className="w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Main Content Layout */}
      <div 
        ref={contentWrapperRef}
        className="spotlight-content-wrapper relative w-full h-full flex flex-col items-center justify-center px-6 md:px-12 lg:px-24 z-30 pointer-events-none mix-blend-difference"
      >
        {/* Title */}
        <h1 
          className="text-[15vw] md:text-[12rem] font-normal leading-[0.85] tracking-tighter mb-20 text-center flex flex-col items-center"
          style={{ fontFamily: "'Instrument Serif', serif" }}
        >
          {title.map((line, idx) => (
            <div key={idx} className="wake-target inline-block relative">
              {line}
              {/* Optional playful dot for 'Studio' to mimic the screenshot */}
              {line === "Studio" && (
                <span className="absolute right-[0.45em] top-[0.1em] w-[0.25em] h-[0.25em] bg-white rounded-full"></span>
              )}
            </div>
          ))}
        </h1>
        
        {/* Subtitle & Paragraphs row */}
        <div className="w-full max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start mt-8 px-4 md:px-8 gap-8 md:gap-4">
          
          {/* Subtitle / Header (Left side) */}
          <div className="flex-1 md:max-w-[280px] text-right md:text-right mt-1">
            <h3 className="text-xl md:text-3xl uppercase tracking-tight font-medium leading-[1.1]">
              {subtitle.map((line, idx) => (
                <div key={idx} className="wake-target">{line}</div>
              ))}
            </h3>
          </div>

          {/* Paragraphs (Right side) */}
          <div className="flex-1 flex flex-col sm:flex-row gap-6 md:gap-12 text-[10px] md:text-xs leading-[1.6]">
            {paragraphs.map((para, pIdx) => (
              <div key={pIdx} className="flex-1 flex flex-col">
                {para.map((line, lIdx) => (
                  <div key={lIdx} className="wake-target whitespace-nowrap">
                    {line}
                  </div>
                ))}
              </div>
            ))}
          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="absolute bottom-0 left-0 w-full p-8 z-40 flex justify-center pointer-events-none mix-blend-difference">
        <p className="text-[8px] md:text-[10px] text-white/70 max-w-2xl text-center leading-[1.6]">
          {footerText}
        </p>
      </div>
    </section>
  );
}

export default MagneticSpotlightMarquee;`
};