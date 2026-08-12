import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";
import { DECK_AUTH_COOKIE, DECK_AUTH_VALUE } from "@/lib/deck-auth";

const FD_PROTECTED_PREFIXES = ["/directors/dashboard"];
const STAFF_PROTECTED_PREFIXES = ["/admin/overview", "/admin/verification", "/admin/directors", "/admin/reviews"];

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/deck") && pathname !== "/deck/login") {
    const authed = request.cookies.get(DECK_AUTH_COOKIE)?.value === DECK_AUTH_VALUE;
    if (!authed) {
      const url = new URL("/deck/login", request.url);
      url.searchParams.set("next", pathname);
      return NextResponse.redirect(url);
    }
    return NextResponse.next();
  }

  const isFdRoute = FD_PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  const isStaffRoute = STAFF_PROTECTED_PREFIXES.some((p) => pathname.startsWith(p));
  if (!isFdRoute && !isStaffRoute) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
          response = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) => response.cookies.set(name, value, options));
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.redirect(new URL(isStaffRoute ? "/admin/login" : "/directors/signup", request.url));
  }

  if (isStaffRoute) {
    const { data: staffRow } = await supabase
      .from("staff_users")
      .select("email")
      .eq("email", user.email ?? "")
      .maybeSingle();
    if (!staffRow) {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/deck/:path*",
    "/directors/dashboard/:path*",
    "/admin/overview/:path*",
    "/admin/verification/:path*",
    "/admin/directors/:path*",
    "/admin/reviews/:path*",
  ],
};
