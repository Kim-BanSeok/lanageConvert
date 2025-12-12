import { NextResponse } from "next/server";
import { verifySessionToken, ADMIN_COOKIE_NAME } from "./app/lib/adminAuth";

export async function middleware(req) {
  const { pathname } = req.nextUrl;

  // 보호 대상: /admin 하위
  if (!pathname.startsWith("/admin")) return NextResponse.next();

  // 로그인 페이지는 통과
  if (pathname === "/admin/login") return NextResponse.next();

  // 세션 쿠키 확인 (비동기)
  const token = req.cookies.get(ADMIN_COOKIE_NAME)?.value;
  const ok = await verifySessionToken(token);

  if (!ok) {
    const url = req.nextUrl.clone();
    url.pathname = "/admin/login";
    url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};

