import { auth } from "@/lib/auth";
import { decryptText } from "@/lib/encryption";
import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { type NextRequest } from "next/server";

interface ThreadData {
  group_key: string;
  count: number;
  total_tokens: number;
  first_inputs: string;
}

type TimeUnit = "hour" | "day" | "week" | "month";

interface TimeRange {
  value: number;
  unit: TimeUnit;
  includeToday?: boolean;
}

function parseTimeRange(timeString: string | null): TimeRange {
  if (!timeString) {
    return { value: 24, unit: "hour", includeToday: true }; // default to last 24 hours
  }

  if (timeString === "today") {
    return { value: 24, unit: "hour", includeToday: true };
  }

  const match = timeString.match(/^(\d+)(hour|day|week|month)s?$/i);
  if (!match) {
    return { value: 24, unit: "hour", includeToday: true }; // default if invalid format
  }

  const value = parseInt(match[1]);
  const unit = match[2].toLowerCase() as TimeUnit;
  const includeToday = unit === "hour"; // Only include today for hourly ranges

  return { value, unit, includeToday };
}

function getTimeRange(range: TimeRange): {
  start_time: string;
  end_time: string;
} {
  const now = new Date();
  const end = range.includeToday ? now : new Date(now.setHours(0, 0, 0, 0));
  const start = new Date(end);

  switch (range.unit) {
    case "hour":
      start.setHours(start.getHours() - range.value);
      break;
    case "day":
      start.setDate(start.getDate() - range.value);
      break;
    case "week":
      start.setDate(start.getDate() - range.value * 7);
      break;
    case "month":
      start.setMonth(start.getMonth() - range.value);
      break;
  }

  return {
    start_time: start.toISOString(),
    end_time: end.toISOString(),
  };
}

export async function GET(request: NextRequest) {
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

    const searchParams = request.nextUrl.searchParams;
    const timeRange = parseTimeRange(searchParams.get("timeRange"));
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const offset = (page - 1) * limit;

    const { start_time, end_time } = getTimeRange(timeRange);

    const decryptedApiKey = decryptText(user.langsmithApiKey);

    const response = await fetch("https://api.smith.langchain.com/runs/group", {
      method: "POST",
      headers: {
        "x-api-key": decryptedApiKey,
        accept: "application/json",
        "content-type": "application/json",
      },
      body: JSON.stringify({
        session_id: user.projectSessionId || "",
        group_by: "conversation",
        start_time,
        end_time,
        offset,
        limit,
      }),
    });
    const data = await response.json();

    // Transform the response data
    const transformedGroups = data.groups.map((group: ThreadData) => {
      // Extract query value using regex without JSON parsing
      const queryMatch = group?.first_inputs?.match(/"query"\s*:\s*"([^",}]+)/);
      const query = queryMatch ? queryMatch[1] : group.first_inputs;
      const words = query.trim().split(/\s+/);
      const limitedQuery = words.slice(0, 5).join(" ");

      return {
        thread_id: group.group_key,
        total: group.count,
        tokens: group.total_tokens,
        title: limitedQuery,
      };
    });

    return NextResponse.json({
      conversations: transformedGroups,
      pagination: {
        currentPage: page,
        totalItems: data.total || transformedGroups.length,
        itemsPerPage: limit,
        totalPages: Math.ceil((data.total || transformedGroups.length) / limit),
      },
      timeRange: {
        value: timeRange.value,
        unit: timeRange.unit,
        formatted: `Last ${timeRange.value} ${timeRange.unit}${
          timeRange.value > 1 ? "s" : ""
        }`,
      },
    });
  } catch (error: unknown) {
    console.error("Error fetching runs:", error);
    return NextResponse.json(
      { error: "Failed to fetch runs" },
      { status: 500 }
    );
  }
}
