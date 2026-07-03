export type ComponentItem = {
  name: string;
  title: string;
  author: string;
  releaseDate: string;
  premium?: boolean;
  video: string;
  description: string;
  isNew?: boolean;
};

export type Category = {
  title: string;
  slug: string;
  description: string;
  items: ComponentItem[];
};

export const categories: Category[] = [
  {
    title: "Animations",
    slug: "animations",
    description: "Interactive animated components with 3D effects and animations",
    items: [
      { name: "signature", title: "Signature", isNew: true, video: "", author: "Componentry", releaseDate: "2026-06-28", description: "An animated SVG signature effect using Opentype.js and Framer Motion to draw out text as if hand-written." },
      { name: "dia-text-reveal", title: "Dia Text Reveal", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/DiaTextReveal.webm", author: "Leo", releaseDate: "2026-03-11", description: "Animated text reveal with a colorful gradient sweep, inspired by the Dia app." },
      { name: "dia-text-reveal-2", title: "Dia Text Reveal 2", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/DiaTextReveal.webm", author: "Leo", releaseDate: "2026-03-11", description: "Animated text reveal with a cool-tone colorful gradient sweep across the text fill." },
      { name: "progressive-blur", title: "Progressive Blur", isNew: true, video: "", author: "Leo", releaseDate: "2026-06-09", description: "Add a smooth, layered progressive blur effect to the top, bottom, or both edges of any scrollable container." },
      { name: "animated-beam", title: "Animated Beam", isNew: true, video: "", author: "Leo", releaseDate: "2026-06-09", description: "An animated beam of light which travels along a path. Useful for showcasing the 'integration' features of a website." },
      { name: "calligraph", title: "Calligraph", isNew: true, video: "", author: "Raphael Salaja", releaseDate: "2026-06-09", description: "Fluid text and number transitions powered by Motion." },
      { name: "scroll-image-text-reveal", title: "Scroll Image Text Reveal", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "An elegant scroll-linked typographic animation where preview images smoothly expand inline inside text as you scroll." },
      { name: "scroll-velocity-marquee", title: "Scroll Velocity Marquee", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "An interactive scroll-direction and scroll-velocity reactive infinite text marquee." },
      { name: "simple-marquee", title: "Simple Marquee", isNew: true, video: "", author: "Fancy Components", releaseDate: "2026-06-10", description: "A simple marquee component for scrolling HTML elements. Supports scroll-velocity, drag, hover slowdown, directional awareness and spring physics." },
      { name: "motion-tabs-menu", title: "Motion Tabs Menu", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/MotionTabsMenu2.webm", author: "Leo", releaseDate: "2026-03-16", description: "A floating bottom tab bar that expands upward with spring animations..." },
      { name: "team-stack", title: "Team Stack", premium: true, isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/TeamStack.webm", author: "Leo", releaseDate: "2026-04-12", description: "A stacked deck of team member cards..." },
      { name: "hover-feature-cards", title: "Hover Feature Cards", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/HoverFeatureCard.webm", author: "Leo", releaseDate: "2026-05-04", description: "A responsive grid of feature cards..." },
      { name: "stacked-feature-cards", title: "Stacked Feature Cards", premium: true, isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/StackedFeatureCards.webm", author: "Leo", releaseDate: "2026-05-01", description: "A two-column section with a sticky spring-animated hero card..." },
      { name: "motion-faqs-accordion", title: "Motion FAQs Accordion", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/MotionFAQsAccordion.webm", author: "Leo", releaseDate: "2026-03-08", description: "Clean Motion-powered FAQ accordion..." },
      { name: "video-slider", title: "Video Slider", premium: true, isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/VideoSlider.webm", author: "Leo", releaseDate: "2026-04-12", description: "A custom video player with a spring-animated scrubber bar..." },
      { name: "cursor-image-trail", title: "Cursor Image Trail", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/CursorTrailImage.webm", author: "Leo", releaseDate: "2026-03-12", description: "A trail of images that follows the cursor..." },
      { name: "hover-image-list", title: "Hover Image List", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/HoverImageList.webm", author: "Leo", releaseDate: "2026-03-08", description: "A list of large headings that reveal an image..." },
      { name: "tilt-card", title: "Tilt Card", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/TiltCard.webm", author: "Leo", releaseDate: "2026-03-08", description: "A card with 3D spring tilt..." },
      { name: "hover-expand", title: "Hover Expand", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/HoverExpand.webm", author: "Leo", releaseDate: "2026-03-09", description: "A card that expands on hover..." },
      { name: "gooey-svg-filter", title: "Gooey SVG Filter", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/GooeySVGFilter.webm", author: "Leo", releaseDate: "2026-03-28", description: "An SVG filter that makes adjacent animated elements fluidly merge..." },
      { name: "vercel-snap-text", title: "Vercel Snap Text", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/VercelSnapText.webm", author: "Leo", releaseDate: "2026-03-08", description: "A scroll-driven text list that snaps exactly to each item..." },
      { name: "file-tree", title: "File Tree", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/FileTree.webm", author: "Leo", releaseDate: "2026-05-01", description: "Animated file-tree component with spring folder expand/collapse..." },
      { name: "animated-list", title: "Animated List", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/AnimatedList.webm", author: "Leo", releaseDate: "2026-03-09", description: "Real-time push feed with spring entry animations..." },
      { name: "favicon-search", title: "Favicon Search", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/FaviconSearch.webm", author: "Leo", releaseDate: "2026-03-10", description: "A search input that fetches and spring-animates the site favicon..." },
      { name: "animate-digits", title: "Animate Digits", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/AnimateDigits.webm", author: "Leo", releaseDate: "2026-03-31", description: "Per-digit blur-slide animation..." },
      { name: "animate-count", title: "Vercel Animate Count", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/AnimateCount.webm", author: "Leo", releaseDate: "2026-03-12", description: "A number display that animates transitions between values..." },
      { name: "apple-switch", title: "Apple Switch", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/AppleSwitch.webm", author: "Leo", releaseDate: "2026-04-30", description: "Animated toggle switch with separate track/thumb sizing..." },
      { name: "pinned-list", title: "Pinned List", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/PinnedList.webm", author: "Leo", releaseDate: "2026-03-11", description: "A list of items that animate smoothly into a pinned section..." },
      { name: "matrix", title: "Matrix", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/Matrix.webm", author: "Leo", releaseDate: "2026-03-12", description: "An LED dot matrix display with SVG pixels..." },
      { name: "ai-chat", title: "AI Chat", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/ai-chat.webm", author: "Leo", releaseDate: "2026-03-17", description: "A chat component that allows you to chat with an AI." },
      { name: "video-ambient", title: "Youtube Video Ambient", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/VideoAmbient.webm", author: "Leo", releaseDate: "2026-03-18", description: "A video player with real-time ambient glow that mirrors the colors playing..." },
      { name: "side-by-side-slide", title: "Side By Side Slide", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/SideBySideSlide.webm", author: "Leo", releaseDate: "2026-03-23", description: "Before/after image comparison slider with a spring-animated divider..." },
      { name: "shiny-button", title: "Shiny Button", isNew: true, video: "", author: "Leo", releaseDate: "2026-05-10", description: "A button with a smooth shine texture effect on hover." },
      { name: "calendar-animation", title: "Calendar Animation", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "An interactive, expandable calendar widget with smooth spring transitions, categories, tasks and guest list." },
      { name: "osmo-buttons", title: "Osmo Buttons", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "An interactive set of buttons with springy elastic direction-based tilts, background color wipes, and staggered letter transitions." },
      { name: "apple-timeline", title: "Apple Card Timeline", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "An interactive, grab-swipeable Apple style timeline card stack with smooth 3D offsets, spring physics, and dynamic title synchronization." },
      { name: "view-transitions", title: "View Transitions API", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "A high-fidelity layout-morphing demonstration leveraging native browser document.startViewTransition and spring morph grids." },
      { name: "liquid-metal-button", title: "Liquid Metal Button", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "Mesmerizing metallic gooey spring button fueled by custom composite SVG matrix filters." },
      { name: "aura-card-stack", title: "Aura Card Stack", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "Stacked creative cards that fan out horizontally with elastic spring coordinates on hover, with a fullscreen blur zoom lightbox." },
      { name: "aura-preloader", title: "Aura Preloader", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "Ultra-smooth entrance reveal overlay featuring layout-coordinated spring blurs and logo scale reveals." },
      { name: "aura-subscribe-pill", title: "Aura Subscribe Pill", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "Subscription input pill combining React 19 TextMorph text transitions with dual-side confetti explosion bursts." },
      { name: "aura-chat", title: "Aura Chat Assistant", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "Minimal conversational widget with Markdown output, typewriter stream typing, and Live Gemini API options." },
      { name: "album-stack-grid", title: "Album Stack Grid", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-09", description: "Interactive photo collection gallery featuring mouse-tracked spring album decks that expand into dynamic layout-morphed image grids." },
      { name: "flip-clock", title: "Flip Clock", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-09", description: "A real-time live clock and countdown timer with satisfying CSS 3D flip-card animations, multiple size variants, and configurable display modes." },
      { name: "setup-steps", title: "Setup Steps", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-09", description: "A motion-driven vertical step queue with an auto-advancing progress bar. Great for onboarding flows, install sequences, or multi-step progress UI." },
      { name: "spinning-text", title: "Spinning Text", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-09", description: "Circular character layout with motion rotation that accelerates on hover. Customizable radius, speed, direction, and center content." },
      { name: "orbital-spinner", title: "Orbital Spinner", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-09", description: "A satellite-orbit loading spinner with a pulsing core and a dot that orbits the outer edge. Available in three sizes." },
      { name: "add-to-cart", title: "Add To Cart", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Animated Add To Cart button with confetti burst, spring physics and status transitions." },
      { name: "quantity-picker", title: "Quantity Picker", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Smooth draggable quantity picker with custom spring animations and direct inputs." },
      { name: "button-demo", title: "Copy Promo Code Button", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Interactive promo code copy button with a radial progress background indicator." },
      { name: "accordion-faq", title: "Accordion FAQ", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Clean Motion-powered FAQ accordion with custom toggle symbols." },
      { name: "spinning-text-02", title: "Spinning Text 02", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Circular character layout with scroll trigger animations and rotation settings." },
      { name: "switch-with-icon", title: "Switch with Icon", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Toggle switch with animated icons indicating states inside the thumb." },
      { name: "button-blocks", title: "Button with Arrow", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "A group of buttons with animating hover arrows." },
      { name: "heatmap", title: "Activity Heatmap", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Interactive activity heatmap calendar with tooltips and customizable color ranges." },
      { name: "spinners", title: "Loading Spinners", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "A collection of customizable loading spinners and throbbers." },
      { name: "drawer", title: "Responsive Drawer", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Modern sheet drawer panel that slides from bottom or sides using Vaul." },
      { name: "resizable", title: "Resizable Panels", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Flexible split-pane layouts that can be dragged and resized in real-time." },
      { name: "skeleton", title: "Skeleton Placeholder", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Animated skeleton placeholders for content loading state visualizations." },
      { name: "slot-text", title: "Slot Text", isNew: true, video: "", author: "lab", releaseDate: "2026-06-12", description: "Text roll animation for tiny, tactile UI labels. Dependency-free, pure CSS transforms." },
      { name: "micro-interaction-icons", title: "Micro-Interaction Icons", isNew: true, video: "", author: "Oxygen UI", releaseDate: "2026-06-12", description: "A premium pack of 17 micro-interaction icon buttons with spring physics." },
      { name: "bouncy-accordion", title: "Bouncy Accordion", isNew: true, video: "", author: "Oxygen UI", releaseDate: "2026-06-12", description: "Bouncy accordion layout with spring physics and morphing border-radius coordinates." },
      { name: "circular-scroll", title: "Circular Scroll", isNew: true, video: "", author: "Oxygen UI", releaseDate: "2026-06-12", description: "Draggable and scroll-percentage reactive circular progress tracker." },
      { name: "scroll-bar", title: "Scroll Bar", isNew: true, video: "", author: "Oxygen UI", releaseDate: "2026-06-12", description: "Sleek section scroll tracker with dynamic progress and info cards." },
      { name: "scroll-progress", title: "Scroll Progress", isNew: true, video: "", author: "Oxygen UI", releaseDate: "2026-06-12", description: "Vertical scroll progress bar with a numeric handle showing progress percent." },
      { name: "you-can-scroll", title: "Scroll-Morphing Sticky Header", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-13", description: "A gorgeous landing page section featuring a full-width hero header that morphs into a sticky top navigation logo and bar on scroll." },
      { name: "blossom-carousel", title: "Blossom Carousel", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "An ultra-premium horizontal carousel featuring responsive scroll-snapping, click navigation, and smooth slide status indicators." },
      { name: "social-button", title: "Social Buttons Group", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "A premium group of animated interactive social media link buttons with micro-animations and springy color-changing transitions." },
      { name: "smooth-drawer", title: "Smooth Drawer Menu", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "A clean, smooth sliding overlay drawer panel based on Radix Dialog primitives, featuring springy transitions and responsive layouts." },
      { name: "skiper-99", title: "Skiper99 Icons", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Interactive micro-interaction icons (arrow, menu toggle, volume mute) with Framer Motion." },
      { name: "skiper-37", title: "Skiper37 Numbers", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Tactile countdown, counter, and randomizer animations powered by Number Flow and Framer Motion." },
      { name: "skiper-47", title: "Skiper47 Carousel", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Coverflow interactive carousel with Swiper.js." },
      { name: "skiper-48", title: "Skiper48 Cards Carousel", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Interactive 3D stacked cards deck carousel powered by Swiper.js." },
      { name: "skiper-54", title: "Skiper54 ClipPath Carousel", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Interactive slide carousel with expanding clip-path focus transition powered by Embla." },
      { name: "skiper-51", title: "Skiper51 Creative Carousel", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Interactive stacked-creative transition slide carousel powered by Swiper.js." },
      { name: "skiper-41", title: "Skiper41 Progressive Blur", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Smooth progressive blur overlays on scrolling content to transition viewport edges." },
      { name: "skiper-34", title: "Scroll images reveal 003", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Interactive sticky card stack with smooth scroll-based scaling animations. Features a collection of project cards that scale and transform as users scroll, creating an engaging parallax effect with framer-motion animations and Lenis smooth scrolling." },
      { name: "skiper-16", title: "Skiper16 Card Stack", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Stacked 3D deck of creative cards that scale down sequentially on scroll." },
      { name: "skiper-17", title: "Skiper17 Sticky Cards", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Immersive stacked deck of creative cards shifting/scaling on scroll trigger." },
      { name: "skiper-19", title: "Skiper19 Scroll Path", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Artistic svg line stroke trace animation tracking page scroll progress." },
      { name: "skiper-26", title: "Skiper26 Theme Toggle", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Vibrant View Transition API theme toggle button with polygon, circular, blur, and custom gif masks." },
      { name: "skiper-28", title: "Skiper28 Perspective Scroll", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Immersive 3D perspective text scroll animation powered by Framer Motion and Lenis." },
      { name: "skiper-63", title: "Skiper63 Squicircle Filter", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "Interactive gooey SVG-filtered squicircle shape modifier panel with customizable sliders." },
      { name: "skiper-87", title: "Skiper87 Scroll Fade", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Smooth vertical scroll area list with top and bottom progressive fade overlays." },
      { name: "skiper-61", title: "Skiper61 Mouse Follower", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Vibrant snappier cursor pointer-following dot animations with raw and spring-damped dynamics." },
      { name: "skiper-64", title: "Skiper64 Gooey Drag", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Satisfying gooey drag-morph transition using custom SVG filters and spring physics." },
      { name: "skiper-66", title: "Skiper66 Geometric Clip", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Unique geometric layout morph masking of hover-scale image panels using SVG clipPath." },
      { name: "skiper-67", title: "Skiper67 Video Player", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Interactive custom video player popover using Framer Motion and Media Chrome." },
      { name: "skiper-25", title: "Skiper25 Waveform Toggle", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Minimalist sound-reactive waveform and audio play/pause toggle button." },
      { name: "skiper-3", title: "Skiper3 Dynamic Morph Toggle", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Vibrant layout-morphing toggler button with spring scaling." },
      { name: "skiper-58", title: "Skiper58 TextRoll Navigation", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Split-character hover-staggered text rolling vertical navigation items list." },
      { name: "skiper-4", title: "Skiper4 Toggles Panel", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Draggable customization control deck displaying five distinct animated theme toggler styles." },
      { name: "skiper-31", title: "Skiper31 Scroll Entrance", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Immersive scroll-linked text character reveals and tech stack integrations using smooth Lenis scrolling." },
      { name: "skiper-30", title: "Skiper30 Column Parallax", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Premium multi-column asymmetric parallax scroll gallery using Lenis scroll interpolation." },
      { name: "skiper-62", title: "Skiper62 Loop Hook Text", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Interactive loop hook animating text lists with sliding entry transitions." },
      { name: "skiper-102", title: "Skiper102 Debug Panel", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-14", description: "Minimalist debug panel displaying real-time coordinate state trackers." },
      { name: "image-reveal-list", title: "Image Reveal List", isNew: true, video: "", author: "Oxygen UI", releaseDate: "2026-07-01", description: "Hover-based image reveal tooltip list." },
      { name: "magnetic-spotlight-marquee", title: "Magnetic Spotlight Marquee", isNew: true, video: "", author: "GSAP", releaseDate: "2026-07-01", description: "Interactive full-screen marquee with spotlight cursor effect." }
    ]
  },
  {
    title: "Image Effects",
    slug: "image-effects",
    description: "Components showcasing advanced image effects with canvas and WebGL",
    items: [
      { name: "orbital-image-wheel", title: "Orbital Image Wheel", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/Orbit.webm", author: "Leo", releaseDate: "2026-04-04", description: "Scroll-driven half-wheel image layout pinned to the bottom area of the viewport, with GSAP focus effects and animated active captions." },
      { name: "horizontal-depth-fade", title: "Horizontal Depth Fade", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/HorizontaleScroll.webm", author: "Leo", releaseDate: "2026-04-04", description: "Scroll-driven horizontal strip with images on a single line, cinematic blur focus, and brightness falloff." },
      { name: "scroll-dissolve-reveal", title: "Scroll Dissolve Reveal", isNew: true, video: "", author: "React Three Fiber", releaseDate: "2026-07-01", description: "A beautiful image dissolve effect driven by scrolling using React Three Fiber and Shaders." }
    ]
  },
  {
    title: "Marketing",
    slug: "marketing",
    description: "Polished marketing components for SaaS sites, landing pages and portfolios",
    items: [
      { name: "inline-testimonials", title: "Inline Testimonials", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/InlineTestimonials.webm", author: "Leo", releaseDate: "2026-03-25", description: "Testimonials flowing inline as text..." },
      { name: "aurora-card", title: "Aurora Card", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/AuroraCard.webm", author: "Leo", releaseDate: "2026-04-04", description: "Aurora pricing card with the same visual style..." },
      { name: "blob-card", title: "Blob Card", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/BlobCard.webm", author: "Leo", releaseDate: "2026-04-06", description: "Animated card with fluid blob header..." },
      { name: "vertical-marquee", title: "Vertical Marquee", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/VerticalMarquee.webm", author: "Leo", releaseDate: "2026-03-28", description: "Two columns of images scrolling vertically..." },
      { name: "card-footer", title: "Card Footer", isNew: true, video: "", author: "Leo", releaseDate: "2026-05-17", description: "An ultra-premium, heavily rounded card-style footer with 3D parallax scroll reveals, magnetic hover lifts, and an integrated top button." },
      { name: "partition-bar", title: "Partition Bar", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-09", description: "A composable proportional bar chart built from segment, title, and value sub-components. Useful for storage, budget, or usage breakdowns." },
      { name: "testimonial-marquee", title: "Testimonial Marquee", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-09", description: "Dual-row auto-scrolling testimonial cards with avatar, username, and quote. Pauses on hover with soft fade-out edge gradients." },
      { name: "marquee-brands", title: "Brands Marquee", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Seamless auto-scrolling brand logo marquee that pauses on hover." },
      { name: "partition-bar-sizes", title: "Partition Bar Sizes", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Proportional segment bar chart showcased in multiple sizes and densities." },
      { name: "logo-cloud", title: "Logo Cloud Carousel", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "Smooth infinite-scrolling logo cloud carousel with clean grid layouts, hover slowdowns, and responsive styling." },
      { name: "integrations", title: "Integrations List Showcase", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "A beautifully animated grid showcasing integration platforms with springy connect indicators, status badges, and interactive tooltips." },
      { name: "image-gallery", title: "Masonry Image Gallery", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "A modern responsive grid showing images in a clean layout with smooth hover expansions, lightbox zooms, and lazy loading triggers." },
      { name: "pricing-sections", title: "Pricing Sections Collection", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "A collection of 4 different premium pricing card layouts featuring frequency toggles, badge highlights, and interactive hover lifts." }
    ]
  },
  {
    title: "Navigation",
    slug: "navigation",
    description: "Navbar and menu components with fluid animations",
    items: [
      { name: "dock", title: "Dock", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/Dock.webm", author: "Leo", releaseDate: "2026-03-11", description: "macOS-style animated dock..." },
      { name: "motion-tabs-menu", title: "Motion Tabs Menu", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/MotionTabsMenu2.webm", author: "Leo", releaseDate: "2026-03-29", description: "A floating bottom tab bar..." },
      { name: "motion-navigation-menu", title: "Motion Navigation Menu", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/MotionNavigationMenu.webm", author: "Leo", releaseDate: "2026-04-26", description: "A spring-animated navigation menu..." },
      { name: "gooey-navbar-menu", title: "Gooey Navbar Menu", premium: true, isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/GooeyNavbarMenu.webm", author: "Leo", releaseDate: "2026-04-26", description: "A spring-animated navbar menu..." },
      { name: "floating-navbar", title: "Floating Navbar", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/FloatingNavbar.webm", author: "Leo", releaseDate: "2026-03-11", description: "A sticky floating pill navbar..." },
      { name: "expandable-navbar", title: "Expandable Navbar", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/ExpandableNavbar.webm", author: "Leo", releaseDate: "2026-03-22", description: "Full-width fixed header with velocity-highlight hover..." },
      { name: "sidebar-001", title: "Sidebar 001", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/Sidebar001.webm", author: "Leo", releaseDate: "2026-04-22", description: "Animated vertical sidebar..." },
      { name: "sidebar-002", title: "Sidebar 002", premium: true, isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/Sidebar002.webm", author: "Leo", releaseDate: "2026-04-22", description: "Slide-in overlay sidebar with spring animation..." },
      { name: "dock-menu", title: "Dock Menu", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "An ultra-smooth spring-animated macOS-style dock menu with dynamic resizing, tooltips, and customizable orientations." },
      { name: "dynamic-scroll-progress", title: "Dynamic Scroll Progress", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "An elegant floating page index menu that maps sections and displays interactive scroll progress percentages with animated lines." },
      { name: "liquid-metal-progress", title: "Liquid Metal Progress", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-05-17", description: "WebGL-powered circular scroll progress tracker doubling as an elastic floating Back to Top button." },
      { name: "toolbar", title: "Interactive Toolbar", isNew: true, video: "", author: "@dorianbaffier", releaseDate: "2026-06-09", description: "A gorgeous, interactive spring-animated toolbar with active state notifications and toggle status." },
      { name: "expandable-tabs", title: "Dynamic Capsule Of tabs", isNew: true, video: "", author: "@dorianbaffier", releaseDate: "2026-06-09", description: "A fluid, expandable set of navigation tabs nested inside an interactive spring-morphing capsule." },
      { name: "horizontal-nav", title: "Scroll Timeline Nav", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-10", description: "Edge-faded horizontal navigation strip that tracks and snaps to active anchor sections." },
      { name: "skiper-40", title: "Skiper40 Links", isNew: true, video: "", author: "Skiper UI", releaseDate: "2026-06-13", description: "A set of five premium animated anchor links with sliding underlines and hover arrow directions." }
    ]
  },
  {
    title: "Backgrounds & Shaders",
    slug: "backgrounds",
    description: "Immersive background components with WebGL and canvas effects",
    items: [
      { name: "gravity-stars", title: "Gravity Stars", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/GravityStars.webm", author: "Leo", releaseDate: "2026-03-08", description: "Interactive canvas background with gravity-driven star particles..." },
      { name: "pixel-liquid-bg", title: "Pixel Liquid Background", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/PixelLiquidBg.webm", author: "Leo", releaseDate: "2026-03-08", description: "Full Navier-Stokes fluid simulation..." },
      { name: "aurora-bars", title: "Aurora Bars", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/AuroraBars.webm", author: "Leo", releaseDate: "2026-03-08", description: "Animated vertical gradient bars forming an arch aurora effect..." },
      { name: "pixel", title: "Pixel Background", premium: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/Pixel.webm", author: "Leo", releaseDate: "2026-03-10", description: "A customizable pixelated background effect..." },
      { name: "wave-background", title: "Wave Background", premium: true, isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/WaveBackground.webm", author: "Leo", releaseDate: "2026-04-15", description: "A morphing SVG wave divider with scroll-driven morphing..." },
      { name: "square-pattern", title: "Square Pattern", premium: true, isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/BackgroundSquarePattern.webm", author: "Leo", releaseDate: "2026-05-01", description: "An interactive grid background where squares randomly light up..." },
      { name: "cosmic-spectrum", title: "Cosmic Spectrum Background", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-13", description: "Immersive WebGL shader background featuring evolving cosmic dust, glowing nebulas, and interactive mouse-tracked spectrum morphs." },
      { name: "falling-pattern", title: "Falling Pattern Background", isNew: true, video: "", author: "Subhan-code", releaseDate: "2026-06-13", description: "Satisfying HTML5 canvas background featuring falling matrix-style coordinate patterns, glowing nodes, and elastic mouse interactions." },
      { name: "beams-background", title: "Beams Background", isNew: true, video: "", author: "KokonutUI", releaseDate: "2026-06-13", description: "High-fidelity animated gradient beams canvas background with configurable intensity, speed, dark mode compatibility and micro-particle glow." }
    ]
  },
  {
    title: "Icons",
    slug: "icons",
    description: "Animated SVG icons with path morphing and motion transitions",
    items: [
      { name: "sidebar-toggle-icon", title: "Sidebar Toggle Icon", video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/SidebarToggleIcon.webm", author: "Leo", releaseDate: "2026-03-22", description: "Animated SVG icon that morphs between open and closed sidebar states..." },
      { name: "list-view-icon", title: "List View Icon", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/ListViewIcon.webm", author: "Leo", releaseDate: "2026-04-12", description: "Three horizontal lines that shuffle vertically when active..." },
      { name: "compact-view-icon", title: "Compact View Icon", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/CompactViewIcon.webm", author: "Leo", releaseDate: "2026-04-12", description: "Six dots in a 3×2 grid that reorder via Motion layout animation when active..." },
      { name: "cards-view-icon", title: "Cards View Icon", isNew: true, video: "https://urjypba3n2iozf8u.public.blob.vercel-storage.com/preview/CardsViewIcon.webm", author: "Leo", releaseDate: "2026-04-12", description: "Four squares in a 2×2 grid that reorder via Motion layout animation when active..." },
    ]
  }
];
