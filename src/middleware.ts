import { authMiddleware } from "@clerk/nextjs";
import { NextResponse } from "next/server";

export default authMiddleware({
  afterAuth(auth, req, evt) {
    // handle users who aren't authenticated
    if (!auth.userId && req.nextUrl.pathname === "/chat") {
      const signInUrl = new URL("/", req.url);
      signInUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(signInUrl);
    }
    if (auth.userId && req.nextUrl.pathname === "/") {
      const chatUrl = new URL("/chat", req.url);
      chatUrl.searchParams.set("redirect_url", req.url);
      return NextResponse.redirect(chatUrl);
    }
  },
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api)(.*)"],
};
