import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  beforeAuth(req, evt) {
    // handle users who aren't authenticated
    if (req.nextUrl.pathname === "/chat") {
      const signInUrl = new URL("/sign-in", req.url);
      return NextResponse.redirect(signInUrl);
    }
  },

  publicRoutes: ["/", "/sign-in", "/sign-up"],
  debug: true,
});

export const config = {
  matcher: ["/((?!.*\\..*|_next|api|sign-in|sign-up).*)"],
};
