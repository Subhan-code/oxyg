import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";

// Testimonial data from original site
const TESTIMONIALS = [
  {
    name: "Sebastian Speier",
    company: "Shop",
    avatar: "https://framerusercontent.com/images/8zPjhjpZDsQyt7VsFaoFHBRX4.png?width=512&height=512",
    companyLogo: "https://framerusercontent.com/images/WPJSgxhb9b3xD0bzr1NcrRp5Fk.png?width=96&height=96",
    text: "Mobbin is a great resource and it always comes in handy to see what the best practices or standards are for mobile patterns in our current landscape."
  },
  {
    name: "Marco Cornacchia",
    company: "Figma",
    avatar: "https://framerusercontent.com/images/p1E7jUVk2iXcreO9F8mXhWsSGXU.png?width=88&height=88",
    companyLogo: "https://framerusercontent.com/images/M88YBIKViFKiHqJDp45QHsWj7WI.png?width=144&height=144",
    text: "Mobbin is one of my favorite resources for product design and ui inspo. I love having access to a ton of \"real world examples\" to see how different apps and companies handle specific UI patterns and flows."
  },
  {
    name: "Oykun Yilmaz",
    company: "",
    avatar: "https://framerusercontent.com/images/gc951ooAwLf9sRVy5hpkKje7oc.png?width=88&height=88",
    companyLogo: "",
    text: "Designing feasible solutions based on real-world products is crucial for our design careers. Mobbin provides the best resources for this approach. I use it daily!"
  },
  {
    name: "Meng To",
    company: "DesignCode",
    avatar: "https://framerusercontent.com/images/3ndODJ5P689x5Lc8nWC29cfMUs.png?width=512&height=512",
    companyLogo: "https://framerusercontent.com/images/BMmuPME8dhjWzSCoEF4saVhh02I.png?width=96&height=96",
    text: "Mobbin is a game-changer for designers looking to step up their understanding of UX and UI design patterns. It’s so massive, meticulously organized, has deep user flows and even a figma plugin!"
  },
];

const APP_ROWS = [
  [
    { name: "Wise", icon: "https://framerusercontent.com/images/XVWfG1L9vAeU0bybYh5VsGOZzc4.png?width=128&height=128" },
    { name: "Headspace", icon: "https://framerusercontent.com/images/2IZolpc3aj1oF1eRqpFqB4D14XA.png?width=128&height=128" },
    { name: "Airbnb", icon: "https://framerusercontent.com/images/6ki5YX4y0PkROKoLhHQczkwo.png?width=128&height=128" },
    { name: "Uber", icon: "https://framerusercontent.com/images/ZIA0MIkgvKrkS0m0rUDSHfZtU.png?width=128&height=128" },
    { name: "Nike", icon: "https://framerusercontent.com/images/yzjtjN8sEOXYoE45LmXYNpi9Bio.png?width=128&height=128" },
    { name: "Pinterest", icon: "https://framerusercontent.com/images/cohwa4DeXvyJa0oX2nl56sJb0YM.png?width=128&height=128" },
    { name: "Coinbase", icon: "https://framerusercontent.com/images/KEkEBpEksRyfqHLwlv2NldooBRo.png?width=128&height=128" }
  ],
  [
    { name: "Creme", icon: "https://framerusercontent.com/images/jsMu3mifYYkfjOxCyZS7LAlnU.png?width=128&height=128" },
    { name: "Mailchimp", icon: "https://framerusercontent.com/images/gT5Y354miifNj617tf1ax9IRiCY.png?width=128&height=128" },
    { name: "Twitch", icon: "https://framerusercontent.com/images/zamLUBrUtkNvCC1fPCmnRKRjFk.png?width=128&height=128" },
    { name: "ChatGPT", icon: "https://framerusercontent.com/images/Yzc00RnuoL0aJjPeZFZgTnuWs7M.png?width=128&height=128" },
    { name: "Shopify", icon: "https://framerusercontent.com/images/Q5TYjFD0If7GsmnyrReSCQgQzis.png?width=128&height=128" },
    { name: "Loom", icon: "https://framerusercontent.com/images/FzQ2xlGuDfLcPfXMym58zrb5Co.png?width=128&height=128" },
    { name: "Shop", icon: "https://framerusercontent.com/images/M1k8K9IlMKKBoCMFAIpok3vRUVU.png?width=128&height=128" }
  ],
  [
    { name: "Spotify", icon: "https://framerusercontent.com/images/2zjFulwZwNZfFBOJcZPuDGRXC8s.png?width=128&height=128" },
    { name: "Apple TV", icon: "https://framerusercontent.com/images/26qAidI733ftOZzL1mWqcHMHJB4.png?width=128&height=128" },
    { name: "Shop", icon: "https://framerusercontent.com/images/M1k8K9IlMKKBoCMFAIpok3vRUVU.png?width=128&height=128" },
    { name: "Cosmos", icon: "https://framerusercontent.com/images/RedmF0492SNcc1wFT5NlsqPXlog.png?width=128&height=128" },
    { name: "Retro", icon: "https://framerusercontent.com/images/mXkMEzXaCiDD8iDLZzxTCjosFIQ.png?width=128&height=128" },
    { name: "Notion", icon: "https://framerusercontent.com/images/fs57z1WYp7bHbJ92NhFbk3Kuo.png?width=128&height=128" },
    { name: "Dropbox", icon: "https://framerusercontent.com/images/bKDLbWnfttQTD7EaT8x164rMc.png?width=128&height=128" }
  ]
];

