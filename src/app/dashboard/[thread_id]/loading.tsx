"use client";

import {
  AIMessageSkeleton,
  UserMessageSkeleton,
} from "./_components/message-skeletons";

export default function Loading() {
  return (
    <div className="min-h-screen p-2">
      <div className="max-w-4xl mx-auto space-y-2">
        <UserMessageSkeleton />
        <AIMessageSkeleton />
        <UserMessageSkeleton />
        <AIMessageSkeleton />
      </div>
    </div>
  );
}
