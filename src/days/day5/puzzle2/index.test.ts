import solution from ".";

describe("Day 5", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "BBFFBBFRLL",
        "BBFFBBFRRL"
      ];
      expect(solution(data)).toEqual("821");
    });
  });
});
