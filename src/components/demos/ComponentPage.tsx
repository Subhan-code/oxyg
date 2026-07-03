import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useParams, Link, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, Maximize2, Minimize2, RotateCcw, Copy, Terminal, Code, Home, ChevronRight, Menu, Smartphone, Tablet, Monitor, Grid, Search, ChevronDown, ChevronUp, Check, Settings, SlidersHorizontal, Shield } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

function useMeasure() {
  const ref = useRef<HTMLDivElement>(null);
  const [bounds, setBounds] = useState({ height: 0, width: 0 });

  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      setBounds({
        height: entry.contentRect.height,
        width: entry.contentRect.width
      });
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return [ref, bounds] as const;
}
import { categories } from '../../data';
import { LiquidMetalBackToTop } from '../oxygen-ui/liquid-metal-progress';
import TiltCard from './TiltCard';
import HoverExpand from './HoverExpand';
import InlineTestimonials from './InlineTestimonials';
import AppleSwitch from './AppleSwitch';
import ShinyButton from './ShinyButton';
import VideoAmbientDemo from './VideoAmbientDemo';
import FloatingNavbarDemo from './FloatingNavbarDemo';
import CalendarAnimation from './CalendarAnimation';
import CardFooterDemo from './CardFooterDemo';
import OsmoButtonsDemo from './OsmoButtonsDemo';
import AppleTimeline from './AppleTimeline';
import ViewTransitionDemo from './ViewTransitionDemo';
import DockMenuDemo from './DockMenuDemo';
import DynamicScrollProgressDemo from './DynamicScrollProgressDemo';
import LiquidMetalButtonDemo from './LiquidMetalButtonDemo';
import LiquidMetalProgressDemo from './LiquidMetalProgressDemo';
import AuraCardStackDemo from './AuraCardStackDemo';
import AuraPreloaderDemo from './AuraPreloaderDemo';
import AuraSubscribePillDemo from './AuraSubscribePillDemo';
import AuraChatPanelDemo from './AuraChatPanelDemo';
import ToolbarDemo from './ToolbarDemo';
import ExpandableTabsDemo from './ExpandableTabsDemo';
import DiaTextRevealDemo, { DiaTextRevealDemo2 } from './DiaTextRevealDemo';
import ProgressiveBlurDemo from './ProgressiveBlurDemo';
import AlbumStackGridDemo from './AlbumStackGridDemo';
import { AnimatedBeamDemo } from './AnimatedBeamDemo';
import { CalligraphDemo } from './CalligraphDemo';
import FlipClockDemo from './FlipClockDemo';
import SetupStepsDemo from './SetupStepsDemo';
import SpinningTextDemo from './SpinningTextDemo';
import OrbitalSpinnerDemo from './OrbitalSpinnerDemo';
import PartitionBarDemo from './PartitionBarDemo';
import TestimonialMarqueeDemo from './TestimonialMarqueeDemo';
import AddToCartDemo from './AddToCartDemo';
import QuantityPickerDemo from './QuantityPickerDemo';
import ButtonDemo from './ButtonDemo';
import AccordionFaqDemo from './AccordionFaqDemo';
import SpinningText02 from './SpinningText02';
import SwitchWithIconDemo from './SwitchWithIconDemo';
import { ButtonBlocksDemo } from './ButtonBlocksDemo';
import { HeatmapDemo } from './HeatmapDemo';
import SpinnersDemo from './SpinnersDemo';
import { DrawerDemo } from './DrawerDemo';
import { ResizableDemo } from './ResizableDemo';
import { SkeletonDemo } from './SkeletonDemo';
import HorizontalNavDemo from './HorizontalNavDemo';
import MarqueeBrandsDemo from './MarqueeBrandsDemo';
import { PartitionBarSizeDemo } from './PartitionBarSizeDemo';
import { ScrollImageTextRevealDemo } from './ScrollImageTextRevealDemo';
import { ScrollVelocityMarqueeDemo } from './ScrollVelocityMarqueeDemo';
import { AuroraBarsDemo } from './AuroraBarsDemo';
import { SignatureDemo } from './SignatureDemo';
import { WaveBackgroundDemo } from './WaveBackgroundDemo';
import { HorizontalDepthFadeDemo } from './HorizontalDepthFadeDemo';
import { OrbitalImageWheelDemo } from './OrbitalImageWheelDemo';
import SimpleMarqueeDemo from './SimpleMarqueeDemo';
import SlotTextDemo from './SlotTextDemo';
import MicroInteractionIconsDemo from './MicroInteractionIconsDemo';
import BouncyAccordionDemo from './BouncyAccordionDemo';
import ScrollDissolveRevealDemo from './ScrollDissolveRevealDemo';
import ImageRevealListDemo from './ImageRevealListDemo';
import MagneticSpotlightMarqueeDemo from './MagneticSpotlightMarqueeDemo';
import CircularScrollDemo from './CircularScrollDemo';
import ScrollBarDemo from './ScrollBarDemo';
import ScrollProgressDemo from './ScrollProgressDemo';
import CosmicSpectrumDemo from './CosmicSpectrumDemo';
import FallingPatternDemo from './FallingPatternDemo';
import YouCanScrollDemo from './YouCanScrollDemo';
import BeamsBackgroundDemo from './BeamsBackgroundDemo';
import LogoCloudDemo from './LogoCloudDemo';
import IntegrationsDemo from './IntegrationsDemo';
import ImageGalleryDemo from './ImageGalleryDemo';
import BlossomCarouselDemo from './BlossomCarouselDemo';
import SocialButtonDemo from './SocialButtonDemo';
import SmoothDrawerDemo from './SmoothDrawerDemo';
import PricingSectionsDemo from './PricingSectionsDemo';
import { componentSources } from '../../component-sources';
import { SpacedChat } from './SpacedChat';
import { Skiper21 } from './Skiper21';
import Scrubber from './Scrubber';
import SignInDrawer from './SignInDrawer';
import { FlowScroll } from '../ui/flow-scroll';
import { GlowingScrollIndicator } from '../ui/glowing-scroll-indicator';
import { ScrollEffect } from '../ui/scroll-effect';
import { PixelatedCarousel } from '../ui/pixelated-carousel';
import { CircularTextEffect } from './CircularTextEffect';
import { AppleSpotlight } from '../ui/apple-spotlight';
import { UnderlayActionSheet } from './UnderlayActionSheet';
import { MotionBlur } from './MotionBlur';
import { ProgressiveBlur } from './ProgressiveBlur';
import InputMorphMessage from './InputMorphMessage';
import LabelIndicatorCarousel from './LabelIndicatorCarousel';
import SwipeableStackCards from './SwipeableStackCards';
import Subtle3DCarousel from './Subtle3DCarousel';
import GooeyMenu from './GooeyMenu';
import DraggableCurvedMenu from './DraggableCurvedMenu';
import RunStatsStacks from './RunStatsStacks';
import Timeline from './Timeline';
import ThreeDPhotoCarousel3 from './ThreeDPhotoCarousel3';
import ThreeDPhotoCarousel from './ThreeDPhotoCarousel';
import FamilyPopoverMenu from './FamilyPopoverMenu';
import ScrollRevealAnimationCSS from './ScrollRevealAnimationCSS';
import { ButtonGooey } from './ButtonGooey';
import { DistortedGlass } from './DistortedGlass';
import { FractalGlass } from './FractalGlass';
import MagneticBackgroundTabs from './MagneticBackgroundTabs';
import { Scene } from '../animationsdev/scene';
import AdaptiveCaretDemo from './AdaptiveCaretDemo';
import CustomCursorDemo from './CustomCursorDemo';
import { FoldableMap } from './FoldableMap';
import MagneticButtonDemo from './MagneticButtonDemo';
import { MaskAnimation } from './MaskAnimation';
import { ScrollAnimation } from './ScrollAnimation';
import WillemLoader from './WillemLoader';
import UnderlayNav from './UnderlayNav';
import BunnyPlayer from './BunnyPlayer';
import ThreeJSWarpGallery from './ThreeJSWarpGallery';
import WebGLPageTransitions from './WebGLPageTransitions';
import WebGLMagazine from './WebGLMagazine';
import R3FExperimentalCarousel from './R3FExperimentalCarousel';
import ThreeDTextAnimation from './ThreeDTextAnimation';
import ElasticGridScroll from './ElasticGridScroll';
import GooeySearch from './GooeySearch';
import ThreeDInfiniteParallaxCarousel from './ThreeDInfiniteParallaxCarousel';
import PixelCanvasDemo from './PixelCanvasDemo';
import Staggered3DGrid from './Staggered3DGrid';
import OnScrollLayoutFormations from './OnScrollLayoutFormations';
import GradientSlider from './GradientSlider';
import ThreeDLettersMenuHover from './ThreeDLettersMenuHover';
import { OnScrollLetterAnimations } from './OnScrollLetterAnimations';
import { StickyGridScroll } from './StickyGridScroll';
import { InfiniteScrollParallax } from './InfiniteScrollParallax';
import { GradientShimmerDemo } from './GradientShimmerDemo';
import GlobeDemo from './GlobeDemo';
import VerticalImageStackDemo from './VerticalImageStackDemo';
import WormLoaderDemo from './WormLoaderDemo';
import FlipButtonDemo from './FlipButtonDemo';
import BubbleTextDemo from './BubbleTextDemo';
import ProgressiveFluxLoaderDemo from './ProgressiveFluxLoaderDemo';
import InkRevealDemo from './InkRevealDemo';
import GlowHorizonDemo from './GlowHorizonDemo';

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
    "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1604871000636-074fa5117945?q=80&w=800&auto=format&fit=crop"
  ],
  end: [
    "https://images.unsplash.com/photo-1579783900882-c0d3dad7b119?q=80&w=600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541701494587-cb58502866ab?q=80&w=800&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1550684848-fac1c5b4e853?q=80&w=800&auto=format&fit=crop"
  ]
};

