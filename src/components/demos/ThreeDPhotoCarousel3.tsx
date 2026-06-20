import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { useEffect, useState } from "react";

// ── Custom inline useMediaQuery hook to avoid external hooks file dependency ──
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

const IMGS = [
  "https://images.unsplash.com/photo-1718119128153-645258b5b814?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718121279036-13650f74640b?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718113361290-35ca503e6092?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718113360777-8aadd1985ecd?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1717844519228-40f041234a7d?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1717844519137-62f09a0cbcc6?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718034363286-999f294f8523?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718046254440-77bb25734514?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718046254335-d9ff832c9c3c?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718070360743-d7103c38b266?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1717960432608-b6faf49eaeb3?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1717968368310-1110eae34644?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1718058248054-5e7704c3c8ad?q=80&w=600&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1716890385566-dee802c56d2d?q=80&w=600&auto=format&fit=crop",
];

export default function ThreeDPhotoCarousel3() {
  const isScreenSizeSm = useMediaQuery("(max-width: 640px)");
  const cylinderWidth = isScreenSizeSm ? 800 : 1200;
  const faceCount = IMGS.length;
  const faceWidth = cylinderWidth / faceCount;
  const dragFactor = 0.15;
  const radius = cylinderWidth / (8 * Math.PI);

  const rotation = useMotionValue(0);
  const controls = useAnimation();

  const handleDrag = (_: any, info: PanInfo) => {
    rotation.set(rotation.get() + info.delta.x * dragFactor * 2.5);
  };

  const handleDragEnd = (_: any, info: PanInfo) => {
    controls.start({
      rotateY: rotation.get() + info.velocity.x * dragFactor * 0.4,
      transition: { type: "spring", stiffness: 80, damping: 25, mass: 0.1 },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate3d(0, 1, 0, ${value}deg)`;
  });

  return (
    <div className="relative h-[260px] w-full overflow-hidden select-none bg-neutral-900 rounded-2xl flex items-center justify-center">
      <span className="absolute top-2 text-[10px] font-mono text-neutral-450 tracking-wider z-20">
        Drag horizontally to spin
      </span>
      <div
        className="flex h-full items-center justify-center relative w-full"
        style={{
          perspective: "1000px",
          transformStyle: "preserve-3d",
        }}
      >
        <motion.div
          drag="x"
          className="relative flex h-full origin-center cursor-grab justify-center active:cursor-grabbing items-center"
          style={{
            transform: transform,
            rotateY: rotation,
            width: cylinderWidth,
            transformStyle: "preserve-3d",
          }}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          animate={controls}
        >
          {IMGS.map((url, i) => {
            return (
              <div
                key={i}
                className="absolute flex h-full origin-center items-center justify-center p-2"
                style={{
                  width: `${faceWidth}px`,
                  transform: `rotateY(${
                    i * (360 / faceCount)
                  }deg) translateZ(${radius}px) rotateY(90deg)`,
                }}
              >
                <img
                  src={url}
                  alt="img"
                  className="pointer-events-none h-24 w-full rounded-md object-cover border border-white/5 shadow-md"
                />
              </div>
            );
          })}
        </motion.div>
      </div>
    </div>
  );
}
