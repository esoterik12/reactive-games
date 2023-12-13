import { NextResponse } from "next/server";
import { hash } from "bcrypt";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    console.log({ email, password });

    if (
      !email ||
      !email.includes("@") ||
      !password ||
      password.trim().length < 8
    ) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 400 }
      );
    }

    const hashedPassword = await hash(password, 10);
    const date = new Date();
    const isoDate = date.toISOString()

    try {
      const response = await sql`
    INSERT INTO users (email, password, date)
    VALUES (${email}, ${hashedPassword}, ${isoDate})`;
      console.log("SQL update success: ", response);
    } catch (error) {
      console.log("SQL update failed: ", error);
      return NextResponse.json(
        { error: "Email already in use." },
        { status: 409 }
      );
    }
  } catch (error) {
    console.log("POST request update failed: ", error);
  }

  return NextResponse.json({ message: "Register Success" });
}