export function FooterAndTestimonials() {
  return (
    <>
      <div className="py-24 md:py-32 bg-white relative border-t border-neutral-100">
        <div className="max-w-[1280px] mx-auto px-4 md:px-8">
          <h2 className="text-[2.25rem] md:text-6xl font-bold tracking-[-0.04em] text-neutral-900 text-center mb-16 md:mb-24">
            What our users are saying.
          </h2>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {TESTIMONIALS.map((t, i) => (
               <div key={i} className="border border-neutral-200/80 bg-white rounded-3xl p-6 md:p-8 shadow-sm hover:shadow-md transition-shadow flex flex-col gap-6">
                 <div className="flex items-center gap-3">
                   <div className="relative">
                     <img src={t.avatar} className="w-12 h-12 rounded-full object-cover bg-neutral-100 border border-neutral-100" alt={t.name} />
                     {t.companyLogo && (
                       <img src={t.companyLogo} className="w-5 h-5 rounded-full border-2 border-white absolute -bottom-1 -right-1 bg-white" alt={t.company} />
                     )}
                   </div>
                   <div className="leading-tight flex flex-col justify-center">
                     <h3 className="font-semibold text-neutral-900 text-[15px]">{t.name}</h3>
                     {t.company && <p className="text-neutral-500 text-[13px] font-medium">{t.company}</p>}
                   </div>
                 </div>
                 <p className="text-neutral-600 text-[15px] leading-relaxed font-medium pb-2">
                   "{t.text}"
                 </p>
               </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white py-24 md:py-32 overflow-hidden relative rounded-b-[40px] md:rounded-b-[48px]">
        <div className="max-w-4xl mx-auto px-4 text-center z-10 relative">
          <h2 className="text-[2.5rem] leading-[1.05] md:text-[80px] md:leading-[80px] font-bold tracking-[-0.6px] text-[#141414] mb-8">
            Never run out of <br className="hidden md:block" /> inspiration again.
          </h2>
          <p className="text-[16px] md:text-[20px] text-[#717171] font-[450] mb-10 md:mb-12 max-w-xl mx-auto px-4 leading-[26px]">
            Use Mobbin for free as long as you like or get full access with any of our paid plans.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 px-4 w-full">
            <button className="w-full sm:w-auto bg-[#141414] text-white px-6 py-[10px] rounded-full font-semibold text-[15px] hover:scale-105 active:scale-95 transition-all shadow-md">
              Join for free
            </button>
            <button className="w-full sm:w-auto bg-transparent border border-[#0000001a] text-[#141414] px-6 py-[10px] rounded-full font-semibold text-[15px] hover:bg-neutral-50 active:scale-95 transition-all shadow-sm flex items-center justify-center gap-2">
              See our plans
              <ArrowRight className="w-4 h-4 text-[#adadad]" />
            </button>
          </div>
        </div>

        <div className="mt-24 md:mt-32 flex flex-col gap-6 md:gap-10 overflow-hidden relative opacity-100 pointer-events-none pb-12">
           {APP_ROWS.map((row, index) => (
             <motion.div 
                key={index}
                animate={{ x: index % 2 === 1 ? ["-50%", "0%"] : ["0%", "-50%"] }}
                transition={{ ease: "linear", duration: 30 + index * 5, repeat: Infinity }}
                className="flex gap-6 md:gap-10 min-w-max"
              >
                {[...row, ...row].map((app, i) => (
                  <div key={i} className="flex items-center gap-4 shrink-0 px-2 group">
                    <img src={app.icon} className="w-16 md:w-[64px] h-16 md:h-[64px] rounded-[16px] border border-neutral-100 shadow-[0_2px_4px_rgba(0,0,0,0.02)]" alt={app.name} />
                    <span className="text-[20px] md:text-[32px] font-bold text-[#141414] tracking-[-0.6px]">{app.name}</span>
                  </div>
                ))}
              </motion.div>
           ))}
        </div>
      </div>
    </>
  );
}
