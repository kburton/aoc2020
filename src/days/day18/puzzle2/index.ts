import exp from "constants";

type BinaryOperator = "*" | "+";

interface BinaryOperationNode {
  type: "binaryOperation";
  left: Node;
  right: Node;
  operator: BinaryOperator;
}

interface ValueNode {
  type: "value";
  value: number;
}

export type Node = BinaryOperationNode | ValueNode;

export const getValue = (node: Node): number => {
  switch (node.type) {
    case "value":
      return node.value;
    case "binaryOperation":
      const leftValue = getValue(node.left);
      const rightValue = getValue(node.right);
      switch (node.operator) {
        case "*":
          return leftValue * rightValue;
        case "+":
          return leftValue + rightValue;
      }
  }
};

const getBinaryOperator = (char: string): BinaryOperator | null => {
  switch (char) {
    case "*":
    case "+":
      return char;
  }
  return null;
}

const findOpeningBracket = (expression: string, closingBracketPos: number): number => {
  let openBrackets = 0;
  for (let i = closingBracketPos; i >=0 ; i--) {
    const char = expression[i];
    switch (char) {
      case ")":
        openBrackets++;
        break;
      case "(":
        openBrackets--;
        break;
    }
    if (openBrackets === 0) {
      return i;
    }
  }
  throw new Error(`Mismatched brackets in expression: ${expression}`);
};

export const parseExpression = (expression: string): Node => {
  expression = expression.trim();
  let pendingOperator: { operator: BinaryOperator, position: number } | null = null;

  for (let i = expression.length - 1; i >= 0; i--) {
    const char = expression[i];
    const operator = getBinaryOperator(char);
    if (char === ")") {
      const openingBracketPos = findOpeningBracket(expression, i);
      if (i === expression.length - 1 && openingBracketPos === 0) {
        return parseExpression(expression.substring(1, expression.length - 1));
      }
      i = openingBracketPos;
    } else if (operator === "+") {
      if (pendingOperator === null) {
        pendingOperator = { operator, position: i };
      }
    } else if (operator === "*") {
      return {
        type: "binaryOperation",
        left: parseExpression(expression.substring(0, i)),
        right: parseExpression(expression.substring(i + 1)),
        operator
      };
    }
  }

  if (pendingOperator) {
    return {
      type: "binaryOperation",
      left: parseExpression(expression.substring(0, pendingOperator.position)),
      right: parseExpression(expression.substring(pendingOperator.position + 1)),
      operator: pendingOperator.operator
    };
  }

  if (!expression.match(/^\d+$/)) {
    throw new Error(`Invalid expression segment: ${expression}`);
  }

  return {
    type: "value",
    value: parseInt(expression, 10)
  };
};

const solution = (data: Array<string>): string => {
  const parsedExpressions = data.map(parseExpression);
  const calculatedValues = parsedExpressions.map(getValue);
  const sum = calculatedValues.reduce((acc, val) => acc + val, 0);
  return `${sum}`;
};

export default solution;
