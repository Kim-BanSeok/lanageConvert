import { NextResponse } from "next/server";
import { getStats } from "../../lib/analyticsStore";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "../../lib/adminAuth";

export async function GET(req) {
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

