"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

interface AccordionItem {
  id: string;
  title: string;
  content: string;
}

const ACCORDIONS: AccordionItem[] = [
  {
    id: "1",
    title: "How does CSS grid-template-rows height animation work?",
    content: "Normally, transitioning height between 0 and auto doesn't work in CSS. By using CSS Grid with grid-template-rows: 0fr to 1fr, the layout engine transitions the fraction unit smoothly, giving a fully responsive, JS-free height transition.",
  },
  {
    id: "2",
    title: "Why flip the chevron using scaleY(-1)?",
    content: "Framer Motion or GSAP path morphing is heavy and requires external libraries. Using CSS scaleY(-1) origin-center transforms the chevron instantly and cleanly in all modern browsers without calculating SVG vectors.",
  },
  {
    id: "3",
    title: "What are the benefits of no-JS height transitions?",
    content: "No layouts shifts, no reflow checks, no ResizeObserver bindings, and zero scripting cost. The container is completely liquid and recalibrates height automatically when the viewport resizes.",
  },
];

export default function AccordionExpand() {
  const [openId, setOpenId] = useState<string | null>("1");

  const toggleOpen = (id: string) => {
    setOpenId(openId === id ? null : id);
  };

  return (
    <div className="w-full max-w-[360px] mx-auto p-6 bg-[#0d0e12] rounded-3xl border border-white/5 flex flex-col gap-4 text-white shadow-2xl select-none">
      <div className="flex flex-col gap-1.5">
        <span className="text-[10px] font-black text-indigo-400 uppercase tracking-wider">Transitions.dev</span>
        <h3 className="text-lg font-bold text-white tracking-tight">Accordion Grid Expand</h3>
      </div>

      <div className="flex flex-col gap-2 bg-neutral-950/60 rounded-2xl border border-white/5 p-4">
        {ACCORDIONS.map((item) => {
          const isOpen = openId === item.id;
          return (
            <div 
              key={item.id}
              className="t-acc border-b border-white/5 last:border-b-0 pb-2 last:pb-0"
              data-open={isOpen ? "true" : "false"}
            >
              <button
                onClick={() => toggleOpen(item.id)}
                className="t-acc-head w-full py-3 flex items-center justify-between text-left font-bold text-xs md:text-sm text-neutral-200 hover:text-white transition-colors cursor-pointer select-none"
                aria-expanded={isOpen}
              >
                <span>{item.title}</span>
                <span className="t-acc-chevron text-neutral-500 shrink-0 ml-4">
                  <ChevronDown className="w-4 h-4" />
                </span>
              </button>
              
              <div className="t-acc-panel">
                <div className="t-acc-panel-inner">
                  <p className="text-xs text-neutral-400 font-medium leading-relaxed pb-4 pt-1 select-none">
                    {item.content}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
