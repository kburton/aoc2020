export type Strip = Array<string>;
export type Slice = Array<Strip>;
export type Grid = Array<Slice>;
export type HyperGrid = Array<Grid>;

export const newStrip = (width: number): Strip =>
  new Array(width).fill(".");

export const newSlice = (height: number, width: number): Slice =>
  new Array(height).fill(null).map(() => newStrip(width));

export const newGrid = (depth: number, height: number, width: number): Grid =>
  new Array(depth).fill(null).map(() => newSlice(height, width));

export const extendStrip = (strip: Strip): Strip =>
  [".", ...strip, "."];

export const extendSlice = (slice: Slice): Slice =>
  [
    newStrip(slice[0].length + 2),
    ...slice.map(extendStrip),
    newStrip(slice[0].length + 2),
  ];

export const extendGrid = (grid: Grid): Grid => {
  const height = grid[0].length + 2;
  const width = grid[0][0].length + 2;

  return [
    newSlice(height, width),
    ...grid.map(extendSlice),
    newSlice(height, width),
  ];
};

export const extendHyperGrid = (hyperGrid: HyperGrid): HyperGrid => {
  const depth = hyperGrid[0].length + 2;
  const height = hyperGrid[0][0].length + 2;
  const width = hyperGrid[0][0][0].length + 2;

  return [
    newGrid(depth, height, width),
    ...hyperGrid.map(extendGrid),
    newGrid(depth, height, width),
  ];
};

interface Location {
  grid: number;
  slice: number;
  strip: number;
  cell: number;
}

const isActive = (hyperGrid: HyperGrid, location: Location): boolean => {
  const grid = hyperGrid[0];
  if (
    location.grid < 0 || location.grid >= hyperGrid.length ||
    location.slice < 0 || location.slice >= grid.length ||
    location.strip < 0 || location.strip >= grid[0].length ||
    location.cell < 0 || location.cell >= grid[0][0].length
  ) {
    return false;
  }
  return hyperGrid[location.grid][location.slice][location.strip][location.cell] === "#";
};

const countActiveNeighbours = (hyperGrid: HyperGrid, location: Location): number => {
  let count = 0;
  for (let grid = location.grid - 1; grid <= location.grid + 1; grid++) {
    for (let slice = location.slice - 1; slice <= location.slice + 1; slice++) {
      for (let strip = location.strip - 1; strip <= location.strip + 1; strip++) {
        for (let cell = location.cell - 1; cell <= location.cell + 1; cell++) {
          if (grid === location.grid && slice === location.slice && strip === location.strip && cell === location.cell) {
            continue;
          }
          if (isActive(hyperGrid, {grid, slice, strip, cell})) {
            count++;
          }
        }
      }
    }
  }
  return count;
};

export const step = (hyperGrid: HyperGrid): HyperGrid => {
  const referenceGrid = extendHyperGrid(hyperGrid);
  const workingGrid = extendHyperGrid(hyperGrid);
  for (let grid = 0; grid < referenceGrid.length; grid++) {
    for (let slice = 0; slice < referenceGrid[0].length; slice++) {
      for (let strip = 0; strip < referenceGrid[0][0].length; strip++) {
        for (let cell = 0; cell < referenceGrid[0][0][0].length; cell++) {
          const activeNeighbours = countActiveNeighbours(referenceGrid, {grid, slice, strip, cell});
          const isInitiallyActive = isActive(referenceGrid, {grid, slice, strip, cell});
          workingGrid[grid][slice][strip][cell] = isInitiallyActive
            ? ([2, 3].includes(activeNeighbours) ? "#" : ".")
            : (activeNeighbours === 3 ? "#" : ".");
        }
      }
    }
  }
  return workingGrid;
};

const countActiveCellsInStrip = (strip: Strip): number =>
  strip.reduce((acc, char) => acc + (char === "#" ? 1 : 0), 0);

const countActiveCellsInSlice = (slice: Slice): number =>
  slice.reduce((acc, strip) => acc + countActiveCellsInStrip(strip), 0);

const countActiveCellsInGrid = (grid: Grid): number =>
  grid.reduce((acc, slice) => acc + countActiveCellsInSlice(slice), 0);

const countActiveCellsInHyperGrid = (hyperGrid: HyperGrid): number =>
  hyperGrid.reduce((acc, grid) => acc + countActiveCellsInGrid(grid), 0);

const parseData = (data: Array<string>): HyperGrid =>
  [[data.map(row => row.split(""))]];

const solution = (data: Array<string>): string => {
  let hyperGrid = parseData(data);
  for (let i = 0; i < 6; i++) {
    hyperGrid = step(hyperGrid);
  }
  const activeCells = countActiveCellsInHyperGrid(hyperGrid);
  return `${activeCells}`;
};

export default solution;
