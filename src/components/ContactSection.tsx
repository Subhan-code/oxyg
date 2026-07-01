import React, { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Mail, User, MessageSquare, Send, Check } from "lucide-react";

export function ContactSection({ triggerToast }: { triggerToast: (msg: string) => void }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email || !message) {
      triggerToast("Please fill in all fields.");
      return;
    }
    
    setStatus("sending");
    // Simulate premium API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setStatus("success");
    triggerToast("Message sent successfully!");
    
    // Reset form after success
    setTimeout(() => {
      setName("");
      setEmail("");
      setMessage("");
      setStatus("idle");
    }, 3000);
  };

  return (
    <section 
      id="contact" 
      className="py-20 md:py-32 w-full max-w-[1280px] mx-auto px-4 md:px-8 border-t border-neutral-100 dark:border-neutral-800"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-24 items-stretch justify-between">
        
        {/* Left column: Text Content */}
        <div className="flex-1 flex flex-col justify-center text-left max-w-xl">
          <span className="text-[10px] md:text-[11px] font-bold tracking-[0.15em] uppercase text-[#717171] mb-3">
            Get in touch
          </span>
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight text-[#141414] leading-tight mb-6">
            Let's build<br />something great.
          </h2>
          <p className="text-sm md:text-lg text-neutral-500 font-medium leading-relaxed mb-8 text-pretty">
            Have questions about premium components, custom integrations, or pricing plans? Drop us a line and our design engineers will get back to you shortly.
          </p>
          <div className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-3 text-neutral-600 font-medium">
              <div className="w-10 h-10 rounded-full bg-neutral-50 flex items-center justify-center border border-neutral-100">
                <Mail className="w-4 h-4 text-neutral-500" />
              </div>
              <span className="text-sm md:text-base font-semibold">support@oxygenui.design</span>
            </div>
          </div>
        </div>

        {/* Right column: Interactive Premium Form */}
        <div className="flex-1 w-full max-w-lg bg-[#fafafa] rounded-[28px] md:rounded-[36px] border border-neutral-100 shadow-xl md:shadow-2xl p-6 md:p-10 relative overflow-hidden flex flex-col justify-center">
          
          {/* Subtle Form Grid Background */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808005_1px,transparent_1px),linear-gradient(to_bottom,#80808005_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />

          <AnimatePresence mode="wait">
            {status === "success" ? (
              <motion.div 
                key="success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="flex flex-col items-center justify-center py-12 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center mb-6 shadow-md shadow-emerald-500/5">
                  <Check className="w-8 h-8 text-emerald-500" />
                </div>
                <h3 className="text-2xl font-bold text-[#141414] mb-2">Message Sent!</h3>
                <p className="text-sm text-neutral-500 font-medium max-w-xs text-pretty">
                  Thank you for reaching out. We will get back to you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <motion.form 
                key="form"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                onSubmit={handleSubmit}
                className="flex flex-col gap-5 relative z-10"
              >
                {/* Name field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="name" className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Your Name
                  </label>
                  <div className="relative flex items-center">
                    <User className="w-4 h-4 text-neutral-400 absolute left-4 pointer-events-none" />
                    <input 
                      type="text" 
                      id="name" 
                      required
                      placeholder="Jane Doe" 
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-white border border-neutral-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-4 focus:ring-neutral-100 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Email field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="email" className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Email Address
                  </label>
                  <div className="relative flex items-center">
                    <Mail className="w-4 h-4 text-neutral-400 absolute left-4 pointer-events-none" />
                    <input 
                      type="email" 
                      id="email" 
                      required
                      placeholder="jane@example.com" 
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-white border border-neutral-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-4 focus:ring-neutral-100 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Message field */}
                <div className="flex flex-col gap-1.5 text-left">
                  <label htmlFor="message" className="text-[12px] font-bold text-neutral-400 uppercase tracking-widest pl-1">
                    Your Message
                  </label>
                  <div className="relative flex items-start">
                    <MessageSquare className="w-4 h-4 text-neutral-400 absolute left-4 top-4 pointer-events-none" />
                    <textarea 
                      id="message" 
                      required
                      rows={4}
                      placeholder="How can we help you?" 
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      disabled={status === "sending"}
                      className="w-full bg-white border border-neutral-100 rounded-2xl py-3.5 pl-11 pr-4 text-sm font-medium text-neutral-800 placeholder-neutral-400 focus:outline-none focus:border-neutral-300 focus:ring-4 focus:ring-neutral-100 transition-all shadow-sm resize-none"
                    />
                  </div>
                </div>

                {/* Submit button with spring scale */}
                <motion.button
                  whileHover={{ scale: 1.015 }}
                  whileTap={{ scale: 0.96 }}
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full h-13 bg-[#141414] hover:bg-neutral-800 text-white rounded-full font-semibold text-sm flex items-center justify-center gap-2 cursor-pointer shadow-lg transition-colors active:scale-[0.96] disabled:bg-neutral-700 disabled:cursor-not-allowed mt-2"
                >
                  {status === "sending" ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  ) : (
                    <>
                      <span>Send message</span>
                      <Send className="w-4 h-4 text-white/80" />
                    </>
                  )}
                </motion.button>
              </motion.form>
            )}
          </AnimatePresence>
        </div>

      </div>
    </section>
  );
}
