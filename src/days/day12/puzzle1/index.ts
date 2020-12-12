type CompassDirection = 0 | 90 | 180 | 270; // NESW

interface Position {
  lat: number;
  long: number;
  direction: CompassDirection;
}

interface RotationMovement {
  type: "rotation";
  direction: "L" | "R";
  angle: number;
}

interface ForwardMovement {
  type: "forward";
  distance: number;
}

interface CompassMovement {
  type: "compass";
  direction: CompassDirection;
  distance: number;
}

type Instruction = RotationMovement | ForwardMovement | CompassMovement;

const moveInDirection = (position: Position, direction: CompassDirection, distance: number): Position => {
  switch (direction) {
    case 0:
      return { ...position, lat: position.lat + distance };
    case 90:
      return { ...position, long: position.long + distance };
    case 180:
      return { ...position, lat: position.lat - distance };
    case 270:
      return { ...position, long: position.long - distance };
  }
};

const angleToDirection = (angle: number): CompassDirection => {
  const normalisedAngle = (angle + 360) % 360;
  switch (normalisedAngle) {
    default:
      throw new Error(`Invalid angle: ${angle}`);
    case 0:
    case 90:
    case 180:
    case 270:
      return normalisedAngle;
  }
};

const rotate = (position: Position, instruction: RotationMovement): Position => {
  switch (instruction.direction) {
    case "L":
      return {
        ...position,
        direction: angleToDirection(position.direction - instruction.angle)
      };
    case "R":
      return {
        ...position,
        direction: angleToDirection(position.direction + instruction.angle)
      };
  }
};

const move = (position: Position, instruction: Instruction): Position => {
  switch (instruction.type) {
    case "forward":
      return moveInDirection(position, position.direction, instruction.distance);
    case "compass":
      return moveInDirection(position, instruction.direction, instruction.distance);
    case "rotation":
      return rotate(position, instruction)
  }
};

const manhattanDistance = (position1: Position, position2: Position): number => {
  const latDiff = Math.abs(position1.lat - position2.lat);
  const longDiff = Math.abs(position1.long - position2.long);
  return latDiff + longDiff;
};

const parseCompassDirection = (direction: "N" | "E" | "S" | "W"): CompassDirection => {
  switch (direction) {
    case "N":
      return 0;
    case "E":
      return 90;
    case "S":
      return 180;
    case "W":
      return 270;
  }
};

const parseInstruction = (line: string): Instruction => {
  const regex = /^([NSEWLRF])(\d+)$/;
  const matches = line.match(regex);
  if (!matches) {
    throw new Error(`Invalid instruction: ${line}`);
  }
  const num = parseInt(matches[2], 10);

  switch (matches[1]) {
    default:
      throw new Error(`Invalid movement type: ${matches[1]}`);
    case "L":
    case "R":
      return {
        type: "rotation",
        direction: matches[1],
        angle: num % 360
      };
    case "F":
      return {
        type: "forward",
        distance: num
      };
    case "N":
    case "E":
    case "S":
    case "W":
      return {
        type: "compass",
        direction: parseCompassDirection(matches[1]),
        distance: num
      }
  }
};

const solution = (data: Array<string>): string => {
  const instructions = data.map(parseInstruction);
  const initialPosition: Position = { lat: 0, long: 0, direction: parseCompassDirection("E") };
  const newPosition = instructions.reduce(move, initialPosition);
  return `${manhattanDistance(initialPosition, newPosition)}`;
};

export default solution;
