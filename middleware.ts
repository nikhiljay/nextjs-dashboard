import { createMiddlewareSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // Allow access to login and signup pages without authentication
  if (["/login", "/signup"].includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  // Create authenticated Supabase Client and retrieve the session
  const { res } = createMiddlewareSupabaseClient({ req });
  const { data: { session } } = await res.auth.getSession();

  if (session?.user) {
    // Authentication successful, continue to the protected route
    return NextResponse.next();
  }

  // Redirect to the login page with the original requested URL as a query parameter
  const redirectUrl = new URL("/login", req.nextUrl.origin);
  redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
  return NextResponse.redirect(redirectUrl);
}

export const config = {
  // Match all routes except those starting with _next or api/auth
  matcher: "/((?!_next|api/auth).*)",
};
