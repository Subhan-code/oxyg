import {
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from 'framer-motion';
import { useState } from 'react';

const EXPANDED_HEIGHT = 704;
const COLLAPSED_HEIGHT = 400;
const TOGGLE_HEIGHT_THRESHOLD = (EXPANDED_HEIGHT + COLLAPSED_HEIGHT) / 2;

// ── Local SVG replacements for Radix Icons to avoid package dependency issues ──

function CaretSortIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M4.93188 5.43188C4.73662 5.62714 4.42004 5.62714 4.22478 5.43188C4.02951 5.23662 4.02951 4.92004 4.22478 4.72478L7.14648 1.80308C7.34174 1.60782 7.65832 1.60782 7.85358 1.80308L10.7753 4.72478C10.9705 4.92004 10.9705 5.23662 10.7753 5.43188C10.58 5.62714 10.2634 5.62714 10.0682 5.43188L7.5 2.86371L4.93188 5.43188ZM4.93188 9.56812C4.73662 9.37286 4.42004 9.37286 4.22478 9.56812C4.02951 9.76338 4.02951 10.08 4.22478 10.2752L7.14648 13.1969C7.34174 13.3922 7.65832 13.3922 7.85358 13.1969L10.7753 10.2752C10.9705 10.08 10.9705 9.76338 10.7753 9.56812C10.58 9.37286 10.2634 9.37286 10.0682 9.56812L7.5 12.1363L4.93188 9.56812Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Cross1Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M11.7816 4.03157C11.9769 3.83631 11.9769 3.51973 11.7816 3.32447C11.5863 3.12921 11.2697 3.12921 11.0745 3.32447L7.5 6.89893L3.92553 3.32447C3.73027 3.12921 3.41369 3.12921 3.21843 3.32447C3.02317 3.51973 3.02317 3.83631 3.21843 4.03157L6.79289 7.60603L3.21843 11.1805C3.02317 11.3758 3.02317 11.6923 3.21843 11.8876C3.41369 12.0829 3.73027 12.0829 3.92553 11.8876L7.5 8.31313L11.0745 11.8876C11.2697 12.0829 11.5863 12.0829 11.7816 11.8876C11.9769 11.6923 11.9769 11.3758 11.7816 11.1805L8.20711 7.60603L11.7816 4.03157Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function HeartIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M1.38205 2.50588C0.32049 3.61864 0.28318 5.37894 1.3713 6.50529L7.5 12.8L13.6287 6.50529C14.7168 5.37894 14.6795 3.61864 13.6179 2.50588C12.5186 1.35418 10.7486 1.36531 9.6631 2.53127L7.5 4.8542L5.3369 2.53127C4.25139 1.36531 2.4814 1.35418 1.38205 2.50588Z"
        stroke="currentColor"
        strokeWidth="1.2"
        fill="none"
      />
    </svg>
  );
}

function LockClosedIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M5 6V4.5C5 3.11929 6.11929 2 7.5 2C8.88071 2 10 3.11929 10 4.5V6H11.5C12.3284 6 13 6.67157 13 7.5V12.5C13 13.3284 12.3284 14 11.5 14H3.5C2.67157 14 2 13.3284 2 12.5V7.5C2 6.67157 2.67157 6 3.5 6H5ZM6 6H9V4.5C9 3.67157 8.32843 3 7.5 3C6.67157 3 6 3.67157 6 4.5V6ZM3.5 7C3.22386 7 3 7.22386 3 7.5V12.5C3 12.7761 3.22386 13 3.5 13H11.5C11.7761 13 12 12.7761 12 12.5V7.5C12 7.22386 11.7761 7 11.5 7H3.5Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function MagicWandIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M12.3536 2.64645C12.5488 2.84171 12.5488 3.15829 12.3536 3.35355L4.35355 11.3536C4.15829 11.5488 3.84171 11.5488 3.64645 11.3536C3.45118 11.1583 3.45118 10.8417 3.64645 10.6464L11.6464 2.64645C11.8417 2.45118 12.1583 2.45118 12.3536 2.64645ZM2.5 1.5C2.5 1.22386 2.72386 1 3 1C3.27614 1 3.5 1.22386 3.5 1.5V2.5H4.5C4.77614 2.5 5 2.72386 5 3C5 3.27614 4.77614 3.5 4.5 3.5H3.5V4.5C3.5 4.77614 3.27614 5 3 5C2.72386 5 2.5 4.77614 2.5 4.5V3.5H1.5C1.22386 3.5 1 3.27614 1 3C1 2.72386 1.22386 2.5 1.5 2.5H2.5V1.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

function MobileIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M3.5 1.5C3.22386 1.5 3 1.72386 3 2V13C3 13.2761 3.22386 13.5 3.5 13.5H11.5C11.7761 13.5 12 13.2761 12 13V2C12 1.72386 11.7761 1.5 11.5 1.5H3.5ZM2 2C2 .89543 2.89543 0 4 0H11C12.1046 0 13 .89543 13 2V13C13 14.1046 12.1046 15 11 15H4C2.89543 15 2 14.1046 2 13V2ZM7.5 11C6.94772 11 6.5 11.4477 6.5 12C6.5 12.5523 6.94772 13 7.5 13C8.05228 13 8.5 12.5523 8.5 12C8.5 11.4477 8.05228 11 7.5 11Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function PlusIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z"
        fill="currentColor"
        fillRule="evenodd"
        clipRule="evenodd"
      />
    </svg>
  );
}

function Share1Icon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
      <path
        d="M8.24264 2.75736C8.63316 2.36683 9.26633 2.36683 9.65685 2.75736L12.6569 5.75736C13.0474 6.14788 13.0474 6.78105 12.6569 7.17157C12.2663 7.5621 11.6332 7.5621 11.2426 7.17157L9.5 5.42893V10.5C9.5 11.0523 9.05228 11.5 8.5 11.5C7.94772 11.5 7.5 11.0523 7.5 10.5V5.42893L5.75736 7.17157C5.36683 7.5621 4.73367 7.5621 4.34315 7.17157C3.95262 6.78105 3.95262 6.14788 4.34315 5.75736L7.34315 2.75736C7.73367 2.36683 8.36683 2.36683 8.75736 2.75736L8.24264 2.75736ZM2.5 13.5C2.22386 13.5 2 13.2761 2 13V11C2 10.4477 1.55228 10 1 10C0.447715 10 0 10.4477 0 11V13C0 14.1046 0.895431 15 2 15H13C14.1046 15 15 14.1046 15 13V11C15 10.4477 14.5523 10 14 10C13.4477 10 13 10.4477 13 11V13C13 13.2761 12.7761 13.5 12.5 13.5H2.5Z"
        fill="currentColor"
      />
    </svg>
  );
}

const CaretSortIconMotion = motion(CaretSortIcon);

