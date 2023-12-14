import { NextResponse } from "next/server";
import { sql } from "@vercel/postgres";
import editProfileValidation from "@/utils/validation/editProfile";
import { getServerSession } from "next-auth";

export async function POST(request: Request) {
  try {
    const session = await getServerSession();
    const { username, country, field, birthday, image } = await request.json();

    try {
      editProfileValidation({ username, country, field, birthday, image });
    } catch (error) {
      return NextResponse.json(
        { message: "Invalid Input Data" },
        { status: 400 }
      );
    }

    const response = await sql`
    UPDATE users 
    SET country = ${country}, 
    username = ${username}, 
    field = ${field}, 
    image = ${image}, 
    birthday = ${birthday}
    WHERE email = ${session?.user?.email};
    `;
    console.log("SQL update success: ", response);
  } catch (error) {
    console.log("Error in profile-update/route.ts");
    return NextResponse.json(
      { message: "Unknown Network or Server Error" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "Update Profile sueccessful!" });
}
