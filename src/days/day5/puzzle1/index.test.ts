import solution from ".";

describe("Day 5", () => {
  describe("puzzle 1", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "FBFBBFFRLR",
        "BFFFBBFRRR",
        "FFFBBBFRRR",
        "BBFFBBFRLL"
      ];
      expect(solution(data)).toEqual("820");
    });
  });
});
