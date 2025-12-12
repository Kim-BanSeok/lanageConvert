import { NextResponse } from "next/server";
import { makeSessionTokenSync, ADMIN_COOKIE_NAME } from "../../../lib/adminAuth";

export async function POST(req) {
  try {
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

