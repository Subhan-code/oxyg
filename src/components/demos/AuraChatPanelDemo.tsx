import React from 'react';
import { AuraChatPanel } from '../oxygen-ui/aura-chat-panel';
import { Bot, Sparkles, BookOpen } from 'lucide-react';

export default function AuraChatPanelDemo() {
  return (
    <div className="w-full h-full min-h-[500px] bg-zinc-50 dark:bg-zinc-950 p-6 sm:p-10 rounded-2xl border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 flex flex-col lg:flex-row gap-8 justify-between font-sans">
      
      {/* Left Column: Brand & Prompts Library */}
      <div className="flex-1 flex flex-col justify-between gap-6 max-w-xl">
        <div className="space-y-3">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-200/50 dark:bg-zinc-800 text-xs font-bold uppercase tracking-wider select-none">
            <Bot className="size-3 text-purple-500" />
            Aura AI Chat Panel
          </span>
          <h2 className="text-3xl font-serif tracking-tight text-zinc-950 dark:text-zinc-50">
            Conversational Flow Assistant
          </h2>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
            A beautiful, floating chat client built with real-time markdown support, typewriter stream transitions, and dual operation models (Live Gemini integration + Mock Typewriter fallbacks).
          </p>
        </div>

        {/* Prompt Suggestions */}
        <div className="p-5 bg-white dark:bg-zinc-900 border border-zinc-200/60 dark:border-zinc-800/60 rounded-3xl shadow-sm space-y-4">
          <div className="flex items-center gap-2 text-xs font-bold text-zinc-400 dark:text-zinc-500 uppercase tracking-widest pb-2 border-b border-zinc-105 dark:border-zinc-850">
            <BookOpen size={13} className="text-purple-500" />
            Workspace Prompt Suggestions Library
          </div>
          
          <div className="space-y-3">
            {[
              { title: "Suppressed Dopamine Loops", text: "How does Aura avoid dark dopamine traps in modern user interfaces?" },
              { title: "Workspace Silence Blocks", text: "What is the silence protocol for deep, uninterrupted creative blocks?" },
              { title: "Calming Visual Design", text: "How does minimal styling help focus the cognitive workflow?" }
            ].map((chip, idx) => (
              <div 
                key={idx} 
                className="p-3 rounded-xl bg-zinc-50 dark:bg-zinc-950 hover:bg-zinc-100 dark:hover:bg-zinc-900 border border-zinc-150 dark:border-zinc-850 transition-all select-none cursor-default group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-zinc-700 dark:text-zinc-300 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {chip.title}
                  </span>
                  <Sparkles size={11} className="text-purple-500/50" />
                </div>
                <p className="text-[11px] text-zinc-450 dark:text-zinc-500 mt-1 leading-normal italic">
                  "{chip.text}"
                </p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-[11px] text-zinc-400 dark:text-zinc-500 leading-normal">
          Type any of the questions above into the Aura AI chat assistant box to watch the springy typewriter conversational stream operate.
        </div>
      </div>

      {/* Right Column: AI Chat Panel Container */}
      <div className="flex items-center justify-center">
        <AuraChatPanel className="shadow-2xl shadow-zinc-200/50 dark:shadow-none" />
      </div>
      
    </div>
  );
}
