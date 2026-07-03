import React from 'react';
import { AlbumStackGrid } from "../oxygen-ui/AlbumStackGrid";

export function AlbumStackGridDemo() {
  return (
    <div className="w-full max-w-4xl mx-auto p-6 space-y-8 min-h-[500px]">
      <div className="space-y-2 text-center md:text-left">
        <h2 className="text-2xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
          Album Collections
        </h2>
        <p className="text-sm text-muted-foreground max-w-xl">
          Hover over an album stack to see the custom micro-animation and 3D tilt effects. Click on a collection stack to trigger a spring layout transition into a grid view of all images.
        </p>
      </div>

      <div className="border border-border/50 rounded-2xl bg-zinc-50/50 dark:bg-zinc-950/20 p-8 flex items-center justify-center min-h-[400px]">
        <AlbumStackGrid />
      </div>
    </div>
  );
}

export default AlbumStackGridDemo;
