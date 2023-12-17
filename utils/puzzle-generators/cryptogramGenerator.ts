export default function cryptogramGenerator(
  sentence: string,
  givenAnswers: string
) {
  const uppercaseAnswers = givenAnswers.toUpperCase();
  const givenAnswersSet = new Set(uppercaseAnswers.split(""));
  const givenAnswersArray = [...givenAnswersSet];

  let alphabet: string[] = [];
  for (let i = 0; i < 26; i++) {
    alphabet.push(String.fromCharCode(i + 65));
  }

  const shuffledAlphabetArray: string[] = shuffleArray(alphabet);
  const splitString: string[] = sentence.toUpperCase().split("");
  // removes any non letters in the array, excluding white space
  const filteredSplitString = splitString.filter((element) => alphabet.includes(element) || element === " ")

  let cryptogramOutput = [];

  // Initial full array of numbers representing each letter
  for (let i = 0; i < filteredSplitString.length; i++) {
    if (givenAnswersArray.includes(filteredSplitString[i])) {
      cryptogramOutput.push(filteredSplitString[i]);
    } else if (filteredSplitString[i] !== " ") {
      // this pushes the index of that letter in the shuffledAlphabet array into the output
      cryptogramOutput.push(
        shuffledAlphabetArray.findIndex((letter) => letter === filteredSplitString[i])
      );
    } else if (filteredSplitString[i] === " ") {
      cryptogramOutput.push("  ");
    }
  }

  // this places a # to act as a marker for the end of the array
  cryptogramOutput.push("#")

  // wrappedWords is an array of arrays (rows) of words ending in a space for formatting purposes
  let wrappedWords: any = [[]];
  // defines the row within wrapped words
  let row = 0;
  // keeps track of where in a row of x (15?) letters the loop is at
  let rowCounter = 0

  for (let i = 0; i <cryptogramOutput.length; i++) {
    // creates an array to hold the remainig letters in the x-long (20?) row
    let remainingLetters: any[] = []
    for (let j = 0; j < (20-rowCounter); j++) {
      remainingLetters.push(cryptogramOutput[i+j])
    }

    console.log("remaining letters: ", remainingLetters)

    // if the row max length is not met AND the remaining letters still include a space this continnues added letters to the current row
    if (wrappedWords[row].length < 19 && (remainingLetters.includes("  ") || remainingLetters.includes("#"))) {
      wrappedWords[row].push(cryptogramOutput[i]);
      rowCounter++
    } else {
      // if either the row reaches max length or there are no more spaces (signifiying the next word will not fit on the current row)
      // it will push a new empty array into wrappedWords, reset the rowCounter, and increment the current row by one
      wrappedWords.push([]);
      rowCounter = 0
      row++;
    }
  }

  // Removes the # ending marker from the return value
  const lastOuterArray = wrappedWords.length - 1
  wrappedWords[lastOuterArray].pop()

  return wrappedWords;
}

const shuffleArray = (array: string[]) => {
  const shuffledAlphabet = [...array];
  for (let i = 25; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffledAlphabet[i], shuffledAlphabet[j]] = [
      shuffledAlphabet[j],
      shuffledAlphabet[i],
    ];
  }
  return shuffledAlphabet;
};