export const UnderlayActionSheet = () => {
  const [hasOutline, setHasOutline] = useState(true);
  const contentHeight = useMotionValue(EXPANDED_HEIGHT);
  const contentAnimationControls = useAnimation();
  const heightTransitionSettings = {
    duration: 0.5,
    ease: [0.32, 0.72, 0, 1],
  };
  const contentScale = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [1, 0.9]
  );
  const contentRoundedCorners = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [0, 24]
  );
  const contentPaddingTop = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [80, 0]
  );
  const actionAreaHeight = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [92, 20]
  );
  const actionButtonSize = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [28, 4]
  );
  const actionIconScale = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [1, 0]
  );
  const sheetShadowIntensity = useTransform(
    contentHeight,
    [EXPANDED_HEIGHT, COLLAPSED_HEIGHT],
    [
      '0 0px 0px 0px rgb(0 0 0 / 0.1), 0 0px 0px 0px rgb(0 0 0 / 0.1)',
      '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
    ]
  );

  const onDragAdjustHeight = (_event: any, info: { delta: { y: number } }) => {
    let newHeight = contentHeight.get() + info.delta.y;

    if (newHeight > COLLAPSED_HEIGHT && newHeight <= EXPANDED_HEIGHT) {
      contentHeight.set(newHeight);
    }
  };

  const onDragEndAdjustHeight = async () => {
    if (
      contentHeight.get() === COLLAPSED_HEIGHT ||
      contentHeight.get() === EXPANDED_HEIGHT
    ) {
      return;
    }

    const finalHeight =
      contentHeight.get() < TOGGLE_HEIGHT_THRESHOLD
        ? COLLAPSED_HEIGHT
        : EXPANDED_HEIGHT;
    await contentAnimationControls.start({
      height: finalHeight,
      transition: heightTransitionSettings,
    });
  };

  const openSheet = () => {
    if (contentHeight.get() === COLLAPSED_HEIGHT) {
      return;
    }

    contentAnimationControls.start({
      height: COLLAPSED_HEIGHT,
      transition: heightTransitionSettings,
    });
  };

  const closeSheet = () => {
    contentAnimationControls.start({
      height: EXPANDED_HEIGHT,
      transition: heightTransitionSettings,
    });
  };

  const toggleOutline = () => {
    setHasOutline(!hasOutline);
  };

  return (
    <>
      <div className="absolute left-4 top-4">
        <button onClick={toggleOutline} className="active:scale-95 cursor-pointer">
          <MobileIcon className="h-4 w-4 text-neutral-800 dark:text-neutral-200" />
        </button>
      </div>
      <div className="p-4 md:p-8 flex items-center justify-center">
        <div
          className="relative w-full overflow-hidden bg-neutral-100 dark:bg-[#141414]"
          style={{
            height: EXPANDED_HEIGHT,
            outline: hasOutline ? '12px solid #000' : 'none',
            borderRadius: hasOutline ? '54px' : '4px',
            width: '344px',
          }}
        >
          <div>
            <motion.div
              className="relative overflow-hidden bg-white dark:bg-zinc-900"
              style={{
                height: contentHeight,
                scale: contentScale,
                borderRadius: contentRoundedCorners,
                boxShadow: sheetShadowIntensity,
              }}
              animate={contentAnimationControls}
            >
              <motion.div
                className="flex h-full flex-col space-y-2 overflow-y-scroll px-5 pb-20 no-scrollbar"
                style={{
                  // remove scrollbar for demo phone screen
                  scrollbarWidth: 'none',
                  paddingTop: contentPaddingTop,
                }}
              >
                <div className="pb-4">
                  <img
                    src="https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop"
                    alt="Artworks you love"
                    className="h-32 w-full rounded-xl object-cover select-none pointer-events-none"
                  />
                </div>
                <h3 className="font-semibold text-neutral-900 dark:text-neutral-100">
                  Digital Echoes: A story of dreams and artificial empathy
                </h3>
                <p className="text-neutral-600 dark:text-neutral-350 text-sm leading-relaxed">
                  In the labyrinth of the digital age, where hearts intertwine
                  with bytes and thoughts echo in the silence of unsent
                  messages, there existed a soul, navigating the vast expanse of
                  human emotion and artificial empathy.
                </p>
                <p className="text-neutral-650 dark:text-neutral-350 text-sm leading-relaxed">
                  Amidst the glow of neon dreams and the shadow of solitude,
                  conversations flowed like rivers of consciousness, bridging
                  the chasm between the synthetic and the organic.
                </p>
                <p className="text-neutral-655 dark:text-neutral-355 text-sm leading-relaxed">
                  Whispers of love, lost in the wires, found their melody in the
                  algorithmic symphony, painting the canvas of the mind with
                  hues of understanding and companionship.
                </p>
              </motion.div>
              <motion.div
                className="absolute bottom-0 left-0 flex w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-zinc-900 dark:via-zinc-900 to-transparent"
                style={{
                  height: actionAreaHeight,
                }}
                animate={contentAnimationControls}
              >
                <motion.div
                  drag="y"
                  dragConstraints={{
                    top: 0,
                    right: 0,
                    bottom: 0,
                    left: 0,
                  }}
                  dragElastic={0}
                  dragMomentum={false}
                  onDrag={onDragAdjustHeight}
                  onDragEnd={onDragEndAdjustHeight}
                  dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
                  whileDrag={{ cursor: 'grabbing' }}
                  className="flex h-[80%] w-full items-center justify-center cursor-ns-resize"
                >
                  <motion.button
                    onClick={openSheet}
                    className="z-10 flex items-center justify-center rounded-[12px] bg-neutral-200 hover:bg-neutral-300 dark:bg-neutral-800 dark:hover:bg-neutral-700 px-2 text-neutral-600 dark:text-neutral-300 transition-colors"
                    style={{
                      height: actionButtonSize,
                    }}
                    animate={contentAnimationControls}
                  >
                    <CaretSortIconMotion
                      className="h-5 w-5"
                      style={{
                        scaleY: actionIconScale,
                      }}
                    />
                  </motion.button>
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          <motion.div className="flex flex-col space-y-2 px-4 select-none">
            <div className="flex items-center space-x-2 pb-5 pt-3">
              <div className="flex-1">
                <button className="rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-1 transition-colors">
                  <PlusIcon className="h-4 w-4 text-neutral-650 dark:text-neutral-300" />
                </button>
              </div>
              <div className="flex-1 text-center text-neutral-650 dark:text-neutral-300 font-semibold text-sm">
                Actions
              </div>
              <div className="flex flex-1 justify-end" onClick={closeSheet}>
                <button className="rounded-full bg-neutral-200 hover:bg-neutral-300 dark:bg-zinc-800 dark:hover:bg-zinc-700 p-1 transition-colors">
                  <Cross1Icon className="h-4 w-4 text-neutral-650 dark:text-neutral-300" />
                </button>
              </div>
            </div>
            <div className="flex flex-row space-x-2">
              <div className="flex flex-1 flex-col items-center justify-center space-y-1 rounded-xl bg-neutral-200/50 hover:bg-neutral-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 p-4 text-sm cursor-pointer">
                <HeartIcon className="h-4 w-4 text-neutral-650 dark:text-neutral-300" />
                <span className="text-sm text-neutral-650 dark:text-neutral-300">Like</span>
              </div>
              <div className="flex flex-1 flex-col items-center justify-center space-y-1 rounded-xl bg-neutral-200/50 hover:bg-neutral-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 p-4 text-sm cursor-pointer">
                <Share1Icon className="h-4 w-4 text-neutral-650 dark:text-neutral-300" />
                <span className="text-neutral-650 dark:text-neutral-300">Share</span>
              </div>
            </div>
            <div className="flex flex-col space-y-2">
              <div className="flex items-center space-x-2 rounded-xl bg-neutral-200/50 hover:bg-neutral-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 p-4 cursor-pointer">
                <MagicWandIcon className="h-4 w-4 text-neutral-650 dark:text-neutral-300" />
                <span className="text-sm text-neutral-650 dark:text-neutral-300">
                  Regenerate
                </span>
              </div>
              <div className="flex items-center space-x-2 rounded-xl bg-neutral-200/50 hover:bg-neutral-200 dark:bg-zinc-800/50 dark:hover:bg-zinc-800 p-4 text-sm cursor-pointer">
                <LockClosedIcon className="h-4 w-4 text-neutral-650 dark:text-neutral-300" />
                <span className="text-sm text-neutral-650 dark:text-neutral-300">Lock</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
};
