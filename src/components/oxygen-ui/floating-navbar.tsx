"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, Menu, X, Sun, Moon } from "lucide-react";
import { cn } from "../../lib/utils";
import { useTheme } from "../theme-provider";
import { Link } from "react-router-dom";

import { flushSync } from "react-dom";

export interface NavLink {
  label: string;
  href: string;
  children?: { label: string; href: string; description?: string }[];
}

export interface FloatingNavbarProps {
  logo?: React.ReactNode;
  links?: NavLink[];
  cta?: { label: string; href: string };
  ctaThreshold?: number;
  showThemeToggle?: boolean;
  className?: string;
  containerRef?: React.RefObject<HTMLElement>;
}

export function FloatingNavbar({
  logo,
  links = [],
  cta,
  ctaThreshold = 80,
  showThemeToggle = true,
  className,
  containerRef,
}: FloatingNavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolledPast, setScrolledPast] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = containerRef?.current
        ? containerRef.current.scrollTop
        : window.scrollY;
      setScrolledPast(scrollY > ctaThreshold);
    };

    const target = containerRef?.current || window;
    target.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => target.removeEventListener("scroll", handleScroll);
  }, [ctaThreshold, containerRef]);

  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMobileMenuOpen]);

  const { theme, toggleTheme } = useTheme();

  const handleThemeToggleClick = () => {
    if (!document.startViewTransition) {
      toggleTheme();
    } else {
      document.startViewTransition(() => {
        flushSync(() => {
          toggleTheme();
        });
      });
    }
  };

  return (
    <>
      <nav
        className={cn(
          "fixed top-4 left-1/2 -translate-x-1/2 z-[100] mx-auto flex items-center justify-between p-2 rounded-lg w-[calc(100%-2rem)] max-w-5xl transition-all duration-300",
          "bg-[#000000] border border-transparent text-[#ffffff] shadow-xl backdrop-blur-xl",
          "dark:bg-[#ffffff] dark:border-transparent dark:text-[#000000] dark:shadow-2xl",
          className
        )}
      >
        <div className="flex items-center gap-6 px-3">
          {logo && (
            <div className="shrink-0 flex items-center">
              {logo}
            </div>
          )}
          
          <div className="hidden md:flex items-center gap-1">
            {links.map((link) => (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setActiveDropdown(link.label)}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <Link
                  to={link.href}
                  className="flex items-center gap-1 px-3 py-2 rounded-md text-sm font-bold transition-colors text-[#ffffff]/80 hover:text-[#ffffff] dark:text-[#000000]/80 dark:hover:text-[#000000] group"
                >
                  {link.label}
                  {link.children && <ChevronDown className="size-3.5 opacity-60" />}
                  {activeDropdown === link.label && (
                    <motion.div
                      layoutId="nav-pill"
                      className="absolute inset-0 rounded-md bg-[#ffffff]/10 dark:bg-[#000000]/10 -z-10"
                      transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    />
                  )}
                </Link>

                {link.children && (
                  <AnimatePresence>
                    {activeDropdown === link.label && (
                      <motion.div
                        initial={{ opacity: 0, scale: 0.9, y: 15 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.9, y: 15 }}
                        transition={{ type: "spring", stiffness: 400, damping: 25 }}
                        className="absolute top-full left-0 mt-2 bg-[#000000] dark:bg-[#ffffff] border border-transparent shadow-lg rounded-[14px] p-2 w-64 origin-top-left flex flex-col gap-1 overflow-hidden"
                      >
                        {link.children.map((child) => (
                          <Link
                            key={child.label}
                            to={child.href}
                            className="block p-3 rounded-[10px] hover:bg-[#ffffff]/10 dark:hover:bg-[#000000]/10 transition-colors group"
                          >
                            <div className="text-sm font-semibold text-[#ffffff] group-hover:text-[#ffffff] dark:text-[#000000] dark:group-hover:text-[#000000] transition-colors">{child.label}</div>
                            {child.description && (
                              <div className="text-xs text-[#ffffff]/60 dark:text-[#000000]/60 mt-0.5 group-hover:text-[#ffffff]/85 dark:group-hover:text-[#000000]/85 transition-colors">
                                {child.description}
                              </div>
                            )}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-1 md:gap-2 px-1">
          {showThemeToggle && (
            <motion.button
              whileHover={{ scale: 1.1, rotate: 15, transition: { type: "spring", stiffness: 450, damping: 15 } }}
              whileTap={{ scale: 0.85, rotate: -15 }}
              onClick={handleThemeToggleClick}
              className="p-2 rounded-md hover:bg-[#ffffff]/10 dark:hover:bg-[#000000]/10 text-[#ffffff]/80 hover:text-[#ffffff] dark:text-[#000000]/80 dark:hover:text-[#000000] transition-colors focus:outline-none flex shrink-0 cursor-pointer"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Sun className="size-4.5" /> : <Moon className="size-4.5" />}
            </motion.button>
          )}

          {cta && (
            <motion.div
              initial={false}
              animate={{
                width: scrolledPast ? "auto" : 0,
                opacity: scrolledPast ? 1 : 0,
                marginLeft: scrolledPast ? 8 : 0,
                scale: scrolledPast ? 1 : 0.9
              }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              style={{ overflow: "hidden", display: "flex", alignItems: "center", transformOrigin: "right center" }}
              className="hidden md:flex"
            >
              <motion.div 
                whileHover={{ scale: 1.08, y: -1, transition: { type: "spring", stiffness: 500, damping: 18 } }} 
                whileTap={{ scale: 0.92 }}
              >
                <Link
                  to={cta.href}
                  className="px-4 py-2 bg-[#ffffff] text-[#000000] dark:bg-[#000000] dark:text-[#ffffff] text-sm font-semibold rounded-md whitespace-nowrap block hover:bg-[#ffffff]/90 dark:hover:bg-[#000000]/90 transition-colors shadow-sm select-none"
                >
                  {cta.label}
                </Link>
              </motion.div>
            </motion.div>
          )}

          <motion.button
            whileHover={{ scale: 1.1, rotate: 10, transition: { type: "spring", stiffness: 500, damping: 15 } }}
            whileTap={{ scale: 0.9, rotate: -10 }}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-[#ffffff]/10 dark:hover:bg-[#000000]/10 text-[#ffffff]/80 hover:text-[#ffffff] dark:text-[#000000]/80 dark:hover:text-[#000000] transition-colors cursor-pointer select-none"
          >
            {isMobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ type: "spring", stiffness: 400, damping: 30 }}
            className="fixed inset-0 z-[90] bg-[#000000]/95 dark:bg-[#ffffff]/95 text-[#ffffff] dark:text-[#000000] backdrop-blur-xl pt-24 px-6 md:hidden overflow-y-auto"
          >
            <div className="flex flex-col gap-2">
              {links.map((link) => (
                <div key={link.label} className="border-b border-[#ffffff]/10 dark:border-[#000000]/10 pb-4 mb-2">
                  {link.children ? (
                    <div>
                      <div className="text-lg font-bold mb-3 px-2 text-[#ffffff]/90 dark:text-[#000000]/90">{link.label}</div>
                      <div className="flex flex-col gap-2 pl-4 border-l-2 border-[#ffffff]/10 dark:border-[#000000]/10 ml-2">
                        {link.children.map((child) => (
                          <Link key={child.label} to={child.href} className="flex flex-col p-2 rounded-md hover:bg-[#ffffff]/5 dark:hover:bg-[#000000]/5">
                            <span className="font-bold text-base text-[#ffffff]/90 dark:text-[#000000]/90">{child.label}</span>
                            {child.description && (
                              <span className="text-sm text-[#ffffff]/60 dark:text-[#000000]/60">{child.description}</span>
                            )}
                          </Link>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <Link to={link.href} className="text-lg font-bold block px-2 py-1 text-[#ffffff]/90 dark:text-[#000000]/90">
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              
              {cta && (
                <Link to={cta.href} className="mt-4 px-4 py-3 bg-[#ffffff] text-[#000000] dark:bg-[#000000] dark:text-[#ffffff] text-center text-base font-semibold rounded-md w-full hover:bg-[#ffffff]/90 dark:hover:bg-[#000000]/90 transition-colors">
                  {cta.label}
                </Link>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}


