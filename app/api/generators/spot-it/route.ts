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
    const commasRemoved = gptResponse.replace(/,/g, "");
    const wordsArray = commasRemoved.split(" ");
    const duplicatesRemoved = wordsArray.filter(
      (value: string, index: number, self: string) => {
        return self.indexOf(value) === index;
      }
    );

    console.log("spot it gpt response: ", duplicatesRemoved);

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
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET}`,
  };

  const spotItPrompt = `Please send me an array of 12 words that fit the description below. 
  The description is ${spotItRequest}.
  Utmost important: please return only the words separated by spaces. No other characters. 
  Make sure all entries are single words. For example, if asked for countries, do not return "United States".
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
