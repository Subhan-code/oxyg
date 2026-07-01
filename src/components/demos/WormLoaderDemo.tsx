"use client";

import * as React from "react";
import { WormLoader } from "../ui/worm-loader";

export default function WormLoaderDemo() {
  return (
    <div className="flex items-center justify-center transition-colors">
      <div className="rounded-xl bg-white dark:bg-gray-800 border p-8 shadow-sm">
        <WormLoader />
      </div>
    </div>
  ); 
}
