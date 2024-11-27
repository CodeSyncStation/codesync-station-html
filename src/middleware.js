import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  return NextResponse.next();
});
