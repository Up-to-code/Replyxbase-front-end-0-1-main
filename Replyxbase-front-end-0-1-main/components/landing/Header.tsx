"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { authClient } from "@/lib/auth-client";

const Header = () => {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const tCommon = useTranslations("Common");
  const tFooter = useTranslations("Landing.Footer");
  const { data: session } = authClient.useSession();

  return (
    <header className="fixed top-0 w-full bg-white/80 backdrop-blur-xl z-50 border-b border-gray-100">
        <div className="container mx-auto px-6">
          <div className="flex items-center justify-between h-24">
            <Link href="/" className="flex items-center gap-3">
              <Image 
                src="/logo.png" 
                alt="Replyxbase Logo" 
                width={40} 
                height={40}
                className="object-contain"
              />
              <span className="font-bold text-2xl text-gray-900 tracking-tight">
                Replyxbase
              </span>
            </Link>
            
            <nav className="hidden md:flex items-center gap-10">
              {["features", "pricing", "resources", "company"].map((item) => (
                <a key={item} href={`#${item}`} className="text-sm font-semibold text-gray-600 hover:text-[#2A4D9A] transition-colors">
                  {tFooter(`links.${item}`)}
                </a>
              ))}
            </nav>
            
            <div className="hidden md:flex items-center gap-4">
              {session ? (
                <Link href="/dashboard">
                  <Button variant="primary" size="sm" className="rounded-full px-8 h-12 bg-[#2A4D9A] hover:bg-[#1e3a75] border-none text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                    {tCommon("dashboard")}
                  </Button>
                </Link>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant="ghost" size="sm" className="text-gray-600 hover:text-gray-900 font-semibold h-12 px-6">
                      {tCommon("logIn")}
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary" size="sm" className="rounded-full px-8 h-12 bg-[#2A4D9A] hover:bg-[#1e3a75] border-none text-white font-semibold shadow-lg hover:shadow-xl transition-all">
                      {tCommon("signUp")}
                    </Button>
                  </Link>
                </>
              )}
            </div>
            
            <button className="md:hidden p-2" onClick={() => setMobileNavOpen(true)} aria-label="Open Menu">
              <Menu className="w-6 h-6 text-gray-900" />
            </button>
          </div>
        </div>
        
        {/* Mobile Nav Overlay (Simplified for now) */}
        {mobileNavOpen && (
            <div className="fixed inset-0 bg-white z-50 p-6 flex flex-col">
                <div className="flex justify-end">
                    <button onClick={() => setMobileNavOpen(false)} className="p-2">
                        <Menu className="w-6 h-6 text-gray-900" />
                    </button>
                </div>
                <nav className="flex flex-col gap-6 mt-10 items-center">
                    {["features", "pricing", "resources", "company"].map((item) => (
                        <a key={item} href={`#${item}`} onClick={() => setMobileNavOpen(false)} className="text-xl font-semibold text-gray-900">
                            {tFooter(`links.${item}`)}
                        </a>
                    ))}
                    <div className="flex flex-col gap-4 w-full mt-8">
                        <Link href="/login" className="w-full">
                            <Button variant="outline" className="w-full h-12 rounded-full border-gray-200">{tCommon("logIn")}</Button>
                        </Link>
                        <Link href="/signup" className="w-full">
                            <Button variant="primary" className="w-full h-12 rounded-full bg-[#2A4D9A] text-white">{tCommon("signUp")}</Button>
                        </Link>
                    </div>
                </nav>
            </div>
        )}
    </header>
  );
};

export default Header;
