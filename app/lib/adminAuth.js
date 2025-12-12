import crypto from "crypto";

const COOKIE_NAME = "admin_session";

function hmac(input) {
  const secret = process.env.ADMIN_SECRET || "dev-secret";
  return crypto.createHmac("sha256", secret).update(input).digest("hex");
}

export function makeSessionToken() {
  const ts = Date.now().toString();
  const nonce = crypto.randomBytes(16).toString("hex");
  const payload = `${ts}.${nonce}`;
  const sig = hmac(payload);
  return `${payload}.${sig}`;
}

export function verifySessionToken(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  const payload = `${parts[0]}.${parts[1]}`;
  const sig = parts[2];
  const expected = hmac(payload);
  return crypto.timingSafeEqual(Buffer.from(sig), Buffer.from(expected));
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

