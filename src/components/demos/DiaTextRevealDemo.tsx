import React, { useState } from 'react';
import DiaTextReveal from '../oxygen-ui/DiaTextReveal';
import { RefreshCw, Palette, Settings } from 'lucide-react';

// Refined presets — editorial, not "AI neon"
const COLOR_PRESETS = [
  {
    name: "Violet",
    colors: ["#a78bfa", "#8b5cf6", "#7c3aed"]
  },
  {
    name: "Ember",
    colors: ["#fb923c", "#f97316", "#ea580c"]
  },
  {
    name: "Rose",
    colors: ["#fb7185", "#f43f5e", "#ec4899"]
  },
  {
    name: "Slate",
    colors: ["#94a3b8", "#cbd5e1", "#f1f5f9"]
  }
];

export function DiaTextRevealDemo() {
  const [phrases, setPhrases] = useState(["build faster", "ship smarter", "scale easier"]);
  const [duration, setDuration] = useState(1.6);
  const [delay, setDelay] = useState(0.2);
  const [repeatDelay, setRepeatDelay] = useState(1.8);
  const [presetIndex, setPresetIndex] = useState(0);
  const [textInput, setTextInput] = useState("build faster, ship smarter, scale easier");
  const [key, setKey] = useState(0);

  const handleUpdatePhrases = () => {
    const list = textInput.split(",").map(s => s.trim()).filter(Boolean);
    if (list.length > 0) {
      setPhrases(list);
      setKey(k => k + 1);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-6 bg-card rounded-3xl border border-border">
      {/* Visual Showcase Card */}
      <div className="relative overflow-hidden flex flex-col justify-center items-center h-[260px] bg-surface rounded-2xl border border-border">
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff08_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none" />
        <div className="text-center space-y-2 z-10">
          <span className="text-[10px] font-semibold text-muted-foreground uppercase tracking-[0.2em] block mb-4">
            Interactive Demo
          </span>
          <h2 className="text-3xl md:text-5xl font-semibold tracking-tight text-foreground flex items-center justify-center gap-2 flex-wrap">
            <span>We want to</span>
            <DiaTextReveal
              key={key}
              text={phrases}
              colors={COLOR_PRESETS[presetIndex].colors}
              duration={duration}
              delay={delay}
              repeatDelay={repeatDelay}
              repeat
              startOnView={false}
              className="text-3xl md:text-5xl font-semibold tracking-tight"
            />
          </h2>
        </div>
      </div>

      {/* Control Panel */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-border">
        {/* Settings */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-foreground flex items-center gap-2 uppercase tracking-widest">
            <Settings className="size-3.5 text-muted-foreground" />
            Animation Settings
          </h3>

          <div className="space-y-4">
            {[
              { label: "Sweep Duration", value: duration, set: setDuration, min: 0.5, max: 3, step: 0.1, unit: "s" },
              { label: "Start Delay", value: delay, set: setDelay, min: 0, max: 1.5, step: 0.1, unit: "s" },
              { label: "Pause Between Words", value: repeatDelay, set: setRepeatDelay, min: 0.5, max: 4, step: 0.1, unit: "s" },
            ].map(({ label, value, set, min, max, step, unit }) => (
              <div key={label}>
                <label className="flex justify-between text-xs text-muted-foreground mb-1.5">
                  <span>{label}</span>
                  <span className="font-mono text-foreground">{value}{unit}</span>
                </label>
                <input
                  type="range"
                  min={min}
                  max={max}
                  step={step}
                  value={value}
                  onChange={(e) => set(parseFloat(e.target.value))}
                  className="w-full h-[3px] bg-border rounded-full appearance-none cursor-pointer accent-foreground"
                />
              </div>
            ))}
          </div>
        </div>

        {/* Presets + Custom */}
        <div className="space-y-4">
          <h3 className="text-xs font-semibold text-foreground flex items-center gap-2 uppercase tracking-widest">
            <Palette className="size-3.5 text-muted-foreground" />
            Content &amp; Presets
          </h3>

          <div className="space-y-4">
            <div>
              <span className="text-xs text-muted-foreground block mb-2">Gradient Preset</span>
              <div className="flex flex-wrap gap-2">
                {COLOR_PRESETS.map((preset, idx) => (
                  <button
                    key={idx}
                    onClick={() => setPresetIndex(idx)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-150 border cursor-pointer ${
                      presetIndex === idx
                        ? "bg-foreground text-background border-foreground"
                        : "bg-transparent text-muted-foreground border-border hover:border-foreground/40 hover:text-foreground"
                    }`}
                  >
                    <span
                      className="inline-block w-1.5 h-1.5 rounded-full mr-1.5 align-middle"
                      style={{ background: preset.colors[0] }}
                    />
                    {preset.name}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <span className="text-xs text-muted-foreground block mb-1.5">Custom Words (comma separated)</span>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={textInput}
                  onChange={(e) => setTextInput(e.target.value)}
                  className="flex-1 px-3 py-1.5 bg-surface border border-border rounded-lg text-xs outline-none text-foreground placeholder:text-muted-foreground focus:border-ring transition-colors font-mono"
                />
                <button
                  onClick={handleUpdatePhrases}
                  className="px-3 py-1.5 bg-foreground text-background text-xs font-medium rounded-lg flex items-center gap-1.5 cursor-pointer hover:opacity-80 transition-opacity"
                >
                  <RefreshCw className="size-3" />
                  Apply
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DiaTextRevealDemo;

export function DiaTextRevealDemo2() {
  return (
    <div className="w-full max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-3 p-4">

      {/* ── 1: Editorial — clean violet sweep on surface ── */}
      <div className="flex flex-col items-start justify-end rounded-2xl bg-surface border border-border px-8 py-10 min-h-[220px]">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Editorial
        </span>
        <DiaTextReveal
          text="Design systems"
          colors={["#a78bfa", "#c4b5fd", "#ede9fe"]}
          textColor="var(--foreground)"
          className="text-5xl font-semibold tracking-tight"
          duration={2}
          startOnView={false}
        />
        <p className="mt-3 text-sm text-muted-foreground">Single sweep · violet palette</p>
      </div>

      {/* ── 2: Inline sentence, rotating words ── */}
      <div className="flex flex-col items-start justify-end rounded-2xl bg-card border border-border px-8 py-10 min-h-[220px]">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Inline · Rotating
        </span>
        <h2 className="text-3xl font-semibold text-foreground leading-snug">
          We help you{" "}
          <DiaTextReveal
            repeat
            repeatDelay={1.2}
            text={["build faster", "ship smarter", "scale easier"]}
            colors={["#fb923c", "#f97316", "#fbbf24"]}
            className="text-3xl font-semibold"
            startOnView={false}
          />
        </h2>
        <p className="mt-3 text-sm text-muted-foreground">Rotating words · ember tones</p>
      </div>

      {/* ── 3: Display — large rose sweep ── */}
      <div className="flex flex-col items-start justify-end rounded-2xl bg-surface border border-border px-8 py-10 min-h-[220px]">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Display
        </span>
        <DiaTextReveal
          text="Move fast."
          colors={["#fb7185", "#f43f5e", "#ec4899"]}
          textColor="var(--foreground)"
          className="text-6xl font-bold tracking-tighter"
          duration={1.6}
          startOnView={false}
        />
        <p className="mt-3 text-sm text-muted-foreground">Large display · rose accent</p>
      </div>

      {/* ── 4: Monospace — stack cycling, fixed width ── */}
      <div className="flex flex-col items-start justify-end rounded-2xl bg-card border border-border px-8 py-10 min-h-[220px]">
        <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-muted-foreground mb-6">
          Monospace · Fixed Width
        </span>
        <div className="flex items-center gap-2 text-muted-foreground text-2xl font-mono">
          <span>/</span>
          <DiaTextReveal
            repeat
            repeatDelay={0.8}
            fixedWidth
            text={["Next.js", "React", "TypeScript", "Tailwind"]}
            colors={["#94a3b8", "#cbd5e1", "#f1f5f9"]}
            textColor="var(--foreground)"
            className="text-2xl font-mono font-semibold"
            duration={1.2}
            startOnView={false}
          />
        </div>
        <p className="mt-3 text-sm text-muted-foreground">Tech stack · slate sweep · no layout shift</p>
      </div>

    </div>
  );
}
