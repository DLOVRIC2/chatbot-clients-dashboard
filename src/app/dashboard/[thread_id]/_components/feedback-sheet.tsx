"use client";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useRouter, useSearchParams } from "next/navigation";
import FeedbackList from "./feedback-list";
import { MessageFeedbackForm } from "./message-feedback-form";
import { useState } from "react";

export function FeedbackSheet({
  run_id,
  isOpen = false,
}: {
  run_id: string;
  isOpen?: boolean;
}) {
  const router = useRouter();
  const [open, setOpen] = useState<boolean>(isOpen);
  const searchParams = useSearchParams();

  const closeSheet = () => {
    setOpen(false);
    const params = new URLSearchParams(searchParams.toString());
    params.delete("feedbackSheetOpen");
    params.delete("f_run_id");
    router.push(`?${params.toString()}`, { scroll: false });
  };

  return (
    <Sheet open={open} onOpenChange={closeSheet}>
      <SheetContent className="p-7 overflow-y-scroll !max-w-md">
        <SheetHeader>
          <SheetTitle>Provide Feedback </SheetTitle>
        </SheetHeader>
        <MessageFeedbackForm run_id={run_id} />
        <div className="mt-4">
          <Badge variant="secondary" className="text-sm my-4">
            Recent Feedbacks
          </Badge>
          <FeedbackList run_id={run_id} />
        </div>
      </SheetContent>
    </Sheet>
  );
}
