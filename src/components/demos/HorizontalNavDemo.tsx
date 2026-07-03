import React, { useState } from 'react';
import { Info } from 'lucide-react';
import './horizontal-nav.css';

const navItems = [
  { id: 'one', title: 'One' },
  { id: 'two', title: 'Two' },
  { id: 'three', title: 'Three' },
  { id: 'four', title: 'Four' },
  { id: 'five', title: 'Five' },
  { id: 'six', title: 'Six' },
  { id: 'seven', title: 'Seven' },
  { id: 'eight', title: 'Eight' },
  { id: 'nine', title: 'Nine' },
  { id: 'ten', title: 'Ten' },
];

export default function HorizontalNavDemo() {
  const [active, setActive] = useState('two');

  return (
    <div className="w-full py-24 border-t border-zinc-800 flex flex-col items-center relative">
      <div className="max-w-xl text-center space-y-4 mb-12 px-6">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-100">
          Scroll Timeline Nav
        </h2>
        <p className="text-zinc-400 text-lg">
          Features experimental CSS <code className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono tracking-tight">animation-timeline: scroll()</code> and <code className="bg-zinc-800 text-zinc-300 px-1.5 py-0.5 rounded text-sm font-mono tracking-tight">anchor-name</code> to mask overflowing scroll and snap to the active item.
        </p>
        
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-xl p-4 inline-flex items-start gap-4 text-left w-full sm:w-auto mx-auto mt-2">
          <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
          <p className="text-sm text-blue-200/80 leading-relaxed">
            Drag the container from the bottom-right corner to resize and observe the mask fading effect on the edges. Needs Chrome 125+ for Anchor positioning.
          </p>
        </div>
      </div>

      <div className="resize">
        <nav className="mask-nav text-zinc-300">
          <ul>
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  data-active={active === item.id}
                  onClick={(e) => {
                    e.preventDefault();
                    setActive(item.id);
                  }}
                >
                  <span>{item.title}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
