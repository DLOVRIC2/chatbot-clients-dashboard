import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

export default function FeedbackSkeleton({ limit }: { limit: number }) {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        {[...Array(limit)].map((_, index) => (
          <div key={index}>
            <div className="flex items-start gap-4">
              <Skeleton className="w-10 h-10 rounded-full" />
              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 rounded w-full" />
                <Skeleton className="h-4 rounded w-full" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
