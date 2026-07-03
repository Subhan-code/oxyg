"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { PricingSection1 } from '../oxygen-ui/pricing-section-1';
import { PricingSection2 } from '../oxygen-ui/pricing-section-2';
import { PricingSection3 } from '../oxygen-ui/pricing-section-3';
import { PricingSection4 } from '../oxygen-ui/pricing-section-4';

type SectionKey = 'section1' | 'section2' | 'section3' | 'section4';

export function PricingSectionsDemo() {
  const [activeTab, setActiveTab] = useState<SectionKey>('section1');

  const tabs = [
    { id: 'section1', label: 'Standard Dual' },
    { id: 'section2', label: 'Detailed Grid' },
    { id: 'section3', label: 'Frequency Switch' },
    { id: 'section4', label: 'Compact Split' }
  ] as const;

  return (
    <div className="w-full max-w-5xl mx-auto p-6 space-y-8 min-h-[70vh] flex flex-col justify-start">
      {/* Tab Selector */}
      <div className="flex flex-col md:flex-row justify-between items-center pb-6 border-b border-border shrink-0 gap-4">
        <div>
          <h2 className="text-xl font-bold font-decorative tracking-tight">Pricing Variations</h2>
          <p className="text-muted-foreground text-xs mt-1 font-light">
            A premium collection of high-fidelity, interactive, custom-styled SaaS pricing layouts.
          </p>
        </div>
        <div className="bg-muted p-1 rounded-full flex gap-1 border border-border/40">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-tight transition-all duration-300 relative ${
                activeTab === tab.id
                  ? 'text-white'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              {activeTab === tab.id && (
                <motion.div
                  layoutId="activePricingTab"
                  className="absolute inset-0 bg-[#1F9CFE] rounded-full z-0"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Demo Section */}
      <div className="flex-1 rounded-3xl border border-border/50 bg-surface/30 p-4 md:p-8 overflow-hidden relative">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            transition={{ duration: 0.35, ease: "easeOut" }}
            className="w-full h-full flex items-center justify-center"
          >
            {activeTab === 'section1' && <PricingSection1 />}
            {activeTab === 'section2' && <PricingSection2 />}
            {activeTab === 'section3' && <PricingSection3 />}
            {activeTab === 'section4' && <PricingSection4 />}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

export default PricingSectionsDemo;
