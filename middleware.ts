import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";
const isDashboardRoute = createRouteMatcher(["/:locale/dashboard(.*)"]);
const isFavoriteRoute = createRouteMatcher(["/:locale/favorite(.*)"]);

export default clerkMiddleware(async (auth, req) => {
  const intlMiddleware = createMiddleware(routing);
  // Restrict admin route to users with specific role
  // Restrict dashboard routes to signed in users
  if (isDashboardRoute(req) || isFavoriteRoute(req)) await auth.protect();
  return intlMiddleware(req);
});

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image).*)",
    "/",
    "/(api|trpc)(.*),/(he|en)/:path",
  ],
};
// middleware.ts
// import { chain } from "@/middlewares/chain";
// import { withI18nMiddleware } from "@/middlewares/withI18nMiddleware";
// import { withAuthMiddleware } from "@/middlewares/withAuthMiddleware";

// export default chain([withAuthMiddleware]);

// export const config = {
//   matcher: ["/((?!api|_next/static|_next/image|favicon.ico|images).*)"],
// };
