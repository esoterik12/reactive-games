export default function validateBingoInput(wordsArray: any[], bingoTitle: string, numberOfCards: number) {
  if (!wordsArray || bingoTitle.trim().length === 0) {
    throw new Error("Invalid input.")
  }

  const longestWord = wordsArray.reduce((max, word) => Math.max(max, word.length), 0)
  if (longestWord > 20) {
    throw new Error("Currently the bingo generator does not support words with more than 20 letters.")
  }

  if (numberOfCards > 40) {
    throw new Error("You cannot generate more than 40 bingo cards.")
  }

  const numOfWords = wordsArray.length
  if (numOfWords !== 25) {
    throw new Error("You must enter 25 words for a 5x5 bingo grid.")
  }

  return true
}