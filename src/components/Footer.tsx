import { motion } from "motion/react";
import logoUrl from "../assets/oxygen-ui-logo.png";

export function Footer() {
  return (
    <footer className="relative md:fixed md:bottom-0 md:left-0 w-full h-auto md:h-[400px] z-0 bg-[#141414] flex flex-col justify-end pb-8 pt-10 md:pt-20 md:pb-12 px-5 md:px-12 text-[#f5f5f5] font-sans">
      <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row justify-between items-start gap-6 md:gap-12 z-10">
        <div className="flex flex-col gap-2 md:gap-4 md:max-w-[320px]">
           <div className="flex items-center gap-2 md:gap-3">
             <img src={logoUrl} alt="Oxygen UI Logo" className="h-6 md:h-8 w-auto object-contain" />
             <span className="font-bold text-[22px] md:text-[32px] tracking-tight text-white">Oxygen UI</span>
           </div>
           <p className="text-[13px] md:text-[17px] font-normal leading-relaxed text-[#a1a1aa]">Build better digital experiences with Oxygen UI.</p>
        </div>

        <div className="grid grid-cols-2 md:flex gap-x-12 gap-y-8 md:gap-[120px] lg:gap-[160px] w-full md:w-auto h-auto">
          <div className="flex flex-col gap-3 text-[14px] md:text-[15px] font-semibold text-[#a1a1aa]">
            <span className="text-white mb-1 tracking-wider text-[11px] uppercase opacity-40">Products</span>
            <a href="#" className="hover:text-white transition-colors">Explore</a>
            <a href="#" className="hover:text-white transition-colors">Glossary</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
          </div>
          <div className="flex flex-col gap-3 text-[14px] md:text-[15px] font-semibold text-[#a1a1aa]">
            <span className="text-white mb-1 tracking-wider text-[11px] uppercase opacity-40">Company</span>
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Help center</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Merch</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-6 mt-12 md:mt-[60px] text-[13px] text-[#a1a1aa] z-10 font-medium border-t border-white/5 pt-8">
           <span>© Oxygen UI 2026</span>
           <div className="flex gap-8 md:gap-12 w-full md:w-auto">
               <a href="#" className="hover:text-white transition-colors">Privacy policy</a>
               <a href="#" className="hover:text-white transition-colors">Terms of service</a>
           </div>
      </div>
    </footer>
  );
}
