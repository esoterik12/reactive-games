export function validateScramble(wordsArray: string[], scrambleTitle: string) {
  if (wordsArray.length > 24) {
    throw new Error("Enter a maximum of 24 words.")
  }

  if (!wordsArray || wordsArray.length === 0) {
    throw new Error("Invalid word input.")
  }

  if (!scrambleTitle || scrambleTitle.trim().length === 0) {
    throw new Error("Invalid title.")
  }
  return true
}