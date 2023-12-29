export interface IMemoryData {}

export function validateMemory(memoryData: IMemoryData) {
  // this takes an object with kes of 1-16 and needs to have string values representing the words

  if (typeof memoryData !== "object") {
    throw new Error("Invalid input type.");
  }

  const values = Object.values(memoryData);
  const keys = Object.keys(memoryData);

  console.log("values in validateMemory: ", values);
  console.log("keys in validateMemory: ", keys);

  if (values.length < 2 || keys.length < 2) {
    throw new Error("Insufficient input.");
  }

  for (let i = 0; i < values.length; i++) {
    if (values[i].trim().length < 1 || typeof values[i] !== "string") {
      throw new Error("Invalid data input or missing data fields.");
    }
  }

  for (let i = 0; i < values.length; i++) {
    if (values[i].trim().length > 15) {
      throw new Error("Some of the input data is too long; use a maximum of 15 characters per word.");
    }
  }
  
  for (let i = 0; i < keys.length; i++) {
    if (keys[i].trim().length < 1 || typeof values[i] !== "string") {
      throw new Error("Invalid keys or missing data.");
    }
  }


}
