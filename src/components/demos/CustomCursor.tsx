import { motion, useMotionValue, useSpring } from 'motion/react';
import React, { useEffect, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const [isHoveringText, setIsHoveringText] = useState(false);
  const [textSize, setTextSize] = useState(24);
  const [isVisible, setIsVisible] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  // Smooth out the movement
  const springConfig = { damping: 35, stiffness: 500, mass: 0.3 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Only show custom cursor on fine pointers (desktop)
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    const mouseMove = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const mouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target) return;

      // Isolate cursor checks to container wrapper elements
      const inContainer = target.closest('[data-custom-cursor-container="true"]');
      if (!inContainer) {
        setIsHoveringText(false);
        document.body.style.cursor = '';
        return;
      }

      const computedCursor = window.getComputedStyle(target).cursor;
      const isTextTag = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'INPUT', 'TEXTAREA', 'LABEL'].includes(target.tagName);
      const isText = computedCursor === 'text' || isTextTag;

      if (isText) {
        setIsHoveringText(true);
        // Calculate font size for height adjustment
        const fontSizeStr = window.getComputedStyle(target).fontSize;
        const fontSize = parseFloat(fontSizeStr) || 24;
        setTextSize(fontSize);
        document.body.style.cursor = 'none';
      } else {
        setIsHoveringText(false);
        document.body.style.cursor = '';
      }
    };

    const mouseLeave = () => {
      setIsVisible(false);
      setIsHoveringText(false);
      document.body.style.cursor = '';
    };

    window.addEventListener('mousemove', mouseMove);
    window.addEventListener('mouseover', mouseOver);
    document.addEventListener('mouseleave', mouseLeave);

    return () => {
      window.removeEventListener('mousemove', mouseMove);
      window.removeEventListener('mouseover', mouseOver);
      document.removeEventListener('mouseleave', mouseLeave);
      document.body.style.cursor = '';
    };
  }, [cursorX, cursorY, isVisible]);

  if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return null;
  }

  // Only render custom cursor when hovering over text
  if (!isHoveringText) {
    return null;
  }

  const height = textSize * 1.15; // Slightly taller than font-size for better vertical alignment
  const variants = {
    text: { 
      width: 2, 
      height: height, 
      borderRadius: '1px', 
      x: -1, 
      y: -height / 2, 
      backgroundColor: '#ffffff', 
    }
  };

  return (
    <motion.div
      style={{
        position: 'fixed',
        left: 0,
        top: 0,
        x: cursorXSpring,
        y: cursorYSpring,
        pointerEvents: 'none',
        zIndex: 9999,
        opacity: isVisible ? 1 : 0,
      }}
      initial={{ opacity: 0 }}
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.15 }}
    >
      <motion.div
        variants={variants}
        animate="text"
        transition={{ type: 'spring', stiffness: 600, damping: 30 }}
        style={{
            transformOrigin: 'center',
            mixBlendMode: 'difference',
        }}
      />
    </motion.div>
  );
};
