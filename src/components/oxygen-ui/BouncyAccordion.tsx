import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../../lib/utils';
import { BookOpen, Award, Calendar, ShoppingCart, AlertTriangle, Wallet, ChevronDown } from 'lucide-react';

const accordionData = [
  { id: 1, title: 'Type Shit', icon: BookOpen, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 2, title: 'Star Great', icon: Award, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 3, title: 'Schedule', icon: Calendar, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 4, title: 'Buy Stuff', icon: ShoppingCart, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 5, title: 'Triangle Warning', icon: AlertTriangle, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
  { id: 6, title: 'Account bal', icon: Wallet, content: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam, quos! Fugiat earum maiores nostrum dolores ipsum.' },
];

export const BouncyAccordion = () => {
  const [openId, setOpenId] = useState<number | null>(null);

  return (
    <div className="w-[320px] flex flex-col items-stretch">
      <div className="flex flex-col gap-0 items-stretch">
        <AnimatePresence initial={false}>
          {accordionData.map((item, index) => {
            const isOpen = openId === item.id;
            
            // Calculate dynamic border radius based on open state
            const isFirst = index === 0;
            const isLast = index === accordionData.length - 1;
            const isNextOpen = index < accordionData.length - 1 && openId === accordionData[index + 1].id;
            const isPrevOpen = index > 0 && openId === accordionData[index - 1].id;

            let borderRadius = "0px";
            if (isOpen) {
              borderRadius = "20px";
            } else if (openId === null) {
              if (isFirst) borderRadius = "20px 20px 0 0";
              else if (isLast) borderRadius = "0 0 20px 20px";
              else borderRadius = "0px";
            } else {
              // When something is open, items might need rounded corners if they border the open item or the edges
              if (isFirst && isNextOpen) borderRadius = "20px";
              else if (isFirst) borderRadius = "20px 20px 0 0";
              else if (isLast && isPrevOpen) borderRadius = "20px";
              else if (isLast) borderRadius = "0 0 20px 20px";
              else if (isPrevOpen || isNextOpen) borderRadius = "20px";
              else borderRadius = "0px";
            }

            return (
              <motion.div
                key={item.id}
                layout
                initial={false}
                animate={{
                  borderRadius,
                  marginBottom: isOpen ? 8 : (isNextOpen ? 8 : 0),
                  marginTop: isOpen ? (isFirst ? 0 : 8) : 0,
                  backgroundColor: isOpen ? "rgba(255, 255, 255, 0.1)" : "rgba(255, 255, 255, 0.03)"
                }}
                transition={{ type: "spring", bounce: 0.3, duration: 0.6 }}
                className="overflow-hidden cursor-pointer backdrop-blur-md border border-border/20"
                onClick={() => setOpenId(isOpen ? null : item.id)}
              >
                <div className="flex items-center gap-3 px-4 py-3 min-h-[50px] relative">
                  <div className="relative text-foreground opacity-80 z-10 flex items-center justify-center bg-foreground/10 p-1.5 rounded-xl">
                    <item.icon size={18} strokeWidth={1.5} />
                  </div>
                  <span className="text-sm tracking-tight text-foreground/80 font-medium z-10 select-none">
                    {item.title}
                  </span>
                  
                  <motion.div
                    animate={{ rotate: isOpen ? 180 : 0 }}
                    transition={{ type: "spring", bounce: 0.3, duration: 0.5 }}
                    className="ml-auto text-foreground/50 z-10"
                  >
                    <ChevronDown size={16} />
                  </motion.div>
                </div>
                
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="content"
                      initial="collapsed"
                      animate="open"
                      exit="collapsed"
                      variants={{
                        open: { opacity: 1, height: "auto", filter: "blur(0px)" },
                        collapsed: { opacity: 0, height: 0, filter: "blur(4px)" }
                      }}
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                    >
                      <div className="px-4 pb-4 pt-1 text-sm text-foreground/50 leading-relaxed z-10 relative">
                        {item.content}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default BouncyAccordion;


