import {
  motion,
  useMotionTemplate,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useRef } from "react";

export const MaskAnimation = () => {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });
  
  const scrollYProgressSpring = useSpring(scrollYProgress, {
    stiffness: 300,
    damping: 40,
  });
  
  const scale = useTransform(scrollYProgressSpring, [0, 1], [1, 12]);
  const imageX = useTransform(scrollYProgressSpring, [0, 1], [50, 0]);
  const imageXCalc = useMotionTemplate`max(0px, calc(${imageX}% + calc(${imageX}vw - 300px)))`;

  return (
    <section className="bg-black text-white selection:bg-[#007aff]/30 overflow-hidden w-full relative z-10 rounded-3xl">
      <div ref={ref} className="relative z-10 h-[150vh] overflow-clip">
        <motion.div
          style={{ scale }}
          className="hero-background sticky left-0 top-0 grid h-screen origin-[50%_70%] gap-2 p-6 pt-12 [grid-template-rows:4fr_1fr] md:origin-[90%_40%] md:pt-20"
        >
          <div className="window-mask flex flex-col rounded-3xl bg-white p-12 md:flex-row shadow-[0_30px_100px_rgba(0,0,0,0.5)]">
            <div className="flex h-full flex-col text-black">
              <h1 className="mb-5 max-w-[12ch] text-[32px] font-bold tracking-tight leading-[0.85] md:my-auto md:text-[60px] xl:text-[80px]">
                Playing with masks & motion.
              </h1>
              <p className="text-lg md:text-[20px] font-medium tracking-tight text-[#86868b] leading-[1.3] mt-2">
                Inspired by the Runway homepage. <br className="hidden md:block"/>
                Recreated by frontend.fyi.
              </p>
            </div>
            <div className="mx-auto -mb-7 mt-4 box-content aspect-[5/8] w-[120px] min-w-[120px] rounded-full border-[4px] border-gray-100 md:my-auto md:-mr-1 md:ml-auto md:w-[220px] md:min-w-[220px] bg-cover bg-center" style={{ backgroundImage: "url('https://i.pinimg.com/1200x/1c/9a/35/1c9a35703b494f30311d89b93817af6c.jpg')" }} />
          </div>
          
          <div className="grid grid-flow-row grid-cols-3 gap-2">
            <div className="col-span-2 rounded-3xl border border-white/20 backdrop-blur-md bg-white/5" />
            <a className="flex items-center justify-center rounded-3xl bg-[#007aff] text-center text-lg font-bold text-white md:text-[24px] tracking-tight hover:bg-[#0060cc] transition-colors cursor-none">
              Early Access
            </a>
          </div>
        </motion.div>
      </div>
      
      <div className="mt-[-150vh] h-[150vh] overflow-clip bg-[#f5f5f7] pb-20 pointer-events-none">
        <motion.img
          src="https://i.pinimg.com/1200x/1c/9a/35/1c9a35703b494f30311d89b93817af6c.jpg"
          style={{ x: imageXCalc }}
          className="sticky top-1/3 mx-auto block aspect-video w-[1200px] max-w-[90%] rounded-[30px] md:rounded-[40px] bg-slate-200 shadow-2xl backdrop-blur-sm object-cover"
        />
      </div>
      
      <div className="bg-[#f5f5f7] text-[#1d1d1f] font-bold text-center py-20 overflow-hidden flex flex-col items-center justify-center min-h-[400px] z-20 relative">
        <div className="space-y-[20px] md:space-y-[40px] text-[40px] md:text-[60px] leading-[0.9] tracking-tighter">
          <p className="transform-gpu">Limitless</p>
          <p className="transform-gpu text-[#86868b]">Canvas.</p>
          <p className="transform-gpu">Infinite</p>
          <p className="transform-gpu text-[#007aff]">Motion.</p>
        </div>
      </div>
    </section>
  );
};
