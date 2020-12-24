interface Coords {
  s: number;
  e: number;
}

const serializeCoords = (coords: Coords): string => `${coords.s}:${coords.e}`;

export const parseDirections = (data: string): Coords => {
  const coords: Coords = { s: 0, e: 0 };
  let index = 0;
  while (index < data.length) {
    const firstChar = data.substr(index, 1);
    if (firstChar === "e") {
      coords.e += 2;
    } else if (firstChar === "w") {
      coords.e -= 2;
    } else {
      const secondChar = data.substr(index + 1, 1);
      if (firstChar === "s") {
        coords.s++;
      } else if (firstChar === "n") {
        coords.s--;
      }
      if (secondChar === "e") {
        coords.e++;
      } else if (secondChar === "w") {
        coords.e--;
      }
      index++;
    }
    index++;
  }
  return coords;
};

const dedupe = (allCoords: Array<Coords>): Array<Coords> =>
  allCoords.reduce(
    (acc: Array<Coords>, coords) => {
      const index = acc.findIndex(c => c.s === coords.s && c.e === coords.e);
      if (index === -1) {
        acc.push(coords);
      } else {
        acc.splice(index, 1);
      }
      return acc;
    },
    []
  );

const isBlackTile = (blackTiles: Array<Coords>, coords: Coords): boolean =>
  blackTiles.findIndex(t => t.s === coords.s && t.e === coords.e) !== -1;

const getSurroundingTileCoords = (tile: Coords): Array<Coords> => [
  { s: tile.s - 1, e: tile.e + 1 }, // NE
  { s: tile.s, e: tile.e + 2 },     // E
  { s: tile.s + 1, e: tile.e + 1 }, // SE
  { s: tile.s + 1, e: tile.e - 1 }, // SW
  { s: tile.s, e: tile.e - 2 },     // W
  { s: tile.s - 1, e: tile.e - 1 }, // NW
];

const getSurroundingBlackTiles = (blackTiles: Array<Coords>, tile: Coords): Array<Coords> =>
  getSurroundingTileCoords(tile).filter(c => isBlackTile(blackTiles, c));

const getSurroundingWhiteTiles = (blackTiles: Array<Coords>, tile: Coords): Array<Coords> =>
  getSurroundingTileCoords(tile).filter(c => !isBlackTile(blackTiles, c));

const getAllWhiteTiles = (blackTiles: Array<Coords>): Array<Coords> =>
  blackTiles
    .flatMap(t => getSurroundingWhiteTiles(blackTiles, t))
    .reduce(
      (acc: Array<Coords>, t) => {
        if (acc.findIndex(c => c.s === t.s && c.e === t.e) === -1) {
          acc.push(t);
        }
        return acc;
      },
      []
    );

const flipTiles = (blackTiles: Array<Coords>): Array<Coords> => {
  const allWhiteTiles = getAllWhiteTiles(blackTiles);
  const newBlackTiles = allWhiteTiles.filter(t => getSurroundingBlackTiles(blackTiles, t).length === 2);
  const blackTilesToFlip = blackTiles.filter(t => {
    const surroundingBlackTilesCount = getSurroundingBlackTiles(blackTiles, t).length;
    return surroundingBlackTilesCount === 0 || surroundingBlackTilesCount > 2;
  });
  return dedupe([...blackTiles, ...newBlackTiles, ...blackTilesToFlip]);
};

const solution = (data: Array<string>): string => {
  let blackCoords = dedupe(data.map(parseDirections));
  for (let i = 0; i < 100; i++) {
    blackCoords = flipTiles(blackCoords);
  }
  return `${blackCoords.length}`;
};

export default solution;
