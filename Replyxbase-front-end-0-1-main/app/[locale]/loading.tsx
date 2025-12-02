import React from "react";

export default function Loading() {
  return (
    <div className="fixed inset-0 bg-white z-[100] flex flex-col items-center justify-center">
      <div className="relative w-24 h-24 mb-8">
        {/* Logo Placeholder */}
        <div className="absolute inset-0 bg-[#2A4D9A]/10 rounded-2xl animate-pulse"></div>
        <div className="absolute inset-4 bg-[#2A4D9A] rounded-xl flex items-center justify-center shadow-lg shadow-[#2A4D9A]/30">
           <div className="w-8 h-8 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
      <div className="h-2 w-48 bg-gray-100 rounded-full overflow-hidden">
        <div className="h-full bg-[#2A4D9A] animate-progress w-full origin-left"></div>
      </div>
    </div>
  );
}
