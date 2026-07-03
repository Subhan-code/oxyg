import { OrbitalSpinner } from "../oxygen-ui/orbital-spinner";

export function OrbitalSpinnerDemo() {
  return (
    <div className="w-full max-w-2xl mx-auto p-6 space-y-8">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Three sizes
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-10 flex items-end justify-center gap-16 min-h-[200px]">
          <div className="flex flex-col items-center gap-4">
            <OrbitalSpinner size="sm" />
            <span className="text-xs text-muted-foreground">sm</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <OrbitalSpinner size="md" />
            <span className="text-xs text-muted-foreground">md</span>
          </div>
          <div className="flex flex-col items-center gap-4">
            <OrbitalSpinner size="lg" />
            <span className="text-xs text-muted-foreground">lg</span>
          </div>
        </div>
      </div>

      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          Loading state examples
        </p>
        <div className="rounded-2xl border border-border bg-surface/50 p-8 flex flex-col gap-6 min-h-[160px]">
          {["Analyzing data", "Generating report", "Syncing workspace"].map(label => (
            <div key={label} className="flex items-center gap-4 text-sm text-foreground/80">
              <OrbitalSpinner size="sm" className="shrink-0" />
              <span>{label}…</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default OrbitalSpinnerDemo;
