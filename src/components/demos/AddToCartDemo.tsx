import React, { useState, useEffect, useRef } from 'react';
import { Pane } from 'tweakpane';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import './add-to-cart.css';

gsap.registerPlugin(Draggable);

const COLORS = [
  'oklch(62.32% 0.20671135203311433 255.1916692835456)',
  'oklch(73.87% 0.1070786497070297 201.59493356613996)',
  'oklch(84.85% 0.17406745322149955 86.29886848579457)',
  'oklch(66.83% 0.20633437948063887 20.156816263959513)',
  'oklch(74.67% 0.09006824938632453 344.36705431384325)',
];

const CheckmarkBurst = ({ className }: { className?: string }) => (
  <svg className={`checkmark-burst \${className || ''}`} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <g className="check">
      <path className="ring" d="M21 12C21 13.1819 20.7672 14.3522 20.3149 15.4442C19.8626 16.5361 19.1997 17.5282 18.364 18.364C17.5282 19.1997 16.5361 19.8626 15.4442 20.3149C14.3522 20.7672 13.1819 21 12 21C10.8181 21 9.64778 20.7672 8.55585 20.3149C7.46392 19.8626 6.47177 19.1997 5.63604 18.364C4.80031 17.5282 4.13738 16.5361 3.68508 15.4442C3.23279 14.3522 3 13.1819 3 12C3 9.61305 3.94821 7.32387 5.63604 5.63604C7.32387 3.94821 9.61305 3 12 3C14.3869 3 16.6761 3.94821 18.364 5.63604C20.0518 7.32387 21 9.61305 21 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
      <path className="tick" d="M9 12.75L11.25 15L15 9.75" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </g>
    <g className="burst">
      {[...Array(8)].map((_, i) => (
        <g key={i} style={{ '--index': i } as any}>
          <path className="wiggle" pathLength="1" d="M12 8.5 Q13 9.5 12 10.5 Q11 11.5 12 12.5 Q13 13.5 12 15.5" stroke="currentColor" strokeLinecap="round" fill="none"/>
          <line className="line" strokeLinecap="round" pathLength="1" x1="12" y1="8.5" x2="12" y2="15.5" stroke="currentColor"/>
        </g>
      ))}
    </g>
  </svg>
);

