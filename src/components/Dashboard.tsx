"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { 
  Search, Bookmark, Globe, Bell, ListFilter, Heart, Share2, 
  Eye, X, ExternalLink, Sparkles, User, Settings, LogOut
} from "lucide-react";
import logoUrl from "../assets/oxygen-ui-logo.png";

// Import live demo components
import { SpacedChat } from "./demos/SpacedChat";
import { Skiper21 } from "./demos/Skiper21";
import Scrubber from "./demos/Scrubber";
import SignInDrawer from "./demos/SignInDrawer";
import { FlowScroll } from "./ui/flow-scroll";
import { GlowingScrollIndicator } from "./ui/glowing-scroll-indicator";
import { ScrollEffect } from "./ui/scroll-effect";
import { PixelatedCarousel } from "./ui/pixelated-carousel";
import { Skiper34 } from "./demos/Skiper34";
import { AppleSpotlight } from "./ui/apple-spotlight";

// New imports for additional components
import { CallToActionAndLoop, WorkTogether, StayInLoop } from "./CallToActionAndLoop";
import { InteractiveShowcase } from "./InteractiveShowcase";
import { UnderlayActionSheet } from "./demos/UnderlayActionSheet";
import { MotionBlur } from "./demos/MotionBlur";
import { ProgressiveBlur } from "./demos/ProgressiveBlur";
import InputMorphMessage from "./demos/InputMorphMessage";
import LabelIndicatorCarousel from "./demos/LabelIndicatorCarousel";
import SwipeableStackCards from "./demos/SwipeableStackCards";
import Subtle3DCarousel from "./demos/Subtle3DCarousel";
import GooeyMenu from "./demos/GooeyMenu";
import DraggableCurvedMenu from "./demos/DraggableCurvedMenu";
import RunStatsStacks from "./demos/RunStatsStacks";
import Timeline from "./demos/Timeline";
import ThreeDPhotoCarousel3 from "./demos/ThreeDPhotoCarousel3";
import ThreeDPhotoCarousel from "./demos/ThreeDPhotoCarousel";
import FamilyPopoverMenu from "./demos/FamilyPopoverMenu";
import ScrollRevealAnimationCSS from "./demos/ScrollRevealAnimationCSS";
import { ButtonGooey } from "./demos/ButtonGooey";
import { DistortedGlass } from "./demos/DistortedGlass";
import { FractalGlass } from "./demos/FractalGlass";
import MagneticBackgroundTabs from "./demos/MagneticBackgroundTabs";
import { Scene } from "./animationsdev/scene";
import AdaptiveCaretDemo from "./demos/AdaptiveCaretDemo";
import CustomCursorDemo from "./demos/CustomCursorDemo";
import { FoldableMap } from "./demos/FoldableMap";
import MagneticButtonDemo from "./demos/MagneticButtonDemo";
import { MaskAnimation } from "./demos/MaskAnimation";
import { ScrollAnimation } from "./demos/ScrollAnimation";
import WillemLoader from "./demos/WillemLoader";
import UnderlayNav from "./demos/UnderlayNav";
import BunnyPlayer from "./demos/BunnyPlayer";
import ThreeJSWarpGallery from "./demos/ThreeJSWarpGallery";
import WebGLPageTransitions from "./demos/WebGLPageTransitions";
import WebGLMagazine from "./demos/WebGLMagazine";
import R3FExperimentalCarousel from "./demos/R3FExperimentalCarousel";
import ThreeDTextAnimation from "./demos/ThreeDTextAnimation";
import ElasticGridScroll from "./demos/ElasticGridScroll";
import GooeySearch from "./demos/GooeySearch";
import ThreeDInfiniteParallaxCarousel from "./demos/ThreeDInfiniteParallaxCarousel";
import PixelCanvasDemo from "./demos/PixelCanvasDemo";
import Staggered3DGrid from "./demos/Staggered3DGrid";
import OnScrollLayoutFormations from "./demos/OnScrollLayoutFormations";
import GradientSlider from "./demos/GradientSlider";
import ThreeDLettersMenuHover from "./demos/ThreeDLettersMenuHover";
import { OnScrollLetterAnimations } from "./demos/OnScrollLetterAnimations";
import { CircularTextEffect } from "./demos/CircularTextEffect";
import { StickyGridScroll } from "./demos/StickyGridScroll";
import { InfiniteScrollParallax } from "./demos/InfiniteScrollParallax";
import { GradientShimmerDemo } from "./demos/GradientShimmerDemo";
import { GradientShimmer } from "gradient-shimmer";

// Added demo components
import GlobeDemo from "./demos/GlobeDemo";
import VerticalImageStackDemo from "./demos/VerticalImageStackDemo";
import WormLoaderDemo from "./demos/WormLoaderDemo";
import FlipButtonDemo from "./demos/FlipButtonDemo";
import BubbleTextDemo from "./demos/BubbleTextDemo";
import ProgressiveFluxLoaderDemo from "./demos/ProgressiveFluxLoaderDemo";
import InkRevealDemo from "./demos/InkRevealDemo";
import GlowHorizonDemo from "./demos/GlowHorizonDemo";

// Constants for showcase demo images
const DEMO_IMAGES = [
  "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
];

const SCROLL_EFFECT_IMAGES = {
  start: [
    "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=600&auto=format&fit=crop"
  ],
  middle: [
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1536924940846-227afb31e2a5?q=80&w=600&auto=format&fit=crop"
  ],
  featured: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=1200&auto=format&fit=crop"
};

// Local state manager for Scrubber component inside Dashboard grid
const ScrubberWrapper = () => {
  const [val, setVal] = useState(0.55);
  return (
    <div className="w-full max-w-[260px] bg-[#1a1a1e] border border-white/[0.05] p-5 rounded-2xl flex items-center justify-center">
      <Scrubber
        label="Volume"
        value={val}
        min={0}
        max={1}
        step={0.01}
        decimals={2}
        onValueChange={setVal}
      />
    </div>
  );
};

// Reusable Phone Mockup component
const PhoneMockup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto h-full max-h-[320px] aspect-[9/18.5] rounded-[24px] border-[4px] border-[#2c2c2e] bg-[#000] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col select-none group/phone">
      {/* Top Notch */}
      <div className="absolute top-0 inset-x-0 h-4.5 bg-black z-30 flex items-center justify-center">
        <div className="w-20 h-4 bg-black rounded-b-xl flex items-center justify-center">
          <div className="w-8 h-2 bg-neutral-900 rounded-full mb-0.5" />
          <div className="w-1.5 h-1.5 bg-neutral-950 rounded-full absolute right-24" />
        </div>
      </div>

      {/* Screen viewports */}
      <div className="flex-1 w-full relative pt-5 flex flex-col overflow-y-auto no-scrollbar bg-black text-white smooth-scroll">
        {children}
      </div>

      {/* Home Indicator */}
      <div className="absolute bottom-1 inset-x-0 h-1 flex justify-center z-30 pointer-events-none">
        <div className="w-24 h-[4px] bg-neutral-700 rounded-full" />
      </div>
    </div>
  );
};

// Reusable Browser Mockup component
const BrowserMockup = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative mx-auto h-full max-h-[320px] aspect-[9/18.5] rounded-[14px] border-[4px] border-[#2c2c2e] bg-[#1a1a1c] shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col select-none">
      {/* Browser top controls */}
      <div className="h-9 bg-[#1c1c1e] border-b border-white/[0.04] px-3 flex items-center gap-2 shrink-0 z-30">
        <div className="flex gap-1.5 shrink-0">
          <div className="w-2 h-2 rounded-full bg-[#ff5f56]" />
          <div className="w-2 h-2 rounded-full bg-[#ffbd2e]" />
          <div className="w-2 h-2 rounded-full bg-[#27c93f]" />
        </div>
        {/* Address Bar */}
        <div className="flex-1 bg-black/40 h-5.5 rounded-md text-[9px] flex items-center justify-center text-gray-500 font-semibold px-2.5 truncate leading-none">
          https://oxygenui.dev
        </div>
      </div>

      {/* Viewport content */}
      <div className="flex-1 w-full overflow-y-auto no-scrollbar flex flex-col bg-neutral-900 text-white smooth-scroll">
        {children}
      </div>
    </div>
  );
};

interface ScreenItem {
  id: string;
  appName: string;
  appLogo: string;
  category: string;
  uiElement: string;
  flow: string;
  platform: "iOS" | "Web";
  badge: "Updated" | "New";
  likes: number;
}
const DASHBOARD_TO_SLUG_MAP: Record<string, string> = {
  "animationsdev-hero": "scene",
  "spaced-chat": "spaced-chat-input",
  "family-wallet": "skiper-21",
  "glowing-indicator": "glowing-scroll-indicator",
  "sticky-card-stack": "skiper-34",
  "flat-3d-photo-carousel": "three-d-photo-carousel",
  "cylindrical-photo-carousel": "three-d-photo-carousel-3",
  "scroll-layout-formations": "on-scroll-layout-formations",
  "3d-letters-menu": "three-d-letters-menu-hover"
};

