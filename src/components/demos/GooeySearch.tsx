"use client";

import React, { useState, useRef, useEffect, useMemo } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RefreshCw } from "lucide-react";

// Dummy autocomplete suggestions data
const dummyData = [
  "React",
  "Vue",
  "Svelte",
  "Next.js",
  "Napier88",
  "Gatsby",
  "NewtonScript",
  "Angular",
  "Scala",
  "Groovy",
  "Haskell",
  "Lua",
  "R",
];

// Browser detection for gooey filter compatibility (e.g. Safari can have performance quirks)
const isUnsupportedBrowser = () => {
  if (typeof navigator === "undefined") return false;
  const ua = navigator.userAgent.toLowerCase();
  const isSafari =
    ua.includes("safari") &&
    !ua.includes("chrome") &&
    !ua.includes("chromium") &&
    !ua.includes("android") &&
    !ua.includes("firefox");
  const isChromeOniOS = ua.includes("crios");
  return isSafari || isChromeOniOS;
};

// Debounce hook
function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => clearTimeout(handler);
  }, [value, delay]);
  return debouncedValue;
}

// Icon Components
const SearchIcon = ({ isUnsupported }: { isUnsupported: boolean }) => (
  <motion.svg
    initial={{
      opacity: 0,
      scale: 0.8,
      x: -4,
      filter: isUnsupported ? "none" : "blur(5px)",
    }}
    animate={{
      opacity: 1,
      scale: 1,
      x: 0,
      filter: "blur(0px)",
    }}
    exit={{
      opacity: 0,
      scale: 0.8,
      x: -4,
      filter: isUnsupported ? "none" : "blur(5px)",
    }}
    transition={{
      delay: 0.1,
      duration: 1,
      type: "spring",
      bounce: 0.15,
    }}
    width="15"
    height="15"
    viewBox="0 0 15 15"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
      fill="#dddddd"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </motion.svg>
);

const InfoIcon = ({ index }: { index: number }) => (
  <motion.svg
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ delay: index * 0.12 + 0.3 }}
    version="1.1"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20.2832 19.9316"
    className="w-4 h-4 mr-1.5 inline-block shrink-0 align-middle text-gray-400"
    fill="none"
  >
    <path
      d="M7.49991 0.876892C3.84222 0.876892 0.877075 3.84204 0.877075 7.49972C0.877075 11.1574 3.84222 14.1226 7.49991 14.1226C11.1576 14.1226 14.1227 11.1574 14.1227 7.49972C14.1227 3.84204 11.1576 0.876892 7.49991 0.876892ZM1.82707 7.49972C1.82707 4.36671 4.36689 1.82689 7.49991 1.82689C10.6329 1.82689 13.1727 4.36671 13.1727 7.49972C13.1727 10.6327 10.6329 13.1726 7.49991 13.1726C4.36689 13.1726 1.82707 10.6327 1.82707 7.49972ZM8.24992 4.49999C8.24992 4.9142 7.91413 5.24999 7.49992 5.24999C7.08571 5.24999 6.74992 4.9142 6.74992 4.49999C6.74992 4.08577 7.08571 3.74999 7.49992 3.74999C7.91413 3.74999 8.24992 4.08577 8.24992 4.49999ZM6.00003 5.99999H6.50003H7.50003C7.77618 5.99999 8.00003 6.22384 8.00003 6.49999V9.99999H8.50003H9.00003V11H8.50003H7.50003H6.50003H6.00003V9.99999H6.50003H7.00003V6.99999H6.50003H6.00003V5.99999Z"
      fill="currentColor"
      fillRule="evenodd"
      clipRule="evenodd"
    />
  </motion.svg>
);

const LoadingIcon = () => (
  <svg
    className="loading-icon"
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 256 256"
    aria-label="Loading"
    role="status"
  >
    <rect width="256" height="256" fill="none" />
    <line x1="128" y1="32" x2="128" y2="64" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="195.88" y1="60.12" x2="173.25" y2="82.75" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="224" y1="128" x2="192" y2="128" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="195.88" y1="195.88" x2="173.25" y2="173.25" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="128" y1="224" x2="128" y2="192" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="60.12" y1="195.88" x2="82.75" y2="173.25" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="32" y1="128" x2="64" y2="128" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
    <line x1="60.12" y1="60.12" x2="82.75" y2="82.75" fill="none" stroke="#dddddd" strokeLinecap="round" strokeLinejoin="round" strokeWidth="16" />
  </svg>
);

