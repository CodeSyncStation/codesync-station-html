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

export async function POST(request) {
  try {
    const { email, name, password, image, role } = await request.json();

    // Check if email and password are provided
    if (!email || !password) {
      return NextResponse.json(
        { status: 400, message: "Email and password are required." },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Check if a user with the provided email already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { status: 400, message: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Create a new user with the name field (if provided)
    const newUser = new User({
      email,
      name: name || "",
      password,
      image: image || "",
      role: role || "user",
    });

    // Save the user to the database
    await newUser.save();

    // Return the created user (excluding the password)
    const { password: _, ...userWithoutPassword } = newUser.toObject();

    return NextResponse.json(
      {
        status: 201,
        message: "User created successfully.",
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error creating user:", error.message || error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
