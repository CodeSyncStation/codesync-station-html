import dbConnect from "@/lib/mongoose/dbConnect";
import UserModel from "@/model/UserModel";

import { NextResponse } from "next/server";

async function emailExistsInDatabase(email) {
  await dbConnect();
  const user = await UserModel.findOne({ email });
  if (user && user?.password) {
    return true;
  } else {
    return false;
  }
}

export async function GET(req) {
  const { nextUrl } = req;
  const email = nextUrl.searchParams.get("email");

  if (!email) {
    return NextResponse.json(
      {
        message: "Please provide an email address!",
      },
      {
        status: 400,
      }
    );
  }

  // Validate email format
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    return NextResponse.json(
      {
        message: "Invalid email format!",
      },
      {
        status: 400,
      }
    );
  }

  try {
    // Check if email exists in the database
    const emailExists = await emailExistsInDatabase(email);

    return NextResponse.json({ message: "Success", emailExists });
  } catch (error) {
    return NextResponse.json(
      {
        message: "An error occurred while checking the email.",
        error: error.message,
      },
      { status: 500 }
    );
  }
}
