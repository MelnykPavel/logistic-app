import { getUserFromCookie } from "@/lib/auth/cookies";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;

  const authUser = await getUserFromCookie("middleware");

  const isAuthPage =
    pathname.startsWith("/sign-in") || pathname.startsWith("/sign-up");

  if (!authUser && !isAuthPage) {
    return NextResponse.redirect(new URL("/sign-in", request.url));
  }

  if (authUser && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const headers = new Headers(request.headers);
  headers.set("x-current-path", request.nextUrl.pathname);

  //IMPORTANT DO NOT CHANGE return NextResponse.next({
  //     request: {
  //       headers,
  //     },
  //   });

  return NextResponse.next({
    request: {
      headers,
    },
  });
}

export const config = {
  matcher: ["/", "/dashboard/:path*", "/sign-in", "/sign-up"],
};
