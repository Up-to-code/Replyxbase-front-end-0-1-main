"use client";
import React, { useState, useEffect } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, CheckCircle2, Sparkles, Zap } from "lucide-react";
import Link from "next/link";
import { authClient } from "@/lib/auth-client";
import { motion } from "framer-motion";
import HeroOrbit from "./HeroOrbit";

const HeroSection = ({ session: initialSession }: { session?: any }) => {
  const { data: session } = authClient.useSession();
  const t = useTranslations("Landing.Hero");
  const tCommon = useTranslations("Common");

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 640);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Particle state for hydration safe rendering
  const [particles, setParticles] = useState<Array<{ width: number; height: number; top: number; left: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    setParticles(
      [...Array(6)].map(() => ({ // Reduced count for performance
        width: Math.random() * 20 + 10,
        height: Math.random() * 20 + 10,
        top: Math.random() * 100,
        left: Math.random() * 100,
        duration: Math.random() * 5 + 5,
        delay: Math.random() * 2,
      }))
    );
  }, []);

  return (
    <section 
      className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-white"
    >
      {/* Background Gradients & Particles */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-10%] ltr:right-[-5%] rtl:left-[-5%] w-[800px] h-[800px] bg-[#2A4D9A]/10 rounded-full blur-3xl"
        />
        <motion.div 
          animate={{ opacity: [0.3, 0.5, 0.3], scale: [1, 1.1, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-[-10%] ltr:left-[-5%] rtl:right-[-5%] w-[600px] h-[600px] bg-purple-100/30 rounded-full blur-3xl"
        />
        
        {/* Floating Background Particles */}
        {particles.map((particle, i) => (
            <motion.div
                key={i}
                className="absolute bg-[#2A4D9A]/10 rounded-full"
                style={{
                    width: particle.width,
                    height: particle.height,
                    top: `${particle.top}%`,
                    left: `${particle.left}%`,
                }}
                animate={{
                    y: [0, -30, 0],
                    opacity: [0.3, 0.6, 0.3],
                }}
                transition={{
                    duration: particle.duration,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: particle.delay
                }}
            />
        ))}
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-16 lg:gap-24">
          
          {/* Left: Text Content */}
          <div className="flex-1 text-center lg:text-start lg:rtl:text-right max-w-2xl mx-auto lg:mx-0">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#2A4D9A]/10 text-[#2A4D9A] text-sm font-bold mb-8 border border-[#2A4D9A]/20 shadow-sm hover:shadow-md transition-shadow cursor-default">
                <Sparkles className="w-4 h-4" />
                {t("badge")}
              </div>
            </div>

            <h1 className="text-5xl lg:text-7xl font-extrabold text-gray-900 mb-6 tracking-tight leading-[1.1]">
              {t.rich("title", {
                highlight: (chunks) => <span className="text-[#2A4D9A]">{chunks}</span>
              })}
            </h1>

            <p className="text-xl text-gray-600 mb-10 leading-relaxed">
              {t("subtitle")}
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start">
              <Link href={session ? "/dashboard" : "/signup"} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full shadow-xl shadow-[#2A4D9A]/20 hover:shadow-[#2A4D9A]/30 bg-[#2A4D9A] hover:bg-[#1e3a75] text-white transition-all hover:-translate-y-1 flex items-center justify-center gap-2">
                  {session ? tCommon("dashboard") : tCommon("getStarted")}
                  <ArrowRight className="w-5 h-5" />
                </button>
              </Link>
              <button className="w-full sm:w-auto h-14 px-8 text-lg font-semibold rounded-full bg-white border-2 border-gray-100 hover:border-gray-200 text-gray-700 hover:bg-gray-50 transition-all flex items-center justify-center gap-2">
                <Zap className="w-5 h-5 text-yellow-500" />
                {tCommon("watchDemo")}
              </button>
            </div>

            <div className="mt-10 flex items-center justify-center lg:justify-start gap-6 text-sm text-gray-500 font-medium">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-green-500" />
                <span>14-day free trial</span>
              </div>
            </div>
          </div>

          {/* Right: Orbit Animation */}
          <div className="flex-1 w-full max-w-[600px] lg:max-w-none relative flex items-center justify-center">
            <HeroOrbit isMobile={isMobile} />
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
