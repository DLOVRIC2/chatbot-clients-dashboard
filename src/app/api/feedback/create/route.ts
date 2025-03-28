import { auth } from "@/lib/auth";
import { decryptText } from "@/lib/encryption";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

// export const runtime = "edge";

interface FeedbackSource {
  type: string;
  metadata: Record<string, unknown>;
  user_name?: string;
}

interface FeedbackRequest {
  run_id: string;
  score: number;
  comment?: string;
  user_name?: string;
  key?: string;
  value?: number;
  correction?: Record<string, unknown>;
}

const APP_METADATA = {
  type: "algorise_chatbot_dashboard_app",
  metadata: {
    app_name: "Algorise Chatbot Dashboard App",
    app_version: "1.0.0",
    platform: "web",
  },
};

export async function POST(req: NextRequest) {
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

  try {
    const body = await req.json();
    const {
      run_id,
      score,
      comment,
      user_name = "dummy_dev",
    } = body as FeedbackRequest;

    if (!run_id || isNaN(score) || !comment) {
      return NextResponse.json(
        { error: "You must provide a run id, a score, and a comment." },
        { status: 400 }
      );
    }

    const feedbackData: FeedbackRequest & { feedback_source: FeedbackSource } =
      {
        run_id,
        score,
        comment,

        key: "user_feedback",
        feedback_source: {
          ...APP_METADATA,
          user_name: user_name,
        },
      };

    const decryptedApiKey = decryptText(user.langsmithApiKey);

    const response = await fetch(`https://api.smith.langchain.com/feedback`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": decryptedApiKey || "",
      },
      body: JSON.stringify(feedbackData),
    });

    if (!response.ok) {
      throw new Error(`Failed to create feedback: ${response.statusText}`);
    }

    const feedback = await response.json();
    return NextResponse.json({ feedback }, { status: 200 });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "An unknown error occurred" },
      { status: 500 }
    );
  }
}
