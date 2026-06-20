import React, { useState, useEffect } from 'react';

interface AdaptiveCaretProps {
  text: string;
  cursorPosition: number;
  fontSize?: number; // in pixels
  inputRef: React.RefObject<HTMLTextAreaElement | HTMLInputElement | null>;
}

export const AdaptiveCaret: React.FC<AdaptiveCaretProps> = ({
  text,
  cursorPosition,
  fontSize = 16,
  inputRef,
}) => {
  const [caretCoords, setCaretCoords] = useState({ top: 0, left: 0 });
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const handleSelectionChange = () => {
      const input = inputRef.current;
      if (!input || document.activeElement !== input) {
        setIsFocused(false);
        return;
      }
      setIsFocused(true);

      // Create a dummy element to replicate input styles and calculate exact text coordinates
      const dummy = document.createElement('div');
      const computedStyle = window.getComputedStyle(input);

      // Copy essential layout styles
      const stylesToCopy = [
        'fontFamily',
        'fontSize',
        'fontWeight',
        'lineHeight',
        'paddingLeft',
        'paddingRight',
        'paddingTop',
        'paddingBottom',
        'borderWidth',
        'boxSizing',
        'width',
        'letterSpacing',
      ] as const;

      stylesToCopy.forEach((prop) => {
        (dummy.style as any)[prop] = (computedStyle as any)[prop];
      });

      dummy.style.position = 'absolute';
      dummy.style.visibility = 'hidden';
      // For textarea use pre-wrap, for input use pre
      dummy.style.whiteSpace = input.tagName.toLowerCase() === 'textarea' ? 'pre-wrap' : 'pre';
      dummy.style.wordBreak = 'break-word';

      // Inject text up to the cursor position
      let textBeforeCursor = text.substring(0, cursorPosition);
      // Ensure trailing newlines still take up physical space
      if (textBeforeCursor.endsWith('\n')) {
        textBeforeCursor += ' ';
      }
      
      dummy.textContent = textBeforeCursor;

      // Add a marker span to get the exact trailing coordinate
      const marker = document.createElement('span');
      // Using a zero-width space is generally safer than a pipe
      marker.textContent = '\u200B'; 
      dummy.appendChild(marker);

      document.body.appendChild(dummy);
      
      const markerRect = marker.getBoundingClientRect();
      const dummyRect = dummy.getBoundingClientRect();
      
      // Clean up body immediately to prevent layout shifts
      document.body.removeChild(dummy);

      // Calculate relative coordinates inside the dummy container 
      // (which shares padding/border widths natively with the input!)
      const top = markerRect.top - dummyRect.top - input.scrollTop;
      const left = markerRect.left - dummyRect.left - input.scrollLeft;

      setCaretCoords({
        top,
        left,
      });
    };

    document.addEventListener('selectionchange', handleSelectionChange);
    // Also attach to input events and resize
    const input = inputRef.current;
    if (input) {
      input.addEventListener('input', handleSelectionChange);
      input.addEventListener('keyup', handleSelectionChange);
      input.addEventListener('click', handleSelectionChange);
      input.addEventListener('scroll', handleSelectionChange);
    }
    window.addEventListener('resize', handleSelectionChange);

    // Initial check
    handleSelectionChange();

    return () => {
      document.removeEventListener('selectionchange', handleSelectionChange);
      if (input) {
        input.removeEventListener('input', handleSelectionChange);
        input.removeEventListener('keyup', handleSelectionChange);
        input.removeEventListener('click', handleSelectionChange);
        input.removeEventListener('scroll', handleSelectionChange);
      }
      window.removeEventListener('resize', handleSelectionChange);
    };
  }, [text, cursorPosition, inputRef]);

  if (!isFocused) return null;

  return (
    <div
      className="absolute bg-[#007aff] pointer-events-none z-10 transition-[left,top,width,height] duration-75"
      style={{
        top: `${caretCoords.top}px`,
        left: `${caretCoords.left}px`,
        height: `${fontSize}px`,
        // Adapts thickness based on font size scale
        width: `${Math.max(2, fontSize * 0.08)}px`,
        // Pulsing animation that resets when typing happens often
        animation: 'caretBlink 1s step-end infinite',
        transform: 'translateY(10%)',
      }}
    />
  );
};
