import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const scrambleSave = await request.json();
    console.log(session?.user);
    console.log("Scramble Save: ", scrambleSave);

    // ADD VALIDATION

    const date = new Date();
    const isoDate = date.toISOString();

    try {
      const response = await sql`
      INSERT INTO user_work (user_email, work_data_type, creation_date, json_data)
      VALUES (${session?.user?.email}, ${
        scrambleSave.dataType
      }, ${isoDate}, ${JSON.stringify(scrambleSave)})
      `;
      console.log("SQL update success: ", response);
    } catch (error: any) {
      console.log("Database error: ", error);
      return NextResponse.json({ error: "Database error." }, { status: 400 });
    }

    return NextResponse.json({ message: "Request received" }, { status: 200 });
  } catch (error: any) {
    console.log("Error in profile-update/route.ts");
    return NextResponse.json(
      { message: "Unknown Network or Server Error" },
      { status: 400 }
    );
  }
}
