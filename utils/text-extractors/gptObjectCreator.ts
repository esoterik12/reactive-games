export function gptObjectCreator(gptResponse: string) {
  if (typeof gptResponse !== "string" || gptResponse.trim().length === 0) {
    console.error("Invalid input: Input must be a non-empty string.");
    return null;
  }

  try {
    const jsonExtraction = JSON.parse(gptResponse);
    return jsonExtraction;
  } catch (error) {
    console.error("JSON parsing error:", error);
    return null;
  }
}
