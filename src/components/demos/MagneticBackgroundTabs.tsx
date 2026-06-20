import React, { useRef, useState } from "react";

const MagneticBackgroundTab = ({
  item,
}: {
  item: { id: number; text: string };
}) => {
  const ref = useRef<HTMLButtonElement>(null);

  const [hoverPosition, setHoverPosition] = useState({
    x: 0,
    y: 0,
    opacity: 0,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const x = (clientX - left - width / 2) * 0.15;
    const y = (clientY - top - height / 2) * 0.15;

    setHoverPosition({ x, y, opacity: 1 });
  };

  const onMouseOut = () => {
    setHoverPosition({ x: 0, y: 0, opacity: 0 });
  };

  return (
    <button
      ref={ref}
      className="relative h-9 px-4 py-2 cursor-pointer transition-transform duration-100 flex items-center justify-center rounded-[6px]"
      onMouseMove={handleMouseMove}
      onMouseLeave={onMouseOut}
    >
      <span className="relative z-10 text-sm font-semibold text-neutral-600 hover:text-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-100 transition-colors">
        {item.text}
      </span>
      <div
        className="absolute inset-0 z-0 rounded-[8px] bg-neutral-200/60 dark:bg-zinc-800 transition-all duration-150 ease-out"
        style={{
          transform: `translate(${hoverPosition.x}px, ${hoverPosition.y}px)`,
          opacity: hoverPosition.opacity,
        }}
      />
    </button>
  );
};

const tabs = [
  { id: 1, text: "Home" },
  { id: 2, text: "Blog" },
  { id: 3, text: "Projects" },
];

export default function MagneticBackgroundTabs() {
  return (
    <div className="flex h-[120px] w-full items-center justify-center font-sans select-none bg-neutral-50 dark:bg-zinc-900/10 border border-neutral-200/50 dark:border-white/5 rounded-2xl p-4">
      <div className="flex flex-row space-x-2">
        {tabs.map((item) => (
          <MagneticBackgroundTab key={item.id} item={item} />
        ))}
      </div>
    </div>
  );
}
