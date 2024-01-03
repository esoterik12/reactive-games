import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { imageRequest } = await request.json();

    // if (
    //   !imageRequest ||
    //   typeof imageRequest !== "string" ||
    //   imageRequest.trim().length === 0
    // ) {
    //   throw new Error("Invalid request input.");
    // }

    const gptResponse = await sendPictureReq(imageRequest);
    console.log("gptResponse: ", gptResponse);
    return NextResponse.json(gptResponse);

  } catch (error: any) {
    console.error("Error in POST function: ", error);
    const errorMessage = { error: error.mesaage, status: 400 };
    return NextResponse.json(errorMessage);
  }
}

async function sendPictureReq(imageRequest: string) {
  const url = "https://api.openai.com/v1/images/generations";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET}`,
  };

  const imagePrompt = `Please send me an artistic image of a cat.  `;

  const body = JSON.stringify({
    prompt: imagePrompt,
    n: 1,
    size: "1024x1024",
  });

  try {
    const response = await axios.post(url, body, { headers: headers });
    console.log("Response:", response.data);
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error with GPT request in route.ts: ", error);
    throw new Error("Error in gpt request.");
  }
}
