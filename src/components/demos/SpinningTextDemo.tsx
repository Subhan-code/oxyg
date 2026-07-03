import { SpinningText } from "../oxygen-ui/spinning-text";
import { Star, Zap, Heart } from "lucide-react";

export function SpinningTextDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-10">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Default — star center, reverse spin
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-10 flex items-center justify-center min-h-[260px]">
          <SpinningText
            text="INTERACTIVE 2026 DYNAMIC 2026 MODERN 2026 "
            radius={100}
            fontSize={12}
            speed={20}
            direction="reverse"
            className="text-primary font-medium"
          >
            <div className="size-16 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
              <Star size={32} className="fill-primary text-primary animate-pulse" />
            </div>
          </SpinningText>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Normal direction — Zap icon
          </p>
          <div className="rounded-2xl border border-border bg-surface/50 p-8 flex items-center justify-center min-h-[220px]">
            <SpinningText
              text="OXYGEN UI · COMPONENTS · "
              radius={70}
              fontSize={11}
              speed={12}
              direction="normal"
              className="text-foreground/70"
            >
              <div className="size-10 rounded-full bg-foreground/5 border border-foreground/10 flex items-center justify-center">
                <Zap size={20} className="text-amber-500 fill-amber-500" />
              </div>
            </SpinningText>
          </div>
        </div>

        <div className="space-y-3">
          <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            Fast reverse — Heart icon
          </p>
          <div className="rounded-2xl border border-border bg-surface/50 p-8 flex items-center justify-center min-h-[220px]">
            <SpinningText
              text="BUILT WITH LOVE · OXYGEN · "
              radius={70}
              fontSize={11}
              speed={8}
              direction="reverse"
              className="text-rose-500"
            >
              <div className="size-10 rounded-full bg-rose-500/10 border border-rose-500/20 flex items-center justify-center">
                <Heart size={20} className="text-rose-500 fill-rose-500" />
              </div>
            </SpinningText>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SpinningTextDemo;
