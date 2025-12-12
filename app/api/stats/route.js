import { NextResponse } from "next/server";
import { getStats } from "../../lib/analyticsStore";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "../../lib/adminAuth";
import { rateLimitCheck } from "../../lib/rateLimiter";

export async function GET(req) {
  // 🛡️ Rate Limiting 체크
  const rateLimitResult = rateLimitCheck(req, 'stats');
  if (!rateLimitResult.allowed) {
    return NextResponse.json(
      { 
        ok: false, 
        message: "Too many requests",
        retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
      }, 
      { 
        status: 429,
        headers: {
          'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
          'X-RateLimit-Limit': rateLimitResult.limit.toString(),
          'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
        }
      }
    );
  }

  // 관리자 인증 확인
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  if (!verifySessionToken(token)) {
    return NextResponse.json({ ok: false, message: "unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const from = searchParams.get("from"); // YYYY-MM-DD
  const to = searchParams.get("to");     // YYYY-MM-DD

  const fromTs = from ? new Date(from + "T00:00:00").getTime() : undefined;
  const toTs = to ? new Date(to + "T23:59:59").getTime() : undefined;

  const stats = getStats({ fromTs, toTs });
  return NextResponse.json(stats);
}

