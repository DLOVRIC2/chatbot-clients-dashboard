import { betterAuth, BetterAuthOptions } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { prisma } from "./db";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  session: {
    expiresIn: 60 * 60 * 24 * 7, // 7 days
    updateAge: 60 * 60 * 24, // 1 day (every 1 day the session expiration is updated)
    cookieCache: {
      enabled: true,
      maxAge: 5 * 60, // Cache duration in seconds
    },
  },
  user: {
    additionalFields: {
      companyName: {
        type: "string",
        required: true,
        defaultValue: "My Company",
      },
      logoUrl: {
        type: "string",
        required: true,
        defaultValue: "/default-logo.png",
      },
      langsmithProjectName: {
        type: "string",
        required: true,
        defaultValue: "default-project",
      },
      langsmithApiKey: {
        type: "string",
        required: true,
        defaultValue: "default-key",
      },
      projectSessionId: {
        type: "string",
        required: true,
        defaultValue: "default-session",
      },
    },
    deleteUser: {
      enabled: true,
    },
  },
  emailAndPassword: {
    enabled: true,
  },
} satisfies BetterAuthOptions);
