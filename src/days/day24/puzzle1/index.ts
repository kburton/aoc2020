type Direction = "ne" | "e" | "se" | "sw" | "w" | "nw";

type Directions = Array<Direction>;

export const parseDirections = (data: string): Directions => {
  const directions: Directions = [];
  let index = 0;
  while (index < data.length) {
    const oneChar = data.substr(index, 1);
    const twoChars = data.substr(index, 2);
    switch (oneChar) {
      case "e":
      case "w":
        directions.push(oneChar);
        index++;
    }
    switch (twoChars) {
      case "ne":
      case "se":
      case "sw":
      case "nw":
        directions.push(twoChars);
        index += 2;
    }
  }
  return directions;
};

const directionToSouthOffset = (direction: Direction): number => {
  if (direction.startsWith("s")) {
    return 1;
  } else if (direction.startsWith("n")) {
    return -1;
  } else {
    return 0;
  }
};

const directionToEastOffset = (direction: Direction): number => {
  if (direction === "e") {
    return 2;
  } else if (direction === "w") {
    return -2;
  } else if (direction.endsWith("e")) {
    return 1;
  } else if (direction.endsWith("w")) {
    return -1;
  }
  throw new Error(`Invalid direction: ${direction}`);
};

const directionsToCoords = (directions: Directions): string => {
  let s = 0;
  let e = 0;
  for (const direction of directions) {
    s += directionToSouthOffset(direction);
    e += directionToEastOffset(direction);
  }
  return `${s}:${e}`;
};

const removePairs = (coords: Array<string>): Array<string> =>
  [...coords.reduce((acc, c) => {
    if (acc.has(c)) {
      acc.delete(c);
    } else {
      acc.add(c);
    }
    return acc;
  }, new Set<string>())];

const solution = (data: Array<string>): string => {
  const allDirections = data.map(parseDirections);
  const allCoords = allDirections.map(directionsToCoords);
  const simplified = removePairs(allCoords);
  return `${simplified.length}`;
};

export default solution;
