import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

const BlurDiv = ({
  blurValue,
  gradientStops,
  zIndex,
  className,
}: {
  blurValue: number;
  gradientStops: string;
  zIndex: number;
  className?: string;
}) => (
  <div
    className={cn(
      'pointer-events-none absolute inset-0 h-full w-full',
      className
    )}
    style={{
      zIndex,
      backdropFilter: `blur(${blurValue}px)`,
      WebkitBackdropFilter: `blur(${blurValue}px)`,
      maskImage: `linear-gradient(to left, ${gradientStops})`,
      WebkitMaskImage: `linear-gradient(to left, ${gradientStops})`,
    }}
  />
);

const marqueeVariants = {
  animate: {
    x: ['0%', '-50%'],
    transition: {
      x: {
        repeat: Infinity,
        repeatType: 'loop' as const,
        duration: 40,
        ease: 'linear' as const,
      },
    },
  },
};

export const ProgressiveBlur = () => {
  return (
    <>
      <div className="relative flex h-[280px] w-full items-center justify-center overflow-hidden border border-neutral-200/50 dark:border-white/5 rounded-2xl bg-neutral-50 dark:bg-zinc-900/10">
        <motion.div
          className="absolute flex whitespace-nowrap text-black dark:text-white"
          variants={marqueeVariants}
          animate="animate"
        >
          {Array(10)
            .fill(null)
            .map((_, i) => (
              <span
                key={i}
                className="mr-8 inline-block text-neutral-900 dark:text-neutral-100 font-semibold"
              >
                {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. `}
              </span>
            ))}
        </motion.div>
        <div className="pointer-events-none absolute bottom-0 left-0 top-0 z-10 w-[300px]">
          <div className="relative h-full w-full">
            <BlurDiv
              zIndex={1}
              blurValue={0.25}
              gradientStops="rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 1) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 0) 37.5%"
            />
            <BlurDiv
              zIndex={2}
              blurValue={0.5}
              gradientStops="rgba(0, 0, 0, 0) 12.5%, rgba(0, 0, 0, 1) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 0) 50%"
            />
            <BlurDiv
              zIndex={3}
              blurValue={0.75}
              gradientStops="rgba(0, 0, 0, 0) 25%, rgba(0, 0, 0, 1) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 0) 62.5%"
            />
            <BlurDiv
              zIndex={4}
              blurValue={1}
              gradientStops="rgba(0, 0, 0, 0) 37.5%, rgba(0, 0, 0, 1) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 0) 75%"
            />
            <BlurDiv
              zIndex={5}
              blurValue={1.25}
              gradientStops="rgba(0, 0, 0, 0) 50%, rgba(0, 0, 0, 1) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 0) 87.5%"
            />
            <BlurDiv
              zIndex={6}
              blurValue={1.5}
              gradientStops="rgba(0, 0, 0, 0) 62.5%, rgba(0, 0, 0, 1) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 0) 100%"
            />
            <BlurDiv
              zIndex={7}
              blurValue={2}
              gradientStops="rgba(0, 0, 0, 0) 75%, rgba(0, 0, 0, 1) 87.5%, rgba(0, 0, 0, 1) 100%"
            />
            <BlurDiv
              zIndex={8}
              blurValue={2.5}
              gradientStops="rgba(0, 0, 0, 0) 87.5%, rgba(0, 0, 0, 1) 100%"
              className="bg-neutral-50 dark:bg-zinc-900"
            />
          </div>
        </div>
      </div>
    </>
  );
};