const DASHBOARD_ITEMS: ScreenItem[] = [
  {
    id: "airbnb",
    appName: "Airbnb",
    appLogo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=64&auto=format&fit=crop",
    category: "Travel & Transportation",
    uiElement: "Card",
    flow: "Onboarding",
    platform: "Web",
    badge: "New",
    likes: 1980
  },
  {
    id: "stripe",
    appName: "Stripe",
    appLogo: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=64&auto=format&fit=crop",
    category: "Finance",
    uiElement: "Button",
    flow: "Subscribing & Upgrading",
    platform: "Web",
    badge: "Updated",
    likes: 3450
  },
  {
    id: "notion",
    appName: "Notion",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Stacked List",
    flow: "Browsing Tutorial",
    platform: "Web",
    badge: "New",
    likes: 2110
  },
  // Adding the interactive demo components from landing page
  {
    id: "animationsdev-hero",
    appName: "Animations.dev Hero",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Interactive SVG Canvas",
    flow: "Microinteractions & Gestures",
    platform: "Web",
    badge: "New",
    likes: 4890
  },
  {
    id: "adaptive-caret",
    appName: "Adaptive Caret",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Caret Input",
    flow: "Typing & Inputs",
    platform: "Web",
    badge: "New",
    likes: 2980
  },
  {
    id: "custom-cursor",
    appName: "Custom Cursor",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Custom Cursor Container",
    flow: "Interactions & Proximity",
    platform: "Web",
    badge: "New",
    likes: 3620
  },
  {
    id: "work-together",
    appName: "Work Together Banner",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Banner",
    flow: "Lead Generation",
    platform: "Web",
    badge: "New",
    likes: 3420
  },
  {
    id: "stay-in-loop",
    appName: "Stay in Loop Newsletter",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Footer Section",
    flow: "Lead Generation",
    platform: "Web",
    badge: "New",
    likes: 3890
  },
  {
    id: "foldable-map",
    appName: "Foldable Map",
    appLogo: "https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "3D Folding Panel",
    flow: "Gestures & 3D Transforms",
    platform: "Web",
    badge: "New",
    likes: 4120
  },
  {
    id: "magnetic-button",
    appName: "Magnetic Button",
    appLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Magnetic Element",
    flow: "Interactions & Proximity",
    platform: "Web",
    badge: "New",
    likes: 3820
  },
  {
    id: "mask-animation",
    appName: "Mask Animation",
    appLogo: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Scroll Mask",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4560
  },
  {
    id: "scroll-animation",
    appName: "Scroll Animation",
    appLogo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Scroll SVG Path Mask",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4320
  },
  {
    id: "spaced-chat",
    appName: "Spaced Chat Input",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Chatting & Sending Messages",
    platform: "iOS",
    badge: "Updated",
    likes: 4210
  },
  {
    id: "family-wallet",
    appName: "Family Wallet Auth",
    appLogo: "https://images.unsplash.com/photo-1621416894569-0f39ed31d247?q=80&w=64&auto=format&fit=crop",
    category: "Finance",
    uiElement: "Card",
    flow: "Logging In",
    platform: "iOS",
    badge: "New",
    likes: 3890
  },
  {
    id: "scrubber",
    appName: "Scrubber Slider",
    appLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=64&auto=format&fit=crop",
    category: "Health & Fitness",
    uiElement: "Button",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "Updated",
    likes: 2950
  },
  {
    id: "signin-drawer",
    appName: "Sign In Drawer",
    appLogo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=64&auto=format&fit=crop",
    category: "Food & Drink",
    uiElement: "Bottom Sheet",
    flow: "Onboarding",
    platform: "iOS",
    badge: "New",
    likes: 4780
  },
  {
    id: "flow-scroll",
    appName: "Flow Scroll Grid",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "Web",
    badge: "Updated",
    likes: 3150
  },
  {
    id: "glowing-indicator",
    appName: "Glowing Scroll Progress Bar",
    appLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=64&auto=format&fit=crop",
    category: "Finance",
    uiElement: "Card",
    flow: "Logging In",
    platform: "iOS",
    badge: "New",
    likes: 2480
  },
  {
    id: "scroll-effect",
    appName: "Scroll Mask Reveal",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Health & Fitness",
    uiElement: "Button",
    flow: "Browsing Tutorial",
    platform: "Web",
    badge: "Updated",
    likes: 3950
  },
  {
    id: "pixelated-carousel",
    appName: "Pixelated Carousel Transition",
    appLogo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=64&auto=format&fit=crop",
    category: "Food & Drink",
    uiElement: "Bottom Sheet",
    flow: "Onboarding",
    platform: "iOS",
    badge: "New",
    likes: 4120
  },
  {
    id: "sticky-card-stack",
    appName: "Sticky Card Stack",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "Updated",
    likes: 2730
  },
  {
    id: "apple-spotlight",
    appName: "Apple Spotlight Search",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Logging In",
    platform: "iOS",
    badge: "New",
    likes: 4890
  },
  {
    id: "underlay-action-sheet",
    appName: "Underlay Action Sheet",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Card",
    uiElement: "Bottom Sheet",
    flow: "Onboarding",
    platform: "iOS",
    badge: "New",
    likes: 3120
  },
  {
    id: "motion-blur",
    appName: "CSS Motion Blur Effect",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 2980
  },
  {
    id: "progressive-blur",
    appName: "Progressive Backdrop Blur",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 3410
  },
  {
    id: "input-morph-message",
    appName: "Input Morph Message",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Chatting & Sending Messages",
    platform: "iOS",
    badge: "New",
    likes: 3950
  },
  {
    id: "label-indicator-carousel",
    appName: "Label Indicator Carousel",
    appLogo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=64&auto=format&fit=crop",
    category: "Food & Drink",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 2650
  },
  {
    id: "swipeable-stack-cards",
    appName: "Swipeable 3D Stack Cards",
    appLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=64&auto=format&fit=crop",
    category: "Health & Fitness",
    uiElement: "Card",
    flow: "Onboarding",
    platform: "iOS",
    badge: "New",
    likes: 4890
  },
  {
    id: "subtle-3d-carousel",
    appName: "Subtle 3D Perspective Carousel",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Food & Drink",
    uiElement: "Card",
    flow: "Onboarding",
    platform: "iOS",
    badge: "New",
    likes: 3820
  },
  {
    id: "gooey-menu",
    appName: "Gooey Blob Navigation Menu",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Button",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 4120
  },
  {
    id: "draggable-curved-menu",
    appName: "Draggable Curved Spin Wheel Menu",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Health & Fitness",
    uiElement: "Button",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 3670
  },
  {
    id: "run-stats-stacks",
    appName: "Run Stats Stacks",
    appLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=64&auto=format&fit=crop",
    category: "Health & Fitness",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 2990
  },
  {
    id: "timeline-indicator",
    appName: "Timeline Focus Indicator",
    appLogo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=64&auto=format&fit=crop",
    category: "Finance",
    uiElement: "Stacked List",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 3420
  },
  {
    id: "cylindrical-photo-carousel",
    appName: "3D Cylindrical Photo Carousel",
    appLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=64&auto=format&fit=crop",
    category: "Food & Drink",
    uiElement: "Card",
    flow: "Onboarding",
    platform: "iOS",
    badge: "New",
    likes: 4760
  },
  {
    id: "flat-3d-photo-carousel",
    appName: "3D Flat Face Photo Carousel",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Food & Drink",
    uiElement: "Card",
    flow: "Onboarding",
    platform: "iOS",
    badge: "New",
    likes: 4210
  },
  {
    id: "family-popover-menu",
    appName: "Family Style Popover Menu",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Button",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 3190
  },
  {
    id: "scroll-reveal-css",
    appName: "Scroll Reveal Animation (CSS)",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Health & Fitness",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "Web",
    badge: "New",
    likes: 4350
  },
  {
    id: "gooey-button",
    appName: "Gooey Button Hover Effect",
    appLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Button",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 2780
  },
  {
    id: "distorted-glass",
    appName: "Distorted Fractal Glass",
    appLogo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 3120
  },
  {
    id: "fractal-glass-panels",
    appName: "Fractal Glass Panels",
    appLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=64&auto=format&fit=crop",
    category: "AI",
    uiElement: "Card",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 3450
  },
  {
    id: "magnetic-tabs",
    appName: "Magnetic Background Tabs",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Finance",
    uiElement: "Button",
    flow: "Browsing Tutorial",
    platform: "iOS",
    badge: "New",
    likes: 3890
  },
  {
    id: "willem-loader",
    appName: "Willem Loading Animation",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Loading Animation",
    flow: "Onboarding & Loader",
    platform: "Web",
    badge: "New",
    likes: 4120
  },
  {
    id: "underlay-nav",
    appName: "Fixed Underlay Navigation",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Navigation Menu",
    flow: "Osmo Underlay Menu",
    platform: "Web",
    badge: "New",
    likes: 4890
  },
  {
    id: "bunny-player",
    appName: "Custom Bunny HLS Player (Basic)",
    appLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=64&auto=format&fit=crop",
    category: "Entertainment",
    uiElement: "HLS Player",
    flow: "Video Playback",
    platform: "Web",
    badge: "New",
    likes: 3950
  },
  {
    id: "threejs-warp-gallery",
    appName: "Three.js Warp Gallery",
    appLogo: "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Three.js WebGL Canvas",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4120
  },
  {
    id: "webgl-page-transitions",
    appName: "WebGL Page Transitions",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "WebGL Transitions Overlay",
    flow: "Onboarding & Loader",
    platform: "Web",
    badge: "New",
    likes: 4890
  },
  {
    id: "webgl-magazine",
    appName: "WebGL Magazine",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Three.js WebGL Canvas",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4230
  },
  {
    id: "r3f-carousel",
    appName: "R3F Curved Carousel",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "R3F Canvas Grid",
    flow: "Onboarding & Loader",
    platform: "Web",
    badge: "New",
    likes: 4790
  },
  {
    id: "3d-text-animation",
    appName: "3D Text Scroll Layouts",
    appLogo: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "CSS 3D Text Container",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4120
  },
  {
    id: "elastic-grid-scroll",
    appName: "Elastic Grid Scroll",
    appLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Interactive Scroll Column",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4520
  },
  {
    id: "gooey-search",
    appName: "Gooey Search Bar",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Gooey Search Button",
    flow: "Typing & Inputs",
    platform: "Web",
    badge: "New",
    likes: 3890
  },
  {
    id: "3d-infinite-carousel",
    appName: "3D Infinite Parallax Carousel",
    appLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "3D Parallax Slider",
    flow: "Gestures & 3D Transforms",
    platform: "Web",
    badge: "New",
    likes: 4920
  },
  {
    id: "pixel-canvas",
    appName: "Pixel Canvas Cards",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Animated Canvas Card",
    flow: "Interactions & Proximity",
    platform: "Web",
    badge: "New",
    likes: 4670
  },
  {
    id: "staggered-3d-grid",
    appName: "Staggered 3D Grid",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Card",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4120
  },
  {
    id: "scroll-layout-formations",
    appName: "Scroll Layout Formations",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Card",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 3890
  },
  {
    id: "gradient-slider",
    appName: "Gradient 3D Slider",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Card",
    flow: "Gestures & 3D Transforms",
    platform: "Web",
    badge: "New",
    likes: 4920
  },
  {
    id: "3d-letters-menu",
    appName: "3D Letters Menu Hover",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Stacked List",
    flow: "Microinteractions & Gestures",
    platform: "Web",
    badge: "New",
    likes: 4670
  },
  {
    id: "onscroll-letter-animations",
    appName: "On-Scroll Letters",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Interactive Typography",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4210
  },
  {
    id: "circular-text-effect",
    appName: "Circular Text Effect",
    appLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "SVG Concentric Text",
    flow: "Microinteractions & Gestures",
    platform: "Web",
    badge: "New",
    likes: 4680
  },
  {
    id: "sticky-grid-scroll",
    appName: "Sticky Grid Scroll",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Gallery Split Grid",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4820
  },
  {
    id: "infinite-scroll-parallax",
    appName: "Infinite Scroll Parallax",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Parallax Vertical Loop",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4980
  },
  {
    id: "gradient-shimmer",
    appName: "Gradient Shimmer Text",
    appLogo: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Text Effect",
    flow: "Microinteractions & Gestures",
    platform: "Web",
    badge: "New",
    likes: 5120
  },
  {
    id: "globe-webgl",
    appName: "Interactive WebGL Globe",
    appLogo: "https://images.unsplash.com/photo-1614064641938-3bbee52942c7?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Three.js WebGL Canvas",
    flow: "Interactions & Proximity",
    platform: "Web",
    badge: "New",
    likes: 4350
  },
  {
    id: "vertical-image-stack",
    appName: "Vertical Image Stack",
    appLogo: "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Card Stack",
    flow: "Gestures & 3D Transforms",
    platform: "Web",
    badge: "New",
    likes: 4210
  },
  {
    id: "worm-loader",
    appName: "Worm Loader",
    appLogo: "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Loading Animation",
    flow: "Onboarding & Loader",
    platform: "Web",
    badge: "New",
    likes: 3910
  },
  {
    id: "flip-button",
    appName: "3D Flip Button",
    appLogo: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Button",
    flow: "Microinteractions & Gestures",
    platform: "Web",
    badge: "New",
    likes: 4120
  },
  {
    id: "bubble-text",
    appName: "Bubble Text Effect",
    appLogo: "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Text Effect",
    flow: "Microinteractions & Gestures",
    platform: "Web",
    badge: "New",
    likes: 4280
  },
  {
    id: "progressive-flux-loader",
    appName: "Progressive Flux Loader",
    appLogo: "https://images.unsplash.com/photo-1634017839464-5c339ebe3cb4?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Loading Animation",
    flow: "Onboarding & Loader",
    platform: "Web",
    badge: "New",
    likes: 4450
  },
  {
    id: "ink-reveal",
    appName: "Ink Reveal Canvas",
    appLogo: "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Interactive SVG Canvas",
    flow: "Microinteractions & Gestures",
    platform: "Web",
    badge: "New",
    likes: 4760
  },
  {
    id: "glow-horizon",
    appName: "Glow Horizon Cinematic",
    appLogo: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=64&auto=format&fit=crop",
    category: "Design",
    uiElement: "Card",
    flow: "Scroll Reveal Animations",
    platform: "Web",
    badge: "New",
    likes: 4950
  }
];

