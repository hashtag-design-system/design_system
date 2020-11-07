import { GenerateIdParams } from "../typings";

/**
 * Generates a unique identifier (ID)
 * @param {object} options
 * @param {number} options.length - How long the ID to be
 * @param {string=} options.specialCharacters - A string with special characters to apply. Its default value is "@#./&-_"
 * @param {boolean=} options.lowerCase - Indicates if to use lower case letters
 * @param {boolean=} options.upperCase - Indicates if to use upper case letters
 * @param {boolean=} options.numbersOnly - Indicates if to use only numbers, and not other characters
 * @param {boolean=} options.numbers - Indicates if to use numbers
 * @returns {string} The generated ID (string)
 */
export const generateId = ({
  length,
  specialCharacters = "@#./&-_",
  lowerCase = true,
  upperCase = true,
  numbersOnly = false,
  numbers = true,
}: GenerateIdParams): string => {
  let result = "";
  let characters = "";
  if (lowerCase) {
    characters = characters.concat("abcdefghijklmnopqrstuvwxyz");
  }
  if (upperCase) {
    characters = characters.concat("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
  }
  if (numbers) {
    characters = characters.concat("0123456789");
  }
  if (numbersOnly) {
    characters = "0123456789";
  }
  if (specialCharacters) {
    characters = characters.concat(specialCharacters);
  }
  const charactersLength = characters.length;
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};
