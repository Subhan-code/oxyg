import React, { useState, useRef, useEffect, FormEvent } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Send, Loader2, Bot, User, Sparkles } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { GoogleGenAI } from '@google/genai';
import { cn } from '../../lib/utils';

export interface Message {
  role: 'user' | 'model';
  text: string;
}

export interface AuraChatPanelProps {
  systemInstruction?: string;
  className?: string;
}

const MOCK_ANSWERS = [
  "Welcome! I am Aura, your calm virtual assistant. How can I help clarify your productivity flow today?",
  "Aura workspaces are built to suppress dopamine loops. By combining fanned inspiration cards with minimal task lists, you can focus on deep work.",
  "You can configure absolute workspace silences. By scheduling notifications in blocks, you preserve key cognitive energy for deep creation.",
  "A quiet workspace is a productive workspace. I suggest hiding all sidebars, starting a 45-minute focus session, and letting your mind wander into flow.",
];

export function AuraChatPanel({
  systemInstruction = "You are Aura, a helpful assistant for a minimal task manager. Keep responses concise, calm, and helpful.",
  className,
}: AuraChatPanelProps) {
  const [chatInput, setChatInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello. I am Aura. I'm here to help you cultivate focus, calm your mind, and optimize your creative workspace. Ask me anything about creating your ideal deep work flow." }
  ]);
  const [isGenerating, setIsGenerating] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!chatInput.trim() || isGenerating) return;

    const userMessage = chatInput.trim();
    setChatInput('');
    setMessages((prev) => [...prev, { role: 'user', text: userMessage }]);
    setIsGenerating(true);

    // Read Vite environmental variables or standard process environment keys
    const apiKey = (import.meta as any).env?.VITE_GEMINI_API_KEY || '';

    if (apiKey) {
      // Real Live Gemini API integration
      try {
        const ai = new GoogleGenAI({ 
          apiKey: apiKey,
        });
        
        const contents = messages.map(m => ({
          role: m.role,
          parts: [{ text: m.text }]
        }));
        contents.push({ role: 'user', parts: [{ text: userMessage }] });

        const responseStream = await ai.models.generateContentStream({
          model: "gemini-3-flash-preview",
          contents: contents,
          config: {
            systemInstruction: systemInstruction,
          }
        });

        setMessages((prev) => [...prev, { role: 'model', text: '' }]);

        let fullText = '';
        for await (const chunk of responseStream) {
          if (chunk.text) {
            fullText += chunk.text;
            setMessages((prev) => {
              const newMessages = [...prev];
              const lastIndex = newMessages.length - 1;
              newMessages[lastIndex] = {
                ...newMessages[lastIndex],
                text: fullText
              };
              return newMessages;
            });
          }
        }
      } catch (error) {
        console.error("Gemini Live Chat error:", error);
        setMessages((prev) => [...prev, { role: 'model', text: "I'm sorry, I encountered a connection error. Please verify your VITE_GEMINI_API_KEY in the environmental setup." }]);
      } finally {
        setIsGenerating(false);
      }
    } else {
      // Simulated/Mock high-fidelity conversational stream
      setTimeout(async () => {
        setMessages((prev) => [...prev, { role: 'model', text: '' }]);
        
        const responseText = MOCK_ANSWERS[Math.floor(Math.random() * MOCK_ANSWERS.length)];
        const words = responseText.split(' ');
        let currentText = '';

        for (let i = 0; i < words.length; i++) {
          await new Promise((resolve) => setTimeout(resolve, 80 + Math.random() * 40));
          currentText += (i === 0 ? '' : ' ') + words[i];
          setMessages((prev) => {
            const newMessages = [...prev];
            const lastIndex = newMessages.length - 1;
            newMessages[lastIndex] = {
              ...newMessages[lastIndex],
              text: currentText
            };
            return newMessages;
          });
        }
        setIsGenerating(false);
      }, 1000);
    }
  };

  return (
    <div className={cn("w-full max-w-[540px] flex flex-col bg-zinc-50 dark:bg-zinc-950/60 rounded-[32px] border border-zinc-200/80 dark:border-zinc-800/80 shadow-xl overflow-hidden backdrop-blur-xl h-[480px] select-none", className)}>
      {/* Header */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-200/60 dark:border-zinc-800/50 bg-white/60 dark:bg-zinc-900/40">
        <div className="flex items-center gap-2.5">
          <div className="size-8 rounded-full bg-zinc-900 dark:bg-zinc-100 flex items-center justify-center text-white dark:text-zinc-900">
            <Bot size={16} />
          </div>
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-zinc-900 dark:text-zinc-50">Aura Chat</h4>
            <span className="text-[10px] text-emerald-500 font-bold tracking-widest uppercase flex items-center gap-1 mt-0.5">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" />
              Online
            </span>
          </div>
        </div>
        <div className="flex items-center gap-1.5 px-3 py-1 bg-zinc-100 dark:bg-zinc-800 rounded-full text-[10px] font-bold text-zinc-500 dark:text-zinc-400">
          <Sparkles className="size-3 text-purple-500 animate-pulse" />
          AI Enabled
        </div>
      </div>

      {/* Message Feed */}
      <div className="flex-1 overflow-y-auto px-6 py-5 flex flex-col gap-5 no-scrollbar bg-zinc-50/50 dark:bg-zinc-900/10">
        <AnimatePresence initial={false}>
          {messages.map((msg, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className={cn(
                "flex w-full gap-3",
                msg.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {msg.role !== 'user' && (
                <div className="size-7 rounded-full bg-zinc-200 dark:bg-zinc-800 flex items-center justify-center text-zinc-600 dark:text-zinc-400 flex-shrink-0 self-start mt-0.5 shadow-sm">
                  <Bot size={13} />
                </div>
              )}
              
              <div
                className={cn(
                  "rounded-[20px] px-4.5 py-3 text-sm leading-relaxed max-w-[80%] shadow-sm border",
                  msg.role === 'user'
                    ? "bg-zinc-900 border-zinc-900 dark:bg-zinc-100 dark:border-zinc-100 text-white dark:text-zinc-950 font-medium"
                    : "bg-white border-zinc-200 dark:bg-zinc-900 dark:border-zinc-800/80 text-zinc-800 dark:text-zinc-200"
                )}
              >
                {msg.role === 'user' ? (
                  <p className="whitespace-pre-wrap">{msg.text}</p>
                ) : (
                  <div className="prose prose-sm dark:prose-invert max-w-none text-zinc-700 dark:text-zinc-300">
                    <ReactMarkdown>{msg.text}</ReactMarkdown>
                  </div>
                )}
              </div>

              {msg.role === 'user' && (
                <div className="size-7 rounded-full bg-zinc-800 dark:bg-zinc-200 flex items-center justify-center text-zinc-200 dark:text-zinc-800 flex-shrink-0 self-end mb-0.5 shadow-sm">
                  <User size={13} />
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
        <div ref={messagesEndRef} />
      </div>

      {/* Input Form */}
      <form
        onSubmit={handleChatSubmit}
        className="p-4 bg-white/60 dark:bg-zinc-900/40 border-t border-zinc-200/60 dark:border-zinc-800/50"
      >
        <div className="relative flex items-center rounded-2xl bg-zinc-100 dark:bg-zinc-800/40 border border-zinc-200 dark:border-zinc-800 focus-within:border-zinc-300 dark:focus-within:border-zinc-700/80 transition-all p-1">
          <input
            type="text"
            placeholder={isGenerating ? "Aura is typing..." : "Ask about productivity workflows..."}
            autoComplete="off"
            spellCheck="false"
            className="flex-1 bg-transparent px-4 py-2 text-sm text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 dark:placeholder:text-zinc-600 outline-none disabled:opacity-50"
            value={chatInput}
            onChange={(e) => setChatInput(e.target.value)}
            disabled={isGenerating}
          />
          <button
            type="submit"
            disabled={!chatInput.trim() || isGenerating}
            className="inline-flex h-9 w-9 items-center justify-center rounded-xl bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-950 transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer hover:scale-102 active:scale-98"
          >
            {isGenerating ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Send className="h-4 w-4 ml-0.5" />
            )}
          </button>
        </div>
      </form>
    </div>
  );
}


