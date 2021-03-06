import solution, {parseTile, rotateTile, flipTile, Tile} from ".";

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
  describe("puzzle 2", () => {
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
        imageData: [
          "#..#....".split(""),
          "...##..#".split(""),
          "###.#...".split(""),
          "#.##.###".split(""),
          "#...#.##".split(""),
          "#.#.#..#".split(""),
          ".#....#.".split(""),
          "##...#.#".split(""),
        ]
      };
      expect(parseTile(data)).toEqual(expected);
    });

    it("rotates imageData correctly", () => {
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
      const tile = parseTile(tileData);
      const expectedImageData = [
        "#.####.#".split(""),
        "##...#..".split(""),
        "..#.##..".split(""),
        "....#.##".split(""),
        "..##.##.".split(""),
        "#...#...".split(""),
        ".#.##...".split(""),
        "#.###.#.".split("")
      ];
      const rotatedTile = rotateTile(tile);
      expect(rotatedTile.imageData).toEqual(expectedImageData);
      expect(rotateTile(rotatedTile, 3)).toEqual(tile);
    });

    it("flips imageData correctly", () => {
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
      const tile = parseTile(tileData);
      const expectedImageData = [
        "....#..#".split(""),
        "#..##...".split(""),
        "...#.###".split(""),
        "###.##.#".split(""),
        "##.#...#".split(""),
        "#..#.#.#".split(""),
        ".#....#.".split(""),
        "#.#...##".split(""),
      ];
      const flippedTile = flipTile(tile);
      expect(flippedTile.imageData).toEqual(expectedImageData);
      expect(flipTile(flippedTile)).toEqual(tile);
    });

    it("calculates the correct value for the example data", () => {
      expect(solution(exampleData)).toEqual("273");
    });
  });
});
