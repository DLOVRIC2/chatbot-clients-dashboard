"use client";
import { UserSetting } from "@/components/common/user-setting";
import { ModeToggle } from "@/components/ui/theme-toggle";
import { useTheme } from "next-themes";
import React, { useEffect, useState } from "react";

export default function ToolMenu() {
  const { resolvedTheme } = useTheme();
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Prevent hydration mismatch by not rendering theme-dependent content until mounted
  const fillColor = isMounted
    ? resolvedTheme === "dark"
      ? "#171717"
      : "none"
    : "none";

  const strokeColor = isMounted
    ? resolvedTheme === "dark"
      ? "oklch(0.2 0 0)"
      : "oklch(1 0 0)"
    : "oklch(1 0 0)";
  const pathStrokeColor = isMounted
    ? resolvedTheme === "dark"
      ? "oklch(1 0 0 / 10%)"
      : "oklch(0.922 0 0)"
    : "oklch(0.922 0 0)";

  return (
    <div className="fixed right-0 top-0 h-16 w-28">
      <div className="fixed top-4 right-1 !z-50 flex justify-center gap-4 items-center">
        <ModeToggle />
        <UserSetting />
      </div>
      <div className="ease-snappy group pointer-events-none absolute top-3.5 z-2 -mb-8 h-32 w-full origin-top transition-all">
        <svg
          className="absolute -right-14 h-12 origin-top-left skew-x-[30deg] overflow-visible"
          version="1.1"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          viewBox="0 0 128 32"
          xmlSpace="preserve"
        >
          <line
            strokeWidth="2px"
            className="translate-y-[1.5px]"
            stroke={strokeColor}
            shapeRendering="optimizeQuality"
            vectorEffect="non-scaling-stroke"
            strokeLinecap="round"
            strokeMiterlimit="10"
            x1="1"
            y1="0"
            x2="128"
            y2="0"
          ></line>
          <path
            stroke={pathStrokeColor}
            className="translate-y-[1.5px]"
            fill={fillColor}
            shapeRendering="optimizeQuality"
            strokeWidth="1px"
            strokeLinecap="round"
            strokeMiterlimit="10"
            vectorEffect="non-scaling-stroke"
            d="M0,0c5.9,0,10.7,4.8,10.7,10.7v10.7c0,5.9,4.8,10.7,10.7,10.7H128V0"
          ></path>
        </svg>
      </div>
    </div>
  );
}
