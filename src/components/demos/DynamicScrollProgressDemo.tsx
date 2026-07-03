import React, { useRef, useState } from 'react';
import { DynamicScrollProgress, ScrollSection } from '../oxygen-ui/dynamic-scroll-progress';
import { ArrowDown, ArrowUp, Sparkles } from 'lucide-react';

const SECTIONS = [
  {
    title: "01. Psychology of Motion",
    paragraphs: [
      "A well-crafted animation can turn a static webpage into an interactive journey, guiding users and creating memorable impressions through thoughtful motion. In web development, creating a UI that is motion-driven requires a blend of psychology, coding skills, and a deep understanding of user cognitive load."
    ],
    subTitle: "Cognitive Friction",
    subParagraphs: [
      "Smooth motion drastically reduces the mental effort required to process new visual states.",
      "By mirroring real-world physics, design engineers can eliminate the jarring effect of instantaneous cuts. This spatial continuity ensures the user never loses their structural context within the application."
    ]
  },
  {
    title: "02. Why Animate?",
    paragraphs: [
      "Motion reduces cognitive load. Every decision in the design process should revolve around the user's mental model and expectations. Instead of UI elements magically teleporting, motion explains the state change. It guides the eye and establishes hierarchy.",
      "Understanding the end-user's journey helps design engineers pinpoint where sudden state changes might cause confusion. Techniques like layout animations and shared element transitions simulate physical reality, focusing attention where it matters most."
    ],
    subTitle: "Purposeful Flow",
    subParagraphs: [
      "Every transition must serve a distinct navigational or functional purpose.",
      "Whether orchestrating a complex timeline or a simple hover state, motion should act as a silent guide. It communicates hierarchy, confirms interactions, and elevates the perceived performance of the entire system."
    ]
  },
  {
    title: "03. When to Animate?",
    paragraphs: [
      "Timing is everything. Context dictates necessity. Animate during critical transitions like moving from an index page to a detailed view or during state changes, such as a button morphing into a loading state.",
      "Animations should also be used to provide immediate feedback. A subtle shake for an error or a smooth color transition on hover reassures the user that the system is actively responding to their inputs. Avoid motion just for decoration."
    ],
    subTitle: "Strategic Timing",
    subParagraphs: [
      "Reserve complex animations for core interactions and major layout shifts.",
      "Introduce motion when establishing a new context, confirming a successful action, or masking asynchronous data fetching. Avoid animating purely for aesthetic flex if it disrupts the critical path."
    ]
  },
  {
    title: "04. What to Animate?",
    paragraphs: [
      "Focus on the micro-interactions. The anatomy of a premium UI lies in the small details: the way a modal scales up from its origin point, or the subtle staggering of list items as they enter the viewport.",
      "Keep animations quick, typically between 200ms and 300ms. Slower animations make the interface feel sluggish, while overly fast ones can cause motion sickness. Pair these durations with custom easing curves so UI elements feel like they possess weight."
    ],
    subTitle: "Subtle Details",
    subParagraphs: [
      "Scale, opacity, and spatial transformations are the foundation of premium interfaces.",
      "A finely tuned interaction, a subtle stagger effect on grid items, or the seamless expansion of a glassmorphic layer creates a tactile, highly polished aesthetic."
    ]
  },
  {
    title: "05. The Physics of UI",
    paragraphs: [
      "Linear animations feel robotic and cheap. Premium interfaces abandon rigid durations in favor of spring physics to simulate mass, tension, and friction.",
      "When a user interacts with an element, it should respond with the appropriate weight. A heavy data table might ease into place with a slow, dampened settle, while a lightweight tooltip snaps instantly with a crisp, energetic bounce."
    ],
    subTitle: "Tactile Realism",
    subParagraphs: [
      "Replacing standard ease-outs with mathematically modeled springs bridges the gap between software and the physical world.",
      "This physical grounding is what makes modern, minimalist layouts feel deeply tactile and satisfying to navigate."
    ]
  }
];

