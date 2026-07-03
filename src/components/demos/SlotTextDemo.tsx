import React, { useState, useEffect } from 'react';
import { SlotText } from 'slot-text/react';
import 'slot-text/style.css';
import { Copy, Check, Terminal, Play, Settings, RefreshCw, Layers } from 'lucide-react';

export function SlotTextDemo() {
  const [copied, setCopied] = useState(false);
  const [statusIdx, setStatusIdx] = useState(0);
  const [count, setCount] = useState(22019);

  const statuses = ["Idle", "Deploying", "Active", "Success", "Failed"];

  useEffect(() => {
    const interval = setInterval(() => {
      setStatusIdx((prev) => (prev + 1) % statuses.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCount((prev) => prev + Math.floor(Math.random() * 12) - 6);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = () => {
    setCopied(true);
    navigator.clipboard.writeText("npm i slot-text");
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 bg-card rounded-3xl border border-border text-foreground">
      
      {/* Header Info */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center pb-6 border-b border-border">
        <div>
          <div className="flex items-center gap-3">
            <h2 className="text-2xl font-bold font-decorative tracking-tight">slot-text</h2>
            <span className="bg-muted text-muted-foreground text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">v0.2.2</span>
            <span className="bg-sky-500/10 text-sky-500 text-xs px-2.5 py-0.5 rounded-full font-mono font-bold">lab</span>
          </div>
          <p className="text-muted-foreground text-xs mt-1.5 font-light max-w-xl">
            Text roll animation for tiny, tactile UI labels. Dependency-free, pure CSS transforms.
          </p>
        </div>
        <div className="flex gap-2.5 mt-4 md:mt-0 text-xs font-mono text-muted-foreground/60">
          <span>lab</span> / <span>npm</span> / <span>vanilla · react · vue</span>
        </div>
      </div>

      {/* Live Interactive Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        
        {/* Card 1: Copy Button */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-muted-foreground/60 text-[9px] font-mono uppercase tracking-widest block mb-2">Button Demo</span>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Tactile label flip on button click states.
            </p>
          </div>
          <button
            onClick={handleCopy}
            className={`flex items-center gap-2 h-10 px-4 rounded-xl font-medium text-xs border transition-all duration-300 w-full justify-center select-none cursor-pointer ${
              copied
                ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-600 dark:text-emerald-400"
                : "bg-primary text-primary-foreground hover:opacity-90 border-transparent shadow-sm"
            }`}
          >
            {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
            <span className="font-semibold tracking-wide">
              <SlotText text={copied ? "Copied" : "Copy"} />
            </span>
          </button>
        </div>

        {/* Card 2: Status Indicator */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-muted-foreground/60 text-[9px] font-mono uppercase tracking-widest block mb-2">Status Demo</span>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Roll transition on real-time state changes.
            </p>
          </div>
          <div className="flex items-center justify-between border border-border bg-card rounded-xl p-3 w-full">
            <span className="text-[10px] text-muted-foreground font-mono">status</span>
            <span className="font-semibold font-mono text-xs tracking-wider flex items-center gap-2 text-sky-500">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-sky-500"></span>
              </span>
              <SlotText text={statuses[statusIdx]} />
            </span>
          </div>
        </div>

        {/* Card 3: Metrics Counter */}
        <div className="bg-surface border border-border rounded-2xl p-5 flex flex-col justify-between min-h-[160px]">
          <div>
            <span className="text-muted-foreground/60 text-[9px] font-mono uppercase tracking-widest block mb-2">Metrics Demo</span>
            <p className="text-xs text-muted-foreground font-light leading-relaxed">
              Springy counter ticks for stats screens.
            </p>
          </div>
          <div className="flex items-center justify-between border border-border bg-card rounded-xl p-3 w-full">
            <span className="text-[10px] text-muted-foreground font-mono">req/s</span>
            <span className="font-bold font-mono text-xs tracking-wide text-foreground">
              <SlotText text={count.toLocaleString()} />
            </span>
          </div>
        </div>

      </div>

      {/* Code Blocks */}
      <div className="pt-4 border-t border-border space-y-4">
        
        {/* Terminal Installation */}
        <div>
          <span className="text-muted-foreground/60 text-[9px] font-mono uppercase tracking-widest block mb-2">Installation</span>
          <div className="flex items-center justify-between border border-border bg-surface rounded-xl p-3.5 font-mono text-xs">
            <div className="flex items-center gap-2.5 text-muted-foreground">
              <Terminal className="size-3.5 text-sky-500" />
              <span>npm i slot-text</span>
            </div>
            <button
              onClick={handleCopy}
              className="p-1.5 rounded-lg bg-card border border-border text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
            >
              {copied ? <Check className="size-3.5 text-emerald-500" /> : <Copy className="size-3.5" />}
            </button>
          </div>
        </div>

        {/* Code Usage Tabs */}
        <div className="space-y-3">
          <span className="text-muted-foreground/60 text-[9px] font-mono uppercase tracking-widest block">Usage</span>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            
            {/* React Code */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-muted-foreground/75 border-b border-border pb-1">React</div>
              <pre className="text-[10px] font-mono bg-surface border border-border rounded-xl p-3 text-muted-foreground overflow-x-auto leading-relaxed">
{`import { SlotText } from "slot-text/react";
import "slot-text/style.css";

<SlotText text={copied ? "Copied" : "Copy"} />`}
              </pre>
            </div>

            {/* Vue Code */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-muted-foreground/75 border-b border-border pb-1">Vue</div>
              <pre className="text-[10px] font-mono bg-surface border border-border rounded-xl p-3 text-muted-foreground overflow-x-auto leading-relaxed">
{`import { SlotText } from "slot-text/vue";
import "slot-text/style.css";

<SlotText :text="copied ? 'Copied' : 'Copy'" />`}
              </pre>
            </div>

            {/* Vanilla JS Code */}
            <div className="space-y-2">
              <div className="text-[10px] font-mono font-bold text-muted-foreground/75 border-b border-border pb-1">Vanilla</div>
              <pre className="text-[10px] font-mono bg-surface border border-border rounded-xl p-3 text-muted-foreground overflow-x-auto leading-relaxed">
{`import { slotText } from "slot-text";
import "slot-text/style.css";

const label = slotText(el, "Copy");
label.set("Copied");`}
              </pre>
            </div>

          </div>
        </div>

      </div>

    </div>
  );
}

export default SlotTextDemo;
