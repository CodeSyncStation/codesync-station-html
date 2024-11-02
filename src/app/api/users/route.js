import dbConnect from "@/lib/mongoose/dbConnect";
import UserModel from "@/model/UserModel";
import { revalidateTag } from "next/cache";
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
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { status: 400, message: "User with this email already exists." },
        { status: 400 }
      );
    }

    // Create a new user with the name field (if provided)
    const userData = {
      email,
      password,
    };

    if (name) {
      userData.name = name;
    }
    if (image) {
      userData.image = image;
    }
    if (role) {
      userData.role = role;
    }

    const newUser = new UserModel(userData);

    // Save the user to the database
    await newUser.save();

    // Return the created user (excluding the password)
    const { password: _, ...userWithoutPassword } = newUser.toObject();
    revalidateTag("users");

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

export async function PUT(request) {
  const { id, name, email, image, role } = await request.json();
  // Validate input
  if (!id) {
    return NextResponse.json(
      { status: 400, message: "ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const updatedUser = await UserModel.findByIdAndUpdate(
      id,
      {
        name,
        email,
        image,
        role,
      },
      { new: true }
    );
    if (!updatedUser) {
      return NextResponse.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }
    revalidateTag("users");
    return NextResponse.json(
      { status: 200, message: "User updated successfully", user: updatedUser },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating user:", error.message || error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    const user = await UserModel.findByIdAndDelete(id);
    if (!user) {
      return NextResponse.json(
        { status: 404, message: "User not found" },
        { status: 404 }
      );
    }
    revalidateTag("users");
    return NextResponse.json(
      { status: 200, message: "User deleted" },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
  }
}
