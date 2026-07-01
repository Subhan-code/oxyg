"use client";

import { FlipButton } from "../ui/flip-button";

export default function FlipButtonDemo() {
  return (
    <div className="flex items-center justify-center p-8 bg-[#fafafa] rounded-2xl border border-neutral-100">
      <FlipButton frontText="Hover to Reveal" backText="Unlock Premium Access!" />
    </div>
  );
}
