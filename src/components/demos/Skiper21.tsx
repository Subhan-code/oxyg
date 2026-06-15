"use client";

import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "motion/react";

type AuthTab = "email" | "phone" | "passkey";
type ViewState = "auth" | "otp" | "wallets" | "success";

export function Skiper21() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [viewState, setViewState] = useState<ViewState>("auth");
  const [activeTab, setActiveTab] = useState<AuthTab>("email");
  
  // Inputs
  const [emailInput, setEmailInput] = useState("yo@gxuri.in");
  const [phoneInput, setPhoneInput] = useState("+1 (555) 019-2834");
  const [otpValues, setOtpValues] = useState(["", "", "", ""]);
  const [selectedWallet, setSelectedWallet] = useState<string | null>(null);
  const [connecting, setConnecting] = useState(false);
  
  const otpRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null)
  ];

  useEffect(() => {
    setMounted(true);
  }, []);

  // Lock scroll when drawer is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const resetState = () => {
    setViewState("auth");
    setOtpValues(["", "", "", ""]);
    setSelectedWallet(null);
    setConnecting(false);
  };

  const handleNext = () => {
    if (activeTab === "passkey") {
      setViewState("success");
    } else {
      setViewState("otp");
    }
  };

  const handleOtpChange = (index: number, val: string) => {
    const newVal = val.slice(-1); // Only keep last char
    const updated = [...otpValues];
    updated[index] = newVal;
    setOtpValues(updated);

    // Auto focus next input
    if (newVal && index < 3) {
      otpRefs[index + 1].current?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otpValues[index] && index > 0) {
      const updated = [...otpValues];
      updated[index - 1] = "";
      setOtpValues(updated);
      otpRefs[index - 1].current?.focus();
    }
  };

  const handleWalletConnect = (walletName: string) => {
    setSelectedWallet(walletName);
    setConnecting(true);
    setTimeout(() => {
      setConnecting(false);
      setViewState("success");
    }, 1500);
  };

  const drawerContent = (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => {
              setIsOpen(false);
              resetState();
            }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 cursor-pointer"
          />

          {/* Bottom Drawer Container */}
          <motion.div
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            transition={{ type: "spring", stiffness: 350, damping: 32 }}
            className="fixed bottom-4 inset-x-4 mx-auto max-w-[380px] bg-[#0f0f0f] border border-white/10 rounded-[36px] overflow-hidden z-50 text-white shadow-2xl flex flex-col p-6 outline-none"
          >
            {/* Header / Close button */}
            <div className="flex justify-between items-center mb-4">
              {viewState !== "auth" && viewState !== "success" ? (
                <button
                  onClick={() => setViewState("auth")}
                  className="h-8 px-3 rounded-full bg-white/5 hover:bg-white/10 transition-colors text-xs font-semibold cursor-pointer select-none text-neutral-400 hover:text-white"
                >
                  &larr; Back
                </button>
              ) : (
                <span className="text-[13px] font-bold text-neutral-500 uppercase tracking-widest">
                  Secure Access
                </span>
              )}
              <button
                onClick={() => {
                  setIsOpen(false);
                  resetState();
                }}
                className="h-8 w-8 flex items-center justify-center rounded-full bg-[#1c1c1c] text-[#737373] hover:text-white transition-colors cursor-pointer select-none font-bold text-sm"
              >
                ✕
              </button>
            </div>

            {/* Content view panels */}
            <AnimatePresence mode="wait">
              {viewState === "auth" && (
                <motion.div
                  key="auth"
                  initial={{ x: -10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: 10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Family Wallet Auth
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Sign in to your private decentralized vault.
                    </p>
                  </div>

                  {/* Tabs Switcher */}
                  <div className="bg-[#18181A] flex h-11 w-full items-center rounded-2xl px-1">
                    {["email", "phone", "passkey"].map((tab) => (
                      <button
                        key={tab}
                        onClick={() => setActiveTab(tab as AuthTab)}
                        className={`flex-1 relative flex h-9 cursor-pointer items-center justify-center text-xs font-bold transition-colors z-10 capitalize ${
                          activeTab === tab ? "text-white" : "text-[#737373]"
                        }`}
                      >
                        {activeTab === tab && (
                          <motion.div
                            layoutId="familyTabActive"
                            className="bg-[#242426] shadow-md absolute inset-0 rounded-xl -z-10"
                            transition={{ type: "spring", stiffness: 450, damping: 28 }}
                          />
                        )}
                        <span>{tab}</span>
                      </button>
                    ))}
                  </div>

                  {/* Form inputs */}
                  <div className="flex flex-col gap-2">
                    {activeTab === "email" && (
                      <div className="bg-[#18181A] flex h-12 w-full items-center rounded-2xl px-4 border border-white/5 focus-within:border-white/10">
                        <input
                          type="email"
                          value={emailInput}
                          onChange={(e) => setEmailInput(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm font-semibold text-neutral-200 placeholder-neutral-600"
                          placeholder="yo@gxuri.in"
                        />
                        <button
                          onClick={handleNext}
                          className="h-8 px-4 rounded-xl bg-[#242426] text-white hover:bg-neutral-800 transition-colors text-xs font-bold cursor-pointer shrink-0"
                        >
                          Next &rarr;
                        </button>
                      </div>
                    )}

                    {activeTab === "phone" && (
                      <div className="bg-[#18181A] flex h-12 w-full items-center rounded-2xl px-4 border border-white/5 focus-within:border-white/10">
                        <input
                          type="text"
                          value={phoneInput}
                          onChange={(e) => setPhoneInput(e.target.value)}
                          className="w-full bg-transparent border-none outline-none text-sm font-semibold text-neutral-200 placeholder-neutral-600"
                          placeholder="+1 (555) 019-2834"
                        />
                        <button
                          onClick={handleNext}
                          className="h-8 px-4 rounded-xl bg-[#242426] text-white hover:bg-neutral-800 transition-colors text-xs font-bold cursor-pointer shrink-0"
                        >
                          Next &rarr;
                        </button>
                      </div>
                    )}

                    {activeTab === "passkey" && (
                      <button
                        onClick={handleNext}
                        className="h-12 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#242426] text-white hover:bg-neutral-800 transition-colors text-sm font-bold cursor-pointer border border-white/5"
                      >
                        🔑 Verify with iCloud Keychain
                      </button>
                    )}
                  </div>

                  <div className="relative my-2">
                    <div className="absolute inset-0 flex items-center">
                      <span className="w-full border-t border-white/5" />
                    </div>
                    <div className="relative flex justify-center text-[10px] uppercase">
                      <span className="bg-[#0f0f0f] px-3 text-[#505050] font-bold tracking-wider">
                        OR
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={() => setViewState("wallets")}
                    className="h-12 w-full flex items-center justify-center gap-2 rounded-2xl bg-[#4EAFFF] hover:bg-[#4EAFFF]/90 text-sm font-semibold text-white transition-colors cursor-pointer select-none"
                  >
                    👛 Connect Web3 Wallet
                  </button>
                </motion.div>
              )}

              {viewState === "otp" && (
                <motion.div
                  key="otp"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4 text-center items-center"
                >
                  <div className="text-left w-full">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Verify OTP
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      We sent a 4-digit code to{" "}
                      <span className="text-white font-medium">
                        {activeTab === "email" ? emailInput : phoneInput}
                      </span>
                    </p>
                  </div>

                  <div className="flex gap-3 my-4">
                    {otpValues.map((val, idx) => (
                      <input
                        key={idx}
                        ref={otpRefs[idx]}
                        type="text"
                        maxLength={1}
                        value={val}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className="w-12 h-14 bg-[#18181A] border border-white/5 focus:border-[#4EAFFF] rounded-xl text-center text-xl font-extrabold text-white outline-none transition-colors"
                      />
                    ))}
                  </div>

                  <button
                    onClick={() => setViewState("success")}
                    disabled={otpValues.some((v) => !v)}
                    className={`h-11 w-full rounded-2xl text-xs font-bold transition-all ${
                      otpValues.every((v) => v)
                        ? "bg-white text-black hover:opacity-90 active:scale-95 cursor-pointer"
                        : "bg-white/5 text-neutral-500 cursor-not-allowed"
                    }`}
                  >
                    Confirm Code
                  </button>

                  <span className="text-[11px] text-neutral-500 font-medium">
                    Didn't receive code?{" "}
                    <button className="text-[#4EAFFF] hover:underline bg-transparent border-none cursor-pointer">
                      Resend
                    </button>
                  </span>
                </motion.div>
              )}

              {viewState === "wallets" && (
                <motion.div
                  key="wallets"
                  initial={{ x: 10, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -10, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="flex flex-col gap-4"
                >
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white tracking-tight">
                      Connect Wallet
                    </h3>
                    <p className="text-xs text-neutral-400 mt-1">
                      Choose a supported Web3 browser extension or connector.
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 mt-2">
                    {[
                      { name: "MetaMask", badge: "Popular" },
                      { name: "Coinbase Wallet" },
                      { name: "Rainbow" },
                      { name: "WalletConnect" }
                    ].map((w) => (
                      <button
                        key={w.name}
                        onClick={() => handleWalletConnect(w.name)}
                        className="h-12 w-full flex items-center justify-between px-4 bg-[#18181A] border border-white/5 rounded-2xl hover:bg-[#202022] hover:border-white/10 transition-all text-sm font-semibold cursor-pointer"
                      >
                        <span className="text-neutral-200">{w.name}</span>
                        {w.badge ? (
                          <span className="text-[10px] font-bold text-[#4EAFFF] bg-[#4EAFFF]/10 border border-[#4EAFFF]/20 px-2 py-0.5 rounded-full uppercase tracking-wider">
                            {w.badge}
                          </span>
                        ) : (
                          <span className="text-neutral-600">&rarr;</span>
                        )}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {viewState === "success" && (
                <motion.div
                  key="success"
                  initial={{ scale: 0.95, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.95, opacity: 0 }}
                  className="flex flex-col items-center justify-center py-6 text-center"
                >
                  <span className="text-4xl mb-3">✓</span>
                  <h3 className="text-lg font-bold text-white">Successfully Connected</h3>
                  <p className="text-xs text-neutral-400 mt-1 max-w-[240px] leading-relaxed">
                    Authentication complete. Secure session key has been registered.
                  </p>
                  <button
                    onClick={() => {
                      setIsOpen(false);
                      resetState();
                    }}
                    className="mt-6 px-6 py-2.5 bg-white text-black font-semibold text-xs rounded-xl hover:opacity-90 transition-all cursor-pointer"
                  >
                    Continue to Vault
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );

  return (
    <div className="flex flex-col items-center gap-4 text-center">
      <button
        onClick={() => setIsOpen(true)}
        className="bg-neutral-800 text-white rounded-full px-6 py-3 font-semibold hover:bg-neutral-700 transition-all cursor-pointer select-none"
      >
        Open Auth Vault
      </button>
      
      {mounted && createPortal(drawerContent, document.body)}
    </div>
  );
}
