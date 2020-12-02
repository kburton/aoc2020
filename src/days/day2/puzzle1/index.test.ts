import solution from ".";

describe("Day 2", () => {
  describe("puzzle 1", () => {
    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "1-3 a: abcde",
        "1-3 b: cdefg",
        "2-9 c: ccccccccc"
      ];
      expect(solution(data)).toEqual("2");
    });

    it("throws error on bad input", () => {
      const testCases: Array<string> = [
        "1 3 a: abcde",
        "1-x bc: cdefg",
        "2-9 c:"
      ];
      testCases.map((testCase) => {
        expect(() => solution([testCase])).toThrow();
      });
      expect.assertions(testCases.length);
    });
  });
});
