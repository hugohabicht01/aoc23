import { example, example2, input } from "./input";

namespace task1 {
  type UpperCaseCharacter =
    | "A"
    | "B"
    | "C"
    | "D"
    | "E"
    | "F"
    | "G"
    | "H"
    | "I"
    | "J"
    | "K"
    | "L"
    | "M"
    | "N"
    | "O"
    | "P"
    | "Q"
    | "R"
    | "S"
    | "T"
    | "U"
    | "V"
    | "W"
    | "X"
    | "Y"
    | "Z";

  type Digit = "1" | "2" | "3" | "4" | "5" | "6" | "7" | "8" | "9" | "0";
  type char = UpperCaseCharacter | Lowercase<UpperCaseCharacter> | Digit;

  const isDigit = (character: char): boolean =>
    character.length == 1 && Number.isInteger(Number(character));

  const findFirstDigit = (line: char[]): char =>
    isDigit(line[0]) ? line[0] : findFirstDigit(line.slice(1));

  const findLastDigit = (line: char[]): char =>
    isDigit(line[line.length - 1] as char)
      ? line[line.length - 1]
      : findLastDigit(line.slice(0, -1));

  export const task1 = (input: string) =>
    input
      .split("\n")
      .map((l) => l.split(""))
      .map((l) => [findFirstDigit(l), findLastDigit(l)])
      .reduce((acc, cur) => acc + Number(`${cur[0]}${cur[1]}`), 0);
}

// console.log(task1.task1(input));

namespace task2 {
  const numAsWords = [
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const numLookup = {
    one: 1,
    two: 2,
    three: 3,
    four: 4,
    five: 5,
    six: 6,
    seven: 7,
    eight: 8,
    nine: 9,
  };

  const digits = ["1", "2", "3", "4", "5", "6", "7", "8", "9"];

  const numbers = [...digits, ...numAsWords];

  const convertToNumber = (numberWord: keyof typeof numLookup): number => {
    if (numberWord.length == 1) {
      return Number(numberWord);
    }
    return numLookup[numberWord];
  };

  function findFirstNumber(line: string) {
    let lowestIndex = Number.MAX_VALUE;
    let foundString = "";

    for (const num of numbers) {
      const res = line.match(num);
      if (res != null) {
        if ((res.index as number) < lowestIndex) {
          lowestIndex = res.index as number;
          foundString = num;
          if (lowestIndex === 0) {
            break;
          }
        }
      }
    }

    // @ts-ignore
    return convertToNumber(foundString);
  }

  export function findLastNumber(line: string) {
    let highestIndex = -1;
    let foundString = "";
    for (const num of numbers) {
      const regex = new RegExp(num, 'g')
      const res = [...line.matchAll(regex)];
      if (res.length != 0) {

        if ((res.at(-1)!.index as number) > highestIndex) {
          highestIndex = res.at(-1)!.index as number;
          foundString = num;
          if (highestIndex === line.length - 1) {
            break;
          }
        }
      }
    }

    // @ts-ignore
    const digit = convertToNumber(foundString);
    if (digit == undefined) {
      console.log({ foundString })
      console.log(line)
    }
    return digit;
  }

  export function task2(input: string) {
    return input
      .split("\n")
      .map((line) => `${findFirstNumber(line)}${findLastNumber(line)}`)
      .reduce((acc, cur) => acc + Number(cur), 0);
  }

}
console.log(task2.task2(input))
