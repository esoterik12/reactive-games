import axios from "axios";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { words, options } = await request.json();
    if (!words || typeof words !== "string" || words.trim().length === 0) {
      throw new Error('Invalid input: "words" must be a string.');
    }
    if (
      !options ||
      typeof options !== "string" ||
      options.trim().length === 0
    ) {
      throw new Error('Invalid input: "options" is required.');
    }
    const wordsArray = words.split(",");

    const gptResponse = await sendFindYourPartnerReq(wordsArray, options);

    return NextResponse.json(gptResponse);
  } catch (error: any) {
    console.error("Error in POST function: ", error);
    const errorMessage = { error: error.mesaage, status: 400 };
    return NextResponse.json(errorMessage);
  }
}

async function sendFindYourPartnerReq(words: string[], options: string) {
  const url = "https://api.openai.com/v1/chat/completions";
  const headers = {
    "Context-Type": "application/json",
    Authorization: `Bearer ${process.env.OPENAI_SECRET}`,
  };
  const partnerPrompt = `Take each of the following words and return matching 
  pairs for each. Each returned word must be a word that is a ${options} with the chosen words. 
  Words: ${words}. Where possible, please use simpler words that young children would understand.
  Utmost important: please return the results as a javascript object. Provide no extra text and follow this format exactly:
  {
    "slow": ["go", "bow", "glow"],
    "weak": ["speak", "peek", "week"],
    "ugly": ["bug", "hug", "mug"],
    "old": ["sold", "gold", "cold"]
  }`
  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: partnerPrompt },
    ],
  };

  try {
    const response = await axios.post(url, data, { headers: headers });
    return response.data.choices[0].message.content;
  } catch (error) {
    console.error("Error with GPT request in route.ts: ", error);
    throw new Error("Error in gpt request.");
  }
}
