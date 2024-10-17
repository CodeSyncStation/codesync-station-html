import dbConnect from "@/lib/mongoose/dbConnect";
import UserModel from "@/model/UserModel";
import Joi from "joi";
import * as jose from "jose";
import { NextResponse } from "next/server";

export const runtime = "nodejs";

const schema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

export async function POST(request) {
  const { email, password } = await request.json();

  // Validate input
  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json(
      { status: 400, message: error.details[0].message },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const user = await UserModel.findOne({ email });
    if (user) {
      const updatedUser = await UserModel.findOneAndUpdate(
        { email },
        { email, password }
      );
      return NextResponse.json(
        {
          email: updatedUser.email,
          _id: updatedUser._id,
          role: updatedUser.role,
        },
        { status: 201 }
      );
    }
    // Save user
    const insertedData = await UserModel.create({ email, password });

    const token = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg: "HS256" })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.AUTH_SECRET));

    return NextResponse.json(
      {
        email: insertedData.email,
        _id: insertedData._id,
        role: insertedData.role,
      },
      { status: 201 }
    );
  } catch (error) {
    if (error.code === 11000) {
      // Handle duplicate email error
      return NextResponse.json(
        { status: 400, message: "Email already exists" },
        { status: 400 }
      );
    }

    console.error("Error creating user:", error);
    return NextResponse.json(
      { status: 500, message: "Something went wrong, please try again later." },
      { status: 500 }
    );
  }
}
