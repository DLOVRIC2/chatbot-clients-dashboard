import { ChatContainer } from "@/app/dashboard/[thread_id]/_components/chat-container";
import { notFound } from "next/navigation";
import { FeedbackSheet } from "./_components/feedback-sheet";
import { headers } from "next/headers";

export const dynamic = "force-dynamic";

async function getFullConversation(thread_id: string) {
  // Make API request
  const headersList = await headers();
  const cookie = headersList.get("cookie");
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/api/threads/${thread_id}`,
    {
      headers: {
        "Content-Type": "application/json",
        Cookie: cookie ?? "",
      },
    }
  );
  const data = await res.json();
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  return data;
}
export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ thread_id: string }>;
  searchParams: Promise<{ feedbackSheetOpen?: string; f_run_id?: string }>;
}) {
  const { thread_id } = await params;
  const { feedbackSheetOpen, f_run_id } = await searchParams;
  const data = await getFullConversation(thread_id);

  if (!data.messages) {
    return notFound();
  }
  return (
    <>
      <ChatContainer messages={data.messages} />
      {feedbackSheetOpen === "true" && f_run_id && (
        <FeedbackSheet run_id={f_run_id} isOpen={true} />
      )}
    </>
  );
}
