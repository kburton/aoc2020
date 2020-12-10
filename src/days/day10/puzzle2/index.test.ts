import solution, {countPermutationsInRunOfOnes} from ".";

// 2 ^ (n - 2)

// 0, 1

// 0, 1, 2
// 0, 2

// 0, 1, 2, 3
// 0, 1, 3
// 0, 2, 3
// 0, 3

// 0, 1, 2, 3, 4
// 0, 1, 2, 4
// 0, 1, 3, 4
// 0, 1, 4
// 0, 2, 3, 4
// 0, 2, 4
// 0, 3, 4

// 0, 1, 2, 3, 4, 5
// 0, 1, 2, 3, 5
// 0, 1, 2, 4, 5
// 0, 1, 2, 5
// 0, 1, 3, 4, 5
// 0, 1, 3, 5
// 0, 1, 4, 5
// 0, 2, 3, 4, 5
// 0, 2, 3, 5
// 0, 2, 4, 5
// 0, 2, 5
// 0, 3, 4, 5
// 0, 3, 5

describe("Day 10", () => {
  describe("puzzle 2", () => {
    it("calculates correct permutations in runs of 1", () => {
      const testCases: Array<{ runLength: number, expected: number }> = [
        { runLength: 2, expected: 1 },
        { runLength: 3, expected: 2 },
        { runLength: 4, expected: 4 },
        { runLength: 5, expected: 7 },
        { runLength: 6, expected: 13 },
      ];
      testCases.forEach(({ runLength, expected }) => expect(countPermutationsInRunOfOnes(runLength)).toEqual(expected));
      expect.assertions(testCases.length);
    });

    it("calculates the correct value for simple data", () => {
      const data: Array<string> = ["1", "2", "3", "4", "5"];
      expect(solution(data)).toEqual("13");
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "28",
        "33",
        "18",
        "42",
        "31",
        "14",
        "46",
        "20",
        "48",
        "47",
        "24",
        "23",
        "49",
        "45",
        "19",
        "38",
        "39",
        "11",
        "1",
        "32",
        "25",
        "35",
        "8",
        "17",
        "7",
        "9",
        "4",
        "2",
        "34",
        "10",
        "3"
      ];
      expect(solution(data)).toEqual("19208");
    });
  });
});
