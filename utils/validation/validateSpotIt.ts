export function validateSpotIt(wordsArray: any[]) {
  if (!wordsArray) {
    throw new Error("Invalid input.");
  }

  const longestWord = wordsArray.reduce(
    (max, word) => Math.max(max, word.length),
    0
  );
  if (longestWord > 20) {
    throw new Error(
      "Currently shit does not support words with more than 20 letters."
    );
  }

  const numOfWords = wordsArray.length;
  if (numOfWords > 20) {
    throw new Error("You have entered too many words.");
  }
  if (numOfWords < 2) {
    throw new Error("You have entered too few words.");
  }

  return true;
}

export function validateSpotItReq(spotItRequest: string) {
  if (typeof spotItRequest !== "string") {
    throw new Error("Invalid input type.");
  }
  if (!spotItRequest || spotItRequest.trim().length === 0) {
    throw new Error("Invalid input.");
  }
  if (spotItRequest.trim().length > 120) {
    throw new Error("You input is too long.");
  }
}
