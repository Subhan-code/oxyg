import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";

export function Pricing() {
  const [billingInterval, setBillingInterval] = useState<"yearly" | "quarterly">("yearly");

  const faqs = [
    { question: "What is Mobbin?", answer: "Mobbin is a platform for..." },
    { question: "How often do you update the library?", answer: "We update weekly..." },
    { question: "Do you have discounts for students and educators?", answer: "Yes, we offer 50% off..." },
    { question: "What forms of payment do you accept?", answer: "We accept all major credit cards..." },
    { question: "Can I cancel my subscription?", answer: "Yes, cancel anytime from your settings." },
    { question: "How do I switch from a Pro plan to a Team plan?", answer: "You can upgrade inside your workspace." },
    { question: "What is the difference between Enterprise plan and Team plan?", answer: "Enterprise includes SSO and more seat controls." },
    { question: "What is your refund policy?", answer: "We do not offer refunds, but you can cancel anytime." },
  ];

  return (
    <div className="flex flex-col items-center w-full pt-[120px] md:pt-[160px] pb-32 bg-[#141414]">
      <div className="max-w-[1240px] w-full mx-auto px-4 md:px-12 flex flex-col items-center">
        
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-5xl md:text-7xl font-bold tracking-tight text-white mb-6">
            Build <span className="whitespace-nowrap">like a Pro.</span>
          </h1>
          <p className="text-xl text-[#a1a1aa]">
            Get full access to all components & features from only ₹26.30 per day —{" "}
            <span className="whitespace-nowrap">Cancel anytime.</span>
          </p>
        </div>

        {/* Billing Toggle */}
        <div className="flex flex-col items-center gap-4 mb-16">
          <div className="relative flex items-center bg-[#27272a] rounded-full p-1 h-12 w-fit">
            <button 
              onClick={() => setBillingInterval("yearly")}
              className={`relative z-10 px-6 py-2 rounded-full text-[15px] font-semibold transition-colors ${billingInterval === "yearly" ? "text-white" : "text-[#a1a1aa]"}`}
            >
              Yearly
            </button>
            <button 
              onClick={() => setBillingInterval("quarterly")}
              className={`relative z-10 px-6 py-2 rounded-full text-[15px] font-semibold transition-colors ${billingInterval === "quarterly" ? "text-white" : "text-[#a1a1aa]"}`}
            >
              Quarterly
            </button>
            <motion.div 
              className="absolute top-1 left-1 bottom-1 w-[calc(50%-4px)] bg-[#3f3f46] rounded-full shadow-sm z-0"
              animate={{ x: billingInterval === "yearly" ? 0 : "100%" }}
              transition={{ type: "spring", stiffness: 400, damping: 30 }}
            />
          </div>
          <p className="text-[#a1a1aa] font-medium"><strong className="text-[#3b82f6]">Save 33%</strong> on a yearly subscription</p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-[800px] mb-20 md:mb-32">
          {/* Pro Card */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#1d1f27] border border-white/5 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold text-white">Pro</h3>
                <span className="bg-[#3b82f6] text-white text-[11px] font-bold px-2 py-0.5 rounded-md uppercase tracking-wider">Popular</span>
              </div>
              <p className="text-[15px] text-[#a1a1aa]">For individuals</p>
            </div>
            
            <div className="flex gap-2 items-center">
              <span className="text-5xl font-bold text-white">₹800</span>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-[#a1a1aa] leading-tight">per month</span>
                <span className="text-[13px] font-medium text-[#a1a1aa] leading-tight">billed {billingInterval}</span>
              </div>
            </div>

            <button className="w-full bg-white hover:bg-[#f4f4f5] text-neutral-900 rounded-full h-12 font-semibold transition-colors">
              Get started
            </button>

            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Access all components
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Browse templates
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> See animations
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Unlimited projects
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Copy React code
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Figma UI kit
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Priority support
              </li>
            </ul>
          </div>

          {/* Team Card */}
          <div className="flex flex-col p-8 rounded-3xl bg-[#141414] border border-white/10 gap-6">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h3 className="text-2xl font-bold text-white">Team</h3>
              </div>
              <p className="text-[15px] text-[#a1a1aa]">For teams & agencies</p>
            </div>
            
            <div className="flex gap-2 items-center">
              <span className="text-5xl font-bold text-white">₹960</span>
              <div className="flex flex-col">
                <span className="text-[13px] font-medium text-[#a1a1aa] leading-tight">per member/month</span>
                <span className="text-[13px] font-medium text-[#a1a1aa] leading-tight">billed {billingInterval}</span>
              </div>
            </div>

            <button className="w-full bg-transparent border border-white/20 hover:bg-white/5 text-white rounded-full h-12 font-semibold transition-colors">
              Get started
            </button>

            <ul className="flex flex-col gap-4 mt-2">
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> All Pro features
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Team projects
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Priority access to updates
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Admin tools
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Centralized billing
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Seat-based pricing
              </li>
              <li className="flex items-center gap-3 text-[15px] font-medium text-[#e4e4e7]">
                <CheckIcon /> Dedicated Slack channel
              </li>
            </ul>
          </div>
        </div>

        {/* Other Plans */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 w-full max-w-[800px] mb-32 justify-center">
           <div className="flex flex-col items-center gap-2 text-center flex-1">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] flex items-center justify-center mb-2">
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M3.33333 15.8333H11.6667M3.33333 15.8333V5C3.33333 4.07953 4.07953 3.33333 5 3.33333H10C10.9205 3.33333 11.6667 4.07953 11.6667 5V6.66667M3.33333 15.8333H1.66667M11.6667 15.8333V6.66667M11.6667 15.8333H16.6667M11.6667 6.66667H15C15.9205 6.66667 16.6667 7.41286 16.6667 8.33333V15.8333M16.6667 15.8333H18.3333M8.33333 7.5H6.66667M6.66667 10.8333H8.33333"/></svg>
              </div>
              <h4 className="font-bold text-white text-[17px]">Enterprise</h4>
              <p className="text-[15px] text-[#a1a1aa] leading-relaxed px-4">Get advanced security (SOC 2 reports), priority support, standard legal agreement & more.</p>
              <a href="#" className="text-[15px] font-semibold text-[#e4e4e7] underline mt-2 hover:text-white transition-colors">Contact Sales</a>
           </div>
           <div className="flex flex-col items-center gap-2 text-center flex-1">
              <div className="w-12 h-12 rounded-xl bg-[#27272a] flex items-center justify-center mb-2">
                 <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-white"><path d="M19.1667 7.5L10 11.6667L0.833334 7.5L10 3.33333L19.1667 7.5ZM19.1667 7.5V13.3333M4.16667 9.16667V12.7521C4.16667 13.3665 4.50471 13.9311 5.0463 14.2213L9.213 16.4533C9.70458 16.7168 10.2954 16.7168 10.787 16.4533L14.9537 14.2213C15.4953 13.9311 15.8333 13.3665 15.8333 12.7521V9.16667"/></svg>
              </div>
              <h4 className="font-bold text-white text-[17px]">Startup founder?</h4>
              <p className="text-[15px] text-[#a1a1aa] leading-relaxed px-4">Discover Oxygen UI for Startups and get a discount if you're eligible.</p>
              <a href="#" className="text-[15px] font-semibold text-[#e4e4e7] underline mt-2 hover:text-white transition-colors">Read more</a>
           </div>
        </div>

        {/* Table w/ Dark Theme */}
        <div className="w-full max-w-[1000px] mb-32 hidden md:block">
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white mb-12">Compare plans & features</h2>
          <div className="w-full overflow-hidden">
             <table className="w-full text-left border-collapse">
               <thead>
                 <tr>
                   <th className="w-2/5 p-4 pl-0 text-[17px] font-bold text-white border-b border-white/10">Content</th>
                   <th className="w-1/5 p-4 text-[17px] font-bold text-white border-b border-white/10">Free</th>
                   <th className="w-1/5 p-4 text-[17px] font-bold text-white border-b border-[#27272a] bg-[#1d1f27] rounded-t-2xl">Pro</th>
                   <th className="w-1/5 p-4 text-[17px] font-bold text-white border-b border-white/10">Team</th>
                 </tr>
               </thead>
               <tbody>
                 <tr className="border-b border-white/10">
                   <td className="p-4 pl-0 text-[15px] font-semibold text-white">Components</td>
                   <td className="p-4 text-[15px] text-[#a1a1aa]">Latest 20</td>
                   <td className="p-4 bg-[#1d1f27] text-white"><CheckIcon /></td>
                   <td className="p-4 text-white"><CheckIcon /></td>
                 </tr>
                 <tr className="border-b border-white/10">
                   <td className="p-4 pl-0 text-[15px] font-semibold text-white">Templates</td>
                   <td className="p-4 text-[15px] text-[#a1a1aa]">Latest 2</td>
                   <td className="p-4 bg-[#1d1f27] text-white"><CheckIcon /></td>
                   <td className="p-4 text-white"><CheckIcon /></td>
                 </tr>
                 <tr className="border-b border-white/10">
                   <td className="p-4 pl-0 text-[15px] font-semibold text-white">Pages</td>
                   <td className="p-4 text-[15px] text-[#a1a1aa]">Limited</td>
                   <td className="p-4 bg-[#1d1f27] text-white"><CheckIcon /></td>
                   <td className="p-4 text-white"><CheckIcon /></td>
                 </tr>
                 <tr className="border-b border-white/10">
                   <td className="p-4 pl-0 text-[15px] font-semibold text-white">Projects</td>
                   <td className="p-4 text-[15px] text-[#a1a1aa]">Up to 3</td>
                   <td className="p-4 bg-[#1d1f27] text-[15px] text-white">Unlimited</td>
                   <td className="p-4 text-[15px] text-white">Unlimited</td>
                 </tr>
               </tbody>
             </table>
          </div>
        </div>

        {/* FAQs */}
        <div className="w-full max-w-[800px] mb-12">
          <h2 className="text-4xl font-bold tracking-[-0.02em] text-white mb-12 text-center">Frequently asked questions</h2>
          <div className="flex flex-col gap-4">
            {faqs.map((faq, i) => {
              const [isOpen, setIsOpen] = useState(false);
              return (
                <div key={i} className="bg-[#1d1f27] hover:bg-[#27272a] transition-colors rounded-2xl cursor-pointer flex flex-col group overflow-hidden border border-white/5" onClick={() => setIsOpen(!isOpen)}>
                   <div className="p-6 flex justify-between items-center">
                     <h3 className="font-semibold text-white text-[17px]">{faq.question}</h3>
                     <motion.div animate={{ rotate: isOpen ? 180 : 0 }}>
                       <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" className="text-neutral-400 group-hover:text-white transition-colors">
                         <path d="M4.67822 7.73486L9.99971 12.6434L15.3212 7.73486" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
                       </svg>
                     </motion.div>
                   </div>
                   <AnimatePresence>
                     {isOpen && (
                       <motion.div
                         initial={{ height: 0, opacity: 0 }}
                         animate={{ height: "auto", opacity: 1 }}
                         exit={{ height: 0, opacity: 0 }}
                         className="px-6 pb-6 text-[#a1a1aa] text-[15px]"
                       >
                         {faq.answer}
                       </motion.div>
                     )}
                   </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </div>
  );
}

function CheckIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1.71875 9.9116L7.48055 15.8736L18.2839 4.69482" stroke="currentColor" strokeWidth="2" vectorEffect="non-scaling-stroke"/>
    </svg>
  );
}
