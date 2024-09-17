import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // console.log("test");

  return NextResponse.redirect(new URL("/login-page", request.url));
}
export const config = {
  matcher: "/login-page",
};
