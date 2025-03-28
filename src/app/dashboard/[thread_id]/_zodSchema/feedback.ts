import { z } from "zod";

export const feedbackSchema = z.object({
  score: z.number().min(1).max(10),
  comment: z.string().min(1, "Please provide feedback").max(1000),
});

export type FeedbackForm = z.infer<typeof feedbackSchema>;
