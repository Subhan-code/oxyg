"use client";

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
    body: "\"Our productivity has nearly doubled since onboarding. Automation features removed repetitive tasks, allowing our team to focus on building instead of managing operations.\"",
    profile: "https://images.shadcnspace.com/assets/profiles/rough.webp",
  },
  {
    name: "Kira Athrun",
    username: "@kathrun",
    body: "\"What surprised us most was how quickly our team adapted. Minimal learning curve, excellent documentation, and powerful features make it a must-have for modern SaaS companies.\"",
    profile: "https://images.shadcnspace.com/assets/profiles/albert.webp",
  },
  {
    name: "Lirael Nassun",
    username: "@lnassun",
    body: "\"This is easily one of the most reliable UI tools we've adopted. The components are intuitive, integrations are seamless, and it saves us countless hours every week.\"",
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
    body: "\"We evaluated multiple solutions, but this stood out immediately. It's fast, scalable, and thoughtfully designed for growing teams that need stability without added complexity.\"",
    profile: "https://images.shadcnspace.com/assets/profiles/jenny.webp",
  },
  {
    name: "Sam Torres",
    username: "@storres",
    body: "\"The motion design details really set this apart. Every interaction feels crafted and intentional. The developer experience is exceptional.\"",
  },
  {
    name: "Alex Renner",
    username: "@arenner",
    body: "\"Copy-paste components that actually look premium? Yes please. Saved us weeks of design-dev handoff friction.\"",
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
      <InternalMarquee pauseOnHover className={`[--duration:${duration}s]`}>
        {firstRow.map(t => <TestimonialCard key={t.username} {...t} />)}
      </InternalMarquee>
      <InternalMarquee reverse pauseOnHover className={`[--duration:${duration}s]`}>
        {secondRow.map(t => <TestimonialCard key={t.username} {...t} />)}
      </InternalMarquee>

      {/* Edge fades */}
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/4 bg-gradient-to-r from-background" />
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/4 bg-gradient-to-l from-background" />
    </div>
  );
}

export default TestimonialMarquee;


