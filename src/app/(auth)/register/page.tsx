"use client";
import { useState } from "react";
import RegistrationForm from "../_components/registration-form";
import AdminVerification from "../_components/admin-verification";
import AuthLeft from "@/components/common/auth-left";

export default function RegisterPage() {
  const [isVerified, setIsVerified] = useState(false);

  return (
    <div className="container relative min-h-screen flex-col items-center justify-center grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <AuthLeft />
      <div>
        <div
          className={`mx-auto flex w-full flex-col justify-center space-y-6 ${
            isVerified ? "sm:w-[650px]" : "sm:w-[400px]"
          }`}
        >
          {isVerified ? (
            <>
              <div className="flex flex-col space-y-2 text-center">
                <h1 className="text-2xl font-semibold tracking-tight">
                  Create an Account
                </h1>
                <p className="text-sm text-muted-foreground">
                  Register a new organization account
                </p>
              </div>
              <RegistrationForm />
            </>
          ) : (
            <AdminVerification onVerified={() => setIsVerified(true)} />
          )}
        </div>
      </div>
    </div>
  );
}
