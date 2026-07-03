"use client";

import React from "react";
import * as Icons from "../oxygen-ui/MicroInteractionIcons";

const iconList = [
  { Component: Icons.AppIcon1, title: "Sidebar Switch", desc: "Toggles sidebar line state" },
  { Component: Icons.AppIcon2, title: "Code Expand", desc: "Hover paths split apart" },
  { Component: Icons.AppIcon3, title: "Tactile Lock", desc: "Toggles lock shackle rotation" },
  { Component: Icons.AppIcon4, title: "Exit Portal", desc: "Arrow exits/re-enters boundary" },
  { Component: Icons.AppIcon5, title: "Rotate Currency", desc: "Flips 360 degrees on press" },
  { Component: Icons.AppIcon6, title: "Paper Copy", desc: "Layers shift on hover" },
  { Component: Icons.AppIcon7, title: "Equalizer Bars", desc: "Heights bounce on play/hover" },
  { Component: Icons.AppIcon8, title: "Plus Minus Toggle", desc: "Rotates and transitions crossbar" },
  { Component: Icons.AppIcon9, title: "Sort Lines", desc: "Staggered width changes" },
  { Component: Icons.AppIcon10, title: "Chevron Double", desc: "Flips 180 degrees on press" },
  { Component: Icons.AppIcon11, title: "Alert Jitter", desc: "Shakes alert boundary" },
  { Component: Icons.AppIcon12, title: "Spinning Globe", desc: "Constant rotation, speed shifts" },
  { Component: Icons.AppIcon13, title: "Attach Clip", desc: "Path outlines on click" },
  { Component: Icons.AppIcon14, title: "Trash Lid Flip", desc: "Rotates lid off bucket base" },
  { Component: Icons.AppIcon15, title: "Fly Send Arrow", desc: "Paper plane shoots out on send" },
  { Component: Icons.AppIcon16, title: "LED Spinner", desc: "Tacit radial circular dots" },
  { Component: Icons.AppIcon17, title: "Bell Strike", desc: "Strikes and toggles strike line" },
];

export function MicroInteractionIconsDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 bg-card rounded-3xl border border-border text-foreground">
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold font-decorative tracking-tight">Micro-Interaction Icons</h2>
            <span className="bg-sky-500/10 text-sky-500 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">New</span>
          </div>
          <p className="text-muted-foreground text-xs mt-1.5 font-light max-w-xl">
            A premium pack of 17 micro-interaction buttons. Highly animated with smooth spring physical simulations on hover and press.
          </p>
        </div>
        <div className="flex gap-2.5 mt-4 md:mt-0 text-xs font-mono text-muted-foreground/60">
          <span>motion/react</span> / <span>tactile UI</span>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {iconList.map((item, idx) => {
          const IconComp = item.Component;
          return (
            <div key={idx} className="bg-surface border border-border hover:border-border/60 transition-all rounded-2xl p-4 flex flex-col items-center justify-between min-h-[140px] text-center group">
              <div className="flex items-center justify-center p-3.5 rounded-xl bg-card border border-border/40 text-foreground group-hover:scale-110 transition-transform duration-300">
                <IconComp />
              </div>
              <div className="mt-3">
                <span className="text-[10px] font-semibold block text-foreground/80">{item.title}</span>
                <span className="text-[8px] text-muted-foreground font-light leading-relaxed block mt-0.5">{item.desc}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default MicroInteractionIconsDemo;
