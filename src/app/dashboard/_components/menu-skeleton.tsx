import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function MenuSkeleton() {
  return (
    <div className="my-1">
      {Array.from({ length: 5 }).map((_, index) => (
        <Skeleton key={index} className="my-2 h-7 border" />
      ))}
    </div>
  );
}
