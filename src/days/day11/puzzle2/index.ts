enum Cell {
  Floor = ".",
  UnoccupiedSeat = "L",
  OccupiedSeat = "#"
}

interface Layout {
  width: number;
  height: number;
  cells: Array<Array<Cell>>;
}

interface Position {
  x: number;
  y: number;
}

const getCell = (layout: Layout, position: Position): Cell|null => {
  if (position.x < 0 || position.x >= layout.width || position.y < 0 || position.y >= layout.height) {
    return null;
  }
  return layout.cells[position.y][position.x];
};

const getFirstSeatInDirection = (layout: Layout, position: Position, delta: Position): Cell|null => {
  let lastPosition: Position = position;
  while (true) {
    const nextPosition: Position = { x: lastPosition.x + delta.x, y: lastPosition.y + delta.y };
    const cell = getCell(layout, nextPosition);
    if (cell !== Cell.Floor) {
      return cell;
    }
    lastPosition = nextPosition;
  }
};

const getVisibleSeats = (layout: Layout, position: Position): Array<Cell> => {
  const surroundingCells = [
    getFirstSeatInDirection(layout, position, { x: -1, y: -1 }),
    getFirstSeatInDirection(layout, position, { x: 0, y: -1 }),
    getFirstSeatInDirection(layout, position, { x: 1, y: -1 }),
    getFirstSeatInDirection(layout, position, { x: -1, y: 0 }),
    getFirstSeatInDirection(layout, position, { x: 1, y: 0 }),
    getFirstSeatInDirection(layout, position, { x: -1, y: 1 }),
    getFirstSeatInDirection(layout, position, { x: 0, y: 1 }),
    getFirstSeatInDirection(layout, position, { x: 1, y: 1 }),
  ];

  return surroundingCells.flatMap(cell => cell === null ? [] : [cell]);
};

const nextCellState = (layout: Layout, position: Position): Cell => {
  const cell = getCell(layout, position);
  if (cell === Cell.Floor) {
    return cell;
  }
  const visibleSeats = getVisibleSeats(layout, position);
  const occupiedSeats = visibleSeats.filter(cell => cell === Cell.OccupiedSeat).length;
  if (occupiedSeats === 0) {
    return Cell.OccupiedSeat;
  } else if (occupiedSeats >= 5) {
    return Cell.UnoccupiedSeat;
  } else {
    return cell!;
  }
};

const step = (layout: Layout): { layout: Layout, hasChanged: boolean } => {
  const newCells = [];
  let hasChanged = false;
  for (let y = 0; y < layout.height; y++) {
    const row = [];
    for (let x = 0; x < layout.width; x++) {
      const oldCell = getCell(layout, {x, y});
      const newCell = nextCellState(layout, {x, y});
      row.push(newCell);
      hasChanged = hasChanged || newCell !== oldCell;
    }
    newCells.push(row);
  }
  return {
    layout: {
      ...layout,
      cells: newCells
    },
    hasChanged
  };
};

const countOccupiedSeats = (layout: Layout): number => layout.cells.reduce(
  (acc, row) => acc + row.reduce(
    (acc, cell) => acc + (cell === Cell.OccupiedSeat ? 1 : 0),
    0
  ),
  0
);

const parseCell = (char: string): Cell => {
  if (!Object.values(Cell).some((c: string) => c === char)) {
    throw new Error(`Invalid character: ${char}`);
  }
  return char as Cell;
};

const parseData = (data: Array<string>): Layout => {
  const cells = data.map(row => row.split("").map(parseCell));
  return {
    width: cells[0].length,
    height: cells.length,
    cells
  };
};

const solution = (data: Array<string>): string => {
  let previousLayout = parseData(data);
  let steps = 0;
  while (true) {
    steps++;
    const { layout, hasChanged } = step(previousLayout);
    if (!hasChanged) {
      return `${countOccupiedSeats(layout)}`;
    }
    previousLayout = layout;
  }
};

export default solution;
