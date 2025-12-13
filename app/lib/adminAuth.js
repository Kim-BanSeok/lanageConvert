// Edge Runtime 호환: Web Crypto API 사용
const COOKIE_NAME = "admin_session";

// Web Crypto API를 사용한 HMAC (Edge Runtime 호환)
async function hmac(input) {
  const secret = process.env.ADMIN_SECRET || "dev-secret";
  const encoder = new TextEncoder();
  const keyData = encoder.encode(secret);
  const messageData = encoder.encode(input);

  const key = await crypto.subtle.importKey(
    "raw",
    keyData,
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );

  const signature = await crypto.subtle.sign("HMAC", key, messageData);
  const hashArray = Array.from(new Uint8Array(signature));
  return hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
}

// 동기 버전 (Node.js 환경용)
function hmacSync(input) {
  // Node.js 환경에서만 사용 (API Route 등)
  if (typeof require !== "undefined") {
    try {
      const crypto = require("crypto");
      const secret = process.env.ADMIN_SECRET || "dev-secret";
      return crypto.createHmac("sha256", secret).update(input).digest("hex");
    } catch {
      // Edge Runtime에서는 사용 불가
    }
  }
  return null;
}

// 랜덤 바이트 생성 (Edge Runtime 호환)
function randomBytes(length) {
  const array = new Uint8Array(length);
  crypto.getRandomValues(array);
  return Array.from(array).map(b => b.toString(16).padStart(2, "0")).join("");
}

export async function makeSessionToken() {
  const ts = Date.now().toString();
  const nonce = randomBytes(16);
  const payload = `${ts}.${nonce}`;
  const sig = await hmac(payload);
  return `${payload}.${sig}`;
}

// Node.js 환경용 동기 버전
export function makeSessionTokenSync() {
  const ts = Date.now().toString();
  const nonce = randomBytes(16);
  const payload = `${ts}.${nonce}`;
  const sig = hmacSync(payload);
  if (!sig) {
    throw new Error("HMAC generation failed - not in Node.js environment");
  }
  return `${payload}.${sig}`;
}

export async function verifySessionToken(token) {
  if (!token) return false;
  const parts = token.split(".");
  if (parts.length !== 3) return false;
  
  // 🔒 세션 타임아웃 체크 (토큰에 타임스탬프 포함)
  const timestamp = parseInt(parts[0], 10);
  if (isNaN(timestamp)) return false;
  
  const SESSION_TIMEOUT_MS = 60 * 60 * 1000; // 1시간
  const now = Date.now();
  const elapsed = now - timestamp;
  
  if (elapsed > SESSION_TIMEOUT_MS) {
    // 세션 만료
    return false;
  }
  
  const payload = `${parts[0]}.${parts[1]}`;
  const sig = parts[2];
  const expected = await hmac(payload);
  
  // 타임 안전 비교 (Edge Runtime 호환)
  if (sig.length !== expected.length) return false;
  let result = 0;
  for (let i = 0; i < sig.length; i++) {
    result |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  }
  return result === 0;
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;

