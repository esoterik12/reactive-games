// currently unused

export function gptJsonExtractor(gptResponse: string) {
  if (typeof gptResponse !== "string" || gptResponse.trim().length === 0) {
    console.error("Invalid input: Input must be a non-empty string.");
    return null;
  }

  const startText = "```json";
  const endText = "```";

  // removes the beginning of the gpt reponse using startText
  const startIndex = gptResponse.indexOf(startText) + startText.length;
  const extracted = gptResponse.substring(startIndex, gptResponse.length);

  // removes the finals text
  const endIndex = extracted.indexOf(endText);
  const sliced = extracted.slice(0, endIndex);

  try {
    const jsonExtraction = JSON.parse(sliced);
    return jsonExtraction;
  } catch (error) {
    console.error("JSON parsing error:", error);
    return null;
  }
}
