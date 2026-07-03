"use client";

import { cn } from "../../lib/utils";
import { cva, VariantProps } from "class-variance-authority";
import {
  FC,
  HTMLAttributes,
  memo,
  ReactNode,
  useEffect,
  useState,
} from "react";

// ─── Keyframe variants ────────────────────────────────────────────────────────

const flipUnitVariants = cva(
  "relative subpixel-antialiased perspective-[1000px] rounded-md overflow-hidden select-none",
  {
    variants: {
      size: {
        sm: "w-10 min-w-10 h-14 text-3xl",
        md: "w-14 min-w-14 h-20 text-5xl",
        lg: "w-17 min-w-17 h-24 text-6xl",
        xl: "w-22 min-w-22 h-32 text-8xl",
      },
      variant: {
        default: "bg-primary text-primary-foreground",
        secondary: "bg-secondary text-secondary-foreground",
        destructive: "bg-destructive text-destructive-foreground",
        outline: "border border-input bg-background text-foreground",
        muted: "bg-muted text-muted-foreground",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

// ─── FlipUnit ─────────────────────────────────────────────────────────────────

interface FlipUnitProps
  extends HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof flipUnitVariants> {
  digit: number | string;
}

const commonCardStyle = cn("absolute inset-x-0 overflow-hidden h-1/2 bg-inherit text-inherit");

const FlipUnit: FC<FlipUnitProps> = memo(function FlipUnit({ digit, size, variant, className }) {
  const [prevDigit, setPrevDigit] = useState(digit);
  const [flipping, setFlipping] = useState(false);

  useEffect(() => {
    if (digit !== prevDigit) {
      setFlipping(true);
      const timer = setTimeout(() => {
        setFlipping(false);
        setPrevDigit(digit);
      }, 550);
      return () => clearTimeout(timer);
    }
  }, [digit, prevDigit]);

  return (
    <div className={cn(flipUnitVariants({ size, variant }), className)}>
      {/* Background Top – new digit waiting */}
      <div className={cn(commonCardStyle, "rounded-t-lg top-0")}>
        <DigitSpan position="top">{digit}</DigitSpan>
      </div>
      {/* Background Bottom – old digit staying */}
      <div className={cn(commonCardStyle, "rounded-b-lg translate-y-full")}>
        <DigitSpan position="bottom">{prevDigit}</DigitSpan>
      </div>
      {/* Top Flap – old digit falling down */}
      <div
        className={cn(
          commonCardStyle,
          "z-20 origin-bottom backface-hidden rounded-t-lg",
          flipping && "flip-clock-flip-top"
        )}
      >
        <DigitSpan position="top">{prevDigit}</DigitSpan>
      </div>
      {/* Bottom Flap – new digit appearing */}
      <div
        className={cn(
          commonCardStyle,
          "z-10 origin-top backface-hidden rounded-b-lg translate-y-full",
          flipping && "flip-clock-flip-bottom"
        )}
        style={{ transform: "rotateX(90deg)" }}
      >
        <DigitSpan position="bottom">{digit}</DigitSpan>
      </div>
      {/* Center Divider */}
      <div className="absolute top-1/2 left-0 w-full h-px -translate-y-1/2 bg-background/50 z-30" />
    </div>
  );
});

function DigitSpan({ children, position }: { children: ReactNode; position?: "top" | "bottom" }) {
  return (
    <span
      className="absolute left-0 right-0 w-full flex items-center justify-center h-[200%]"
      style={{ top: position === "top" ? "0%" : "-100%" }}
    >
      {children}
    </span>
  );
}

// ─── FlipClock ────────────────────────────────────────────────────────────────

const flipClockVariants = cva(
  "relative flex justify-center items-center font-mono font-medium",
  {
    variants: {
      size: {
        sm: "text-3xl space-x-1",
        md: "text-5xl space-x-2",
        lg: "text-6xl space-x-2",
        xl: "text-8xl space-x-3",
      },
      variant: {
        default: "",
        secondary: "",
        destructive: "",
        outline: "",
        muted: "",
      },
    },
    defaultVariants: { size: "md", variant: "default" },
  }
);

type FlipClockSize = NonNullable<VariantProps<typeof flipClockVariants>["size"]>;

const heightMap: Record<FlipClockSize, string> = {
  sm: "text-4xl",
  md: "text-5xl",
  lg: "text-6xl",
  xl: "text-8xl",
};

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }
const EMPTY_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 };

function ClockSeparator({ size }: { size?: FlipClockSize }) {
  return (
    <span className={cn("text-center -translate-y-[8%]", size ? heightMap[size] : heightMap["md"])}>
      :
    </span>
  );
}

export interface FlipClockProps
  extends VariantProps<typeof flipClockVariants>,
    HTMLAttributes<HTMLDivElement> {
  countdown?: boolean;
  targetDate?: Date;
  showDays?: "auto" | "always" | "never";
  className?: string;
}

export function FlipClock({
  countdown = false,
  targetDate,
  size,
  variant,
  showDays = "auto",
  className,
  ...props
}: FlipClockProps) {
  const [time, setTime] = useState<TimeLeft>(EMPTY_TIME);

  useEffect(() => {
    setTime(getTime(countdown, targetDate));
    const timer = setInterval(() => {
      const next = getTime(countdown, targetDate);
      setTime(prev => {
        if (prev.seconds === next.seconds && prev.minutes === next.minutes) return prev;
        return next;
      });
    }, 250);
    return () => clearInterval(timer);
  }, [countdown, targetDate]);

  const daysStr    = String(time.days).padStart(3, "0");
  const hoursStr   = String(time.hours).padStart(2, "0");
  const minutesStr = String(time.minutes).padStart(2, "0");
  const secondsStr = String(time.seconds).padStart(2, "0");

  const shouldShowDays =
    countdown && (showDays === "always" || (showDays === "auto" && time.days > 0));

  return (
    <div
      className={cn(flipClockVariants({ size, variant }), className)}
      aria-live="polite"
      {...props}
    >
      <span className="sr-only absolute">{`${time.hours}:${time.minutes}:${time.seconds}`}</span>
      {shouldShowDays && (
        <>
          {daysStr.split("").map((d, i) => (
            <FlipUnit key={`d-${i}`} digit={d} size={size} variant={variant} />
          ))}
          <ClockSeparator size={size!} />
        </>
      )}
      {hoursStr.split("").map((d, i) => (
        <FlipUnit key={`hour-${i}`} digit={d} size={size} variant={variant} />
      ))}
      <ClockSeparator size={size!} />
      {minutesStr.split("").map((d, i) => (
        <FlipUnit key={`min-${i}`} digit={d} size={size} variant={variant} />
      ))}
      <ClockSeparator size={size!} />
      {secondsStr.split("").map((d, i) => (
        <FlipUnit key={`sec-${i}`} digit={d} size={size} variant={variant} />
      ))}
    </div>
  );
}

function getTime(countdown: boolean, targetDate?: Date): TimeLeft {
  const now = new Date();
  if (!countdown) {
    return { days: 0, hours: now.getHours(), minutes: now.getMinutes(), seconds: now.getSeconds() };
  }
  if (!targetDate) return EMPTY_TIME;
  const diff = Math.max(0, targetDate.getTime() - now.getTime());
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export default FlipClock;


