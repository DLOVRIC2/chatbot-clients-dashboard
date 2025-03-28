import { createCipheriv, createDecipheriv, randomBytes } from "crypto";

// The encryption key should be 32 bytes (256 bits) for AES-256
const ENCRYPTION_KEY = process.env.BETTER_AUTH_SECRET || "";
if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
  throw new Error(
    "ENCRYPTION_KEY environment variable must be set and be exactly 32 characters"
  );
}

export function encryptText(text: string): string {
  // Generate a random IV for each encryption
  const iv = randomBytes(16);
  const cipher = createCipheriv("aes-256-cbc", Buffer.from(ENCRYPTION_KEY), iv);

  let encrypted = cipher.update(text, "utf8", "hex");
  encrypted += cipher.final("hex");

  // Return IV + encrypted data as a single string
  return iv.toString("hex") + ":" + encrypted;
}

export function decryptText(encryptedText: string): string {
  // Split the IV and encrypted data
  const [ivHex, encrypted] = encryptedText.split(":");
  if (!ivHex || !encrypted) {
    throw new Error("Invalid encrypted text format");
  }

  const iv = Buffer.from(ivHex, "hex");
  const decipher = createDecipheriv(
    "aes-256-cbc",
    Buffer.from(ENCRYPTION_KEY),
    iv
  );

  let decrypted = decipher.update(encrypted, "hex", "utf8");
  decrypted += decipher.final("utf8");

  return decrypted;
}
