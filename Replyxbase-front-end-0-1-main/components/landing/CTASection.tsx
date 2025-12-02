import React from "react";
import { getTranslations } from "next-intl/server";
import { Button } from "@/components/ui/Button";

const CTASection = async () => {
    const t = await getTranslations("Landing.CTA");
    const tCommon = await getTranslations("Common");
    return (
        <section className="py-24 bg-white">
            <div className="container mx-auto px-6">
                <div className="bg-[#2A4D9A] rounded-[3rem] p-12 md:p-24 text-center relative overflow-hidden shadow-xl shadow-[#2A4D9A]/20">
                    {/* Abstract Shapes */}
                    <div className="absolute top-0 left-0 w-96 h-96 bg-white/10 rounded-full blur-[100px] -translate-x-1/2 -translate-y-1/2"></div>
                    <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full blur-[100px] translate-x-1/2 translate-y-1/2"></div>
                    
                    <div className="relative z-10 max-w-4xl mx-auto">
                        <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
                            {t("title")}
                        </h2>
                        <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-2xl mx-auto leading-relaxed">
                            {t("subtitle")}
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <Button variant="white" size="lg" className="h-14 px-10 rounded-full text-lg font-bold text-[#2A4D9A] hover:bg-white/90 border-none shadow-lg hover:shadow-xl hover:-translate-y-1 transition-all" aria-label={tCommon("startFreeTrial")}>
                                {tCommon("startFreeTrial")}
                            </Button>
                            <Button variant="outline" size="lg" className="h-14 px-10 rounded-full text-lg font-bold text-white border-2 border-white/20 hover:bg-white/10 hover:border-white/40 transition-all" aria-label={tCommon("contactSales")}>
                                {tCommon("contactSales")}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CTASection;
