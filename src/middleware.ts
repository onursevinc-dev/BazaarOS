import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";


export default clerkMiddleware(async (auth, req, next) => {
  const protectedRoutes = createRouteMatcher([
    "/dashboard",
    "/dashboard/(.*)",
    "/checkout",
    "/profile",
    "/profile/(.*)",
  ]);

  if (protectedRoutes(req)) {
    await auth.protect();
  }
    // return response;
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};


// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };