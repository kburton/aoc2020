import solution, { Notes, parseData } from ".";

describe("Day 16", () => {
  describe("puzzle 1", () => {
    it("parses the input data correctly", () => {
      const data: Array<string> = [
        "class: 1-3 or 5-7",
        "row: 6-11 or 33-44",
        "seat: 13-40 or 45-50",
        "",
        "your ticket:",
        "7,1,14",
        "",
        "nearby tickets:",
        "7,3,47",
        "40,4,50",
        "55,2,20",
        "38,6,12"
      ];
      const notes = parseData(data);
      const expected: Notes = {
        rules: [
          { name: "class", ranges: [ { min: 1, max: 3 }, { min: 5, max: 7 } ] },
          { name: "row", ranges: [ { min: 6, max: 11 }, { min: 33, max: 44 } ] },
          { name: "seat", ranges: [ { min: 13, max: 40 }, { min: 45, max: 50 } ] },
        ],
        myTicket: [ 7, 1, 14 ],
        nearbyTickets: [
          [ 7, 3, 47 ],
          [ 40, 4, 50 ],
          [ 55, 2, 20 ],
          [ 38, 6, 12 ],
        ]
      };
      expect(notes).toEqual(expected);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "class: 1-3 or 5-7",
        "row: 6-11 or 33-44",
        "seat: 13-40 or 45-50",
        "",
        "your ticket:",
        "7,1,14",
        "",
        "nearby tickets:",
        "7,3,47",
        "40,4,50",
        "55,2,20",
        "38,6,12"
      ];
      expect(solution(data)).toEqual("71");
    });
  });
});
