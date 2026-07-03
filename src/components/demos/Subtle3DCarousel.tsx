import { PanInfo, motion, useMotionValue, useTransform } from 'framer-motion';
import { useState } from 'react';

// ── Local SVGs for Radix Icons ──

function CubeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 1.05L2.1 4.2V10.8L7.5 13.95L12.9 10.8V4.2L7.5 1.05ZM3.1 5.05L7.5 2.45L11.9 5.05L7.5 7.65L3.1 5.05ZM2.6 6.05L7 8.65V13.15L2.6 10.45V6.05ZM12.4 6.05V10.45L8 13.15V8.65L12.4 6.05Z" fill="currentColor" />
    </svg>
  );
}

function CodeIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M4.14645 3.14645C4.34171 2.95118 4.65829 2.95118 4.85355 3.14645L8.85355 7.14645C9.04882 7.34171 9.04882 7.65829 8.85355 7.85355L4.85355 11.8536C4.65829 12.0488 4.34171 12.0488 4.14645 11.8536C3.95118 11.6583 3.95118 11.3417 4.14645 11.1464L7.79289 7.5L4.14645 3.85355C3.95118 3.65829 3.95118 3.34171 4.14645 3.14645Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
    </svg>
  );
}

function FileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M3 1.5C2.44772 1.5 2 1.94772 2 2.5V12.5C2 13.0523 2.44772 13.5 3 13.5H12C12.5523 13.5 13 13.0523 13 12.5V5.5L9.5 1.5H3ZM9 2.5V5H11.5L9 2.5ZM3 2.5H8V5.5C8 6.05228 8.44772 6.5 9 6.5H12V12.5H3V2.5Z" fill="currentColor" fillRule="evenodd" clipRule="evenodd" />
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

function BoxIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path d="M7.5 1.05L2.1 4.2V10.8L7.5 13.95L12.9 10.8V4.2L7.5 1.05ZM3.1 5.05L7.5 2.45L11.9 5.05L7.5 7.65L3.1 5.05ZM2.6 6.05L7 8.65V13.15L2.6 10.45V6.05ZM12.4 6.05V10.45L8 13.15V8.65L12.4 6.05Z" fill="currentColor" />
    </svg>
  );
}

const ITEMS = [
  {
    title: 'UI Design',
    description: 'Design intuitive user interfaces and experiences.',
    icon: (
      <CubeIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
    id: 1,
  },
  {
    title: 'Frontend Development',
    description: 'Build interactive, visually compelling web pages.',
    icon: (
      <CodeIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
    id: 2,
  },
  {
    title: 'Motion Design',
    description: 'Create engaging animations and transitions.',
    icon: (
      <FileIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
    id: 3,
  },
  {
    title: 'Design Engineer',
    description: 'Focusing on details, design systems, and code.',
    icon: (
      <GearIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
    id: 4,
  },
  {
    title: 'Product Management',
    description: 'Manage product lifecycle, from conception to launch.',
    icon: (
      <BoxIcon className="h-4 w-4 text-neutral-500 dark:text-neutral-400" />
    ),
    id: 5,
  },
];

const ITEM_WIDTH = 200;
const DRAG_BUFFER = 50;
const VELOCITY_THRESHOLD = 500;
const GAP = 16;
const CONTAINER_WIDTH = ITEM_WIDTH + GAP;

const SPRING_OPTIONS = {
  type: 'spring',
  stiffness: 300,
  damping: 30,
} as const;

export default function Subtle3DCarousel() {
  const x = useMotionValue(0);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleDragEnd = (_: any, info: PanInfo) => {
    const offset = info.offset.x;
    const velocity = info.velocity.x;

    if (offset < -DRAG_BUFFER || velocity < -VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.min(prev + 1, ITEMS.length - 1));
    } else if (offset > DRAG_BUFFER || velocity > VELOCITY_THRESHOLD) {
      setCurrentIndex((prev) => Math.max(prev - 1, 0));
    }
  };

  const leftConstraint = -((ITEM_WIDTH + GAP) * (ITEMS.length - 1));

  return (
    <div className="relative overflow-hidden rounded-[24px] border border-neutral-200/50 dark:border-white/5 p-4 font-sans select-none w-full max-w-[280px]">
      <motion.div
        className="flex"
        drag="x"
        dragConstraints={{
          left: leftConstraint,
          right: 0,
        }}
        style={{
          width: ITEM_WIDTH,
          gap: `${GAP}px`,
          perspective: 1000,
          perspectiveOrigin: currentIndex * ITEM_WIDTH + ITEM_WIDTH / 2,
          x,
        }}
        onDragEnd={handleDragEnd}
        animate={{ x: -(currentIndex * (ITEM_WIDTH + GAP)) }}
        transition={SPRING_OPTIONS}
      >
        {ITEMS.map((item, index) => {
          const range = [
            (-100 * (index + 1) * CONTAINER_WIDTH) / 100,
            (-100 * index * CONTAINER_WIDTH) / 100,
            (-100 * (index - 1) * CONTAINER_WIDTH) / 100,
          ];
          const nextIndex = Math.min(index + 1, ITEMS.length - 1);
          const prevIndex = Math.max(index - 1, 0);
          const outputRange = [nextIndex ? 90 : 90, 0, prevIndex ? -90 : -90];
          const rotateY = useTransform(x, range, outputRange, {
            clamp: false,
          });

          return (
            <motion.div
              key={index}
              className="relative flex shrink-0 flex-col items-start justify-between rounded-2xl border border-neutral-200/50 dark:border-white/5 bg-white dark:bg-zinc-900 p-5 h-[160px] cursor-grab active:cursor-grabbing"
              style={{
                width: ITEM_WIDTH,
                rotateY: rotateY,
              }}
              transition={SPRING_OPTIONS}
            >
              <div>
                <span className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-100 dark:bg-zinc-800">
                  {item.icon}
                </span>
              </div>
              <div>
                <div className="mb-1 text-sm font-semibold text-neutral-800 dark:text-neutral-100">
                  {item.title}
                </div>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 leading-snug">
                  {item.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
      <div className="flex w-full justify-center">
        <div className="mt-4 flex w-[120px] justify-between px-4">
          {ITEMS.map((_, index) => (
            <motion.div
              key={index}
              className={`h-1.5 w-1.5 cursor-pointer rounded-full transition-colors duration-150  ${
                currentIndex === index
                  ? 'bg-neutral-800 dark:bg-white'
                  : 'bg-neutral-800/20 dark:bg-white/20'
              }`}
              animate={{ scale: currentIndex === index ? 1.25 : 1 }}
              onClick={() => setCurrentIndex(index)}
              transition={{
                duration: 0.15,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
