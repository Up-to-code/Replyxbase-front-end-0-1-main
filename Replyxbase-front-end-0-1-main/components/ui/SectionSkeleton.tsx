import React from "react";

interface SectionSkeletonProps {
  className?: string;
  height?: string;
}

const SectionSkeleton = ({ className = "", height = "h-96" }: SectionSkeletonProps) => {
  return (
    <div className={`w-full ${height} bg-gray-50/50 animate-pulse flex items-center justify-center ${className}`}>
      <div className="flex flex-col items-center gap-4 w-full max-w-3xl px-6">
        <div className="h-8 bg-gray-200 rounded-full w-1/3 mb-4"></div>
        <div className="h-4 bg-gray-100 rounded-full w-2/3"></div>
        <div className="h-4 bg-gray-100 rounded-full w-1/2"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-12">
            <div className="h-64 bg-gray-100 rounded-2xl"></div>
            <div className="h-64 bg-gray-100 rounded-2xl"></div>
            <div className="h-64 bg-gray-100 rounded-2xl"></div>
        </div>
      </div>
    </div>
  );
};

export default SectionSkeleton;
