import { useState } from "react";
import { Check, Copy, ArrowLeft, Terminal, FileCode, CheckCircle2, Cpu } from "lucide-react";

export function Installation() {
  const [copiedText, setCopiedText] = useState<string | null>(null);

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedText(id);
    setTimeout(() => setCopiedText(null), 2000);
  };

  const codeBlocks = {
    npm: "npm install motion clsx tailwind-merge lucide-react",
    setup: `import tailwindcss from '@tailwindcss/vite';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
});`,
    import: `import { RecordingToggle } from "./components/RecordingToggle";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <RecordingToggle />
    </div>
  );
}`
  };

  return (
    <div className="min-h-screen bg-white text-black pt-24 pb-20 px-6 sm:px-12 relative overflow-hidden font-sans">
      {/* Background ambient glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-blue-500/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-purple-500/10 rounded-full blur-[120px] pointer-events-none" />

      <div className="max-w-4xl mx-auto relative z-10">
        
        {/* Back Link */}
        <a 
          href="#/" 
          className="inline-flex items-center gap-2 text-zinc-600 hover:text-black transition-colors mb-12 text-sm font-medium group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          Back to Homepage
        </a>

        {/* Hero Header */}
        <div className="mb-16">
          <span className="text-xs font-bold tracking-[0.2em] uppercase text-blue-500 bg-blue-500/10 px-3 py-1.5 rounded-full">Developer Docs</span>
          <h1 className="text-4xl sm:text-6xl font-black tracking-tight text-black mt-6 mb-4">
            Installation Guidelines
          </h1>
          <p className="text-lg text-zinc-600 max-w-2xl leading-relaxed">
            Deploy Oxygen UI components and interactive micro-interactions to your codebase with zero setup. Follow the guidelines below.
          </p>
        </div>

        {/* Steps */}
        <div className="space-y-12">
          
          {/* Step 1 */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                1
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black">Install Core Dependencies</h2>
            </div>
            <p className="text-zinc-600 text-sm sm:text-base mb-6 leading-relaxed">
              Oxygen UI is built on top of industry-standard libraries. Run the following command in your terminal to install them:
            </p>
            <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden group">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 border-b border-zinc-200 text-xs text-zinc-600 font-mono">
                <span className="flex items-center gap-1.5"><Terminal className="w-3.5 h-3.5" /> bash</span>
                <button 
                  onClick={() => handleCopy(codeBlocks.npm, "npm")}
                  className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedText === "npm" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-800 leading-normal">
                <code>{codeBlocks.npm}</code>
              </pre>
            </div>
          </div>

          {/* Step 2 */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                2
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black">Tailwind CSS v4 Configuration</h2>
            </div>
            <p className="text-zinc-600 text-sm sm:text-base mb-6 leading-relaxed">
              If you are using Vite with Tailwind CSS v4, configure your plugins in <code className="text-blue-400 font-mono">vite.config.ts</code>:
            </p>
            <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden group">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 border-b border-zinc-200 text-xs text-zinc-600 font-mono">
                <span className="flex items-center gap-1.5"><FileCode className="w-3.5 h-3.5" /> vite.config.ts</span>
                <button 
                  onClick={() => handleCopy(codeBlocks.setup, "setup")}
                  className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedText === "setup" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-800 leading-normal">
                <code>{codeBlocks.setup}</code>
              </pre>
            </div>
          </div>

          {/* Step 3 */}
          <div className="bg-zinc-50 border border-zinc-200 rounded-3xl p-6 sm:p-8 backdrop-blur-md">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-blue-500/20 border border-blue-500/30 flex items-center justify-center text-blue-400 font-bold">
                3
              </div>
              <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-black">Import & Use Components</h2>
            </div>
            <p className="text-zinc-600 text-sm sm:text-base mb-6 leading-relaxed">
              Copy the source code of any component into your project structure, then import and render it inside your layout:
            </p>
            <div className="relative bg-white rounded-2xl border border-zinc-200 overflow-hidden group">
              <div className="flex items-center justify-between px-4 py-3 bg-zinc-100 border-b border-zinc-200 text-xs text-zinc-600 font-mono">
                <span className="flex items-center gap-1.5"><FileCode className="w-3.5 h-3.5" /> Page.tsx</span>
                <button 
                  onClick={() => handleCopy(codeBlocks.import, "import")}
                  className="hover:text-black transition-colors flex items-center gap-1 cursor-pointer"
                >
                  {copiedText === "import" ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </button>
              </div>
              <pre className="p-4 sm:p-5 overflow-x-auto text-xs sm:text-sm font-mono text-zinc-800 leading-normal">
                <code>{codeBlocks.import}</code>
              </pre>
            </div>
          </div>

          {/* AI-Ready Section */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 rounded-3xl p-6 sm:p-8 backdrop-blur-md flex flex-col md:flex-row items-start gap-6">
            <div className="p-3 bg-blue-500/10 border border-blue-500/20 rounded-2xl text-blue-400 shrink-0">
              <Cpu className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h3 className="text-lg sm:text-xl font-bold tracking-tight text-black mb-2">AI Agent Integration</h3>
              <p className="text-zinc-600 text-sm sm:text-base leading-relaxed">
                Oxygen UI components are built with clean patterns designed to be easily consumed by agentic AI coders (like Cursor, Copilot, or Antigravity). Share the source directly to let AI seamlessly style, adjust, and deploy interactions for you.
              </p>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
