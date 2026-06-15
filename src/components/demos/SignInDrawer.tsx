import React, { useState } from "react";
import { Drawer } from "vaul";
import { Plus, ArrowRight } from "lucide-react";
import { FaDiscord, FaGithub, FaApple } from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";

export default function SignInDrawer() {
  const [activeTab, setActiveTab] = useState("Email");

  return (
    <Drawer.Root shouldScaleBackground>
      <Drawer.Trigger asChild>
        <button className="bg-neutral-800 text-white rounded-full px-6 py-3 font-medium hover:bg-neutral-700 transition-colors">
          Sign In
        </button>
      </Drawer.Trigger>
      <Drawer.Portal>
        <Drawer.Overlay className="fixed inset-0 bg-black/80 backdrop-blur-sm z-40" />
        <Drawer.Content className="bg-[#0f0f0f] flex flex-col fixed inset-x-4 bottom-4 mx-auto w-full max-w-[361px] overflow-hidden z-50 text-white shadow-2xl rounded-[36px] outline-none">
          <div className="flex-1 w-full flex flex-col bg-[#0f0f0f] relative pt-6">
            
            <Drawer.Close className="absolute right-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1c1c1c] transition-transform focus:scale-95 active:scale-75 text-[#737373] hover:text-white">
              <Plus className="rotate-45 w-5 h-5 opacity-80" />
            </Drawer.Close>

            <div className="flex flex-col space-y-1.5 text-center sm:text-left px-6 py-2 pb-4">
              <h2 className="text-xl font-semibold tracking-tight sm:font-medium text-white select-none">
                Sign In
              </h2>
            </div>
            
            <div className="flex flex-col gap-4 pt-2">
              <div className="flex flex-col gap-2 px-6">
                
                {/* Social Login Buttons */}
                <div className="flex w-full items-center justify-center gap-2">
                  <button aria-label="Sign in with Google" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.545 6.558a9.4 9.4 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.7 7.7 0 0 1 5.352 2.082l-2.284 2.284A4.35 4.35 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.8 4.8 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.7 3.7 0 0 0 1.599-2.431H8v-3.08z"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with Discord" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M13.545 2.907a13.2 13.2 0 0 0-3.257-1.011.05.05 0 0 0-.052.025c-.141.25-.297.577-.406.833a12.2 12.2 0 0 0-3.658 0 8 8 0 0 0-.412-.833.05.05 0 0 0-.052-.025c-1.125.194-2.22.534-3.257 1.011a.04.04 0 0 0-.021.018C.356 6.024-.213 9.047.066 12.032q.003.022.021.037a13.3 13.3 0 0 0 3.995 2.02.05.05 0 0 0 .056-.019q.463-.63.818-1.329a.05.05 0 0 0-.01-.059l-.018-.011a9 9 0 0 1-1.248-.595.05.05 0 0 1-.02-.066l.015-.019q.127-.095.248-.195a.05.05 0 0 1 .051-.007c2.619 1.196 5.454 1.196 8.041 0a.05.05 0 0 1 .053.007q.121.1.248.195a.05.05 0 0 1-.004.085 8 8 0 0 1-1.249.594.05.05 0 0 0-.03.03.05.05 0 0 0 .003.041c.24.465.515.909.817 1.329a.05.05 0 0 0 .056.019 13.2 13.2 0 0 0 4.001-2.02.05.05 0 0 0 .021-.037c.334-3.451-.559-6.449-2.366-9.106a.03.03 0 0 0-.02-.019m-8.198 7.307c-.789 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.45.73 1.438 1.613 0 .888-.637 1.612-1.438 1.612m5.316 0c-.788 0-1.438-.724-1.438-1.612s.637-1.613 1.438-1.613c.807 0 1.451.73 1.438 1.613 0 .888-.631 1.612-1.438 1.612"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with GitHub" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with Apple" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-2.391.728-2.43m3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.185.473-1.282"></path>
                    </svg>
                  </button>
                  <button aria-label="Sign in with X" className="bg-[#18181A] hover:bg-[#202022] group flex h-12 w-full items-center justify-center rounded-xl transition-all duration-200 ease-out active:scale-95">
                    <svg stroke="currentColor" fill="white" strokeWidth="0" viewBox="0 0 16 16" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12.6.75h2.454l-5.36 6.142L16 15.25h-4.937l-3.867-5.07-4.425 5.07H.316l5.733-6.57L0 .75h5.063l3.495 4.633L12.601.75Zm-.86 13.028h1.36L4.323 2.145H2.865z"></path>
                    </svg>
                  </button>
                </div>

                {/* Tabs */}
                <div className="bg-[#18181A] flex h-12 w-full items-center rounded-2xl px-1 mt-1 mb-1">
                  <div className="relative mx-auto flex w-full items-center">
                    <ul className="mx-auto flex w-full flex-row justify-center gap-2">
                      {["Email", "Phone", "Passkey"].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => setActiveTab(tab)}
                          className={`relative flex h-10 w-full cursor-pointer items-center justify-center px-3 py-1.5 text-center text-sm font-semibold transition-colors duration-200 ease-out z-10 sm:font-medium ${
                            activeTab === tab ? "text-white" : "text-[#737373]"
                          }`}
                        >
                          {activeTab === tab && (
                            <div className="bg-[#242426] shadow-[0_1px_2px_rgba(0,0,0,0.1)] absolute inset-0 rounded-xl -z-10" />
                          )}
                          <span className="relative select-none text-inherit tracking-tight">{tab}</span>
                        </button>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Input row */}
                <div className="bg-[#18181A] flex h-12 w-full items-center justify-start gap-3 overflow-hidden rounded-2xl pl-4 pr-1 text-base">
                  <div className="flex w-full items-center justify-start">
                    <input
                      placeholder="yo@gxuri.in"
                      className="w-full text-base font-semibold tracking-tight bg-transparent border-none focus:outline-none focus:ring-0 text-[#737373] placeholder-[#737373] sm:font-medium"
                      type={activeTab === "Email" ? "email" : "text"}
                    />
                  </div>
                  <button
                    className="shadow-xs group flex h-10 w-12 shrink-0 items-center justify-center rounded-xl transition-all duration-200 ease-out bg-[#242426] text-[#737373] cursor-not-allowed"
                    disabled
                  >
                    <ArrowRight className="h-5 w-5" strokeWidth={2} />
                  </button>
                </div>
              </div>

              {/* Bottom half */}
              <div className="flex flex-col gap-5 px-6 pb-6 mt-4">
                <div className="relative">
                  <div className="absolute inset-0 flex h-8 items-center">
                    <span className="w-full border-t border-[#2a2a2a]"></span>
                  </div>
                  <div className="relative flex h-8 justify-center text-[11px] uppercase items-center">
                    <span className="text-[#606060] font-semibold tracking-wider bg-[#0f0f0f] px-4 z-10">
                      OR
                    </span>
                  </div>
                </div>
                <button className="flex h-12 w-full cursor-pointer select-none items-center justify-center gap-2 rounded-2xl bg-[#4EAFFF] text-[15px] font-semibold tracking-tight text-white transition-all duration-200 ease-out hover:bg-[#4EAFFF]/90 focus:scale-95 active:scale-95 sm:font-medium">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 16 16"
                    className="h-5 w-5 mr-1"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M12.136.326A1.5 1.5 0 0 1 14 1.78V3h.5A1.5 1.5 0 0 1 16 4.5v9a1.5 1.5 0 0 1-1.5 1.5h-13A1.5 1.5 0 0 1 0 13.5v-9a1.5 1.5 0 0 1 1.432-1.499zM5.562 3H13V1.78a.5.5 0 0 0-.621-.484zM1.5 4a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h13a.5.5 0 0 0 .5-.5v-9a.5.5 0 0 0-.5-.5z"></path>
                  </svg>
                  Connect Wallet
                </button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Portal>
    </Drawer.Root>
  );
}
