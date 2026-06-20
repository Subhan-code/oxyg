import React, { useRef, useState } from 'react';
import { HTMLMotionProps, motion } from 'motion/react';

export const MagneticButton: React.FC<HTMLMotionProps<"button">> = ({
  children,
  className = '',
  onMouseMove,
  onMouseLeave,
  ...props
}) => {
  const ref = useRef<HTMLButtonElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!ref.current) return;
    const { clientX, clientY } = e;
    const { height, width, left, top } = ref.current.getBoundingClientRect();
    const middleX = clientX - (left + width / 2);
    const middleY = clientY - (top + height / 2);
    // Subtle magnetic pull for the button itself
    setPosition({ x: middleX * 0.15, y: middleY * 0.15 });

    if (onMouseMove) onMouseMove(e);
  };

  const handleMouseLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
    setPosition({ x: 0, y: 0 });
    if (onMouseLeave) onMouseLeave(e);
  };

  return (
    <motion.button
      ref={ref}
      data-magnetic="true"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      animate={{ x: position.x, y: position.y }}
      transition={{ type: "spring", stiffness: 350, damping: 20, mass: 0.5 }}
      className={`relative ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
}
