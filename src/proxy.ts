import { NextRequest, NextResponse } from "next/server";
import { loginRedirectUrl } from "./lib/helpers/authRedirect";

import { SESSION_AUTH_COOKIE } from "./lib/helpers/authConstants";

const PROTECTED_PATHS = ["/dashboard"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("emilistToken")?.value;

  // This marker permits client-side session verification; it is not a credential.
  // The AuthProvider and backend still verify the actual session before access.
  const sessionMode = req.cookies.get(SESSION_AUTH_COOKIE)?.value === "session";

  const isProtected = PROTECTED_PATHS.some((p) =>
    req.nextUrl.pathname.startsWith(p),
  );

  if (isProtected && !token && !sessionMode) {
    return NextResponse.redirect(
      new URL(loginRedirectUrl(`${req.nextUrl.pathname}${req.nextUrl.search}`), req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
