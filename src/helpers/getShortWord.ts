import * as wordList from "word-list-json";

function getShortWord(length: number) {
  let words = wordList as string[];

  // find last word <= than (length)
  let lastWordIndex = words.findIndex((v, i) => {
    if (v.length === length + 1) {
      return i;
    }
    return;
  });

  let wordsRange = words.slice(124, lastWordIndex);

  return wordsRange[Math.floor(Math.random() * wordsRange.length)];
}

export default getShortWord;
