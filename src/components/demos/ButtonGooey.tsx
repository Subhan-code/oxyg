import React from 'react';

function ArrowRightIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.7929 7.5L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

export const ButtonGooey = () => {
  return (
    <>
      <div className="relative h-[240px] w-full flex items-center justify-center font-sans select-none overflow-hidden rounded-2xl bg-neutral-50 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5">
        <div className="wrapper-gooey">
          <button className="button-gooey cursor-pointer active:scale-98 transition-transform">
            Hover me
            <div className="bubble-gooey">
              <ArrowRightIcon className="h-5 w-5" />
            </div>
          </button>
        </div>
      </div>

      <svg
        className="absolute hidden"
        width="0"
        height="0"
        xmlns="http://www.w3.org/2000/svg"
        version="1.1"
      >
        <defs>
          <filter id="gooey-button-filter">
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

      <style>{`
        .wrapper-gooey {
          filter: url("#gooey-button-filter");
          height: 100%;
          width: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
        }

        .button-gooey {
          background: #000;
          color: #eee;
          display: inline-flex;
          font-weight: bold;
          padding: 0 24px;
          border-radius: 16px;
          font-size: 1.1rem;
          height: 54px;
          align-items: center;
          position: relative;
          border: none;
          outline: none;
        }

        .dark .button-gooey {
          background: #fff;
          color: #000;
        }

        .bubble-gooey {
          color: #fff;
          z-index: -10;
          display: flex;
          background: #000;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          position: absolute;
          border-radius: 16px;
          transition: transform 0.6s cubic-bezier(0.16, 1, 0.3, 1);
          transform: translateX(30%) translateY(0%);
          right: 0;
        }

        .dark .bubble-gooey {
          background: #fff;
          color: #000;
        }

        .button-gooey:hover .bubble-gooey {
          transform: translateX(115%) translateY(0%);
        }
      `}</style>
    </>
  );
};
