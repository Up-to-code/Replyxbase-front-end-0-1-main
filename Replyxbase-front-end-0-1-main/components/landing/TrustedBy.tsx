"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { Building2, Globe2, Layout, Layers, Box, Hexagon, Triangle, Circle, Star } from "lucide-react";
import { motion } from "framer-motion";

const TrustedBy = () => {
    const t = useTranslations("Landing.TrustedBy");
    
    const uniqueCompanies = [
        { name: "TechFlow", icon: Hexagon, color: "text-blue-600" },
        { name: "GrowthLabs", icon: Triangle, color: "text-green-600" },
        { name: "Elevate", icon: Layers, color: "text-purple-600" },
        { name: "GlobalCorp", icon: Globe2, color: "text-indigo-600" },
        { name: "NextGen", icon: Box, color: "text-orange-600" },
        { name: "FutureWorks", icon: Layout, color: "text-pink-600" },
    ];

    // Repeat the companies list to ensure infinite scroll density
    const companies = Array(10).fill(uniqueCompanies).flat();

    return (
        <section className="py-10 bg-white border-b border-gray-100 overflow-hidden">
            <div className="container mx-auto px-4 mb-8 text-center">
                <div className="flex flex-col items-center justify-center gap-4">
                    <div className="flex items-center gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                        ))}
                    </div>
                    <p className="text-sm font-medium text-gray-600">
                        Trusted by <span className="font-bold text-gray-900">1,000+</span> companies worldwide
                    </p>
                </div>
            </div>

            <div 
                className="relative w-full overflow-hidden" 
                dir="ltr"
            >
                {/* Fade Gradients */}
                <div className="absolute left-0 top-0 bottom-0 w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none"></div>
                <div className="absolute right-0 top-0 bottom-0 w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none"></div>
                
                {/* Infinite Loop Container */}
                <div className="flex w-max animate-marquee hover:[animation-play-state:paused]">
                    {[...Array(2)].map((_, i) => (
                        <div key={i} className="flex items-center gap-16 mx-8">
                            {companies.map((company, index) => (
                                <div key={`${i}-${index}`} className="flex items-center gap-2 group opacity-50 hover:opacity-100 transition-opacity cursor-pointer grayscale hover:grayscale-0 duration-300">
                                    <company.icon className={`w-8 h-8 ${company.color}`} />
                                    <span className="text-xl font-bold text-gray-700 group-hover:text-gray-900">{company.name}</span>
                                </div>
                            ))}
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default TrustedBy;
