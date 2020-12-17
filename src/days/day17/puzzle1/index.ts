export type Strip = Array<string>;
export type Slice = Array<Strip>;
export type Grid = Array<Slice>;

export const newStrip = (width: number): Strip =>
  new Array(width).fill(".");

export const newSlice = (height: number, width: number): Slice =>
  new Array(height).fill(null).map(() => newStrip(width));

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

interface Location {
  slice: number;
  strip: number;
  cell: number;
}

const isActive = (grid: Grid, location: Location): boolean => {
  if (
    location.slice < 0 || location.slice >= grid.length ||
    location.strip < 0 || location.strip >= grid[0].length ||
    location.cell < 0 || location.cell >= grid[0][0].length
  ) {
    return false;
  }
  return grid[location.slice][location.strip][location.cell] === "#";
};

const countActiveNeighbours = (grid: Grid, location: Location): number => {
  let count = 0;
  for (let slice = location.slice - 1; slice <= location.slice + 1; slice++) {
    for (let strip = location.strip - 1; strip <= location.strip + 1; strip++) {
      for (let cell = location.cell - 1; cell <= location.cell + 1; cell++) {
        if (slice === location.slice && strip === location.strip && cell === location.cell) {
          continue;
        }
        if (isActive(grid, {slice, strip, cell})) {
          count++;
        }
      }
    }
  }
  return count;
};

export const step = (grid: Grid): Grid => {
  const referenceGrid = extendGrid(grid);
  const workingGrid = extendGrid(grid);
  for (let slice = 0; slice < referenceGrid.length; slice++) {
    for (let strip = 0; strip < referenceGrid[0].length; strip++) {
      for (let cell = 0; cell < referenceGrid[0][0].length; cell++) {
        const activeNeighbours = countActiveNeighbours(referenceGrid, {slice, strip, cell});
        const isInitiallyActive = isActive(referenceGrid, {slice, strip, cell});
        workingGrid[slice][strip][cell] = isInitiallyActive
          ? ([2, 3].includes(activeNeighbours) ? "#" : ".")
          : (activeNeighbours === 3 ? "#" : ".");
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

const parseData = (data: Array<string>): Grid =>
  [data.map(row => row.split(""))];

const solution = (data: Array<string>): string => {
  let grid = parseData(data);
  for (let i = 0; i < 6; i++) {
    grid = step(grid);
  }
  const activeCells = countActiveCellsInGrid(grid);
  return `${activeCells}`;
};

export default solution;
