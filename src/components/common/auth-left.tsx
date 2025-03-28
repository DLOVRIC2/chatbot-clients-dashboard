import Image from "next/image";
import React from "react";

export default function AuthLeft() {
  return (
    <div className="bg-black relative hidden h-full flex-col  p-10 text-white lg:flex dark:border-r">
      <div className="relative z-20 flex flex-col items-center justify-center h-full space-y-6">
        <div className="relative glow-effect">
          <Image
            src="/RotationLoad.gif"
            unoptimized
            alt="Loading animation"
            width={300}
            height={300}
            priority
            className="brightness-110 saturate-150"
          />
          {/* <h1 className="text-4xl font-bold tracking-wider animate-pulse text-center">
            Algorise
          </h1> */}
          <div className="absolute inset-0 rounded-lg glow"></div>
        </div>
      </div>
    </div>
  );
}
