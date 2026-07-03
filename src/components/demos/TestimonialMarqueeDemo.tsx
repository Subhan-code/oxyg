import { TestimonialMarquee } from "../oxygen-ui/testimonial-marquee";

export function TestimonialMarqueeDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-4">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Dual-row — hover to pause
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 py-8 min-h-[280px] flex flex-col items-center justify-center overflow-hidden">
          <TestimonialMarquee />
        </div>
      </div>
    </div>
  );
}

export default TestimonialMarqueeDemo;
