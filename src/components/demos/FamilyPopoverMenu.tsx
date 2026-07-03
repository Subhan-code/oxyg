import { AnimatePresence, motion } from 'framer-motion';
import React, { RefObject, useState, useEffect } from 'react';

// ── Custom inline useMediaQuery hook ──
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    const media = window.matchMedia(query);
    if (media.matches !== matches) {
      setMatches(media.matches);
    }
    const listener = () => setMatches(media.matches);
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);

  return matches;
}

// ── Custom inline useClickOutside hook ──
function useClickOutside(ref: React.RefObject<HTMLElement | null>, handler: (event: MouseEvent | TouchEvent) => void) {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return;
      }
      handler(event);
    };
    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);
    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
}

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

function EnvelopeClosedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M1 3.5C1 3.22386 1.22386 3 1.5 3H13.5C13.7761 3 14 3.22386 14 3.5V11.5C14 11.7761 13.7761 12 13.5 12H1.5C1.22386 12 1 11.7761 1 11.5V3.5ZM2 4.41421V11H13V4.41421L7.5 8.16421L2 4.41421ZM12.3536 4H2.64645L7.5 7.33333L12.3536 4Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
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

export default function FamilyPopoverMenu() {
  const refMenu = React.useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState(false);

  const isScreenSizeSm = useMediaQuery('(max-width: 640px)');

  const duration = 0.25;
  const transition = { duration, ease: [0.32, 0.72, 0, 1] as any };

  const menuVariants = {
    open: {
      opacity: 1,
      width: isScreenSizeSm ? '100%' : '260px',
      height: 180,
      borderRadius: '20px',
      bottom: 0,
      transition,
    },
    closed: {
      bottom: 0,
      opacity: 1,
      width: '44px',
      height: 44,
      borderRadius: '50%',
      transition,
    },
  };

  const contentVariants = {
    open: { opacity: 1, scale: 1, transition },
    closed: { opacity: 0, scale: 0.95, transition },
  };

  const buttonVariants = {
    open: {
      opacity: 0,
      transition: {
        duration: duration / 2,
      },
    },
    closed: {
      opacity: 1,
      transition: {
        duration: duration,
      },
    },
  };

  const items = [
    {
      title: 'Settings',
      text: 'Adjust your preferences',
      icon: GearIcon,
    },
    {
      title: 'Messages',
      text: 'View your messages',
      icon: EnvelopeClosedIcon,
    },
    {
      title: 'Favorites',
      text: 'Manage your favorites',
      icon: HeartIcon,
    },
  ];

  useClickOutside(refMenu as RefObject<HTMLDivElement>, () => {
    setOpenMenu(false);
  });

  return (
    <div className="relative mx-6 flex h-[260px] w-full items-end justify-center font-sans select-none bg-neutral-50 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5 rounded-2xl p-6">
      <AnimatePresence>
        {openMenu && (
          <motion.div
            className="absolute bottom-6 left-6 flex flex-col items-center overflow-hidden bg-neutral-900 p-1 dark:bg-white border border-neutral-800 dark:border-neutral-200 shadow-xl"
            initial="closed"
            animate="open"
            exit="closed"
            variants={menuVariants}
            onClick={(e) => e.stopPropagation()}
            ref={refMenu}
          >
            <motion.ul
              variants={contentVariants}
              className="relative flex w-full flex-col space-y-1"
            >
              {items.map((item, index) => {
                return (
                  <li
                    key={index}
                    className="w-full select-none rounded-[10px] bg-neutral-850 transition-transform active:scale-[0.98] dark:bg-neutral-100 cursor-pointer"
                  >
                    <div className="flex items-center py-2.5 px-3">
                      <div className="mr-3">
                        <item.icon className="h-4 w-4 text-white dark:text-neutral-900" />
                      </div>
                      <div className="text-left">
                        <h3 className="text-xs font-semibold text-white dark:text-neutral-900 leading-none mb-1">
                          {item.title}
                        </h3>
                        <p className="text-[10px] text-neutral-400 dark:text-neutral-550 leading-none">
                          {item.text}
                        </p>
                      </div>
                    </div>
                  </li>
                );
              })}
            </motion.ul>
          </motion.div>
        )}
      </AnimatePresence>
      <motion.button
        className="absolute bottom-6 left-6 flex h-11 w-11 items-center justify-center rounded-full bg-neutral-900 text-white outline-none dark:bg-white dark:text-neutral-900 border border-neutral-850 dark:border-neutral-200 cursor-pointer"
        disabled={openMenu}
        onClick={(e) => {
          e.stopPropagation();
          setOpenMenu(true);
        }}
        variants={buttonVariants}
        initial="closed"
        animate={openMenu ? 'open' : 'closed'}
        whileTap={{ scale: 0.95 }}
      >
        <PlusIcon className="h-5 w-5" />
      </motion.button>
    </div>
  );
}
