import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Search, ChevronRight, X } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQS: FAQItem[] = [
  // General
  {
    question: "What is Oxygen UI?",
    answer: "Oxygen UI is a premium design system and UI library for builders. It provides fully coded, accessible, and responsive components, templates, and hooks styled with Tailwind CSS and Framer Motion.",
    category: "General"
  },
  {
    question: "Is there a Figma UI kit available?",
    answer: "Yes! Every component and page template in the library is backed by a matching high-fidelity Figma file. You can access the UI kit from your account dashboard or copy nodes directly via our Figma plugin.",
    category: "General"
  },
  {
    question: "Can I use the templates in commercial projects?",
    answer: "Absolutely. All templates and UI components are licensed under a standard developer license, allowing you to use them in commercial SaaS products, personal projects, or client sites.",
    category: "General"
  },
  // Usage
  {
    question: "How do I integrate Oxygen UI components?",
    answer: "Integrating components is simple: browse the catalog, copy the production-ready code blocks (React/TypeScript or HTML/Tailwind), and drop them directly into your codebase. They work out of the box.",
    category: "Usage"
  },
  {
    question: "Which web frameworks are officially supported?",
    answer: "Oxygen UI is built framework-agnostically with Tailwind CSS. We provide official code snippets optimized for React (Next.js, Vite) and standard HTML, but you can adapt them easily for Vue, Svelte, or Astro.",
    category: "Usage"
  },
  {
    question: "Is there built-in support for dark mode?",
    answer: "Yes, all components are built using native Tailwind dark variant utilities (dark:bg-...), ensuring seamless synchronization with your application's theme configuration.",
    category: "Usage"
  },
  // Billing
  {
    question: "How does the subscription work?",
    answer: "Our subscription gives you unlimited access to all components, templates, and Figma files. You can choose to pay monthly or annually, and you can cancel anytime from your account settings.",
    category: "Billing"
  },
  {
    question: "What is your refund policy?",
    answer: "We offer a 7-day money-back guarantee. If you are not satisfied with Oxygen UI for any reason, email us within 7 days of purchase and we will issue a full refund immediately.",
    category: "Billing"
  },
  // Figma
  {
    question: "How do I use the Figma plugin?",
    answer: "Install the Oxygen UI plugin from the Figma Community. Select any layer or component in your design and click 'Copy React Code' to grab the responsive Tailwind implementation directly to your clipboard.",
    category: "Figma"
  },
  {
    question: "Do you keep the Figma files up to date?",
    answer: "Yes, our designers sync the Figma files with every codebase release. Any new components, layouts, or style changes are pushed to the UI kit immediately.",
    category: "Figma"
  }
];

const CATEGORIES = ["General", "Usage", "Billing", "Figma"];

export function iOSFAQ() {
  const [activeCategory, setActiveCategory] = useState("General");
  const [searchQuery, setSearchQuery] = useState("");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);

  const filteredFAQs = FAQS.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = searchQuery ? true : faq.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  const handleToggle = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section className="w-full max-w-[800px] mx-auto px-4 md:px-6 py-8 md:py-20 font-sans select-none text-neutral-900 bg-white dark:bg-[#141414] dark:text-white transition-colors duration-300">
      <div className="flex flex-col items-center">
        {/* Section Header */}
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-center mb-2 text-balance">
          FAQ
        </h2>
        <p className="text-neutral-500 dark:text-neutral-400 text-center font-medium mb-8 text-pretty">
          Find answers to common questions about Oxygen UI.
        </p>

        {/* iOS Search Bar */}
        <div className="w-full relative mb-6">
          <div className="relative flex items-center bg-neutral-100 dark:bg-[#1c1c1e] rounded-2xl px-4 py-3 text-neutral-500 dark:text-neutral-400 border border-transparent focus-within:border-neutral-200 dark:focus-within:border-neutral-800 transition-[border-color,background-color]">
            <Search className="w-5 h-5 mr-3 opacity-60 shrink-0" />
            <input
              type="text"
              placeholder="Search FAQ..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-transparent text-[16px] font-medium placeholder-neutral-400 dark:placeholder-neutral-500 focus:outline-none border-none ring-0 focus:ring-0 p-0"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="ml-2 p-1 rounded-full hover:bg-neutral-200 dark:hover:bg-neutral-800 transition-colors"
                aria-label="Clear search"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* iOS Segmented Control - scrollable on small screens */}
        {!searchQuery && (
          <div className="bg-neutral-100 dark:bg-[#1c1c1e] p-1 rounded-[16px] flex w-full max-w-md gap-1 mb-8 relative overflow-x-auto no-scrollbar">

            {CATEGORIES.map((category) => {
              const isActive = activeCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => {
                    setActiveCategory(category);
                    setExpandedIndex(null);
                  }}
                  className={`relative flex-1 py-2 text-sm font-semibold rounded-[12px] transition-colors duration-200 select-none z-10 cursor-pointer ${
                    isActive ? "text-neutral-900 dark:text-white" : "text-neutral-500 dark:text-neutral-400 hover:text-neutral-700"
                  }`}
                >
                  {isActive && (
                    <motion.div
                      layoutId="active-category-bg"
                      className="absolute inset-0 bg-white dark:bg-[#2c2c2e] rounded-[12px] shadow-sm -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 30 }}
                    />
                  )}
                  {category}
                </button>
              );
            })}
          </div>
        )}

        {/* iOS Inset-Grouped List */}
        <div className="w-full bg-neutral-50 dark:bg-[#1c1c1e]/60 rounded-3xl overflow-hidden border border-neutral-100 dark:border-neutral-900 shadow-sm">
          {filteredFAQs.length > 0 ? (
            filteredFAQs.map((faq, index) => {
              const isExpanded = expandedIndex === index;
              const isLast = index === filteredFAQs.length - 1;

              return (
                <div
                  key={faq.question}
                  className={`group relative flex flex-col border-neutral-100 dark:border-neutral-900/60 ${
                    !isLast ? "border-b" : ""
                  }`}
                >
                  {/* Row Header */}
                  <button
                    onClick={() => handleToggle(index)}
                    className="flex w-full items-center justify-between px-6 py-5 text-left transition-colors hover:bg-neutral-100/50 dark:hover:bg-[#242426]/50 cursor-pointer"
                  >
                    <span className="font-semibold text-[16px] md:text-[17px] tracking-tight leading-snug pr-4">
                      {faq.question}
                    </span>
                    <ChevronRight
                      className={`w-5 h-5 text-neutral-400 dark:text-neutral-500 transition-transform duration-300 ${
                        isExpanded ? "rotate-90" : ""
                      }`}
                    />
                  </button>

                  {/* Expanding Answer Content */}
                  <AnimatePresence initial={false}>
                    {isExpanded && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-6 pt-1 text-[15px] md:text-[16px] leading-relaxed font-medium text-neutral-500 dark:text-neutral-400 text-pretty">
                          {faq.answer}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })
          ) : (
            <div className="px-6 py-12 text-center text-neutral-400 dark:text-neutral-500 font-medium">
              No answers found for "{searchQuery}"
            </div>
          )}
        </div>
      </div>
    </section>
  );
}