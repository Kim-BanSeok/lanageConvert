import { NextResponse } from "next/server";
import { makeSessionTokenSync, ADMIN_COOKIE_NAME } from "../../../lib/adminAuth";
import { rateLimitCheck } from "../../../lib/rateLimiter";
import { csrfMiddleware } from "../../../lib/csrf";

export async function POST(req) {
  try {
    // 🛡️ Rate Limiting 체크 (브루트포스 공격 방지)
    const rateLimitResult = rateLimitCheck(req, 'login');
    if (!rateLimitResult.allowed) {
      return NextResponse.json(
        { 
          ok: false, 
          message: `너무 많은 로그인 시도입니다. ${Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)}초 후에 다시 시도하세요.`,
          retryAfter: Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000)
        }, 
        { 
          status: 429,
          headers: {
            'Retry-After': Math.ceil((rateLimitResult.resetTime - Date.now()) / 1000).toString(),
            'X-RateLimit-Limit': rateLimitResult.limit.toString(),
            'X-RateLimit-Remaining': rateLimitResult.remaining.toString(),
            'X-RateLimit-Reset': new Date(rateLimitResult.resetTime).toISOString(),
          }
        }
      );
    }

    // 🛡️ CSRF 토큰 검증
    const csrfError = await csrfMiddleware(req);
    if (csrfError) {
      return csrfError;
    }

    const body = await req.json();
    const password = body?.password || "";

    const expected = process.env.ADMIN_PASSWORD || "admin";
    
    // 개발 환경에서만 디버깅 로그 (프로덕션에서는 제거 권장)
    if (process.env.NODE_ENV === "development") {
      console.log("[DEBUG] Login attempt");
      console.log("  - Expected password:", expected ? `"${expected}"` : "기본값(admin)");
      console.log("  - Received password:", password ? `"${password}"` : "비어있음");
      console.log("  - Match:", password === expected ? "✅ 일치" : "❌ 불일치");
    }
    
    if (password !== expected) {
      return NextResponse.json({ ok: false, message: "비밀번호가 틀렸습니다." }, { status: 401 });
    }

    const token = makeSessionTokenSync();

    const res = NextResponse.json({ ok: true });
    res.cookies.set(ADMIN_COOKIE_NAME, token, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 7일
    });
    return res;
  } catch {
    return NextResponse.json({ ok: false }, { status: 400 });
  }
}

