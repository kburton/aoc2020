const bisectRecursive = (operations: Array<boolean>, maybeCurrentVal?: number): number => {
  const currentVal = maybeCurrentVal || Math.pow(2, operations.length);
  if (operations.length === 0) {
    return currentVal;
  }
  const delta = Math.pow(2, operations.length - 1);
  const isHigh = operations[0];
  const diff = isHigh ? 0 : -delta;
  return bisectRecursive(operations.slice(1), currentVal + diff);
};

const getSeatId = (boardingPass: string): number => {
  const regex = /^([FB]+)([LR]+)$/;
  const matches = boardingPass.match(regex);
  if (matches === null) {
    throw new Error(`Invalid boarding pass: ${boardingPass}`);
  }
  const rowOperations = matches[1].split("").map(char => char === "B");
  const colOperations = matches[2].split("").map(char => char === "R");
  const rowNum = bisectRecursive(rowOperations) - 1;
  const colNum = bisectRecursive(colOperations) - 1;
  return rowNum * 8 + colNum;
};

const solution = (data: Array<string>): string => {
  return `${data.map(getSeatId).reduce((acc, val) => val > acc ? val : acc, 0)}`;
};

export default solution;
