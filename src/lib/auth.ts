import { cookies } from "next/headers";
import crypto from "crypto";
import { SESSION_COOKIE_NAME } from "./session-constants";

// NOTE: this file uses Node's "crypto" module, so it must only ever be
// imported from code that runs on the Node.js runtime (API routes, server
// components, layouts) — never from middleware.ts, which runs on the Edge
// runtime. Middleware imports SESSION_COOKIE_NAME from
// "./session-constants" directly instead.

function getSecret() {
  return process.env.SESSION_SECRET || "dev-secret-change-me";
}

function sign(value: string) {
  const hmac = crypto.createHmac("sha256", getSecret());
  hmac.update(value);
  return hmac.digest("hex");
}

export function createSessionToken(username: string) {
  const payload = `${username}.${Date.now()}`;
  const signature = sign(payload);
  return `${Buffer.from(payload).toString("base64url")}.${signature}`;
}

export function verifySessionToken(token: string | undefined): boolean {
  if (!token) return false;
  const [encodedPayload, signature] = token.split(".");
  if (!encodedPayload || !signature) return false;
  let payload: string;
  try {
    payload = Buffer.from(encodedPayload, "base64url").toString("utf-8");
  } catch {
    return false;
  }
  const expected = sign(payload);
  return expected === signature;
}

export function isAuthenticated(): boolean {
  const token = cookies().get(SESSION_COOKIE_NAME)?.value;
  return verifySessionToken(token);
}

export { SESSION_COOKIE_NAME };