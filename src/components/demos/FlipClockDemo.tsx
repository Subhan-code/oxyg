import { useEffect, useState } from "react";
import { FlipClock } from "../oxygen-ui/flip-clock";

export function FlipClockDemo() {
  const [targetDate, setTargetDate] = useState<Date | undefined>(undefined);

  useEffect(() => {
    // 3 days from now
    setTargetDate(new Date(Date.now() + 1000 * 60 * 60 * 24 * 3));
  }, []);

  return (
    <div className="w-full max-w-2xl mx-auto space-y-10 p-6">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Live clock — default (md)
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-8 flex items-center justify-center min-h-[120px]">
          <FlipClock />
        </div>
      </div>

      {targetDate && (
        <>
          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Countdown — md, default variant
            </p>
            <div className="rounded-2xl border border-border bg-surface/50 p-8 flex items-center justify-center min-h-[120px]">
              <FlipClock countdown targetDate={targetDate} />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Countdown — sm, outline + days always shown
            </p>
            <div className="rounded-2xl border border-border bg-surface/50 p-8 flex items-center justify-center min-h-[100px]">
              <FlipClock size="sm" variant="outline" countdown targetDate={targetDate} showDays="always" />
            </div>
          </div>

          <div className="space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
              Countdown — sm, muted variant
            </p>
            <div className="rounded-2xl border border-border bg-surface/50 p-8 flex items-center justify-center min-h-[100px]">
              <FlipClock size="sm" variant="muted" countdown targetDate={targetDate} />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default FlipClockDemo;
