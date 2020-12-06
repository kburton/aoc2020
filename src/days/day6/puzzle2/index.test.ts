import solution from ".";

describe("Day 6", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "abc",
        "",
        "a",
        "b",
        "c",
        "",
        "ab",
        "ac",
        "",
        "a",
        "a",
        "a",
        "a",
        "",
        "b"
      ];
      expect(solution(data)).toEqual("6");
    });
  });
});
