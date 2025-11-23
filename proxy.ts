import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";
import rolesAndPermissions from "./lib/constant/rolesAndPermissions";

const isAdminRoute = createRouteMatcher(["/admin(.*)"]);
const isSignInRoute = createRouteMatcher(["/"]);
const isUnauthorizedRoute = createRouteMatcher(["/unauthorized"]);

export default clerkMiddleware(async (auth, request) => {
  const { orgRole, isAuthenticated } = await auth();
  const isAdmin = orgRole === rolesAndPermissions.admin;

  // Redirect unauthenticated users to sign-in
  if (!isAuthenticated) {
    if (!isSignInRoute(request)) {
      return NextResponse.redirect(new URL("/", request.url));
    }
    return;
  }

  // Redirect authenticated admins away from sign-in and unauthorized pages
  if (isAdmin) {
    if (isSignInRoute(request) || isUnauthorizedRoute(request)) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return;
  }

  // Redirect non-admin users trying to access admin routes
  if (isAdminRoute(request)) {
    return NextResponse.redirect(new URL("/unauthorized", request.url));
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
