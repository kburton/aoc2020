import solution, {Strip, Slice, Grid, newStrip, newSlice, extendStrip, extendSlice, extendGrid, step} from ".";

const formatStrip = (strip: Strip): string => strip.join("");
const formatSlice = (slice: Slice): string => slice.map(formatStrip).join("\n");
const formatGrid = (grid: Grid): string => grid.map(formatSlice).join("\n\n");

const parseStrip = (str: string): Strip => str.trim().split("");
const parseSlice = (str: string): Slice => str.trim().split("\n").map(parseStrip);
const parseGrid = (str: string): Grid => str.trim().split("\n\n").map(parseSlice);

describe("Day 17", () => {
  describe("puzzle 1", () => {
    it("generates new strip correctly", () => {
      expect(newStrip(5)).toEqual([".", ".", ".", ".", "."]);
    });

    it("generates new slice correctly", () => {
      expect(newSlice(3, 2)).toEqual([[".", "."], [".", "."], [".", "."]]);
    });

    it("extends strip correctly", () => {
      expect(extendStrip(["#", "#"])).toEqual([".", "#", "#", "."]);
    });

    it("extends slice correctly", () => {
      const slice = parseSlice(`
        ##
        ##
        ##
      `);

      const expected = parseSlice(`
        ....
        .##.
        .##.
        .##.
        ....
      `);

      expect(formatSlice(extendSlice(slice))).toEqual(formatSlice(expected));
    });

    it("extends grid correctly", () => {
      const grid = parseGrid(`
        ##
        ##
        ##
      `);
      const expected = parseGrid(`
        ....
        ....
        ....
        ....
        ....

        ....
        .##.
        .##.
        .##.
        ....

        ....
        ....
        ....
        ....
        ....
      `);
      expect(formatGrid(extendGrid(grid))).toEqual(formatGrid(expected));
    });

    it("steps through the example data correctly", () => {
      const grid = parseGrid(`
        .#.
        ..#
        ###
      `);
      const expected = parseGrid(`
        .....
        .....
        .#...
        ...#.
        ..#..
        
        .....
        .....
        .#.#.
        ..##.
        ..#..
        
        .....
        .....
        .#...
        ...#.
        ..#..
      `);
      const result = step(grid);
      expect(formatGrid(result)).toEqual(formatGrid(expected));
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        ".#.",
        "..#",
        "###"
      ];
      expect(solution(data)).toEqual("112");
    });
  });
});
