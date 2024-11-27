import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const auth = req.auth;
  const pathname = req?.nextUrl.pathname;
  if (pathname.startsWith("/user") || pathname.startsWith("/admin")) {
    if (!auth || !auth.user) {
      return NextResponse.redirect(new URL("/login", req.nextUrl.origin));
    }
  }

  // if (pathname.startsWith("/api")) {
  //   console.log(auth.user, "Authent");
  //   if (auth?.user?.role !== "admin") {
  //     return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  //   }
  // }
  return NextResponse.next();
});
