import { ProgressiveBlur } from "../oxygen-ui/ProgressiveBlur";

const ITEMS = Array.from({ length: 20 }, (_, i) => ({
  id: i,
  label: `Component ${String(i + 1).padStart(2, "0")}`,
  sub: ["Animation", "Layout", "Input", "Display", "Overlay"][i % 5],
}));

export function ProgressiveBlurDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto space-y-8 p-4">

      {/* ── Demo 1: Bottom blur on a scroll list ── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Bottom — scroll list
        </p>
        <div className="relative w-full rounded-xl border border-border overflow-hidden">
          <div className="h-[340px] overflow-y-auto scrollbar-none">
            <div className="flex flex-col gap-2 p-4">
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface flex h-14 w-full items-center justify-between rounded-lg border border-border px-4"
                >
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
          <ProgressiveBlur position="bottom" height="35%" />
        </div>
      </div>

      {/* ── Demo 2: Both edges ── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Both edges
        </p>
        <div className="relative w-full rounded-xl border border-border overflow-hidden">
          <div className="h-[280px] overflow-y-auto scrollbar-none">
            <div className="flex flex-col gap-2 p-4">
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface flex h-14 w-full items-center justify-between rounded-lg border border-border px-4"
                >
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
          <ProgressiveBlur position="both" height="25%" />
        </div>
      </div>

      {/* ── Demo 3: Blur with CTA inside ── */}
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          With content inside blur zone
        </p>
        <div className="relative w-full rounded-xl border border-border overflow-hidden">
          <div className="h-[300px] overflow-y-auto scrollbar-none">
            <div className="flex flex-col gap-2 p-4">
              {ITEMS.map((item) => (
                <div
                  key={item.id}
                  className="bg-surface flex h-14 w-full items-center justify-between rounded-lg border border-border px-4"
                >
                  <span className="text-sm font-medium text-foreground">{item.label}</span>
                  <span className="text-xs text-muted-foreground">{item.sub}</span>
                </div>
              ))}
            </div>
          </div>
          <ProgressiveBlur position="bottom" height="40%">
            <button className="mb-2 px-5 py-2 bg-foreground text-background text-xs font-semibold rounded-full hover:opacity-80 transition-opacity cursor-pointer">
              View all components →
            </button>
          </ProgressiveBlur>
        </div>
      </div>

    </div>
  );
}

export default ProgressiveBlurDemo;
