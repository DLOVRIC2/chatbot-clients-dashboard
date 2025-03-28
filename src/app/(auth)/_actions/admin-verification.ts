"use server";

export type AdminVerificationState = {
  success: boolean;
  message: string;
};

export async function verifyAdminAction(
  _: AdminVerificationState,
  formData: FormData
): Promise<AdminVerificationState> {
  const adminPassword = formData.get("adminPassword");
  const correctPassword = process.env.ADMIN_PASSWORD;

  if (!adminPassword || typeof adminPassword !== "string") {
    return {
      success: false,
      message: "Admin password is required",
    };
  }

  // Add a small delay to prevent brute force attacks
  await new Promise((resolve) => setTimeout(resolve, 500));

  if (adminPassword === correctPassword) {
    return {
      success: true,
      message: "Admin verification successful",
    };
  }

  return {
    success: false,
    message: "Incorrect admin password",
  };
}
