import React from "react";
import { Message } from "./chat-message";

interface ChatContainerProps {
  messages: {
    role: "user" | "assistant";
    content: string;
    timestamp: string;
    run_id: string;
  }[];
}

export const ChatContainer = ({ messages }: ChatContainerProps) => {
  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] max-w-6xl mx-auto">
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-6 hide-scrollbar">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message, index) => (
            <Message
              key={index}
              role={message.role}
              content={message.content}
              timestamp={message.timestamp}
              run_id={message.run_id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};
