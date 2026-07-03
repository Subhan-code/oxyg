import React, { useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { cn } from '@/lib/utils';

interface MediaBetweenTextProps {
  firstText: string;
  secondText: string;
  mediaUrl: string;
  mediaType?: 'video' | 'image';
  triggerType?: 'hover' | 'inView' | 'scroll';
  useInViewOptionsProp?: any;
  containerRef?: React.RefObject<any>;
  mediaContainerClassName?: string;
  className?: string;
  animationVariants?: {
    initial: any;
    animate: any;
  };
}

export default function MediaBetweenText({
  firstText,
  secondText,
  mediaUrl,
  mediaType = 'video',
  triggerType = 'inView',
  useInViewOptionsProp,
  containerRef,
  mediaContainerClassName,
  className,
  animationVariants,
}: MediaBetweenTextProps) {
  const localRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(localRef, useInViewOptionsProp || { once: false, amount: 0.5 });

  const isTriggerInView = triggerType === 'inView';
  const shouldAnimate = isTriggerInView ? isInView : true;

  return (
    <div
      ref={localRef}
      className={cn("inline-flex items-center justify-center font-sans tracking-tight", className)}
    >
      <span>{firstText}</span>
      <motion.div
        className={cn("relative overflow-hidden inline-block rounded-md", mediaContainerClassName)}
        initial={animationVariants?.initial || { width: 0 }}
        animate={shouldAnimate ? (animationVariants?.animate || { width: '80px' }) : (animationVariants?.initial || { width: 0 })}
      >
        {mediaType === 'video' ? (
          <video
            src={mediaUrl}
            loop
            muted
            playsInline
            autoPlay
            className="w-full h-full object-cover absolute inset-0 rounded-[inherit]"
          />
        ) : (
          <img
            src={mediaUrl}
            alt="media"
            className="w-full h-full object-cover absolute inset-0 rounded-[inherit]"
          />
        )}
      </motion.div>
      <span>{secondText}</span>
    </div>
  );
}
