import dbConnect from "@/lib/mongoose/dbConnect";
import UserModel from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = params;
  try {
    await dbConnect();
    const user = await UserModel.findById(id);
    if (!user) {
      return NextResponse.json(
        {
          status: 404,
          body: JSON.stringify({ status: 404, message: "User not found" }),
        },
        {
          status: 404,
        }
      );
    }
    return NextResponse.json(user, {
      status: 200,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      {
        status: 500,
        body: JSON.stringify({ status: 500, message: "Internal Server Error" }),
      },
      {
        status: 500,
      }
    );
  }
}
