import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import React, { useRef } from 'react';

interface SectionProps {
  triggerToast: (msg: string) => void;
}

export function WorkTogether({ triggerToast }: SectionProps) {
  return (
    <div className="my-6 mx-auto w-[calc(100%-2rem)] md:w-[calc(100%-4rem)] max-w-7xl bg-[#000] border border-white/[0.08] rounded-[2rem] py-10 md:py-14 px-6 md:px-12 flex flex-col md:flex-row justify-between items-center gap-6 relative overflow-hidden transition-[border-color] duration-300 hover:border-white/12 shadow-lg select-none">
      {/* Subtle gradient glow in background */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-white/[0.02] rounded-full blur-[80px] pointer-events-none" />
      
      <div className="flex flex-col gap-2 text-left max-w-2xl">
        <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold tracking-tight text-white leading-tight font-sans text-balance">
          Let's work <span className="font-serif italic font-medium text-neutral-200">together!</span>
        </h2>
        <p className="text-xs md:text-sm text-neutral-400 font-medium leading-relaxed text-pretty">
          Have an idea, or really just need stuff done? <span className="font-serif italic text-gray-300">Drop us a note!</span>
        </p>
      </div>

      <div 
        className="flex items-center gap-3 bg-white/[0.04] hover:bg-white/[0.08] border border-white/5 rounded-full px-6 py-3.5 cursor-pointer select-all shrink-0 hover:scale-[1.01] active:scale-[0.96] transition-[background-color,border-color,transform] duration-200"
        onClick={() => {
          navigator.clipboard.writeText("hello@noteworthy.studio");
          triggerToast("Email copied to clipboard!");
        }}
      >
        <span className="text-base md:text-xl font-bold text-white tracking-tight">hello@noteworthy.studio</span>
        <button className="text-gray-400 hover:text-white transition-colors cursor-pointer p-0.5 rounded">
          <svg className="w-4.5 h-4.5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 7.5V6.108c0-1.135.845-2.098 1.976-2.192.373-.03.748-.057 1.123-.08M15.75 18H18a2.25 2.25 0 0 0 2.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 0 0-1.123-.08M15.75 18.75v-1.875a3.375 3.375 0 0 0-3.375-3.375h-1.5a1.125 1.125 0 0 1-1.125-1.125v-1.5A3.375 3.375 0 0 0 6.375 7.5H5.25m11.9-3.664A2.251 2.251 0 0 0 15 2.25h-1.5a2.251 2.251 0 0 0-2.15 1.586m5.8 0c.065.21.1.433.1.664v.75h-6V4.5c0-.231.035-.454.1-.664M6.75 7.5H4.875c-.621 0-1.125.504-1.125 1.125v12c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V16.5a9 9 0 0 0-9-9Z" />
          </svg>
        </button>
      </div>
    </div>
  );
}

export function StayInLoop({ triggerToast }: SectionProps) {
  const containerRef = useRef<HTMLElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["0 1", "0.7 1"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 30,
    restDelta: 0.001
  });

  const width = useTransform(springProgress, [0, 1], ["0px", "400px"]);
  const opacity = useTransform(springProgress, [0, 1], [0, 1]);

  return (
    <aside ref={containerRef} className="w-full bg-[#f8f9fa] border-y border-[#e9ecef] py-12 md:py-16 px-6 relative z-10 flex flex-col gap-8 justify-center items-center select-none">
      <h1 className="mx-auto font-bold text-2xl md:text-4xl lg:text-5xl leading-[1.1] text-black text-center text-balance">
        Stay in the <span className="font-serif italic font-medium tracking-tight">loop!</span>
      </h1>
      <div className="flex justify-center w-full">
        <form 
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            const input = form.querySelector('input[type="email"]') as HTMLInputElement;
            if (input && input.value.trim()) {
              triggerToast(`Subscribed successfully with ${input.value.trim()}`);
              input.value = "";
            }
          }}
          className="p-1.5 bg-[#f0eeed] flex flex-row items-center rounded-[2rem] focus-within:ring-2 focus-within:ring-black/20 transition-shadow pointer-events-auto shadow-sm overflow-hidden"
        >
          <label htmlFor="bd-email" className="sr-only">Enter your email</label>
          <motion.div 
            className="flex items-center overflow-hidden max-w-[60vw]"
            style={{ width, opacity }}
          >
            <input
              required
              type="email"
              id="bd-email"
              placeholder="you@example.com"
              className="w-[60vw] md:w-[400px] bg-transparent px-5 h-12 outline-none placeholder:text-stone-400 text-base font-semibold pointer-events-auto text-black"
              name="email"
            />
          </motion.div>
          <input
            type="submit"
            className="flex-none px-6 md:px-8 h-12 bg-black text-white rounded-full font-bold text-base transition-transform hover:bg-stone-800 active:scale-[0.96] pointer-events-auto cursor-pointer shadow-md shrink-0"
            value="Subscribe"
          />
        </form>
      </div>
    </aside>
  );
}

interface CallToActionAndLoopProps {
  triggerToast: (msg: string) => void;
  maxWidthClass?: string;
}

export function CallToActionAndLoop({ triggerToast }: CallToActionAndLoopProps) {
  return (
    <div className="w-full flex flex-col select-none relative z-10 bg-white">
      <WorkTogether triggerToast={triggerToast} />
      <StayInLoop triggerToast={triggerToast} />
    </div>
  );
}
