type TileId = number;

type Grid = Array<Array<Tile | null>>;

export interface Tile {
  id: number;
  top: string;
  right: string;
  bottom: string;
  left: string;
}

interface Constraints {
  top: string | null;
  left: string | null;
}

interface EdgeMatches {
  top: Array<TileId>;
  right: Array<TileId>;
  bottom: Array<TileId>;
  left: Array<TileId>;
}

export const parseTile = (tileData: Array<string>): Tile => {
  const idRegex = /Tile (\d+):/;
  const matches = tileData[0].match(idRegex);
  if (!matches) {
    throw new Error(`Invalid tile header: ${tileData[0]}`);
  }
  const id = parseInt(matches[1], 10);

  const pixels = tileData.slice(1);
  const top = pixels[0];
  const bottom = pixels[pixels.length - 1];
  const left = pixels.map(row => row[0]).join("");
  const right = pixels.map(row => row[row.length - 1]).join("");

  return { id, top, right, bottom, left };
};

export const parseData = (data: Array<string>): Array<Tile> => {
  const tiles: Array<Tile> = [];
  let startOfTile = 0;
  for (let i = 0; i < data.length; i++) {
    if (data[i] === "") {
      tiles.push(parseTile(data.slice(startOfTile, i)));
      startOfTile = i + 1;
    }
  }
  if (startOfTile < data.length) {
    tiles.push(parseTile(data.slice(startOfTile)));
  }
  return tiles;
};

const reverseEdge = (edge: string): string => [...edge].reverse().join("");

const findSingleEdgeMatches = (edge: string, pool: Array<Tile>): Array<TileId> => {
  const matches: Array<TileId> = [];
  for (const tile of pool) {
    if (
      tile.top === edge || reverseEdge(tile.top) === edge ||
      tile.right === edge || reverseEdge(tile.right) === edge ||
      tile.bottom === edge || reverseEdge(tile.bottom) === edge ||
      tile.left === edge || reverseEdge(tile.left) === edge
    ) {
      matches.push(tile.id);
    }
  }
  return matches;
};

const findEdgeMatches = (tile: Tile, pool: Array<Tile>): EdgeMatches => {
  return {
    top: findSingleEdgeMatches(tile.top, pool),
    right: findSingleEdgeMatches(tile.right, pool),
    bottom: findSingleEdgeMatches(tile.bottom, pool),
    left: findSingleEdgeMatches(tile.left, pool),
  };
};

export const rotateTile = (tile: Tile, quarterTurns = 1): Tile => {
  let rotatedTile = tile;
  for (let i = 0; i < quarterTurns; i++) {
    rotatedTile = {
      ...rotatedTile,
      top: reverseEdge(rotatedTile.left),
      right: `${rotatedTile.top}`,
      bottom: reverseEdge(rotatedTile.right),
      left: `${rotatedTile.bottom}`,
    }
  }
  return rotatedTile;
};

export const flipTile = (tile: Tile): Tile => ({
  ...tile,
  top: reverseEdge(tile.top),
  right: `${tile.left}`,
  bottom: reverseEdge(tile.bottom),
  left: `${tile.right}`,
});

export const findTopLeftCorner = (tiles: Array<Tile>): { tile: Tile, pool: Array<Tile> } => {
  for (const tile of tiles) {
    const pool = tiles.filter(t => t.id !== tile.id);
    const edgeMatches = findEdgeMatches(tile, pool);
    if (edgeMatches.left.length === 0 && edgeMatches.top.length === 0) {
      return { tile: {...tile}, pool };
    } else if (edgeMatches.bottom.length === 0 && edgeMatches.left.length === 0) {
      return { tile: rotateTile(tile), pool };
    } else if (edgeMatches.right.length === 0 && edgeMatches.bottom.length === 0) {
      return { tile: rotateTile(tile, 2), pool };
    } else if (edgeMatches.top.length === 0 && edgeMatches.right.length === 0) {
      return { tile: rotateTile(tile, 3), pool };
    }
  }
  throw new Error("No corner tile found");
};

const findNextEmptySpace = (grid: Grid): { row: number, col: number } | null => {
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] === null) {
        return { row, col };
      }
    }
  }
  return null;
}

const findCandidateRotations = (constraints: Constraints, tile: Tile): Array<Tile> => {
  const candidates: Array<Tile> = [];
  let manipulatedTile = { ...tile };
  for (let rot = 0; rot < 4; rot++) {
    const topConstraintValid = constraints.top === null || constraints.top === manipulatedTile.top;
    const leftConstraintValid = constraints.left === null || constraints.left === manipulatedTile.left;
    if (topConstraintValid && leftConstraintValid) {
      candidates.push(manipulatedTile);
    }
    manipulatedTile = rotateTile(manipulatedTile);
  }
  return candidates;
}

const findCandidates = (constraints: Constraints, pool: Array<Tile>): Array<Tile> => {
  let candidates: Array<Tile> = [];
  for (const tile of pool) {
    candidates = candidates.concat(findCandidateRotations(constraints, tile));
    candidates = candidates.concat(findCandidateRotations(constraints, flipTile(tile)))
  }
  return candidates;
};

const cloneGrid = (grid: Grid): Grid => grid.map(row => [...row]);

const fillGrid = (grid: Grid, pool: Array<Tile>): Grid | null => {
  const nextEmptySpace = findNextEmptySpace(grid);
  if (nextEmptySpace === null) {
    return grid;
  }
  const { row, col } = nextEmptySpace;

  const constraints: Constraints = {
    top: row === 0 ? null : grid[row - 1][col]?.bottom ?? null,
    left: col === 0 ? null : grid[row][col - 1]?.right ?? null,
  };
  const candidates = findCandidates(constraints, pool);

  for (const candidate of candidates) {
    const newPool = pool.filter(t => t.id !== candidate.id);
    const newGrid = cloneGrid(grid);
    newGrid[row][col] = candidate;
    const filledGrid = fillGrid(newGrid, newPool);
    if (filledGrid !== null) {
      return filledGrid;
    }
  }

  return null;
};

const layout = (tiles: Array<Tile>): Grid => {
  const gridSize = Math.sqrt(tiles.length);
  const grid: Grid = Array(gridSize).fill(null).map(() => Array(gridSize).fill(null));
  const { tile, pool } = findTopLeftCorner(tiles);
  grid[0][0] = tile;
  const filledGrid = fillGrid(grid, pool);
  if (filledGrid === null) {
    throw new Error("Failed to fill grid");
  }
  return filledGrid;
};

const solution = (data: Array<string>): string => {
  const tiles = parseData(data);
  const filledGrid = layout(tiles);
  const topLeft = filledGrid[0][0]!;
  const topRight = filledGrid[0][filledGrid[0].length - 1]!;
  const bottomLeft = filledGrid[filledGrid.length - 1][0]!;
  const bottomRight = filledGrid[filledGrid.length - 1][filledGrid[0].length - 1]!;
  const result = topLeft.id * topRight.id * bottomLeft.id * bottomRight.id;
  return `${result}`;
};

export default solution;
