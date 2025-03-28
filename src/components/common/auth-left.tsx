import React from "react";
import { AlgoriseSpinner } from "@/components/ui/algorise-spinner";

export default function AuthLeft() {
  return (
    <div className="bg-black relative hidden h-full flex-col p-10 text-white lg:flex dark:border-r">
      <div className="relative z-20 flex flex-col items-center justify-center h-full">
        <div className="relative glow-effect w-[600px] h-[600px]">
          <AlgoriseSpinner />
          <div className="absolute inset-0 rounded-lg glow"></div>
        </div>
      </div>
    </div>
  );
}
