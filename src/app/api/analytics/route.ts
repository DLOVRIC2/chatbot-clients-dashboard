import { auth } from "@/lib/auth";
import { decryptText } from "@/lib/encryption";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
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

    const decryptedApiKey = decryptText(user.langsmithApiKey);

    const countResponse = await fetch(
      "https://api.smith.langchain.com/api/v1/runs/stats",
      {
        method: "POST",
        headers: {
          "x-api-key": decryptedApiKey,
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          session: [user.projectSessionId || ""],
        }),
      }
    );
    const data = await countResponse.json();
    // Format the success rate to be a percentage between 0-100
    const successRate = ((1 - (data.error_rate || 0)) * 100).toFixed(1);

    return NextResponse.json({
      totalRuns: data.run_count,
      totalTokens: data.total_tokens,
      successRate: successRate,
    });
  } catch (error: unknown) {
    console.error("Error fetching analytics:", error);
    return NextResponse.json(
      { error: "Failed to fetch analytics" },
      { status: 500 }
    );
  }
}