export default function AddToCartDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const paneRef = useRef<Pane | null>(null);
  
  const [dataAttrs, setDataAttrs] = useState<Record<string, string>>({
    'data-style': 'alternate',
    'data-color': 'custom',
    'data-timing': 'sequential',
    'data-include': 'false',
    'data-play': 'false',
  });
  
  const [customStyle, setCustomStyle] = useState<Record<string, string>>({
    '--custom-color': 'hsl(140, 100%, 50%)',
    '--speed': '1',
  });

  const [addingState, setAddingState] = useState(false);
  const [statusText, setStatusText] = useState('');
  const [playState, setPlayState] = useState(false);

  useEffect(() => {
    if (paneRef.current) return;

    const config = {
      theme: 'light',
      shouldError: false,
      play: false,
      style: 'alternate',
      timing: 'sequential',
      color: 'custom',
      custom: 'hsl(140, 100%, 50%)',
      include: false,
      speed: 1,
    };

    const ctrl = new Pane({ title: 'add-to-cart config' }) as any;
    paneRef.current = ctrl;
    
    // Position the tweakpane container
    if (ctrl.element?.parentElement) {
      const el = ctrl.element.parentElement;
      el.classList.add('tp-dfwv');
      el.style.top = '16rem'; // slightly lower than the first one
    }

    const update = () => {
      setDataAttrs({
        'data-style': config.style,
        'data-color': config.color,
        'data-timing': config.timing,
        'data-include': String(config.include),
        'data-play': String(config.play),
      });
      setCustomStyle({
        '--custom-color': config.custom,
        '--speed': String(1 / config.speed),
      });
      setPlayState(config.play);
      
      // Update element visibility in tweakpane
      Array.from(ctrl.children || []).forEach((c: any) => {
        if (c.label === 'style' || c.label === 'timing' || c.label === 'color' || c.label === 'speed' || c.title === 'play') {
          c.hidden = !config.play;
        }
        if (c.label === 'custom' || c.label === 'include') {
          c.hidden = config.color !== 'custom' || !config.play;
        }
      });
    };

    ctrl.addBinding(config, 'theme', { options: { system: 'system', light: 'light', dark: 'dark' } });
    const errorBinding = ctrl.addBinding(config, 'shouldError', { label: 'simulate error' });
    ctrl.addBinding(config, 'play');
    ctrl.addBinding(config, 'style', { options: { line: 'line', wiggle: 'wiggle', alternate: 'alternate', random: 'random' }});
    ctrl.addBinding(config, 'timing', { options: { uniform: 'uniform', alternate: 'alternate', sequential: 'sequential', random: 'random' }});
    ctrl.addBinding(config, 'color', { options: { match: 'match', vibrant: 'vibrant', custom: 'custom' }});
    ctrl.addBinding(config, 'custom');
    ctrl.addBinding(config, 'include');
    ctrl.addBinding(config, 'speed', { min: 0.1, max: 2, step: 0.1 });
    
    let isPlaying = false;
    const playBtn = ctrl.addButton({ title: 'play' }).on('click', () => {
      if(playBtn.title === 'reset') {
        config.play = false;
        playBtn.title = 'play';
        update();
        return;
      }
      
      gsap.set('.burst g[style*="--index"]', {
        '--d': () => gsap.utils.random(0, .4, 0.01)
      });
      gsap.set('.burst g[style*="--index"]', {
        '--color': () => COLORS[gsap.utils.random(0, COLORS.length - 1, 1)]
      });
      
      playBtn.disabled = true;
      config.play = true;
      playBtn.title = 'reset';
      update();
      
      setTimeout(() => {
        playBtn.disabled = false;
      }, (1 * 1000) / config.speed + 1000); // approximate animation wait
    });

    ctrl.on('change', () => update());
    update();

    // Make it draggable
    setTimeout(() => {
      const tweakClasses = document.querySelectorAll('div.tp-dfwv');
      if (tweakClasses.length > 1) {
        const target = tweakClasses[tweakClasses.length - 1] as HTMLElement;
        const d = Draggable.create(target, {
          type: 'x,y',
          allowEventDefault: true,
          trigger: (target.querySelector('.tp-rotv_b') as HTMLElement),
        });
      }
    }, 100);

    // Provide the config getter globally for our addToCart function
    (window as any).__getAddToCartConfig = () => config;

    return () => {
      ctrl.dispose();
      paneRef.current = null;
    };
  }, []);

  const handleAddToCart = async () => {
    if (addingState) return;
    
    gsap.set('.burst g[style*="--index"]', { '--d': () => gsap.utils.random(0, .4, 0.01) });
    gsap.set('.burst g[style*="--index"]', { '--color': () => COLORS[gsap.utils.random(0, COLORS.length - 1, 1)] });
    
    setAddingState(true);
    setStatusText('Adding item to cart...');
    
    const config = (window as any).__getAddToCartConfig?.() || { shouldError: false };
    
    try {
      await new Promise((resolve, reject) => {
        const delay = 500 + Math.random() * 2000;
        setTimeout(() => {
          if (config.shouldError) reject(new Error('Failed to add item to cart'));
          else resolve(null);
        }, delay);
      });
      
      setStatusText('Product has been added to your cart');
      
      // Keep showing the success animation for a bit
      setTimeout(() => {
        setAddingState(false);
        setStatusText('');
      }, 3000); // Hold the success state for 3s before resetting
      
    } catch (e) {
      setAddingState(false);
      setStatusText('Failed to add item to cart. Please try again.');
    }
  };

  return (
    <div 
      className="add-to-cart-wrapper w-full py-24 border-t border-zinc-800 flex flex-col items-center relative" 
      ref={containerRef}
      {...dataAttrs}
      style={customStyle as React.CSSProperties}
    >
      <div className="max-w-xl text-center space-y-4 mb-12 px-6">
        <h2 className="text-3xl sm:text-4xl font-medium tracking-tight text-zinc-100">
          Animated Checkmark Burst
        </h2>
        <p className="text-zinc-400 text-lg">
          Complex choreographed GSAP-driven SVG animations inside a standard button interaction.
        </p>
      </div>

      <div className="cart-container relative flex justify-center mb-8" data-adding={addingState}>
        <button 
          aria-label="Add to cart" 
          className="add-to-cart shadow-xl shadow-black/40"
          onClick={handleAddToCart}
          disabled={addingState}
        >
          <span className="flex items-center justify-center gap-2 add-to-cart-text">     
            <span className="add-to-cart-icon text-zinc-950">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="none">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16.608 9.421V6.906H3.392v8.016c0 .567.224 1.112.624 1.513.4.402.941.627 1.506.627H8.63M8.818 3h2.333c.618 0 1.212.247 1.649.686a2.35 2.35 0 0 1 .683 1.658v1.562H6.486V5.344c0-.622.246-1.218.683-1.658A2.33 2.33 0 0 1 8.82 3" />
                <path stroke="currentColor" strokeLinecap="round" strokeWidth="1.5" d="M14.608 12.563v5m2.5-2.5h-5" />
              </svg>
            </span>
            <span className="add-to-cart-text__content font-medium">Add to cart</span>
          </span>
          <span className="flex added text-blue-500">
            <span className="add-to-cart-icon--added">
              <CheckmarkBurst />
            </span>
          </span>
        </button>
      </div>

      {/* Playground Area for the Checkburst testing */}
      {playState && (
        <div className="playground-container mt-12 mb-4 bg-zinc-900/50 rounded-2xl border border-zinc-800">
          <fieldset>
            <legend className="font-mono text-xs uppercase tracking-widest bg-zinc-950 px-2 rounded">Playground</legend>
            <CheckmarkBurst />
          </fieldset>
        </div>
      )}
      
      <div aria-live="polite" aria-atomic="true" className="sr-only">
        {statusText}
      </div>
    </div>
  );
}
