export interface IPartnersData {
  words: string;
  options: string;
}

export function validatePartners(partnersData: IPartnersData) {
  if (
    !(
      partnersData.options === "rhyme" ||
      partnersData.options === "synonym" ||
      partnersData.options === "antonym"
    )
  ) {
    throw new Error("Invalid options.");
  }

  if (partnersData.words.length === 0) {
    throw new Error("Invalid words input.");
  }

  if (partnersData.words.length > 12) {
    throw new Error("Too many words; 12 is the current maximum.");
  }
}
