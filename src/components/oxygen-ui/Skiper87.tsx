import React from "react";

import { ScrollArea } from "@/components/ui/scroll-area";

const Skiper87 = () => {
  return (
    <div className="bg-muted flex h-full w-full flex-col items-center justify-center gap-10">
      <style>{`
        .scroll-fade-container [data-radix-scroll-area-viewport] {
          --size: 40px;
          display: block;
          
          /* Original standard */
          mask-image: linear-gradient(to bottom, #fff, #0000), linear-gradient(to bottom, #fff 0 100%), linear-gradient(to top, #fff, #0000);
          mask-size: 100% 0, 100% 100%, 100% var(--size);
          mask-repeat: no-repeat;
          mask-composite: exclude;
          mask-position: 0 0, 0 0, 0 100%;
          
          /* Safari/Chrome prefix logic */
          -webkit-mask-image: linear-gradient(to bottom, #fff, #0000), linear-gradient(to bottom, #fff 0 100%), linear-gradient(to top, #fff, #0000);
          -webkit-mask-size: 100% 0, 100% 100%, 100% var(--size);
          -webkit-mask-repeat: no-repeat;
          -webkit-mask-composite: xor;
          -webkit-mask-position: 0 0, 0 0, 0 100%;

          animation-timing-function: linear;
          animation-timeline: scroll(self block);
          animation-range: 0 var(--size), calc(100% - var(--size)) 100%;
          
          animation-name: skiper87-size-up, skiper87-size-down;
          animation-fill-mode: both;
        }

        @keyframes skiper87-size-up {
          to {
            mask-size: 100% var(--size), 100% 100%, 100% var(--size);
            -webkit-mask-size: 100% var(--size), 100% 100%, 100% var(--size);
          }
        }

        @keyframes skiper87-size-down {
          to {
            mask-size: 100% var(--size), 100% 100%, 100% 0;
            -webkit-mask-size: 100% var(--size), 100% 100%, 100% 0;
          }
        }
      `}</style>
      <div className="-mt-10 mb-20 grid content-start justify-items-center gap-6 text-center">
        <span className="after:to-foreground relative max-w-[12ch] text-xs uppercase leading-tight opacity-40 after:absolute after:left-1/2 after:top-full after:h-16 after:w-px after:bg-gradient-to-b after:from-transparent after:content-['']">
          see the fade while scroll
        </span>
      </div>
      <div className="rounded-xl border scroll-fade-container">
        <ScrollArea className="w-62 h-72 rounded-xl">
          <div className="space-y-1 p-1">
            {Array.from({ length: 11 }).map((_, index) => (
              <div
                key={index}
                className="text-foreground/30 hover:bg-foreground/10 bg-foreground/5 flex h-10 w-full items-center gap-2 rounded-lg px-4"
              >
                00{index} <div className="bg-foreground/10 h-px flex-1"></div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
};

export { Skiper87 };
