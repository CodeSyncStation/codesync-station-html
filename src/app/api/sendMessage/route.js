import sendEmail from "@/lib/nodemailer/mailer";
import { NextResponse } from "next/server";

export async function POST(req) {
  if (req.method === "POST") {
    const { name, email, message } = await req.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "All fields are required", status: 400 },
        { status: 400 }
      );
    }

    try {
      const response = await sendEmail(name, email, message);
      if (response.success) {
        return NextResponse.json(
          { message: "Email sent successfully!", status: 200 },
          { status: 200 }
        );
      } else {
        return NextResponse.json(
          { error: "Failed to send email.", status: 400 },
          { status: 400 }
        );
      }
    } catch (error) {
      console.error("Error sending email:", error);
      return NextResponse.json(
        { error: "Failed to send email.", status: 500 },
        { status: 500 }
      );
    }
  } else {
    NextResponse.json(
      { error: "Method not allowed", status: 400 },
      { status: 405 }
    );
  }
}
