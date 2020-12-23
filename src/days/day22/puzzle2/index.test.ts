import solution from ".";

describe("Day 22", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "Player 1:",
        "9",
        "2",
        "6",
        "3",
        "1",
        "",
        "Player 2:",
        "5",
        "8",
        "4",
        "7",
        "10"
      ];
      expect(solution(data)).toEqual("291");
    });
  });
});
