export default function validateCryptogram(cryptogramInput: string, cryptogramTitle: string) {
  if (!cryptogramInput || cryptogramInput.trim().length === 0) {
    throw new Error("Invalid input.");
  }
  if (!cryptogramTitle || cryptogramTitle.trim().length === 0) {
    throw new Error("Invalid title.");
  }
  if (cryptogramInput.trim().length > 120) {
    throw new Error("You input is too long.");
  }

  const splitByWords: string[] = cryptogramInput.split(" ");
  const longestWordLen = splitByWords.reduce((max, word) => Math.max(max, word.length), 0)

  if (longestWordLen > 20) {
    throw new Error(
      "Currently this does not support use of words longer than 20 letters."
    );
  }
  return true
}
