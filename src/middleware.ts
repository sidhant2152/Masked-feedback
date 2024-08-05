import { DEFAULT_LOGIN_REDIRECT, authRoutes, publicRoutes } from "@/routes";
import { NextRequest, NextResponse } from "next/server";
import { getUser } from "./lib/getUser";
import { cookies } from "next/headers";
import { deleteCookies } from "./lib/deleteCookies";

export async function middleware(req: NextRequest) {
  try {
    const { nextUrl } = req;
    // // console.log("🚀 ~ middleware ~ nextUrl:", nextUrl);
    // const isLoggedIn = !!req.auth;
    // // console.log("🚀 ~ auth ~ isLoggedIn:", isLoggedIn);
    const user = await getUser();
    // // console.log("🚀 ~ middleware ~ user:", user?.email);
    const isLoggedIn = !!user;
    const isPublicRoute = publicRoutes.some((url) =>
      nextUrl.pathname.startsWith(url)
    );
    // // console.log("🚀 ~ middleware ~ isPublicRoute:", isPublicRoute);
    const isAuthRoute = authRoutes.includes(nextUrl.pathname);

    if (isAuthRoute) {
      if (isLoggedIn) {
        return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
      } else {
        return;
      }
    }

    if (!isLoggedIn && !isPublicRoute) {
      return Response.redirect(new URL(`/sign-in`, nextUrl));
    }

    return;
  } catch (error: any) {
    const response = NextResponse.redirect(new URL(`/sign-in`, req.nextUrl));
    response.cookies.delete("token");

    return response;
  }
}

// Optionally, don't invoke Middleware on some paths
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
