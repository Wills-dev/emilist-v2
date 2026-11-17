import { NextRequest, NextResponse } from "next/server";
import { loginRedirectUrl } from "./lib/helpers/authRedirect";

const PROTECTED_PATHS = ["/dashboard"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("emilistToken")?.value;

  const isProtected = PROTECTED_PATHS.some((p) =>
    req.nextUrl.pathname.startsWith(p),
  );

  if (isProtected && !token) {
    return NextResponse.redirect(
      new URL(loginRedirectUrl(`${req.nextUrl.pathname}${req.nextUrl.search}`), req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
