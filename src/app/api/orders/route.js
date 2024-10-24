import dbConnect from "@/lib/mongoose/dbConnect";
import OrderModel from "@/model/OrderModel";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { query, method, nextUrl } = request;
  const status = nextUrl.searchParams.get("status");

  try {
    await dbConnect();
    const orders = await OrderModel.find({});
    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  const {
    name,
    email,
    phone,
    projectType,
    details,
    budget,
    deadline,
    communication,
  } = await request.json();

  // validate input
  if (
    !name ||
    !email ||
    !phone ||
    !projectType ||
    !details ||
    !budget ||
    !deadline ||
    !communication
  ) {
    return NextResponse.json(
      { status: 400, message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    // Save user
    await dbConnect();
    const insertedData = await OrderModel.create({
      name,
      email,
      phone,
      projectType,
      details,
      budget,
      deadline,
      communication,
    });
    return NextResponse.json(insertedData, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PUT(request) {
  const { id, status } = await request.json();

  // validate input
  if (!id || !status) {
    return NextResponse.json(
      { status: 400, message: "All fields are required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();
    const updatedOrder = await OrderModel.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    revalidateTag("orders");
    return NextResponse.json(updatedOrder, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
