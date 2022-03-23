import { Options, WordInfo } from "../types/PassGenerator";
import getShortWord from "./getShortWord";

function generateRandomNumber(maxRange: number[]) {
  return Math.floor(Math.random() * maxRange.length - 1);
}

function getFreeSlots(arr: string[], indexExclude: number): number[] {
  // iterate array & return all index except ( index )
  let arrVal = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === indexExclude) {
      continue;
    }
    arrVal.push(i);
  }

  return arrVal;
}

function generatePassword(length: number, options: Options) {
  const minLength = 6;

  const len = length < minLength ? minLength : length;

  let wordToInsert: string = "";
  const letters: string = "abcdefghijklmnopqrstuvwxyz";
  const numbers: string = "0123456789";
  const specialCharacters: string = "!@#$%^&*()_+~`|}{[]\\:;?><,./-=";

  let availableSpace = len;

  if (options.includeLowerCase) availableSpace -= 1;
  if (options.includeNumbers) availableSpace -= 1;
  if (options.includeSymbols) availableSpace -= 1;
  if (options.includeUpperCase) availableSpace -= 1;

  let passwordCharacters: string[] = [];
  // generates a random string of a certain length of only letters;

  for (let i = 0; i < len; i++) {
    passwordCharacters.push(
      letters[Math.floor(Math.random() * letters.length)]
    );
  }

  let freeSlots = getFreeSlots(passwordCharacters, 0);
  // number included
  // replace characters, leaving min 1
  // replace a random amount of letters

  let numbersToInsert = Math.max(Math.floor(Math.random() * availableSpace), 2);

  if (options.includeNumbers) {
    // get Available space left side and right side of the word inserted
    for (let i = 0; i < (numbersToInsert < 2 ? 2 : numbersToInsert); i++) {
      let generatedIndex = Math.max(
        0,
        Math.floor(Math.random() * freeSlots.length)
      );
      let chToReplace = freeSlots[generatedIndex];
      freeSlots.splice(generatedIndex, 1);

      passwordCharacters[chToReplace] =
        numbers[Math.floor(Math.random() * numbers.length)];
    }
  }

  // special characters included
  // replace n of random characters.
  // not eliminating other options. i.e numbers
  let nSpecialCharacters = Math.floor(Math.random() * freeSlots.length) - 1;

  if (options.includeSymbols) {
    for (
      let i = 0;
      i < (nSpecialCharacters < 1 ? 1 : nSpecialCharacters);
      i++
    ) {
      let generatedIndex = Math.floor(Math.random() * freeSlots.length);
      const chToReplace = freeSlots[generatedIndex];
      passwordCharacters[chToReplace] =
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
      freeSlots.splice(generatedIndex, 1);
    }
  }

  if (options.includeUpperCase) {
    // to Uppercase
    // search for letters if present

    // convert to uppercase a random number of them

    // find letters and their index
    let lettersIndexes: number[] = [];

    passwordCharacters.forEach((c, i) => {
      if (c.search(/[a-zA-Z]/i) >= 0) {
        lettersIndexes.push(i);
      }
    });

    if (options.includeLowerCase) {
      if (lettersIndexes.length < 1) {
        return passwordCharacters.join("");
      }
      let nLettersToUppercase = Math.floor(
        Math.random() * lettersIndexes.length
      );
      for (
        let i = 0;
        i < (nLettersToUppercase < 1 ? 1 : nLettersToUppercase);
        i++
      ) {
        let r = 0;
        let n = generateRandomNumber(lettersIndexes);

        if (n < 0) {
          for (let x = 0; x < 10; x++) {
            n = generateRandomNumber(lettersIndexes);

            if (n >= 0) {
              r = n;
              break;
            }
          }
        }

        let pos = lettersIndexes[r];

        passwordCharacters[pos] = passwordCharacters[pos].toUpperCase();
      }
    } else {
      for (let i = 0; i < lettersIndexes.length; i++) {
        passwordCharacters[lettersIndexes[i]] =
          passwordCharacters[lettersIndexes[i]].toUpperCase();
      }
    }
  }

  return passwordCharacters.join("");
}

export default generatePassword;
