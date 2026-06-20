import {
  motion,
  useMotionValue,
  useTransform,
  useMotionValueEvent,
} from "motion/react";
import { useState } from "react";

export const FoldableMap = () => {
  const xDrag = useMotionValue(0);
  const [isFolded, setIsFolded] = useState(true);
  const xLeftSection = useTransform(xDrag, [0, 300], ["100%", "0%"]);
  const xRightSection = useTransform(xDrag, [0, 300], ["-100%", "0%"]);
  const centerScale = useTransform(xDrag, [150, 300], [0, 1]);
  const centerBrightness = useTransform(xDrag, [150, 300], [0.2, 1]);

  useMotionValueEvent(xDrag, "change", (currentX) => {
    if (currentX > 260) {
      setIsFolded(false);
    } else {
      setIsFolded(true);
    }
  });

  return (
    <div className="flex bg-[#f2f2f7] dark:bg-neutral-900 rounded-3xl min-h-[400px] items-center justify-center overflow-hidden py-16 relative w-full border border-neutral-200/50 dark:border-neutral-800">
      <motion.div
        animate={isFolded ? "folded" : "open"}
        variants={{
          open: { scale: 1 },
          folded: { scale: 0.9 },
        }}
        initial="folded"
        className="relative flex flex-col items-center max-w-[650px] w-full px-4"
      >
        <motion.div
          variants={{ open: { rotate: 0 }, hovering: { rotate: 0 } }}
          whileHover="hovering"
          initial={{ rotate: 3 }}
          className="grid aspect-video w-full p-4 relative z-0"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          <div className="grid grid-cols-3 [grid-area:1/1] w-full h-[250px] md:h-[300px]">
            <motion.div
              style={{ x: xLeftSection, skewY: "-8deg", transformOrigin: "bottom right" }}
              className="map-image border-r border-white/20 shadow-2xl rounded-l-xl"
            />
            <motion.div
              style={{
                scaleX: centerScale,
                "--brightness": centerBrightness,
                transformOrigin: "center"
              } as any}
              className="map-image brightness-[--brightness] border-x border-white/10"
            />
            <motion.div
              style={{ x: xRightSection, skewY: "8deg", transformOrigin: "bottom left" }}
              className="map-image border-l border-white/20 shadow-2xl rounded-r-xl"
            />
          </div>
          <motion.div
            drag="x"
            style={{ x: xDrag }}
            dragConstraints={{ left: 0, right: 300 }}
            dragTransition={{
              modifyTarget: (target) => {
                return target > 150 ? 300 : 0;
              },
              timeConstant: 45,
            }}
            className="absolute inset-0 z-10 cursor-grab active:cursor-grabbing"
          />
        </motion.div>
        
        <motion.div
          variants={{
            folded: {
              opacity: 0,
              scale: 0.9,
              y: 20,
            },
            open: {
              opacity: 1,
              scale: 1,
              y: 0,
            },
          }}
          className="flex w-full justify-center text-[15px] font-semibold mt-4"
        >
          <p className="rounded-full bg-white dark:bg-neutral-800 px-6 py-2.5 text-[#007aff] dark:text-blue-400 shadow-md border border-neutral-100 dark:border-neutral-800">
            Swipe right on the map to unfold it! 🗺️
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};
