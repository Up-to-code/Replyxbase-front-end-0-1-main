"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { MessageCircle, Send, Sparkles, Bot, X, ChevronDown } from "lucide-react";

const ChatWidget = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<{role: 'ai' | 'user', text: string}[]>([]);
    const [inputValue, setInputValue] = useState("");
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const t = useTranslations("Landing.Widget");

    // Scroll to bottom
    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, isTyping]);

    const handleSend = () => {
        if (!inputValue.trim()) return;
        
        const userMsg = inputValue;
        setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
        setInputValue("");
        setIsTyping(true);

        // Simulate AI response
        setTimeout(() => {
            setIsTyping(false);
            let response = t("aiResponseDefault");
            if (userMsg.toLowerCase().includes("pricing") || userMsg.includes("سعر")) {
                response = t("aiResponsePricing");
            } else if (userMsg.toLowerCase().includes("whatsapp") || userMsg.includes("واتساب")) {
                response = t("aiResponseWhatsapp");
            }
            setMessages(prev => [...prev, { role: 'ai', text: response }]);
        }, 1500);
    };

    return (
        <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end gap-4 rtl:right-auto rtl:left-8 rtl:items-start">
            <AnimatePresence>
                {isOpen && (
                    <motion.div 
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 20, scale: 0.95 }}
                        className="bg-white rounded-[2rem] shadow-2xl border border-gray-100 w-[380px] md:w-[420px] overflow-hidden flex flex-col max-h-[650px]"
                    >
                        {/* Header */}
                        <div className="bg-white p-6 flex items-center justify-between border-b border-gray-100">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-[#2A4D9A] rounded-full flex items-center justify-center shadow-lg shadow-[#2A4D9A]/20">
                                    <Bot className="w-6 h-6 text-white" />
                                </div>
                                <div>
                                    <div className="font-bold text-lg text-gray-900">{t("title")}</div>
                                    <div className="text-xs text-green-600 font-medium flex items-center gap-1.5 bg-green-50 px-2 py-0.5 rounded-full w-fit mt-1">
                                        <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></span>
                                        {t("online")}
                                    </div>
                                </div>
                            </div>
                            <button onClick={() => setIsOpen(false)} className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-400 hover:text-gray-900">
                                <X className="w-5 h-5" />
                            </button>
                        </div>

                        {/* Messages */}
                        <div className="flex-1 p-6 overflow-y-auto bg-gray-50/50 space-y-6 min-h-[350px]">
                            {messages.length === 0 && (
                                <div className="text-center py-10">
                                    <div className="w-16 h-16 bg-[#2A4D9A]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <Sparkles className="w-8 h-8 text-[#2A4D9A]" />
                                    </div>
                                    <p className="text-gray-500 text-sm max-w-[200px] mx-auto">{t("welcome")}</p>
                                </div>
                            )}
                            {messages.map((msg, i) => (
                                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                    <div className={`max-w-[85%] p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.role === 'user' ? 'bg-[#2A4D9A] text-white rounded-br-none rtl:rounded-br-2xl rtl:rounded-bl-none' : 'bg-white border border-gray-100 text-gray-800 rounded-bl-none rtl:rounded-bl-2xl rtl:rounded-br-none'}`}>
                                        {msg.text}
                                    </div>
                                </div>
                            ))}
                            {isTyping && (
                                <div className="flex justify-start">
                                    <div className="bg-white border border-gray-100 p-4 rounded-2xl rounded-bl-none shadow-sm flex gap-1.5 rtl:rounded-bl-2xl rtl:rounded-br-none">
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce"></span>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-75"></span>
                                        <span className="w-2 h-2 bg-gray-300 rounded-full animate-bounce delay-150"></span>
                                    </div>
                                </div>
                            )}
                            <div ref={messagesEndRef} />
                        </div>

                        {/* Input */}
                        <div className="p-4 bg-white border-t border-gray-100">
                            <form 
                                onSubmit={(e) => { e.preventDefault(); handleSend(); }}
                                className="flex gap-3"
                            >
                                <input 
                                    type="text" 
                                    value={inputValue}
                                    onChange={(e) => setInputValue(e.target.value)}
                                    placeholder={t("placeholder")}
                                    className="flex-1 bg-gray-50 border-transparent focus:bg-white focus:border-blue-200 focus:ring-4 focus:ring-blue-50 rounded-full px-6 py-3 text-sm transition-all outline-none"
                                />
                                <button 
                                    type="submit"
                                    disabled={!inputValue.trim()}
                                    className="w-12 h-12 bg-[#2A4D9A] rounded-full flex items-center justify-center text-white hover:bg-[#1e3a75] transition-all shadow-lg shadow-[#2A4D9A]/20 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 active:scale-95"
                                >
                                    <Send className="w-5 h-5 rtl:rotate-180" />
                                </button>
                            </form>
                            <div className="text-center mt-3">
                                <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wider">{t("poweredBy")}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Launcher */}
            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="w-16 h-16 bg-[#2A4D9A] rounded-full shadow-2xl shadow-[#2A4D9A]/40 flex items-center justify-center text-white hover:bg-[#1e3a75] transition-colors z-50 ring-4 ring-white"
            >
                {isOpen ? <ChevronDown className="w-8 h-8" /> : <MessageCircle className="w-8 h-8" />}
            </motion.button>
        </div>
    );
};

export default ChatWidget;
