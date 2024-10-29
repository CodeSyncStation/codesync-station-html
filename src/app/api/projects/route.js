import dbConnect from "@/lib/mongoose/dbConnect";
import ProjectModel from "@/model/ProjectModel";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";
export async function POST(request) {
  const { title, description, liveLink, image, category } =
    await request.json();

  // validate input
  if (!title || !description || !liveLink || !image || !category) {
    return NextResponse.json(
      { status: 400, message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    // Save user
    const insertedData = await ProjectModel.create({
      title,
      description,
      liveLink,
      image,
      category,
    });
    revalidateTag("projects");
    return NextResponse.json(insertedData, {
      status: 200,
      message: "Project created successfully",
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    await dbConnect();
    const projects = await ProjectModel.find({});
    return NextResponse.json(projects, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const { id, title, description, liveLink, image, category } =
    await request.json();
  // validate input
  if (!id || !title || !description || !liveLink || !image || !category) {
    return NextResponse.json(
      { status: 400, message: "All fields are required" },
      { status: 400 }
    );
  }
  try {
    await dbConnect();
    const project = await ProjectModel.findByIdAndUpdate(id, {
      title,
      description,
      liveLink,
      image,
      category,
    });
    if (!project) {
      return NextResponse.json(
        { status: 404, message: "Project not found" },
        { status: 404 }
      );
    }
    revalidateTag("projects");
    return NextResponse.json(
      { status: 200, message: "Project updated successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request) {
  const { id } = await request.json();
  try {
    await dbConnect();
    const project = await ProjectModel.findByIdAndDelete(id);
    if (!project) {
      return NextResponse.json(
        { status: 404, message: "Project not found" },
        { status: 404 }
      );
    }
    revalidateTag("projects");
    return NextResponse.json(
      { status: 200, message: "Project deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