export function Dashboard() {
  const [activeTab, setActiveTab] = useState<"Apps" | "Sites">("Apps");
  const [platform, setPlatform] = useState<"iOS" | "Web">("iOS");
  const [sortOption, setSortOption] = useState<"Latest" | "Most popular" | "Top rated" | "Animations">("Latest");
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [selectedItem, setSelectedItem] = useState<string>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<string[]>([]);
  const [showOnlyBookmarks, setShowOnlyBookmarks] = useState(false);
  const [showToast, setShowToast] = useState<string | null>(null);
  const [selectedScreen, setSelectedScreenRaw] = useState<ScreenItem | null>(null);
  
  const setSelectedScreen = (item: ScreenItem | null) => {
    if (item) {
      const isInteractive = [
        "animationsdev-hero",
        "adaptive-caret",
        "custom-cursor",
        "work-together",
        "stay-in-loop",
        "foldable-map",
        "magnetic-button",
        "mask-animation",
        "scroll-animation",
        "spaced-chat",
        "family-wallet",
        "scrubber",
        "signin-drawer",
        "flow-scroll",
        "glowing-indicator",
        "scroll-effect",
        "pixelated-carousel",
        "sticky-card-stack",
        "apple-spotlight",
        "underlay-action-sheet",
        "motion-blur",
        "progressive-blur",
        "input-morph-message",
        "label-indicator-carousel",
        "swipeable-stack-cards",
        "subtle-3d-carousel",
        "gooey-menu",
        "draggable-curved-menu",
        "run-stats-stacks",
        "timeline-indicator",
        "cylindrical-photo-carousel",
        "flat-3d-photo-carousel",
        "family-popover-menu",
        "scroll-reveal-css",
        "gooey-button",
        "distorted-glass",
        "fractal-glass-panels",
        "magnetic-tabs",
        "staggered-3d-grid",
        "scroll-layout-formations",
        "gradient-slider",
        "3d-letters-menu",
        "gradient-shimmer"
      ].includes(item.id);

      if (isInteractive) {
        const slug = DASHBOARD_TO_SLUG_MAP[item.id] || item.id;
        window.location.hash = `/components/${slug}`;
        return;
      }
    }
    setSelectedScreenRaw(item);
  };
  
  const [isSpotlightOpen, setIsSpotlightOpen] = useState(false);

  const triggerToast = (msg: string) => {
    setShowToast(msg);
    setTimeout(() => setShowToast(null), 2500);
  };

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (bookmarks.includes(id)) {
      setBookmarks(prev => prev.filter(item => item !== id));
      triggerToast("Removed from bookmarks");
    } else {
      setBookmarks(prev => [...prev, id]);
      triggerToast("Saved to bookmarks");
    }
  };

  const handleCopyLink = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    const mockUrl = `${window.location.origin}/#/dashboard/screen/${id}`;
    navigator.clipboard.writeText(mockUrl).then(() => {
      triggerToast("Share link copied to clipboard");
    });
  };

  const handleLogout = () => {
    window.location.hash = "/";
  };

  const filteredItems = DASHBOARD_ITEMS.filter(item => {
    const matchesPlatform = item.platform === platform;
    const matchesSearch = item.appName.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.uiElement.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.flow.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Mega Menu match: matches if 'All' is selected or the item's UI element type matches the selected item
    const matchesFilterGroup = selectedItem === "All" || item.uiElement === selectedItem;
    
    const matchesBookmark = !showOnlyBookmarks || bookmarks.includes(item.id);

    return matchesPlatform && matchesSearch && matchesFilterGroup && matchesBookmark;
  });

  return (
    <div className="min-h-screen bg-[#0c0c0e] text-[#e3e4eb] font-sans flex flex-col selection:bg-white/10 selection:text-white pb-16">
      
      {/* Alert toast notification */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            className="fixed bottom-8 right-8 z-999 bg-neutral-900 border border-white/10 text-white px-6 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
            <span className="text-sm font-bold">{showToast}</span>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. Header Navigation Bar (Reduced navbar height to h-16, added side gaps by centering with max-w-[1400px]) */}
      <header className="sticky top-0 z-40 bg-[#0c0c0e]/95 backdrop-blur-md border-b border-white/[0.04] px-6 h-16 flex justify-center w-full">
        <div className="max-w-[1400px] w-full flex items-center justify-between">
          
          {/* Left branding & Navigation Tabs */}
          <div className="flex items-center gap-8">
            <a href="#/" className="flex items-center gap-3 hover:scale-103 transition-transform shrink-0">
              <img src={logoUrl} alt="Oxygen UI Logo" className="h-8 w-8 object-contain" />
            </a>

            {/* Navigation tabs - text-sm font-extrabold */}
            <div className="flex items-center gap-6 text-sm font-extrabold select-none">
              <button 
                onClick={() => {
                  setActiveTab("Apps");
                  triggerToast("Browsing Mobile Apps");
                }}
                className={`transition-[color,transform] active:scale-[0.96] cursor-pointer ${activeTab === "Apps" ? "text-white" : "text-gray-500 hover:text-white"}`}
              >
                Apps
              </button>
              <button 
                onClick={() => {
                  setActiveTab("Sites");
                  triggerToast("Browsing Websites");
                }}
                className={`transition-[color,transform] active:scale-[0.96] cursor-pointer ${activeTab === "Sites" ? "text-white" : "text-gray-500 hover:text-white"}`}
              >
                Sites
              </button>
            </div>
          </div>

          {/* Center Search Input */}
          <div className="flex-1 max-w-[440px] mx-6 relative">
            <Search className="w-4 h-4 text-gray-500 absolute left-4 top-1/2 -translate-y-1/2" />
            <input 
              type="text"
              placeholder={`Search on ${platform === "iOS" ? "iOS" : "Web"}...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full h-10 pl-11 pr-11 rounded-full bg-[#1c1c1e] text-sm placeholder-gray-500 text-white focus:outline-none focus:ring-1 focus:ring-white/20 transition-[box-shadow,background-color] border border-white/[0.02]"
            />
            <button className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors cursor-pointer">
              <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M3 7V5a2 2 0 0 1 2-2h2m10 0h2a2 2 0 0 1 2 2v2m0 10v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="6" y1="12" x2="18" y2="12" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Right utility elements (Removed circles for icons, added hover animations & tooltips) */}
          <div className="flex items-center gap-5.5 select-none">
            
            {/* Bookmark button */}
            <div className="relative group/tooltip flex items-center justify-center">
              <motion.button 
                onClick={() => {
                  setShowOnlyBookmarks(prev => !prev);
                  triggerToast(showOnlyBookmarks ? "Showing all items" : "Showing bookmarks only");
                }}
                whileHover={{ scale: 1.15 }}
                className={`transition-colors p-1 cursor-pointer ${
                  showOnlyBookmarks ? "text-red-500" : "text-gray-400 hover:text-white"
                }`}
              >
                <motion.div whileHover={{ y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 10 }}>
                  <Bookmark className="w-4.5 h-4.5" fill={showOnlyBookmarks ? "currentColor" : "none"} />
                </motion.div>
              </motion.button>
              <div className="absolute top-10 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 bg-neutral-900 border border-white/10 text-white text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50">
                {showOnlyBookmarks ? "Show All Screens" : "Show Bookmarks Only"}
              </div>
            </div>

            {/* Globe button */}
            <div className="relative group/tooltip flex items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.15 }}
                className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <motion.div whileHover={{ rotate: 45 }} transition={{ type: "spring", stiffness: 200, damping: 10 }}>
                  <Globe className="w-4.5 h-4.5" />
                </motion.div>
              </motion.button>
              <div className="absolute top-10 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 bg-neutral-900 border border-white/10 text-white text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50">
                Explore Languages
              </div>
            </div>

            {/* Bell button */}
            <div className="relative group/tooltip flex items-center justify-center">
              <motion.button 
                whileHover={{ scale: 1.15 }}
                className="text-gray-400 hover:text-white transition-colors p-1 cursor-pointer"
              >
                <motion.div 
                  whileHover={{ 
                    rotate: [0, -15, 15, -10, 10, 0] 
                  }}
                  transition={{ duration: 0.5 }}
                >
                  <Bell className="w-4.5 h-4.5" />
                </motion.div>
              </motion.button>
              <div className="absolute top-10 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 bg-neutral-900 border border-white/10 text-white text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50">
                Notifications
              </div>
            </div>

            {/* Get Pro link */}
            <a 
              href="#/pricing"
              className="bg-white text-black font-extrabold text-xs px-4 py-2 rounded-full hover:bg-neutral-100 transition-colors select-none"
            >
              Get Pro
            </a>

            {/* Profile Avatar (S) */}
            <div className="relative group/tooltip flex items-center justify-center">
              <motion.button 
                onClick={handleLogout}
                whileHover={{ scale: 1.1, rotate: 5 }}
                className="w-8 h-8 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center text-[11px] font-black text-gray-300 hover:border-white/20 active:scale-95 transition-all cursor-pointer"
              >
                S
              </motion.button>
              <div className="absolute top-10 right-0 opacity-0 scale-95 pointer-events-none group-hover/tooltip:opacity-100 group-hover/tooltip:scale-100 transition-all duration-150 bg-neutral-900 border border-white/10 text-white text-[10.5px] font-bold px-2.5 py-1.5 rounded-lg whitespace-nowrap shadow-xl z-50">
                Account & Log out
              </div>
            </div>

          </div>

        </div>
      </header>

      {/* 2. Mega Filter Menu Dropdown */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-[#0c0c0e] border-b border-white/[0.04] overflow-hidden"
          >
            <div className="max-w-[1400px] mx-auto px-6 py-6 flex flex-col items-center justify-center gap-4 select-none">
              <span className="text-[12px] font-black text-gray-500 uppercase tracking-widest">Premium Components</span>
              <div className="flex flex-wrap items-center justify-center gap-3">
                {[
                  "All",
                  "Card",
                  "Button",
                  "Bottom Sheet",
                  "Stacked List"
                ].map(item => (
                  <button
                    key={item}
                    onClick={() => {
                      setSelectedItem(item);
                      setShowOnlyBookmarks(false);
                      triggerToast(`Filtering by ${item} components`);
                    }}
                    className={`text-[15px] font-extrabold px-6 py-2.5 rounded-full transition-[background-color,border-color,transform,box-shadow] active:scale-[0.96] border cursor-pointer ${
                      selectedItem === item 
                        ? "bg-white text-black border-white shadow-lg shadow-white/5" 
                        : "bg-transparent text-gray-400 border-white/5 hover:text-white hover:border-white/10"
                    }`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 3. Sub-Navigation controls */}
      <div className="max-w-[1400px] w-full mx-auto px-6 pt-6 flex items-center justify-between select-none shrink-0">
        
        <div className="flex items-center gap-8">
          {/* iOS / Web toggle capsule */}
          <div className="flex bg-[#1c1c1e] p-0.5 rounded-lg border border-white/[0.03]">
            <button 
              onClick={() => {
                setPlatform("iOS");
                triggerToast("Switched to iOS Screens");
              }}
              className={`text-xs font-bold px-4 py-1.5 rounded-md transition-[background-color,transform] active:scale-[0.96] cursor-pointer ${
                platform === "iOS" ? "bg-[#2c2c2e] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              iOS
            </button>
            <button 
              onClick={() => {
                setPlatform("Web");
                triggerToast("Switched to Web Layouts");
              }}
              className={`text-xs font-bold px-4 py-1.5 rounded-md transition-[background-color,transform] active:scale-[0.96] cursor-pointer ${
                platform === "Web" ? "bg-[#2c2c2e] text-white" : "text-gray-500 hover:text-white"
              }`}
            >
              Web
            </button>
          </div>

          {/* Sort selection options */}
          <div className="flex gap-6 text-[15px] font-bold text-gray-500">
            {(["Latest", "Most popular", "Top rated", "Animations"] as const).map(option => (
              <button
                key={option}
                onClick={() => setSortOption(option)}
                className={`pb-2 px-0.5 transition-all cursor-pointer relative ${
                  sortOption === option ? "text-white font-bold" : "hover:text-white"
                }`}
              >
                <span>{option}</span>
                {sortOption === option && (
                  <motion.div 
                    layoutId="sortUnderline"
                    className="absolute bottom-0 inset-x-0 h-0.5 bg-white" 
                  />
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Filter Toggle Button */}
        <button 
          onClick={() => setIsFilterOpen(!isFilterOpen)}
          className={`flex items-center gap-2 text-xs font-black px-4.5 py-2 rounded-xl border transition-[background-color,transform,border-color] active:scale-[0.96] cursor-pointer ${
            isFilterOpen 
              ? "bg-white text-black border-white" 
              : "bg-transparent text-gray-400 border-neutral-800 hover:text-white hover:border-neutral-700"
          }`}
        >
          <ListFilter className="w-4 h-4" />
          <span>Filter</span>
        </button>

      </div>

      {/* 4. Main View Container (Alert Banner & Gallery Grid, centered with max-w-[1400px]) */}
      <div className="max-w-[1400px] w-full mx-auto px-6 py-6 flex flex-col gap-6 flex-1">
        
        {/* Upgrade alert block */}
        <div className="w-full bg-[#1c1c1e]/75 border border-white/[0.04] rounded-xl py-3.5 px-5 flex items-center gap-3.5 shadow-sm">
          <span className="text-[12px] font-black tracking-widest text-white border border-white/20 bg-black/40 px-2.5 py-0.5 rounded-md select-none leading-none">
            PRO
          </span>
          <span className="text-sm font-bold text-gray-400">
            Upgrade for full access beyond the 4 latest apps — <a href="#/pricing" className="text-white underline font-extrabold hover:text-gray-200">Get Pro</a>
          </span>
        </div>

        {/* Cards Grid layout */}
        {filteredItems.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-24 max-w-sm mx-auto">
            <Sparkles className="w-12 h-12 text-gray-500 mb-4 animate-pulse" />
            <h3 className="text-lg font-bold text-white mb-2">No screenshots found</h3>
            <p className="text-sm text-gray-500 leading-normal">
              No layouts match the selected filter query: <strong className="text-gray-400">{selectedItem}</strong> on {platform}.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map(item => {
              const isBookmarked = bookmarks.includes(item.id);
                           // Custom checking for interactive components to stop modal launching when clicked
              const isInteractive = [
                "animationsdev-hero",
                "adaptive-caret",
                "custom-cursor",
                "work-together",
                "stay-in-loop",
                "foldable-map",
                "magnetic-button",
                "mask-animation",
                "scroll-animation",
                "spaced-chat",
                "family-wallet",
                "scrubber",
                "signin-drawer",
                "flow-scroll",
                "glowing-indicator",
                "scroll-effect",
                "pixelated-carousel",
                "sticky-card-stack",
                "apple-spotlight",
                "underlay-action-sheet",
                "motion-blur",
                "progressive-blur",
                "input-morph-message",
                "label-indicator-carousel",
                "swipeable-stack-cards",
                "subtle-3d-carousel",
                "gooey-menu",
                "draggable-curved-menu",
                "run-stats-stacks",
                "timeline-indicator",
                "cylindrical-photo-carousel",
                "flat-3d-photo-carousel",
                "family-popover-menu",
                "scroll-reveal-css",
                "gooey-button",
                "distorted-glass",
                "fractal-glass-panels",
                "magnetic-tabs",
                "staggered-3d-grid",
                "scroll-layout-formations",
                "gradient-slider",
                "3d-letters-menu",
                "gradient-shimmer"
              ].includes(item.id);

              return (
                <div 
                  key={item.id}
                  onClick={() => {
                    if (isInteractive) {
                      const slug = DASHBOARD_TO_SLUG_MAP[item.id] || item.id;
                      window.location.hash = `/components/${slug}`;
                    } else {
                      setSelectedScreen(item);
                    }
                  }}
                  className="group bg-[#151517] border border-white/[0.04] hover:border-white/[0.1] rounded-2xl p-6 hover:shadow-[0_30px_75px_rgba(0,0,0,0.6)] transition-all cursor-pointer relative flex flex-col h-[480px] justify-between overflow-hidden"
                >
                  
                  {/* Status Badge in top-left */}
                  <div className="absolute top-6 left-6 z-10">
                    <span className="text-[12px] font-black text-gray-400 bg-neutral-900 border border-white/[0.06] px-3.5 py-1 rounded-full select-none">
                      {item.badge}
                    </span>
                  </div>

                  {/* Top-Right Bookmark Button */}
                  <div className="absolute top-6 right-6 z-10 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button
                      onClick={(e) => handleToggleBookmark(item.id, e)}
                      className={`p-2.5 rounded-full border transition-all cursor-pointer ${
                        isBookmarked 
                          ? "bg-red-500 border-red-600 text-white" 
                          : "bg-[#1c1c1e] border-white/10 text-gray-400 hover:text-white"
                      }`}
                    >
                      <Heart className="w-4.5 h-4.5" fill={isBookmarked ? "currentColor" : "none"} />
                    </button>
                  </div>

                  {/* Device mockup wrapper */}
                  <div className="h-[80%] flex items-center justify-center py-2 overflow-hidden relative w-full shrink-0">
                    
                    {/* Render Interactive demos directly inside card if matches */}
                    {item.id === "animationsdev-hero" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.65] md:scale-75 select-none overflow-hidden -my-10">
                        <Scene />
                      </div>
                    ) : item.id === "adaptive-caret" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.75] md:scale-90 select-none overflow-hidden">
                        <AdaptiveCaretDemo />
                      </div>
                    ) : item.id === "custom-cursor" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.75] md:scale-90 select-none overflow-hidden">
                        <CustomCursorDemo />
                      </div>
                    ) : item.id === "work-together" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.55] md:scale-[0.65] select-none overflow-hidden -my-10">
                        <WorkTogether triggerToast={triggerToast} />
                      </div>
                    ) : item.id === "stay-in-loop" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.55] md:scale-[0.65] select-none overflow-hidden -my-10">
                        <StayInLoop triggerToast={triggerToast} />
                      </div>
                    ) : item.id === "foldable-map" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.65] md:scale-75 select-none overflow-hidden -my-12">
                        <FoldableMap />
                      </div>
                    ) : item.id === "magnetic-button" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.75] md:scale-90 select-none overflow-hidden">
                        <MagneticButtonDemo />
                      </div>
                    ) : item.id === "mask-animation" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.5] md:scale-[0.55] select-none overflow-hidden -my-12">
                        <MaskAnimation />
                      </div>
                    ) : item.id === "scroll-animation" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-[0.5] md:scale-[0.55] select-none overflow-hidden -my-12">
                        <ScrollAnimation />
                      </div>
                    ) : item.id === "spaced-chat" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full z-20">
                        <SpacedChat />
                      </div>
                    ) : item.id === "family-wallet" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center py-4 z-20">
                        <Skiper21 />
                      </div>
                    ) : item.id === "scrubber" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <ScrubberWrapper />
                      </div>
                    ) : item.id === "signin-drawer" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center py-4 z-20">
                        <SignInDrawer />
                      </div>
                    ) : item.id === "flow-scroll" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <div className="w-10 h-10 rounded-full bg-blue-500/10 text-blue-500 flex items-center justify-center animate-bounce">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                          <span className="text-[14px] font-bold text-white">Flow Scroll Grid</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            3D perspective grid layout shifting dynamically on scroll.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "glowing-indicator" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="w-full max-w-[260px] bg-[#1a1a1e] border border-white/[0.05] p-5 rounded-2xl flex flex-col items-center justify-center gap-3">
                          <GlowingScrollIndicator direction="horizontal" />
                          <span className="text-[10px] text-neutral-500 font-semibold uppercase tracking-wider">Drag Red Indicator</span>
                        </div>
                      </div>
                    ) : item.id === "scroll-effect" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <div className="w-10 h-10 rounded-full bg-indigo-500/10 text-indigo-500 flex items-center justify-center animate-bounce">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                          <span className="text-[14px] font-bold text-white">Scroll Mask Reveal</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Curtain reveal mask effect splitting and expanding image grids.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "pixelated-carousel" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="w-full max-w-[260px] aspect-video rounded-xl overflow-hidden border border-white/5 relative bg-neutral-950">
                          <PixelatedCarousel images={DEMO_IMAGES} pixelSize={40} />
                        </div>
                      </div>
                    ) : item.id === "sticky-card-stack" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <div className="w-10 h-10 rounded-full bg-amber-500/10 text-amber-500 flex items-center justify-center animate-bounce">
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                              <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                            </svg>
                          </div>
                          <span className="text-[14px] font-bold text-white">Sticky Card Stack</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Tilt rotations and scale transitions stacking cards on scroll.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "apple-spotlight" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <Search className="w-8 h-8 text-neutral-400 mb-1" />
                          <span className="text-[14px] font-bold text-white">Apple Spotlight Search</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Cmd+K style search dialog with smart suggestions and shortcuts.
                          </p>
                          <button 
                            onClick={() => setIsSpotlightOpen(true)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-4 py-1.5 rounded-full transition-all shadow-lg shadow-blue-500/20"
                          >
                            Trigger Spotlight
                          </button>
                        </div>
                      </div>
                    ) : item.id === "underlay-action-sheet" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Underlay Action Sheet</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Bottom sheet scaling down background layout.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "motion-blur" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <MotionBlur />
                      </div>
                    ) : item.id === "progressive-blur" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <ProgressiveBlur />
                      </div>
                    ) : item.id === "input-morph-message" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <InputMorphMessage />
                      </div>
                    ) : item.id === "label-indicator-carousel" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Label Indicator Carousel</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Horizontal carousel with dynamic expanding label pills.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "swipeable-stack-cards" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Swipeable 3D Stack Cards</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Interactive card stack draggable and swipable in 3D perspective.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "subtle-3d-carousel" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Subtle 3D Carousel</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Card layout carousel rotating items in 3D space.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "gooey-menu" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20 scale-85">
                        <GooeyMenu />
                      </div>
                    ) : item.id === "draggable-curved-menu" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Draggable Curved Menu</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Circular spin wheel menu rotating with drag gestures.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "run-stats-stacks" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Run Stats Stacks</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Expanded/collapsed vertical activity card stacks.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "timeline-indicator" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Timeline Focus Indicator</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Mouse-tracked scale timeline indicators.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "cylindrical-photo-carousel" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Cylindrical Photo Carousel</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            3D cylindrical photo loop rotating cards.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "flat-3d-photo-carousel" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">3D Flat Face Photo Carousel</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            3D projection photo loop rotation.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "family-popover-menu" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Family Popover Menu</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Popover expansion menu with clean spring motions.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-3 py-1 rounded-full transition-all border border-white/10"
                          >
                            View Interactive Demo
                          </button>
                        </div>
                      </div>
                    ) : item.id === "scroll-reveal-css" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Scroll Reveal Animation</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Easily trigger scroll animations with CSS animation-timeline.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent"
                          >
                            Launch Scroll View
                          </button>
                        </div>
                      </div>
                    ) : item.id === "gooey-button" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <ButtonGooey />
                      </div>
                    ) : item.id === "distorted-glass" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <DistortedGlass />
                      </div>
                    ) : item.id === "fractal-glass-panels" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <FractalGlass />
                      </div>
                    ) : item.id === "magnetic-tabs" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <MagneticBackgroundTabs />
                      </div>
                    ) : item.id === "willem-loader" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Willem Loader</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Premium GSAP loading animation with image reveals and typography scaling.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Loader
                          </button>
                        </div>
                      </div>
                    ) : item.id === "underlay-nav" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Fixed Underlay Nav</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Underlay sliding menu overlay with spring easing and custom corners.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Navigation
                          </button>
                        </div>
                      </div>
                    ) : item.id === "bunny-player" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Bunny HLS Player</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Interactive HLS (.m3u8) video player with custom control overlay.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Player
                          </button>
                        </div>
                      </div>
                    ) : item.id === "threejs-warp-gallery" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Three.js Warp Gallery</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Three.js WebGL image warp scroll gallery with interactive grids.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Gallery
                          </button>
                        </div>
                      </div>
                    ) : item.id === "webgl-page-transitions" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">WebGL Page Transitions</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Fluid curved WebGL transition animations replicating Barba.js styles.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Transitions
                          </button>
                        </div>
                      </div>
                    ) : item.id === "webgl-magazine" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">WebGL Magazine</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            3D WebGL magazine book layout with realistic page turning animations.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Magazine
                          </button>
                        </div>
                      </div>
                    ) : item.id === "r3f-carousel" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">R3F Curved Carousel</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Curved 3D image scroll carousels with GLSL shader wave deformations.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Carousel
                          </button>
                        </div>
                      </div>
                    ) : item.id === "3d-text-animation" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">3D Text Scroll Layouts</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            CSS 3D transforms rendering Cylinder, interlocking Circle, and Tube layouts.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Animations
                          </button>
                        </div>
                      </div>
                    ) : item.id === "elastic-grid-scroll" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Elastic Grid Scroll</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Multi-column grid with symmetrical lag and velocity-driven squash/stretch.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Grid
                          </button>
                        </div>
                      </div>
                    ) : item.id === "gooey-search" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Gooey Search Bar</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Expanding SVG gooey-filtered input with autocomplete suggestions.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Search
                          </button>
                        </div>
                      </div>
                    ) : item.id === "3d-infinite-carousel" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">3D Infinite Carousel</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            CSS 3D transformed drag-and-scroll carousel with image parallax.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Carousel
                          </button>
                        </div>
                      </div>
                    ) : item.id === "pixel-canvas" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Pixel Canvas Cards</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Hover/focus-triggered animated grid canvases drawing responsive colors.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Canvas
                          </button>
                        </div>
                      </div>
                    ) : item.id === "staggered-3d-grid" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Staggered 3D Scroll</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            3D staggered scroll grid with blur/brightness animations.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Grid
                          </button>
                        </div>
                      </div>
                    ) : item.id === "scroll-layout-formations" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Scroll Formations</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            10 distinct photo layout formations triggered on scroll.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Layouts
                          </button>
                        </div>
                      </div>
                    ) : item.id === "gradient-slider" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Gradient 3D Slider</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            3D carousel slider with dynamic canvas gradient backgrounds.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Slider
                          </button>
                        </div>
                      </div>
                    ) : item.id === "3d-letters-menu" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">3D Letters Menu Hover</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Menu hover letters 3D rotate with floating image reveal.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Menu
                          </button>
                        </div>
                      </div>
                    ) : item.id === "onscroll-letter-animations" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">On-Scroll Letters</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Bending typographic animations warping in response to scroll speed.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Letters
                          </button>
                        </div>
                      </div>
                    ) : item.id === "circular-text-effect" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Circular Text Effect</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            SVG concentric text paths scaling and rotating on click/hover.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Circles
                          </button>
                        </div>
                      </div>
                    ) : item.id === "sticky-grid-scroll" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Sticky Grid Scroll</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            3D image columns scaling and separating to reveal centers.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Grid
                          </button>
                        </div>
                      </div>
                    ) : item.id === "infinite-scroll-parallax" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex justify-center z-20">
                        <div className="flex flex-col items-center gap-3 text-center p-5 select-none bg-[#1c1c21] border border-white/[0.05] rounded-2xl w-full max-w-[260px] py-7">
                          <span className="text-[14px] font-bold text-white">Infinite Scroll Parallax</span>
                          <p className="text-[11px] text-neutral-400 max-w-[190px] leading-relaxed">
                            Seamless vertical loop with image depth displacement parallax.
                          </p>
                          <button 
                            onClick={() => setSelectedScreen(item)}
                            className="mt-2 text-[10px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-3.5 py-1.5 rounded-full transition-all shadow-lg border border-transparent cursor-pointer"
                          >
                            Launch Parallax
                          </button>
                        </div>
                      </div>
                    ) : item.id === "gradient-shimmer" ? (
                      <div onClick={(e) => e.stopPropagation()} className="w-full flex flex-col items-center justify-center gap-4 z-20 px-2 py-4">
                        {/* Live shimmer preview */}
                        <div className="w-full flex flex-col items-center gap-3 bg-[#111] rounded-2xl border border-white/[0.05] p-5">
                          <p className="text-[10px] font-semibold tracking-widest uppercase text-neutral-600">gradient-shimmer</p>
                          <p className="text-2xl font-bold text-center leading-snug">
                            <GradientShimmer gradient="sunrise" easing="smooth" duration={1.6} pauseOnScroll={false} baseColor="white">
                              Build faster.
                            </GradientShimmer>
                          </p>
                          <p className="text-xl font-semibold text-center">
                            <GradientShimmer gradient="mint" easing="gentle" duration={2} pauseBetween={600} pauseOnScroll={false} baseColor="white">
                              Premium components.
                            </GradientShimmer>
                          </p>
                          <p className="text-base font-medium text-center">
                            <GradientShimmer gradient="bubble" easing="snappy" duration={1.2} pauseBetween={400} pauseOnScroll={false} baseColor="white">
                              500+ UI elements.
                            </GradientShimmer>
                          </p>
                        </div>
                        {/* Swatch row */}
                        <div className="flex gap-1.5">
                          {(["sunrise","mint","bubble","peach","bay"] as const).map(name => (
                            <span key={name} className="w-4 h-4 rounded-full border border-white/10" style={{ background: `linear-gradient(135deg, ${name === 'sunrise' ? '#EF9B62,#F888A0' : name === 'mint' ? '#7DC0FB,#00C7A6' : name === 'bubble' ? '#EBBDDE,#78B0FF' : name === 'peach' ? '#FCBAC9,#F0B3F5' : '#2D8E9A,#262C81'})` }} />
                          ))}
                        </div>
                        <button
                          onClick={() => setSelectedScreen(item)}
                          className="text-[10px] font-bold bg-white/5 hover:bg-white/10 text-white px-4 py-1.5 rounded-full transition-all border border-white/10"
                        >
                          Open Interactive Demo
                        </button>
                      </div>
                    ) : item.platform === "iOS" ? (
                      <PhoneMockup>
                        {/* Status bar */}
                        <div className="px-6 pt-1 flex justify-between items-center text-[11px] font-bold z-20 select-none text-current">
                          <span className="text-white/60">9:41</span>
                          <div className="flex items-center gap-1.5">
                            <div className="w-3 h-1.5 border border-white/30 rounded-sm" />
                          </div>
                        </div>

                        {/* App viewport details */}
                        {item.id === "rdr2" && (
                          <div className="flex-1 bg-white text-black flex flex-col pb-5">
                            <div className="h-32 bg-[#990000] relative flex items-end overflow-hidden">
                              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-[#990000]/30 to-[#dd0000]" />
                              <div className="absolute bottom-2.5 left-4 z-10 flex items-center gap-2">
                                <div className="w-11 h-11 rounded-lg bg-black border border-white/20 flex items-center justify-center text-[11px] font-bold text-red-600">RDR2</div>
                              </div>
                            </div>
                            <div className="p-4.5 flex flex-col gap-2.5">
                              <h3 className="text-base font-extrabold tracking-tight leading-tight">Red Dead Redemption 2</h3>
                              <p className="text-[10px] font-bold text-gray-500">Google Stadia • PC • PlayStation 4 • Xbox One</p>
                              <div className="mt-3.5 p-3.5 rounded-xl bg-neutral-50 border border-neutral-100 flex flex-col gap-1.5">
                                <span className="text-[9px] font-black text-blue-600 uppercase tracking-wider">Review Card</span>
                                <p className="text-[11px] font-bold text-neutral-800 leading-tight italic">"Best Game Ever!!"</p>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.id === "breathwrk" && (
                          <div className="flex-1 bg-gradient-to-b from-[#0e101a] to-[#04050a] flex flex-col items-center justify-between py-7 px-4">
                            <div className="w-7 h-7 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-xs">🌙</div>
                            <div className="flex flex-col items-center gap-5">
                              <h3 className="text-sm font-bold tracking-widest text-white/90">breathwrk</h3>
                              <div className="w-22 h-22 rounded-full bg-gradient-to-br from-indigo-500/20 via-sky-500/20 to-purple-500/20 border border-white/10 flex items-center justify-center animate-pulse">
                                <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10" />
                              </div>
                            </div>
                            <div className="flex gap-2 justify-center w-full">
                              {["s", "m", "t", "w", "t", "f", "s"].map((day, i) => (
                                <div 
                                  key={i} 
                                  className={`w-5 h-5 rounded-full flex items-center justify-center text-[9px] font-bold ${
                                    day === "f" ? "bg-white text-black border border-white scale-110 shadow-lg" : "bg-white/5 border border-white/5 text-gray-500"
                                  }`}
                                >
                                  {day.toUpperCase()}
                                </div>
                              ))}
                            </div>
                          </div>
                        )}

                        {item.id === "nyt" && (
                          <div className="flex-1 bg-white text-black flex flex-col pb-4">
                            <div className="border-b border-neutral-200 py-3 text-center">
                              <h2 className="font-serif text-base font-extrabold tracking-tight select-none">The New York Times</h2>
                            </div>
                            <div className="flex gap-2.5 overflow-x-auto no-scrollbar px-3 py-2 border-b border-neutral-100 text-[9px] font-black text-neutral-800 whitespace-nowrap bg-neutral-50">
                              <span className="text-black border-b border-black">Games</span>
                              <span className="text-neutral-400">The Athletic</span>
                              <span className="text-neutral-400">Today</span>
                            </div>
                            <div className="p-4 flex flex-col gap-3">
                              <div className="flex items-center gap-1.5">
                                <span className="bg-red-600 text-white font-extrabold text-[9px] px-2 py-0.5 rounded-sm">LIVE</span>
                                <span className="text-[8.5px] font-semibold text-neutral-400">Updated 2m ago</span>
                              </div>
                              <h3 className="font-serif text-xs font-black tracking-tight leading-snug text-neutral-900">
                                King Charles Stresses Cooperation in Speech to Parliament
                              </h3>
                              <div className="w-full aspect-[16/10] bg-neutral-100 border border-neutral-200 rounded-lg flex items-center justify-center text-[10px] font-bold text-neutral-400">
                                [Photo Placeholder]
                              </div>
                            </div>
                          </div>
                        )}
                      </PhoneMockup>
                    ) : (
                      <BrowserMockup>
                        {/* Browser viewport layouts */}
                        {item.id === "airbnb" && (
                          <div className="flex-1 bg-white text-black flex flex-col pb-5">
                            {/* Search banner */}
                            <div className="p-4 border-b border-neutral-100 bg-white">
                              <div className="w-full h-9 border border-neutral-200 rounded-full flex items-center px-4 shadow-sm text-[10.5px] text-neutral-500 font-bold select-none">
                                Where to? • Anywhere • Any week
                              </div>
                            </div>
                            {/* Listing Card */}
                            <div className="p-4 flex flex-col gap-2.5">
                              <div className="w-full aspect-video rounded-xl bg-neutral-100 border border-neutral-200 overflow-hidden relative">
                                <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                              </div>
                              <div className="flex justify-between items-start text-[11px] mt-1.5">
                                <div>
                                  <h4 className="font-extrabold text-neutral-800">Ibiza, Spain</h4>
                                  <p className="text-[10px] text-neutral-400">Balearic Islands</p>
                                  <p className="font-black text-neutral-800 mt-1.5">$240 <span className="font-medium text-neutral-500">night</span></p>
                                </div>
                                <span className="font-bold text-neutral-800 text-[10px]">★ 4.92</span>
                              </div>
                            </div>
                          </div>
                        )}

                        {item.id === "stripe" && (
                          <div className="flex-1 bg-[#0a2540] text-white flex flex-col p-5">
                            <div className="flex flex-col gap-1.5 mb-5">
                              <span className="text-[9px] font-extrabold text-sky-400 uppercase tracking-widest">Payment Checkout</span>
                              <h3 className="text-base font-extrabold">Oxygen UI Pro</h3>
                              <p className="text-sm font-bold text-white/70">$49.00 / mo</p>
                            </div>
                            <div className="flex flex-col gap-3 bg-white/5 border border-white/10 p-4.5 rounded-xl">
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-semibold text-white/50">Email</span>
                                <div className="w-full h-7 border border-white/10 rounded bg-white/5 px-2.5 text-[10px] flex items-center">designer@oxygenui.dev</div>
                              </div>
                              <div className="flex flex-col gap-1">
                                <span className="text-[9px] font-semibold text-white/50">Card details</span>
                                <div className="w-full h-7 border border-white/10 rounded bg-white/5 px-2.5 text-[10px] flex items-center justify-between">
                                  <span>4242 4242 4242</span>
                                  <span className="text-white/40 text-[9px]">12/28</span>
                                </div>
                              </div>
                              <button className="w-full h-8.5 rounded-lg bg-sky-500 hover:bg-sky-400 text-[11px] font-black text-white mt-2 select-none shadow-lg">
                                Subscribe now
                              </button>
                            </div>
                          </div>
                        )}

                        {item.id === "notion" && (
                          <div className="flex-1 bg-[#191919] text-[#ffffff]/90 flex">
                            {/* Notion Sidebar */}
                            <div className="w-18 bg-[#202020] border-r border-white/5 p-2.5 flex flex-col gap-2.5 shrink-0 select-none">
                              <div className="w-5 h-5 rounded-md bg-[#2d2d2d] flex items-center justify-center text-[10px] font-bold">N</div>
                              <div className="flex flex-col gap-2 text-[9px] font-bold text-gray-500">
                                <span>Get Started</span>
                                <span className="text-gray-300">Project Plan</span>
                                <span>Quick Notes</span>
                              </div>
                            </div>
                            {/* Notion Main content */}
                            <div className="flex-1 p-4.5 flex flex-col gap-3">
                              <h3 className="text-sm font-black tracking-tight flex items-center gap-1.5">
                                <span>🚀</span> Project Plan
                              </h3>
                              <div className="flex flex-col gap-1.5 text-[10px] text-gray-400 mt-2.5">
                                <div className="flex items-center gap-2"><input type="checkbox" checked readOnly className="scale-75" /> <span>Write specs</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" checked readOnly className="scale-75" /> <span>Enhance website</span></div>
                                <div className="flex items-center gap-2"><input type="checkbox" readOnly className="scale-75" /> <span>Deploy build</span></div>
                              </div>
                            </div>
                          </div>
                        )}
                      </BrowserMockup>
                    )}
                  </div>

                  {/* Footer App Summary */}
                  <div className="h-[20%] flex items-center justify-between gap-3 select-none shrink-0 border-t border-white/[0.03] pt-4">
                    <div>
                      <h4 className="text-[16px] font-black text-white group-hover:text-blue-400 transition-colors">{item.appName}</h4>
                      <p className="text-[12px] text-gray-500 font-bold mt-0.5">{item.category}</p>
                    </div>
                    <span className="text-[12px] font-bold text-gray-400 bg-white/[0.03] border border-white/[0.04] px-2.5 py-0.5 rounded">{item.platform}</span>
                  </div>

                </div>
              );
            })}
          </div>
        )}

      </div>

      {/* 4.8 Interactive Showcase & Figma Workflow */}
      <InteractiveShowcase />

      {/* 5. Detailed Lightbox Modal */}
      <AnimatePresence>
        {selectedScreen && (
          <>
            {/* Modal Backdrop overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedScreen(null)}
              className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md cursor-zoom-out"
            />

            {/* Modal body */}
            <motion.div
              initial={{ opacity: 0, scale: 0.97, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.97, y: 15 }}
              transition={{ type: "spring", damping: 30, stiffness: 350 }}
              className="fixed top-8 bottom-8 left-8 right-8 md:top-12 md:bottom-12 md:left-24 md:right-24 z-55 bg-[#14151c] rounded-[24px] border border-white/[0.08] shadow-2xl overflow-hidden flex flex-col md:flex-row"
            >
              
              {/* Screen preview area */}
              <div className="flex-1 bg-black/45 p-8 flex items-center justify-center relative overflow-hidden">
                <button
                  onClick={() => setSelectedScreen(null)}
                  className="absolute top-4 left-4 p-2.5 rounded-full bg-black/60 border border-white/10 hover:bg-neutral-900 text-gray-400 hover:text-white transition-all cursor-pointer z-10"
                >
                  <X className="w-5 h-5" />
                </button>

                {/* Render interactive component or device mockup inside the lightbox */}
                {selectedScreen.id === "underlay-action-sheet" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <UnderlayActionSheet />
                  </div>
                ) : selectedScreen.id === "motion-blur" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <MotionBlur />
                  </div>
                ) : selectedScreen.id === "progressive-blur" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <ProgressiveBlur />
                  </div>
                ) : selectedScreen.id === "input-morph-message" ? (
                  <div className="w-full max-w-[360px] z-10">
                    <InputMorphMessage />
                  </div>
                ) : selectedScreen.id === "label-indicator-carousel" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <LabelIndicatorCarousel />
                  </div>
                ) : selectedScreen.id === "swipeable-stack-cards" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <SwipeableStackCards />
                  </div>
                ) : selectedScreen.id === "subtle-3d-carousel" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <Subtle3DCarousel />
                  </div>
                ) : selectedScreen.id === "gooey-menu" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <GooeyMenu />
                  </div>
                ) : selectedScreen.id === "draggable-curved-menu" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <DraggableCurvedMenu />
                  </div>
                ) : selectedScreen.id === "run-stats-stacks" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <RunStatsStacks />
                  </div>
                ) : selectedScreen.id === "timeline-indicator" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <Timeline />
                  </div>
                ) : selectedScreen.id === "cylindrical-photo-carousel" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <ThreeDPhotoCarousel />
                  </div>
                ) : selectedScreen.id === "flat-3d-photo-carousel" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 flex-col gap-2">
                    <ThreeDPhotoCarousel3 />
                  </div>
                ) : selectedScreen.id === "family-popover-menu" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <FamilyPopoverMenu />
                  </div>
                ) : selectedScreen.id === "scroll-reveal-css" ? (
                  <div className="w-full h-full overflow-y-auto no-scrollbar z-10 py-10">
                    <ScrollRevealAnimationCSS />
                  </div>
                ) : selectedScreen.id === "gooey-button" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <ButtonGooey />
                  </div>
                ) : selectedScreen.id === "distorted-glass" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <DistortedGlass />
                  </div>
                ) : selectedScreen.id === "fractal-glass-panels" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <FractalGlass />
                  </div>
                ) : selectedScreen.id === "magnetic-tabs" ? (
                  <div className="w-full h-full flex items-center justify-center z-10">
                    <MagneticBackgroundTabs />
                  </div>
                ) : selectedScreen.id === "animationsdev-hero" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4 scale-90 md:scale-100">
                    <Scene />
                  </div>
                ) : selectedScreen.id === "adaptive-caret" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <AdaptiveCaretDemo />
                  </div>
                ) : selectedScreen.id === "custom-cursor" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <CustomCursorDemo />
                  </div>
                ) : selectedScreen.id === "work-together" ? (
                  <div className="w-full h-full overflow-y-auto no-scrollbar z-10 py-10 px-4">
                    <div className="w-full max-w-4xl mx-auto">
                      <WorkTogether triggerToast={triggerToast} />
                    </div>
                  </div>
                ) : selectedScreen.id === "stay-in-loop" ? (
                  <div className="w-full h-full overflow-y-auto no-scrollbar z-10 py-10 px-4">
                    <div className="w-full max-w-4xl mx-auto">
                      <StayInLoop triggerToast={triggerToast} />
                    </div>
                  </div>
                ) : selectedScreen.id === "sticky-card-stack" ? (
                  <div className="w-full h-full overflow-y-auto no-scrollbar z-10 py-10 px-4">
                    <div className="w-full max-w-4xl mx-auto">
                      <Skiper34 />
                    </div>
                  </div>
                ) : selectedScreen.id === "apple-spotlight" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-6 select-none bg-neutral-900 border border-white/5 rounded-2xl w-full max-w-[320px] mx-auto text-center">
                    <Search className="w-10 h-10 text-neutral-400 mb-2" />
                    <span className="text-[15px] font-bold text-white">Apple Spotlight Search</span>
                    <p className="text-[12px] text-neutral-400 max-w-[200px] leading-relaxed mb-4">
                      Interactive search launcher with shortcuts and live filter matching.
                    </p>
                    <button 
                      onClick={() => setIsSpotlightOpen(true)}
                      className="text-[12px] font-bold bg-[#3b82f6] hover:bg-[#3b82f6]/95 text-white px-5 py-2 rounded-full transition-all shadow-lg"
                    >
                      Trigger Spotlight
                    </button>
                  </div>
                ) : selectedScreen.id === "foldable-map" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <FoldableMap />
                  </div>
                ) : selectedScreen.id === "magnetic-button" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <MagneticButtonDemo />
                  </div>
                ) : selectedScreen.id === "mask-animation" ? (
                  <div className="w-full h-full overflow-y-auto no-scrollbar z-10 py-10 px-4">
                    <div className="w-full max-w-4xl mx-auto">
                      <MaskAnimation />
                    </div>
                  </div>
                ) : selectedScreen.id === "scroll-animation" ? (
                  <div className="w-full h-full overflow-y-auto no-scrollbar z-10 py-10 px-4">
                    <div className="w-full max-w-4xl mx-auto">
                      <ScrollAnimation />
                    </div>
                  </div>
                ) : selectedScreen.id === "willem-loader" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <WillemLoader />
                    </div>
                  </div>
                ) : selectedScreen.id === "underlay-nav" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl h-[380px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <UnderlayNav />
                    </div>
                  </div>
                ) : selectedScreen.id === "threejs-warp-gallery" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ThreeJSWarpGallery />
                    </div>
                  </div>
                ) : selectedScreen.id === "webgl-page-transitions" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <WebGLPageTransitions />
                    </div>
                  </div>
                ) : selectedScreen.id === "webgl-magazine" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <WebGLMagazine />
                    </div>
                  </div>
                ) : selectedScreen.id === "r3f-carousel" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <R3FExperimentalCarousel />
                    </div>
                  </div>
                ) : selectedScreen.id === "3d-text-animation" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ThreeDTextAnimation />
                    </div>
                  </div>
                ) : selectedScreen.id === "elastic-grid-scroll" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ElasticGridScroll />
                    </div>
                  </div>
                ) : selectedScreen.id === "gooey-search" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <GooeySearch />
                    </div>
                  </div>
                ) : selectedScreen.id === "3d-infinite-carousel" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ThreeDInfiniteParallaxCarousel />
                    </div>
                  </div>
                ) : selectedScreen.id === "pixel-canvas" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <PixelCanvasDemo />
                    </div>
                  </div>
                ) : selectedScreen.id === "staggered-3d-grid" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <Staggered3DGrid />
                    </div>
                  </div>
                ) : selectedScreen.id === "scroll-layout-formations" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <OnScrollLayoutFormations />
                    </div>
                  </div>
                ) : selectedScreen.id === "gradient-slider" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <GradientSlider />
                    </div>
                  </div>
                ) : selectedScreen.id === "3d-letters-menu" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <ThreeDLettersMenuHover />
                    </div>
                  </div>
                ) : selectedScreen.id === "onscroll-letter-animations" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <OnScrollLetterAnimations />
                    </div>
                  </div>
                ) : selectedScreen.id === "circular-text-effect" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <CircularTextEffect />
                    </div>
                  </div>
                ) : selectedScreen.id === "sticky-grid-scroll" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <StickyGridScroll />
                    </div>
                  </div>
                ) : selectedScreen.id === "infinite-scroll-parallax" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <InfiniteScrollParallax />
                    </div>
                  </div>
                ) : selectedScreen.id === "gradient-shimmer" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl">
                      <GradientShimmerDemo />
                    </div>
                  </div>
                ) : selectedScreen.id === "bunny-player" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-black">
                      <BunnyPlayer />
                    </div>
                  </div>
                ) : selectedScreen.id === "globe-webgl" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-white animate-fade-in">
                      <GlobeDemo />
                    </div>
                  </div>
                ) : selectedScreen.id === "vertical-image-stack" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-md h-[500px] rounded-2xl overflow-hidden border border-white/10 shadow-2xl bg-[#fafafa]">
                      <VerticalImageStackDemo />
                    </div>
                  </div>
                ) : selectedScreen.id === "worm-loader" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <div className="w-full max-w-md bg-neutral-900 border border-neutral-800 p-8 rounded-2xl flex items-center justify-center">
                      <WormLoaderDemo />
                    </div>
                  </div>
                ) : selectedScreen.id === "flip-button" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <FlipButtonDemo />
                  </div>
                ) : selectedScreen.id === "bubble-text" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <BubbleTextDemo />
                  </div>
                ) : selectedScreen.id === "progressive-flux-loader" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4">
                    <ProgressiveFluxLoaderDemo />
                  </div>
                ) : selectedScreen.id === "ink-reveal" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4 bg-[#fafafa]">
                    <div className="w-full max-w-2xl h-[400px] rounded-2xl overflow-hidden shadow-2xl border border-neutral-200">
                      <InkRevealDemo />
                    </div>
                  </div>
                ) : selectedScreen.id === "glow-horizon" ? (
                  <div className="w-full h-full flex items-center justify-center z-10 p-4 bg-[#050507]">
                    <div className="w-full max-w-2xl rounded-2xl overflow-hidden border border-neutral-800 shadow-2xl">
                      <GlowHorizonDemo />
                    </div>
                  </div>
                ) : (
                  /* Larger framed mockup for screenshots */
                  <div className="w-full max-w-[300px] aspect-[9/18.5] border-[7px] border-[#2c2c2e] rounded-[36px] overflow-hidden bg-black shadow-2xl flex flex-col">
                    {/* Status Bar */}
                    <div className="px-6 pt-2 flex justify-between items-center text-[11px] font-bold text-gray-500 z-10 select-none">
                      <span>9:41</span>
                      <div className="w-3 h-1.5 border border-gray-600 rounded-sm" />
                    </div>
                    <div className="flex-1 w-full overflow-hidden bg-black text-white relative">
                      {/* Render matching app frame screen content */}
                      {selectedScreen.id === "airbnb" && (
                        <div className="w-full h-full bg-white text-black flex flex-col pb-5">
                          <div className="p-4.5 border-b border-neutral-100">
                            <div className="w-full h-9 border border-neutral-200 rounded-full flex items-center px-4.5 text-[11px] text-neutral-500 font-bold">Where to? • Anywhere</div>
                          </div>
                          <div className="p-4.5 flex flex-col gap-2.5">
                            <div className="w-full aspect-video rounded-xl bg-neutral-100 overflow-hidden">
                              <img src="https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?q=80&w=300&auto=format&fit=crop" className="w-full h-full object-cover" />
                            </div>
                            <h4 className="font-extrabold text-sm text-neutral-800 mt-1">Ibiza, Spain</h4>
                            <p className="text-xs font-black text-neutral-800">$240 night</p>
                          </div>
                        </div>
                      )}
                      {selectedScreen.id === "stripe" && (
                        <div className="w-full h-full bg-[#0a2540] text-white flex flex-col p-6">
                          <h3 className="text-base font-extrabold text-sky-400">Oxygen UI Pro</h3>
                          <p className="text-xl font-black mt-1">$49.00 / mo</p>
                          <div className="flex flex-col gap-3.5 bg-white/5 border border-white/10 p-5 rounded-2xl mt-5">
                            <div className="w-full h-8.5 border border-white/10 rounded bg-white/5 px-3 text-[11px] flex items-center justify-between"><span>4242 4242 4242</span></div>
                            <button className="w-full h-9.5 rounded-xl bg-sky-500 text-[11px] font-black">Subscribe now</button>
                          </div>
                        </div>
                      )}
                      {selectedScreen.id === "notion" && (
                        <div className="w-full h-full bg-[#191919] text-white/90 flex">
                          <div className="w-18 bg-[#202020] border-r border-white/5 p-2.5" />
                          <div className="flex-1 p-5">
                            <h3 className="text-base font-black">🚀 Project Plan</h3>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}
              </div>

              {/* Screen sidebar details */}
              <div className="w-full md:w-80 bg-[#161720] border-t md:border-t-0 md:border-l border-white/[0.06] p-6 flex flex-col shrink-0">
                <div className="flex items-center gap-3.5 pb-5 border-b border-white/[0.05]">
                  <img src={selectedScreen.appLogo} alt={selectedScreen.appName} className="w-12 h-12 rounded-2xl object-cover border border-white/10" />
                  <div>
                    <h3 className="text-base font-black text-white leading-none">{selectedScreen.appName}</h3>
                    <p className="text-[11px] text-gray-500 font-bold mt-1">Platform: {selectedScreen.platform}</p>
                  </div>
                </div>

                <div className="py-5 flex flex-col gap-5 flex-1 overflow-y-auto no-scrollbar">
                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider">UI Category</span>
                    <p className="text-[15px] font-bold text-white mt-1">{selectedScreen.category}</p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider">UI Element</span>
                    <p className="text-sm font-bold text-gray-400 mt-1">{selectedScreen.uiElement}</p>
                  </div>

                  <div>
                    <span className="text-[11px] uppercase font-bold text-gray-500 tracking-wider">User Flow</span>
                    <p className="text-sm font-bold text-gray-400 mt-1">{selectedScreen.flow}</p>
                  </div>
                </div>

                <div className="pt-4 border-t border-white/[0.05] flex flex-col gap-2.5">
                  <button
                    onClick={(e) => handleToggleBookmark(selectedScreen.id, e)}
                    className={`flex h-11 w-full items-center justify-center gap-2 rounded-xl text-sm font-bold transition-all cursor-pointer ${
                      bookmarks.includes(selectedScreen.id)
                        ? "bg-red-500/10 border border-red-500/25 text-red-500 hover:bg-red-500/20"
                        : "bg-white text-black hover:bg-neutral-100"
                    }`}
                  >
                    <Heart className="w-4.5 h-4.5" fill={bookmarks.includes(selectedScreen.id) ? "currentColor" : "none"} />
                    <span>{bookmarks.includes(selectedScreen.id) ? "Saved in Bookmarks" : "Save Screen"}</span>
                  </button>

                  <button
                    onClick={(e) => handleCopyLink(selectedScreen.id, e)}
                    className="flex h-11 w-full items-center justify-center gap-2 rounded-xl border border-white/[0.06] bg-[#1a1c25] hover:bg-[#212330] text-gray-300 hover:text-white transition-colors text-sm font-semibold cursor-pointer"
                  >
                    <Share2 className="w-4.5 h-4.5" />
                    <span>Copy Screen Link</span>
                  </button>
                </div>

              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* 6. Spotlight Search Modal Overlay */}
      <AppleSpotlight 
        isOpen={isSpotlightOpen} 
        handleClose={() => setIsSpotlightOpen(false)} 
      />

    </div>
  );
}
