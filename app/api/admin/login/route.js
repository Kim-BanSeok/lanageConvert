import { NextResponse } from "next/server";
import { makeSessionToken, ADMIN_COOKIE_NAME } from "../../../lib/adminAuth";

export async function POST(req) {
  try {
    const body = await req.json();
    const password = body?.password || "";

    const expected = process.env.ADMIN_PASSWORD || "admin";
    if (password !== expected) {
      return NextResponse.json({ ok: false, message: "비밀번호가 틀렸습니다." }, { status: 401 });
    }

    const token = makeSessionToken();

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

