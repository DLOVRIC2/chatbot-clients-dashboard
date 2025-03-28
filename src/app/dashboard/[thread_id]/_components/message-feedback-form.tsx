"use client";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

import { FeedbackForm, feedbackSchema } from "../_zodSchema/feedback";
import { submitFeedbackAction } from "../_actions/feedback";

export function MessageFeedbackForm({ run_id }: { run_id: string }) {
  const [isPending, startTransition] = useTransition();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FeedbackForm>({
    resolver: zodResolver(feedbackSchema),
    defaultValues: {
      score: 5,
      comment: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      try {
        await submitFeedbackAction(run_id, data);
        toast.success("Feedback submitted refresh to see changes", {
          description: "Thank you for your feedback!",
        });
        reset();
      } catch (error) {
        console.error(error);
        toast.error("Error", {
          description: "Failed to submit feedback. Please try again.",
        });
      }
    });
  });

  return (
    <form onSubmit={onSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="score" className="text-sm font-medium">
          Score (1-10)
        </Label>
        <Input
          id="score"
          type="number"
          min="1"
          max="10"
          {...register("score", { valueAsNumber: true })}
          className={errors.score ? "border-red-500" : ""}
        />
        {errors.score && (
          <p className="text-sm text-red-500">{errors.score.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="comment" className="text-sm font-medium">
          Comment
        </Label>
        <Textarea
          id="comment"
          {...register("comment")}
          className={errors.comment ? "border-red-500" : ""}
          placeholder="What did you think about this response?"
        />
        {errors.comment && (
          <p className="text-sm text-red-500">{errors.comment.message}</p>
        )}
      </div>

      <Button className="w-full" type="submit" disabled={isPending}>
        {isPending ? "Submitting..." : "Submit Feedback"}
      </Button>
    </form>
  );
}
