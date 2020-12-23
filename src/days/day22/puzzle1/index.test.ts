import solution, { Game, parseData } from ".";

describe("Day 22", () => {
  describe("puzzle 1", () => {
    it("parses data correctly", () => {
      const data: Array<string> = [
        "Player 1:",
        "9",
        "2",
        "6",
        "3",
        "1",
        "",
        "Player 2:",
        "5",
        "8",
        "4",
        "7",
        "10"
      ];
      const expected: Game = {
        player1Deck: [ 9, 2, 6, 3, 1 ],
        player2Deck: [ 5, 8, 4, 7, 10 ]
      };
      expect(parseData(data)).toEqual(expected);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "Player 1:",
        "9",
        "2",
        "6",
        "3",
        "1",
        "",
        "Player 2:",
        "5",
        "8",
        "4",
        "7",
        "10"
      ];
      expect(solution(data)).toEqual("306");
    });
  });
});
