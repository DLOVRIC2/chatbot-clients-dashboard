"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <main className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl mx-auto w-full items-center justify-center p-4">
      <div className="w-full max-w-2xl text-center">
        <p className="mb-4 text-sm font-medium tracking-wider text-red-600">
          ERROR
        </p>
        <h1 className="mb-8 text-[120px] font-black leading-none tracking-tighter text-gray-900 dark:text-white">
          OOOPS!!
        </h1>

        <p className="mb-8 text-base text-red-600">
          {error.message || "An unexpected error occurred"}
        </p>

        <div className="flex justify-center space-x-4">
          <Button onClick={() => reset()} variant="outline">
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            Try again
          </Button>
          <Button onClick={() => router.push("/dashboard")}>
            <svg
              className="mr-2 h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
            Back to Home
          </Button>
        </div>
      </div>
    </main>
  );
}
