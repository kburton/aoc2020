import solution from ".";

describe("Day 13", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "939",
        "7,13,x,x,59,x,31,19"
      ];
      expect(solution(data)).toEqual("1068781");
    });
  });
});
