import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { MessageCircle, Send, Globe, Cpu, Layers } from "lucide-react";

const channels = [
  { name: "WhatsApp", icon: MessageCircle, color: "bg-[#25D366]" },
  { name: "Telegram", icon: Send, color: "bg-[#0088cc]" },
  { name: "Web", icon: Globe, color: "bg-[#2A4D9A]" },
  { name: "API", icon: Cpu, color: "bg-[#8b5cf6]" },
  { name: "Slack", icon: Layers, color: "bg-[#4A154B]" }
];

const HeroOrbit = ({ isMobile }: { isMobile: boolean }) => {
  return (
    <div className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] flex items-center justify-center">
      
      {/* Central Hub */}
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="relative z-20 w-32 h-32 sm:w-48 sm:h-48 bg-white rounded-full shadow-2xl flex items-center justify-center border-4 border-white ring-1 ring-gray-100"
      >
         {/* Logo */}
         <div className="flex flex-col items-center justify-center gap-2 relative z-10">
            <Image 
              src="/logo.png" 
              alt="Replyxbase" 
              width={64} 
              height={64}
              className="object-contain"
              priority
            />
            <span className="font-bold text-xl text-gray-900 tracking-tight">Replyxbase</span>
         </div>

         {/* Glowing Core */}
         <motion.div 
           animate={{ opacity: [0.5, 0.8, 0.5], scale: [0.8, 1.1, 0.8] }}
           transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 rounded-full bg-[#2A4D9A]/5 blur-xl"
         />

         {/* Pulsing Rings */}
         <motion.div 
           animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0, 0.5] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
           className="absolute inset-0 rounded-full border-2 border-[#2A4D9A]/10"
         />
         <motion.div 
           animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
           transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
           className="absolute -inset-4 rounded-full border border-[#2A4D9A]/5"
         />
      </motion.div>

      {/* Orbit Container */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 z-10"
      >
        {channels.map((channel, index) => {
            const angle = (index * 360) / channels.length - 90;
            const radius = isMobile ? 140 : 230;
            const xPos = Math.cos(angle * Math.PI / 180) * radius;
            const yPos = Math.sin(angle * Math.PI / 180) * radius;
            
            return (
                <div
                    key={index}
                    className="absolute top-1/2 left-1/2 w-16 h-16 -ml-8 -mt-8"
                    style={{ 
                        transform: `translate(${xPos}px, ${yPos}px)`
                    }}
                >
                    {/* Connection Beam (Rotates with container) */}
                    <div 
                      className="absolute top-1/2 left-1/2 h-[2px] origin-left -z-10"
                      style={{ 
                          width: radius - 60,
                          transform: `rotate(${angle + 180}deg)`,
                          left: "50%",
                          top: "50%"
                       }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-[#2A4D9A]/20 to-[#2A4D9A]/40"></div>
                      
                      {/* Data Particle */}
                      <motion.div 
                        animate={{ left: ["0%", "100%"], opacity: [0, 1, 0] }}
                        transition={{ duration: 3, repeat: Infinity, ease: "linear", delay: index * 0.5 }}
                        className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 bg-[#2A4D9A] rounded-full shadow-[0_0_8px_rgba(42,77,154,0.6)]"
                      />
                    </div>

                    {/* Icon Card (Counter-rotates to stay upright) */}
                    <motion.div 
                      animate={{ rotate: -360 }}
                      transition={{ duration: 60, repeat: Infinity, ease: "linear" }}
                      className="w-full h-full"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        className="w-16 h-16 bg-white rounded-2xl shadow-lg border border-gray-100 flex items-center justify-center relative group cursor-pointer"
                      >
                          <div className={`w-10 h-10 ${channel.color} rounded-xl flex items-center justify-center text-white transition-transform group-hover:scale-110`}>
                              <channel.icon className="w-5 h-5" />
                          </div>
                          {/* Glow ring */}
                          <div className="absolute -inset-1 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" style={{ background: `linear-gradient(135deg, ${channel.color.replace('bg-', 'rgba(')}20%, transparent)` }}></div>
                      </motion.div>
                    </motion.div>
                </div>
            );
        })}
      </motion.div>

      {/* Floating Success Indicator (Independent) */}
       <motion.div 
         initial={{ opacity: 0, x: 20 }}
         animate={{ opacity: 1, x: 0 }}
         transition={{ delay: 1, duration: 0.5 }}
         className="absolute top-10 right-0 lg:right-10 z-30"
       >
         <motion.div
            animate={{ y: [-8, 8, -8] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full shadow-lg border border-gray-100 flex items-center gap-2"
         >
            <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-xs font-bold text-gray-700">Data Synced</span>
         </motion.div>
       </motion.div>

    </div>
  );
};

export default HeroOrbit;
