import solution from ".";

describe("Day 11", () => {
  describe("puzzle 1", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "L.LL.LL.LL",
        "LLLLLLL.LL",
        "L.L.L..L..",
        "LLLL.LL.LL",
        "L.LL.LL.LL",
        "L.LLLLL.LL",
        "..L.L.....",
        "LLLLLLLLLL",
        "L.LLLLLL.L",
        "L.LLLLL.LL"
      ];
      expect(solution(data)).toEqual("37");
    });
  });
});
