import solution, {Tile, parseTile, parseData, rotateTile, flipTile, findTopLeftCorner} from ".";

const exampleData: Array<string> = [
  "Tile 2311:",
  "..##.#..#.",
  "##..#.....",
  "#...##..#.",
  "####.#...#",
  "##.##.###.",
  "##...#.###",
  ".#.#.#..##",
  "..#....#..",
  "###...#.#.",
  "..###..###",
  "",
  "Tile 1951:",
  "#.##...##.",
  "#.####...#",
  ".....#..##",
  "#...######",
  ".##.#....#",
  ".###.#####",
  "###.##.##.",
  ".###....#.",
  "..#.#..#.#",
  "#...##.#..",
  "",
  "Tile 1171:",
  "####...##.",
  "#..##.#..#",
  "##.#..#.#.",
  ".###.####.",
  "..###.####",
  ".##....##.",
  ".#...####.",
  "#.##.####.",
  "####..#...",
  ".....##...",
  "",
  "Tile 1427:",
  "###.##.#..",
  ".#..#.##..",
  ".#.##.#..#",
  "#.#.#.##.#",
  "....#...##",
  "...##..##.",
  "...#.#####",
  ".#.####.#.",
  "..#..###.#",
  "..##.#..#.",
  "",
  "Tile 1489:",
  "##.#.#....",
  "..##...#..",
  ".##..##...",
  "..#...#...",
  "#####...#.",
  "#..#.#.#.#",
  "...#.#.#..",
  "##.#...##.",
  "..##.##.##",
  "###.##.#..",
  "",
  "Tile 2473:",
  "#....####.",
  "#..#.##...",
  "#.##..#...",
  "######.#.#",
  ".#...#.#.#",
  ".#########",
  ".###.#..#.",
  "########.#",
  "##...##.#.",
  "..###.#.#.",
  "",
  "Tile 2971:",
  "..#.#....#",
  "#...###...",
  "#.#.###...",
  "##.##..#..",
  ".#####..##",
  ".#..####.#",
  "#..#.#..#.",
  "..####.###",
  "..#.#.###.",
  "...#.#.#.#",
  "",
  "Tile 2729:",
  "...#.#.#.#",
  "####.#....",
  "..#.#.....",
  "....#..#.#",
  ".##..##.#.",
  ".#.####...",
  "####.#.#..",
  "##.####...",
  "##..#.##..",
  "#.##...##.",
  "",
  "Tile 3079:",
  "#.#.#####.",
  ".#..######",
  "..#.......",
  "######....",
  "####.#..#.",
  ".#...#.##.",
  "#.#####.##",
  "..#.###...",
  "..#.......",
  "..#.###..."
];

describe("Day 20", () => {
  describe("puzzle 1", () => {
    it("parses tiles correctly", () => {
      const data = [
        "Tile 2311:",
        "..##.#..#.",
        "##..#.....",
        "#...##..#.",
        "####.#...#",
        "##.##.###.",
        "##...#.###",
        ".#.#.#..##",
        "..#....#..",
        "###...#.#.",
        "..###..###",
      ];
      const expected: Tile = {
        id: 2311,
        top: "..##.#..#.",
        right: "...#.##..#",
        bottom: "..###..###",
        left: ".#####..#.",
      };
      expect(parseTile(data)).toEqual(expected);
    });

    it("parses data correctly", () => {
      const data = [
        "Tile 2311:",
        "..##.#..#.",
        "##..#.....",
        "#...##..#.",
        "####.#...#",
        "##.##.###.",
        "##...#.###",
        ".#.#.#..##",
        "..#....#..",
        "###...#.#.",
        "..###..###",
        "",
        "Tile 1951:",
        "#.##...##.",
        "#.####...#",
        ".....#..##",
        "#...######",
        ".##.#....#",
        ".###.#####",
        "###.##.##.",
        ".###....#.",
        "..#.#..#.#",
        "#...##.#..",
      ];
      const expected: Array<Tile> = [
        {
          id: 2311,
          top: "..##.#..#.",
          right: "...#.##..#",
          bottom: "..###..###",
          left: ".#####..#.",
        },
        {
          id: 1951,
          top: "#.##...##.",
          right: ".#####..#.",
          bottom: "#...##.#..",
          left: "##.#..#..#",
        },
      ];
      expect(parseData(data)).toEqual(expected);
    });

    it("rotates tiles correctly", () => {
      const tileData = [
        "Tile 2311:",
        "..##.#..#.",
        "##..#.....",
        "#...##..#.",
        "####.#...#",
        "##.##.###.",
        "##...#.###",
        ".#.#.#..##",
        "..#....#..",
        "###...#.#.",
        "..###..###",
      ];
      const originalTile = parseTile(tileData);
      const rotatedOnce = rotateTile(originalTile);
      const rotatedTwice = rotateTile(originalTile, 2);
      const rotatedFourTimes = rotateTile(originalTile, 4);

      expect(rotatedOnce).toEqual({
        id: 2311,
        top: ".#..#####.",
        right: "..##.#..#.",
        bottom: "#..##.#...",
        left: "..###..###",
      });

      expect(rotatedTwice).toEqual({
        id: 2311,
        top: "###..###..",
        right: ".#..#####.",
        bottom: ".#..#.##..",
        left: "#..##.#...",
      });

      expect(rotatedFourTimes).toEqual(originalTile);
    });

    it("flips tiles correctly", () => {
      const tileData = [
        "Tile 2311:",
        "..##.#..#.",
        "##..#.....",
        "#...##..#.",
        "####.#...#",
        "##.##.###.",
        "##...#.###",
        ".#.#.#..##",
        "..#....#..",
        "###...#.#.",
        "..###..###",
      ];
      const originalTile = parseTile(tileData);
      const flippedOnce = flipTile(originalTile);
      const flippedTwice = flipTile(flippedOnce);

      expect(flippedOnce).toEqual({
        id: 2311,
        top: ".#..#.##..",
        right: ".#####..#.",
        bottom: "###..###..",
        left: "...#.##..#",
      });

      expect(flippedTwice).toEqual(originalTile);
    });

    it("finds top left corner in the example data", () => {
      const tiles = parseData(exampleData);
      const { tile, pool } = findTopLeftCorner(tiles);
      expect(tile).toEqual({
        id: 1951,
        top: "#..#..#.##",
        right: "#.##...##.",
        bottom: ".#..#####.",
        left: "#...##.#..",
      });
      expect(pool).toEqual(tiles.filter(t => t.id !== tile.id));
    });

    it("calculates the correct value for the example data", () => {
      expect(solution(exampleData)).toEqual("20899048083289");
    });
  });
});
