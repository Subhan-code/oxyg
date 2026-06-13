import { motion } from "motion/react";

export function Footer() {
  return (
    <footer className="fixed bottom-0 left-0 w-full h-[650px] md:h-[550px] z-[-1] bg-[#141414] flex flex-col justify-end pb-12 pt-20 px-4 md:px-12 text-[#f5f5f5] font-sans">
      <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row justify-between items-start gap-12 z-10 w-full">
        <div className="flex flex-col gap-5 md:max-w-[320px]">
           <div className="flex items-center gap-2">
             <span className="font-bold text-[32px] tracking-tight text-white mb-1">Mobbin</span>
           </div>
           <p className="text-[17px] font-normal leading-[26px] text-[#a1a1aa]">Design better digital experiences <br />with Mobbin.</p>
        </div>

        <div className="grid grid-cols-2 md:flex gap-16 md:gap-[160px] w-full md:w-auto h-full">
          <div className="flex flex-col gap-4 text-[15px] font-semibold text-white">
            <a href="#" className="hover:text-white transition-colors">Explore</a>
            <a href="#" className="hover:text-white transition-colors">Glossary</a>
            <a href="#" className="hover:text-white transition-colors">Pricing</a>
            <a href="#" className="hover:text-white transition-colors">Changelog</a>
            <a href="#" className="hover:text-white transition-colors">Blog</a>
            <a href="#" className="hover:text-white transition-colors opacity-80 hover:opacity-100">Colors</a>
            <a href="#" className="hover:text-white transition-colors opacity-80 hover:opacity-100">MCP</a>
            <a href="#" className="hover:text-white transition-colors opacity-80 hover:opacity-100">Finance+</a>
          </div>
          <div className="flex flex-col gap-4 text-[15px] font-semibold text-white">
            <a href="#" className="hover:text-white transition-colors">Contact</a>
            <a href="#" className="hover:text-white transition-colors">Help center</a>
            <a href="#" className="hover:text-white transition-colors">Careers</a>
            <a href="#" className="hover:text-white transition-colors">Merch</a>
            <a href="#" className="hover:text-white transition-colors">X (Twitter)</a>
            <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
          </div>
        </div>
      </div>
      
      <div className="max-w-[1240px] w-full mx-auto flex flex-col md:flex-row justify-between items-end gap-4 md:gap-6 mt-16 md:mt-[80px] text-[13px] text-[#a1a1aa] z-10 font-medium">
           <span className="md:mr-4">© Mobbin 2018-2026</span>
           <div className="grid grid-cols-2 md:flex gap-16 md:gap-[160px] w-full md:w-auto">
               <a href="#" className="hover:text-white transition-colors text-left w-[85px]">Privacy policy</a>
               <a href="#" className="hover:text-white transition-colors text-left w-[85px]">Terms</a>
           </div>
      </div>
    </footer>
  );
}
