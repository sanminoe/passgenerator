export interface Options {
  includeUpperCase: boolean;
  includeNumbers: boolean;
  includeLowerCase: boolean;
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
