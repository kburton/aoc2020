import solution from ".";

describe("Day 12", () => {
  describe("puzzle 1", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "F10",
        "N3",
        "F7",
        "R90",
        "F11"
      ];
      expect(solution(data)).toEqual("25");
    });
  });
});
