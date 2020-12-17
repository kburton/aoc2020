import solution from ".";

describe("Day 17", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        ".#.",
        "..#",
        "###"
      ];
      expect(solution(data)).toEqual("848");
    });
  });
});
