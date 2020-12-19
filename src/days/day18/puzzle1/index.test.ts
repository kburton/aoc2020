import solution, { getValue, parseExpression, Node } from ".";

const valueNode = (value: number): Node => ({ type: "value", value });

describe("Day 18", () => {
  describe("puzzle 1", () => {
    it("calculates the correct value for the provided node tree", () => {
      const testCases: Array<{node: Node, expected: number}> = [
        {
          node: { type: "value", value: 5 },
          expected: 5,
        },
        {
          node: { type: "binaryOperation", left: valueNode(5), right: valueNode(6), operator: "*" },
          expected: 30,
        },
        {
          node: { type: "binaryOperation", left: valueNode(5), right: valueNode(6), operator: "+" },
          expected: 11,
        },
        {
          node: {
            type: "binaryOperation",
            left: valueNode(5),
            right: { type: "binaryOperation", left: valueNode(2), right: valueNode(4), operator: "*" },
            operator: "+"
          },
          expected: 13,
        },
        {
          node: {
            type: "binaryOperation",
            left: { type: "binaryOperation", left: valueNode(2), right: valueNode(4), operator: "*" },
            right: valueNode(5),
            operator: "+"
          },
          expected: 13,
        },
      ];
      testCases.forEach(
        ({node, expected}) => expect(getValue(node)).toEqual(expected)
      );
      expect.assertions(testCases.length);
    });

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
      expect(solution(data)).toEqual("71");
    });
  });
});
