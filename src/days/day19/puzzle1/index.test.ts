import solution, {Input, parseData} from ".";

describe("Day 19", () => {
  describe("puzzle 1", () => {
    it("parses data correctly", () => {
      const data: Array<string> = [
        "0: 4 1 5",
        "1: 2 3 | 3 2",
        '2: "a"',
        "",
        "ababbb",
        "bababa",
      ];
      const expected: Input = {
        rules:{
          0: { type: "sequence", sequences: [ [ 4, 1, 5 ] ] },
          1: { type: "sequence", sequences: [ [ 2, 3 ], [ 3, 2 ] ] },
          2: { type: "char", char: "a" },
        },
        messages: ["ababbb", "bababa"]
      }
      expect(parseData(data)).toEqual(expected);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "0: 4 1 5",
        "1: 2 3 | 3 2",
        "2: 4 4 | 5 5",
        "3: 4 5 | 5 4",
        '4: "a"',
        '5: "b"',
        "",
        "ababbb",
        "bababa",
        "abbbab",
        "aaabbb",
        "aaaabbb"
      ];
      expect(solution(data)).toEqual("2");
    });
  });
});
