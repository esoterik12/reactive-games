export default function wordErrorGenerator(wordsArray: string[]) {
  const newArray = [...wordsArray];
  const errorArray = [];

  for (let i = 0; i < newArray.length; i++) {
    errorArray.push(newArray[i].split(""));
  }

  for (let i = 0; i < errorArray.length; i++) {
    const randAction = Math.floor(Math.random() * 12);
    if (randAction < 5) {
      subVowel(errorArray, i);
    } else if (randAction >= 5 && randAction < 10) {
      removeDouble(errorArray, i);
    } else if (randAction >= 10) {
      switchLetters(errorArray, i);
    }
  }

  console.log("errorArray: ", errorArray);
  return errorArray;
}

function randomLetter(stringArray: string[][], i: number) {
  const randomIndex = Math.floor(Math.random() * stringArray[i].length);
  const randomLetter = String.fromCharCode(97 + Math.floor(Math.random() * 26));
  stringArray[i][randomIndex] = randomLetter;
}

function switchLetters(stringArray: string[][], i: number) {
  const randIdx = Math.floor(Math.random() * (stringArray[i].length - 1));
  if (stringArray[i][randIdx] === stringArray[i][randIdx + 1]) {
    switchLetters(stringArray, i);
  } else {
    return ([stringArray[i][randIdx], stringArray[i][randIdx + 1]] = [
      stringArray[i][randIdx + 1],
      stringArray[i][randIdx],
    ]);
  }
}

function subVowel(stringArray: string[][], i: number) {
  if (stringArray[i].some((el) => el === "u")) {
    const vowelIdx = stringArray[i].findIndex((el) => el === "u");
    const randNum = Math.floor(Math.random() * 2); // Alternatve between a/o
    if (randNum === 1) {
      stringArray[i][vowelIdx] = "a";
    } else {
      stringArray[i][vowelIdx] = "o";
    }
  } else if (stringArray[i].some((el) => el === "o")) {
    const vowelIdx = stringArray[i].findIndex((el) => el === "o");
    stringArray[i][vowelIdx] = "u";
  } else if (stringArray[i].some((el) => el === "i")) {
    const vowelIdx = stringArray[i].findIndex((el) => el === "i");
    stringArray[i][vowelIdx] = "e";
  } else if (stringArray[i].some((el) => el === "e")) {
    const vowelIdx = stringArray[i].findIndex((el) => el === "e");
    const randNum = Math.floor(Math.random() * 2); // Alternatve between a/i
    if (randNum === 1) {
      stringArray[i][vowelIdx] = "a";
    } else {
      stringArray[i][vowelIdx] = "i";
    }
  } else if (stringArray[i].some((el) => el === "a")) {
    const vowelIdx = stringArray[i].findIndex((el) => el === "a");
    stringArray[i][vowelIdx] = "e";
  } else {
    switchLetters(stringArray, i); // Defaults to switching letters if no vowels
  }
}

function removeDouble(stringArray: string[][], i: number) {
  for (let j = 0; j < stringArray.length - 1; j++) {
    if (stringArray[i][j] === stringArray[i][j + 1]) {
      console.log("double letters found");
      stringArray[i].splice(j, 1);
    } else {
      switchLetters(stringArray, i); // Defaults to switching letters if no double letters
      return // stop loop
    }
  }
}
