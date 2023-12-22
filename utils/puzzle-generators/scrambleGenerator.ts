export function scrambleGenerator(wordsArray: string[]) {
  const scrambledWords = wordsArray.map((word) => {
    const splitWord = word.split("");
    if (splitWord.length === 1) {
      return splitWord;
    } else if (splitWord.length === 2) {
      [splitWord[0], splitWord[1]] = [splitWord[1], splitWord[0]];
      return splitWord
    } else {
      return scrambler(splitWord);
    }
  });
  console.log("scrambledGenerator return: ", scrambledWords);
  return scrambledWords;
}

function scrambler(splitWord: string[]) {
  let splitWordScrambled = [...splitWord]; // Create a copy of the array

  for (let i = 0; i < splitWordScrambled.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [splitWordScrambled[i], splitWordScrambled[j]] = [
      splitWordScrambled[j],
      splitWordScrambled[i],
    ];
  }

  // Check if any letter remains in the same position
  // count is here to deal with words like "egg" and "all" where one letter will always be in the same place
  for (let i = 0; i < splitWord.length; i++) {
    let count = 0;
    if (splitWord[i] === splitWordScrambled[i] && count > 1) {
      count++;
      console.log("recursively calling scrambler function");
      return scrambler(splitWord);
    }
  }

  return splitWordScrambled.join("");
}
