import React, { useRef } from 'react';
import { FloatingNavbar } from '../oxygen-ui/floating-navbar';

const LINKS = [
  { label: "About", href: "#" },
  {
    label: "Products",
    href: "#",
    children: [
      {
        label: "Analytics",
        href: "#",
        description: "Understand your data.",
      },
      {
        label: "Automation",
        href: "#",
        description: "Streamline workflows.",
      },
    ],
  },
  { label: "Pricing", href: "#" },
];

export default function FloatingNavbarDemo() {
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <div ref={scrollRef} className="w-full h-full bg-background text-foreground relative overflow-y-auto no-scrollbar rounded-xl border border-border">
      <div className="min-h-[250vh] flex flex-col relative w-full pt-4">
        <FloatingNavbar
          containerRef={scrollRef}
          logo={<div className="font-bold text-lg tracking-tight ml-2">Acme Inc.</div>}
          links={LINKS}
          cta={{ label: "Get started", href: "#" }}
        />
        
        <div className="pt-48 px-8 max-w-2xl mx-auto text-center space-y-6">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tighter">
            Scroll down to see the magic
          </h1>
          <p className="text-xl text-muted-foreground">
            The CTA button slides in when you scroll past 80px.
            Scroll quickly up and down to see the spring physics nudge the navbar.
          </p>
        </div>

        <div className="flex-1 w-full flex items-center justify-center text-5xl font-medium opacity-10 pointer-events-none pb-40">
          ↕ Scroll
        </div>
      </div>
    </div>
  );
}
