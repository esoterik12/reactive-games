import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { spotItRequest } = await request.json();

    if (
      !spotItRequest ||
      typeof spotItRequest !== "string" ||
      spotItRequest.trim().length === 0
    ) {
      throw new Error("Invalid request input.");
    }

    const gptResponse = await sendSpotItReq(spotItRequest);
    const wordsArray = gptResponse.split(" ");

    console.log("spot it gpt response: ", wordsArray);

    return NextResponse.json(wordsArray);
  } catch (error: any) {
    console.error("Error in POST function: ", error);
    const errorMessage = { error: error.mesaage, status: 400 };
    return NextResponse.json(errorMessage);
  }
}

async function sendSpotItReq(spotItRequest: string) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Context-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET}`,
  };

  const spotItPrompt = `Please send me an array of 15 words that fit the description below. 
  The description is ${spotItRequest}.
  Utmost important: please return only the words separated by spaces. No other characters. 
  This should follow the following format: go, bow, glow, cone, phone, globe, no, goat
  `;

  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: spotItPrompt },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    return response.data.choices[0].message.content;
  } catch (error: any) {
    console.error("Error with GPT request in route.ts: ", error);
    throw new Error("Error in gpt request.");
  }
}

// Provide no extra text and follow this format exactly:
// go, bow, glow, cone, phone, globe, no, goat
