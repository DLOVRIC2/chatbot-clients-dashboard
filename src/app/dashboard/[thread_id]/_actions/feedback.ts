"use server";

import { headers } from "next/headers";
import { FeedbackForm } from "../_zodSchema/feedback";

export async function submitFeedbackAction(run_id: string, data: FeedbackForm) {
  // Make API request
  const headersList = await headers();
  const cookie = headersList.get("cookie");
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/feedback/create`,
    {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
        Cookie: cookie ?? "",
      },
      body: JSON.stringify({
        run_id,
        ...data,
      }),
    }
  );

  if (!response.ok) {
    throw new Error("Failed to submit feedback");
  }

  return response.json();
}
