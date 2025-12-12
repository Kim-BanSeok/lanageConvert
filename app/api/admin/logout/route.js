import { NextResponse } from "next/server";
import { ADMIN_COOKIE_NAME } from "../../../lib/adminAuth";
import { csrfMiddleware } from "../../../lib/csrf";

export async function POST(req) {
  // 🛡️ CSRF 토큰 검증
  const csrfError = await csrfMiddleware(req);
  if (csrfError) {
    return csrfError;
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, "", { path: "/", maxAge: 0 });
  return res;
}

