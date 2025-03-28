"use server";

import { auth } from "@/lib/auth";
import { APIError } from "better-auth/api";
import { encryptText } from "@/lib/encryption";

import {
  type RegisterFormData,
  registerSchema,
} from "../_zodSchemas/registration";

export type RegisterUserState = {
  success: boolean;
  message: string;
  errors?: {
    [K in keyof RegisterFormData]?: string[];
  };
  inputs?: RegisterFormData;
  pending?: boolean;
};

export async function registerUserAction(
  _: RegisterUserState,
  formData: FormData
): Promise<RegisterUserState> {
  // Extract and parse form data
  const serializedFormData = formData.get("formData");
  if (!serializedFormData || typeof serializedFormData !== "string") {
    return {
      success: false,
      message: "Invalid form submission",
    };
  }

  // Parse and validate the data
  const data = JSON.parse(serializedFormData);
  const parsed = registerSchema.safeParse(data);

  if (!parsed.success) {
    return {
      success: false,
      message: "Invalid form data",
      errors: parsed.error.flatten().fieldErrors,
      inputs: data as RegisterFormData,
    };
  }

  try {
    // Encrypt the API key before saving
    const encryptedApiKey = encryptText(parsed.data.langsmithApiKey);

    // Register the user with encrypted API key
    await auth.api.signUpEmail({
      body: {
        email: parsed.data.email,
        password: parsed.data.password,
        name: parsed.data.username,
        companyName: parsed.data.companyName,
        logoUrl: parsed.data.logoUrl,
        langsmithProjectName: parsed.data.langsmithProjectName,
        langsmithApiKey: encryptedApiKey,
        projectSessionId: parsed.data.projectSessionId,
      },
    });

    return {
      success: true,
      message: "Account created successfully",
    };
  } catch (error) {
    if (error instanceof APIError) {
      console.error("API Error:", error.message, error.status);
      return {
        success: false,
        message: `Failed to create account: ${error.message}`,
        inputs: data as RegisterFormData,
      };
    }

    console.error("Unexpected error:", error);
    return {
      success: false,
      message: "An unexpected error occurred",
      inputs: data as RegisterFormData,
    };
  }
}
