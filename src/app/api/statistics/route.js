import OrderModel from "@/model/OrderModel";
import User from "@/model/UserModel";
import { NextResponse } from "next/server";

export async function GET(request) {
  // Fetch the user data from the database
  try {
    const userCount = await User.estimatedDocumentCount();
    const orders = await OrderModel.find({});

    const orderCount = orders?.length;
    const totalIncome = orders
      ?.filter((order) => order.status === "delivered")
      .reduce((total, order) => total + (order.price || 0), 0);

    // If the userCount data is not available, return a 404 response

    // Return the userCount data as JSON
    return NextResponse.json(
      { userCount, orderCount, totalIncome },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json({ status: 500, message: error.message });
  }
}
