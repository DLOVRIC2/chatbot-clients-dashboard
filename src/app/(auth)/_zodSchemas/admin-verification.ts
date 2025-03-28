import { z } from "zod";

export const adminVerificationSchema = z.object({
  adminPassword: z.string().min(1, "Admin password is required"),
});

export type AdminVerificationData = z.infer<typeof adminVerificationSchema>;
