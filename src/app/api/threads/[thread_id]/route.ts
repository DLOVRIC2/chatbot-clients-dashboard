import { auth } from "@/lib/auth";
import { decryptText } from "@/lib/encryption";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

interface Message {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
  run_id: string;
}

interface ChatHistory {
  thread_id: string;
  messages: Message[];
}

interface RunInput {
  input: {
    query?: string;
  };
}

interface RunOutput {
  response?: string;
}

interface Run {
  id: string;
  inputs: RunInput;
  outputs: RunOutput;
  start_time: string;
}

interface ApiResponse {
  runs: Run[];
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ thread_id: string }> }
) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = session.user;

    if (!user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { thread_id } = await params;

    const decryptedApiKey = decryptText(user.langsmithApiKey);
    const response = await fetch("https://api.smith.langchain.com/runs/query", {
      method: "POST",
      headers: {
        "x-api-key": decryptedApiKey || "",
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        session: [user.projectSessionId || ""],
        is_root: true,
        filter: `eq(thread_id, "${thread_id}")`,
        order: "asc",
        select: ["start_time", "outputs", "inputs"],
        skip_prev_cursor: true,
        limit: 100, // Set a high limit to get all messages
      }),
    });

    const data = (await response.json()) as ApiResponse;

    if (!data.runs || !data.runs.length) {
      return NextResponse.json({ error: "Thread not found" }, { status: 404 });
    }

    // Transform the runs data into a chat history
    const messages: Message[] = data.runs.flatMap((run: Run) => {
      const messages: Message[] = [];

      // Add user message
      if (run.inputs?.input?.query) {
        messages.push({
          role: "user",
          content: run.inputs.input.query,
          timestamp: run.start_time,
          run_id: run.id,
        });
      }

      // Add assistant message if there's a response
      if (run.outputs?.response) {
        messages.push({
          role: "assistant",
          content: run.outputs.response,
          timestamp: run.start_time,
          run_id: run.id,
        });
      }

      return messages;
    });

    const chatHistory: ChatHistory = {
      thread_id,
      messages,
    };

    return NextResponse.json(chatHistory);
  } catch (error: unknown) {
    console.error("Error fetching conversation history:", error);
    return NextResponse.json(
      { error: "Failed to fetch conversation history" },
      { status: 500 }
    );
  }
}
