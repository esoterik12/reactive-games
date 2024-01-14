import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import { getServerSession } from "next-auth";

// needs better error handling and checking for empty results

export async function GET(request: Request) {
  try {
    const session = await getServerSession();
    const response = await sql`
    SELECT * FROM user_work WHERE user_email=${session?.user?.email}
    `;

    const returnData = response.rows;

    console.log("Response in get request: ", returnData);
    return NextResponse.json(
      {
        message: "GET request received",
        email: session?.user?.email,
        data: returnData,
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.log("Error in GET request: ", error);
    return NextResponse.json(
      { error: "Error processing request" },
      { status: 500 }
    );
  }
}
