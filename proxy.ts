import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import rolesAndPermissions from "./lib/constant/rolesAndPermissions";

const validateIsAdmin = createRouteMatcher(["/admin(.*)"]);
const isSignInPage = createRouteMatcher(["/"]);

const redirect = (request: NextRequest, pathname: string) =>
  NextResponse.redirect(new URL(pathname, request.url));

export default clerkMiddleware(async (auth, request) => {
  try {
    const { orgRole } = await auth();

    if (isSignInPage(request) && orgRole === rolesAndPermissions.admin) {
      return redirect(request, "/admin");
    }
    if (validateIsAdmin(request) && orgRole !== rolesAndPermissions.admin) {
      return redirect(request, "/");
    }
  } catch (error) {
    console.log("Proxy Error:", error);
    return redirect(request, "/");
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
