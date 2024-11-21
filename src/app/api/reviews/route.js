import dbConnect from "@/lib/mongoose/dbConnect";
import Review from "@/model/ReviewModal";
import { revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

// Fetch a review by ID
export async function GET(request) {
  const { searchParams } = new URL(request.url);
  // const id = searchParams.get("id");

  try {
    await dbConnect();

    // if (!id) {
    //   return NextResponse.json(
    //     { status: 400, message: "ID is required" },
    //     { status: 400 }
    //   );
    // }

    const review = await Review.find({});
    if (!review) {
      return NextResponse.json(
        { status: 404, message: "Review not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(review, { status: 200 });
  } catch (error) {
    console.error("Error fetching review:", error.message || error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    // Parse the request body
    const { platform, stars, text, name, position, avatar, email } =
      await request.json();

    // Validate required fields
    if (!platform || !stars || !text || !name || !email) {
      return NextResponse.json(
        {
          status: 400,
          message: "Platform, stars, text, and name are required.",
        },
        { status: 400 }
      );
    }

    // Connect to the database
    await dbConnect();

    // Create a new review document
    const newReview = new Review({
      platform,
      stars,
      text,
      name,
      position,
      email,
      avatar,
      date: new Date(), // Automatically set the current date
      time: new Date().toLocaleTimeString(), // Automatically set the current time
    });

    // Save the review to the database
    await newReview.save();

    // Revalidate cache for the reviews
    revalidateTag("reviews");

    return NextResponse.json(
      {
        status: 201,
        message: "Review created successfully.",
        data: newReview,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error creating review:", error.message || error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Update a review
export async function PUT(request) {
  const { id, platform, stars, text, name, position, avatar, status } =
    await request.json();

  if (!id) {
    return NextResponse.json(
      { status: 400, message: "ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { platform, stars, text, name, position, avatar, status },
      { new: true, runValidators: true }
    );

    if (!updatedReview) {
      return NextResponse.json(
        { status: 404, message: "Review not found" },
        { status: 404 }
      );
    }

    revalidateTag("reviews");
    return NextResponse.json(
      {
        status: 200,
        message: "Review updated successfully",
        data: updatedReview,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error updating review:", error.message || error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// Delete a review
export async function DELETE(request) {
  const { id } = await request.json();

  if (!id) {
    return NextResponse.json(
      { status: 400, message: "ID is required" },
      { status: 400 }
    );
  }

  try {
    await dbConnect();

    const deletedReview = await Review.findByIdAndDelete(id);

    if (!deletedReview) {
      return NextResponse.json(
        { status: 404, message: "Review not found" },
        { status: 404 }
      );
    }

    revalidateTag("reviews");
    return NextResponse.json(
      { status: 200, message: "Review deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error deleting review:", error.message || error);
    return NextResponse.json(
      { status: 500, message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
