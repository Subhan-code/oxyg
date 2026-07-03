import React, { useState } from 'react';
import { motion } from 'motion/react';

export default function AppleSwitch() {
  const [isOn, setIsOn] = useState(false);

  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-8">
      <div className="mb-10 text-center">
        <h2 className="text-2xl font-semibold mb-2">Apple Switch</h2>
        <p className="text-foreground/50">Custom animated toggle switch</p>
      </div>
      
      <div 
        className={`w-28 h-16 rounded-full p-1 cursor-pointer transition-colors duration-300 ease-in-out flex shadow-inner ${isOn ? 'bg-green-500' : 'bg-neutral-800'}`}
        onClick={() => setIsOn(!isOn)}
        style={{ justifyContent: isOn ? 'flex-end' : 'flex-start' }}
      >
        <motion.div 
          layout
          transition={{
            type: "spring",
            stiffness: 700,
            damping: 40
          }}
          className="h-full aspect-square bg-white rounded-full shadow-md flex items-center justify-center"
        >
          {/* Optional internal design of the thumb */}
          {isOn && (
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="w-1.5 h-6 bg-green-500/20 rounded-full"
            />
          )}
        </motion.div>
      </div>
      <p className="mt-8 font-medium text-lg text-foreground/80">
        Status: <span className={isOn ? 'text-green-500' : 'text-neutral-500'}>{isOn ? 'ON' : 'OFF'}</span>
      </p>
    </div>
  );
}