const LOCAL_PLAYGROUND_MAP: Record<string, any> = {
  "spaced-chat-input": SpacedChat,
  "skiper-21": Skiper21,
  "scrubber": Scrubber,
  "signin-drawer": SignInDrawer,
  "flow-scroll": FlowScroll,
  "glowing-scroll-indicator": GlowingScrollIndicator,
  "scroll-effect": ScrollEffect,
  "pixelated-carousel": PixelatedCarousel,
  "skiper-34": Skiper34,
  "apple-spotlight": AppleSpotlight,
  "underlay-action-sheet": UnderlayActionSheet,
  "motion-blur": MotionBlur,
  "progressive-blur": ProgressiveBlur,
  "input-morph-message": InputMorphMessage,
  "label-indicator-carousel": LabelIndicatorCarousel,
  "swipeable-stack-cards": SwipeableStackCards,
  "subtle-3d-carousel": Subtle3DCarousel,
  "gooey-menu": GooeyMenu,
  "draggable-curved-menu": DraggableCurvedMenu,
  "run-stats-stacks": RunStatsStacks,
  "timeline-indicator": Timeline,
  "three-d-photo-carousel-3": ThreeDPhotoCarousel3,
  "three-d-photo-carousel": ThreeDPhotoCarousel,
  "family-popover-menu": FamilyPopoverMenu,
  "scroll-reveal-css": ScrollRevealAnimationCSS,
  "gooey-button": ButtonGooey,
  "distorted-glass": DistortedGlass,
  "fractal-glass-panels": FractalGlass,
  "magnetic-tabs": MagneticBackgroundTabs,
  "scene": Scene,
  "adaptive-caret": AdaptiveCaretDemo,
  "custom-cursor": CustomCursorDemo,
  "foldable-map": FoldableMap,
  "magnetic-button": MagneticButtonDemo,
  "mask-animation": MaskAnimation,
  "scroll-animation": ScrollAnimation,
  "willem-loader": WillemLoader,
  "underlay-nav": UnderlayNav,
  "bunny-player": BunnyPlayer,
  "three-js-warp-gallery": ThreeJSWarpGallery,
  "webgl-page-transitions": WebGLPageTransitions,
  "webgl-magazine": WebGLMagazine,
  "r3f-experimental-carousel": R3FExperimentalCarousel,
  "three-d-text-animation": ThreeDTextAnimation,
  "elastic-grid-scroll": ElasticGridScroll,
  "gooey-search": GooeySearch,
  "three-d-infinite-parallax-carousel": ThreeDInfiniteParallaxCarousel,
  "pixel-canvas-demo": PixelCanvasDemo,
  "staggered-3d-grid": Staggered3DGrid,
  "on-scroll-layout-formations": OnScrollLayoutFormations,
  "gradient-slider": GradientSlider,
  "three-d-letters-menu-hover": ThreeDLettersMenuHover,
  "on-scroll-letter-animations": OnScrollLetterAnimations,
  "circular-text-effect": CircularTextEffect,
  "sticky-grid-scroll": StickyGridScroll,
  "infinite-scroll-parallax": InfiniteScrollParallax,
  "gradient-shimmer": GradientShimmerDemo,
  "globe-demo": GlobeDemo,
  "vertical-image-stack-demo": VerticalImageStackDemo,
  "worm-loader-demo": WormLoaderDemo,
  "flip-button-demo": FlipButtonDemo,
  "bubble-text-demo": BubbleTextDemo,
  "progressive-flux-loader-demo": ProgressiveFluxLoaderDemo,
  "ink-reveal-demo": InkRevealDemo,
  "glow-horizon-demo": GlowHorizonDemo
};
import { SidebarToggleIcon } from '../SidebarToggleIcon';
import {
  Sidebar001,
  Sidebar001Header,
  Sidebar001Content,
  Sidebar001Group,
  Sidebar001Item,
} from '../Sidebar001';
import { Tooltip, TooltipTrigger, TooltipContent } from '../ui/tooltip';
import { useTheme } from '../theme-provider';
import { PlaygroundPill } from '../PlaygroundPill';
import { WaveBackground } from '../oxygen-ui/wave-background';
import { AuroraBars } from '../oxygen-ui/aurora-bars';
import { Skiper99 } from '../oxygen-ui/Skiper99';
import { Skiper40 } from '../oxygen-ui/Skiper40';
import { Skiper37 } from '../oxygen-ui/Skiper37';
import { Skiper47 } from '../oxygen-ui/Skiper47';
import { Skiper48 } from '../oxygen-ui/Skiper48';
import { Skiper54 } from '../oxygen-ui/Skiper54';
import { Skiper51 } from '../oxygen-ui/Skiper51';
import { Skiper41 } from '../oxygen-ui/Skiper41';
import { Skiper34 } from '../oxygen-ui/Skiper34';
import { Skiper16 } from '../oxygen-ui/Skiper16';
import { Skiper17 } from '../oxygen-ui/Skiper17';
import { Skiper19 } from '../oxygen-ui/Skiper19';
import { Skiper26 } from '../oxygen-ui/Skiper26';
import { Skiper28 } from '../oxygen-ui/Skiper28';
import { Skiper63 } from '../oxygen-ui/Skiper63';
import { Skiper87 } from '../oxygen-ui/Skiper87';
import { Skiper61 } from '../oxygen-ui/Skiper61';
import { Skiper64 } from '../oxygen-ui/Skiper64';
import { Skiper66 } from '../oxygen-ui/Skiper66';
import { Skiper67 } from '../oxygen-ui/Skiper67';
import { Skiper25 } from '../oxygen-ui/Skiper25';
import { Skiper3 } from '../oxygen-ui/Skiper3';
import { Skiper58 } from '../oxygen-ui/Skiper58';
import { Skiper4 } from '../oxygen-ui/Skiper4';
import { Skiper31 } from '../oxygen-ui/Skiper31';
import { Skiper30 } from '../oxygen-ui/Skiper30';
import { Skiper62 } from '../oxygen-ui/Skiper62';
import { Skiper102 } from '../oxygen-ui/Skiper102';

const componentFilesMap: Record<string, { label: string; key: string }[]> = {
  'expandable-tabs': [
    { label: 'ExpandableTabs.tsx', key: 'expandable-tabs' }
  ],
  'orbital-image-wheel': [
    { label: 'orbital-image-wheel.tsx', key: 'orbital-image-wheel' },
    { label: 'motion-subtitle.tsx', key: 'motion-subtitle' }
  ],
  'wave-background': [
    { label: 'wave-background.tsx', key: 'wave-background' }
  ],
  'horizontal-depth-fade': [
    { label: 'horizontal-depth-fade.tsx', key: 'horizontal-depth-fade' }
  ],
  'signature': [
    { label: 'Signature.tsx', key: 'signature' }
  ],
  'aurora-bars': [
    { label: 'aurora-bars.tsx', key: 'aurora-bars' }
  ],
  'simple-marquee': [
    { label: 'simple-marquee.tsx', key: 'simple-marquee' }
  ],
  'slot-text': [
    { label: 'SlotText.tsx', key: 'slot-text' }
  ],
  'micro-interaction-icons': [
    { label: 'MicroInteractionIcons.tsx', key: 'micro-interaction-icons' }
  ],
  'bouncy-accordion': [
    { label: 'BouncyAccordion.tsx', key: 'bouncy-accordion' }
  ],
  'circular-scroll': [
    { label: 'CircularScroll.tsx', key: 'circular-scroll' }
  ],
  'scroll-bar': [
    { label: 'ScrollBar.tsx', key: 'scroll-bar' }
  ],
  'scroll-progress': [
    { label: 'ScrollProgress.tsx', key: 'scroll-progress' }
  ],
  'cosmic-spectrum': [
    { label: 'CosmicSpectrum.tsx', key: 'CosmicSpectrum' }
  ],
  'falling-pattern': [
    { label: 'FallingPattern.tsx', key: 'FallingPattern' }
  ],
  'you-can-scroll': [
    { label: 'YouCanScroll.tsx', key: 'YouCanScroll' }
  ],
  'beams-background': [
    { label: 'beams-background.tsx', key: 'beams-background' }
  ],
  'logo-cloud': [
    { label: 'logo-cloud.tsx', key: 'logo-cloud' }
  ],
  'integrations': [
    { label: 'integrations.tsx', key: 'integrations' }
  ],
  'image-gallery': [
    { label: 'image-gallery.tsx', key: 'image-gallery' },
    { label: 'lazy-image.tsx', key: 'lazy-image' }
  ],
  'blossom-carousel': [
    { label: 'blossom-carousel.tsx', key: 'blossom-carousel' }
  ],
  'social-button': [
    { label: 'social-button.tsx', key: 'social-button' }
  ],
  'smooth-drawer': [
    { label: 'smooth-drawer.tsx', key: 'smooth-drawer' },
    { label: 'drawer.tsx', key: 'drawer-primitive' }
  ],
  'pricing-sections': [
    { label: 'pricing-section-1.tsx', key: 'pricing-section-1' },
    { label: 'pricing-section-2.tsx', key: 'pricing-section-2' },
    { label: 'pricing-section-3.tsx', key: 'pricing-section-3' },
    { label: 'pricing-section-4.tsx', key: 'pricing-section-4' },
    { label: 'pricing-card-parts.tsx', key: 'pricing-card-parts' },
    { label: 'frequency-toggle.tsx', key: 'frequency-toggle' }
  ],
  'skiper-99': [
    { label: 'Skiper99.tsx', key: 'skiper-99' }
  ],
  'skiper-40': [
    { label: 'Skiper40.tsx', key: 'skiper-40' }
  ],
  'skiper-37': [
    { label: 'Skiper37.tsx', key: 'skiper-37' }
  ],
  'skiper-47': [
    { label: 'Skiper47.tsx', key: 'skiper-47' }
  ],
  'skiper-48': [
    { label: 'Skiper48.tsx', key: 'skiper-48' }
  ],
  'skiper-54': [
    { label: 'Skiper54.tsx', key: 'skiper-54' },
    { label: 'carousel.tsx', key: 'carousel-primitive' }
  ],
  'skiper-51': [
    { label: 'Skiper51.tsx', key: 'skiper-51' }
  ],
  'skiper-41': [
    { label: 'Skiper41.tsx', key: 'skiper-41' }
  ],
  'skiper-34': [
    { label: 'Skiper34.tsx', key: 'skiper-34' }
  ],
  'skiper-16': [
    { label: 'Skiper16.tsx', key: 'skiper-16' }
  ],
  'skiper-19': [
    { label: 'Skiper19.tsx', key: 'skiper-19' }
  ],
  'skiper-26': [
    { label: 'Skiper26.tsx', key: 'skiper-26' }
  ],
  'skiper-28': [
    { label: 'Skiper28.tsx', key: 'skiper-28' }
  ],
  'skiper-63': [
    { label: 'Skiper63.tsx', key: 'skiper-63' }
  ],
  'skiper-87': [
    { label: 'Skiper87.tsx', key: 'skiper-87' }
  ],
  'skiper-61': [
    { label: 'Skiper61.tsx', key: 'skiper-61' }
  ],
  'skiper-64': [
    { label: 'Skiper64.tsx', key: 'skiper-64' }
  ],
  'skiper-66': [
    { label: 'Skiper66.tsx', key: 'skiper-66' }
  ],
  'skiper-67': [
    { label: 'Skiper67.tsx', key: 'skiper-67' }
  ],
  'skiper-25': [
    { label: 'Skiper25.tsx', key: 'skiper-25' }
  ],
  'skiper-3': [
    { label: 'Skiper3.tsx', key: 'skiper-3' }
  ],
  'skiper-58': [
    { label: 'Skiper58.tsx', key: 'skiper-58' }
  ],
  'skiper-4': [
    { label: 'Skiper4.tsx', key: 'skiper-4' }
  ],
  'skiper-31': [
    { label: 'Skiper31.tsx', key: 'skiper-31' }
  ],
  'skiper-30': [
    { label: 'Skiper30.tsx', key: 'skiper-30' }
  ]
};

