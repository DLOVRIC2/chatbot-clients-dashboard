import { auth } from "@/lib/auth";
import { decryptText } from "@/lib/encryption";
import { headers } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

interface RawFeedbackData {
  score: number;
  comment?: string;
}

export async function GET(req: NextRequest) {
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

    const searchParams = req.nextUrl.searchParams;
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "10");
    const run = searchParams.get("run");

    if (isNaN(offset) || isNaN(limit) || limit < 1) {
      return NextResponse.json(
        { error: "Invalid pagination parameters" },
        { status: 400 }
      );
    }

    if (!run) {
      return NextResponse.json(
        { error: "Run ID is required" },
        { status: 400 }
      );
    }

    const queryParams = new URLSearchParams({
      offset: offset.toString(),
      limit: limit.toString(),
      include_user_names: "true",
      run,
    });

    const decryptedApiKey = decryptText(user.langsmithApiKey);

    const response = await fetch(
      `https://api.smith.langchain.com/feedback?${queryParams.toString()}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "x-api-key": decryptedApiKey || "",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`Failed to fetch feedback: ${response.statusText}`);
    }

    const rawData: RawFeedbackData[] = await response.json();

    // Transform the data to only include score, username, and comment
    const simplifiedData = {
      data: rawData.map((item) => ({
        score: item.score,
        user_name: user.name || "Anonymous",
        comment: item.comment || "",
      })),
    };

    return NextResponse.json(simplifiedData, { status: 200 });
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
