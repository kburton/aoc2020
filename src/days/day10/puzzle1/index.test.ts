import solution from ".";

describe("Day 10", () => {
  describe("puzzle 1", () => {
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
      expect(solution(data)).toEqual("220");
    });
  });
});
