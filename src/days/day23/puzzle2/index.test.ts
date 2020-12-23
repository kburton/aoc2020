import solution from ".";

describe("Day 23", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = ["389125467"];
      expect(solution(data)).toEqual("149245887792");
    });
  });
});
