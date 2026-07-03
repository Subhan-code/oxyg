import React from 'react';
import { ImageGallery } from '../oxygen-ui/image-gallery';

export function ImageGalleryDemo() {
  return (
    <div className="w-full h-[70vh] rounded-3xl border border-border overflow-y-auto bg-background p-6" style={{ scrollbarWidth: "none" }}>
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground text-center mb-6">
        Masonry Style Image Gallery (Lazy-Loaded)
      </p>
      <ImageGallery />
    </div>
  );
}

export default ImageGalleryDemo;
