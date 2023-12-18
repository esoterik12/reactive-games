import validateBingoInput from "../validation/validateBingo";

export default function bingoGenerator(bingoInput: string, bingoTitle: string, numberOfCards: number) {
  const wordsArray = bingoInput.split(",").map((ele) => ele.trim());

  try {
    validateBingoInput(wordsArray, bingoInput);
    const bingoArray = new Array(numberOfCards);

    const shuffleArr = (array: any[]) => {
      const shuffledArray: any[] = [...array];
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffledArray[i], shuffledArray[j]] = [
          shuffledArray[j],
          shuffledArray[i],
        ];
      }
      return shuffledArray;
    };

    for (let i = 0; i < numberOfCards; i++) {
      const randomArray = shuffleArr(wordsArray);
      bingoArray[i] = randomArray;
    }

    const bingoObject = {
      bingoArray: bingoArray,
      bingoTitle: bingoTitle
    }
    console.log("bingoObject: ", bingoObject);

    return bingoObject;
  } catch (error) {
    throw new Error(`${error}`);
  }
}
