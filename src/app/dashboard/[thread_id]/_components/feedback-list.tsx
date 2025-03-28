// feedback-list.tsx
"use client";

import { useEffect, useState } from "react";
import { Badge } from "@/components/ui/badge";

import { cn, getUserInitials } from "@/lib/utils";
import { useSearchParams } from "next/navigation";
import FeedbackSkeleton from "./feedback-skeleton";
import { ChevronDown, ChevronUp } from "lucide-react";

interface Feedback {
  score: number;
  user_name: string;
  comment: string;
}

const getFeedbacks = async (run_id: string, offset: number, limit: number) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback?run=${run_id}&offset=${offset}&limit=${limit}`
    );
    if (!response.ok) throw new Error("Failed to fetch feedbacks");
    const data = await response.json();
    return data.data as Feedback[];
  } catch (error) {
    console.error("Failed to fetch feedbacks:", error);
    return [];
  }
};

interface FeedbackListProps {
  run_id: string;
}

export default function FeedbackList({ run_id }: FeedbackListProps) {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [expandedComments, setExpandedComments] = useState<number[]>([]);

  // Use client-side navigation hooks instead of headers()
  const searchParams = useSearchParams();
  // const pathname = usePathname();

  // Get pagination parameters from URL search params
  const offset = Number.parseInt(searchParams.get("offset") || "0");
  const limit = Number.parseInt(searchParams.get("limit") || "5");

  // // Create URL builder function for pagination links
  // const createPaginationUrl = (newOffset: number) => {
  //   const newParams = new URLSearchParams(searchParams.toString());
  //   newParams.set("offset", newOffset.toString());
  //   newParams.set("limit", limit.toString());
  //   return `${pathname}?${newParams.toString()}`;
  // };

  useEffect(() => {
    const loadFeedbacks = async () => {
      setIsLoading(true);
      try {
        const data = await getFeedbacks(run_id, offset, limit);
        setFeedbacks(data);
      } catch (error) {
        console.error("Error loading feedbacks:", error);
        setFeedbacks([]);
      } finally {
        setIsLoading(false);
      }
    };

    loadFeedbacks();
  }, [run_id, offset, limit]);

  const toggleComment = (index: number) => {
    setExpandedComments((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  if (isLoading) {
    return <FeedbackSkeleton limit={limit} />;
  }

  return (
    <div className="space-y-6 max-w-3xl mx-auto px-4">
      <div className="space-y-4">
        {feedbacks.length === 0 && (
          <div className="my-12 flex flex-col items-center justify-center bg-gray-50 dark:bg-gray-800/50 rounded-xl p-8">
            <h1 className="mb-3 text-2xl font-black leading-none tracking-tight text-gray-900 dark:text-white">
              No Feedback Yet
            </h1>
            <p className="text-base text-center text-gray-600 dark:text-gray-300">
              Be the first one to provide feedback for this conversation.
            </p>
          </div>
        )}
        {feedbacks?.map((feedback, index) => (
          <div key={index} className="p-4 flex gap-4 border rounded-xl">
            <div className="flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-base font-medium text-primary">
                {getUserInitials(feedback.user_name)}
              </div>
              <Badge variant="secondary">{feedback.score.toFixed(1)}</Badge>
            </div>

            <div className="flex-1">
              <span className="text-base font-semibold text-gray-900 dark:text-gray-100 mb-2 block">
                {feedback.user_name}
              </span>
              <div
                className={cn(
                  "text-base text-gray-700 dark:text-gray-200 cursor-pointer relative pr-8",
                  !expandedComments.includes(index) && "line-clamp-2"
                )}
                onClick={() => toggleComment(index)}
              >
                {feedback.comment}
                <button
                  className="absolute right-0 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity"
                  aria-label={
                    expandedComments.includes(index) ? "Show less" : "Show more"
                  }
                >
                  {expandedComments.includes(index) ? (
                    <ChevronUp className="w-5 h-5 text-gray-500" />
                  ) : (
                    <ChevronDown className="w-5 h-5 text-gray-500" />
                  )}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
