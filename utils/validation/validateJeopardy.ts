import { jeopardyRequest } from "@/app/components/classgames/jeopardy/Jeopardy";

export default function validateJeopardy(request: jeopardyRequest) {
  if (!isValidString(request.grammarContent)) {
    throw new Error("Invalid grammar content input.");
  }
  if (!isValidString(request.vocabularyContent)) {
    throw new Error("Invalid vocabulary content input.");
  }
  if (!isValidString(request.phonicsContent)) {
    throw new Error("Invalid phonics content input.");
  }
  if (!isValidString(request.themeContent)) {
    throw new Error("Invalid theme content input.");
  }
  if (!isValidString(request.levelDescription)) {
    throw new Error("Invalid level description.");
  }

  return true;
}

function isValidString(input: any): boolean {
  return typeof input === "string" && input.length > 0 && input.length <= 20000;
}
