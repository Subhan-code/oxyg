import React from 'react';

// ── Local SVGs for Radix Icons ──

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function GearIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 5.5C6.39543 5.5 5.5 6.39543 5.5 7.5C5.5 8.60457 6.39543 9.5 7.5 9.5C8.60457 9.5 9.5 8.60457 9.5 7.5C9.5 6.39543 8.60457 5.5 7.5 5.5ZM4.5 7.5C4.5 5.84315 5.84315 4.5 7.5 4.5C9.15685 4.5 10.5 5.84315 10.5 7.5C10.5 9.15685 9.15685 10.5 7.5 10.5C5.84315 10.5 4.5 9.15685 4.5 7.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
      <path d="M7.5 0.75C7.91421 0.75 8.25 1.08579 8.25 1.5V2.32131C8.75338 2.4287 9.22919 2.6289 9.66442 2.90977L10.245 2.3292C10.5379 2.03631 11.0127 2.03631 11.3056 2.3292C11.5985 2.62209 11.5985 3.09697 11.3056 3.38986L10.725 3.97043C11.0059 4.40566 11.2061 4.88147 11.3135 5.38485H12.1348C12.549 5.38485 12.8848 5.72064 12.8848 6.13485V6.86515C12.8848 7.27936 12.549 7.61515 12.1348 7.61515H11.3135C11.2061 8.11853 11.0059 8.59434 10.725 9.02957L11.3056 9.61014C11.3323 9.6369 11.3562 9.66531 11.3773 9.69519L11.3056 9.61014C11.5985 9.90303 11.5985 10.3779 11.3056 10.6708C11.0127 10.9637 10.5379 10.9637 10.245 10.6708L9.66442 10.0902C9.22919 10.3711 8.75338 10.5713 8.25 10.6787V11.5C8.25 11.9142 7.91421 12.25 7.5 12.25C7.08579 12.25 6.75 11.9142 6.75 11.5V10.6787C6.24662 10.5713 5.77081 10.3711 5.33558 10.0902L4.755 10.6708C4.46211 10.9637 3.98723 10.9637 3.69434 10.6708C3.40145 10.3779 3.40145 9.90303 3.69434 9.61014L4.275 9.02957C3.9941 8.59434 3.7939 8.11853 3.68651 7.61515H2.86515C2.45094 7.61515 2.11515 7.27936 2.11515 6.86515V6.13485C2.11515 5.72064 2.45094 5.38485 2.86515 5.38485H3.68651C3.7939 4.88147 3.9941 4.40566 4.275 3.97043L3.69434 3.38986C3.40145 3.09697 3.40145 2.62209 3.69434 2.3292C3.98723 2.03631 4.46211 2.03631 4.755 2.3292L5.33558 2.90977C5.77081 2.6289 6.24662 2.4287 6.75 2.32131V1.5C6.75 1.08579 7.08579 0.75 7.5 0.75Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1.38205 2.50588C0.32049 3.61864 0.28318 5.37894 1.3713 6.50529L7.5 12.8L13.6287 6.50529C14.7168 5.37894 14.6795 3.61864 13.6179 2.50588C12.5186 1.35418 10.7486 1.36531 9.6631 2.53127L7.5 4.8542L5.3369 2.53127C4.25139 1.36531 2.4814 1.35418 1.38205 2.50588Z" fill="currentColor" />
    </svg>
  );
}

export default function GooeyMenu() {
  return (
    <div className="relative h-[250px] w-[200px] flex items-center justify-center font-sans select-none">
      <nav
        className="menu relative w-full h-full"
        style={
          {
            filter: 'url(#gooey)',
            width: '100%',
            height: '100%',
            '--spring-easing':
              'linear(0, 0.88117 15.492%, 1.09261 23.232%, 1.10421 28.713%, 0.99031 49.585%,0.99995)',
          } as React.CSSProperties
        }
      >
        <input type="checkbox" className="peer hidden" name="menu" id="menu" />
        
        {/* Toggle Button */}
        <label
          className="absolute bottom-6 right-6 z-10 flex h-12 w-12 cursor-pointer items-center justify-center rounded-full bg-neutral-900 text-white transition-all duration-700 ease-[var(--spring-easing)] peer-checked:rotate-135 dark:bg-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200"
          htmlFor="menu"
        >
          <PlusIcon className="h-4 w-4" />
        </label>
        
        {/* Action Button 1 */}
        <button
          className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-64px] peer-checked:duration-700 peer-checked:ease-[var(--spring-easing)] dark:bg-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 cursor-pointer"
        >
          <GearIcon className="h-4 w-4" />
        </button>
        
        {/* Action Button 2 */}
        <button
          className="absolute bottom-6 right-6 flex h-12 w-12 items-center justify-center rounded-full bg-neutral-900 text-white transition-transform duration-300 ease-in peer-checked:translate-y-[-128px] peer-checked:duration-700 peer-checked:ease-[var(--spring-easing)] dark:bg-white dark:text-neutral-900 border border-neutral-800 dark:border-neutral-200 cursor-pointer"
        >
          <HeartIcon className="h-4 w-4" />
        </button>
      </nav>
      
      {/* Gooey filter SVG */}
      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="8"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -9"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
