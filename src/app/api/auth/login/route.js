import dbConnect from "@/lib/mongoose/dbConnect";
import UserModel from "@/model/UserModel";
import bcrypt from "bcryptjs";
import Joi from "joi";
import * as jose from "jose";
import { NextResponse } from "next/server";

export const runtime = "nodejs"
async function emailExistsInDatabase(email) {
  await dbConnect()
  const user = await UserModel.findOne({ email });
  return user;
}

async function checkPassword(password, hashedPassword) {
  return await bcrypt.compare(password, hashedPassword);
}

export async function POST(request) {
  const { email, password } = await request.json();

  const schema = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate({ email, password });
  if (error) {
    return NextResponse.json({ status: 400, message: error.details[0].message }, { status: 400 });
  }

  // check user email exists or not
  const userExists = await emailExistsInDatabase(email);

  if (Boolean(userExists)) {
    // check password is correct or not
    const isPasswordCorrect = await checkPassword(password, userExists.password);

    if (!isPasswordCorrect) {
      return NextResponse.json({ status: 401, message: "Invalid password" }, { status: 401 });
    }
    const token = await new jose.SignJWT({ email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime("2h")
      .sign(new TextEncoder().encode(process.env.AUTH_SECRET))

    const data = {
      email: userExists.email,
      _id: userExists._id,
      role: userExists.role,
      token
    }
    delete data.password;
    return NextResponse.json(data, { status: 200 });
  }

}