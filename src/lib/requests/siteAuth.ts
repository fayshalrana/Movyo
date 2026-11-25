/** Site-wide password gate: cookie value is a deterministic hash (no plaintext password in the cookie). */

export const SITE_AUTH_COOKIE_NAME = 'movyo_site_auth';
/** Response cookie: set when the gate should show (RSC can read it on the next navigation). */
export const SITE_AUTH_GATE_COOKIE_NAME = 'movyo_auth_gate';
export const SITE_AUTH_REQUIRED_HEADER = 'x-movyo-auth-required';
/** Set by middleware for `/` so the password UI never shows on the public home page. */
export const SITE_PUBLIC_ROUTE_HEADER = 'x-movyo-public-route';

/** When unset, the gate is disabled (open site). */
export function isSiteAuthConfigured(): boolean {
  return Boolean(process.env.SITE_ACCESS_PASSWORD?.trim());
}

export async function getExpectedAuthCookieValue(): Promise<string | null> {
  const pass = process.env.SITE_ACCESS_PASSWORD?.trim();
  if (!pass) return null;
  const salt = process.env.SITE_AUTH_COOKIE_SECRET ?? 'movyo-site-auth';
  return sha256Hex(`${salt}:${pass}`);
}

export async function verifySiteAuthCookie(
  value: string | undefined,
): Promise<boolean> {
  const expected = await getExpectedAuthCookieValue();
  if (!expected) return true;
  return Boolean(value && value === expected);
}

async function sha256Hex(message: string): Promise<string> {
  const enc = new TextEncoder();
  const data = enc.encode(message);
  const hashBuffer = await crypto.subtle.digest('SHA-256', data);
  return Array.from(new Uint8Array(hashBuffer))
    .map((b) => b.toString(16).padStart(2, '0'))
    .join('');
}
