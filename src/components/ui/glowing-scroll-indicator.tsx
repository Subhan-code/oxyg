'use client';

import { motion, MotionValue, useMotionValue, useTransform } from 'framer-motion';
import React, { useEffect, useRef } from 'react';

const BARS = 32;

const ScrollBar: React.FC<{
    index: number;
    scrollProgress: MotionValue<number>;
}> = ({
    index,
    scrollProgress
}) => {
    const thisBarPosition = index / BARS;
    const preStep = Math.max(0, (index - 3) / BARS);
    const postStep = Math.min(1, (index + 3) / BARS);

    const height = useTransform(
        scrollProgress,
        [0, preStep, thisBarPosition, postStep, 1],
        [5, 14, 38, 14, 5]
    );
    const opacity = useTransform(
        scrollProgress,
        [0, preStep, thisBarPosition, postStep, 1],
        [0.15, 0.45, 1, 0.45, 0.15]
    );
    const width = useTransform(scrollProgress, [0, thisBarPosition, 1], [1.5, 4.5, 1.5]);

    return (
        <motion.div
            className="bg-black dark:bg-white rounded-full transition-colors"
            style={{
                height: height,
                opacity: useTransform(opacity, (value) => `${value}`),
                width: useTransform(width, (value) => `${value}px`)
            }}
        />
    );
};

interface GlowingScrollIndicatorProps {
    scrollContainerId?: string;
    direction?: 'vertical' | 'horizontal';
}

export function GlowingScrollIndicator({
    scrollContainerId,
    direction = 'horizontal'
}: GlowingScrollIndicatorProps) {
    const containerRef = useRef<HTMLDivElement>(null);
    const progress = useMotionValue(0.5); // Start centered
    const dragX = useMotionValue(0);

    const updateProgress = () => {
        if (containerRef.current) {
            const width = containerRef.current.offsetWidth;
            const currentX = dragX.get();
            const clampedX = Math.max(0, Math.min(width, currentX));
            progress.set(clampedX / width);
        }
    };

    // Center the stick initially
    useEffect(() => {
        const centerInitially = () => {
            if (containerRef.current) {
                const width = containerRef.current.offsetWidth;
                dragX.set(width / 2);
                progress.set(0.5);
            }
        };
        // Small timeout to ensure the layout has rendered completely
        const timer = setTimeout(centerInitially, 100);
        return () => clearTimeout(timer);
    }, [dragX, progress]);

    return (
        <div 
            ref={containerRef} 
            className="relative flex items-end justify-between w-full max-w-[280px] h-20 pb-2 px-2 select-none"
        >
            {/* The Columns/Bars */}
            <div className="absolute inset-x-2 bottom-2 flex items-end justify-between pointer-events-none h-10">
                {Array.from({ length: BARS }).map((_, index) => (
                    <ScrollBar
                        key={`scroll-bar-${index}`}
                        index={index}
                        scrollProgress={progress}
                    />
                ))}
            </div>

            {/* Draggable Red Stick handle */}
            <motion.div
                drag="x"
                dragConstraints={containerRef}
                dragElastic={0}
                dragMomentum={false}
                style={{ x: dragX }}
                onDrag={updateProgress}
                className="absolute bottom-0 left-0 w-8 h-20 -ml-4 flex flex-col items-center justify-end cursor-ew-resize z-30"
            >
                {/* Red Line */}
                <div className="w-1 h-12 bg-red-600 relative">
                    {/* Circular handle at the top */}
                    <div className="w-3.5 h-3.5 rounded-full shadow-[0_0_8px_#ef4444] bg-red-500 absolute -top-1.5 left-1/2 -translate-x-1/2" />
                </div>
            </motion.div>
        </div>
    );
}

export default GlowingScrollIndicator;
