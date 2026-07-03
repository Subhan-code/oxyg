import React, { useState } from 'react';
import { AuraCardStack, CardItem } from '../oxygen-ui/aura-card-stack';
import { Sparkles, Layers, Image as ImageIcon } from 'lucide-react';

const NATURE_GALLERY: CardItem[] = [
  { id: 'n1', src: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=600&q=80", alt: "Golden Beach Sunset" },
  { id: 'n2', src: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=600&q=80", alt: "Foggy Mountain Forest" },
  { id: 'n3', src: "https://images.unsplash.com/photo-1500627869374-13cd993b1115?auto=format&fit=crop&w=600&q=80", alt: "Green Valley Fields" },
  { id: 'n4', src: "https://images.unsplash.com/photo-1447752875215-b2761acb3c5d?auto=format&fit=crop&w=600&q=80", alt: "Autumn Forest Trail" },
  { id: 'n5', src: "https://images.unsplash.com/photo-1472214222541-d510753a4707?auto=format&fit=crop&w=600&q=80", alt: "Wildflower Meadows" },
];

const CYBERPUNK_GALLERY: CardItem[] = [
  { id: 'c1', src: "https://images.unsplash.com/photo-1515621061946-eff1c2a352bd?auto=format&fit=crop&w=600&q=80", alt: "Neon Tokyo Night" },
  { id: 'c2', src: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=600&q=80", alt: "Cyberpunk Arcade Alley" },
  { id: 'c3', src: "https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=600&q=80", alt: "Cyber City Grid" },
  { id: 'c4', src: "https://images.unsplash.com/photo-1508739773434-c26b3d09e071?auto=format&fit=crop&w=600&q=80", alt: "Obsidian Highrise" },
  { id: 'c5', src: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80", alt: "Neon Grid Station" },
];

const ARCHITECTURE_GALLERY: CardItem[] = [
  { id: 'a1', src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=600&q=80", alt: "Minimalist Concrete Villa" },
  { id: 'a2', src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=600&q=80", alt: "Brutalist Modern Interior" },
  { id: 'a3', src: "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=600&q=80", alt: "Glass Spiral Staircase" },
  { id: 'a4', src: "https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?auto=format&fit=crop&w=600&q=80", alt: "Warm Wooden Balcony" },
  { id: 'a5', src: "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=600&q=80", alt: "Sunlit Concrete Corridor" },
];

export default function AuraCardStackDemo() {
  const [activeTab, setActiveTab] = useState<'nature' | 'cyberpunk' | 'architecture'>('nature');

  const getGallery = () => {
    switch (activeTab) {
      case 'nature': return NATURE_GALLERY;
      case 'cyberpunk': return CYBERPUNK_GALLERY;
      case 'architecture': return ARCHITECTURE_GALLERY;
    }
  };

  return (
    <div className="w-full h-full min-h-[500px] bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col justify-between font-sans">
      
      {/* Header Info */}
      <div className="space-y-2 max-w-xl">
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider select-none">
          <Layers className="size-3 text-purple-500" />
          Aura Card Stack
        </span>
        <h2 className="text-3xl font-serif tracking-tight text-zinc-950 dark:text-zinc-50">
          Elastic Card Deck
        </h2>
        <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
          A stacked cluster of image references that fanners outwards horizontally with spring transforms on hover. Selecting any card zooms open a fullscreen backdrop blur.
        </p>
      </div>

      {/* Main Display Stack Container */}
      <div className="my-14 flex flex-col items-center justify-center relative">
        <AuraCardStack cards={getGallery()} key={activeTab} />
        <span className="text-[11px] font-semibold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest mt-4">
          Hover to Fan · Click to Zoom Lightbox
        </span>
      </div>

      {/* Controller Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-2xl shadow-sm">
        <div className="flex items-center gap-2 text-xs font-bold text-zinc-450 uppercase select-none">
          <ImageIcon size={13} className="text-purple-500" />
          Gallery Curation Category
        </div>
        <div className="flex items-center gap-1.5 p-1 bg-zinc-100 dark:bg-zinc-800 rounded-xl">
          {[
            { id: 'nature', label: 'Nature' },
            { id: 'cyberpunk', label: 'Cyberpunk' },
            { id: 'architecture', label: 'Architecture' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                activeTab === tab.id
                  ? 'bg-white dark:bg-zinc-900 text-zinc-900 dark:text-zinc-50 shadow-sm'
                  : 'text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>
      
    </div>
  );
}
