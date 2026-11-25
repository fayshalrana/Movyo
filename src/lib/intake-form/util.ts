// lib/validateApiKey.ts

const MIN_KEY_LENGTH = 16; // adjust to your provider's spec

type KeyValidationResult = { valid: true } | { valid: false; reason: string };

export const COOKIE_NAME = "intake_session_id";
export const COOKIE_OPTIONS = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  maxAge: 60 * 60 * 24, // 24 hours
  path: "/",
};

export function validateApiKey(
  key: string | undefined = process.env.API_KEY,
): KeyValidationResult {
  if (!key) {
    return { valid: false, reason: "API_KEY is not set" };
  }

  if (typeof key !== "string") {
    return { valid: false, reason: "API_KEY must be a string" };
  }

  const trimmed = key.trim();

  if (trimmed.length === 0) {
    return { valid: false, reason: "API_KEY is empty or whitespace only" };
  }

  if (trimmed !== key) {
    return {
      valid: false,
      reason: "API_KEY contains leading or trailing whitespace",
    };
  }

  if (trimmed.length < MIN_KEY_LENGTH) {
    return {
      valid: false,
      reason: `API_KEY is too short (minimum ${MIN_KEY_LENGTH} chars)`,
    };
  }

  // Reject obvious placeholders left in .env files
  const placeholders = [
    "your-api-key",
    "xxx",
    "test",
    "placeholder",
    "changeme",
    "secret",
  ];
  if (placeholders.some((p) => trimmed.toLowerCase().includes(p))) {
    return {
      valid: false,
      reason: "API_KEY appears to be a placeholder value",
    };
  }

  return { valid: true };
}

/** Throws at startup if the key is misconfigured — call once in app init or middleware */
export function assertApiKey(): void {
  const result = validateApiKey();
  if (!result.valid) {
    throw new Error(`[Config] Invalid API key: ${result.reason}`);
  }
}
