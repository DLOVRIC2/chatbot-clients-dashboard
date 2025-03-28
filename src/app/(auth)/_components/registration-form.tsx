"use client";

import { useActionState, useEffect, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import {
  type RegisterFormData,
  registerSchema,
} from "../_zodSchemas/registration";
import { registerUserAction } from "../_actions/registration";

export default function RegistrationForm() {
  const [state, formAction] = useActionState(registerUserAction, {
    success: false,
    message: "",
  });
  const [_isPending, startTransition] = useTransition();

  const {
    formState: { errors },
    register,
    handleSubmit,
    reset,
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      username: "",
      companyName: "",
      email: "",
      password: "",
      confirmPassword: "",
      logoUrl: "",
      langsmithProjectName: "",
      langsmithApiKey: "",
      projectSessionId: "",
      ...(state?.inputs ?? {}),
    },
  });

  const onSubmit = handleSubmit((data) => {
    const formData = new FormData();
    formData.append("formData", JSON.stringify(data));

    startTransition(() => {
      formAction(formData);
    });
  });

  useEffect(() => {
    if (state?.message) {
      if (state.success) {
        toast.success(state.message || "Account created successfully");
        reset();
      } else {
        toast.error(state.message || "Failed to create account");
      }
    }
  }, [state, reset]);

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="username">Username</Label>
          <Input
            {...register("username")}
            id="username"
            placeholder="Choose a username"
            disabled={_isPending}
          />
          {errors.username && (
            <p className="text-sm text-destructive">
              {errors.username.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="companyName">Company Name</Label>
          <Input
            {...register("companyName")}
            id="companyName"
            placeholder="Enter your company name"
            disabled={_isPending}
          />
          {errors.companyName && (
            <p className="text-sm text-destructive">
              {errors.companyName.message}
            </p>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          {...register("email")}
          type="email"
          id="email"
          placeholder="Enter your company email"
          disabled={_isPending}
          autoComplete="email"
        />
        {errors.email && (
          <p className="text-sm text-destructive">{errors.email.message}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            disabled={_isPending}
            autoComplete="new-password"
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
          <p className="text-xs text-muted-foreground">
            Password must be at least 8 characters and include uppercase,
            lowercase, number, and special character.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            {...register("confirmPassword")}
            type="password"
            id="confirmPassword"
            placeholder="Confirm your password"
            disabled={_isPending}
            autoComplete="new-password"
          />
          {errors.confirmPassword && (
            <p className="text-sm text-destructive">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="logoUrl">Company Logo URL</Label>

          <Input
            {...register("logoUrl")}
            type="url"
            id="logoUrl"
            placeholder="Enter logo URL"
            disabled={_isPending}
          />
          {errors.logoUrl && (
            <p className="text-sm text-destructive">{errors.logoUrl.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="projectSessionId">Project Session ID</Label>

          <Input
            {...register("projectSessionId")}
            type="text"
            id="projectSessionId"
            placeholder="Enter project session ID"
            disabled={_isPending}
          />

          {errors.projectSessionId && (
            <p className="text-sm text-destructive">
              {errors.projectSessionId.message}
            </p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="langsmithProjectName">Langsmith Project Name</Label>
          <Input
            {...register("langsmithProjectName")}
            type="text"
            id="langsmithProjectName"
            placeholder="Enter your Langsmith project name"
            disabled={_isPending}
          />
          {errors.langsmithProjectName && (
            <p className="text-sm text-destructive">
              {errors.langsmithProjectName.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="langsmithApiKey">Langsmith API Key</Label>
          <Input
            {...register("langsmithApiKey")}
            type="password"
            id="langsmithApiKey"
            placeholder="Enter your Langsmith API key"
            disabled={_isPending}
          />
          {errors.langsmithApiKey && (
            <p className="text-sm text-destructive">
              {errors.langsmithApiKey.message}
            </p>
          )}
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={_isPending}>
        {_isPending ? (
          <>
            <Loader2 className="animate-spin mr-2 h-4 w-4" />
            <span>Creating account...</span>
          </>
        ) : (
          "Create account"
        )}
      </Button>
    </form>
  );
}
