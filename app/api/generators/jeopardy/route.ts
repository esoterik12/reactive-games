import axios from "axios";
import { NextResponse } from "next/server";
import { jeopardyRequest } from "@/app/components/classgames/jeopardy/Jeopardy";

export async function POST(request: Request) {
  try {
    const jeopardyReq = await request.json();
    const gptResponse = await sendJeopardyReq(jeopardyReq);
    console.log(gptResponse);
    return NextResponse.json(gptResponse);
  } catch (error: any) {
    console.log("Error in POST route: ", error);
    return NextResponse.json({ status: 400, message: "Server Error." });
  }
}

async function sendJeopardyReq(jeopardyReq: jeopardyRequest) {
  const url = "https://api.openai.com/v1/chat/completions";

  const headers = {
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.NEXT_PUBLIC_OPENAI_SECRET}`,
  };

  const jeopardyPrompt = `
    I would like you to produce a set of Jeopardy questions based on some specific input.
    There should be 4 categories with 6 questions in each category. The questions should be numbered from 1 to 6.
    Question number 1 should be very easy and they should get progressively harder until question number 6.
    Build the questions and categories around the following content:
    1. Vocabulary content questions: ${jeopardyReq.vocabularyContent}
    2. Grammar content questions: ${jeopardyReq.grammarContent}
    3. Phonics content questions: ${jeopardyReq.phonicsContent}
    4. Theme content questions: ${jeopardyReq.themeContent}
        
    The audience for these questions is: ${jeopardyReq.levelDescription} so tailor the language and complexity accordingly.
    Most importantly: return the questions in JSON.

    Example JSON format:
    {
      "categories": [
        {
          "category": "Vocabulary",
          "questions": [
            {
              "question_number": 1,
              "question": "What is a synonym of 'advanced'?",
              "answer": "progressive"
            },
            {
              "question_number": 2,
              "question": "Make a sentence with the word 'advanced'.",
              "answer": "I am taking an advanced English class."
            },
            {
              "question_number": 3,
              "question": "Give me an example of something 'advanced'.",
              "answer": "A computer that can solve complex math problems."
            },
            {
              "question_number": 4,
              "question": "Where might you find something 'advanced'?",
              "answer": "In a research laboratory or university."
            },
            {
              "question_number": 5,
              "question": "Why would someone use something 'advanced'?",
              "answer": "To make tasks easier or to solve difficult problems."
            },
            {
              "question_number": 6,
              "question": "What is the opposite of 'advanced'?",
              "answer": "Basic or elementary"
            }
          ]
        },
      ]
    }
  `;

  const data = {
    model: "gpt-3.5-turbo-0613",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: jeopardyPrompt },
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
