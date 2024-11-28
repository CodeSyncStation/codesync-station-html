import dbConnect from "@/lib/mongoose/dbConnect";
import OrderModel from "@/model/OrderModel";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function GET(request) {
  const { nextUrl } = request;
  const status = nextUrl.searchParams.get("status");
  const date = nextUrl.searchParams.get("date");
  const orderId = nextUrl.searchParams.get("orderId");
  const page = nextUrl.searchParams.get("page");
  const email = nextUrl.searchParams.get("email");
  const recent = nextUrl.searchParams.get("recent");

  let query = {};
  let options = {};
  // if (page) {
  //   const limit = 10;
  //   options.skip = (parseInt(page) - 1) * limit;
  //   options.limit = limit;
  // }
  if (status) {
    query.status = status;
  }
  if (orderId) {
    query.orderId = { $regex: `^${orderId}`, $options: "i" };
  }

  if (email) {
    query.email = email;
  }

  if (date) {
    query.createdAt = { $gte: date[0], $lte: date[1] };
  }

  if (recent) {
    options.sort = { createdAt: -1 };
    options.limit = 1;
  }

  console.log(query);

  try {
    await dbConnect();
    const orders = await OrderModel.find(query, {}, options);
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
    projectName,
    projectType,
    projectDescription,
    budget,
    deadline,
    communication,
    notes,
  } = await request.json();

  // validate input
  if (
    !name ||
    !email ||
    !phone ||
    !projectType ||
    !projectName ||
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
      orderId: "CS" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      name,
      email,
      phone,
      projectType,
      projectName,
      projectDescription,
      budget,
      deadline,
      communication,
      notes,
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
