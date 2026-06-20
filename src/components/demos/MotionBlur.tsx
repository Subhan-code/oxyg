import { cn } from "@/lib/utils";
import { useState } from "react";

export const MotionBlur = () => {
  const [hasMotionBlur, setToggleMotionBlur] = useState(false);

  return (
    <>
      <div className="group container relative h-[300px] w-full p-12 overflow-hidden flex items-center justify-center">
        <button
          className="absolute left-4 top-2 text-[11px] font-mono border border-neutral-200 dark:border-white/5 bg-white dark:bg-zinc-800 text-neutral-800 dark:text-neutral-200 px-2.5 py-1 rounded-full cursor-pointer hover:bg-neutral-50 dark:hover:bg-zinc-700 active:scale-95 transition-all select-none"
          onClick={() => setToggleMotionBlur(!hasMotionBlur)}
        >
          Blur: {hasMotionBlur ? `ON` : `OFF`}
        </button>
        <div
          className={cn(
            "animate-move h-9 w-9 rounded-full bg-blue-700",
            hasMotionBlur && "animate-motion-blur"
          )}
        />
      </div>
      <style>{`
        .animate-move {
          transition: all 0.75s ease-in-out 0ms;
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          left: 10%;
        }

        .container:hover .animate-move {
          left: 80%;
        }

        .animate-motion-blur {
          animation: move-out-motion-blur 0.75s ease-in-out 0ms both;
        }

        .container:hover .animate-motion-blur {
          animation: move-in-motion-blur 0.75s ease-in-out 0ms both;
        }

        @keyframes move-in-motion-blur {
          0%,
          100% {
            box-shadow: none;
            filter: blur(0);
          }
          50% {
            box-shadow: -10px 0 1px rgba(29, 78, 216, 0.9),
              -20px 0 10px rgba(29, 78, 216, 0.8),
              -30px 0 4px rgba(29, 78, 216, 0.7),
              -40px 0 10px rgba(29, 78, 216, 0.6);
            filter: blur(2px);
          }
        }

        @keyframes move-out-motion-blur {
          0%,
          100% {
            box-shadow: none;
            filter: blur(0);
          }
          50% {
            box-shadow: 10px 0 1px rgba(29, 78, 216, 0.9),
              20px 0 10px rgba(29, 78, 216, 0.8),
              30px 0 4px rgba(29, 78, 216, 0.7),
              40px 0 10px rgba(29, 78, 216, 0.6);
            filter: blur(2px);
          }
        }
      `}</style>
    </>
  );
};
