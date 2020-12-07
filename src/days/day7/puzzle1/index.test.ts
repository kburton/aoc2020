import solution, { InnerBag, OuterBag, parseInnerBag, parseLine } from ".";

describe("Day 7", () => {
  describe("puzzle 1", () => {
    it("parses inner bags correctly", () => {
      const testCases: Array<{text: string, expected: InnerBag | null}> = [
        { text: "no other bags", expected: null },
        { text: "1 big blue bag", expected: { description: "big blue", count: 1 } },
        { text: "1 big blue bag.", expected: { description: "big blue", count: 1 } },
        { text: "2 big blue bags", expected: { description: "big blue", count: 2 } },
        { text: "2 big blue bags.", expected: { description: "big blue", count: 2 } },
      ];
      testCases.forEach(({text, expected}) => {
        expect(parseInnerBag(text)).toEqual(expected);
      });
      expect.assertions(testCases.length);
    });

    it("parses lines correctly", () => {
      const testCases: Array<{line: string, expected: OuterBag}> = [
        {
          line: "light red bags contain 1 bright white bag, 2 muted yellow bags.",
          expected: {
            description: "light red",
            innerBags: [ { description: "bright white", count: 1 }, { description: "muted yellow", count: 2 } ],
          },
        },
        {
          line: "bright white bags contain 1 shiny gold bag.",
          expected: {
            description: "bright white",
            innerBags: [ { description: "shiny gold", count: 1 } ],
          },
        },
        {
          line: "faded blue bags contain no other bags.",
          expected: {
            description: "faded blue",
            innerBags: [],
          },
        },
      ];
      testCases.forEach(({line, expected}) => {
        expect(parseLine(line)).toEqual(expected);
      });
      expect.assertions(testCases.length);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = [
        "light red bags contain 1 bright white bag, 2 muted yellow bags.",
        "dark orange bags contain 3 bright white bags, 4 muted yellow bags.",
        "bright white bags contain 1 shiny gold bag.",
        "muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.",
        "shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.",
        "dark olive bags contain 3 faded blue bags, 4 dotted black bags.",
        "vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.",
        "faded blue bags contain no other bags.",
        "dotted black bags contain no other bags."
      ];
      expect(solution(data)).toEqual("4");
    });
  });
});
