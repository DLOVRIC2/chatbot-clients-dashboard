"use client";

import React from "react";
import { format } from "date-fns";
import { User, Bot, Pen } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { useRouter, useSearchParams } from "next/navigation";

interface MessageProps {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  run_id: string;
}

export const Message = ({ role, content, timestamp, run_id }: MessageProps) => {
  const isUser = role === "user";
  const router = useRouter();
  const searchParams = useSearchParams();

  const openFeedbackSheet = () => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("feedbackSheetOpen", "true");
    params.set("f_run_id", run_id);
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div
      className={`relative flex ${
        isUser ? "justify-end" : "justify-start"
      } items-start gap-3`}
    >
      {!isUser && (
        <>
          <div className="flex-shrink-0 w-10 h-10 rounded-full bg-purple-500/10 dark:bg-purple-500/20 flex items-center justify-center">
            <Bot className="w-5 h-5 text-purple-600 dark:text-purple-400" />
          </div>
        </>
      )}
      <div
        className={`relative max-w-[80%] group ${
          isUser ? "dark:bg-[#303030]" : "bg-transparent"
        } rounded-2xl p-4 backdrop-blur-sm border border-white/10 dark:border-white/5 shadow-sm dark:shadow-lg `}
      >
        {!isUser && (
          <div className="w-full h-full bg-white/80 dark:bg-[#212121]/80 backdrop-blur-md rounded-2xl absolute top-0 left-0 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-center items-start pt-5">
            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={openFeedbackSheet}
            >
              <Pen className="w-4 h-4" color="#155dfc" />
              <span>Give Feedback</span>
            </Button>
          </div>
        )}
        <div className="text-gray-800 dark:text-gray-100 whitespace-pre-wrap">
          <ReactMarkdown>{content}</ReactMarkdown>
        </div>

        <div className="text-xs text-gray-500 dark:text-gray-400 mt-2">
          {format(new Date(timestamp), "HH:mm • MMM d, yyyy")}
        </div>
      </div>
      {isUser && (
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-blue-500/10 dark:bg-blue-500/20 flex items-center justify-center">
          <User className="w-5 h-5 text-blue-600 dark:text-blue-400" />
        </div>
      )}
    </div>
  );
};
