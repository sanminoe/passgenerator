export interface Options {
  includeUpperCase: boolean;
  includeLowerCase: boolean;
  includeNumbers: boolean;
  includeSymbols: boolean;
  includeWords: boolean;
}

export interface WordInfo {
  word: string;
  length: number;
}

export interface Error {
  msg: string;
  id: string;
}

export function generatePassword(length: number, options: Options): string;
