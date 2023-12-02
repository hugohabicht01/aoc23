import { example1, input } from "./input";

type Game = { red: number; blue: number; green: number };

function ensure<T>(input: T | null | undefined): T {
  if (input === null || input === undefined) {
    throw new Error("shouldnt happen");
  }
  return input;
}

type Colour = "blue" | "green" | "red";

type CubeString = `${number} ${Colour}`;

function parseCube(input: CubeString) {
  const match = ensure(input.match(/(\d+) (blue|red|green)/));
  const amount = Number(match[1]) as number;
  const colour = match[2] as Colour;
  return { amount, colour };
}

function parseGame(game: string) {
  const amounts: Game = { green: 0, blue: 0, red: 0 };
  const sets = game.split(";");

  for (const set of sets) {
    const cubes = set.split(",");
    for (const cube of cubes) {
      const parsed = parseCube(cube as CubeString);

      // set highest
      const prev = amounts[parsed.colour];
      if (prev < parsed.amount) {
        amounts[parsed.colour] = parsed.amount;
      }
    }
  }

  return amounts;
}

function isPossible(game: Game, allowed: Game) {
  if (game.red > allowed.red) {
    return false;
  } else if (game.blue > allowed.blue) {
    return false;
  } else if (game.green > allowed.green) {
    return false;
  }

  return true;
}

function task1(input: string) {
  const allowed: Game = { red: 12, green: 13, blue: 14 };
  const games: Game[] = [];

  for (const line of input.split("\n")) {
    const match = line.match(/Game (\d+):/);
    if (!match) {
      continue;
    }

    const dotPosition = ensure(line.match(/:/));
    const dataStart = ensure(dotPosition.index) + 2; // 2 for the space + starting letter

    const gamePart = line.substring(dataStart);
    const amounts = parseGame(gamePart);

    // Id = index + 1
    games.push(amounts);
  }

  let idSum = 0;
  for (const [index, game] of games.entries()) {
    if (isPossible(game, allowed)) {
      idSum += index + 1;
    }
  }

  return idSum;
}

function computePower(game: Game) {
  return game.green * game.red * game.blue;
}

function task2(input: string) {
  const games: Game[] = [];

  for (const line of input.split("\n")) {
    const match = line.match(/Game (\d+):/);
    if (!match) {
      continue;
    }

    const dotPosition = ensure(line.match(/:/));
    const dataStart = ensure(dotPosition.index) + 2; // 2 for the space + starting letter

    const gamePart = line.substring(dataStart);
    const amounts = parseGame(gamePart);

    // Id = index + 1
    games.push(amounts);
  }

  let sum = 0;
  for (const game of games) {
    sum += computePower(game);
  }
  return sum;
}

console.log(task2(input));
