export default function validateBingoInput(wordsArray: any[], bingoTitle: string) {
  if (!wordsArray || bingoTitle.trim().length === 0) {
    throw new Error("Invalid input.")
  }

  const numOfWords = wordsArray.length
  if (numOfWords !== 25) {
    throw new Error("You must enter 25 words for a 5x5 bingo grid.")
  }

  return true
}