export default function DynamicScrollProgressDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState<'bottom-left' | 'bottom-center' | 'bottom-right'>('bottom-center');

  const scrollSections: ScrollSection[] = SECTIONS.map((sec, i) => ({
    id: `scroll-sec-${i}`,
    title: sec.title
  }));

  const handleScroll = (index: number, isLast: boolean) => {
    if (isLast) {
      if (scrollRef.current) {
        scrollRef.current.scrollTo({ top: 0, behavior: 'smooth' });
      }
    } else {
      const nextSection = scrollRef.current?.querySelector(`#scroll-sec-${index + 1}`);
      nextSection?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-white dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 relative overflow-hidden rounded-2xl border border-zinc-200 dark:border-zinc-800 flex flex-col md:flex-row">
      
      {/* Settings / Controls Column (Left panel) */}
      <div className="w-full md:w-64 border-b md:border-b-0 md:border-r border-zinc-200 dark:border-zinc-800 p-5 bg-zinc-50 dark:bg-zinc-900/50 flex-shrink-0 flex flex-col gap-4 z-10">
        <div>
          <div className="flex items-center gap-1.5 mb-1">
            <Sparkles className="size-4 text-purple-500 animate-pulse" />
            <h3 className="text-sm font-bold tracking-tight">Scroll Index Menu</h3>
          </div>
          <p className="text-xs text-zinc-500 dark:text-zinc-400">
            Scroll down the article on the right to watch the indexes update.
          </p>
        </div>

        {/* Position Option */}
        <div className="flex flex-col gap-1.5 text-left">
          <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
            Menu Alignment
          </label>
          <div className="flex flex-col gap-1.5 bg-zinc-100 dark:bg-zinc-800/40 p-1.5 rounded-xl">
            {(['bottom-left', 'bottom-center', 'bottom-right'] as const).map((pos) => (
              <button
                key={pos}
                onClick={() => setPosition(pos)}
                className={`py-1.5 px-3 rounded-lg text-xs font-semibold capitalize text-left transition-all ${
                  position === pos
                    ? 'bg-white dark:bg-zinc-800 text-zinc-900 dark:text-white shadow-sm'
                    : 'text-zinc-500 hover:text-zinc-800 dark:hover:text-zinc-200'
                }`}
              >
                {pos.replace('bottom-', '')}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Article / Scrolling Container */}
      <div
        ref={scrollRef}
        className="flex-1 h-full overflow-y-auto scroll-smooth relative px-6 md:px-12 py-10"
        style={{ scrollbarWidth: 'none' }}
      >
        <BackgroundPattern />

        <div className="relative z-10 max-w-xl mx-auto flex flex-col gap-16 pb-48">
          {SECTIONS.map((section, index) => {
            const isLast = index === SECTIONS.length - 1;
            return (
              <section key={index} id={`scroll-sec-${index}`} className="flex flex-col gap-5 pt-8">
                <div className="group relative w-fit mb-2">
                  <h2 className="text-xl md:text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                    {section.title}
                  </h2>
                  <button
                    onClick={() => handleScroll(index, isLast)}
                    className="absolute top-1/2 -right-12 -translate-y-1/2 cursor-pointer flex items-center justify-center rounded-full bg-zinc-100 dark:bg-zinc-800 p-2 text-zinc-400 opacity-0 group-hover:opacity-100 hover:text-zinc-900 dark:hover:text-zinc-100 transition-all duration-300"
                    aria-label={isLast ? "Scroll to top" : "Scroll to next section"}
                  >
                    {isLast ? <ArrowUp size={16} /> : <ArrowDown size={16} />}
                  </button>
                </div>

                <div className="space-y-4">
                  {section.paragraphs.map((p, i) => (
                    <p key={i} className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                      {p}
                    </p>
                  ))}
                </div>

                <div className="mt-4 border-t border-zinc-100 dark:border-zinc-800 pt-5">
                  <h3 className="text-xs font-bold uppercase tracking-wider text-zinc-800 dark:text-zinc-300">
                    {section.subTitle}
                  </h3>
                  <div className="mt-2 space-y-2">
                    {section.subParagraphs.map((p, i) => (
                      <p key={i} className="text-xs leading-relaxed text-zinc-500 dark:text-zinc-500">
                        {p}
                      </p>
                    ))}
                  </div>
                </div>
              </section>
            );
          })}
        </div>

        {/* Floating Menu component inside preview */}
        <DynamicScrollProgress
          sections={scrollSections}
          containerRef={scrollRef}
          position={position}
          className="absolute"
        />
      </div>

    </div>
  );
}

function BackgroundPattern() {
  return (
    <div
      className="absolute top-0 left-0 right-0 z-0 h-96 opacity-40 dark:opacity-20 pointer-events-none"
      style={{
        backgroundImage: 'radial-gradient(var(--border) 1.5px, transparent 1.5px)',
        backgroundSize: '24px 24px',
        maskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
        WebkitMaskImage: 'linear-gradient(to top, transparent 0%, black 100%)',
      }}
    />
  );
}
