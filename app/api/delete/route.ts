import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

export async function POST(request: Request) {
  try {
    const deleteId = await request.json();

    try {
      const response = await sql`
      DELETE FROM user_work
       WHERE id = ${deleteId}`;
      console.log("SQL data delete success: ", response);
    } catch (error: any) {
      console.log("Database deletion error: ", error);
      return NextResponse.json(
        { error: "Database deletion error." },
        { status: 400 }
      );
    }
  } catch (error: any) {
    console.log("Error in profile-update/route.ts");
    return NextResponse.json(
      { message: "Unknown Network or Server Error" },
      { status: 400 }
    );
  }
  return NextResponse.json({ message: "Delete successful" }, { status: 200 });
}
