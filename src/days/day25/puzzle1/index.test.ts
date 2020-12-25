import solution, { getLoopSize } from ".";

describe("Day 25", () => {
  describe("puzzle 1", () => {
    it("calculates loop size correctly", () => {
      expect(getLoopSize(7, 5764801)).toEqual(8);
      expect(getLoopSize(7, 17807724)).toEqual(11);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "5764801",
        "17807724"
      ];
      expect(solution(data)).toEqual("14897079");
    });
  });
});
