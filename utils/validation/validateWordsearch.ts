export function validateWordSearchInput(
  wordsArray: string[],
  wordsearchTitle: string,
  numOfVersions: string,
  gridSize: string
) {
  const maxWordLen = Math.max(...wordsArray.map((word) => word.length));
  const numOfWords = wordsArray.length;

  if (wordsearchTitle.trim().length === 0) {
    throw new Error("Please input a title.");
  }

  const gridSizeNum = parseInt(gridSize);
  const versionsNum = parseInt(numOfVersions);

  if (isNaN(versionsNum)) {
    throw new Error("Versions must be a number.");
  }

  if (versionsNum > 50) {
    throw new Error("50 is the maximum number of versions.");
  }

  if (isNaN(gridSizeNum)) {
    throw new Error("Grid size must be a number.");
  }

  if (gridSizeNum > 15) {
    throw new Error("15x15 is currently the maximum grid size.");
  }

  if (maxWordLen > 12) {
    throw new Error("Words must be 12 letters or shorter.");
  }

  if (numOfWords > 15) {
    throw new Error("Enter 15 words or fewer.");
  }

  return true;
}
