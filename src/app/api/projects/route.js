import dbConnect from "@/lib/mongoose/dbConnect";
import ProjectModel from "@/model/ProjectModel";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { title, description, liveLink, image, category } = await request.json();

  // validate input
  if (!title || !description || !liveLink || !image || !category) {
    return NextResponse.json({ status: 400, message: "All fields are required" }, { status: 400 });
  }

  try {
    await dbConnect()
    // Save user
    const insertedData = await ProjectModel.create({ title, description, liveLink, image, category });
    return NextResponse.json(insertedData, {
      status: 200,
      message: "Project created successfully"
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ status: 500, message: "Internal Server Error" }, { status: 500 });
  }

}