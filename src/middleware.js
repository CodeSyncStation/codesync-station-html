import * as jose from "jose";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const verifyToken = async (request) => {
  const headerList = headers()
  const token = headerList.get("token")
  console.log(token);

  if (!token) return NextResponse.json({ message: "Token required" }, { status: 401 })
  try {
    const decoded = await jose.jwtVerify(token, new TextEncoder().encode(process.env.AUTH_SECRET));
    request.locals = decoded
    return NextResponse.next()
  } catch (error) {
    console.log("error: ", error);
    return NextResponse.json({ status: 401, message: "Invalid token" }, { status: 401 })
  }
}

export async function middleware(request) {
  return verifyToken(request)
}

export const config = {
  matcher: [
    '/((?!api/auth|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
  runtime: 'nodejs',
}

