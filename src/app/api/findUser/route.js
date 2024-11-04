import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { nextUrl } = request;
  const email = nextUrl.searchParams.get("email");
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      return NextResponse.json(user, { status: 200 });
    }
    return NextResponse.json(
      { status: 404, message: "User not found" },
      { status: 404 }
    );
  } catch (error) {
    console.error("Error fetching user:", error.message || error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
