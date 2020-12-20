type TileId = number;

type Grid = Array<Array<Tile | null>>;

export interface Tile {
  id: number;
  top: string;
  right: string;
  bottom: string;
  left: string;
  imageData: Array<Array<string>>;
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

  const imageData = pixels
    .slice(1, pixels.length - 1)
    .map(row => row.split("").slice(1, row.length - 1));

  return { id, top, right, bottom, left, imageData };
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

const cloneTile = (tile: Tile): Tile => ({
  ...tile,
  imageData: tile.imageData.map(row => [...row]),
});

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

const flipImageData = (imageData: Array<Array<string>>): Array<Array<string>> =>
  imageData.map(row => [...row].reverse());

const transposeImageData = (imageData: Array<Array<string>>): Array<Array<string>> =>
  imageData[0].map((_, colIndex) => imageData.map(row => row[colIndex]));

export const rotateTile = (tile: Tile, quarterTurns = 1): Tile => {
  let rotatedTile = cloneTile(tile);
  for (let i = 0; i < quarterTurns; i++) {
    rotatedTile = {
      ...rotatedTile,
      top: reverseEdge(rotatedTile.left),
      right: `${rotatedTile.top}`,
      bottom: reverseEdge(rotatedTile.right),
      left: `${rotatedTile.bottom}`,
      imageData: flipImageData(transposeImageData(rotatedTile.imageData)),
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
  imageData: flipImageData(tile.imageData),
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
  let manipulatedTile = cloneTile(tile);
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

const stitchImageWithEdges = (grid: Grid): Array<Array<string>> => grid.reduce(
  (acc: Array<Array<string>>, gridRow) => (
    acc.concat(gridRow.reduce(
      (acc: Array<Array<string>>, tile) => {
        const baseArr = acc.length > 0 ? acc : new Array(tile!.imageData.length + 3).fill([]);
        baseArr[0] = baseArr[0].concat(tile!.id, [" "]);
        baseArr[1] = baseArr[1].concat(tile!.top, [" "]);
        baseArr[10] = baseArr[10].concat(tile!.bottom, [" "]);
        tile!.imageData.forEach(
          (imageDataRow, index) =>
            baseArr[index + 2] = baseArr[index + 2].concat([tile!.left[index + 1]], imageDataRow, [tile!.right[index + 1], " "])
        );
        return baseArr;
      },
      []
    ))
  ),
  []
);

const stitchImage = (grid: Grid): Array<Array<string>> => grid.reduce(
  (acc: Array<Array<string>>, gridRow) => (
    acc.concat(gridRow.reduce(
      (acc: Array<Array<string>>, tile) => {
        const baseArr = acc.length > 0 ? acc : new Array(tile!.imageData.length).fill([]);
        return tile!.imageData.map(
          (imageDataRow, index) => baseArr[index].concat(imageDataRow)
        );
      },
      []
    ))
  ),
  []
);

const monsterOffsets: Array<{ row: number, col: number }> = [
  { row: 0, col: 18 },
  { row: 1, col: 0 },
  { row: 1, col: 5 },
  { row: 1, col: 6 },
  { row: 1, col: 11 },
  { row: 1, col: 12 },
  { row: 1, col: 17 },
  { row: 1, col: 18 },
  { row: 1, col: 19 },
  { row: 2, col: 1 },
  { row: 2, col: 4 },
  { row: 2, col: 7 },
  { row: 2, col: 10 },
  { row: 2, col: 13 },
  { row: 2, col: 16 },
];

const monsterWidth = 20;
const monsterHeight = 3;

const removeSeaMonstersInOrientation = (image: Array<Array<string>>): Array<Array<string>> | null => {
  let monstersFound = false;
  let imageCopy = image.map(row => [...row]);

  const isMonsterAt = (row: number, col: number): boolean => {
    for (const offset of monsterOffsets) {
      if (imageCopy[row + offset.row][col + offset.col] !== "#") {
        return false;
      }
    }
    return true;
  }

  for (let row = 0; row < imageCopy.length - monsterHeight; row++) {
    for (let col = 0; col < imageCopy[0].length - monsterWidth; col++) {
      if (isMonsterAt(row, col)) {
        monstersFound = true;
        for (const offset of monsterOffsets) {
          imageCopy[row + offset.row][col + offset.col] = "O";
        }
      }
    }
  }

  return monstersFound ? imageCopy : null;
};

const removeSeaMonstersAllOrientations = (image: Array<Array<string>>): Array<Array<string>> | null => {
  let imageCopy = image.map(row => [...row]);
  for (let rot = 0; rot < 4; rot++) {
    const result = removeSeaMonstersInOrientation(imageCopy);
    if (result !== null) {
      return result;
    }
    imageCopy = flipImageData(transposeImageData(imageCopy));
  }
  return null;
};

const removeSeaMonsters = (image: Array<Array<string>>): Array<Array<string>> => {
  const result = removeSeaMonstersAllOrientations(image);
  if (result !== null) {
    return result;
  }
  const flippedResult = removeSeaMonstersAllOrientations(flipImageData(image));
  if (flippedResult !== null) {
    return flippedResult;
  }
  throw new Error("No sea monsters found");
};

const solution = (data: Array<string>): string => {
  const tiles = parseData(data);
  const filledGrid = layout(tiles);
  const image = stitchImage(filledGrid);
  const cleaned = removeSeaMonsters(image);
  const tileCount = cleaned.reduce(
    (acc, row) => acc + row.reduce(
      (acc, char) => acc + (char === "#" ? 1 : 0),
      0
    ),
    0
  );
  console.log(cleaned.map(row => row.join("")).join("\n"));
  return `${tileCount}`;
};

export default solution;
