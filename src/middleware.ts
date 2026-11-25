import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

import { HOME_PATH, HOME_ROUTE_HEADER } from "@/components/layout/home/homePath";
import { SITE_PUBLIC_ROUTE_HEADER } from "@/lib/requests/siteAuth";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname === "/home-v2" || pathname.startsWith("/home-v2/")) {
    const url = request.nextUrl.clone();
    const suffix = pathname.slice("/home-v2".length);
    url.pathname = suffix || "/";
    return NextResponse.redirect(url, 308);
  }

  const response = NextResponse.next();

  if (pathname === HOME_PATH) {
    response.headers.set(HOME_ROUTE_HEADER, "1");
    response.headers.set(SITE_PUBLIC_ROUTE_HEADER, "1");
  }

  return response;
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|assets/).*)"],
};
