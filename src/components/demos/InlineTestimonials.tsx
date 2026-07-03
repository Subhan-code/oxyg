import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';

const testimonials = [
  { text: "This component library completely changed how fast we build.", author: "Sarah J.", role: "Lead Dev" },
  { text: "The animations are buttery smooth and the code is clean.", author: "Mark T.", role: "Designer" },
  { text: "I can't imagine starting a new project without these.", author: "Elena R.", role: "Founder" },
];

export default function InlineTestimonials() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center bg-black p-8 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[100px] pointer-events-none" />
      
      <div className="max-w-2xl text-center z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tighter text-white mb-8">
          Trusted by developers who <br />
          <span className="text-neutral-500">value perfection</span>
        </h2>
        
        <div className="h-40 flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="flex flex-col items-center"
            >
              <p className="text-xl md:text-3xl font-medium text-white/90 leading-tight mb-6">
                "{testimonials[index].text}"
              </p>
              <div className="flex items-center gap-3">
                <div className="size-10 rounded-full bg-gradient-to-br from-indigo-400 to-purple-600" />
                <div className="text-left">
                  <p className="text-sm font-semibold text-white">{testimonials[index].author}</p>
                  <p className="text-xs text-neutral-400">{testimonials[index].role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
