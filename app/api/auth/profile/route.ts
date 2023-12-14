import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";

// needs better error handling and checking for empty results

export async function GET() {
  try {
    const session = await getServerSession();

    const response = await sql`
    SELECT * FROM users WHERE email=${session?.user?.email}`;

    const returnData = {
      email: response.rows[0].email,
      joinedDate: response.rows[0].date,
      country: response.rows[0].country,
      username: response.rows[0].username,
      field: response.rows[0].field,
      image: response.rows[0].image,
      birthday: response.rows[0].birthday,
    };

    return NextResponse.json(
      {
        message: "GET request received",
        data: returnData,
        email: session?.user?.email,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error in GET request: ", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