const getInitialSettingsForComponent = (componentName: string | undefined): Record<string, any> => {
  if (componentName === 'wave-background') {
    return {
      variant: 'ambient',
      direction: 'down',
      height: 120,
      speed: 1,
      amplitude: 28,
      fill: '#10b981',
      background: '#0c0a09'
    };
  }
  if (componentName === 'aurora-bars') {
    return {
      barCount: 24,
      speed: 0.5,
      blur: 0,
      gap: 3,
      maxHeightRatio: 0.92,
      minHeightRatio: 0.18,
      presetIdx: 0
    };
  }
  if (componentName === 'shiny-button') {
    return {
      shineSpeed: 1.5
    };
  }
  if (componentName === 'simple-marquee') {
    return {
      velocity: 4
    };
  }
  if (componentName === 'tilt-card') {
    return {
      maxAngle: 15
    };
  }
  if (componentName === 'skiper-4') {
    return {
      scale: 0,
      gap: 0,
      flexDirection: 'row',
    };
  }
  return {
    showScrollCard: true,
    showPercent: false,
  };
};

export default function ComponentPage() {
  const { name: paramName } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const name = paramName || location.pathname.split("/components/")[1]?.split("/")[0];
  const { theme, toggleTheme } = useTheme();
  const [copied, setCopied] = useState(false);
  const [codeCopied, setCodeCopied] = useState(false);
  const [compCodeCopied, setCompCodeCopied] = useState(false);
  const [key, setKey] = useState(0);

  const [activeCodeTab, setActiveCodeTab] = useState<string>(() => {
    const files = componentFilesMap[name || ''] || [
      { label: `${name}.tsx`, key: name || '' }
    ];
    return files[0].key;
  });
  const [isCodeExpanded, setIsCodeExpanded] = useState<boolean>(false);
  const [isUsageExpanded, setIsUsageExpanded] = useState<boolean>(false);
  const [codeSearchQuery, setCodeSearchQuery] = useState<string>('');

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  // infoFullscreen: info block covers full viewport (triggered at 60% scroll)
  const [infoFullscreen, setInfoFullscreen] = useState(false);

  const sidebarRef = useRef<HTMLDivElement>(null);
  const toggleBtnRef = useRef<HTMLButtonElement>(null);
  const scrollableContainerRef = useRef<HTMLDivElement>(null);

  // Resizable pane
  const [leftWidthPercent, setLeftWidthPercent] = useState(50);
  const [isDragging, setIsDragging] = useState(false);

  // New playground toolbar features
  const [previewSize, setPreviewSize] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  const [showGrid, setShowGrid] = useState(true);
  const [hoveredBtn, setHoveredBtn] = useState<string | null>(null);
  const [showToolbarSettings, setShowToolbarSettings] = useState(false);

  const [componentSettings, setComponentSettings] = useState<Record<string, any>>(() => 
    getInitialSettingsForComponent(name)
  );

  // Check if we are in full screen mode (legacy support)
  const isFullScreen = new URLSearchParams(location.search).get('full') === 'true';

  useEffect(() => {
    // Every time component switches, reset all layout states
    if (window.innerWidth >= 768) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
    setIsExpanded(false);
    setInfoFullscreen(false);
    setLeftWidthPercent(50);

    const files = componentFilesMap[name || ''] || [
      { label: `${name}.tsx`, key: name || '' }
    ];
    setActiveCodeTab(files[0].key);
    setIsCodeExpanded(false);
    setIsUsageExpanded(false);
    setCodeSearchQuery('');
    setComponentSettings(getInitialSettingsForComponent(name));
  }, [name]);

  // Scroll-driven info fullscreen:
  // When user scrolls past 60% of the info panel, it expands to cover the full viewport.
  // Scrolling back below 60% collapses it. Bidirectional, works every time.
  useEffect(() => {
    const container = scrollableContainerRef.current;
    if (!container) return;

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const scrollableHeight = scrollHeight - clientHeight;
      if (scrollableHeight <= 0) return;
      const pct = scrollTop / scrollableHeight;
      setInfoFullscreen(pct > 0.6);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });
    return () => container.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isSidebarOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node) &&
        toggleBtnRef.current &&
        !toggleBtnRef.current.contains(event.target as Node)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isSidebarOpen]);

  // Mobile Swipe Gestures
  useEffect(() => {
    let touchStartX = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStartX = e.changedTouches[0].screenX;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndX = e.changedTouches[0].screenX;
      // Swipe right from the left edge (within 40px) opens sidebar
      if (touchEndX - touchStartX > 80 && touchStartX < 40 && !isSidebarOpen) {
        setIsSidebarOpen(true);
      }
    };
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [isSidebarOpen]);

  const handleDragDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handleDragMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const newPercent = (e.clientX / window.innerWidth) * 100;
    setLeftWidthPercent(Math.max(20, Math.min(80, newPercent)));
  };

  const handleDragUp = (e: React.PointerEvent) => {
    setIsDragging(false);
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch (err) { }
  };

  // Find the item matching the name
  let componentItem = null;
  for (const category of categories) {
    const found = category.items.find(i => i.name === name);
    if (found) {
      componentItem = found;
      break;
    }
  }

  // Fallback lookup in LOCAL_PLAYGROUND_MAP
  if (!componentItem) {
    if (name && LOCAL_PLAYGROUND_MAP[name]) {
      componentItem = {
        name: name,
        title: name.split("-").map(w => w.charAt(0).toUpperCase() + w.slice(1)).join(" "),
        description: `Oxygen UI interactive component sandbox playground for ${name}.`,
        author: "Oxygen UI",
        releaseDate: "2026-07-01",
        video: "",
      };
    }
  }

  if (!componentItem) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center text-white bg-black">
        <h1 className="text-2xl font-bold mb-2">Component Not Found</h1>
        <p className="text-sm text-neutral-400 mb-6 font-mono">
          Parsed Name: "{name}" | Pathname: "{location.pathname}" | ParamName: "{paramName}"
        </p>
        <Link to="/" className="text-foreground/70 hover:text-foreground underline">Back to home</Link>
      </div>
    );
  }

  let DemoComponent: React.ComponentType | (() => React.ReactNode);
  
  if (name && LOCAL_PLAYGROUND_MAP[name]) {
    DemoComponent = LOCAL_PLAYGROUND_MAP[name];
  } else {
    switch (name) {
    case 'tilt-card':
      DemoComponent = TiltCard;
      break;
    case 'hover-expand':
      DemoComponent = HoverExpand;
      break;
    case 'inline-testimonials':
      DemoComponent = InlineTestimonials;
      break;
    case 'apple-switch':
      DemoComponent = AppleSwitch;
      break;
    case 'shiny-button':
      DemoComponent = ShinyButton;
      break;
    case 'video-ambient':
      DemoComponent = VideoAmbientDemo;
      break;
    case 'floating-navbar':
      DemoComponent = FloatingNavbarDemo;
      break;
    case 'calendar-animation':
      DemoComponent = CalendarAnimation;
      break;
    case 'card-footer':
      DemoComponent = CardFooterDemo;
      break;
    case 'osmo-buttons':
      DemoComponent = OsmoButtonsDemo;
      break;
    case 'apple-timeline':
      DemoComponent = AppleTimeline;
      break;
    case 'view-transitions':
      DemoComponent = ViewTransitionDemo;
      break;
    case 'dock-menu':
      DemoComponent = DockMenuDemo;
      break;
    case 'toolbar':
      DemoComponent = ToolbarDemo;
      break;
    case 'expandable-tabs':
      DemoComponent = ExpandableTabsDemo;
      break;
    case 'dia-text-reveal':
      DemoComponent = DiaTextRevealDemo;
      break;
    case 'dia-text-reveal-2':
      DemoComponent = DiaTextRevealDemo2;
      break;
    case 'progressive-blur':
      DemoComponent = ProgressiveBlurDemo;
      break;
    case 'animated-beam':
      DemoComponent = AnimatedBeamDemo;
      break;
    case 'calligraph':
      DemoComponent = CalligraphDemo;
      break;
    case 'dynamic-scroll-progress':
      DemoComponent = DynamicScrollProgressDemo;
      break;
    case 'liquid-metal-progress':
      DemoComponent = LiquidMetalProgressDemo;
      break;
    case 'liquid-metal-button':
      DemoComponent = LiquidMetalButtonDemo;
      break;
    case 'aura-card-stack':
      DemoComponent = AuraCardStackDemo;
      break;
    case 'aura-preloader':
      DemoComponent = AuraPreloaderDemo;
      break;
    case 'aura-subscribe-pill':
      DemoComponent = AuraSubscribePillDemo;
      break;
    case 'aura-chat':
      DemoComponent = AuraChatPanelDemo;
      break;
    case 'album-stack-grid':
      DemoComponent = AlbumStackGridDemo;
      break;
    case 'flip-clock':
      DemoComponent = FlipClockDemo;
      break;
    case 'setup-steps':
      DemoComponent = SetupStepsDemo;
      break;
    case 'spinning-text':
      DemoComponent = SpinningTextDemo;
      break;
    case 'orbital-spinner':
      DemoComponent = OrbitalSpinnerDemo;
      break;
    case 'partition-bar':
      DemoComponent = PartitionBarDemo;
      break;
    case 'testimonial-marquee':
      DemoComponent = TestimonialMarqueeDemo;
      break;
    case 'add-to-cart':
      DemoComponent = AddToCartDemo;
      break;
    case 'quantity-picker':
      DemoComponent = QuantityPickerDemo;
      break;
    case 'button-demo':
      DemoComponent = ButtonDemo;
      break;
    case 'accordion-faq':
      DemoComponent = AccordionFaqDemo;
      break;
    case 'spinning-text-02':
      DemoComponent = SpinningText02;
      break;
    case 'switch-with-icon':
      DemoComponent = SwitchWithIconDemo;
      break;
    case 'button-blocks':
      DemoComponent = ButtonBlocksDemo;
      break;
    case 'heatmap':
      DemoComponent = HeatmapDemo;
      break;
    case 'spinners':
      DemoComponent = SpinnersDemo;
      break;
    case 'drawer':
      DemoComponent = DrawerDemo;
      break;
    case 'resizable':
      DemoComponent = ResizableDemo;
      break;
    case 'skeleton':
      DemoComponent = SkeletonDemo;
      break;
    case 'horizontal-nav':
      DemoComponent = HorizontalNavDemo;
      break;
    case 'marquee-brands':
      DemoComponent = MarqueeBrandsDemo;
      break;
    case 'partition-bar-sizes':
      DemoComponent = PartitionBarSizeDemo;
      break;
    case 'scroll-image-text-reveal':
      DemoComponent = ScrollImageTextRevealDemo;
      break;
    case 'scroll-velocity-marquee':
      DemoComponent = ScrollVelocityMarqueeDemo;
      break;
    case 'aurora-bars': {
      const presetColors = [
        ["#ffd6eb", "#ff9acb", "#ff5aa6", "#ff2d78", "#00000000"],
        ["#c7f9cc", "#80ed99", "#57cc99", "#38a3a5", "#22577a", "#00000000"],
        ["#ff007f", "#7f00ff", "#00f0ff", "#00000000"],
        ["#ffb56b", "#f85c50", "#9e0059", "#ff2d78", "#00000000"]
      ];
      DemoComponent = (props: any) => (
        <div className="w-full h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center p-1">
          <div className="w-full h-full rounded-[1.8rem] overflow-hidden">
            <AuroraBars
              barCount={props.barCount ?? 24}
              speed={props.speed ?? 0.5}
              blur={props.blur ?? 0}
              gap={props.gap ?? 3}
              maxHeightRatio={props.maxHeightRatio ?? 0.92}
              minHeightRatio={props.minHeightRatio ?? 0.18}
              colors={presetColors[props.presetIdx ?? 0]}
            />
          </div>
        </div>
      );
      break;
    }
    case 'wave-background':
      DemoComponent = (props: any) => (
        <div className="w-full relative overflow-hidden bg-zinc-950 flex flex-col justify-between min-h-[300px] h-full">
          <div className="flex-1 w-full flex items-center justify-center relative">
            <div className="w-full absolute bottom-0 inset-x-0">
              <WaveBackground
                variant={props.variant || "ambient"}
                direction={props.direction || "down"}
                height={props.height || 120}
                speed={props.speed || 1}
                amplitude={props.amplitude || 28}
                fill={props.fill || "#10b981"}
                background={props.background || "#0c0a09"}
              />
            </div>
            <div className="text-center z-10 text-white p-8">
              <h4 className="text-lg font-black tracking-tight uppercase">Section Divider</h4>
              <p className="text-xs text-white/50 mt-1">Configure waves in the settings pill below</p>
            </div>
          </div>
        </div>
      );
      break;
    case 'signature':
      DemoComponent = SignatureDemo;
      break;
    case 'horizontal-depth-fade':
      DemoComponent = HorizontalDepthFadeDemo;
      break;
    case 'orbital-image-wheel':
      DemoComponent = OrbitalImageWheelDemo;
      break;
    case 'simple-marquee':
      DemoComponent = SimpleMarqueeDemo;
      break;
    case 'slot-text':
      DemoComponent = SlotTextDemo;
      break;
    case 'micro-interaction-icons':
      DemoComponent = MicroInteractionIconsDemo;
      break;
    case 'bouncy-accordion':
      DemoComponent = BouncyAccordionDemo;
      break;
    case 'circular-scroll':
      DemoComponent = CircularScrollDemo;
      break;
    case 'scroll-dissolve-reveal':
      DemoComponent = ScrollDissolveRevealDemo;
      break;
    case 'image-reveal-list':
      DemoComponent = ImageRevealListDemo;
      break;
    case 'magnetic-spotlight-marquee':
      DemoComponent = MagneticSpotlightMarqueeDemo;
      break;
    case 'scroll-bar':
      DemoComponent = ScrollBarDemo;
      break;
    case 'scroll-progress':
      DemoComponent = ScrollProgressDemo;
      break;
    case 'cosmic-spectrum':
      DemoComponent = CosmicSpectrumDemo;
      break;
    case 'falling-pattern':
      DemoComponent = FallingPatternDemo;
      break;
    case 'you-can-scroll':
      DemoComponent = YouCanScrollDemo;
      break;
    case 'beams-background':
      DemoComponent = BeamsBackgroundDemo;
      break;
    case 'logo-cloud':
      DemoComponent = LogoCloudDemo;
      break;
    case 'integrations':
      DemoComponent = IntegrationsDemo;
      break;
    case 'image-gallery':
      DemoComponent = ImageGalleryDemo;
      break;
    case 'blossom-carousel':
      DemoComponent = BlossomCarouselDemo;
      break;
    case 'social-button':
      DemoComponent = SocialButtonDemo;
      break;
    case 'smooth-drawer':
      DemoComponent = SmoothDrawerDemo;
      break;
    case 'pricing-sections':
      DemoComponent = PricingSectionsDemo;
      break;
    case 'skiper-99':
      DemoComponent = Skiper99;
      break;
    case 'skiper-40':
      DemoComponent = Skiper40;
      break;
    case 'skiper-37':
      DemoComponent = Skiper37;
      break;
    case 'skiper-47':
      DemoComponent = Skiper47;
      break;
    case 'skiper-48':
      DemoComponent = Skiper48;
      break;
    case 'skiper-54':
      DemoComponent = Skiper54;
      break;
    case 'skiper-51':
      DemoComponent = Skiper51;
      break;
    case 'skiper-41':
      DemoComponent = Skiper41;
      break;
    case 'skiper-34':
      DemoComponent = Skiper34;
      break;
    case 'skiper-16':
      DemoComponent = Skiper16;
      break;
    case 'skiper-17':
      DemoComponent = Skiper17;
      break;
    case 'skiper-19':
      DemoComponent = Skiper19;
      break;
    case 'skiper-26':
      DemoComponent = Skiper26;
      break;
    case 'skiper-28':
      DemoComponent = Skiper28;
      break;
    case 'skiper-63':
      DemoComponent = Skiper63;
      break;
    case 'skiper-87':
      DemoComponent = Skiper87;
      break;
    case 'skiper-61':
      DemoComponent = Skiper61;
      break;
    case 'skiper-64':
      DemoComponent = Skiper64;
      break;
    case 'skiper-66':
      DemoComponent = Skiper66;
      break;
    case 'skiper-67':
      DemoComponent = Skiper67;
      break;
    case 'skiper-25':
      DemoComponent = Skiper25;
      break;
    case 'skiper-3':
      DemoComponent = Skiper3;
      break;
    case 'skiper-58':
      DemoComponent = Skiper58;
      break;
    case 'skiper-4':
      DemoComponent = Skiper4;
      break;
    case 'skiper-31':
      DemoComponent = Skiper31;
      break;
    case 'skiper-30':
      DemoComponent = Skiper30;
      break;
    case 'skiper-62':
      DemoComponent = Skiper62;
      break;
    case 'skiper-102':
      DemoComponent = Skiper102;
      break;
    default:
      DemoComponent = () => (
        <div className="flex flex-col items-center justify-center p-10 h-full w-full">
          <div className="text-muted-foreground text-center">
            <p className="text-lg font-medium mb-4">Coming Soon</p>
            {componentItem.video && (
              <video
                src={componentItem.video}
                loop
                muted
                autoPlay
                playsInline
                className="w-full max-w-lg rounded-2xl border border-border mx-auto"
              />
            )}
          </div>
        </div>
      );
    }
  }

  const componentNamePascal = componentItem.title.replace(/\s+/g, '');
  
  let installCmd = `npx shadcn@latest add @oxygen-ui/${componentItem.name}`;
  if (componentItem.name === 'simple-marquee') {
    installCmd = `pnpm dlx shadcn add @fancy/simple-marquee`;
  }
  if (componentItem.name.startsWith('skiper-')) {
    installCmd = `npx shadcn add @skiper-ui/${componentItem.name.replace('-', '')}`;
  }

  const codeExample = `"use client";\n\nimport { motion } from "motion/react";\nimport { ${componentNamePascal} } from "@/src/components/ui/${componentItem.name}";\n\nexport default function Page() {\n  return (\n    <div className="flex items-center justify-center min-h-screen">\n      <${componentNamePascal} />\n    </div>\n  )\n}`;

  const copyInstall = () => {
    navigator.clipboard.writeText(installCmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const copyCode = () => {
    navigator.clipboard.writeText(codeExample);
    setCodeCopied(true);
    setTimeout(() => setCodeCopied(false), 2000);
  };

  const copyComponentCode = () => {
    if (componentSources[activeCodeTab]) {
      navigator.clipboard.writeText(componentSources[activeCodeTab]);
      setCompCodeCopied(true);
      setTimeout(() => setCompCodeCopied(false), 2000);
    }
  };


  const renderToolbarSettings = () => {
    const hasSettings = [
      'tilt-card', 'shiny-button', 'wave-background', 'simple-marquee', 'aurora-bars', 'skiper-4'
    ].includes(name || '');

    if (!hasSettings) {
      return (
        <div className="py-5 px-6 text-center text-sm text-muted-foreground font-medium">
          There aren't any settings for this component.
        </div>
      );
    }

    switch (name) {
      case 'wave-background':
        return (
          <div className="flex flex-col gap-3 p-2 min-w-[280px]">
            {/* Variant */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-neutral-400">Variant</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Scroll Morph", val: "scroll" },
                  { label: "Ambient Loop", val: "ambient" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setComponentSettings(s => ({ ...s, variant: item.val }))}
                    className={`text-[10px] font-bold py-1.5 px-1 rounded-lg border transition-all cursor-pointer ${
                      componentSettings.variant === item.val
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-neutral-800 hover:bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Direction */}
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="text-[11px] font-semibold text-neutral-400">Direction</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { label: "Crest Down", val: "down" },
                  { label: "Crest Up", val: "up" }
                ].map((item) => (
                  <button
                    key={item.label}
                    onClick={() => setComponentSettings(s => ({ ...s, direction: item.val }))}
                    className={`text-[10px] font-bold py-1.5 px-1 rounded-lg border transition-all cursor-pointer ${
                      componentSettings.direction === item.val
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-neutral-800 hover:bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Colors */}
            <div className="flex flex-col gap-1.5 mt-1">
              <span className="text-[11px] font-semibold text-neutral-400">Color Palette</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  { name: "Emerald Shore", fill: "#10b981", bg: "#0c0a09" },
                  { name: "Neon Eclipse", fill: "#a855f7", bg: "#09090b" },
                  { name: "Sunset Dust", fill: "#f97316", bg: "#1c1917" },
                  { name: "Glacier Water", fill: "#3b82f6", bg: "#030712" }
                ].map((t) => (
                  <button
                    key={t.name}
                    onClick={() => setComponentSettings(s => ({ ...s, fill: t.fill, background: t.bg }))}
                    className={`text-[10px] font-bold py-1.5 px-1 rounded-lg border transition-all cursor-pointer truncate ${
                      componentSettings.fill === t.fill
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-neutral-800 hover:bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {t.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Height */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Wave Height</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.height ?? 120}px</span>
              </div>
              <input
                type="range"
                min="60"
                max="240"
                step="10"
                value={componentSettings.height ?? 120}
                onChange={(e) => setComponentSettings(s => ({ ...s, height: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {componentSettings.variant === 'ambient' && (
              <>
                {/* Speed */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-neutral-400">Speed</span>
                    <span className="font-mono text-sky-500 font-bold">{componentSettings.speed ?? 1}x</span>
                  </div>
                  <input
                    type="range"
                    min="0.1"
                    max="3"
                    step="0.1"
                    value={componentSettings.speed ?? 1}
                    onChange={(e) => setComponentSettings(s => ({ ...s, speed: Number(e.target.value) }))}
                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>

                {/* Amplitude */}
                <div className="flex flex-col gap-1.5 mt-1">
                  <div className="flex justify-between text-[11px]">
                    <span className="font-semibold text-neutral-400">Amplitude</span>
                    <span className="font-mono text-sky-500 font-bold">{componentSettings.amplitude ?? 28}px</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="100"
                    value={componentSettings.amplitude ?? 28}
                    onChange={(e) => setComponentSettings(s => ({ ...s, amplitude: Number(e.target.value) }))}
                    className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
                  />
                </div>
              </>
            )}
          </div>
        );
      case 'shiny-button':
        return (
          <div className="flex flex-col gap-3 p-2 min-w-[280px]">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Shine Speed</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.shineSpeed ?? 1.5}s</span>
              </div>
              <input
                type="range"
                min="0.5"
                max="4"
                step="0.1"
                value={componentSettings.shineSpeed ?? 1.5}
                onChange={(e) => setComponentSettings(s => ({ ...s, shineSpeed: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>
        );
      case 'simple-marquee':
        return (
          <div className="flex flex-col gap-3 p-2 min-w-[280px]">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Velocity</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.velocity ?? 4}</span>
              </div>
              <input
                type="range"
                min="1"
                max="10"
                value={componentSettings.velocity ?? 4}
                onChange={(e) => setComponentSettings(s => ({ ...s, velocity: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>
        );
      case 'tilt-card':
        return (
          <div className="flex flex-col gap-3 p-2 min-w-[280px]">
            <div className="flex flex-col gap-1.5">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Max Angle</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.maxAngle ?? 15}°</span>
              </div>
              <input
                type="range"
                min="5"
                max="30"
                value={componentSettings.maxAngle ?? 15}
                onChange={(e) => setComponentSettings(s => ({ ...s, maxAngle: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>
        );
      case 'aurora-bars':
        return (
          <div className="flex flex-col gap-3 p-2 min-w-[280px]">
            {/* Preset Colors */}
            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-semibold text-neutral-400">Color Preset</span>
              <div className="grid grid-cols-2 gap-1.5">
                {[
                  "Aurora Pink",
                  "Northern Lights",
                  "Cyberpunk Violet",
                  "Sunset Ember"
                ].map((name, idx) => (
                  <button
                    key={name}
                    onClick={() => setComponentSettings(s => ({ ...s, presetIdx: idx }))}
                    className={`text-[10px] font-bold py-1.5 px-1 rounded-lg border transition-all cursor-pointer truncate ${
                      (componentSettings.presetIdx ?? 0) === idx
                        ? "bg-sky-500 text-white border-sky-500"
                        : "border-neutral-800 hover:bg-neutral-800 text-neutral-400"
                    }`}
                  >
                    {name}
                  </button>
                ))}
              </div>
            </div>

            {/* Bar Count */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Bar Count</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.barCount ?? 24}</span>
              </div>
              <input
                type="range"
                min="8"
                max="64"
                step="2"
                value={componentSettings.barCount ?? 24}
                onChange={(e) => setComponentSettings(s => ({ ...s, barCount: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Speed */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Speed</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.speed ?? 0.5}x</span>
              </div>
              <input
                type="range"
                min="0.1"
                max="2.5"
                step="0.1"
                value={componentSettings.speed ?? 0.5}
                onChange={(e) => setComponentSettings(s => ({ ...s, speed: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Blur */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Blur (Soft Glow)</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.blur ?? 0}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="12"
                step="1"
                value={componentSettings.blur ?? 0}
                onChange={(e) => setComponentSettings(s => ({ ...s, blur: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Gap */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Gap</span>
                <span className="font-mono text-sky-500 font-bold">{componentSettings.gap ?? 3}px</span>
              </div>
              <input
                type="range"
                min="0"
                max="8"
                step="1"
                value={componentSettings.gap ?? 3}
                onChange={(e) => setComponentSettings(s => ({ ...s, gap: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            {/* Min/Max Height Ratio */}
            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Min Height Ratio</span>
                <span className="font-mono text-sky-500 font-bold">{Math.round((componentSettings.minHeightRatio ?? 0.18) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.05"
                max="0.4"
                step="0.01"
                value={componentSettings.minHeightRatio ?? 0.18}
                onChange={(e) => setComponentSettings(s => ({ ...s, minHeightRatio: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>

            <div className="flex flex-col gap-1.5 mt-1">
              <div className="flex justify-between text-[11px]">
                <span className="font-semibold text-neutral-400">Max Height Ratio</span>
                <span className="font-mono text-sky-500 font-bold">{Math.round((componentSettings.maxHeightRatio ?? 0.92) * 100)}%</span>
              </div>
              <input
                type="range"
                min="0.6"
                max="1.0"
                step="0.01"
                value={componentSettings.maxHeightRatio ?? 0.92}
                onChange={(e) => setComponentSettings(s => ({ ...s, maxHeightRatio: Number(e.target.value) }))}
                className="w-full h-1 bg-neutral-800 rounded-lg appearance-none cursor-pointer accent-sky-500"
              />
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  const uncenteredComponents = [
    'horizontal-depth-fade',
    'orbital-image-wheel',
    'scroll-image-text-reveal',
    'scroll-velocity-marquee',
    'card-footer',
    'apple-timeline',
    'dynamic-scroll-progress',
    'liquid-metal-progress',
    'horizontal-nav',
    'marquee-brands',
    'wave-background',
    'setup-steps',
    'sidebar-001',
    'sidebar-002',
    'progressive-blur',
    'vercel-snap-text',
    'pinned-list',
    'aurora-bars',
    'simple-marquee',
    'you-can-scroll',
    'cosmic-spectrum',
    'falling-pattern',
    'beams-background',
    'pricing-sections',
    'skiper-37',
    'skiper-40',
    'skiper-47',
    'skiper-48',
    'skiper-54',
    'skiper-51',
    'skiper-41',
    'skiper-34',
    'skiper-16',
    'skiper-17',
    'skiper-19',
    'skiper-26',
    'skiper-28',
    'skiper-63',
    'skiper-87',
    'skiper-61',
    'skiper-64',
    'skiper-66',
    'skiper-67',
    'skiper-25',
    'skiper-3',
    'skiper-58',
    'skiper-4',
    'skiper-31',
    'skiper-30',
    'skiper-62',
    'skiper-102'
  ];

  const codeToDisplay = componentSources[activeCodeTab] || '';
  const highlightedLines = useMemo(() => {
    if (!codeToDisplay) return [];
    
    // Split the raw code into lines
    const rawLines = codeToDisplay.split('\n');
    
    // Highlight each line
    return rawLines.map(line => {
      // Escape HTML characters first to prevent XSS and tag matching bugs
      let escaped = line
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;");

      // Tokenize using regex
      const tokenRegex = new RegExp(
        [
          // 1. Comments
          "(\\/\\/[^\\n]*|\\/\\*[\\s\\S]*?\\*\\/)",
          // 2. Strings (double, single, backtick)
          "(\"(?:\\\\.|[^\"\\\\])*\"|'(?:\\\\.|[^'\\\\])*'|\\`(?:\\\\.|[^\\\\`])*\\`)",
          // 3. Keywords
          "\\b(import|export|default|const|let|var|function|return|interface|type|class|extends|from|as|true|false|if|else|for|while|try|catch|new|useClient|async|await|typeof|instanceof|void|in|of|break|continue|switch|case|default|throw)\\b",
          // 4. TSX Tags (elements like <div, </div, />)
          "(&lt;\\/?[a-zA-Z0-9\\._-]+|&gt;|\\/&gt;)",
          // 5. Hooks / Functions (useState, useScroll, useTransform, useSpring, useAnimationFrame)
          "\\b(use[A-Z][a-zA-Z0-9_]+)\\b",
          // 6. GSAP / Framer motion
          "\\b(gsap|ScrollTrigger|motion)\\b",
          // 7. Numbers
          "\\b(\\d+(?:\\.\\d+)?)\\b",
        ].join("|"),
        "g"
      );

      let highlighted = escaped.replace(tokenRegex, (match, comment, str, keyword, tag, hook, library, num) => {
        if (comment) return `<span class="text-zinc-500 italic">${match}</span>`;
        if (str) return `<span class="text-emerald-400">${match}</span>`;
        if (keyword) return `<span class="text-pink-400 font-semibold">${match}</span>`;
        if (tag) return `<span class="text-blue-400">${match}</span>`;
        if (hook) return `<span class="text-amber-305">${match}</span>`;
        if (library) return `<span class="text-indigo-400 font-bold">${match}</span>`;
        if (num) return `<span class="text-amber-500 font-mono">${match}</span>`;
        return match;
      });

      // If search query is active, highlight search query matches in the HTML line
      if (codeSearchQuery && codeSearchQuery.trim() !== '') {
        const query = codeSearchQuery.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&'); // escape regex
        const searchRegex = new RegExp(`(${query})`, 'gi');
        // Let's only replace text NOT inside HTML tags to prevent breaking the generated HTML
        const parts = highlighted.split(/(<[^>]*>)/);
        highlighted = parts.map(part => {
          if (part.startsWith('<')) return part;
          return part.replace(searchRegex, `<mark class="bg-amber-400/30 text-amber-250 px-0.5 rounded">${codeSearchQuery}</mark>`);
        }).join('');
      }

      return highlighted;
    });
  }, [codeToDisplay, codeSearchQuery]);

  const shouldCenter = !uncenteredComponents.includes(name || '');

  if (isFullScreen) {
    return (
      <div className="w-screen h-[100dvh] overflow-hidden bg-background text-foreground">
        <DemoComponent key={key} {...componentSettings} />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      className="flex h-[100dvh] bg-background text-foreground overflow-hidden w-full relative"
    >
      {/* Click Outside Overlay for Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 z-40 bg-background/50 backdrop-blur-sm md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence initial={false}>
        {isSidebarOpen && !isExpanded && (
          <motion.div
            ref={sidebarRef}
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: "auto", opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            drag={window.innerWidth < 768 ? "x" : false}
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0}
            onDragEnd={(e, { offset, velocity }) => {
              if (window.innerWidth < 768 && (offset.x < -50 || velocity.x < -20)) {
                setIsSidebarOpen(false);
              }
            }}
            className="shrink-0 h-full overflow-hidden md:relative absolute z-50 bg-background shadow-xl md:shadow-none"
          >
            <Sidebar001 defaultWidth={280} minWidth={200} maxWidth={400} className="border-none w-[280px] md:w-auto md:min-w-[200px]" data-lenis-prevent>
              <Sidebar001Header>
                <div className="flex items-center justify-between mb-2 px-2">
                  <Link to="/" className="flex items-center gap-2 py-1 hover:bg-surface rounded-md transition-colors w-max">
                    <Home className="size-4 opacity-70" />
                    <span className="text-sm font-medium">Home</span>
                  </Link>
                  <button
                    onClick={() => setIsSidebarOpen(false)}
                    className="md:hidden size-8 flex items-center justify-center rounded-md hover:bg-surface transition-colors"
                  >
                    <ArrowLeft className="size-4" />
                  </button>
                </div>
              </Sidebar001Header>
              <Sidebar001Content>
                {categories.map((category) => (
                  <React.Fragment key={category.slug}>
                    <Sidebar001Group label={category.title} defaultOpen={true}>
                      {category.items.map((item) => (
                        <Sidebar001Item
                          key={item.name}
                          href={`/components/${item.name}`}
                          label={item.title}
                          isActive={name === item.name}
                          onClick={(e) => {
                            e.preventDefault();
                            navigate(`/components/${item.name}`);
                            if (window.innerWidth < 768) {
                              setIsSidebarOpen(false);
                            }
                          }}
                        />
                      ))}
                    </Sidebar001Group>
                  </React.Fragment>
                ))}
              </Sidebar001Content>
            </Sidebar001>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="flex-1 flex flex-col md:flex-row h-[100dvh] relative overflow-hidden">
        {/* Left Content Column */}
        <div
          className="h-full relative flex flex-col flex-shrink-0"
          style={{
            width: infoFullscreen
              ? '100%'
              : isExpanded
              ? '0%'
              : (window.innerWidth >= 768 ? `${leftWidthPercent}%` : '100%'),
            opacity: isExpanded ? 0 : 1,
            pointerEvents: isDragging ? 'none' : (isExpanded ? 'none' : 'auto'),
            userSelect: isDragging ? 'none' : 'auto',
            transition: isDragging
              ? 'none'
              : 'width 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          }}
        >
          {/* Top Fade & Header Container */}
          <div className="absolute top-0 left-0 right-0 h-20 bg-background/95 border-b border-border/10 z-40 pointer-events-none" />

          {/* Sidebar Toggle Header */}
          <div className="absolute top-0 left-0 right-0 h-20 flex items-center z-[150] px-6 pointer-events-none">
            <div className="flex items-center gap-3 w-full pointer-events-auto">
              <div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      ref={toggleBtnRef}
                      onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                      className="inline-flex shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 hover:bg-zinc-100 dark:hover:bg-zinc-900 text-black dark:text-white size-8 rounded-md z-[9999]"
                      aria-label="Toggle sidebar"
                    >
                      <SidebarToggleIcon isOpen={isSidebarOpen} className="size-5 pointer-events-none" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" align="center">
                    <p>Toggle sidebar</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <nav aria-label="breadcrumb">
                <ol className="text-muted-foreground flex flex-wrap items-center gap-1.5 text-sm break-words sm:gap-2.5">
                  <li className="inline-flex items-center gap-1.5">
                    <Link to="/" className="text-foreground/50 hover:text-foreground transition-colors text-sm">
                      Components
                    </Link>
                  </li>
                  <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"><path d="M9.00005 6C9.00005 6 15 10.4189 15 12C15 13.5812 9 18 9 18" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5"></path></svg>
                  </li>
                  <li className="inline-flex items-center gap-1.5">
                    <span role="link" aria-disabled="true" aria-current="page" className="text-foreground text-sm font-medium">
                      {componentItem.title}
                    </span>
                  </li>
                </ol>
              </nav>
            </div>
          </div>

          <div ref={scrollableContainerRef} data-lenis-prevent className="flex-1 overflow-y-auto relative z-0 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
            <div className="px-5 sm:px-8 md:px-12 lg:px-16 pt-24 pb-32 max-w-full mx-auto md:mx-0 w-full relative">

              {/* Spacer for header */}
              <div className="h-6" />

              {/* Header */}
              <div className="mb-10">
                <div className="overflow-hidden pb-1 mb-3">
                  <motion.h1
                    initial={{ y: "100%" }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                    className="text-3xl sm:text-4xl md:text-[2.75rem] leading-[1.1] font-medium tracking-tight"
                  >
                    {componentItem.title}
                  </motion.h1>
                </div>
                <motion.p
                  initial={{ y: 5, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-base md:text-lg text-foreground/60 leading-relaxed max-w-3xl"
                >
                  {componentItem.description}
                </motion.p>
              </div>

              {/* Mobile Preview (Only on mobile) */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.35 }}
                className="md:hidden w-full aspect-[4/3] rounded-2xl bg-surface/50 border border-border relative overflow-hidden flex flex-col mb-10 shadow-sm"
              >
                <div className="absolute top-0 inset-x-0 h-12 flex items-center justify-between px-3 z-20">
                  <span className="text-xs font-mono text-muted-foreground bg-background/50 backdrop-blur px-2 py-1 rounded-md border border-border/50">{componentItem.name}.tsx</span>
                  <div className="flex gap-2">
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={() => setIsExpanded(true)} className="size-8 flex items-center justify-center hover:bg-background/80 bg-background/50 backdrop-blur rounded-lg transition-colors text-muted-foreground hover:text-foreground border border-border/50">
                          <Maximize2 className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Expand Preview</p>
                      </TooltipContent>
                    </Tooltip>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button onClick={() => setKey(k => k + 1)} className="size-8 flex items-center justify-center hover:bg-background/80 bg-background/50 backdrop-blur rounded-lg transition-colors text-muted-foreground hover:text-foreground border border-border/50">
                          <RotateCcw className="size-4" />
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Restart Animation</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </div>
                <div data-lenis-prevent className="flex-1 relative overflow-hidden overflow-y-auto h-full w-full">
                  <DemoComponent key={key} {...componentSettings} />
                </div>
              </motion.div>

              {/* Installation */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="mb-10"
              >
                <h2 className="text-2xl font-medium tracking-tight mb-4">Installation</h2>
                <div className="rounded-xl border border-border/60 overflow-hidden">
                  <div className="flex items-center justify-between px-4 h-11 border-b border-border/60 bg-transparent">
                    <div className="flex items-center gap-1.5 opacity-60">
                      <span className="text-sm font-medium">npm</span>
                    </div>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <button
                          onClick={copyInstall}
                          className="size-7 flex items-center justify-center rounded-md hover:bg-foreground/5 text-muted-foreground hover:text-foreground transition-colors -mr-1"
                        >
                          {copied ? <span className="text-xs font-medium text-green-500">Copied</span> : <Copy className="size-3.5" />}
                        </button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Copy install command</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                  <div className="p-4 bg-background overflow-x-auto">
                    <code className="text-[13px] text-foreground font-mono whitespace-nowrap">
                      <span className="text-purple-400">npx</span> {installCmd.substring(4)}
                    </code>
                  </div>
                </div>
              </motion.div>

              {/* Component Source Code */}
              {componentSources[activeCodeTab] && (
                <motion.div
                  initial={{ y: 15, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.45 }}
                  className="mb-10"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
                    <h2 className="text-2xl font-medium tracking-tight">Component Code</h2>
                    
                    {/* Search Input */}
                    <div className="relative w-full sm:max-w-xs">
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-muted-foreground/50">
                        <Search className="size-3.5" />
                      </span>
                      <input
                        type="text"
                        placeholder="Search code..."
                        value={codeSearchQuery}
                        onChange={(e) => setCodeSearchQuery(e.target.value)}
                        className="w-full text-xs pl-8 pr-3 py-1.5 bg-surface border border-border/60 rounded-lg outline-none focus:border-primary/50 transition-colors"
                      />
                    </div>
                  </div>

                  <div className="rounded-xl border border-border/60 overflow-hidden bg-zinc-950 text-zinc-100 shadow-xl flex flex-col">
                    {/* File Tabs Header */}
                    <div className="flex items-center justify-between px-4 h-12 border-b border-border/60 bg-zinc-900/60 backdrop-blur-md">
                      <div className="flex items-center gap-1.5 overflow-x-auto select-none no-scrollbar py-1">
                        {componentFilesMap[componentItem.name]?.map((file) => (
                          <button
                            key={file.key}
                            onClick={() => setActiveCodeTab(file.key)}
                            className={`text-xs px-3.5 py-1.5 rounded-lg font-medium transition-all duration-200 flex items-center gap-1.5 border shrink-0 ${
                              activeCodeTab === file.key
                                ? "bg-zinc-800 border-zinc-700 text-foreground"
                                : "border-transparent text-muted-foreground hover:text-foreground"
                            }`}
                          >
                            <Code className="size-3.5 opacity-70" />
                            <span>{file.label}</span>
                            {file.key !== componentItem.name && (
                              <span className="text-[9px] font-mono bg-zinc-800 text-zinc-400 px-1 py-0.5 rounded border border-zinc-700">Dependency</span>
                            )}
                          </button>
                        )) || (
                          <div className="flex items-center gap-1.5 text-xs text-muted-foreground px-1">
                            <Code className="size-3.5 opacity-70" />
                            <span>{componentItem.name}.tsx</span>
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-1">
                        {/* Copy Button */}
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <button
                              onClick={copyComponentCode}
                              className="size-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer"
                            >
                              {compCodeCopied ? (
                                <Check className="size-4 text-green-500" />
                              ) : (
                                <Copy className="size-3.5" />
                              )}
                            </button>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>Copy current file code</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </div>

                    {/* Code Container */}
                    <div 
                      className={`relative overflow-hidden transition-all duration-500 ${
                        isCodeExpanded ? "max-h-[5000px]" : "max-h-[320px]"
                      }`}
                    >
                      <div className="p-4 font-mono text-[12.5px] leading-[1.7] select-text overflow-x-auto no-scrollbar pb-16">
                        {highlightedLines.map((lineHtml, i) => {
                          const lineNum = i + 1;
                          const isMatch = codeSearchQuery && lineHtml.toLowerCase().includes(codeSearchQuery.toLowerCase());
                          return (
                            <div 
                              key={i} 
                              className={`flex w-full group hover:bg-zinc-900/60 transition-colors px-1 rounded-sm ${
                                isMatch ? "bg-amber-950/30 border-l-2 border-amber-500 pl-0.5" : ""
                              }`}
                            >
                              {/* Line number */}
                              <span className="select-none text-right pr-4 text-zinc-500 min-w-[36px] font-medium opacity-50 group-hover:opacity-85 border-r border-zinc-800/80 mr-4">
                                {lineNum}
                              </span>
                              
                              {/* Code line content */}
                              <span 
                                className="flex-1 whitespace-pre"
                                dangerouslySetInnerHTML={{ __html: lineHtml }} 
                              />
                            </div>
                          );
                        })}
                      </div>

                      {/* Height Fade Overlay */}
                      {!isCodeExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />
                      )}
                    </div>

                    {/* Show More / Show Less Toggle Bar */}
                    <div className="border-t border-zinc-800/80 bg-zinc-900/40 p-3 flex justify-center relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                      <button
                        onClick={() => setIsCodeExpanded(!isCodeExpanded)}
                        className="flex items-center gap-2 text-[13px] text-zinc-300 hover:text-white font-medium py-1.5 px-4 rounded-full border border-zinc-700/50 hover:border-zinc-500 bg-zinc-800/50 hover:bg-zinc-700 transition-all shadow-sm group backdrop-blur-sm cursor-pointer"
                      >
                        {isCodeExpanded ? (
                          <>
                            <ChevronUp className="size-3.5 group-hover:-translate-y-0.5 transition-transform" /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="size-3.5 group-hover:translate-y-0.5 transition-transform" /> Expand code ({highlightedLines.length} lines)
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Usage */}
              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                <h2 className="text-2xl font-medium tracking-tight mb-4">Usage</h2>
                <div className="rounded-xl border border-border/60 overflow-hidden">
                  <div className="flex items-center justify-between px-4 h-11 border-b border-border/60 bg-transparent">
                    <div className="flex items-center gap-2 opacity-60">
                      <span className="text-sm font-medium">page.tsx</span>
                    </div>
                <div className="rounded-xl border border-border/60 overflow-hidden flex flex-col bg-zinc-950 text-zinc-100 shadow-xl">
                    <div className="flex items-center justify-between px-4 h-12 border-b border-zinc-800/80 bg-zinc-900/60 backdrop-blur-md">
                      <div className="flex items-center gap-2 opacity-60 text-zinc-300">
                        <Code className="size-3.5" />
                        <span className="text-sm font-medium">page.tsx</span>
                      </div>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <button
                            onClick={copyCode}
                            className="size-8 flex items-center justify-center rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-100 transition-colors cursor-pointer -mr-1"
                          >
                            {codeCopied ? <span className="text-[10px] font-medium text-green-500">Copied</span> : <Copy className="size-3.5" />}
                          </button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>Copy code</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                    <div 
                      className={`relative overflow-hidden transition-all duration-500 ${
                        isUsageExpanded ? "max-h-[3000px]" : "max-h-[220px]"
                      }`}
                    >
                      <div className="p-4 overflow-x-auto no-scrollbar pb-16">
                        <pre className="text-[13px] leading-[1.7] font-mono whitespace-pre-wrap"><code dangerouslySetInnerHTML={{ __html: codeExample.replace(/([A-Z][a-zA-Z0-9_]+)\b/g, '<span class="text-amber-200">$1</span>').replace(/from/g, '<span class="text-rose-400">from</span>').replace(/import/g, '<span class="text-rose-400">import</span>').replace(/export/g, '<span class="text-rose-400">export</span>').replace(/default/g, '<span class="text-rose-400">default</span>').replace(/function/g, '<span class="text-rose-400">function</span>').replace(/return/g, '<span class="text-rose-400">return</span>').replace(/"([^"]*)"/g, '<span class="text-blue-300">"$1"</span>') }} /></pre>
                      </div>
                      
                      {/* Height Fade Overlay */}
                      {!isUsageExpanded && (
                        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-zinc-950 via-zinc-950/80 to-transparent pointer-events-none" />
                      )}
                    </div>
                    
                    {/* Show More / Show Less Toggle Bar */}
                    <div className="border-t border-zinc-800/80 bg-zinc-900/40 p-3 flex justify-center relative z-10 shadow-[0_-10px_20px_rgba(0,0,0,0.1)]">
                      <button
                        onClick={() => setIsUsageExpanded(!isUsageExpanded)}
                        className="flex items-center gap-2 text-[13px] text-zinc-300 hover:text-white font-medium py-1.5 px-4 rounded-full border border-zinc-700/50 hover:border-zinc-500 bg-zinc-800/50 hover:bg-zinc-700 transition-all shadow-sm group backdrop-blur-sm cursor-pointer"
                      >
                        {isUsageExpanded ? (
                          <>
                            <ChevronUp className="size-3.5 group-hover:-translate-y-0.5 transition-transform" /> Show Less
                          </>
                        ) : (
                          <>
                            <ChevronDown className="size-3.5 group-hover:translate-y-0.5 transition-transform" /> Expand code
                          </>
                        )}
                      </button>
                    </div>
                  </div>
              </motion.div>

              <motion.div
                initial={{ y: 15, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-16 pt-8 border-t border-border pb-12"
              >
                <p className="text-2xl font-medium tracking-tight mb-3">Keep in mind</p>
                <p className="text-base text-foreground/70 leading-relaxed max-w-prose">
                  Most components on this site are built for React, Tailwind CSS, and Motion. You can install them via the shadcn CLI or copy-paste them directly into your project. Make sure you install Motion before adding the components.
                </p>
              </motion.div>

              {/* Spacer for bottom */}
            </div>
          </div>
          <LiquidMetalBackToTop containerRef={scrollableContainerRef} className="absolute bottom-8 right-8 z-[9999]" />
        </div>

        {/* Draggable Splitter (Desktop Only) — hidden when info is fullscreen */}
        {!isExpanded && !infoFullscreen && (
          <div
            className="hidden md:flex w-4 -ml-2 -mr-2 bg-transparent hover:cursor-col-resize relative z-50 h-full flex-col justify-center items-center group"
            onPointerDown={handleDragDown}
            onPointerMove={handleDragMove}
            onPointerUp={handleDragUp}
            onPointerCancel={handleDragUp}
          >
            <div className="w-1 h-12 bg-border/40 group-hover:bg-primary/60 group-active:bg-primary group-active:h-20 group-hover:h-16 group-hover:w-1.5 rounded-full transition-all duration-300 ease-out z-10 shadow-sm" />

            {/* Glow effect on hover */}
            <div className="absolute w-8 h-24 bg-primary/10 blur-xl rounded-full opacity-0 group-hover:opacity-100 group-active:bg-primary/20 transition-all duration-300" />
          </div>
        )}

        <div
          className={`${isExpanded ? 'block' : 'hidden md:block'} h-full relative flex-shrink-0`}
          style={{
            width: infoFullscreen ? '0%' : (isExpanded ? '100%' : `${100 - leftWidthPercent}%`),
            position: isExpanded ? 'absolute' : 'relative',
            inset: isExpanded ? 0 : 'auto',
            zIndex: isExpanded ? 200 : 0,
            overflow: infoFullscreen ? 'hidden' : 'visible',
            pointerEvents: isDragging ? 'none' : 'auto',
            userSelect: isDragging ? 'none' : 'auto',
            opacity: infoFullscreen ? 0 : 1,
            transition: isDragging
              ? 'none'
              : 'width 0.65s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.4s ease',
          }}
        >
          <div
            className={`w-full h-full transition-all duration-300 ${isExpanded ? 'p-0' : 'p-4'}`}
            style={{
              pointerEvents: isDragging ? 'none' : 'auto',
              userSelect: isDragging ? 'none' : 'auto'
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={`w-full h-full bg-surface border border-border relative overflow-hidden flex flex-col shadow-sm transition-all duration-300 ${isExpanded ? 'rounded-lg' : 'rounded-2xl'}`}
            >
              {/* Top fade/shadow */}

              <div className="absolute top-4 inset-x-0 z-20 flex justify-between px-4">
                <div />

                <div className="flex gap-2">
                  <span className="text-xs font-mono text-muted-foreground bg-background/80 backdrop-blur pb-[1px] px-2 py-1 rounded-md flex items-center border border-border/50">{componentItem.name}.tsx</span>
                </div>
              </div>

              {/* Component Container */}
              <div className="flex-1 flex items-center justify-center relative overflow-hidden w-full h-full bg-surface dark:bg-zinc-950">

                {/* Background Grid Pattern */}
                {showGrid && (
                  <div
                    className="absolute inset-0 pointer-events-none opacity-40 dark:opacity-20 z-0"
                    style={{
                      backgroundImage: 'radial-gradient(var(--border) 1.5px, transparent 1.5px)',
                      backgroundSize: '24px 24px'
                    }}
                  />
                )}

                <motion.div
                  layout
                  initial={false}
                  animate={{
                    width: isExpanded ? '100%' : (previewSize === 'desktop' ? '100%' : (previewSize === 'tablet' ? '768px' : '375px')),
                    height: isExpanded ? '100%' : (previewSize === 'desktop' ? '100%' : '85%'),
                    borderRadius: isExpanded ? '0px' : (previewSize === 'desktop' ? '0px' : (previewSize === 'tablet' ? '16px' : '36px')),
                    borderWidth: isExpanded ? '0px' : (previewSize === 'desktop' ? '0px' : (previewSize === 'tablet' ? '1px' : '6px')),
                    borderColor: previewSize === 'mobile' ? 'rgb(39, 39, 42)' : 'var(--border)',
                  }}
                  transition={{ type: "spring", stiffness: 200, damping: 18 }}
                  className="relative flex items-center justify-center z-10 bg-background shadow-2xl shadow-black/10 overflow-hidden"
                >
                  {/* Mobile View Notch Indicator */}
                  {previewSize === 'mobile' && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ type: "spring", stiffness: 300, damping: 20 }}
                      className="absolute top-2 left-1/2 -translate-x-1/2 w-28 h-4 bg-zinc-800 rounded-full z-50 flex items-center justify-center gap-1.5 opacity-90 select-none"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-zinc-900" />
                      <div className="w-6 h-0.5 rounded-full bg-zinc-900" />
                    </motion.div>
                  )}

                  <div data-lenis-prevent className="w-full h-full overflow-y-auto flex flex-col">
                    <div className={`flex-1 min-h-full w-full flex ${shouldCenter ? 'items-center justify-center' : 'flex-col'}`}>
                      <DemoComponent key={key} {...componentSettings} />
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Bottom Toolbar Wrapper */}
              <motion.div
                initial={{ y: 50, x: "-50%", opacity: 0 }}
                animate={{ y: 0, x: "-50%", opacity: 1 }}
                transition={{ type: "spring", stiffness: 180, damping: 16, delay: 0.1 }}
                className="absolute bottom-6 left-1/2 z-20 flex flex-col items-center select-none"
              >
                <PlaygroundPill
                  isExpanded={isExpanded}
                  setIsExpanded={setIsExpanded}
                  onRestart={() => setKey(k => k + 1)}
                  onCopy={copyComponentCode}
                  copiedCode={compCodeCopied}
                  theme={theme}
                  toggleTheme={toggleTheme}
                  componentDescription={componentItem.description}
                  componentName={name}
                  settings={componentSettings}
                  onChangeSettings={setComponentSettings}
                  customSettings={renderToolbarSettings()}
                />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>



    </motion.div>
  );
}

