
import { NextResponse } from "next/server";

export function GET(request) {
  const { query, method, nextUrl } = request;
  console.log(nextUrl.searchParams.get("email"));

  return NextResponse.json("success")
}


