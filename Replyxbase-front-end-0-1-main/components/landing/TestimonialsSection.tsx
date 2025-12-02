import React from "react";
import { getTranslations } from "next-intl/server";
import { Star } from "lucide-react";

const TestimonialCard = ({ quote, author, role, company }: { quote: string, author: string, role: string, company: string }) => (
    <div className="bg-white p-8 rounded-3xl border border-gray-100 hover:border-[#2A4D9A]/20 transition-all duration-300 group">
        <div className="mb-6 flex gap-1">
            {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-yellow-400" />
            ))}
        </div>
        <p className="text-lg text-gray-700 mb-8 leading-relaxed font-medium">"{quote}"</p>
        <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-[#2A4D9A]/10 rounded-full flex items-center justify-center text-[#2A4D9A] font-bold text-lg group-hover:scale-110 transition-transform">
                {author[0]}
            </div>
            <div>
                <div className="font-bold text-gray-900">{author}</div>
                <div className="text-sm text-gray-500">{role}, {company}</div>
            </div>
        </div>
    </div>
);

const TestimonialsSection = async () => {
    const t = await getTranslations("Landing.Testimonials");
    return (
        <section className="py-24 bg-white border-t border-gray-100">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16 max-w-2xl mx-auto">
                    <h2 className="text-4xl font-bold text-gray-900 mb-6 tracking-tight">{t("title")}</h2>
                    <p className="text-xl text-gray-600">{t("subtitle")}</p>
                </div>
                <div className="grid md:grid-cols-3 gap-8">
                    <TestimonialCard 
                        quote={t("quote1")}
                        author={t("author1")}
                        role={t("role1")}
                        company={t("company1")}
                    />
                    <TestimonialCard 
                        quote={t("quote2")}
                        author={t("author2")}
                        role={t("role2")}
                        company={t("company2")}
                    />
                    <TestimonialCard 
                        quote={t("quote3")}
                        author={t("author3")}
                        role={t("role3")}
                        company={t("company3")}
                    />
                </div>
            </div>
        </section>
    );
};

export default TestimonialsSection;
