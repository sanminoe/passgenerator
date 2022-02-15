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
  let wordIndex = 0;
  const minLength = 7;

  const len = length < 7 ? minLength : length;

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
    passwordCharacters.push(letters[Math.floor(Math.random() * letters.length)]);
  }
  let wordInserted = {
    word: "",
    start: 0,
  };
  // generate a numbers of words. less than the maximus ( len );
  if (options.includeWords) {
    let biggest: WordInfo[] = [];

    let nWords = 1;
    // heyshe1!

    for (let i = 0; i < nWords; i++) {
      // if current length of generated word <= len; break;
      let indexShortWord = Math.floor(Math.random() * availableSpace);

      let w = getShortWord(indexShortWord < 3 ? 3 : indexShortWord);
      wordInserted = {
        word: w,
        start: 0,
      };

      let word: WordInfo = {
        word: w,
        length: w.length,
      };

      biggest.push(word);
    }

    biggest = biggest.sort((a, b) => a.length - b.length);

    // push to password characters the shortest one, and calculate available space
    // for other options.

    wordToInsert = biggest[0].word;

    // insert word at  random start

    let start = Math.floor(Math.random() * (len - wordToInsert.length));
    wordInserted.start = start;

    let mw = passwordCharacters.splice(start, wordToInsert.length, wordToInsert);
  }

  // number included
  // replace characters, leaving min 1
  // replace a random amount of letters
  let freeSlots = getFreeSlots(passwordCharacters, wordInserted.start);

  let numbersToInsert = Math.floor(Math.random() * (availableSpace - wordInserted.word.length));

  if (options.includeNumbers) {
    // get Available space left side and right side of the word inserted
    for (let i = 0; i < (numbersToInsert < 1 ? 1 : numbersToInsert); i++) {
      let generatedIndex = Math.max(0, Math.floor(Math.random() * freeSlots.length));
      let chToReplace = freeSlots[generatedIndex];
      freeSlots.splice(generatedIndex, 1);

      passwordCharacters[chToReplace] = numbers[Math.floor(Math.random() * numbers.length)];
    }
  }
  // special characters included
  // replace n of random characters.
  // not eliminating other options. i.e numbers
  let nSpecialCharacters = Math.floor(Math.random() * freeSlots.length);
  if (options.includeSymbols) {
    for (let i = 0; i < (nSpecialCharacters < 1 ? 1 : nSpecialCharacters); i++) {
      let generatedIndex = Math.floor(Math.random() * freeSlots.length);
      const chToReplace = freeSlots[generatedIndex];
      passwordCharacters[chToReplace] =
        specialCharacters[Math.floor(Math.random() * specialCharacters.length)];
      freeSlots.splice(generatedIndex, 1);
    }
  }

  // split word.if present.
  // for the uppercase alg
  if (options.includeWords) {
    let wordSplitted = passwordCharacters[wordInserted.start].split("");
    passwordCharacters.splice(wordInserted.start, 1, ...wordSplitted);
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
      let nLettersToUppercase = Math.floor(Math.random() * lettersIndexes.length);
      for (let i = 0; i < (nLettersToUppercase < 1 ? 1 : nLettersToUppercase); i++) {
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
        passwordCharacters[lettersIndexes[i]] = passwordCharacters[lettersIndexes[i]].toUpperCase();
      }
    }
  }

  return passwordCharacters.join("");
}
// for (let i = 0; i < 1; i++) {
//   generatePassword(12, {
//     includeLowerCase: true,
//     includeNumbers: false,
//     includeSymbols: false,
//     includeUpperCase: false,
//     includeWords: true,
//   });
// }

export default generatePassword;