const GooeyFilter = () => (
  <svg className="absolute w-0 h-0" aria-hidden="true">
    <defs>
      <filter id="goo-effect">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          type="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -15"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
);

const buttonVariants = {
  initial: { x: 0, width: 100 },
  step1: { x: 0, width: 100 },
  step2: { x: -30, width: 180 },
};

const iconVariants = {
  hidden: { x: -50, opacity: 0 },
  visible: { x: 16, opacity: 1 },
};

const getResultItemVariants = (index: number, isUnsupported: boolean) => ({
  initial: {
    y: 0,
    scale: 0.3,
    filter: isUnsupported ? "none" : "blur(10px)",
  },
  animate: {
    y: (index + 1) * 50,
    scale: 1,
    filter: "blur(0px)",
  },
  exit: {
    y: isUnsupported ? 0 : -4,
    scale: 0.8,
    color: "#000000",
  },
});

const getResultItemTransition = (index: number) => ({
  duration: 0.75,
  delay: index * 0.12,
  type: "spring",
  bounce: 0.35,
  exit: { duration: index * 0.1 },
  filter: { ease: "easeInOut" },
});

export default function GooeySearch() {
  const inputRef = useRef<HTMLInputElement>(null);
  const [step, setStep] = useState<1 | 2>(1);
  const [searchText, setSearchText] = useState("");
  const [searchData, setSearchData] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const debouncedSearchText = useDebounce(searchText, 400);
  const isUnsupported = useMemo(() => isUnsupportedBrowser(), []);

  const handleButtonClick = () => {
    setStep(2);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(e.target.value);
  };

  const handleReset = (e: React.MouseEvent) => {
    e.stopPropagation();
    setStep(1);
    setSearchText("");
    setSearchData([]);
    setIsLoading(false);
  };

  useEffect(() => {
    if (step === 2) {
      inputRef.current?.focus();
    } else {
      setSearchText("");
      setSearchData([]);
      setIsLoading(false);
    }
  }, [step]);

  useEffect(() => {
    let isCancelled = false;

    if (debouncedSearchText.trim()) {
      setIsLoading(true);

      const fetchData = async () => {
        try {
          await new Promise((resolve) => setTimeout(resolve, 400));
          const filteredData = dummyData.filter((item) =>
            item.toLowerCase().includes(debouncedSearchText.trim().toLowerCase())
          );

          if (!isCancelled) {
            setSearchData(filteredData);
            setIsLoading(false);
          }
        } catch {
          if (!isCancelled) {
            setIsLoading(false);
          }
        }
      };

      fetchData();
    } else {
      setSearchData([]);
      setIsLoading(false);
    }

    return () => {
      isCancelled = true;
    };
  }, [debouncedSearchText]);

  return (
    <div className={`gooey-search-wrapper w-full h-[320px] rounded-2xl bg-[#e5e7eb] flex flex-col items-center justify-center relative overflow-hidden border border-neutral-300 ${isUnsupported ? "no-goo" : ""}`}>
      
      {/* SVG gooey filter definitions */}
      <GooeyFilter />

      {/* Styled block scoped for plain CSS definitions */}
      <style dangerouslySetInnerHTML={{ __html: `
        .gooey-search-wrapper .button-content-inner {
          filter: url(#goo-effect);
          cursor: pointer;
          position: relative;
          display: flex;
          align-items: center;
        }
        .gooey-search-wrapper.no-goo .button-content-inner {
          filter: none !important;
        }
        .gooey-search-wrapper .search-results {
          position: relative;
          z-index: 1;
        }
        .gooey-search-wrapper .search-result {
          background-color: #000000;
          border-radius: 40px;
          padding: 12.5px 20px;
          width: 180px;
          color: #dddddd;
          position: absolute;
          left: -30px;
          font-size: 14px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .gooey-search-wrapper .search-result-title {
          display: flex;
          align-items: center;
          gap: 1px;
        }
        .gooey-search-wrapper .search-btn {
          color: #ddddddaf;
          cursor: pointer;
          letter-spacing: -0.5px;
          background-color: #000000;
          outline: none;
          border: none;
          border-radius: 9999px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          min-height: 46px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .gooey-search-wrapper .search-text {
          pointer-events: none;
          text-align: center;
          position: relative;
          left: 4px;
          font-size: 14px;
          font-weight: 600;
        }
        .gooey-search-wrapper .search-input {
          width: 100%;
          background-color: transparent;
          outline: none;
          border: none;
          color: #dddddd;
          font-size: 14px;
          padding: 0 4px;
        }
        .gooey-search-wrapper .separate-element {
          position: absolute;
          background-color: #000000;
          width: 46px;
          height: 46px;
          right: -5px;
          top: -1px;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 9999px;
          box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        }
        .gooey-search-wrapper .separate-element svg {
          width: 20px;
          height: 20px;
        }
        .gooey-search-wrapper .loading-icon {
          width: 20px;
          height: 20px;
          animation: gooey-rotate 0.8s linear infinite;
          transform-origin: center center;
        }
        @keyframes gooey-rotate {
          100% {
            transform: rotate(360deg);
          }
        }
      `}} />

      {/* Main search layout container */}
      <div className="button-content relative">
        <motion.div
          className="button-content-inner"
          initial="initial"
          animate={step === 1 ? "step1" : "step2"}
          transition={{ duration: 0.75, type: "spring", bounce: 0.15 }}
        >
          {/* Autocomplete list rendering */}
          <AnimatePresence mode="popLayout">
            {step === 2 && (
              <motion.div
                key="search-text-wrapper"
                className="search-results"
                role="listbox"
                aria-label="Search results"
                exit={{ scale: 0, opacity: 0 }}
                transition={{
                  delay: isUnsupported ? 0.5 : 1.25,
                  duration: 0.5,
                }}
              >
                <AnimatePresence mode="popLayout">
                  {searchData.map((item, index) => (
                    <motion.div
                      key={item}
                      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
                      variants={getResultItemVariants(index, isUnsupported)}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={getResultItemTransition(index)}
                      className="search-result"
                      role="option"
                    >
                      <div className="search-result-title">
                        <InfoIcon index={index} />
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: index * 0.12 + 0.3 }}
                        >
                          {item}
                        </motion.span>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Core button & text-input element */}
          <motion.div
            variants={buttonVariants}
            onClick={handleButtonClick}
            whileHover={{ scale: step === 2 ? 1 : 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="search-btn"
            role="button"
          >
            {step === 1 ? (
              <span className="search-text text-white">Search</span>
            ) : (
              <input
                ref={inputRef}
                type="text"
                className="search-input"
                placeholder="Type to search..."
                aria-label="Search input"
                value={searchText}
                onChange={handleSearch}
              />
            )}
          </motion.div>

          {/* Trigger icon for closing / loading */}
          <AnimatePresence mode="wait">
            {step === 2 && (
              <motion.div
                key="icon"
                className="separate-element"
                initial="hidden"
                animate="visible"
                exit="hidden"
                variants={iconVariants}
                onClick={handleReset}
                transition={{
                  delay: 0.1,
                  duration: 0.85,
                  type: "spring",
                  bounce: 0.15,
                }}
              >
                {!isLoading ? (
                  <SearchIcon isUnsupported={isUnsupported} />
                ) : (
                  <LoadingIcon />
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Floating reset button for accessibility */}
      {step === 2 && (
        <button
          onClick={handleReset}
          className="absolute bottom-4 right-4 flex items-center gap-1 bg-black/85 hover:bg-black text-white text-[10px] font-black uppercase tracking-wide px-3 py-1.5 rounded-full shadow border border-white/10 z-20 cursor-pointer"
        >
          <RefreshCw className="w-3 h-3" />
          Reset
        </button>
      )}

    </div>
  );
}
