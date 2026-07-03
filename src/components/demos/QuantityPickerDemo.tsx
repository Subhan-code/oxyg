import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { Pane } from 'tweakpane';
import { registerQuantityPicker } from './QuantityPickerElement';
import './quantity-picker.css';

gsap.registerPlugin(Draggable);

// Need to tell TypeScript about the custom element
declare global {
  namespace JSX {
    interface IntrinsicElements {
      'quantity-picker': any;
    }
  }
}

export default function QuantityPickerDemo() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pickerRef = useRef<HTMLElement>(null);
  const paneRef = useRef<Pane | null>(null);

  useEffect(() => {
    registerQuantityPicker();

    if (!pickerRef.current || paneRef.current) return;

    const config = {
      theme: 'system',
      step: 1,
      min: 0,
      max: 100,
      value: Math.floor(Math.random() * 100) + 1,
    };

    const ctrl = new Pane({
      title: 'config',
      expanded: true,
      container: undefined,
    }) as any;
    paneRef.current = ctrl;
    
    // Add custom class to the tweakpane container for the CSS positioning
    ctrl.element.parentElement?.classList.add('tp-dfwv');

    const picker = pickerRef.current;

    const update = () => {
      document.documentElement.dataset.theme = config.theme;
      picker.setAttribute('step', config.step.toString());
      picker.setAttribute('min', config.min.toString());
      picker.setAttribute('max', config.max.toString());
    };

    let valueBinding = ctrl.addBinding(config, 'value', {
      label: 'value',
      min: 0,
      max: 1000,
      step: 1,
    }).on('change', (event) => {
      picker.setAttribute('value', config.value.toString());
    });
    
    ctrl.addBinding(config, 'step', {
      label: 'step',
      min: 1,
      max: 20,
      step: 1,
    });
    ctrl.addBinding(config, 'min', {
      label: 'min',
      min: 0,
      max: 100,
      step: 1,
    });
    ctrl.addBinding(config, 'max', {
      label: 'max',
      min: 0,
      max: 1000,
      step: 1,
    });
    ctrl.addBinding(config, 'theme', {
      label: 'theme',
      options: {
        system: 'system',
        light: 'light',
        dark: 'dark',
      },
    });

    const sync = (event: any) => {
      // @ts-ignore
      if (!document.startViewTransition || !event.target || event.target.controller?.view?.labelElement?.innerText !== 'theme') {
        return update();
      }
      // @ts-ignore
      document.startViewTransition(() => update());
    };

    ctrl.on('change', sync);
    update();
    picker.setAttribute('value', config.value.toString());

    const handleChange = (e: any) => {
      if (!e.detail || e.detail.value === undefined || e.detail.value === null || e.detail.value === '') return;
      const newValue = parseFloat(e.detail.value);
      if (isNaN(newValue)) return;
      
      config.value = newValue;
      
      // Update tweakpane inputs
      // @ts-ignore
      const tweakpaneInput = valueBinding.controller?.view?.element?.querySelector('input');
      if (tweakpaneInput) {
        tweakpaneInput.value = newValue.toString();
      }
      // @ts-ignore
      const sliderKnob = valueBinding.controller?.view?.element?.querySelector('.tp-sldv_k');
      if (sliderKnob) {
        sliderKnob.style.setProperty('width', `${Math.max(config.min, Math.min(1000, newValue / 1000 * 100))}%`);
      }
    };

    picker.addEventListener('change', handleChange);

    // Make tweakpane draggable
    setTimeout(() => {
      const tweakClass = 'div.tp-dfwv';
      const el = document.querySelector(tweakClass);
      if (el) {
        const d = Draggable.create(tweakClass, {
          type: 'x,y',
          allowEventDefault: true,
          trigger: tweakClass + ' .tp-rotv_b',
        });
        el.addEventListener('dblclick', () => {
          gsap.to(tweakClass, {
            x: `+=${d[0].x * -1}`,
            y: `+=${d[0].y * -1}`,
            onComplete: () => {
              gsap.set(tweakClass, { clearProps: 'all' });
            },
          });
        });
      }
    }, 100);

    return () => {
      picker.removeEventListener('change', handleChange);
      ctrl.dispose();
      paneRef.current = null;
    };
  }, []);

  return (
    <div className="quantity-main w-full py-24 border-t border-zinc-800" ref={containerRef}>
      {React.createElement('quantity-picker', {
        ref: pickerRef,
        name: "quantity",
        id: "quantity",
        min: "0",
        max: "100",
        step: "1",
        value: "50"
      })}

      <span className="quantity-arrow">
        <span>jus' [type=number]<br/>w/ "extras"</span>
        <svg viewBox="0 0 122 97" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M116.102 0.0996005C114.952 0.334095 112.7 1.53002 111.433 2.53834C110.869 2.98388 109.368 4.15635 108.077 5.11778C103.455 8.6352 102.61 9.40903 102.187 10.4877C101.39 12.5982 102.798 14.5914 105.097 14.5914C106.13 14.5914 108.241 13.7941 109.696 12.8561C110.424 12.3871 111.01 12.0823 111.01 12.1526C111.01 12.692 107.796 17.8274 106.2 19.8206C102.023 25.0733 95.6642 29.6928 86.2548 34.2889C81.0926 36.8214 77.4555 38.2753 73.9123 39.2367C71.7066 39.823 70.6507 39.9871 67.9053 40.0809C66.0516 40.1513 64.5499 40.1747 64.5499 40.1278C64.5499 40.0809 64.808 38.9788 65.1365 37.6891C65.465 36.3993 65.8404 34.1716 66.0047 32.7647C66.4505 28.3796 65.4884 24.2994 63.4704 22.2359C62.1564 20.8758 60.9363 20.3599 59.0121 20.3599C57.6043 20.3599 57.1115 20.4537 55.7975 21.1103C52.8878 22.5407 50.5648 25.9878 49.5089 30.4197C48.453 34.922 49.2742 38.0877 52.3481 41.1127C53.4744 42.2148 54.46 42.9183 55.9852 43.6921C57.1584 44.2549 58.1439 44.7473 58.1909 44.7708C58.5898 45.0053 54.5304 53.4705 52.0666 57.6211C47.4674 65.3125 39.3486 74.575 30.5728 82.0789C22.2427 89.2309 16.7285 92.4435 9.87677 94.1553C8.28116 94.554 7.13138 94.6478 4.2452 94.6478C1.17131 94.6712 0.608154 94.7181 0.608154 95.023C0.608154 95.234 1.19478 95.5857 2.13337 95.9609C3.54126 96.4768 3.96363 96.5472 7.41296 96.5237C10.5572 96.5237 11.4724 96.4299 13.1149 96.0078C21.7265 93.6863 31.1594 87.1908 42.6102 75.7006C49.2977 69.0175 52.5828 64.9373 56.1494 58.9343C58.0501 55.7217 60.6312 50.6801 61.7575 47.9365L62.5553 45.9902L64.0806 46.1543C71.3547 46.9047 77.7136 45.3101 88.3667 40.034C96.2274 36.1414 101.976 32.3426 106.505 28.0748C108.617 26.0816 111.855 22.2828 112.794 20.7117C113.028 20.313 113.286 19.9847 113.357 19.9847C113.427 19.9847 113.662 20.782 113.873 21.72C114.084 22.6814 114.647 24.276 115.093 25.2609C115.82 26.8085 116.008 27.043 116.454 26.9727C116.876 26.9258 117.228 26.4333 117.956 24.9795C119.317 22.2828 119.833 20.2661 120.772 13.8879C121.757 7.25168 121.781 4.4143 120.889 2.56179C119.95 0.615488 118.12 -0.322489 116.102 0.0996005ZM60.7016 25.7767C61.4525 26.9023 61.8279 29.2942 61.6637 31.9205C61.4759 34.7813 60.5139 38.9788 60.0681 38.9788C59.5284 38.9788 57.1584 37.6422 56.2198 36.8214C54.8354 35.6021 54.3426 34.2889 54.5538 32.2957C54.8589 29.2473 56.1964 26.2223 57.5808 25.3547C58.7306 24.6512 60.0681 24.8388 60.7016 25.7767Z"
            fill="currentColor"
          ></path>
        </svg>
      </span>
      
      {/* Optional: we can add the jhey twitter link logo underneath if desired but omitting to keep layout clean */}
    </div>
  );
}
