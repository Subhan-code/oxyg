import React from 'react';
import ImageRevealList from '../oxygen-ui/image-reveal-list';

export function ImageRevealListDemo() {
  const items = [
    {
      id: "1",
      title: "Design System",
      subtitle: "UI/UX Design",
      image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=600",
      number: "01",
    },
    {
      id: "2",
      title: "Interactive Components",
      subtitle: "Development",
      image: "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=80&w=600",
      number: "02",
    },
    {
      id: "3",
      title: "Dynamic Canvas Effects",
      subtitle: "WebGL & Shaders",
      image: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&q=80&w=600",
      number: "03",
    }
  ];

  return (
    <div className="w-full min-h-[400px] flex items-center justify-center bg-neutral-50 dark:bg-neutral-950 p-8 rounded-3xl border border-border">
      <ImageRevealList items={items} />
    </div>
  );
}

export default ImageRevealListDemo;
