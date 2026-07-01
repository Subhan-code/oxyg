"use client";

import { BubbleText } from "../ui/bubble-text";

export default function BubbleTextDemo() {
  return (
    <div className="flex items-center justify-center p-10 bg-neutral-50 rounded-2xl border border-neutral-100 overflow-hidden">
      <BubbleText text="DRAG SCROLL REVEAL" />
    </div>
  );
}
