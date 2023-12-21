// there are issues with this function, particularly with longer words
// it works for now for simple input where most words are fewer than 10 letters long
// to be refined
export function multiWordsearchGenerator(words: string[], numberOfVersions: number, gridSize: number) {
  let multiArray: any[]= new Array()

  for (let i = 0; i < numberOfVersions; i++) {
    multiArray.push(wordsearchGenerator(words, gridSize))
  }

  console.log("Multi Array: ", multiArray)
  return multiArray
}


export function wordsearchGenerator(words: string[], gridSize: number) {
  // determine max word length (not used yet)
  let maxWordLen = Math.max(...words.map((word) => word.length));
  console.log("max word len: ", maxWordLen);

  // sort words from longest to shortest so longer words placed first:
  words.sort((a, b) => b.length - a.length);


  // create grid
  const searchArray: any[] = new Array();
  for (let i = 0; i < gridSize; i++) {
    searchArray[i] = new Array();
  }

  words.forEach((element) => {
    const letterArray = element.split("");
    let depth = 0;
    findDirectionFit(letterArray, searchArray, depth, gridSize);
  });

  // fills remaining spaces
  for (let i = 0; i < gridSize; i++) {
    for (let j = 0; j < gridSize; j++) {
      if (!searchArray[i][j]) {
        const randomIndex = Math.floor(Math.random() * 26);
        searchArray[i][j] = String.fromCharCode(97 + randomIndex);
        // searchArray[i][j] = String.fromCharCode(10);
      }
    }
  }

  return searchArray;
}

// function to add words to grid
function findDirectionFit(letterArray: string[], searchArray: any[], depth: number, gridSize:number) {
  // determines direction, 2: diagonal, 1: vertical, 0: horizontal
  depth++;
  if (depth > 500) {
    throw new Error(
      "Input too complex. Simplify your input as it currently cannot fit on the grid."
    );
  }
  console.log("depth: ", depth);

  let direction = Math.floor(Math.random() * 3);
  console.log("Direction determined: ", direction);

  const startY = Math.floor(Math.random() * (gridSize - letterArray.length));
  const startX = Math.floor(Math.random() * (gridSize - letterArray.length));
  console.log("Attempting starting location at XY: ", startX, startY);

  let isFit = true;
  let conditions;

  for (let i = 0; i < letterArray.length; i++) {
    if (direction === 2) {
      conditions =
        (searchArray[startY + i][startX + i] === letterArray[i] ||
          searchArray[startY + i][startX + i] === undefined) &&
        startY < gridSize &&
        startX + i < gridSize;
    } else if (direction === 1) {
      conditions =
        (searchArray[startY + i][startX] === letterArray[i] ||
          searchArray[startY + i][startX] === undefined) &&
        startY < gridSize &&
        startX + i < gridSize;
    } else if (direction === 0) {
      conditions =
        (searchArray[startY][startX + i] === letterArray[i] ||
          searchArray[startY][startX + i] === undefined) &&
        startY < gridSize &&
        startX + i < gridSize;
    }

    if (!conditions) {
      isFit = false;
      break;
    }
  }

  if (!isFit) {
    return findDirectionFit(letterArray, searchArray, depth, gridSize);
  }

  if (direction === 2) {
    letterArray.forEach((letter, index) => {
      searchArray[startY + index][startX + index] = letter;
    });
  } else if (direction === 1) {
    letterArray.forEach((letter, index) => {
      searchArray[startY + index][startX] = letter;
    });
  } else if (direction === 0) {
    letterArray.forEach((letter, index) => {
      searchArray[startY][startX + index] = letter;
    });
  }
}
