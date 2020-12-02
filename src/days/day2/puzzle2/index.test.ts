import solution from ".";

describe("Day 2", () => {
  describe("puzzle 2", () => {
    it("calculates the correct value for the example data", () => {
      const testCases: Array<{input: string, expected: string}> = [
        { input: "1-3 a: abcde", expected: "1" },
        { input: "1-3 b: cdefg", expected: "0" },
        { input: "2-9 c: ccccccccc", expected: "0" },
      ];
      testCases.map(({input, expected}) => {
        expect(solution([input])).toEqual(expected)
      });
      expect.assertions(testCases.length);
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
