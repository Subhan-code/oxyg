"use client";

import { ProgressiveFluxLoader } from "../ui/progressive-flux-loader";

export default function ProgressiveFluxLoaderDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-neutral-900 rounded-2xl border border-neutral-800">
      <ProgressiveFluxLoader duration={10} />
    </div>
  );
}
