import solution from "./solution";

describe("Day 1", () => {
  describe("puzzle 1", () => {
    it("calculates the correct value for the example data", () => {
      const data = [1721, 979, 366, 299, 675, 1456];
      expect(solution(data)).toEqual(514579);
    });
    it("throws error if no valid sums are found", () => {
      const data = [1720, 978, 365, 298, 674, 1455];
      expect(() => solution(data)).toThrow(Error);
    });
  });
});
