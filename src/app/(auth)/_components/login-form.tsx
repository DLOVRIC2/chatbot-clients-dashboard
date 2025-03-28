"use client";

import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import { LoginFormData, loginSchema } from "../_zodSchemas/login";
import { signIn } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
export default function LoginForm() {
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = handleSubmit((data) => {
    startTransition(async () => {
      await signIn.email(
        {
          email: data.email,
          password: data.password,
        },
        {
          onSuccess: () => {
            toast.success("Login successful", {
              description: "Redirecting to dashboard...",
            });
            router.push("/dashboard");
          },
          onError: (ctx) => {
            console.log(ctx);
            toast.error("Login failed", {
              description: ctx.error.message,
            });
          },
        }
      );
    });
  });

  return (
    <div className="w-full max-w-md mx-auto">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Email
          </Label>
          <Input
            {...register("email")}
            type="email"
            id="email"
            placeholder="Enter your email"
            disabled={isPending}
            autoComplete="email"
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email.message}</p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="password" className="text-sm font-medium">
            Password
          </Label>
          <Input
            {...register("password")}
            type="password"
            id="password"
            placeholder="Enter your password"
            disabled={isPending}
            autoComplete="current-password"
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password.message}</p>
          )}
        </div>

        <Button
          type="submit"
          className="w-full cursor-pointer"
          disabled={isPending || isSubmitting}
        >
          {isPending ? (
            <>
              <Loader2 className="animate-spin mr-2 h-4 w-4" />
              <span>Signing in...</span>
            </>
          ) : (
            "Sign in"
          )}
        </Button>
      </form>
    </div>
  );
}
