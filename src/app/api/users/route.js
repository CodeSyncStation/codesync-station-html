import dbConnect from "@/lib/mongoose/dbConnect";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { query, method, nextUrl } = request;
  // console.log(nextUrl.searchParams.get("email"));

  try {
    await dbConnect();
    const users = await UserModel.find({});
    return NextResponse.json(users, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
