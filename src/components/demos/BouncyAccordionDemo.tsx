"use client";

import React from "react";
import BouncyAccordion from "../oxygen-ui/BouncyAccordion";

export function BouncyAccordionDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-card rounded-3xl border border-border text-foreground flex flex-col">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-border w-full">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold font-decorative tracking-tight">Bouncy Accordion</h2>
            <span className="bg-sky-500/10 text-sky-500 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">New</span>
          </div>
          <p className="text-muted-foreground text-xs mt-1.5 font-light max-w-xl">
            A beautiful accordion layout with spring physics, soft blur overlays, and dynamic morphing border-radius coordinates.
          </p>
        </div>
        <div className="flex gap-2.5 mt-4 md:mt-0 text-xs font-mono text-muted-foreground/60">
          <span>framer-motion</span> / <span>spring-morph</span>
        </div>
      </div>

      {/* Accordion Container */}
      <div className="flex-1 py-10 flex items-center justify-center">
        <BouncyAccordion />
      </div>
    </div>
  );
}

export default BouncyAccordionDemo;
