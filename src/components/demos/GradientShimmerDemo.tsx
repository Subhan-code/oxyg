import { useState } from "react";
import { GradientShimmer, gradientPresets, type GradientPresetName, type EasingPreset } from "gradient-shimmer";

const PRESET_NAMES = Object.keys(gradientPresets) as GradientPresetName[];

function swatchGradient(name: GradientPresetName) {
  const stops = [...gradientPresets[name]].sort((a, b) => a.position - b.position);
  return `linear-gradient(180deg, ${stops.map((s) => `${s.color} ${Math.round(s.position * 100)}%`).join(", ")})`;
}

const SAMPLE_TEXTS = [
  "Build faster with premium components.",
  "memory-research",
  "gradient-shimmer",
  "500+ crafted UI elements.",
  "Design. Code. Ship.",
];

export function GradientShimmerDemo() {
  const [preset, setPreset] = useState<GradientPresetName>("sunrise");
  const [easing, setEasing] = useState<EasingPreset>("smooth");
  const [duration, setDuration] = useState(1.45);
  const [spread, setSpread] = useState(3);
  const [pauseBetween, setPauseBetween] = useState(700);
  const [textIdx, setTextIdx] = useState(0);

  const text = SAMPLE_TEXTS[textIdx];

  return (
    <div className="w-full h-[620px] bg-[#141414] flex flex-col items-center justify-start p-6 overflow-y-auto no-scrollbar rounded-3xl">
      <div className="w-full max-w-[480px] flex flex-col gap-6">

        {/* Hero Preview */}
        <div className="flex flex-col items-center gap-3 py-12 px-6 rounded-3xl bg-[#1a1a1a] border border-white/[0.06]">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">gradient-shimmer</p>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-center leading-tight">
            <GradientShimmer
              gradient={preset}
              easing={easing}
              duration={duration}
              spread={spread}
              pauseBetween={pauseBetween}
              pauseOnScroll={false}
              baseColor="white"
            >
              {text}
            </GradientShimmer>
          </h1>

          {/* Cycle text button */}
          <button
            onClick={() => setTextIdx((i) => (i + 1) % SAMPLE_TEXTS.length)}
            className="mt-2 text-xs text-neutral-500 hover:text-neutral-300 transition-colors border border-white/10 rounded-full px-3 py-1 hover:border-white/20"
          >
            cycle text ↻
          </button>
        </div>

        {/* Gradient Swatches */}
        <div className="rounded-2xl bg-[#1a1a1a] border border-white/[0.06] p-5 flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">Preset</p>
          <div className="flex flex-wrap gap-3">
            {PRESET_NAMES.map((name) => (
              <button
                key={name}
                onClick={() => setPreset(name)}
                className="flex flex-col items-center gap-1.5 group"
                title={name}
              >
                <span
                  className="block w-9 h-9 rounded-full transition-all duration-200"
                  style={{
                    backgroundImage: swatchGradient(name),
                    boxShadow:
                      preset === name
                        ? "0 0 0 2px #141414, 0 0 0 3.5px white"
                        : "0 0 0 1px rgba(255,255,255,0.1)",
                    transform: preset === name ? "scale(1.12)" : "scale(1)",
                  }}
                />
                <span
                  className="text-[10px] font-medium transition-colors"
                  style={{ color: preset === name ? "white" : "rgb(115,115,115)" }}
                >
                  {name}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Controls */}
        <div className="rounded-2xl bg-[#1a1a1a] border border-white/[0.06] p-5 flex flex-col gap-5">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">Controls</p>

          {/* Easing segmented control */}
          <div className="flex items-center justify-between gap-4">
            <span className="text-sm text-neutral-400 shrink-0">Easing</span>
            <div className="flex bg-black/40 rounded-xl p-0.5 gap-0.5">
              {(["smooth", "gentle", "snappy"] as EasingPreset[]).map((e) => (
                <button
                  key={e}
                  onClick={() => setEasing(e)}
                  className="px-3 py-1.5 rounded-[10px] text-xs font-medium transition-all duration-200"
                  style={{
                    background: easing === e ? "rgba(255,255,255,0.1)" : "transparent",
                    color: easing === e ? "white" : "rgb(115,115,115)",
                  }}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          {/* Sliders */}
          {[
            { label: "Speed", value: duration, min: 0.5, max: 6, step: 0.05, set: setDuration, fmt: (v: number) => `${v.toFixed(2)}s` },
            { label: "Spread", value: spread, min: 1, max: 8, step: 0.5, set: setSpread, fmt: (v: number) => `${v}px/char` },
            { label: "Pause", value: pauseBetween, min: 0, max: 3000, step: 50, set: setPauseBetween, fmt: (v: number) => `${Math.round(v)}ms` },
          ].map(({ label, value, min, max, step, set, fmt }) => (
            <label key={label} className="flex flex-col gap-2">
              <div className="flex justify-between text-sm">
                <span className="text-neutral-400">{label}</span>
                <span className="text-neutral-500 tabular-nums">{fmt(value)}</span>
              </div>
              <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => set(Number(e.target.value))}
                className="w-full accent-white h-1 rounded-full cursor-pointer"
                style={{ accentColor: "white" }}
              />
            </label>
          ))}
        </div>

        {/* In-context preview — like a Slack sidebar */}
        <div className="rounded-2xl bg-[#1a1a1a] border border-white/[0.06] p-5 flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">In context</p>
          <div className="bg-[#111] rounded-2xl border border-white/[0.05] p-2 flex flex-col gap-0.5">
            {["general", "design-sync", "release-notes"].map((ch, i) => (
              <div
                key={ch}
                className={`flex items-center gap-2 px-3 py-2 rounded-xl ${i === 1 ? "bg-white/[0.06]" : ""}`}
              >
                <span className="text-neutral-500 font-medium text-sm">#</span>
                <span className="text-sm font-medium">
                  {i === 1 ? (
                    <GradientShimmer
                      gradient={preset}
                      easing={easing}
                      duration={duration}
                      spread={spread}
                      pauseBetween={pauseBetween}
                      pauseOnScroll={false}
                      baseColor="white"
                    >
                      {text.slice(0, 28)}
                    </GradientShimmer>
                  ) : (
                    <span className="text-neutral-500">{ch}</span>
                  )}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Props reference */}
        <div className="rounded-2xl bg-[#1a1a1a] border border-white/[0.06] p-5 flex flex-col gap-3">
          <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500">Usage</p>
          <pre className="text-xs text-neutral-400 bg-black/40 rounded-xl p-4 overflow-x-auto leading-relaxed font-mono">
{`import { GradientShimmer } from "gradient-shimmer"

<GradientShimmer
  gradient="${preset}"
  easing="${easing}"
  duration={${duration.toFixed(2)}}
  spread={${spread}}
  pauseBetween={${pauseBetween}}
>
  ${text.slice(0, 30)}
</GradientShimmer>`}
          </pre>
        </div>
      </div>
    </div>
  );
}
