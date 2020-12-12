type CompassDirection = 0 | 90 | 180 | 270; // NESW

interface Position {
  lat: number;
  long: number;
}

interface Ship {
  position: Position;
  waypoint: Position;
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

const moveShipForwards = (ship: Ship, units: number): Ship => ({
  ...ship,
  position: {
    lat: ship.position.lat + (ship.waypoint.lat * units),
    long: ship.position.long + (ship.waypoint.long * units),
  }
});

const moveWaypoint = (waypoint: Position, direction: CompassDirection, distance: number): Position => {
  switch (direction) {
    case 0:
      return { ...waypoint, lat: waypoint.lat + distance };
    case 90:
      return { ...waypoint, long: waypoint.long + distance };
    case 180:
      return { ...waypoint, lat: waypoint.lat - distance };
    case 270:
      return { ...waypoint, long: waypoint.long - distance };
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

const rotateWaypointRightOnce = (waypoint: Position): Position => ({
  lat: -waypoint.long,
  long: waypoint.lat
});

const rotateWaypoint = (waypoint: Position, instruction: RotationMovement): Position => {
  const normalisedAngle = angleToDirection(
    instruction.direction === "R" ? instruction.angle : 360 - instruction.angle
  );
  const timesToRotateRight = normalisedAngle / 90;
  let newWaypoint = waypoint;
  for (let i = 0; i < timesToRotateRight; i++) {
    newWaypoint = rotateWaypointRightOnce(newWaypoint);
  }
  return newWaypoint;
};

const move = (ship: Ship, instruction: Instruction): Ship => {
  switch (instruction.type) {
    case "forward":
      return moveShipForwards(ship, instruction.distance);
    case "compass":
      return {
        ...ship,
        waypoint: moveWaypoint(ship.waypoint, instruction.direction, instruction.distance)
      };
    case "rotation":
      return {
        ...ship,
        waypoint: rotateWaypoint(ship.waypoint, instruction)
      }
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
  const initialShip: Ship = {
    position: { lat: 0, long: 0 },
    waypoint: { lat: 1, long: 10 }
  };
  const newShip = instructions.reduce(move, initialShip);
  return `${manhattanDistance(initialShip.position, newShip.position)}`;
};

export default solution;
