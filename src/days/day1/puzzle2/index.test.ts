import solution from ".";

describe("Day 1", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = ["1721", "979", "366", "299", "675", "1456"];
      expect(solution(data)).toEqual("241861950");
    });

    it("throws error if no valid sums are found", () => {
      const data: Array<string> = ["1720", "978", "365", "298", "674", "1455"];
      expect(() => solution(data)).toThrow(Error);
    });
  });
});
