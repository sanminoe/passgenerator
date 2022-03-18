import * as wordList from "word-list-json";
let wordsL = wordList as string[];

interface PhraseOptions {
  separator: string;
  includelowercase: boolean;
  includeuppercase: boolean;
}

const generatePhrase = (
  length: number,
  { separator, includelowercase, includeuppercase }: PhraseOptions
) => {
  let words: string[] = [];

  for (let i = 0; i < length; i++) {
    if (includelowercase && includeuppercase === false) {
      words.push(
        wordsL[Math.floor(Math.random() * wordsL.length)].toLowerCase()
      );
    } else if (includeuppercase && includelowercase === false) {
      words.push(
        wordsL[Math.floor(Math.random() * wordsL.length)].toUpperCase()
      );
    } else {
      words.push(wordsL[Math.floor(Math.random() * wordsL.length)]);
    }
  }

  for (let i = 0; i < words.length; i++) {
    let rIndex = Math.floor(Math.random() * words.length);

    if (includeuppercase && includelowercase) {
      words[rIndex] = words[rIndex].toUpperCase();
    } else {
      break;
    }
  }
  return words.join(separator);
};

export default generatePhrase;
