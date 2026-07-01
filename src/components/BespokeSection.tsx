import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";

// ── Card images cycling through 5 Wheel assets ──────────────────────────────
const WHEEL_IMGS = [
  "/stamp-1.png",
  "/stamp-2.png",
];

// 24 equally-spaced cards around 360°
const CARD_COUNT = 24;
const CARD_ANGLES = Array.from({ length: CARD_COUNT }, (_, i) => i * (360 / CARD_COUNT));

// ── Pixel Diamond SVG ────────────────────────────────────────────────────────
function PixelDiamond({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 8 8" className={className} fill="currentColor" aria-hidden="true">
      <rect x="3" y="1" width="2" height="1" />
      <rect x="2" y="2" width="4" height="1" />
      <rect x="1" y="3" width="6" height="1" />
      <rect x="1" y="4" width="6" height="1" />
      <rect x="2" y="5" width="4" height="1" />
      <rect x="3" y="6" width="2" height="1" />
    </svg>
  );
}

// ── Check icon SVG ───────────────────────────────────────────────────────────
function CheckIcon() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="lucide lucide-check w-4 h-4 text-blue-500 shrink-0"
      aria-hidden="true"
    >
      <path d="M20 6 9 17l-5-5" />
    </svg>
  );
}

// ── Pricing plan data ────────────────────────────────────────────────────────
const PLANS = [
  {
    badge: null,
    billing: "Billed Quarterly",
    billingColor: "text-zinc-400",
    name: "Quarterly Plan",
    price: "€20",
    priceUnit: "EUR / mo",
    features: [
      "Single user license",
      "Access all 178+ Vault items",
      "New resource drops monthly",
      "Community Discord access",
      "Figma UI Kit & assets access",
      "Standard support channels",
    ],
    cta: "Become a Member",
    ctaLink: "/pricing",
    highlight: false,
  },
  {
    badge: "BEST VALUE",
    billing: "One-time Payment",
    billingColor: "text-blue-500 dark:text-blue-400",
    name: "Lifetime Plan",
    price: "€750",
    priceUnit: "EUR",
    features: [
      "Full website source code bonus",
      "Lifetime updates included",
      "Join private Slack channel",
      "Unlimited commercial projects",
      "Priority 1-on-1 design audit",
      "Early beta access to new components",
      "Ready-to-use production builds",
    ],
    cta: "Get Lifetime Access",
    ctaLink: "/pricing",
    highlight: true,
  },
  {
    badge: null,
    billing: "Billed Monthly",
    billingColor: "text-zinc-400",
    name: "Team Plan",
    price: "€16",
    priceUnit: "EUR / user / mo",
    features: [
      "Unlimited team accounts",
      "Central team dashboard",
      "Direct priority maker support",
      "Custom components styling request",
      "Shared team assets & workspaces",
      "Unified billing & invoicing manager",
      "Dedicated Slack integration channel",
    ],
    cta: "Create Team Account",
    ctaLink: "/pricing",
    highlight: false,
  },
];


