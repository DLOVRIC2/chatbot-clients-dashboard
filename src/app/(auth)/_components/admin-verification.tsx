"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Loader2, ShieldAlert } from "lucide-react";
import { verifyAdminAction } from "../_actions/admin-verification";
import {
  AdminVerificationData,
  adminVerificationSchema,
} from "../_zodSchemas/admin-verification";

interface AdminVerificationProps {
  onVerified: () => void;
}

export default function AdminVerification({
  onVerified,
}: AdminVerificationProps) {
  const [isPending, startTransition] = useTransition();

  const [state, formAction] = useActionState(verifyAdminAction, {
    success: false,
    message: "",
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AdminVerificationData>({
    resolver: zodResolver(adminVerificationSchema),
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("adminPassword", data.adminPassword);

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message);
        reset();
        onVerified();
      } else {
        toast.error(state.message);
      }
    }
  }, [state, reset, onVerified]);

  return (
    <div className="flex flex-col items-center justify-center space-y-6 p-8">
      <div className="flex flex-col items-center space-y-2 text-center">
        <div className="p-3 rounded-full bg-yellow-100 dark:bg-yellow-900">
          <ShieldAlert className="h-6 w-6 text-yellow-600 dark:text-yellow-400" />
        </div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Admin Access Required
        </h1>
        <p className="text-sm text-muted-foreground max-w-sm">
          This page is restricted to administrators only. Please enter the admin
          password to continue.
        </p>
      </div>

      <form onSubmit={onSubmit} className="w-full max-w-sm space-y-4">
        <div className="space-y-2">
          <Label htmlFor="adminPassword" className="mb-3">Admin Password</Label>
          <Input
            {...register("adminPassword")}
            type="password"
            id="adminPassword"
            placeholder="Enter admin password"
            disabled={isPending}
            autoComplete="off"
          />
          {errors.adminPassword && (
            <p className="text-sm text-destructive">
              {errors.adminPassword.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full" disabled={isPending}>
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              <span>Verifying...</span>
            </>
          ) : (
            "Verify Access"
          )}
        </Button>
      </form>
    </div>
  );
}
