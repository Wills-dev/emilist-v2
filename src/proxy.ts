import { NextRequest, NextResponse } from "next/server";
import { routes } from "./lib/helpers/routes";

const PROTECTED_PATHS = ["/dashboard"];

export function proxy(req: NextRequest) {
  const token = req.cookies.get("emilistToken")?.value;

  const isProtected = PROTECTED_PATHS.some((p) =>
    req.nextUrl.pathname.startsWith(p),
  );

  if (isProtected && !token) {
    const redirect = encodeURIComponent(req.nextUrl.pathname);
    return NextResponse.redirect(
      new URL(`${routes?.login}?redirect=${redirect}`, req.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard/:path*"],
};