// ── Main Section ─────────────────────────────────────────────────────────────
export function BespokeSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // 1. Scroll-driven wheel rotation
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Smooth out scroll rotation with spring physics
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 60,
    damping: 25,
    restDelta: 0.001,
  });

  // Map scroll progress 0→1 to rotation angle. Starts at a default skew of 12.24deg and rotates from there
  const wheelRotation = useTransform(smoothProgress, [0, 1], [12.2413, 122.2413]);

  // 2. Framer Motion Scroll Reveal variants
  const fadeInReveal = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1] as const,
      },
    },
  };

  return (
    <section
      ref={sectionRef}
      className="py-12 md:py-16 px-6 max-w-7xl mx-auto w-full transition-colors text-left relative overflow-hidden bg-white dark:bg-zinc-950 text-zinc-950 dark:text-[#f9f4eb]"
    >
      {/* ── Inner Hero & Rotating Wheel ────────────────────────────────────── */}
      <section className="pt-44 sm:pt-60 pb-0 px-6 max-w-5xl mx-auto text-zinc-950 dark:text-[#f9f4eb] relative">
        
        {/* Rotating wheel of cards — masked so only top arc shows */}
        <div
          className="absolute top-0 left-1/2 -translate-x-1/2 w-[1600px] h-[1600px] pointer-events-none z-0 mt-[-80px]"
          style={{
            perspective: "1000px",
            maskImage: "linear-gradient(black 0%, black 15%, transparent 35%)",
            WebkitMaskImage: "linear-gradient(black 0%, black 15%, transparent 35%)",
          }}
        >
          <motion.div
            className="w-full h-full relative flex items-center justify-center transform-gpu"
            style={{ rotate: wheelRotation, transformOrigin: "50% 50% 0px" }}
          >
            {CARD_ANGLES.map((angle, i) => (
              <div
                key={i}
                className="absolute origin-center"
                style={{ transform: `rotate(${angle}deg) translateY(-600px)` }}
              >
                <img
                  alt="stamp card"
                  className="w-[84px] sm:w-[106px] object-contain drop-shadow-xl select-none pointer-events-none dark:invert"
                  src={WHEEL_IMGS[i % WHEEL_IMGS.length]}
                  loading="lazy"
                />
              </div>
            ))}
          </motion.div>
        </div>

        {/* Headline content with Scroll Reveal */}
        <div className="flex flex-col items-center text-center mb-0 relative z-10">
          
          {/* Triple pixel diamond logo mark */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="flex justify-center items-center -space-x-1 mb-8 text-zinc-950 dark:text-[#f9f4eb] scale-125"
          >
            <PixelDiamond className="w-8 h-8 -mr-2" />
            <PixelDiamond className="w-8 h-8 -mt-6" />
            <PixelDiamond className="w-8 h-8 -ml-2" />
          </motion.div>

          {/* Big display headline */}
          <motion.h2
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeInReveal}
            className="text-5xl sm:text-7xl md:text-[6rem] font-bold uppercase tracking-tighter leading-[0.85] mb-12 sm:mb-16"
          >
            Bespoke
            <br />
            Web
            <br />
            Primitives
          </motion.h2>
        </div>
      </section>

      {/* ── Membership Plans with Scroll Reveal ────────────────────────────── */}
      <div className="space-y-12 mt-6 sm:mt-8 relative z-10">
        
        {/* Section header */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeInReveal}
          className="text-center max-w-xl mx-auto"
        >
          <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white mb-2 text-balance">
            Membership Plans
          </h3>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 text-pretty">
            Become part of a highly skilled creative community. Flexible plans to elevate your production speed.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: {
                    duration: 0.7,
                    ease: [0.16, 1, 0.3, 1],
                    delay: i * 0.12,
                  },
                },
              }}
              className={`rounded-[2.5rem] p-8 flex flex-col justify-between relative overflow-hidden border ${
                plan.highlight
                  ? "bg-zinc-900/5 dark:bg-blue-950/10 border-blue-300 dark:border-blue-900/50"
                  : "bg-zinc-50 dark:bg-zinc-900/30 border-zinc-200 dark:border-zinc-800"
              }`}
            >
              {/* Best value badge */}
              {plan.badge && (
                <div className="absolute top-0 right-0 bg-blue-500 text-white text-[8px] font-black uppercase tracking-widest px-4 py-1.5 rounded-bl-2xl">
                  {plan.badge}
                </div>
              )}

              <div>
                {/* Billing cadence */}
                <div className={`text-[10px] font-mono tracking-widest uppercase mb-2 ${plan.billingColor}`}>
                  {plan.billing}
                </div>

                {/* Plan name */}
                <h4 className="text-2xl font-bold text-zinc-900 dark:text-white mb-1">
                  {plan.name}
                </h4>

                {/* Price */}
                <div className="flex items-baseline gap-1.5 mt-4 mb-6">
                  <span className="text-4xl font-bold text-zinc-900 dark:text-white tabular-nums">
                    {plan.price}
                  </span>
                  {plan.priceUnit && (
                    <span className="text-sm text-zinc-500 dark:text-zinc-400">
                      {plan.priceUnit}
                    </span>
                  )}
                </div>

                {/* Feature list */}
                <ul className="space-y-3.5 border-t border-zinc-200 dark:border-zinc-800 pt-6">
                  {plan.features.map((feat, fIdx) => (
                    <li key={fIdx} className="flex items-center gap-3 text-sm text-zinc-650 dark:text-zinc-300">
                      <CheckIcon />
                      <span className={plan.highlight && feat.includes("source") ? "font-semibold text-zinc-850 dark:text-white" : ""}>
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA Button */}
              <div className="mt-8">
                <a
                  href={plan.ctaLink}
                  className={`w-full h-12 rounded-xl font-semibold flex items-center justify-center text-sm transition-[background-color,transform] duration-200 active:scale-[0.96] ${
                    plan.highlight
                      ? "bg-blue-500 text-white hover:bg-blue-600 shadow-sm shadow-blue-500/10"
                      : "bg-zinc-900 dark:bg-zinc-100 text-white dark:text-zinc-900 hover:bg-zinc-800 dark:hover:bg-zinc-200"
                  }`}
                >
                  {plan.cta}
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
