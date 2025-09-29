// middleware.ts

import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

// Define which routes should be public
const isPublicRoute = createRouteMatcher([
  "/",
  "/api/contact",
  "/api/webhook(.*)",
  "/about",
  "/services",
  "/portfolio",
  "/news",
  "/contact",
]);

// Define routes that should be ignored (like assets)
const isIgnoredRoute = createRouteMatcher([
  "/api/public(.*)",
  "/_next(.*)",
  "/favicon.ico",
  "/sitemap.xml",
  "/robots.txt",
  "/images(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  // Skip Clerk on ignored routes
  if (isIgnoredRoute(req)) {
    return NextResponse.next();
  }

  // Allow access to public routes without authentication
  if (isPublicRoute(req)) {
    return NextResponse.next();
  }

  // Protect everything else
  await auth.protect();
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.+\\.[\\w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};
