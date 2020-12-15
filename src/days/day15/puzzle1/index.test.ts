import solution from ".";

describe("Day 15", () => {
  describe("puzzle 1", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "0,3,6"
      ];
      expect(solution(data)).toEqual("436");
    });
  });
});
