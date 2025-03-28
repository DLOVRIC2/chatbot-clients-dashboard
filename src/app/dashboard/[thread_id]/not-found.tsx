"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();

  return (
    <main className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl mx-auto w-full items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <p className="mb-4 text-sm font-medium tracking-wider">ERROR 404</p>
        <h1 className="mb-8 text-[120px] font-black leading-none tracking-tighter text-gray-900 dark:text-white">
          OOOPS!!
        </h1>

        <p className="mb-8 text-base text-gray-600/80 dark:text-gray-300/80">
          We couldn&apos;t find this chat history. It may have been deleted or
          never existed. Please try another conversation.
        </p>

        <Button onClick={() => router.push("/dashboard")}>Back to Home</Button>
      </div>
    </main>
  );
}
