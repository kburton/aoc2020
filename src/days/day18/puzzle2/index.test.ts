import solution, {Node, parseExpression} from ".";

const valueNode = (value: number): Node => ({ type: "value", value });

describe("Day 18", () => {
  describe("puzzle 2", () => {
    it("parses expressions correctly", () => {
      const testCases: Array<{expression: string, expected: Node}> = [
        {
          expression: "5",
          expected: { type: "value", value: 5 },
        },
        {
          expression: "(5)",
          expected: { type: "value", value: 5 },
        },
        {
          expression: "((5))",
          expected: { type: "value", value: 5 },
        },
        {
          expression: "5 + (3 * 2)",
          expected: {
            type: "binaryOperation",
            left: valueNode(5),
            right: { type: "binaryOperation", left: valueNode(3), right: valueNode(2), operator: "*" },
            operator: "+"
          },
        },
        {
          expression: "(5 + 3) * 2",
          expected: {
            type: "binaryOperation",
            left: { type: "binaryOperation", left: valueNode(5), right: valueNode(3), operator: "+" },
            right: valueNode(2),
            operator: "*"
          },
        },
      ];
      testCases.forEach(
        ({expression, expected}) => expect(parseExpression(expression)).toEqual(expected)
      );
      expect.assertions(testCases.length);
    });

    it("calculates the correct value for the example data", () => {
      const data: Array<string> = ["1 + 2 * 3 + 4 * 5 + 6"];
      expect(solution(data)).toEqual("231");
    });
  });
});
