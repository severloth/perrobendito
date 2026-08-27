import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

const COOKIE_NAME = "pb_admin_session";

export default async function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (!pathname.startsWith("/admin") || pathname === "/admin/login") {
    return NextResponse.next();
  }

  const cookie = req.cookies.get(COOKIE_NAME)?.value;
  const session = await decrypt(cookie);

  if (!session?.userId) {
    return NextResponse.redirect(new URL("/admin/login", req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
