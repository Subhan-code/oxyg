import { motion } from "motion/react";
import logoUrl from "../assets/oxygen-ui-logo.png";

export function Footer() {
  return (
    <footer className="relative w-full h-auto z-0 bg-white flex flex-col justify-end pb-8 pt-10 md:pt-20 md:pb-12 px-5 md:px-12 text-black font-sans">
      <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12 z-10">
        <div className="flex flex-col gap-2 md:gap-4 md:max-w-[320px]">
           <div className="flex items-center gap-2 md:gap-3">
             <img src={logoUrl} alt="Oxygen UI Logo" className="h-6 md:h-8 w-auto object-contain filter invert" />
             <span className="font-bold text-[22px] md:text-[32px] tracking-tight text-black">Oxygen UI</span>
           </div>
           <p className="text-[13px] md:text-[17px] font-normal leading-relaxed text-neutral-500">Build better digital experiences with Oxygen UI.</p>
        </div>

        <div className="grid grid-cols-2 md:flex gap-x-12 gap-y-8 md:gap-[120px] lg:gap-[160px] w-full md:w-auto h-auto">
          <div className="flex flex-col gap-3 text-[14px] md:text-[15px] font-semibold text-neutral-500">
            <span className="text-black mb-1 tracking-wider text-[11px] uppercase opacity-40">Products</span>
            <a href="#" className="hover:text-black transition-colors">Explore</a>
            <a href="#" className="hover:text-black transition-colors">Glossary</a>
            <a href="#" className="hover:text-black transition-colors">Pricing</a>
            <a href="#" className="hover:text-black transition-colors">Changelog</a>
            <a href="#" className="hover:text-black transition-colors">Blog</a>
          </div>
          <div className="flex flex-col gap-3 text-[14px] md:text-[15px] font-semibold text-neutral-500">
            <span className="text-black mb-1 tracking-wider text-[11px] uppercase opacity-40">Company</span>
            <a href="#" className="hover:text-black transition-colors">Contact</a>
            <a href="#" className="hover:text-black transition-colors">Help center</a>
            <a href="#" className="hover:text-black transition-colors">Careers</a>
            <a href="#" className="hover:text-black transition-colors">Merch</a>
            <a href="#" className="hover:text-black transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-6 mt-12 md:mt-[60px] text-[13px] text-neutral-500 z-10 font-medium border-t border-neutral-200 pt-8">
           <span>© Oxygen UI 2026</span>
           <div className="flex gap-8 md:gap-12 w-full md:w-auto">
               <a href="#" className="hover:text-black transition-colors">Privacy policy</a>
               <a href="#" className="hover:text-black transition-colors">Terms of service</a>
           </div>
      </div>
    </footer>
  );
}
