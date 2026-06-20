import {
  PanInfo,
  motion,
  useAnimation,
  useMotionValue,
  useMotionValueEvent,
  useTransform,
} from 'framer-motion';
import { useRef, useState } from 'react';

const menuItems = [
  'Eero Aarnio Ball Chair',
  'Verner Panton Chair',
  'Eero Saarinen Tulip Table',
  'Arne Jacobsen Egg Chair',
  'Joe Colombo Elda Chair',
  'Olivier Mourgue Djinn Chairs',
  'Pierre Paulin Orange Slice Chair',
  'George Nelson Coconut Chair',
  'Isamu Noguchi Coffee Table',
  'Warren Platner Coffee Table',
  'Marc Newson Lockheed Lounge',
  'Vitra Eames Lounge Chair',
  'Mario Bellini Camaleonda Sofa',
  'Eero Aarnio Pastil Chair',
  'Pierre Cardin Dining Table',
  'Marcel Breuer Wassily Chair',
  'Alvar Aalto Savoy Vase',
  'Le Corbusier LC4 Chaise Longue',
  'Eileen Gray Bibendum Chair',
  'Charles and Ray Eames Molded Plastic Chair',
  'Olivetti Synthesis Office Chair',
  'Giancarlo Piretti Plia Chair',
  'Rodolfo Bonetto Boomerang Desk',
  'Richard Sapper Tizio Lamp',
  'Vico Magistretti Maralunga Sofa',
  'Peter Ghyczy Garden Egg Chair',
  'Paulin Globe Chair',
  'Luigi Colani Rotor Table',
  'Ross Lovegrove Go Chair',
  'Ron Arad Well Tempered Chair',
];

const angleIncrement = 360 / menuItems.length;
const dragFactor = 0.012;

export default function DraggableCurvedMenu() {
  const controls = useAnimation();
  const rotation = useMotionValue(0);
  const containerRef = useRef<HTMLDivElement>(null);
  const [middleItem, setMiddleItem] = useState(menuItems[0]);

  useMotionValueEvent(rotation, 'change', (value) => {
    const adjustedRotation = ((value % 360) + 360) % 360;
    const middleIndex =
      Math.round(adjustedRotation / angleIncrement) % menuItems.length;
    const actualMiddleItem =
      menuItems[(menuItems.length - middleIndex) % menuItems.length];
    setMiddleItem(actualMiddleItem);
  });

  const onDrag = (_: any, info: PanInfo) => {
    const currentRotation = rotation.get() + info.delta.y * dragFactor * 40;
    rotation.set(currentRotation);
  };

  const onDragEnd = (_: any, info: PanInfo) => {
    const endRotation = rotation.get() + info.velocity.y * dragFactor * 2;
    controls.start({
      rotate: endRotation,
      transition: { type: 'spring', mass: 0.1, stiffness: 100, damping: 15 },
    });
  };

  const transform = useTransform(rotation, (value) => {
    return `rotate(${value}deg)`;
  });

  return (
    <div
      className="relative flex h-[350px] w-full items-center justify-center overflow-hidden font-sans select-none rounded-2xl bg-neutral-50 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5"
      ref={containerRef}
    >
      {/* Top blur mask overlay */}
      <div
        className="pointer-events-none absolute left-0 top-0 z-50 h-20 w-full bg-neutral-100 dark:bg-[#1d1f27]"
        style={{
          maskImage: 'linear-gradient(to bottom, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to bottom, black, transparent)',
        }}
      />
      
      <motion.div
        className="relative -ml-[650px] flex h-[800px] w-[800px] cursor-grab items-center justify-center active:cursor-grabbing transform-gpu"
        animate={controls}
        style={{
          transformOrigin: 'center center',
          transform,
          rotate: rotation,
        }}
        drag="y"
        onDrag={onDrag}
        onDragEnd={onDragEnd}
      >
        {menuItems.map((item, index) => {
          const rotate = angleIncrement * index;

          return (
            <motion.div
              key={`${item}-${index}`}
              className={`absolute text-[13px] font-bold ${
                item === middleItem
                  ? 'text-neutral-900 dark:text-white scale-110'
                  : 'text-neutral-900/30 dark:text-white/30 scale-95'
              } transition-all duration-150`}
              style={{
                left: '50%',
                transform: `rotate(${rotate}deg) translateX(260px)`,
                transformOrigin: 'left center',
              }}
            >
              {item}
            </motion.div>
          );
        })}
      </motion.div>
      
      {/* Bottom blur mask overlay */}
      <div
        className="pointer-events-none absolute bottom-0 left-0 z-50 h-20 w-full bg-neutral-100 dark:bg-[#1d1f27]"
        style={{
          maskImage: 'linear-gradient(to top, black, transparent)',
          WebkitMaskImage: 'linear-gradient(to top, black, transparent)',
        }}
      />
    </div>
  );
}
